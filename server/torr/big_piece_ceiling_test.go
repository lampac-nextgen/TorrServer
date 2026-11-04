package torr

import (
	"io"
	"math/rand"
	"runtime"
	"sync"
	"sync/atomic"
	"testing"
	"time"

	"github.com/anacrolix/torrent"

	"server/leakcheck"
	"server/settings"
	"server/torr/offlinetest"
)

// Two seeking readers on a torrent with 16MiB pieces and a 64MiB RAM cache.
// Each reader window is capacity/readers, but a window cut on byte offsets
// touches whole pieces and every open file keeps its first and last piece, so
// the live buffers may pass the capacity by a bounded number of pieces. Before
// partial pieces were charged at their allocated size they grew without bound.
func TestBigPiecesTwoSeekingReadersStayBounded(t *testing.T) {
	baseG := runtime.NumGoroutine()
	offlinetest.Prepare(t)
	// Stray cleanPieces and AdjustRA goroutines read settings.BTsets; let them
	// exit before Prepare's cleanup restores it.
	t.Cleanup(func() { leakcheck.AssertNoGoroutineLeak(t, baseG) })

	const (
		pieceLen = 16 << 20
		capacity = 64 << 20
		readers  = 2
	)
	settings.BTsets.CacheSize = capacity
	show := offlinetest.WriteSized(t, "big.mkv", 512<<20, pieceLen)
	seed := offlinetest.Seed(t, show)
	bt := NewBTS()
	InitApiHelper(bt)
	if err := bt.Connect(); err != nil {
		t.Fatal(err)
	}
	t.Cleanup(bt.Disconnect)
	tor, err := AddTorrent(show.Spec, "big", "", "", "")
	if err != nil || !tor.GotInfo() {
		t.Fatal("no info", err)
	}
	tor.AddPeers([]torrent.Peer{seed.Peer()})
	file := tor.Files()[0]
	cache := tor.GetCache()
	if cache == nil {
		t.Fatal("no cache")
	}

	// Live partial or complete buffers: GetState reports every piece with bytes.
	live := func() int64 {
		var n int64
		for _, p := range cache.GetState().Pieces {
			if p.Size > 0 {
				n += pieceLen
			}
		}
		return n
	}

	var maxLive atomic.Int64
	stop := make(chan struct{})
	var sampler sync.WaitGroup
	sampler.Add(1)
	go func() {
		defer sampler.Done()
		tick := time.NewTicker(20 * time.Millisecond)
		defer tick.Stop()
		for {
			select {
			case <-stop:
				return
			case <-tick.C:
				if v := live(); v > maxLive.Load() {
					maxLive.Store(v)
				}
			}
		}
	}()

	var seeks atomic.Int64
	var wg sync.WaitGroup
	deadline := time.Now().Add(4 * time.Second)
	for i := 0; i < readers; i++ {
		wg.Add(1)
		go func(seed int64) {
			defer wg.Done()
			r := tor.NewReader(file)
			defer tor.CloseReader(r)
			r.SetResponsive()
			rnd := rand.New(rand.NewSource(seed))
			buf := make([]byte, 256<<10)
			for time.Now().Before(deadline) {
				off := rnd.Int63n(file.Length() - int64(len(buf)))
				if _, err := r.Seek(off, io.SeekStart); err != nil {
					t.Error(err)
					return
				}
				done := make(chan error, 1)
				go func() { _, err := io.ReadFull(r, buf); done <- err }()
				select {
				case err := <-done:
					if err != nil {
						t.Error(err)
						return
					}
				case <-time.After(10 * time.Second):
					t.Errorf("read stalled after %d seeks", seeks.Load())
					return
				}
				seeks.Add(1)
			}
		}(int64(953 + i))
	}
	wg.Wait()
	close(stop)
	sampler.Wait()

	if bad := badHashes(tor); bad != 0 {
		t.Fatalf("%d hash failures", bad)
	}
	if seeks.Load() < 10 {
		t.Fatalf("only %d seeks", seeks.Load())
	}
	// Window rounding: a reader window cut on byte offsets touches two extra
	// pieces. The file ends are kept inside the same slack.
	limit := int64(capacity) + int64(2*readers)*pieceLen
	t.Logf("seeks=%d capacity=%dMiB maxLive=%dMiB limit=%dMiB",
		seeks.Load(), capacity>>20, maxLive.Load()>>20, limit>>20)
	if maxLive.Load() > limit {
		t.Fatalf("live buffers peaked at %d, limit %d", maxLive.Load(), limit)
	}
}

func badHashes(t *Torrent) int64 {
	st := t.Stats()
	return st.PiecesDirtiedBad.Int64()
}
