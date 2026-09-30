import { Easing } from "remotion";

// Site tokens (app/globals.css / lib/animations.ts) — the "outer" chrome:
// hero gradient, accent, card glass frame, heading font. Same values as
// components/proyectos/MadridPage.tsx's hero (project.gradient / ACCENT).
export const SITE = {
  gradient: "linear-gradient(135deg, #1a0a0f 0%, #4a1528 60%, #8c3a5a 100%)",
  accent: "#8c3a5a",
  glassShadow: "rgba(0,0,0,0.5)",
  fontDisplay: "'Space Grotesk', sans-serif",
};

// lib/animations.ts EASE = cubic-bezier(0.25, 0.46, 0.45, 0.94), reproduced
// as a Remotion Easing function so interpolate() can use the same curve.
// (Duplicated rather than imported from remotion/xunta/tokens.ts — same
// precedent as that file duplicating the site's own lib/animations.ts value
// instead of importing it; this module stays self-contained too.)
export const EASE = Easing.bezier(0.25, 0.46, 0.45, 0.94);

// ── ENO ───────────────────────────────────────────────────────────────────
// Tokens for the recreated interior interface (enoturismo.comunidad.madrid).
// Deliberately distinct from SITE: warm ivory instead of the wine-dark hero,
// a serif display face for product headings instead of Space Grotesk, so the
// "screen inside the frame" never reads as the portfolio's own chrome.
export const ENO = {
  fondo: "#faf6f2",
  superficie: "#ffffff",
  texto: "#2a1a1f",
  textoMedio: "#6b5a5e",
  textoClaro: "#8a7a7e",
  borde: "#e8ddd8",
  acento: "#7a2e42",
  acentoTexto: "#ffffff",
  acentoTint: "#7a2e4212",
  confirmacion: "#3f7d4f",
  confirmacionBg: "#3f7d4f16",

  shadowCard: "0 1px 2px rgba(42,26,31,0.06)",
  shadowCardHover: "0 10px 26px rgba(42,26,31,0.12)",

  fontDisplay: "Fraunces, 'Playfair Display', serif",
  fontUI: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

// Route badge colors — one per ruta del vino, used for chips, map markers
// and the accent bar on route/bodega cards.
export const RUTA_COLOR: Record<string, string> = {
  navalcarnero: "#b5793f",
  "arganda-del-rey": "#8c3a5a",
  "san-martin-de-valdeiglesias": "#5c7a52",
  "el-molar": "#4a6670",
};
