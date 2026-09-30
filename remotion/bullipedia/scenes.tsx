import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { BULLIPEDIA, EASE_BOOK_HOVER, EASE_BOOK_OPEN, EASE_SIDEBAR, TEXT } from "./tokens";
import { BookCover, BookSidebar, fontStyle, PageHeader, SectionLabel, SubHeader, type SidebarSection } from "./ui";
import { SimCursor, type CursorHop } from "../shared/Cursor";

const PLAN_ORIGEN_COVER = "mockups/bullipedia-html/assets/portada_contra25_jpg_1_scaled_b6e15db3ee-4969fe.jpeg";

const CURSOR_PROPS = { pointerFill: BULLIPEDIA.white, pointerStroke: BULLIPEDIA.navy, rippleColor: BULLIPEDIA.green };

// Shared "document" backdrop every screen sits in — white page, DIN Next,
// ink body copy — matching public/mockups/bullipedia-html/*.html's <body>.
function Page({ children }: { children: React.ReactNode }) {
  return (
    <AbsoluteFill style={{ ...fontStyle, background: BULLIPEDIA.white, color: BULLIPEDIA.ink, flexDirection: "column" }}>
      {children}
    </AbsoluteFill>
  );
}

// ── 1. Catálogo (0–150) — hover 3D en "Plan Origen", click ─────────────────
export function CatalogScene() {
  const frame = useCurrentFrame();

  const hoverProgress = interpolate(frame, [42, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_BOOK_HOVER });
  const rotateY = -40 * hoverProgress;
  const clickBounce = frame >= 120 && frame <= 125 ? interpolate(frame, [120, 122, 125], [1, 0.96, 1], { extrapolateRight: "clamp" }) : 1;

  const hops: CursorHop[] = [
    { from: { x: 66, y: 90 }, to: { x: 66, y: 90 }, fromFrame: 0, toFrame: 18 },
    { from: { x: 66, y: 90 }, to: { x: 32, y: 44 }, fromFrame: 18, toFrame: 42 },
    { from: { x: 32, y: 44 }, to: { x: 32, y: 44 }, fromFrame: 42, toFrame: 120, click: true },
  ];

  return (
    <Page>
      <PageHeader />
      <div style={{ flex: 1, overflow: "hidden" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "52px 40px 30px" }}>
          <h1 style={{ margin: 0, maxWidth: 760, fontSize: 44, lineHeight: 1.08, fontWeight: 600, letterSpacing: "0.01em", color: BULLIPEDIA.navy }}>
            Libros digitales Bullipedia
          </h1>
          <p style={{ margin: "16px 0 0", maxWidth: 620, fontSize: 17, lineHeight: 1.55, color: BULLIPEDIA.inkSoft }}>
            Cada volumen documenta un periodo del taller. Cómpralo en físico, desbloquéalo en digital, o accede a los dos con un solo código.
          </p>
        </div>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 40px" }}>
          <h2 style={{ margin: "0 0 24px", fontSize: TEXT.h2, fontWeight: 700, color: BULLIPEDIA.navy }}>Tus libros</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(210px, 1fr))", columnGap: 26, rowGap: 34 }}>
            <div style={{ transform: `scale(${clickBounce})` }}>
              <BookCover width={230} rotateY={rotateY} badge="Comprado" coverSrc={PLAN_ORIGEN_COVER} shade={hoverProgress} />
              <div style={{ marginTop: 14 }}>
                <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.25, color: BULLIPEDIA.navy }}>Plan Origen</div>
                <div style={{ marginTop: 4, fontSize: TEXT.meta, color: BULLIPEDIA.muted }}>Plan de empresa para la restauración gastronómica</div>
              </div>
            </div>
            <div>
              <BookCover width={230} rotateY={0} badge="Comprado" />
              <div style={{ marginTop: 14 }}>
                <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.25, color: BULLIPEDIA.navy }}>Sala y Bodega IV</div>
                <div style={{ marginTop: 4, fontSize: TEXT.meta, color: BULLIPEDIA.muted }}>La selección de vinos y el servicio de sala · Volumen IV</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SimCursor hops={hops} {...CURSOR_PROPS} />
    </Page>
  );
}

// ── 2. Ficha del libro (150–330) — apertura del libro, índice, click en
// capítulo ──────────────────────────────────────────────────────────────
export function BookPageScene() {
  const frame = useCurrentFrame();

  const openProgress = interpolate(frame, [5, 38], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_BOOK_OPEN });
  const rotateY = -30 * openProgress;
  const rowPress = frame >= 150 && frame <= 156 ? interpolate(frame, [150, 152, 156], [1, 0.985, 1], { extrapolateRight: "clamp" }) : 1;
  const rowHighlight = frame >= 140 && frame < 165;

  const hops: CursorHop[] = [
    { from: { x: 60, y: 14 }, to: { x: 60, y: 14 }, fromFrame: 0, toFrame: 45 },
    { from: { x: 60, y: 14 }, to: { x: 30, y: 62 }, fromFrame: 45, toFrame: 135 },
    { from: { x: 30, y: 62 }, to: { x: 30, y: 62 }, fromFrame: 135, toFrame: 150, click: true },
  ];

  return (
    <Page>
      <PageHeader />
      <div style={{ flex: 1, overflow: "hidden" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "22px 32px 0" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: TEXT.meta, fontWeight: 600, color: BULLIPEDIA.inkSoft }}>
            <span style={{ fontSize: 17, lineHeight: 1 }}>‹</span> Volver al catálogo
          </span>
        </div>

        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "30px 40px 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "340px minmax(0,1fr)", columnGap: 50, alignItems: "start" }}>
            <BookCover width={340} rotateY={rotateY} coverSrc={PLAN_ORIGEN_COVER} shade={openProgress} />
            <div>
              <h1 style={{ margin: 0, fontSize: 44, lineHeight: 1.08, fontWeight: 600, letterSpacing: "0.01em", color: BULLIPEDIA.navy }}>Plan Origen</h1>
              <p style={{ margin: "16px 0 0", maxWidth: 560, fontSize: 17, lineHeight: 1.55, color: BULLIPEDIA.inkSoft }}>
                Plan de empresa para la restauración gastronómica
              </p>
              <span
                style={{
                  display: "inline-flex",
                  marginTop: 26,
                  padding: "15px 32px 13px",
                  fontSize: 15,
                  fontWeight: 700,
                  letterSpacing: "0.01em",
                  textTransform: "uppercase",
                  color: BULLIPEDIA.white,
                  background: BULLIPEDIA.navy,
                }}
              >
                Empezar a leer
              </span>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "16px 40px 0" }}>
          <h2 style={{ margin: "0 0 24px", fontSize: TEXT.h2, fontWeight: 700, color: BULLIPEDIA.navy }}>Índice del libro</h2>
          <div style={{ borderTop: `1px solid ${BULLIPEDIA.ruleStrong}` }}>
            <div style={{ borderBottom: `1px solid ${BULLIPEDIA.ruleStrong}`, background: rowHighlight ? BULLIPEDIA.soft : "transparent", transform: `scale(${rowPress})` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 12px" }}>
                <span style={{ width: 4, height: 36, flexShrink: 0, background: BULLIPEDIA.green }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: TEXT.label, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: BULLIPEDIA.greenDark }}>Capítulo 1</div>
                  <div style={{ marginTop: 2, fontSize: 18, fontWeight: 600, lineHeight: 1.2, color: BULLIPEDIA.navy }}>Introducción al plan Origen</div>
                </div>
                <span style={{ flexShrink: 0, fontSize: TEXT.meta, color: BULLIPEDIA.muted }}>3 apartados</span>
                <span style={{ flexShrink: 0, fontSize: 12, color: BULLIPEDIA.muted, transform: "rotate(180deg)" }}>▾</span>
              </div>
              <div style={{ margin: "0 12px 20px 44px", paddingLeft: 16, borderLeft: `1px solid ${BULLIPEDIA.rule}` }}>
                <div style={{ padding: "10px 12px", fontSize: 15.5, fontWeight: 700, color: BULLIPEDIA.navy, borderBottom: `1px solid ${BULLIPEDIA.rule}` }}>Mapa Plan Origen</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "10px 12px", fontSize: 15.5, fontWeight: 700, color: BULLIPEDIA.navy, borderBottom: `1px solid ${BULLIPEDIA.rule}` }}>
                  <span>La metodología Cimiento</span>
                  <span style={{ fontSize: TEXT.meta, fontWeight: 400, color: BULLIPEDIA.muted }}>2 recursos · 1 artículo</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "10px 12px" }}>
                  <span style={{ fontSize: 15.5, fontWeight: 700, color: BULLIPEDIA.navy }}>El Cimiento de la Restauración Gastronómica</span>
                  <span style={{ fontSize: TEXT.meta, fontWeight: 400, color: BULLIPEDIA.muted }}>2 apartados · 2 artículos</span>
                </div>
              </div>
            </div>
            <div style={{ borderBottom: `1px solid ${BULLIPEDIA.ruleStrong}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 12px", opacity: 0.5 }}>
                <span style={{ width: 4, height: 36, flexShrink: 0, background: BULLIPEDIA.ruleStrong }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: TEXT.label, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: BULLIPEDIA.muted }}>Capítulo 2</div>
                  <div style={{ marginTop: 2, fontSize: 18, fontWeight: 600, lineHeight: 1.2, color: BULLIPEDIA.inkSoft }}>Las 10 preguntas clave</div>
                </div>
                <span style={{ flexShrink: 0, fontSize: 12, color: BULLIPEDIA.muted }}>▸</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SimCursor hops={hops} {...CURSOR_PROPS} />
    </Page>
  );
}

// ── 3. Capítulo (330–540) — sidebar 64→308px, click en subentrada ─────────
const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    title: "Introducción al plan Origen",
    active: true,
    open: true,
    subEntries: [{ title: "La metodología Cimiento" }, { title: "El Cimiento de la Restauración Gastronómica", active: true }],
  },
  { title: "Las 10 preguntas clave", active: false },
];

export function ChapterScene() {
  const frame = useCurrentFrame();

  const openProgress = interpolate(frame, [50, 69], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_SIDEBAR });
  const rowPress = frame >= 170 && frame <= 176 ? interpolate(frame, [170, 172, 176], [1, 0.985, 1], { extrapolateRight: "clamp" }) : 1;
  const rowHighlight = frame >= 155 && frame < 182 && openProgress > 0.9;

  const hops: CursorHop[] = [
    { from: { x: 4, y: 40 }, to: { x: 4, y: 40 }, fromFrame: 0, toFrame: 30 },
    { from: { x: 4, y: 40 }, to: { x: 14, y: 17 }, fromFrame: 30, toFrame: 50 },
    { from: { x: 14, y: 17 }, to: { x: 14, y: 23 }, fromFrame: 69, toFrame: 150 },
    { from: { x: 14, y: 23 }, to: { x: 14, y: 23 }, fromFrame: 150, toFrame: 170, click: true },
  ];

  return (
    <Page>
      <PageHeader />
      <SubHeader backLabel="Volver al índice" title="Introducción al plan Origen" />
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <BookSidebar openProgress={openProgress} sections={SIDEBAR_SECTIONS} />
        <div style={{ flex: 1, minWidth: 0, background: BULLIPEDIA.white }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", padding: "56px 40px 0" }}>
            <SectionLabel>Plan Origen</SectionLabel>
            <h1 style={{ margin: "10px 0 0", fontSize: 38, lineHeight: 1.1, fontWeight: 700, color: BULLIPEDIA.navy }}>Introducción al plan Origen</h1>
            <div style={{ margin: "30px 0 8px", height: 1, background: BULLIPEDIA.rule }} />
            <h2 style={{ margin: "32px 0 16px", fontSize: TEXT.h3, fontWeight: 700, color: BULLIPEDIA.navy }}>Apartados</h2>
            <div style={{ borderTop: `1px solid ${BULLIPEDIA.rule}` }}>
              <div style={{ padding: "20px 0", borderBottom: `1px solid ${BULLIPEDIA.rule}` }}>
                <span style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.25, color: BULLIPEDIA.navy }}>La metodología Cimiento</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "20px 12px",
                  borderBottom: `1px solid ${BULLIPEDIA.rule}`,
                  background: rowHighlight ? BULLIPEDIA.soft : "transparent",
                  transform: `scale(${rowPress})`,
                }}
              >
                <span style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.25, color: BULLIPEDIA.navy }}>El Cimiento de la Restauración Gastronómica</span>
                <span style={{ fontSize: TEXT.meta, color: BULLIPEDIA.muted }}>Artículo ›</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SimCursor hops={hops} {...CURSOR_PROPS} />
    </Page>
  );
}

// ── 4. Artículo en lectura (540–780) — scroll continuo, progreso 15→34%,
// sin cursor, últimos 20 frames quietos ────────────────────────────────────
export function ArticleScene() {
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [0, 240], [0.15, 0.34], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // Local window ends at 220 (dur 240 minus the last 20 held frames) — the
  // Sequence also renders 8 extra overlap frames past 240 for the crossfade
  // out, which simply keep the same held position.
  const scrollY = interpolate(frame, [8, 220], [0, 230], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <Page>
      <PageHeader />
      <SubHeader backLabel="Volver al capítulo" title="Capítulo 3 — El Cimiento de la restauración gastronómica" counter="Apartado 2 de 13" progress={progress} />
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <BookSidebar openProgress={0} sections={SIDEBAR_SECTIONS} />
        <div style={{ flex: 1, minWidth: 0, background: BULLIPEDIA.white, position: "relative", overflow: "hidden" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", padding: "56px 40px 96px", transform: `translateY(-${scrollY}px)` }}>
            <SectionLabel>Capítulo 3 · Plan Origen</SectionLabel>
            <h1 style={{ margin: "10px 0 0", fontSize: 38, lineHeight: 1.1, fontWeight: 700, color: BULLIPEDIA.navy }}>El Cimiento de la restauración gastronómica</h1>
            <div style={{ margin: "30px 0 8px", height: 1, background: BULLIPEDIA.rule }} />

            <figure style={{ margin: "34px 0" }}>
              <Img
                src={staticFile("mockups/bullipedia-html/assets/portada_contra25_jpg_1_scaled_b6e15db3ee-f18a58.jpeg")}
                style={{ width: "100%", height: "auto", display: "block", objectFit: "cover", maxHeight: 260 }}
              />
            </figure>

            <p style={{ margin: "22px 0", fontSize: TEXT.lead, lineHeight: 1.55, color: BULLIPEDIA.ink }}>
              Una vez explicado todo esto, veamos el Cimiento de la restauración gastronómica.
            </p>
            <p style={{ margin: "22px 0", fontSize: TEXT.lead, lineHeight: 1.55, color: BULLIPEDIA.ink }}>
              A partir de ahora, profundizaremos en la restauración gastronómica y en el restaurante gastronómico.
            </p>

            <h3
              style={{
                margin: "42px 0 -6px",
                paddingBottom: 8,
                fontSize: TEXT.meta,
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: BULLIPEDIA.navy,
                borderBottom: `1px solid ${BULLIPEDIA.ruleStrong}`,
              }}
            >
              Los cinco métodos de Cimiento
            </h3>
            <p style={{ margin: "22px 0", fontSize: TEXT.body, lineHeight: 1.6, color: BULLIPEDIA.ink }}>
              Como hemos visto, la metodología Cimiento está formada por cinco métodos, cada uno con un desarrollo y un listado de pasos en los
              que se propone hacer varios ejercicios para desarrollar en profundidad el prisma que corresponde a cada método.
            </p>
            <p style={{ margin: "22px 0", fontSize: TEXT.body, lineHeight: 1.6, color: BULLIPEDIA.ink }}>
              También es posible sintetizar cada uno de los métodos en una sola pregunta, que se puede responder de forma intuitiva, para hacer
              una primera aproximación al estudio aplicando esos diferentes prismas, de manera muy simplificada.
            </p>
          </div>
        </div>
      </div>
    </Page>
  );
}
