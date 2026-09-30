import { Composition } from "remotion";
import { XuntaVideo, TOTAL_DURATION as XUNTA_DURATION } from "./xunta/XuntaVideo";
import { MadridVideo, TOTAL_DURATION as MADRID_DURATION } from "./madrid/MadridVideo";

// Registers every Remotion composition for this repo:
// - XuntaUnificador: Galiciana Thesaurus case study (client: Xunta de
//   Galicia, via GNOSS), embedded in components/proyectos/XuntaGaliciaPage.tsx.
// - MadridEnoturismo: Enoturismo Madrid case study, embedded in
//   components/proyectos/MadridPage.tsx.
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
    </>
  );
}
