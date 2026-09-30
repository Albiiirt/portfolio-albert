// Fixture data for the recreated Enoturismo Madrid interface. No fetch of
// the live site succeeded (certificate failure when checked 2026-09-28), so
// every name below is fictitious-but-representative: real route geography
// (the four DO-adjacent wine areas of the Comunidad de Madrid) with invented
// bodega/experience names, safe to recreate publicly.

export type RutaSlug = "navalcarnero" | "arganda-del-rey" | "san-martin-de-valdeiglesias" | "el-molar";

export type Ruta = {
  slug: RutaSlug;
  nombre: string;
  subtitulo: string;
  bodegasCount: number;
  resumen: string;
};

export const RUTAS: Ruta[] = [
  {
    slug: "navalcarnero",
    nombre: "Navalcarnero",
    subtitulo: "Ruta del Vino de Navalcarnero",
    bodegasCount: 5,
    resumen: "Bodegas centenarias a las puertas de Madrid, tinos de barro y garnachas de viñas viejas.",
  },
  {
    slug: "arganda-del-rey",
    nombre: "Arganda del Rey",
    subtitulo: "Ruta del Vino de Arganda",
    bodegasCount: 7,
    resumen: "La zona con mayor superficie de viñedo de la región, entre el Jarama y el Tajuña.",
  },
  {
    slug: "san-martin-de-valdeiglesias",
    nombre: "San Martín de Valdeiglesias",
    subtitulo: "Ruta de la Sierra Oeste",
    bodegasCount: 6,
    resumen: "Viñedos de altura sobre granito, al pie de la sierra de Gredos.",
  },
  {
    slug: "el-molar",
    nombre: "El Molar",
    subtitulo: "Ruta del Vino de El Molar",
    bodegasCount: 4,
    resumen: "La ruta más joven, entre olivares y viñas de replantación reciente.",
  },
];

export function getRuta(slug: RutaSlug) {
  return RUTAS.find((r) => r.slug === slug)!;
}

export type Experiencia = {
  id: string;
  nombre: string;
  duracion: string;
  precio: string;
  resumen: string;
};

export type Bodega = {
  id: string;
  nombre: string;
  rutaSlug: RutaSlug;
  resumen: string;
  descripcion: string;
  swatch: string; // stand-in gradient tone for the (absent) real photography
  experiencias: Experiencia[];
};

// Six bodegas for San Martín de Valdeiglesias — matches the "6 bodegas · Ruta
// de la Sierra Oeste" header shown in the video's route-detail beat. Only
// the first is opened to full detail; the rest exist so the grid reads as a
// real listing, not a two-card mockup.
export const BODEGAS: Bodega[] = [
  {
    id: "cerro-almenara",
    nombre: "Bodega Cerro Almenara",
    rutaSlug: "san-martin-de-valdeiglesias",
    resumen: "Viñas viejas de garnacha sobre suelos de granito, a 750m de altitud.",
    descripcion:
      "Bodega familiar de tercer generación en la falda de la sierra. Vendimia manual en cajas de 15kg y crianza en depósitos de hormigón. Las vistas al embalse de San Juan forman parte de la visita.",
    swatch: "linear-gradient(135deg, #5c7a52 0%, #3f5c3a 100%)",
    experiencias: [
      { id: "cata-guiada", nombre: "Cata guiada", duracion: "1h", precio: "22€", resumen: "4 vinos de la casa con el enólogo, en la sala de barricas." },
      { id: "cata-pisado", nombre: "Cata + pisado de uva", duracion: "2h", precio: "38€", resumen: "Pisado tradicional en lagar de piedra seguido de una cata de 5 vinos." },
      { id: "picnic-vinas", nombre: "Picnic entre viñas", duracion: "1h30", precio: "32€", resumen: "Picnic de producto local entre las cepas más viejas de la finca." },
    ],
  },
  {
    id: "vega-del-alberche",
    nombre: "Bodega Vega del Alberche",
    rutaSlug: "san-martin-de-valdeiglesias",
    resumen: "Elaboraciones de albillo real junto al río Alberche.",
    descripcion: "",
    swatch: "linear-gradient(135deg, #8c3a5a 0%, #4a1528 100%)",
    experiencias: [],
  },
  {
    id: "pena-del-cuervo",
    nombre: "Bodega Peña del Cuervo",
    rutaSlug: "san-martin-de-valdeiglesias",
    resumen: "Tintos de guarda en cueva excavada en roca.",
    descripcion: "",
    swatch: "linear-gradient(135deg, #4a6670 0%, #24343b 100%)",
    experiencias: [],
  },
  {
    id: "los-canchales",
    nombre: "Bodega Los Canchales",
    rutaSlug: "san-martin-de-valdeiglesias",
    resumen: "Ecológica desde 2009, garnacha y syrah en vaso.",
    descripcion: "",
    swatch: "linear-gradient(135deg, #b5793f 0%, #7a4f24 100%)",
    experiencias: [],
  },
  {
    id: "fuente-del-roble",
    nombre: "Bodega Fuente del Roble",
    rutaSlug: "san-martin-de-valdeiglesias",
    resumen: "Crianza en roble francés, visitas al viñedo en 4x4.",
    descripcion: "",
    swatch: "linear-gradient(135deg, #6b5a3f 0%, #3a2e1f 100%)",
    experiencias: [],
  },
  {
    id: "cantos-blancos",
    nombre: "Bodega Cantos Blancos",
    rutaSlug: "san-martin-de-valdeiglesias",
    resumen: "Espumosos de altura, método tradicional.",
    descripcion: "",
    swatch: "linear-gradient(135deg, #7a2e42 0%, #3d1620 100%)",
    experiencias: [],
  },
];

export function getBodegasDeRuta(slug: RutaSlug) {
  return BODEGAS.filter((b) => b.rutaSlug === slug);
}
export function getBodega(id: string) {
  return BODEGAS.find((b) => b.id === id)!;
}
