import { Easing, continueRender, delayRender, staticFile } from "remotion";

// Real design tokens lifted 1:1 from the mockup's own CSS (public/mockups/
// bullipedia-html/*.html <style> block, @layer theme) — same set of
// --color-* custom properties the four static mockups already use, so any
// screen recreated here can't silently drift from the real ones.
export const BULLIPEDIA = {
  green: "#8dc63f",
  greenDark: "#5a8a1f",
  navy: "#000000",
  navyDeep: "#1a1a1a",
  panel: "#ececec",
  soft: "#fafafa",
  ink: "#333333",
  inkSoft: "#555555",
  muted: "#888888",
  rule: "#ececec",
  ruleStrong: "#d0d0d0",
  white: "#ffffff",
};

// text-label 11 / text-eyebrow 12 / text-meta 13 / text-body 18 / text-lead
// 20 / text-h3 22 / text-h2 26 — same --text-* scale as the mockup.
export const TEXT = {
  label: 11,
  eyebrow: 12,
  meta: 13,
  body: 18,
  lead: 20,
  h3: 22,
  h2: 26,
};

// The mockup's own transition curves (assets/css, inlined into the <style>
// block of each html file) — reused verbatim instead of the site's generic
// EASE, since these specific beats (book hover/open, sidebar expand) are the
// interactions being recreated, not narration.
export const EASE_BOOK_HOVER = Easing.bezier(0.2, 0.62, 0.24, 1); // .book-stage:hover .book-cover, 0.6s
export const EASE_BOOK_OPEN = Easing.bezier(0.22, 1, 0.36, 1); // book-open keyframes, 1.1s
export const EASE_SIDEBAR = Easing.bezier(0.22, 1, 0.36, 1); // .sidebar-panel width transition, 0.62s
export const EASE = Easing.bezier(0.25, 0.46, 0.45, 0.94); // site-wide EASE (lib/animations.ts), for anything generic

// ── Local DIN Next LT Pro, loaded from the real files the mockup ships
// (public/mockups/bullipedia-html/assets/font-DINNextLTPro_*.otf) — not
// Google Fonts, since that's not the mockup's real typeface. Loaded once via
// the FontFace API + delayRender, the same job @remotion/google-fonts'
// loadFont() does for the other case-study videos, just pointed at a local
// file instead of a CDN one. ──
export const FONT_FAMILY = "DINNextLTPro, 'Helvetica Neue', Arial, sans-serif";

let fontLoadStarted = false;

export function loadBullipediaFont() {
  if (fontLoadStarted || typeof document === "undefined") return;
  fontLoadStarted = true;

  const handle = delayRender("Loading DIN Next LT Pro (bullipedia)");
  const faces = [
    new FontFace(
      "DINNextLTPro",
      `url(${staticFile("mockups/bullipedia-html/assets/font-DINNextLTPro_Regular-s.p.35ofgb3uto3m4-34827e.otf")}) format("opentype")`,
      { weight: "400", style: "normal" },
    ),
    new FontFace(
      "DINNextLTPro",
      `url(${staticFile("mockups/bullipedia-html/assets/font-DINNextLTPro_Bold-s.p.2h5n10oqhvlau-9868fe.otf")}) format("opentype")`,
      { weight: "700", style: "normal" },
    ),
  ];

  Promise.all(faces.map((f) => f.load()))
    .then((loaded) => {
      loaded.forEach((f) => document.fonts.add(f));
      continueRender(handle);
    })
    .catch(() => continueRender(handle));
}
