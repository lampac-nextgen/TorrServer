package offlinetest

import (
	"io"

	"github.com/anacrolix/torrent/metainfo"
	"github.com/anacrolix/torrent/storage"
)

// MemStore reports every piece complete and serves the torrent bytes.
// The fork dropped the file storage backend, so the seeder cannot use a directory.
type MemStore struct{ Data []byte }

func (m MemStore) OpenTorrent(*metainfo.Info, metainfo.Hash) (storage.TorrentImpl, error) {
	return m, nil
}
func (m MemStore) Close() error { return nil }
func (m MemStore) Piece(p metainfo.Piece) storage.PieceImpl {
	return memPiece{data: m.Data, p: p}
}

type memPiece struct {
	data []byte
	p    metainfo.Piece
}

func (p memPiece) ReadAt(b []byte, off int64) (int, error) {
	start := p.p.Offset() + off
	if start >= int64(len(p.data)) {
		return 0, io.EOF
	}
	n := copy(b, p.data[start:])
	if n < len(b) {
		return n, io.EOF
	}
	return n, nil
}
func (p memPiece) WriteAt(b []byte, _ int64) (int, error) { return len(b), nil }
func (p memPiece) MarkComplete() error                    { return nil }
func (p memPiece) MarkNotComplete() error                 { return nil }
func (p memPiece) Completion() storage.Completion {
	return storage.Completion{Complete: true, Ok: true}
}
