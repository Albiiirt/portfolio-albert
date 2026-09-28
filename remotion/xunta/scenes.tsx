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

function fadeIn(frame: number, start: number, dur = 18) {
  return interpolate(frame, [start, start + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
}
function riseIn(frame: number, start: number, dur = 18, amount = 24) {
  return interpolate(frame, [start, start + dur], [amount, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
}

// ── 1. Identidad ────────────────────────────────────────────────────────────
export function IdentityScene() {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <TealBackdrop />
      <div style={{ position: "relative", textAlign: "center", opacity: fadeIn(frame, 6, 24) }}>
        <p
          style={{
            margin: "0 0 18px",
            fontFamily: SITE.fontDisplay,
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: SITE.accent,
            transform: `translateY(${riseIn(frame, 6, 20, 14)}px)`,
          }}
        >
          08 · Producto a medida
        </p>
        <h1
          style={{
            margin: 0,
            fontFamily: SITE.fontDisplay,
            fontSize: 92,
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1,
            transform: `translateY(${riseIn(frame, 16, 26, 30)}px)`,
          }}
        >
          Galiciana Thesaurus
        </h1>
        <p
          style={{
            margin: "22px 0 0",
            fontFamily: SITE.fontDisplay,
            fontSize: 24,
            fontWeight: 600,
            color: "rgba(255,255,255,0.62)",
            transform: `translateY(${riseIn(frame, 36, 22, 16)}px)`,
          }}
        >
          Xunta de Galicia · vía GNOSS · 2026
        </p>
      </div>
    </AbsoluteFill>
  );
}

// ── 2. El reto ──────────────────────────────────────────────────────────────
export function ChallengeScene() {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: "0 220px" }}>
      <TealBackdrop />
      <div style={{ position: "relative", textAlign: "center" }}>
        <p
          style={{
            margin: "0 0 28px",
            fontFamily: SITE.fontDisplay,
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: SITE.accent,
            opacity: fadeIn(frame, 4, 16),
          }}
        >
          El reto
        </p>
        <h2
          style={{
            margin: 0,
            fontFamily: SITE.fontDisplay,
            fontSize: 52,
            fontWeight: 700,
            lineHeight: 1.28,
            color: "#fff",
            opacity: fadeIn(frame, 14, 26),
            transform: `translateY(${riseIn(frame, 14, 26, 22)}px)`,
          }}
        >
          El reto no era partir de un diseño ya definido, sino entender a fondo
          <span style={{ color: SITE.accent }}> cómo trabaja ese cliente</span> en su día a día.
        </h2>
      </div>
    </AbsoluteFill>
  );
}

// ── 3. El trabajo — Términos → Ficha → Trabajo (Kanban) ─────────────────────

const T_BOERHAAVE = TERMINOS.slice(0, 2); // t001, t002 (real prototype data)
const OTHER_RESULTS = TERMINOS.slice(2); // sin-duplicados rows shown before filtering

export function WorkScene() {
  const frame = useCurrentFrame();

  const typed = useTypedText("Boerhaave", 34, 2.6);
  const filtered = typed.length >= 3;

  // Términos → Ficha and Ficha → Trabajo both use the site's own product-
  // screen transition (opacity 0→1 + y:±14px, 500ms == 15 frames @30fps,
  // EASE) — same pattern as ProjectScreensShowcase's AnimatePresence swap.
  const terminosOpacity = interpolate(frame, [96, 111], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
  const terminosY = interpolate(frame, [96, 111], [0, -14], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
  const fichaEnter = interpolate(frame, [96, 111], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
  const fichaExit = interpolate(frame, [372, 387], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
  const fichaOpacity = Math.min(fichaEnter, fichaExit);
  const fichaY = interpolate(frame, [96, 111], [14, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE }) + interpolate(frame, [372, 387], [0, -14], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
  const trabajoOpacity = interpolate(frame, [372, 387], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
  const trabajoY = interpolate(frame, [372, 387], [14, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
  const trabajoVisible = frame >= 372;

  // Cell selection state, turned on by the scripted clicks below.
  const fechasSelected = frame >= 172;
  const notaSelected = frame >= 237;
  const pillActive = frame >= 302;

  const selection: Record<string, string> = {};
  if (fechasSelected) selection.fechasAsociadas = "t001";
  if (notaSelected) selection.notaBiografica = "t001";
  const nameClass: Record<string, NameClass> = { t001: "principal" };
  if (pillActive) nameClass.t002 = "4xx";

  const acceptClick = frame >= 372 && frame <= 378;

  const previewRows: { dt: string; dd: string; procedencia?: string }[] = [
    { dt: "Encabezamiento — Nombre de persona", dd: "Boerhaave, Hermann", procedencia: "término principal" },
  ];
  if (fechasSelected) previewRows.push({ dt: "Fechas asociadas", dd: "1668-1738", procedencia: "Boerhaave, Hermann" });
  if (notaSelected) previewRows.push({ dt: "Nota biográfica", dd: "Médico y botánico neerlandés, catedrático en Leiden.", procedencia: "Boerhaave, Hermann" });
  if (pillActive) previewRows.push({ dt: "Otras formas del nombre (4XX)", dd: "Boerhaave, H." });

  // Scripted cursor: search box -> "Ver propuesta" -> two table cells -> pill -> accept.
  const hops: CursorHop[] = [
    { from: { x: 62, y: 17 }, to: { x: 62, y: 17 }, fromFrame: 0, toFrame: 34 },
    { from: { x: 62, y: 17 }, to: { x: 85, y: 25 }, fromFrame: 62, toFrame: 90, click: true },
    { from: { x: 85, y: 25 }, to: { x: 36, y: 47 }, fromFrame: 132, toFrame: 172, click: true },
    { from: { x: 36, y: 47 }, to: { x: 36, y: 75 }, fromFrame: 200, toFrame: 237, click: true },
    { from: { x: 36, y: 75 }, to: { x: 66, y: 30 }, fromFrame: 262, toFrame: 302, click: true },
    { from: { x: 66, y: 30 }, to: { x: 89, y: 93 }, fromFrame: 330, toFrame: 372, click: true },
  ];

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: "38px 140px" }}>
      <TealBackdrop />
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <BrowserFrame url={trabajoVisible ? "unificador.xunta.gal/trabajo" : "unificador.xunta.gal/terminos"}>
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            {/* ── Términos ── */}
            {frame < 372 && (
              <div style={{ position: "absolute", inset: 0, opacity: terminosOpacity, transform: `translateY(${terminosY}px)`, display: "flex", flexDirection: "column" }}>
                <GnossHeader tab="terminos" trabajoCount={GRUPOS.length} />
                <div style={{ display: "flex", gap: 28, padding: "22px 32px", flex: 1, minHeight: 0 }}>
                  <FacetSidebar />
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
                    <SearchBarLocal value={typed} />
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {(filtered ? T_BOERHAAVE : [...T_BOERHAAVE, ...OTHER_RESULTS]).map((t, i) => (
                        <ResultRow
                          key={t.id}
                          nombre={t.nombre}
                          idControl={t.ficha.idControl}
                          fuente={t.fuente}
                          estado={t.estado}
                          isGrupo={Boolean(t.grupoId)}
                          highlight={filtered && i === 0}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── Ficha ── */}
            {frame >= 96 && frame < 387 && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: fichaOpacity,
                  transform: `translateY(${fichaY}px)`,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <GnossHeader tab="ficha" trabajoCount={GRUPOS.length} />
                <div style={{ padding: "18px 32px", flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", gap: 10 }}>
                  <div>
                    <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: GNOSS.texto, fontFamily: GNOSS.font }}>Boerhaave, Hermann</h1>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
                      <StatusBadgeInline />
                      <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 30, background: GNOSS.successBg, color: GNOSS.success }}>92% de coincidencia</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <EsquemaToggle />
                  </div>
                  <ComparativeTable
                    docs={T_BOERHAAVE.map((doc) => ({
                      id: doc.id,
                      nombre: doc.nombre,
                      idControl: doc.ficha.idControl,
                      formasVariantes: doc.ficha.formasVariantes,
                      fechasAsociadas: doc.ficha.fechasAsociadas,
                      fuenteCatalogacion: doc.ficha.fuenteCatalogacion,
                      notaBiografica: doc.ficha.notaBiografica,
                    }))}
                    selection={selection}
                    nameClass={nameClass}
                    activePill={pillActive && frame < 320 ? { doc: "t002", tipo: "4xx" } : null}
                  />
                  <PreviewPanel
                    rows={previewRows}
                    pulse={(frame >= 172 && frame - 172 < 12) || (frame >= 237 && frame - 237 < 12) || (frame >= 302 && frame - 302 < 12)}
                  />
                  <FooterActions acceptActive={acceptClick} />
                </div>
              </div>
            )}

            {/* ── Trabajo (Kanban) ── */}
            {trabajoVisible && (
              <div style={{ position: "absolute", inset: 0, opacity: trabajoOpacity, transform: `translateY(${trabajoY}px)` }}>
                <TrabajoKanban frame={frame} />
              </div>
            )}

            {frame < 372 && <SimCursor hops={hops} />}
          </div>
        </BrowserFrame>
      </div>
    </AbsoluteFill>
  );
}

function SearchBarLocal({ value }: { value: string }) {
  const frame = useCurrentFrame();
  const showCaret = frame < 60 && frame % 24 < 12;
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

// Boerhaave's group (g001) is always "En revisión" for the duration of the
// Ficha beat, so this doesn't need to take an `estado` prop like the real
// StatusBadge does.
function StatusBadgeInline() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 10px",
        borderRadius: 30,
        fontSize: 12,
        fontWeight: 700,
        background: GNOSS.infoBg,
        color: GNOSS.info,
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: GNOSS.info }} />
      En revisión
    </span>
  );
}

// Kanban board with Boerhaave's card physically arcing from "En revisión" to
// "Revisado" — a parabola (x eased linearly, y dips up via a sine bump), not
// a fade, ~1s, ease-out with no overshoot, landing frame drives the counters.
function TrabajoKanban({ frame }: { frame: number }) {
  const local = frame - 372;
  const flightStart = 10; // 382
  const flightEnd = 40; // 412 -> 1.0s @30fps
  const flying = local >= flightStart && local < flightEnd;
  const landed = local >= flightEnd;

  const columnRect: Record<string, { x: number; y: number }> = {
    revision: { x: 27, y: 30 },
    revisado: { x: 52, y: 30 },
  };

  const t = interpolate(local, [flightStart, flightEnd], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
  const arcX = columnRect.revision.x + (columnRect.revisado.x - columnRect.revision.x) * t;
  const arcLift = Math.sin(Math.PI * t) * 10; // upward parabolic bump
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
              <KanbanCard key={g.id} names={[g.nombrePrincipal]} docsCount={g.terminoIds.length} confianza={g.confianza} />
            ))}
          </KanbanColumn>
          <KanbanColumn estado="no-duplicado" count={bloqueadoCards.length}>
            {bloqueadoCards.map((g) => (
              <KanbanCard key={g.id} names={[g.nombrePrincipal]} docsCount={g.terminoIds.length} confianza={g.confianza} dimmed />
            ))}
          </KanbanColumn>
        </div>
      </div>

      {/* Flying card, absolutely positioned over the board while in flight */}
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
  const frame = useCurrentFrame();
  const revisadoCards = GRUPOS.filter((g) => g.estado === "revisado" || g.id === "g001");
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: "0 220px" }}>
      <TealBackdrop />
      {/* Faint Kanban "Revisado" backdrop, per spec */}
      <div style={{ position: "absolute", right: 90, bottom: 70, width: 340, opacity: 0.22, filter: "blur(0.4px)" }}>
        <KanbanColumn estado="revisado" count={revisadoCards.length} style={{ background: "rgba(255,255,255,0.08)" }}>
          {revisadoCards.map((g) => (
            <KanbanCard key={g.id} names={[g.nombrePrincipal]} docsCount={g.terminoIds.length} confianza={g.confianza} style={{ background: "rgba(255,255,255,0.92)" }} />
          ))}
        </KanbanColumn>
      </div>
      <div style={{ position: "relative", textAlign: "center", maxWidth: 1100 }}>
        <p style={{ margin: "0 0 22px", fontFamily: SITE.fontDisplay, fontSize: 18, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: SITE.accent, opacity: fadeIn(frame, 4, 16) }}>
          El resultado
        </p>
        <h2
          style={{
            margin: 0,
            fontFamily: SITE.fontDisplay,
            fontSize: 44,
            fontWeight: 700,
            lineHeight: 1.4,
            color: "#fff",
            opacity: fadeIn(frame, 14, 26),
            transform: `translateY(${riseIn(frame, 14, 26, 22)}px)`,
          }}
        >
          El cliente dio el visto bueno: el producto cumple con lo que necesitaba y hace su función.
          <span style={{ color: SITE.accent }}> Las personas que lo usan en su día a día lo encuentran intuitivo</span> y sencillo de manejar.
        </h2>
      </div>
    </AbsoluteFill>
  );
}

// ── 5. El aprendizaje ─────────────────────────────────────────────────────
export function LearningScene() {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: "0 220px" }}>
      <TealBackdrop />
      <div style={{ position: "relative", display: "flex", gap: 36, alignItems: "flex-start", maxWidth: 1180, opacity: fadeIn(frame, 4, 18) }}>
        <span
          style={{
            fontFamily: SITE.fontDisplay,
            fontSize: 96,
            fontWeight: 800,
            color: SITE.accent,
            lineHeight: 1,
            transform: `translateY(${riseIn(frame, 4, 20, 18)}px)`,
          }}
        >
          01
        </span>
        <div style={{ transform: `translateY(${riseIn(frame, 14, 24, 20)}px)` }}>
          <p style={{ margin: "0 0 14px", fontFamily: SITE.fontDisplay, fontSize: 18, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
            Lo que estoy aprendiendo
          </p>
          <p style={{ margin: 0, fontSize: 32, lineHeight: 1.55, color: "#fff", fontFamily: SITE.fontDisplay, fontWeight: 500 }}>
            Trabajar a través de un estudio intermediario (GNOSS) en vez de hablar directamente con el cliente final me enseñó a hacer las preguntas correctas para sacar información real de un brief ambiguo, en vez de dar por buena la primera referencia que llega.
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
}

// ── 6. Cierre ────────────────────────────────────────────────────────────
export function ClosingScene() {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <TealBackdrop />
      <div style={{ position: "relative", textAlign: "center", opacity: fadeIn(frame, 4, 20) }}>
        <h2
          style={{
            margin: 0,
            fontFamily: SITE.fontDisplay,
            fontSize: 56,
            fontWeight: 800,
            color: "#fff",
            transform: `translateY(${riseIn(frame, 4, 22, 20)}px)`,
          }}
        >
          Galiciana Thesaurus
        </h2>
        <p
          style={{
            margin: "16px 0 0",
            fontFamily: SITE.fontDisplay,
            fontSize: 20,
            fontWeight: 600,
            color: SITE.accent,
            transform: `translateY(${riseIn(frame, 18, 22, 16)}px)`,
          }}
        >
          Xunta de Galicia · vía GNOSS
        </p>
      </div>
    </AbsoluteFill>
  );
}
