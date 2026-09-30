import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { ArticleScene, BookPageScene, CatalogScene, ChapterScene } from "./scenes";
import { BULLIPEDIA, loadBullipediaFont } from "./tokens";

loadBullipediaFont();

// Crossfade window between consecutive scenes, same 8-frame/~267ms@30fps
// window used by remotion/xunta/XuntaVideo.tsx.
const OVERLAP = 8;

// 100% continuous product navigation, no narrated chapter cards — per
// Albert's spec (2026-09-30): catálogo → ficha del libro → capítulo (sidebar)
// → artículo en modo lectura, 26s @30fps.
const SCENES: { key: string; dur: number; Comp: React.ComponentType }[] = [
  { key: "catalogo", dur: 150, Comp: CatalogScene },
  { key: "libro", dur: 180, Comp: BookPageScene },
  { key: "capitulo", dur: 210, Comp: ChapterScene },
  { key: "articulo", dur: 240, Comp: ArticleScene },
];

export const TOTAL_DURATION = SCENES.reduce((sum, s) => sum + s.dur, 0); // 780 @ 30fps == 26s

function CrossfadeLayer({ dur, fadeIn, fadeOut, children }: { dur: number; fadeIn: boolean; fadeOut: boolean; children: React.ReactNode }) {
  const frame = useCurrentFrame();
  let opacity = 1;
  if (fadeIn) opacity = Math.min(opacity, interpolate(frame, [0, OVERLAP], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  if (fadeOut) opacity = Math.min(opacity, interpolate(frame, [dur - OVERLAP, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
}

export function BullipediaVideo() {
  const starts = SCENES.reduce<number[]>((acc, _scene, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + SCENES[i - 1].dur);
    return acc;
  }, []);

  return (
    <AbsoluteFill style={{ backgroundColor: BULLIPEDIA.white }}>
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
