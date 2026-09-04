package tgbot

import (
	"context"
	"fmt"
	"strconv"
	"strings"
	"sync"
	"time"

	"server/library"
	"server/rutor"
	"server/rutor/models"
	sets "server/settings"
	"server/torr"
	"server/torznab"

	tele "gopkg.in/telebot.v4"
)

const inlinePageSize = 20

type inlinePick struct {
	private bool
	link    string
	expires time.Time
}

type inlineSearchCache struct {
	query   string
	results []*models.TorrentDetails
	expires time.Time
}

var (
	inlinePickMu   sync.Mutex
	inlinePicks    = make(map[string]*inlinePick)
	inlineSearchMu sync.Mutex
	inlineSearches = make(map[int64]*inlineSearchCache)
)

func inlinePickKey(uid int64, resultID string) string {
	return strconv.FormatInt(uid, 10) + ":" + resultID
}

func storeInlinePick(uid int64, resultID, link string, private bool) {
	inlinePickMu.Lock()
	defer inlinePickMu.Unlock()
	if len(inlinePicks) > 2000 {
		now := time.Now()
		for k, v := range inlinePicks {
			if v == nil || now.After(v.expires) {
				delete(inlinePicks, k)
			}
		}
	}
	inlinePicks[inlinePickKey(uid, resultID)] = &inlinePick{
		private: private,
		link:    link,
		expires: time.Now().Add(10 * time.Minute),
	}
}

func takeInlinePick(uid int64, resultID string) *inlinePick {
	key := inlinePickKey(uid, resultID)
	inlinePickMu.Lock()
	defer inlinePickMu.Unlock()
	p := inlinePicks[key]
	if p == nil || time.Now().After(p.expires) {
		delete(inlinePicks, key)
		return nil
	}
	return p
}

func handleInlineQuery(c tele.Context) error {
	q := c.Query()
	if q == nil {
		return nil
	}
	query := strings.TrimSpace(q.Text)
	uid := int64(0)
	if q.Sender != nil {
		uid = q.Sender.ID
	}
	offset := 0
	if q.Offset != "" {
		offset, _ = strconv.Atoi(q.Offset)
		if offset < 0 {
			offset = 0
		}
	}
	private := q.ChatType == "sender"
	lower := strings.ToLower(query)

	var results tele.Results
	next := ""

	switch {
	case query == "" || lower == "list" || lower == "play":
		results, next = inlineLibrary(offset)
	case len(query) >= 2:
		results, next = inlineSearch(uid, query, offset, private)
	}

	resp := &tele.QueryResponse{
		Results:    results,
		CacheTime:  15,
		IsPersonal: true,
		NextOffset: next,
	}
	if len(results) == 0 {
		resp.Results = tele.Results{&tele.ArticleResult{
			ResultBase:  tele.ResultBase{ID: "empty"},
			Title:       tr(uid, "no_torrents"),
			Description: tr(uid, "add_magnet"),
			Text:        tr(uid, "add_magnet"),
		}}
		resp.SwitchPMText = tr(uid, "inline_open_bot")
		resp.SwitchPMParameter = "add"
	}
	return c.Answer(resp)
}

func inlineLibrary(offset int) (tele.Results, string) {
	torrents := torr.ListTorrent()
	if offset >= len(torrents) {
		return nil, ""
	}
	end := offset + inlinePageSize
	if end > len(torrents) {
		end = len(torrents)
	}
	host := getHost()
	var results tele.Results
	for i, t := range torrents[offset:end] {
		hash := t.Hash().HexString()
		url := library.ShortPlayURL(host, hash, 1)
		title := t.Title
		if title == "" {
			title = hash[:8]
		}
		if len([]rune(title)) > 60 {
			title = string([]rune(title)[:57]) + "..."
		}
		id := fmt.Sprintf("l%d", offset+i)
		item := &tele.ArticleResult{
			ResultBase:  tele.ResultBase{ID: id},
			Title:       "▶ " + title,
			Description: hash[:8] + "…",
			URL:         url,
			Text:        url,
		}
		if isPosterURL(t.Poster) {
			item.ThumbURL = t.Poster
		}
		results = append(results, item)
	}
	next := ""
	if end < len(torrents) {
		next = strconv.Itoa(end)
	}
	return results, next
}

func inlineSearch(uid int64, query string, offset int, private bool) (tele.Results, string) {
	if sets.BTsets == nil || (!sets.BTsets.EnableRutorSearch && !sets.BTsets.EnableTorznabSearch) {
		return nil, ""
	}
	list := loadInlineSearch(uid, query)
	if offset >= len(list) {
		return nil, ""
	}
	end := offset + inlinePageSize
	if end > len(list) {
		end = len(list)
	}
	var results tele.Results
	for i, item := range list[offset:end] {
		if item == nil {
			continue
		}
		link := item.Magnet
		if link == "" {
			link = item.Link
		}
		if link == "" {
			continue
		}
		title := item.Title
		if len([]rune(title)) > 60 {
			title = string([]rune(title)[:57]) + "..."
		}
		size := item.Size
		if size == "" {
			size = "?"
		}
		id := fmt.Sprintf("s%d", offset+i)
		text := link
		if private {
			text = fmt.Sprintf(tr(uid, "inline_add_private"), title)
		}
		art := &tele.ArticleResult{
			ResultBase:  tele.ResultBase{ID: id},
			Title:       "➕ " + title,
			Description: fmt.Sprintf("%s S:%d P:%d", size, item.Seed, item.Peer),
			Text:        text,
		}
		storeInlinePick(uid, id, link, private)
		results = append(results, art)
	}
	next := ""
	if end < len(list) {
		next = strconv.Itoa(end)
	}
	return results, next
}

func loadInlineSearch(uid int64, query string) []*models.TorrentDetails {
	inlineSearchMu.Lock()
	cached := inlineSearches[uid]
	if cached != nil && cached.query == query && time.Now().Before(cached.expires) {
		list := cached.results
		inlineSearchMu.Unlock()
		return list
	}
	inlineSearchMu.Unlock()

	var list []*models.TorrentDetails
	if sets.BTsets.EnableRutorSearch {
		list = append(list, rutor.Search(query)...)
	}
	if sets.BTsets.EnableTorznabSearch {
		list = append(list, torznab.Search(context.Background(), query, -1, "", 0, 0)...)
	}

	inlineSearchMu.Lock()
	inlineSearches[uid] = &inlineSearchCache{
		query:   query,
		results: list,
		expires: time.Now().Add(2 * time.Minute),
	}
	inlineSearchMu.Unlock()
	return list
}

func handleInlineChosen(c tele.Context) error {
	ir := c.InlineResult()
	if ir == nil || ir.Sender == nil {
		return nil
	}
	pick := takeInlinePick(ir.Sender.ID, ir.ResultID)
	if pick == nil || !pick.private || pick.link == "" {
		return nil
	}
	if !strings.HasPrefix(strings.ToLower(pick.link), "magnet:") &&
		!strings.HasPrefix(strings.ToLower(pick.link), "torrs://") &&
		!isHash(pick.link) &&
		!strings.HasPrefix(strings.ToLower(pick.link), "http") {
		return nil
	}
	notifyTyping(c)
	tor, err := addTorrent(c, pick.link)
	if err != nil {
		return err
	}
	return afterAdd(c, tor)
}
