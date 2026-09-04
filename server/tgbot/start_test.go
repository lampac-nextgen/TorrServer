package tgbot

import "testing"

func TestParseStartPayload(t *testing.T) {
	cases := []struct {
		in   string
		kind startKind
		cat  string
		pref string
		q    string
	}{
		{"", startWelcome, "", "", ""},
		{"list", startList, "", "", ""},
		{"list_tv", startList, "tv", "", ""},
		{"list_movie", startList, "movie", "", ""},
		{"next", startNext, "", "", ""},
		{"add", startAdd, "", "", ""},
		{"t_abcdef01", startTorrent, "", "abcdef01", ""},
		{"t_ABCDEF01", startTorrent, "", "abcdef01", ""},
		{"search_the_office", startSearch, "", "", "the office"},
		{"list_foo", startUnknown, "", "", ""},
		{"nope", startUnknown, "", "", ""},
		{"t_zz", startUnknown, "", "", ""},
	}
	for _, tc := range cases {
		got := parseStartPayload(tc.in)
		if got.kind != tc.kind || got.cat != tc.cat || got.prefix != tc.pref || got.query != tc.q {
			t.Errorf("parseStartPayload(%q)=%+v want kind=%d cat=%q prefix=%q query=%q",
				tc.in, got, tc.kind, tc.cat, tc.pref, tc.q)
		}
	}
}
