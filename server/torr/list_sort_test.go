package torr

import (
	"strings"
	"testing"

	"github.com/anacrolix/torrent"
	"github.com/anacrolix/torrent/metainfo"
)

func testListedTorrent(hex string, ts int64) *Torrent {
	h := metainfo.NewHashFromHex(hex)
	return &Torrent{
		TorrentSpec: &torrent.TorrentSpec{InfoHash: h},
		Timestamp:   ts,
	}
}

func TestSortTorrentsByAddedPrefersDBTimestamp(t *testing.T) {
	oldHex := strings.Repeat("a", 40)
	newHex := strings.Repeat("b", 40)
	liveOld := testListedTorrent(oldHex, 2000) // started later
	liveNew := testListedTorrent(newHex, 100)
	db := map[metainfo.Hash]*Torrent{
		liveOld.Hash(): {Timestamp: 100},
		liveNew.Hash(): {Timestamp: 500},
	}
	ret := []*Torrent{liveOld, liveNew}
	sortTorrentsByAdded(ret, db)
	if got := ret[0].Hash().HexString(); got != newHex {
		t.Fatalf("want newest-added first, got %s", got)
	}
	if liveOld.Timestamp != 2000 {
		t.Fatal("must not mutate live timestamp")
	}
}

func TestSortTorrentsByAddedTieBreakHash(t *testing.T) {
	a := testListedTorrent(strings.Repeat("a", 40), 10)
	b := testListedTorrent(strings.Repeat("c", 40), 10)
	ret := []*Torrent{b, a}
	sortTorrentsByAdded(ret, nil)
	if ret[0].Hash().HexString() != strings.Repeat("a", 40) {
		t.Fatal("tie-break should be hash hex")
	}
}
