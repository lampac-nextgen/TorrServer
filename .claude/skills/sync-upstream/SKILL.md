---
name: sync-upstream
description: Sync lampac-nextgen/TorrServer with YouROK/TorrServer upstream/master. Use when asked to bring in, analyze, or merge upstream commits, or when GitHub shows the fork "N commits behind".
---

# Sync with upstream

Goal: one PR that takes the upstream commits that apply, skips the rest with a stated reason, and leaves `upstream/master` an ancestor of `master` so GitHub shows 0 behind. Cherry-picking alone does not do that (it cost us #131 plus #133).

`origin` is `lampac-nextgen/TorrServer`, `upstream` is `YouROK/TorrServer`. Never push to or comment on upstream. Never use the web UI "Sync fork" / "Discard N commits": it deletes our history.

## 1. Setup

```bash
git fetch origin
git fetch upstream            # two commands: `git fetch origin upstream` fails
git checkout -b sync/upstream-<topic> origin/master
git log --format='%h %an %ad %s' --date=short --reverse HEAD..upstream/master
```

Per commit: `git show --stat --format= <hash>`. Spot commits we already have under another hash: `git cherry -v HEAD upstream/master` and `git log --oneline --grep '#<PR>'` (e.g. upstream #955 is our #130).

## 2. Classify

Always skip (put the reason in the PR):

- `server/web/pages/template/pages/**`, and the hash bumps in `html.go` / `route.go` ("bump static web"): generated from our `web/`.
- `server/version/version.go` (`MatriX.N`): we version as `NextGen.N`. A bump is a separate squash PR.
- `web/src/components/**`, `web/public/index.html`, other old CRA files: the UI here is the TS/Vite rewrite.
- README / About contributors updates.
- Dependabot bumps of `web/` whose lockfile differs: leave to Dependabot.
- Already shipped here under our own PR number.

Everything else under `server/`: take, after reading the diff against AGENTS.md (lock order, `NE`/`OE` APIs, no `os.Exit` in library code, no `SetResponsive` where eviction can hand back zeros). Decide per commit; ask the user when unsure.

## 3. Apply

```bash
git cherry-pick -x <hash> <hash> ...      # upstream order
```

On a conflict, resolve toward fork behavior, not upstream's.

## 4. Record upstream as merged (same branch)

```bash
git merge -s ours upstream/master -m "merge: sync upstream/master (took #A #B, skipped #C #D: reason)"
git rev-list --count HEAD..upstream/master      # must print 0
git diff --stat origin/master...HEAD            # only the cherry-picked files
```

## 5. Checks (repo root)

```bash
make fmt-check
make lint
make test
```

If `server/gstreamer` changed, also:

```bash
go -C server test -race -count=3 -shuffle=on -tags gst ./gstreamer/...
```

- Without a GStreamer runtime these skip: `TestLoadGStreamerRuntimeIfAvailable`, `TestVideoStartProbeNativeCallback`, `TestHEVCHDRCapsProbeRetainsInitialMetadata`. `web/api` `TestOfflineAPI` fails under `-tags gst` for the same reason. Report them as not run. Do not say they passed.
- Reading C memory through a bare `uintptr` aborts `-race` in checkptr when a test points it at Go memory. Use the `//go:nocheckptr` helpers (`loadUintptr`, `loadByte` in `gst_api.go`) or annotate the ABI accessor. Production addresses are C memory, so behavior is unchanged.

## 6. PR

```bash
git push -u origin HEAD
gh pr create --repo lampac-nextgen/TorrServer --base master --head "$(git branch --show-current)" --title "sync: upstream/master (take #A #B)" --body-file <file>
```

Body sections: Taken, Fixed here (not from upstream), Skipped (reason each), "Merge with a merge commit (not squash)", Checks (say what was not run).

## 7. Merge (only when the user says so)

Read `gh pr checks <n> --repo lampac-nextgen/TorrServer` first and name anything running or failing.

```bash
gh pr merge <n> --repo lampac-nextgen/TorrServer --merge
```

`--merge`, never `--squash`: squash drops the upstream ancestry and GitHub keeps saying "behind".

## 8. Verify

```bash
git fetch origin
git fetch upstream
git rev-list --count origin/master..upstream/master     # must print 0
```

GitHub should show "0 commits behind".
