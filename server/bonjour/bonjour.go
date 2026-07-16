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

	ifaces := multicastInterfaces()
	name := instanceName()
	srv, err := zeroconf.Register(name, serviceType, "local.", port, txt, ifaces)
	if err != nil {
		log.TLogln("Bonjour: register failed:", err)
		return
	}
	server = srv
	log.TLogln(fmt.Sprintf("Bonjour: advertising %q as %s on port %d", name, serviceType, port))
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
		return truncateInstance(settings.BTsets.FriendlyName)
	}

	ret := "TorrServer"
	userName := ""
	if u, err := user.Current(); err == nil {
		userName = u.Name
	}
	host, _ := os.Hostname()

	if userName == "" && host == "" {
		return ret
	}
	if userName != "" && host != "" {
		if userName == host {
			return truncateInstance(ret + ": " + userName)
		}
		return truncateInstance(ret + ": " + userName + " on " + host)
	}
	if host == "localhost" {
		if ip := firstIPv4(); ip != "" {
			return truncateInstance(ret + " " + ip)
		}
	}
	return truncateInstance(ret + ": " + userName + "@" + host)
}

func truncateInstance(name string) string {
	name = strings.TrimSpace(name)
	if name == "" {
		return "TorrServer"
	}
	// DNS-SD instance labels are limited to 63 octets.
	if len(name) > 63 {
		return name[:63]
	}
	return name
}

func multicastInterfaces() []net.Interface {
	ifaces, err := anet.Interfaces()
	if err != nil {
		log.TLogln("Bonjour: list interfaces:", err)
		return nil
	}
	var out []net.Interface
	for _, i := range ifaces {
		if runtime.GOOS != "windows" && (i.Flags&net.FlagLoopback != 0 || i.Flags&net.FlagUp == 0 || i.Flags&net.FlagMulticast == 0) {
			continue
		}
		out = append(out, i)
	}
	return out
}

func firstIPv4() string {
	ifaces, err := anet.Interfaces()
	if err != nil {
		return ""
	}
	var list []string
	for _, i := range ifaces {
		if runtime.GOOS != "windows" && (i.Flags&net.FlagLoopback != 0 || i.Flags&net.FlagUp == 0 || i.Flags&net.FlagMulticast == 0) {
			continue
		}
		addrs, _ := anet.InterfaceAddrsByInterface(&i)
		for _, addr := range addrs {
			var ip net.IP
			switch v := addr.(type) {
			case *net.IPNet:
				ip = v.IP
			case *net.IPAddr:
				ip = v.IP
			}
			if !ip.IsLoopback() && ip.To4() != nil {
				list = append(list, ip.String())
			}
		}
	}
	if len(list) == 0 {
		return ""
	}
	sort.Strings(list)
	return list[0]
}
