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
- **Stack:** Material UI **9.2** + MUI X **9.10 Community** (Data Grid, Charts, Tree View, Date Pickers). Theme: `cssVariables` + `colorSchemes` + `useColorScheme`. No Pro/Premium license.
- **No styled-components** — Emotion via MUI only.
- Brand: **MatriX green**. File row: all actions visible. Snake/GStreamer contracts unchanged.
- Adaptive shell + `ModalOpenProvider`. Donate removed. Safari **17+**.
- Radix/shadcn — **cancelled**.

## Layout

```
web/src/shared/theme/   # createAppTheme, AppGlobalStyles, color helpers
web/src/shared/ui/      # ModalOpenContext
web/src/features/       # torrents/search/details (DataGrid, Charts, TreeView)
web/src/components/     # App shell + remaining surfaces (Add/Settings/Player/…)
```

## Workflow

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
