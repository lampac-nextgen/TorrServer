package torr

import (
	"encoding/base32"
	"testing"
)

// The base32 btih of a magnet link and the hex form of the same 20 bytes are one torrent.
func TestParseHashAcceptsBase32(t *testing.T) {
	raw := []byte{0xde, 0xad, 0xbe, 0xef, 0x00, 0x11, 0x22, 0x33, 0x44, 0x55,
		0x66, 0x77, 0x88, 0x99, 0xaa, 0xbb, 0xcc, 0xdd, 0xee, 0xff}
	const want = "deadbeef00112233445566778899aabbccddeeff"

	fromHex, ok := parseHash(want)
	if !ok || fromHex.HexString() != want {
		t.Fatalf("hex: got %q ok=%v", fromHex.HexString(), ok)
	}
	b32 := base32.StdEncoding.EncodeToString(raw)
	if len(b32) != 32 {
		t.Fatalf("base32 length %d", len(b32))
	}
	fromB32, ok := parseHash(b32)
	if !ok || fromB32 != fromHex {
		t.Fatalf("base32: got %q ok=%v, want %q", fromB32.HexString(), ok, want)
	}
}

func TestParseHashRejectsGarbage(t *testing.T) {
	for _, h := range []string{"", "abc", "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz", "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
		"0000000000000000000000000000000000000000!", "0123456789abcdef0123456789abcdef0123456",
		"gggggggggggggggggggggggggggggggggggggggg"} {
		if _, ok := parseHash(h); ok {
			t.Errorf("parseHash(%q) accepted", h)
		}
	}
}
