package tgbot

import (
	"strings"

	tele "gopkg.in/telebot.v4"

	"server/log"
	"server/tgbot/config"
)

func userCommandList(lang string) []tele.Command {
	return []tele.Command{
		{Text: "start", Description: trLang(lang, "cmd_desc_start")},
		{Text: "help", Description: trLang(lang, "cmd_desc_help")},
		{Text: "list", Description: trLang(lang, "cmd_desc_list")},
		{Text: "add", Description: trLang(lang, "cmd_desc_add")},
		{Text: "search", Description: trLang(lang, "cmd_desc_search")},
		{Text: "more", Description: trLang(lang, "cmd_desc_more")},
		{Text: "cancel", Description: trLang(lang, "cmd_desc_cancel")},
		{Text: "lang", Description: trLang(lang, "cmd_desc_lang")},
		{Text: "clear", Description: trLang(lang, "cmd_desc_clear")},
		{Text: "remove", Description: trLang(lang, "cmd_desc_remove")},
		{Text: "drop", Description: trLang(lang, "cmd_desc_drop")},
		{Text: "status", Description: trLang(lang, "cmd_desc_status")},
		{Text: "cache", Description: trLang(lang, "cmd_desc_cache")},
		{Text: "preload", Description: trLang(lang, "cmd_desc_preload")},
		{Text: "hash", Description: trLang(lang, "cmd_desc_hash")},
		{Text: "set", Description: trLang(lang, "cmd_desc_set")},
		{Text: "setcat", Description: trLang(lang, "cmd_desc_setcat")},
		{Text: "link", Description: trLang(lang, "cmd_desc_link")},
		{Text: "play", Description: trLang(lang, "cmd_desc_play")},
		{Text: "m3u", Description: trLang(lang, "cmd_desc_m3u")},
		{Text: "m3uall", Description: trLang(lang, "cmd_desc_m3uall")},
		{Text: "next", Description: trLang(lang, "cmd_desc_next")},
		{Text: "rutor", Description: trLang(lang, "cmd_desc_rutor")},
		{Text: "torznab", Description: trLang(lang, "cmd_desc_torznab")},
		{Text: "export", Description: trLang(lang, "cmd_desc_export")},
		{Text: "import", Description: trLang(lang, "cmd_desc_import")},
		{Text: "categories", Description: trLang(lang, "cmd_desc_categories")},
		{Text: "server", Description: trLang(lang, "cmd_desc_server")},
		{Text: "stats", Description: trLang(lang, "cmd_desc_stats")},
		{Text: "stat", Description: trLang(lang, "cmd_desc_stat")},
		{Text: "viewed", Description: trLang(lang, "cmd_desc_viewed")},
		{Text: "ffp", Description: trLang(lang, "cmd_desc_ffp")},
		{Text: "speedtest", Description: trLang(lang, "cmd_desc_speedtest")},
		{Text: "snake", Description: trLang(lang, "cmd_desc_snake")},
		{Text: "queue", Description: trLang(lang, "cmd_desc_queue")},
		{Text: "echo", Description: trLang(lang, "cmd_desc_echo")},
		{Text: "db", Description: trLang(lang, "cmd_desc_db")},
		{Text: "id", Description: trLang(lang, "cmd_desc_id")},
	}
}

func adminCommandList(lang string) []tele.Command {
	return append(userCommandList(lang),
		tele.Command{Text: "settings", Description: trLang(lang, "cmd_desc_settings")},
		tele.Command{Text: "preset", Description: trLang(lang, "cmd_desc_preset")},
		tele.Command{Text: "shutdown", Description: trLang(lang, "cmd_desc_shutdown")},
	)
}

func groupCommandList(lang string) []tele.Command {
	return []tele.Command{
		{Text: "start", Description: trLang(lang, "cmd_desc_start")},
		{Text: "help", Description: trLang(lang, "cmd_desc_help")},
	}
}

func memberCommandScope(userID int64) tele.CommandScope {
	return tele.CommandScope{
		Type:   tele.CommandScopeChatMember,
		ChatID: userID,
		UserID: userID,
	}
}

func setBotCommands(b *tele.Bot) error {
	if b == nil {
		return nil
	}
	priv := tele.CommandScope{Type: tele.CommandScopeAllPrivateChats}
	group := tele.CommandScope{Type: tele.CommandScopeAllGroupChats}

	if err := b.SetCommands(userCommandList(LangRU)); err != nil {
		return err
	}
	if err := b.SetCommands(userCommandList(LangEN), LangEN); err != nil {
		return err
	}
	if err := b.SetCommands(userCommandList(LangRU), LangRU); err != nil {
		return err
	}
	if err := b.SetCommands(userCommandList(LangRU), priv); err != nil {
		return err
	}
	if err := b.SetCommands(userCommandList(LangEN), LangEN, priv); err != nil {
		return err
	}
	if err := b.SetCommands(userCommandList(LangRU), LangRU, priv); err != nil {
		return err
	}

	if err := b.SetCommands(groupCommandList(LangRU), group); err != nil {
		return err
	}
	if err := b.SetCommands(groupCommandList(LangEN), LangEN, group); err != nil {
		return err
	}
	if err := b.SetCommands(groupCommandList(LangRU), LangRU, group); err != nil {
		return err
	}

	if config.Cfg != nil {
		for _, id := range config.Cfg.WhiteIds {
			if err := setMemberCommands(b, id, getUserLang(id)); err != nil {
				log.TLogln("tg setcmd admin", id, err)
			}
		}
	}
	return nil
}

func setMemberCommands(b tele.API, userID int64, lang string) error {
	if b == nil || userID == 0 {
		return nil
	}
	cmds := userCommandList(lang)
	if isAdmin(userID) {
		cmds = adminCommandList(lang)
	}
	scope := memberCommandScope(userID)
	if err := b.SetCommands(cmds, scope); err != nil {
		return err
	}
	return b.SetCommands(cmds, lang, scope)
}

func setUserSlashCommands(c tele.Context) {
	if c == nil || c.Bot() == nil || c.Sender() == nil {
		return
	}
	uid := c.Sender().ID
	if err := setMemberCommands(c.Bot(), uid, getUserLang(uid)); err != nil {
		log.TLogln("tg setcmd user", uid, err)
	}
}

func chatMenuButton() interface{} {
	if isHTTPSURL(getHost()) {
		return &tele.MenuButton{
			Type:   tele.MenuButtonWebApp,
			Text:   "TorrServer",
			WebApp: &tele.WebApp{URL: miniAppURL()},
		}
	}
	return tele.MenuButtonCommands
}

func chatMenuButtonType(httpsHost bool) string {
	if httpsHost {
		return tele.MenuButtonWebApp
	}
	return tele.MenuButtonCommands
}

func langFromTelegram(code string) string {
	code = strings.ToLower(strings.TrimSpace(code))
	if strings.HasPrefix(code, "en") {
		return LangEN
	}
	return LangRU
}
