package main

import (
	"context"
	"errors"
	"net"
	"strings"
	"sync"
	"time"

	"server/log"
)

const (
	dnsProbeHost = "themoviedb.org"
	dnsBudget    = time.Second
)

// dnsServers is the public resolver list probed in parallel with system DNS.
// Tests replace it; installDNS copies the slice before use.
var dnsServers = []string{
	"8.8.8.8:53",        // Google
	"1.1.1.1:53",        // Cloudflare
	"9.9.9.9:53",        // Quad9
	"208.67.222.222:53", // OpenDNS
	"64.6.64.6:53",      // Verisign
}

// installDNS keeps system DNS when it answers with a normal address within
// budget. Otherwise it pins the first public server that really answered,
// or keeps system DNS if none did. Public servers are asked in parallel so a
// silent system resolver costs the budget once, not twice.
func installDNS(budget time.Duration) {
	if budget <= 0 {
		budget = dnsBudget
	}
	servers := append([]string(nil), dnsServers...)
	ctx, cancel := context.WithTimeout(context.Background(), budget)
	defer cancel()

	systemCh := make(chan bool, 1)
	go func() { systemCh <- testSystemDNS(ctx) }()
	publicCh := make(chan string, 1)
	go func() { publicCh <- pickServer(ctx, servers) }()

	if <-systemCh {
		log.TLogln("System DNS check passed")
		return
	}
	if server := <-publicCh; server != "" {
		log.TLogln("Using DNS server:", server)
		net.DefaultResolver = newPinnedResolver(server)
		return
	}
	log.TLogln("No DNS server from the list answered, keeping system resolver")
}

func testSystemDNS(ctx context.Context) bool {
	addrs, err := net.DefaultResolver.LookupHost(ctx, dnsProbeHost)
	if err != nil {
		if !errors.Is(err, context.Canceled) && !errors.Is(err, context.DeadlineExceeded) {
			log.TLogln("DNS lookup error:", err)
		}
		return false
	}
	if len(addrs) == 0 {
		log.TLogln("DNS lookup returned no addresses")
		return false
	}
	for _, addr := range addrs {
		if isSuspiciousAddress(addr) {
			log.TLogln("Suspicious DNS address detected:", addr)
			return false
		}
	}
	return true
}

func answersOK(addrs []string) bool {
	if len(addrs) == 0 {
		return false
	}
	for _, addr := range addrs {
		if isSuspiciousAddress(addr) {
			return false
		}
	}
	return true
}

// 10. and 172.16/12 are left out: they show up on real LAN DNS.
func isSuspiciousAddress(addr string) bool {
	suspiciousPrefixes := []string{
		"127.0.0.1",
		"0.0.0.0",
		"::1",
		"192.168.",
		"169.254.",
	}
	for _, prefix := range suspiciousPrefixes {
		if strings.HasPrefix(addr, prefix) {
			return true
		}
	}
	return false
}

// pickServer asks all servers at once and returns the first one that really
// answered with a non-suspicious address, or "" if none did before ctx ends.
func pickServer(ctx context.Context, servers []string) string {
	answered := make(chan string, len(servers))
	var wg sync.WaitGroup
	for _, server := range servers {
		wg.Add(1)
		go func(server string) {
			defer wg.Done()
			addrs, err := newPinnedResolver(server).LookupHost(ctx, dnsProbeHost)
			if err == nil && answersOK(addrs) {
				answered <- server
			}
		}(server)
	}
	go func() {
		wg.Wait()
		close(answered)
	}()
	return <-answered // "" once every probe failed or ctx ended
}

// newPinnedResolver dials only server. UDP dial succeeds even when nobody
// answers, so the server must already have been chosen by a real reply.
// The dialer gets its own Resolver: a nil one reads net.DefaultResolver, which
// installDNS replaces while losing probes may still be dialing.
func newPinnedResolver(server string) *net.Resolver {
	return &net.Resolver{
		PreferGo: true,
		Dial: func(ctx context.Context, network, _ string) (net.Conn, error) {
			dialer := net.Dialer{Resolver: &net.Resolver{}}
			return dialer.DialContext(ctx, network, server)
		},
	}
}
