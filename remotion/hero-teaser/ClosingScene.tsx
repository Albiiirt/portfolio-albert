import { AbsoluteFill, Freeze, interpolate, useCurrentFrame } from "remotion";
import { HeadlineText } from "./HeadlineText";
import { OpeningScene } from "./OpeningScene";
import { NARRATOR } from "./tokens";

// ── Capítulo 5 — cierre, tipografía pura, 60 frames (2.0s). Same flat dark
// bg as Capítulo 0, closing the loop back into it. "ALBERT CANADÉS" (wipe)
// and "PRODUCT DESIGNER" (tracking) mirror Capítulo 0's own DISEÑO/QUE SE
// USA split — one word per technique — using the site's own already-
// approved H1 copy (data/translations.ts es.hero: "Hola, soy Albert" /
// "diseñador" / "de producto"), not new marketing copy invented here.
//
// The last CLOSING_DISSOLVE_FRAMES are the loop seam: a FROZEN copy of
// OpeningScene's own frame 0 sits unclipped underneath (previewing the
// restart, same <Freeze> trick the previous build used for its own chat
// scene), while THIS scene's content simply fades out on top — a plain
// opacity crossfade, not a DiagonalWipeLayer cut, because both ends of this
// seam are the exact same flat background: there's nothing physically
// different to wipe between them.
const CLOSING_SOLID_DURATION = 42;
const CLOSING_DISSOLVE_FRAMES = 18;
export const CLOSING_SCENE_DURATION = CLOSING_SOLID_DURATION + CLOSING_DISSOLVE_FRAMES; // 60

const F = {
  nameStart: 0, // wipe 0–12, tracks 12–24
  roleStart: 16, // track-only 16–28
};

function ClosingContent() {
  const frame = useCurrentFrame();
  const dissolveOpacity = interpolate(frame, [CLOSING_SOLID_DURATION, CLOSING_SCENE_DURATION], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: NARRATOR.bg, alignItems: "center", justifyContent: "center", opacity: dissolveOpacity }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
        <HeadlineText text="ALBERT CANADÉS" startFrame={F.nameStart} fontSize={88} textAlign="center" />
        <HeadlineText text="PRODUCT DESIGNER" startFrame={F.roleStart} fontSize={40} textAlign="center" mode="track" color="rgba(255,255,255,0.75)" />
      </div>
    </AbsoluteFill>
  );
}

export function ClosingScene() {
  return (
    <AbsoluteFill>
      {/* Incoming (unclipped): the loop's restart, frozen at Capítulo 0's
          own frame 0 — revealed as the closing content's opacity fades. */}
      <AbsoluteFill>
        <Freeze frame={0}>
          <OpeningScene />
        </Freeze>
      </AbsoluteFill>
      {/* Outgoing: this chapter's own content, plain-dissolving away in its
          last CLOSING_DISSOLVE_FRAMES. */}
      <AbsoluteFill>
        <ClosingContent />
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
