// Generated from tokens.json by design-dna (npm run build) — do not edit. Vibe: pressroom
// Usage: presets: [require('./preset.cjs')] in tailwind.config — extend-only, so your scale survives.
module.exports = {
  theme: {
    extend: {
      "colors": {
        "bg": "#F6F1E7",
        "surface": "#FBF7EF",
        "ink": "#211B14",
        "ink-muted": "#5C5245",
        "ink-faint": "#93887A",
        "border": "#211B1429",
        "border-strong": "#211B14BF",
        "accent": "#C2401C",
        "accent-hover": "#9E3315",
        "accent-pressed": "#9E3315",
        "accent-ink": "#F6F1E7",
        "accent-2": "#4A6741"
      },
      "fontFamily": {
        "display": [
          "Iowan Old Style",
          "Palatino Linotype",
          "Palatino",
          "Book Antiqua",
          "Georgia",
          "serif"
        ],
        "body": [
          "Iowan Old Style",
          "Palatino Linotype",
          "Palatino",
          "Book Antiqua",
          "Georgia",
          "serif"
        ],
        "ui": [
          "Avenir Next",
          "Avenir",
          "Segoe UI",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif"
        ],
        "mono": [
          "SF Mono",
          "Cascadia Code",
          "Consolas",
          "Menlo",
          "monospace"
        ]
      },
      "fontSize": {
        "xs": "0.625rem",
        "sm": "0.75rem",
        "base": "0.875rem",
        "md": "1.1875rem",
        "lg": "1.5rem",
        "xl": "2rem",
        "2xl": "2.75rem"
      },
      "spacing": {
        "1": "4px",
        "2": "8px",
        "3": "12px",
        "4": "16px",
        "5": "24px",
        "6": "32px",
        "7": "48px",
        "8": "64px"
      },
      "borderRadius": {
        "sm": "2px",
        "md": "3px",
        "lg": "3px"
      },
      "letterSpacing": {
        "kicker": "0.14em",
        "label": "0.18em",
        "wide": "0.2em"
      },
      "lineHeight": {
        "tight": "1.22",
        "normal": "1.45"
      },
      "boxShadow": {
        "press": "3px 3px 0px 0px #C2401C"
      },
      "transitionDuration": {
        "fast": "140ms",
        "normal": "160ms",
        "slow": "380ms"
      },
      "transitionTimingFunction": {
        "default": "cubic-bezier(0.22, 1, 0.36, 1)",
        "stamp": "cubic-bezier(0.34, 1.56, 0.64, 1)"
      }
    }
  }
};
