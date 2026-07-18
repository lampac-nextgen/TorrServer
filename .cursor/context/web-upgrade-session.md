# TorrServer-Go — Web upgrade session context

**Saved:** 2026-07-18  
**Transcript:** [Web MUI production](98d7e6a7-6a2f-4721-ae12-0e4a1c6657ef)  
**Branch (typical):** `feature/web-upgrade`  
**Phase:** Greenfield on **Material UI 9.2 + MUI X 9.10 Community** (in progress)

Use this file + skill `.cursor/skills/torrserver-web/` to continue without re-discovering decisions.

---

## Stack (current)

| Layer | Value |
|-------|--------|
| Runtime | React 19 + Vite 6 |
| UI | **@mui/material@9.2** + Emotion (no styled-components) |
| MUI X | **@mui/x-data-grid / charts / tree-view / date-pickers @9.10** Community |
| Data | TanStack Query v5 |
| Node | `>=22` |
| Ship | `yarn typecheck && yarn lint && yarn test && yarn build` → `go run gen_web.go --clean` |
| Browsers | Safari **17+**, Chrome 117+ (MUI 9 floor) |

---

## Locked decisions

1. Keep React — no Vue.
2. Toolkit = Material UI 9 + MUI X Community — **no** Radix/shadcn, **no** MUI X Pro.
3. **No styled-components** — Emotion/MUI only.
4. MatriX green brand; Donate removed; adaptive shell (no PWA layout caste).
5. FileRowActions all visible; snake algorithms unchanged; GStreamer caches stay.
6. Modal↔nav via `ModalOpenProvider` (`data-modal-open` / `data-immersive`), not Backdrop aria-hidden guessing.

---

## Done in this migration wave

- Deps: MUI 9.2 + MUI X 9.10 + dayjs; removed styled-components + polished.
- Styles: all SC → Emotion; `alphaCss` / `resolveThemeColors` in `shared/theme/color.ts`.
- Chrome tokens: `shared/theme/AppGlobalStyles.tsx` (Emotion `Global`).
- Providers: MUI ThemeProvider + LocalizationProvider + ModalOpenProvider + AppSnackbar.
- MUI 9 API: TextField `slotProps`; Box/Stack/Typography system props → `sx`.
- **Data Grid:** desktop torrents (`features/torrents/TorrentsDataGrid`), Search results (`features/search/SearchResultsGrid`); mobile still cards.
- **Charts:** details speed sparkline (`features/details/SpeedCharts`).
- vite chunks: `mui` + `mui-x`; aliases `shared`, `features`.
- Ship gate green + `gen_web.go --clean` (last run OK).

---

## Still open (continue greenfield)

- Tree View for multi-file path hierarchy in Details.
- Files table → Data Grid with FileRowActions cell (keep all buttons).
- Theme: migrate `useMaterialUITheme` to single `createTheme({ cssVariables, colorSchemes })` + `useColorScheme`.
- Move remaining `components/*` into `app/` / `features/` and purge legacy style files.
- Date Pickers in Settings only if date fields appear.
- Broader eslint prettier cleanup (many pre-existing warnings).

---

## Key paths

| Area | Path |
|------|------|
| Global CSS tokens | `web/src/shared/theme/AppGlobalStyles.tsx` |
| Modal open | `web/src/shared/ui/ModalOpenContext.tsx` |
| Theme hook | `web/src/style/materialUISetup.ts` |
| Torrents grid | `web/src/features/torrents/TorrentsDataGrid.tsx` |
| Search grid | `web/src/features/search/SearchResultsGrid.tsx` |
| Speed charts | `web/src/features/details/SpeedCharts.tsx` |
| Snake | `web/src/components/DialogTorrentDetailsContent/TorrentCache/` |
| Embed | `gen_web.go` |

---

## Agent rules

- Prefer Russian when the user writes in Russian; code/comments English.
- Do **not** commit unless asked.
- After UI ship: typecheck + lint + test + build + `gen_web --clean`.
