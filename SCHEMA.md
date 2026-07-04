# design-dna — the format

design-dna is an open, portable format for a person's design taste. One schema,
many instances: your design-dna repo *is* your taste identity. Anything that can
read the format — a coding agent, a design tool, a community like
[Gauche](https://github.com/) — gets your palette, type, spacing, motion,
principles, and prohibitions without you re-explaining them.

A repo either **conforms** (clear pass from the validator) or **fails with
actionable errors**. This file is the human spec; the machine spec is
[`schema/design-dna.schema.json`](schema/design-dna.schema.json) (JSON Schema
draft 2020-12), and both are enforced by `npm run validate <repo-path>`.

## Repository layout

```
manifest.json              REQUIRED  entry point: instance metadata + the vibe list
TASTE.md                   REQUIRED  aesthetic principles in words, per vibe/family
ANTI.md                    REQUIRED  named prohibitions (must contain list items)
tokens/<vibe-id>/
  tokens.json              REQUIRED  DTCG source of truth for that vibe
  css/variables.css        built     CSS custom properties
  tailwind/preset.cjs      built     Tailwind preset (theme.extend)
  native/theme.js          built     Expo/React-Native theme object (numeric values)
patterns/<stack>/          optional  canonical recipes (nav, hero, card…) done your way
README.md                  optional  but be a good citizen
```

Built outputs are generated from `tokens.json` by Style Dictionary
(`npm run build` in this repo) and **committed**, so consumers that can't run a
build (a skill copying files, a web app fetching raw URLs) still get every
target. `tokens.json` is always the source of truth; if built files disagree
with it, they're stale.

## manifest.json

```json
{
  "name": "luke",
  "version": "0.1.0",
  "description": "Luke's design DNA.",
  "owner": { "name": "Luke" },
  "vibes": [
    {
      "id": "analog",
      "name": "Analog",
      "mode": "light",
      "description": "Warm-paper editorial. Swiss grid, hairline rules, optical serifs.",
      "source": "gauche/DESIGN.md"
    }
  ],
  "patterns": ["astro", "expo"]
}
```

- `name` — kebab-case instance id, usually the owner's handle.
- `vibes[]` — every entry **must** have a matching `tokens/<id>/tokens.json`.
  `mode` is `light` or `dark` (the canvas the vibe is designed on — one mode per
  vibe in v1; a dark twin is a second vibe). `description` should let a stranger
  pick a vibe; `source` records provenance.
- `patterns[]` — stacks that have a `patterns/<stack>/` directory.

## tokens.json — DTCG, with a minimum semantic contract

Tokens use the [W3C Design Tokens Community Group format](https://design-tokens.github.io/community-group/format/):
every token is `{ "$type": ..., "$value": ..., "$description"?: ... }`, nested in
groups. Allowed `$type`s: `color`, `dimension`, `fontFamily`, `fontWeight`,
`duration`, `cubicBezier`, `number`, `shadow`.

What makes design-dna more than "a folder of DTCG files" is the **minimum
semantic contract**: every vibe must define the groups and names below, so any
consumer can render any conformant vibe — swatches, a type ramp, a themed
component — without special-casing. Beyond the minimum, add whatever your taste
needs (extra colors, `shadow`, `tracking`, `leading`, `measure`, …).

| Group | Required tokens | $type |
|---|---|---|
| `color` | `bg` `surface` `ink` `ink-muted` `border` `accent` `accent-ink` | `color` |
| `font` | `display` `body` `mono` | `fontFamily` |
| `text` | `xs` `sm` `base` `md` `lg` `xl` `2xl` | `dimension` |
| `space` | `1` … `8` (ascending) | `dimension` |
| `radius` | `sm` `md` `lg` | `dimension` |
| `motion.duration` | `fast` `normal` `slow` | `duration` |
| `motion.easing` | `default` | `cubicBezier` |

Conventions the schema enforces:

- **Colors are hex only** — `#RRGGBB` or `#RRGGBBAA`. Encode alpha in the hex
  (a 12%-opacity hairline is `#1C1A171F`), never `rgba()` strings. This keeps
  every transform target trivial and diffs honest.
- **Dimensions are single lengths with units** (`px`/`rem`/`em`/`ch`/`%`, or
  literal `0`). No `clamp()`/`calc()` — fluid sizing is a *pattern* concern,
  not a token.
- **Font families are ordered arrays**; the first entry is the intended face,
  the rest are fallbacks.
- **Shadows are structured** (`offsetX/offsetY/blur/spread/color`), single
  layer or an array of layers — never a pre-baked CSS string.

Semantic naming note: `ink` is text color, `accent-ink` is text *on* the
accent. `ink-faint`, `surface-raised`, `accent-hover`, `accent-pressed`,
`accent-2` are conventional-but-optional names consumers may look for.

## TASTE.md and ANTI.md conventions

- **TASTE.md** — the creative director's brief: principles in words, organized
  per vibe or product family. Non-empty is required; useful is expected. Write
  rules a generator can obey ("asymmetric, left-weighted layout; one accent
  used with conviction"), not moods ("clean and modern").
- **ANTI.md** — named prohibitions, the highest-leverage file: models and
  people both respond to explicit bans far better than to "make it unique".
  Must contain at least three markdown list items (`- ` / `* `). Each ban
  should be concrete enough to grep for or point at in a review.

## Validation

```
npm run validate <path-to-repo>   # any repo; defaults to the current directory
```

Checks, in order — failing any of these is a FAIL:

1. `manifest.json` exists, parses, and validates against `#/$defs/manifest`.
2. `TASTE.md` exists and is non-empty.
3. `ANTI.md` exists and contains ≥ 3 list items.
4. For every vibe in the manifest: `tokens/<id>/tokens.json` exists, parses,
   and validates against `#/$defs/tokenFile` (DTCG shape + the semantic
   contract).

Warnings (conformant, but flagged): missing built outputs (`css/`, `tailwind/`,
`native/`), `patterns` entries in the manifest with no matching directory.

The validator core is pure (`lib/validate.mjs` — takes file contents, returns
`{ ok, errors, warnings, manifest, vibes }`) so the same module runs against a
local path from the CLI and against fetched raw files inside Gauche. The schema
is enforced identically everywhere it's consumed.

## Versioning

The format itself is versioned by this repo's releases; an instance versions
itself via `manifest.version`. Additive changes (new optional groups, new
optional manifest fields) are minor; anything that makes a previously-valid
repo invalid is major.
