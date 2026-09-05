package tgbot

import (
	"strings"
	"testing"

	"server/library"

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

func TestShortPlayURLFitsCopyLimit(t *testing.T) {
	hash := strings.Repeat("a", 40)
	u := library.ShortPlayURL("http://192.168.1.10:8090", hash, 12)
	if len([]rune(u)) > 256 {
		t.Fatalf("short play URL too long for copy_text: %d %q", len([]rune(u)), u)
	}
	m := &tele.ReplyMarkup{}
	if _, ok := copyTextBtn(m, "Copy play", u); !ok {
		t.Fatal("short play URL should copy")
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

func TestTorrentStartPrefix(t *testing.T) {
	if torrentStartPrefix("ABCDEF012345") != "abcdef01" {
		t.Fatalf("got %q", torrentStartPrefix("ABCDEF012345"))
	}
	if torrentStartPrefix("abcd") != "abcd" {
		t.Fatalf("short got %q", torrentStartPrefix("abcd"))
	}
	if torrentStartPrefix("") != "" {
		t.Fatal("empty")
	}
}

func TestTorrentStartURL(t *testing.T) {
	prev := botUsername
	botUsername = "TorrBot"
	t.Cleanup(func() { botUsername = prev })

	got := torrentStartURL("ABCDEF0123456789")
	want := "https://t.me/TorrBot?start=t_abcdef01"
	if got != want {
		t.Fatalf("got %q want %q", got, want)
	}

	botUsername = ""
	if torrentStartURL("abcdef0123456789") != "" {
		t.Fatal("empty username should skip t.me URL")
	}
}

func markupHasHTTPURLButton(m *tele.ReplyMarkup) bool {
	if m == nil {
		return false
	}
	for _, row := range m.InlineKeyboard {
		for _, btn := range row {
			u := strings.ToLower(btn.URL)
			if strings.HasPrefix(u, "http://") || strings.HasPrefix(u, "https://") {
				return true
			}
		}
	}
	return false
}

func markupCopyTexts(m *tele.ReplyMarkup) []string {
	var out []string
	if m == nil {
		return out
	}
	for _, row := range m.InlineKeyboard {
		for _, btn := range row {
			if btn.CopyText != nil {
				out = append(out, btn.CopyText.Text)
			}
		}
	}
	return out
}

func TestFileListActionRowCopiesPlayNotURL(t *testing.T) {
	m := &tele.ReplyMarkup{}
	short := "http://192.168.1.10:8090/play/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/2"
	row := fileListActionRow(m, 1, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "2", "#2 file", short)
	m.Inline(row)
	if markupHasHTTPURLButton(m) {
		t.Fatal("file row must not use a URL button")
	}
	copies := markupCopyTexts(m)
	if len(copies) != 1 || copies[0] != short {
		t.Fatalf("copy texts=%v", copies)
	}
}

func TestNextResultMarkupCopiesPlayNotURL(t *testing.T) {
	short := "http://h:8090/play/abcd/3"
	m := nextResultMarkup(1, "abcdabcdabcdabcdabcdabcdabcdabcdabcdabcd", short, 3)
	if markupHasHTTPURLButton(m) {
		t.Fatal("next markup must not use a URL button")
	}
	copies := markupCopyTexts(m)
	if len(copies) != 1 || copies[0] != short {
		t.Fatalf("copy texts=%v", copies)
	}
}

func TestPlaylistCopyMarkup(t *testing.T) {
	url := "http://h:8090/playlist?hash=abcd"
	m := playlistCopyMarkup(1, url)
	if markupHasHTTPURLButton(m) {
		t.Fatal("m3u markup must not use a URL button")
	}
	copies := markupCopyTexts(m)
	if len(copies) != 1 || copies[0] != url {
		t.Fatalf("copy texts=%v", copies)
	}
}

func TestInlineLibraryArticleDeepLink(t *testing.T) {
	prev := botUsername
	botUsername = "TorrBot"
	t.Cleanup(func() { botUsername = prev })

	hash := "abcdef0123456789abcdef0123456789abcdef01"
	item := inlineLibraryArticle("l0", hash, "Show", "")
	if item == nil {
		t.Fatal("nil article")
	}
	if strings.Contains(item.URL, "/play/") || strings.Contains(item.URL, "/stream/") {
		t.Fatalf("URL must not be a stream: %q", item.URL)
	}
	if strings.Contains(item.Text, "/play/") || strings.Contains(item.Text, "/stream/") {
		t.Fatalf("Text must not be a stream: %q", item.Text)
	}
	want := "https://t.me/TorrBot?start=t_abcdef01"
	if item.URL != want {
		t.Fatalf("URL=%q want %q", item.URL, want)
	}
	if !strings.Contains(item.Text, want) {
		t.Fatalf("Text=%q missing deep link", item.Text)
	}
}

func TestInlineLibraryArticleNoUsername(t *testing.T) {
	prev := botUsername
	botUsername = ""
	t.Cleanup(func() { botUsername = prev })

	item := inlineLibraryArticle("l0", "abcdef0123456789", "Show", "")
	if item.URL != "" {
		t.Fatalf("expected empty URL, got %q", item.URL)
	}
	if strings.Contains(item.Text, "/play/") || strings.Contains(item.Text, "t.me/") {
		t.Fatalf("Text=%q", item.Text)
	}
}

func TestFileListPlayLine(t *testing.T) {
	got := fileListPlayLine(2, "Show.mkv", "http://h/play/ab/2")
	if !strings.Contains(got, "#2 — Show.mkv") || !strings.Contains(got, "<code>http://h/play/ab/2</code>") {
		t.Fatalf("got %q", got)
	}
}
