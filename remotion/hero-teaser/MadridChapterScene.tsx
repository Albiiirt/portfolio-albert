import { AbsoluteFill, Img, Loop, OffthreadVideo, staticFile, useCurrentFrame } from "remotion";
import { FlashCard } from "./FlashCard";
import { HeadlineText } from "./HeadlineText";
import { ThinkingOrb } from "./ThinkingOrb";
import { CHAPTER_GRADIENT } from "./tokens";

// ── Capítulo 1 — Madrid, 120 frames (4.0s). Real aerial vineyard footage
// (processed from the Pexels source into public/videos/bg-vineyard-madrid.mp4,
// 4.5s @30fps — looped via Remotion's own <Loop> to comfortably cover this
// chapter's full mounted window, including the wipe-out tail) with Madrid's
// own wine gradient washed on top at ~55% via mix-blend-mode. The real
// product only gets a single ≤0.8s flash in a floating tilted card — never
// full-screen, the vineyard stays visible in the margins around it — per the
// rewrite's whole point.
export const MADRID_GLIMPSE_DURATION = 120;
const BG_CLIP_FRAMES = 135; // the processed clip's own 4.5s @30fps

const F = {
  headlineStart: 10, // wipe 10–22, tracks 22–34
  orbStart: 40,
  orbEnd: 55,
  flashStart: 62,
  flashDuration: 24, // ≤0.8s budget, exact
};

const SHOT_SRC = "screenshots/madrid-walkthrough/flowC-02-bodegas-filtradas-7.jpg";
const SHOT_W = 1568;
const SHOT_H = 721;

export function MadridChapterScene() {
  return (
    <AbsoluteFill>
      <Loop durationInFrames={BG_CLIP_FRAMES}>
        <OffthreadVideo src={staticFile("videos/bg-vineyard-madrid.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} muted />
      </Loop>
      <AbsoluteFill style={{ background: CHAPTER_GRADIENT.madrid, opacity: 0.55, mixBlendMode: "multiply" }} />
      <AbsoluteFill style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 45%)" }} />

      <div style={{ position: "absolute", left: 80, bottom: 110, maxWidth: 1100 }}>
        <HeadlineText
          text="¿DÓNDE VOY A CATAR VINO ESTE FINDE?"
          startFrame={F.headlineStart}
          fontSize={48}
          color="#ffffff"
          textShadow="0 4px 24px rgba(0,0,0,0.55)"
        />
      </div>

      <ThinkingOrbCorner start={F.orbStart} end={F.orbEnd} />

      <FlashCard startFrame={F.flashStart} durationFrames={F.flashDuration} targetWidth={760} nativeWidth={SHOT_W} nativeHeight={SHOT_H}>
        <Img
          src={staticFile(SHOT_SRC)}
          alt="Resultado de bodegas filtradas en Enoturismo Madrid"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </FlashCard>
    </AbsoluteFill>
  );
}

// Keeps ThinkingOrb mounted only across its own brief corner window, same
// spirit as FlashCard's own mount guard — avoids running the orb's
// per-frame canvas paint for the whole 120-frame chapter when it's only on
// screen for ~0.5s.
function ThinkingOrbCorner({ start, end }: { start: number; end: number }) {
  const frame = useCurrentFrame();
  if (frame < start || frame > end) return null;
  return (
    <div style={{ position: "absolute", top: 56, right: 64, zIndex: 40 }}>
      <ThinkingOrb size={48} />
    </div>
  );
}
