# TorrServer-Go — Web upgrade session context

**Saved:** 2026-07-18  
**Transcript:** [Web MUI production](98d7e6a7-6a2f-4721-ae12-0e4a1c6657ef)  
**Branch (typical):** `feature/web-upgrade`  
**Phase:** **New TorrServer web** — Material UI 9.2 + MUI X 9.10 Community (rewrite-first)

Use this file + skill `.cursor/skills/torrserver-web/` to continue.

---

## Doctrine

- Live tree only: `app/` + `features/` + `shared/` + `locales/`
- **This is a new product UI** — not “finish the migration branch”
- **Master = feature/behavior contract** only (`git show master:…`) — never port legacy UI/styles
- **Branch code is not an anchor** — full rewrite of any file is OK and preferred over legacy-shaped patches
- Prefer `shared/api/*` + React Query hooks
- Audit → gaps → modern fix

---

## Stack

| Layer | Value |
|-------|--------|
| Runtime | React 19 + Vite **8.1** (Rolldown/Oxc) + TypeScript **6.0** + Vitest **4** |
| UI | `@mui/material@9.2` + Emotion (no styled-components) |
| Theme | `createAppTheme()` — modern MatriX palette (green-ink dark, not legacy gray) |
| MUI X | data-grid / charts / tree-view / date-pickers **@9.10** Community |
| Architecture | `app/` + `features/` + `shared/` only |
| Ship | `yarn typecheck && yarn lint && yarn test && yarn build` → `go run gen_web.go --clean` |
| Browsers | Safari **17+** |

---

## Audit backlog (in progress)

- P0: Edit torrent metadata (`action: set`) + storage backends `/storage/settings`
- P1: Add hash dedup + auto title/posters; Search TMDB poster fallback
- P1: GStreamer audio tracks; HLS subtitles in VideoPlayer
- Hygiene: no ghost `style/`

---

## Done (recent)

- Cards + cardAction rail; collapsible sidebar; details seasons/files polish
- SettingSwitch ListItem pattern; MatriX theme rewrite (green-ink dark)
- Shared API torrents/settings/viewed/search/gst; RQ hooks for torrents/detail

---

## Agent rules

- Russian replies when user writes Russian; code English.
- No commit unless asked.
