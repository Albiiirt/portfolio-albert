import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { HeadlineText } from "./HeadlineText";
import { NARRATOR } from "./tokens";

// ── Capítulo 0 — apertura, tipografía pura, 60 frames (2.0s). Flat dark bg,
// no photo/video/UI, per the rewrite's whole point (cautivar, no demostrar
// producto). "DISEÑO" demonstrates point A (TextWipeReveal) on its own;
// "QUE SE USA" demonstrates point B (tracking) on its own — the brief names
// each word to ONE technique, not both stacked on each word. The swap
// between them is a plain opacity crossfade ("disolvido simple"): there's no
// color-wipe border possible between two identical flat backgrounds.
export const OPENING_SCENE_DURATION = 60;

const F = {
  disenoWipeStart: 0, // wipe window 0–12 (WIPE_FRAMES)
  crossStart: 26,
  crossEnd: 34,
};

export function OpeningScene() {
  const frame = useCurrentFrame();
  const disenoOpacity = interpolate(frame, [F.crossStart, F.crossEnd], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const queOpacity = interpolate(frame, [F.crossStart, F.crossEnd], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: NARRATOR.bg, alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "absolute" }}>
        <HeadlineText text="DISEÑO" startFrame={F.disenoWipeStart} fontSize={104} textAlign="center" opacityOverride={disenoOpacity} />
      </div>
      <div style={{ position: "absolute" }}>
        <HeadlineText text="QUE SE USA" startFrame={F.crossStart} fontSize={72} textAlign="center" mode="track" opacityOverride={queOpacity} />
      </div>
    </AbsoluteFill>
  );
}
