import { useLayoutEffect, useRef } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

// ── Ported from thinking-orbs (MIT, © 2026 Jakub Antalik,
// github.com/Jakubantalik/thinking-orbs) — the "globe" mode (the
// `searching` state: "a scan meridian sweeps a dotted globe"), used here in
// place of the classic 3-dots "escribiendo…" indicator in the chat scene's
// response gap. The upstream component drives its geometry from a plain
// `tSec` scalar with no closures or real-clock dependency (deliberately, so
// a React Native/SwiftUI port can share the exact same math) — the only
// change needed to make it deterministic for an mp4 render is to derive
// that scalar from Remotion's useCurrentFrame()/fps instead of
// performance.now(), which is exactly what this file does. The dot-field
// math (makeProj, radiusScale, finalizeFrame, paint) and the globe frame
// builder are copied near-verbatim from src/engine/core.ts + lattice.ts;
// the "searching" (size 64) preset tuning is copied from src/presets.ts.
type Dot = { x: number; y: number; z: number; r: number; white: number; a?: number };

function makeProj(yaw: number, tilt: number, cx: number, cy: number, scale: number) {
  const st = Math.sin(tilt);
  const ct = Math.cos(tilt);
  const sy = Math.sin(yaw);
  const cyw = Math.cos(yaw);
  return (x: number, y: number, z: number): [number, number, number] => {
    const x1 = x * cyw + z * sy;
    const z1 = -x * sy + z * cyw;
    const y1 = y * ct - z1 * st;
    const z2 = y * st + z1 * ct;
    return [cx + x1 * scale, cy - y1 * scale, z2];
  };
}

function angleDelta(a: number, b: number): number {
  return Math.atan2(Math.sin(a - b), Math.cos(a - b));
}

function radiusScale(size: number, pow: number): number {
  return (size / 300) ** pow;
}

function finalizeFrame(dots: Dot[], rMin: number): Dot[] {
  const visible: Dot[] = [];
  for (const d of dots) {
    if ((d.a ?? 1) < 0.02) continue;
    d.r = Math.max(rMin, d.r);
    visible.push(d);
  }
  visible.sort((a, b) => a.z - b.z);
  return visible;
}

function paint(ctx: CanvasRenderingContext2D, dots: Dot[], dark: boolean): void {
  for (const d of dots) {
    const alpha = d.a ?? 1;
    const w = Math.min(1, Math.max(0, d.white));
    const g = Math.round((dark ? 1 - w : w) * 255);
    ctx.fillStyle = `rgba(${g},${g},${g},${alpha})`;
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Preset: "searching" @ size 64 (src/presets.ts PRESETS.globe[64]) —
// count 0.42 / size 1.15 scaling applied ahead of time to BASE_PROFILES.globe
// (src/engine/profiles.ts), plus its scanMul/dimBase extras.
const SPEED = 2.015;
const OPTS = {
  latRings: Math.max(2, Math.round(17 * Math.sqrt(0.42))), // 11
  lonDensity: Math.max(2, Math.round(44 * Math.sqrt(0.42))), // 29
  rBase: 0.6 * 1.15,
  rDepth: 1.7 * 1.15,
  rBoost: 1.0 * 1.15,
  inkFar: 0.62,
  inkSpan: 0.54,
  rsPow: 0.6,
  rMin: 0.3,
  scanMul: 4.08,
  dimBase: 0.45,
};

function frameGlobe(size: number, t: number): Dot[] {
  const spin = 0.5;
  const cx = size / 2;
  const cy = size / 2;
  const radius = (size / 2) * 0.82;
  const tilt = 0.4 + 0.06 * Math.sin(t * 0.35);
  const pt = makeProj(t * spin, tilt, cx, cy, radius);
  const scan = t * (spin + (1.7 - spin) * OPTS.scanMul);
  const rs = radiusScale(size, OPTS.rsPow);

  const dots: Dot[] = [];
  for (let li = 0; li <= OPTS.latRings; li++) {
    const lat = -Math.PI / 2 + (li / OPTS.latRings) * Math.PI;
    const cosLat = Math.cos(lat);
    const sinLat = Math.sin(lat);
    const lonCount = Math.max(1, Math.round(Math.abs(cosLat) * OPTS.lonDensity));
    for (let lj = 0; lj < lonCount; lj++) {
      const lon = (lj / lonCount) * 2 * Math.PI;
      const [px, py, z] = pt(cosLat * Math.cos(lon), sinLat, cosLat * Math.sin(lon));
      const depth = (z + 1) / 2;
      const d = angleDelta(lon + t * spin, scan);
      const boost = Math.exp(-(d * d) / 0.18) * Math.max(0, z);
      dots.push({
        x: px,
        y: py,
        z,
        r: (OPTS.rBase + OPTS.rDepth * depth + OPTS.rBoost * boost) * rs,
        white: OPTS.inkFar - OPTS.inkSpan * depth,
        a: OPTS.dimBase + (1 - OPTS.dimBase) * Math.min(1, boost),
      });
    }
  }
  return finalizeFrame(dots, OPTS.rMin);
}

export function ThinkingOrb({ size = 48 }: { size?: number }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ref = useRef<HTMLCanvasElement | null>(null);

  useLayoutEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const dpr = 2;
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);
    const t = (frame / fps) * SPEED;
    paint(ctx, frameGlobe(size, t), true); // dark substrate — light dots, matches the narrator panel
  }, [frame, fps, size]);

  return <canvas ref={ref} style={{ width: size, height: size, display: "block" }} aria-hidden="true" />;
}
