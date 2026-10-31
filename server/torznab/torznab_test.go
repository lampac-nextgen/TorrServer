package torznab

import (
	"context"
	"encoding/xml"
	"net/http"
	"net/http/httptest"
	"testing"

	"server/settings"
)

func TestEffectiveCat(t *testing.T) {
	tests := []struct {
		name       string
		requestCat string
		categories string
		catType    settings.CategoryType
		want       string
	}{
		{name: "ui cat wins", requestCat: "3000", categories: "2000", catType: settings.CategoryManual, want: "3000"},
		{name: "default movies tv", requestCat: "", categories: "", catType: settings.CategoryDefault, want: "5000,2000"},
		{name: "empty type is default", requestCat: "", categories: "", catType: "", want: "5000,2000"},
		{name: "manual categories", requestCat: "", categories: "1000,7000", catType: settings.CategoryManual, want: "1000,7000"},
		{name: "all omits cat", requestCat: "", categories: "1000", catType: settings.CategoryAll, want: ""},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := effectiveCat(tt.requestCat, tt.categories, tt.catType)
			if got != tt.want {
				t.Fatalf("effectiveCat() = %q, want %q", got, tt.want)
			}
		})
	}
}

func TestProwlarrIndexerFallback(t *testing.T) {
	const body = `<?xml version="1.0"?><rss version="2.0"><channel>
<item>
  <title>Prowlarr Only</title>
  <prowlarrindexer>MyProwlarr</prowlarrindexer>
</item>
<item>
  <title>Jackett Wins</title>
  <jackettindexer>JackettName</jackettindexer>
  <prowlarrindexer>ShouldIgnore</prowlarrindexer>
</item>
</channel></rss>`

	var resp TorznabResponse
	if err := xml.Unmarshal([]byte(body), &resp); err != nil {
		t.Fatalf("unmarshal: %v", err)
	}
	if len(resp.Channel.Items) != 2 {
		t.Fatalf("items = %d, want 2", len(resp.Channel.Items))
	}

	trackerFor := func(item TorznabItem, label string) string {
		tracker := item.Indexer
		if tracker == "" {
			tracker = item.Prowlarr
		}
		if tracker == "" {
			tracker = label
		}
		return tracker
	}

	if got := trackerFor(resp.Channel.Items[0], "fallback.example"); got != "MyProwlarr" {
		t.Fatalf("prowlarr-only tracker = %q, want MyProwlarr", got)
	}
	if got := trackerFor(resp.Channel.Items[1], "fallback.example"); got != "JackettName" {
		t.Fatalf("jackett tracker = %q, want JackettName", got)
	}
}

func TestNormalizeHost(t *testing.T) {
	tests := []struct {
		name    string
		host    string
		want    string
		wantErr bool
	}{
		{
			name: "jackett torznab base",
			host: "http://192.168.1.10:9117/api/v2.0/indexers/all/results/torznab/",
			want: "http://192.168.1.10:9117/api/v2.0/indexers/all/results/torznab/api",
		},
		{
			name: "already ends with api",
			host: "http://192.168.1.10:9117/api/v2.0/indexers/all/results/torznab/api",
			want: "http://192.168.1.10:9117/api/v2.0/indexers/all/results/torznab/api",
		},
		{
			name: "already ends with api slash",
			host: "http://192.168.1.10:9117/api/v2.0/indexers/all/results/torznab/api/",
			want: "http://192.168.1.10:9117/api/v2.0/indexers/all/results/torznab/api",
		},
		{
			name: "prowlarr indexer id",
			host: "http://localhost:9696/1",
			want: "http://localhost:9696/1/api",
		},
		{
			name: "scheme default",
			host: "localhost:9117/api/v2.0/indexers/all/results/torznab/",
			want: "http://localhost:9117/api/v2.0/indexers/all/results/torznab/api",
		},
		{
			name:    "empty",
			host:    "   ",
			wantErr: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			u, err := normalizeHost(tt.host)
			if tt.wantErr {
				if err == nil {
					t.Fatalf("expected error, got %v", u)
				}
				return
			}
			if err != nil {
				t.Fatalf("unexpected error: %v", err)
			}
			if got := u.String(); got != tt.want {
				t.Fatalf("got %q, want %q", got, tt.want)
			}
		})
	}
}

func TestIndexerLabel(t *testing.T) {
	tests := []struct {
		name string
		cfg  settings.TorznabConfig
		want string
	}{
		{"custom name wins", settings.TorznabConfig{Name: "  My Idx ", Host: "http://a.example"}, "  My Idx "},
		{"blank name uses host", settings.TorznabConfig{Name: "  ", Host: "https://jackett.example:9117/api/v2.0/indexers/x"}, "jackett.example:9117"},
		{"bare host gets http", settings.TorznabConfig{Host: "idx.example"}, "idx.example"},
		{"unparseable host returned as is", settings.TorznabConfig{Host: "http://[::1"}, "http://[::1"},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := indexerLabel(tt.cfg); got != tt.want {
				t.Fatalf("indexerLabel() = %q, want %q", got, tt.want)
			}
		})
	}
}

func TestParseTorznabError(t *testing.T) {
	tests := []struct {
		name, body, want string
	}{
		{"description", `<error code="100" description="Incorrect user credentials"/>`, "Incorrect user credentials"},
		{"code only", `<error code="900"/>`, "900"},
		{"neither", `<error/>`, "unknown error"},
		{"not an error root", `<rss><channel/></rss>`, ""},
		{"not xml", `plain text`, ""},
		{"empty", ``, ""},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := parseTorznabError([]byte(tt.body)); got != tt.want {
				t.Fatalf("parseTorznabError() = %q, want %q", got, tt.want)
			}
		})
	}
}

func TestSearchOneFormatsSizeInBinaryUnits(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_, _ = w.Write([]byte(`<rss><channel>
<item><title>a</title><enclosure url="magnet:?xt=urn:btih:aa" length="1610612736" type="application/x-bittorrent"/></item>
<item><title>b</title><size>512</size></item>
</channel></rss>`))
	}))
	defer srv.Close()

	results := searchOne(context.Background(), srv.URL, "key", "q", "", "", 0, 0)
	if len(results) != 2 {
		t.Fatalf("got %d results, want 2", len(results))
	}
	if results[0].Size != "1.5 GiB" {
		t.Errorf("size = %q, want %q", results[0].Size, "1.5 GiB")
	}
	if results[1].Size != "512 B" {
		t.Errorf("size = %q, want %q", results[1].Size, "512 B")
	}
}

func TestFormatSizeUnitBoundaries(t *testing.T) {
	cases := map[int64]string{
		0:                  "0 B",
		1023:               "1023 B",
		1024:               "1.0 KiB",
		1536:               "1.5 KiB",
		1024 * 1024:        "1.0 MiB",
		1024 * 1024 * 1024: "1.0 GiB",
		3 << 40:            "3.0 TiB",
		5 << 50:            "5.0 PiB",
	}
	for in, want := range cases {
		if got := formatSize(in); got != want {
			t.Errorf("formatSize(%d) = %q, want %q", in, got, want)
		}
	}
}
