package torrstor

import (
	"testing"

	"server/settings"
)

func newPartialRAMCache(t *testing.T, capacity, pieceLen int64, pieces int) *Cache {
	t.Helper()
	prev := settings.BTsets
	settings.BTsets = &settings.BTSets{UseDisk: false}
	t.Cleanup(func() { settings.BTsets = prev })

	c := NewCache(capacity, nil)
	c.pieceLength = pieceLen
	c.pieceCount = pieces
	for i := 0; i < pieces; i++ {
		p := &Piece{Id: i, cache: c}
		p.mPiece = NewMemPiece(p)
		c.pieces[i] = p
	}
	t.Cleanup(func() {
		for _, p := range c.pieces {
			p.mPiece.Release()
		}
	})
	return c
}

// writePartial gives piece id a full-length buffer holding n received bytes,
// the state MemPiece.WriteAt leaves after the first chunk. It sets the state
// directly: WriteAt also spawns a cleanPieces goroutine that would outlive
// the test and race the package globals the next test swaps.
func writePartial(c *Cache, id int, n int64) {
	p := c.pieces[id]
	p.mPiece.mu.Lock()
	p.mPiece.buffer, p.mPiece.slab = getPieceBuf(int(c.pieceLength))
	p.Size = n
	p.mPiece.mu.Unlock()
	c.notePieceFilled(id)
}

func liveBufferBytes(c *Cache) (total int64) {
	for _, p := range c.pieces {
		p.mPiece.mu.RLock()
		total += int64(cap(p.mPiece.buffer))
		p.mPiece.mu.RUnlock()
	}
	return total
}

// A whole piece is allocated on the first chunk. The eviction input must
// charge that allocation, not the bytes received (YouROK/TorrServer#953).
func TestPartialPieceRAMAccounting(t *testing.T) {
	const chunk = 16 << 10
	c := newPartialRAMCache(t, 96<<20, 8<<20, 128)
	for id := range c.pieces {
		writePartial(c, id, chunk)
	}
	c.getRemPieces()

	allocated := liveBufferBytes(c)
	if filled := c.filled.Load(); filled < allocated {
		t.Fatalf("eviction accounts for %d bytes, RAM buffers hold %d", filled, allocated)
	}
	// GetState keeps reporting the downloaded bytes, not the allocation, and
	// must not lower the eviction input.
	st := c.GetState()
	if want := int64(len(c.pieces)) * chunk; st.Filled != want {
		t.Fatalf("state Filled %d, want downloaded bytes %d", st.Filled, want)
	}
	if filled := c.filled.Load(); filled < allocated {
		t.Fatalf("GetState lowered the eviction input to %d (allocated %d)", filled, allocated)
	}
}

// Partial pieces outside any reader range must be evicted once their
// allocations pass the capacity.
func TestPartialPieceRAMEvictsToCapacity(t *testing.T) {
	const pieceLen = 1 << 20
	c := newPartialRAMCache(t, 8<<20, pieceLen, 64)
	// Stay clear of the start/end keep window.
	for id := 16; id < 48; id++ {
		writePartial(c, id, 16<<10)
	}
	c.cleanPieces()
	if live := liveBufferBytes(c); live > c.capacity {
		t.Fatalf("live piece buffers %d over capacity %d", live, c.capacity)
	}
}
