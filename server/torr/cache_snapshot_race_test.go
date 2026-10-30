package torr

import (
	"sync"
	"testing"
)

// NewReader, CloseReader, GetCache and CacheState read t.cache while drop (and WaitInfo)
// write it under muTorrent. Run under -race: a bare read of the field is reported.
func TestCachePointerIsReadUnderMuTorrent(t *testing.T) {
	tor, _ := connectShow(t)
	files := tor.Files()
	if len(files) == 0 {
		t.Fatal("no files")
	}

	const rounds = 300
	start := make(chan struct{})
	var wg sync.WaitGroup
	reader := func(f func()) {
		wg.Add(1)
		go func() {
			defer wg.Done()
			<-start
			for i := 0; i < rounds; i++ {
				f()
			}
		}()
	}
	reader(func() {
		if r := tor.NewReader(files[0]); r != nil {
			tor.CloseReader(r)
		}
	})
	reader(func() { _ = tor.GetCache() })
	reader(func() { _ = tor.CacheState() })

	wg.Add(1)
	go func() {
		defer wg.Done()
		<-start
		tor.drop() // sets t.cache = nil under muTorrent
	}()
	close(start)
	wg.Wait()

	if tor.GetCache() != nil {
		t.Fatal("cache still set after drop")
	}
	if r := tor.NewReader(files[0]); r != nil {
		t.Fatal("NewReader returned a reader for a dropped torrent")
	}
}

// A cache closed after the caller took its pointer must refuse a new reader instead of
// panicking on its nil readers map (Close sets it to nil).
func TestNewReaderOnClosedCacheReturnsNil(t *testing.T) {
	tor, _ := connectShow(t)
	files := tor.Files()
	cache := tor.GetCache()
	if cache == nil || len(files) == 0 {
		t.Fatal("no cache or files")
	}
	if err := cache.Close(); err != nil {
		t.Fatal(err)
	}
	if r := cache.NewReader(files[0]); r != nil {
		t.Fatal("NewReader on a closed cache returned a reader")
	}
}
