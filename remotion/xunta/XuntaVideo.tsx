import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { loadFont } from "@remotion/google-fonts/SpaceGrotesk";
import { WorkScene } from "./scenes";

const { fontFamily } = loadFont();

// Crossfade window between consecutive scenes: 200–300ms per spec (8 frames
// @30fps == ~267ms).
const OVERLAP = 8;

// Per Albert's note (2026-10-03): no text cards at all — not the chapter
// cards (Identidad/El reto/El resultado/El aprendizaje/Cierre) that used to
// bookend this, nor any other intertitle. Just the three real-interface
// flows (Términos → Ficha → Trabajo), back to back, pure interface in use.
const SCENES: { key: string; dur: number; Comp: React.ComponentType }[] = [{ key: "work", dur: 980, Comp: WorkScene }];

export const TOTAL_DURATION = SCENES.reduce((sum, s) => sum + s.dur, 0); // 1240 @ 30fps == ~41.3s

function CrossfadeLayer({ dur, fadeIn, fadeOut, children }: { dur: number; fadeIn: boolean; fadeOut: boolean; children: React.ReactNode }) {
  const frame = useCurrentFrame();
  let opacity = 1;
  if (fadeIn) opacity = Math.min(opacity, interpolate(frame, [0, OVERLAP], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  if (fadeOut) opacity = Math.min(opacity, interpolate(frame, [dur - OVERLAP, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
}

export function XuntaVideo() {
  const starts = SCENES.reduce<number[]>((acc, _scene, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + SCENES[i - 1].dur);
    return acc;
  }, []);

  return (
    <AbsoluteFill style={{ fontFamily, backgroundColor: "#001515" }}>
      {SCENES.map(({ key, dur, Comp }, i) => {
        const isFirst = i === 0;
        const isLast = i === SCENES.length - 1;
        return (
          <Sequence key={key} from={starts[i]} durationInFrames={isLast ? dur : dur + OVERLAP} name={key}>
            <CrossfadeLayer dur={dur} fadeIn={!isFirst} fadeOut={!isLast}>
              <Comp />
            </CrossfadeLayer>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
}
