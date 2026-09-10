package tgbot

import (
	"fmt"
	"strconv"
	"strings"

	"server/library"
	"server/torr"

	tele "gopkg.in/telebot.v4"
)

func sendPlayURLs(c tele.Context, hash string, index int, path string) error {
	uid := c.Sender().ID
	host := getHost()
	short := library.ShortPlayURL(host, hash, index)
	long := library.PlayURL(host, hash, path, index)
	m := &tele.ReplyMarkup{}
	rows, streamCopied := playLinkCopyRows(m, uid, hash, short, long)
	msg := fmt.Sprintf(tr(uid, "link_play_dual"), short, long)
	if long != "" && long != short && !streamCopied {
		msg += "\n\n<i>" + tr(uid, "copy_too_long") + "</i>"
	}
	if len(rows) > 0 {
		m.Inline(rows...)
		return c.Send(msg, m, tele.NoPreview)
	}
	return c.Send(msg, tele.NoPreview)
}

func playLinkCopyRows(m *tele.ReplyMarkup, uid int64, hash, short, long string) ([]tele.Row, bool) {
	rows := appendCopyRow(m, uid, hash, short, magnetForHash(hash))
	if long == "" || long == short {
		return rows, false
	}
	if b, ok := copyURLBtn(m, tr(uid, "btn_copy_stream"), long); ok {
		rows = append(rows, m.Row(b))
		return rows, true
	}
	return rows, false
}

func filePathForIndex(t *torr.Torrent, index int) string {
	st := t.Status()
	if st == nil {
		return ""
	}
	for _, f := range st.FileStats {
		if f != nil && f.Id == index {
			return f.Path
		}
	}
	if len(st.FileStats) == 1 {
		return st.FileStats[0].Path
	}
	return ""
}

func callbackLink(c tele.Context, data string) error {
	uid := c.Sender().ID
	index := 1
	hash := data
	if idx := strings.Index(data, "|"); idx >= 0 && idx+1 < len(data) {
		if i, err := strconv.Atoi(data[idx+1:]); err == nil && i > 0 {
			index = i
			hash = data[:idx]
		}
	}
	t := torr.GetTorrent(hash)
	if t == nil {
		return c.Respond(&tele.CallbackResponse{Text: tr(uid, "torrent_not_found")})
	}
	if !strings.Contains(data, "|") && t.WaitInfo() {
		st := t.Status()
		if st != nil && len(st.FileStats) > 1 {
			maxFiles := 5
			if len(st.FileStats) < maxFiles {
				maxFiles = len(st.FileStats)
			}
			var rows [][]tele.InlineButton
			for i := 0; i < maxFiles; i++ {
				f := st.FileStats[i]
				btn := tele.InlineButton{Text: fmt.Sprintf("#%d", f.Id), Unique: "flink", Data: hash + "|" + strconv.Itoa(f.Id)}
				rows = append(rows, []tele.InlineButton{btn})
			}
			rows = append(rows, []tele.InlineButton{
				{Text: tr(uid, "btn_back_torrent"), Unique: "ftpick", Data: hash + "|0"},
			})
			kbd := &tele.ReplyMarkup{InlineKeyboard: rows}
			_ = c.Respond(&tele.CallbackResponse{})
			return c.Send("🔗 "+tr(uid, "btn_link")+":", kbd)
		}
	}
	_ = c.Respond(&tele.CallbackResponse{})
	return sendPlayURLs(c, hash, index, filePathForIndex(t, index))
}

func cmdLink(c tele.Context) error {
	args := c.Args()
	arg := ""
	if len(args) > 0 {
		arg = args[0]
	}
	hash := resolveHash(c, arg)
	if hash == "" {
		return c.Send(tr(c.Sender().ID, "link_usage"))
	}

	index := 1
	if len(args) > 1 {
		if i, err := strconv.Atoi(args[1]); err == nil && i > 0 {
			index = i
		}
	}

	t := torr.GetTorrent(hash)
	if t == nil {
		return c.Send(tr(c.Sender().ID, "torrent_not_found") + ":\n<code>" + hash + "</code>")
	}
	return sendPlayURLs(c, hash, index, filePathForIndex(t, index))
}
