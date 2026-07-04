# BUILDLOG — design-dna

Reverse-chronological within each phase. AMBER = a decision made autonomously
with a sensible default; revisit if it grates.

## Phase A — the format + Luke's reference instance (2026-07-03)

**Shipped:** schema (SCHEMA.md + schema/design-dna.schema.json, JSON Schema
draft 2020-12) · pure validator core (lib/validate.mjs) + CLI (bin/validate.mjs,
`npm run validate <path>`) · four seed vibes as DTCG tokens.json extracted from
real sources · Style Dictionary 5.5 build (build.mjs) emitting committed
css/tailwind/native targets per vibe · TASTE.md + ANTI.md · patterns/astro
(Nav, Hero, Card) + patterns/expo (Screen, Card) · README.

**Verified:** `npm run validate .` → PASS (4 vibes, no warnings). A
deliberately broken repo fails with per-file, per-path errors (bad manifest
name/version/mode, empty TASTE, 1-item ANTI, rgba color, missing required
token groups) — actionable-failure requirement met. `npm run build` emits all
12 targets; spot-checked analog CSS vars, geometric-orange native theme,
pressroom tailwind preset against source values.

### Decisions

- **Minimum semantic contract** (the load-bearing design call): beyond "valid
  DTCG", every vibe must define `color.{bg,surface,ink,ink-muted,border,accent,
  accent-ink}`, `font.{display,body,mono}`, `text.{xs..2xl}`, `space.{1..8}`,
  `radius.{sm,md,lg}`, `motion.duration.{fast,normal,slow}` +
  `motion.easing.default`. This is what lets any consumer (Gauche's profile
  page, patterns) render any stranger's vibe without special-casing. Extra
  groups/tokens are open (shadow, tracking, leading, measure, extra colors).
- AMBER: **colors are hex-only (#RRGGBB / #RRGGBBAA)** — rgba() strings from the
  sources were converted to alpha hex (e.g. `rgba(28,26,23,0.12)` → `#1C1A171F`).
  Keeps transforms trivial and matches DTCG's hex convention.
- AMBER: **dimensions/durations are CSS strings** (`"16px"`, `"150ms"`), not the
  newer DTCG object form (`{value, unit}`) — Style Dictionary 5.x and every
  consumer here speak the string form. Revisit if the DTCG spec's object form
  becomes the tooling default.
- AMBER: **no `clamp()`/fluid values in tokens** — gexray's fluid hero
  (`clamp(56px, 8vw, 120px)`) is tokenized as its 120px ceiling with the fluid
  recipe noted in `$description`; fluid sizing is a pattern concern.
- AMBER: **one mode per vibe** in v1. pressroom's source has a real dark
  palette (substack-pdf-pro `prefers-color-scheme: dark`); left out — a dark
  twin would be a fifth vibe (`pressroom-night`) if wanted.
- AMBER: **grain/scanline textures are not tokens** — they're techniques
  (inline SVG turbulence, repeating-gradient scanlines) and live in
  TASTE.md/patterns, not tokens.json. DTCG has no honest type for them.
- AMBER: geometric-orange's `radius.md = 0` is deliberate (the identity is
  square); pressroom's `text` ramp above 19px is extrapolated (source is a
  344px extension popup, print-dense at 14px base).
- AMBER: analog's `--g-wrong-color` chartreuse became `color.accent-3`;
  gexray's teal/green/red became `teal`/`positive`/`negative`.
- Custom Style Dictionary **formats** (`design-dna/css|tailwind|native`) rather
  than built-in transforms — full control over fontFamily quoting, shadow
  layering, RN numeric conversion (px/ms as numbers, shadow → shadowColor/
  Opacity/Offset/Radius/elevation).
- **Built outputs are committed** so no consumer ever needs to run the build
  (the /taste skill copies files; Gauche fetches raw URLs).
- The `/taste` skill's expected structure (TASTE/ANTI/tokens/<vibe>/patterns)
  is a strict subset of what shipped — **no SKILL.md edit needed**.

### AMBER for Luke (out of my scope)

- **Push + visibility**: repo is local-only. Public suits the open format and
  makes Gauche's raw-fetch path work on this very repo; your call at push time.
- `manifest.owner` is just `{ "name": "Luke" }` — add a URL/handle if you want
  the profile page to link out.
