import { AbsoluteFill, Sequence } from "remotion";
import { loadFont } from "@remotion/google-fonts/SpaceGrotesk";
import { BullipediaChapterScene, BULLIPEDIA_GLIMPSE_DURATION } from "./BullipediaChapterScene";
import { ClosingScene, CLOSING_SCENE_DURATION } from "./ClosingScene";
import { DiagonalWipeLayer } from "./DiagonalWipeLayer";
import { MadridChapterScene, MADRID_GLIMPSE_DURATION } from "./MadridChapterScene";
import { MirazurChapterScene, MIRAZUR_GLIMPSE_DURATION } from "./MirazurChapterScene";
import { OpeningScene, OPENING_SCENE_DURATION } from "./OpeningScene";
import { PROJECT_ACCENT, WIPE_BORDER_FADE_FRAMES, WIPE_FRAMES } from "./tokens";
import { XuntaChapterScene, XUNTA_GLIMPSE_DURATION } from "./XuntaChapterScene";

const { fontFamily } = loadFont();

// ── Hero teaser v2 — 525 frames @30fps (~17.5s), loop. This SUSTITUYE the
// whole v1 scene lineup (chat → 4 project glimpses → fan) — the ratio was
// backwards: almost every frame was "real screen + cursor", which is exactly
// what the project pages already show, so it never read as distinct from
// them. This cut inverts it: 6 short chapters, each opening on a plain
// factual sentence (HeadlineText's own wipe+tracking, Point A/B reused
// verbatim) over real b-roll/art, with the product itself only ever
// flashing briefly in a floating tilted card (FlashCard) or, for Bullipedia,
// as a tiny thumbnail inside the new shared FigmaChrome — never full-screen.
// Total real-screen time across the whole loop stays under ~2.4s (~14%),
// tracked per-chapter in each scene file's own comment.
//
// Reused infrastructure only (per the brief): DiagonalWipeLayer (wipe
// diagonal, 14°/12 frames + 6-frame border fade), HeadlineText's tracking
// (ProjectLabel's own -0.01em → 0.06em span), ThinkingOrb (ported from
// thinking-orbs, used briefly in the Madrid chapter), FlashCard's tilt
// (BookCover's own rotateY pattern, generalized), and SimCursor. NOT reused:
// any of v1's own scene content (ChatScene, the 4 *GlimpseScene files, the
// closing fan) — those files are gone, replaced by the 6 files below.
//
// Frame accounting: Opening 60 + Madrid 120 + Bullipedia 105 + Xunta 90 +
// Mirazur 90 + Closing 60 = 525, exactly the spec's own chapter boundaries
// (0–60 / 60–180 / 180–285 / 285–375 / 375–465 / 465–525) — no rounding
// needed, these summed cleanly on the first pass.
const OPENING_START = 0;
const MADRID_START = OPENING_START + OPENING_SCENE_DURATION; // 60
const BULLIPEDIA_START = MADRID_START + MADRID_GLIMPSE_DURATION; // 180
const XUNTA_START = BULLIPEDIA_START + BULLIPEDIA_GLIMPSE_DURATION; // 285
const MIRAZUR_START = XUNTA_START + XUNTA_GLIMPSE_DURATION; // 375
const CLOSING_START = MIRAZUR_START + MIRAZUR_GLIMPSE_DURATION; // 465

export const TOTAL_DURATION = CLOSING_START + CLOSING_SCENE_DURATION; // 525

// Same "extend past your own nominal end so the wipe has somewhere to play"
// pattern as every CrossfadeLayer/DiagonalWipeLayer pairing already in this
// repo: the next chapter's Sequence already starts exactly at the current
// chapter's own nominal duration, so mounting this TAIL costs zero extra
// frames overall — both layers are just mounted simultaneously for the
// 18-frame tail, zIndex keeps the outgoing (earlier) chapter on top.
const TAIL = WIPE_FRAMES + WIPE_BORDER_FADE_FRAMES; // 18

export function HeroTeaserVideo() {
  return (
    <AbsoluteFill style={{ fontFamily, backgroundColor: "#0a0a0a" }}>
      <Sequence from={OPENING_START} durationInFrames={OPENING_SCENE_DURATION + TAIL} name="opening">
        <AbsoluteFill style={{ zIndex: 5 }}>
          <DiagonalWipeLayer contentDuration={OPENING_SCENE_DURATION} accentColor={PROJECT_ACCENT.madrid}>
            <OpeningScene />
          </DiagonalWipeLayer>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={MADRID_START} durationInFrames={MADRID_GLIMPSE_DURATION + TAIL} name="madrid">
        <AbsoluteFill style={{ zIndex: 4 }}>
          <DiagonalWipeLayer contentDuration={MADRID_GLIMPSE_DURATION} accentColor={PROJECT_ACCENT.bullipedia}>
            <MadridChapterScene />
          </DiagonalWipeLayer>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={BULLIPEDIA_START} durationInFrames={BULLIPEDIA_GLIMPSE_DURATION + TAIL} name="bullipedia">
        <AbsoluteFill style={{ zIndex: 3 }}>
          <DiagonalWipeLayer contentDuration={BULLIPEDIA_GLIMPSE_DURATION} accentColor={PROJECT_ACCENT.xunta}>
            <BullipediaChapterScene />
          </DiagonalWipeLayer>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={XUNTA_START} durationInFrames={XUNTA_GLIMPSE_DURATION + TAIL} name="xunta">
        <AbsoluteFill style={{ zIndex: 2 }}>
          <DiagonalWipeLayer contentDuration={XUNTA_GLIMPSE_DURATION} accentColor={PROJECT_ACCENT.mirazur}>
            <XuntaChapterScene />
          </DiagonalWipeLayer>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={MIRAZUR_START} durationInFrames={MIRAZUR_GLIMPSE_DURATION + TAIL} name="mirazur">
        <AbsoluteFill style={{ zIndex: 1 }}>
          <DiagonalWipeLayer contentDuration={MIRAZUR_GLIMPSE_DURATION} accentColor={PROJECT_ACCENT.closing}>
            <MirazurChapterScene />
          </DiagonalWipeLayer>
        </AbsoluteFill>
      </Sequence>

      {/* Closing keeps its OWN internal mechanics untouched (per spec): a
          plain opacity dissolve back to Opening's frame 0, not a
          DiagonalWipeLayer cut — there's no color wipe possible between two
          identical flat backgrounds. */}
      <Sequence from={CLOSING_START} durationInFrames={CLOSING_SCENE_DURATION} name="closing">
        <AbsoluteFill style={{ zIndex: 0 }}>
          <ClosingScene />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
}
