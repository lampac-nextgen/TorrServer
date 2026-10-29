package torr

import (
	"testing"
	"time"

	"server/torr/offlinetest"
	"server/torr/state"

	"github.com/anacrolix/torrent"
	"github.com/anacrolix/torrent/metainfo"
)

func TestDBTorrentsCacheMemoization(t *testing.T) {
	offlinetest.Prepare(t)
	InvalidateDBTorrentsCache()

	hash := metainfo.NewHashFromHex("0123456789abcdef0123456789abcdef01234567")
	spec := &torrent.TorrentSpec{
		InfoHash: hash,
	}

	torr := &Torrent{
		TorrentSpec: spec,
		Title:       "Test Movie",
		Poster:      "http://example.com/poster.jpg",
		Category:    "movie",
		Size:        1024 * 1024,
		Stat:        state.TorrentInDB,
	}

	AddTorrentDB(torr)

	// First list: populates cache
	list1 := ListTorrentsDB()
	t1, ok := list1[hash]
	if !ok || t1 == nil {
		t.Fatalf("expected torrent in ListTorrentsDB")
	}

	// Status call caches torrsHashToken on t1
	st1 := t1.Status()
	if st1.TorrsHash == "" {
		t.Fatalf("expected torrsHash to be generated")
	}
	token1 := t1.torrsHashToken
	if token1 == "" {
		t.Fatalf("expected torrsHashToken to be cached on Torrent struct")
	}

	// Second list: must return identical Torrent pointer from memory cache
	list2 := ListTorrentsDB()
	t2, ok := list2[hash]
	if !ok || t2 == nil {
		t.Fatalf("expected torrent in ListTorrentsDB")
	}
	if t1 != t2 {
		t.Fatalf("expected ListTorrentsDB to return memoized *Torrent pointer, got %p != %p", t1, t2)
	}

	// Status call on t2 reuses torrsHashToken with 0 zlib re-encodes
	st2 := t2.Status()
	if st2.TorrsHash != st1.TorrsHash {
		t.Fatalf("token mismatch: %q != %q", st2.TorrsHash, st1.TorrsHash)
	}

	// GetTorrentDB returns same instance
	tGet := GetTorrentDB(hash)
	if tGet != t1 {
		t.Fatalf("expected GetTorrentDB to return memoized *Torrent pointer, got %p != %p", tGet, t1)
	}

	// Update via AddTorrentDB preserves cache
	torr.Title = "Updated Movie"
	AddTorrentDB(torr)
	tUpdated := GetTorrentDB(hash)
	if tUpdated == nil || tUpdated.Title != "Updated Movie" {
		t.Fatalf("expected updated title in cache, got %v", tUpdated)
	}

	// Removal from DB removes from cache
	RemTorrentDB(hash)
	if GetTorrentDB(hash) != nil {
		t.Fatalf("expected torrent to be removed from cache")
	}
	if _, found := ListTorrentsDB()[hash]; found {
		t.Fatalf("expected torrent to be removed from ListTorrentsDB")
	}
}

func TestExpiredDropsUnstartedTorrentWithNilCache(t *testing.T) {
	tor := new(Torrent)
	tor.Stat = state.TorrentAdded
	tor.cache = nil

	// Future expiry: not expired
	tor.expiredTime = time.Now().Add(time.Minute)
	if tor.expired() {
		t.Fatalf("expected unexpired for future time")
	}

	// Past expiry: expired!
	tor.expiredTime = time.Now().Add(-time.Second)
	if !tor.expired() {
		t.Fatalf("expected expired for past time with nil cache")
	}

	// Preload state: must never expire while preloading
	tor.Stat = state.TorrentPreload
	if tor.expired() {
		t.Fatalf("expected preload stat to not expire")
	}
}
