import { t } from "./translations";

export type LocalizedText = { en: string; es: string; ca: string };

export type MetaLabelKey =
  | "client"
  | "year"
  | "status"
  | "role"
  | "stack"
  | "team"
  | "studio"
  | "duration"
  | "web"
  | "project";

export type MetaItem = {
  labelKey?: MetaLabelKey;
  label?: LocalizedText;
  value: string | LocalizedText;
  href?: string;
};

export type ContentCard = { label: LocalizedText; desc: LocalizedText };

// A single screen shown in the project's mobile screens showcase. A bare
// string is a shorthand for an image with no custom alt/video flag.
export type ProjectScreen =
  | string
  | { src: string; alt?: LocalizedText; video?: boolean };

// Diseñador-specified composition for the desktop/tablet/mobile device
// showcase shown between a project page's Hero and Overview (see
// ProjectDeviceShowcase) — editorial/frameless, one single style site-wide.
export type DeviceShowcaseSlot = { src: string; alt: LocalizedText };
export type DeviceShowcase = {
  desktop: DeviceShowcaseSlot;
  tablet: DeviceShowcaseSlot;
  mobile: DeviceShowcaseSlot;
  caption: LocalizedText;
};

// Row of 3 static mobile screens (see ProjectMobileFlowStrip) — deliberately
// not a variant of ProjectScreensShowcase (that component is a carousel
// state machine with autoplay/drag/dots; forcing a static mode inside it
// would complicate it for one project). No longer populated via
// Project.mobileFlowStrip (Madrid's own data moved into interficiaShowcase
// below) — Mirazur's "cupón" tab passes its own data directly instead.
export type MobileFlowStripScreen = { src: string; alt: LocalizedText; caption: LocalizedText };
export type MobileFlowStrip = { screens: MobileFlowStripScreen[] }; // exactly 3

// Madrid-only — literal reproduction of 3 validated Interficia reference
// blocks shown between the Hero and "El proyecto" (prototype approved
// 2026-10-15, see MadridInterficiaShowcase). Not a generalized type; kept
// specific to this one project rather than reusing DeviceShowcase/
// MobileFlowStrip, since the layout is a literal port, not a site-wide
// pattern. Media only — no marketing copy, no pause/play labels: Albert's
// "tal cual" meant the 3 reference mockups themselves, not the real
// Comunidad de Madrid site's own headline/body text, and not UI chrome
// (like a pause button) that wasn't in the reference.
export type InterficiaVideoStripBlock = {
  videoSrc: string;
  photos: { src: string; alt: LocalizedText }[]; // exactly 3
};
export type InterficiaMobileRowBlock = {
  shots: { src: string; alt: LocalizedText; caption: LocalizedText }[]; // exactly 3
};
export type InterficiaVideoGridBlock = {
  panelA: { src: string };
  panelB: { src: string };
  panelC: { src: string };
  panelD?: { src: string };
};
export type InterficiaShowcase = {
  videoStrip: InterficiaVideoStripBlock;
  mobileRow: InterficiaMobileRowBlock;
  videoGrid: InterficiaVideoGridBlock;
  // Shown beside the "El sistema" paragraph in MadridPage, not part of the
  // video grid — contenidos-s2 moved here from panelD at Albert's request,
  // 2026-10-15 (he wanted it next to that text instead of in the grid).
  systemVideo?: { src: string };
};

// Palette + typeface specimen shown inside a project's own "system" section
// (see ProjectDesignSystemSheet) — elBulli, Turisme Jaén, Gnoss AI only.
export type DesignSystemSwatch = { hex: string; label: LocalizedText };
export type DesignSystemTypography = { typeface: string; usage: LocalizedText };
export type DesignSystemSheet = {
  palette: DesignSystemSwatch[];
  typography: DesignSystemTypography[]; // [] renders no typography row — never half-broken
};

// Real rendered component specimens (buttons, one card crop) shown inside
// Turisme Jaén's "La estructura" section (see ProjectComponentsSheet) —
// elBulli/Gnoss AI have no real components to sample from, and Mirazur is
// excluded at Albert's request.
export type ComponentButtonSpecimen = {
  name: LocalizedText;
  specLine: LocalizedText; // e.g. "44px · esquina viva · rojo corporativo"
  render: { background: string; color: string; borderRadius: string; height: string; label: LocalizedText };
};
export type ComponentCardSpecimen = { src: string; alt: LocalizedText; name: LocalizedText; specLine: LocalizedText };
export type ComponentsSheet = {
  buttons: ComponentButtonSpecimen[]; // [] renders nothing — never half-broken
  cardSpecimen?: ComponentCardSpecimen;
};

// A single step of the desktop screens walkthrough (browser-chrome frame,
// one step per scroll block) — used instead of the mobile screens carousel
// when a project's `screensFrame` is "desktop".
export type DesktopWalkthroughStep = {
  src: string;
  alt: LocalizedText;
  title: LocalizedText;
  caption: LocalizedText;
  // Real, interactive HTML page shown in the lightbox iframe when this step's
  // frame is clicked/expanded — a live mockup, not just the static screenshot.
  // Optional: when absent, the frame renders as a static screenshot with no
  // click affordance (no trigger, no expand icon, no "interactive" badge).
  htmlSrc?: string;
  // Full-page screenshot (same 1568px width as `src`, but the real, full
  // page height) shown scrollable in the lightbox when there's no `htmlSrc`.
  // `src` (the cropped thumbnail) still renders as-is in the resting card.
  fullSrc?: string;
  // Optional: point on this step's screenshot where the synthetic cursor
  // animates to on scroll-into-view, simulating a click, e.g. { x: 63, y: 92 }
  // for a search bar near the bottom-right of the frame. Percentages are
  // relative to the image's own width/height (0–100). Omitted for steps
  // where no single point reads as "the" action.
  cursorTarget?: { x: number; y: number };
  // Real, looping product-interaction video shown in place of the static
  // screenshot when present (same dimensions/scroll-transform as the image).
  // Not used by any step yet — no real footage exists — but the field and
  // its rendering are wired up for when it does.
  videoSrc?: string;
};

// Shared status values, sourced from data/translations.ts so the same
// wording ("Completado", "En curso"...) isn't duplicated by hand per project.
const status = {
  completed: { en: t.en.projectPage.statusValues.completed, es: t.es.projectPage.statusValues.completed, ca: t.ca.projectPage.statusValues.completed },
  completedLive: { en: t.en.projectPage.statusValues.completedLive, es: t.es.projectPage.statusValues.completedLive, ca: t.ca.projectPage.statusValues.completedLive },
  inProgress: { en: t.en.projectPage.statusValues.inProgress, es: t.es.projectPage.statusValues.inProgress, ca: t.ca.projectPage.statusValues.inProgress },
  inProduction: { en: t.en.projectPage.statusValues.inProduction, es: t.es.projectPage.statusValues.inProduction, ca: t.ca.projectPage.statusValues.inProduction },
};

// Unique, per-project content for the case-study page — everything that isn't
// already covered by problem/process/result. Optional because each project
// page uses a different subset of sections.
export type ProjectPageContent = {
  heroEyebrow?: LocalizedText; // override for the "num · category" hero label, when the page doesn't just reuse category
  heroCta?: LocalizedText;
  challengeHeading?: LocalizedText;
  challengeBody?: LocalizedText[];
  challengeCards?: { badge: LocalizedText; heading: LocalizedText; body: LocalizedText }[];
  solutionHeading?: LocalizedText;
  systemHeading?: LocalizedText;
  systemBody?: LocalizedText[];
  structureHeading?: LocalizedText;
  structureBody?: LocalizedText[];
  structureBodyBold?: { prefix: LocalizedText; bold: LocalizedText };
  processHeading?: LocalizedText;
  pageTypes?: { label: LocalizedText; sub: LocalizedText }[];
  startingPointHeading?: LocalizedText;
  workHeading?: LocalizedText;
  workCards?: ContentCard[];
  project1Label?: LocalizedText;
  project1SectionLabel?: LocalizedText;
  project1Heading?: LocalizedText;
  project1Body?: LocalizedText[];
  project2Label?: LocalizedText;
  project2SectionLabel?: LocalizedText;
  project2Heading?: LocalizedText;
  project2Body?: LocalizedText[];
  resultHeading?: LocalizedText;
  closingLink?: { prefix: LocalizedText; linkText: LocalizedText; suffix: LocalizedText; href: string };
  learningsHeading?: LocalizedText;
  learningsBadge?: LocalizedText;
  learningsItems?: LocalizedText[];
  learningsFootnote?: LocalizedText;
};

// A sub-project shown as a tab within a client's project page — e.g. the
// elBulli Foundation has both an "Archivo" and a "Marketplace" initiative.
// Mirrors the detail-level fields of Project; client-level fields (title,
// hero, top-level tags/meta) stay on the parent Project and aren't repeated.
export type SubProject = {
  id: string; // "archivo" | "marketplace" — slug used in the ?p= query param
  tabLabel: LocalizedText; // short label shown on the tab itself
  num: string;
  category: LocalizedText;
  year: string;
  problem: LocalizedText;
  process: LocalizedText;
  result: LocalizedText;
  tags: string[];
  cover?: string;
  video?: string;
  screens?: ProjectScreen[];
  // Which showcase to render for this sub-project's screens: the default
  // mobile-frame carousel, or the desktop browser-chrome scroll walkthrough
  // (requires `desktopWalkthrough` below). Undefined behaves as "mobile".
  screensFrame?: "mobile" | "desktop";
  desktopWalkthrough?: DesktopWalkthroughStep[];
  // Hides the title/caption text next to each frame in the <900px (and
  // >7-step fallback) stacked list, leaving just the centered screenshot.
  // Default false — only set where diseñador specified it (Turisme Jaén).
  desktopWalkthroughHideCaptions?: boolean;
  // Same device showcase as Project below, but per sub-project — elBulli's
  // and Mirazur's two tabs each need their own images, even though diseñador
  // specified the same `style` for both tabs of a given client.
  deviceShowcase?: DeviceShowcase;
  heroTagline?: LocalizedText;
  meta?: MetaItem[]; // own to this sub-project, not inherited from the client
  page?: ProjectPageContent;
};

export type Project = {
  id: string;
  num: string;
  title: { en: string; es: string; ca: string };
  category: { en: string; es: string; ca: string };
  year: string;
  description: { en: string; es: string; ca: string };
  problem: { en: string; es: string; ca: string };
  process: { en: string; es: string; ca: string };
  result: { en: string; es: string; ca: string };
  tags: string[];
  gradient: string;
  accentColor: string;
  cover?: string;
  // Alt text for `cover` — read by the card/listing/hero images that show
  // it. Only filled in for projects that actually have a `cover` image.
  coverAlt?: LocalizedText;
  video?: string;
  screens?: ProjectScreen[];
  screensFrame?: "mobile" | "desktop";
  desktopWalkthrough?: DesktopWalkthroughStep[];
  // See SubProject — same flag, same behavior, for top-level projects.
  desktopWalkthroughHideCaptions?: boolean;
  // See DeviceShowcase above — the type allows this on any Project,
  // including clients with subProjects. elBulli currently leaves it
  // undefined here (its two tabs would set their own, once real captures
  // exist). Mirazur sets it here deliberately: one shared showcase for the
  // whole client, shown once regardless of which tab (cupón/recetas) is
  // active — not per sub-project.
  deviceShowcase?: DeviceShowcase;
  // No current project populates this — see MobileFlowStrip above.
  mobileFlowStrip?: MobileFlowStrip;
  // Madrid-only — see InterficiaShowcase above.
  interficiaShowcase?: InterficiaShowcase;
  // elBulli, Turisme Jaén, Gnoss AI only — see DesignSystemSheet above.
  designSystem?: DesignSystemSheet;
  // Turisme Jaén only — see ComponentsSheet above.
  componentsSheet?: ComponentsSheet;
  heroTagline?: LocalizedText;
  meta?: MetaItem[];
  page?: ProjectPageContent;
  // When present, the project page renders as a client with tabbed
  // sub-projects instead of a single case study (see elBulli).
  subProjects?: SubProject[];
};

export const projects: Project[] = [
  {
    id: "elbulli",
    num: "01",
    title: { en: "elBulli Foundation", es: "Fundació elBulli", ca: "Fundació elBulli" },
    category: { en: "Design System", es: "Sistema de Diseño", ca: "Sistema de Disseny" },
    year: "2026",
    problem: {
      en: "Two projects for the elBulli Foundation: a digital archive for the restaurant and a marketplace for its books. Each with its own product challenge.",
      es: "Dos proyectos para la Fundació elBulli: el archivo digital del restaurante y un marketplace para sus libros. Cada uno con su propio reto de producto.",
      ca: "Dos projectes per a la Fundació elBulli: un arxiu digital del restaurant i un marketplace per als seus llibres. Cadascun amb el seu propi repte de producte.",
    },
    process: {
      en: "On the archive I designed and maintained the design system and its content structure in Strapi; on the marketplace, still ongoing, I'm continuing the design system in Claude Design while transcribing the books onto the new platform.",
      es: "En el archivo diseñé y mantuve el sistema de diseño y su estructura de contenido en Strapi; en el marketplace, todavía en marcha, continúo el sistema de diseño en Claude Design mientras transcribo los libros a la nueva plataforma.",
      ca: "A l'arxiu vaig dissenyar i mantenir el sistema de disseny i la seva estructura de contingut a Strapi; al marketplace, encara en marxa, continuo el sistema de disseny a Claude Design mentre transcric els llibres a la nova plataforma.",
    },
    result: {
      en: "The archive now works as a CMS the team edits on its own, and the marketplace is moving forward chapter by chapter toward a new way of reading the Foundation's books.",
      es: "El archivo funciona hoy como un CMS que el equipo edita de forma autónoma, y el marketplace avanza capítulo a capítulo hacia una nueva forma de leer los libros de la Fundació.",
      ca: "L'arxiu funciona avui com un CMS que l'equip edita de forma autònoma, i el marketplace avança capítol a capítol cap a una nova manera de llegir els llibres de la Fundació.",
    },
    description: {
      en: "Design and development for the elBulli Foundation: a living digital archive and a new platform for its books.",
      es: "Diseño y desarrollo para la Fundació elBulli: un archivo digital vivo y una nueva plataforma para sus libros.",
      ca: "Disseny i desenvolupament per a la Fundació elBulli: un arxiu digital viu i una nova plataforma per als seus llibres.",
    },
    tags: ["Figma", "Strapi", "Claude"],
    gradient: "linear-gradient(135deg, #080e1a 0%, #0d1b2e 60%, #162a42 100%)",
    accentColor: "#4a8fcc",
    cover: "/covers/cover-elbulli.webp",
    coverAlt: {
      en: "White line illustration of a modern building with mountains in the background, on a dark blue backdrop — cover for the elBulli Foundation project.",
      es: "Ilustración en blanco de un edificio moderno con montañas al fondo, sobre un fondo azul oscuro — portada del proyecto de la Fundació elBulli.",
      ca: "Il·lustració en blanc d'un edifici modern amb muntanyes al fons, sobre un fons blau fosc — portada del projecte de la Fundació elBulli.",
    },
    heroTagline: {
      en: "a custom digital environment for elBulli's legacy",
      es: "un entorno digital a medida para el legado de elBulli",
      ca: "un entorn digital a mida per al llegat d'elBulli",
    },
    meta: [
      { labelKey: "client", value: "Fundació elBulli" },
      { labelKey: "year", value: "2026" },
      { labelKey: "studio", value: "Dosgrapas" },
    ],
    // Palette confirmed by diseñador; typeface pair confirmed live from
    // bullipedia-demo.vercel.app's own computed styles (h1/h2/body).
    designSystem: {
      palette: [
        { hex: "#080e1a", label: { es: "Fondo oscuro", en: "Dark background", ca: "Fons fosc" } },
        { hex: "#0d1b2e", label: { es: "Fondo medio", en: "Mid background", ca: "Fons mitjà" } },
        { hex: "#162a42", label: { es: "Fondo claro", en: "Light background", ca: "Fons clar" } },
        { hex: "#4a8fcc", label: { es: "Acento", en: "Accent", ca: "Accent" } },
      ],
      typography: [
        { typeface: "PP Neue Machina (Light)", usage: { es: "Titulares", en: "Headlines", ca: "Titulars" } },
        { typeface: "Inter (Light)", usage: { es: "Texto e interfaz", en: "Body & interface", ca: "Text i interfície" } },
      ],
    },
    subProjects: [
      {
        id: "archivo",
        tabLabel: { en: "elBulli Archive", es: "Archivo elBulli", ca: "Arxiu elBulli" },
        num: "01",
        category: { en: "Design System", es: "Sistema de Diseño", ca: "Sistema de Disseny" },
        year: "2026",
        problem: {
          en: "A digital archive with hundreds of pages, growing constantly. The challenge: let the editorial team publish without a developer, without breaking visual consistency.",
          es: "Un archivo digital con cientos de páginas en crecimiento constante. El reto: que el equipo editorial publique sin depender de un desarrollador ni romper la consistencia visual.",
          ca: "Un arxiu digital amb centenars de pàgines en creixement constant. El repte: que l'equip editorial publiqui sense dependre d'un desenvolupador ni trencar la consistència visual.",
        },
        process: {
          en: "I designed the system and modeled it as reusable blocks in Strapi. The team combines blocks and publishes without me; I designed and coded specific pages myself.",
          es: "Diseñé el sistema y lo modelé como bloques reutilizables en Strapi. El equipo combina bloques y publica sin depender de mí; yo diseñé y construí en código páginas concretas.",
          ca: "Vaig dissenyar el sistema i el vaig modelar com a blocs reutilitzables a Strapi. L'equip combina blocs i publica sense dependre de mi; jo vaig dissenyar i construir en codi pàgines concretes.",
        },
        result: {
          en: "A system that doubles as a CMS: the archive grows with new pages without losing visual consistency, and the team edits and publishes on its own.",
          es: "Un sistema que funciona también como CMS: el archivo crece con páginas nuevas sin perder consistencia visual, y el equipo edita y publica de forma autónoma.",
          ca: "Un sistema que funciona també com a CMS: l'arxiu creix amb pàgines noves sense perdre consistència visual, i l'equip edita i publica de forma autònoma.",
        },
        tags: ["Figma", "Strapi", "Design System"],
        cover: "/covers/cover-elbulli.webp",
        // deviceShowcase removed temporarily: no real desktop/tablet/mobile
        // captures exist yet for the Archivo (confirmed by Albert).
        meta: [
          { labelKey: "status", value: status.inProgress },
          { labelKey: "role", value: { en: "Web design · Code implementation · Next.js", es: "Diseño web · Implementación en código · Next.js", ca: "Disseny web · Implementació en codi · Next.js" } },
          { labelKey: "stack", value: "Figma · Strapi · Next.js · Claude Code" },
        ],
        page: {
          challengeHeading: {
            en: "Designing and building inside a living system",
            es: "Diseñar y construir dentro de un sistema vivo",
            ca: "Dissenyar i construir dins d'un sistema viu",
          },
          challengeBody: [
            {
              en: "The archive never stops: design and code happen at once. Every new block has to work from day one, and keep working once the team uses it without me.",
              es: "El archivo no se detiene: diseño y código van a la vez. Cada bloque nuevo tiene que funcionar desde el primer día, y seguir haciéndolo cuando el equipo lo use sin mí.",
              ca: "L'arxiu no s'atura: disseny i codi van alhora. Cada bloc nou ha de funcionar des del primer dia, i seguir funcionant quan l'equip l'utilitzi sense mi.",
            },
          ],
          solutionHeading: {
            en: "The design gets decided once",
            es: "El diseño se decide una sola vez",
            ca: "El disseny es decideix una sola vegada",
          },
          systemHeading: {
            en: "Blocks as modular pieces",
            es: "Bloques como piezas modulares",
            ca: "Blocs com a peces modulars",
          },
          systemBody: [
            {
              en: "The archive is built from defined content types —dish entries, timelines, galleries— turned into blocks. The editor picks, fills in and publishes without breaking the design.",
              es: "El archivo se construye con tipos de contenido definidos —fichas, cronologías, galerías— convertidos en bloques. El editor elige, rellena y publica sin poder romper el diseño.",
              ca: "L'arxiu es construeix amb tipus de contingut definits —fitxes, cronologies, galeries— convertits en blocs. L'editor tria, omple i publica sense poder trencar el disseny.",
            },
          ],
          learningsHeading: {
            en: "What I'm learning",
            es: "Lo que estoy aprendiendo",
            ca: "El que estic aprenent",
          },
          learningsBadge: { en: "In progress", es: "En progreso", ca: "En curs" },
          learningsItems: [
            {
              en: "I went deeper into Strapi as a headless CMS and AI-assisted design. A project like this taught me a design system doesn't end at delivery: maintaining it matters as much as building it.",
              es: "Profundicé en Strapi como CMS headless y en IA aplicada al diseño. Un proyecto así me enseñó que un sistema de diseño no acaba al entregarlo: mantenerlo importa tanto como construirlo.",
              ca: "Vaig aprofundir en Strapi com a CMS headless i en IA aplicada al disseny. Un projecte així em va ensenyar que un sistema de disseny no s'acaba en lliurar-lo: mantenir-lo importa tant com construir-lo.",
            },
          ],
        },
      },
      {
        id: "marketplace",
        tabLabel: { en: "Bullipedia", es: "Bullipedia", ca: "Bullipedia" },
        num: "02",
        category: { en: "E-commerce", es: "E-commerce", ca: "E-commerce" },
        year: "2026",
        problem: {
          en: "A physical book can't carry its complementary resources —budget spreadsheets, images, videos—; they stay separate from the content that creates them.",
          es: "Un libro en papel no puede llevar sus recursos complementarios —Excel de presupuestos, imágenes, vídeos—; quedan siempre separados del contenido que los origina.",
          ca: "Un llibre en paper no pot portar els seus recursos complementaris —Excel de pressupostos, imatges, vídeos—; sempre queden separats del contingut que els origina.",
        },
        process: {
          en: "We're building an ecommerce platform for the books, with design and development done in Claude. My work: transcribing the books chapter by chapter, with their original resources.",
          es: "Construimos una plataforma ecommerce para los libros, con diseño y desarrollo hechos en Claude. Mi trabajo: transcribir los libros capítulo a capítulo, con sus recursos originales.",
          ca: "Construïm una plataforma ecommerce per als llibres, amb disseny i desenvolupament fets a Claude. La meva feina: transcriure els llibres capítol a capítol, amb els recursos originals.",
        },
        result: {
          en: "Still in progress, but it already shows chapter by chapter: each book now carries the resources print left out, a read the printed format could never offer.",
          es: "El proyecto sigue en curso, pero ya se nota capítulo a capítulo: cada libro incorpora los recursos que en papel quedaban fuera, una lectura que el impreso nunca pudo ofrecer.",
          ca: "Encara en curs, però ja es nota capítol a capítol: cada llibre incorpora els recursos que en paper quedaven fora, una lectura que l'imprès mai va poder oferir.",
        },
        tags: ["Claude Design", "Claude Code", "E-commerce"],
        video: "/videos/bullipedia-walkthrough.mp4",
        // deviceShowcase removed temporarily: captures exist but show an
        // unfinished wireframe, not the final design (confirmed by Albert).
        meta: [
          { labelKey: "role", value: { en: "Design & development", es: "Diseño y desarrollo", ca: "Disseny i desenvolupament" } },
          { labelKey: "stack", value: "Claude Design · Claude Code" },
          { labelKey: "status", value: status.inProgress },
          { labelKey: "web", value: "bullipedia-demo.vercel.app", href: "https://bullipedia-demo.vercel.app/1-catalogo-libros.html" },
        ],
        page: {
          heroCta: { en: "View live demo — Bullipedia", es: "Ver demo en vivo — Bullipedia", ca: "Veure demo en directe — Bullipedia" },
        },
      },
    ],
  },
  {
    id: "xunta-galicia",
    num: "02",
    title: { en: "Galiciana Thesaurus", es: "Galiciana Thesaurus", ca: "Galiciana Thesaurus" },
    category: { en: "Custom Product", es: "Producto a medida", ca: "Producte a mida" },
    year: "2026",
    problem: {
      en: "A Xunta de Galicia client manages a database full of duplicated files and needed a tool that would use an algorithm to suggest matches, so the person only had to review and confirm each one. The challenge wasn't starting from a defined design, but truly understanding that review flow.",
      es: "Un cliente de la Xunta de Galicia gestiona una base de datos con muchos archivos duplicados y necesitaba una herramienta que sugiriera coincidencias mediante un algoritmo, para que la persona solo revisara y confirmara cada una. El reto no era partir de un diseño ya definido, sino entender a fondo ese flujo de revisión.",
      ca: "Un client de la Xunta de Galicia gestiona una base de dades amb molts arxius duplicats i necessitava una eina que suggerís coincidències mitjançant un algorisme, perquè la persona només revisés i confirmés cada una. El repte no era partir d'un disseny ja definit, sinó entendre a fons aquest flux de revisió.",
    },
    process: {
      en: "We started from a reference prototype GNOSS sent us — useful for a few features, but ambiguous overall. From there, we designed the product from scratch around the client's real task, with check-in meetings to validate progress.",
      es: "Partimos de un prototipo de referencia de GNOSS, útil para ver algunas funcionalidades pero ambiguo en el conjunto. A partir de ahí, diseñamos el producto desde cero centrados en la tarea real del cliente, con reuniones de seguimiento para validar el avance.",
      ca: "Vam partir d'un prototip de referència de GNOSS — útil per veure algunes funcionalitats, però ambigu en el conjunt. A partir d'aquí, vam dissenyar el producte des de zero centrats en la tasca real del client, amb reunions de seguiment per validar l'avanç.",
    },
    result: {
      en: "The client approved the product with no further rounds of revision. Feedback that came back through GNOSS says the team using it daily finds it intuitive.",
      es: "El cliente aprobó el producto sin rondas de revisión adicionales. Según el feedback que llegó a través de GNOSS, el equipo que lo usa a diario lo encuentra intuitivo.",
      ca: "El client va aprovar el producte sense rondes addicionals de revisió. Segons el feedback que va arribar a través de GNOSS, l'equip que l'utilitza a diari el troba intuïtiu.",
    },
    description: {
      en: "Custom product for a Xunta de Galicia client, through GNOSS — design centered on understanding their real day-to-day task, still in progress.",
      es: "Producto a medida para un cliente de la Xunta de Galicia, a través de GNOSS — diseño centrado en entender su tarea real del día a día, todavía en curso.",
      ca: "Producte a mida per a un client de la Xunta de Galicia, a través de GNOSS — disseny centrat a entendre la seva tasca real del dia a dia, encara en curs.",
    },
    tags: ["UX Research", "Product Design", "Figma"],
    gradient: "linear-gradient(135deg, #001515 0%, #0d3d3d 60%, #2a8c8c 100%)",
    accentColor: "#2a8c8c",
    designSystem: {
      palette: [
        { hex: "#001515", label: { es: "Fondo oscuro", en: "Dark background", ca: "Fons fosc" } },
        { hex: "#0d3d3d", label: { es: "Fondo medio", en: "Mid background", ca: "Fons mitjà" } },
        { hex: "#2a8c8c", label: { es: "Acento del proyecto", en: "Project accent", ca: "Accent del projecte" } },
        { hex: "#007bc4", label: { es: "Azul institucional (Xunta)", en: "Institutional blue (Xunta)", ca: "Blau institucional (Xunta)" } },
      ],
      // Read directly from the demo's own CSS (assets/css/shell.css and
      // the per-page stylesheets), not guessed — same standard as the
      // palette hexes above.
      typography: [
        { typeface: "Roboto", usage: { es: "Interfaz y texto", en: "UI & body text", ca: "Interfície i text" } },
        { typeface: "SFMono-Regular", usage: { es: "Números de control e IDs", en: "Control numbers & IDs", ca: "Números de control i IDs" } },
      ],
    },
    // Real captures of the live demo (xunta-thesaurus-demo.vercel.app,
    // linked from this page's own Hero CTA) — Albert pointed out there was
    // no raw material for this one like Madrid/Mirazur had, but the demo
    // itself is real and deployed, 2026-10-15. First tried 3 *mobile-width*
    // captures, but Albert caught that this tool has no real mobile
    // adaptation (shell.css ships one desktop layout, squeezed into a
    // narrow viewport it just overflows) — captioning that as "mobile" would
    // misrepresent the product. Shown at its real desktop width instead;
    // see XUNTA_SCREENS in XuntaGaliciaPage.tsx (kept local to that file,
    // same precedent as Mirazur's CUPON_PLATOS, rather than adding a new
    // shared Project field for one project's 3 screens).
    cover: "/covers/cover-xunta.svg",
    coverAlt: {
      en: "Cover with the Xunta de Galicia logo in white on a teal gradient background.",
      es: "Portada con el logotipo de la Xunta de Galicia en blanco sobre un fondo degradado verde azulado.",
      ca: "Portada amb el logotip de la Xunta de Galicia en blanc sobre un fons degradat verd blavós.",
    },
    heroTagline: {
      en: "a custom product designed around a real day-to-day task",
      es: "un producto a medida diseñado a partir de una tarea real del día a día",
      ca: "un producte a mida dissenyat a partir d'una tasca real del dia a dia",
    },
    meta: [
      { labelKey: "client", value: "Xunta de Galicia" },
      { labelKey: "year", value: "2026" },
      { labelKey: "status", value: status.inProgress },
      { labelKey: "role", value: { en: "Product design · UX research", es: "Diseño de producto · Investigación UX", ca: "Disseny de producte · Recerca UX" } },
      { labelKey: "stack", value: "Figma" },
      { labelKey: "studio", value: "GNOSS" },
    ],
    page: {
      heroCta: { en: "View live demo", es: "Ver demo en vivo", ca: "Veure demo en directe" },
      workHeading: {
        en: "Starting from a reference, ending up somewhere else",
        es: "Partir de una referencia, acabar en otro sitio",
        ca: "Partir d'una referència, acabar en un altre lloc",
      },
      workCards: [
        {
          label: { en: "Understanding the task", es: "Entender la tarea", ca: "Entendre la tasca" },
          desc: {
            en: "The starting point was understanding what this specific client does day to day, before drawing anything.",
            es: "El punto de partida fue entender qué hace este cliente concreto en su día a día, antes de dibujar nada.",
            ca: "El punt de partida va ser entendre què fa aquest client concret en el seu dia a dia, abans de dibuixar res.",
          },
        },
        {
          label: { en: "A reference, not a base", es: "Una referencia, no una base", ca: "Una referència, no una base" },
          desc: {
            en: "GNOSS sent us a reference prototype early on. It was useful to see a few specific features, but the final design took a different direction.",
            es: "GNOSS nos envió un prototipo de referencia al principio. Sirvió para ver algunas funcionalidades concretas, pero el diseño final tomó una dirección distinta.",
            ca: "GNOSS ens va enviar un prototip de referència al principi. Va servir per veure algunes funcionalitats concretes, però el disseny final va prendre una direcció diferent.",
          },
        },
        {
          label: { en: "Follow-up with GNOSS", es: "Seguimiento con GNOSS", ca: "Seguiment amb GNOSS" },
          desc: {
            en: "A couple of check-in meetings with GNOSS during the process helped validate the direction as the design moved forward.",
            es: "Un par de reuniones de seguimiento con GNOSS durante el proceso ayudaron a validar la dirección a medida que el diseño avanzaba.",
            ca: "Un parell de reunions de seguiment amb GNOSS durant el procés van ajudar a validar la direcció a mesura que el disseny avançava.",
          },
        },
        {
          label: { en: "Reviewing, not searching from scratch", es: "Revisar, no buscar desde cero", ca: "Revisar, no buscar des de zero" },
          desc: {
            en: "The tool suggests matches automatically; the person only confirms, corrects, or creates an entry by hand when the algorithm gets it wrong. The design is built around that review, not a manual search.",
            es: "La herramienta propone las coincidencias automáticamente; la persona solo confirma, corrige o crea una entrada a mano cuando el algoritmo no acierta. El diseño está pensado alrededor de esa revisión, no de una búsqueda manual.",
            ca: "L'eina proposa les coincidències automàticament; la persona només confirma, corregeix o crea una entrada a mà quan l'algorisme no l'encerta. El disseny està pensat al voltant d'aquesta revisió, no d'una cerca manual.",
          },
        },
      ],
      resultHeading: {
        en: "Approved by the client, validated by its users",
        es: "Aprobado por el cliente, validado por sus usuarios",
        ca: "Aprovat pel client, validat pels seus usuaris",
      },
      learningsHeading: {
        en: "What I'm learning",
        es: "Lo que estoy aprendiendo",
        ca: "El que estic aprenent",
      },
      learningsBadge: { en: "In progress", es: "En progreso", ca: "En curs" },
      learningsItems: [
        {
          en: "Working through an intermediary studio (GNOSS), without talking to the end client, taught me to ask the right questions to pull real requirements out of an ambiguous brief.",
          es: "Trabajar a través de un estudio intermediario (GNOSS), sin hablar con el cliente final, me enseñó a hacer las preguntas correctas para sacar información real de un brief ambiguo.",
          ca: "Treballar a través d'un estudi intermediari (GNOSS), sense parlar amb el client final, em va ensenyar a fer les preguntes correctes per treure informació real d'un brief ambigu.",
        },
        {
          en: "Seeing the team find it intuitive, without ever talking to them, confirms that designing from the real task — not a generic prototype — is what makes the difference.",
          es: "Ver que el equipo lo encuentra intuitivo, sin haber hablado con ellos, confirma que diseñar desde la tarea real — no desde un prototipo genérico — es lo que marca la diferencia.",
          ca: "Veure que l'equip el troba intuïtiu, sense haver-hi parlat, confirma que dissenyar des de la tasca real — no des d'un prototip genèric — és el que marca la diferència.",
        },
      ],
    },
  },
  {
    id: "madrid",
    num: "03",
    title: { en: "Enoturismo Madrid", es: "Enoturismo Madrid", ca: "Enoturisme Madrid" },
    category: { en: "Web Design", es: "Diseño Web", ca: "Disseny Web" },
    year: "2026",
    problem: {
      en: "Madrid's wine tourism site already existed, but with disjointed pages and navigation that didn't help visitors find wineries, routes or experiences. The brief: a full redesign to unify the design and make it functional for the visitor.",
      es: "El site de enoturismo de Madrid ya existía, pero con páginas dispares y una navegación que no ayudaba a encontrar bodegas, rutas o experiencias. El encargo: un rediseño completo que unificara el diseño y lo hiciera funcional para el visitante.",
      ca: "El site d'enoturisme de Madrid ja existia, però amb pàgines disperses i una navegació que no ajudava a trobar cellers, rutes o experiències. L'encàrrec: un redisseny complet que unifiqués el disseny i el fes funcional per al visitant.",
    },
    process: {
      en: "The starting point was a single AI-generated page, not built to grow. I migrated it to Next.js and designed and built the rest of the site myself with Claude Code: the winery, route and experience pages that make up most of the site today.",
      es: "La base era una página única generada con IA, no pensada para crecer. La migré a Next.js y diseñé y construí yo solo el resto del site con Claude Code: las páginas de bodegas, rutas y experiencias que hoy forman el grueso del contenido.",
      ca: "El punt de partida va ser una única pàgina generada amb IA, no pensada per créixer. La vaig migrar a Next.js i vaig dissenyar i construir la resta del site jo sol amb Claude Code: les pàgines de cellers, rutes i experiències que avui formen el gruix del contingut.",
    },
    result: {
      en: "A site built single-handedly from start to finish, with a Strapi CMS that lets the team publish new content without technical help and a navigation built to take visitors from route to booking.",
      es: "Una web construida en solitario, de principio a fin, con un CMS en Strapi para que el equipo publique sin ayuda técnica y una navegación pensada para llevar de la ruta a la reserva.",
      ca: "Un web construït en solitari de principi a fi, amb un CMS a Strapi perquè l'equip publiqui contingut nou sense ajuda tècnica i una navegació pensada per portar el visitant de la ruta a la reserva.",
    },
    description: {
      en: "Full project, solo — migrated an AI-generated HTML base to Next.js and designed and built every page of Madrid's wine tourism site with Claude Code.",
      es: "Proyecto entero, en solitario — migré una base HTML generada por IA a Next.js y diseñé y construí cada página del site de enoturismo de Madrid con Claude Code.",
      ca: "Projecte sencer, en solitari — vaig migrar una base HTML generada per IA a Next.js i vaig dissenyar i construir cada pàgina del site d'enoturisme de Madrid amb Claude Code.",
    },
    tags: ["Next.js", "Claude Code", "Strapi", "Web Design"],
    gradient: "linear-gradient(135deg, #1a0a0f 0%, #4a1528 60%, #8c3a5a 100%)",
    accentColor: "#8c3a5a",
    designSystem: {
      palette: [
        { hex: "#e30613", label: { es: "Acento institucional", en: "Institutional accent", ca: "Accent institucional" } },
        { hex: "#1a1a1a", label: { es: "Texto", en: "Text", ca: "Text" } },
        { hex: "#6b6b6b", label: { es: "Texto secundario", en: "Secondary text", ca: "Text secundari" } },
        { hex: "#ffffff", label: { es: "Fondo", en: "Background", ca: "Fons" } },
        { hex: "#8c3a5a", label: { es: "Acento del proyecto (hero)", en: "Project accent (hero)", ca: "Accent del projecte (hero)" } },
      ],
      typography: [
        { typeface: "DM Serif Display", usage: { es: "Titulares", en: "Headlines", ca: "Titulars" } },
        { typeface: "Roboto", usage: { es: "Texto e interfaz", en: "Body & interface", ca: "Text i interfície" } },
      ],
    },
    // Literal reproduction of 3 validated Interficia reference blocks
    // (prototype approved 2026-10-15, see MadridInterficiaShowcase) —
    // replaces the generic deviceShowcase/mobileFlowStrip mockup that used
    // to sit here. Madrid-only, not a generalized type.
    interficiaShowcase: {
      videoStrip: {
        videoSrc: "/videos/madrid-zonas-mapa.mp4",
        photos: [
          {
            src: "/projects/madrid/bodegas-1.jpg",
            alt: { en: "Vineyard landscape in San Martín de Valdeiglesias.", es: "Paisaje de viñedo en San Martín de Valdeiglesias.", ca: "Paisatge de vinya a San Martín de Valdeiglesias." },
          },
          {
            src: "/projects/madrid/bodegas-2.jpg",
            alt: { en: "Winery building with institutional signage, Cenicientos.", es: "Edificio de bodega con cartel institucional, Cenicientos.", ca: "Edifici de celler amb rètol institucional, Cenicientos." },
          },
          {
            src: "/projects/madrid/bodegas-3.jpg",
            alt: { en: "Cluster of red grapes on the vine.", es: "Racimo de uva tinta en la viña.", ca: "Raïm negre al cep." },
          },
        ],
      },
      mobileRow: {
        shots: [
          {
            src: "/projects/madrid/device-mobile.jpg",
            alt: { en: "Mobile view of the Enoturismo Madrid homepage.", es: "Vista móvil de la portada de Enoturismo Madrid.", ca: "Vista mòbil de la portada d'Enoturisme Madrid." },
            caption: { en: "Homepage: hero and zone selector", es: "Portada: hero y selector de zona", ca: "Portada: hero i selector de zona" },
          },
          {
            src: "/projects/madrid/flow-1.jpg",
            alt: { en: "Browsing the wine region of San Martín de Valdeiglesias on mobile.", es: "Explorando la zona vitivinícola de San Martín de Valdeiglesias en móvil.", ca: "Explorant la zona vitivinícola de San Martín de Valdeiglesias en mòbil." },
            caption: { en: "The four wine regions", es: "Las cuatro zonas vitivinícolas", ca: "Les quatre zones vitivinícoles" },
          },
          {
            src: "/projects/madrid/flow-2.jpg",
            alt: { en: "List of wineries in the Comunidad de Madrid in mobile view.", es: "Listado de bodegas de la Comunidad de Madrid en vista móvil.", ca: "Llistat de cellers de la Comunidad de Madrid en vista mòbil." },
            caption: { en: "Wineries with tours, in a carousel", es: "Bodegas con visita, en carrusel", ca: "Cellers amb visita, en carrusel" },
          },
        ],
      },
      videoGrid: {
        panelA: { src: "/videos/madrid-movilidad.mp4" },
        panelB: { src: "/videos/madrid-zonas-mapa.mp4" },
        panelC: { src: "/videos/madrid-directorio.mp4" },
        // Era contenidos-s2 (panelD original); Albert lo movió junto al
        // texto de "El sistema" (ver systemVideo) y pidió el buscador aquí
        // en su lugar — era el vídeo de MadridWalkthroughVideo, que ya no
        // existe como sección aparte, 2026-10-15.
        panelD: { src: "/videos/madrid-buscador.mp4" },
      },
      systemVideo: { src: "/videos/madrid-contenidos.mp4" },
    },
    cover: "/covers/cover-madrid.webp",
    coverAlt: {
      en: "Sunlit clusters of dark grapes hanging from a vine — cover image for the Enoturismo Madrid project.",
      es: "Racimos de uva tinta iluminados por el sol colgando de una vid — imagen de portada del proyecto Enoturismo Madrid.",
      ca: "Raïms negres il·luminats pel sol penjant d'una vinya — imatge de portada del projecte Enoturisme Madrid.",
    },
    video: "/covers/madrid.mp4",
    heroTagline: {
      en: "design, development and UX for Madrid's wine routes",
      es: "diseño, desarrollo y experiencia de usuario de las rutas del vino de Madrid",
      ca: "disseny, desenvolupament i experiència d'usuari de les rutes del vi de Madrid",
    },
    meta: [
      { labelKey: "client", value: "Comunidad de Madrid" },
      { labelKey: "year", value: "2026" },
      { labelKey: "status", value: status.completedLive },
      { labelKey: "role", value: { en: "Design, development & UX · Solo project", es: "Diseño, desarrollo y experiencia de usuario · Proyecto en solitario", ca: "Disseny, desenvolupament i experiència d'usuari · Projecte en solitari" } },
      { labelKey: "stack", value: "Next.js · Claude Code · Strapi" },
      { labelKey: "studio", value: "Dosgrapas" },
    ],
    page: {
      heroCta: { en: "View the result", es: "Ver el resultado", ca: "Veure el resultat" },
      startingPointHeading: {
        en: "An AI-generated base",
        es: "Una base generada por IA",
        ca: "Una base generada per IA",
      },
      systemHeading: {
        en: "Every new winery has to fit on its own",
        es: "Que cada bodega nueva encaje sola",
        ca: "Que cada celler nou encaixi sol",
      },
      systemBody: [
        {
          en: "Wineries, routes and experiences are different kinds of content, but on the site they have to read as part of the same place. In Strapi I set up each one separately: when the tourism team adds a new winery or publishes another route, it shows up already laid out, matching the rest of the site — without going through me or a developer.",
          es: "Bodegas, rutas y experiencias son contenidos distintos, pero en la web tienen que leerse como parte del mismo sitio. En Strapi configuré cada tipo por separado: cuando el equipo de turismo añade una bodega nueva o publica otra ruta, esta aparece ya maquetada con el mismo diseño que las demás — sin pasar por mí ni por un desarrollador.",
          ca: "Cellers, rutes i experiències són continguts diferents, però al web han de llegir-se com a part del mateix lloc. A Strapi vaig configurar cada tipus per separat: quan l'equip de turisme afegeix un celler nou o publica una altra ruta, apareix ja maquetada amb el mateix disseny que la resta — sense passar per mi ni per un desenvolupador.",
        },
      ],
      workHeading: {
        en: "From base to finished product",
        es: "De la base al producto terminado",
        ca: "De la base al producte acabat",
      },
      workCards: [
        {
          label: { en: "From first to last", es: "De la primera a la última", ca: "De la primera a l'última" },
          desc: {
            en: "I designed and built every page of the site solo, starting from an existing base — in Next.js, with Claude Code, using shared components that guarantee consistency without repeating work.",
            es: "Diseñé y construí cada página del site en solitario, a partir de una base ya existente — en Next.js, con Claude Code, con componentes compartidos que garantizan coherencia sin repetir trabajo.",
            ca: "Vaig dissenyar i construir cada pàgina del site en solitari, a partir d'una base ja existent — a Next.js, amb Claude Code, amb components compartits que garanteixen coherència sense repetir feina.",
          },
        },
        {
          label: { en: "Consistency", es: "Consistencia", ca: "Consistència" },
          desc: {
            en: "A shared set of styles. Regardless of the content, every page speaks the same visual language.",
            es: "Un conjunto de estilos compartidos. Independientemente del contenido, todas las páginas hablan el mismo lenguaje visual.",
            ca: "Un conjunt d'estils compartits. Independentment del contingut, totes les pàgines parlen el mateix llenguatge visual.",
          },
        },
        {
          label: { en: "Responsive and animations", es: "Responsive y animaciones", ca: "Responsive i animacions" },
          desc: {
            en: "The base had no responsive behaviour. Every page was adjusted for desktop, tablet and mobile, with animations designed and built directly in code.",
            es: "La base no tenía responsive. Cada página, ajustada para desktop, tablet y móvil, con animaciones diseñadas y construidas directamente en código.",
            ca: "La base no tenia responsive. Cada pàgina, ajustada per a desktop, tablet i mòbil, amb animacions dissenyades i construïdes directament en codi.",
          },
        },
      ],
      learningsItems: [
        {
          en: "Carrying the whole project alone — design, development and UX — forced me to think like a full team, not just a designer: every design decision also had to hold up in code.",
          es: "Llevar el proyecto entero yo solo — diseño, desarrollo y experiencia de usuario — me obligó a pensar como equipo completo, no solo como diseñador: cada decisión de diseño tenía que sostenerse también en código.",
          ca: "Portar el projecte sencer jo sol — disseny, desenvolupament i experiència d'usuari — em va obligar a pensar com un equip complet, no només com a dissenyador: cada decisió de disseny havia de sostenir-se també en codi.",
        },
        {
          en: "Modelling the content in Strapi taught me to design for someone who isn't me: every winery, route or experience the client creates in the future has to fit the same design on its own, without me around.",
          es: "Modelar el contenido en Strapi me enseñó a diseñar para alguien que no soy yo: cada ficha de bodega, ruta o experiencia que el cliente cree en el futuro tiene que encajar sola en el mismo diseño, sin que yo esté delante.",
          ca: "Modelar el contingut a Strapi em va ensenyar a dissenyar per a algú que no sóc jo: cada fitxa de celler, ruta o experiència que el client creï en el futur ha d'encaixar sola en el mateix disseny, sense que jo hi sigui.",
        },
      ],
    },
  },
  {
    id: "turisme-jaen",
    num: "05",
    title: { en: "Turisme Jaén", es: "Turisme Jaén", ca: "Turisme Jaén" },
    category: { en: "Web Design", es: "Diseño Web", ca: "Disseny Web" },
    year: "2026",
    problem: {
      en: "Jaén's tourism portal — one of Spain's most heritage-rich destinations — needed a full redesign able to handle hundreds of pages without losing clarity. The project came in after a collaboration on a tourism project in La Rioja, where the client saw how I worked.",
      es: "El portal de turismo de Jaén — uno de los destinos con más patrimonio de España — necesitaba un rediseño completo capaz de gestionar cientos de páginas sin perder claridad. El encargo llegó tras una colaboración en un proyecto turístico de La Rioja, donde el cliente vio cómo trabajaba.",
      ca: "El portal de turisme de Jaén — una de les destinacions amb més patrimoni d'Espanya — necessitava un redisseny complet capaç de gestionar centenars de pàgines sense perdre claredat. L'encàrrec va arribar després d'una col·laboració en un projecte turístic de La Rioja, on el client va veure com treballava.",
    },
    process: {
      en: "Designed in Figma, we tried several proposals thinking first about how content would be navigated, not just how it would look. Once the direction was set, we built the component system; code implementation is handled by an internal colleague.",
      es: "Diseñado en Figma, probamos varias propuestas pensando primero en cómo se navegaría el contenido, no solo en el estilo visual. Con la dirección definida, construimos el sistema de componentes; la implementación en código la lleva un compañero interno.",
      ca: "Dissenyat a Figma, vam provar diverses propostes pensant primer en com es navegaria el contingut, no només en l'estil visual. Amb la direcció definida, vam construir el sistema de components; la implementació en codi la porta un company intern.",
    },
    result: {
      en: "The system organises the portal into clearly differentiated page types without fragmenting the experience — each type is instantly recognisable, yet they all share the same visual base. Designing it alongside another designer meant agreeing on every decision along the way.",
      es: "El sistema organiza el portal en tipos de página claramente diferenciados sin fragmentar la experiencia — cada tipo se reconoce al instante, pero todos comparten la misma base visual. Diseñarlo junto a otra diseñadora nos obligó a ponernos de acuerdo en cada decisión.",
      ca: "El sistema organitza el portal en tipus de pàgina clarament diferenciats sense fragmentar l'experiència — cada tipus es reconeix a l'instant, però tots comparteixen la mateixa base visual. Dissenyar-lo al costat d'una altra dissenyadora ens va obligar a posar-nos d'acord en cada decisió.",
    },
    description: {
      en: "Tourism web design for Jaén — full UI system designed in Figma as a duo, currently in production with the internal dev team.",
      es: "Diseño web de turismo para Jaén — sistema UI completo diseñado en Figma a dos, actualmente en producción con el equipo de desarrollo interno.",
      ca: "Disseny web de turisme per a Jaén — sistema UI complet dissenyat a Figma a dos, actualment en producció amb l'equip de desenvolupament intern.",
    },
    tags: ["Figma", "Web Design", "Tourism"],
    gradient: "linear-gradient(135deg, #2d1b00 0%, #6b3a1f 60%, #c4813a 100%)",
    accentColor: "#c4813a",
    // Placeholder: reuses existing real screen exports (cropped visually by
    // each frame's own aspect ratio via object-fit: cover) since this
    // project already has real screenshots, unlike the others below that
    // use a not-yet-existing path instead. None of these three were shot as
    // true desktop/tablet/mobile comparisons of the same view — see the
    // final summary for what Albert should swap in.
    deviceShowcase: {
      desktop: {
        src: "/screens/jaen/jaen-mapa.webp",
        alt: { en: "Desktop view of the interactive map with filtered results.", es: "Vista de escritorio del mapa interactivo con resultados filtrados.", ca: "Vista d'escriptori del mapa interactiu amb resultats filtrats." },
      },
      tablet: {
        src: "/screens/jaen/jaen-home.webp",
        alt: { en: "Tablet view of the tourism portal homepage.", es: "Vista de tablet de la portada del portal de turismo.", ca: "Vista de tablet de la portada del portal de turisme." },
      },
      mobile: {
        src: "/screens/jaen/jaen-ruta.webp",
        alt: { en: "Mobile view of the \"Vía Verde del Aceite\" route page.", es: "Vista móvil de la ficha de la ruta «Vía Verde del Aceite».", ca: "Vista mòbil de la fitxa de la ruta «Via Verda de l'Oli»." },
      },
      caption: {
        en: "The same system, from the planning desktop to the route in your pocket.",
        es: "El mismo sistema, desde el escritorio de planificación hasta la ruta en el bolsillo.",
        ca: "El mateix sistema, des de l'escriptori de planificació fins a la ruta a la butxaca.",
      },
    },
    cover: "/covers/cover-jaen.webp",
    coverAlt: {
      en: "Dusk view over Jaén's cathedral and old town, with mountains in the background.",
      es: "Vista del atardecer sobre la catedral y el casco antiguo de Jaén, con las montañas al fondo.",
      ca: "Vista del capvespre sobre la catedral i el nucli antic de Jaén, amb les muntanyes al fons.",
    },
    // Provisional showcase: real Figma screen exports (full-page, variable
    // height) while there's no linkable prototype yet. Ordered as a loose
    // narrative — public pages first, the two back-office screens last,
    // since they're a different voice (tourism-office staff tool, not the
    // visitor-facing site). `jaen-landing-inspirate(-2).webp`'s filenames
    // are a leftover from the client's export naming, not actual "Inspírate"
    // landing pages — see each alt text for what they really show.
    screens: [
      {
        src: "/screens/jaen/jaen-home.webp",
        alt: {
          en: "Tourism portal homepage, with must-sees, the events agenda and Jaén's featured routes.",
          es: "Portada del portal de turismo, con imprescindibles, agenda de eventos y rutas destacadas de Jaén.",
          ca: "Portada del portal de turisme, amb imprescindibles, agenda d'esdeveniments i rutes destacades de Jaén.",
        },
      },
      {
        src: "/screens/jaen/jaen-menu.webp",
        alt: {
          en: "The expanded \"Get inspired\" navigation menu, with trip ideas organised by theme.",
          es: "Menú de navegación «Inspírate» desplegado, con ideas de viaje organizadas por temática.",
          ca: "Menú de navegació «Inspira't» desplegat, amb idees de viatge organitzades per temàtica.",
        },
      },
      {
        src: "/screens/jaen/jaen-frame-3.webp",
        alt: {
          en: "Listing of places of interest, filterable by place type and town.",
          es: "Listado de lugares de interés con filtros por tipo de lugar y localidad.",
          ca: "Llistat de llocs d'interès amb filtres per tipus de lloc i localitat.",
        },
      },
      {
        src: "/screens/jaen/jaen-mapa.webp",
        alt: {
          en: "Interactive map view with filtered results and the listing in the side panel.",
          es: "Vista de mapa interactivo con los resultados filtrados y el listado en el lateral.",
          ca: "Vista de mapa interactiu amb els resultats filtrats i el llistat al lateral.",
        },
      },
      {
        src: "/screens/jaen/jaen-ruta.webp",
        alt: {
          en: "The \"Vía Verde del Aceite\" route page, with map, technical details and elevation profile.",
          es: "Ficha de la ruta «Vía Verde del Aceite», con mapa, datos técnicos y perfil de altura.",
          ca: "Fitxa de la ruta «Via Verda de l'Oli», amb mapa, dades tècniques i perfil d'alçada.",
        },
      },
      {
        src: "/screens/jaen/jaen-receta.webp",
        alt: {
          en: "A recipe page, with ingredients and preparation steps.",
          es: "Ficha de receta gastronómica, con ingredientes y pasos de preparación.",
          ca: "Fitxa de recepta gastronòmica, amb ingredients i passos de preparació.",
        },
      },
      {
        src: "/screens/jaen/jaen-alojamiento.webp",
        alt: {
          en: "An accommodation listing, with photo gallery, amenities and a map of nearby points of interest.",
          es: "Ficha de alojamiento, con galería, servicios y mapa de puntos de interés cercanos.",
          ca: "Fitxa d'allotjament, amb galeria, serveis i mapa de punts d'interès propers.",
        },
      },
      {
        src: "/screens/jaen/jaen-eventos.webp",
        alt: {
          en: "The events agenda, filterable by type, town and date.",
          es: "Agenda de eventos filtrable por tipo, localidad y fecha.",
          ca: "Agenda d'esdeveniments filtrable per tipus, localitat i data.",
        },
      },
      {
        src: "/screens/jaen/jaen-itinerario.webp",
        alt: {
          en: "The itinerary planner: drag experiences into each day of the trip.",
          es: "Planificador de itinerarios: arrastra experiencias a cada día de tu viaje.",
          ca: "Planificador d'itineraris: arrossega experiències a cada dia del viatge.",
        },
      },
      {
        src: "/screens/jaen/jaen-listado.webp",
        alt: {
          en: "A saved itinerary, day by day, with a map and the stops for each day.",
          es: "Itinerario guardado, día a día, con mapa y paradas de cada jornada.",
          ca: "Itinerari desat, dia a dia, amb mapa i parades de cada jornada.",
        },
      },
      {
        src: "/screens/jaen/jaen-frame-2.webp",
        alt: {
          en: "Search with autocomplete suggestions and access to the AI assistant.",
          es: "Buscador con autocompletado y acceso al asistente de IA.",
          ca: "Cercador amb autocompletat i accés a l'assistent d'IA.",
        },
      },
      {
        src: "/screens/jaen/jaen-home-microsite.webp",
        alt: {
          en: "The \"Castles and Battles of the Kingdom of Jaén\" themed microsite, with its own route, immersive content and agenda.",
          es: "Microsite temático «Castillos y Batallas del Reino de Jaén», con ruta, contenido inmersivo y agenda propia.",
          ca: "Microsite temàtic «Castells i Batalles del Regne de Jaén», amb ruta, contingut immersiu i agenda pròpia.",
        },
      },
      {
        src: "/screens/jaen/jaen-frame-1.webp",
        alt: {
          en: "Visitor registration form for tourism office staff.",
          es: "Formulario de registro de visitantes para el personal de la oficina de turismo.",
          ca: "Formulari de registre de visitants per al personal de l'oficina de turisme.",
        },
      },
      {
        src: "/screens/jaen/jaen-landing-inspirate.webp",
        alt: {
          en: "The tourism office's internal dashboard, with management modules and real-time alerts.",
          es: "Panel interno de la oficina de turismo, con módulos de gestión y avisos en tiempo real.",
          ca: "Panell intern de l'oficina de turisme, amb mòduls de gestió i avisos en temps real.",
        },
      },
      {
        src: "/screens/jaen/jaen-landing-inspirate-2.webp",
        alt: {
          en: "The same back-office's visitor analytics panel, with stats and visitor origins.",
          es: "Panel de análisis de visitantes del mismo back-office, con estadísticas y procedencias.",
          ca: "Panell d'anàlisi de visitants del mateix back-office, amb estadístiques i procedències.",
        },
      },
    ],
    heroTagline: {
      en: "redesign of the province's tourism portal",
      es: "rediseño del portal de turismo de la provincia",
      ca: "redisseny del portal de turisme de la província",
    },
    meta: [
      { labelKey: "client", value: "Turismo de Jaén" },
      { labelKey: "year", value: "2026" },
      { labelKey: "status", value: status.inProduction },
      { labelKey: "duration", value: { en: "2 – 3 months", es: "2 – 3 meses", ca: "2 – 3 mesos" } },
      { labelKey: "role", value: { en: "Web design · UX · Figma", es: "Diseño web · UX · Figma", ca: "Disseny web · UX · Figma" } },
      { labelKey: "stack", value: "Figma" },
      { labelKey: "team", value: { en: "Design + in-house development", es: "Diseño + Desarrollo interno", ca: "Disseny + desenvolupament intern" } },
    ],
    designSystem: {
      palette: [
        { hex: "#2d1b00", label: { es: "Fondo oscuro", en: "Dark background", ca: "Fons fosc" } },
        { hex: "#6b3a1f", label: { es: "Fondo medio", en: "Mid background", ca: "Fons mitjà" } },
        { hex: "#c4813a", label: { es: "Acento", en: "Accent", ca: "Accent" } },
      ],
      // TODO: confirmar tipografías reales con Albert — no hay sitio público
      // ni prototipo navegable del que leer getComputedStyle, solo exports
      // estáticos en JPG/PNG (ver ~/Desktop/exports-jaen).
      typography: [],
    },
    // Pending real button values (height/radius/color) and a new crop of
    // jaen-alojamiento.webp for the card specimen — Albert still has to
    // confirm both from Figma/the live captures. See the final summary.
    componentsSheet: {
      buttons: [],
    },
    page: {
      challengeHeading: { en: "Two challenges in one", es: "Dos retos en uno", ca: "Dos reptes en un" },
      challengeCards: [
        {
          badge: { en: "The designer's challenge", es: "Reto del diseñador", ca: "El repte del dissenyador" },
          heading: { en: "Appealing, functional and full of personality", es: "Atractivo, funcional y con personalidad", ca: "Atractiu, funcional i amb personalitat" },
          body: {
            en: "Make the portal feel light despite the volume, visually tell page types apart without fragmenting the system, and give it personality without falling into tourism design's most overused patterns.",
            es: "Hacer que el portal pareciera ligero pese al volumen, distinguir visualmente los tipos de página sin fragmentar el sistema, y darle personalidad sin caer en los patrones más usados del diseño turístico.",
            ca: "Fer que el portal semblés lleuger malgrat el volum, distingir visualment els tipus de pàgina sense fragmentar el sistema, i donar-li personalitat sense caure en els patrons més usats del disseny turístic.",
          },
        },
      ],
      structureHeading: { en: "One system, four voices", es: "Un sistema, cuatro voces", ca: "Un sistema, quatre veus" },
      structureBody: [
        {
          en: "The first job was mapping the page types — homepage, listing, route, profile — and what information was essential in each.",
          es: "El primer trabajo fue mapear los tipos de página — portada, listado, ruta, ficha — y qué información era esencial en cada uno.",
          ca: "La primera feina va ser mapejar els tipus de pàgina — portada, llistat, ruta, fitxa — i quina informació era essencial en cadascun.",
        },
      ],
      structureBodyBold: {
        prefix: {
          en: "Every type has its own visual logic, but ",
          es: "Cada tipo tiene su lógica visual propia, pero ",
          ca: "Cada tipus té la seva pròpia lògica visual, però ",
        },
        bold: {
          en: "the system unifies without flattening.",
          es: "el sistema unifica sin igualar.",
          ca: "el sistema unifica sense igualar.",
        },
      },
      processHeading: { en: "Style first, then the system", es: "Primero el estilo, luego el sistema", ca: "Primer l'estil, després el sistema" },
      pageTypes: [
        { label: { en: "Homepage", es: "Portada", ca: "Portada" }, sub: { en: "Orient and seduce", es: "Orientar y seducir", ca: "Orientar i seduir" } },
        { label: { en: "Listing", es: "Listado", ca: "Llistat" }, sub: { en: "Filter and explore", es: "Filtrar y explorar", ca: "Filtrar i explorar" } },
        { label: { en: "Route", es: "Ruta", ca: "Ruta" }, sub: { en: "Guide step by step", es: "Guiar paso a paso", ca: "Guiar pas a pas" } },
        { label: { en: "Town profile", es: "Ficha de municipio", ca: "Fitxa de municipi" }, sub: { en: "Inform in detail", es: "Informar en detalle", ca: "Informar en detall" } },
      ],
      learningsItems: [
        {
          en: "Interpret without losing anything. The challenge wasn't inventing from scratch, but improving without removing. Every element of the old portal existed because someone needed it.",
          es: "Interpretar sin perder. El reto no era inventar desde cero, sino mejorar sin eliminar. Cada elemento del portal antiguo existía porque alguien lo necesitaba.",
          ca: "Interpretar sense perdre. El repte no era inventar des de zero, sinó millorar sense eliminar. Cada element del portal antic existia perquè algú el necessitava.",
        },
        {
          en: "Having the component system already built made revisions absorbable, not a full rebuild. And there are always revisions.",
          es: "Tener el sistema de componentes ya construido hizo que las revisiones fueran absorbibles, no una reconstrucción completa. Y siempre hay revisiones.",
          ca: "Tenir el sistema de components ja construït va fer que les revisions fossin absorbibles, no una reconstrucció completa. I sempre hi ha revisions.",
        },
        {
          en: "With hundreds of pages at stake, every decision stopped being 'does this page look good?' and became 'does this rule hold up across the other fifteen variants I haven't seen yet?'.",
          es: "Con cientos de páginas en juego, cada decisión dejó de ser '¿esta página queda bien?' y pasó a ser '¿esta regla aguanta en las otras quince variantes que todavía no he visto?'.",
          ca: "Amb centenars de pàgines en joc, cada decisió va deixar de ser '¿aquesta pàgina queda bé?' i va passar a ser '¿aquesta regla aguanta en les altres quinze variants que encara no he vist?'.",
        },
      ],
    },
  },
  {
    id: "mirazur",
    num: "06",
    title: { en: "Mirazur", es: "Mirazur", ca: "Mirazur" },
    category: { en: "Web Design", es: "Diseño Web", ca: "Disseny Web" },
    year: "2025–2026",
    problem: {
      en: "Mirazur, Mauro Colagreco's three-Michelin-star restaurant in Menton, gave Dosgrapas two independent projects — both picked up mid-process.",
      es: "Mirazur, el restaurante de tres estrellas Michelin de Mauro Colagreco en Menton, le encargó a Dosgrapas dos proyectos independientes — los dos retomados a medias.",
      ca: "El Mirazur, el restaurant de tres estrelles Michelin de Mauro Colagreco a Menton, va encarregar a Dosgrapas dos projectes independents — tots dos represos a mitges.",
    },
    // The client-level process/result fields below never render on screen —
    // MirazurPage's "El enfoque/El resultado" section reads each active
    // sub-project's own process/result instead (see subProjects below), so
    // each tab tells its own story. These two stay populated with neutral
    // copy only because TypeScript still requires them on every Project.
    process: {
      en: "Two projects, two different approaches for the same client.",
      es: "Dos proyectos, dos enfoques distintos para el mismo cliente.",
      ca: "Dos projectes, dos enfocaments diferents per al mateix client.",
    },
    result: {
      en: "One project wrapped up to show, the other on hold — each documented in its own tab.",
      es: "Un proyecto cerrado para enseñar, otro en pausa — cada uno documentado en su propia pestaña.",
      ca: "Un projecte tancat per ensenyar, l'altre en pausa — cadascun documentat a la seva pròpia pestanya.",
    },
    description: {
      en: "Two real projects with Mirazur — both picked up mid-process: a recipe portal in Figma, and a landing that distills the restaurant's experience, designed and built with Claude Design.",
      es: "Dos proyectos reales con Mirazur — los dos retomados a medias: un portal de recetas en Figma, y una landing que resume la experiencia del restaurante, diseñada y construida con Claude Design.",
      ca: "Dos projectes reals amb el Mirazur — tots dos represos a mitges: un portal de receptes a Figma, i una landing que resumeix l'experiència del restaurant, dissenyada i construïda amb Claude Design.",
    },
    tags: ["Figma", "Claude Design", "Web Design"],
    gradient: "linear-gradient(135deg, #1a2a0d 0%, #3d5c1e 60%, #7aad3a 100%)",
    accentColor: "#7aad3a",
    designSystem: {
      palette: [
        { hex: "#0a0908", label: { es: "Fondo", en: "Background", ca: "Fons" } },
        { hex: "#14110f", label: { es: "Fondo secundario", en: "Secondary background", ca: "Fons secundari" } },
        { hex: "#ede0bd", label: { es: "Titulares", en: "Headlines", ca: "Titulars" } },
        { hex: "#ece8e1", label: { es: "Texto", en: "Text", ca: "Text" } },
        { hex: "#cd9a50", label: { es: "Acento (ámbar)", en: "Accent (amber)", ca: "Accent (ambre)" } },
      ],
      typography: [
        { typeface: "Goudy Old Style", usage: { es: "Títulos de sección", en: "Section headings", ca: "Títols de secció" } },
        { typeface: "Cormorant Garamond", usage: { es: "Titular principal (cursiva)", en: "Main headline (italic)", ca: "Titular principal (cursiva)" } },
        { typeface: "Saans", usage: { es: "Texto e interfaz", en: "Body & interface", ca: "Text i interfície" } },
      ],
    },
    // Project-level, not per sub-project — shared across both tabs (see
    // Project.deviceShowcase above). Real captures from the recipe portal
    // (Figma) and the experience landing's brief material.
    deviceShowcase: {
      desktop: {
        src: "/projects/mirazur/device-desktop.jpg",
        alt: {
          es: "Equipo de cocina de Mirazur trabajando en la línea de pase, con un muro de flores frescas al fondo.",
          en: "Mirazur's kitchen team at work on the pass, with a wall of fresh flowers in the background.",
          ca: "Equip de cuina del Mirazur treballant a la línia de pas, amb un mur de flors fresques al fons.",
        },
      },
      tablet: {
        src: "/projects/mirazur/device-tablet.jpg",
        alt: {
          es: "Un miembro del equipo de sala prepara una presentación de sala con frascos pequeños y un tarro de ingredientes en conserva, frente a un muro de musgo.",
          en: "A member of the service team sets up a tableside presentation with small bottles and a jar of preserved ingredients, in front of a moss wall.",
          ca: "Un membre de l'equip de sala prepara una presentació de sala amb pots petits i un tarro d'ingredients en conserva, davant d'un mur de molsa.",
        },
      },
      mobile: {
        src: "/projects/mirazur/device-mobile.jpg",
        alt: {
          es: "Primer plano de una técnica de emplatado: una flor comestible colocada con pinzas sobre hielo seco, con el logotipo de Mirazur al fondo.",
          en: "Close-up of a plating technique: an edible flower placed with tweezers over dry ice, with the Mirazur logo visible in the background.",
          ca: "Primer pla d'una tècnica d'emplatat: una flor comestible col·locada amb pinces sobre gel sec, amb el logotip del Mirazur al fons.",
        },
      },
      caption: {
        es: "El oficio que ambos proyectos intentan trasladar a pantalla.",
        en: "The craft both projects set out to translate to screen.",
        ca: "L'ofici que tots dos projectes intenten traslladar a pantalla.",
      },
    },
    video: "/covers/mirazur.mp4",
    cover: "/covers/cover-mirazur.webp",
    coverAlt: {
      en: "Close-up of rosemary and thyme sprigs on a pale green surface — cover image for the Mirazur project.",
      es: "Primer plano de ramas de romero y tomillo sobre una superficie verde clara — imagen de portada del proyecto Mirazur.",
      ca: "Primer pla de branquetes de romaní i farigola sobre una superfície verda clara — imatge de portada del projecte Mirazur.",
    },
    heroTagline: {
      en: "recipe portal and experience landing",
      es: "portal de recetas y landing de experiencia",
      ca: "portal de receptes i landing d'experiència",
    },
    page: {
      heroCta: { en: "View live demo", es: "Ver demo en vivo", ca: "Veure demo en directe" },
    },
    meta: [
      { labelKey: "client", value: "Mirazur" },
      { labelKey: "year", value: "2025–2026" },
      { labelKey: "studio", value: "Dosgrapas" },
      { labelKey: "role", value: { en: "Figma design (portal) + design & build with Claude Design (landing)", es: "Diseño en Figma (portal) + diseño y construcción con Claude Design (landing)", ca: "Disseny a Figma (portal) + disseny i construcció amb Claude Design (landing)" } },
      { labelKey: "duration", value: { en: "Ad hoc work, on demand", es: "Encargos puntuales, bajo demanda", ca: "Encàrrecs puntuals, sota demanda" } },
    ],
    // Two sub-projects shown as tabs on the same client page — the coupon
    // landing is the default/first one (see MirazurPage's DEFAULT_SUB_ID).
    // Mirrors the elBulli SubProject convention: client-level fields (hero,
    // shared intro problem/meta) stay on the parent Project above. Both the
    // closing "enfoque/resultado" section and "aprendizajes" instead read
    // each sub-project's own content (MirazurPage uses
    // activeSubProject.process/result and activeSubProject.page?.learningsItems,
    // not the parent's), so each tab tells its own story there. The parent's
    // process/result fields are unused on screen and only exist to satisfy
    // TypeScript.
    subProjects: [
      {
        id: "cupon",
        tabLabel: { en: "Experience landing", es: "Landing de experiencia", ca: "Landing d'experiència" },
        num: "01",
        category: { en: "Web Design", es: "Diseño Web", ca: "Disseny Web" },
        year: "2026",
        problem: {
          en: "This project was about taking the Mirazur experience beyond the table, not closing a transaction. It also arrived half-finished.",
          es: "Este proyecto consistió en llevar la experiencia de Mirazur más allá de la mesa, no en cerrar una transacción. También llegó a medias.",
          ca: "Aquest projecte va consistir a portar l'experiència del Mirazur més enllà de la taula, no a tancar una transacció. També va arribar a mig fer.",
        },
        process: {
          en: "I built the page myself with Claude Design, with several rounds of direct review with the client, and proposed the form fields so data capture would be legal.",
          es: "Construí la página yo mismo con Claude Design, con varias rondas de revisión directas con el cliente, y propuse los campos del formulario para que la captación de datos fuera legal.",
          ca: "Vaig construir la pàgina jo mateix amb Claude Design, amb diverses rondes de revisió directes amb el client, i vaig proposar els camps del formulari perquè la captació de dades fos legal.",
        },
        result: {
          en: "The design was validated by the client and is ready to move into development.",
          es: "El diseño quedó validado por el cliente y listo para pasar a desarrollo.",
          ca: "El disseny va quedar validat pel client i llest per passar a desenvolupament.",
        },
        tags: ["Claude Design"],
        // deviceShowcase removed temporarily: no real desktop/tablet/mobile
        // captures exist yet for the experience landing (confirmed by Albert).
        meta: [
          { labelKey: "status", value: { en: "Design completed", es: "Diseño completado", ca: "Disseny completat" } },
          { labelKey: "stack", value: "Claude Design" },
        ],
        page: {
          project2Label: { en: "Project 02", es: "Proyecto 02", ca: "Projecte 02" },
          project2SectionLabel: { en: "Experience landing", es: "Landing de experiencia", ca: "Landing d'experiència" },
          project2Heading: { en: "A landing that distills an experience", es: "Una landing que resume una experiencia", ca: "Una landing que resumeix una experiència" },
          project2Body: [
            {
              en: "Taking the Mirazur experience beyond the table, not closing a transaction — the project arrived half-finished. The landing distills the setting, dishes and philosophy in a single scroll, with a simple form at the end.",
              es: "Llevar la experiencia de Mirazur más allá de la mesa, no cerrar una transacción — el proyecto llegó a medias. La landing resume el entorno, los platos y la filosofía del restaurante en un único scroll, con un formulario sencillo al final.",
              ca: "Portar l'experiència del Mirazur més enllà de la taula, no tancar una transacció — el projecte va arribar a mig fer. La landing resumeix l'entorn, els plats i la filosofia en un únic scroll, amb un formulari senzill al final.",
            },
          ],
          learningsItems: [
            {
              en: "Building the landing myself with AI changed the reviews: every change the client asked for, I could apply on the spot, without waiting on anyone — and that changes how you negotiate a design detail.",
              es: "Construir la landing yo mismo con IA cambió las revisiones: cada cambio del cliente lo aplicaba al momento, sin esperar a nadie — y eso cambia cómo se negocia un detalle de diseño.",
              ca: "Construir la landing jo mateix amb IA va canviar les revisions: cada canvi que demanava el client el podia aplicar a l'instant, sense esperar ningú — i això canvia com es negocia un detall de disseny.",
            },
          ],
        },
      },
      {
        id: "recetas",
        tabLabel: { en: "Recipe portal", es: "Portal de recetas", ca: "Portal de receptes" },
        num: "02",
        category: { en: "Web Design", es: "Diseño Web", ca: "Disseny Web" },
        year: "2025",
        problem: {
          en: "The project arrived half-finished. The idea was clear — a portal where users pay to access the restaurant's recipes, a model that takes fine dining beyond the table — but the design was incomplete.",
          es: "El proyecto llegó a medias. La idea era clara — un portal donde los usuarios pagan para acceder a las recetas del restaurante, un modelo que lleva la alta cocina más allá de la mesa — pero el diseño estaba incompleto.",
          ca: "El projecte va arribar a mig fer. La idea era clara — un portal on els usuaris paguen per accedir a les receptes del restaurant, un model que porta l'alta cuina més enllà de la taula — però el disseny estava incomplet.",
        },
        process: {
          en: "The focus here was sharpening the craft in Figma — learning to fine-tune and personalize the design, more than closing the project out.",
          es: "Aquí el foco fue aprender a afinar el oficio en Figma — ajustar y personalizar bien el diseño, más que cerrar el proyecto.",
          ca: "Aquí el focus va ser polir l'ofici a Figma — ajustar i personalitzar bé el disseny, més que tancar el projecte.",
        },
        result: {
          en: "The project was put on hold by the client; what was designed up to that point is documented here.",
          es: "El proyecto quedó en pausa por parte del cliente; lo diseñado hasta ese punto queda documentado aquí.",
          ca: "El projecte va quedar en pausa per part del client; el que es va dissenyar fins a aquell punt queda documentat aquí.",
        },
        tags: ["Figma"],
        // Hidden: existing capture files show the wrong content (see audit
        // 2026-10-14) — these 3 images are from an unrelated project ("M2O"),
        // not Mirazur/recetas. Replace with real captures before re-enabling.
        // deviceShowcase: {
        //   style: "diptych",
        //   desktop: {
        //     src: "/projects/mirazur-recetas/device-desktop.png",
        //     alt: { en: "Desktop view of the recipe listing.", es: "Vista de escritorio del listado de recetas.", ca: "Vista d'escriptori del llistat de receptes." },
        //   },
        //   tablet: {
        //     src: "/projects/mirazur-recetas/device-tablet.png",
        //     alt: { en: "Tablet view of an individual recipe page.", es: "Vista de tablet de una ficha de receta individual.", ca: "Vista de tablet d'una fitxa de recepta individual." },
        //   },
        //   mobile: {
        //     src: "/projects/mirazur-recetas/device-mobile.png",
        //     alt: { en: "Mobile view of the recipe access flow.", es: "Vista móvil del flujo de acceso a recetas.", ca: "Vista mòbil del flux d'accés a receptes." },
        //   },
        //   caption: {
        //     en: "The recipe portal, designed up to the point the project paused.",
        //     es: "El portal de recetas, diseñado hasta el punto en que el proyecto se pausó.",
        //     ca: "El portal de receptes, dissenyat fins al punt en què el projecte es va pausar.",
        //   },
        // },
        meta: [
          { labelKey: "status", value: { en: "On hold", es: "En pausa", ca: "En pausa" } },
          { labelKey: "stack", value: "Figma" },
        ],
        page: {
          project1Label: { en: "Project 01", es: "Proyecto 01", ca: "Projecte 01" },
          project1SectionLabel: { en: "Recipe portal", es: "Portal de recetas", ca: "Portal de receptes" },
          project1Heading: { en: "Fine dining, made accessible", es: "Alta cocina accesible", ca: "Alta cuina accessible" },
          project1Body: [
            {
              en: "The project arrived half-finished: a portal where users pay to access the restaurant's recipes, with the design still incomplete. I picked the Figma work back up and moved forward on the listing, the recipe page, the access flow and the restaurant profile.",
              es: "El proyecto llegó a medias: un portal donde los usuarios pagan para acceder a las recetas del restaurante, pero con el diseño incompleto. Retomé el trabajo en Figma y avancé el listado, la ficha individual, el flujo de acceso y el perfil del restaurante.",
              ca: "El projecte va arribar a mig fer: un portal on els usuaris paguen per accedir a les receptes del restaurant, amb el disseny encara incomplet. Vaig reprendre la feina a Figma i vaig avançar el llistat, la fitxa individual, el flux d'accés i el perfil del restaurant.",
            },
          ],
          learningsItems: [
            {
              en: "Picking up this half-finished project meant understanding before touching anything — reading the decisions already made in Figma before changing anything. I also learned that a paused project keeps teaching.",
              es: "Retomar este proyecto a medias me obligó a entender antes de tocar — leer las decisiones ya tomadas en Figma antes de cambiar nada. Aprendí también que un proyecto en pausa sigue enseñando.",
              ca: "Reprendre aquest projecte a mig fer em va obligar a entendre abans de tocar — llegir les decisions ja preses a Figma abans de canviar res. Vaig aprendre també que un projecte en pausa continua ensenyant.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "gnoss-ai",
    num: "07",
    title: { en: "GNOSS AI Platform", es: "GNOSS AI Platform", ca: "GNOSS AI Platform" },
    category: { en: "Design System", es: "Sistema de Diseño", ca: "Sistema de Disseny" },
    year: "2026",
    problem: {
      en: "Stepping into an existing design system built by others, and expanding it without breaking its internal logic — not just on web pages, but also covers, infographics and presentations.",
      es: "Entrar en un sistema de diseño ya existente, construido por otros, y ampliarlo sin romper su lógica interna — no solo en páginas web, también en portadas, infografías y presentaciones.",
      ca: "Entrar en un sistema de disseny ja existent, construït per altres, i ampliar-lo sense trencar la seva lògica interna — no només en pàgines web, també en portades, infografies i presentacions.",
    },
    process: {
      en: "I maintained existing pages, designed new ones and produced one-off pieces within the established system. The work was a constant back-and-forth with GNOSS's team, much like being one more person inside their own team.",
      es: "Mantuve páginas existentes, diseñé otras nuevas y creé piezas puntuales dentro del sistema establecido. El trabajo fue de ida y vuelta constante con el equipo de GNOSS, como una persona más dentro de su equipo.",
      ca: "Vaig mantenir pàgines existents, en vaig dissenyar de noves i vaig crear peces puntuals dins del sistema establert. La feina va ser una anada i tornada constant amb l'equip de GNOSS, com una persona més dins del seu equip.",
    },
    result: {
      en: "A coherent web at scale — new pages and graphic pieces that feel part of the same system, the result of an ongoing collaboration with GNOSS's team.",
      es: "Una web coherente a escala — nuevas páginas y piezas gráficas que parecen parte del mismo sistema, fruto de una colaboración continua con el equipo de GNOSS.",
      ca: "Una web coherent a escala — noves pàgines i peces gràfiques que semblen part del mateix sistema, fruit d'una col·laboració contínua amb l'equip de GNOSS.",
    },
    description: {
      en: "Web design, infographics and presentations for GNOSS — maintaining and expanding their design system in direct collaboration with their team.",
      es: "Diseño web, infografías y presentaciones para GNOSS — manteniendo y ampliando su sistema de diseño en colaboración directa con su equipo.",
      ca: "Disseny web, infografies i presentacions per a GNOSS — mantenint i ampliant el seu sistema de disseny en col·laboració directa amb el seu equip.",
    },
    tags: ["Figma", "Design System", "Infographics", "Client Collaboration"],
    gradient: "linear-gradient(135deg, #0a0e14 0%, #10263f 55%, #0a66f2 100%)",
    accentColor: "#0a66f2",
    // Hidden: existing capture files show the wrong content (see audit
    // 2026-10-14) — all 3 images are the same GNOSS homepage rescaled, not
    // the distinct pages the alt text promises. Replace with real captures
    // before re-enabling.
    // deviceShowcase: {
    //   style: "float",
    //   primary: "desktop",
    //   desktop: {
    //     src: "/projects/gnoss-ai/device-desktop.png",
    //     alt: { en: "Desktop view of a GNOSS website page.", es: "Vista de escritorio de una página de la web de GNOSS.", ca: "Vista d'escriptori d'una pàgina del web de GNOSS." },
    //   },
    //   tablet: {
    //     src: "/projects/gnoss-ai/device-tablet.png",
    //     alt: { en: "Tablet view of a GNOSS section cover.", es: "Vista de tablet de una portada de sección de GNOSS.", ca: "Vista de tablet d'una portada de secció de GNOSS." },
    //   },
    //   mobile: {
    //     src: "/projects/gnoss-ai/device-mobile.png",
    //     alt: { en: "Mobile view of a GNOSS website page.", es: "Vista móvil de una página de la web de GNOSS.", ca: "Vista mòbil d'una pàgina del web de GNOSS." },
    //   },
    //   caption: {
    //     en: "New pages, built to feel native to GNOSS's own system.",
    //     es: "Páginas nuevas, construidas para sentirse nativas del propio sistema de GNOSS.",
    //     ca: "Pàgines noves, construïdes per sentir-se natives del propi sistema de GNOSS.",
    //   },
    // },
    // Palette confirmed by diseñador; typeface pair confirmed live from
    // gnoss.com's own computed styles (h1/h2/body) — same pair as elBulli.
    designSystem: {
      palette: [
        { hex: "#BEBEBE", label: { es: "Fondo", en: "Background", ca: "Fons" } },
        { hex: "#FFFFFF", label: { es: "Texto y logotipo", en: "Text & logo", ca: "Text i logotip" } },
        { hex: "#0A66F2", label: { es: "Acento", en: "Accent", ca: "Accent" } },
      ],
      typography: [
        { typeface: "PP Neue Machina (Light)", usage: { es: "Titulares", en: "Headlines", ca: "Titulars" } },
        { typeface: "Inter (Light)", usage: { es: "Texto e interfaz", en: "Body & interface", ca: "Text i interfície" } },
      ],
    },
    cover: "/covers/cover-gnoss.svg",
    coverAlt: {
      en: "Cover with the GNOSS logo in white on a dark background.",
      es: "Portada con el logotipo de GNOSS en blanco sobre un fondo oscuro.",
      ca: "Portada amb el logotip de GNOSS en blanc sobre un fons fosc.",
    },
    heroTagline: {
      en: "maintaining and expanding a web design system",
      es: "mantenimiento y expansión de un sistema de diseño web",
      ca: "manteniment i expansió d'un sistema de disseny web",
    },
    meta: [
      { labelKey: "client", value: "GNOSS" },
      { labelKey: "year", value: "2026" },
      { labelKey: "status", value: status.completed },
      { labelKey: "role", value: { en: "Web & content design · Client collaboration", es: "Diseño web y de contenido · Colaboración con cliente", ca: "Disseny web i de contingut · Col·laboració amb client" } },
      { labelKey: "stack", value: "Figma" },
      { labelKey: "web", value: "gnoss.com", href: "https://gnoss.com/" },
    ],
    page: {
      challengeHeading: {
        en: "Stepping into someone else's system without breaking it",
        es: "Entrar en un sistema ajeno y no romperlo",
        ca: "Entrar en un sistema aliè i no trencar-lo",
      },
      challengeBody: [
        {
          en: "The challenge wasn't inventing, it was reading: understanding the design decisions others had made and why, so any new page would feel part of the same system. With a website this big, consistency is the only thing holding the whole together.",
          es: "El reto no era inventar, sino leer: entender las decisiones de diseño que otros habían tomado y por qué existían, para que cualquier página nueva pareciera parte del mismo sistema. Con una web tan grande, la consistencia es lo único que mantiene la coherencia del conjunto.",
          ca: "El repte no era inventar, sinó llegir: entendre les decisions de disseny que altres havien pres i per què existien, perquè qualsevol pàgina nova semblés part del mateix sistema. Amb una web tan gran, la consistència és l'únic que manté la coherència del conjunt.",
        },
      ],
      workCards: [
        {
          label: { en: "Beyond web pages", es: "Más allá de la web", ca: "Més enllà de la web" },
          desc: {
            en: "Besides web pages, I designed section covers, infographics and the occasional presentation — always within the same visual language as the system.",
            es: "Además de páginas web, diseñé portadas de sección, infografías y alguna presentación — siempre dentro de la misma línea visual del sistema.",
            ca: "A més de pàgines web, vaig dissenyar portades de secció, infografies i alguna presentació — sempre dins de la mateixa línia visual del sistema.",
          },
        },
        {
          label: { en: "Maintenance & new pages", es: "Mantenimiento y páginas nuevas", ca: "Manteniment i pàgines noves" },
          desc: {
            en: "Updated existing pages and created brand-new ones following the established system, keeping things coherent across a website with hundreds of pages.",
            es: "Actualicé páginas existentes y creé otras nuevas siguiendo el sistema establecido, cuidando la coherencia en una web con cientos de páginas.",
            ca: "Vaig actualitzar pàgines existents i en vaig crear de noves seguint el sistema establert, tenint cura de la coherència en una web amb centenars de pàgines.",
          },
        },
        {
          label: { en: "Working with GNOSS", es: "Colaboración con GNOSS", ca: "Col·laboració amb GNOSS" },
          desc: {
            en: "Constant back-and-forth with GNOSS's team — resolving comments in Figma and exchanging emails, much like being one more person inside their team.",
            es: "Trabajo constante con el equipo de GNOSS — resolviendo comentarios en Figma e intercambiando correos, como una persona más dentro de su equipo.",
            ca: "Treball constant amb l'equip de GNOSS — resolent comentaris a Figma i intercanviant correus, com una persona més dins del seu equip.",
          },
        },
      ],
      learningsItems: [
        {
          en: "Working inside a system is a skill in itself: understanding the existing judgment well enough to extend it without the seams showing.",
          es: "Trabajar dentro de un sistema es una habilidad en sí misma: entender el criterio existente lo bastante bien como para extenderlo sin que se note la costura.",
          ca: "Treballar dins d'un sistema és una habilitat en si mateixa: entendre el criteri existent prou bé com per estendre'l sense que se'n noti la costura.",
        },
        {
          en: "Scale reveals consistency problems that go unnoticed in small projects — on a large website, any small inconsistency ends up visible.",
          es: "La escala revela problemas de consistencia que en proyectos pequeños pasan desapercibidos — en una web grande, cualquier pequeña inconsistencia acaba siendo visible.",
          ca: "L'escala revela problemes de consistència que en projectes petits passen desapercebuts — en una web gran, qualsevol petita inconsistència acaba sent visible.",
        },
        {
          en: "Working directly with GNOSS's team felt like being part of an outside team: I learned to explain design decisions and negotiate changes with people who didn't share my day-to-day context.",
          es: "Trabajar directamente con el equipo de GNOSS se pareció a formar parte de un equipo externo: aprendí a explicar decisiones de diseño y negociar cambios con gente que no compartía mi día a día.",
          ca: "Treballar directament amb l'equip de GNOSS es va assemblar a formar part d'un equip extern: vaig aprendre a explicar decisions de disseny i negociar canvis amb gent que no compartia el meu dia a dia.",
        },
      ],
    },
  },
  {
    id: "castellera",
    num: "04",
    title: { en: "Colla Castellera del Baix Montseny", es: "Colla Castellera del Baix Montseny", ca: "Colla Castellera del Baix Montseny" },
    category: { en: "Web Design & Dev", es: "Diseño y desarrollo web", ca: "Disseny i desenvolupament web" },
    year: "2026",
    problem: {
      en: "A castellers association needed more than a nice-looking website: updating content without touching code, and forms that actually reached their corporate emails. A product problem, not just a design one.",
      es: "Una colla castellera necesitaba mucho más que una web bonita: poder actualizar el contenido sin tocar código, y formularios que llegaran de verdad a sus correos corporativos. Un problema de producto, no solo de diseño.",
      ca: "Una colla castellera necessitava molt més que una web bonica: poder actualitzar el contingut sense tocar codi, i formularis que arribessin de veritat als seus correus corporatius. Un problema de producte, no només de disseny.",
    },
    process: {
      en: "I designed and developed the website with Claude Code, wired the contact forms to corporate emails, and deployed the site from GitHub to the contracted server and domain.",
      es: "Diseñé y desarrollé la web con Claude Code, conecté los formularios a los correos corporativos y desplegué el site desde GitHub al servidor y dominio contratados.",
      ca: "Vaig dissenyar i desenvolupar la web amb Claude Code, vaig connectar els formularis als correus corporatius i vaig desplegar el site des de GitHub al servidor i domini contractats.",
    },
    result: {
      en: "A fully operational website with a simple content management system, working contact forms, and a complete deployment pipeline.",
      es: "Una web completamente operativa con un sistema de gestión de contenido simple, formularios funcionales y un pipeline de despliegue completo.",
      ca: "Una web completament operativa amb un sistema de gestió de contingut simple, formularis funcionals i un pipeline de desplegament complet.",
    },
    description: {
      en: "Personal project — website design, development, CMS setup with Notion, and full deployment for a castellers association.",
      es: "Proyecto personal — diseño, desarrollo, CMS con Notion y despliegue completo para una colla castellera.",
      ca: "Projecte personal — disseny, desenvolupament, CMS amb Notion i desplegament complet per a una colla castellera.",
    },
    tags: ["Claude Code", "Notion", "Web Design"],
    gradient: "linear-gradient(135deg, #030f11 0%, #0a3d47 60%, #01758c 100%)",
    accentColor: "#01758c",
    designSystem: {
      palette: [
        { hex: "#01758c", label: { es: "Acento (color de la colla)", en: "Accent (colla's color)", ca: "Accent (color de la colla)" } },
        { hex: "#015c6e", label: { es: "Acento oscuro", en: "Dark accent", ca: "Accent fosc" } },
        { hex: "#1a1a1a", label: { es: "Texto", en: "Text", ca: "Text" } },
        { hex: "#ffffff", label: { es: "Fondo", en: "Background", ca: "Fons" } },
        { hex: "#f0f6f7", label: { es: "Fondo secundario", en: "Secondary background", ca: "Fons secundari" } },
      ],
      typography: [
        { typeface: "Poppins", usage: { es: "Titulares y cuerpo de texto", en: "Headlines & body", ca: "Titulars i cos de text" } },
      ],
    },
    // Hidden: existing capture files show the wrong content (see audit
    // 2026-10-14) — all 3 images are the same CCBM homepage hero rescaled,
    // not the distinct pages the alt text promises. Replace with real
    // captures before re-enabling.
    // deviceShowcase: {
    //   style: "float",
    //   primary: "mobile",
    //   desktop: {
    //     src: "/projects/castellera/device-desktop.png",
    //     alt: { en: "Desktop view of the Colla Castellera website homepage.", es: "Vista de escritorio de la portada de la web de la Colla Castellera.", ca: "Vista d'escriptori de la portada del web de la Colla Castellera." },
    //   },
    //   tablet: {
    //     src: "/projects/castellera/device-tablet.png",
    //     alt: { en: "Tablet view of the team/formation page.", es: "Vista de tablet de la página del equipo/formación.", ca: "Vista de tablet de la pàgina de l'equip/formació." },
    //   },
    //   mobile: {
    //     src: "/projects/castellera/device-mobile.png",
    //     alt: { en: "Mobile view of the contact form.", es: "Vista móvil del formulario de contacto.", ca: "Vista mòbil del formulari de contacte." },
    //   },
    //   caption: {
    //     en: "Built mobile-first, for members checking rehearsals on the go.",
    //     es: "Construida mobile-first, para quienes consultan los ensayos desde el móvil.",
    //     ca: "Construïda mobile-first, per a qui consulta els assajos des del mòbil.",
    //   },
    // },
    video: "/covers/tritoners.mp4",
    cover: "/covers/cover-castellera.webp",
    coverAlt: {
      en: "Members of the Colla Castellera del Baix Montseny, in blue shirts with red kerchiefs, gathered together with arms raised before building a human tower — temporary cover frame grabbed from the project video, pending a proper photo.",
      es: "Miembros de la Colla Castellera del Baix Montseny, con camisa azul y pañuelo rojo, reunidos con los brazos en alto antes de levantar un castell — fotograma provisional sacado del vídeo del proyecto, a la espera de una foto definitiva.",
      ca: "Membres de la Colla Castellera del Baix Montseny, amb camisa blava i mocador vermell, reunits amb els braços enlaire abans d'aixecar un castell — fotograma provisional tret del vídeo del projecte, a l'espera d'una foto definitiva.",
    },
    heroTagline: {
      en: "design, development and launch of their website",
      es: "diseño, desarrollo y puesta en marcha de su web",
      ca: "disseny, desenvolupament i posada en marxa del seu web",
    },
    meta: [
      { labelKey: "project", value: { en: "Personal · Self-directed", es: "Personal · Autónomo", ca: "Personal · Autònom" } },
      { labelKey: "client", value: "Colla Castellera del Baix Montseny" },
      { labelKey: "year", value: "2026" },
      { labelKey: "role", value: { en: "Design · Development · Deployment · CMS", es: "Diseño · Desarrollo · Despliegue · CMS", ca: "Disseny · Desenvolupament · Desplegament · CMS" } },
      { labelKey: "stack", value: "Claude Code · Next.js · Notion · GitHub" },
      { labelKey: "web", value: "ccbaixmontseny.cat", href: "https://ccbaixmontseny.cat/" },
    ],
    page: {
      heroEyebrow: { en: "Personal project", es: "Proyecto personal", ca: "Projecte personal" },
      workHeading: {
        en: "From zero to a live website",
        es: "De cero a web en producción",
        ca: "De zero a web en producció",
      },
      workCards: [
        {
          label: { en: "Design and development", es: "Diseño y desarrollo", ca: "Disseny i desenvolupament" },
          desc: {
            en: "I designed and built the entire website with Claude Code, with composition and design adjustments throughout the process.",
            es: "Diseñé y desarrollé la web completa con Claude Code, con ajustes de composición y diseño a lo largo del proceso.",
            ca: "Vaig dissenyar i desenvolupar la web completa amb Claude Code, amb ajustos de composició i disseny al llarg del procés.",
          },
        },
        {
          label: { en: "Contact forms", es: "Formularios de contacto", ca: "Formularis de contacte" },
          desc: {
            en: "I set up the forms so responses would land directly in the association's corporate inboxes.",
            es: "Configuré los formularios para que las respuestas llegaran directamente a los correos corporativos de la colla.",
            ca: "Vaig configurar els formularis perquè les respostes arribessin directament als correus corporatius de la colla.",
          },
        },
        {
          label: { en: "Deployment", es: "Despliegue", ca: "Desplegament" },
          desc: {
            en: "I linked the GitHub repository to the contracted server and domain to get the site running with an automatic pipeline.",
            es: "Enlacé el repositorio de GitHub con el servidor y dominio contratados para dejar la web operativa con un pipeline automático.",
            ca: "Vaig enllaçar el repositori de GitHub amb el servidor i domini contractats per deixar la web operativa amb un pipeline automàtic.",
          },
        },
        {
          label: { en: "Presence on Google", es: "Presencia en Google", ca: "Presència a Google" },
          desc: {
            en: "I set up the Google Business profile so searching for the association shows the Maps card with the website, address and up-to-date contact details.",
            es: "Configuré la ficha de Google Business para que al buscar la colla aparezca la tarjeta de Maps con la web, la dirección y los datos de contacto actualizados.",
            ca: "Vaig configurar la fitxa de Google Business perquè en cercar la colla aparegui la targeta de Maps amb la web, l'adreça i les dades de contacte actualitzades.",
          },
        },
      ],
      systemHeading: {
        en: "The colla, not a tech department",
        es: "La colla, no un equipo técnico",
        ca: "La colla, no un equip tècnic",
      },
      systemBody: [
        {
          en: "There's no development team behind the website: it's the colla itself, a non-technical team that also has to keep it up to date. I connected Notion as their content manager so they could update text and information on their own, without depending on anyone with coding knowledge.",
          es: "Detrás de la web no hay un equipo de desarrollo: hay la propia colla, un equipo no técnico que también tiene que mantenerla al día. Conecté Notion como su gestor de contenido para que pudieran actualizar textos e información por su cuenta, sin depender de nadie con conocimientos de código.",
          ca: "Darrere del web no hi ha un equip de desenvolupament: hi ha la pròpia colla, un equip no tècnic que també ha de mantenir-lo al dia. Vaig connectar Notion com el seu gestor de contingut perquè poguessin actualitzar textos i informació pel seu compte, sense dependre de ningú amb coneixements de codi.",
        },
      ],
      learningsItems: [
        {
          en: "Design, code, CMS, forms and deployment — I did them all myself: with no one else to ask, I ended up truly understanding every layer, not just the one my title covered.",
          es: "Diseño, código, CMS, formularios y despliegue los hice todos yo: sin nadie más a quien preguntar, terminé entendiendo de verdad cada capa, no solo la que me tocaba por título.",
          ca: "Disseny, codi, CMS, formularis i desplegament els vaig fer tots jo: sense ningú més a qui preguntar, vaig acabar entenent de veritat cada capa, no només la que em tocava pel títol.",
        },
        {
          en: "Connecting Notion as a CMS was a simple, effective solution for a non-technical team. Sometimes the best tool is the one the client already knows.",
          es: "Conectar Notion como CMS fue una solución simple y efectiva para un equipo no técnico. A veces la mejor herramienta es la que ya conoce el cliente.",
          ca: "Connectar Notion com a CMS va ser una solució simple i efectiva per a un equip no tècnic. A vegades la millor eina és la que ja coneix el client.",
        },
        {
          en: "Real deployment — server, domain, GitHub pipeline — usually falls outside the design role. Handling it alone broadened my view of the whole process a lot.",
          es: "El despliegue real — servidor, dominio, pipeline de GitHub — queda habitualmente fuera del rol de diseño. Resolverlo solo amplió mucho mi visión del proceso completo.",
          ca: "El desplegament real — servidor, domini, pipeline de GitHub — queda habitualment fora del rol de disseny. Resoldre-ho sol va ampliar molt la meva visió del procés complet.",
        },
      ],
    },
  },
];
