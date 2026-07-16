package bonjour

import (
	"strings"
	"testing"
)

func TestSanitizeInstance_stripsLocalSuffix(t *testing.T) {
	in := "TorrServer: Pavel Pikta on MacBook-Pro-16---Pavel.local"
	got := sanitizeInstance(in)
	if strings.Contains(strings.ToLower(got), ".local") {
		t.Fatalf("instance still contains .local: %q", got)
	}
	if !strings.HasPrefix(got, "TorrServer") {
		t.Fatalf("got %q, want TorrServer prefix", got)
	}
	if !strings.Contains(got, "Pavel") {
		t.Fatalf("got %q, expected to keep user/host info", got)
	}
}

func TestSanitizeInstance_dotsBecomeDashes(t *testing.T) {
	got := sanitizeInstance("My.Server.local")
	if got != "My-Server" {
		t.Fatalf("got %q, want My-Server", got)
	}
}

func TestStripLocalSuffix(t *testing.T) {
	cases := map[string]string{
		"MacBook-Pro-16---Pavel.local":  "MacBook-Pro-16---Pavel",
		"MacBook-Pro-16---Pavel.local.": "MacBook-Pro-16---Pavel",
		"host.LOCAL":                    "host",
		"plain":                         "plain",
	}
	for in, want := range cases {
		if got := stripLocalSuffix(in); got != want {
			t.Fatalf("stripLocalSuffix(%q)=%q, want %q", in, got, want)
		}
	}
}
