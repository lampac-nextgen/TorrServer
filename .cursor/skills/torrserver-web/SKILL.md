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
2. Confirm Node 22+ (`web/.nvmrc`). Prefer `npm` scripts in `web/package.json`.

## Hard locks

- Keep React — no Vue rewrite.
- Stay on MUI 6 — no MUI 7 unless asked.
- Keep dual styling: MUI for buttons/dialogs/feedback; styled-components for shells/canvas/PWA.
- File row: **all** player/copy/preload actions visible as equal outlined buttons — never a «⋯» menu.
- Snake: poll `/cache` at **250ms**; **no** `memo` on `TorrentCache` (deep `isEqual` caused stutter vs classic).
- GStreamer: keep runtime React Query cache + probe cache in card; heartbeat `no-store`.
- No lord-icon / Lottie for empty states — use `@mui/icons-material` + light CSS motion.
- Relative asset base for Go embed (`./`). Do not break Basic Auth / API hosts in `utils/Hosts.ts`.

## Workflow after UI changes that ship in the binary

```bash
cd web && npm run typecheck && npm run build
cd .. && go run gen_web.go --clean
```

Remind user to restart server + hard refresh. Do not commit unless asked.

## Patterns

| Need | Prefer |
|------|--------|
| Toast / errors | `AppSnackbar` / `useAppToast` + MUI `Alert` |
| Loading list | MUI `Skeleton` |
| Buffer bar | MUI `LinearProgress` + Filled/Capacity (not preload target alone) |
| Status | MUI `Chip` (`StatusIndicator`) |
| Destructive | Confirm dialog; Cancel `autoFocus` |
| Heavy dialogs | `React.lazy` + `Suspense`; do not static-import from always-mounted trees |
| Code split | Keep vite `manualChunks`: `mui`, `hls`, `vendor` |

## Snake vs “cache”

- Server torrent piece buffer UI = snake (`useUpdateCache` → `TorrentCache`).
- Snake: poll already live; do not re-add `memo`/`isEqual` on `TorrentCache` — it stuttered vs classic.

## Prompt for new chats

Paste from [PROMPT.md](PROMPT.md).
