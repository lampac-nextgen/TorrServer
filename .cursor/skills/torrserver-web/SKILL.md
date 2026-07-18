---
name: torrserver-web
description: >-
  Continues TorrServer-Go web UI work (React 19, Vite 6, MUI 9.2, MUI X 9.10,
  TanStack Query, gen_web embed). Use when editing web/, torrent details/snake/cache,
  GStreamer player, FileRowActions, empty states, i18n, bundle/lazy chunks, or when
  the user mentions production-ready UI, MUI X Data Grid/Charts, or web upgrade.
---

# TorrServer-Go Web

## Before coding

1. Read [web-upgrade-session.md](../../context/web-upgrade-session.md) for locked decisions and done/todo.
2. Confirm Node 22+ (`web/.nvmrc`). Use **yarn** in `web/` — `gen_web.go` also runs `yarn` / `yarn run build`.

## Hard locks

- Keep React — no Vue rewrite.
- **Stack:** Material UI **9.2** + MUI X **9.10 Community** (Data Grid, Charts, Tree View, Date Pickers). No Pro/Premium license.
- **No styled-components** — Emotion via MUI only (`@emotion/react` / `@emotion/styled` / `styled` from `@mui/material/styles`).
- Brand: **MatriX green** (`style/colors.ts` + theme). No purple/cream AI defaults.
- File row: **all** player/copy/preload actions visible as equal outlined buttons — never a «⋯» menu.
- Snake: poll `/cache` at **100ms** (idle 400ms); skip unchanged; `memo`; **focus-window** around playhead; HiDPI bottom-up paint.
- GStreamer: keep runtime React Query cache + probe cache in card; heartbeat `no-store`.
- No lord-icon / Lottie — `@mui/icons-material` + light CSS motion.
- Relative asset base for Go embed (`./`). Do not break Basic Auth / API hosts in `utils/Hosts.ts`.
- Breakpoints: `web/src/style/breakpoints.ts` (`BP` + `mediaMax` / `queryMax`). Shell 1-col = **`mobile` (700)**; dialog fullscreen = **`dialog` (960)**.
- **One adaptive shell:** width + CSS chrome tokens (`AppGlobalStyles`). No `standaloneMedia` / PWA layout caste. Bottom nav @ ≤700 fixed outside shell; **90px band including** safe-area. Modal↔nav via `ModalOpenProvider` / `data-modal-open` (not fragile Backdrop `aria-hidden`).
- Donate removed. Safari **17+** (MUI 9 browser floor).
- Radix/shadcn Wave 2 — **cancelled** (toolkit = MUI + MUI X).

## New layout (in progress)

```
web/src/shared/   # theme, ModalOpenContext, AppDialog
web/src/features/ # torrents DataGrid, search DataGrid, details SpeedCharts
web/src/components/ # legacy surfaces being migrated (still primary for Add/Settings/Details/Player)
```

## Workflow after UI changes that ship in the binary

```bash
cd web && yarn typecheck && yarn lint && yarn test && yarn build
cd .. && go run gen_web.go --clean
```

Always use `--clean`. Restart TorrServer + hard refresh (iOS PWA: remove/re-add Home Screen if stale). Do not commit unless asked.

## Patterns

| Need | Prefer |
|------|--------|
| Toast | `AppSnackbar` / `useAppToast` |
| Torrents desktop | `features/torrents/TorrentsDataGrid` |
| Torrents mobile | `TorrentCard` grid |
| Search results | `features/search/SearchResultsGrid` |
| Speed history | `features/details/SpeedCharts` |
| Modal open / immersive | `useSyncModalOpen` / `setImmersive` |
| Destructive | Confirm dialog; Cancel `autoFocus` |
| Code split | vite chunks: `mui`, `mui-x`, `hls`, `vendor` |

## Prompt for new chats

Paste from [PROMPT.md](PROMPT.md).
