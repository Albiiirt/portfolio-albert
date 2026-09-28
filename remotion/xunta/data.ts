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
  { id: "g002", estado: "pendiente", confianza: 78, terminoIds: ["t003", "t004"], actualizado: "2026-08-27", nombrePrincipal: "Feijoo, Benito Jerónimo" },
  { id: "g003", estado: "revisado", confianza: 97, terminoIds: ["t005", "t006", "t007"], actualizado: "2026-08-24", nombrePrincipal: "Sarmiento, Martín" },
  { id: "g004", estado: "no-duplicado", confianza: 55, terminoIds: ["t008", "t009"], actualizado: "2026-08-20", nombrePrincipal: "Pardo Bazán, Emilia" },
  { id: "g005", estado: "pendiente", confianza: 88, terminoIds: ["t010", "t011"], actualizado: "2026-08-30", nombrePrincipal: "Castelao, Alfonso R." },
  { id: "g006", estado: "revision", confianza: 81, terminoIds: ["t012", "t013"], actualizado: "2026-08-28", nombrePrincipal: "Rosalía de Castro" },
  { id: "g007", estado: "pendiente", confianza: 65, terminoIds: ["t014", "t015"], actualizado: "2026-08-31", nombrePrincipal: "Otero Pedrayo, Ramón" },
  { id: "g008", estado: "revisado", confianza: 90, terminoIds: ["t016", "t017"], actualizado: "2026-08-22", nombrePrincipal: "Curros Enríquez, Manuel" },
];

export function getGrupo(id: string) {
  return GRUPOS.find((g) => g.id === id)!;
}
export function getDocumentosDeGrupo(g: Grupo) {
  return TERMINOS.filter((t) => g.terminoIds.includes(t.id));
}
