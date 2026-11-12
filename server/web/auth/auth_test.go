package auth

import (
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"runtime"
	"testing"
	"time"

	"github.com/gin-gonic/gin"

	"server/leakcheck"
	"server/settings"
)

func TestSetupAuthMissingAndValidAccounts(t *testing.T) {
	gin.SetMode(gin.TestMode)
	oldAuth, oldPath := settings.HttpAuth, settings.Path
	settings.Path = t.TempDir()
	settings.HttpAuth = false
	t.Cleanup(func() {
		settings.HttpAuth = oldAuth
		settings.Path = oldPath
	})

	open := gin.New()
	SetupAuth(open)
	open.GET("/open", func(c *gin.Context) { c.Status(http.StatusOK) })
	w := httptest.NewRecorder()
	open.ServeHTTP(w, httptest.NewRequest(http.MethodGet, "/open", nil))
	if w.Code != http.StatusOK {
		t.Fatalf("auth off %d", w.Code)
	}

	settings.HttpAuth = true
	missing := gin.New()
	SetupAuth(missing)
	missing.GET("/open", func(c *gin.Context) { c.Status(http.StatusOK) })
	w = httptest.NewRecorder()
	missing.ServeHTTP(w, httptest.NewRequest(http.MethodGet, "/open", nil))
	if w.Code != http.StatusOK {
		t.Fatalf("missing accs.db %d", w.Code)
	}

	accs := filepath.Join(settings.Path, "accs.db")
	if err := os.WriteFile(accs, []byte("{"), 0o644); err != nil {
		t.Fatal(err)
	}
	bad := gin.New()
	SetupAuth(bad)

	if err := os.WriteFile(accs, []byte(`{"user":"secret"}`), 0o644); err != nil {
		t.Fatal(err)
	}
	locked := gin.New()
	SetupAuth(locked)
	locked.GET("/open", CheckAuth(), func(c *gin.Context) { c.Status(http.StatusOK) })
	w = httptest.NewRecorder()
	locked.ServeHTTP(w, httptest.NewRequest(http.MethodGet, "/open", nil))
	if w.Code != http.StatusUnauthorized {
		t.Fatalf("no credentials %d", w.Code)
	}
	req := httptest.NewRequest(http.MethodGet, "/open", nil)
	req.SetBasicAuth("user", "secret")
	w = httptest.NewRecorder()
	locked.ServeHTTP(w, req)
	if w.Code != http.StatusOK {
		t.Fatalf("basic auth %d", w.Code)
	}
}

func TestCheckAuthSkipsChallengeForSPAClients(t *testing.T) {
	gin.SetMode(gin.TestMode)
	settings.HttpAuth = true
	t.Cleanup(func() { settings.HttpAuth = false })

	r := gin.New()
	r.GET("/probe", CheckAuth(), func(c *gin.Context) { c.Status(http.StatusOK) })

	cases := []struct {
		name      string
		headers   map[string]string
		wantChall bool
	}{
		{
			name:      "json accept",
			headers:   map[string]string{"Accept": "application/json"},
			wantChall: false,
		},
		{
			name:      "x-requested-with",
			headers:   map[string]string{"X-Requested-With": "XMLHttpRequest"},
			wantChall: false,
		},
		{
			name:      "cors fetch",
			headers:   map[string]string{"Sec-Fetch-Mode": "cors"},
			wantChall: false,
		},
		{
			name:      "plain navigation",
			headers:   map[string]string{"Accept": "text/html"},
			wantChall: true,
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			req := httptest.NewRequest(http.MethodGet, "/probe", nil)
			for k, v := range tc.headers {
				req.Header.Set(k, v)
			}
			w := httptest.NewRecorder()
			r.ServeHTTP(w, req)
			if w.Code != http.StatusUnauthorized {
				t.Fatalf("status %d, want 401", w.Code)
			}
			chall := w.Header().Get("WWW-Authenticate")
			if tc.wantChall && chall == "" {
				t.Fatal("expected WWW-Authenticate challenge")
			}
			if !tc.wantChall && chall != "" {
				t.Fatalf("unexpected challenge %q", chall)
			}
		})
	}
}

func TestCheckAuthAllowsAuthenticatedUser(t *testing.T) {
	gin.SetMode(gin.TestMode)
	settings.HttpAuth = true
	t.Cleanup(func() { settings.HttpAuth = false })

	r := gin.New()
	r.Use(func(c *gin.Context) {
		c.Set(gin.AuthUserKey, "alice")
		c.Next()
	})
	r.GET("/probe", CheckAuth(), func(c *gin.Context) { c.String(http.StatusOK, "ok") })

	req := httptest.NewRequest(http.MethodGet, "/probe", nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	if w.Code != http.StatusOK {
		t.Fatalf("status %d, want 200", w.Code)
	}
}

func TestAccountsReloadWhenAccsDBChanges(t *testing.T) {
	gin.SetMode(gin.TestMode)
	oldAuth, oldPath, oldPoll := settings.HttpAuth, settings.Path, accsPollInterval
	settings.Path = t.TempDir()
	settings.HttpAuth = true
	accsPollInterval = 10 * time.Millisecond
	baseline := runtime.NumGoroutine()
	t.Cleanup(func() {
		StopAccountsWatch()
		accsPairs.Store(nil)
		settings.HttpAuth, settings.Path, accsPollInterval = oldAuth, oldPath, oldPoll
	})

	accs := filepath.Join(settings.Path, "accs.db")
	write := func(body string, mod time.Time) {
		t.Helper()
		if err := os.WriteFile(accs, []byte(body), 0o644); err != nil {
			t.Fatal(err)
		}
		// Same-size rewrites inside the filesystem's timestamp resolution.
		if err := os.Chtimes(accs, mod, mod); err != nil {
			t.Fatal(err)
		}
	}
	base := time.Now().Add(-time.Hour)
	write(`{"alice":"one"}`, base)

	r := gin.New()
	SetupAuth(r)
	r.GET("/x", CheckAuth(), func(c *gin.Context) { c.Status(http.StatusOK) })
	code := func(user, pass string) int {
		req := httptest.NewRequest(http.MethodGet, "/x", nil)
		if user != "" {
			req.SetBasicAuth(user, pass)
		}
		w := httptest.NewRecorder()
		r.ServeHTTP(w, req)
		return w.Code
	}
	waitCode := func(user, pass string, want int) {
		t.Helper()
		deadline := time.Now().Add(2 * time.Second)
		for code(user, pass) != want {
			if time.Now().After(deadline) {
				t.Fatalf("%s:%s never answered %d", user, pass, want)
			}
			time.Sleep(10 * time.Millisecond)
		}
	}

	if code("alice", "one") != http.StatusOK || code("bob", "two") != http.StatusUnauthorized {
		t.Fatal("initial accounts")
	}

	write(`{"bob":"two"}`, base.Add(time.Minute))
	waitCode("bob", "two", http.StatusOK)
	if code("alice", "one") != http.StatusUnauthorized {
		t.Fatal("removed account still works")
	}

	// A half-written file keeps the accounts, and is not retried until it changes.
	write(`{"bob":`, base.Add(2*time.Minute))
	time.Sleep(100 * time.Millisecond)
	if code("bob", "two") != http.StatusOK {
		t.Fatal("unparsable accs.db dropped the accounts")
	}

	// Deleting it must not turn authentication off.
	if err := os.Remove(accs); err != nil {
		t.Fatal(err)
	}
	time.Sleep(100 * time.Millisecond)
	if code("bob", "two") != http.StatusOK || code("", "") != http.StatusUnauthorized {
		t.Fatal("deleted accs.db changed the accounts")
	}

	// A file that appears after the start is picked up.
	write(`{"carol":"three"}`, base.Add(3*time.Minute))
	waitCode("carol", "three", http.StatusOK)

	StopAccountsWatch()
	leakcheck.AssertNoGoroutineLeak(t, baseline)
}

func TestAccountsWatchRestartKeepsOneWatcher(t *testing.T) {
	gin.SetMode(gin.TestMode)
	oldAuth, oldPath := settings.HttpAuth, settings.Path
	settings.Path = t.TempDir()
	settings.HttpAuth = true
	t.Cleanup(func() {
		StopAccountsWatch()
		accsPairs.Store(nil)
		settings.HttpAuth, settings.Path = oldAuth, oldPath
	})
	if err := os.WriteFile(filepath.Join(settings.Path, "accs.db"), []byte(`{"a":"b"}`), 0o644); err != nil {
		t.Fatal(err)
	}
	baseline := runtime.NumGoroutine()
	for range 3 {
		SetupAuth(gin.New())
	}
	StopAccountsWatch()
	leakcheck.AssertNoGoroutineLeak(t, baseline)
}
