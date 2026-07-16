package bonjour

import (
	"fmt"
	"net"
	"os"
	"os/user"
	"runtime"
	"sort"
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

	ret := "TorrServer"
	userName := ""
	if u, err := user.Current(); err == nil {
		userName = strings.TrimSpace(u.Name)
	}
	host := mdnsHostname()

	if userName == "" && host == "" {
		return ret
	}
	if userName != "" && host != "" {
		if userName == host {
			return sanitizeInstance(ret + " (" + userName + ")")
		}
		return sanitizeInstance(ret + " (" + userName + " on " + host + ")")
	}
	if host == "localhost" {
		if ip := firstIPv4(nil); ip != "" {
			return sanitizeInstance(ret + " " + ip)
		}
	}
	if host != "" {
		return sanitizeInstance(ret + " (" + host + ")")
	}
	return sanitizeInstance(ret + " (" + userName + ")")
}

// sanitizeInstance makes a DNS-SD instance name that macOS dns-sd will browse.
// Names containing ".local" are registered but never appear in browse results.
func sanitizeInstance(name string) string {
	name = strings.TrimSpace(name)
	name = stripLocalSuffix(name)
	name = strings.Map(func(r rune) rune {
		switch {
		case r == '.' || r == '/' || r == '\\':
			return '-'
		case r < 32 || r == 127:
			return -1
		default:
			return r
		}
	}, name)
	name = strings.Join(strings.Fields(name), " ")
	name = strings.Trim(name, "- ")
	if name == "" {
		return "TorrServer"
	}
	// DNS-SD instance labels are limited to 63 octets.
	if len(name) > 63 {
		name = strings.TrimRight(name[:63], "- ")
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
		switch {
		case unicode.IsLetter(r) || unicode.IsDigit(r) || r == '-':
			return r
		case r == '_' || r == ' ':
			return '-'
		default:
			return -1
		}
	}, host)
	host = strings.Trim(host, "-")
	if host == "" {
		return "torrserver"
	}
	return host
}

func stripLocalSuffix(s string) string {
	s = strings.TrimSpace(s)
	for {
		trimmed := strings.TrimSuffix(s, ".")
		lower := strings.ToLower(trimmed)
		if strings.HasSuffix(lower, ".local") {
			s = trimmed[:len(trimmed)-len(".local")]
			continue
		}
		return trimmed
	}
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

func firstIPv4(ifaces []net.Interface) string {
	if ifaces == nil {
		var err error
		ifaces, err = anet.Interfaces()
		if err != nil {
			return ""
		}
	}
	var list []string
	for _, i := range ifaces {
		if !usableIface(i) {
			continue
		}
		v4, _ := addrsForIface(i)
		for _, ip := range v4 {
			list = append(list, ip.String())
		}
	}
	if len(list) == 0 {
		return ""
	}
	sort.Strings(list)
	return list[0]
}
