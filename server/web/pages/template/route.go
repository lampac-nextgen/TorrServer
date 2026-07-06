package template

import (
	"crypto/md5"
	"fmt"
	"io/fs"
	"mime"
	"path/filepath"
	"strings"

	"github.com/gin-gonic/gin"
)

func init() {
	mime.AddExtensionType(".map", "application/json")
	mime.AddExtensionType(".webmanifest", "application/manifest+json")
}

func RouteWebPages(route gin.IRouter) {
	// Serve / as index.html
	route.GET("/", func(c *gin.Context) {
		serveEmbedded(c, "pages/index.html", "text/html; charset=utf-8")
	})

	// Walk embed.FS and register an explicit route for every file.
	// Explicit routes avoid catch-all wildcard conflicts with other gin routes.
	fs.WalkDir(pages, "pages", func(path string, d fs.DirEntry, err error) error {
		if err != nil || d.IsDir() {
			return nil
		}
		urlPath := "/" + strings.TrimPrefix(path, "pages/")
		if urlPath == "/index.html" {
			return nil // already registered above
		}
		filePath := path // capture for closure
		mimeType := mimeFor(urlPath)
		route.GET(urlPath, func(c *gin.Context) {
			serveEmbedded(c, filePath, mimeType)
		})
		return nil
	})
}

func serveEmbedded(c *gin.Context, path, contentType string) {
	data, err := pages.ReadFile(path)
	if err != nil {
		c.Status(404)
		return
	}
	writeWithCache(c, data, contentType)
}

func writeWithCache(c *gin.Context, data []byte, contentType string) {
	sum := md5.Sum(data)
	etag := fmt.Sprintf(`"%x"`, sum)
	c.Header("Cache-Control", "public, max-age=31536000")
	c.Header("ETag", etag)
	c.Data(200, contentType, data)
}

func mimeFor(path string) string {
	m := mime.TypeByExtension(filepath.Ext(path))
	if m == "" {
		m = "application/octet-stream"
	}
	switch {
	case m == "application/javascript", m == "application/xml":
		m += "; charset=utf-8"
	case m == "image/x-icon":
		m = "image/vnd.microsoft.icon"
	}
	return m
}
