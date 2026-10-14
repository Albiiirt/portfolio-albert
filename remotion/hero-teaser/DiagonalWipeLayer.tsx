import { useVideoConfig, interpolate, useCurrentFrame } from "remotion";
import { WIPE_ANGLE_DEG, WIPE_BORDER_FADE_FRAMES, WIPE_FRAMES } from "./tokens";

// ── Point A of the spec: the wipe between the 6 top-level cuts (Chat→Madrid,
// Madrid→Bullipedia, Bullipedia→Xunta, Xunta→Mirazur, Mirazur→Cierre,
// Cierre→Chat loop seam) — NOT the internal Madrid B3→C2 crossfade, which
// keeps its own untouched CrossfadeLayer (see madrid-glimpse-scene.tsx).
//
// Mechanic: animates a clip-path polygon over the OUTGOING scene only — the
// incoming scene underneath needs no mask of its own, it's revealed as the
// outgoing layer's covered area shrinks (per spec point A). The cut travels
// bottom-left → top-right at a fixed 14° (same magnitude as PlanetOrbit's
// THETA), with a 2px line in the INCOMING project's accent riding the edge,
// fading out over WIPE_BORDER_FADE_FRAMES once it has fully crossed.
//
// Geometry runs in real pixel space (via useVideoConfig's width/height, not
// an abstract 0–100 square) because clip-path/SVG percentages are resolved
// per-axis against the element's own box — on a 1920×1080 frame, doing the
// trig in abstract percent units would stretch x and y by different
// factors and visibly distort the 14° angle. Pixel points are converted to
// independent per-axis percentages only at the very end, which reproduces
// the same pixel geometry regardless of the box's aspect ratio.
export type Pt = [number, number];

// Exported so other pieces (TextWipeReveal) can drive the identical 14°
// diagonal-cut geometry against a DIFFERENT box than the full video frame
// (a headline's own bounding box instead of the whole 1920×1080 canvas) —
// same mechanic, smaller box, per the new hero-teaser spec's point A.
export function makeDir(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: Math.cos(rad), y: -Math.sin(rad) };
}

export function dot(dir: { x: number; y: number }, x: number, y: number) {
  return x * dir.x + y * dir.y;
}

// Sutherland–Hodgman clip of the full-frame rectangle against the half-plane
// dot(p) <= threshold — the vertices of the region that stays covered
// (still rendered) by the outgoing layer.
export function clipRect(dir: { x: number; y: number }, threshold: number, w: number, h: number): Pt[] {
  const corners: Pt[] = [
    [0, 0],
    [w, 0],
    [w, h],
    [0, h],
  ];
  const out: Pt[] = [];
  for (let i = 0; i < corners.length; i++) {
    const curr = corners[i];
    const next = corners[(i + 1) % corners.length];
    const dCurr = dot(dir, curr[0], curr[1]) - threshold;
    const dNext = dot(dir, next[0], next[1]) - threshold;
    const currIn = dCurr <= 0;
    const nextIn = dNext <= 0;
    if (currIn) out.push(curr);
    if (currIn !== nextIn && dCurr !== dNext) {
      const t = dCurr / (dCurr - dNext);
      out.push([curr[0] + (next[0] - curr[0]) * t, curr[1] + (next[1] - curr[1]) * t]);
    }
  }
  return out;
}

// The two points where the infinite cutting line crosses the rectangle's
// edges — the border tracer's endpoints. Unlike clipRect's margin-padded
// threshold (which must overshoot the corners to guarantee a clean full
// cover/reveal), this always uses the TRUE corner-to-corner range, so the
// line is a real, visible, finite segment for the whole crossing.
function lineRectIntersections(dir: { x: number; y: number }, threshold: number, w: number, h: number): Pt[] {
  const edges: [Pt, Pt][] = [
    [[0, 0], [w, 0]],
    [[w, 0], [w, h]],
    [[w, h], [0, h]],
    [[0, h], [0, 0]],
  ];
  const pts: Pt[] = [];
  for (const [p1, p2] of edges) {
    const d1 = dot(dir, p1[0], p1[1]) - threshold;
    const d2 = dot(dir, p2[0], p2[1]) - threshold;
    if (d1 === d2) continue;
    if ((d1 <= 0 && d2 >= 0) || (d1 >= 0 && d2 <= 0)) {
      const t = d1 / (d1 - d2);
      pts.push([p1[0] + (p2[0] - p1[0]) * t, p1[1] + (p2[1] - p1[1]) * t]);
    }
  }
  return pts;
}

export function DiagonalWipeLayer({
  contentDuration,
  wipeFrames = WIPE_FRAMES,
  borderFadeFrames = WIPE_BORDER_FADE_FRAMES,
  accentColor,
  children,
}: {
  /** Local frames the outgoing scene plays solid before the wipe starts. */
  contentDuration: number;
  wipeFrames?: number;
  borderFadeFrames?: number;
  /** The INCOMING project's accent — the color the traveling border rides in. */
  accentColor: string;
  children: React.ReactNode;
}) {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const dir = makeDir(WIPE_ANGLE_DEG);

  const corners: Pt[] = [
    [0, 0],
    [width, 0],
    [width, height],
    [0, height],
  ];
  const dots = corners.map(([x, y]) => dot(dir, x, y));
  const minDot = Math.min(...dots);
  const maxDot = Math.max(...dots);
  const margin = Math.max(width, height) * 0.25;

  // Raw 0→1 progress across the wipe window only (clamped) — reused for
  // both the content clip (margin-padded, guarantees full cover at 0 / full
  // reveal at 1) and the border tracer (true range, always a finite segment).
  const progress = interpolate(frame, [contentDuration, contentDuration + wipeFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const clipThreshold = maxDot + margin + (minDot - margin - (maxDot + margin)) * progress;
  const poly = clipRect(dir, clipThreshold, width, height);
  const clipPath =
    poly.length >= 3
      ? `polygon(${poly.map(([x, y]) => `${((x / width) * 100).toFixed(3)}% ${((y / height) * 100).toFixed(3)}%`).join(", ")})`
      : "polygon(0% 0%, 0% 0%, 0% 0%)";

  const borderThreshold = minDot + (maxDot - minDot) * progress;
  const borderPts = frame >= contentDuration && frame <= contentDuration + wipeFrames ? lineRectIntersections(dir, borderThreshold, width, height) : [];

  const borderOpacity =
    frame < contentDuration
      ? 0
      : frame <= contentDuration + wipeFrames
        ? 1
        : interpolate(frame, [contentDuration + wipeFrames, contentDuration + wipeFrames + borderFadeFrames], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

  // The border needs to hold its LAST real position through the fade tail —
  // once progress reaches 1 the true threshold has exited the frame, so we
  // freeze the border segment at the final in-frame crossing instead of
  // letting it vanish before its fade-out finishes.
  const heldBorderPts = borderPts.length === 2 ? borderPts : lineRectIntersections(dir, minDot + (maxDot - minDot) * 0.999, width, height);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <div style={{ position: "absolute", inset: 0, clipPath, WebkitClipPath: clipPath }}>{children}</div>
      {borderOpacity > 0.001 && heldBorderPts.length === 2 && (
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        >
          <line
            x1={heldBorderPts[0][0]}
            y1={heldBorderPts[0][1]}
            x2={heldBorderPts[1][0]}
            y2={heldBorderPts[1][1]}
            stroke={accentColor}
            strokeWidth={2}
            opacity={borderOpacity}
          />
        </svg>
      )}
    </div>
  );
}
