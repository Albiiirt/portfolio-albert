// Thin ENO-flavored wrapper around remotion/shared/Cursor.tsx — same
// exported shape (SimCursor, useTypedText, Caret, CursorHop) that
// remotion/xunta/scenes.tsx expects from its own Cursor.tsx, so scenes.tsx
// here reads the same way, just pointed at ENO's ink color instead of
// GNOSS's.
import { Caret as SharedCaret, SimCursor as SharedSimCursor, cursorPositionAt, type CursorHop, type CursorPoint, useTypedText } from "../shared/Cursor";
import { ENO } from "./tokens";

export type { CursorHop, CursorPoint };
export { cursorPositionAt, useTypedText };

export function SimCursor({ hops }: { hops: CursorHop[] }) {
  return <SharedSimCursor hops={hops} pointerStroke={ENO.texto} rippleColor={ENO.acento} />;
}

export function Caret({ visible }: { visible: boolean }) {
  return <SharedCaret visible={visible} color={ENO.texto} />;
}
