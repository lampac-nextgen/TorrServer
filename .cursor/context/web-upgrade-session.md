# TorrServer-Go — Web upgrade session context

**Saved:** 2026-07-17  
**Transcript:** [Web MUI production](98d7e6a7-6a2f-4721-ae12-0e4a1c6657ef)  
**Branch (typical):** `feature/web-upgrade`

Use this file + skill `.cursor/skills/torrserver-web/` to continue without re-discovering decisions.

---

## Stack (current)

| Layer | Value |
|-------|--------|
| Runtime | React 19 + Vite 6 |
| Lang | TypeScript (strict), 0 `.jsx` |
| UI | MUI 6.4.8 + Emotion + styled-components 6 |
| Data | TanStack Query v5 |
| Node | `>=22` (`web/.nvmrc`) |
| Ship | `npm run build` → `go run gen_web.go --clean` → `server/web/pages/template/pages` (`//go:embed`) |
| Assets | `homepage` / base `./` relative paths |

---

## Locked decisions (do not reopen unless asked)

1. **Keep React** — no Vue rewrite.
2. **No MUI 7** in this phase.
3. **No full Emotion migration** — keep styled-components for shells/canvas/PWA; MUI for primitives/feedback.
4. **No MUI DataGrid** rewrite of file list.
5. **No React Router** (still SPA without client routes).
6. **No Jackett/Prowlarr 1-click sync** in web polish scope.
7. **File row actions:** all visible equal outlined buttons — **no «⋯» overflow menu** (Infuse / SenPlayer / IINA / Copy / Play / Preload).
8. **Snake:** focus-window around playhead (`buildFocusModel`); HiDPI bottom-up fill; reader/range on top; poll 100ms active / 400ms idle + memo + skip unchanged. Full-torrent LOD (`buildCacheDrawModel`) optional later — not default UI.
9. **GStreamer:** keep React Query runtime cache (60s, invalidate on Settings save); keep in-card `audioTracksByFile` probe cache; heartbeat `cache: 'no-store'`.
10. **Empty / offline UI:** MUI icons only — **no lord-icon** (removed script + base64).

---

## Done in this session (high level)

### Foundations
- Theme: breakpoints `md: 930`, Button minHeights 36/44, `MuiAlert` defaults
- `AppSnackbar` + `useAppToast` / `useOptionalAppToast`
- Header toggles → `styled(IconButton)`
- Lazy: Search / Add / Donate / MultiAddDialog; vite `manualChunks`: `mui`, `hls`, `vendor`
- Cache poll 100ms active / 400ms idle + visibility pause + `inFlight` guard
- i18n: GStreamer + `Copied` / confirms / playback strings across locales

### Details / player / list
- FileRowActions: all actions visible, equal buttons, wrap
- Buffer label: `Filled / Capacity` + MUI `LinearProgress`
- VideoPlayer: fatal HLS → Alert; Play button height; `component="a"` links where needed
- TorrentFunctions: drop/clear confirms; copy toast
- ShortTable: no hardcoded black
- AddDialog: shared `['torrents']` query (no second 1s poll)
- Search: no full-content loading overlay; Alert snackbars
- TorrentList Skeleton; StatusIndicator → MUI `Chip` (size small)
- PWA sidebar overlay `top: 90px` under standalone
- lord-icon removed → `CreateNewFolderOutlined` / `CloudOffOutlined` + CSS float on hover

### Verify
- `npm run typecheck` + `vite build` + `go run gen_web.go --clean` last known OK
- Main chunk dropped after removing lord-icon (~849KB → ~764KB)

---

## Responsive (mobile / tablet) — 2026-07-18

- Canonical breakpoints: `web/src/style/breakpoints.ts` (`BP` + `mediaMax` / `queryMax`).
- Shell / list 1-column: **`mobile` (700)**. Dialog fullscreen: **`dialog` (960)**.
- List columns: 3 @ `list3` (1260), 2 @ `list2` (1100), 1 @ `mobile` (700). Card compact starts at `list3` (covers list2).
- Typography: Open Sans via **Google Fonts CDN** (`index.html` 400/600) — one stack for desktop/mobile/PWA; **no** self-hosted woff2.
- Floor: **≥12px** on cards / cardAction / PWA tabs.
- PWA chrome: 90px + `env(safe-area-inset-*)`; list uses grid `1fr` (no double-subtract); unified `DIALOG_SAFE_TOP`.
- Layers: Universal · Mobile (width) · PWA (`standaloneMedia` chrome only).
- Donate button/dialog removed.
- Status on card: 8px colored dot next to Size (not Chip).

### Still open (ask before doing)

- Mobile sidebar as full MUI `Drawer` (custom slide + overlay still used)
- Broader `Stack` migrations across dialogs
- Settings/details skeletons beyond torrent list
- Offline service worker

---

## Key paths

| Area | Path |
|------|------|
| Theme / layout tokens | `web/src/style/materialUISetup.ts` |
| Toast | `web/src/components/Feedback/AppSnackbar.tsx` |
| Cache poll / map | `web/src/components/DialogTorrentDetailsContent/customHooks.tsx` |
| Snake canvas | `web/src/components/DialogTorrentDetailsContent/TorrentCache/` |
| File actions | `web/src/components/DialogTorrentDetailsContent/Table/FileRowActions.tsx` |
| GStreamer utils | `web/src/utils/GStreamer.ts` |
| Empty state | `web/src/components/TorrentList/AddFirstTorrent.tsx` |
| Offline | `web/src/components/TorrentList/NoServerConnection.tsx` |
| Vite chunks | `web/vite.config.ts` |
| Embed | `gen_web.go` (uses **yarn**) |

---

## Agent rules for this repo (web)

- Prefer Russian replies when the user writes in Russian; keep code/comments English.
- Do **not** commit unless the user explicitly asks.
- After UI changes that must ship in the binary: `cd web && yarn typecheck && yarn build` then `go run gen_web.go --clean` from repo root.
- Hard refresh / restart TorrServer after embed; iOS PWA may need Home Screen re-add.
- Avoid drive-by refactors outside the asked surface.

---

## Open follow-ups (ask before doing)

- Commit / PR for `feature/web-upgrade`
- MUI Drawer for mobile sidebar
- Optional: mini-snake on torrent cards; offline service worker
- Long-term: merge dual theme (styled-components → MUI palette) before MUI 7
