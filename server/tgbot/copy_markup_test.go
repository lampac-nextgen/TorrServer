package tgbot

import (
	"encoding/json"
	"strings"
	"testing"

	tele "gopkg.in/telebot.v4"
)

func TestOmitEmptySwitchOnCopyText(t *testing.T) {
	m := &tele.ReplyMarkup{}
	b, ok := copyTextBtn(m, "Play", "http://h/play/x/1")
	if !ok {
		t.Fatal("copy btn")
	}
	ib := b.Inline()
	raw, err := json.Marshal(ib)
	if err != nil {
		t.Fatal(err)
	}
	s := string(raw)
	if !strings.Contains(s, `"copy_text"`) {
		t.Fatalf("missing copy_text: %s", s)
	}
	if !strings.Contains(s, `"switch_inline_query_current_chat":""`) {
		t.Fatalf("telebot should emit empty switch: %s", s)
	}
	markup, err := json.Marshal(map[string]any{"inline_keyboard": [][]*tele.InlineButton{{ib}}})
	if err != nil {
		t.Fatal(err)
	}
	fixed := omitEmptySwitchOnCopy(markup)
	out := string(fixed)
	if !strings.Contains(out, `"copy_text"`) {
		t.Fatalf("copy_text dropped: %s", out)
	}
	if strings.Contains(out, `"switch_inline_query_current_chat"`) {
		t.Fatalf("empty switch should be omitted: %s", out)
	}

	payload, err := json.Marshal(map[string]string{
		"chat_id":      "1",
		"reply_markup": string(markup),
	})
	if err != nil {
		t.Fatal(err)
	}
	rewritten := rewriteTelegramJSONBody(payload)
	var root map[string]json.RawMessage
	if err := json.Unmarshal(rewritten, &root); err != nil {
		t.Fatal(err)
	}
	var inner string
	if err := json.Unmarshal(root["reply_markup"], &inner); err != nil {
		t.Fatal(err)
	}
	if strings.Contains(inner, `"switch_inline_query_current_chat":""`) {
		t.Fatalf("rewritten markup still has empty switch: %s", inner)
	}
	if !strings.Contains(inner, `"copy_text"`) {
		t.Fatalf("rewritten markup lost copy_text: %s", inner)
	}
}

func TestOmitEmptySwitchKeepsQueryChatSpace(t *testing.T) {
	m := &tele.ReplyMarkup{}
	ib := m.QueryChat("Inline", " ").Inline()
	markup, err := json.Marshal(map[string]any{"inline_keyboard": [][]*tele.InlineButton{{ib}}})
	if err != nil {
		t.Fatal(err)
	}
	fixed := omitEmptySwitchOnCopy(markup)
	if !strings.Contains(string(fixed), `"switch_inline_query_current_chat":" "`) {
		t.Fatalf("QueryChat space must stay: %s", fixed)
	}
}

func TestFormatStatMessageExpandable(t *testing.T) {
	got := formatStatMessage(1, "line1\n<raw>\nline3")
	if !strings.Contains(got, "<blockquote expandable>") || !strings.Contains(got, "</blockquote>") {
		t.Fatalf("missing expandable quote: %s", got)
	}
	title := "📋 <b>" + tr(1, "help_stat") + "</b>"
	if !strings.HasPrefix(got, title+"\n<blockquote") {
		t.Fatalf("title must stay outside quote: %s", got)
	}
	if !strings.Contains(got, "&lt;raw&gt;") {
		t.Fatal("dump must be escaped")
	}
	if strings.Contains(got, "<raw>") {
		t.Fatal("raw HTML must not leak")
	}
}
