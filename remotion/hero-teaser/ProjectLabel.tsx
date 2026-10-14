import { interpolate, useCurrentFrame } from "remotion";
import { LABEL_TRACK_FROM, LABEL_TRACK_TO, NARRATOR } from "./tokens";

// ── Point B of the spec: the kinetic-tracking project label, bottom-left,
// shown at the open of each of the 4 project glimpses (never in the chat
// scene). Letter-spacing animates -0.01em → 0.06em — literally the same
// value Hero.tsx:52 already uses for the "Barcelona" badge — folded inside
// the wipe's own 12-frame window plus a short fade-out tail, so it never
// adds frames to the scene's own duration.
export function ProjectLabel({
  text,
  accentColor,
  persist = false,
  fixed = true,
  textColor = "#ffffff",
}: {
  text: string;
  accentColor: string;
  /** Closing-fan variant: hold at full opacity instead of fading out. */
  persist?: boolean;
  /** Set false for the closing fan's per-card labels, which are positioned
   * by their own card wrapper instead of pinned to the frame's corner. */
  fixed?: boolean;
  /** Every glimpse sits on a dark backdrop except Bullipedia's own white
   * card in the closing fan — pass a dark ink there instead of white, or
   * "Bullipedia" renders unreadable (near-invisible, low contrast). */
  textColor?: string;
}) {
  const frame = useCurrentFrame();
  const trackProgress = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const letterSpacing = LABEL_TRACK_FROM + (LABEL_TRACK_TO - LABEL_TRACK_FROM) * trackProgress;
  const opacity = persist
    ? interpolate(frame, [0, 10], [0, 0.85], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : interpolate(frame, [0, 10, 18, 26], [0, 0.85, 0.85, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  if (opacity <= 0.001) return null;

  return (
    <div style={fixed ? { position: "absolute", left: 48, bottom: 40, zIndex: 50 } : undefined}>
      <span style={{ display: "block", width: 28, height: 2, background: accentColor, marginBottom: 10, opacity }} />
      <span
        style={{
          fontFamily: NARRATOR.fontDisplay,
          fontSize: 22,
          fontWeight: 600,
          color: textColor,
          opacity,
          letterSpacing: `${letterSpacing}em`,
          textTransform: "uppercase",
        }}
      >
        {text}
      </span>
    </div>
  );
}
