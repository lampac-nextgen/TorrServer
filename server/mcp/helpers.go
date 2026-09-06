package mcp

import (
	"fmt"
	"strings"

	"server/dlna"
	gstreamer "server/gstreamer/bridge"
	"server/library"
	"server/log"
	set "server/settings"
	"server/torr"
	"server/torr/state"
	"server/utils"
	apiutils "server/web/api/utils"

	"github.com/anacrolix/torrent"
)

func validInfoHash(h string) bool {
	if len(h) != 40 {
		return false
	}
	for _, c := range h {
		if (c < '0' || c > '9') && (c < 'a' || c > 'f') && (c < 'A' || c > 'F') {
			return false
		}
	}
	return true
}

func parseTorrentLink(link string) (*torrent.TorrentSpec, string, string, string, error) {
	link = strings.TrimSpace(strings.ReplaceAll(link, "&amp;", "&"))
	if link == "" {
		return nil, "", "", "", fmt.Errorf("link is empty")
	}
	if strings.HasPrefix(strings.ToLower(link), "torrs://") {
		spec, th, err := apiutils.ParseTorrsHash(link)
		if err != nil {
			return nil, "", "", "", err
		}
		title, poster, category := "", "", ""
		if th != nil {
			title = th.Title()
			poster = th.Poster()
			category = th.Category()
		}
		return spec, title, poster, category, nil
	}
	spec, err := apiutils.ParseLink(link)
	if err != nil {
		return nil, "", "", "", err
	}
	return spec, "", "", "", nil
}

func loadTorrent(hash string) (*torr.Torrent, error) {
	if !validInfoHash(hash) {
		return nil, fmt.Errorf("invalid torrent hash")
	}
	tor := torr.GetTorrent(hash)
	if tor == nil {
		return nil, fmt.Errorf("torrent not found")
	}
	st := tor.Status()
	if tor.Stat == state.TorrentInDB || (st != nil && len(st.FileStats) == 0) {
		if loaded := torr.LoadTorrent(tor); loaded != nil {
			return loaded, nil
		}
	}
	return tor, nil
}

func listSnapshots() []library.TorrentSnapshot {
	return library.ListSnapshots()
}

func viewedMap(hash string) library.ViewedMap {
	return library.ViewedMapFor(hash)
}

func viewedSet(hash string) map[int]set.Viewed {
	m := map[int]set.Viewed{}
	for _, v := range set.ListViewed(hash) {
		if v != nil {
			m[v.FileIndex] = *v
		}
	}
	return m
}

func restartDLNA() {
	if set.BTsets != nil && set.BTsets.EnableDLNA {
		dlna.Stop()
		dlna.Start()
	}
}

func afterRemove(hash string) {
	gstreamer.Remove(hash)
	restartDLNA()
}

func compactStatus(st *state.TorrentStatus) torrentSummary {
	if st == nil {
		return torrentSummary{}
	}
	return torrentSummary{
		Title:      st.Title,
		Name:       st.Name,
		Category:   st.Category,
		Hash:       st.Hash,
		Poster:     st.Poster,
		Stat:       st.StatString,
		Size:       st.TorrentSize,
		LoadedSize: st.LoadedSize,
		FileCount:  len(st.FileStats),
	}
}

func fileInfos(base string, st *state.TorrentStatus) []fileInfo {
	if st == nil {
		return nil
	}
	viewed := viewedSet(st.Hash)
	var files []fileInfo
	for _, f := range st.FileStats {
		if f == nil {
			continue
		}
		info := fileInfo{
			ID:      f.Id,
			Path:    f.Path,
			Length:  f.Length,
			Mime:    utils.GetMimeType(f.Path),
			PlayURL: playURL(base, st.Hash, f.Path, f.Id),
		}
		if v, ok := viewed[f.Id]; ok {
			info.Viewed = true
			info.TimeCode = v.TimeCode
		}
		if s, e, ok := library.ParseEpisode(f.Path); ok {
			info.Season = s
			info.Episode = e
			info.Code = formatEpisodeCode(s, e)
		}
		files = append(files, info)
	}
	return files
}

func logAdd(link string) {
	log.TLogln("mcp add torrent", link)
}
