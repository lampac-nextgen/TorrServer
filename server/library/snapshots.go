package library

import (
	set "server/settings"
	"server/torr"
	"server/torr/state"
)

// ListSnapshots builds TorrentSnapshot values from the in-memory library.
func ListSnapshots() []TorrentSnapshot {
	var snaps []TorrentSnapshot
	for _, t := range torr.ListTorrent() {
		st := t.Status()
		if st == nil {
			continue
		}
		files := st.FileStats
		if len(files) == 0 && t.Stat == state.TorrentInDB {
			if loaded := torr.LoadTorrent(t); loaded != nil {
				st = loaded.Status()
				if st != nil {
					files = st.FileStats
				}
			}
		}
		snaps = append(snaps, TorrentSnapshot{
			Title:    st.Title,
			Category: st.Category,
			Hash:     st.Hash,
			Files:    files,
		})
	}
	return snaps
}

// ViewedMapFor loads viewed marks (and optional timecodes) for one hash or all torrents.
func ViewedMapFor(hash string) ViewedMap {
	out := ViewedMap{}
	for _, v := range set.ListViewed(hash) {
		if v == nil {
			continue
		}
		m := out[v.Hash]
		if m == nil {
			m = map[int]float64{}
			out[v.Hash] = m
		}
		m[v.FileIndex] = v.TimeCode
	}
	return out
}
