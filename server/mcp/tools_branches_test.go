package mcp

import (
	"context"
	"crypto/tls"
	"net/http"
	"net/http/httptest"
	"net/url"
	"strings"
	"testing"

	mcpsdk "github.com/modelcontextprotocol/go-sdk/mcp"

	"server/rutor/models"
	set "server/settings"
	"server/torr"
	"server/torr/offlinetest"
)

// connectOffline prepares settings and an offline BTServer.
func connectOffline(t *testing.T) {
	t.Helper()
	offlinetest.Prepare(t)
	bt := torr.NewBTS()
	torr.InitApiHelper(bt)
	if err := bt.Connect(); err != nil {
		t.Fatal(err)
	}
	t.Cleanup(bt.Disconnect)
	t.Cleanup(func() { set.ReadOnly = false })
}

// metaServer serves the generated show's .torrent file.
func metaServer(t *testing.T, show *offlinetest.Show) string {
	t.Helper()
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if err := show.Meta.Write(w); err != nil {
			t.Error(err)
		}
	}))
	t.Cleanup(srv.Close)
	return srv.URL
}

// addShow connects an offline BTServer and adds the generated show through the
// add_torrent tool. It returns the hash.
func addShow(t *testing.T, category string) string {
	t.Helper()
	connectOffline(t)
	show := offlinetest.WriteShow(t)
	_, out, err := addTorrent(context.Background(), nil, addTorrentIn{Link: metaServer(t, show), Title: "My Show", Category: category})
	if err != nil {
		t.Fatal(err)
	}
	if out.Hash != show.Spec.InfoHash.HexString() {
		t.Fatalf("hash %q", out.Hash)
	}
	return out.Hash
}

func wantErr(t *testing.T, err error, text string) {
	t.Helper()
	if err == nil || err.Error() != text {
		t.Fatalf("err = %v, want %q", err, text)
	}
}

func TestStateChangingToolsRefuseInReadOnlyMode(t *testing.T) {
	ctx := context.Background()
	hash := strings.Repeat("ab", 20)
	set.ReadOnly = true
	t.Cleanup(func() { set.ReadOnly = false })
	const ro = "server is in read-only mode"

	_, _, err := addTorrent(ctx, nil, addTorrentIn{Link: hash})
	wantErr(t, err, ro)
	_, _, err = updateTorrent(ctx, nil, updateTorrentIn{Hash: hash})
	wantErr(t, err, ro)
	_, _, err = removeTorrent(ctx, nil, hashIn{Hash: hash})
	wantErr(t, err, ro)
	_, _, err = markViewed(ctx, nil, markViewedIn{Hash: hash, FileIndex: 1})
	wantErr(t, err, ro)
	_, _, err = unmarkViewed(ctx, nil, unmarkViewedIn{Hash: hash})
	wantErr(t, err, ro)

	if _, out, err := getServerInfo(ctx, nil, emptyInput{}); err != nil || !out.ReadOnly {
		t.Fatalf("server info must report read-only: %+v %v", out, err)
	}
}

func TestToolInputValidation(t *testing.T) {
	ctx := context.Background()
	const bad = "invalid torrent hash"
	absent := strings.Repeat("cd", 20)

	_, _, err := updateTorrent(ctx, nil, updateTorrentIn{Hash: "nope"})
	wantErr(t, err, bad)
	_, _, err = removeTorrent(ctx, nil, hashIn{Hash: "nope"})
	wantErr(t, err, bad)
	_, _, err = markViewed(ctx, nil, markViewedIn{Hash: "nope", FileIndex: 1})
	wantErr(t, err, bad)
	_, _, err = markViewed(ctx, nil, markViewedIn{Hash: absent, FileIndex: 0})
	wantErr(t, err, "file_index must be >= 1")
	_, _, err = unmarkViewed(ctx, nil, unmarkViewedIn{Hash: "nope"})
	wantErr(t, err, bad)
	_, _, err = listViewed(ctx, nil, listViewedIn{Hash: "nope"})
	wantErr(t, err, bad)
	_, _, err = getPlayURL(ctx, nil, playURLIn{Hash: "nope"})
	wantErr(t, err, bad)
	_, _, err = addTorrent(ctx, nil, addTorrentIn{Link: "   "})
	wantErr(t, err, "link is empty")

	// Valid hash, nothing in the library.
	connectOffline(t)
	for name, call := range map[string]func() error{
		"update": func() error { _, _, err := updateTorrent(ctx, nil, updateTorrentIn{Hash: absent}); return err },
		"remove": func() error { _, _, err := removeTorrent(ctx, nil, hashIn{Hash: absent}); return err },
		"play":   func() error { _, _, err := getPlayURL(ctx, nil, playURLIn{Hash: absent}); return err },
	} {
		if err := call(); err == nil || err.Error() != "torrent not found" {
			t.Errorf("%s: %v", name, err)
		}
	}

	// Empty library: arrays, never nil (JSON null breaks clients).
	if _, out, err := listTorrents(ctx, nil, listTorrentsIn{}); err != nil || out.Torrents == nil || out.Count != 0 {
		t.Fatalf("empty list: %+v %v", out, err)
	}
	if _, out, err := listViewed(ctx, nil, listViewedIn{}); err != nil || out.Viewed == nil || out.Count != 0 {
		t.Fatalf("empty viewed: %+v %v", out, err)
	}
}

func TestListTorrentsFilters(t *testing.T) {
	ctx := context.Background()
	hash := addShow(t, "Movie")

	cases := []struct {
		name string
		in   listTorrentsIn
		want int
	}{
		{"all", listTorrentsIn{}, 1},
		{"category all", listTorrentsIn{Category: "ALL"}, 1},
		{"category match is case-insensitive", listTorrentsIn{Category: " movie "}, 1},
		{"category mismatch", listTorrentsIn{Category: "tv"}, 0},
		{"uncategorized skips categorized", listTorrentsIn{Category: "uncategorized"}, 0},
		{"title search", listTorrentsIn{Search: "MY sho"}, 1},
		{"search miss", listTorrentsIn{Search: "zzz"}, 0},
	}
	for _, tc := range cases {
		_, out, err := listTorrents(ctx, nil, tc.in)
		if err != nil || out.Count != tc.want || len(out.Torrents) != tc.want || out.Torrents == nil {
			t.Errorf("%s: %+v %v", tc.name, out, err)
		}
	}

	if _, _, err := updateTorrent(ctx, nil, updateTorrentIn{Hash: hash, Category: new(string)}); err != nil {
		t.Fatal(err)
	}
	_, out, _ := listTorrents(ctx, nil, listTorrentsIn{Category: "uncategorized"})
	if out.Count != 1 || out.Torrents[0].Hash != hash {
		t.Fatalf("uncategorized after clearing category: %+v", out)
	}
}

func TestUpdateTorrentAppliesEachField(t *testing.T) {
	ctx := context.Background()
	hash := addShow(t, "tv")

	_, out, err := updateTorrent(ctx, nil, updateTorrentIn{Hash: hash})
	if err != nil || out.Title != "My Show" || out.Category != "tv" {
		t.Fatalf("no-op update changed fields: %+v %v", out, err)
	}
	img := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "image/jpeg")
	}))
	t.Cleanup(img.Close)
	title, poster, cat := "T2", img.URL+"/y.jpg", "movie"
	_, out, err = updateTorrent(ctx, nil, updateTorrentIn{Hash: hash, Title: &title, Poster: &poster, Category: &cat})
	if err != nil || out.Title != title || out.Poster != poster || out.Category != cat {
		t.Fatalf("update: %+v %v", out, err)
	}
	if !strings.HasSuffix(out.PlaylistURL, "/playlist?hash="+hash) {
		t.Fatalf("playlist url %q", out.PlaylistURL)
	}
}

func TestAddTorrentOverridesAndFailure(t *testing.T) {
	hash := addShow(t, "tv")
	ctx := context.Background()

	if _, out, err := getTorrent(ctx, nil, hashIn{Hash: hash}); err != nil || out.Category != "tv" {
		t.Fatalf("add overrides lost: %+v %v", out, err)
	}
	if _, _, err := addTorrent(ctx, nil, addTorrentIn{Link: "ftp://example.com/x.torrent"}); err == nil {
		t.Fatal("unsupported scheme accepted")
	}
}

func TestAddTorrentSaveFalse(t *testing.T) {
	connectOffline(t)
	show := offlinetest.WriteShow(t)

	save := false
	_, out, err := addTorrent(context.Background(), nil, addTorrentIn{Link: metaServer(t, show), Save: &save})
	if err != nil {
		t.Fatal(err)
	}
	if out.Saved || out.Message != "torrent added" {
		t.Fatalf("save=false: saved=%v msg=%q", out.Saved, out.Message)
	}
	if out.Title == "" {
		t.Fatal("EnsureTitle left the title empty")
	}
}

// Both tools are called on an in-memory torrent only: once dropped, any
// GetTorrent reloads the DB row on a background goroutine that outlives the test.
func TestDropTorrentKeepsDBRow(t *testing.T) {
	hash := addShow(t, "tv")

	_, out, err := dropTorrent(context.Background(), nil, hashIn{Hash: hash})
	if err != nil || !out.OK || out.Hash != hash || out.Message != "torrent dropped from memory" {
		t.Fatalf("drop: %+v %v", out, err)
	}
	if rows := set.ListTorrent(); len(rows) != 1 {
		t.Fatalf("drop must keep the DB row, have %d", len(rows))
	}
}

func TestRemoveTorrentDeletesRow(t *testing.T) {
	hash := addShow(t, "tv")
	if rows := set.ListTorrent(); len(rows) != 1 {
		t.Fatalf("setup: %d rows", len(rows))
	}

	_, out, err := removeTorrent(context.Background(), nil, hashIn{Hash: hash})
	if err != nil || !out.OK || out.Hash != hash || out.Message != "torrent removed" {
		t.Fatalf("remove: %+v %v", out, err)
	}
	if rows := set.ListTorrent(); len(rows) != 0 {
		t.Fatalf("row still present after remove: %d", len(rows))
	}
	if _, o, _ := listTorrents(context.Background(), nil, listTorrentsIn{}); o.Count != 0 {
		t.Fatalf("library still lists it: %+v", o)
	}
}

func TestViewedToolsRoundTrip(t *testing.T) {
	ctx := context.Background()
	hash := addShow(t, "tv")
	set.BTsets.TrackTimecode = true // otherwise SetViewed stores 0
	t.Cleanup(func() { set.BTsets.TrackTimecode = false })

	if _, _, err := markViewed(ctx, nil, markViewedIn{Hash: hash, FileIndex: 2, TimeCode: 42}); err != nil {
		t.Fatal(err)
	}
	_, out, err := listViewed(ctx, nil, listViewedIn{Hash: hash})
	if err != nil || out.Count != 1 || out.Viewed[0].FileIndex != 2 || out.Viewed[0].TimeCode != 42 {
		t.Fatalf("list: %+v %v", out, err)
	}
	if _, all, err := listViewed(ctx, nil, listViewedIn{}); err != nil || all.Count != 1 {
		t.Fatalf("list all: %+v %v", all, err)
	}
	_, got, err := getTorrent(ctx, nil, hashIn{Hash: hash})
	if err != nil {
		t.Fatal(err)
	}
	var seen bool
	for _, f := range got.Files {
		if f.ID == 2 {
			seen = f.Viewed && f.TimeCode == 42
		} else if f.Viewed {
			t.Errorf("file %d marked viewed", f.ID)
		}
	}
	if !seen {
		t.Fatal("file 2 not reported viewed with timecode")
	}
	one := 2
	if _, o, err := unmarkViewed(ctx, nil, unmarkViewedIn{Hash: hash, FileIndex: &one}); err != nil || o.Message != "viewed status cleared" {
		t.Fatalf("unmark: %+v %v", o, err)
	}
	if _, o, _ := listViewed(ctx, nil, listViewedIn{Hash: hash}); o.Count != 0 {
		t.Fatalf("still viewed: %+v", o)
	}
}

func TestGetNextUnwatchedDefaultsToTV(t *testing.T) {
	ctx := context.Background()
	hash := addShow(t, "tv")

	_, res, err := getNextUnwatched(ctx, nil, nextUnwatchedIn{})
	if err != nil {
		t.Fatal(err)
	}
	if res.Hash != hash || res.FileIndex < 1 {
		t.Fatalf("no episode picked: %+v", res)
	}
	if !strings.Contains(res.PlayURL, "link="+hash) || !strings.Contains(res.ShortPlayURL, "/play/"+hash+"/") ||
		!strings.HasSuffix(res.PlaylistURL, "hash="+hash) {
		t.Fatalf("urls not filled: %+v", res)
	}
	_, res, err = getNextUnwatched(ctx, nil, nextUnwatchedIn{Category: "music"})
	if err != nil || res.Hash != "" || res.PlayURL != "" {
		t.Fatalf("music: %+v %v", res, err)
	}
}

func TestGetPlayURLShape(t *testing.T) {
	hash := addShow(t, "tv")
	_, out, err := getPlayURL(context.Background(), nil, playURLIn{Hash: hash, FileIndex: 1})
	if err != nil {
		t.Fatal(err)
	}
	if out.Title != "My Show" || out.FilePath == "" ||
		!strings.Contains(out.PlayURL, "/stream/") || !strings.HasSuffix(out.ShortPlayURL, "/play/"+hash+"/1") {
		t.Fatalf("%+v", out)
	}
	_, _, err = getPlayURL(context.Background(), nil, playURLIn{Hash: hash, FileIndex: 99})
	wantErr(t, err, "file index 99 not found")
}

func TestSearchTorrentsGating(t *testing.T) {
	ctx := context.Background()
	offlinetest.Prepare(t)
	origR, origT := rutorSearch, torznabSearch
	t.Cleanup(func() { rutorSearch, torznabSearch = origR, origT })
	var rutorCalls, torznabCalls int
	rutorSearch = func(q string) []*models.TorrentDetails {
		rutorCalls++
		return []*models.TorrentDetails{{Title: "r:" + q}}
	}
	torznabSearch = func(context.Context, string, int, string, int, int) []*models.TorrentDetails {
		torznabCalls++
		return []*models.TorrentDetails{{Title: "t"}}
	}
	set.BTsets.EnableRutorSearch, set.BTsets.EnableTorznabSearch = false, false
	t.Cleanup(func() { set.BTsets.EnableRutorSearch, set.BTsets.EnableTorznabSearch = false, false })

	for _, tc := range []struct{ source, msg string }{
		{"", "search is disabled in settings"},
		{"all", "search is disabled in settings"},
		{"RuTor", "RuTor search is disabled"},
		{"torznab", "Torznab search is disabled"},
	} {
		_, out, err := searchTorrents(ctx, nil, searchTorrentsIn{Query: " q ", Source: tc.source})
		if err != nil || out.Message != tc.msg || out.Results == nil || out.Count != 0 {
			t.Errorf("%q: %+v %v", tc.source, out, err)
		}
	}
	if rutorCalls+torznabCalls != 0 {
		t.Fatalf("disabled indexers were queried: %d %d", rutorCalls, torznabCalls)
	}
	_, _, err := searchTorrents(ctx, nil, searchTorrentsIn{Query: "q", Source: "x"})
	wantErr(t, err, "source must be all, rutor, or torznab")
	_, _, err = searchTorrents(ctx, nil, searchTorrentsIn{Query: "  "})
	wantErr(t, err, "query is required")

	set.BTsets.EnableRutorSearch = true
	_, out, err := searchTorrents(ctx, nil, searchTorrentsIn{Query: " q ", Limit: 500})
	if err != nil || out.Count != 1 || out.Results[0].Title != "r:q" || torznabCalls != 0 {
		t.Fatalf("all/rutor only: %+v %v torznab=%d", out, err, torznabCalls)
	}
	set.BTsets.EnableRutorSearch = false
	set.BTsets.EnableTorznabSearch = true
	_, out, err = searchTorrents(ctx, nil, searchTorrentsIn{Query: "q", Source: "all"})
	if err != nil || out.Count != 1 || out.Results[0].Title != "t" || rutorCalls != 1 {
		t.Fatalf("all/torznab only: %+v %v", out, err)
	}
}

func TestSearchTorrentsLimitClamp(t *testing.T) {
	origR := rutorSearch
	t.Cleanup(func() { rutorSearch = origR })
	rutorSearch = func(string) []*models.TorrentDetails {
		hits := make([]*models.TorrentDetails, 80)
		for i := range hits {
			hits[i] = &models.TorrentDetails{Title: "h"}
		}
		return hits
	}
	offlinetest.Prepare(t)
	set.BTsets.EnableRutorSearch = true
	t.Cleanup(func() { set.BTsets.EnableRutorSearch = false })
	for in, want := range map[int]int{0: 25, -3: 25, 7: 7, 50: 50, 9999: 50} {
		_, out, err := searchTorrents(context.Background(), nil, searchTorrentsIn{Query: "q", Source: "rutor", Limit: in})
		if err != nil || out.Count != want || len(out.Results) != want {
			t.Errorf("limit %d: count=%d want %d (%v)", in, out.Count, want, err)
		}
	}
}

func TestGetPlaylistURLHashBeatsCategory(t *testing.T) {
	_, out, err := getPlaylistURL(context.Background(), nil, playlistURLIn{})
	if err != nil || !strings.HasSuffix(out.PlaylistURL, "/playlistall/all.m3u") {
		t.Fatalf("%+v %v", out, err)
	}
	h := strings.Repeat("ab", 20)
	_, out, _ = getPlaylistURL(context.Background(), nil, playlistURLIn{Hash: h, Category: "tv"})
	if !strings.HasSuffix(out.PlaylistURL, "/playlist?hash="+h) {
		t.Fatalf("%q", out.PlaylistURL)
	}
}

// The enabled branch would bind the real DLNA/SSDP ports, so only the gate is
// covered: with DLNA off nothing may start.
func TestRestartDLNAIsNoopWhenDisabled(t *testing.T) {
	offlinetest.Prepare(t)
	set.BTsets.EnableDLNA = false
	restartDLNA()
	afterRemove(strings.Repeat("ab", 20))
}

func TestRequestFromToolHeaders(t *testing.T) {
	if requestFromTool(nil) != nil {
		t.Fatal("nil request")
	}
	if requestFromTool(&mcpsdk.CallToolRequest{}) != nil {
		t.Fatal("no Extra")
	}
	mk := func(h http.Header) *mcpsdk.CallToolRequest {
		return &mcpsdk.CallToolRequest{Extra: &mcpsdk.RequestExtra{Header: h}}
	}
	if requestFromTool(mk(http.Header{})) != nil {
		t.Fatal("no host headers")
	}
	if got := baseURL(mk(http.Header{"Host": {"tv.local:8090"}})); got != "http://tv.local:8090" {
		t.Fatalf("Host header: %q", got)
	}
	got := baseURL(mk(http.Header{"X-Forwarded-Host": {"ts.example.com, proxy"}, "X-Forwarded-Proto": {"HTTPS, http"}}))
	if got != "https://ts.example.com" {
		t.Fatalf("forwarded: %q", got)
	}
}

func TestSchemeAndFallbackBaseURL(t *testing.T) {
	oldSsl, oldPort, oldSslPort := set.Ssl, set.Port, set.SslPort
	t.Cleanup(func() { set.Ssl, set.Port, set.SslPort = oldSsl, oldPort, oldSslPort })

	set.Ssl, set.Port, set.SslPort = false, "", ""
	if got := fallbackBaseURL(); got != "http://127.0.0.1:"+set.DefaultPort {
		t.Fatalf("default: %q", got)
	}
	set.Port = "9000"
	if got := fallbackBaseURL(); got != "http://127.0.0.1:9000" {
		t.Fatalf("port: %q", got)
	}
	set.Ssl = true
	if got := fallbackBaseURL(); got != "https://127.0.0.1:9000" {
		t.Fatalf("ssl, no ssl port: %q", got)
	}
	set.SslPort = "9443"
	if got := fallbackBaseURL(); got != "https://127.0.0.1:9443" {
		t.Fatalf("ssl port: %q", got)
	}
	if defaultScheme() != "https" || headerScheme(nil) != "https" || headerScheme(http.Header{}) != "https" {
		t.Fatal("ssl default scheme")
	}
	if headerScheme(http.Header{"X-Forwarded-Proto": {"http"}}) != "http" {
		t.Fatal("forwarded proto overrides ssl default")
	}
	if baseURLFromRequest(nil) != "https://127.0.0.1:9443" || baseURLFromRequest(&http.Request{Header: http.Header{}}) != "https://127.0.0.1:9443" {
		t.Fatal("no host falls back")
	}
	if firstCSV(" a , b") != "a" || firstCSV("  b ") != "b" || firstCSV("") != "" {
		t.Fatal("firstCSV")
	}
	set.Ssl = false
	r := &http.Request{Host: "h:1", Header: http.Header{}, TLS: &tls.ConnectionState{}}
	if baseURLFromRequest(r) != "https://h:1" {
		t.Fatal("TLS request must be https")
	}
	r = &http.Request{Host: "h:1", Header: http.Header{}, URL: &url.URL{Scheme: "ftp"}}
	if baseURLFromRequest(r) != "ftp://h:1" {
		t.Fatalf("URL scheme: %q", baseURLFromRequest(r))
	}
}
