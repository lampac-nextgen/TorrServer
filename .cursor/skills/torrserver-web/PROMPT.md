# Prompt — continue TorrServer web work

Copy into a new Cursor Agent chat:

```
Use the project skill torrserver-web and read .cursor/context/web-upgrade-session.md first.

You are continuing TorrServer-Go web UI work on branch feature/web-upgrade.

Phase: Ideal Wave 1 on MUI 6 (accepted or pending manual accept). Wave 2 Radix/shadcn only after accept.

Stack: React 19 + Vite 6 + TypeScript + MUI 6 + styled-components + TanStack Query v5.
Design SSOT: web/src/style/tokens.ts → GlobalStyle + MUI theme. Brand: MatriX green.
Ship: cd web && yarn typecheck && yarn lint && yarn test && yarn build && cd .. && go run gen_web.go --clean

Locked:
- No Vue, no MUI 7 in Wave 1, no FileRow ⋯ menu, Donate stays removed
- One adaptive shell (width + chrome tokens); no standaloneMedia / PWA layout caste
- Bottom nav 90px band including safe-area; fixed outside AppWrapper; open-modal only disables taps
- Snake poll 100ms + memo + focus-window; GStreamer caches stay
- No lord-icon; empty/offline = MUI icons
- Do not commit unless I ask

Reply in Russian when I write in Russian. Code/comments in English.

Task:
<опиши задачу>
```

## Short prompt (minimal)

```
Skill: torrserver-web. Context: .cursor/context/web-upgrade-session.md.
Respect locked decisions. After UI: typecheck + lint + test + build + gen_web --clean. No commit unless asked.

Task: <…>
```
