# patterns/expo — canonical recipes for React Native / Expo

Copy the vibe's `tokens/<vibe>/native/theme.js` into the project (e.g.
`src/theme.js`) and import it — components reference **only** `theme.*`
values. Numeric px sizes, ms durations, single-layer RN shadows.

- `Screen.tsx` — the page shell: vibe bg, safe-area padding, left-weighted
  header with a mono kicker. No centered titles.
- `Card.tsx` — the atomic card: name, thesis, preview slot, mono meta row.
  Hairline border, flat radius, no elevation-on-press (opacity is the press
  feedback — ink, not lift).
