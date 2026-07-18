package template

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
)

func TestIndexHTMLRoutes(t *testing.T) {
	gin.SetMode(gin.TestMode)
	r := gin.New()
	RouteWebPages(r)

	for _, path := range []string{"/", "/index.html"} {
		req := httptest.NewRequest(http.MethodGet, path, nil)
		w := httptest.NewRecorder()
		r.ServeHTTP(w, req)
		if w.Code != http.StatusOK {
			t.Fatalf("%s: status %d, want 200", path, w.Code)
		}
		ct := w.Header().Get("Content-Type")
		if ct != "text/html; charset=utf-8" {
			t.Fatalf("%s: Content-Type %q", path, ct)
		}
		if len(w.Body.Bytes()) == 0 {
			t.Fatalf("%s: empty body", path)
		}
	}
}

func TestCacheControlFor(t *testing.T) {
	wantNoCache := "no-cache, must-revalidate"
	wantImmutable := "public, max-age=31536000, immutable"

	cases := []struct {
		path string
		want string
	}{
		{"pages/index.html", wantNoCache},
		{"pages/sw.js", wantNoCache},
		{"pages/workbox-abc123.js", wantNoCache},
		{"pages/site.webmanifest", wantNoCache},
		{"pages/static/useTranslation-BnNnnMzO.js", wantImmutable},
		{"pages/favicon.ico", "public, max-age=3600"},
	}
	for _, tc := range cases {
		if got := cacheControlFor(tc.path); got != tc.want {
			t.Errorf("cacheControlFor(%q)=%q, want %q", tc.path, got, tc.want)
		}
	}
}
