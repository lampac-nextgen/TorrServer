package tgbot

import (
	"fmt"
	"strings"

	"server/library"
	"server/torr"

	tele "gopkg.in/telebot.v4"
)

func callbackM3u(c tele.Context, hash string) error {
	uid := c.Sender().ID
	t := torr.GetTorrent(hash)
	if t == nil {
		return c.Respond(&tele.CallbackResponse{Text: tr(uid, "torrent_not_found")})
	}
	host := getHost()
	url := fmt.Sprintf("%s/playlist?hash=%s", host, hash)
	_ = c.Respond(&tele.CallbackResponse{})
	return sendPlaylistMessage(c, uid, tr(uid, "m3u_playlist"), url)
}

func cmdM3u(c tele.Context) error {
	args := c.Args()
	arg := ""
	if len(args) > 0 {
		arg = args[0]
	}
	hash := resolveHash(c, arg)
	if hash == "" {
		return c.Send(tr(c.Sender().ID, "m3u_usage"))
	}

	t := torr.GetTorrent(hash)
	if t == nil {
		return c.Send(tr(c.Sender().ID, "torrent_not_found") + ":\n<code>" + hash + "</code>")
	}

	host := getHost()
	url := fmt.Sprintf("%s/playlist?hash=%s", host, hash)
	if len(args) > 1 && strings.ToLower(args[1]) == "fromlast" {
		url += "&fromlast=1"
	}
	return sendPlaylistMessage(c, c.Sender().ID, tr(c.Sender().ID, "m3u_playlist"), url)
}

func cmdM3uAll(c tele.Context) error {
	cat := ""
	if args := c.Args(); len(args) > 0 {
		cat = library.NormalizeCategory(args[0])
		if cat == "all" {
			cat = ""
		}
	}
	host := getHost()
	url := library.PlaylistAllURL(host, cat)
	uid := c.Sender().ID
	return sendPlaylistMessage(c, uid, tr(uid, "m3u_all"), url)
}

func sendPlaylistMessage(c tele.Context, uid int64, template, url string) error {
	msg := fmt.Sprintf(template, url)
	if kbd := playlistCopyMarkup(uid, url); kbd != nil {
		return c.Send(msg, kbd, tele.ModeHTML, tele.NoPreview)
	}
	return c.Send(msg, tele.ModeHTML, tele.NoPreview)
}

func playlistCopyMarkup(uid int64, url string) *tele.ReplyMarkup {
	m := &tele.ReplyMarkup{}
	if b, ok := copyTextBtn(m, tr(uid, "btn_copy_m3u"), url); ok {
		m.Inline(m.Row(b))
		return m
	}
	return nil
}
