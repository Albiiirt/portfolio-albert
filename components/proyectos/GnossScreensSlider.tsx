"use client";

import ProjectScreenSlider, { type ProjectScreen } from "@/components/proyectos/ProjectScreenSlider";

// GNOSS's screens (Albert, 2026-10-17): the project page had no visual
// evidence at all — `screens` was absent and `deviceShowcase` commented out —
// for a case study whose whole argument is about working inside someone
// else's design system. These are the pages designed within it.
//
// Sources: public/mockups/gnoss (1440px-wide WebP, 30MB of JPG down to 1.5MB)
// plus 16:10 top-crop thumbnails in gnoss/thumbs. Same browser-window
// carousel as Turisme Jaén — see ProjectScreenSlider.
const BASE = "/mockups/gnoss";

// The brand blue, used for the surfaces (window chrome dot, active thumbnail
// ring). As eyebrow text on the slider's dark background it only reaches
// 4.1:1, so the text gets a lighter tone of the same hue at 5.9:1.
const ACCENT = "#0a66f2";
const ACCENT_TEXT = "#4d8df5";

const DECISION: ProjectScreen[] = [
  {
    slug: "formaciones", w: 1440, h: 2567,
    caption: {
      es: "Formación certificada: los cinco itinerarios, en su versión sin ilustrar",
      en: "Certified training: the five tracks, in their unillustrated version",
      ca: "Formació certificada: els cinc itineraris, en la versió sense il·lustrar",
    },
  },
  {
    slug: "formaciones-ilustrada", w: 1440, h: 2567,
    caption: {
      es: "La misma página con ilustración por itinerario — la decisión que se estaba comparando",
      en: "The same page with an illustration per track — the decision being compared",
      ca: "La mateixa pàgina amb il·lustració per itinerari — la decisió que es comparava",
    },
  },
];

const PAGINAS: ProjectScreen[] = [
  {
    slug: "curso-fundamentals", w: 1440, h: 3758,
    caption: {
      es: "Ficha de curso: competencias, requisitos previos y los cursos que completan la formación",
      en: "A course page: skills, prerequisites and the courses that complete the track",
      ca: "Fitxa de curs: competències, requisits previs i els cursos que completen la formació",
    },
  },
  {
    slug: "curso-consultant", w: 1440, h: 5558,
    caption: {
      es: "La variante larga de la ficha, con el desglose por perfil de certificación",
      en: "The long variant of that page, broken down by certification profile",
      ca: "La variant llarga de la fitxa, amb el desglossament per perfil de certificació",
    },
  },
  {
    slug: "blog", w: 1440, h: 2919,
    caption: {
      es: "El blog: destacado, filtros por temática y listado",
      en: "The blog: featured post, topic filters and listing",
      ca: "El blog: destacat, filtres per temàtica i llistat",
    },
  },
  {
    slug: "articulo", w: 1440, h: 2368,
    caption: {
      es: "Artículo, con autoría, tiempo de lectura y descarga de adjuntos",
      en: "An article, with byline, reading time and attachment downloads",
      ca: "Article, amb autoria, temps de lectura i descàrrega d'adjunts",
    },
  },
];

// Block 1 — between "El reto" and "El sistema visual": the course listing
// with and without its illustrations. Two shots of one page is not filler
// here, it is the comparison itself — exactly the kind of decision the
// section that follows is about.
export default function GnossDecisionSlider() {
  return (
    <ProjectScreenSlider
      screens={DECISION}
      basePath={BASE}
      accent={ACCENT}
      accentText={ACCENT_TEXT}
      eyebrow={{ es: "La misma página, dos veces", en: "The same page, twice", ca: "La mateixa pàgina, dues vegades" }}
    />
  );
}

// Block 2 — after "El trabajo", which enumerates what was built inside the
// system; these are the pages that back it up.
export function GnossPagesSlider() {
  return (
    <ProjectScreenSlider
      screens={PAGINAS}
      basePath={BASE}
      accent={ACCENT}
      accentText={ACCENT_TEXT}
      eyebrow={{ es: "Páginas nuevas en el sistema", en: "New pages inside the system", ca: "Pàgines noves dins del sistema" }}
    />
  );
}
