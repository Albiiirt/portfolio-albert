import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { EASE, ENO, SITE } from "./tokens";
import { BODEGAS, RUTAS, getBodega, getBodegasDeRuta, getRuta } from "./data";
import {
  BodegaCard,
  BrowserFrame,
  DateChip,
  ExperienceCard,
  MapDecorative,
  NavBar,
  ReserveButton,
  RouteChip,
  RouteResultCard,
  SearchBar,
  SectionHeading,
} from "./ui";
import { SimCursor, type CursorHop, useTypedText } from "./Cursor";

// ── Shared wine-dark backdrop (real hero gradient) ─────────────────────────
function WineBackdrop() {
  return (
    <AbsoluteFill style={{ background: SITE.gradient }}>
      <AbsoluteFill
        style={{
          background: "radial-gradient(ellipse 70% 60% at 75% 35%, rgba(140,58,90,0.32) 0%, transparent 70%)",
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

// ── Brief "chapter card" — same role as remotion/xunta/scenes.tsx's own
// ChapterCard: a short title + one line between beats, not a paragraph.
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
      <WineBackdrop />
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
            lineHeight: 1.15,
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
  return <ChapterCard eyebrow="03 · Producto real, no prototipo" title="Enoturismo Madrid" line="Comunidad de Madrid · Rutas del vino · 2026" titleSize={56} />;
}

// ── 2. El reto ──────────────────────────────────────────────────────────────
export function ChallengeScene() {
  return <ChapterCard eyebrow="El reto" title="Bodegas, rutas y experiencias dispersas, en páginas que no ayudaban a reservar." titleSize={38} />;
}

// ── 3. El trabajo — Home → Ruta → Bodega → Experiencia/reserva ────────────
//
// Timeline (WorkScene-local frames, one continuous cursor script across all
// four beats since it's a single BrowserFrame the whole time):
//  0–245    Home: search "San Martín" typed, click ruta chip → filters the
//           results list below for real.
//  246–490  Ruta (San Martín de Valdeiglesias): 6-bodega grid, click a card.
//  491–735  Bodega (Cerro Almenara): gallery/desc, click an experience card.
//  736–980  Experiencia/reserva: click a date, click Reservar → confirmed,
//           final hold.
const RUTA_SLUG = "san-martin-de-valdeiglesias" as const;
const BODEGA_ID = "cerro-almenara" as const;
const EXPERIENCIA_ID = "cata-pisado" as const;

const F = {
  // Beat 1: Home
  typeStart: 25,
  chipClick: 118,
  homeOut: [238, 245] as [number, number],
  rutaIn: [246, 253] as [number, number],

  // Beat 2: Detalle de ruta
  bodegaClick: 420,
  rutaOut: [483, 490] as [number, number],
  bodegaIn: [491, 498] as [number, number],

  // Beat 3: Detalle de bodega
  expClick: 670,
  bodegaOut: [728, 735] as [number, number],
  expIn: [736, 743] as [number, number],

  // Beat 4: Experiencia / reserva
  dateClick: 810,
  reserveClick: 880,
};

export function WorkScene() {
  const frame = useCurrentFrame();

  const ruta = getRuta(RUTA_SLUG);
  const bodega = getBodega(BODEGA_ID);
  const experiencia = bodega.experiencias.find((e) => e.id === EXPERIENCIA_ID)!;
  const bodegasRuta = getBodegasDeRuta(RUTA_SLUG);

  // ── Home state ──
  const typed = useTypedText("San Martín", F.typeStart, 2.4);
  const caretVisible = frame >= F.typeStart && frame < F.chipClick && frame % 24 < 12;
  const rutaFiltered = frame >= F.chipClick;
  const homeResults = rutaFiltered ? RUTAS.filter((r) => r.slug === RUTA_SLUG) : RUTAS;
  const chipFlashing = frame - F.chipClick >= 0 && frame - F.chipClick < 10;

  const homeOpacity = interpolate(frame, F.homeOut, [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
  const homeY = interpolate(frame, F.homeOut, [0, -14], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
  const homeVisible = frame < F.rutaIn[0];

  // ── Ruta state ──
  const rutaEnter = interpolate(frame, F.rutaIn, [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
  const rutaExit = interpolate(frame, F.rutaOut, [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
  const rutaOpacity = Math.min(rutaEnter, rutaExit);
  const rutaY =
    interpolate(frame, F.rutaIn, [14, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE }) +
    interpolate(frame, F.rutaOut, [0, -14], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
  const rutaVisible = frame >= F.rutaIn[0] && frame < F.bodegaIn[0];
  const bodegaCardHighlight = frame >= F.bodegaClick && frame < F.bodegaOut[0];

  // ── Bodega state ──
  const bodegaEnter = interpolate(frame, F.bodegaIn, [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
  const bodegaExit = interpolate(frame, F.bodegaOut, [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
  const bodegaOpacity = Math.min(bodegaEnter, bodegaExit);
  const bodegaY =
    interpolate(frame, F.bodegaIn, [14, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE }) +
    interpolate(frame, F.bodegaOut, [0, -14], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
  const bodegaVisible = frame >= F.bodegaIn[0] && frame < F.expIn[0];
  const expCardHighlight = frame >= F.expClick && frame < F.bodegaOut[0];

  // ── Experiencia/reserva state ──
  const expEnter = interpolate(frame, F.expIn, [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
  const expOpacity = expEnter;
  const expY = interpolate(frame, F.expIn, [14, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
  const expVisible = frame >= F.expIn[0];
  const dateSelected = frame >= F.dateClick;
  const reservePressed = frame >= F.reserveClick && frame < F.reserveClick + 6;
  const reserveConfirmed = frame >= F.reserveClick + 8;

  // ── Scripted cursor — one continuous script across every screen. ──
  const hops: CursorHop[] = [
    { from: { x: 50, y: 21 }, to: { x: 50, y: 21 }, fromFrame: 0, toFrame: 15 },
    { from: { x: 50, y: 21 }, to: { x: 58, y: 32 }, fromFrame: 15, toFrame: F.chipClick, click: true },
    { from: { x: 58, y: 32 }, to: { x: 70, y: 46 }, fromFrame: F.chipClick + 20, toFrame: 200, click: false },
    { from: { x: 70, y: 46 }, to: { x: 32, y: 40 }, fromFrame: F.rutaIn[1] + 10, toFrame: 340, click: false },
    { from: { x: 32, y: 40 }, to: { x: 30, y: 44 }, fromFrame: 340, toFrame: F.bodegaClick, click: true },
    { from: { x: 30, y: 44 }, to: { x: 36, y: 30 }, fromFrame: F.bodegaIn[1] + 10, toFrame: 580, click: false },
    { from: { x: 36, y: 30 }, to: { x: 74, y: 72 }, fromFrame: 580, toFrame: F.expClick, click: true },
    { from: { x: 74, y: 72 }, to: { x: 40, y: 56 }, fromFrame: F.expIn[1] + 15, toFrame: F.dateClick, click: true },
    { from: { x: 40, y: 56 }, to: { x: 52, y: 79 }, fromFrame: F.dateClick + 20, toFrame: F.reserveClick, click: true },
  ];

  const url = homeVisible
    ? "enoturismo.comunidad.madrid"
    : rutaVisible
      ? `enoturismo.comunidad.madrid/rutas/${RUTA_SLUG}`
      : bodegaVisible
        ? `enoturismo.comunidad.madrid/bodegas/${BODEGA_ID}`
        : `enoturismo.comunidad.madrid/bodegas/${BODEGA_ID}/${EXPERIENCIA_ID}`;

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: "38px 140px" }}>
      <WineBackdrop />
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <BrowserFrame url={url}>
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            {/* ── Beat 1: Home / buscador ── */}
            {homeVisible && (
              <div style={{ position: "absolute", inset: 0, opacity: homeOpacity, transform: `translateY(${homeY}px)`, display: "flex", flexDirection: "column" }}>
                <NavBar />
                <div style={{ padding: "26px 40px", flex: 1, minHeight: 0, display: "flex", flexDirection: "column", gap: 20 }}>
                  <div>
                    <SearchBar value={typed} caretVisible={caretVisible} />
                    <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                      {RUTAS.map((r) => (
                        <RouteChip key={r.slug} ruta={r} active={rutaFiltered && r.slug === RUTA_SLUG} flashing={chipFlashing && r.slug === RUTA_SLUG} />
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 24, flex: 1, minHeight: 0 }}>
                    <div style={{ flex: "0 0 38%" }}>
                      <MapDecorative activeSlug={rutaFiltered ? RUTA_SLUG : null} rutas={RUTAS} />
                    </div>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, minWidth: 0 }}>
                      {homeResults.map((r) => (
                        <RouteResultCard key={r.slug} ruta={r} highlight={rutaFiltered && r.slug === RUTA_SLUG} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── Beat 2: Detalle de ruta ── */}
            {rutaVisible && (
              <div style={{ position: "absolute", inset: 0, opacity: rutaOpacity, transform: `translateY(${rutaY}px)`, display: "flex", flexDirection: "column" }}>
                <NavBar />
                <div style={{ padding: "26px 40px", flex: 1, minHeight: 0, display: "flex", flexDirection: "column", gap: 22 }}>
                  <SectionHeading backLink="Rutas" eyebrow={`${ruta.bodegasCount} bodegas · ${ruta.subtitulo}`} title={ruta.nombre} />
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                    {bodegasRuta.map((b) => (
                      <BodegaCard key={b.id} bodega={b} highlight={bodegaCardHighlight && b.id === BODEGA_ID} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Beat 3: Detalle de bodega ── */}
            {bodegaVisible && (
              <div style={{ position: "absolute", inset: 0, opacity: bodegaOpacity, transform: `translateY(${bodegaY}px)`, display: "flex", flexDirection: "column" }}>
                <NavBar />
                <div style={{ padding: "26px 40px", flex: 1, minHeight: 0, overflow: "hidden", display: "flex", flexDirection: "column", gap: 20 }}>
                  <SectionHeading backLink={ruta.nombre} eyebrow="Bodega" title={bodega.nombre} />
                  <div style={{ display: "flex", gap: 20 }}>
                    <div style={{ flex: "0 0 46%", height: 200, borderRadius: 14, background: bodega.swatch }} />
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, justifyContent: "center" }}>
                      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: ENO.textoMedio, fontFamily: ENO.fontUI }}>{bodega.descripcion}</p>
                    </div>
                  </div>
                  <div>
                    <p style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 700, letterSpacing: "0.04em", color: ENO.texto, fontFamily: ENO.fontUI }}>Experiencias en esta bodega</p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
                      {bodega.experiencias.map((e) => (
                        <ExperienceCard key={e.id} experiencia={e} highlight={expCardHighlight && e.id === EXPERIENCIA_ID} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── Beat 4: Experiencia/reserva ── */}
            {expVisible && (
              <div style={{ position: "absolute", inset: 0, opacity: expOpacity, transform: `translateY(${expY}px)`, display: "flex", flexDirection: "column" }}>
                <NavBar />
                <div style={{ padding: "26px 40px", flex: 1, minHeight: 0, display: "flex", flexDirection: "column", gap: 24 }}>
                  <SectionHeading backLink={bodega.nombre} eyebrow={`${experiencia.duracion} · ${experiencia.precio}`} title={experiencia.nombre} />
                  <p style={{ margin: 0, maxWidth: 560, fontSize: 14, lineHeight: 1.7, color: ENO.textoMedio, fontFamily: ENO.fontUI }}>{experiencia.resumen}</p>
                  <div>
                    <p style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 700, letterSpacing: "0.04em", color: ENO.texto, fontFamily: ENO.fontUI }}>Elige una fecha</p>
                    <div style={{ display: "flex", gap: 10 }}>
                      {["Vie 16", "Sáb 17", "Dom 18", "Vie 23", "Sáb 24"].map((label, i) => (
                        <DateChip key={label} label={label} active={dateSelected && i === 1} />
                      ))}
                    </div>
                  </div>
                  <div style={{ marginTop: 6 }}>
                    <ReserveButton confirmed={reserveConfirmed} pressed={reservePressed} />
                  </div>
                </div>
              </div>
            )}

            {frame < F.reserveClick + 20 && <SimCursor hops={hops} />}
          </div>
        </BrowserFrame>
      </div>
    </AbsoluteFill>
  );
}

// ── 4. El resultado ──────────────────────────────────────────────────────────
export function ResultScene() {
  return <ChapterCard eyebrow="El resultado" title="Una web pensada para convertir visitas en reservas." titleSize={38} />;
}

// ── 5. Lo que estoy aprendiendo ───────────────────────────────────────────
export function LearningScene() {
  return (
    <ChapterCard
      eyebrow="02 · Lo que estoy aprendiendo"
      title="Migrar una base generada por IA a un sistema que el equipo puede mantener sin tocar código."
      titleSize={34}
    />
  );
}

// ── 6. Cierre ────────────────────────────────────────────────────────────
export function ClosingScene() {
  return <ChapterCard title="Enoturismo Madrid" line="Comunidad de Madrid · Rutas del vino" titleSize={48} />;
}
