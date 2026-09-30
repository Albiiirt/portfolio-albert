import type { CSSProperties, ReactNode } from "react";
import { ENO, RUTA_COLOR } from "./tokens";
import { Icon } from "./Icon";
import type { Bodega, Experiencia, Ruta } from "./data";

// ── BrowserFrame ──────────────────────────────────────────────────────────
// Same glass-frame chrome language as remotion/xunta/ui.tsx's BrowserFrame
// (rgba border/radius matching --glass-shadow), content area in ENO's ivory
// instead of GNOSS white.
export function BrowserFrame({ children, url = "enoturismo.comunidad.madrid" }: { children: ReactNode; url?: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
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
          background: "rgba(10,6,8,0.55)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ef5f57" }} />
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#f6bd3b" }} />
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#62c655" }} />
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <span
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.55)",
              background: "rgba(255,255,255,0.08)",
              borderRadius: 100,
              padding: "6px 22px",
              fontFamily: ENO.fontUI,
            }}
          >
            {url}
          </span>
        </div>
        <div style={{ width: 43 }} />
      </div>
      <div style={{ position: "relative", flex: 1, background: ENO.fondo, overflow: "hidden" }}>{children}</div>
    </div>
  );
}

// ── NavBar ────────────────────────────────────────────────────────────────
export function NavBar() {
  const links = ["Bodegas", "Rutas", "Experiencias", "Planifica tu visita"];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 36,
        padding: "18px 32px",
        background: ENO.superficie,
        borderBottom: `1px solid ${ENO.borde}`,
        fontFamily: ENO.fontUI,
      }}
    >
      <span style={{ fontFamily: ENO.fontDisplay, fontWeight: 600, fontSize: 21, color: ENO.texto }}>Enoturismo Madrid</span>
      <div style={{ display: "flex", gap: 26, marginLeft: 12 }}>
        {links.map((l) => (
          <span key={l} style={{ fontSize: 13.5, fontWeight: 500, color: ENO.textoMedio }}>
            {l}
          </span>
        ))}
      </div>
      <span
        style={{
          marginLeft: "auto",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "8px 16px",
          borderRadius: 8,
          background: ENO.acento,
          color: ENO.acentoTexto,
          fontSize: 12.5,
          fontWeight: 700,
        }}
      >
        Reservar visita
      </span>
    </div>
  );
}

// ── SearchBar ─────────────────────────────────────────────────────────────
export function SearchBar({ value, caretVisible }: { value: string; caretVisible: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: ENO.superficie,
        border: `1px solid ${ENO.borde}`,
        borderRadius: 100,
        padding: "6px 6px 6px 20px",
        fontFamily: ENO.fontUI,
        boxShadow: ENO.shadowCard,
      }}
    >
      <Icon name="search" size={20} color={ENO.textoClaro} />
      <span style={{ flex: 1, padding: "12px 4px", fontSize: 15, color: ENO.texto }}>
        {value || <span style={{ color: ENO.textoClaro }}>Busca una ruta, bodega o experiencia…</span>}
        {value && <span style={{ display: "inline-block", width: 1.5, height: 16, background: ENO.texto, marginLeft: 2, opacity: caretVisible ? 1 : 0, verticalAlign: "-3px" }} />}
      </span>
      <span style={{ background: ENO.acento, color: ENO.acentoTexto, borderRadius: 100, padding: "11px 24px", fontSize: 13.5, fontWeight: 700 }}>Buscar</span>
    </div>
  );
}

// ── RouteChip ─────────────────────────────────────────────────────────────
export function RouteChip({ ruta, active, flashing }: { ruta: Ruta; active: boolean; flashing?: boolean }) {
  const color = RUTA_COLOR[ruta.slug];
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "9px 18px",
        borderRadius: 100,
        border: `1.5px solid ${active ? color : ENO.borde}`,
        background: active ? `${color}14` : ENO.superficie,
        fontFamily: ENO.fontUI,
        fontSize: 13.5,
        fontWeight: 600,
        color: active ? color : ENO.textoMedio,
        transform: flashing ? "scale(0.96)" : "scale(1)",
        boxShadow: flashing ? `0 0 0 5px ${color}22` : "none",
      }}
    >
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
      {ruta.nombre}
    </div>
  );
}

// ── MapDecorative ─────────────────────────────────────────────────────────
// A stylized, non-literal map: four labeled zone markers on a soft terrain
// field, positioned roughly where the four routes sit around Madrid
// (Navalcarnero SW, Arganda SE, San Martín W/Sierra, El Molar N).
export function MapDecorative({ activeSlug, rutas }: { activeSlug: string | null; rutas: Ruta[] }) {
  const positions: Record<string, { x: number; y: number }> = {
    navalcarnero: { x: 22, y: 62 },
    "arganda-del-rey": { x: 74, y: 58 },
    "san-martin-de-valdeiglesias": { x: 16, y: 28 },
    "el-molar": { x: 60, y: 16 },
  };
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: 16,
        overflow: "hidden",
        background: "linear-gradient(160deg, #efe6dc 0%, #e3d6c6 55%, #d8c8b4 100%)",
        border: `1px solid ${ENO.borde}`,
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, opacity: 0.5 }}>
        <path d="M0 70 Q 25 55 50 66 T 100 60" stroke="#b5a488" strokeWidth="0.6" fill="none" />
        <path d="M0 40 Q 30 30 55 40 T 100 35" stroke="#b5a488" strokeWidth="0.6" fill="none" />
      </svg>
      {rutas.map((r) => {
        const p = positions[r.slug];
        const color = RUTA_COLOR[r.slug];
        const active = activeSlug === r.slug;
        return (
          <div
            key={r.slug}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              opacity: activeSlug && !active ? 0.35 : 1,
            }}
          >
            <div
              style={{
                width: active ? 20 : 14,
                height: active ? 20 : 14,
                borderRadius: "50%",
                background: color,
                border: "2.5px solid #fff",
                boxShadow: active ? `0 0 0 6px ${color}33` : "0 2px 6px rgba(0,0,0,0.18)",
              }}
            />
            <span style={{ fontFamily: ENO.fontUI, fontSize: 11, fontWeight: 700, color: ENO.texto, background: "rgba(255,255,255,0.8)", padding: "1px 7px", borderRadius: 30, whiteSpace: "nowrap" }}>
              {r.nombre}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ── RouteResultCard (home page results list) ─────────────────────────────
export function RouteResultCard({ ruta, highlight }: { ruta: Ruta; highlight?: boolean }) {
  const color = RUTA_COLOR[ruta.slug];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        background: ENO.superficie,
        border: `1px solid ${highlight ? color : ENO.borde}`,
        borderRadius: 12,
        padding: "16px 18px",
        fontFamily: ENO.fontUI,
        boxShadow: highlight ? ENO.shadowCardHover : ENO.shadowCard,
      }}
    >
      <span style={{ width: 44, height: 44, borderRadius: 10, flexShrink: 0, background: `linear-gradient(135deg, ${color} 0%, ${color}99 100%)` }} />
      <div style={{ minWidth: 0, flex: 1 }}>
        <p style={{ margin: "0 0 3px", fontSize: 15, fontWeight: 700, color: ENO.texto, fontFamily: ENO.fontDisplay }}>{ruta.subtitulo}</p>
        <p style={{ margin: 0, fontSize: 12.5, color: ENO.textoClaro }}>{ruta.bodegasCount} bodegas · {ruta.resumen}</p>
      </div>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12.5, fontWeight: 700, color, flexShrink: 0 }}>
        Ver ruta
        <Icon name="arrow_forward" size={14} color={color} />
      </span>
    </div>
  );
}

// ── BodegaCard (route-detail grid) ───────────────────────────────────────
export function BodegaCard({ bodega, highlight }: { bodega: Bodega; highlight?: boolean }) {
  return (
    <div
      style={{
        background: ENO.superficie,
        border: `1px solid ${highlight ? ENO.acento : ENO.borde}`,
        borderRadius: 14,
        overflow: "hidden",
        fontFamily: ENO.fontUI,
        boxShadow: highlight ? ENO.shadowCardHover : ENO.shadowCard,
        transform: highlight ? "scale(1.015)" : "scale(1)",
      }}
    >
      <div style={{ height: 96, background: bodega.swatch }} />
      <div style={{ padding: "14px 16px" }}>
        <p style={{ margin: "0 0 5px", fontSize: 15, fontWeight: 700, color: ENO.texto, fontFamily: ENO.fontDisplay }}>{bodega.nombre}</p>
        <p style={{ margin: 0, fontSize: 12, lineHeight: 1.5, color: ENO.textoMedio }}>{bodega.resumen}</p>
      </div>
    </div>
  );
}

// ── ExperienceCard (bodega-detail) ───────────────────────────────────────
export function ExperienceCard({ experiencia, highlight }: { experiencia: Experiencia; highlight?: boolean }) {
  return (
    <div
      style={{
        background: ENO.superficie,
        border: `1px solid ${highlight ? ENO.acento : ENO.borde}`,
        borderRadius: 12,
        padding: "16px 18px",
        fontFamily: ENO.fontUI,
        boxShadow: highlight ? ENO.shadowCardHover : ENO.shadowCard,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        transform: highlight ? "scale(1.02)" : "scale(1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
        <p style={{ margin: 0, fontSize: 15.5, fontWeight: 700, color: ENO.texto, fontFamily: ENO.fontDisplay }}>{experiencia.nombre}</p>
        <span style={{ fontSize: 14, fontWeight: 700, color: ENO.acento, flexShrink: 0 }}>{experiencia.precio}</span>
      </div>
      <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.5, color: ENO.textoMedio }}>{experiencia.resumen}</p>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: ENO.textoClaro }}>
        <Icon name="schedule" size={13} color={ENO.textoClaro} />
        {experiencia.duracion}
      </span>
    </div>
  );
}

// ── DateChip (reservation date picker) ───────────────────────────────────
export function DateChip({ label, active }: { label: string; active: boolean }) {
  return (
    <span
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        padding: "10px 16px",
        borderRadius: 10,
        border: `1.5px solid ${active ? ENO.acento : ENO.borde}`,
        background: active ? ENO.acentoTint : ENO.superficie,
        fontFamily: ENO.fontUI,
        color: active ? ENO.acento : ENO.textoMedio,
        transform: active ? "scale(1.04)" : "scale(1)",
        boxShadow: active ? `0 0 0 4px ${ENO.acentoTint}` : "none",
      }}
    >
      <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", opacity: 0.8 }}>{label.split(" ")[0]}</span>
      <span style={{ fontSize: 15, fontWeight: 700 }}>{label.split(" ")[1]}</span>
    </span>
  );
}

// ── ReserveButton ─────────────────────────────────────────────────────────
export function ReserveButton({ confirmed, pressed }: { confirmed: boolean; pressed: boolean }) {
  const bg = confirmed ? ENO.confirmacion : ENO.acento;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "13px 26px",
        borderRadius: 10,
        fontSize: 14.5,
        fontWeight: 700,
        background: bg,
        color: "#ffffff",
        fontFamily: ENO.fontUI,
        transform: pressed ? "scale(0.96)" : "scale(1)",
        boxShadow: pressed ? `0 0 0 6px ${bg}33` : ENO.shadowCard,
      }}
    >
      {confirmed && <Icon name="check_circle" size={17} color="#ffffff" />}
      {confirmed ? "Reserva confirmada" : "Reservar"}
    </span>
  );
}

// ── SectionHeading (ruta/bodega/experiencia header) ──────────────────────
export function SectionHeading({
  eyebrow,
  title,
  backLink,
  style,
}: {
  eyebrow: string;
  title: string;
  backLink?: string;
  style?: CSSProperties;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, ...style }}>
      {backLink && (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 600, color: ENO.textoMedio, fontFamily: ENO.fontUI }}>
          <Icon name="arrow_back" size={13} color={ENO.textoMedio} />
          {backLink}
        </span>
      )}
      <p style={{ margin: 0, fontSize: 12.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: ENO.acento, fontFamily: ENO.fontUI }}>{eyebrow}</p>
      <h1 style={{ margin: 0, fontSize: 30, fontWeight: 600, color: ENO.texto, fontFamily: ENO.fontDisplay, lineHeight: 1.15 }}>{title}</h1>
    </div>
  );
}
