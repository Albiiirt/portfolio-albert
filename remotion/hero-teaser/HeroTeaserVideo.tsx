import { AbsoluteFill, Sequence } from "remotion";
import { loadFont } from "@remotion/google-fonts/SpaceGrotesk";
import { BullipediaGlimpseScene, BULLIPEDIA_GLIMPSE_DURATION } from "./BullipediaGlimpseScene";
import { ChatScene, CHAT_SCENE_DURATION } from "./ChatScene";
import { ClosingScene, CLOSING_SCENE_DURATION } from "./ClosingScene";
import { DiagonalWipeLayer } from "./DiagonalWipeLayer";
import { MadridGlimpseScene, MADRID_GLIMPSE_DURATION } from "./MadridGlimpseScene";
import { MirazurGlimpseScene, MIRAZUR_GLIMPSE_DURATION } from "../mirazur/scenes";
import { ProjectLabel } from "./ProjectLabel";
import { PROJECT_ACCENT, WIPE_BORDER_FADE_FRAMES, WIPE_FRAMES } from "./tokens";
import { XuntaGlimpseScene, XUNTA_GLIMPSE_DURATION } from "./XuntaGlimpseScene";

const { fontFamily } = loadFont();

// ── Hero teaser — 449 frames @30fps (~15.0s), loop. 6 beats, each a
// DiagonalWipeLayer cut (12 frames + 6-frame border fade) except two spots
// that keep their OWN existing mechanics untouched per spec: the internal
// Madrid B3→C2 crossfade (inside MadridGlimpseScene) and the Closing
// scene's self-contained loop-wipe back to frame 0 of the chat (inside
// ClosingScene, since there's no real "7th scene" after it to borrow
// overlap time from the way scenes 1–5 do here).
//
// Total-frame accounting (documented in the task's final summary too):
//   Chat 154 + Madrid 70 + Bullipedia 55 + Xunta 55 + Mirazur 55 + Closing 60
//   = 449. The spec's own approximate scene lengths (130/70/55/55/55/60 =
//   425) undershoot 449 by 24 frames on their own; that slack went entirely
//   into the Chat scene (130→154), which also needed the room for its two
//   full sentences to type out legibly (see ChatScene.tsx's own comment).
//
// Each non-last scene's own Sequence runs dur_i + WIPE_FRAMES +
// WIPE_BORDER_FADE_FRAMES frames — the same "extend past your own nominal
// end so the crossfade/wipe has somewhere to play" pattern already used by
// every CrossfadeLayer in this repo (madrid/xunta/bullipedia *Video.tsx):
// the NEXT scene's Sequence already starts exactly at dur_i, so this costs
// zero extra frames overall, it only means both layers are mounted
// simultaneously for the 18-frame tail. zIndex keeps the OUTGOING (earlier)
// scene always painted on top of the scene(s) it's wiping over.
const CHAT_START = 0;
const MADRID_START = CHAT_START + CHAT_SCENE_DURATION; // 154
const BULLIPEDIA_START = MADRID_START + MADRID_GLIMPSE_DURATION; // 224
const XUNTA_START = BULLIPEDIA_START + BULLIPEDIA_GLIMPSE_DURATION; // 279
const MIRAZUR_START = XUNTA_START + XUNTA_GLIMPSE_DURATION; // 334
const CLOSING_START = MIRAZUR_START + MIRAZUR_GLIMPSE_DURATION; // 389

export const TOTAL_DURATION = CLOSING_START + CLOSING_SCENE_DURATION; // 449

const TAIL = WIPE_FRAMES + WIPE_BORDER_FADE_FRAMES; // 18

export function HeroTeaserVideo() {
  return (
    <AbsoluteFill style={{ fontFamily, backgroundColor: "#0a0a0a" }}>
      <Sequence from={CHAT_START} durationInFrames={CHAT_SCENE_DURATION + TAIL} name="chat">
        <AbsoluteFill style={{ zIndex: 5 }}>
          <DiagonalWipeLayer contentDuration={CHAT_SCENE_DURATION} accentColor={PROJECT_ACCENT.madrid}>
            <ChatScene />
          </DiagonalWipeLayer>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={MADRID_START} durationInFrames={MADRID_GLIMPSE_DURATION + TAIL} name="madrid">
        <AbsoluteFill style={{ zIndex: 4 }}>
          <DiagonalWipeLayer contentDuration={MADRID_GLIMPSE_DURATION} accentColor={PROJECT_ACCENT.bullipedia}>
            <MadridGlimpseScene />
            <ProjectLabel text="ENOTURISMO MADRID" accentColor={PROJECT_ACCENT.madrid} />
          </DiagonalWipeLayer>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={BULLIPEDIA_START} durationInFrames={BULLIPEDIA_GLIMPSE_DURATION + TAIL} name="bullipedia">
        <AbsoluteFill style={{ zIndex: 3 }}>
          <DiagonalWipeLayer contentDuration={BULLIPEDIA_GLIMPSE_DURATION} accentColor={PROJECT_ACCENT.xunta}>
            <BullipediaGlimpseScene />
            <ProjectLabel text="BULLIPEDIA" accentColor={PROJECT_ACCENT.bullipedia} />
          </DiagonalWipeLayer>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={XUNTA_START} durationInFrames={XUNTA_GLIMPSE_DURATION + TAIL} name="xunta">
        <AbsoluteFill style={{ zIndex: 2 }}>
          <DiagonalWipeLayer contentDuration={XUNTA_GLIMPSE_DURATION} accentColor={PROJECT_ACCENT.mirazur}>
            <XuntaGlimpseScene />
            <ProjectLabel text="XUNTA / GNOSS" accentColor={PROJECT_ACCENT.xunta} />
          </DiagonalWipeLayer>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={MIRAZUR_START} durationInFrames={MIRAZUR_GLIMPSE_DURATION + TAIL} name="mirazur">
        <AbsoluteFill style={{ zIndex: 1 }}>
          <DiagonalWipeLayer contentDuration={MIRAZUR_GLIMPSE_DURATION} accentColor={PROJECT_ACCENT.closing}>
            <MirazurGlimpseScene />
            <ProjectLabel text="MIRAZUR" accentColor={PROJECT_ACCENT.mirazur} />
          </DiagonalWipeLayer>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={CLOSING_START} durationInFrames={CLOSING_SCENE_DURATION} name="closing">
        <AbsoluteFill style={{ zIndex: 0 }}>
          <ClosingScene />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
}
