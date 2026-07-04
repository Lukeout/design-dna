# design-dna

**An open, portable format for a person's design taste.** One schema, many
instances: your design-dna repo *is* your taste identity — palette, type,
spacing, motion, principles, and named prohibitions, machine-readable and
human-legible in the same place.

This repo is two things at once:

1. **The format** — [`SCHEMA.md`](SCHEMA.md) (human spec),
   [`schema/design-dna.schema.json`](schema/design-dna.schema.json) (machine
   spec), and a validator (`npm run validate <repo>`). Any repo either
   conforms or fails with actionable errors.
2. **Luke's reference instance** — four vibes extracted from real, shipped
   identities, proving the schema on day one.

## What's in an instance

```
manifest.json        the vibe list + metadata (the entry point)
TASTE.md             aesthetic principles a generator can obey
ANTI.md              named prohibitions — the highest-leverage file
tokens/<vibe>/
  tokens.json        W3C DTCG source of truth ($type/$value)
  css/variables.css  built: CSS custom properties
  tailwind/preset.cjs  built: Tailwind preset
  native/theme.js    built: Expo/React-Native theme object
patterns/<stack>/    canonical recipes (nav, hero, card) done your way
```

Tokens are [W3C Design Tokens Community Group](https://design-tokens.github.io/community-group/format/)
JSON with a **minimum semantic contract** (see SCHEMA.md) so any consumer can
render any conformant vibe. Style Dictionary transforms the source into the
three committed targets — consumers never need to run a build.

## The vibes in this instance

| Vibe | Mode | In one line |
|---|---|---|
| **analog** | light | Warm-paper editorial: Swiss grid, hairlines, optical serifs, static grain. |
| **fluent** | light | Fluent 2 with the corporate tells removed: warmed neutrals, left-bank blue, 8px surfaces. |
| **geometric-orange** | dark | The GEX-RAY instrument panel: near-black, one amber with conviction, uppercase mono, square corners. |
| **pressroom** | light | Editorial letterpress: newsprint cream, one vermilion, double rules, a button that physically presses. |

## Commands

```bash
npm install
npm run build             # tokens.json → css/tailwind/native per vibe (Style Dictionary)
npm run validate [path]   # conformance check; defaults to this repo
```

## Who consumes it

- **The `/taste` Claude Code skill** reads `~/code/design-dna` before any UI
  build: TASTE.md + ANTI.md become standing constraints, the chosen vibe's
  tokens get copied into the project, patterns get assembled first.
- **Gauche** ("connect your design-dna"): paste your public design-dna repo
  URL → Gauche fetches the raw files, validates them against this exact
  schema (same validator module), and renders your taste profile — swatches,
  type ramp, vibes, anti-patterns — themed with your own tokens.
- **Anything else** — the format is open. Fetch `manifest.json`, validate,
  and you know exactly what you're holding.

## Make your own

Fork or start clean: write `manifest.json` with at least one vibe, extract
your real palette/type/spacing/motion into `tokens/<vibe>/tokens.json`
(steal the shape from this repo's vibes), write TASTE.md and ANTI.md, run
`npm run validate .` until it passes, `npm run build`, commit — including the
built outputs. That repo is now your taste identity anywhere design-dna is
spoken.
