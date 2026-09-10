package tgbot

import (
	"server/settings"

	tele "gopkg.in/telebot.v4"
)

func sendSettingsMenuKbd(uid int64, page string) *tele.ReplyMarkup {
	s := settings.BTsets
	if s == nil {
		s = &settings.BTSets{}
	}
	back := []tele.InlineButton{fsetBtn("◀️ "+tr(uid, "settings_back"), "page|1")}
	var btns [][]tele.InlineButton

	switch page {
	case "1":
		btns = [][]tele.InlineButton{
			{
				fsetBtn("🔍 "+tr(uid, "settings_section_search"), "page|1a"),
				fsetBtn("📺 "+tr(uid, "settings_section_network"), "page|1b"),
			},
			{
				fsetBtn("📦 "+tr(uid, "settings_section_other"), "page|1c"),
				fsetBtn("📊 "+tr(uid, "settings_nav_cache"), "page|2"),
			},
			{
				fsetBtn("✏️ "+tr(uid, "settings_nav_paths"), "page|3"),
				fsetBtn("💾 "+tr(uid, "settings_nav_storage"), "page|4"),
			},
			{fsetBtn("📥 "+tr(uid, "settings_export"), "export")},
			{fsetBtn("◀️ "+tr(uid, "settings_back_more"), "more")},
		}
	case "1a":
		btns = [][]tele.InlineButton{
			back,
			togglePair(uid, "settings_tgl_rutor", s.EnableRutorSearch, "rutor|1a",
				"settings_tgl_torznab", s.EnableTorznabSearch, "torznab|1a"),
		}
	case "1b":
		btns = [][]tele.InlineButton{
			back,
			togglePair(uid, "settings_tgl_dlna", s.EnableDLNA, "dlna|1b",
				"settings_tgl_bonjour", s.EnableBonjour, "bonjour|1b"),
			togglePair(uid, "settings_tgl_ipv6", s.EnableIPv6, "ipv6|1b",
				"settings_tgl_upload", !s.DisableUpload, "upload|1b"),
			togglePair(uid, "settings_tgl_dht", !s.DisableDHT, "dht|1b",
				"settings_tgl_pex", !s.DisablePEX, "pex|1b"),
			togglePair(uid, "settings_tgl_tcp", !s.DisableTCP, "tcp|1b",
				"settings_tgl_utp", !s.DisableUTP, "utp|1b"),
			togglePair(uid, "settings_tgl_upnp", !s.DisableUPNP, "upnp|1b",
				"settings_tgl_encrypt", s.ForceEncrypt, "encrypt|1b"),
			{fsetBtn(toggleBtn(tr(uid, "settings_tgl_debug"), s.EnableDebug), "debug|1b")},
		}
	case "1c":
		btns = [][]tele.InlineButton{
			back,
			togglePair(uid, "settings_tgl_cachedrop", s.RemoveCacheOnDrop, "cachedrop|1c",
				"settings_tgl_responsive", s.ResponsiveMode, "responsive|1c"),
			togglePair(uid, "settings_tgl_usedisk", s.UseDisk, "usedisk|1c",
				"settings_tgl_fsactive", s.ShowFSActiveTorr, "fsactive|1c"),
			togglePair(uid, "settings_tgl_timecode", s.TrackTimecode, "timecode|1c",
				"settings_tgl_lpd", s.EnableLPD, "lpd|1c"),
			{fsetBtn(toggleBtn(tr(uid, "settings_tgl_lpdv6"), s.LPDIPv6), "lpdv6|1c")},
		}
	case "2":
		btns = [][]tele.InlineButton{
			back,
			{
				fsetBtn("💾 "+tr(uid, "settings_limits_cache"), "page|2a"),
				fsetBtn("🔌 "+tr(uid, "settings_limits_connections"), "page|2b"),
			},
			{fsetBtn("⬇️ "+tr(uid, "settings_limits_speed"), "page|2c")},
		}
	case "2a":
		cacheMB := int(s.CacheSize / (1024 * 1024))
		btns = [][]tele.InlineButton{
			{fsetBtn("◀️ "+tr(uid, "settings_back"), "page|2")},
			{
				fsetBtn(optBtn("64", cacheMB == 64), "cache|64|2a"),
				fsetBtn(optBtn("128", cacheMB == 128), "cache|128|2a"),
			},
			{
				fsetBtn(optBtn("256", cacheMB == 256), "cache|256|2a"),
				fsetBtn(optBtn("512", cacheMB == 512), "cache|512|2a"),
			},
			{
				fsetBtn(optBtn("25%", s.PreloadCache == 25), "preload|25|2a"),
				fsetBtn(optBtn("50%", s.PreloadCache == 50), "preload|50|2a"),
			},
			{
				fsetBtn(optBtn("75%", s.PreloadCache == 75), "preload|75|2a"),
				fsetBtn(optBtn("95%", s.PreloadCache == 95), "preload|95|2a"),
			},
			{
				fsetBtn(optBtn("50%", s.ReaderReadAHead == 50), "readahead|50|2a"),
				fsetBtn(optBtn("75%", s.ReaderReadAHead == 75), "readahead|75|2a"),
			},
			{
				fsetBtn(optBtn("95%", s.ReaderReadAHead == 95), "readahead|95|2a"),
				fsetBtn(optBtn("100%", s.ReaderReadAHead == 100), "readahead|100|2a"),
			},
		}
	case "2b":
		btns = [][]tele.InlineButton{
			{fsetBtn("◀️ "+tr(uid, "settings_back"), "page|2")},
			{
				fsetBtn(optBtn("25", s.ConnectionsLimit == 25), "conn|25|2b"),
				fsetBtn(optBtn("50", s.ConnectionsLimit == 50), "conn|50|2b"),
			},
			{fsetBtn(optBtn("100", s.ConnectionsLimit == 100), "conn|100|2b")},
			{
				fsetBtn(optBtn("15s", s.TorrentDisconnectTimeout == 15), "timeout|15|2b"),
				fsetBtn(optBtn("30s", s.TorrentDisconnectTimeout == 30), "timeout|30|2b"),
			},
			{
				fsetBtn(optBtn("60s", s.TorrentDisconnectTimeout == 60), "timeout|60|2b"),
				fsetBtn(optBtn("120s", s.TorrentDisconnectTimeout == 120), "timeout|120|2b"),
			},
			{
				fsetBtn(optBtn("auto", s.PeersListenPort == 0), "port|0|2b"),
				fsetBtn(optBtn("6881", s.PeersListenPort == 6881), "port|6881|2b"),
			},
			{fsetBtn(optBtn("51413", s.PeersListenPort == 51413), "port|51413|2b")},
		}
	case "2c":
		btns = [][]tele.InlineButton{
			{fsetBtn("◀️ "+tr(uid, "settings_back"), "page|2")},
			{
				fsetBtn(optBtn("∞", s.DownloadRateLimit == 0), "down|0|2c"),
				fsetBtn(optBtn("1M", s.DownloadRateLimit == 1024), "down|1024|2c"),
			},
			{
				fsetBtn(optBtn("5M", s.DownloadRateLimit == 5120), "down|5120|2c"),
				fsetBtn(optBtn("10M", s.DownloadRateLimit == 10240), "down|10240|2c"),
			},
			{
				fsetBtn(optBtn("∞", s.UploadRateLimit == 0), "up|0|2c"),
				fsetBtn(optBtn("1M", s.UploadRateLimit == 1024), "up|1024|2c"),
			},
			{
				fsetBtn(optBtn("5M", s.UploadRateLimit == 5120), "up|5120|2c"),
				fsetBtn(optBtn("10M", s.UploadRateLimit == 10240), "up|10240|2c"),
			},
			{
				fsetBtn(optBtn("off", s.RetrackersMode == 0), "retr|0|2c"),
				fsetBtn(optBtn("add", s.RetrackersMode == 1), "retr|1|2c"),
			},
			{
				fsetBtn(optBtn("rem", s.RetrackersMode == 2), "retr|2|2c"),
				fsetBtn(optBtn("repl", s.RetrackersMode == 3), "retr|3|2c"),
			},
		}
	case "3":
		btns = [][]tele.InlineButton{
			back,
			{fsetBtn("✏️ "+tr(uid, "settings_set_friendlyname"), "ask|friendlyname")},
			{fsetBtn("✏️ "+tr(uid, "settings_set_path"), "ask|torrentssavepath")},
			{
				fsetBtn("🔐 "+tr(uid, "settings_set_sslcert"), "ask|sslcert"),
				fsetBtn("🔑 "+tr(uid, "settings_set_sslkey"), "ask|sslkey"),
			},
			{fsetBtn("🎬 "+tr(uid, "settings_set_tmdbkey"), "ask|tmdbkey")},
			{
				fsetBtn("🔍 "+tr(uid, "settings_torznab_test"), "ask|torznab_test"),
				fsetBtn("➕ "+tr(uid, "settings_add_torznab"), "ask|torznab_add"),
			},
			{fsetBtn("🗑 "+tr(uid, "settings_clear_torznab"), "torznab_clear")},
		}
	case "4":
		btns = [][]tele.InlineButton{
			back,
			{
				fsetBtn("📄 "+optBtn("json", s.StoreSettingsInJson), "storage_set|json"),
				fsetBtn(optBtn("bbolt", !s.StoreSettingsInJson), "storage_set|bbolt"),
			},
			{
				fsetBtn("📺 "+optBtn("json", s.StoreViewedInJson), "storage_view|json"),
				fsetBtn(optBtn("bbolt", !s.StoreViewedInJson), "storage_view|bbolt"),
			},
			{fsetBtn("🔄 "+tr(uid, "settings_reset"), "reset_confirm")},
		}
	}
	return &tele.ReplyMarkup{InlineKeyboard: btns}
}

func fsetBtn(text, data string) tele.InlineButton {
	return tele.InlineButton{Text: text, Unique: "fset", Data: data}
}

func togglePair(uid int64, key1 string, on1 bool, data1, key2 string, on2 bool, data2 string) []tele.InlineButton {
	return []tele.InlineButton{
		fsetBtn(toggleBtn(tr(uid, key1), on1), data1),
		fsetBtn(toggleBtn(tr(uid, key2), on2), data2),
	}
}
