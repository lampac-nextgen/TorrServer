package torrstor

import (
	"bytes"
	"context"
	"errors"
	"io"
	"runtime"
	"testing"
	"time"

	"server/leakcheck"
	"server/settings"
	"server/torr/offlinetest"
)

func newFakeCache(capacity int64) *Cache {
	return &Cache{
		pieces:       make(map[int]*Piece),
		activePieces: make(map[int]struct{}),
		readers:      make(map[*Reader]struct{}),
		stopWatch:    make(chan struct{}),
		pieceLength:  1024,
		pieceCount:   4,
		capacity:     capacity,
	}
}

// settledGoroutines waits for goroutines left by earlier tests (Reader.Close
// spawns getRemPieces) so the baseline cannot hide one of this test's own.
func settledGoroutines() int {
	n, stable := runtime.NumGoroutine(), 0
	for deadline := time.Now().Add(time.Second); stable < 5 && time.Now().Before(deadline); {
		time.Sleep(10 * time.Millisecond)
		if m := runtime.NumGoroutine(); m == n {
			stable++
		} else {
			n, stable = m, 0
		}
	}
	return n
}

// awaitRemPieces waits for the getRemPieces goroutines Reader.Close starts. The
// muActive round trip is what orders their settings reads before the test's
// cleanup restores settings.BTsets; a goroutine count alone is not a sync edge.
func awaitRemPieces(t *testing.T, c *Cache, baseline int) {
	t.Helper()
	leakcheck.AssertNoGoroutineLeak(t, baseline)
	c.muActive.Lock()
	_ = len(c.activePieces)
	c.muActive.Unlock()
}

func addFakeReader(c *Cache, backend *fakeTorrentReader) *Reader {
	r := &Reader{Reader: backend, cache: c, isUse: true, overrideLen: 1 << 30}
	c.muReaders.Lock()
	c.readers[r] = struct{}{}
	c.muReaders.Unlock()
	return r
}

func TestReaderWindowsEdges(t *testing.T) {
	const mib = int64(1 << 20)
	tests := []struct {
		name            string
		capacity        int64
		readers         int
		pct, budget     int64
		next, rah, zone int64
	}{
		{"no readers counts as one", 64 * mib, 0, 95, 16 * mib, 4 * mib, 16 * mib, 64 * mib * 95 / 100},
		{"negative readers counts as one", 64 * mib, -3, 100, 16 * mib, 4 * mib, 16 * mib, 64 * mib},
		{"zero percent has no zone", 64 * mib, 1, 0, 16 * mib, 0, 0, 0},
		{"negative percent clamps to zero", 64 * mib, 1, -5, 16 * mib, 0, 0, 0},
		{"negative capacity clamps to zero", -1, 1, 95, 16 * mib, 0, 0, 0},
		{"negative budget clamps to zero", 64 * mib, 1, 95, -1, 0, 0, 64 * mib * 95 / 100},
		{"zone smaller than the near window", 3 * mib, 1, 50, 16 * mib, 3 * mib / 2, 3 * mib / 2, 3 * mib / 2},
		{"four readers split every window", 64 * mib, 4, 95, 16 * mib, mib, 4 * mib, (16 * mib) * 95 / 100},
		{"more readers than bytes of budget", 64 * mib, 32, 95, 16 * mib, mib / 8, mib / 2, (2 * mib) * 95 / 100},
	}
	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			next, rah, zone := readerWindows(tc.capacity, tc.readers, tc.pct, tc.budget)
			if next != tc.next || rah != tc.rah || zone != tc.zone {
				t.Fatalf("got next %d rah %d zone %d, want %d %d %d", next, rah, zone, tc.next, tc.rah, tc.zone)
			}
			if next > rah || rah > zone {
				t.Fatalf("windows out of order: %d %d %d", next, rah, zone)
			}
		})
	}
}

func TestReadAheadPercent(t *testing.T) {
	prev := settings.BTsets
	t.Cleanup(func() { settings.BTsets = prev })
	settings.BTsets = nil
	if got := readAheadPercent(); got != 95 {
		t.Fatalf("nil settings: %d, want 95", got)
	}
	settings.BTsets = &settings.BTSets{ReaderReadAHead: 40}
	if got := readAheadPercent(); got != 40 {
		t.Fatalf("got %d, want 40", got)
	}
}

func TestIdleTimeoutFloor(t *testing.T) {
	prev := settings.BTsets
	t.Cleanup(func() { settings.BTsets = prev })
	r := &Reader{}
	settings.BTsets = nil
	if got := r.idleTimeout(); got != minReaderIdleTimeout {
		t.Fatalf("nil settings: %d", got)
	}
	settings.BTsets = &settings.BTSets{TorrentDisconnectTimeout: 5}
	if got := r.idleTimeout(); got != minReaderIdleTimeout {
		t.Fatalf("short timeout must be floored: %d", got)
	}
	settings.BTsets = &settings.BTSets{TorrentDisconnectTimeout: 300}
	if got := r.idleTimeout(); got != 300 {
		t.Fatalf("long timeout must win: %d", got)
	}
}

func TestSetZonesClampsAndStores(t *testing.T) {
	c := newFakeCache(10 << 20)
	backend := &fakeTorrentReader{}
	r := addFakeReader(c, backend)

	// zone above capacity is cut to capacity; readahead and next follow it down.
	r.SetZones(8<<20, 32<<20, 64<<20)
	if backend.zone != 10<<20 || backend.readahead != 10<<20 || backend.next != 8<<20 {
		t.Fatalf("pushed zone %d readahead %d next %d", backend.zone, backend.readahead, backend.next)
	}
	if r.Readahead() != 10<<20 {
		t.Fatalf("Readahead() = %d", r.Readahead())
	}

	// next above readahead is cut to readahead.
	r.SetZones(9<<20, 2<<20, 4<<20)
	if backend.next != 2<<20 || backend.readahead != 2<<20 || backend.zone != 4<<20 {
		t.Fatalf("next not clamped: %d %d %d", backend.next, backend.readahead, backend.zone)
	}

	// negatives become zero.
	r.SetZones(-1, -1, -1)
	if backend.next != 0 || backend.readahead != 0 || backend.zone != 0 || r.Readahead() != 0 {
		t.Fatalf("negatives not clamped: %d %d %d", backend.next, backend.readahead, backend.zone)
	}
}

func TestSetZonesOnParkedReaderOnlyStores(t *testing.T) {
	c := newFakeCache(64 << 20)
	backend := &fakeTorrentReader{}
	r := addFakeReader(c, backend)
	r.isUse = false

	r.SetZones(4<<20, 16<<20, 32<<20)
	if backend.next != 0 || backend.readahead != 0 || backend.zone != 0 {
		t.Fatalf("parked reader pushed windows to the client: %d %d %d", backend.next, backend.readahead, backend.zone)
	}
	if r.next != 4<<20 || r.readahead != 16<<20 || r.zone != 32<<20 {
		t.Fatal("parked reader forgot the windows resume needs")
	}
	r.readerOn()
	if backend.next != 4<<20 || backend.readahead != 16<<20 || backend.zone != 32<<20 {
		t.Fatalf("resume did not restore windows: %d %d %d", backend.next, backend.readahead, backend.zone)
	}
}

func TestSetZonesWithoutCacheDoesNotClampToCapacity(t *testing.T) {
	backend := &fakeTorrentReader{}
	r := &Reader{Reader: backend, isUse: true}
	r.SetZones(1<<20, 2<<20, 3<<20)
	if backend.zone != 3<<20 || backend.readahead != 2<<20 || backend.next != 1<<20 {
		t.Fatalf("got %d %d %d", backend.next, backend.readahead, backend.zone)
	}
}

func TestAdjustRASplitsZonesAcrossActiveReaders(t *testing.T) {
	testBTSets(t)
	const capacity = 64 << 20
	c := newFakeCache(capacity)
	a, b := &fakeTorrentReader{}, &fakeTorrentReader{}
	addFakeReader(c, a)
	addFakeReader(c, b)

	c.AdjustRA(ReaderReadaheadBytes)
	wantNext, wantRah, wantZone := readerWindows(capacity, 2, 95, ReaderReadaheadBytes)
	if wantZone != (capacity/2)*95/100 || wantRah != 8<<20 || wantNext != 2<<20 {
		t.Fatalf("test expectation drifted: %d %d %d", wantNext, wantRah, wantZone)
	}
	for i, f := range []*fakeTorrentReader{a, b} {
		if f.next != wantNext || f.readahead != wantRah || f.zone != wantZone {
			t.Fatalf("reader %d: next %d rah %d zone %d", i, f.next, f.readahead, f.zone)
		}
	}
}

func TestAdjustRASkipsParkedAndClosedReaders(t *testing.T) {
	testBTSets(t)
	c := newFakeCache(64 << 20)
	active := &fakeTorrentReader{}
	parked, closed := &fakeTorrentReader{}, &fakeTorrentReader{}
	addFakeReader(c, active)
	addFakeReader(c, parked).isUse = false
	addFakeReader(c, closed).isClosed = true

	c.AdjustRA(ReaderReadaheadBytes)
	// Only one reader counts, so it gets the whole budget.
	if active.next != 4<<20 || active.readahead != 16<<20 || active.zone != (64<<20)*95/100 {
		t.Fatalf("active: %d %d %d", active.next, active.readahead, active.zone)
	}
	if parked.zone != 0 || closed.zone != 0 {
		t.Fatalf("inactive readers were given a zone: parked %d closed %d", parked.zone, closed.zone)
	}
}

func TestAdjustRAWithNoReadersIsNoop(t *testing.T) {
	testBTSets(t)
	c := newFakeCache(64 << 20)
	c.AdjustRA(ReaderReadaheadBytes)
	if c.GetCapacity() != 64<<20 {
		t.Fatalf("capacity changed to %d", c.GetCapacity())
	}
}

func TestAdjustRAClosedAndNilCache(t *testing.T) {
	testBTSets(t)
	var nilCache *Cache
	nilCache.AdjustRA(ReaderReadaheadBytes) // must not panic

	c := newFakeCache(64 << 20)
	backend := &fakeTorrentReader{}
	addFakeReader(c, backend)
	c.isClosed.Store(true)
	c.AdjustRA(ReaderReadaheadBytes)
	if backend.zone != 0 {
		t.Fatalf("closed cache pushed a zone: %d", backend.zone)
	}
}

func TestAdjustRAZeroCacheSizeDerivesCapacityFromReadahead(t *testing.T) {
	testBTSets(t)
	settings.BTsets.CacheSize = 0
	c := newFakeCache(1)
	backend := &fakeTorrentReader{}
	addFakeReader(c, backend)

	c.AdjustRA(10 << 20)
	if c.capacity != 30<<20 {
		t.Fatalf("capacity = %d, want 3x readahead", c.capacity)
	}
	if backend.zone != (30<<20)*95/100 || backend.readahead != 10<<20 {
		t.Fatalf("windows: rah %d zone %d", backend.readahead, backend.zone)
	}
}

func TestCloseReaderUnregistersAndRebalances(t *testing.T) {
	testBTSets(t)
	baseline := settledGoroutines()
	c := newFakeCache(64 << 20)
	a, b := &fakeTorrentReader{}, &fakeTorrentReader{}
	ra := addFakeReader(c, a)
	rb := addFakeReader(c, b)
	c.AdjustRA(ReaderReadaheadBytes)
	if a.readahead != 8<<20 {
		t.Fatalf("two readers should split readahead, got %d", a.readahead)
	}
	if c.Readers() != 2 || c.GetUseReaders() != 2 {
		t.Fatalf("readers %d using %d", c.Readers(), c.GetUseReaders())
	}

	c.CloseReader(ra)
	if !ra.closed() {
		t.Fatal("reader not closed")
	}
	if c.Readers() != 1 || c.GetUseReaders() != 1 {
		t.Fatalf("after close: readers %d using %d", c.Readers(), c.GetUseReaders())
	}
	if b.readahead != 16<<20 || b.next != 4<<20 {
		t.Fatalf("survivor did not take the freed share: next %d rah %d", b.next, b.readahead)
	}

	c.CloseReader(ra) // second close is harmless
	c.CloseReader(rb)
	if c.Readers() != 0 {
		t.Fatalf("readers left: %d", c.Readers())
	}
	awaitRemPieces(t, c, baseline)
}

func TestCloseReaderNilSafe(t *testing.T) {
	var nilCache *Cache
	nilCache.CloseReader(nil)

	// Torrent.drop nils its cache; the reader still carries its own.
	testBTSets(t)
	baseline := settledGoroutines()
	c := newFakeCache(64 << 20)
	r := addFakeReader(c, &fakeTorrentReader{})
	nilCache.CloseReader(r)
	if !r.closed() || c.Readers() != 0 {
		t.Fatalf("closed %v readers %d", r.closed(), c.Readers())
	}

	// A reader with no cache has nothing to unregister from.
	orphan := &Reader{Reader: &fakeTorrentReader{}}
	nilCache.CloseReader(orphan)
	if orphan.closed() {
		t.Fatal("reader without a cache must be left alone")
	}
	awaitRemPieces(t, c, baseline)
}

func TestClosedReaderReadsEOFAndSeekFails(t *testing.T) {
	r := &Reader{Reader: &fakeTorrentReader{}, isClosed: true}
	n, err := r.Read(make([]byte, 8))
	if n != 0 || !errors.Is(err, io.EOF) {
		t.Fatalf("Read on closed reader: %d %v", n, err)
	}
	if _, err := r.Seek(5, io.SeekStart); !errors.Is(err, io.EOF) {
		t.Fatalf("Seek on closed reader: %v", err)
	}
}

func TestReadWithoutFileReturnsEOF(t *testing.T) {
	r := &Reader{Reader: &fakeTorrentReader{}, isUse: true}
	n, err := r.ReadContext(context.Background(), make([]byte, 8))
	if n != 0 || !errors.Is(err, io.EOF) {
		t.Fatalf("got %d %v", n, err)
	}
	if r.inFlight != 0 {
		t.Fatalf("inFlight leaked: %d", r.inFlight)
	}
}

func TestSeekMovesPlayheadAndSeekEndProbeDoesNot(t *testing.T) {
	backend := &fakeTorrentReader{}
	r := &Reader{Reader: backend, isUse: true, overrideLen: 1000}

	if n, err := r.Seek(100, io.SeekStart); err != nil || n != 100 || r.Offset() != 100 {
		t.Fatalf("SeekStart: %d %v offset %d", n, err, r.Offset())
	}
	if n, err := r.Seek(50, io.SeekCurrent); err != nil || n != 150 || r.Offset() != 150 {
		t.Fatalf("SeekCurrent: %d %v offset %d", n, err, r.Offset())
	}
	if n, err := r.Seek(0, io.SeekEnd); err != nil || n != 1000 || r.Offset() != 150 || backend.pos != 150 {
		t.Fatalf("size probe moved the playhead: %d %v offset %d backend %d", n, err, r.Offset(), backend.pos)
	}
	if r.inFlight != 0 {
		t.Fatalf("inFlight leaked: %d", r.inFlight)
	}
}

func TestCheckReaderParksIdleAndResumesActive(t *testing.T) {
	testBTSets(t)
	backend := &fakeTorrentReader{pos: 7 << 20}
	r := &Reader{Reader: backend, isUse: true, offset: 7 << 20, lastAccess: 1, next: 1 << 20, readahead: 2 << 20, zone: 3 << 20}

	r.checkReader()
	if r.using() || backend.pos != 0 {
		t.Fatalf("idle reader not parked: using %v pos %d", r.using(), backend.pos)
	}
	r.touch(7 << 20)
	r.checkReader()
	if !r.using() || backend.pos != 7<<20 || backend.zone != 3<<20 {
		t.Fatalf("fresh reader not resumed: using %v pos %d zone %d", r.using(), backend.pos, backend.zone)
	}
}

func TestReaderOffNeverSeeksWhileBlockedInFlightConcurrently(t *testing.T) {
	backend := &fakeTorrentReader{pos: 5 << 20}
	r := &Reader{Reader: backend, isUse: true, offset: 5 << 20}
	r.beginIO()
	done := make(chan struct{})
	go func() {
		defer close(done)
		for i := 0; i < 100; i++ {
			r.readerOff()
		}
	}()
	<-done
	if !r.using() {
		t.Fatal("reader parked while a read was in flight")
	}
	r.endIO()
}

// A real reader over a loopback seeder: NewReader registers, Read returns the bytes,
// Close through the cache unregisters.
func TestNewReaderReadsAndClosesThroughCache(t *testing.T) {
	offlinetest.Prepare(t)
	const pieceLen = 16 << 10
	show := offlinetest.WriteSized(t, "clip.bin", 8*pieceLen, pieceLen)
	seed := offlinetest.Seed(t, show)
	baseline := settledGoroutines()

	c := newFakeCache(4 * pieceLen)
	c.pieceLength = pieceLen
	c.pieceCount = 8
	c.totalLength = 8 * pieceLen
	file := seed.Torrent.Files()[0]

	r := c.NewReader(file)
	if c.Readers() != 1 || c.GetUseReaders() != 1 {
		t.Fatalf("readers %d using %d", c.Readers(), c.GetUseReaders())
	}
	wantNext, wantRah, wantZone := readerWindows(c.capacity, 1, readAheadPercent(), ReaderReadaheadBytes)
	if r.next != wantNext || r.readahead != wantRah || r.zone != wantZone {
		t.Fatalf("NewReader windows %d %d %d, want %d %d %d", r.next, r.readahead, r.zone, wantNext, wantRah, wantZone)
	}
	if r.zone > c.capacity {
		t.Fatalf("zone %d exceeds capacity %d", r.zone, c.capacity)
	}

	buf := make([]byte, 1024)
	n, err := r.Read(buf)
	if err != nil || n == 0 || !bytes.Equal(buf[:n], show.Data[:n]) {
		t.Fatalf("Read: %d %v", n, err)
	}
	if r.Offset() != int64(n) || r.inFlight != 0 {
		t.Fatalf("offset %d inFlight %d", r.Offset(), r.inFlight)
	}

	if pos, err := r.Seek(pieceLen+5, io.SeekStart); err != nil || pos != pieceLen+5 {
		t.Fatalf("Seek: %d %v", pos, err)
	}
	n, err = r.ReadContext(context.Background(), buf)
	if err != nil || n == 0 || !bytes.Equal(buf[:n], show.Data[pieceLen+5:pieceLen+5+int64(n)]) {
		t.Fatalf("ReadContext after seek: %d %v", n, err)
	}

	ctx, cancel := context.WithCancel(context.Background())
	cancel()
	if _, err := r.ReadContext(ctx, buf); err != nil && !errors.Is(err, context.Canceled) {
		t.Fatalf("canceled context: %v", err)
	}

	c.CloseReader(r)
	if c.Readers() != 0 || !r.closed() {
		t.Fatalf("readers %d closed %v", c.Readers(), r.closed())
	}
	if n, err := r.Read(buf); n != 0 || !errors.Is(err, io.EOF) {
		t.Fatalf("Read after close: %d %v", n, err)
	}
	awaitRemPieces(t, c, baseline)
}
