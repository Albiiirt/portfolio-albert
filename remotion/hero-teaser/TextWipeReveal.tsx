import { clipRect, dot, makeDir } from "./DiagonalWipeLayer";
import { WIPE_ANGLE_DEG } from "./tokens";

// ── Point A's own mechanic (makeDir/clipRect, 14° bottom-left → top-right),
// reapplied to a TEXT element's own box instead of the whole frame — the new
// guion's Capítulo 0 spec: "entra con wipe diagonal (mismo ángulo/mecánica
// que ya tienes, pero aquí recortando el propio texto, no una escena
// completa)". This is the mirror operation of DiagonalWipeLayer's own
// cover-then-reveal cut: DiagonalWipeLayer CLIPS AWAY an outgoing full-frame
// scene (progress 0 = fully covering, 1 = fully gone); this REVEALS an
// incoming text box (progress 0 = fully hidden, 1 = fully shown). No border
// line here — that 2px accent tracer is reserved for real scene-to-scene
// cuts in DiagonalWipeLayer, a text reveal has no "incoming project" to
// announce.
//
// Oversizing width/height beyond the text's actual ink is always safe: the
// margin-padded threshold guarantees full-hide at progress 0 and full-show
// at progress 1 regardless of how loosely the box bounds the glyphs, it only
// changes how much of the diagonal's travel crosses empty padding instead of
// text — never a correctness bug, just a cosmetic timing nuance.
export function TextWipeReveal({
  width,
  height,
  progress,
  children,
}: {
  width: number;
  height: number;
  /** 0 = fully hidden, 1 = fully revealed. Caller drives the timing. */
  progress: number;
  children: React.ReactNode;
}) {
  const dir = makeDir(WIPE_ANGLE_DEG);
  const corners: [number, number][] = [
    [0, 0],
    [width, 0],
    [width, height],
    [0, height],
  ];
  const dots = corners.map(([x, y]) => dot(dir, x, y));
  const minDot = Math.min(...dots);
  const maxDot = Math.max(...dots);
  const margin = Math.max(width, height) * 0.3;

  const lo = minDot - margin;
  const hi = maxDot + margin;
  const threshold = lo + (hi - lo) * progress;

  const poly = clipRect(dir, threshold, width, height);
  const clipPath =
    poly.length >= 3
      ? `polygon(${poly.map(([x, y]) => `${((x / width) * 100).toFixed(3)}% ${((y / height) * 100).toFixed(3)}%`).join(", ")})`
      : "polygon(0% 0%, 0% 0%, 0% 0%)";

  return (
    <div style={{ position: "relative", width, height, clipPath, WebkitClipPath: clipPath }}>
      {children}
    </div>
  );
}
