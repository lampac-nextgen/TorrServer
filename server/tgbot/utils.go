package tgbot

import (
	"fmt"
	"strconv"
	"strings"
	"unicode"

	tele "gopkg.in/telebot.v4"

	"server/settings"
	"server/tgbot/config"
	"server/web"
)

var botUsername string

func chatMsgKey(chatID int64, msgID int) string {
	return fmt.Sprintf("%d_%d", chatID, msgID)
}

// escapeHtml escapes <, >, &, " for Telegram HTML parse mode to prevent "Unsupported start tag" errors
func escapeHtml(s string) string {
	s = strings.ReplaceAll(s, "&", "&amp;")
	s = strings.ReplaceAll(s, "<", "&lt;")
	s = strings.ReplaceAll(s, ">", "&gt;")
	s = strings.ReplaceAll(s, "\"", "&quot;")
	return s
}

// logSafeStr truncates by runes, strips emojis/symbols for clean laconic logs
func logSafeStr(s string, maxRunes int) string {
	var b strings.Builder
	n := 0
	lastSpace := true
	for _, r := range s {
		if n >= maxRunes {
			break
		}
		switch {
		case r == '\n' || r == '\r' || r == '\t':
			if !lastSpace {
				b.WriteRune(' ')
				n++
				lastSpace = true
			}
		case r < 32 || r == 127:
		case logIsEmojiOrSymbol(r):
		case unicode.IsLetter(r) || unicode.IsNumber(r) || r == '/' || r == '-' || r == '_' || r == '|' || r == ':' || r == '.' || r == ',' || r == ' ' || r == '?' || r == '!' || r == '@':
			b.WriteRune(r)
			n++
			lastSpace = (r == ' ')
		default:
			b.WriteRune(r)
			n++
			lastSpace = false
		}
	}
	return strings.TrimSpace(b.String())
}

func logIsEmojiOrSymbol(r rune) bool {
	if unicode.IsSymbol(r) {
		return true
	}
	u := uint32(r)
	return (u >= 0x1F300 && u <= 0x1F9FF) || (u >= 0x2600 && u <= 0x26FF) ||
		(u >= 0x2700 && u <= 0x27BF) || (u >= 0x1F600 && u <= 0x1F64F) ||
		(u >= 0x1F680 && u <= 0x1F6FF) || (u >= 0x1F1E0 && u <= 0x1F1FF) ||
		(u >= 0xFE00 && u <= 0xFE0F) || (u >= 0x1F000 && u <= 0x1F02F)
}

// logUser formats uid and optional username for logs
func logUser(u *tele.User) string {
	if u == nil {
		return "uid=?"
	}
	return logUserID(u.ID) + logUsername(u.Username)
}

// logUserID formats uid for logs when User is not available
func logUserID(uid int64) string {
	return "uid=" + strconv.FormatInt(uid, 10)
}

func logUsername(username string) string {
	if username == "" {
		return ""
	}
	return " @" + username
}

// logHashOrTruncate returns hash for logging if link is hash or magnet with btih, else truncated link
func logHashOrTruncate(link string) string {
	if isHash(link) {
		return link
	}
	if idx := strings.Index(link, "btih:"); idx >= 0 && idx+45 <= len(link) {
		if h := link[idx+5 : idx+45]; isHash(h) {
			return h
		}
	}
	if strings.HasPrefix(strings.ToLower(link), "torrs://") && len(link) >= 48 {
		if h := link[8:48]; isHash(h) {
			return h
		}
	}
	if len(link) > 64 {
		return link[:64] + "..."
	}
	return link
}

// getHost returns the base URL for stream/play links (e.g. http://192.168.1.1:8090)
func getHost() string {
	host := config.Cfg.HostWeb
	if host == "" {
		host = settings.PubIPv4
		if host == "" {
			ips := web.GetLocalIps()
			if len(ips) == 0 {
				host = "127.0.0.1"
			} else {
				host = ips[0]
			}
		}
	}
	if !strings.Contains(host, ":") {
		if settings.Ssl {
			host += ":" + settings.SslPort
		} else {
			host += ":" + settings.Port
		}
	}
	if !strings.HasPrefix(host, "http") {
		if settings.Ssl {
			host = "https://" + host
		} else {
			host = "http://" + host
		}
	}
	return host
}

func notifyTyping(c tele.Context) {
	if c == nil || c.Bot() == nil {
		return
	}
	if ch := c.Chat(); ch != nil {
		_ = c.Bot().Notify(ch, tele.Typing)
		return
	}
	if c.Sender() != nil {
		_ = c.Bot().Notify(c.Sender(), tele.Typing)
	}
}

func sendForceReply(c tele.Context, text, placeholder string) error {
	m := &tele.ReplyMarkup{
		ForceReply:  true,
		Selective:   true,
		Placeholder: placeholder,
	}
	return c.Send(text, m, tele.ModeHTML)
}

func sendAddPrompt(c tele.Context) error {
	uid := c.Sender().ID
	return sendForceReply(c, tr(uid, "add_magnet"), tr(uid, "add_reply_placeholder"))
}

func sendSearchPrompt(c tele.Context) error {
	uid := c.Sender().ID
	setPendingSearch(uid)
	m := &tele.ReplyMarkup{
		ForceReply:  true,
		Selective:   true,
		Placeholder: tr(uid, "search_reply_placeholder"),
	}
	if botUsername != "" {
		// ForceReply cannot mix with inline; send prompt then a switch-inline row.
		if err := c.Send(tr(uid, "menu_search_pending"), m, tele.ModeHTML); err != nil {
			return err
		}
		inline := &tele.ReplyMarkup{}
		inline.Inline(inline.Row(inline.QueryChat(tr(uid, "menu_search_inline"), "")))
		return c.Send(tr(uid, "menu_search_inline_hint"), inline, tele.ModeHTML)
	}
	return c.Send(tr(uid, "menu_search_pending"), m, tele.ModeHTML)
}

func isPosterURL(s string) bool {
	s = strings.TrimSpace(s)
	return strings.HasPrefix(strings.ToLower(s), "https://") || strings.HasPrefix(strings.ToLower(s), "http://")
}

func magnetForHash(hash string) string {
	if hash == "" {
		return ""
	}
	return "magnet:?xt=urn:btih:" + hash
}

const torrentStartHashLen = 8

func torrentStartPrefix(hash string) string {
	h := strings.ToLower(strings.TrimSpace(hash))
	if h == "" {
		return ""
	}
	if len(h) <= torrentStartHashLen {
		return h
	}
	return h[:torrentStartHashLen]
}

func torrentStartURL(hash string) string {
	if botUsername == "" {
		return ""
	}
	p := torrentStartPrefix(hash)
	if p == "" {
		return ""
	}
	return "https://t.me/" + botUsername + "?start=t_" + p
}

func copyTextBtn(m *tele.ReplyMarkup, label, text string) (tele.Btn, bool) {
	if m == nil || text == "" || label == "" {
		return tele.Btn{}, false
	}
	if len([]rune(text)) > 256 {
		return tele.Btn{}, false
	}
	return m.CopyText(label, text), true
}

func appendCopyRow(m *tele.ReplyMarkup, uid int64, hash, playURL, magnet string) []tele.Row {
	var btns []tele.Btn
	if b, ok := copyTextBtn(m, tr(uid, "btn_copy_hash"), hash); ok {
		btns = append(btns, b)
	}
	if b, ok := copyTextBtn(m, tr(uid, "btn_copy_play"), playURL); ok {
		btns = append(btns, b)
	}
	if b, ok := copyTextBtn(m, tr(uid, "btn_copy_magnet"), magnet); ok {
		btns = append(btns, b)
	}
	if len(btns) == 0 {
		return nil
	}
	return []tele.Row{m.Row(btns...)}
}
