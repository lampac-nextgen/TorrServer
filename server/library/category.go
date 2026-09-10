package library

import "strings"

// StandardCategories matches the web UI keys (movie / tv / music / other).
var StandardCategories = []string{"movie", "tv", "music", "other"}

// NormalizeCategory maps aliases to a standard key, "uncategorized", "all", or "".
func NormalizeCategory(s string) string {
	switch strings.ToLower(strings.TrimSpace(s)) {
	case "movie", "movies", "film", "films":
		return "movie"
	case "tv", "series", "serial", "shows":
		return "tv"
	case "music":
		return "music"
	case "other":
		return "other"
	case "uncategorized", "none", "clear", "-":
		return "uncategorized"
	case "all", "*":
		return "all"
	default:
		return ""
	}
}

// IsStandardCategory reports whether s is movie/tv/music/other.
func IsStandardCategory(s string) bool {
	switch NormalizeCategory(s) {
	case "movie", "tv", "music", "other":
		return true
	default:
		return false
	}
}

// MatchCategory reports whether torrentCat matches filter (all / uncategorized / exact).
func MatchCategory(torrentCat, filter string) bool {
	filter = strings.ToLower(strings.TrimSpace(filter))
	if filter == "" || filter == "all" {
		return true
	}
	cat := strings.ToLower(strings.TrimSpace(torrentCat))
	if filter == "uncategorized" {
		return cat == ""
	}
	return cat == filter
}

// CategoryValue converts a normalized filter into the stored torrent category
// ("uncategorized" and "all" become empty).
func CategoryValue(normalized string) string {
	switch normalized {
	case "movie", "tv", "music", "other":
		return normalized
	default:
		return ""
	}
}
