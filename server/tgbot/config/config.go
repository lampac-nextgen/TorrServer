package config

import (
	"encoding/json"
	"net/url"
	"os"
	"path/filepath"
	"strings"

	"server/log"
	"server/settings"
)

type Config struct {
	HostTG   string
	HostWeb  string
	Socks5   string
	WhiteIds []int64
	BlackIds []int64
}

var Cfg *Config

func LoadConfig() {
	Cfg = &Config{}
	fn := filepath.Join(settings.Path, "tg.cfg")
	buf, err := os.ReadFile(fn)
	if err != nil {
		Cfg.WhiteIds = []int64{}
		Cfg.BlackIds = []int64{}
		Cfg.HostTG = "https://api.telegram.org"
		buf, _ = json.MarshalIndent(Cfg, "", " ")
		if buf != nil {
			_ = os.WriteFile(fn, buf, 0o600)
		}
		return
	}
	err = json.Unmarshal(buf, &Cfg)
	if err != nil {
		log.TLogln("tg config read err", err)
		Cfg.WhiteIds = []int64{}
		Cfg.BlackIds = []int64{}
	}
	if Cfg.HostTG == "" || (!strings.HasPrefix(Cfg.HostTG, "http://") && !strings.HasPrefix(Cfg.HostTG, "https://")) {
		Cfg.HostTG = "https://api.telegram.org"
	}
	if Cfg.WhiteIds == nil {
		Cfg.WhiteIds = []int64{}
	}
	if Cfg.BlackIds == nil {
		Cfg.BlackIds = []int64{}
	}
}

// OfficialBotAPI reports whether host is Telegram's cloud Bot API (50 MB upload
// limit) versus a local telegram-bot-api server (up to 2 GB).
func OfficialBotAPI(host string) bool {
	host = strings.TrimSpace(host)
	if host == "" {
		return true
	}
	u, err := url.Parse(host)
	if err != nil {
		return strings.Contains(strings.ToLower(host), "api.telegram.org")
	}
	h := strings.ToLower(u.Hostname())
	return h == "api.telegram.org" || strings.HasSuffix(h, ".telegram.org")
}
