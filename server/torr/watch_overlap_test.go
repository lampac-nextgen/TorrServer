package torr

import (
	"runtime"
	"testing"
	"time"
)

// TestTickProgressDoesNotPileUp: watch ticks every second. While muTorrent (or the client lock
// under it) is stuck, each tick used to start another progressEvent that waited for the same
// lock. A wedged torrent collected 17k goroutines. One must be in flight, and the next tick
// after the lock frees must run again.
func TestTickProgressDoesNotPileUp(t *testing.T) {
	tor := &Torrent{expiredTime: time.Now().Add(time.Hour)}

	tor.muTorrent.Lock()
	base := runtime.NumGoroutine()
	for i := 0; i < 200; i++ {
		tor.tickProgress()
	}
	time.Sleep(20 * time.Millisecond)
	if extra := runtime.NumGoroutine() - base; extra > 1 {
		tor.muTorrent.Unlock()
		t.Fatalf("%d goroutines wait for muTorrent after 200 ticks, want at most 1", extra)
	}
	tor.muTorrent.Unlock()

	waitProgressIdle(t, tor)

	before := tor.lastTimeSpeedSnapshot()
	tor.tickProgress()
	waitProgressIdle(t, tor)
	if !tor.lastTimeSpeedSnapshot().After(before) {
		t.Fatal("tick after the lock was released did not run progressEvent")
	}
}

func waitProgressIdle(t *testing.T, tor *Torrent) {
	t.Helper()
	deadline := time.Now().Add(2 * time.Second)
	for tor.progressBusy.Load() {
		if time.Now().After(deadline) {
			t.Fatal("progressEvent did not finish after muTorrent was released")
		}
		time.Sleep(5 * time.Millisecond)
	}
}

func (t *Torrent) lastTimeSpeedSnapshot() time.Time {
	t.muTorrent.Lock()
	defer t.muTorrent.Unlock()
	return t.lastTimeSpeed
}
