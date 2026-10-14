// Mirazur's own gradient/accentColor, mirrored 1:1 from data/projects.ts
// (~lines 1049–1050) — same duplication precedent as remotion/madrid/tokens.ts
// and remotion/xunta/tokens.ts, which each keep their own copy instead of
// importing from data/projects.ts (a client component module) into a
// Remotion render process.
export const MIRAZUR = {
  gradient: "linear-gradient(135deg, #1a2a0d 0%, #3d5c1e 60%, #7aad3a 100%)",
  accentColor: "#7aad3a",
};
