package tgbot

import (
	"strings"
	"testing"

	tele "gopkg.in/telebot.v4"
)

func TestCopyTextBtnRejectsLong(t *testing.T) {
	m := &tele.ReplyMarkup{}
	if _, ok := copyTextBtn(m, "x", ""); ok {
		t.Fatal("empty text")
	}
	long := strings.Repeat("a", 257)
	if _, ok := copyTextBtn(m, "x", long); ok {
		t.Fatal("over 256 runes")
	}
	if _, ok := copyTextBtn(m, "x", "abcd"); !ok {
		t.Fatal("short text should copy")
	}
}

func TestMagnetForHash(t *testing.T) {
	if magnetForHash("abc") != "magnet:?xt=urn:btih:abc" {
		t.Fatal(magnetForHash("abc"))
	}
	if magnetForHash("") != "" {
		t.Fatal("empty")
	}
}

func TestIsPosterURL(t *testing.T) {
	if !isPosterURL("https://x/p.jpg") || !isPosterURL("http://x") {
		t.Fatal("expected http(s)")
	}
	if isPosterURL("/local") || isPosterURL("") {
		t.Fatal("expected reject")
	}
}
