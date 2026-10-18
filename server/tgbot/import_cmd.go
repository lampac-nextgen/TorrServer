package tgbot

import (
	"encoding/json"
	"fmt"
	"net/url"
	"regexp"
	"strings"
	"time"

	tele "gopkg.in/telebot.v4"
)

var (
	magnetRegex = regexp.MustCompile(`magnet:\?[^\s]+`)
	torrsRegex  = regexp.MustCompile(`(?:web\+)?torrs://[^\s]+`)
	hashRegex   = regexp.MustCompile(`\b([a-fA-F0-9]{40})\b`)
)

type importItem struct {
	link string
	ts   int64
}

type importJSONRow struct {
	Hash      string `json:"hash"`
	Title     string `json:"title"`
	Name      string `json:"name"`
	TorrsHash string `json:"torrs_hash"`
	Timestamp int64  `json:"timestamp"`
}

func cmdImport(c tele.Context) error {
	text := ""
	if c.Message() != nil && c.Message().Text != "" {
		text = strings.TrimPrefix(strings.TrimSpace(c.Message().Text), "/import")
		text = strings.TrimSpace(text)
	}
	if text == "" {
		return c.Send(tr(c.Sender().ID, "import_usage"))
	}
	items := parseImportText(text, time.Now().Unix())
	if len(items) == 0 {
		return c.Send(tr(c.Sender().ID, "import_no_links"))
	}
	uid := c.Sender().ID
	added := 0
	for _, item := range items {
		if _, err := addTorrentAt(c, item.link, item.ts); err != nil {
			_ = c.Send(fmt.Sprintf(tr(uid, "add_error"), err.Error()))
			continue
		}
		added++
	}
	return c.Send(fmt.Sprintf(tr(uid, "import_done"), added, len(items)))
}

// parseImportText accepts the web library JSON export or one link per line.
// Missing timestamps are filled newest-first so line order survives a re-sort.
func parseImportText(text string, nowSec int64) []importItem {
	text = strings.TrimPrefix(strings.TrimSpace(text), "\uFEFF")
	if text == "" {
		return nil
	}
	var items []importItem
	if text[0] == '[' || text[0] == '{' {
		if parsed, ok := parseImportJSON(text); ok {
			items = parsed
		}
	}
	if items == nil {
		items = parseImportLines(text)
	}
	return withImportTimestamps(dedupeImport(items), nowSec)
}

func parseImportJSON(text string) ([]importItem, bool) {
	var rows []importJSONRow
	if strings.HasPrefix(text, "{") {
		var one importJSONRow
		if err := json.Unmarshal([]byte(text), &one); err != nil {
			return nil, false
		}
		rows = []importJSONRow{one}
	} else if err := json.Unmarshal([]byte(text), &rows); err != nil {
		return nil, false
	}
	var items []importItem
	for _, row := range rows {
		link := importLinkFromRow(row)
		if link == "" {
			continue
		}
		items = append(items, importItem{link: link, ts: row.Timestamp})
	}
	if len(items) == 0 {
		return nil, false
	}
	return items, true
}

func importLinkFromRow(row importJSONRow) string {
	if token := strings.TrimSpace(row.TorrsHash); token != "" {
		return normalizeImportLink(token)
	}
	hash := strings.TrimSpace(row.Hash)
	if isHash(hash) {
		title := strings.TrimSpace(row.Title)
		if title == "" {
			title = strings.TrimSpace(row.Name)
		}
		link := "magnet:?xt=urn:btih:" + strings.ToLower(hash)
		if title != "" {
			link += "&dn=" + url.QueryEscape(title)
		}
		return link
	}
	return ""
}

func parseImportLines(text string) []importItem {
	var items []importItem
	for _, line := range strings.Split(text, "\n") {
		line = strings.TrimSpace(strings.TrimRight(line, "\r"))
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}
		if m := magnetRegex.FindString(line); m != "" {
			items = append(items, importItem{link: strings.TrimSpace(m)})
			continue
		}
		if m := torrsRegex.FindString(line); m != "" {
			items = append(items, importItem{link: normalizeImportLink(m)})
			continue
		}
		if m := hashRegex.FindString(line); isHash(m) {
			items = append(items, importItem{link: strings.ToLower(m)})
			continue
		}
	}
	return items
}

func normalizeImportLink(raw string) string {
	raw = strings.TrimSpace(raw)
	lower := strings.ToLower(raw)
	switch {
	case strings.HasPrefix(lower, "web+torrs://"):
		raw = "torrs://" + raw[len("web+torrs://"):]
	case strings.HasPrefix(lower, "torrs://"):
	default:
		raw = "torrs://" + strings.TrimLeft(raw, "/")
	}
	token := raw[len("torrs://"):]
	if isHash(token) {
		return "magnet:?xt=urn:btih:" + strings.ToLower(token)
	}
	return "torrs://" + token
}

func dedupeImport(items []importItem) []importItem {
	seen := map[string]bool{}
	var out []importItem
	for _, item := range items {
		key := strings.ToLower(item.link)
		if seen[key] {
			continue
		}
		seen[key] = true
		out = append(out, item)
	}
	return out
}

func withImportTimestamps(items []importItem, nowSec int64) []importItem {
	for i := range items {
		if items[i].ts <= 0 {
			items[i].ts = nowSec - int64(i)
		}
	}
	return items
}
