# Testing

Four layers, from fast to slow. Each one catches a different kind of break, so a change usually needs a test in the lowest layer that can see it.

| Layer | Where | Run it | In CI |
| --- | --- | --- | --- |
| Go unit and race tests | `server/**/*_test.go` | `make test` | required |
| Web unit tests (vitest) | `web/src/**/*.test.ts(x)` | `cd web && yarn test` | required, with a coverage floor |
| Web E2E, mocked API | `web/e2e/mock/*.spec.ts` | `cd web && yarn test:e2e` | required |
| Web E2E, real server | `web/e2e/real/*.spec.ts` | `make e2e-real` | advisory |

Not part of the gates: `web/e2e/live` (needs a running server and the network, `LIVE=1`) and `web/e2e/screenshots` (manual screenshot matrix).

## Before you push

```bash
make fmt-check lint test          # Go (add `make bench` when you touch server/torr, torrstor or web/api)
make web-check                    # web: typecheck, lint, vitest, i18n, mocked E2E
make check-all                    # everything required above
```

`make web-check` does not collect coverage. CI does, and fails when it drops below the floor (see below), so run `cd web && yarn test --coverage` if you removed or added a lot of code.

## Go

`make test` is the race gate: `go test -race` over every package except the generated Swagger docs, with a 70% total coverage floor (`.testcoverage.yml`). Offline torrent tests use the loopback harness in `server/torr/offlinetest`; do not add tests that need the public network, a real FUSE mount or a real `ffprobe`. Details and the lock-order rules are in [AGENTS.md](../AGENTS.md).

## Web unit tests

Vitest with Testing Library. A file is a pure-logic test (node) unless its first line is `// @vitest-environment happy-dom`. Helpers live in `web/src/test`:

- `renderWithProviders` / `renderWithApp`: React Query, i18n, and the dialog and toast contexts.
- `mockApi` (`routeApi`, `axiosError`) and `network` (`mockNetwork`): route requests by `METHOD /path`; an unrouted request fails the test.

Coverage is measured with v8 over `web/src`, excluding `src/index.tsx` (entrypoint) and `src/shared/testing`. `test.coverage.thresholds` in `web/vite.config.ts` is the floor (lines 91, statements 89, functions 85, branches 79). Raise it when coverage grows; do not lower it to land a change. Run `yarn test --coverage` locally; the HTML report is in `web/coverage/lcov-report/`.

## Web E2E (Playwright)

`@playwright/test`, configured in `web/playwright.config.ts` with one project per kind. Traces, screenshots and the HTML report go to `web/e2e/.artifacts`.

- **mock**: the embedded SPA (`server/web/pages/template/pages`) is served by a tiny static server and the API is stubbed with `page.route` (`web/e2e/fixtures/mocks.ts`). Fast and deterministic: layout, auth gate, settings dialog.
- **real**: starts the built `tmp/e2e/torrserver` plus a loopback seeder (`server/torr/offlinetest/e2e-seed`) and drives the UI against real streams. `make e2e-real` builds both binaries first; it needs `ffmpeg` for the video case. Specs use `useServer()` from `web/e2e/fixtures/test.ts`.
- **live**: `LIVE=1 TORRSERVER_URL=http://127.0.0.1:PORT yarn test:e2e:live`, or `scripts/live-torrent-check.sh`.
- **screenshots**: `yarn test:e2e:shots` attaches phone, tablet and desktop screenshots; set `TORRSERVER_URL` to shoot a running server instead of the mocks.

A test that fails only in CI: download the `web-e2e-mock-artifacts` or `e2e-real-artifacts` artifact and open the trace with `yarn playwright show-trace <trace.zip>`.

## What CI runs

`.github/workflows/ci.yml`, on push and pull request to `master`. Jobs run in parallel:

| Job | What it does |
| --- | --- |
| `Lint (Go)` | gofmt, goimports, golangci-lint |
| `Race Tests & Coverage` | `go test -race`, the 70% coverage gate, memory and throughput benchmarks |
| `GoReleaser config` | validates both GoReleaser files |
| `Web checks` | `yarn typecheck`, `yarn lint`, `yarn i18n:check` |
| `Web unit tests` | `yarn test --coverage`, enforcing the coverage floor, table in the job summary |
| `Web E2E (mocked) and build` | Playwright mock project, then a release-like `yarn build` |
| `Web (typecheck lint test build)` | aggregate of the three web jobs above; one status that stands for the whole web UI, kept under its old name so an existing required-check rule keeps matching |
| `E2E (real server)` | runs only when `web/src`, `web/e2e`, `web/playwright.config.ts`, `web/package.json`, `server/web`, `server/torr`, `server/settings`, the `Makefile` or the workflow change; `continue-on-error`, so it never blocks a merge |
| `Build (linux amd64)` | snapshot build, runs after the required jobs pass |

Benchmark swings past 200% are commented on the PR and do not fail CI: `-benchtime=200ms` on a shared runner moves that much.
