package main

import (
	"context"
	"encoding/binary"
	"net"
	"sync/atomic"
	"testing"
	"time"
)

// silentDNS is a UDP DNS server that reads queries and never answers
// (an unreachable or filtered resolver looks exactly like this).
func silentDNS(t *testing.T) string {
	t.Helper()
	pc, err := net.ListenPacket("udp4", "127.0.0.1:0")
	if err != nil {
		t.Fatalf("listen: %v", err)
	}
	t.Cleanup(func() { pc.Close() })
	go func() {
		buf := make([]byte, 1500)
		for {
			if _, _, err := pc.ReadFrom(buf); err != nil {
				return
			}
		}
	}()
	return pc.LocalAddr().String()
}

// answeringDNS answers every A query with 203.0.113.7 and every other query with
// an empty NOERROR; it counts A queries.
func answeringDNS(t *testing.T, aQueries *int32) string {
	t.Helper()
	pc, err := net.ListenPacket("udp4", "127.0.0.1:0")
	if err != nil {
		t.Fatalf("listen: %v", err)
	}
	t.Cleanup(func() { pc.Close() })
	go func() {
		buf := make([]byte, 1500)
		for {
			n, addr, err := pc.ReadFrom(buf)
			if err != nil {
				return
			}
			if resp := dnsReply(buf[:n], aQueries); resp != nil {
				pc.WriteTo(resp, addr)
			}
		}
	}()
	return pc.LocalAddr().String()
}

func dnsReply(q []byte, aQueries *int32) []byte {
	if len(q) < 12 {
		return nil
	}
	i := 12
	for i < len(q) && q[i] != 0 {
		i += int(q[i]) + 1
	}
	i++ // root label
	if i+4 > len(q) {
		return nil
	}
	qtype := binary.BigEndian.Uint16(q[i:])
	qend := i + 4
	resp := []byte{q[0], q[1], 0x81, 0x80, 0, 1, 0, 0, 0, 0, 0, 0}
	resp = append(resp, q[12:qend]...)
	if qtype == 1 { // A
		atomic.AddInt32(aQueries, 1)
		resp[7] = 1 // ANCOUNT
		resp = append(resp, 0xc0, 0x0c, 0, 1, 0, 1, 0, 0, 0, 60, 0, 4, 203, 0, 113, 7)
	}
	return resp
}

// systemResolver makes net.DefaultResolver ("system DNS") talk to addr.
func systemResolver(t *testing.T, addr string) {
	t.Helper()
	saved := net.DefaultResolver
	net.DefaultResolver = &net.Resolver{
		PreferGo: true,
		Dial: func(ctx context.Context, network, _ string) (net.Conn, error) {
			var d net.Dialer
			return d.DialContext(ctx, "udp4", addr)
		},
	}
	t.Cleanup(func() { net.DefaultResolver = saved })
}

func withDNSServers(t *testing.T, servers []string) {
	t.Helper()
	saved := append([]string(nil), dnsServers...)
	dnsServers = servers
	t.Cleanup(func() { dnsServers = saved })
}

// 1. The system DNS check must give up after the context deadline.
// It runs before the HTTP server starts, so every second here delays startup.
func TestSystemDNSCheckHonoursTimeout(t *testing.T) {
	systemResolver(t, silentDNS(t))

	const timeout = 200 * time.Millisecond
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	start := time.Now()
	done := make(chan bool, 1)
	go func() { done <- testSystemDNS(ctx) }()

	select {
	case ok := <-done:
		took := time.Since(start)
		if ok {
			t.Fatal("check passed although system DNS does not answer")
		}
		if took > 800*time.Millisecond {
			t.Fatalf("check took %v with Timeout=%v: the timeout is not applied", took.Round(10*time.Millisecond), timeout)
		}
		t.Logf("check gave up after %v (Timeout=%v)", took.Round(10*time.Millisecond), timeout)
	case <-time.After(5 * time.Second):
		t.Fatalf("check still running after 5s with Timeout=%v: the timeout is not applied", timeout)
	}
}

// 2. The custom resolver must use a server that answers, not just the first one
// a UDP "connection" could be opened to (UDP dial never fails for a silent server).
func TestCustomResolverSkipsSilentServer(t *testing.T) {
	var aQueries int32
	silent, good := silentDNS(t), answeringDNS(t, &aQueries)

	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	server := pickServer(ctx, []string{silent, good})
	if server != good {
		t.Fatalf("pickServer chose %q, want %q", server, good)
	}

	r := newPinnedResolver(server)
	lookupCtx, lookupCancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer lookupCancel()
	addrs, err := r.LookupHost(lookupCtx, dnsProbeHost)
	if err != nil {
		t.Fatalf("lookup via custom resolver failed (first server silent, second answers): %v", err)
	}
	if len(addrs) == 0 || addrs[0] != "203.0.113.7" {
		t.Fatalf("unexpected answer: %v", addrs)
	}
	t.Logf("custom resolver answered %v", addrs)
}

// 3. When system DNS passed the check, installDNS must not query the same name again:
// with a slow resolver the second lookup doubles the startup delay.
func TestDnsResolveSingleLookupWhenSystemDNSWorks(t *testing.T) {
	var aQueries int32
	systemResolver(t, answeringDNS(t, &aQueries))
	withDNSServers(t, []string{answeringDNS(t, new(int32))})

	installDNS(dnsBudget)

	if n := atomic.LoadInt32(&aQueries); n != 1 {
		t.Fatalf("system DNS was asked %d times for the same name, expected 1", n)
	}
	t.Log("system DNS asked once")
}

// 4. installDNS must return within its budget even when system DNS never answers.
func TestInstallDNSBudgetCeiling(t *testing.T) {
	systemResolver(t, silentDNS(t))
	withDNSServers(t, []string{silentDNS(t)})

	const budget = 200 * time.Millisecond
	start := time.Now()
	done := make(chan struct{})
	go func() {
		installDNS(budget)
		close(done)
	}()

	select {
	case <-done:
		took := time.Since(start)
		if took > 800*time.Millisecond {
			t.Fatalf("installDNS took %v with budget %v", took.Round(10*time.Millisecond), budget)
		}
		t.Logf("installDNS returned after %v (budget %v)", took.Round(10*time.Millisecond), budget)
	case <-time.After(5 * time.Second):
		t.Fatal("installDNS still running after 5s: startup budget is not applied")
	}
}

// Silent system DNS uses the whole budget. A public server that already
// answered is pinned after that, not instead of waiting.
func TestInstallDNSPinsPublicWhenSystemSilent(t *testing.T) {
	systemResolver(t, silentDNS(t))
	var aQueries int32
	withDNSServers(t, []string{answeringDNS(t, &aQueries)})

	const budget = 200 * time.Millisecond
	start := time.Now()
	installDNS(budget)
	took := time.Since(start)
	if took < 150*time.Millisecond {
		t.Fatalf("installDNS returned in %v, before the system DNS budget", took.Round(10*time.Millisecond))
	}
	if took > 800*time.Millisecond {
		t.Fatalf("installDNS took %v with budget %v", took.Round(10*time.Millisecond), budget)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 200*time.Millisecond)
	defer cancel()
	addrs, err := net.DefaultResolver.LookupHost(ctx, dnsProbeHost)
	if err != nil {
		t.Fatalf("resolver was not pinned before installDNS returned: %v", err)
	}
	if len(addrs) == 0 || addrs[0] != "203.0.113.7" {
		t.Fatalf("unexpected answer: %v", addrs)
	}
	t.Logf("pinned public resolver in %v, answered %v", took.Round(10*time.Millisecond), addrs)
}

// A system resolver that answers within the budget stays, even when a public
// server answered first.
func TestInstallDNSKeepsSlowSystemDNS(t *testing.T) {
	sys := answeringDNS(t, new(int32))
	saved := net.DefaultResolver
	net.DefaultResolver = &net.Resolver{
		PreferGo: true,
		Dial: func(ctx context.Context, network, _ string) (net.Conn, error) {
			timer := time.NewTimer(150 * time.Millisecond)
			select {
			case <-ctx.Done():
				timer.Stop()
				return nil, ctx.Err()
			case <-timer.C:
			}
			var d net.Dialer
			return d.DialContext(ctx, "udp4", sys)
		},
	}
	t.Cleanup(func() { net.DefaultResolver = saved })
	withDNSServers(t, []string{answeringDNS(t, new(int32))})

	kept := net.DefaultResolver
	start := time.Now()
	installDNS(time.Second)
	if time.Since(start) < 100*time.Millisecond {
		t.Fatal("returned before slow system DNS could answer")
	}
	if net.DefaultResolver != kept {
		t.Fatal("public resolver replaced system DNS that answered within the budget")
	}
	t.Logf("kept system DNS after %v", time.Since(start).Round(10*time.Millisecond))
}
