package tgbot

import (
	"fmt"
	"strings"

	"server/settings"
	"server/torr"
	"server/torr/state"

	"github.com/dustin/go-humanize"
	tele "gopkg.in/telebot.v4"
)

func cmdStats(c tele.Context) error {
	torrents := torr.ListTorrent()
	if len(torrents) == 0 {
		return c.Send(tr(c.Sender().ID, "no_torrents"))
	}

	var totalSize, loadedSize int64
	var totalPeers, activePeers, seeders, open int
	for _, t := range torrents {
		if t == nil {
			continue
		}
		if t.Stat != state.TorrentInDB {
			open++
		}
		st := t.Status()
		if st != nil {
			totalSize += st.TorrentSize
			loadedSize += st.LoadedSize
			totalPeers += st.TotalPeers
			activePeers += st.ActivePeers
			seeders += st.ConnectedSeeders
		} else {
			totalSize += t.Size
		}
	}

	streams := torr.GetActiveStreams()
	cacheCap := int64(0)
	if settings.BTsets != nil {
		cacheCap = settings.BTsets.CacheSize
	}

	uid := c.Sender().ID
	var sb strings.Builder
	sb.WriteString("📊 <b>" + tr(uid, "stats_title") + "</b>\n\n")
	fmt.Fprintf(&sb, "%s: %d · %d %s\n", tr(uid, "stats_torrents"), len(torrents), open, tr(uid, "stats_open"))
	fmt.Fprintf(&sb, "%s: %s\n", tr(uid, "stats_total_size"), humanize.IBytes(uint64(totalSize)))
	if cacheCap > 0 {
		pct := float64(loadedSize) / float64(cacheCap) * 100
		if pct > 100 {
			pct = 100
		}
		fmt.Fprintf(&sb, "%s: %s / %s (%.0f%%)\n",
			tr(uid, "stats_cache"), humanize.IBytes(uint64(loadedSize)), humanize.IBytes(uint64(cacheCap)), pct)
	} else {
		fmt.Fprintf(&sb, "%s: %s\n", tr(uid, "stats_cache"), humanize.IBytes(uint64(loadedSize)))
	}
	fmt.Fprintf(&sb, "%s: %d %s, %d %s\n",
		tr(uid, "stats_peers"), activePeers, tr(uid, "stats_active"), seeders, tr(uid, "stats_seeds"))
	fmt.Fprintf(&sb, "%s: %d\n", tr(uid, "stats_streams"), streams)
	return c.Send(sb.String())
}
