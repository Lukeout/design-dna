# ANTI.md — named prohibitions

The highest-leverage file in this repo. These are bans, not suggestions — a
build that violates one is defective even if it "looks fine". Each ban is
concrete enough to point at in review; several are grep-able.

## Color

- **No pure white `#FFFFFF` / `#fff`** anywhere. Every neutral is warm paper.
- **No pure black `#000000` / `#000`.** Every ink is warm. (Exception: the
  hard-shadow text outline trick on textured backgrounds, where true black is
  doing a printing job.)
- **No saturated purple/indigo** — `#6366F1`, `#8B5CF6`, `#7C3AED`, Tailwind
  `indigo-*` / `violet-*` / `purple-*`. This is the single loudest AI-default
  tell.
- **No purple-to-blue gradient CTAs.** No gradient as a background fill at all
  (shader/canvas art excepted).
- **No raw hex outside token files.** `#[0-9a-fA-F]{3,6}` in a component is a
  violation — reference the vibe's tokens.

## The generic-AI layout kit

- **No default-shadcn look** — unmodified shadcn/ui is a starting point for
  theming, never a shipped surface.
- **No icon-card trios** — three identical icon-topped feature cards in a row.
- **No centered hero H1 with a pill/badge floating above it.**
- **No gradient hero on white.**
- **No 3–4px colored left/top card border stripe** — as reliable a sign of AI
  as em-dashes.
- **No 1-2-3 numbered step rows or stat-banner rows** unless the content is a
  real sequence.
- **No `rounded-2xl` (or any 16–24px radius) as the universal container.**
- **No glassmorphism as page chrome.** Frosted/acrylic material is allowed on
  at most ONE transient surface (command bar, popover) per product.
- **No colored glow / neon box-shadows / soft 0.1-opacity halos.** (Single
  carved-out exception: geometric-orange's amber CTA glow.)
- **No floating 3D gradient blobs, orbs, or toruses.**

## Type

- **No Inter-for-everything.** Inter as a display/heading face is banned;
  it is permitted as body/UI in the Fluent vibe only.
- **No Space Grotesk, Geist, or Roboto as display faces**, and never the
  Space Grotesk + Instrument Serif + Geist combo.
- **No single-italic-serif-word-in-a-sans-headline** garnish.
- **No all-caps-everything grey section labels** — uppercase is a micro-voice
  (kickers, badges), not a section style.
- **No justified text, no centered body copy.** Left-aligned, ragged right,
  real measure.

## Motion & texture

- **No scale-pop, spring bounce, parallax, or scroll-jacking.** Opacity and
  position only.
- **No animated grain/noise.** Texture is static or it's gone.
- **No hover elevation-jumps** — hovers change ink (underline, weight, color),
  not shadow size.
- **No perpetual ambient motion** — no always-running background animation
  (shader fields, drifting waves, floating particles), full-viewport or not.
  If it still moves when the user's hands are still, it's banned. A shader is
  art only when it's a frozen frame.
- **No input-tracked interpolation loops** — no pointermove-driven morphing,
  cursor-proximity effects, or click ripples. Kinetic response is a discrete
  CSS `:hover`/`:focus` transition on the target itself: one input, one
  output, one duration. (Origin: gauche splash v1 — three simultaneous
  kinetic systems literally hurt to look at.)

## Copy & chrome

- **No emoji as icons** — not in nav, not as feature bullets (✨🚀🧠). One
  monochrome icon set inheriting `currentColor`.
- **No vague hero copy** — "Build the future", "AI-powered", "unleash",
  "revolutionize", "supercharge".
- **No dark theme by default** unless the vibe itself is dark
  (geometric-orange). Dark ≠ premium.

## Process

- **No skipping the tokens.** Wiring a vibe means copying its tokens in and
  referencing only them — before the first component is written, not after.
- **No "make it unique" prompts to cover for missing direction.** Pick a vibe;
  if none fits, seed a new one from a real source and add it here.
