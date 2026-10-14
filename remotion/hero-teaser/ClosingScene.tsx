import { AbsoluteFill, Freeze, interpolate, useCurrentFrame } from "remotion";
import { ChatScene } from "./ChatScene";
import { DiagonalWipeLayer } from "./DiagonalWipeLayer";
import { ProjectLabel } from "./ProjectLabel";
import { NARRATOR, PROJECT_ACCENT, WIPE_BORDER_FADE_FRAMES, WIPE_FRAMES } from "./tokens";

// ── Scene 6 — Cierre/reposo, 60 frames total: the 4 project cards held in a
// static fan (42 solid frames), then the LOOP wipe back to the chat scene's
// very first frame (12 wipe + 6 border-fade, the same two spec'd durations
// as every other cut) — all inside this scene's own 60-frame budget, since
// there's no real "scene 7" Sequence for it to borrow overlap time from the
// way the other 5 cuts do (see hero-teaser-video.tsx's accounting comment).
//
// Structure mirrors every other cut: the incoming layer (here, a FROZEN
// copy of ChatScene pinned to ITS OWN frame 0 via <Freeze>, previewing the
// loop's restart) sits unclipped underneath; the outgoing layer (the fan)
// sits on top, wrapped in the same DiagonalWipeLayer used everywhere else.
export const CLOSING_SOLID_DURATION = 42;
export const CLOSING_SCENE_DURATION = CLOSING_SOLID_DURATION + WIPE_FRAMES + WIPE_BORDER_FADE_FRAMES; // 60

type Card = { label: string; gradient: string; accent: string; dark: boolean };
const CARDS: Card[] = [
  { label: "ENOTURISMO MADRID", gradient: "linear-gradient(135deg, #1a0a0f 0%, #4a1528 60%, #8c3a5a 100%)", accent: PROJECT_ACCENT.madrid, dark: true },
  { label: "BULLIPEDIA", gradient: "linear-gradient(135deg, #f7f7f2 0%, #eef3df 100%)", accent: PROJECT_ACCENT.bullipedia, dark: false },
  { label: "XUNTA / GNOSS", gradient: "linear-gradient(135deg, #001515 0%, #0d3d3d 60%, #2a8c8c 100%)", accent: PROJECT_ACCENT.xunta, dark: true },
  { label: "MIRAZUR", gradient: "linear-gradient(135deg, #1a2a0d 0%, #3d5c1e 60%, #7aad3a 100%)", accent: PROJECT_ACCENT.mirazur, dark: true },
];
const ANGLES = [-12, -8, 8, 12];
// Spaced so adjacent 300px-wide cards DON'T overlap (320px between centers,
// a 20px gap) — an earlier pass used 227px spacing, which overlapped each
// card's right edge with the next one's left edge by ~70px and silently
// clipped the longer labels ("ENOTURISMO MADRID", "XUNTA / GNOSS") behind
// the following card. The rotateY tilts + perspective still read as a fan
// without literal card overlap.
const OFFSETS_X = [-480, -160, 160, 480];

function FanContent() {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: NARRATOR.bg, alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "relative", width: "100%", height: "100%", perspective: 1600 }}>
        {CARDS.map((card, i) => {
          const enter = interpolate(frame, [i * 3, i * 3 + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div
              key={card.label}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 300,
                height: 400,
                marginLeft: -150,
                marginTop: -200,
                opacity: enter,
                transform: `translate(${OFFSETS_X[i]}px, ${Math.abs(ANGLES[i]) * 2}px) translateY(${(1 - enter) * 24}px) rotateY(${ANGLES[i]}deg)`,
                transformStyle: "preserve-3d",
                borderRadius: 18,
                overflow: "hidden",
                background: card.gradient,
                border: "1px solid rgba(255,255,255,0.14)",
                boxShadow: "0 30px 70px rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "flex-end",
                padding: 24,
                boxSizing: "border-box",
              }}
            >
              <ProjectLabel text={card.label} accentColor={card.accent} persist fixed={false} textColor={card.dark ? "#ffffff" : "#1a1a1a"} />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

export function ClosingScene() {
  return (
    <AbsoluteFill>
      {/* Incoming (unclipped): the loop's restart, frozen at the chat
          scene's own frame 0 — revealed as the fan's wipe recedes. */}
      <AbsoluteFill>
        <Freeze frame={0}>
          <ChatScene />
        </Freeze>
      </AbsoluteFill>
      {/* Outgoing (clipped): the fan, wiping away in the scene's last
          12 + 6 frames exactly like every other top-level cut. */}
      <AbsoluteFill>
        <DiagonalWipeLayer contentDuration={CLOSING_SOLID_DURATION} accentColor={PROJECT_ACCENT.madrid}>
          <FanContent />
        </DiagonalWipeLayer>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
