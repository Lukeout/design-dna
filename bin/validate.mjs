#!/usr/bin/env node
/**
 * design-dna CLI validator.
 *   npm run validate [path-to-repo]     (defaults to cwd)
 * Exit 0 = conformant, 1 = failed, 2 = usage/IO error.
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import {
  validateDesignDna,
  requiredFiles,
  recommendedFiles,
} from '../lib/validate.mjs';

const root = resolve(process.argv[2] ?? '.');
if (!existsSync(root)) {
  console.error(`design-dna: path does not exist: ${root}`);
  process.exit(2);
}

const read = (rel) => {
  const p = join(root, rel);
  return existsSync(p) ? readFileSync(p, 'utf8') : undefined;
};

// Two-pass: read the manifest first to learn which vibe files to load.
const files = { 'manifest.json': read('manifest.json'), 'TASTE.md': read('TASTE.md'), 'ANTI.md': read('ANTI.md') };
let manifest = null;
try {
  manifest = files['manifest.json'] ? JSON.parse(files['manifest.json']) : null;
} catch {
  /* validateDesignDna reports the parse error */
}
for (const rel of requiredFiles(manifest)) {
  if (!(rel in files)) files[rel] = read(rel);
}

const result = validateDesignDna(files);

// Filesystem-level warnings the pure core can't see: missing built outputs, orphan pattern dirs.
for (const rel of recommendedFiles(result.manifest)) {
  if (!existsSync(join(root, rel))) {
    result.warnings.push({ file: rel, message: 'built output missing — run `npm run build` and commit the results' });
  }
}
for (const stack of result.manifest?.patterns ?? []) {
  if (!existsSync(join(root, 'patterns', stack))) {
    result.warnings.push({ file: `patterns/${stack}/`, message: 'declared in manifest.patterns but the directory is missing' });
  }
}

const rel = (f) => f.replace(/^\//, '');
if (result.errors.length) {
  console.error(`FAIL — ${root} is not a conformant design-dna repo\n`);
  for (const e of result.errors) console.error(`  ✗ ${rel(e.file)}  ${e.message}`);
}
for (const w of result.warnings) console.warn(`  ⚠ ${rel(w.file)}  ${w.message}`);

if (result.ok) {
  const vibeIds = Object.keys(result.vibes);
  console.log(`PASS — ${result.manifest.name}@${result.manifest.version} conforms to design-dna`);
  console.log(`  vibes: ${vibeIds.join(', ')}`);
  process.exit(0);
}
process.exit(1);
