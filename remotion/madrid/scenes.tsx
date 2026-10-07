import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SITE } from "./tokens";
import { SimCursor, type CursorHop } from "./Cursor";

// ── Enoturismo Madrid walkthrough — real screenshots of Albert's own live
// site (enoturismo.comunidad.madrid), not a hand-built mockup. Second pass
// (2026-10-03) after Albert's review of the first: that version showed only
// a cursor dragging between two static bookend screenshots per flow with
// nothing changing on screen in between — dead time. This pass uses 10 new
// screenshots that each capture a real action's immediate visible
// consequence (typed text + a live autocomplete dropdown, a result counter
// that actually reads 7 instead of 21, a focus ring on the real control),
// so every cut lands on something that visibly changed, not just a new
// camera position. The fix that mattered most: a click's ripple now fires
// the instant the cursor hop arrives (Xunta's pattern), not after a long
// static rest once arrived (Bullipedia's hover-then-click pattern, which
// only reads fine there because a 3D tilt is animating during that rest —
// there's no such filler here, so the gap just felt dead).
//
// Every shot's frame is sized to ITS OWN screenshot's aspect ratio (some are
// 1568×745, some 1568×721 — real production-site captures taken seconds
// apart, not one fixed export size) so the image fills its card with zero
// crop. A cursor hop's {x,y} is a literal percent of that screenshot's own
// pixel grid, measured directly off the JPEGs.

const CAMERA_EASE = Easing.bezier(0.25, 0.46, 0.45, 0.94);
type CameraWindow = { inStart: number; inEnd: number; outStart: number; outEnd: number; scale: number; originX: number; originY: number };
function cameraAt(frame: number, windows: CameraWindow[]) {
  for (const w of windows) {
    if (frame >= w.inStart && frame <= w.outEnd) {
      let s: number;
      if (frame < w.inEnd) s = interpolate(frame, [w.inStart, w.inEnd], [1, w.scale], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: CAMERA_EASE });
      else if (frame < w.outStart) s = w.scale;
      else s = interpolate(frame, [w.outStart, w.outEnd], [w.scale, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: CAMERA_EASE });
      return { scale: s, originX: w.originX, originY: w.originY };
    }
  }
  return { scale: 1, originX: 50, originY: 50 };
}

function TealBackdrop() {
  return (
    <AbsoluteFill style={{ background: SITE.gradient }}>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 70% 60% at 75% 35%, rgba(140,58,90,0.3) 0%, transparent 70%)" }} />
    </AbsoluteFill>
  );
}

// Same "real browser window" chrome as remotion/xunta/ui.tsx's BrowserFrame,
// sized to each screenshot's own aspect ratio instead of a fixed 16:9 pane
// or one shared constant — flowA/B shots are 1568×745, flowC's are
// 1568×721, real captures taken on different passes.
function ShotFrame({ url, shotW, shotH, children }: { url: string; shotW: number; shotH: number; children: React.ReactNode }) {
  const width = 1640;
  const height = (width * shotH) / shotW;
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <TealBackdrop />
      <div
        style={{
          position: "relative",
          width,
          height: height + 56,
          borderRadius: 22,
          border: "1.5px solid rgba(255,255,255,0.16)",
          boxShadow: "0 1px 0 rgba(255,255,255,0.14) inset, 0 20px 60px rgba(0,0,0,0.5)",
          background: "rgba(255,255,255,0.06)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "14px 20px",
            height: 56,
            flexShrink: 0,
            background: "rgba(10,6,8,0.55)",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            boxSizing: "border-box",
          }}
        >
          <div style={{ display: "flex", gap: 8 }}>
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ef5f57" }} />
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#f6bd3b" }} />
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#62c655" }} />
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", background: "rgba(255,255,255,0.08)", borderRadius: 100, padding: "6px 22px", fontFamily: SITE.fontDisplay }}>{url}</span>
          </div>
          <div style={{ width: 43 }} />
        </div>
        <div style={{ position: "relative", width, height, overflow: "hidden" }}>{children}</div>
      </div>
    </AbsoluteFill>
  );
}

// One screenshot + its scripted cursor, scaled+panned together by `camera`
// so the pointer stays glued to whatever it's pointing at while the camera
// moves.
function Shot({
  url,
  src,
  alt,
  shotW,
  shotH,
  hops,
  camera,
}: {
  url: string;
  src: string;
  alt: string;
  shotW: number;
  shotH: number;
  hops?: CursorHop[];
  camera: { scale: number; originX: number; originY: number };
}) {
  return (
    <ShotFrame url={url} shotW={shotW} shotH={shotH}>
      <div style={{ position: "relative", width: "100%", height: "100%", transform: `scale(${camera.scale})`, transformOrigin: `${camera.originX}% ${camera.originY}%` }}>
        <Img src={staticFile(src)} alt={alt} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        {hops && <SimCursor hops={hops} />}
      </div>
    </ShotFrame>
  );
}

const WB = 1568; // flowA / flowB screenshots
const HB = 745;
const WC = 1568; // flowC screenshots
const HC = 721;

// ══ Flow A — el buscador global ("encuentra tu plan de enoturismo") ═══════
// Campo vacío → clic → (corte: "cata" ya escrito, autocompletar real con 6
// sugerencias) → clic en Buscar → (corte: "11 resultados para cata").

export function FlowA1EmptyScene() {
  const frame = useCurrentFrame();
  // Click lands right where "cata" will appear in the next shot — same
  // point the next shot's cursor rests at, so the cut reads as "typed here".
  const hops: CursorHop[] = [
    { from: { x: 60, y: 10 }, to: { x: 60, y: 10 }, fromFrame: 0, toFrame: 8 },
    { from: { x: 60, y: 10 }, to: { x: 29.6, y: 30.5 }, fromFrame: 8, toFrame: 45, click: true },
  ];
  return (
    <Shot
      url="enoturismo.comunidad.madrid/buscar"
      src="screenshots/madrid-walkthrough/flowA-01-buscador-vacio.jpg"
      alt="Buscador de Enoturismo Madrid, campo vacío"
      shotW={WB}
      shotH={HB}
      hops={hops}
      camera={{ scale: 1, originX: 50, originY: 50 }}
    />
  );
}

export function FlowA2AutocompleteScene() {
  const frame = useCurrentFrame();
  // Beat 1: push in on the live autocomplete dropdown (the feedback of
  // typing "cata") while the cursor rests at the end of the typed text.
  // Beat 2: ease back out, travel to "Buscar", click.
  const camera = cameraAt(frame, [{ inStart: 8, inEnd: 26, outStart: 50, outEnd: 65, scale: 1.35, originX: 42, originY: 46 }]);
  const hops: CursorHop[] = [
    { from: { x: 29.6, y: 30.5 }, to: { x: 29.6, y: 30.5 }, fromFrame: 0, toFrame: 65 },
    { from: { x: 29.6, y: 30.5 }, to: { x: 72.19, y: 30.54 }, fromFrame: 65, toFrame: 100, click: true },
  ];
  return (
    <Shot
      url="enoturismo.comunidad.madrid/buscar?q=cata"
      src="screenshots/madrid-walkthrough/flowA-02-buscador-autocompletar-cata.jpg"
      alt='Buscador con "cata" escrito y el desplegable de autocompletado con sugerencias reales'
      shotW={WB}
      shotH={HB}
      hops={hops}
      camera={camera}
    />
  );
}

export function FlowA3ResultsScene() {
  const frame = useCurrentFrame();
  const camera = cameraAt(frame, [{ inStart: 10, inEnd: 28, outStart: 57, outEnd: 77, scale: 1.3, originX: 14, originY: 52 }]);
  return (
    <Shot
      url="enoturismo.comunidad.madrid/buscar?q=cata"
      src="screenshots/madrid-walkthrough/flowA-03-buscador-resultados-11.jpg"
      alt='Resultados de búsqueda: 11 resultados para "cata", agrupados por tipo'
      shotW={WB}
      shotH={HB}
      camera={camera}
    />
  );
}

// ══ Flow B — descubrir una zona y lo que ofrece ═══════════════════════════
// Home (hero, 4 zonas) → clic en San Martín de Valdeiglesias → (scroll real
// a "Conoce el territorio": tarjeta + mapa) → clic en la zona → ficha con
// "la zona en cifras" → scroll a bodegas reales y rutas de esa zona.

export function FlowB1HomeScene() {
  const frame = useCurrentFrame();
  const hops: CursorHop[] = [
    { from: { x: 45, y: 15 }, to: { x: 45, y: 15 }, fromFrame: 0, toFrame: 8 },
    { from: { x: 45, y: 15 }, to: { x: 10.59, y: 71.01 }, fromFrame: 8, toFrame: 45, click: true },
  ];
  return (
    <Shot
      url="enoturismo.comunidad.madrid"
      src="screenshots/madrid-walkthrough/flowB-01-home-hero-zonas.jpg"
      alt="Home de Enoturismo Madrid, hero con selector de las 4 zonas vitivinícolas"
      shotW={WB}
      shotH={HB}
      hops={hops}
      camera={{ scale: 1, originX: 50, originY: 50 }}
    />
  );
}

export function FlowB2TerritoryScene() {
  const frame = useCurrentFrame();
  const camera = cameraAt(frame, [{ inStart: 28, inEnd: 42, outStart: 63, outEnd: 77, scale: 1.2, originX: 60.71, originY: 80.94 }]);
  const hops: CursorHop[] = [
    { from: { x: 50, y: 15 }, to: { x: 50, y: 15 }, fromFrame: 0, toFrame: 8 },
    { from: { x: 50, y: 15 }, to: { x: 60.71, y: 80.94 }, fromFrame: 8, toFrame: 48, click: true },
  ];
  return (
    <Shot
      url="enoturismo.comunidad.madrid"
      src="screenshots/madrid-walkthrough/flowB-02-mapa-zona-tarjeta.jpg"
      alt='Sección "Conoce el territorio": tarjeta de San Martín de Valdeiglesias junto al mapa con la zona resaltada'
      shotW={WB}
      shotH={HB}
      hops={hops}
      camera={camera}
    />
  );
}

export function FlowB3ZoneStatsScene() {
  const frame = useCurrentFrame();
  const camera = cameraAt(frame, [{ inStart: 10, inEnd: 28, outStart: 57, outEnd: 77, scale: 1.4, originX: 78.3, originY: 90.3 }]);
  return (
    <Shot
      url="enoturismo.comunidad.madrid/zonas/san-martin-de-valdeiglesias"
      src="screenshots/madrid-walkthrough/flowB-03-zona-detalle-cifras.jpg"
      alt='Ficha de San Martín de Valdeiglesias con el panel "La zona en cifras", 12 bodegas'
      shotW={WB}
      shotH={HB}
      camera={camera}
    />
  );
}

export function FlowB4ZoneContentScene() {
  // Pure glance/payoff: real wineries and routes the zone leads to, already
  // large and legible at 1x — no zoom needed, per Albert's note not to zoom
  // by default, only where it helps read something small.
  return (
    <Shot
      url="enoturismo.comunidad.madrid/zonas/san-martin-de-valdeiglesias"
      src="screenshots/madrid-walkthrough/flowB-04-zona-bodegas-rutas.jpg"
      alt="Bodegas reales de la zona y el inicio de Rutas en la zona, en la misma ficha"
      shotW={WB}
      shotH={HB}
      camera={{ scale: 1, originX: 50, originY: 50 }}
    />
  );
}

// ══ Flow C — filtrar bodegas y reservar ════════════════════════════════════
// Directorio sin filtrar (21 bodegas) → clic en el filtro de zona →
// (corte: filtro aplicado, 7 bodegas encontradas) → ficha de una bodega,
// clic en "Reservar en la bodega".

export function FlowC1UnfilteredScene() {
  const frame = useCurrentFrame();
  const hops: CursorHop[] = [
    { from: { x: 75, y: 20 }, to: { x: 75, y: 20 }, fromFrame: 0, toFrame: 8 },
    { from: { x: 75, y: 20 }, to: { x: 48.72, y: 37.73 }, fromFrame: 8, toFrame: 45, click: true },
  ];
  return (
    <Shot
      url="enoturismo.comunidad.madrid/bodegas"
      src="screenshots/madrid-walkthrough/flowC-01-bodegas-sin-filtrar-21.jpg"
      alt="Directorio de bodegas, 21 bodegas encontradas, sin filtrar"
      shotW={WC}
      shotH={HC}
      hops={hops}
      camera={{ scale: 1, originX: 50, originY: 50 }}
    />
  );
}

export function FlowC2FilteredScene() {
  const frame = useCurrentFrame();
  const camera = cameraAt(frame, [{ inStart: 10, inEnd: 28, outStart: 62, outEnd: 82, scale: 1.3, originX: 24, originY: 44 }]);
  // Cursor stays resting on the zone field it just set — the real state the
  // live site shows at this point — while the camera is what draws the eye
  // down to the counter that actually changed, 21 → 7.
  const hops: CursorHop[] = [{ from: { x: 48.8, y: 37.8 }, to: { x: 48.8, y: 37.8 }, fromFrame: 0, toFrame: 90 }];
  return (
    <Shot
      url="enoturismo.comunidad.madrid/bodegas?zona=san-martin-de-valdeiglesias"
      src="screenshots/madrid-walkthrough/flowC-02-bodegas-filtradas-7.jpg"
      alt="Directorio de bodegas filtrado por Subzona San Martín de Valdeiglesias, 7 bodegas encontradas"
      shotW={WC}
      shotH={HC}
      hops={hops}
      camera={camera}
    />
  );
}

export function FlowC3BookingScene() {
  const frame = useCurrentFrame();
  const camera = cameraAt(frame, [{ inStart: 28, inEnd: 43, outStart: 63, outEnd: 78, scale: 1.25, originX: 79.69, originY: 46.12 }]);
  const hops: CursorHop[] = [
    { from: { x: 30, y: 25 }, to: { x: 30, y: 25 }, fromFrame: 0, toFrame: 8 },
    { from: { x: 30, y: 25 }, to: { x: 79.69, y: 46.12 }, fromFrame: 8, toFrame: 48, click: true },
  ];
  return (
    <Shot
      url="enoturismo.comunidad.madrid/bodegas/bodega-cenicientos"
      src="screenshots/madrid-walkthrough/flowC-03-bodega-ficha-reservar.jpg"
      alt='Ficha de Bodega Cenicientos con el panel Reservar visita y el botón "Reservar en la bodega"'
      shotW={WC}
      shotH={HC}
      hops={hops}
      camera={camera}
    />
  );
}
