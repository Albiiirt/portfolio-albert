import { Composition } from "remotion";
import { XuntaVideo, TOTAL_DURATION } from "./xunta/XuntaVideo";

// Registers every Remotion composition for this repo. Currently a single
// one: the Galiciana Thesaurus case-study video (client: Xunta de Galicia,
// via GNOSS) embedded in components/proyectos/XuntaGaliciaPage.tsx.
export function RemotionRoot() {
  return (
    <>
      <Composition
        id="XuntaUnificador"
        component={XuntaVideo}
        durationInFrames={TOTAL_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
}
