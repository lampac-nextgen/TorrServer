package tgbot

import (
	"fmt"
	"strings"

	"server/settings"
	"server/torr"
	"server/torr/state"

	tele "gopkg.in/telebot.v4"
)

func cmdServer(c tele.Context) error {
	uid := c.Sender().ID
	host := getHost()
	torrents := torr.ListTorrent()
	streams := torr.GetActiveStreams()

	open := 0
	for _, t := range torrents {
		if t != nil && t.Stat != state.TorrentInDB {
			open++
		}
	}

	var sb strings.Builder
	sb.WriteString("🖥 <b>" + tr(uid, "server_title") + "</b>\n\n")
	fmt.Fprintf(&sb, "%s: <code>%s</code>\n", tr(uid, "server_url"), host)
	fmt.Fprintf(&sb, "%s: %s\n", tr(uid, "server_port"), settings.Port)
	if settings.Ssl {
		fmt.Fprintf(&sb, "SSL %s: %s\n", tr(uid, "server_port"), settings.SslPort)
	}
	fmt.Fprintf(&sb, "%s: %d · %d %s\n", tr(uid, "stats_torrents"), len(torrents), open, tr(uid, "stats_open"))
	fmt.Fprintf(&sb, "%s: %d\n", tr(uid, "server_streams"), streams)
	return c.Send(sb.String())
}
