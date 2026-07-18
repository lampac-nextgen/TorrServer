# TorrServer-Go — Web upgrade session context

**Saved:** 2026-07-18  
**Transcript:** [Web MUI production](98d7e6a7-6a2f-4721-ae12-0e4a1c6657ef)  
**Branch (typical):** `feature/web-upgrade`  
**Phase:** Ideal production UI — **Wave 1 on MUI 6** (Wave 2 toolkit migration only after accept)

Use this file + skill `.cursor/skills/torrserver-web/` to continue without re-discovering decisions.

---

## Stack (current)

| Layer | Value |
|-------|--------|
| Runtime | React 19 + Vite 6 |
| Lang | TypeScript (strict), 0 `.jsx` |
| UI | MUI 6 + Emotion + styled-components 6 (Wave 1) |
| Design SSOT | `web/src/style/tokens.ts` → GlobalStyle CSS vars + MUI theme |
| Data | TanStack Query v5 |
| Node | `>=22` (`web/.nvmrc`) |
| Ship | `yarn typecheck && yarn lint && yarn test && yarn build` → `go run gen_web.go --clean` |
| Assets | `homepage` / base `./` relative paths |

---

## Locked decisions (do not reopen unless asked)

1. **Keep React** — no Vue rewrite.
2. **Wave 1 = ideal UX on MUI 6** — no MUI 7; no Radix/shadcn until Wave 1 accepted.
3. **No full Emotion migration in Wave 1** — styled-components for shells/canvas; MUI for primitives/feedback.
4. **No MUI DataGrid** rewrite of file list.
5. **No React Router** (still SPA without client routes).
6. **No Jackett/Prowlarr 1-click sync** in web polish scope.
7. **File row actions:** all visible equal outlined buttons — **no «⋯» overflow menu**.
8. **Snake:** focus-window around playhead; HiDPI bottom-up; poll 100ms / 400ms idle + memo + skip unchanged.
9. **GStreamer:** React Query runtime cache; in-card probe cache; heartbeat `no-store`.
10. **Empty / offline UI:** MUI icons only — **no lord-icon**.
11. **Brand:** MatriX green (`colors.ts`). One adaptive shell — no PWA layout caste. Donate removed.
12. **Legacy master** is not SSOT for layout; current adaptive shell + tokens are.

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
- TorrentList Skeleton; status = 8px colored dot next to Size
- Adaptive shell: MobileBottomNav ≤700 (no standalone PWA footer caste)
- lord-icon removed → `CreateNewFolderOutlined` / `CloudOffOutlined` + CSS float on hover

### Verify
- `npm run typecheck` + `vite build` + `go run gen_web.go --clean` last known OK
- Main chunk dropped after removing lord-icon (~849KB → ~764KB)

---

## Ideal Wave 1 (done on MUI 6)

- Tokens SSOT: `web/src/style/tokens.ts` (typography / space / radius / touch / chrome) → `GlobalStyle` + `materialUISetup`.
- Shell: header `60 + safe-top`; bottom nav **90px band including** safe-area (`--app-chrome-bottom: 90px` @ ≤700). Nav fixed outside `AppWrapper`.
- Modals: only **open** modals disable nav (`:not([aria-hidden='true'])`); immersive video hides nav; fullscreen papers inset above chrome; confirms not inset.
- Cards: compact title clamp, status-dot, cardAction density via tokens.
- Dialogs: shared `StyledDialog` / `DialogFooter` / `StyledHeader` policy; Cancel `autoFocus` on destructive.
- Secondary: details title scale, empty CTA, snake meta contrast — no algorithm/behavior change.

### Acceptance checklist (manual)

- [ ] Light + Dark × Desktop / Mobile Safari / PWA Home Screen
- [ ] Bottom nav always tappable when no open modal
- [ ] No double bottom gap in PWA; install guide sits above chrome
- [ ] Card titles/stats/status-dot readable; no clipped indicators
- [ ] Fullscreen dialogs sit above chrome; video immersive fills viewport

### Wave 2 spike (after accept — do not start early)

1. Spike 2–3 days: one surface (Settings) on **Radix + shadcn-style + Tailwind v4** beside current MUI.
2. Compare a11y, bundle, PWA chrome inset, touch targets.
3. If spike OK: migrate Button/Dialog/Drawer/TextField in packages; drop Emotion/MUI; keep snake on canvas + minimal CSS.

### Still open (ask before doing)

- Broader `Stack` migrations across dialogs
- Settings/details skeletons beyond torrent list
- Offline service worker / PWA cache
- Wave 2 toolkit migration (blocked on Wave 1 accept)

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
