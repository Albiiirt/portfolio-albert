import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { FlowB3ZoneStatsScene, FlowC2FilteredScene } from "../madrid/scenes";

// ── Scene 2 — Madrid payoff, 70 frames (~2.3s): FlowB3ZoneStatsScene +
// FlowC2FilteredScene reused verbatim ("recortadas, no reconstruidas") from
// remotion/madrid/scenes.tsx, just mounted for far fewer frames than their
// native 85/90-frame runs in MadridVideo.tsx. Their own cameraAt() push-ins
// (inStart/inEnd well under our trimmed windows) still play; their
// push-BACK-out keyframes (outStart/outEnd, written for the longer native
// runs) simply never arrive before the cut — the shot just holds on the
// zoomed-in detail until the wipe, which reads fine for a glimpse.
//
// The internal B3→C2 cut keeps its OWN original 8-frame crossfade exactly as
// in MadridVideo.tsx (copied verbatim below, not touched) — per the spec,
// this is NOT one of the 6 top-level DiagonalWipeLayer cuts.
const OVERLAP = 8;
const DUR_B3 = 34;
const DUR_C2 = 36;
export const MADRID_GLIMPSE_DURATION = DUR_B3 + DUR_C2; // 70

function CrossfadeLayer({ dur, fadeIn, fadeOut, children }: { dur: number; fadeIn: boolean; fadeOut: boolean; children: React.ReactNode }) {
  const frame = useCurrentFrame();
  let opacity = 1;
  if (fadeIn) opacity = Math.min(opacity, interpolate(frame, [0, OVERLAP], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  if (fadeOut) opacity = Math.min(opacity, interpolate(frame, [dur - OVERLAP, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
}

export function MadridGlimpseScene() {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={DUR_B3 + OVERLAP} name="b3">
        <CrossfadeLayer dur={DUR_B3} fadeIn={false} fadeOut>
          <FlowB3ZoneStatsScene />
        </CrossfadeLayer>
      </Sequence>
      <Sequence from={DUR_B3} durationInFrames={DUR_C2} name="c2">
        <CrossfadeLayer dur={DUR_C2} fadeIn fadeOut={false}>
          <FlowC2FilteredScene />
        </CrossfadeLayer>
      </Sequence>
    </AbsoluteFill>
  );
}
