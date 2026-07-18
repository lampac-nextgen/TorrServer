# TorrServer-Go — Web upgrade session context

**Saved:** 2026-07-18  
**Transcript:** [Web MUI production](98d7e6a7-6a2f-4721-ae12-0e4a1c6657ef)  
**Branch (typical):** `feature/web-upgrade`  
**Phase:** **Greenfield complete** — Material UI 9.2 + MUI X 9.10 Community

Use this file + skill `.cursor/skills/torrserver-web/` to continue.

---

## Stack

| Layer | Value |
|-------|--------|
| Runtime | React 19 + Vite **8.1** (Rolldown/Oxc) + TypeScript **6.0** + Vitest **4** |
| UI | `@mui/material@9.2` + Emotion (no styled-components) |
| Theme | `createAppTheme()` — `cssVariables` + `colorSchemes` + `useColorScheme` / `forceThemeRerender` |
| MUI X | data-grid / charts / tree-view / date-pickers **@9.10** Community |
| Architecture | `app/` + `features/` + `shared/` only (legacy `components/` deleted) |
| Ship | `yarn typecheck && yarn test && yarn build` → `go run gen_web.go --clean` |
| Browsers | Safari **17+** |

---

## Done

- Full greenfield rewrite; purged `components/`, `style/`, `utils/`, `icons/`, old `types/`
- Theme + chrome + ModalOpenProvider
- Torrents DataGrid / cards; Search DataGrid; Details FileBrowser + SpeedCharts + **TorrentCache snake**
- Settings / Add / Player / About / system dialogs under `features/`
- vite aliases: `app`, `features`, `shared`, `locales` only

---

## Optional follow-ups

- TMDB settings + mobile player toggles (VLC/Infuse/…)
- TorrentFunctions in details (magnet, M3U, clear viewed)
- MultiAdd: parse-torrent hash/dedup, posters, single-file path
- PWA install guide (iOS)
- ErrorBoundary inside ThemeProvider
- Remove unused deps (`react-measure`, maybe `parse-torrent`)
- Split oversized `mui` chunk only after lazy-loading keeps X off the critical path
- Exhaustive-deps warnings in FilesDataGrid / SimpleTorrentsDataGrid

## Fixed 2026-07-18 (audit pass)

- Circular mui↔mui-x manualChunks TDZ crash
- share_target enctype in webmanifest
- Lazy DetailsDialog; launch handler; drop unused LocalizationProvider; dedupe categories


---

## Agent rules

- Russian replies when user writes Russian; code English.
- No commit unless asked.
