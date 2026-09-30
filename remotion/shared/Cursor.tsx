import { Easing, interpolate, useCurrentFrame } from "remotion";

// Generic scripted-pointer + typed-text primitives, factored out of
// remotion/xunta/Cursor.tsx while building the Madrid case-study video
// (2026-09-28): everything here — hop scripting, click/ripple timing, typed
// text, blinking caret — was project-agnostic already, only the pointer's
// stroke color and the ripple color were hardcoded to GNOSS's palette.
// remotion/xunta/Cursor.tsx is left as-is (a parallel session had unstaged
// edits in remotion/xunta/ at the time this was written, and it isn't part
// of this change's scope) — remotion/madrid/Cursor.tsx wraps this module
// with ENO's colors instead. A future pass can migrate xunta/scenes.tsx to
// import straight from here.
//
// Self-contained on purpose: no import from either vertical's tokens.ts, so
// this stays reusable for a third case-study video without pulling in
// GNOSS or ENO tokens it doesn't need.
const EASE = Easing.bezier(0.25, 0.46, 0.45, 0.94);

// Position is expressed in percent of the containing (relative-positioned)
// frame, so it travels the same way regardless of the frame's rendered size.
export type CursorPoint = { x: number; y: number };

// One scripted "hop": arrive at `to` between `fromFrame` and `toFrame`,
// travelling from wherever it was (the previous hop's `to`, or `from` for the
// first one) along the site's own EASE curve — never a hard cut, even when
// the hop is short. `click`/`ripple` fire once the hop lands.
export type CursorHop = {
  from: CursorPoint;
  to: CursorPoint;
  fromFrame: number;
  toFrame: number;
  click?: boolean;
};

export function cursorPositionAt(hops: CursorHop[], frame: number): { pos: CursorPoint; clicking: boolean; rippleAt: number | null } {
  if (hops.length === 0) return { pos: { x: 50, y: 50 }, clicking: false, rippleAt: null };

  // Find the active (or most recent completed) hop.
  let active = hops[0];
  for (const hop of hops) {
    if (frame >= hop.fromFrame) active = hop;
  }

  const localT = interpolate(frame, [active.fromFrame, active.toFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });
  const pos = {
    x: active.from.x + (active.to.x - active.from.x) * localT,
    y: active.from.y + (active.to.y - active.from.y) * localT,
  };

  // Click bounce: scale 1 -> 0.85 -> 1 across ~150ms (4.5 frames @30fps)
  // right as the hop lands.
  const framesSinceLand = frame - active.toFrame;
  const clicking = Boolean(active.click) && framesSinceLand >= 0 && framesSinceLand <= 5;
  const rippleAt = Boolean(active.click) && framesSinceLand >= 0 && framesSinceLand <= 12 ? active.toFrame : null;

  return { pos, clicking, rippleAt };
}

export function SimCursor({
  hops,
  pointerFill = "#ffffff",
  pointerStroke = "#1f2430",
  rippleColor = "#1f2430",
}: {
  hops: CursorHop[];
  pointerFill?: string;
  pointerStroke?: string;
  rippleColor?: string;
}) {
  const frame = useCurrentFrame();
  const { pos, clicking, rippleAt } = cursorPositionAt(hops, frame);

  const scale = clicking
    ? interpolate(frame - (hops.find((h) => h.toFrame <= frame)?.toFrame ?? 0), [0, 2, 5], [1, 0.85, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

  return (
    <div
      style={{
        position: "absolute",
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        zIndex: 200,
        pointerEvents: "none",
        transform: `translate(-6px, -4px) scale(${scale})`,
      }}
    >
      <svg width="30" height="34" viewBox="0 0 30 34" fill="none">
        <path
          d="M3 2L26 17.5L16 19.5L11 30.5L3 2Z"
          fill={pointerFill}
          stroke={pointerStroke}
          strokeWidth="1.6"
          strokeLinejoin="round"
          style={{ filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.35))" }}
        />
      </svg>
      {rippleAt !== null && <Ripple frame={frame} landFrame={rippleAt} color={rippleColor} />}
    </div>
  );
}

function Ripple({ frame, landFrame, color }: { frame: number; landFrame: number; color: string }) {
  const local = frame - landFrame;
  const size = interpolate(local, [0, 12], [10, 34], { extrapolateRight: "clamp" });
  const opacity = interpolate(local, [0, 12], [0.5, 0], { extrapolateRight: "clamp" });
  return (
    <div
      style={{
        position: "absolute",
        left: 8,
        top: 8,
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        borderRadius: "50%",
        border: `2px solid ${color}`,
        opacity,
      }}
    />
  );
}

// Types a string out character by character (one char every ~2.2 frames ==
// ~73ms @30fps, inside the spec's 60–90ms/char range), with a blinking caret.
export function useTypedText(fullText: string, startFrame: number, framesPerChar = 2.2): string {
  const frame = useCurrentFrame();
  const charsElapsed = Math.max(0, Math.floor((frame - startFrame) / framesPerChar));
  return fullText.slice(0, Math.min(charsElapsed, fullText.length));
}

export function Caret({ visible, color = "#1f2430" }: { visible: boolean; color?: string }) {
  const frame = useCurrentFrame();
  const blink = Math.floor(frame / 12) % 2 === 0;
  if (!visible) return null;
  return (
    <span
      style={{
        display: "inline-block",
        width: 1.5,
        height: "1em",
        background: color,
        marginLeft: 1,
        opacity: blink ? 1 : 0,
        verticalAlign: "-0.15em",
      }}
    />
  );
}
