package api

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	set "server/settings"
	"server/torr"
	"server/torr/offlinetest"

	"github.com/gin-gonic/gin"
)

// The /torrents handler is documented as `@Produce json`, but its failure
// paths used to abort with an empty body, so any client calling .json() on
// the response got a parse error instead of the reason it failed.
func TestTorrentsRejectionsCarryJSONBody(t *testing.T) {
	gin.SetMode(gin.TestMode)

	cases := []struct {
		name string
		body string
	}{
		{"malformed json", `{`},
		{"wrong type on an optional key", `{"action":"add","link":"magnet:?xt=urn:btih:x","title":123}`},
		{"unknown action", `{"action":"bogus"}`},
		{"missing action", `{}`},
		{"add without link", `{"action":"add"}`},
		{"get without hash", `{"action":"get"}`},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			router := gin.New()
			router.POST("/torrents", torrents)

			req := httptest.NewRequest(http.MethodPost, "/torrents", strings.NewReader(tc.body))
			req.Header.Set("Content-Type", "application/json")
			w := httptest.NewRecorder()
			router.ServeHTTP(w, req)

			if w.Code != http.StatusBadRequest {
				t.Fatalf("status = %d, want %d", w.Code, http.StatusBadRequest)
			}
			if w.Body.Len() == 0 {
				t.Fatal("response body is empty; clients parsing it as JSON fail")
			}
			var payload struct {
				Error string `json:"error"`
			}
			if err := json.Unmarshal(w.Body.Bytes(), &payload); err != nil {
				t.Fatalf("body is not valid JSON (%v): %q", err, w.Body.String())
			}
			if payload.Error == "" {
				t.Errorf("no error message in body: %q", w.Body.String())
			}
		})
	}
}

func TestWipeEmptyListOK(t *testing.T) {
	gin.SetMode(gin.TestMode)

	prevSets := set.BTsets
	set.BTsets = &set.BTSets{}
	torr.InitApiHelper(torr.NewBTS())
	t.Cleanup(func() {
		set.BTsets = prevSets
		torr.InitApiHelper(torr.NewBTS())
	})

	router := gin.New()
	router.POST("/torrents", torrents)

	req := httptest.NewRequest(http.MethodPost, "/torrents", strings.NewReader(`{"action":"wipe"}`))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d body=%q", w.Code, http.StatusOK, w.Body.String())
	}
}

// A hash that is not 40 hex digits must be answered, not turned into an empty 500
// by a panic. Every route that takes a hash from the request is covered.
func TestMalformedHashIsNotFound(t *testing.T) {
	gin.SetMode(gin.TestMode)
	offlinetest.Prepare(t)
	bt := torr.NewBTS()
	torr.InitApiHelper(bt)
	if err := bt.Connect(); err != nil {
		t.Fatal(err)
	}
	t.Cleanup(bt.Disconnect)

	cases := []struct {
		name   string
		method string
		path   string
		body   string
		want   int
	}{
		{"torrents get", http.MethodPost, "/torrents", `{"action":"get","hash":"zz"}`, http.StatusNotFound},
		{"torrents get, 39 digits", http.MethodPost, "/torrents", `{"action":"get","hash":"0123456789abcdef0123456789abcdef0123456"}`, http.StatusNotFound},
		{"torrents set", http.MethodPost, "/torrents", `{"action":"set","hash":"zz","title":"x"}`, http.StatusOK},
		{"torrents drop", http.MethodPost, "/torrents", `{"action":"drop","hash":"zz"}`, http.StatusOK},
		{"torrents rem", http.MethodPost, "/torrents", `{"action":"rem","hash":"zz"}`, http.StatusOK},
		{"cache get", http.MethodPost, "/cache", `{"action":"get","hash":"zz"}`, http.StatusNotFound},
		{"playlist", http.MethodGet, "/playlist?hash=zz", "", http.StatusNotFound},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			router := gin.New()
			router.POST("/torrents", torrents)
			router.POST("/cache", cache)
			router.GET("/playlist", playList)

			req := httptest.NewRequest(tc.method, tc.path, strings.NewReader(tc.body))
			req.Header.Set("Content-Type", "application/json")
			w := httptest.NewRecorder()
			router.ServeHTTP(w, req)

			if w.Code != tc.want {
				t.Fatalf("status = %d, want %d, body %q", w.Code, tc.want, w.Body.String())
			}
		})
	}
}
