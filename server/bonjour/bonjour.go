package bonjour

import (
	"fmt"
	"net"
	"os"
	"runtime"
	"strconv"
	"strings"
	"sync"
	"unicode"

	"github.com/grandcat/zeroconf"
	"github.com/wlynxg/anet"

	"server/log"
	"server/settings"
	"server/version"
)

const serviceType = "_torrserver._tcp"

var (
	mu     sync.Mutex
	server *zeroconf.Server
)

// Start advertises TorrServer on the LAN via Bonjour/mDNS.
// Failures are logged and do not abort the process.
func Start() {
	mu.Lock()
	defer mu.Unlock()

	if server != nil {
		server.Shutdown()
		server = nil
	}

	port, err := strconv.Atoi(settings.Port)
	if err != nil || port <= 0 {
		log.TLogln("Bonjour: invalid web port", settings.Port)
		return
	}

	txt := []string{"version=" + version.Version}
	if settings.Ssl && settings.SslPort != "" {
		txt = append(txt, "https="+settings.SslPort)
	}

	ifaces, ips := advertiseAddrs()
	if len(ips) == 0 {
		log.TLogln("Bonjour: no suitable interface addresses")
		return
	}

	host := mdnsHostname()
	name := instanceName()
	// RegisterProxy avoids grandcat/zeroconf doubling ".local" when os.Hostname()
	// already returns a Bonjour name (common on macOS).
	srv, err := zeroconf.RegisterProxy(name, serviceType, "local.", port, host, ips, txt, ifaces)
	if err != nil {
		log.TLogln("Bonjour: register failed:", err)
		return
	}
	server = srv
	log.TLogln(fmt.Sprintf("Bonjour: advertising %q as %s on %s:%d (%s)", name, serviceType, host, port, strings.Join(ips, ",")))
}

// Stop withdraws the Bonjour/mDNS advertisement.
func Stop() {
	mu.Lock()
	defer mu.Unlock()
	if server != nil {
		server.Shutdown()
		server = nil
		log.TLogln("Bonjour: stopped")
	}
}

func instanceName() string {
	if settings.BTsets != nil && settings.BTsets.FriendlyName != "" {
		return sanitizeInstance(settings.BTsets.FriendlyName)
	}
	return "TorrServer"
}

// sanitizeInstance keeps DNS-SD instance names browsable on macOS.
// A trailing ".local" is registered but never appears in dns-sd browse results.
func sanitizeInstance(name string) string {
	name = stripLocalSuffix(strings.TrimSpace(name))
	name = strings.ReplaceAll(name, ".", "-")
	name = strings.Join(strings.Fields(name), " ")
	if name == "" {
		return "TorrServer"
	}
	if len(name) > 63 {
		return strings.TrimSpace(name[:63])
	}
	return name
}

func mdnsHostname() string {
	host, err := os.Hostname()
	if err != nil || host == "" {
		return "torrserver"
	}
	host = stripLocalSuffix(host)
	host = strings.Map(func(r rune) rune {
		if unicode.IsLetter(r) || unicode.IsDigit(r) || r == '-' {
			return r
		}
		return '-'
	}, host)
	host = strings.Trim(host, "-")
	if host == "" {
		return "torrserver"
	}
	return host
}

func stripLocalSuffix(s string) string {
	s = strings.TrimSuffix(s, ".")
	if len(s) >= 6 && strings.EqualFold(s[len(s)-6:], ".local") {
		s = s[:len(s)-6]
	}
	return strings.TrimSuffix(s, ".")
}

func advertiseAddrs() ([]net.Interface, []string) {
	ifaces, err := anet.Interfaces()
	if err != nil {
		log.TLogln("Bonjour: list interfaces:", err)
		return nil, nil
	}

	var outIfaces []net.Interface
	var ips []string
	seen := map[string]bool{}

	for _, i := range ifaces {
		if !usableIface(i) {
			continue
		}
		v4, v6 := addrsForIface(i)
		if len(v4) == 0 && len(v6) == 0 {
			continue
		}
		outIfaces = append(outIfaces, i)
		for _, ip := range append(v4, v6...) {
			s := ip.String()
			if !seen[s] {
				seen[s] = true
				ips = append(ips, s)
			}
		}
	}
	return outIfaces, ips
}

func usableIface(i net.Interface) bool {
	if runtime.GOOS != "windows" && (i.Flags&net.FlagLoopback != 0 || i.Flags&net.FlagUp == 0 || i.Flags&net.FlagMulticast == 0) {
		return false
	}
	// Skip tunnel / peer-to-peer interfaces that break multicast joins on macOS.
	name := strings.ToLower(i.Name)
	for _, p := range []string{"utun", "awdl", "llw", "ap", "bridge", "anpi", "gif", "stf", "vmnet", "veth", "docker", "br-", "cni", "flannel"} {
		if strings.HasPrefix(name, p) {
			return false
		}
	}
	return true
}

func addrsForIface(i net.Interface) (v4, v6 []net.IP) {
	addrs, err := anet.InterfaceAddrsByInterface(&i)
	if err != nil {
		return nil, nil
	}
	for _, addr := range addrs {
		var ip net.IP
		switch v := addr.(type) {
		case *net.IPNet:
			ip = v.IP
		case *net.IPAddr:
			ip = v.IP
		default:
			continue
		}
		if ip == nil || ip.IsLoopback() || ip.IsLinkLocalUnicast() || ip.IsLinkLocalMulticast() {
			continue
		}
		if ip4 := ip.To4(); ip4 != nil {
			v4 = append(v4, ip4)
		} else if ip.To16() != nil {
			v6 = append(v6, ip)
		}
	}
	return v4, v6
}
