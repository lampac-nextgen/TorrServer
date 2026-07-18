# TorrServer-Go — Web upgrade session context

**Saved:** 2026-07-18  
**Transcript:** [Web MUI production](98d7e6a7-6a2f-4721-ae12-0e4a1c6657ef)  
**Branch (typical):** `feature/web-upgrade`  
**Phase:** Full migrate **Material UI 9.2 + MUI X 9.10 Community**

Use this file + skill `.cursor/skills/torrserver-web/` to continue.

---

## Stack

| Layer | Value |
|-------|--------|
| Runtime | React 19 + Vite 6 |
| UI | `@mui/material@9.2` + Emotion (no styled-components) |
| Theme | `createAppTheme()` — `cssVariables` + `colorSchemes` + `useColorScheme` / `forceThemeRerender` |
| MUI X | data-grid / charts / tree-view / date-pickers **@9.10** Community |
| Ship | `yarn typecheck && yarn test && yarn build` → `go run gen_web.go --clean` |
| Browsers | Safari **17+** |

---

## Done (full wave)

- MUI 9.2 + X 9.10; no SC/polished
- Theme: [`shared/theme/createAppTheme.ts`](../../web/src/shared/theme/createAppTheme.ts) + `AppShell` under ThemeProvider
- Chrome: `AppGlobalStyles`; modal: `ModalOpenProvider`
- Torrents DataGrid (desktop) / cards (mobile)
- Search DataGrid
- Details: SpeedCharts + **FileBrowser** (Tree View folders + Files DataGrid + FileRowActions cells)
- vite chunks `mui` / `mui-x`; aliases `shared`, `features`
- Deleted noop `GlobalStyle.ts`

---

## Optional follow-ups

- Further move `components/*` → `features/*` (Add/Settings/Player) without behavior change
- Date Pickers if Settings gains date fields
- eslint prettier mass-fix of legacy style files

---

## Agent rules

- Russian replies when user writes Russian; code English.
- No commit unless asked.
