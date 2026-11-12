package auth

import (
	"os"
	"path/filepath"
	"sync"
	"sync/atomic"
	"time"

	"github.com/gin-gonic/gin"

	"server/log"
	"server/settings"
)

// accs.db is re-read when it changes, so accounts can be added or removed
// without a restart. Idea from reyohoho/TorrServer (1496fa0a).
//
// There is no watcher goroutine: a request checks the file's mtime and size, at
// most once per accsCheckInterval. An idle server does nothing.

// accsCheckInterval is the shortest time between two checks of accs.db. Tests shorten it.
var accsCheckInterval = 5 * time.Second

var accsPairs atomic.Pointer[authPairs]

// accsFile is the file being followed and the version of it that was loaded.
type accsFile struct {
	path      string
	interval  time.Duration
	lastCheck atomic.Int64 // unix nanoseconds
	mu        sync.Mutex   // one reload at a time; guards mod and size
	mod       time.Time
	size      int64
}

func accountsPath() string { return filepath.Join(settings.Path, "accs.db") }

// setupAccounts loads accs.db and installs the auth middleware. Without a
// readable accs.db there is nobody to log in as, and requests are not marked as
// needing auth until one appears.
func setupAccounts(engine *gin.Engine) {
	f := &accsFile{path: accountsPath(), interval: accsCheckInterval, size: -1}
	if fi, err := os.Stat(f.path); err == nil {
		f.mod, f.size = fi.ModTime(), fi.Size()
	}
	if !loadAccounts(f.path) {
		accsPairs.Store(nil)
	}
	f.lastCheck.Store(time.Now().UnixNano())
	engine.Use(func(c *gin.Context) {
		f.refresh()
		if p := accsPairs.Load(); p != nil {
			pairsAuth(*p)(c)
		}
	})
}

// loadAccounts replaces the accounts with what path holds now. It reports
// false and keeps the previous ones when the file is missing or does not parse.
func loadAccounts(path string) bool {
	accs := readAccounts(path)
	if accs == nil {
		return false
	}
	pairs := processAccounts(accs)
	accsPairs.Store(&pairs)
	return true
}

// refresh reloads accs.db if it changed since the last look. A file that is gone
// or caught half-written keeps the accounts in place: deleting accs.db must not
// turn authentication off for /stream and /play.
func (f *accsFile) refresh() {
	now := time.Now().UnixNano()
	last := f.lastCheck.Load()
	if now-last < int64(f.interval) || !f.lastCheck.CompareAndSwap(last, now) {
		return
	}
	if !f.mu.TryLock() {
		return
	}
	defer f.mu.Unlock()
	fi, err := os.Stat(f.path)
	if err != nil || (fi.ModTime().Equal(f.mod) && fi.Size() == f.size) {
		return
	}
	// Remember this version either way: an unreadable file is retried when it
	// changes again, not on every check.
	f.mod, f.size = fi.ModTime(), fi.Size()
	if !loadAccounts(f.path) {
		log.TLogln("accs.db unreadable, keeping the previous accounts")
		return
	}
	log.TLogln("accs.db changed, accounts reloaded")
}
