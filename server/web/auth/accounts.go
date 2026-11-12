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

// accsPollInterval is how often accs.db is checked for changes. Tests shorten it.
var accsPollInterval = 5 * time.Second

var (
	accsPairs atomic.Pointer[authPairs]

	accsWatchMu   sync.Mutex
	accsWatchStop chan struct{}
	accsWatchDone chan struct{}
)

func accountsPath() string { return filepath.Join(settings.Path, "accs.db") }

// setupAccounts loads accs.db, installs the auth middleware and starts the
// watcher. Without a readable accs.db there is nobody to log in as, and
// requests are not marked as needing auth until one appears.
func setupAccounts(engine *gin.Engine) {
	path := accountsPath()
	fi, statErr := os.Stat(path)
	loadAccounts(path)
	engine.Use(func(c *gin.Context) {
		if p := accsPairs.Load(); p != nil {
			pairsAuth(*p)(c)
		}
	})
	startAccountsWatch(path, fi, statErr == nil, accsPollInterval)
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

// StopAccountsWatch stops the accs.db watcher and waits for it. Stop calls it.
func StopAccountsWatch() {
	accsWatchMu.Lock()
	defer accsWatchMu.Unlock()
	stopAccountsWatchLocked()
}

func stopAccountsWatchLocked() {
	if accsWatchStop == nil {
		return
	}
	close(accsWatchStop)
	<-accsWatchDone
	accsWatchStop, accsWatchDone = nil, nil
}

func startAccountsWatch(path string, fi os.FileInfo, exists bool, interval time.Duration) {
	accsWatchMu.Lock()
	defer accsWatchMu.Unlock()
	stopAccountsWatchLocked()
	// A start without accs.db has no accounts to keep: forget the last run's.
	if !exists {
		accsPairs.Store(nil)
	}
	stop, done := make(chan struct{}), make(chan struct{})
	accsWatchStop, accsWatchDone = stop, done
	var lastMod time.Time
	var lastSize int64 = -1
	if exists {
		lastMod, lastSize = fi.ModTime(), fi.Size()
	}
	go func() {
		defer close(done)
		ticker := time.NewTicker(interval)
		defer ticker.Stop()
		for {
			select {
			case <-stop:
				return
			case <-ticker.C:
			}
			lastMod, lastSize = reloadAccounts(path, lastMod, lastSize)
		}
	}()
}

// reloadAccounts reloads accs.db when its modification time or size differ
// from the last ones seen and returns the new ones. A file that is gone or
// caught half-written keeps the accounts in place: deleting accs.db must not
// turn authentication off for /stream and /play.
func reloadAccounts(path string, lastMod time.Time, lastSize int64) (time.Time, int64) {
	fi, err := os.Stat(path)
	if err != nil {
		return lastMod, lastSize
	}
	if fi.ModTime().Equal(lastMod) && fi.Size() == lastSize {
		return lastMod, lastSize
	}
	if !loadAccounts(path) {
		// Remember this version: retry when the file changes again, not every tick.
		log.TLogln("accs.db unreadable, keeping the previous accounts")
		return fi.ModTime(), fi.Size()
	}
	log.TLogln("accs.db changed, accounts reloaded")
	return fi.ModTime(), fi.Size()
}
