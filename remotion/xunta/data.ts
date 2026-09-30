// Fixture data lifted 1:1 from the real prototype's assets/js/data.js
// (galiciana-thesaurus/01_prototipo-dosgrapas) — fictitious library-catalog
// data, no real people/records, safe to recreate publicly.

export type Termino = {
  id: string;
  nombre: string;
  fuente: string;
  estado: string;
  grupoId: string | null;
  ficha: {
    idControl: string;
    nombreAutorizado: string;
    formasVariantes: string[];
    fechasAsociadas: string;
    fuenteCatalogacion: string;
    notaBiografica: string;
  };
};

export const TERMINOS: Termino[] = [
  {
    id: "t001",
    nombre: "Boerhaave, Hermann",
    fuente: "Biblioteca de Galicia",
    estado: "revision",
    grupoId: "g001",
    ficha: {
      idControl: "PF10433218",
      nombreAutorizado: "Boerhaave, Hermann",
      formasVariantes: ["Boerhaave, Herman", "Boerhaave, H."],
      fechasAsociadas: "1668-1738",
      fuenteCatalogacion: "Biblioteca de Galicia · lat",
      notaBiografica: "Médico y botánico neerlandés, catedrático en Leiden.",
    },
  },
  {
    id: "t002",
    nombre: "Boerhaave, H.",
    fuente: "Catálogo Digital",
    estado: "revision",
    grupoId: "g001",
    ficha: {
      idControl: "PF19600133",
      nombreAutorizado: "Boerhaave, H.",
      formasVariantes: ["Boerhaave, Hermannus"],
      fechasAsociadas: "1668-1737",
      fuenteCatalogacion: "Catálogo Digital · spa",
      notaBiografica: "",
    },
  },
  {
    id: "t003",
    nombre: "Richelieu, Armand Jean du Plessis",
    fuente: "Biblioteca de Galicia",
    estado: "pendiente",
    grupoId: "g002",
    ficha: {
      idControl: "PF41208833",
      nombreAutorizado: "Richelieu, Armand Jean du Plessis",
      formasVariantes: ["Richelieu, Cardenal de"],
      fechasAsociadas: "1585-1642",
      fuenteCatalogacion: "Biblioteca de Galicia · fre",
      notaBiografica: "Cardenal y hombre de Estado francés.",
    },
  },
  {
    id: "t004",
    nombre: "Richelieu, Cardenal de",
    fuente: "Catálogo Digital",
    estado: "pendiente",
    grupoId: "g002",
    ficha: {
      idControl: "PF77042910",
      nombreAutorizado: "Richelieu, Cardenal de",
      formasVariantes: [],
      fechasAsociadas: "1585-1642",
      fuenteCatalogacion: "Catálogo Digital · spa",
      notaBiografica: "",
    },
  },
  {
    id: "t005",
    nombre: "Covarrubias de Leiva, Diego",
    fuente: "Biblioteca de Galicia",
    estado: "revisado",
    grupoId: "g003",
    ficha: {
      idControl: "PF23511615",
      nombreAutorizado: "Covarrubias de Leiva, Diego",
      formasVariantes: ["Covarrubias, Diego de", "Covarrubias y Leyva, D."],
      fechasAsociadas: "1512-1577",
      fuenteCatalogacion: "Biblioteca de Galicia · spa",
      notaBiografica: "Jurista y obispo español, autor de tratados canónicos.",
    },
  },
  {
    id: "t006",
    nombre: "Covarrubias, Diego de",
    fuente: "Catálogo Digital",
    estado: "revisado",
    grupoId: "g003",
    ficha: {
      idControl: "PF59407816",
      nombreAutorizado: "Covarrubias, Diego de",
      formasVariantes: ["Covarrubias de Leyva, Diego"],
      fechasAsociadas: "1512-1577",
      fuenteCatalogacion: "Catálogo Digital · spa",
      notaBiografica: "",
    },
  },
  {
    id: "t007",
    nombre: "Covarrubias y Leyva, D.",
    fuente: "Fondo Antiguo USC",
    estado: "revisado",
    grupoId: "g003",
    ficha: {
      idControl: "PF18495931",
      nombreAutorizado: "Covarrubias y Leyva, D.",
      formasVariantes: [],
      fechasAsociadas: "",
      fuenteCatalogacion: "Fondo Antiguo USC · lat",
      notaBiografica: "",
    },
  },
  {
    id: "t024",
    nombre: "Covarrubias, D.",
    fuente: "Biblioteca de Galicia",
    estado: "sin-duplicados",
    grupoId: null,
    ficha: {
      idControl: "PF57871331",
      nombreAutorizado: "Covarrubias, D.",
      formasVariantes: [],
      fechasAsociadas: "",
      fuenteCatalogacion: "Biblioteca de Galicia · spa",
      notaBiografica: "",
    },
  },
  {
    id: "t022",
    nombre: "Alfonso XI, Rey de Castilla y León",
    fuente: "Catálogo Digital",
    estado: "sin-duplicados",
    grupoId: null,
    ficha: {
      idControl: "PF18227824",
      nombreAutorizado: "Alfonso XI, Rey de Castilla y León",
      formasVariantes: [],
      fechasAsociadas: "1311-1350",
      fuenteCatalogacion: "Catálogo Digital · spa",
      notaBiografica: "",
    },
  },
];

export const ESQUEMA_MARC = [
  { campo: "idControl", codigo: "001", etiqueta: "Número de control" },
  { campo: "nombreAutorizado", codigo: "100", etiqueta: "Encabezamiento — Nombre de persona" },
  { campo: "formasVariantes", codigo: "400", etiqueta: "Forma variante del nombre" },
  { campo: "fechasAsociadas", codigo: "046", etiqueta: "Fechas asociadas" },
  { campo: "fuenteCatalogacion", codigo: "040", etiqueta: "Fuente de catalogación" },
  { campo: "notaBiografica", codigo: "678", etiqueta: "Nota biográfica" },
] as const;

// Real prototype's ISAAR (archival) schema — same fields, different order,
// labels and no MARC field codes. Swapping to it is one of the beats shown
// in the video (esquema-toggle in ficha.css/ficha.js).
export const ESQUEMA_ISAAR = [
  { campo: "nombreAutorizado", etiqueta: "Forma autorizada del nombre" },
  { campo: "formasVariantes", etiqueta: "Formas paralelas / variantes" },
  { campo: "fechasAsociadas", etiqueta: "Fechas de existencia" },
  { campo: "notaBiografica", etiqueta: "Historia / nota biográfica" },
  { campo: "fuenteCatalogacion", etiqueta: "Fuente" },
  { campo: "idControl", etiqueta: "Identificador" },
] as const;

export type Grupo = {
  id: string;
  estado: string;
  confianza: number;
  terminoIds: string[];
  actualizado: string;
  nombrePrincipal: string;
};

// Subset of the real GRUPOS array (galiciana-thesaurus data.js) — enough to
// populate every Kanban column with a believable count for the "El trabajo"
// beat, Boerhaave's g001 among them.
export const GRUPOS: Grupo[] = [
  { id: "g001", estado: "revision", confianza: 92, terminoIds: ["t001", "t002"], actualizado: "2026-08-29", nombrePrincipal: "Boerhaave, Hermann" },
  { id: "g002", estado: "pendiente", confianza: 78, terminoIds: ["t003", "t004"], actualizado: "2026-08-27", nombrePrincipal: "Richelieu, Armand Jean du Plessis" },
  { id: "g003", estado: "revisado", confianza: 97, terminoIds: ["t005", "t006", "t007"], actualizado: "2026-08-24", nombrePrincipal: "Covarrubias de Leiva, Diego" },
  { id: "g004", estado: "no-duplicado", confianza: 55, terminoIds: ["t008", "t009"], actualizado: "2026-08-20", nombrePrincipal: "Palanco, Francisco" },
  { id: "g005", estado: "pendiente", confianza: 88, terminoIds: ["t010", "t011"], actualizado: "2026-08-30", nombrePrincipal: "Osuna e Infantado, Pedro de Alcántara" },
  { id: "g006", estado: "revision", confianza: 81, terminoIds: ["t012", "t013"], actualizado: "2026-08-28", nombrePrincipal: "Jesucristo" },
  { id: "g007", estado: "pendiente", confianza: 65, terminoIds: ["t014", "t015"], actualizado: "2026-08-31", nombrePrincipal: "Maria Magdalena de Pazzis" },
  { id: "g008", estado: "revisado", confianza: 90, terminoIds: ["t016", "t017"], actualizado: "2026-08-22", nombrePrincipal: "Miguel de los Santos" },
];

export function getGrupo(id: string) {
  return GRUPOS.find((g) => g.id === id)!;
}
export function getDocumentosDeGrupo(g: Grupo) {
  return TERMINOS.filter((t) => g.terminoIds.includes(t.id));
}
