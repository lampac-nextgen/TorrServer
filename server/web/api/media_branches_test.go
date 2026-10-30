package api

import (
	"bytes"
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"runtime"
	"strconv"
	"strings"
	"testing"
	"time"

	"github.com/anacrolix/torrent"
	"github.com/anacrolix/torrent/bencode"
	"github.com/anacrolix/torrent/metainfo"
	"github.com/gin-gonic/gin"

	"server/ffprobe"
	"server/torr"
	"server/torr/offlinetest"
	"server/torr/state"
)

// mediaShow builds a torrent from relative paths and contents. Piece hashes are
// real so the loopback seeder serves it.
func mediaShow(t *testing.T, files map[string][]byte) *offlinetest.Show {
	t.Helper()
	root := filepath.Join(t.TempDir(), "Pack")
	for rel, data := range files {
		p := filepath.Join(root, filepath.FromSlash(rel))
		if err := os.MkdirAll(filepath.Dir(p), 0o755); err != nil {
			t.Fatal(err)
		}
		if err := os.WriteFile(p, data, 0o644); err != nil {
			t.Fatal(err)
		}
	}
	info := metainfo.Info{PieceLength: 16 * 1024}
	if err := info.BuildFromFilePath(root); err != nil {
		t.Fatal(err)
	}
	var raw bytes.Buffer
	for _, fi := range info.UpvertedFiles() {
		b, err := os.ReadFile(filepath.Join(root, filepath.Join(fi.Path...)))
		if err != nil {
			t.Fatal(err)
		}
		raw.Write(b)
	}
	mi := &metainfo.MetaInfo{InfoBytes: bencode.MustMarshal(info)}
	return &offlinetest.Show{Meta: mi, Spec: torrent.TorrentSpecFromMetaInfo(mi), Data: raw.Bytes()}
}

// mediaEnv connects an offline client, adds show and returns a router with the
// media handlers. Call it before mockProbe: Prepare points ffprobe at a missing binary.
func mediaEnv(t *testing.T, show *offlinetest.Show) (*gin.Engine, *torr.Torrent) {
	t.Helper()
	gin.SetMode(gin.TestMode)
	offlinetest.Prepare(t)
	bt := torr.NewBTS()
	torr.InitApiHelper(bt)
	if err := bt.Connect(); err != nil {
		t.Fatal(err)
	}
	t.Cleanup(bt.Disconnect)
	seed := offlinetest.Seed(t, show)
	tor, err := torr.AddTorrent(show.Spec, "Pack", "", "", "tv")
	if err != nil || !tor.GotInfo() {
		t.Fatalf("AddTorrent: %v", err)
	}
	tor.AddPeers([]torrent.Peer{seed.Peer()})

	r := gin.New()
	r.GET("/play/:hash/:id", play)
	r.GET("/subs/:hash/:id", subsTracks)
	r.GET("/ffp/:hash/:id", ffp)
	return r, tor
}

func get(r http.Handler, path string) *httptest.ResponseRecorder {
	w := httptest.NewRecorder()
	r.ServeHTTP(w, httptest.NewRequest(http.MethodGet, path, nil))
	return w
}

// settleReload waits for the background reload that GetTorrent starts for a DB-only
// row, so it cannot read settings after the test restored them.
func settleReload(t *testing.T, hash string) {
	t.Helper()
	deadline := time.Now().Add(10 * time.Second)
	for {
		if tor := torr.GetTorrent(hash); tor != nil && tor.Status().Stat == state.TorrentWorking {
			break
		}
		if time.Now().After(deadline) {
			t.Fatal("reloaded torrent never became active")
		}
		time.Sleep(10 * time.Millisecond)
	}
	time.Sleep(100 * time.Millisecond)
}

func fileID(t *testing.T, tor *torr.Torrent, suffix string) int {
	t.Helper()
	for _, f := range tor.Status().FileStats {
		if strings.HasSuffix(f.Path, suffix) {
			return f.Id
		}
	}
	t.Fatalf("no file %q", suffix)
	return 0
}

func mockProbe(t *testing.T, script string) {
	t.Helper()
	if runtime.GOOS == "windows" {
		t.Skip("ffprobe mock is a shell script")
	}
	path := filepath.Join(t.TempDir(), "ffprobe")
	if err := os.WriteFile(path, []byte(script), 0o755); err != nil {
		t.Fatal(err)
	}
	t.Cleanup(ffprobe.SetBinPath(path))
}

// Handlers reached with empty path params: a route that matched with blanks
// must still answer 404 rather than an empty 200.
func TestMediaHandlersRefuseEmptyParams(t *testing.T) {
	gin.SetMode(gin.TestMode)
	for name, h := range map[string]gin.HandlerFunc{"play": play, "subs": subsTracks, "ffp": ffp} {
		w := httptest.NewRecorder()
		c, _ := gin.CreateTestContext(w)
		c.Request = httptest.NewRequest(http.MethodGet, "/x", nil)
		h(c)
		if w.Code != http.StatusNotFound {
			t.Errorf("%s: %d, want 404", name, w.Code)
		}
	}
}

func TestFFPStatuses(t *testing.T) {
	r, tor := mediaEnv(t, offlinetest.WriteShow(t))
	hash := tor.Hash().HexString()
	path := "/ffp/" + hash + "/1"

	if w := get(r, path); w.Code != http.StatusNotFound || !strings.Contains(w.Body.String(), "ffprobe binary not found") {
		t.Fatalf("no binary: %d %s", w.Code, w.Body)
	}

	t.Run("probe data", func(t *testing.T) {
		mockProbe(t, "#!/bin/sh\nprintf '%s' '{\"format\":{\"duration\":\"2.5\",\"bit_rate\":\"900\"}}'\n")
		w := get(r, path)
		if w.Code != http.StatusOK {
			t.Fatalf("%d %s", w.Code, w.Body)
		}
		var body struct {
			Format struct {
				BitRate string `json:"bit_rate"`
			} `json:"format"`
		}
		if err := json.Unmarshal(w.Body.Bytes(), &body); err != nil || body.Format.BitRate != "900" {
			t.Fatalf("body %s err %v", w.Body, err)
		}
	})

	t.Run("probe fails", func(t *testing.T) {
		mockProbe(t, "#!/bin/sh\nexit 3\n")
		w := get(r, path)
		if w.Code != http.StatusBadRequest || !strings.Contains(w.Body.String(), "error getting data") {
			t.Fatalf("%d %s", w.Code, w.Body)
		}
	})

	t.Run("client gone and deadline", func(t *testing.T) {
		mockProbe(t, "#!/bin/sh\nexit 0\n")
		canceled, cancel := context.WithCancel(context.Background())
		cancel()
		expired, cancelExp := context.WithDeadline(context.Background(), time.Now().Add(-time.Second))
		defer cancelExp()
		for name, tc := range map[string]struct {
			ctx  context.Context
			want int
		}{
			"canceled": {canceled, http.StatusRequestTimeout},
			"deadline": {expired, http.StatusGatewayTimeout},
		} {
			w := httptest.NewRecorder()
			r.ServeHTTP(w, httptest.NewRequest(http.MethodGet, path, nil).WithContext(tc.ctx))
			if w.Code != tc.want {
				t.Errorf("%s: %d, want %d (%s)", name, w.Code, tc.want, w.Body)
			}
		}
	})
}

func TestPlayBranches(t *testing.T) {
	// One file: any index plays it.
	show := mediaShow(t, map[string][]byte{"movie.mkv": bytes.Repeat([]byte("Z"), 40<<10)})
	r, tor := mediaEnv(t, show)
	hash := tor.Hash().HexString()

	w := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodGet, "/play/"+hash+"/not-a-number", nil)
	req.Header.Set("Range", "bytes=0-15")
	r.ServeHTTP(w, req)
	if w.Code != http.StatusPartialContent || w.Body.Len() != 16 {
		t.Fatalf("single file: %d len %d", w.Code, w.Body.Len())
	}
}

const subtitleSRT = "1\n00:00:01,000 --> 00:00:02,000\nHello\n"

func TestSubsBranches(t *testing.T) {
	show := mediaShow(t, map[string][]byte{
		"Movie.2020.mkv":     bytes.Repeat([]byte("V"), 20<<10),
		"Movie.2020.en.srt":  []byte(subtitleSRT),
		"Movie.2020.ru.srt":  []byte("1\n00:00:01,000 --> 00:00:02,000\nПривет\n"),
		"Movie.2020.bad.ass": []byte("not an ass file at all\n"),
		"notes.txt":          []byte("hello"),
	})
	r, tor := mediaEnv(t, show)
	hash := tor.Hash().HexString()
	vid := fileID(t, tor, "Movie.2020.mkv")
	base := "/subs/" + hash + "/" + strconv.Itoa(vid)

	var tracks []struct {
		FileIndex int    `json:"index"`
		URL       string `json:"url"`
		Name      string `json:"name"`
	}
	w := get(r, base)
	if w.Code != http.StatusOK {
		t.Fatalf("list: %d %s", w.Code, w.Body)
	}
	if err := json.Unmarshal(w.Body.Bytes(), &tracks); err != nil {
		t.Fatalf("list json: %v %s", err, w.Body)
	}
	trackFor := func(suffix string) int {
		t.Helper()
		for _, tr := range tracks {
			if strings.HasSuffix(tr.Name, suffix) || strings.Contains(tr.URL, "track="+strconv.Itoa(fileID(t, tor, suffix))) {
				return fileID(t, tor, suffix)
			}
		}
		t.Fatalf("no track for %s in %s", suffix, w.Body)
		return 0
	}
	en, ru := trackFor("Movie.2020.en.srt"), trackFor("Movie.2020.ru.srt")
	one := func(id int, q string) *httptest.ResponseRecorder {
		return get(r, base+"?track="+strconv.Itoa(id)+q)
	}

	t.Run("vtt", func(t *testing.T) {
		w := one(en, "")
		if w.Code != http.StatusOK || !strings.HasPrefix(w.Body.String(), "WEBVTT") ||
			!strings.HasPrefix(w.Header().Get("Content-Type"), "text/vtt") {
			t.Fatalf("%d %q %s", w.Code, w.Header().Get("Content-Type"), w.Body)
		}
	})
	t.Run("original in cp1251", func(t *testing.T) {
		w := one(ru, "&format=original&encoding=cp1251")
		if w.Code != http.StatusOK || !strings.HasPrefix(w.Header().Get("Content-Type"), "text/plain") ||
			!strings.Contains(w.Header().Get("Content-Type"), "windows-1251") {
			t.Fatalf("%d %q", w.Code, w.Header().Get("Content-Type"))
		}
		if bytes.Contains(w.Body.Bytes(), []byte("Привет")) {
			t.Fatal("body is still UTF-8")
		}
	})
	t.Run("refusals", func(t *testing.T) {
		cases := []struct {
			name string
			path string
			want int
		}{
			{"track is not a number", base + "?track=x", http.StatusBadRequest},
			{"unknown track", base + "?track=999", http.StatusNotFound},
			{"video index missing", "/subs/" + hash + "/999", http.StatusNotFound},
			{"file is not a video", "/subs/" + hash + "/" + strconv.Itoa(fileID(t, tor, "notes.txt")), http.StatusBadRequest},
			{"bad format", base + "?track=" + strconv.Itoa(en) + "&format=ass", http.StatusBadRequest},
			{"bad encoding", base + "?track=" + strconv.Itoa(en) + "&encoding=koi8", http.StatusBadRequest},
		}
		for _, tc := range cases {
			if w := get(r, tc.path); w.Code != tc.want {
				t.Errorf("%s: %d, want %d (%s)", tc.name, w.Code, tc.want, w.Body)
			}
		}
	})
	t.Run("unconvertible track", func(t *testing.T) {
		for _, tr := range tracks {
			if strings.Contains(tr.Name, "bad") {
				if w := one(tr.FileIndex, ""); w.Code != http.StatusUnprocessableEntity {
					t.Fatalf("%d %s", w.Code, w.Body)
				}
				return
			}
		}
		t.Skip("matcher did not offer the .ass track")
	})
	t.Run("dropped torrent is loaded again", func(t *testing.T) {
		torr.SaveTorrentToDB(tor)
		torr.DropTorrent(hash)
		if w := get(r, base); w.Code != http.StatusOK {
			t.Fatalf("%d %s", w.Code, w.Body)
		}
		settleReload(t, hash)
	})
}
