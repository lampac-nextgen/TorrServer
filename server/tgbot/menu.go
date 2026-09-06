package tgbot

import (
	"strings"
	"sync"
	"time"

	tele "gopkg.in/telebot.v4"

	"server/log"
	up "server/tgbot/upload"
)

var (
	pendingSearchMu sync.Mutex
	pendingSearch   = make(map[int64]time.Time)

	pendingToolMu sync.Mutex
	pendingTool   = make(map[int64]pendingToolEntry)
)

const pendingSearchTTL = 30 * time.Minute
const pendingToolTTL = 30 * time.Minute

type pendingToolKind string

const (
	pendingToolSnake   pendingToolKind = "snake"
	pendingToolCache   pendingToolKind = "cache"
	pendingToolPreload pendingToolKind = "preload"
	pendingToolFfp     pendingToolKind = "ffp"
)

type pendingToolEntry struct {
	kind pendingToolKind
	at   time.Time
}

func setPendingSearch(uid int64) {
	pendingSearchMu.Lock()
	pendingSearch[uid] = time.Now()
	pendingSearchMu.Unlock()
}

func takePendingSearch(uid int64) bool {
	pendingSearchMu.Lock()
	defer pendingSearchMu.Unlock()
	t, ok := pendingSearch[uid]
	if !ok {
		return false
	}
	delete(pendingSearch, uid)
	return time.Since(t) <= pendingSearchTTL
}

func clearPendingSearch(uid int64) bool {
	pendingSearchMu.Lock()
	defer pendingSearchMu.Unlock()
	if _, ok := pendingSearch[uid]; ok {
		delete(pendingSearch, uid)
		return true
	}
	return false
}

func setPendingTool(uid int64, kind pendingToolKind) {
	pendingToolMu.Lock()
	pendingTool[uid] = pendingToolEntry{kind: kind, at: time.Now()}
	pendingToolMu.Unlock()
}

func peekPendingTool(uid int64) pendingToolKind {
	pendingToolMu.Lock()
	defer pendingToolMu.Unlock()
	e, ok := pendingTool[uid]
	if !ok || time.Since(e.at) > pendingToolTTL {
		delete(pendingTool, uid)
		return ""
	}
	return e.kind
}

func takePendingTool(uid int64) pendingToolKind {
	pendingToolMu.Lock()
	defer pendingToolMu.Unlock()
	e, ok := pendingTool[uid]
	delete(pendingTool, uid)
	if !ok || time.Since(e.at) > pendingToolTTL {
		return ""
	}
	return e.kind
}

func clearPendingTool(uid int64) bool {
	pendingToolMu.Lock()
	defer pendingToolMu.Unlock()
	if _, ok := pendingTool[uid]; ok {
		delete(pendingTool, uid)
		return true
	}
	return false
}

// Reply-keyboard labels must match exactly what we send (localized).
func mainMenuKeyboard(uid int64) *tele.ReplyMarkup {
	m := &tele.ReplyMarkup{
		ResizeKeyboard: true,
		IsPersistent:   true,
		Placeholder:    tr(uid, "menu_kb_placeholder"),
	}
	m.Reply(
		m.Row(m.Text(tr(uid, "menu_library")), m.Text(tr(uid, "menu_search"))),
		m.Row(m.Text(tr(uid, "menu_status")), m.Text(tr(uid, "menu_add"))),
		m.Row(m.Text(tr(uid, "menu_more"))),
	)
	return m
}

// sendWithMenu sends a plain text message with the reply keyboard.
// Never combine with an inline markup — telebot keeps only the last ReplyMarkup.
func sendWithMenu(c tele.Context, what interface{}, opts ...interface{}) error {
	uid := c.Sender().ID
	all := make([]interface{}, 0, len(opts)+1)
	all = append(all, opts...)
	all = append(all, mainMenuKeyboard(uid))
	return c.Send(what, all...)
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
	clearPendingSearch(uid)
	clearPendingTool(uid)
	switch strings.TrimSpace(text) {
	case tr(uid, "menu_library"):
		return sendListHub(c, 0, "", false)
	case tr(uid, "menu_search"):
		return sendSearchPrompt(c)
	case tr(uid, "menu_status"):
		return cmdStat(c)
	case tr(uid, "menu_add"):
		return sendAddPrompt(c)
	case tr(uid, "menu_more"):
		return sendMoreHub(c)
	default:
		return nil
	}
}

func sendMoreHub(c tele.Context) error {
	return showMoreHub(c, "root", false)
}

func showMoreHub(c tele.Context, section string, edit bool) error {
	uid := c.Sender().ID
	text, kbd := moreHubContent(uid, section)
	if edit && c.Callback() != nil && c.Callback().Message != nil {
		_, err := c.Bot().Edit(c.Callback().Message, text, kbd, tele.ModeHTML)
		if err == nil {
			return nil
		}
		log.TLogln("tg more hub edit err", err)
	}
	if err := c.Send(text, kbd, tele.ModeHTML); err != nil {
		log.TLogln("tg more hub send err", err)
		return err
	}
	return nil
}

func moreHubContent(uid int64, section string) (string, *tele.ReplyMarkup) {
	m := &tele.ReplyMarkup{}
	title := "⋯ <b>" + tr(uid, "menu_more_title") + "</b>"
	var rows []tele.Row

	switch section {
	case "lib":
		title += "\n" + tr(uid, "menu_section_lib")
		rows = []tele.Row{
			m.Row(m.Data(tr(uid, "menu_act_clear"), "fmenu", "act", "clear"),
				m.Data(tr(uid, "menu_act_hash"), "fmenu", "act", "hash")),
			m.Row(m.Data(tr(uid, "menu_act_categories"), "fmenu", "act", "categories"),
				m.Data(tr(uid, "menu_act_m3uall"), "fmenu", "act", "m3uall")),
			m.Row(m.Data(tr(uid, "menu_export"), "fmenu", "act", "export"),
				m.Data(tr(uid, "menu_import"), "fmenu", "act", "import")),
			m.Row(m.Data(tr(uid, "menu_back"), "fmenu", "root")),
		}
	case "tools":
		title += "\n" + tr(uid, "menu_section_tools")
		rows = []tele.Row{
			m.Row(m.Data(tr(uid, "menu_act_snake"), "fmenu", "act", "snake"),
				m.Data(tr(uid, "menu_act_preload"), "fmenu", "act", "preload")),
			m.Row(m.Data(tr(uid, "menu_act_next"), "fmenu", "act", "next"),
				m.Data(tr(uid, "menu_act_queue"), "fmenu", "act", "queue")),
			m.Row(m.Data(tr(uid, "menu_act_ffp"), "fmenu", "act", "ffp"),
				m.Data(tr(uid, "menu_act_cache"), "fmenu", "act", "cache")),
			m.Row(m.Data(tr(uid, "menu_act_speedtest"), "fmenu", "act", "speedtest"),
				m.Data(tr(uid, "menu_act_viewed"), "fmenu", "act", "viewed")),
			m.Row(m.Data(tr(uid, "menu_act_server"), "fmenu", "act", "server"),
				m.Data(tr(uid, "menu_act_stats"), "fmenu", "act", "stats")),
			m.Row(m.Data(tr(uid, "menu_act_stat"), "fmenu", "act", "stat"),
				m.Data(tr(uid, "menu_act_echo"), "fmenu", "act", "echo")),
			m.Row(m.Data(tr(uid, "menu_act_db"), "fmenu", "act", "db")),
			m.Row(m.Data(tr(uid, "menu_back"), "fmenu", "root")),
		}
	case "help":
		title = helpCompactText(uid)
		rows = []tele.Row{
			m.Row(m.Data(tr(uid, "help_all_commands"), "fmenu", "hub", "helpall")),
			m.Row(m.Data(tr(uid, "menu_back"), "fmenu", "root")),
		}
	case "helpall":
		title = helpAllText(uid)
		rows = []tele.Row{
			m.Row(m.Data(tr(uid, "menu_back"), "fmenu", "hub", "help")),
		}
	case "admin":
		title += "\n" + tr(uid, "menu_section_admin")
		rows = []tele.Row{
			m.Row(m.Data(tr(uid, "menu_settings"), "fmenu", "act", "settings")),
			m.Row(m.Data(tr(uid, "menu_act_preset"), "fmenu", "act", "preset"),
				m.Data(tr(uid, "menu_act_shutdown"), "fmenu", "act", "shutdown")),
			m.Row(m.Data(tr(uid, "menu_back"), "fmenu", "root")),
		}
	default:
		rows = []tele.Row{
			m.Row(m.Data(tr(uid, "menu_section_lib"), "fmenu", "hub", "lib"),
				m.Data(tr(uid, "menu_section_tools"), "fmenu", "hub", "tools")),
		}
		if isAdmin(uid) {
			rows = append(rows, m.Row(m.Data(tr(uid, "menu_section_admin"), "fmenu", "hub", "admin")))
		}
		langLabel := tr(uid, "menu_act_lang")
		if getUserLang(uid) == LangEN {
			langLabel += " → RU"
		} else {
			langLabel += " → EN"
		}
		rows = append(rows, m.Row(
			m.Data(tr(uid, "menu_help"), "fmenu", "hub", "help"),
			m.Data(langLabel, "fmenu", "act", "lang"),
		))
		rows = append(rows, openWebButtonRow(m, uid)...)
	}

	m.Inline(rows...)
	return title, m
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
	if err := b.SetMenuButton(nil, chatMenuButton()); err != nil {
		log.TLogln("tg SetMenuButton", err)
	}
}

func callbackMenu(c tele.Context, parts []string) error {
	uid := c.Sender().ID
	toast := ""
	if len(parts) >= 2 && parts[0] == "act" {
		switch parts[1] {
		case "snake", "preload", "ffp", "cache":
			toast = tr(uid, "menu_pick_torrent")
		}
	}
	_ = c.Respond(&tele.CallbackResponse{Text: toast})
	if len(parts) == 0 {
		return showMoreHub(c, "root", true)
	}
	switch parts[0] {
	case "root":
		return showMoreHub(c, "root", true)
	case "hub":
		sec := "root"
		if len(parts) >= 2 {
			sec = parts[1]
		}
		if sec == "links" {
			sec = "lib"
		}
		if sec == "admin" && !isAdmin(uid) {
			return sendWithMenu(c, tr(uid, "admin_only"))
		}
		return showMoreHub(c, sec, true)
	case "act":
		if len(parts) < 2 {
			return nil
		}
		return callbackMenuAct(c, parts[1])
	// Legacy single-token actions from older hub
	case "export", "import", "help", "settings":
		return callbackMenuAct(c, parts[0])
	default:
		return nil
	}
}

func callbackMenuAct(c tele.Context, act string) error {
	uid := c.Sender().ID
	switch act {
	case "clear":
		return clear(c)
	case "hash":
		return cmdHash(c)
	case "categories":
		return cmdCategories(c)
	case "export":
		return cmdExport(c)
	case "import":
		return sendWithMenu(c, tr(uid, "menu_import_hint"))
	case "snake":
		return startPendingToolPick(c, pendingToolSnake)
	case "preload":
		return startPendingToolPick(c, pendingToolPreload)
	case "next":
		return cmdNext(c)
	case "queue":
		return up.ShowQueue(c)
	case "ffp":
		return startPendingToolPick(c, pendingToolFfp)
	case "speedtest":
		return cmdSpeedtest(c)
	case "echo":
		return cmdEcho(c)
	case "db":
		return cmdDb(c)
	case "viewed":
		return cmdViewed(c)
	case "server":
		return cmdServer(c)
	case "stats":
		return cmdStats(c)
	case "stat":
		return cmdStat(c)
	case "m3uall":
		return cmdM3uAll(c)
	case "cache":
		return startPendingToolPick(c, pendingToolCache)
	case "help":
		return showMoreHub(c, "help", c.Callback() != nil)
	case "lang":
		return toggleMoreLang(c)
	case "settings":
		if !isAdmin(uid) {
			return sendWithMenu(c, tr(uid, "admin_only"))
		}
		return cmdSettings(c)
	case "preset":
		if !isAdmin(uid) {
			return sendWithMenu(c, tr(uid, "admin_only"))
		}
		return sendWithMenu(c, tr(uid, "preset_usage"))
	case "shutdown":
		if !isAdmin(uid) {
			return sendWithMenu(c, tr(uid, "admin_only"))
		}
		return cmdShutdown(c)
	default:
		return nil
	}
}

func startPendingToolPick(c tele.Context, kind pendingToolKind) error {
	uid := c.Sender().ID
	setPendingTool(uid, kind)
	return sendListHub(c, 0, "", c.Callback() != nil)
}

func toggleMoreLang(c tele.Context) error {
	uid := c.Sender().ID
	next := LangEN
	if getUserLang(uid) == LangEN {
		next = LangRU
	}
	setUserLang(uid, next)
	setUserSlashCommands(c)
	if err := showMoreHub(c, "root", c.Callback() != nil); err != nil {
		return err
	}
	if next == LangEN {
		return sendWithMenu(c, tr(uid, "lang_set_en"))
	}
	return sendWithMenu(c, tr(uid, "lang_set"))
}

func runPendingTool(c tele.Context, kind pendingToolKind, hash string) error {
	switch kind {
	case pendingToolSnake:
		return startSnakeForHash(c, hash)
	case pendingToolCache:
		return sendCacheForHash(c, hash)
	case pendingToolPreload, pendingToolFfp:
		return startFilesList(c, hash)
	default:
		return showTorrentCard(c, hash, "0", true)
	}
}
