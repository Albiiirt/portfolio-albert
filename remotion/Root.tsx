import { Composition } from "remotion";
import { XuntaVideo, TOTAL_DURATION as XUNTA_DURATION } from "./xunta/XuntaVideo";
import { MadridVideo, TOTAL_DURATION as MADRID_DURATION } from "./madrid/MadridVideo";
import { BullipediaVideo, TOTAL_DURATION as BULLIPEDIA_DURATION } from "./bullipedia/BullipediaVideo";
import { HeroTeaserVideo, TOTAL_DURATION as HERO_TEASER_DURATION } from "./hero-teaser/HeroTeaserVideo";

// Registers every Remotion composition for this repo:
// - XuntaUnificador: Galiciana Thesaurus case study (client: Xunta de
//   Galicia, via GNOSS), embedded in components/proyectos/XuntaGaliciaPage.tsx.
// - MadridEnoturismo: Enoturismo Madrid case study, embedded in
//   components/proyectos/MadridPage.tsx.
// - BullipediaWalkthrough: elBulli Foundation's Bullipedia marketplace —
//   pure interface navigation (catálogo → ficha → capítulo → artículo),
//   embedded in components/proyectos/ElBulliPage.tsx (marketplace sub-project).
// - HeroTeaser: the home Hero's looping video teaser (chat → Madrid payoff →
//   Bullipedia/Xunta/Mirazur glimpses → closing fan), embedded in
//   components/Hero.tsx in place of <PlanetOrbit /> for motion-OK users.
export function RemotionRoot() {
  return (
    <>
      <Composition
        id="XuntaUnificador"
        component={XuntaVideo}
        durationInFrames={XUNTA_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="MadridEnoturismo"
        component={MadridVideo}
        durationInFrames={MADRID_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="BullipediaWalkthrough"
        component={BullipediaVideo}
        durationInFrames={BULLIPEDIA_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="HeroTeaser"
        component={HeroTeaserVideo}
        durationInFrames={HERO_TEASER_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
}
