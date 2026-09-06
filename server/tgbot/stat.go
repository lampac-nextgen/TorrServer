package tgbot

import (
	"bytes"
	"strings"

	"server/torr"

	tele "gopkg.in/telebot.v4"
)

const statDumpMaxRunes = 4000

func cmdStat(c tele.Context) error {
	var buf bytes.Buffer
	torr.WriteStatus(&buf)
	return c.Send(formatStatMessage(c.Sender().ID, buf.String()))
}

func formatStatMessage(uid int64, dump string) string {
	msg := strings.ReplaceAll(dump, "<", "&lt;")
	msg = strings.ReplaceAll(msg, ">", "&gt;")
	if rs := []rune(msg); len(rs) > statDumpMaxRunes {
		msg = string(rs[:statDumpMaxRunes]) + "\n..."
	}
	return "📋 <b>" + tr(uid, "help_stat") + "</b>\n<blockquote expandable><pre>" + msg + "</pre></blockquote>"
}
