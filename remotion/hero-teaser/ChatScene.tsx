import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Caret, SimCursor, type CursorHop, useTypedText } from "../shared/Cursor";
import { ThinkingOrb } from "./ThinkingOrb";
import { NARRATOR } from "./tokens";

// ── Scene 1 — simulated chat, ~154 frames (~5.1s). Spec gave an
// approximate 130-frame/~8–40/~40–58/~58–92/~92–122 breakdown; those
// windows assume the two sentences type at the cited 2.2 / 1.6
// frames/char, which alone would take ~154 + ~127 = 281 frames for the two
// full sentences — already more than double the whole scene's budget.
// Kept here: the exact wording, the beat ORDER (type → orb → type → click),
// and useTypedText itself. Adjusted: typing speed, compressed to ~0.6
// frames/char (still a visible letter-by-letter reveal, not instant) so
// both full sentences fit, and the scene extended from ~130 to 154 frames
// (+24, pulled from the Closing scene's own slack — see hero-teaser-video
// for the full 449-frame accounting) to give it breathing room. Documented
// in the task's final summary too.
const USER_TEXT = "Quiero ir a una cata de vino cerca de Madrid este finde, ¿alguna idea?";
const ASSISTANT_TEXT = "Mira esto — bodegas de San Martín de Valdeiglesias con cata y visitas guiadas 🍷";

const F = {
  panelIn: 8,
  userTypeEnd: 50, // 42 frames, ~0.6 frames/char over 70 chars
  orbStart: 58,
  orbEnd: 80,
  assistantTypeEnd: 124, // 44 frames, ~0.557 frames/char over 79 chars
  clickLand: 146,
};

export const CHAT_SCENE_DURATION = 154;

export function ChatScene() {
  const frame = useCurrentFrame();

  const panelOpacity = interpolate(frame, [0, F.panelIn], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const panelY = interpolate(frame, [0, F.panelIn], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const userTyped = useTypedText(USER_TEXT, F.panelIn, (F.userTypeEnd - F.panelIn) / USER_TEXT.length);
  const userCaret = frame >= F.panelIn && frame < F.orbStart && Math.floor(frame / 10) % 2 === 0;

  const showOrb = frame >= F.orbStart && frame < F.orbEnd;
  const assistantTyped = useTypedText(ASSISTANT_TEXT, F.orbEnd, (F.assistantTypeEnd - F.orbEnd) / ASSISTANT_TEXT.length);
  const assistantCaret = frame >= F.orbEnd && frame < F.clickLand && Math.floor(frame / 10) % 2 === 0;
  const assistantBubbleVisible = frame >= F.orbStart;

  const hops: CursorHop[] = [
    { from: { x: 78, y: 92 }, to: { x: 78, y: 92 }, fromFrame: 0, toFrame: F.assistantTypeEnd },
    { from: { x: 78, y: 92 }, to: { x: 46, y: 53 }, fromFrame: F.assistantTypeEnd, toFrame: F.clickLand, click: true },
  ];

  return (
    <AbsoluteFill style={{ background: NARRATOR.bg, alignItems: "center", justifyContent: "center" }}>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 60% 50% at 50% 42%, rgba(255,255,255,0.05) 0%, transparent 70%)" }} />
      <div
        style={{
          position: "relative",
          opacity: panelOpacity,
          transform: `translateY(${panelY}px)`,
          width: 900,
          borderRadius: 24,
          border: `1px solid ${NARRATOR.panelBorder}`,
          background: NARRATOR.panelBg,
          boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
          padding: "44px 48px",
          display: "flex",
          flexDirection: "column",
          gap: 22,
          fontFamily: NARRATOR.fontDisplay,
        }}
      >
        {/* User bubble — filled, right-aligned */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div
            style={{
              maxWidth: 640,
              padding: "20px 26px",
              borderRadius: "20px 20px 4px 20px",
              background: NARRATOR.bubbleUserBg,
              color: NARRATOR.textPrimary,
              fontSize: 23,
              lineHeight: 1.4,
              fontWeight: 500,
            }}
          >
            {userTyped}
            <Caret visible={userCaret} color={NARRATOR.textPrimary} />
          </div>
        </div>

        {/* Assistant bubble — outline only, left-aligned */}
        {assistantBubbleVisible && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div
              style={{
                minWidth: showOrb ? 96 : undefined,
                maxWidth: 640,
                padding: "20px 26px",
                borderRadius: "20px 20px 20px 4px",
                border: `1.5px solid ${NARRATOR.bubbleAssistantBorder}`,
                color: NARRATOR.textSecondary,
                fontSize: 23,
                lineHeight: 1.4,
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
              }}
            >
              {showOrb ? <ThinkingOrb size={48} /> : (
                <span>
                  {assistantTyped}
                  <Caret visible={assistantCaret} color={NARRATOR.textSecondary} />
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      <SimCursor hops={hops} pointerFill="#ffffff" pointerStroke="#1f2430" rippleColor="#ffffff" />
    </AbsoluteFill>
  );
}
