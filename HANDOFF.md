# HANDOFF: design-dna (open taste format) + Gauche "connect your design-dna" feature — 2026-07-03

## Launch (copy-paste, in order)
1. Open a **new chat scoped to `~/code`** (the parent — this build creates the sibling repo `~/code/design-dna` AND edits `~/code/gauche`).
2. Paste everything below the line.

**Model:** Fable — per Luke's explicit choice. ⚠️ **Fable access ends 2026-07-07.** Today is 07-03; if the build runs past the 7th, continue on Opus — nothing here is Fable-specific.
**Billing:** subscription chat. If you fan out research subagents, note they may lack web access — probe once before relying on it.

---
## MISSION (paste from here down)

You are the founding engineer + design-systems architect for **design-dna** — an *open, portable format* for a person's design taste — and you will also ship the first product that consumes it, a **Gauche** feature. Two deliverables, one workstream, built in this order: the format first (it's the contract), then the consumer.

Read `~/.claude/skills/taste/SKILL.md` first — it already specifies the expected design-dna structure (TASTE.md, ANTI.md, tokens/<vibe>/, patterns/<stack>/) and the four seed vibes. This handoff extends that from "Luke's private folder" into a **schema + reference instance + validator** that any Gauche user can adopt.

### The big idea
design-dna is not just Luke's taste repo — it's a *spec*. One schema, many instances. Three consumers of that one schema:
1. The `/taste` Claude Code skill (already written to read `~/code/design-dna`).
2. Luke's personal reference instance (you build it).
3. **Gauche**: every user wires in their *own* design-dna GitHub repo → Gauche validates it, parses it, and generates their taste profile. Their design-dna repo IS their taste identity — which is exactly Gauche's taste-gated thesis.

## DECISIONS ALREADY MADE — do not reopen
- **Canonical token format = W3C Design Tokens Community Group (DTCG) JSON** (`$type`/`$value`). Transform to CSS variables + a Tailwind preset + an Expo/RN theme object via **Style Dictionary**. Rationale: a real standard with tooling, interoperable and future-proof — this is what makes the format extensible rather than bespoke.
- **design-dna is an open format**: it ships a human `SCHEMA.md` + machine `schema/design-dna.schema.json` + a `validate` script. A repo either conforms (clear pass) or fails with actionable errors.
- **Repo layout** (superset of the /taste skill's): `SCHEMA.md`, `schema/`, `TASTE.md`, `ANTI.md`, `tokens/<vibe>/tokens.json` (DTCG source) + built outputs, `patterns/<stack>/`, `README.md`, a `manifest.json` listing the vibes.
- **Four seed vibes**, extracted from real sources: `analog` + `fluent` (from `~/code/gauche/DESIGN.md`), `geometric-orange` (from `~/code/gexray-landing`, the gex-ray.com identity), `pressroom` (editorial, from `~/code/substack-pdf-pro`).
- **Gauche v1 = public repos only**: user pastes a public design-dna GitHub URL, Gauche fetches raw + validates + parses. Private repos via the user's GitHub OAuth (Better Auth GitHub provider) = **v2, not now**.
- **Gauche stays on its existing stack** — Astro + SQLite/Drizzle + Better Auth. New feature on a branch, existing features untouched. Do not re-architect.
- **Build order is fixed**: design-dna first (the reference instance proves the schema), then Gauche consumes the same validator/parser logic.

## CURRENT STATE
- GREEN (verified 2026-07-03): `~/code/gauche` runs — Astro app, Better Auth, Drizzle (deps confirmed). Full specs exist: `DESIGN.md`, `docs/SPEC.md`, `docs/ARCHITECTURE.md`, `AGENTS.md`, `CLAUDE.md` — read them before touching gauche.
- GREEN: `~/.claude/skills/taste/SKILL.md` defines the target structure; `~/code/design-dna/` exists containing only this handoff.
- GRAY (spec only — you build all of it): the schema, validator, Luke's instance, the Gauche feature.
- AMBER (needs Luke): `~/code/gauche` has **no git remote** (local only) — a cloud demo of the feature needs a push, out of scope for you. And **design-dna repo visibility** — public makes the Gauche public-repo-fetch path trivial and suits an open format + taste-identity showcase; default to building it and let Luke choose visibility at push time.

## SCOPE
- You own: `~/code/design-dna` (new) and `~/code/gauche` on a new branch (e.g. `design-dna-connect`).
- Do NOT touch: `~/code/gexray` and its crates, `~/code/hq`, any other project.
- The `/taste` skill: only edit `~/.claude/skills/taste/SKILL.md` if the final token schema diverges from what it currently describes — then reconcile it and note the change in your BUILDLOG.
- Dead/ignore: `gexray-mobile`, `gex-ray` (hyphen) folders.

## NEXT STEPS (in order)

**Phase A — design-dna (the format + Luke's reference instance)**
1. `cd ~/code/design-dna`, `git init`. Node project, add Style Dictionary + a JSON-schema validator (ajv).
2. Write `SCHEMA.md` + `schema/design-dna.schema.json`: define a conformant repo — required files, the DTCG token shape, TASTE.md/ANTI.md conventions, and `manifest.json` (vibe list + metadata).
3. Wire Style Dictionary: `tokens/<vibe>/tokens.json` (DTCG source) → build `css` (variables), `tailwind` (preset), `native` (Expo/RN theme object) per vibe.
4. Seed the four vibes by extracting real values: `analog`/`fluent` from `gauche/DESIGN.md`; `geometric-orange` from `gexray-landing`; `pressroom` from `substack-pdf-pro`. Palette, type scale, spacing, radii, motion.
5. Write `TASTE.md` (per-family principles) and `ANTI.md` (named prohibitions — start from the /taste skill's fallback ANTI list, expand with Luke's own words: "bespoke and elevated, not claude boilerplate").
6. Add 2–3 `patterns/` recipes (e.g. `patterns/astro/`, `patterns/expo/`): nav, hero, card done Luke's way, token-referenced.
7. Write `bin/validate.mjs` → `npm run validate <repo-path>`, checks any repo against `schema/`. Run it on this repo → must pass. This same module is what Gauche reuses.
8. `README.md`: what the open format is, how the /taste skill consumes it, how Gauche consumes it. Commit per logical step.

**Phase B — Gauche feature: "connect your design-dna"**
9. Read gauche's specs. New branch. Add a Drizzle table for a user's connected design-dna (repo URL, parsed-cache JSON, last_synced).
10. Extract the design-dna parser/validator into a shared module Gauche imports (or vendor it) — the schema must be enforced identically in both places.
11. Fetch flow: given a public GitHub repo URL, fetch files (raw.githubusercontent / GitHub API), validate, parse tokens + TASTE + ANTI. Show clear pass/fail with errors.
12. **Profile generation**: render the parsed design-dna as a shareable "taste profile" page — palette swatches, type scale, the named vibes, the anti-patterns. Dogfood it: apply the user's *own* tokens to their profile so the page looks like their taste.
13. UI: a "Connect your design-dna" flow in profile/settings — paste URL → validate → generate profile → cache in SQLite. Sync-on-demand button (no background jobs in v1).
14. Verify with the preview tools: connect Luke's own design-dna repo end-to-end, screenshot the generated profile.

## DONE =
- **design-dna:** repo built; `npm run validate` passes on Luke's instance; Style Dictionary builds all four vibes to CSS + Tailwind + RN; structure matches what `/taste` expects; committed. (Push/visibility = Luke's call — leave as AMBER.)
- **Gauche:** on a branch, a user pastes a public design-dna repo URL and gets a validated, parsed, cached taste profile page; existing features unbroken; run verified with screenshots; PR-ready.
- The **shared schema is the single source of truth** across the /taste skill, Luke's repo, and Gauche.
- Both documented in BUILDLOG.md. Close your session with **/wrap**.

---

New chat scoped to `~/code`, paste the MISSION block — that's the whole move.
