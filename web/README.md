# TorrServer web client

Modern web UI for the TorrServer API.

**Stack:** React 19, Vite 8, TypeScript 6, HeroUI v3, Tailwind CSS v4, GSAP, TanStack Query, lucide-react, sonner.

## Layout

```
src/app/        # App shell, navigation, error boundary
src/features/   # torrents, add, search, settings, details, player, …
src/shared/     # api, hooks, theme, cache, lib, ui, i18n, torrent
src/locales/    # i18n JSON (en, ru, ua, zh, bg, fr, ro)
```

## Prerequisites

- Node.js **22+** (see `.nvmrc`)
- Yarn Classic

## How to start

0. Skip the env steps if the API is on `localhost` (Vite proxies API calls).
1. Copy `.env_example` to `.env`
2. Set `VITE_SERVER_HOST` (no trailing `/`)

   > `http://192.168.78.4:8090` — correct  
   > `http://192.168.78.4:8090/` — wrong

3. Optionally set `VITE_TMDB_API_KEY`
4. `yarn` then `yarn start` (or `yarn dev`)

## Scripts

| Command | Purpose |
|---------|---------|
| `yarn` | Install dependencies |
| `yarn start` / `yarn dev` | Vite dev server |
| `yarn typecheck` | TypeScript (`tsc --noEmit`) |
| `yarn lint` / `yarn fix` | ESLint / autofix |
| `yarn test` | Vitest |
| `yarn test --coverage` | Vitest with v8 coverage (summary in the terminal, `coverage/lcov-report/` for detail) |
| `yarn test:e2e` | Mocked-API Playwright flows (`yarn playwright install chromium` once) |
| `yarn build` | Production bundle → `build/` |
| `yarn i18n:check` | Locale key consistency |

## Testing

- Pure logic (`shared/*`, models, URL builders) runs on Vitest's default `node` environment: `foo.test.ts` next to `foo.ts`.
- A component or hook that needs the DOM opts in per file with `// @vitest-environment happy-dom` as the first line, in a `*.test.tsx` file.
- Render with `renderWithProviders` from `src/test/renderWithProviders.tsx` (same providers as `src/index.tsx`, a `QueryClient` that never retries). `src/test/setup.ts` stubs `matchMedia`, the observers, `scrollTo` and media playback, and cleans up after each test.
- Drive the UI with `@testing-library/user-event` and query by role or label; assert what the user sees or what request was sent, not the markup.
- Mock the network with `vi.stubGlobal('fetch', ...)` as in `src/shared/api/apiModules.test.ts`. No test may reach a real server.
- CI prints coverage in the job summary; there is no threshold yet.

## Embed into Go

`yarn build` writes relative-path assets to `web/build/`. From the repo root, refresh the embedded UI:

```sh
make webgen-clean
# or: go run gen_web.go --clean
```

Restart TorrServer and hard-refresh the browser.

## PWA icons

How images were generated:

```sh
npx pwa-asset-generator public/logo.png public -m public/site.webmanifest -p "calc(50vh - 25%) calc(50vw - 25%)" -b "linear-gradient(135deg, rgb(50,54,55), rgb(84,90,94))" -q 100 -i index.html -f
```
