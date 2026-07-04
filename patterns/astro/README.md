# patterns/astro — canonical recipes, my way

Working Astro components that assemble Luke-shaped UI from design-dna tokens.
Copy the vibe's `tokens/<vibe>/css/variables.css` into the project, import it
once in the layout, then use these as starting points — they reference **only**
token variables (`--color-*`, `--font-*`, `--text-*`, `--space-*`, `--radius-*`,
`--dur-*`/`--motion-*`), so a vibe swap is a one-file change.

- `Nav.astro` — left-weighted masthead: wordmark left, uppercase mono links
  right, hairline bottom rule. No pill buttons, no centered logo.
- `Hero.astro` — asymmetric editorial hero: kicker + display headline + lede in
  a left-set reading column. Never centered, no badge floating over the H1.
- `Card.astro` — borderless-feeling card: surface on bg, 1px hairline, flat
  radius, hover changes ink (border color), not elevation.
