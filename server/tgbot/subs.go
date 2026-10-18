package tgbot

import (
	"fmt"
	"strconv"
	"strings"
	"time"

	tele "gopkg.in/telebot.v4"

	"server/subs"
	"server/torr"
)

func cmdSubs(c tele.Context) error {
	uid := c.Sender().ID
	args := c.Args()
	if len(args) < 2 {
		return c.Send(tr(uid, "subs_usage"))
	}
	hash := resolveHash(c, args[0])
	if hash == "" {
		return c.Send(tr(uid, "invalid_hash"))
	}
	id, err := strconv.Atoi(args[1])
	if err != nil || id < 1 {
		return c.Send(tr(uid, "subs_file_index"))
	}
	notifyTyping(c)
	return sendSubs(c, hash, id)
}

func callbackSubs(c tele.Context, hash, idStr string) error {
	id, err := strconv.Atoi(idStr)
	if err != nil || !isHash(hash) || id < 1 {
		return c.Respond(&tele.CallbackResponse{Text: tr(c.Sender().ID, "callback_unknown")})
	}
	_ = c.Respond(&tele.CallbackResponse{})
	return sendSubs(c, hash, id)
}

func sendSubs(c tele.Context, hash string, videoID int) error {
	uid := c.Sender().ID
	t := torrentWithFiles(hash)
	if t == nil {
		return c.Send(tr(uid, "torrent_not_found") + ":\n<code>" + hash + "</code>")
	}
	tracks, name, found := subtitleTracks(t, videoID)
	if !found {
		return c.Send(tr(uid, "subs_file_index"))
	}
	if !subs.IsVideo(name) {
		return c.Send(tr(uid, "subs_not_video"))
	}
	if len(tracks) == 0 {
		return c.Send(fmt.Sprintf(tr(uid, "subs_empty"), escapeHtml(name)))
	}

	host := strings.TrimRight(getMediaHost(), "/")
	var b strings.Builder
	fmt.Fprintf(&b, "💬 <b>%s</b>\n", escapeHtml(name))
	m := &tele.ReplyMarkup{}
	var rows []tele.Row
	for i, trk := range tracks {
		if i >= 15 {
			break
		}
		u := fmt.Sprintf("%s/subs/%s/%d?track=%d", host, hash, videoID, trk.FileIndex)
		label := trk.Title
		if label == "" {
			label = trk.Lang
		}
		if label == "" || label == "und" {
			label = trk.Format
		}
		fmt.Fprintf(&b, "%d. %s\n<code>%s</code>\n", i+1, escapeHtml(label), escapeHtml(u))
		if btn, ok := copyURLBtn(m, truncateBtnText(label), u); ok {
			rows = append(rows, m.Row(btn))
		}
	}
	if len(rows) == 0 {
		return c.Send(b.String(), tele.ModeHTML)
	}
	m.Inline(rows...)
	return c.Send(b.String(), m, tele.ModeHTML)
}

func torrentWithFiles(hash string) *torr.Torrent {
	deadline := time.Now().Add(90 * time.Second)
	for time.Now().Before(deadline) {
		t := torr.GetTorrent(hash)
		if t == nil {
			return nil
		}
		if st := t.Status(); st != nil && len(st.FileStats) > 0 {
			return t
		}
		if t.WaitInfo() {
			if st := t.Status(); st != nil && len(st.FileStats) > 0 {
				return t
			}
		}
		time.Sleep(time.Second)
	}
	return nil
}

func subtitleTracks(t *torr.Torrent, videoID int) ([]subs.Track, string, bool) {
	st := t.Status()
	if st == nil {
		return nil, "", false
	}
	var files []subs.FileInfo
	name := ""
	for _, fs := range st.FileStats {
		p := strings.ReplaceAll(fs.Path, "\\", "/")
		files = append(files, subs.FileInfo{Index: fs.Id, Path: p, Size: fs.Length})
		if fs.Id == videoID {
			name = p
		}
	}
	if name == "" {
		return nil, "", false
	}
	var video subs.FileInfo
	for _, f := range files {
		if f.Index == videoID {
			video = f
			break
		}
	}
	if !subs.IsVideo(name) {
		return nil, name, true
	}
	return subs.Match(video, files), name, true
}
