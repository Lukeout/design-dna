/**
 * design-dna build — DTCG source → per-vibe consumer targets, via Style Dictionary.
 *   tokens/<vibe>/tokens.json  →  tokens/<vibe>/css/variables.css     (CSS custom properties)
 *                              →  tokens/<vibe>/tailwind/preset.cjs   (Tailwind preset)
 *                              →  tokens/<vibe>/native/theme.js       (Expo/RN theme object)
 * Built outputs are committed; tokens.json stays the source of truth.
 */
import StyleDictionary from 'style-dictionary';
import { readFileSync } from 'node:fs';

const manifest = JSON.parse(readFileSync(new URL('./manifest.json', import.meta.url), 'utf8'));

const val = (t) => t.$value ?? t.value;
const kebab = (t) => t.path.join('-');
const px = (v) => (typeof v === 'string' ? parseFloat(v) * (v.endsWith('rem') || v.endsWith('em') ? 16 : 1) : v);
const ms = (v) => (v.endsWith('ms') ? parseFloat(v) : parseFloat(v) * 1000);

const cssValue = (t) => {
  const v = val(t);
  switch (t.$type ?? t.type) {
    case 'fontFamily':
      return v.map((f) => (/[ .]/.test(f) && !/^(serif|sans-serif|monospace|system-ui|ui-monospace)$/.test(f) ? `'${f}'` : f)).join(', ');
    case 'cubicBezier':
      return `cubic-bezier(${v.join(', ')})`;
    case 'shadow': {
      const layers = Array.isArray(v) ? v : [v];
      return layers.map((l) => `${l.offsetX} ${l.offsetY} ${l.blur} ${l.spread ?? '0px'} ${l.color}`).join(', ');
    }
    default:
      return v;
  }
};

StyleDictionary.registerFormat({
  name: 'design-dna/css',
  format: ({ dictionary, options }) => {
    const lines = dictionary.allTokens.map((t) => {
      const desc = t.$description ?? t.comment;
      return `  --${kebab(t)}: ${cssValue(t)};${desc ? ` /* ${desc} */` : ''}`;
    });
    return `/* Generated from tokens.json by design-dna (npm run build) — do not edit. Vibe: ${options.vibe} */\n:root {\n${lines.join('\n')}\n}\n`;
  },
});

StyleDictionary.registerFormat({
  name: 'design-dna/tailwind',
  format: ({ dictionary, options }) => {
    const pick = (group) => Object.fromEntries(
      dictionary.allTokens.filter((t) => t.path[0] === group).map((t) => [t.path.slice(1).join('-'), cssValue(t)])
    );
    const theme = {
      colors: pick('color'),
      fontFamily: Object.fromEntries(dictionary.allTokens.filter((t) => t.path[0] === 'font').map((t) => [t.path[1], val(t)])),
      fontSize: pick('text'),
      spacing: pick('space'),
      borderRadius: pick('radius'),
      letterSpacing: pick('tracking'),
      lineHeight: Object.fromEntries(dictionary.allTokens.filter((t) => t.path[0] === 'leading').map((t) => [t.path[1], String(val(t))])),
      boxShadow: pick('shadow'),
      transitionDuration: Object.fromEntries(dictionary.allTokens.filter((t) => t.path[0] === 'motion' && t.path[1] === 'duration').map((t) => [t.path[2], val(t)])),
      transitionTimingFunction: Object.fromEntries(dictionary.allTokens.filter((t) => t.path[0] === 'motion' && t.path[1] === 'easing').map((t) => [t.path[2], cssValue(t)])),
    };
    for (const k of Object.keys(theme)) if (Object.keys(theme[k]).length === 0) delete theme[k];
    return `// Generated from tokens.json by design-dna (npm run build) — do not edit. Vibe: ${options.vibe}\n// Usage: presets: [require('./preset.cjs')] in tailwind.config — extend-only, so your scale survives.\nmodule.exports = {\n  theme: {\n    extend: ${JSON.stringify(theme, null, 2).replace(/\n/g, '\n    ')}\n  }\n};\n`;
  },
});

StyleDictionary.registerFormat({
  name: 'design-dna/native',
  format: ({ dictionary, options }) => {
    const theme = { vibe: options.vibe, mode: options.mode, color: {}, font: {}, text: {}, leading: {}, tracking: {}, space: {}, radius: {}, duration: {}, easing: {}, shadow: {}, measure: {} };
    const camel = (parts) => parts.map((p, i) => (i === 0 ? p : p[0].toUpperCase() + p.slice(1))).join('').replace(/-(\w)/g, (_, c) => c.toUpperCase());
    for (const t of dictionary.allTokens) {
      const v = val(t);
      const [group, ...rest] = t.path;
      const key = camel(rest.length ? rest : [group]);
      switch (group) {
        case 'color': theme.color[key] = v; break;
        case 'font': theme.font[key] = v[0]; break;
        case 'text': theme.text[key] = px(v); break;
        case 'leading': theme.leading[key] = v; break;
        case 'tracking': theme.tracking[key] = v.endsWith('em') ? parseFloat(v) : px(v); break;
        case 'space': theme.space[key] = px(v); break;
        case 'radius': theme.radius[key] = px(v); break;
        case 'measure': theme.measure[key] = v; break;
        case 'motion':
          if (t.path[1] === 'duration') theme.duration[camel(t.path.slice(2))] = ms(v);
          else theme.easing[camel(t.path.slice(2))] = v;
          break;
        case 'shadow': {
          const l = Array.isArray(v) ? v[0] : v; // RN shadows are single-layer
          theme.shadow[key] = {
            shadowColor: l.color.slice(0, 7),
            shadowOpacity: l.color.length === 9 ? Math.round((parseInt(l.color.slice(7), 16) / 255) * 100) / 100 : 1,
            shadowOffset: { width: px(l.offsetX), height: px(l.offsetY) },
            shadowRadius: px(l.blur),
            elevation: Math.max(1, Math.round(px(l.offsetY))),
          };
          break;
        }
        default: {
          theme[group] ??= {};
          theme[group][key] = v;
        }
      }
    }
    for (const k of Object.keys(theme)) if (typeof theme[k] === 'object' && Object.keys(theme[k]).length === 0) delete theme[k];
    return `// Generated from tokens.json by design-dna (npm run build) — do not edit. Vibe: ${options.vibe}\n// Expo/React-Native theme object: numeric px sizes, ms durations, single-layer RN shadows.\nexport const theme = ${JSON.stringify(theme, null, 2)};\nexport default theme;\n`;
  },
});

for (const vibe of manifest.vibes) {
  const sd = new StyleDictionary({
    source: [`tokens/${vibe.id}/tokens.json`],
    platforms: {
      css: {
        buildPath: `tokens/${vibe.id}/css/`,
        options: { vibe: vibe.id, mode: vibe.mode },
        files: [{ destination: 'variables.css', format: 'design-dna/css' }],
      },
      tailwind: {
        buildPath: `tokens/${vibe.id}/tailwind/`,
        options: { vibe: vibe.id, mode: vibe.mode },
        files: [{ destination: 'preset.cjs', format: 'design-dna/tailwind' }],
      },
      native: {
        buildPath: `tokens/${vibe.id}/native/`,
        options: { vibe: vibe.id, mode: vibe.mode },
        files: [{ destination: 'theme.js', format: 'design-dna/native' }],
      },
    },
    log: { verbosity: 'silent' },
  });
  await sd.buildAllPlatforms();
  console.log(`built ${vibe.id} → css, tailwind, native`);
}
