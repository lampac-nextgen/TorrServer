package library

import (
	"fmt"
	"net/url"
	"path/filepath"
	"strconv"
	"strings"

	"server/torr/state"
)

// PlayURL is the long stream URL: /stream/{name}?link={hash}&index={id}&play
func PlayURL(base, hash, path string, fileID int) string {
	name := filepath.Base(path)
	if name == "" || name == "." {
		name = "file"
	}
	return strings.TrimRight(base, "/") + "/stream/" + url.PathEscape(name) +
		"?link=" + url.QueryEscape(hash) + "&index=" + strconv.Itoa(fileID) + "&play"
}

// ShortPlayURL is /play/{hash}/{id}.
func ShortPlayURL(base, hash string, fileID int) string {
	return strings.TrimRight(base, "/") + "/play/" + url.PathEscape(hash) + "/" + strconv.Itoa(fileID)
}

// PlaylistURL is /playlist?hash=… or /playlistall/all.m3u when hash is empty.
func PlaylistURL(base, hash string) string {
	if hash == "" {
		return strings.TrimRight(base, "/") + "/playlistall/all.m3u"
	}
	return strings.TrimRight(base, "/") + "/playlist?hash=" + url.QueryEscape(hash)
}

// PlaylistAllURL is /playlistall/all.m3u with an optional category query.
func PlaylistAllURL(base, category string) string {
	u := strings.TrimRight(base, "/") + "/playlistall/all.m3u"
	if strings.TrimSpace(category) != "" {
		u += "?category=" + url.QueryEscape(category)
	}
	return u
}

// FormatEpisodeCode returns SxxEyy / Exx / Sxx, or empty if both are zero.
func FormatEpisodeCode(season, episode int) string {
	if season <= 0 && episode <= 0 {
		return ""
	}
	if season <= 0 {
		return fmt.Sprintf("E%02d", episode)
	}
	if episode <= 0 {
		return fmt.Sprintf("S%02d", season)
	}
	return fmt.Sprintf("S%02dE%02d", season, episode)
}

// FilePlayURLs returns long and short play URLs for a torrent file.
func FilePlayURLs(base string, st *state.TorrentStatus, f *state.TorrentFileStat) (play, short string) {
	if st == nil || f == nil {
		return "", ""
	}
	return PlayURL(base, st.Hash, f.Path, f.Id), ShortPlayURL(base, st.Hash, f.Id)
}
