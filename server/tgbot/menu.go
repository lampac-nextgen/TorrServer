package tgbot

import (
	"strings"

	tele "gopkg.in/telebot.v4"

	"server/log"
)

// Reply-keyboard labels must match exactly what we send (localized).
func mainMenuKeyboard(uid int64) *tele.ReplyMarkup {
	m := &tele.ReplyMarkup{ResizeKeyboard: true}
	m.Reply(
		m.Row(m.Text(tr(uid, "menu_library")), m.Text(tr(uid, "menu_search"))),
		m.Row(m.Text(tr(uid, "menu_status")), m.Text(tr(uid, "menu_add"))),
		m.Row(m.Text(tr(uid, "menu_more"))),
	)
	return m
}

func isMenuButton(uid int64, text string) bool {
	t := strings.TrimSpace(text)
	switch t {
	case tr(uid, "menu_library"), tr(uid, "menu_search"), tr(uid, "menu_status"),
		tr(uid, "menu_add"), tr(uid, "menu_more"):
		return true
	default:
		return false
	}
}

func handleMenuButton(c tele.Context, text string) error {
	uid := c.Sender().ID
	switch strings.TrimSpace(text) {
	case tr(uid, "menu_library"):
		return sendListHub(c, 0, false)
	case tr(uid, "menu_search"):
		return c.Send(tr(uid, "menu_search_hint"), mainMenuKeyboard(uid))
	case tr(uid, "menu_status"):
		return cmdStat(c)
	case tr(uid, "menu_add"):
		return c.Send(tr(uid, "add_magnet"), mainMenuKeyboard(uid))
	case tr(uid, "menu_more"):
		return sendMoreHub(c)
	default:
		return nil
	}
}

func sendMoreHub(c tele.Context) error {
	uid := c.Sender().ID
	m := &tele.ReplyMarkup{}
	rows := []tele.Row{
		m.Row(m.Data(tr(uid, "menu_export"), "fmenu", "export")),
		m.Row(m.Data(tr(uid, "menu_import"), "fmenu", "import")),
		m.Row(m.Data(tr(uid, "menu_help"), "fmenu", "help")),
	}
	if isAdmin(uid) {
		rows = append(rows, m.Row(m.Data(tr(uid, "menu_settings"), "fmenu", "settings")))
	}
	rows = append(rows, openWebButtonRow(m, uid)...)
	m.Inline(rows...)
	return c.Send(tr(uid, "menu_more_title"), m, mainMenuKeyboard(uid))
}

func openWebButtonRow(m *tele.ReplyMarkup, uid int64) []tele.Row {
	host := getHost()
	url := strings.TrimRight(host, "/") + "/?tg=1"
	if isHTTPSURL(host) {
		return []tele.Row{m.Row(m.WebApp(tr(uid, "menu_open_web"), &tele.WebApp{URL: url}))}
	}
	return []tele.Row{m.Row(m.URL(tr(uid, "menu_open_web"), url))}
}

func isHTTPSURL(host string) bool {
	return strings.HasPrefix(strings.ToLower(strings.TrimSpace(host)), "https://")
}

func miniAppURL() string {
	return strings.TrimRight(getHost(), "/") + "/?tg=1"
}

func setupMenuButton(b *tele.Bot) {
	if !isHTTPSURL(getHost()) {
		return
	}
	mb := &tele.MenuButton{
		Type:   tele.MenuButtonWebApp,
		Text:   "TorrServer",
		WebApp: &tele.WebApp{URL: miniAppURL()},
	}
	if err := b.SetMenuButton(nil, mb); err != nil {
		log.TLogln("tg SetMenuButton", err)
	}
}

func cmdStart(c tele.Context) error {
	uid := c.Sender().ID
	msg := "🤖 <b>" + tr(uid, "help") + "</b>\n\n" + tr(uid, "menu_welcome")
	return c.Send(msg, mainMenuKeyboard(uid))
}

func callbackMenu(c tele.Context, action string) error {
	uid := c.Sender().ID
	_ = c.Respond(&tele.CallbackResponse{})
	switch action {
	case "export":
		return cmdExport(c)
	case "import":
		return c.Send(tr(uid, "menu_import_hint"), mainMenuKeyboard(uid))
	case "help":
		return help(c)
	case "settings":
		if !isAdmin(uid) {
			return c.Send(tr(uid, "admin_only"), mainMenuKeyboard(uid))
		}
		return cmdSettings(c)
	default:
		return nil
	}
}
