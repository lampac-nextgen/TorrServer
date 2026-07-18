# Prompt — continue TorrServer web work

```
Use the project skill torrserver-web and read .cursor/context/web-upgrade-session.md first.

Continuing TorrServer-Go web on feature/web-upgrade — the NEW TorrServer web (rewrite-first).

Stack: React 19 + Vite 8.1 + TypeScript 6 + Material UI 9.2 + MUI X 9.10 Community.
Greenfield only (app/features/shared/locales). Master = feature contract only — never port legacy UI.
Current branch code is NOT an anchor: rewrite freely when needed. Modern UX + best practice.
No styled-components. Emotion/MUI only. MatriX green. Safari 17+.
Ship: cd web && yarn typecheck && yarn lint && yarn test && yarn build && cd .. && go run gen_web.go --clean

Locked: no Vue, no Radix, no MUI X Pro, FileRow no ⋯, snake/GStreamer contracts, adaptive shell + ModalOpenProvider.
Prefer shared/api + React Query hooks over scattered axios.

Task:
<опиши задачу>
```

## Short

```
Skill: torrserver-web. Context: .cursor/context/web-upgrade-session.md.
New TorrServer web — rewrite-first; master = capabilities only; branch code not an anchor.
After UI: typecheck + lint + test + build + gen_web --clean. No commit unless asked.

Task: <…>
```
