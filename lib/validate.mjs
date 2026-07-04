/**
 * design-dna validator core — PURE: no filesystem, no network.
 * Feed it file contents (strings), get back a verdict. The same module backs
 * the CLI (bin/validate.mjs, local paths) and Gauche (fetched raw files), so
 * the schema is enforced identically everywhere.
 */
import AjvModule from 'ajv/dist/2020.js';
import addFormatsModule from 'ajv-formats';
import schema from '../schema/design-dna.schema.json' with { type: 'json' };

const Ajv = AjvModule.default ?? AjvModule;
const addFormats = addFormatsModule.default ?? addFormatsModule;

const ajv = new Ajv({ allErrors: true, allowUnionTypes: true });
addFormats(ajv);
ajv.addSchema(schema);

const validateManifest = ajv.compile({ $ref: `${schema.$id}#/$defs/manifest` });
const validateTokenFile = ajv.compile({ $ref: `${schema.$id}#/$defs/tokenFile` });

export { schema };

/** Files a conformant repo must provide, given a parsed manifest. */
export function requiredFiles(manifest) {
  const base = ['manifest.json', 'TASTE.md', 'ANTI.md'];
  const vibes = (manifest?.vibes ?? []).map((v) => `tokens/${v.id}/tokens.json`);
  return [...base, ...vibes];
}

/** Built outputs we warn about (recommended, not required). */
export function recommendedFiles(manifest) {
  return (manifest?.vibes ?? []).flatMap((v) => [
    `tokens/${v.id}/css/variables.css`,
    `tokens/${v.id}/tailwind/preset.cjs`,
    `tokens/${v.id}/native/theme.js`,
  ]);
}

function ajvErrors(errors, file) {
  return (errors ?? []).map((e) => ({
    file,
    path: e.instancePath || '/',
    message: `${e.instancePath || '(root)'} ${e.message}${
      e.keyword === 'additionalProperties' ? ` (${e.params.additionalProperty})` : ''
    }`,
  }));
}

/**
 * Validate a design-dna repo from file contents.
 * @param {Record<string, string> | Map<string, string>} filesIn — path → raw content.
 *   Must include manifest.json, TASTE.md, ANTI.md, and tokens/<id>/tokens.json
 *   for every vibe the manifest declares. Extra entries are ignored.
 * @returns {{ ok: boolean,
 *             errors: Array<{file: string, path?: string, message: string}>,
 *             warnings: Array<{file: string, message: string}>,
 *             manifest: object|null,
 *             vibes: Record<string, object> }}  vibes = parsed token files by id.
 */
export function validateDesignDna(filesIn) {
  const files = filesIn instanceof Map ? Object.fromEntries(filesIn) : (filesIn ?? {});
  const errors = [];
  const warnings = [];
  const vibes = {};
  let manifest = null;

  // 1. manifest.json — exists, parses, validates
  if (files['manifest.json'] == null) {
    errors.push({ file: 'manifest.json', message: 'missing — a design-dna repo must have a manifest.json at its root' });
  } else {
    try {
      manifest = JSON.parse(files['manifest.json']);
    } catch (e) {
      errors.push({ file: 'manifest.json', message: `not valid JSON: ${e.message}` });
    }
    if (manifest !== null) {
      if (!validateManifest(manifest)) {
        errors.push(...ajvErrors(validateManifest.errors, 'manifest.json'));
      }
    }
  }

  // 2. TASTE.md — exists, non-empty
  if (files['TASTE.md'] == null) {
    errors.push({ file: 'TASTE.md', message: 'missing — write your aesthetic principles (see SCHEMA.md)' });
  } else if (files['TASTE.md'].trim().length === 0) {
    errors.push({ file: 'TASTE.md', message: 'empty — principles in words are part of the format, not decoration' });
  }

  // 3. ANTI.md — exists, has at least 3 list items
  if (files['ANTI.md'] == null) {
    errors.push({ file: 'ANTI.md', message: 'missing — named prohibitions are the highest-leverage file in the format' });
  } else {
    const bans = files['ANTI.md'].split('\n').filter((l) => /^\s*[-*]\s+\S/.test(l));
    if (bans.length < 3) {
      errors.push({ file: 'ANTI.md', message: `needs at least 3 list-item prohibitions (found ${bans.length}) — concrete bans, one per line` });
    }
  }

  // 4. per-vibe tokens.json — exists, parses, validates against the DTCG contract
  const vibeList = Array.isArray(manifest?.vibes) ? manifest.vibes : [];
  const seenIds = new Set();
  for (const vibe of vibeList) {
    const id = vibe?.id;
    if (typeof id !== 'string') continue; // manifest schema already errored
    if (seenIds.has(id)) {
      errors.push({ file: 'manifest.json', message: `duplicate vibe id "${id}"` });
      continue;
    }
    seenIds.add(id);
    const path = `tokens/${id}/tokens.json`;
    if (files[path] == null) {
      errors.push({ file: path, message: `missing — manifest declares vibe "${id}" but its token file is absent` });
      continue;
    }
    let tokens = null;
    try {
      tokens = JSON.parse(files[path]);
    } catch (e) {
      errors.push({ file: path, message: `not valid JSON: ${e.message}` });
      continue;
    }
    if (!validateTokenFile(tokens)) {
      errors.push(...ajvErrors(validateTokenFile.errors, path));
      continue;
    }
    vibes[id] = tokens;
  }

  return { ok: errors.length === 0, errors, warnings, manifest, vibes };
}

/** Flatten a validated DTCG token file into [{path: 'color.bg', type, value, description}]. */
export function flattenTokens(tokenFile) {
  const out = [];
  const walk = (node, trail) => {
    if (node && typeof node === 'object' && '$value' in node) {
      out.push({
        path: trail.join('.'),
        type: node.$type,
        value: node.$value,
        description: node.$description,
      });
      return;
    }
    if (node && typeof node === 'object') {
      for (const [k, v] of Object.entries(node)) {
        if (k.startsWith('$')) continue;
        walk(v, [...trail, k]);
      }
    }
  };
  walk(tokenFile, []);
  return out;
}
