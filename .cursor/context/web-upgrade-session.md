# TorrServer-Go — Web session context

**Saved:** 2026-07-18  
**Branch (typical):** `feature/web-upgrade`  
**Phase:** `web/` full-scratch rebuild complete — all features rebuilt fresh on HeroUI v3 + GSAP, typecheck/lint/test/build/gen_web all green. `web-legacy-old/` safe to delete once you're happy with parity.

---

## Doctrine

- `web/` is a from-scratch client: `app/` + `features/` + `shared/` + `locales/`. Every UI file was rewritten fresh, not ported.
- `web-legacy-old/` (gitignored, untracked) is the frozen pre-rewrite client, kept **only** as a functional/API reference (hooks, gstreamer/HLS logic, cache-map math, i18n copy). Never edit it; never import it from `web/`. Safe to delete once parity is confirmed.
- New beautiful client to TorrServer API — not legacy visual parity
- Master = feature/behavior contract only
- Prefer `shared/api/*` + React Query

---

## Stack

| Layer | Value |
|-------|--------|
| Runtime | React 19 + Vite 8.1 + TypeScript 6 + Vitest 4 |
| UI | HeroUI 3 (`@heroui/react` + `@heroui/styles`) + Tailwind 4 |
| Motion | GSAP + `@gsap/react` |
| Icons / toast | lucide-react / sonner |
| Theme | `useThemePreference` — class on `html` |
| Ship | typecheck + lint + test + build → `gen_web --clean` |

---

## Done

- `web/` scaffolded from scratch (package.json, vite/tsconfig/eslint, index.html, public/ assets) — fresh `yarn.lock`, no ported config drift.
- Functional layer ported verbatim from `web-legacy-old`: `shared/api`, `shared/hooks`, `shared/lib`, `shared/torrent`, `shared/cache`, `shared/i18n` + `locales` (en/ru/ua/zh/bg/fr/ro), `shared/theme/{breakpoints,color,useThemePreference}`, `shared/settings`, `shared/ui` (AppDialog/ModalOpenContext/Toast/UnsafeButton).
- `index.css` brand theme (HeroUI CSS-var overrides, light+dark) carried forward; `app/{App,Shell,Sidebar,BottomNav,ErrorBoundary}` rewritten fresh.
- Every feature rebuilt fresh (not ported) via parallel subagents, each re-verified against `web-legacy-old` for functional parity: `features/torrents` (poster grid + GSAP), `features/player` (HLS/gstreamer VideoPlayer), `features/details` (overview/files/cache tabs, snake canvas), `features/add` + `features/search`, `features/settings` (+ Torznab/TMDB panels) + `about`/`system`/`categories`/`pwa`.
- Full pipeline green end-to-end: `yarn typecheck && yarn lint && yarn test && yarn build` (0 errors, 25/25 tests, only 14 pre-existing-pattern `react-hooks` warnings in accepted style), `go run gen_web.go --clean` re-embedded into `server/web/pages/template/pages`, Go server (`server/`) builds clean.

---

## Agent rules

- Russian replies when user writes Russian; code English.
- No commit unless asked.
