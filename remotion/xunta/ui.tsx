import { Fragment } from "react";
import type { CSSProperties, ReactNode } from "react";
import { GNOSS, STATE_COLOR, STATE_LABEL } from "./tokens";
import { Icon } from "./Icon";

// ── BrowserFrame ──────────────────────────────────────────────────────────
// Desktop counterpart of the site's mobile "glass" showcase frame (same
// rgba border / radius language, see ProjectScreensShowcase) but sized like
// a real browser window, since the recreated product is a desktop tool.
export function BrowserFrame({ children, url = "unificador.xunta.gal/terminos" }: { children: ReactNode; url?: string }) {
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
          background: "rgba(10,20,20,0.55)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ef5f57" }} />
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#f6bd3b" }} />
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#62c655" }} />
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.55)",
              background: "rgba(255,255,255,0.08)",
              borderRadius: 100,
              padding: "6px 22px",
              fontFamily: GNOSS.font,
            }}
          >
            {url}
          </span>
        </div>
        <div style={{ width: 43 }} />
      </div>
      <div style={{ position: "relative", flex: 1, background: GNOSS.blanco, overflow: "hidden" }}>{children}</div>
    </div>
  );
}

// ── GnossHeader ───────────────────────────────────────────────────────────
export function GnossHeader({ tab, trabajoCount }: { tab: "terminos" | "trabajo" | "ficha"; trabajoCount: number }) {
  return (
    <div style={{ background: GNOSS.primario, color: GNOSS.blanco, fontFamily: GNOSS.font }}>
      <div style={{ display: "flex", alignItems: "center", gap: 24, padding: "16px 32px" }}>
        <span style={{ fontWeight: 700, fontSize: 21, letterSpacing: 0.5 }}>GNOSS</span>
        <span
          style={{
            marginLeft: 14,
            paddingLeft: 14,
            borderLeft: "1px solid rgba(255,255,255,0.35)",
            fontWeight: 500,
            opacity: 0.9,
            fontSize: 15,
          }}
        >
          Unificador
        </span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, padding: "6px 12px 6px 8px", borderRadius: 20, background: "rgba(255,255,255,0.16)" }}>
          <Icon name="person" size={18} />
          <span style={{ fontSize: 13, fontWeight: 500 }}>Design</span>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.18)", display: "flex", padding: "0 32px" }}>
        {(["terminos", "trabajo"] as const).map((key) => {
          const active = tab === key || (tab === "ficha" && key === "trabajo");
          return (
            <div
              key={key}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 18px",
                opacity: active ? 1 : 0.72,
                fontWeight: 500,
                fontSize: 14.5,
                borderBottom: active ? "3px solid #fff" : "3px solid transparent",
              }}
            >
              {key === "terminos" ? "Términos" : "Trabajo"}
              {key === "trabajo" && (
                <span
                  style={{
                    background: GNOSS.secundario,
                    color: GNOSS.blanco,
                    borderRadius: 30,
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "1px 8px",
                    lineHeight: 1.6,
                  }}
                >
                  {trabajoCount}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── SearchBar ─────────────────────────────────────────────────────────────
export function SearchBar({ value, caret }: { value: string; caret: boolean }) {
  const blink = caret;
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
        <CaretBlink show={blink} />
      </span>
      <span
        style={{
          background: GNOSS.primario,
          color: GNOSS.blanco,
          borderRadius: 7,
          padding: "9px 18px",
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        Buscar
      </span>
    </div>
  );
}

function CaretBlink({ show }: { show: boolean }) {
  if (!show) return null;
  return <span style={{ display: "inline-block", width: 1.5, height: 14, background: GNOSS.texto, marginLeft: 1, verticalAlign: "-2px" }} />;
}

// ── FacetSidebar (static/dimmed, per spec) ───────────────────────────────
// `activeEstado` drives which "Estado de unificación" facet row is
// highlighted — the video clicks between them to show real facet filtering,
// so this isn't just decorative/dimmed the way a static list would be.
export function FacetSidebar({ activeEstado = "revision", flashing }: { activeEstado?: string; flashing?: boolean }) {
  const estadoItems = [
    { key: "revision", name: "En revisión", n: 2 },
    { key: "pendiente", name: "Pendiente de revisar", n: 6 },
    { key: "revisado", name: "Revisado", n: 5 },
  ];
  return (
    <div style={{ width: 240, flexShrink: 0, fontFamily: GNOSS.font }}>
      <p style={{ margin: "0 0 8px", fontWeight: 700, fontSize: 14, color: GNOSS.texto }}>Filtrar por</p>
      <div style={{ borderBottom: `1px solid ${GNOSS.grisBorde}`, padding: "12px 0" }}>
        <p style={{ margin: "0 0 10px", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em", color: GNOSS.texto }}>Estado de unificación</p>
        {estadoItems.map((it) => {
          const active = it.key === activeEstado;
          return (
            <div
              key={it.key}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "6px 8px",
                borderRadius: 6,
                fontSize: 13.5,
                color: active ? GNOSS.primario : GNOSS.textoMedio,
                fontWeight: active ? 600 : 400,
                background: active ? GNOSS.primarioHighlight : "transparent",
                transform: flashing && active ? "scale(0.97)" : "scale(1)",
                boxShadow: flashing && active ? `0 0 0 4px ${GNOSS.primarioHighlight}` : "none",
              }}
            >
              <span>{it.name}</span>
              <span style={{ color: active ? GNOSS.primario : GNOSS.textoClaro, fontSize: 12 }}>({it.n})</span>
            </div>
          );
        })}
      </div>
      <div style={{ borderBottom: `1px solid ${GNOSS.grisBorde}`, padding: "12px 0", opacity: 0.6 }}>
        <p style={{ margin: "0 0 10px", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em", color: GNOSS.texto }}>Tamaño de la propuesta</p>
        {[
          { name: "Par (2 documentos)", n: 5 },
          { name: "Grupo (3 o más)", n: 2 },
        ].map((it) => (
          <div key={it.name} style={{ display: "flex", justifyContent: "space-between", padding: "6px 8px", fontSize: 13.5, color: GNOSS.textoMedio }}>
            <span>{it.name}</span>
            <span style={{ color: GNOSS.textoClaro, fontSize: 12 }}>({it.n})</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── StatusBadge (5 real states) ───────────────────────────────────────────
export function StatusBadge({ estado }: { estado: string }) {
  const c = STATE_COLOR[estado];
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
        background: c.bg,
        color: c.fg,
        fontFamily: GNOSS.font,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.fg }} />
      {STATE_LABEL[estado]}
    </span>
  );
}

// ── ResultRow (Términos listado) ─────────────────────────────────────────
export function ResultRow({
  nombre,
  idControl,
  fuente,
  estado,
  isGrupo,
  highlight,
}: {
  nombre: string;
  idControl: string;
  fuente: string;
  estado: string;
  isGrupo: boolean;
  highlight?: boolean;
}) {
  return (
    <div
      style={{
        background: GNOSS.blanco,
        border: `1px solid ${highlight ? GNOSS.primario : GNOSS.grisBorde}`,
        borderRadius: 10,
        padding: "14px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        fontFamily: GNOSS.font,
        boxShadow: highlight ? GNOSS.shadowCardHover : "none",
      }}
    >
      <div style={{ minWidth: 0 }}>
        <p style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 600, color: GNOSS.texto }}>{nombre}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12.5, color: GNOSS.textoClaro }}>
          <span style={{ fontFamily: "monospace" }}>{idControl}</span>
          <span>· {fuente}</span>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        <StatusBadge estado={estado} />
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12.5, fontWeight: 600, color: GNOSS.primario }}>
          <Icon name={isGrupo ? "call_merge" : "description"} size={16} />
          {isGrupo ? "Ver propuesta" : "Ver ficha"}
        </span>
      </div>
    </div>
  );
}

// ── Kanban ────────────────────────────────────────────────────────────────
const COLUMN_META: Record<string, { label: string; color: string }> = {
  pendiente: { label: "Pendiente de revisar", color: GNOSS.warning },
  revision: { label: "En revisión", color: GNOSS.info },
  revisado: { label: "Revisado", color: GNOSS.success },
  "no-duplicado": { label: "Bloqueado", color: GNOSS.neutral },
};

export function KanbanColumn({
  estado,
  count,
  children,
  style,
}: {
  estado: keyof typeof COLUMN_META;
  count: number;
  children?: ReactNode;
  style?: CSSProperties;
}) {
  const meta = COLUMN_META[estado];
  return (
    <div style={{ flex: "1 1 0", minWidth: 0, background: GNOSS.grisFondo, borderRadius: 12, padding: 10, fontFamily: GNOSS.font, ...style }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 6px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em", color: meta.color }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: meta.color }} />
          {meta.label}
        </div>
        <span style={{ background: GNOSS.blanco, border: `1px solid ${GNOSS.grisBorde}`, borderRadius: 30, padding: "1px 9px", fontSize: 12, color: GNOSS.textoMedio, fontWeight: 600 }}>
          {count}
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, minHeight: 40 }}>{children}</div>
    </div>
  );
}

const CONFIANZA_CLASS = (v: number) => (v >= 85 ? "alta" : v >= 65 ? "media" : "baja");
const CONFIANZA_COLOR: Record<string, { fg: string; bg: string }> = {
  alta: { fg: GNOSS.success, bg: GNOSS.successBg },
  media: { fg: GNOSS.info, bg: GNOSS.infoBg },
  baja: { fg: GNOSS.warning, bg: GNOSS.warningBg },
};

export function KanbanCard({
  names,
  docsCount,
  confianza,
  style,
  dimmed,
}: {
  names: string[];
  docsCount: number;
  confianza: number;
  style?: CSSProperties;
  dimmed?: boolean;
}) {
  const cc = CONFIANZA_COLOR[CONFIANZA_CLASS(confianza)];
  return (
    <div
      style={{
        background: GNOSS.blanco,
        border: `1px solid ${GNOSS.grisBorde}`,
        borderRadius: 10,
        padding: "12px 12px 10px",
        opacity: dimmed ? 0.6 : 1,
        ...style,
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 30, background: cc.bg, color: cc.fg }}>{confianza}%</span>
      </div>
      <ul style={{ listStyle: "none", margin: "0 0 10px", padding: 0, display: "flex", flexDirection: "column", gap: 3 }}>
        {names.slice(0, 2).map((n) => (
          <li key={n} style={{ fontSize: 13.5, fontWeight: 500, color: GNOSS.texto, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {n}
          </li>
        ))}
      </ul>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12, color: GNOSS.textoClaro }}>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Icon name="description" size={15} />
          {docsCount} documentos
        </span>
      </div>
    </div>
  );
}

// ── EsquemaToggle ─────────────────────────────────────────────────────────
export function EsquemaToggle({ active = "marc", flashing }: { active?: "marc" | "isaar"; flashing?: "marc" | "isaar" | null }) {
  const btn = (key: "marc" | "isaar", label: string, tag: string, first: boolean): CSSProperties => ({
    padding: "8px 16px",
    border: 0,
    borderLeft: first ? "none" : `1px solid ${GNOSS.grisBorde}`,
    background: active === key ? GNOSS.primario : GNOSS.blanco,
    color: active === key ? GNOSS.blanco : GNOSS.textoMedio,
    fontSize: 13,
    fontWeight: 600,
    transform: flashing === key ? "scale(0.96)" : "scale(1)",
    boxShadow: flashing === key ? `0 0 0 4px ${GNOSS.primarioHighlight}` : "none",
  });
  return (
    <div style={{ display: "inline-flex", border: `1px solid ${GNOSS.grisBorde}`, borderRadius: 8, overflow: "hidden", fontFamily: GNOSS.font }}>
      <button style={btn("marc", "Vista bibliotecaria", "MARC", true)}>
        Vista bibliotecaria <span style={{ opacity: 0.75, fontSize: 11.5, fontWeight: 400 }}>MARC</span>
      </button>
      <button style={btn("isaar", "Vista archivística", "ISAAR", false)}>
        Vista archivística <span style={{ opacity: 0.75, fontSize: 11.5, fontWeight: 400 }}>ISAAR</span>
      </button>
    </div>
  );
}

// ── FooterActions ─────────────────────────────────────────────────────────
export function FooterActions({ acceptActive }: { acceptActive?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 10, paddingTop: 2, fontFamily: GNOSS.font }}>
      <span style={{ padding: "9px 16px", borderRadius: 8, fontSize: 13.5, fontWeight: 600, background: GNOSS.neutralBg, color: GNOSS.neutral }}>Bloquear</span>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "9px 16px",
          borderRadius: 8,
          fontSize: 13.5,
          fontWeight: 600,
          background: GNOSS.success,
          color: GNOSS.blanco,
          transform: acceptActive ? "scale(0.96)" : "scale(1)",
          boxShadow: acceptActive ? "0 0 0 4px rgba(46,177,0,0.25)" : "none",
        }}
      >
        <Icon name="task_alt" size={16} />
        Aceptar y unificar
      </span>
    </div>
  );
}

// ── ComparativeTable ──────────────────────────────────────────────────────
export type NameClass = "principal" | "4xx" | "7xx";

const ROWS_MARC: { campo: string; codigo: string; etiqueta: string }[] = [
  { campo: "idControl", codigo: "001", etiqueta: "Número de control" },
  { campo: "nombreAutorizado", codigo: "100", etiqueta: "Encabezamiento — Nombre de persona" },
  { campo: "formasVariantes", codigo: "400", etiqueta: "Forma variante del nombre" },
  { campo: "fechasAsociadas", codigo: "046", etiqueta: "Fechas asociadas" },
  { campo: "fuenteCatalogacion", codigo: "040", etiqueta: "Fuente de catalogación" },
  { campo: "notaBiografica", codigo: "678", etiqueta: "Nota biográfica" },
];

// Real ISAAR (archival) schema from the prototype: same fields, different
// order/labels, no MARC field codes.
const ROWS_ISAAR: { campo: string; codigo: string; etiqueta: string }[] = [
  { campo: "nombreAutorizado", codigo: "", etiqueta: "Forma autorizada del nombre" },
  { campo: "formasVariantes", codigo: "", etiqueta: "Formas paralelas / variantes" },
  { campo: "fechasAsociadas", codigo: "", etiqueta: "Fechas de existencia" },
  { campo: "notaBiografica", codigo: "", etiqueta: "Historia / nota biográfica" },
  { campo: "fuenteCatalogacion", codigo: "", etiqueta: "Fuente" },
  { campo: "idControl", codigo: "", etiqueta: "Identificador" },
];

export function ComparativeTable({
  docs,
  selection,
  nameClass,
  activeCell,
  activePill,
  esquema = "marc",
}: {
  docs: { id: string; nombre: string; idControl: string; formasVariantes: string[]; fechasAsociadas: string; fuenteCatalogacion: string; notaBiografica: string }[];
  selection: Record<string, string>;
  nameClass: Record<string, NameClass>;
  activeCell?: { campo: string; doc: string } | null;
  activePill?: { doc: string; tipo: NameClass } | null;
  esquema?: "marc" | "isaar";
}) {
  const rows = esquema === "isaar" ? ROWS_ISAAR : ROWS_MARC;

  const valueFor = (doc: (typeof docs)[number], campo: string): string => {
    const v = (doc as Record<string, unknown>)[campo === "nombreAutorizado" ? "nombre" : campo];
    if (Array.isArray(v)) return v.join("; ");
    return (v as string) || "";
  };

  return (
    <div style={{ border: `1px solid ${GNOSS.grisBorde}`, borderRadius: 12, overflow: "hidden", fontFamily: GNOSS.font }}>
      <table style={{ borderCollapse: "separate", borderSpacing: 0, width: "100%", tableLayout: "fixed" }}>
        <thead>
          <tr>
            <th style={{ width: 220, background: GNOSS.grisFondo, borderBottom: `1px solid ${GNOSS.grisBorde}` }} />
            {docs.map((d) => (
              <th key={d.id} style={{ background: GNOSS.blanco, borderBottom: `1px solid ${GNOSS.grisBorde}`, borderLeft: `1px solid ${GNOSS.grisBorde}`, padding: "9px 16px", textAlign: "left" }}>
                <div style={{ fontSize: 14.5, fontWeight: 700, color: GNOSS.texto }}>{d.nombre}</div>
                <div style={{ fontSize: 11.5, color: GNOSS.textoClaro, fontFamily: "monospace", marginTop: 4 }}>{d.idControl}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((f, ri) => {
            const isNombre = f.campo === "nombreAutorizado";
            return (
              <tr key={f.campo}>
                <td
                  style={{
                    position: "sticky",
                    left: 0,
                    background: GNOSS.grisFondo,
                    fontSize: 13,
                    fontWeight: 600,
                    color: GNOSS.texto,
                    padding: "9px 16px",
                    borderBottom: ri < rows.length - 1 ? `1px solid ${GNOSS.grisBorde}` : "none",
                    verticalAlign: "top",
                  }}
                >
                  {f.etiqueta}
                  {f.codigo && (
                    <span style={{ display: "block", fontWeight: 400, color: GNOSS.textoClaro, fontSize: 11.5, fontFamily: "monospace", marginTop: 4 }}>{f.codigo}</span>
                  )}
                </td>
                {docs.map((d) => {
                  const value = valueFor(d, f.campo);
                  const seleccionada = selection[f.campo] === d.id;
                  const isActiveCell = activeCell?.campo === f.campo && activeCell?.doc === d.id;
                  return (
                    <td
                      key={d.id}
                      style={{
                        borderLeft: `1px solid ${GNOSS.grisBorde}`,
                        borderBottom: ri < rows.length - 1 ? `1px solid ${GNOSS.grisBorde}` : "none",
                        padding: "9px 16px",
                        verticalAlign: "top",
                        background: isNombre ? "transparent" : seleccionada ? GNOSS.successBg : isActiveCell ? GNOSS.grisFondo : "transparent",
                        boxShadow: !isNombre && seleccionada ? `inset 3px 0 0 ${GNOSS.success}` : "none",
                      }}
                    >
                      {isNombre ? (
                        <>
                          <p style={{ fontSize: 13.5, fontWeight: 600, color: GNOSS.texto, margin: "0 0 6px" }}>{value}</p>
                          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                            {(
                              [
                                { valor: "principal" as const, etiqueta: "Término principal" },
                                { valor: "4xx" as const, etiqueta: "Otras formas del nombre (4XX)" },
                              ] as const
                            ).map((t) => {
                              const active = nameClass[d.id] === t.valor;
                              const isFlashing = activePill?.doc === d.id && activePill?.tipo === t.valor;
                              const activeColor = t.valor === "principal" ? { fg: GNOSS.success, bg: GNOSS.successBg } : { fg: GNOSS.info, bg: GNOSS.infoBg };
                              return (
                                <span
                                  key={t.valor}
                                  style={{
                                    border: `1px solid ${active ? activeColor.fg : GNOSS.grisBorde}`,
                                    background: active ? activeColor.bg : GNOSS.blanco,
                                    color: active ? activeColor.fg : GNOSS.textoMedio,
                                    borderRadius: 30,
                                    padding: "4px 12px",
                                    fontSize: 11.5,
                                    fontWeight: 600,
                                    textAlign: "left",
                                    transform: isFlashing ? "scale(0.96)" : "scale(1)",
                                    boxShadow: isFlashing ? `0 0 0 4px ${activeColor.bg}` : "none",
                                  }}
                                >
                                  {t.etiqueta}
                                </span>
                              );
                            })}
                          </div>
                        </>
                      ) : value ? (
                        <>
                          <p style={{ fontSize: 13.5, color: GNOSS.texto, lineHeight: 1.45, margin: 0 }}>{value}</p>
                          {seleccionada && (
                            <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 700, color: GNOSS.success, marginTop: 6, textTransform: "uppercase", letterSpacing: "0.02em" }}>
                              <Icon name="check_circle" size={14} />
                              Valor elegido
                            </span>
                          )}
                        </>
                      ) : (
                        <p style={{ fontSize: 13, color: GNOSS.muted, fontStyle: "italic", margin: 0 }}>— sin dato —</p>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ── PreviewPanel ──────────────────────────────────────────────────────────
export function PreviewPanel({ rows, pulse }: { rows: { dt: string; dd: string; procedencia?: string }[]; pulse?: boolean }) {
  return (
    <div
      style={{
        border: `1px solid ${GNOSS.primario}`,
        borderRadius: 12,
        padding: "10px 16px",
        background: GNOSS.primarioHighlight,
        fontFamily: GNOSS.font,
        boxShadow: pulse ? `0 0 0 5px ${GNOSS.primarioHighlight}` : "none",
      }}
    >
      <h3 style={{ display: "flex", alignItems: "center", gap: 6, margin: "0 0 8px", fontSize: 13.5, color: GNOSS.primario }}>
        <Icon name="task_alt" size={16} />
        Registro unificado (vista previa)
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", rowGap: 5, columnGap: 16 }}>
        {rows.map((r) => (
          <Fragment key={r.dt}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: GNOSS.textoMedio }}>{r.dt}</div>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: GNOSS.primario }}>
              {r.dd}
              {r.procedencia && <span style={{ fontWeight: 400, color: GNOSS.textoClaro, fontSize: 11.5, marginLeft: 6 }}>— {r.procedencia}</span>}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
