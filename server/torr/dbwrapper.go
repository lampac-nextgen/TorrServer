package torr

import (
	"encoding/json"
	"sync"

	"server/settings"
	"server/torr/state"
	"server/torr/utils"

	"github.com/anacrolix/torrent/metainfo"
)

func init() {
	settings.RegisterOnTorrentMutation(InvalidateDBTorrentsCache)
}

var (
	dbTorrentsMu sync.RWMutex
	dbTorrents   map[metainfo.Hash]*Torrent
)

// InvalidateDBTorrentsCache drops the in-memory cache of database torrents.
func InvalidateDBTorrentsCache() {
	dbTorrentsMu.Lock()
	dbTorrents = nil
	dbTorrentsMu.Unlock()
}

func loadDBTorrentsLocked() {
	ret := make(map[metainfo.Hash]*Torrent)
	list := settings.ListTorrent()
	for _, db := range list {
		if db == nil || db.TorrentSpec == nil {
			continue
		}
		torr := new(Torrent)
		torr.TorrentSpec = db.TorrentSpec
		torr.Title = db.Title
		torr.Poster = db.Poster
		torr.Category = db.Category
		torr.Timestamp = db.Timestamp
		torr.Size = db.Size
		torr.Data = db.Data
		torr.Stat = state.TorrentInDB
		ret[db.InfoHash] = torr
	}
	dbTorrents = ret
}

type tsFiles struct {
	TorrServer struct {
		Files []*state.TorrentFileStat `json:"Files"`
	} `json:"TorrServer"`
}

// FileStatsFromData parses the file list persisted in Torrent.Data by AddTorrentDB.
// Empty or invalid JSON returns nil.
func FileStatsFromData(data string) []*state.TorrentFileStat {
	if data == "" {
		return nil
	}
	var files tsFiles
	if err := json.Unmarshal([]byte(data), &files); err != nil {
		return nil
	}
	if len(files.TorrServer.Files) == 0 {
		return nil
	}
	return files.TorrServer.Files
}

func AddTorrentDB(torr *Torrent) {
	// Status() reads these fields under muTorrent. list can run while add's
	// background save is still filling Data.
	torr.muTorrent.Lock()
	spec := torr.TorrentSpec
	title := torr.Title
	category := torr.Category
	data := torr.Data
	poster := torr.Poster
	size := torr.Size
	timestamp := torr.Timestamp
	bt := torr.Torrent
	torr.muTorrent.Unlock()

	t := new(settings.TorrentDB)
	t.TorrentSpec = spec
	t.Title = title
	t.Category = category
	if data == "" {
		files := new(tsFiles)
		// Status locks muTorrent itself. Do not hold it across this call.
		files.TorrServer.Files = torr.Status().FileStats
		if buf, err := json.Marshal(files); err == nil {
			data = string(buf)
			torr.muTorrent.Lock()
			if torr.Data == "" {
				torr.Data = data
			} else {
				data = torr.Data
			}
			torr.muTorrent.Unlock()
		}
	}
	t.Data = data

	t.Poster = poster
	if t.Poster != "" {
		var existing string
		if db := GetTorrentDB(torr.Hash()); db != nil {
			existing = db.Poster
		}
		if existing != t.Poster {
			ok, verified := utils.CheckImgUrl(t.Poster)
			if !ok || (existing != "" && !verified) {
				t.Poster = existing
			}
		}
	}
	t.Size = size
	if t.Size == 0 && bt != nil {
		t.Size = bt.Length()
	}
	// don't override timestamp from DB on edit
	if existing := GetTorrentDB(torr.Hash()); existing != nil && existing.Timestamp != 0 {
		t.Timestamp = existing.Timestamp
	} else {
		t.Timestamp = timestamp
	}

	settings.AddTorrent(t)

	dbTorrentsMu.Lock()
	if dbTorrents != nil {
		if existing, ok := dbTorrents[t.InfoHash]; ok && existing != nil {
			existing.muTorrent.Lock()
			existing.TorrentSpec = t.TorrentSpec
			existing.Title = t.Title
			existing.Poster = t.Poster
			existing.Category = t.Category
			existing.Timestamp = t.Timestamp
			existing.Size = t.Size
			existing.Data = t.Data
			existing.Stat = state.TorrentInDB
			existing.muTorrent.Unlock()
		} else {
			torr := new(Torrent)
			torr.TorrentSpec = t.TorrentSpec
			torr.Title = t.Title
			torr.Poster = t.Poster
			torr.Category = t.Category
			torr.Timestamp = t.Timestamp
			torr.Size = t.Size
			torr.Data = t.Data
			torr.Stat = state.TorrentInDB
			dbTorrents[t.InfoHash] = torr
		}
	}
	dbTorrentsMu.Unlock()
}

func GetTorrentDB(hash metainfo.Hash) *Torrent {
	dbTorrentsMu.RLock()
	if dbTorrents != nil {
		torr := dbTorrents[hash]
		dbTorrentsMu.RUnlock()
		return torr
	}
	dbTorrentsMu.RUnlock()

	dbTorrentsMu.Lock()
	defer dbTorrentsMu.Unlock()
	if dbTorrents == nil {
		loadDBTorrentsLocked()
	}
	return dbTorrents[hash]
}

func RemTorrentDB(hash metainfo.Hash) {
	settings.RemTorrent(hash)
	dbTorrentsMu.Lock()
	if dbTorrents != nil {
		delete(dbTorrents, hash)
	}
	dbTorrentsMu.Unlock()
}

func ListTorrentsDB() map[metainfo.Hash]*Torrent {
	dbTorrentsMu.RLock()
	if dbTorrents != nil {
		ret := make(map[metainfo.Hash]*Torrent, len(dbTorrents))
		for h, t := range dbTorrents {
			ret[h] = t
		}
		dbTorrentsMu.RUnlock()
		return ret
	}
	dbTorrentsMu.RUnlock()

	dbTorrentsMu.Lock()
	defer dbTorrentsMu.Unlock()
	if dbTorrents == nil {
		loadDBTorrentsLocked()
	}
	ret := make(map[metainfo.Hash]*Torrent, len(dbTorrents))
	for h, t := range dbTorrents {
		ret[h] = t
	}
	return ret
}
