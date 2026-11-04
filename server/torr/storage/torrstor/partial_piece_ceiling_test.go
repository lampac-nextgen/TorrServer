package torrstor

import (
	"fmt"
	"math/rand"
	"testing"
	"time"
)

// liveSplit returns allocated bytes split into pieces eviction may not touch
// (reader ranges, keep window) and the rest. It uses the same predicates as
// getRemPieces, so a failure means eviction left an evictable piece behind.
func liveSplit(c *Cache) (protected, evictable int64) {
	var ranges []Range
	for r := range c.readers {
		if r.using() && !r.closed() {
			ranges = append(ranges, r.getPiecesRange())
		}
	}
	ranges = mergeRange(ranges)
	for id, p := range c.pieces {
		p.mPiece.mu.RLock()
		n := int64(cap(p.mPiece.buffer))
		p.mPiece.mu.RUnlock()
		if n == 0 {
			continue
		}
		if inRanges(ranges, id) || c.isIdInKeepWindow(id, ranges) {
			protected += n
		} else {
			evictable += n
		}
	}
	return protected, evictable
}

// With 16MiB pieces a few partial pieces are a large part of the budget. After
// eviction settles, the pieces eviction may drop must fit what the protected
// ones leave of the capacity, and the total must stay within capacity plus the
// rounding of the reader windows to whole pieces.
func TestPartialRAMCeilingBigPieces(t *testing.T) {
	const (
		pieceLen   = 16 << 20
		pieceCount = 256
		partial    = 16 << 10
	)
	for _, capMiB := range []int64{64, 128} {
		for _, readers := range []int{1, 2, 3} {
			t.Run(fmt.Sprintf("cap%dMiB/readers%d", capMiB, readers), func(t *testing.T) {
				capacity := capMiB << 20
				c := newPartialRAMCache(t, capacity, pieceLen, pieceCount)
				rnd := rand.New(rand.NewSource(953 + capMiB + int64(readers)))

				total := int64(pieceCount) * pieceLen
				for i := 0; i < readers; i++ {
					r := &Reader{
						cache:       c,
						isUse:       true,
						overrideLen: total,
						offset:      rnd.Int63n(total - pieceLen),
						lastAccess:  time.Now().Unix(),
					}
					c.readers[r] = struct{}{}
				}
				// 40% of the torrent holds a partial piece, in and outside the windows.
				for id := 0; id < pieceCount; id++ {
					if rnd.Intn(100) < 40 {
						writePartial(c, id, partial)
					}
				}
				before := liveBufferBytes(c)
				if before <= capacity {
					t.Fatalf("setup too small: %d live bytes for capacity %d", before, capacity)
				}

				for pass := 0; pass < 100; pass++ {
					prev := liveBufferBytes(c)
					c.cleanPieces()
					if liveBufferBytes(c) == prev {
						break
					}
				}

				live := liveBufferBytes(c)
				protected, evictable := liveSplit(c)
				if limit := max(0, capacity-protected) + pieceLen; evictable > limit {
					t.Fatalf("evictable pieces hold %d bytes, limit %d (capacity %d, protected %d)",
						evictable, limit, capacity, protected)
				}
				// Each reader window is cut on byte offsets, so it can touch two more pieces.
				if limit := capacity + int64(2*readers+2)*pieceLen; live > limit {
					t.Fatalf("live %d over capacity %d + window rounding (limit %d)", live, capacity, limit)
				}
				t.Logf("readers=%d capacity=%dMiB before=%dMiB after=%dMiB protected=%dMiB evictable=%dMiB",
					readers, capMiB, before>>20, live>>20, protected>>20, evictable>>20)
			})
		}
	}
}
