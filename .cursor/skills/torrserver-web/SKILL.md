---
name: torrserver-web
description: >-
  Continues TorrServer-Go web UI work (React 19, Vite 8, TypeScript 6, MUI 9.2,
  MUI X 9.10, TanStack Query, gen_web embed). Use when editing web/, torrent
  details/snake/cache, GStreamer player, FileRowActions, empty states, i18n,
  bundle/lazy chunks, or when the user mentions production-ready UI, MUI X
  Data Grid/Charts, or web upgrade.
---

# TorrServer-Go Web

## Before coding

1. Read [web-upgrade-session.md](../../context/web-upgrade-session.md) for locked decisions and done/todo.
2. Confirm Node 22+ (`web/.nvmrc`). Use **yarn** in `web/` — `gen_web.go` also runs `yarn` / `yarn run build`.

## Hard locks

- Keep React — no Vue rewrite.
- **Tooling:** Vite **8.1** (Rolldown/Oxc) + TypeScript **6.0** + Vitest **4** + `@vitejs/plugin-react` **6**. Node **22+**.
  - Note: TypeScript **7** exists on npm, but `typescript-eslint` currently peers `<6.1` — stay on TS 6 until the ESLint stack catches up.
- **Stack:** Material UI **9.2** + MUI X **9.10 Community** (Data Grid, Charts, Tree View, Date Pickers). Theme: `cssVariables` + `colorSchemes` + `useColorScheme`. No Pro/Premium license.
- **No styled-components** — Emotion via MUI only.
- **Greenfield only:** `web/src/{app,features,shared,locales,assets}` — no `components/`, `style/`, `utils/`, or legacy entry.
- `parse-torrent` + minimal `vite-plugin-node-polyfills` are allowed for MultiAdd hash/dedup only (not general lodash/react-measure).
- Brand: **MatriX green**. File row: all actions visible. Snake/GStreamer contracts unchanged.
- Adaptive shell + `ModalOpenProvider`. Donate removed. Safari **17+**.
- Radix/shadcn — **cancelled**.

## Layout

```
web/src/app/            # App, Shell, Sidebar, BottomNav, ErrorBoundary
web/src/features/       # torrents, add, search, settings, details, player, about, system
web/src/shared/         # api, theme, cache (snake), lib, ui, i18n, torrent
web/src/locales/        # i18n JSON
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
| Toast | `shared/ui/Toast` |
| Torrents desktop | `features/torrents/SimpleTorrentsDataGrid` |
| Torrents mobile | cards in `TorrentsPage` |
| Search results | `features/search/SearchResultsGrid` |
| Cache snake | `features/details/TorrentCache` + `shared/cache/*` |
| Speed history | `features/details/SpeedCharts` |
| Modal open / immersive | `useSyncModalOpen` / `setImmersive` |
| Destructive | Confirm dialog; Cancel `autoFocus` |
| Code split | vite `build.rolldownOptions.output.codeSplitting` groups: `mui`, `hls`, `vendor` |

## Prompt for new chats

Paste from [PROMPT.md](PROMPT.md).
