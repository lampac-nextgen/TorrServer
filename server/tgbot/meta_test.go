package tgbot

import "testing"

func TestMergeTorrentMetaPreservesPosterAndCategory(t *testing.T) {
	cur := torrentMeta{Title: "Old", Poster: "http://p", Category: "tv", Data: `{"k":1}`}
	title := "New"
	got := mergeTorrentMeta(cur, &title, nil, nil)
	if got.Title != "New" || got.Poster != "http://p" || got.Category != "tv" || got.Data != `{"k":1}` {
		t.Fatalf("got %+v", got)
	}
}

func TestMergeTorrentMetaClearsCategoryWhenSetEmpty(t *testing.T) {
	cur := torrentMeta{Title: "T", Category: "tv"}
	empty := ""
	got := mergeTorrentMeta(cur, nil, nil, &empty)
	if got.Category != "" || got.Title != "T" {
		t.Fatalf("got %+v", got)
	}
}
