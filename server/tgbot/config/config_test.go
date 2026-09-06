package config

import "testing"

func TestOfficialBotAPI(t *testing.T) {
	cases := []struct {
		host string
		want bool
	}{
		{"", true},
		{"https://api.telegram.org", true},
		{"https://api.telegram.org/", true},
		{"http://api.telegram.org", true},
		{"https://bot.telegram.org", true},
		{"http://127.0.0.1:8081", false},
		{"http://localhost:8081", false},
		{"https://example.com/bot", false},
	}
	for _, tc := range cases {
		if got := OfficialBotAPI(tc.host); got != tc.want {
			t.Errorf("OfficialBotAPI(%q)=%v want %v", tc.host, got, tc.want)
		}
	}
}
