import { Easing } from "remotion";

// Site tokens (app/globals.css / lib/animations.ts) — the "outer" chrome:
// hero gradient, accent, card glass frame, heading font.
export const SITE = {
  gradient: "linear-gradient(135deg, #001515 0%, #0d3d3d 60%, #2a8c8c 100%)",
  accent: "#2a8c8c",
  glassShadow: "rgba(0,0,0,0.5)",
  fontDisplay: "'Space Grotesk', sans-serif",
};

// lib/animations.ts EASE = cubic-bezier(0.25, 0.46, 0.45, 0.94), reproduced
// as a Remotion Easing function so interpolate() can use the same curve.
export const EASE = Easing.bezier(0.25, 0.46, 0.45, 0.94);

// Real design tokens lifted 1:1 from the prototype's assets/css/shell.css,
// ficha.css and trabajo.css (see galiciana-thesaurus/01_prototipo-dosgrapas) —
// the "inner" interface being recreated must not repaint these.
export const GNOSS = {
  primario: "#006efe",
  primarioHighlight: "#006eff15",
  secundario: "#ef373f",
  texto: "#1f2430",
  textoMedio: "#555555",
  textoClaro: "#767676",
  grisBorde: "#dfe2e6",
  grisFondo: "#f4f6f8",
  blanco: "#ffffff",

  success: "#2eb100",
  successBg: "#ecf9ec",
  info: "#0088ff",
  infoBg: "#e6f3ff",
  warning: "#c66900",
  warningBg: "#fff3e2",
  neutral: "#5b6472",
  neutralBg: "#eceff2",
  muted: "#9aa2ad",
  mutedBg: "#f1f2f4",

  shadowCard: "0 1px 2px rgba(20,24,32,0.06)",
  shadowCardHover: "0 8px 20px rgba(20,24,32,0.1)",

  font: "Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;",
};

export const STATE_COLOR: Record<string, { fg: string; bg: string }> = {
  pendiente: { fg: GNOSS.warning, bg: GNOSS.warningBg },
  revision: { fg: GNOSS.info, bg: GNOSS.infoBg },
  revisado: { fg: GNOSS.success, bg: GNOSS.successBg },
  "no-duplicado": { fg: GNOSS.neutral, bg: GNOSS.neutralBg },
  "sin-duplicados": { fg: GNOSS.muted, bg: GNOSS.mutedBg },
};

export const STATE_LABEL: Record<string, string> = {
  pendiente: "Pendiente de revisar",
  revision: "En revisión",
  revisado: "Revisado",
  "no-duplicado": "Bloqueado",
  "sin-duplicados": "Sin duplicados detectados",
};
