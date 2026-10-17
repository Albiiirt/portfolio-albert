"use client";

import ProjectScreenSlider, { type ProjectScreen } from "@/components/proyectos/ProjectScreenSlider";

// Bullipedia's screens (Albert, 2026-10-17). The elBulli case study had no
// visual evidence at all — the only moving images on the page were the covers
// of the related-project cards — which made the most recognisable client name
// in the portfolio also the worst-defended one.
//
// Captured from the live demo the page already links to
// (bullipedia-demo.vercel.app), through headless Chrome over CDP at 2x and
// full page, same pipeline as Bicco. The four pages are the model itself:
// catálogo → libro → capítulo. The article page was captured too and then
// dropped (Albert, 2026-10-17): at 27.776px it is almost entirely one grey
// placeholder image, so it showed the demo's missing artwork rather than any
// design decision.
//
// The Archivo elBulli tab still has none: its front-end runs locally but every
// route redirects to /login against a production Supabase, so there is nothing
// to capture without signing in.
const BASE = "/mockups/elbulli";
const ACCENT = "#4a8fcc";

const SCREENS: ProjectScreen[] = [
  {
    slug: "catalogo", w: 1440, h: 988,
    caption: {
      es: "El catálogo: la puerta de entrada a toda la colección de libros",
      en: "The catalogue: the way into the whole collection of books",
      ca: "El catàleg: la porta d'entrada a tota la col·lecció de llibres",
    },
  },
  {
    slug: "libro", w: 1440, h: 2486,
    caption: {
      es: "Un libro, con su ficha y los capítulos que lo componen",
      en: "A book, with its record and the chapters that make it up",
      ca: "Un llibre, amb la seva fitxa i els capítols que el componen",
    },
  },
  {
    slug: "capitulo", w: 1440, h: 1810,
    caption: {
      es: "Un capítulo y sus artículos: el nivel intermedio del modelo",
      en: "A chapter and its articles: the model's middle level",
      ca: "Un capítol i els seus articles: el nivell intermedi del model",
    },
  },
];

export default function BullipediaSlider() {
  return (
    <ProjectScreenSlider
      screens={SCREENS}
      basePath={BASE}
      accent={ACCENT}
      eyebrow={{ es: "Catálogo, libro, capítulo", en: "Catalogue, book, chapter", ca: "Catàleg, llibre, capítol" }}
    />
  );
}
