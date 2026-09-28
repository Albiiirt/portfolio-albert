import { interpolate, useCurrentFrame } from "remotion";
import { EASE } from "./tokens";

// A reusable simulated pointer — never the native OS cursor. Position is
// expressed in percent of the containing (relative-positioned) frame, so it
// travels the same way regardless of the frame's rendered size.
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

export function SimCursor({ hops }: { hops: CursorHop[] }) {
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
          fill="#ffffff"
          stroke="#1f2430"
          strokeWidth="1.6"
          strokeLinejoin="round"
          style={{ filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.35))" }}
        />
      </svg>
      {rippleAt !== null && <Ripple frame={frame} landFrame={rippleAt} />}
    </div>
  );
}

function Ripple({ frame, landFrame }: { frame: number; landFrame: number }) {
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
        border: `2px solid ${GNOSS_RIPPLE}`,
        opacity,
      }}
    />
  );
}

const GNOSS_RIPPLE = "#006efe";

// Types a string out character by character (one char every ~2.2 frames ==
// ~73ms @30fps, inside the spec's 60–90ms/char range), with a blinking caret.
export function useTypedText(fullText: string, startFrame: number, framesPerChar = 2.2): string {
  const frame = useCurrentFrame();
  const charsElapsed = Math.max(0, Math.floor((frame - startFrame) / framesPerChar));
  return fullText.slice(0, Math.min(charsElapsed, fullText.length));
}

export function Caret({ visible }: { visible: boolean }) {
  const frame = useCurrentFrame();
  const blink = Math.floor(frame / 12) % 2 === 0;
  if (!visible) return null;
  return (
    <span
      style={{
        display: "inline-block",
        width: 1.5,
        height: "1em",
        background: "#1f2430",
        marginLeft: 1,
        opacity: blink ? 1 : 0,
        verticalAlign: "-0.15em",
      }}
    />
  );
}
