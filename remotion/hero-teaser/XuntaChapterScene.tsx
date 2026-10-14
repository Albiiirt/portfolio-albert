import { AbsoluteFill, Loop, OffthreadVideo, staticFile } from "remotion";
import { FlashCard } from "./FlashCard";
import { HeadlineText } from "./HeadlineText";
import { CHAPTER_GRADIENT } from "./tokens";
import { TERMINOS } from "../xunta/data";
import { GNOSS } from "../xunta/tokens";
import { BrowserFrame, FacetSidebar, GnossHeader, ResultRow, SearchBar } from "../xunta/ui";

// ── Capítulo 3 — Xunta, 90 frames (3.0s). Real library-shelves footage
// (processed from the Pexels source into public/videos/bg-library-xunta.mp4,
// 3.5s @30fps — looped via Remotion's own <Loop> to comfortably cover this
// chapter's full mounted window) with Xunta's own teal gradient washed on
// top. A single ≤0.6s flash of the real Términos screen in a floating
// tilted card, same pattern as Madrid — reusing remotion/xunta/ui.tsx's own
// pieces (its real product has no photographic capture, this hand-rebuilt
// mockup already IS the canonical "real screen" the rest of this repo's
// Xunta case-study video uses) rather than the old XuntaGlimpseScene's own
// full-bleed, non-tilted, whole-chapter layout.
export const XUNTA_GLIMPSE_DURATION = 90;
const BG_CLIP_FRAMES = 105; // the processed clip's own 3.5s @30fps

const F = {
  headlineStart: 10, // wipe 10–22, tracks 22–34
  flashStart: 48,
  flashDuration: 18, // ≤0.6s budget, exact
};

const ROWS = TERMINOS.slice(0, 4);

function RealTerminosScreen() {
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: "48px 150px", background: GNOSS.grisFondo }}>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <BrowserFrame url="unificador.xunta.gal/terminos">
          <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
            <GnossHeader tab="terminos" trabajoCount={13} />
            <div style={{ display: "flex", gap: 28, padding: "22px 32px", flex: 1, minHeight: 0 }}>
              <FacetSidebar activeEstado="pendiente" flashing={false} />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
                <SearchBar value="" caret={false} />
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {ROWS.map((t) => (
                    <ResultRow key={t.id} nombre={t.nombre} idControl={t.ficha.idControl} fuente={t.fuente} estado={t.estado} isGrupo={Boolean(t.grupoId)} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </BrowserFrame>
      </div>
    </AbsoluteFill>
  );
}

export function XuntaChapterScene() {
  return (
    <AbsoluteFill>
      <Loop durationInFrames={BG_CLIP_FRAMES}>
        <OffthreadVideo src={staticFile("videos/bg-library-xunta.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} muted />
      </Loop>
      <AbsoluteFill style={{ background: CHAPTER_GRADIENT.xunta, opacity: 0.6, mixBlendMode: "multiply" }} />
      <AbsoluteFill style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 45%)" }} />

      <div style={{ position: "absolute", left: 80, bottom: 110, maxWidth: 1100 }}>
        <HeadlineText
          text="UNIFICAR UN TESAURO DE 80.000 TÉRMINOS"
          startFrame={F.headlineStart}
          fontSize={46}
          color="#ffffff"
          textShadow="0 4px 24px rgba(0,0,0,0.55)"
        />
      </div>

      <FlashCard startFrame={F.flashStart} durationFrames={F.flashDuration} targetWidth={900} nativeWidth={1920} nativeHeight={1080}>
        <RealTerminosScreen />
      </FlashCard>
    </AbsoluteFill>
  );
}
