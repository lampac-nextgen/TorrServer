package torrstor

import "testing"

func TestGetStateSkipsUnusedReaders(t *testing.T) {
	c := &Cache{
		pieces:       make(map[int]*Piece),
		activePieces: make(map[int]struct{}),
		readers:      make(map[*Reader]struct{}),
		pieceCount:   10,
		pieceLength:  1024,
		capacity:     10 * 1024,
	}
	// Unused reader must not appear in GetState (no torrent.File needed — skipped before range calc).
	unused := &Reader{isUse: false, cache: c}
	c.readers[unused] = struct{}{}

	st := c.GetState()
	if len(st.Readers) != 0 {
		t.Fatalf("expected unused readers omitted, got %d", len(st.Readers))
	}
}

func TestInRangesInclusiveEnd(t *testing.T) {
	ranges := []Range{{Start: 2, End: 4}}
	if !inRanges(ranges, 2) || !inRanges(ranges, 4) {
		t.Fatalf("expected Start and End inclusive")
	}
	if inRanges(ranges, 1) || inRanges(ranges, 5) {
		t.Fatalf("expected outside range to be false")
	}
}

func TestNotePieceActiveTracking(t *testing.T) {
	c := &Cache{
		pieces:       make(map[int]*Piece),
		activePieces: make(map[int]struct{}),
		pieceCount:   10,
	}
	c.pieces[3] = &Piece{Id: 3, Size: 100, cache: c}
	c.pieces[7] = &Piece{Id: 7, Size: 0, cache: c}

	c.notePieceFilled(3)
	c.notePieceFilled(7)
	c.notePieceEmpty(7)

	c.muActive.Lock()
	_, ok3 := c.activePieces[3]
	_, ok7 := c.activePieces[7]
	c.muActive.Unlock()
	if !ok3 {
		t.Fatal("expected piece 3 active")
	}
	if ok7 {
		t.Fatal("expected piece 7 inactive")
	}
}

func TestPieceByteLengthLastPiece(t *testing.T) {
	c := &Cache{
		pieces:       make(map[int]*Piece),
		activePieces: make(map[int]struct{}),
		pieceCount:   3,
		pieceLength:  1000,
		totalLength:  2500, // last piece = 500
		capacity:     3000,
	}
	if got := c.pieceByteLength(0); got != 1000 {
		t.Fatalf("piece 0: want 1000, got %d", got)
	}
	if got := c.pieceByteLength(2); got != 500 {
		t.Fatalf("last piece: want 500, got %d", got)
	}

	c.pieces[2] = &Piece{Id: 2, Size: 500, Complete: false, cache: c}
	c.notePieceFilled(2)
	st := c.GetState()
	item := st.Pieces[2]
	if item.Length != 500 {
		t.Fatalf("GetState Length: want 500, got %d", item.Length)
	}
	if !item.Completed {
		t.Fatal("expected Completed when Size >= last-piece Length")
	}
}
