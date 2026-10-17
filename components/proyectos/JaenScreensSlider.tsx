"use client";

import ProjectScreenSlider, { type ProjectScreen } from "@/components/proyectos/ProjectScreenSlider";

// Turisme Jaén's 25 screens. The browser-window carousel that renders them
// lives in ProjectScreenSlider; this file is only the data and the two
// groupings the page uses.
//
// Sources: public/mockups/jaen/v2 (1440px-wide WebP, 178MB of JPG down to
// 6.9MB) plus 16:10 top-crop thumbnails in v2/thumbs.
const BASE = "/mockups/jaen/v2";
// Safe as a literal, unlike in JaenPage: every surface in the slider sits on
// its own dark background regardless of the site theme, and the brand yellow
// is 18:1 there.
const ACCENT = "#FDFF21";

const PORTAL: ProjectScreen[] = [
  { slug: "home", w: 1440, h: 8036,
    caption: { es: "La portada: el hero de provincia, el buscador y los bloques de inspiración", en: "The homepage: province hero, search and the inspiration blocks", ca: "La portada: l'hero de província, el cercador i els blocs d'inspiració" } },
  { slug: "buscador", w: 1440, h: 1019,
    caption: { es: "El buscador, con autocompletado y acceso al asistente de IA", en: "Search, with autocomplete and access to the AI assistant", ca: "El cercador, amb autocompletat i accés a l'assistent d'IA" } },
  { slug: "busqueda-resultados", w: 1440, h: 2355,
    caption: { es: "Resultados de búsqueda, agrupados por tipo de contenido", en: "Search results, grouped by content type", ca: "Resultats de cerca, agrupats per tipus de contingut" } },
  { slug: "listado-facetas", w: 1440, h: 1631,
    caption: { es: "Listado de lugares de interés, con filtros por tipo y localidad", en: "Places of interest, filtered by type and town", ca: "Llistat de llocs d'interès, amb filtres per tipus i localitat" } },
  { slug: "lugar-interes", w: 1440, h: 5222,
    caption: { es: "Ficha de lugar de interés: el castillo de Burgalimar", en: "A place of interest: Burgalimar castle", ca: "Fitxa de lloc d'interès: el castell de Burgalimar" } },
  { slug: "municipio", w: 1440, h: 7651,
    caption: { es: "Ficha de municipio: Úbeda, de un vistazo", en: "A town page: Úbeda, at a glance", ca: "Fitxa de municipi: Úbeda, d'un cop d'ull" } },
  { slug: "ruta", w: 1440, h: 6716,
    caption: { es: "Ficha de ruta: la Vía Verde del Aceite, con el mapa del recorrido", en: "A route page: the Vía Verde del Aceite, with its map", ca: "Fitxa de ruta: la Via Verda de l'Oli, amb el mapa del recorregut" } },
  { slug: "landing-gastronomia", w: 1440, h: 5993,
    caption: { es: "Landing temática: gastronomía y aceite de oliva", en: "A themed landing: food and olive oil", ca: "Landing temàtica: gastronomia i oli d'oliva" } },
  { slug: "experiencia", w: 1440, h: 3724,
    caption: { es: "Ficha de experiencia: un atardecer con cata en Aleuri Olympo", en: "An experience: sunset and tasting at Aleuri Olympo", ca: "Fitxa d'experiència: un capvespre amb tast a Aleuri Olympo" } },
  { slug: "evento", w: 1440, h: 2486,
    caption: { es: "Ficha de evento: la Andalucía Bike Race", en: "An event: the Andalucía Bike Race", ca: "Fitxa d'esdeveniment: l'Andalucía Bike Race" } },
  { slug: "eventos-resultados", w: 1440, h: 1869,
    caption: { es: "La agenda, filtrable por tipo, localidad y fecha", en: "The agenda, filtered by type, town and date", ca: "L'agenda, filtrable per tipus, localitat i data" } },
  { slug: "alojamiento", w: 1440, h: 4006,
    caption: { es: "Ficha de alojamiento, con galería y datos de contacto", en: "An accommodation page, with gallery and contact details", ca: "Fitxa d'allotjament, amb galeria i dades de contacte" } },
  { slug: "restaurante", w: 1440, h: 3713,
    caption: { es: "Ficha de restaurante: Bagá Espacio Gastronómico", en: "A restaurant page: Bagá Espacio Gastronómico", ca: "Fitxa de restaurant: Bagá Espacio Gastronómico" } },
  { slug: "carta-restaurante", w: 1440, h: 3074,
    caption: { es: "La carta de un restaurante, plato a plato", en: "A restaurant's menu, dish by dish", ca: "La carta d'un restaurant, plat a plat" } },
  { slug: "receta", w: 1440, h: 3146,
    caption: { es: "Ficha de receta, con ingredientes y pasos", en: "A recipe, with ingredients and steps", ca: "Fitxa de recepta, amb ingredients i passos" } },
  { slug: "producto-tipico", w: 1440, h: 3478,
    caption: { es: "Ficha de producto típico: un aceite de Sierra Santo Tomé", en: "A local product: an olive oil from Sierra Santo Tomé", ca: "Fitxa de producte típic: un oli de Sierra Santo Tomé" } },
  { slug: "cosmetica", w: 1440, h: 3508,
    caption: { es: "Ficha de empresa local: la biocosmética de Laiol", en: "A local business: Laiol's biocosmetics", ca: "Fitxa d'empresa local: la biocosmètica de Laiol" } },
];

const TOOLS: ProjectScreen[] = [
  { slug: "itinerario-vacio", w: 1440, h: 800,
    caption: { es: "El planificador vacío: los días del viaje, esperando contenido", en: "The empty planner: the days of the trip, waiting to be filled", ca: "El planificador buit: els dies del viatge, esperant contingut" } },
  { slug: "itinerario-filtros", w: 1440, h: 1102,
    caption: { es: "Filtrando qué añadir, sin salir del itinerario", en: "Filtering what to add, without leaving the itinerary", ca: "Filtrant què afegir, sense sortir de l'itinerari" } },
  { slug: "itinerario", w: 1440, h: 1102,
    caption: { es: "Las experiencias se arrastran al día que les toca", en: "Experiences are dragged into the day they belong to", ca: "Les experiències s'arrosseguen al dia que els toca" } },
  { slug: "itinerario-mapa", w: 1440, h: 2486,
    caption: { es: "El itinerario resuelto, día a día y sobre el mapa", en: "The finished itinerary, day by day and on the map", ca: "L'itinerari resolt, dia a dia i sobre el mapa" } },
  { slug: "mapa-favoritos", w: 1440, h: 800,
    caption: { es: "La vista de mapa, con las paradas guardadas", en: "The map view, with the saved stops", ca: "La vista de mapa, amb les parades desades" } },
  { slug: "perfil-viajes", w: 1440, h: 1120,
    caption: { es: "Área personal: los viajes guardados, exportables a PDF", en: "The personal area: saved trips, exportable to PDF", ca: "Àrea personal: els viatges desats, exportables a PDF" } },
  { slug: "perfil-favoritos", w: 1440, h: 1853,
    caption: { es: "Favoritos, organizados en listas propias", en: "Favourites, organised into the traveller's own lists", ca: "Preferits, organitzats en llistes pròpies" } },
  { slug: "perfil-intereses", w: 1440, h: 800,
    caption: { es: "Los intereses declarados, que alimentan las recomendaciones", en: "Declared interests, which feed the recommendations", ca: "Els interessos declarats, que alimenten les recomanacions" } },
];

// Block 1 — after the Overview: the visitor-facing portal, which is where the
// "one system, four voices" argument the page makes further down has to hold.
export default function JaenPortalSlider() {
  return (
    <ProjectScreenSlider
      screens={PORTAL}
      basePath={BASE}
      accent={ACCENT}
      eyebrow={{ es: "El portal público", en: "The public portal", ca: "El portal públic" }}
    />
  );
}

// Block 2 — Madrid's own slot for its video grid, just before "Aprendizajes":
// the planner and the personal area, the part that asks the visitor to come
// back rather than just to read.
export function JaenToolsSlider() {
  return (
    <ProjectScreenSlider
      screens={TOOLS}
      basePath={BASE}
      accent={ACCENT}
      eyebrow={{ es: "Planificar y volver", en: "Plan and come back", ca: "Planificar i tornar" }}
    />
  );
}
