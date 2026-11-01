//go:build e2eseed

// Command e2e-seed seeds synthetic torrents on loopback for the Playwright
// real-server suite. It is excluded from every default build and test run;
// build it with: go build -tags e2eseed ./torr/offlinetest/e2e-seed
//
// It writes the content tree and .torrent files under -dir, a manifest.json
// next to them, then keeps dialling -peer (the TorrServer peer listen
// address) until killed.
package main

import (
	"bytes"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"math/rand"
	"net"
	"os"
	"os/signal"
	"path/filepath"
	"strconv"
	"time"

	"github.com/anacrolix/torrent"
	"github.com/anacrolix/torrent/bencode"
	"github.com/anacrolix/torrent/metainfo"

	"server/torr/offlinetest"
)

type fileEntry struct {
	Path   string `json:"path"`
	Size   int64  `json:"size"`
	SHA256 string `json:"sha256"`
}

type entry struct {
	Profile string      `json:"profile"`
	Name    string      `json:"name"`
	Hash    string      `json:"hash"`
	Torrent string      `json:"torrent"`
	Files   []fileEntry `json:"files"`
}

// pseudo returns deterministic non-repeating bytes so a Range mixup is visible.
func pseudo(seed int64, n int) []byte {
	b := make([]byte, n)
	rand.New(rand.NewSource(seed)).Read(b)
	return b
}

func main() {
	dir := flag.String("dir", "", "output directory")
	peer := flag.String("peer", "", "TorrServer peer address host:port")
	video := flag.String("video", "", "optional mp4 to include as Video/clip.mp4")
	flag.Parse()
	if *dir == "" || *peer == "" {
		log.Fatal("-dir and -peer are required")
	}
	host, portS, err := net.SplitHostPort(*peer)
	if err != nil {
		log.Fatal(err)
	}
	port, _ := strconv.Atoi(portS)
	target := torrent.Peer{IP: net.ParseIP(host), Port: port}

	profiles := map[string]map[string][]byte{
		"show": {
			"Season 1/episode1.mkv":                 pseudo(1, 1<<20),
			"Season 1/episode1.srt":                 []byte("1\n00:00:00,000 --> 00:00:01,000\nHi\n"),
			"Season 1/Show [1080p] #1 & ?q=%41.mkv": pseudo(2, 300<<10),
			"Season 1/Серия (1) !'*~.mkv":           pseudo(3, 200<<10),
			"poster.jpg":                            {0xff, 0xd8, 0xff, 0xd9, 0x00, 0x01},
		},
		"xss": {
			`<img src=x onerror=window.__xss=1>.mkv`: pseudo(4, 64<<10),
			`"><script>window.__xss=2</script>.mkv`:  pseudo(5, 64<<10),
		},
		"many": {},
	}
	for i := 0; i < 600; i++ {
		profiles["many"][fmt.Sprintf("Pack/Disc %02d/track%03d.flac", i/50, i)] = pseudo(int64(100+i), 20<<10)
	}
	if *video != "" {
		b, err := os.ReadFile(*video)
		if err != nil {
			log.Fatal(err)
		}
		profiles["video"] = map[string][]byte{"Video/clip.mp4": b}
	}
	rootNames := map[string]string{
		"show":  "Show",
		"xss":   `<img src=x onerror=window.__xss=3>`,
		"many":  "Discography",
		"video": "Clip",
	}

	var manifest []entry
	var torrents []*torrent.Torrent
	for prof, files := range profiles {
		root := filepath.Join(*dir, "content", prof, rootNames[prof])
		for rel, data := range files {
			p := filepath.Join(root, filepath.FromSlash(rel))
			must(os.MkdirAll(filepath.Dir(p), 0o755))
			must(os.WriteFile(p, data, 0o644))
		}
		info := metainfo.Info{PieceLength: 16 * 1024}
		must(info.BuildFromFilePath(root))
		var all bytes.Buffer
		e := entry{Profile: prof, Name: info.Name}
		for _, fi := range info.UpvertedFiles() {
			rel := filepath.Join(fi.Path...)
			b, err := os.ReadFile(filepath.Join(root, rel))
			must(err)
			all.Write(b)
			sum := sha256.Sum256(b)
			e.Files = append(e.Files, fileEntry{Path: filepath.ToSlash(rel), Size: int64(len(b)), SHA256: hex.EncodeToString(sum[:])})
		}
		mi := &metainfo.MetaInfo{InfoBytes: bencode.MustMarshal(info)}
		e.Hash = mi.HashInfoBytes().HexString()
		e.Torrent = filepath.Join(*dir, prof+".torrent")
		f, err := os.Create(e.Torrent)
		must(err)
		must(mi.Write(f))
		must(f.Close())

		cfg := torrent.NewDefaultClientConfig()
		cfg.DefaultStorage = offlinetest.MemStore{Data: all.Bytes()}
		cfg.Seed = true
		cfg.NoDHT = true
		cfg.DisableTrackers = true
		cfg.DisablePEX = true
		cfg.DisableIPv6 = true
		cfg.DisableUTP = true
		cfg.NoDefaultPortForwarding = true
		cfg.ListenPort = 0
		cfg.ListenHost = func(string) string { return "127.0.0.1" }
		cl, err := torrent.NewClient(cfg)
		must(err)
		defer cl.Close()
		t, err := cl.AddTorrent(mi)
		must(err)
		<-t.GotInfo()
		t.DownloadAll()
		torrents = append(torrents, t)
		manifest = append(manifest, e)
	}
	mb, _ := json.MarshalIndent(manifest, "", "  ")
	// Written last: the harness waits for this file.
	must(os.WriteFile(filepath.Join(*dir, "manifest.json"), mb, 0o644))

	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt)
	tick := time.NewTicker(time.Second)
	defer tick.Stop()
	for {
		select {
		case <-stop:
			return
		case <-tick.C:
			// The server only accepts a handshake for hashes it already has,
			// so keep dialling until each torrent is added.
			for _, t := range torrents {
				t.AddPeers([]torrent.Peer{target})
			}
		}
	}
}

func must(err error) {
	if err != nil {
		log.Fatal(err)
	}
}
