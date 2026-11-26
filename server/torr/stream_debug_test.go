package torr

import (
	"net/http/httptest"
	"testing"
)

func TestStreamDebugWriterCounts(t *testing.T) {
	rec := httptest.NewRecorder()
	w := &streamDebugWriter{ResponseWriter: rec}
	if got := w.firstByte(); got != "none" {
		t.Fatalf("firstByte before data = %q", got)
	}
	w.WriteHeader(206)
	if _, err := w.Write([]byte("abcd")); err != nil {
		t.Fatal(err)
	}
	if _, err := w.Write([]byte("ef")); err != nil {
		t.Fatal(err)
	}
	if w.status != 206 || w.sent != 6 || rec.Body.String() != "abcdef" {
		t.Fatalf("status=%d sent=%d body=%q", w.status, w.sent, rec.Body.String())
	}
	if w.firstByte() == "none" {
		t.Fatal("firstByte not recorded")
	}
	// A write without WriteHeader is an implicit 200.
	w2 := &streamDebugWriter{ResponseWriter: httptest.NewRecorder()}
	_, _ = w2.Write([]byte("x"))
	if w2.status != 200 {
		t.Fatalf("implicit status = %d", w2.status)
	}
}

func TestCacheReadersNilCache(t *testing.T) {
	if n := (&Torrent{}).cacheReaders(); n != 0 {
		t.Fatalf("readers = %d", n)
	}
}
