package main

import (
	"context"
	"net"
	"sync"
	"testing"
	"time"
)

// startDNSStub answers every A query with ip and every other type with an
// empty NOERROR reply, over loopback UDP.
func startDNSStub(t *testing.T, ip net.IP) string {
	t.Helper()
	pc, err := net.ListenPacket("udp", "127.0.0.1:0")
	if err != nil {
		t.Skipf("udp loopback unavailable: %v", err)
	}
	var wg sync.WaitGroup
	wg.Add(1)
	go func() {
		defer wg.Done()
		buf := make([]byte, 1500)
		for {
			n, addr, err := pc.ReadFrom(buf)
			if err != nil {
				return
			}
			if resp := dnsReply(buf[:n], ip); resp != nil {
				_, _ = pc.WriteTo(resp, addr)
			}
		}
	}()
	t.Cleanup(func() { _ = pc.Close(); wg.Wait() })
	return pc.LocalAddr().String()
}

func dnsReply(q []byte, ip net.IP) []byte {
	if len(q) < 12 {
		return nil
	}
	i := 12
	for i < len(q) && q[i] != 0 {
		i += int(q[i]) + 1
	}
	end := i + 5 // root label + qtype + qclass
	if end > len(q) {
		return nil
	}
	qtype := uint16(q[i+1])<<8 | uint16(q[i+2])
	resp := append([]byte(nil), q[:end]...)
	resp[2] = 0x81 // QR, RD
	resp[3] = 0x80 // RA, NOERROR
	resp[6], resp[7], resp[8], resp[9], resp[10], resp[11] = 0, 0, 0, 0, 0, 0
	if qtype == 1 && ip.To4() != nil {
		resp[7] = 1
		resp = append(resp, 0xC0, 0x0C, 0, 1, 0, 1, 0, 0, 0, 60, 0, 4)
		resp = append(resp, ip.To4()...)
	}
	return resp
}

// stubResolver is a resolver that sends every query to server.
func stubResolver(server string) *net.Resolver {
	return &net.Resolver{
		PreferGo: true,
		Dial: func(ctx context.Context, network, _ string) (net.Conn, error) {
			d := net.Dialer{Resolver: literalAddrResolver}
			return d.DialContext(ctx, network, server)
		},
	}
}

func swapDefaultResolver(t *testing.T, r *net.Resolver) {
	t.Helper()
	prev := net.DefaultResolver
	net.DefaultResolver = r
	t.Cleanup(func() { net.DefaultResolver = prev })
}

func TestCheckAndResolveSystemOK(t *testing.T) {
	good := startDNSStub(t, net.ParseIP("93.184.216.34"))
	swapDefaultResolver(t, stubResolver(good))

	d := NewDNSChecker(DNSConfig{PrimaryServers: []string{"127.0.0.1:1"}, Timeout: 2 * time.Second, CacheDuration: time.Minute})
	if got := d.CheckAndResolve(); got != net.DefaultResolver {
		t.Fatal("expected system resolver")
	}
	if d.useFallback || d.customResolver != nil {
		t.Fatal("custom resolver must stay unset")
	}
}

func TestCheckAndResolveHijackedSystemUsesCustom(t *testing.T) {
	bad := startDNSStub(t, net.ParseIP("127.0.0.1"))
	good := startDNSStub(t, net.ParseIP("93.184.216.34"))
	swapDefaultResolver(t, stubResolver(bad))

	d := NewDNSChecker(DNSConfig{
		PrimaryServers:  []string{bad},
		FallbackServers: []string{good},
		Timeout:         2 * time.Second,
		CacheDuration:   time.Minute,
	})
	r := d.CheckAndResolve()
	if r == nil || r == net.DefaultResolver || !d.useFallback {
		t.Fatalf("expected custom resolver, got %v fallback=%v", r, d.useFallback)
	}
	addrs, err := r.LookupHost(context.Background(), "themoviedb.org")
	if err != nil || len(addrs) == 0 || addrs[0] != "93.184.216.34" {
		t.Fatalf("custom lookup = %v %v", addrs, err)
	}

	// LookupHostWithFallback goes through the custom resolver and caches.
	got, err := d.LookupHostWithFallback("example.test")
	if err != nil || len(got) == 0 || got[0] != "93.184.216.34" {
		t.Fatalf("fallback lookup = %v %v", got, err)
	}
	if _, ok := d.getFromCache("example.test"); !ok {
		t.Fatal("result not cached")
	}
}

func TestInitCustomResolverNoServerAnswers(t *testing.T) {
	bad := startDNSStub(t, net.ParseIP("127.0.0.1"))
	d := NewDNSChecker(DNSConfig{PrimaryServers: []string{bad}, Timeout: 300 * time.Millisecond, CacheDuration: time.Minute})
	d.initCustomResolver()
	if d.customResolver != net.DefaultResolver || d.useFallback {
		t.Fatalf("resolver=%v fallback=%v", d.customResolver, d.useFallback)
	}
}

func TestPickServerSkipsDeadServer(t *testing.T) {
	// a port nobody listens on: the query is refused and that server is skipped
	closed, err := net.ListenPacket("udp", "127.0.0.1:0")
	if err != nil {
		t.Skip(err)
	}
	closedAddr := closed.LocalAddr().String()
	_ = closed.Close()
	good := startDNSStub(t, net.ParseIP("93.184.216.34"))

	d := NewDNSChecker(DNSConfig{
		PrimaryServers:  []string{closedAddr},
		FallbackServers: []string{good},
		Timeout:         time.Second,
		CacheDuration:   time.Minute,
	})
	if got := d.pickServer(); got != good {
		t.Fatalf("pickServer = %q, want %q", got, good)
	}
}
