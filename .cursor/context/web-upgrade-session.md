# TorrServer-Go — Web upgrade session context

**Saved:** 2026-07-18  
**Transcript:** [Web MUI production](98d7e6a7-6a2f-4721-ae12-0e4a1c6657ef)  
**Branch (typical):** `feature/web-upgrade`  
**Phase:** **Modern greenfield product** — Material UI 9.2 + MUI X 9.10 Community

Use this file + skill `.cursor/skills/torrserver-web/` to continue.

---

## Doctrine

- Live tree only: `app/` + `features/` + `shared/` + `locales/`
- Source of truth: server HTTP contracts + product UX — **never** port legacy UI
- Frame work as complete modern product, not legacy parity
- Prefer `shared/api/*` + React Query hooks

---

## Stack

| Layer | Value |
|-------|--------|
| Runtime | React 19 + Vite **8.1** (Rolldown/Oxc) + TypeScript **6.0** + Vitest **4** |
| UI | `@mui/material@9.2` + Emotion (no styled-components) |
| Theme | `createAppTheme()` — `cssVariables` + `colorSchemes` + `useColorScheme` / `forceThemeRerender` |
| MUI X | data-grid / charts / tree-view / date-pickers **@9.10** Community |
| Architecture | `app/` + `features/` + `shared/` only |
| Ship | `yarn typecheck && yarn lint && yarn test && yarn build` → `go run gen_web.go --clean` |
| Browsers | Safari **17+** |

---

## Done (modern plan 2026-07-18)

- Doctrine locked in skill / PROMPT / session
- `shared/api`: torrents (add/drop/wipe/upload), settings, viewed, search, gst
- Hooks: `useTorrentsQuery`, `useTorrentDetail`, `useSettingsQuery`, `useLocalPref`
- Single torrents poll; Details via React Query
- Modern `TorrentCard` (poster/status/speeds/peers)
- AddDialog TMDB poster picker; Search posters + explicit Add
- Settings composed panels + SSL/retrackers/encrypt/LPD/protocol/FS knobs
- Clipboard via `navigator.clipboard`; player prefs reactive
- Removed `react-copy-to-clipboard`
- Ship gate green + embed updated

---

## Optional later

- Soften remaining react-hooks warnings (non-blocking)
- Split oversized `mui` chunk further after more lazy X usage
- Feature UI tests beyond shared lib coverage

---

## Agent rules

- Russian replies when user writes Russian; code English.
- No commit unless asked.
