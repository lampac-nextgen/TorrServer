package tgbot

import "testing"

func TestIsHashPrefix(t *testing.T) {
	if !isHashPrefix("abcd") || !isHashPrefix("abcdef01") {
		t.Fatal("expected valid prefixes")
	}
	if isHashPrefix("abc") || isHashPrefix("zzzz") || isHashPrefix("") {
		t.Fatal("expected invalid prefixes")
	}
}
