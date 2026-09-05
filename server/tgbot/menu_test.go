package tgbot

import (
	"strings"
	"testing"
	"time"

	tele "gopkg.in/telebot.v4"
)

func TestPendingToolTTL(t *testing.T) {
	const uid int64 = 424242
	t.Cleanup(func() { clearPendingTool(uid) })

	setPendingTool(uid, pendingToolSnake)
	if peekPendingTool(uid) != pendingToolSnake {
		t.Fatal("peek after set")
	}
	if takePendingTool(uid) != pendingToolSnake {
		t.Fatal("take")
	}
	if peekPendingTool(uid) != "" {
		t.Fatal("peek after take")
	}

	setPendingTool(uid, pendingToolCache)
	if !clearPendingTool(uid) {
		t.Fatal("clear")
	}
	if peekPendingTool(uid) != "" {
		t.Fatal("peek after clear")
	}

	setPendingTool(uid, pendingToolFfp)
	pendingToolMu.Lock()
	e := pendingTool[uid]
	e.at = time.Now().Add(-pendingToolTTL - time.Second)
	pendingTool[uid] = e
	pendingToolMu.Unlock()
	if peekPendingTool(uid) != "" {
		t.Fatal("expired peek")
	}

	setPendingTool(uid, pendingToolPreload)
	pendingToolMu.Lock()
	e = pendingTool[uid]
	e.at = time.Now().Add(-pendingToolTTL - time.Second)
	pendingTool[uid] = e
	pendingToolMu.Unlock()
	if takePendingTool(uid) != "" {
		t.Fatal("expired take")
	}
}

func TestMainMenuKeyboardPersistent(t *testing.T) {
	kb := mainMenuKeyboard(1)
	if !kb.ResizeKeyboard || !kb.IsPersistent {
		t.Fatalf("resize=%v persistent=%v", kb.ResizeKeyboard, kb.IsPersistent)
	}
	if kb.Placeholder != tr(1, "menu_kb_placeholder") {
		t.Fatalf("placeholder %q", kb.Placeholder)
	}
	if len(kb.ReplyKeyboard) != 3 {
		t.Fatalf("rows %d", len(kb.ReplyKeyboard))
	}
	if len(kb.ReplyKeyboard[2]) != 1 || kb.ReplyKeyboard[2][0].Text != tr(1, "menu_more") {
		t.Fatal("expected More on last row")
	}
}

func TestMoreHubMergesLinksAndLang(t *testing.T) {
	_, root := moreHubContent(1, "root")
	if inlineHasText(root, tr(1, "menu_section_links")) {
		t.Fatal("Links section should be merged away from root")
	}
	if !inlineHasText(root, tr(1, "menu_section_lib")) || !inlineHasText(root, tr(1, "menu_section_tools")) {
		t.Fatal("root needs Library and Tools")
	}
	if !inlineHasPrefix(root, tr(1, "menu_act_lang")) {
		t.Fatal("root needs language toggle")
	}
	if inlineHasText(root, tr(1, "menu_section_admin")) {
		t.Fatal("empty whitelist must not show Admin")
	}

	_, lib := moreHubContent(1, "lib")
	if !inlineHasText(lib, tr(1, "menu_act_m3uall")) {
		t.Fatal("M3U all belongs in Library")
	}

	_, tools := moreHubContent(1, "tools")
	if !inlineHasText(tools, tr(1, "menu_act_cache")) || !inlineHasText(tools, tr(1, "menu_act_snake")) {
		t.Fatal("cache/snake belong in Tools")
	}
}

func TestHelpCompactOmitsAdminEncyclopedia(t *testing.T) {
	compact := helpCompactText(1)
	if strings.Contains(compact, "/shutdown") || strings.Contains(compact, "/preset") {
		t.Fatal("compact help should not dump admin commands")
	}
	if !strings.Contains(compact, tr(1, "help_slash_hint")) {
		t.Fatal("compact help needs slash hint")
	}
	all := helpAllText(1)
	if len(compact) >= len(all) {
		t.Fatal("full help page should be longer than compact /help")
	}
}

func TestSettingsPage1BackToMore(t *testing.T) {
	kbd := sendSettingsMenuKbd(1, "1")
	found := false
	for _, row := range kbd.InlineKeyboard {
		for _, btn := range row {
			if btn.Unique == "fset" && btn.Data == "more" {
				found = true
				if !strings.Contains(btn.Text, tr(1, "settings_back_more")) {
					t.Fatalf("label %q", btn.Text)
				}
			}
		}
	}
	if !found {
		t.Fatal("page 1 needs Back to More")
	}
}

func inlineHasText(m *tele.ReplyMarkup, text string) bool {
	if m == nil {
		return false
	}
	for _, row := range m.InlineKeyboard {
		for _, btn := range row {
			if btn.Text == text {
				return true
			}
		}
	}
	return false
}

func inlineHasPrefix(m *tele.ReplyMarkup, prefix string) bool {
	if m == nil {
		return false
	}
	for _, row := range m.InlineKeyboard {
		for _, btn := range row {
			if strings.HasPrefix(btn.Text, prefix) {
				return true
			}
		}
	}
	return false
}
