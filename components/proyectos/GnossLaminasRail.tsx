"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Dialog } from "@base-ui/react/dialog";
import FadeInView from "@/components/FadeInView";
import { useLang } from "@/lib/LanguageContext";

// GNOSS's infographic plates (Albert, 2026-10-17). "El trabajo" claims covers,
// infographics and presentations made inside someone else's system, and until
// now the page showed none of them.
//
// Deliberately not the browser-window carousel the web captures use: these are
// 1380px-wide landscape diagrams, not pages, and what makes them worth showing
// is not any single one but that there are 56 of them and they all obey the
// same rules. One at a time would hide exactly the thing being argued, so they
// run as a rail the visitor drives, three or so on screen at once.
//
// Four revisions the same day, all Albert's: a 56-up wall (too tall), an
// autoplaying marquee at six to eight across (plates unreadable, and a moving
// target is awkward to click), a rail stepping a screenful at a time, and now
// this — bigger plates, one step per arrow press, and arrows inside the
// lightbox so a visitor who opens one plate can walk the whole set without
// closing it.
//
// Uniform height rather than uniform width: the plates come in three aspect
// ratios (1380x400, x600, x700) and fixing the width left a ragged lower edge.
// Fixing the height keeps the band straight and lets each plate be as wide as
// it really is.
const BASE = "/mockups/gnoss/laminas";
const ACCENT = "#0a66f2";

// Light diagrams on a light card: the dark section background would otherwise
// cut straight into the plate's own white.
const PLATE_BG = "#f4f4f2";
const DARK_BG = "#12100e";
const CAPTION_LIGHT = "#cfc9bd";

// 180px keeps about three plates in view at site-content's 1440px — the
// commonest ratio here, 1380x600, is 414px wide at this height.
const PLATE_H = 180;

type Plate = { slug: string; w: number; h: number };

const PLATES: Plate[] = [
  { slug: "01", w: 1380, h: 600 },
  { slug: "02", w: 1380, h: 700 },
  { slug: "03", w: 1380, h: 700 },
  { slug: "04", w: 1380, h: 400 },
  { slug: "05", w: 1380, h: 600 },
  { slug: "06", w: 1380, h: 400 },
  { slug: "07a", w: 1380, h: 400 },
  { slug: "07b", w: 1380, h: 600 },
  { slug: "07c", w: 1380, h: 600 },
  { slug: "08", w: 1380, h: 600 },
  { slug: "09", w: 1380, h: 600 },
  { slug: "10", w: 1380, h: 600 },
  { slug: "11", w: 1380, h: 600 },
  { slug: "12", w: 1380, h: 600 },
  { slug: "13", w: 1380, h: 600 },
  { slug: "14", w: 1380, h: 600 },
  { slug: "15", w: 1380, h: 400 },
  { slug: "16", w: 1380, h: 600 },
  { slug: "17", w: 1380, h: 600 },
  { slug: "18", w: 1380, h: 600 },
  { slug: "19", w: 1380, h: 400 },
  { slug: "20", w: 1380, h: 600 },
  { slug: "21", w: 1380, h: 400 },
  { slug: "22", w: 1380, h: 400 },
  { slug: "23", w: 1380, h: 600 },
  { slug: "24", w: 1380, h: 600 },
  { slug: "25", w: 1380, h: 400 },
  { slug: "26", w: 1380, h: 600 },
  { slug: "27", w: 1380, h: 600 },
  { slug: "28", w: 1380, h: 400 },
  { slug: "29", w: 1380, h: 400 },
  { slug: "29a", w: 1380, h: 400 },
  { slug: "29b", w: 1380, h: 400 },
  { slug: "30", w: 1380, h: 400 },
  { slug: "31", w: 1380, h: 600 },
  { slug: "32", w: 1380, h: 400 },
  { slug: "33", w: 1380, h: 600 },
  { slug: "34", w: 1380, h: 600 },
  { slug: "35", w: 1380, h: 600 },
  { slug: "36", w: 1380, h: 600 },
  { slug: "37", w: 1380, h: 600 },
  { slug: "38", w: 1380, h: 600 },
  { slug: "39", w: 1380, h: 600 },
  { slug: "40", w: 1380, h: 600 },
  { slug: "41", w: 1380, h: 600 },
  { slug: "42", w: 1380, h: 400 },
  { slug: "43", w: 1380, h: 600 },
  { slug: "44-propuesta-zoom", w: 1380, h: 400 },
  { slug: "44", w: 1380, h: 600 },
  { slug: "45", w: 1380, h: 400 },
  { slug: "46", w: 1380, h: 600 },
  { slug: "47-1-mapa-completo", w: 1380, h: 600 },
  { slug: "47-2-recorte", w: 1380, h: 600 },
  { slug: "47-3", w: 1380, h: 600 },
  { slug: "47-4", w: 1380, h: 600 },
  { slug: "48", w: 1380, h: 600 }
];

const COPY = {
  eyebrow: { es: "Las láminas", en: "The plates", ca: "Les làmines" },
  lead: {
    es: "Cincuenta y seis diagramas para la misma colección, con las mismas reglas de nodo, conector y color.",
    en: "Fifty-six diagrams for one collection, under the same rules for nodes, connectors and colour.",
    ca: "Cinquanta-sis diagrames per a la mateixa col·lecció, amb les mateixes regles de node, connector i color.",
  },
  open: { es: "Ampliar lámina", en: "Enlarge plate", ca: "Ampliar làmina" },
  close: { es: "Cerrar", en: "Close", ca: "Tancar" },
  prev: { es: "Lámina anterior", en: "Previous plate", ca: "Làmina anterior" },
  next: { es: "Lámina siguiente", en: "Next plate", ca: "Làmina següent" },
};

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d={dir === "left" ? "M8 1L3 6l5 5" : "M4 1l5 5-5 5"}
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

export default function GnossLaminasRail() {
  const { lang } = useLang();
  const [active, setActive] = useState<number | null>(null);
  const railRef = useRef<HTMLDivElement>(null);

  // One plate per press, not a screenful: the plates have three different
  // widths, so a fixed pixel step drifts out of alignment within a few
  // presses. Reads the real offsets instead and lands on the neighbour.
  const step = useCallback((dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const offsets = [...el.children].map((c) => (c as HTMLElement).offsetLeft);
    const here = offsets.reduce((best, o, i) => (Math.abs(o - el.scrollLeft) < Math.abs(offsets[best] - el.scrollLeft) ? i : best), 0);
    const target = Math.min(offsets.length - 1, Math.max(0, here + dir));
    el.scrollTo({ left: offsets[target], behavior: "smooth" });
  }, []);

  const move = useCallback((dir: 1 | -1) => {
    setActive((i) => (i === null ? i : (i + dir + PLATES.length) % PLATES.length));
  }, []);

  // Arrow keys walk the set while the lightbox is open — the obvious gesture
  // once there are arrows on screen.
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") move(1);
      else if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, move]);

  const plate = active === null ? null : PLATES[active];

  return (
    <section style={{ background: DARK_BG, padding: "var(--space-section-y) var(--space-section-x)" }}>
      <div className="site-content">
        <FadeInView>
          <p className="section-label" style={{ color: ACCENT, margin: "0 0 1.5rem" }}>{COPY.eyebrow[lang]}</p>

          <p style={{ margin: "0 0 1.75rem", maxWidth: "52ch", fontSize: 14, lineHeight: 1.5, color: CAPTION_LIGHT }}>
            {COPY.lead[lang]}
          </p>

          <div className="laminas-rail" ref={railRef}>
            {PLATES.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`${COPY.open[lang]} ${p.slug}`}
                className="cursor-hidden gnoss-lamina"
                style={{
                  all: "unset", cursor: "pointer", flex: "0 0 auto",
                  height: PLATE_H, scrollSnapAlign: "start",
                  borderRadius: 6, overflow: "hidden", background: PLATE_BG,
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Image
                  src={`${BASE}/thumbs/${p.slug}.webp`}
                  alt=""
                  width={p.w}
                  height={p.h}
                  sizes="620px"
                  style={{ display: "block", height: "100%", width: "auto" }}
                />
              </button>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 16 }}>
            <button type="button" aria-label={COPY.prev[lang]} onClick={() => step(-1)} className="cursor-hidden laminas-arrow">
              <Chevron dir="left" />
            </button>
            <button type="button" aria-label={COPY.next[lang]} onClick={() => step(1)} className="cursor-hidden laminas-arrow">
              <Chevron dir="right" />
            </button>
          </div>
        </FadeInView>
      </div>

      <Dialog.Root open={plate !== null} onOpenChange={(o) => !o && setActive(null)} modal>
        <Dialog.Portal>
          <Dialog.Backdrop className="lamina-backdrop" />
          <Dialog.Popup className="lamina-popup">
            {plate && (
              <Image
                src={`${BASE}/${plate.slug}.webp`}
                alt=""
                width={plate.w}
                height={plate.h}
                sizes="92vw"
                style={{ display: "block", width: "100%", height: "auto", borderRadius: 8, background: PLATE_BG }}
              />
            )}
          </Dialog.Popup>

          {/* Outside the popup so they stay put against the viewport while the
              plate inside changes height between the three aspect ratios. */}
          <button type="button" aria-label={COPY.prev[lang]} onClick={() => move(-1)} className="cursor-hidden lamina-nav lamina-nav-prev">
            <Chevron dir="left" />
          </button>
          <button type="button" aria-label={COPY.next[lang]} onClick={() => move(1)} className="cursor-hidden lamina-nav lamina-nav-next">
            <Chevron dir="right" />
          </button>
          <Dialog.Close className="lamina-close cursor-hidden" aria-label={COPY.close[lang]}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
              <path d="M2 2l11 11M13 2L2 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </Dialog.Close>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
