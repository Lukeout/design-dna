# TASTE.md — the creative director's brief

Standing constraints for anything built in my name. These are rules a generator
can obey, not moods. Per-vibe direction below; the universals come first.
Prohibitions live in [ANTI.md](ANTI.md) — on any conflict, the ban wins.

## Universal principles — every family

- **Bespoke and elevated, not claude boilerplate.** If a screen could belong to
  any 2026 AI SaaS, it is wrong. The first draft should already carry the
  identity; taste is not a polish pass.
- **Restraint + ONE idiosyncratic material choice is the elite signal.** Pick a
  single signature material per product (grain, scanlines, an offset-plate
  shadow, acrylic on one surface) and stop there. Two signatures compete;
  three is a costume.
- **The craft tell is precision, not effects** — baseline grid, hairline rules,
  optical sizing, tabular numerals. Whitespace over borders; hairlines over
  cards; paper-tone shifts over shadow stacks.
- **Warm neutrals only.** Pure `#FFFFFF` and pure `#000000` are banned in every
  vibe. Every white is a paper; every black is an ink.
- **One accent used with conviction** beats a palette of timid ones. Secondary
  hues get a job title (success, misregistration, data signal) or they don't
  ship.
- **Editorial over dashboard.** Asymmetric, left-weighted layouts with a real
  reading measure. Never center a hero because centering is the default.
- **One strong typeface choice over three timid ones.** Every family pairs a
  display voice with a machine voice (mono kickers, tabular meta). Type does
  the branding; color assists.
- **Motion is punctuation.** Opacity and position only. 150–400ms, one easing
  per vibe, honor `prefers-reduced-motion`. A hover changes ink, not elevation.
- **Tokens or it doesn't exist.** Every color, size, radius, and duration in
  a build references the vibe's tokens. A raw hex outside a token file is a
  defect, not a shortcut.

## Analog — warm-paper editorial (default for gauche-family work)

The reference is a well-set book page, not an app. Chalky warm paper
(`color.bg #F4EFE6`), warm near-black ink, hairlines at 12% ink. Fraunces
display (lowercase headings; the wordmark runs opsz 144 / SOFT 30 / WONK 1 —
the wonk IS the brand), Source Serif 4 body with oldstyle figures, Hanken
Grotesk controls, mono kickers (uppercase, ~12px, +0.09em). Major-third scale,
66ch measure, 8px baseline. Corners are print-flat: 0–4px. Depth is a deboss
hairline, not a drop shadow. Left-bank blue `#2B4C7E` is the carrier; vermilion
appears only as riso misregistration and rare emphasis (~10% coverage max).
Static grain at 3–6% opacity, multiply — never animated.

## Fluent — the same soul in a system skin

Fluent 2's token structure, shadow ramp, and motion curves — with all three
corporate tells removed: neutrals warmed toward paper (no `#FFFFFF`), brand
swapped to the same left-bank blue as Analog, radii held at 4/8/12 (never
16–24). Inter is legitimate here as body/UI/display — and only here. Shadows
are always paired key + ambient, warm-ink-tinted. Enter decelerates, exit
accelerates. Analog and Fluent differ only in finish: matte/flat/serif versus
depth/rounded/sans. Same hue, different material.

## Geometric Orange — the GEX-RAY instrument panel

Dark done deliberately: near-black with a blue undertone (`#08080C`), never
flat black. One amber (`#E8913A`) used with total conviction — CTAs, rules,
labels, glow — with copper as its deep end and teal reserved for data signals.
Syne for display (wide, heavy, -0.03em), DM Sans body, and IBM Plex Mono as the
instrument voice: nav, labels, and buttons are uppercase mono with +0.1–0.2em
tracking. Corners are square; 3px is the ceiling. Texture is broadcast
hardware: 3% noise + faint amber scanlines. Section labels lead with a 24px
amber rule. Motion is unshowy 300–400ms fades and 20px rises. The one glow
permitted anywhere in my work is this vibe's amber CTA halo.

## Pressroom — editorial letterpress (document & publishing tools)

A front-page proof, set in lead. Newsprint cream paper, real warm ink, one
vermilion (`#C2401C`) doing every accent job: masthead mark, fleuron, hover
ink, the offset plate behind the primary button. Serif throughout (local
Iowan/Palatino stack — no webfonts, no network); the secondary voice is
*italic serif*, the micro-voice is uppercase Avenir at 10–12px with wide
tracking. Newspaper furniture is the design system: double rules under the
masthead, section labels set between flanking rules, a fleuron in the
colophon. Controls feel mechanical — square-ish 2–3px corners, a segmented
compositor's toggle, a checkbox that stamps in with the vibe's single
overshoot ease. The primary button physically presses: 3px vermilion offset
plate, `:active` translates into it. Success is moss, not traffic-light green.

## Choosing a vibe

gexray-family work → **geometric-orange**. gauche-family → **analog** (default)
or **fluent** (its toggle). Document/publishing/editorial tools → **pressroom**.
Anything new: pick the nearest family and say so, or seed a new vibe from a
real source — never freestyle a fifth aesthetic mid-build.
