import { interpolate, useCurrentFrame } from "remotion";
import { TextWipeReveal } from "./TextWipeReveal";
import { LABEL_TRACK_FROM, LABEL_TRACK_TO, NARRATOR, WIPE_FRAMES } from "./tokens";

// ── The headline mechanic reused across all 6 chapters of the new guion —
// point A (TextWipeReveal, the same 14°/12-frame diagonal cut) and point B
// (the ProjectLabel's own -0.01em → 0.06em tracking) are the ONLY two
// infrastructure pieces this component recombines, exactly per the brief's
// instruction to reuse the technical pieces, never the old scenes' content.
//
// "wipe" mode (the default, used for every chapter's own factual sentence
// plus "DISEÑO" / "ALBERT CANADÉS"): wipe-reveals in over WIPE_FRAMES, then
// immediately tracks its letter-spacing in over the next WIPE_FRAMES.
// "track" mode (used standalone for "QUE SE USA" / "PRODUCT DESIGNER"):
// skips the clip-path entirely (an always-fully-revealed no-op wipe) and
// tracks in from startFrame directly, fading up via opacity exactly like
// ProjectLabel's own badge already does — unless the caller is driving that
// fade itself (Cap 0 and Cap 5 crossfade one word against another), in which
// case `opacityOverride` takes over so the fade is single-sourced.
export const HEADLINE_TRACK_DURATION = WIPE_FRAMES; // 12, mirrors ProjectLabel's own window

export function HeadlineText({
  text,
  startFrame,
  fontSize,
  color = "#ffffff",
  fontWeight = 700,
  textAlign = "left",
  lineHeight = 1.08,
  textShadow,
  mode = "wipe",
  opacityOverride,
}: {
  text: string;
  /** Local frame this headline's reveal begins. */
  startFrame: number;
  fontSize: number;
  color?: string;
  fontWeight?: number;
  textAlign?: "left" | "center";
  lineHeight?: number;
  textShadow?: string;
  mode?: "wipe" | "track";
  /** When set, overrides this headline's own entrance opacity — used when a
   * parent scene drives a crossfade between two headlines itself. */
  opacityOverride?: number;
}) {
  const frame = useCurrentFrame();

  const wipeProgress =
    mode === "wipe"
      ? interpolate(frame, [startFrame, startFrame + WIPE_FRAMES], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
      : 1;
  const trackStart = mode === "wipe" ? startFrame + WIPE_FRAMES : startFrame;
  const trackProgress = interpolate(frame, [trackStart, trackStart + HEADLINE_TRACK_DURATION], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const letterSpacing = LABEL_TRACK_FROM + (LABEL_TRACK_TO - LABEL_TRACK_FROM) * trackProgress;

  const autoOpacity =
    mode === "track"
      ? interpolate(frame, [startFrame, startFrame + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
      : 1;
  const opacity = opacityOverride ?? autoOpacity;

  // Generously oversized box (see TextWipeReveal's own comment on why
  // overshoot is always safe) — padded further than plain character width
  // would need so the 0.06em tracking never pushes a glyph run past its own
  // clip box once fully tracked.
  const width = text.length * fontSize * 0.72 + 80;
  const height = fontSize * lineHeight * 1.7;

  return (
    <TextWipeReveal width={width} height={height} progress={wipeProgress}>
      <div
        style={{
          width,
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: textAlign === "center" ? "center" : "flex-start",
          opacity,
        }}
      >
        <span
          style={{
            fontFamily: NARRATOR.fontDisplay,
            fontSize,
            fontWeight,
            lineHeight,
            color,
            letterSpacing: `${letterSpacing}em`,
            textTransform: "uppercase",
            textAlign,
            textShadow,
          }}
        >
          {text}
        </span>
      </div>
    </TextWipeReveal>
  );
}
