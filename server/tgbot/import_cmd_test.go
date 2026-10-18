package tgbot

import "testing"

func TestParseImportLinesNewestFirst(t *testing.T) {
	text := "torrs://packedOne\nmagnet:?xt=urn:btih:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n"
	items := parseImportText(text, 1000)
	if len(items) != 2 {
		t.Fatalf("len %d", len(items))
	}
	if items[0].link != "torrs://packedOne" || items[0].ts != 1000 {
		t.Fatalf("first %+v", items[0])
	}
	if items[1].ts != 999 {
		t.Fatalf("second ts %d", items[1].ts)
	}
}

func TestParseImportJSONKeepsTimestamp(t *testing.T) {
	text := `[{"torrs_hash":"web+torrs://packed","timestamp":50},{"hash":"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb","title":"B"}]`
	items := parseImportText(text, 100)
	if len(items) != 2 {
		t.Fatalf("len %d", len(items))
	}
	if items[0].link != "torrs://packed" || items[0].ts != 50 {
		t.Fatalf("packed %+v", items[0])
	}
	if items[1].link != "magnet:?xt=urn:btih:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb&dn=B" || items[1].ts != 99 {
		t.Fatalf("hash %+v", items[1])
	}
}

func TestNormalizeBareTorrsHash(t *testing.T) {
	hash := "cccccccccccccccccccccccccccccccccccccccc"
	got := normalizeImportLink("torrs://" + hash)
	want := "magnet:?xt=urn:btih:" + hash
	if got != want {
		t.Fatalf("got %q", got)
	}
}
