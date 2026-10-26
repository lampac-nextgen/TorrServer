package bonjour

import (
	"runtime"
	"testing"
	"time"

	"server/leakcheck"
	"server/settings"
)

func TestStartStopNoGoroutineLeak(t *testing.T) {
	// grandcat/zeroconf Shutdown closes UDP conns while mainloop still reads them.
	// Under -race that fails the process; bookkeeping is covered by fake-announcer tests.
	if underRaceDetector {
		t.Skip("zeroconf Shutdown races mainloop under -race")
	}

	oldPort, oldSsl, oldSets := settings.Port, settings.Ssl, settings.BTsets
	settings.Port = "18099"
	settings.Ssl = false
	settings.BTsets = &settings.BTSets{FriendlyName: "Leak"}
	t.Cleanup(func() {
		Stop()
		settings.Port, settings.Ssl, settings.BTsets = oldPort, oldSsl, oldSets
	})

	base := runtime.NumGoroutine()
	Start()
	Stop()
	// zeroconf's probe announces on uninterruptible 1s then 2s sleeps and does
	// not watch Shutdown. Wait that out, then the helper must see them gone.
	deadline := time.Now().Add(4 * time.Second)
	for time.Now().Before(deadline) && runtime.NumGoroutine() > base {
		time.Sleep(50 * time.Millisecond)
	}
	leakcheck.AssertNoGoroutineLeak(t, base)
}
