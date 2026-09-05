package tgbot

import (
	"testing"

	tele "gopkg.in/telebot.v4"
)

func commandTexts(cmds []tele.Command) []string {
	out := make([]string, len(cmds))
	for i, c := range cmds {
		out[i] = c.Text
	}
	return out
}

func hasCommand(cmds []tele.Command, name string) bool {
	for _, c := range cmds {
		if c.Text == name {
			return true
		}
	}
	return false
}

func TestUserCommandListOmitsAdmin(t *testing.T) {
	user := userCommandList(LangEN)
	want := []string{"start", "help", "list", "add", "search", "more", "cancel", "lang"}
	got := commandTexts(user)
	if len(got) != len(want) {
		t.Fatalf("user commands %v", got)
	}
	for i, name := range want {
		if got[i] != name {
			t.Fatalf("user[%d]=%q want %q", i, got[i], name)
		}
	}
	for _, admin := range []string{"settings", "preset", "shutdown"} {
		if hasCommand(user, admin) {
			t.Fatalf("user list must not include /%s", admin)
		}
	}
}

func TestAdminCommandListExtendsUser(t *testing.T) {
	user := userCommandList(LangRU)
	admin := adminCommandList(LangRU)
	if len(admin) != len(user)+3 {
		t.Fatalf("admin len %d user %d", len(admin), len(user))
	}
	for i, c := range user {
		if admin[i].Text != c.Text {
			t.Fatalf("admin prefix mismatch at %d: %q vs %q", i, admin[i].Text, c.Text)
		}
	}
	for _, name := range []string{"settings", "preset", "shutdown"} {
		if !hasCommand(admin, name) {
			t.Fatalf("admin list missing /%s", name)
		}
	}
}

func TestGroupCommandListMinimal(t *testing.T) {
	got := commandTexts(groupCommandList(LangEN))
	if len(got) != 2 || got[0] != "start" || got[1] != "help" {
		t.Fatalf("group commands %v", got)
	}
	if hasCommand(groupCommandList(LangEN), "settings") {
		t.Fatal("groups must not list admin commands")
	}
}

func TestMemberCommandScopePrivateChat(t *testing.T) {
	const id int64 = 123456789
	s := memberCommandScope(id)
	if s.Type != tele.CommandScopeChatMember {
		t.Fatalf("type %q", s.Type)
	}
	if s.ChatID != id || s.UserID != id {
		t.Fatalf("chat/user %d/%d want %d", s.ChatID, s.UserID, id)
	}
}

func TestLangFromTelegram(t *testing.T) {
	cases := []struct {
		code string
		want string
	}{
		{"en", LangEN},
		{"en-US", LangEN},
		{"en_GB", LangEN},
		{"EN", LangEN},
		{"ru", LangRU},
		{"ru-RU", LangRU},
		{"", LangRU},
		{"de", LangRU},
		{"  en-au  ", LangEN},
	}
	for _, tc := range cases {
		if got := langFromTelegram(tc.code); got != tc.want {
			t.Errorf("langFromTelegram(%q)=%q want %q", tc.code, got, tc.want)
		}
	}
}

func TestChatMenuButtonType(t *testing.T) {
	if got := chatMenuButtonType(true); got != tele.MenuButtonWebApp {
		t.Fatalf("https: %q", got)
	}
	if got := chatMenuButtonType(false); got != tele.MenuButtonCommands {
		t.Fatalf("http: %q", got)
	}
}
