import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { EASE, GNOSS, SITE } from "./tokens";
import { GRUPOS, TERMINOS } from "./data";
import {
  BrowserFrame,
  ComparativeTable,
  EsquemaToggle,
  FacetSidebar,
  FooterActions,
  GnossHeader,
  KanbanCard,
  KanbanColumn,
  PreviewPanel,
  ResultRow,
  type NameClass,
} from "./ui";
import { Caret, SimCursor, type CursorHop, useTypedText } from "./Cursor";
import { Icon } from "./Icon";

// ── Shared teal backdrop (real hero gradient) ──────────────────────────────
function TealBackdrop() {
  return (
    <AbsoluteFill style={{ background: SITE.gradient }}>
      <AbsoluteFill
        style={{
          background: "radial-gradient(ellipse 70% 60% at 75% 35%, rgba(42,140,140,0.3) 0%, transparent 70%)",
        }}
      />
    </AbsoluteFill>
  );
}

function fadeIn(frame: number, start: number, dur = 10) {
  return interpolate(frame, [start, start + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
}
function riseIn(frame: number, start: number, dur = 10, amount = 16) {
  return interpolate(frame, [start, start + dur], [amount, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
}

// ── Brief "chapter card" used for Identidad / El reto / El resultado /
// El aprendizaje / Cierre — a short title + one line, on screen for ~1.5–2s,
// not a paragraph-length block. Per Albert's note (2026-09-28): the video
// should read mostly as interface in use, these are transitions between
// beats, not scenes of their own.
function ChapterCard({
  eyebrow,
  title,
  line,
  titleSize = 44,
}: {
  eyebrow?: string;
  title: string;
  line?: string;
  titleSize?: number;
}) {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: "0 220px" }}>
      <TealBackdrop />
      <div style={{ position: "relative", textAlign: "center" }}>
        {eyebrow && (
          <p
            style={{
              margin: "0 0 14px",
              fontFamily: SITE.fontDisplay,
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: SITE.accent,
              opacity: fadeIn(frame, 2, 8),
            }}
          >
            {eyebrow}
          </p>
        )}
        <h2
          style={{
            margin: 0,
            fontFamily: SITE.fontDisplay,
            fontSize: titleSize,
            fontWeight: 800,
            lineHeight: 1.1,
            color: "#fff",
            opacity: fadeIn(frame, 4, 10),
            transform: `translateY(${riseIn(frame, 4, 10, 14)}px)`,
          }}
        >
          {title}
        </h2>
        {line && (
          <p
            style={{
              margin: "14px 0 0",
              fontFamily: SITE.fontDisplay,
              fontSize: 20,
              fontWeight: 600,
              color: "rgba(255,255,255,0.62)",
              opacity: fadeIn(frame, 8, 10),
            }}
          >
            {line}
          </p>
        )}
      </div>
    </AbsoluteFill>
  );
}

// ── 1. Identidad ────────────────────────────────────────────────────────────
export function IdentityScene() {
  return <ChapterCard eyebrow="08 · Producto a medida" title="Galiciana Thesaurus" line="Xunta de Galicia · vía GNOSS · 2026" titleSize={56} />;
}

// ── 2. El reto ──────────────────────────────────────────────────────────────
export function ChallengeScene() {
  return <ChapterCard eyebrow="El reto" title="Entender cómo trabaja el cliente, no partir de un diseño ya hecho." titleSize={38} />;
}

// ── 3. El trabajo — Términos → Ficha → Trabajo → Ficha 2 → Trabajo ─────────
//
// Timeline (local frames, this scene only):
//  0–260   Términos: facet toggle (Pendiente ⇄ En revisión), search+filter, "Ver propuesta"
//  235–575 Ficha (Boerhaave): 2 cell selections, MARC⇄ISAAR schema toggle, 4XX pill, Aceptar y unificar
//  565–715 Trabajo (Kanban): arced card transition, click a second card
//  700–865 Ficha 2 (Covarrubias de Leiva, 3 documents, already revisado): glance + "Volver al tablero"
//  850–980 Trabajo (Kanban): final hold
const T_BOERHAAVE = TERMINOS.filter((t) => t.grupoId === "g001"); // t001, t002
const T_RICHELIEU = TERMINOS.filter((t) => t.grupoId === "g002"); // t003, t004
const T_COVARRUBIAS = TERMINOS.filter((t) => t.grupoId === "g003"); // t005, t006, t007
const T_SIN_DUPLICADOS = TERMINOS.filter((t) => !t.grupoId);

function docFicha(t: (typeof TERMINOS)[number]) {
  return {
    id: t.id,
    nombre: t.nombre,
    idControl: t.ficha.idControl,
    formasVariantes: t.ficha.formasVariantes,
    fechasAsociadas: t.ficha.fechasAsociadas,
    fuenteCatalogacion: t.ficha.fuenteCatalogacion,
    notaBiografica: t.ficha.notaBiografica,
  };
}

// Frame checkpoints — named so the cursor script and the state below read
// off the same timeline instead of magic numbers repeated twice.
const F = {
  facetPendiente: 40,
  facetRevision: 100,
  typeStart: 132,
  verPropuesta: 215,
  // Each screen swap is sequential — the old screen fully fades+slides out
  // before the new one fades+slides in (like AnimatePresence mode="wait" in
  // ProjectScreensShowcase), rather than a true simultaneous crossfade.
  // Overlapping two unrelated, detailed layouts (a table vs. a kanban board)
  // at 50/50 opacity reads as double-exposed ghosting, not a clean dissolve.
  terminosOut: [222, 229] as [number, number],
  fichaIn: [230, 237] as [number, number],
  clickFechas: 285,
  clickNota: 345,
  clickIsaar: 400,
  clickMarc: 452,
  clickPill: 505,
  accept: 560,
  fichaOut: [560, 567] as [number, number],
  trabajoIn: [568, 575] as [number, number],
  clickCard2: 695,
  trabajo1Out: [695, 702] as [number, number],
  ficha2In: [703, 710] as [number, number],
  clickVolver: 845,
  ficha2Out: [845, 852] as [number, number],
  trabajo2In: [853, 860] as [number, number],
};

export function WorkScene() {
  const frame = useCurrentFrame();

  // ── Términos state ──
  const activeEstado = frame >= F.facetRevision ? "revision" : frame >= F.facetPendiente ? "pendiente" : "revision";
  const typed = useTypedText("Boerhaave", F.typeStart, 2.4);
  // Before the first facet click: the full unfiltered mix. After either
  // facet click: only that estado's rows (a real filter, not decoration).
  const terminosList = frame < F.facetPendiente ? [...T_BOERHAAVE, ...T_RICHELIEU, ...T_SIN_DUPLICADOS] : activeEstado === "pendiente" ? T_RICHELIEU : T_BOERHAAVE;

  const terminosOpacity = interpolate(frame, F.terminosOut, [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
  const terminosY = interpolate(frame, F.terminosOut, [0, -14], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
  const terminosVisible = frame < F.fichaIn[0];

  // ── Ficha 1 (Boerhaave) state ──
  const fichaEnter = interpolate(frame, F.fichaIn, [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
  const fichaExit = interpolate(frame, F.fichaOut, [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
  const fichaOpacity = Math.min(fichaEnter, fichaExit);
  const fichaY =
    interpolate(frame, F.fichaIn, [14, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE }) +
    interpolate(frame, F.fichaOut, [0, -14], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
  const fichaVisible = frame >= F.fichaIn[0] && frame < F.trabajoIn[0];

  const fechasSelected = frame >= F.clickFechas;
  const notaSelected = frame >= F.clickNota;
  const pillActive = frame >= F.clickPill;
  const esquema1: "marc" | "isaar" = frame >= F.clickIsaar && frame < F.clickMarc ? "isaar" : "marc";

  const selection1: Record<string, string> = {};
  if (fechasSelected) selection1.fechasAsociadas = "t001";
  if (notaSelected) selection1.notaBiografica = "t001";
  const nameClass1: Record<string, NameClass> = { t001: "principal" };
  if (pillActive) nameClass1.t002 = "4xx";

  const previewRows1: { dt: string; dd: string; procedencia?: string }[] = [
    { dt: "Encabezamiento — Nombre de persona", dd: "Boerhaave, Hermann", procedencia: "término principal" },
  ];
  if (fechasSelected) previewRows1.push({ dt: "Fechas asociadas", dd: "1668-1738", procedencia: "Boerhaave, Hermann" });
  if (notaSelected) previewRows1.push({ dt: "Nota biográfica", dd: "Médico y botánico neerlandés, catedrático en Leiden.", procedencia: "Boerhaave, Hermann" });
  if (pillActive) previewRows1.push({ dt: "Otras formas del nombre (4XX)", dd: "Boerhaave, H." });

  // ── Trabajo (Kanban) state ──
  const trabajo1Enter = interpolate(frame, F.trabajoIn, [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
  const trabajo1Exit = interpolate(frame, F.trabajo1Out, [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
  const trabajo1Opacity = Math.min(trabajo1Enter, trabajo1Exit);
  const trabajo1Y =
    interpolate(frame, F.trabajoIn, [14, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE }) +
    interpolate(frame, F.trabajo1Out, [0, -14], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
  const trabajo1Visible = frame >= F.trabajoIn[0] && frame < F.ficha2In[0];

  // ── Ficha 2 (Covarrubias de Leiva — already revisado, 3 documents) ──
  const ficha2Enter = interpolate(frame, F.ficha2In, [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
  const ficha2Exit = interpolate(frame, F.ficha2Out, [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
  const ficha2Opacity = Math.min(ficha2Enter, ficha2Exit);
  const ficha2Visible = frame >= F.ficha2In[0] && frame < F.trabajo2In[0];
  const selection2: Record<string, string> = { idControl: "t005", fechasAsociadas: "t005", fuenteCatalogacion: "t005", notaBiografica: "t005" };
  const nameClass2: Record<string, NameClass> = { t005: "principal", t006: "4xx", t007: "4xx" };
  const previewRows2 = [
    { dt: "Encabezamiento — Nombre de persona", dd: "Covarrubias de Leiva, Diego", procedencia: "término principal" },
    { dt: "Fechas asociadas", dd: "1512-1577", procedencia: "Covarrubias de Leiva, Diego" },
    { dt: "Nota biográfica", dd: "Jurista y obispo español, autor de tratados canónicos.", procedencia: "Covarrubias de Leiva, Diego" },
    { dt: "Otras formas del nombre (4XX)", dd: "Covarrubias, Diego de; Covarrubias y Leyva, D." },
  ];

  // ── Trabajo (Kanban), second time — final hold ──
  const trabajo2Opacity = interpolate(frame, F.trabajo2In, [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
  const trabajo2Y = interpolate(frame, F.trabajo2In, [14, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
  const trabajo2Visible = frame >= F.trabajo2In[0];

  // ── Scripted cursor — one continuous script across every screen (position
  // is always relative to the same BrowserFrame, so it keeps travelling
  // instead of snapping between screens). Hidden once the final hold starts.
  const hops: CursorHop[] = [
    { from: { x: 62, y: 12 }, to: { x: 62, y: 12 }, fromFrame: 0, toFrame: 15 },
    { from: { x: 62, y: 12 }, to: { x: 16, y: 41 }, fromFrame: 15, toFrame: F.facetPendiente, click: true },
    { from: { x: 16, y: 41 }, to: { x: 16, y: 33 }, fromFrame: F.facetPendiente + 25, toFrame: F.facetRevision, click: true },
    { from: { x: 16, y: 33 }, to: { x: 62, y: 17 }, fromFrame: F.facetRevision + 15, toFrame: F.typeStart, click: false },
    { from: { x: 62, y: 17 }, to: { x: 85, y: 25 }, fromFrame: F.typeStart + 45, toFrame: F.verPropuesta, click: true },
    { from: { x: 85, y: 25 }, to: { x: 36, y: 47 }, fromFrame: F.fichaIn[1] + 8, toFrame: F.clickFechas, click: true },
    { from: { x: 36, y: 47 }, to: { x: 36, y: 71 }, fromFrame: F.clickFechas + 20, toFrame: F.clickNota, click: true },
    { from: { x: 36, y: 71 }, to: { x: 33, y: 24 }, fromFrame: F.clickNota + 15, toFrame: F.clickIsaar, click: true },
    { from: { x: 33, y: 24 }, to: { x: 20, y: 24 }, fromFrame: F.clickIsaar + 22, toFrame: F.clickMarc, click: true },
    { from: { x: 20, y: 24 }, to: { x: 66, y: 30 }, fromFrame: F.clickMarc + 15, toFrame: F.clickPill, click: true },
    { from: { x: 66, y: 30 }, to: { x: 89, y: 92 }, fromFrame: F.clickPill + 20, toFrame: F.accept, click: true },
    { from: { x: 89, y: 92 }, to: { x: 55, y: 46 }, fromFrame: F.trabajoIn[1] + 45, toFrame: F.clickCard2, click: true },
    { from: { x: 55, y: 46 }, to: { x: 86, y: 18 }, fromFrame: F.ficha2In[1] + 20, toFrame: F.clickVolver, click: true },
  ];

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: "38px 140px" }}>
      <TealBackdrop />
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <BrowserFrame
          url={
            trabajo1Visible || trabajo2Visible
              ? "unificador.xunta.gal/trabajo"
              : fichaVisible || ficha2Visible
                ? "unificador.xunta.gal/ficha"
                : "unificador.xunta.gal/terminos"
          }
        >
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            {/* ── Términos ── */}
            {terminosVisible && (
              <div style={{ position: "absolute", inset: 0, opacity: terminosOpacity, transform: `translateY(${terminosY}px)`, display: "flex", flexDirection: "column" }}>
                <GnossHeader tab="terminos" trabajoCount={GRUPOS.length} />
                <div style={{ display: "flex", gap: 28, padding: "22px 32px", flex: 1, minHeight: 0 }}>
                  <FacetSidebar activeEstado={activeEstado} flashing={frame - F.facetPendiente < 10 || frame - F.facetRevision < 10} />
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
                    <SearchBarLocal value={typed} />
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {terminosList.map((t, i) => (
                        <ResultRow
                          key={t.id}
                          nombre={t.nombre}
                          idControl={t.ficha.idControl}
                          fuente={t.fuente}
                          estado={t.estado}
                          isGrupo={Boolean(t.grupoId)}
                          highlight={typed.length > 0 && i === 0}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── Ficha 1 — Boerhaave ── */}
            {fichaVisible && (
              <FichaScreen
                title="Boerhaave, Hermann"
                confianza={92}
                esquema={esquema1}
                docs={T_BOERHAAVE.map(docFicha)}
                selection={selection1}
                nameClass={nameClass1}
                activePill={pillActive && frame < F.clickPill + 18 ? { doc: "t002", tipo: "4xx" } : null}
                previewRows={previewRows1}
                previewPulse={frame - F.clickFechas < 12 || frame - F.clickNota < 12 || frame - F.clickPill < 12}
                esquemaFlashing={frame - F.clickIsaar < 10 ? "isaar" : frame - F.clickMarc < 10 ? "marc" : null}
                acceptActive={frame >= F.accept && frame < F.accept + 6}
                opacity={fichaOpacity}
                y={fichaY}
                showBackLink={false}
              />
            )}

            {/* ── Trabajo (Kanban) — first pass: Boerhaave's arc, then click a second card ── */}
            {trabajo1Visible && (
              <div style={{ position: "absolute", inset: 0, opacity: trabajo1Opacity, transform: `translateY(${trabajo1Y}px)` }}>
                <TrabajoKanban frame={frame} arcStart={F.trabajoIn[1]} highlightCard2={frame - F.clickCard2 > -20 && frame < F.clickCard2 + 8} />
              </div>
            )}

            {/* ── Ficha 2 — Covarrubias de Leiva (already revisado, 3 docs) ── */}
            {ficha2Visible && (
              <FichaScreen
                title="Covarrubias de Leiva, Diego"
                confianza={97}
                estadoLabel="Revisado"
                estadoColor={{ fg: GNOSS.success, bg: GNOSS.successBg }}
                esquema="marc"
                docs={T_COVARRUBIAS.map(docFicha)}
                selection={selection2}
                nameClass={nameClass2}
                activePill={null}
                previewRows={previewRows2}
                previewPulse={false}
                esquemaFlashing={null}
                acceptActive={false}
                opacity={ficha2Opacity}
                y={interpolate(frame, F.ficha2In, [14, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE }) + interpolate(frame, F.ficha2Out, [0, -14], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE })}
                showBackLink
                backLinkActive={frame >= F.clickVolver && frame < F.clickVolver + 6}
              />
            )}

            {/* ── Trabajo (Kanban) — final hold ── */}
            {trabajo2Visible && (
              <div style={{ position: "absolute", inset: 0, opacity: trabajo2Opacity, transform: `translateY(${trabajo2Y}px)` }}>
                <TrabajoKanban frame={frame} arcStart={F.trabajoIn[1]} highlightCard2={false} />
              </div>
            )}

            {frame < F.clickVolver + 10 && <SimCursor hops={hops} />}
          </div>
        </BrowserFrame>
      </div>
    </AbsoluteFill>
  );
}

function SearchBarLocal({ value }: { value: string }) {
  const frame = useCurrentFrame();
  const showCaret = frame >= F.typeStart && frame < F.verPropuesta && frame % 24 < 12;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: GNOSS.blanco,
        border: `1px solid ${GNOSS.grisBorde}`,
        borderRadius: 10,
        padding: "4px 4px 4px 14px",
        fontFamily: GNOSS.font,
      }}
    >
      <Icon name="search" size={20} color={GNOSS.textoClaro} />
      <span style={{ flex: 1, padding: "10px 4px", fontSize: 14, color: GNOSS.texto }}>
        {value || <span style={{ color: GNOSS.textoClaro }}>Buscar término por nombre…</span>}
        <Caret visible={showCaret} />
      </span>
      <span style={{ background: GNOSS.primario, color: GNOSS.blanco, borderRadius: 7, padding: "9px 18px", fontSize: 13, fontWeight: 600 }}>Buscar</span>
    </div>
  );
}

// ── Shared Ficha layout — used by both Boerhaave (interactive) and
// Covarrubias de Leiva (static glance) so the two beats stay pixel-identical
// in chrome/typography, only the data and interactivity differ. ──
type FichaDoc = ReturnType<typeof docFicha>;
function FichaScreen({
  title,
  confianza,
  estadoLabel = "En revisión",
  estadoColor = { fg: GNOSS.info, bg: GNOSS.infoBg },
  esquema,
  docs,
  selection,
  nameClass,
  activePill,
  previewRows,
  previewPulse,
  esquemaFlashing,
  acceptActive,
  opacity,
  y,
  showBackLink,
  backLinkActive,
}: {
  title: string;
  confianza: number;
  estadoLabel?: string;
  estadoColor?: { fg: string; bg: string };
  esquema: "marc" | "isaar";
  docs: FichaDoc[];
  selection: Record<string, string>;
  nameClass: Record<string, NameClass>;
  activePill: { doc: string; tipo: NameClass } | null;
  previewRows: { dt: string; dd: string; procedencia?: string }[];
  previewPulse: boolean;
  esquemaFlashing: "marc" | "isaar" | null;
  acceptActive: boolean;
  opacity: number;
  y: number;
  showBackLink: boolean;
  backLinkActive?: boolean;
}) {
  return (
    <div style={{ position: "absolute", inset: 0, opacity, transform: `translateY(${y}px)`, display: "flex", flexDirection: "column" }}>
      <GnossHeader tab="ficha" trabajoCount={GRUPOS.length} />
      <div style={{ padding: "18px 32px", flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: GNOSS.texto, fontFamily: GNOSS.font }}>{title}</h1>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "4px 10px",
                  borderRadius: 30,
                  fontSize: 12,
                  fontWeight: 700,
                  background: estadoColor.bg,
                  color: estadoColor.fg,
                  fontFamily: GNOSS.font,
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: estadoColor.fg }} />
                {estadoLabel}
              </span>
              <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 30, background: GNOSS.successBg, color: GNOSS.success }}>{confianza}% de coincidencia</span>
            </div>
          </div>
          {showBackLink && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 14px",
                borderRadius: 8,
                border: `1px solid ${GNOSS.grisBorde}`,
                fontSize: 13,
                fontWeight: 600,
                color: GNOSS.textoMedio,
                fontFamily: GNOSS.font,
                transform: backLinkActive ? "scale(0.96)" : "scale(1)",
                boxShadow: backLinkActive ? `0 0 0 4px ${GNOSS.grisFondo}` : "none",
              }}
            >
              <Icon name="arrow_back" size={15} color={GNOSS.textoMedio} />
              Volver al tablero
            </span>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <EsquemaToggle active={esquema} flashing={esquemaFlashing} />
        </div>
        <ComparativeTable docs={docs} selection={selection} nameClass={nameClass} activePill={activePill} esquema={esquema} />
        <PreviewPanel rows={previewRows} pulse={previewPulse} />
        {!showBackLink && <FooterActions acceptActive={acceptActive} />}
      </div>
    </div>
  );
}

// Kanban board with Boerhaave's card physically arcing from "En revisión" to
// "Revisado" — a parabola (x eased linearly, y dips up via a sine bump), not
// a fade, ~1s, ease-out with no overshoot, landing frame drives the counters.
function TrabajoKanban({ frame, arcStart, highlightCard2 }: { frame: number; arcStart: number; highlightCard2: boolean }) {
  const local = frame - arcStart;
  const flightStart = 10;
  const flightEnd = 40; // 1.0s @30fps
  const flying = local >= flightStart && local < flightEnd;
  const landed = local >= flightEnd;

  const columnRect: Record<string, { x: number; y: number }> = {
    revision: { x: 27, y: 30 },
    revisado: { x: 52, y: 30 },
  };

  const t = interpolate(local, [flightStart, flightEnd], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
  const arcX = columnRect.revision.x + (columnRect.revisado.x - columnRect.revision.x) * t;
  const arcLift = Math.sin(Math.PI * t) * 10;
  const arcY = columnRect.revision.y - arcLift;
  const arcScale = 1 + Math.sin(Math.PI * t) * 0.04;

  const revisionCards = GRUPOS.filter((g) => g.estado === "revision" && g.id !== "g001");
  const revisadoCards = GRUPOS.filter((g) => g.estado === "revisado");
  const pendienteCards = GRUPOS.filter((g) => g.estado === "pendiente");
  const bloqueadoCards = GRUPOS.filter((g) => g.estado === "no-duplicado");

  const revisionCount = revisionCards.length + (flying || !landed ? 1 : 0);
  const revisadoCount = revisadoCards.length + (landed ? 1 : 0);

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
      <GnossHeader tab="trabajo" trabajoCount={GRUPOS.length} />
      <div style={{ padding: "22px 32px", flex: 1, minHeight: 0 }}>
        <h1 style={{ margin: "0 0 16px", fontSize: 20, fontWeight: 700, color: GNOSS.texto, fontFamily: GNOSS.font }}>Trabajo</h1>
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
          <KanbanColumn estado="pendiente" count={pendienteCards.length}>
            {pendienteCards.map((g) => (
              <KanbanCard key={g.id} names={[g.nombrePrincipal]} docsCount={g.terminoIds.length} confianza={g.confianza} />
            ))}
          </KanbanColumn>
          <KanbanColumn estado="revision" count={revisionCount}>
            {!landed && (
              <div style={{ opacity: flying ? 0 : 1 }}>
                <KanbanCard names={["Boerhaave, Hermann"]} docsCount={2} confianza={92} />
              </div>
            )}
            {revisionCards.map((g) => (
              <KanbanCard key={g.id} names={[g.nombrePrincipal]} docsCount={g.terminoIds.length} confianza={g.confianza} />
            ))}
          </KanbanColumn>
          <KanbanColumn estado="revisado" count={revisadoCount}>
            {landed && <KanbanCard names={["Boerhaave, Hermann"]} docsCount={2} confianza={92} style={{ boxShadow: GNOSS.shadowCardHover }} />}
            {revisadoCards.map((g) => (
              <KanbanCard
                key={g.id}
                names={[g.nombrePrincipal]}
                docsCount={g.terminoIds.length}
                confianza={g.confianza}
                style={
                  g.id === "g003" && highlightCard2
                    ? { transform: "scale(0.97)", boxShadow: `0 0 0 4px ${GNOSS.primarioHighlight}`, borderColor: GNOSS.primario }
                    : undefined
                }
              />
            ))}
          </KanbanColumn>
          <KanbanColumn estado="no-duplicado" count={bloqueadoCards.length}>
            {bloqueadoCards.map((g) => (
              <KanbanCard key={g.id} names={[g.nombrePrincipal]} docsCount={g.terminoIds.length} confianza={g.confianza} dimmed />
            ))}
          </KanbanColumn>
        </div>
      </div>

      {flying && (
        <div
          style={{
            position: "absolute",
            left: `${arcX}%`,
            top: `${arcY}%`,
            width: 232,
            transform: `translate(-50%, -50%) scale(${arcScale})`,
            zIndex: 50,
          }}
        >
          <KanbanCard names={["Boerhaave, Hermann"]} docsCount={2} confianza={92} style={{ boxShadow: "0 14px 34px rgba(20,24,32,0.28)" }} />
        </div>
      )}
    </div>
  );
}

// ── 4. El resultado ──────────────────────────────────────────────────────────
export function ResultScene() {
  return <ChapterCard eyebrow="El resultado" title="Aprobado por el cliente, validado por sus usuarios." titleSize={38} />;
}

// ── 5. El aprendizaje ─────────────────────────────────────────────────────
export function LearningScene() {
  return (
    <ChapterCard
      eyebrow="01 · Lo que estoy aprendiendo"
      title="Sacar requisitos reales de un brief ambiguo, sin dar la primera referencia por buena."
      titleSize={34}
    />
  );
}

// ── 6. Cierre ────────────────────────────────────────────────────────────
export function ClosingScene() {
  return <ChapterCard title="Galiciana Thesaurus" line="Xunta de Galicia · vía GNOSS" titleSize={48} />;
}
