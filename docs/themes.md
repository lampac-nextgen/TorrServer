# Themes and palettes

The web UI has two independent axes: **brightness** (`light` / `dark` / `system`) and a named **palette** (`data-palette` on `<html>`). Both are stored in `localStorage` (`ts-color-scheme`, `ts-color-palette`) and applied by `web/src/shared/theme/useThemePreference.ts`.

## Source of truth

`web/src/shared/theme/palettes.json` holds every palette (`light` and `dark` token sets). Do not edit CSS by hand:

```bash
cd web
yarn gen:palettes   # palettes.json -> src/palettes.generated.css
```

`palettes.test.ts` fails if the generated CSS is stale, a palette lacks a swatch/label/locale string, or a token pair breaks the contrast rules below.

## Tokens

| Token | Role |
| --- | --- |
| `background`, `surface`, `surface-secondary`, `surface-tertiary` | page, cards, raised/inset areas, chips and default buttons |
| `foreground`, `muted`, `border`, `separator` | text and lines |
| `accent`, `accent-foreground` | primary actions, focus, selection |
| `accent-secondary` | live/streaming readiness (buffer bar), cache window/legend. Never for status or warnings |
| `danger`, `warning`, `success` (+ `*-foreground`) | semantic fills |
| `app-header*`, `app-rail*` | top bar and side rail chrome |

HeroUI's own neutral tokens (`overlay`, `default`, `field-background`, `segment`) are mapped onto these in `palettesCss.mjs`, so dialogs, chips, inputs and tabs follow every palette. In dark mode dialogs use `surface-secondary`; sticky bars inside a dialog must use `bg-overlay` (not `bg-surface`) to blend in.

## Contrast rules (enforced by tests)

- text on `background`, `surface`, `surface-tertiary` ≥ 4.5; `muted` ≥ 4.5 on `surface` and `surface-tertiary`
- `accent-foreground` on `accent`, `danger-foreground` on `danger`, `warning-foreground` on `warning`, `success-foreground` on `success` ≥ 4.5
- `accent` ≥ 4.5 on `surface-tertiary`, ≥ 3 on `surface` and `background`; `accent-secondary`, `danger`, `warning` ≥ 3 on `surface`
- `accent` and `accent-secondary` differ by OKLab ΔE ≥ 0.1
- no hex literals in `web/src` outside `palettes.json` (`noHardcodedColors.test.ts`)

`@media (prefers-contrast: more)` darkens `muted`/`border`/`separator` for every palette (generated).

## Groups, retired palettes and the report

Each palette has a `group` (`brand`, `neutral`, `warm`, `cool`, `green`, `vivid`, `accessible`); pickers render them grouped (`shared/theme/paletteGroups.ts`). Near-duplicates are retired by deleting the entry and adding it to the top-level `aliases` map of `palettes.json` (`"mint": "forest"`): a stored choice resolves to the successor and is migrated, and the pre-paint script in `index.html` (generated block between `/*palettes:start*/` and `/*palettes:end*/`) applies the same mapping, so there is no flash. Find candidates with:

```bash
cd web && node scripts/palette-report.mjs --threshold 0.03   # closest pairs, clusters, accent hue coverage
```

## Adding or changing a palette

```bash
cd web
yarn palettes:new <id> --from heritage --group vivid   # scaffold: tokens, THEME_PALETTES, labels, CSS
```

Then:

1. Tune the light/dark tokens of the new entry in `palettes.json`, rewrite its `note`, and `yarn gen:palettes`.
2. Translate `ThemePalette<Id>` in `ru`, `ua`, `bg`, `fr`, `ro`, `zh` (the scaffold writes the English name everywhere).
3. `yarn test` (token, group and sync rules), then `yarn test:e2e:palettes` (`PALETTES=<id>` for just this one).

By hand instead: add the entry, add the id to `THEME_PALETTES` in `useThemePreference.ts`, add the label to all seven locales, `yarn gen:palettes`.

## Checking how it looks

```bash
make webgen                         # the matrix runs against the embedded build
cd web
yarn test:e2e:palettes              # every palette x light/dark, desktop + phone + login
PALETTES=nextgen,neon yarn test:e2e:palettes
yarn palettes:report                # findings + contact sheet: web/e2e/.artifacts/palettes/index.html
```

The matrix screenshots each screen and scans text contrast (DOM backdrop, plus pixel sampling for text over images), keyboard focus rings, and that dialog/action-bar/button surfaces resolve to palette tokens. A 4-palette slice (`web/e2e/mock/palettes-smoke.spec.ts`) runs in the required `yarn test:e2e`.

## Brand assets

`web/src/shared/theme/brand-colors.json` holds the icon colours (cyan, sky, amber, orange); the dark accents of `nextgen`, `neon` and `amber` use them (tested). Generated assets (committed):

```bash
node scripts/gen-icons.mjs   # maskable / apple-touch / 192px icons from docs/assets/logo-mark.png
node scripts/gen-logos.mjs   # public/brand/logo-{dark,light}.svg with outlined text
```

`BrandLogo` picks the dark artwork on dark surfaces.
