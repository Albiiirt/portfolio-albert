// Hero-teaser-only tokens. This composition is the "narrator" wrapping four
// project glimpses + a Madrid payoff — it deliberately does NOT reuse any
// single project's SITE tokens (Madrid's wine palette, Xunta's teal, etc.):
// the chat scene needs to read as the portfolio's own voice, not as part of
// any one product.
export const NARRATOR = {
  bg: "#0a0a0a",
  panelBg: "rgba(255,255,255,0.05)",
  panelBorder: "rgba(255,255,255,0.12)",
  bubbleUserBg: "rgba(255,255,255,0.14)",
  bubbleAssistantBorder: "rgba(255,255,255,0.28)",
  textPrimary: "#ffffff",
  textSecondary: "rgba(255,255,255,0.92)",
  fontDisplay: "'Space Grotesk', sans-serif",
};

// The four project accents used for the wipe border + project label, pulled
// from data/projects.ts (Madrid, Xunta) and remotion/bullipedia/tokens.ts
// (Bullipedia's own shipped green reads truer here than elBulli's parent
// archive blue, since the glimpse is Bullipedia's own UI) and
// remotion/mirazur/tokens.ts (new, mirrored 1:1 from data/projects.ts).
export const PROJECT_ACCENT = {
  madrid: "#8c3a5a",
  bullipedia: "#8dc63f",
  xunta: "#2a8c8c",
  mirazur: "#7aad3a",
  // The Mirazur→Closing cut isn't entering any single project (the fan is
  // the "all four" summary beat) — a neutral white border reads as
  // "arriving at the overview" rather than any one project's color.
  closing: "#ffffff",
};

// Point A of the spec: fixed 14° wipe, same magnitude as PlanetOrbit.tsx's
// THETA, travelling bottom-left → top-right, 12 frames (400ms@30fps), with a
// 2px accent border that rides the cut and fades 6 frames after crossing.
export const WIPE_ANGLE_DEG = 14;
export const WIPE_FRAMES = 12;
export const WIPE_BORDER_FADE_FRAMES = 6;

// Point B: the tracking label's letter-spacing span — literally the same
// value Hero.tsx:52 already uses for the "Barcelona" badge.
export const LABEL_TRACK_FROM = -0.01;
export const LABEL_TRACK_TO = 0.06;
