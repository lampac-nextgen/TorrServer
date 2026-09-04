package tgbot

import (
	"fmt"
	"strconv"
	"strings"

	"server/library"
	sets "server/settings"

	tele "gopkg.in/telebot.v4"
)

func cmdNext(c tele.Context) error {
	uid := c.Sender().ID
	query, category, hash := parseNextArgs(c)
	res := library.SelectNextUnwatched(library.ListSnapshots(), library.ViewedMapFor(hash), query, category, hash)
	host := getHost()
	if res.Hash != "" && res.FileIndex > 0 {
		res.PlayURL = library.PlayURL(host, res.Hash, res.FilePath, res.FileIndex)
		res.ShortPlayURL = library.ShortPlayURL(host, res.Hash, res.FileIndex)
		res.PlaylistURL = library.PlaylistURL(host, res.Hash)
	}
	return sendNextResult(c, uid, res)
}

func parseNextArgs(c tele.Context) (query, category, hash string) {
	category = "tv"
	args := c.Args()
	if len(args) == 0 {
		return "", category, ""
	}
	if h := resolveHash(c, args[0]); h != "" && (len(args) == 1 || isHash(args[0])) {
		return strings.TrimSpace(strings.Join(args[1:], " ")), category, h
	}
	if len(args) == 1 {
		if n := library.NormalizeCategory(args[0]); n != "" && n != "all" {
			if n == "uncategorized" {
				return "", n, ""
			}
			return "", n, ""
		}
		return strings.TrimSpace(args[0]), category, ""
	}
	last := library.NormalizeCategory(args[len(args)-1])
	if last != "" && last != "all" {
		if last == "uncategorized" {
			return strings.TrimSpace(strings.Join(args[:len(args)-1], " ")), last, ""
		}
		return strings.TrimSpace(strings.Join(args[:len(args)-1], " ")), last, ""
	}
	return strings.TrimSpace(strings.Join(args, " ")), category, ""
}

func sendNextResult(c tele.Context, uid int64, res library.NextUnwatched) error {
	if res.Hash == "" || res.FileIndex < 1 {
		msg := tr(uid, "next_none")
		if res.Message != "" {
			msg += "\n<i>" + escapeHtml(res.Message) + "</i>"
		}
		return c.Send(msg)
	}

	title := res.ShowTitle
	if title == "" {
		title = res.Hash
	}
	code := res.Code
	if code == "" {
		code = fmt.Sprintf("#%d", res.FileIndex)
	}
	var sb strings.Builder
	fmt.Fprintf(&sb, "▶️ <b>%s</b>\n", escapeHtml(title))
	fmt.Fprintf(&sb, "%s <b>%s</b> · %s #%d\n", tr(uid, "next_episode"), escapeHtml(code), tr(uid, "next_file"), res.FileIndex)
	fmt.Fprintf(&sb, "<i>%s</i>\n", escapeHtml(res.FilePath))
	fmt.Fprintf(&sb, "%s: %d · %s: %d\n\n", tr(uid, "next_remaining"), res.RemainingUnwatched, tr(uid, "next_matched"), res.MatchedTorrents)
	fmt.Fprintf(&sb, "%s\n<code>%s</code>\n\n", tr(uid, "next_short"), res.ShortPlayURL)
	fmt.Fprintf(&sb, "%s\n<code>%s</code>\n", tr(uid, "next_long"), res.PlayURL)
	if res.PlaylistURL != "" {
		fmt.Fprintf(&sb, "\n%s\n<code>%s</code>", tr(uid, "next_m3u"), res.PlaylistURL)
	}

	m := &tele.ReplyMarkup{}
	idx := strconv.Itoa(res.FileIndex)
	m.Inline(
		m.Row(
			m.URL(tr(uid, "files_link"), res.PlayURL),
			m.Data(tr(uid, "next_mark"), "fnextmark", res.Hash, idx),
		),
		m.Row(m.Data(tr(uid, "btn_m3u"), "fm3u", res.Hash)),
	)
	return c.Send(sb.String(), m, tele.ModeHTML)
}

func callbackNextMark(c tele.Context, hash, indexStr string) error {
	uid := c.Sender().ID
	if !isHash(hash) {
		return c.Respond(&tele.CallbackResponse{Text: tr(uid, "callback_unknown")})
	}
	index, err := strconv.Atoi(indexStr)
	if err != nil || index < 1 {
		return c.Respond(&tele.CallbackResponse{Text: tr(uid, "viewed_file_index")})
	}
	sets.SetViewed(&sets.Viewed{Hash: hash, FileIndex: index})
	_ = c.Respond(&tele.CallbackResponse{Text: tr(uid, "next_marked")})
	res := library.SelectNextUnwatched(library.ListSnapshots(), library.ViewedMapFor(hash), "", "tv", hash)
	host := getHost()
	if res.Hash != "" && res.FileIndex > 0 {
		res.PlayURL = library.PlayURL(host, res.Hash, res.FilePath, res.FileIndex)
		res.ShortPlayURL = library.ShortPlayURL(host, res.Hash, res.FileIndex)
		res.PlaylistURL = library.PlaylistURL(host, res.Hash)
	}
	if c.Callback() != nil && c.Callback().Message != nil {
		// Replace the previous next message with the following episode.
		_ = c.Bot().Delete(c.Callback().Message)
	}
	return sendNextResult(c, uid, res)
}
