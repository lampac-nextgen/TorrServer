# Prompt — continue TorrServer web work

Copy into a new Cursor Agent chat:

```
Use the project skill torrserver-web and read .cursor/context/web-upgrade-session.md first.

You are continuing TorrServer-Go web UI work on branch feature/web-upgrade.

Stack: React 19 + Vite 6 + TypeScript + MUI 6.4 + styled-components + TanStack Query v5.
Ship path: web build → go run gen_web.go --clean → embedded in server/web/pages/template/pages.

Locked:
- No Vue, no MUI 7, no full Emotion rewrite, no FileRow ⋯ menu
- Snake poll 250ms + keep TorrentCache memo; GStreamer probe/runtime caches stay
- No lord-icon; empty/offline = MUI icons
- Do not commit unless I ask

Reply in Russian when I write in Russian. Code/comments in English.

Task:
<опиши задачу>
```

## Short prompt (minimal)

```
Skill: torrserver-web. Context: .cursor/context/web-upgrade-session.md.
Respect locked decisions. After UI: typecheck + build + gen_web --clean. No commit unless asked.

Task: <…>
```
