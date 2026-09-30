import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { loadFont } from "@remotion/google-fonts/SpaceGrotesk";
import { ChallengeScene, ClosingScene, IdentityScene, LearningScene, ResultScene, WorkScene } from "./scenes";

const { fontFamily } = loadFont();

// Crossfade window between consecutive scenes: 200–300ms per spec (8 frames
// @30fps == ~267ms).
const OVERLAP = 8;

// Brief chapter cards around a long, mostly-interface middle section — per
// Albert's note (2026-09-28): the video should read as real navigation
// through the prototype, not a narrated slideshow with a short UI clip in
// the middle. "work" is ~79% of the runtime.
const SCENES: { key: string; dur: number; Comp: React.ComponentType }[] = [
  { key: "identity", dur: 55, Comp: IdentityScene }, // 1. Identidad
  { key: "challenge", dur: 45, Comp: ChallengeScene }, // 2. El reto
  { key: "work", dur: 980, Comp: WorkScene }, // 3. El trabajo (interfaz real)
  { key: "result", dur: 45, Comp: ResultScene }, // 4. El resultado
  { key: "learning", dur: 60, Comp: LearningScene }, // 5. El aprendizaje
  { key: "closing", dur: 55, Comp: ClosingScene }, // 6. Cierre
];

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
