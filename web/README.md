# TorrServer web client

### Prerequisites

- Node.js **22+** (see `.nvmrc`)
- Yarn Classic

### How to start project

0. Ignore the first two steps if the server is on `localhost` (Vite proxies API calls).
1. Duplicate `.env_example` and rename it to `.env`
2. In `.env` set `VITE_SERVER_HOST` (without a trailing `/`)
> `http://192.168.78.4:8090` — correct
>
> `http://192.168.78.4:8090/` — wrong
3. Optionally set `VITE_TMDB_API_KEY`
4. `yarn` then `yarn start` (or `yarn dev`)

### Build

```sh
yarn build
```

Output goes to `web/build/` (relative asset paths for Go embed). Refresh the embedded UI with `make webgen-clean` from the repo root.

### Eslint

- `yarn lint` — find lint problems
- `yarn fix` — autofix

### How images were generated

`npx pwa-asset-generator public/logo.png public -m public/site.webmanifest -p "calc(50vh - 25%) calc(50vw - 25%)" -b "linear-gradient(135deg, rgb(50,54,55), rgb(84,90,94))" -q 100 -i index.html -f`
