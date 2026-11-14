package auth

import (
	"path/filepath"
	"sync"
	"sync/atomic"

	"github.com/fsnotify/fsnotify"
	"github.com/gin-gonic/gin"

	"server/log"
	"server/settings"
)

// accs.db is re-read the moment it changes, so accounts can be added or removed
// without a restart. Idea from reyohoho/TorrServer (1496fa0a).
//
// The directory is watched, not the file: editors and scripts replace accs.db
// by rename, which drops a watch on the file itself. Nothing runs between
// events, so an idle server does no work.

// accsAuth is the middleware for the accounts loaded now, built once per load
// rather than once per request. Nil while there are no accounts.
var accsAuth atomic.Pointer[gin.HandlerFunc]

var (
	accsWatchMu   sync.Mutex
	accsWatchStop chan struct{}
	accsWatchDone chan struct{}
)

func accountsPath() string { return filepath.Join(settings.Path, "accs.db") }

// setupAccounts loads accs.db, installs the auth middleware and starts
// following the file. Without a readable accs.db there is nobody to log in as,
// and requests are not marked as needing auth until one appears.
func setupAccounts(engine *gin.Engine) {
	path := accountsPath()
	if !loadAccounts(path) {
		accsAuth.Store(nil)
	}
	engine.Use(func(c *gin.Context) {
		if h := accsAuth.Load(); h != nil {
			(*h)(c)
		}
	})
	startAccountsWatch(path)
}

// loadAccounts replaces the accounts with what path holds now. It reports
// false and keeps the previous ones when the file is missing or does not parse:
// a file caught half-written is followed by another event when it is complete,
// and deleting accs.db must not turn authentication off for /stream and /play.
func loadAccounts(path string) bool {
	accs := readAccounts(path)
	if accs == nil {
		return false
	}
	h := pairsAuth(processAccounts(accs))
	accsAuth.Store(&h)
	return true
}

// StopAccountsWatch stops following accs.db and waits for the watcher. Stop calls it.
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

func startAccountsWatch(path string) {
	accsWatchMu.Lock()
	defer accsWatchMu.Unlock()
	stopAccountsWatchLocked()

	w, err := fsnotify.NewWatcher()
	if err != nil {
		log.TLogln("accs.db is not followed:", err)
		return
	}
	dir := filepath.Dir(path)
	if err := w.Add(dir); err != nil {
		_ = w.Close()
		log.TLogln("accs.db is not followed:", err)
		return
	}
	stop, done := make(chan struct{}), make(chan struct{})
	accsWatchStop, accsWatchDone = stop, done
	name := filepath.Base(path)
	go func() {
		defer close(done)
		defer func() { _ = w.Close() }()
		for {
			select {
			case <-stop:
				return
			case ev, ok := <-w.Events:
				if !ok {
					return
				}
				if filepath.Base(ev.Name) != name || ev.Op == fsnotify.Chmod {
					continue
				}
				if loadAccounts(path) {
					log.TLogln("accs.db changed, accounts reloaded")
				} else {
					log.TLogln("accs.db unreadable, keeping the previous accounts")
				}
			case err, ok := <-w.Errors:
				if !ok {
					return
				}
				log.TLogln("accs.db watcher:", err)
			}
		}
	}()
}
