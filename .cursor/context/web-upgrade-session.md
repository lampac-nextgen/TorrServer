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
8. **Snake (cache map):** live poll from `/cache`; keep `memo` on `TorrentCache`; poll **250ms** (not 100ms unless user asks). Memo ≠ stale data.
9. **GStreamer:** keep React Query runtime cache (60s, invalidate on Settings save); keep in-card `audioTracksByFile` probe cache; heartbeat `cache: 'no-store'`.
10. **Empty / offline UI:** MUI icons only — **no lord-icon** (removed script + base64).

---

## Done in this session (high level)

### Foundations
- Theme: breakpoints `md: 930`, Button minHeights 36/44, `MuiAlert` defaults
- `AppSnackbar` + `useAppToast` / `useOptionalAppToast`
- Header toggles → `styled(IconButton)`
- Lazy: Search / Add / Donate / MultiAddDialog; vite `manualChunks`: `mui`, `hls`, `vendor`
- Cache poll 250ms + visibility pause + `inFlight` guard
- i18n: GStreamer + `Copied` / confirms / playback strings across locales

### Details / player / list
- FileRowActions: all actions visible, equal buttons, wrap
- Buffer label: `Filled / Capacity` + MUI `LinearProgress`
- VideoPlayer: fatal HLS → Alert; Play button height; `component="a"` links where needed
- TorrentFunctions: drop/clear confirms; copy toast
- ShortTable: no hardcoded black
- AddDialog: shared `['torrents']` query (no second 1s poll)
- Search: no full-content loading overlay; Alert snackbars
- TorrentList Skeleton; StatusIndicator → Chip
- PWA sidebar overlay `top: 90px` under standalone
- lord-icon removed → `CreateNewFolderOutlined` / `CloudOffOutlined` + CSS float on hover

### Verify
- `npm run typecheck` + `vite build` + `go run gen_web.go --clean` last known OK
- Main chunk dropped after removing lord-icon (~849KB → ~764KB)

---

## Intentionally incomplete / optional

- Mobile sidebar as full MUI `Drawer` (custom slide + overlay still used)
- Broader `Stack` migrations across dialogs
- Full `DialogFooter` adoption everywhere Settings/Add/Search/delete
- Settings/details skeletons beyond torrent list
- Snake poll 100ms or remove `memo` — **not recommended** unless visible freeze

---

## Key paths

| Area | Path |
|------|------|
| Theme | `web/src/style/materialUISetup.ts` |
| Toast | `web/src/components/Feedback/AppSnackbar.tsx` |
| Cache poll / map | `web/src/components/DialogTorrentDetailsContent/customHooks.tsx` |
| Snake canvas | `web/src/components/DialogTorrentDetailsContent/TorrentCache/` |
| File actions | `web/src/components/DialogTorrentDetailsContent/Table/FileRowActions.tsx` |
| GStreamer utils | `web/src/utils/GStreamer.ts` |
| Empty state | `web/src/components/TorrentList/AddFirstTorrent.tsx` |
| Offline | `web/src/components/TorrentList/NoServerConnection.tsx` |
| Vite chunks | `web/vite.config.ts` |
| Embed | `gen_web.go` |

---

## Agent rules for this repo (web)

- Prefer Russian replies when the user writes in Russian; keep code/comments English.
- Do **not** commit unless the user explicitly asks.
- After UI changes that must ship in the binary: `cd web && npm run typecheck && npm run build` then `go run gen_web.go --clean` from repo root.
- Hard refresh / restart TorrServer after embed.
- Avoid drive-by refactors outside the asked surface.

---

## Open follow-ups (ask before doing)

- Commit / PR for `feature/web-upgrade`
- Speed snake poll to 100ms
- Remove snake `memo`
- MUI Drawer for mobile sidebar
- Further Phase-3 Stack/DialogFooter cleanup
