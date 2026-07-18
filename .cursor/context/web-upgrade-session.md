# TorrServer-Go — Web session context

**Saved:** 2026-07-18  
**Branch (typical):** `feature/web-upgrade`  
**Phase:** New web client — **HeroUI v3 + GSAP** (MUI removed)

---

## Doctrine

- Live tree: `app/` + `features/` + `shared/` + `locales/`
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

- Full UI rewrite off MUI onto HeroUI
- Streaming poster library + GSAP
- Details tabs Overview/Files/Cache; Settings/Add/Search/Player/system

---

## Agent rules

- Russian replies when user writes Russian; code English.
- No commit unless asked.
