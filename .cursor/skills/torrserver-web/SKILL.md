---
name: torrserver-web
description: >-
  Continues TorrServer-Go web UI work (React 19, Vite 6, MUI 6, styled-components,
  TanStack Query, gen_web embed). Use when editing web/, torrent details/snake/cache,
  GStreamer player, FileRowActions, empty states, i18n, bundle/lazy chunks, or when
  the user mentions production-ready UI, lord-icon, or web upgrade.
---

# TorrServer-Go Web

## Before coding

1. Read [web-upgrade-session.md](../../context/web-upgrade-session.md) for locked decisions and done/todo.
2. Confirm Node 22+ (`web/.nvmrc`). Use **yarn** in `web/` — `gen_web.go` also runs `yarn` / `yarn run build`.

## Hard locks

- Keep React — no Vue rewrite.
- **Wave 1 ideal UX** stays on **MUI 6** — no MUI 7, no Radix/shadcn migration until Wave 1 is accepted.
- **Wave 2** (after accept): Radix primitives + shadcn-style + Tailwind v4; spike one surface first (see session). Keep styled-components only for snake/canvas if needed.
- Dual styling Wave 1: MUI for buttons/dialogs/feedback; styled-components for shells/canvas.
- Design SSOT: [`web/src/style/tokens.ts`](../../../web/src/style/tokens.ts) → CSS vars in `GlobalStyle` + MUI theme. Brand: **MatriX green** (`colors.ts`). No purple/cream AI defaults.
- File row: **all** player/copy/preload actions visible as equal outlined buttons — never a «⋯» menu.
- Snake: poll `/cache` at **100ms** (idle 400ms); skip unchanged; `memo`; **focus-window** around playhead (`buildFocusModel`, ~64–120 cells); HiDPI bottom-up paint. Optional full-torrent LOD (`buildCacheDrawModel`) is available but not the default UI path.
- GStreamer: keep runtime React Query cache + probe cache in card; heartbeat `no-store`.
- No lord-icon / Lottie for empty states — use `@mui/icons-material` + light CSS motion.
- Relative asset base for Go embed (`./`). Do not break Basic Auth / API hosts in `utils/Hosts.ts`.
- Breakpoints: only `web/src/style/breakpoints.ts` (`BP` + `mediaMax` / `queryMax`). Shell/list 1-col = **`mobile` (700)**; dialog fullscreen = **`dialog` (960)**. Do not hardcode px in `@media`.
- **One adaptive shell:** layout by width + CSS chrome tokens only. **No** `standaloneMedia` / `isStandaloneApp` for layout or feature gating. Bottom nav @ `mediaMax('mobile')` in browser and Home Screen — fixed **outside** `AppWrapper`, height **90px band including** safe-area padding (`tokens.ts` / `GlobalStyle`). Sidebar unmounted on ≤700. Feature parity via Categories/More sheets. Donate removed.
- While an **open** MUI modal is shown (`.MuiModal-root:not([aria-hidden='true'])`), `.ts-bottom-nav` is non-interactive; immersive video (`.ts-immersive`) hides it.
- `detectStandaloneApp` — install guide / launch / protocol only.
- Visual tokens: letter-spacing `-0.1px`, CDN Open Sans 300/400/600, status-dot. No self-hosted woff2.

## Workflow after UI changes that ship in the binary

```bash
cd web && yarn typecheck && yarn lint && yarn test && yarn build
cd .. && go run gen_web.go --clean
```

Always use `--clean` so orphan hashed chunks are removed. Restart TorrServer + hard refresh (iOS PWA: remove/re-add Home Screen if UI looks stale). Do not commit unless asked.

## Patterns

| Need | Prefer |
|------|--------|
| Toast / errors | `AppSnackbar` / `useAppToast` + MUI `Alert` |
| Loading list | MUI `Skeleton` |
| Buffer bar | MUI `LinearProgress` + Filled/Capacity (not preload target alone) |
| Status on card | 8px colored dot next to Size (master) — not Chip labels |
| Destructive | Confirm dialog; Cancel `autoFocus` |
| Heavy dialogs | `React.lazy` + `Suspense`; do not static-import from always-mounted trees |
| Code split | Keep vite `manualChunks`: `mui`, `hls`, `vendor` |
| Dialogs | `StyledDialog` + `dialogPaperSx`; fullscreen inset above chrome; immersive = 100dvh |

## Snake vs “cache”

- Server torrent piece buffer UI = snake (`useUpdateCache` → `TorrentCache`).
- Snake: sliding focus-window (`buildFocusModel`) centered on the primary reader; fetch equal-skip + `memo`; HiDPI bottom-up fill with reader/range priority.
- `buildCacheDrawModel` (full-torrent byte buckets) remains for tests / future detailed LOD — do not treat docs that still say “full-torrent only” as current UI.

## Prompt for new chats

Paste from [PROMPT.md](PROMPT.md).
