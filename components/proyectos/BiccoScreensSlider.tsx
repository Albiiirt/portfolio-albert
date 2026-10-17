"use client";

import ProjectScreenSlider, { type ProjectScreen } from "@/components/proyectos/ProjectScreenSlider";

// Bicco's screens (Albert, 2026-10-17). What was here before: six JPEGs at
// 1054x654, shown through a slider written just for this page that cropped
// them into a 1600/1000 box with object-fit: cover and then upscaled them to
// 1440 — blurred and cut off, and only six of the sixteen pages that exist.
//
// These twelve are captured from the real source instead: the HTML prototypes
// in ~/Documents/GitHub/bicco, rendered in headless Chrome over CDP at 2x and
// full page, with `captureBeyondViewport` so the viewport stays 1440x900 and
// the hero's `vh` units do not stretch. Charts (Chart.js, D3) and maps render
// in the capture, so these are the working pages, not mockups of them.
//
// Left out on purpose: the dark-mode homepage (Albert's call — only the light
// one), and the three `iconos-tipos` pages, which are icon specimens rather
// than screens and belong in a components sheet.
const BASE = "/mockups/bicco";

// Bicco's orange reaches only 4.1:1 as text on the slider's dark background,
// so the eyebrow gets a lighter tone of the same hue at 6.8:1. Surfaces keep
// the real brand colour.
const ACCENT = "#d63900";
const ACCENT_TEXT = "#ff6b35";

const PRODUCTO: ProjectScreen[] = [
  {
    slug: "home", w: 1440, h: 4576,
    caption: { es: "La portada: buscador de entrada y el resumen global de expedientes", en: "The homepage: entry search and the global summary of grant files", ca: "La portada: cercador d'entrada i el resum global d'expedients" },
  },
  {
    slug: "buscador", w: 1440, h: 1635,
    caption: { es: "El buscador con facetas: filtros acumulables a la izquierda, resultados y relacionados", en: "Faceted search: stacking filters on the left, results and related records", ca: "El cercador amb facetes: filtres acumulables a l'esquerra, resultats i relacionats" },
  },
  {
    slug: "busqueda-avanzada", w: 1440, h: 892,
    caption: { es: "La búsqueda avanzada: construir la consulta por términos incluidos y excluidos", en: "Advanced search: building the query from included and excluded terms", ca: "La cerca avançada: construir la consulta per termes inclosos i exclosos" },
  },
  {
    slug: "explorador", w: 1440, h: 821,
    caption: { es: "El explorador de tecnologías: evolución comparada de la I+D española", en: "The technology explorer: comparing the evolution of Spanish R&D", ca: "L'explorador de tecnologies: evolució comparada de la I+D espanyola" },
  },
];

const FICHAS: ProjectScreen[] = [
  {
    slug: "ficha-cdti", w: 1440, h: 1947,
    caption: { es: "Expediente CDTI: datos rápidos, financiación y descripción del proyecto", en: "A CDTI grant file: key data, funding and project description", ca: "Expedient CDTI: dades ràpides, finançament i descripció del projecte" },
  },
  {
    slug: "ficha-pcti", w: 1440, h: 1997,
    caption: { es: "Expediente de proyecto europeo PCTI, con sus entidades participantes", en: "A European PCTI project file, with its participating entities", ca: "Expedient de projecte europeu PCTI, amb les seves entitats participants" },
  },
  {
    slug: "ficha-programa-marco", w: 1440, h: 2062,
    caption: { es: "Expediente de Programa Marco, con su enlace al registro europeo CORDIS", en: "A Framework Programme file, linked out to the European CORDIS registry", ca: "Expedient de Programa Marc, amb el seu enllaç al registre europeu CORDIS" },
  },
  {
    slug: "ficha-linea", w: 1440, h: 1993,
    caption: { es: "Línea de financiación: qué es, qué cubre y todo lo que cuelga de ella", en: "A funding line: what it is, what it covers and everything hanging off it", ca: "Línia de finançament: què és, què cobreix i tot el que en penja" },
  },
  {
    slug: "ficha-organizacion", w: 1440, h: 2504,
    caption: { es: "Ficha de organización: la empresa y sus expedientes año a año", en: "An organisation page: the company and its files year by year", ca: "Fitxa d'organització: l'empresa i els seus expedients any rere any" },
  },
  {
    slug: "ficha-region", w: 1440, h: 2765,
    caption: { es: "Ficha de región: Andalucía en cifras, con su evolución temporal", en: "A region page: Andalusia in figures, with its evolution over time", ca: "Fitxa de regió: Andalusia en xifres, amb la seva evolució temporal" },
  },
  {
    slug: "ficha-termino", w: 1440, h: 2301,
    caption: { es: "Término científico: el concepto, su contexto taxonómico y lo que lo cita", en: "A scientific term: the concept, its taxonomy context and what cites it", ca: "Terme científic: el concepte, el seu context taxonòmic i el que el cita" },
  },
];

// Block 1 — after the Overview, and the target of the hero's "Ver pantallas"
// CTA, which scrolls here because there is no public deployment to link to.
export default function BiccoProductSlider() {
  return (
    <ProjectScreenSlider
      id="bicco-screens"
      screens={PRODUCTO}
      basePath={BASE}
      accent={ACCENT}
      accentText={ACCENT_TEXT}
      eyebrow={{ es: "El producto", en: "The product", ca: "El producte" }}
    />
  );
}

// Block 2 — after "El trabajo": seven record types resolved with one system,
// which is the claim that section makes. Was eight: the two DIGIMANUF files
// (`..._con_buscador_sin_cajas` and `..._sin_buscador_con_cajas`) render
// byte-identical — the variants converged at some point and only the file
// names still claim a difference — so one of them went.
export function BiccoRecordsSlider() {
  return (
    <ProjectScreenSlider
      screens={FICHAS}
      basePath={BASE}
      accent={ACCENT}
      accentText={ACCENT_TEXT}
      eyebrow={{ es: "Siete fichas, un sistema", en: "Seven record types, one system", ca: "Set fitxes, un sistema" }}
    />
  );
}
