package library

import (
	"testing"

	"server/torr/state"
)

func TestPlayURL(t *testing.T) {
	u := PlayURL("http://127.0.0.1:8090", "abc", "Season 1/Show.S01E01.mkv", 3)
	want := "http://127.0.0.1:8090/stream/Show.S01E01.mkv?link=abc&index=3&play"
	if u != want {
		t.Fatalf("PlayURL=%q want %q", u, want)
	}
}

func TestShortPlayURL(t *testing.T) {
	u := ShortPlayURL("http://192.168.1.10:8090", "deadbeef", 2)
	want := "http://192.168.1.10:8090/play/deadbeef/2"
	if u != want {
		t.Fatalf("ShortPlayURL=%q want %q", u, want)
	}
}

func TestPlaylistURL(t *testing.T) {
	all := PlaylistURL("http://host:8090", "")
	if all != "http://host:8090/playlistall/all.m3u" {
		t.Fatalf("all playlist=%q", all)
	}
	one := PlaylistURL("http://host:8090", "abcd")
	if one != "http://host:8090/playlist?hash=abcd" {
		t.Fatalf("one playlist=%q", one)
	}
}

func TestPlaylistAllURL(t *testing.T) {
	u := PlaylistAllURL("http://host:8090", "tv")
	if u != "http://host:8090/playlistall/all.m3u?category=tv" {
		t.Fatalf("got %q", u)
	}
}

func TestFormatEpisodeCode(t *testing.T) {
	if got := FormatEpisodeCode(1, 5); got != "S01E05" {
		t.Fatalf("got %q", got)
	}
	if got := FormatEpisodeCode(0, 3); got != "E03" {
		t.Fatalf("got %q", got)
	}
	if got := FormatEpisodeCode(2, 0); got != "S02" {
		t.Fatalf("got %q", got)
	}
	if got := FormatEpisodeCode(0, 0); got != "" {
		t.Fatalf("got %q", got)
	}
}

func TestFilePlayURLs(t *testing.T) {
	st := &state.TorrentStatus{Hash: "hashhash"}
	f := &state.TorrentFileStat{Id: 1, Path: "a.mkv"}
	play, short := FilePlayURLs("http://h", st, f)
	if play == "" || short == "" {
		t.Fatalf("empty urls play=%q short=%q", play, short)
	}
}

func TestNormalizeCategory(t *testing.T) {
	if NormalizeCategory("Movies") != "movie" {
		t.Fatal("movies")
	}
	if NormalizeCategory("series") != "tv" {
		t.Fatal("series")
	}
	if !MatchCategory("", "uncategorized") || MatchCategory("tv", "uncategorized") {
		t.Fatal("uncategorized match")
	}
	if !MatchCategory("tv", "all") || !MatchCategory("tv", "") {
		t.Fatal("all match")
	}
}
