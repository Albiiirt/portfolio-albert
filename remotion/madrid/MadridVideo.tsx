import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { loadFont } from "@remotion/google-fonts/SpaceGrotesk";
import {
  FlowA1EmptyScene,
  FlowA2AutocompleteScene,
  FlowA3ResultsScene,
  FlowB1HomeScene,
  FlowB2TerritoryScene,
  FlowB3ZoneStatsScene,
  FlowB4ZoneContentScene,
  FlowC1UnfilteredScene,
  FlowC2FilteredScene,
  FlowC3BookingScene,
} from "./scenes";

const { fontFamily } = loadFont();

// Crossfade window between consecutive scenes, same 8-frame/~267ms@30fps
// window used by remotion/xunta/ and remotion/bullipedia/.
const OVERLAP = 8;

// No text cards — three real-site flows, back to back, pure interface in
// use. Second pass (2026-10-03): every shot now pairs with the real
// before/after screenshot of the action it shows, so each cut lands on a
// visible consequence (typed text + a live dropdown, a counter that
// actually drops from 21 to 7) instead of a cursor dragging across nothing.
//  A. El buscador global (campo vacío → autocompletar real → resultados)
//  B. Descubrir una zona (home → territorio → ficha+cifras → bodegas/rutas reales)
//  C. Filtrar bodegas y reservar (21 → filtro → 7 → ficha, reservar)
const SCENES: { key: string; dur: number; Comp: React.ComponentType }[] = [
  { key: "flowA-1-empty", dur: 80, Comp: FlowA1EmptyScene },
  { key: "flowA-2-autocomplete", dur: 120, Comp: FlowA2AutocompleteScene },
  { key: "flowA-3-results", dur: 85, Comp: FlowA3ResultsScene },
  { key: "flowB-1-home", dur: 80, Comp: FlowB1HomeScene },
  { key: "flowB-2-territory", dur: 85, Comp: FlowB2TerritoryScene },
  { key: "flowB-3-stats", dur: 85, Comp: FlowB3ZoneStatsScene },
  { key: "flowB-4-content", dur: 70, Comp: FlowB4ZoneContentScene },
  { key: "flowC-1-unfiltered", dur: 80, Comp: FlowC1UnfilteredScene },
  { key: "flowC-2-filtered", dur: 90, Comp: FlowC2FilteredScene },
  { key: "flowC-3-booking", dur: 90, Comp: FlowC3BookingScene },
];

export const TOTAL_DURATION = SCENES.reduce((sum, s) => sum + s.dur, 0); // 865 @ 30fps == ~28.8s

function CrossfadeLayer({ dur, fadeIn, fadeOut, children }: { dur: number; fadeIn: boolean; fadeOut: boolean; children: React.ReactNode }) {
  const frame = useCurrentFrame();
  let opacity = 1;
  if (fadeIn) opacity = Math.min(opacity, interpolate(frame, [0, OVERLAP], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  if (fadeOut) opacity = Math.min(opacity, interpolate(frame, [dur - OVERLAP, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
}

export function MadridVideo() {
  const starts = SCENES.reduce<number[]>((acc, _scene, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + SCENES[i - 1].dur);
    return acc;
  }, []);

  return (
    <AbsoluteFill style={{ fontFamily, backgroundColor: "#1a0a0f" }}>
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
