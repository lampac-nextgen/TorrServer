package tgbot

import "testing"

func TestIsColdEofProbe(t *testing.T) {
	// Loading Media: head on the last piece, cache nearly empty.
	if !isColdEofProbe(10962, 10963, 1<<20, 64<<20) {
		t.Fatal("cold tail should be a probe")
	}
	if isColdEofProbe(100, 10963, 1<<20, 64<<20) {
		t.Fatal("mid-file head is not a probe")
	}
	if isColdEofProbe(18, 20, 0, 64<<20) {
		t.Fatal("short torrents are not probed")
	}
	// Warm cache near EOF is real playback.
	if isColdEofProbe(10900, 10963, 60<<20, 64<<20) {
		t.Fatal("warm tail should follow the playhead")
	}
}
