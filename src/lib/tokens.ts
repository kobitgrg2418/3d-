/**
 * JS mirror of the CSS tokens in src/app/globals.css.
 * Needed only where a raw colour string is unavoidable (three.js materials,
 * canvas 2D contexts). Keep in sync with globals.css.
 */
export const TOKENS = {
  white: "#ffffff",
  black: "#000000",
  blackSurface: "#0a0a0a",
  grey100: "#f5f5f7",
  grey300: "#d2d2d7",
  grey600: "#6e6e73",
  orange: "#ff6a00",
  orangeHover: "#e55f00",
  orangePress: "#cc5400",
} as const;
