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
