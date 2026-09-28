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
  project2Cards?: ContentCard[];
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
  video?: string;
  screens?: ProjectScreen[];
  screensFrame?: "mobile" | "desktop";
  desktopWalkthrough?: DesktopWalkthroughStep[];
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
      en: "The elBulli Foundation is a client with two digital initiatives underway: the archive, a living monument to one of the most influential restaurants in history, and a new marketplace for its books. Two related projects, each with its own product challenge.",
      es: "La Fundació elBulli es un cliente con dos iniciativas digitales en marcha: el archivo, un monumento vivo a uno de los restaurantes más influyentes de la historia, y un nuevo marketplace para sus libros. Dos proyectos relacionados, cada uno con su propio reto de producto.",
      ca: "La Fundació elBulli és un client amb dues iniciatives digitals en marxa: l'arxiu, un monument viu a un dels restaurants més influents de la història, i un nou marketplace per als seus llibres. Dos projectes relacionats, cadascun amb el seu propi repte de producte.",
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
    subProjects: [
      {
        id: "archivo",
        tabLabel: { en: "elBulli Archive", es: "Archivo elBulli", ca: "Arxiu elBulli" },
        num: "01",
        category: { en: "Design System", es: "Sistema de Diseño", ca: "Sistema de Disseny" },
        year: "2026",
        problem: {
          en: "The elBulli Foundation archive is a living digital monument to one of the most influential restaurants in history, with hundreds of pages and content that keeps growing. The product challenge: give the editorial team the ability to publish new content without depending on a developer every time, without breaking the archive's visual consistency.",
          es: "El archivo de la Fundació elBulli es un monumento digital vivo a uno de los restaurantes más influyentes de la historia, con cientos de páginas y contenido que no deja de crecer. El reto de producto: dar al equipo editorial la capacidad de publicar contenido nuevo sin depender de un desarrollador cada vez, sin romper la consistencia visual del archivo.",
          ca: "L'arxiu de la Fundació elBulli és un monument digital viu a un dels restaurants més influents de la història, amb centenars de pàgines i contingut que no deixa de créixer. El repte de producte: donar a l'equip editorial la capacitat de publicar contingut nou sense dependre d'un desenvolupador cada vegada, sense trencar la consistència visual de l'arxiu.",
        },
        process: {
          en: "We started in Figma, but the process quickly moved to being done entirely in Claude. I designed and maintained the design system, and made the call to model it as reusable content blocks in Strapi — dish entries, timelines, galleries, quotes — each with its own visual rules inherited from the system. That lets the editorial team combine blocks and publish without needing me for every new page. I also designed and coded specific pages of the archive myself.",
          es: "Empezamos en Figma, pero el proceso pasó pronto a hacerse por completo en Claude. Diseñé y mantuve el sistema de diseño, y tomé la decisión de modelarlo como bloques de contenido reutilizables en Strapi — fichas de platos, cronologías, galerías, citas — cada uno con sus propias reglas visuales heredadas del sistema. Así el equipo editorial puede combinar bloques y publicar sin depender de mí para cada página nueva. Además diseñé y construí en código páginas concretas del archivo.",
          ca: "Vam començar a Figma, però el procés va passar aviat a fer-se del tot a Claude. Vaig dissenyar i mantenir el sistema de disseny, i vaig prendre la decisió de modelar-lo com a blocs de contingut reutilitzables a Strapi — fitxes de plats, cronologies, galeries, cites — cadascun amb les seves pròpies regles visuals heretades del sistema. Així l'equip editorial pot combinar blocs i publicar sense dependre de mi per a cada pàgina nova. A més, vaig dissenyar i construir en codi pàgines concretes de l'arxiu.",
        },
        result: {
          en: "A design and content system that doubles as a CMS: the archive grows with new pages without losing visual consistency, and the team edits and publishes on its own thanks to the Strapi structure.",
          es: "Un sistema de diseño y de contenido que funciona a la vez como CMS: el archivo crece con nuevas páginas sin perder consistencia visual, y el equipo edita y publica de forma autónoma gracias a la estructura en Strapi.",
          ca: "Un sistema de disseny i de contingut que funciona alhora com a CMS: l'arxiu creix amb noves pàgines sense perdre consistència visual, i l'equip edita i publica de forma autònoma gràcies a l'estructura a Strapi.",
        },
        tags: ["Figma", "Strapi", "Design System"],
        cover: "/covers/cover-elbulli.webp",
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
              en: "The elBulli Foundation archive never stops. Some pages arrived with the design already defined — my job was to turn them into responsive, production-ready code. Others I'm designing directly, as the project moves forward.",
              es: "El archivo de la Fundació elBulli no se detiene. Algunas páginas llegaron con diseño definido — y mi trabajo fue llevarlas a código, responsive y lista para producción. Otras las estoy diseñando directamente, a medida que el proyecto avanza.",
              ca: "L'arxiu de la Fundació elBulli no s'atura. Algunes pàgines van arribar amb el disseny ja definit — la meva feina va ser portar-les a codi, responsive i llestes per a producció. D'altres les estic dissenyant directament, a mesura que el projecte avança.",
            },
            {
              en: "The challenge isn't just designing or just implementing. It's doing both with coherence, inside a visual system that has to work in production and keep growing.",
              es: "El reto no es solo diseñar o solo implementar. Es hacer las dos cosas con coherencia, dentro de un sistema visual que tiene que funcionar en producción y seguir creciendo.",
              ca: "El repte no és només dissenyar o només implementar. És fer les dues coses amb coherència, dins d'un sistema visual que ha de funcionar en producció i seguir creixent.",
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
              en: "The archive is built from well-defined content types — dish entries, timelines, galleries, articles, quotes — each turned into a combinable block in Strapi.",
              es: "El archivo se construye con tipos de contenido bien definidos — fichas de platos, cronologías, galerías, artículos, citas — cada uno convertido en un bloque combinable en Strapi.",
              ca: "L'arxiu es construeix amb tipus de contingut ben definits — fitxes de plats, cronologies, galeries, articles, cites — cadascun convertit en un bloc combinable a Strapi.",
            },
            {
              en: "The editor picks the blocks, fills in the fields and publishes. They can't break the design even if they try: every block has its own visual rules, inherited from the design system.",
              es: "El editor elige los bloques, rellena los campos y publica. No puede romper el diseño aunque quiera: cada bloque tiene sus propias reglas visuales, heredadas del design system.",
              ca: "L'editor tria els blocs, omple els camps i publica. No pot trencar el disseny encara que vulgui: cada bloc té les seves pròpies regles visuals, heretades del sistema de disseny.",
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
              en: "The project let me work with Strapi as a headless CMS and go deeper into AI-assisted design tools. Learning to fit these pieces into a real workflow has been one of the most valuable parts of the collaboration.",
              es: "El proyecto me permitió trabajar con Strapi como CMS headless y profundizar en herramientas de diseño asistido por IA. Aprender a encajar estas piezas dentro de un flujo de trabajo real ha sido una de las partes más valiosas de la colaboración.",
              ca: "El projecte em va permetre treballar amb Strapi com a CMS headless i aprofundir en eines de disseny assistit per IA. Aprendre a encaixar aquestes peces dins d'un flux de treball real ha estat una de les parts més valuoses de la col·laboració.",
            },
            {
              en: "Collaborating on a project of this scale and cultural sensitivity gave me perspective on how systems design doesn't end at delivery — it evolves with use, and maintaining it matters as much as building it.",
              es: "Colaborar en un proyecto de esta escala y sensibilidad cultural me ha dado perspectiva sobre cómo el diseño de sistemas no acaba cuando se entrega — evoluciona con el uso, y mantenerlo es tan importante como construirlo.",
              ca: "Col·laborar en un projecte d'aquesta escala i sensibilitat cultural m'ha donat perspectiva sobre com el disseny de sistemes no s'acaba quan es lliura — evoluciona amb l'ús, i mantenir-lo és tan important com construir-lo.",
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
          en: "A physical book can't carry its complementary resources with it — Excel budget spreadsheets, images, videos — they stay separate from the content that generates them.",
          es: "Un libro en papel no puede llevar consigo sus recursos complementarios — tablas de presupuestos en Excel, imágenes, vídeos —, quedan siempre separados del contenido que los origina.",
          ca: "Un llibre en paper no pot portar amb ell els seus recursos complementaris — taules de pressupostos en Excel, imatges, vídeos —, sempre queden separats del contingut que els origina.",
        },
        process: {
          en: "We're building an ecommerce-style platform for the elBulli Foundation's books, continuing the design system in Claude Design and building the platform itself in Claude too. My work, still ongoing, is transcribing the PDFs of the already-digitized books into the new platform, chapter by chapter, bringing in their original resources alongside the text — budget spreadsheets, images, videos.",
          es: "Estamos construyendo una plataforma tipo ecommerce para los libros de la Fundació elBulli, con el sistema de diseño continuado en Claude Design y el desarrollo de la propia plataforma hecho también en Claude. Mi trabajo, todavía en marcha, es transcribir los PDF de los libros ya digitalizados a la nueva plataforma, capítulo a capítulo, incorporando junto al texto sus recursos originales — Excel de presupuestos, imágenes, vídeos.",
          ca: "Estem construint una plataforma tipus ecommerce per als llibres de la Fundació elBulli, amb el sistema de disseny continuat a Claude Design i el desenvolupament de la mateixa plataforma fet també a Claude. La meva feina, encara en marxa, és transcriure els PDF dels llibres ja digitalitzats a la nova plataforma, capítol a capítol, incorporant al costat del text els seus recursos originals — Excel de pressupostos, imatges, vídeos.",
        },
        result: {
          en: "The project is still in progress, but chapter by chapter it's already showing: each book now carries the resources that stayed out of the printed page, a richer read the physical format could never offer.",
          es: "El proyecto sigue en curso, pero capítulo a capítulo ya se nota: cada libro incorpora ahora los recursos que en papel quedaban fuera, una lectura ampliada que el formato impreso nunca pudo ofrecer.",
          ca: "El projecte segueix en curs, però capítol a capítol ja es nota: cada llibre incorpora ara els recursos que en paper quedaven fora, una lectura ampliada que el format imprès mai va poder oferir.",
        },
        tags: ["Claude Design", "Claude Code", "E-commerce"],
        meta: [
          { labelKey: "role", value: { en: "Design & development", es: "Diseño y desarrollo", ca: "Disseny i desenvolupament" } },
          { labelKey: "stack", value: "Claude Design · Claude Code" },
          { labelKey: "status", value: status.inProgress },
        ],
        screensFrame: "desktop",
        desktopWalkthrough: [
          {
            src: "/mockups/bullipedia/01-catalogo.jpg",
            htmlSrc: "/mockups/bullipedia-html/1-catalogo-libros.html",
            alt: {
              en: "Bullipedia book catalogue, showing the covers of purchased volumes",
              es: "Catálogo de libros de Bullipedia, con las portadas de los volúmenes comprados",
              ca: "Catàleg de llibres de Bullipedia, amb les portades dels volums comprats",
            },
            title: { en: "01 · The catalogue", es: "01 · El catálogo", ca: "01 · El catàleg" },
            caption: {
              en: "Books bought in print unlock here with a code, or you can buy them directly in digital.",
              es: "Los libros comprados en papel se desbloquean aquí con un código, o se compran directamente en digital.",
              ca: "Els llibres comprats en paper es desbloquegen aquí amb un codi, o es compren directament en digital.",
            },
          },
          {
            src: "/mockups/bullipedia/02-libro.jpg",
            htmlSrc: "/mockups/bullipedia-html/2-libro-plan-genhesis.html",
            alt: {
              en: "A book's page with its cover, a button to start reading, and the full chapter index",
              es: "Ficha de un libro con su portada, botón para empezar a leer, e índice completo de capítulos",
              ca: "Fitxa d'un llibre amb la seva portada, botó per començar a llegir, i índex complet de capítols",
            },
            title: { en: "02 · The book page", es: "02 · La ficha del libro", ca: "02 · La fitxa del llibre" },
            caption: {
              en: "Cover and full chapter index before you start reading.",
              es: "Portada e índice completo de capítulos antes de empezar a leer.",
              ca: "Portada i índex complet de capítols abans de començar a llegir.",
            },
          },
          {
            src: "/mockups/bullipedia/03-capitulo.jpg",
            htmlSrc: "/mockups/bullipedia-html/3-capitulo-introduccion-al-plan-genhesis.html",
            alt: {
              en: "View of a chapter with its sections, external links and downloadable resources",
              es: "Vista de un capítulo con sus apartados, enlaces externos y recursos descargables",
              ca: "Vista d'un capítol amb els seus apartats, enllaços externs i recursos descarregables",
            },
            title: { en: "03 · Inside a chapter", es: "03 · Dentro de un capítulo", ca: "03 · Dins d'un capítol" },
            caption: {
              en: "Each section brings together the text with its original links, PDFs and videos.",
              es: "Cada apartado reúne el texto junto a sus enlaces, PDFs y vídeos originales.",
              ca: "Cada apartat reuneix el text junt amb els seus enllaços, PDF i vídeos originals.",
            },
          },
          {
            src: "/mockups/bullipedia/04-articulo.jpg",
            htmlSrc: "/mockups/bullipedia-html/4-articulo-el-sapiens-de-la-rg.html",
            alt: {
              en: "An article page in reading mode, with continuous text and side progress navigation",
              es: "Página de un artículo en modo lectura, con texto corrido y navegación lateral de progreso",
              ca: "Pàgina d'un article en mode lectura, amb text corregut i navegació lateral de progrés",
            },
            title: { en: "04 · The article", es: "04 · El artículo", ca: "04 · L'article" },
            caption: {
              en: "Continuous reading, like on paper, with progress navigation on the side.",
              es: "Lectura corrida, como en papel, con navegación de progreso al margen.",
              ca: "Lectura contínua, com en paper, amb navegació de progrés al marge.",
            },
          },
        ],
      },
    ],
  },
    id: "xunta-galicia",
    num: "02",
    title: { en: "Galiciana Thesaurus", es: "Galiciana Thesaurus", ca: "Galiciana Thesaurus" },
    category: { en: "Custom Product", es: "Producto a medida", ca: "Producte a mida" },
    year: "2026",
    problem: {
      en: "A specific client within the Xunta de Galicia needed a highly custom tool for a specific task in their day-to-day work. The challenge wasn't starting from an already-defined design, but truly understanding how that client works day to day in order to design something genuinely intuitive, functional and personalized.",
      es: "Un cliente concreto dentro de la Xunta de Galicia necesitaba una herramienta muy a medida para una tarea específica de su día a día. El reto no era partir de un diseño ya definido, sino entender a fondo cómo trabaja ese cliente en su día a día para poder diseñar algo realmente intuitivo, funcional y personalizado.",
      ca: "Un client concret dins la Xunta de Galicia necessitava una eina molt a mida per a una tasca específica del seu dia a dia. El repte no era partir d'un disseny ja definit, sinó entendre a fons com treballa aquest client en el seu dia a dia per poder dissenyar alguna cosa realment intuïtiva, funcional i personalitzada.",
    },
    process: {
      en: "We started from a reference prototype GNOSS sent us, but the approach was a bit ambiguous and didn't make the process or the final product very clear — it helped us see a few specific features, but not much more. From there, the work focused on understanding the client's real task and designing the product from scratch, with a couple of check-in meetings with GNOSS along the way to validate progress.",
      es: "Partimos de un prototipo de referencia que nos envió GNOSS, pero el planteamiento era un poco ambiguo y no dejaba muy claro ni el proceso ni el producto final — nos sirvió para ver algunas funcionalidades concretas, pero poco más. A partir de ahí, el trabajo se centró en entender la tarea real del cliente y diseñar el producto desde cero, con un par de reuniones de seguimiento con GNOSS a lo largo del proceso para ir validando el avance.",
      ca: "Vam partir d'un prototip de referència que ens va enviar GNOSS, però el plantejament era una mica ambigu i no deixava gaire clar ni el procés ni el producte final — ens va servir per veure algunes funcionalitats concretes, però poc més. A partir d'aquí, la feina es va centrar a entendre la tasca real del client i dissenyar el producte des de zero, amb un parell de reunions de seguiment amb GNOSS al llarg del procés per anar validant l'avanç.",
    },
    result: {
      en: "The client gave it the green light: the product meets what they needed and does its job. The people using it day to day find it intuitive and easy to use.",
      es: "El cliente dio el visto bueno: el producto cumple con lo que necesitaba y hace su función. Las personas que lo usan en su día a día lo encuentran intuitivo y sencillo de manejar.",
      ca: "El client va donar el vistiplau: el producte compleix el que necessitava i fa la seva funció. Les persones que l'utilitzen en el seu dia a dia el troben intuïtiu i senzill de fer servir.",
    },
    description: {
      en: "Custom product for a Xunta de Galicia client, through GNOSS — design centered on understanding their real day-to-day task, still in progress.",
      es: "Producto a medida para un cliente de la Xunta de Galicia, a través de GNOSS — diseño centrado en entender su tarea real del día a día, todavía en curso.",
      ca: "Producte a mida per a un client de la Xunta de Galicia, a través de GNOSS — disseny centrat a entendre la seva tasca real del dia a dia, encara en curs.",
    },
    tags: ["UX Research", "Product Design", "Figma"],
    gradient: "linear-gradient(135deg, #001515 0%, #0d3d3d 60%, #2a8c8c 100%)",
    accentColor: "#2a8c8c",
    cover: "/covers/cover-xunta.svg",
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
          en: "Working through an intermediary studio (GNOSS) instead of talking directly to the end client taught me to ask the right questions to pull real requirements out of an ambiguous brief, instead of taking the first reference at face value.",
          es: "Trabajar a través de un estudio intermediario (GNOSS) en vez de hablar directamente con el cliente final me enseñó a hacer las preguntas correctas para sacar información real de un brief ambiguo, en vez de dar por buena la primera referencia que llega.",
          ca: "Treballar a través d'un estudi intermediari (GNOSS) en comptes de parlar directament amb el client final em va ensenyar a fer les preguntes correctes per treure informació real d'un brief ambigu, en comptes de donar per bona la primera referència que arriba.",
        },
        {
          en: "Seeing that the people using the product find it intuitive — without ever talking to them directly — confirmed that designing from the real task, not a generic prototype, is what actually makes the difference.",
          es: "Ver que las personas que usan el producto lo encuentran intuitivo, sin haber hablado con ellas directamente, confirma que diseñar desde la tarea real — y no desde un prototipo genérico — es lo que de verdad marca la diferencia.",
          ca: "Veure que les persones que fan servir el producte el troben intuïtiu, sense haver-hi parlat directament, confirma que dissenyar des de la tasca real — i no des d'un prototip genèric — és el que realment marca la diferència.",
        },
      ],
    },
  },
    id: "madrid",
    num: "03",
    title: { en: "Enoturismo Madrid", es: "Enoturismo Madrid", ca: "Enoturisme Madrid" },
    category: { en: "Web Design", es: "Diseño Web", ca: "Disseny Web" },
    year: "2026",
    problem: {
      en: "The wine tourism site for the Community of Madrid already existed, but it carried disjointed page designs and navigation that didn't help visitors find wineries, routes or experiences. The brief was a full redesign: unify the design across pages, modernise it visually — and above all, make it functional for the visitor.",
      es: "El site de enoturismo de la Comunidad de Madrid ya existía, pero arrastraba páginas con diseños dispares y una navegación que no ayudaba a encontrar bodegas, rutas o experiencias. El encargo era un rediseño completo: unificar el diseño entre páginas, modernizarlo visualmente — y sobre todo, hacerlo funcional para el visitante.",
      ca: "El site d'enoturisme de la Comunitat de Madrid ja existia, però arrossegava pàgines amb dissenys dispars i una navegació que no ajudava a trobar cellers, rutes o experiències. L'encàrrec era un redisseny complet: unificar el disseny entre pàgines, modernitzar-lo visualment — i sobretot, fer-lo funcional per al visitant.",
    },
    process: {
      en: "The starting point was an AI-generated HTML base — good enough as a single landing page, but not built to grow. I moved it into Next.js and, from there, designed and built the rest of the site's pages myself with Claude Code: wineries, routes and experiences, making every design and UX decision directly in code — route maps, smooth navigation, an experience built to be explored, not just shown. Content lives in Strapi, a content manager (CMS) that keeps information separate from code: each winery, route or experience is an entry the team can create, edit or publish on their own, without touching a line of code, and the site displays it automatically with the same design.",
      es: "El punto de partida fue una base generada con IA — suficiente como página única, pero no pensada para crecer. La pasé a Next.js y, a partir de ahí, diseñé y construí yo solo el resto de páginas del site con Claude Code: bodegas, rutas y experiencias, tomando cada decisión de diseño y experiencia de usuario directamente en código — mapas de las rutas, navegación fluida, una experiencia pensada para explorarse, no solo para mostrarse. El contenido vive en Strapi, un gestor de contenido (CMS) que separa la información del código: cada bodega, ruta o experiencia es una ficha que el equipo puede crear, editar o publicar por su cuenta, sin tocar código, y que la web muestra automáticamente con el mismo diseño.",
      ca: "El punt de partida va ser una base generada amb IA — suficient com a pàgina única, però no pensada per créixer. La vaig passar a Next.js i, a partir d'aquí, vaig dissenyar i construir jo sol la resta de pàgines del site amb Claude Code: cellers, rutes i experiències, prenent cada decisió de disseny i experiència d'usuari directament en codi — mapes de les rutes, navegació fluida, una experiència pensada per explorar-se, no només per mostrar-se. El contingut viu a Strapi, un gestor de contingut (CMS) que separa la informació del codi: cada celler, ruta o experiència és una fitxa que l'equip pot crear, editar o publicar pel seu compte, sense tocar codi, i que el web mostra automàticament amb el mateix disseny.",
    },
    result: {
      en: "A premium web experience, designed and built end to end, that positions Madrid's wine routes as a top-tier cultural destination — with a structure built to turn visits into bookings.",
      es: "Una experiencia web premium, diseñada y construida de principio a fin, que posiciona las rutas del vino de Madrid como destino cultural de primer nivel — con una estructura pensada para convertir visitas en reservas.",
      ca: "Una experiència web premium, dissenyada i construïda de principi a fi, que posiciona les rutes del vi de Madrid com a destinació cultural de primer nivell — amb una estructura pensada per convertir visites en reserves.",
    },
    description: {
      en: "Full project, solo — migrated an AI-generated HTML base to Next.js and designed and built every page of Madrid's wine tourism site with Claude Code.",
      es: "Proyecto entero, en solitario — migré una base HTML generada por IA a Next.js y diseñé y construí cada página del site de enoturismo de Madrid con Claude Code.",
      ca: "Projecte sencer, en solitari — vaig migrar una base HTML generada per IA a Next.js i vaig dissenyar i construir cada pàgina del site d'enoturisme de Madrid amb Claude Code.",
    },
    tags: ["Next.js", "Claude Code", "Strapi", "Web Design"],
    gradient: "linear-gradient(135deg, #1a0a0f 0%, #4a1528 60%, #8c3a5a 100%)",
    accentColor: "#8c3a5a",
    cover: "/covers/cover-madrid.webp",
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
    id: "castellera",
    num: "04",
    title: { en: "Colla Castellera del Baix Montseny", es: "Colla Castellera del Baix Montseny", ca: "Colla Castellera del Baix Montseny" },
    category: { en: "Web Design & Dev", es: "Diseño y desarrollo web", ca: "Disseny i desenvolupament web" },
    year: "2026",
    problem: {
      en: "A castellers association needed more than a nice-looking website: they needed to update content themselves without touching code, and contact forms that actually reached their corporate emails. A product and operations problem, not just a design one.",
      es: "Una colla castellera necesitaba mucho más que una web bonita: necesitaban poder actualizar el contenido ellos mismos sin tocar código, y formularios de contacto que llegaran de verdad a sus correos corporativos. Un problema de producto y de operativa, no solo de diseño.",
      ca: "Una colla castellera necessitava molt més que una web bonica: necessitaven poder actualitzar el contingut ells mateixos sense tocar codi, i formularis de contacte que arribessin de veritat als seus correus corporatius. Un problema de producte i d'operativa, no només de disseny.",
    },
    process: {
      en: "Designed and developed the website with Claude Code, set up a Notion CMS for content management, wired contact forms to corporate emails, and deployed the site from GitHub to the contracted server and domain.",
      es: "Diseñé y desarrollé la web con Claude Code, configuré un CMS con Notion para gestionar el contenido, conecté los formularios a los correos corporativos y desplegué el site desde GitHub al servidor y dominio contratados.",
      ca: "Vaig dissenyar i desenvolupar la web amb Claude Code, vaig configurar un CMS amb Notion per gestionar el contingut, vaig connectar els formularis als correus corporatius i vaig desplegar el site des de GitHub al servidor i domini contractats.",
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
    gradient: "linear-gradient(135deg, #1a0808 0%, #3d1010 60%, #7a2020 100%)",
    accentColor: "#b84040",
    video: "/covers/tritoners.mp4",
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
          label: { en: "CMS with Notion", es: "CMS con Notion", ca: "CMS amb Notion" },
          desc: {
            en: "I connected Notion as a content management system so the team could update text and information without touching code.",
            es: "Conecté Notion como sistema de gestión de contenido para que el equipo pudiera actualizar textos e información sin tocar código.",
            ca: "Vaig connectar Notion com a sistema de gestió de contingut perquè l'equip pogués actualitzar textos i informació sense tocar codi.",
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
      learningsItems: [
        {
          en: "Carrying a project from start to finish on my own — design, development, configuration and deployment — forced me to understand every layer of the process, not just the design one.",
          es: "Llevar un proyecto de principio a fin de forma autónoma — diseño, desarrollo, configuración y despliegue — me obligó a entender todas las capas del proceso, no solo la de diseño.",
          ca: "Portar un projecte de principi a fi de forma autònoma — disseny, desenvolupament, configuració i desplegament — em va obligar a entendre totes les capes del procés, no només la de disseny.",
        },
        {
          en: "Connecting Notion as a CMS was a simple, effective solution for a non-technical team. Sometimes the best tool is the one the client already knows.",
          es: "Conectar Notion como CMS fue una solución simple y efectiva para un equipo no técnico. A veces la mejor herramienta es la que ya conoce el cliente.",
          ca: "Connectar Notion com a CMS va ser una solució simple i efectiva per a un equip no tècnic. A vegades la millor eina és la que ja coneix el client.",
        },
        {
          en: "Real deployment — server, domain, GitHub pipeline — is a part of the work that usually falls outside the design role. Handling it on my own broadened my view of the whole process a lot.",
          es: "El despliegue real — servidor, dominio, pipeline de GitHub — es una parte del trabajo que habitualmente queda fuera del rol de diseño. Resolverlo de forma autónoma amplió mucho mi visión del proceso completo.",
          ca: "El desplegament real — servidor, domini, pipeline de GitHub — és una part de la feina que habitualment queda fora del rol de disseny. Resoldre-ho de forma autònoma va ampliar molt la meva visió del procés complet.",
        },
      ],
    },
  },
    id: "turisme-jaen",
    num: "05",
    title: { en: "Turisme Jaén", es: "Turisme Jaén", ca: "Turisme Jaén" },
    category: { en: "Web Design", es: "Diseño Web", ca: "Disseny Web" },
    year: "2026",
    problem: {
      en: "Jaén's tourism portal — one of Spain's most heritage-rich destinations — needed a full redesign that could handle hundreds of pages, crossing categories and massive content without losing clarity.",
      es: "El portal de turismo de Jaén — uno de los destinos con más patrimonio de España — necesitaba un rediseño completo capaz de gestionar cientos de páginas, categorías cruzadas y contenido denso sin perder claridad.",
      ca: "El portal de turisme de Jaén — una de les destinacions amb més patrimoni d'Espanya — necessitava un redisseny complet capaç de gestionar centenars de pàgines, categories creuades i contingut dens sense perdre claredat.",
    },
    process: {
      en: "Designed in Figma, we tried several full-page proposals, thinking first about how content would be navigated and organised, not just how it would look. Once that direction was set, we built the component system to support it. Code implementation is handled by an internal colleague from the same studio.",
      es: "Diseñado en Figma, probamos varias propuestas de página completa hasta encontrar la dirección correcta, pensando primero en cómo se iba a navegar y organizar el contenido, no solo en el estilo visual. Con la dirección definida, construimos el sistema de componentes que soporta esa arquitectura. La implementación en código la lleva un compañero interno del mismo estudio.",
      ca: "Dissenyat a Figma, vam provar diverses propostes de pàgina completa fins a trobar la direcció correcta, pensant primer en com es navegaria i s'organitzaria el contingut, no només en l'estil visual. Amb la direcció definida, vam construir el sistema de components que suporta aquesta arquitectura. La implementació en codi la porta un company intern del mateix estudi.",
    },
    result: {
      en: "The system organises the portal into clearly differentiated page types without fragmenting the experience — each type is instantly recognisable, yet they all share the same visual base. Designing it alongside another designer meant agreeing on every decision along the way, something far more valuable for teams where design isn't a one-person job.",
      es: "El sistema organiza el portal en tipos de página claramente diferenciados sin fragmentar la experiencia — cada tipo se reconoce al instante, pero todos comparten la misma base visual. Diseñarlo junto a otra diseñadora nos obligó a ponernos de acuerdo en cada decisión, algo que aporta mucho más valor en equipos donde el diseño no depende de una sola persona.",
      ca: "El sistema organitza el portal en tipus de pàgina clarament diferenciats sense fragmentar l'experiència — cada tipus es reconeix a l'instant, però tots comparteixen la mateixa base visual. Dissenyar-lo al costat d'una altra dissenyadora ens va obligar a posar-nos d'acord en cada decisió, cosa que aporta molt més valor en equips on el disseny no depèn d'una sola persona.",
    },
    description: {
      en: "Tourism web design for Jaén — full UI system designed in Figma as a duo, currently in production with the internal dev team.",
      es: "Diseño web de turismo para Jaén — sistema UI completo diseñado en Figma a dos, actualmente en producción con el equipo de desarrollo interno.",
      ca: "Disseny web de turisme per a Jaén — sistema UI complet dissenyat a Figma a dos, actualment en producció amb l'equip de desenvolupament intern.",
    },
    tags: ["Figma", "Framer", "Web Design", "Tourism"],
    gradient: "linear-gradient(135deg, #2d1b00 0%, #6b3a1f 60%, #c4813a 100%)",
    accentColor: "#c4813a",
    cover: "/covers/cover-jaen.webp",
    heroTagline: {
      en: "redesign of the province's tourism portal",
      es: "rediseño del portal de turismo de la provincia",
      ca: "redisseny del portal de turisme de la província",
    },
    meta: [
      { labelKey: "client", value: "Turismo de Jaén" },
      { labelKey: "year", value: "2026" },
      { labelKey: "duration", value: { en: "2 – 3 months", es: "2 – 3 meses", ca: "2 – 3 mesos" } },
      { labelKey: "role", value: { en: "Web design · UX · Figma", es: "Diseño web · UX · Figma", ca: "Disseny web · UX · Figma" } },
      { labelKey: "stack", value: "Figma" },
      { labelKey: "team", value: { en: "Design + in-house development", es: "Diseño + Desarrollo interno", ca: "Disseny + desenvolupament intern" } },
    ],
    screensFrame: "desktop",
    desktopWalkthrough: [
      {
        src: "/mockups/jaen/01-portada.jpg",
        alt: { es: "Portada del portal con foto de paisaje de olivos, buscador con IA y tarjetas de lugares imprescindibles.", en: "Homepage of the portal with an olive-grove landscape photo, an AI-powered search bar and must-see place cards.", ca: "Portada del portal amb foto de paisatge d'oliveres, cercador amb IA i targetes de llocs imprescindibles." },
        title: { es: "01 · La portada", en: "01 · The homepage", ca: "01 · La portada" },
        caption: { es: "La portada tenía que orientar y seducir a la vez: un buscador con IA arriba, imprescindibles y rutas destacadas debajo, sin forzar al visitante a decidir antes de tiempo.", en: "The homepage had to orient and seduce at once — an AI-powered search bar up top, must-sees and featured routes below — without forcing the visitor to decide too soon.", ca: "La portada havia d'orientar i seduir alhora: un cercador amb IA a dalt, imprescindibles i rutes destacades a sota, sense forçar el visitant a decidir abans d'hora." },
      },
      {
        src: "/mockups/jaen/02-navegacion.jpg",
        alt: { es: "Menú de navegación con el desplegable \"Inspírate\" abierto, mostrando dos columnas de enlaces y una tarjeta destacada.", en: "Navigation menu with the \"Get inspired\" dropdown open, showing two columns of links and a featured card.", ca: "Menú de navegació amb el desplegable \"Inspira't\" obert, mostrant dues columnes d'enllaços i una targeta destacada." },
        title: { es: "02 · La navegación", en: "02 · The navigation", ca: "02 · La navegació" },
        caption: { es: "El menú \"Inspírate\" agrupa contenido de naturaleza muy distinta — imprescindibles, rutas, planes, agenda — bajo una sola pestaña, sin que se note la costura entre categorías.", en: "The \"Get inspired\" menu groups very different kinds of content — must-sees, routes, plans, events — under a single tab, without the seams between categories showing.", ca: "El menú \"Inspira't\" agrupa contingut de naturalesa molt diferent — imprescindibles, rutes, plans, agenda — sota una sola pestanya, sense que se'n notin les costures entre categories." },
      },
      {
        src: "/mockups/jaen/03-listado.jpg",
        alt: { es: "Página de listado \"Lugares de interés\" con filtros por facetas a la izquierda y una cuadrícula de resultados con foto.", en: "\"Places of interest\" listing page with faceted filters on the left and a photo results grid.", ca: "Pàgina de llistat \"Llocs d'interès\" amb filtres per facetes a l'esquerra i una graella de resultats amb foto." },
        title: { es: "03 · El listado", en: "03 · The listing", ca: "03 · El llistat" },
        caption: { es: "Tipo de lugar, localidad, otras facetas: los filtros se combinan entre sí, para no obligar al visitante a mirar entre cientos de fichas una por una.", en: "Place type, town, other facets: filters combine with each other, so the visitor never has to scroll through hundreds of entries one by one.", ca: "Tipus de lloc, localitat, altres facetes: els filtres es combinen entre ells, perquè el visitant no hagi de mirar centenars de fitxes una per una." },
      },
      {
        src: "/mockups/jaen/04-planificador.jpg",
        alt: { es: "Planificador de itinerario con una lista de experiencias a la izquierda y los días del viaje a la derecha, con una tarjeta a medio arrastrar.", en: "Itinerary planner with a list of experiences on the left and trip days on the right, with a card mid-drag.", ca: "Planificador d'itinerari amb una llista d'experiències a l'esquerra i els dies del viatge a la dreta, amb una targeta a mig arrossegar." },
        title: { es: "04 · El planificador", en: "04 · The planner", ca: "04 · El planificador" },
        caption: { es: "Arrastra una experiencia desde el listado y cae en el día que elijas. El itinerario se va construyendo visita a visita, sin formularios de por medio.", en: "Drag an experience from the list and drop it on the day you choose. The itinerary builds up visit by visit, with no forms in the way.", ca: "Arrossega una experiència des del llistat i deixa-la caure al dia que triïs. L'itinerari es va construint visita a visita, sense formularis pel mig." },
      },
      {
        src: "/mockups/jaen/05-ruta.jpg",
        alt: { es: "Página de la ruta \"Vía Verde del Aceite\" con mapa del recorrido, ficha técnica y galería de fotos.", en: "\"Vía Verde del Aceite\" route page with a route map, technical sheet and photo gallery.", ca: "Pàgina de la ruta \"Via Verda de l'Oli\" amb mapa del recorregut, fitxa tècnica i galeria de fotos." },
        title: { es: "05 · La ruta", en: "05 · The route", ca: "05 · La ruta" },
        caption: { es: "Cada ruta lleva su propio mapa, perfil de altura y ficha técnica — y termina listando los municipios por los que pasa, con el mismo componente de tarjeta que usa el resto del portal.", en: "Every route carries its own map, elevation profile and technical sheet — and closes by listing the towns it passes through, using the same card component the rest of the portal relies on.", ca: "Cada ruta porta el seu propi mapa, perfil d'altura i fitxa tècnica — i acaba llistant els municipis pels quals passa, amb el mateix component de targeta que fa servir la resta del portal." },
      },
      {
        src: "/mockups/jaen/06-ficha.jpg",
        alt: { es: "Ficha del alojamiento \"VUT La Casita Morada\" con galería de fotos y panel lateral de información de contacto y servicios.", en: "\"VUT La Casita Morada\" lodging profile with a photo gallery and a side panel of contact info and services.", ca: "Fitxa de l'allotjament \"VUT La Casita Morada\" amb galeria de fotos i panell lateral d'informació de contacte i serveis." },
        title: { es: "06 · La ficha", en: "06 · The listing page", ca: "06 · La fitxa" },
        caption: { es: "La ficha de un alojamiento no es solo fotos y precio: incluye sellos de calidad, servicios accesibles y qué hay cerca, todo en el mismo panel lateral.", en: "A lodging's profile isn't just photos and price: it includes quality seals, accessibility info and what's nearby, all in the same side panel.", ca: "La fitxa d'un allotjament no és només fotos i preu: inclou segells de qualitat, serveis accessibles i què hi ha a prop, tot al mateix panell lateral." },
      },
      {
        src: "/mockups/jaen/07-microsite.jpg",
        alt: { es: "Microsite temático \"Castillos y Batallas del Reino de Jaén\" con su propio logo, navegación y hero de imagen.", en: "\"Castles and Battles of the Kingdom of Jaén\" themed microsite with its own logo, navigation and image hero.", ca: "Microsite temàtic \"Castells i Batalles del Regne de Jaén\" amb el seu propi logo, navegació i hero d'imatge." },
        title: { es: "07 · El microsite", en: "07 · The microsite", ca: "07 · El microsite" },
        caption: { es: "Algunas campañas — como \"Castillos y Batallas\"— necesitan su propio espacio: logo, navegación y portada propios, pero construidos con las mismas piezas del sistema.", en: "Some campaigns — like \"Castles and Battles\" — need their own space: their own logo, navigation and homepage, but built from the same system pieces.", ca: "Algunes campanyes — com \"Castells i Batalles\" — necessiten el seu propi espai: logo, navegació i portada propis, però construïts amb les mateixes peces del sistema." },
      },
    ],
    page: {
      challengeHeading: { en: "Two challenges in one", es: "Dos retos en uno", ca: "Dos reptes en un" },
      challengeCards: [
        {
          badge: { en: "The designer's challenge", es: "Reto del diseñador", ca: "El repte del dissenyador" },
          heading: { en: "Appealing, functional and full of personality", es: "Atractivo, funcional y con personalidad", ca: "Atractiu, funcional i amb personalitat" },
          body: {
            en: "Make the portal feel light despite the volume. Visually tell page types apart — a mountain route doesn't read the same as a town profile — without fragmenting the system. And give it personality without falling into the most overused patterns of tourism design.",
            es: "Hacer que el portal pareciera ligero a pesar del volumen. Distinguir visualmente los tipos de página — una ruta de montaña no se lee igual que la ficha de un municipio — sin que el sistema se fragmentara. Y darle personalidad sin caer en los patrones más usados del diseño turístico.",
            ca: "Fer que el portal semblés lleuger malgrat el volum. Distingir visualment els tipus de pàgina — una ruta de muntanya no es llegeix igual que la fitxa d'un municipi — sense que el sistema es fragmentés. I donar-li personalitat sense caure en els patrons més usats del disseny turístic.",
          },
        },
      ],
      structureHeading: { en: "One system, four voices", es: "Un sistema, cuatro voces", ca: "Un sistema, quatre veus" },
      structureBody: [
        {
          en: "The first job was mapping the page types that existed and understanding what information was essential in each one. A homepage needs to orient; a listing needs to filter; a route needs to guide; a profile needs to inform.",
          es: "El primer trabajo fue mapear los tipos de página que existían y entender qué información era esencial en cada uno. Una portada necesita orientar; un listado necesita filtrar; una ruta necesita guiar; una ficha necesita informar.",
          ca: "La primera feina va ser mapejar els tipus de pàgina que existien i entendre quina informació era essencial en cadascun. Una portada necessita orientar; un llistat necessita filtrar; una ruta necessita guiar; una fitxa necessita informar.",
        },
      ],
      structureBodyBold: {
        prefix: {
          en: "Every type has its own visual logic, but they all share the same structural base. ",
          es: "Cada tipo tiene su propia lógica visual, pero todos comparten la misma base estructural. ",
          ca: "Cada tipus té la seva pròpia lògica visual, però tots comparteixen la mateixa base estructural. ",
        },
        bold: {
          en: "The system unifies without flattening.",
          es: "El sistema unifica sin igualar.",
          ca: "El sistema unifica sense igualar.",
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
          en: "Having the component system already built is what made revisions manageable. Without it, every change would have meant redoing entire pages. And there are always revisions.",
          es: "Tener el sistema de componentes construido fue lo que hizo que las revisiones fueran absorbibles. Sin él, cada cambio habría supuesto rehacer páginas enteras. Y siempre hay revisiones.",
          ca: "Tenir el sistema de components construït va ser el que va fer que les revisions fossin absorbibles. Sense ell, cada canvi hauria suposat refer pàgines senceres. I sempre hi ha revisions.",
        },
        {
          en: "Working with a large volume of different pages forced me to think about design more systematically. It's not just about each page looking good on its own, but about all of them together forming a coherent site. That changes how you make every decision.",
          es: "Trabajar con un volumen grande de páginas distintas me obligó a pensar el diseño de forma más sistemática. No se trata solo de que cada página quede bien por separado, sino de que todas juntas formen un sitio coherente. Eso cambia cómo tomas cada decisión.",
          ca: "Treballar amb un volum gran de pàgines diferents em va obligar a pensar el disseny de manera més sistemàtica. No es tracta només que cada pàgina quedi bé per separat, sinó que totes juntes formin un lloc coherent. Això canvia com prens cada decisió.",
        },
      ],
    },
  },
    id: "mirazur",
    num: "06",
    title: { en: "Mirazur", es: "Mirazur", ca: "Mirazur" },
    category: { en: "Web Design", es: "Diseño Web", ca: "Disseny Web" },
    year: "2025–2026",
    problem: {
      en: "How do you bring a three-Michelin-star restaurant into the digital world — not as a brochure, but as an experience?",
      es: "¿Cómo llevas un restaurante de tres estrellas Michelin al mundo digital — no como folleto, sino como experiencia?",
      ca: "Com portes un restaurant de tres estrelles Michelin al món digital — no com a fulletó, sinó com a experiència?",
    },
    process: {
      en: "Designed the main pages of a recipe portal in Figma — listing, individual recipe, access flow and restaurant profile. For the experience page, I used Claude Design as a build partner: I took it from Figma to a working page myself, without needing a developer for that deliverable.",
      es: "Diseñé las páginas principales de un portal de recetas en Figma — listado, ficha, flujo de acceso y perfil del restaurante. Para la página de experiencia usé Claude Design como compañero de construcción: pasé del diseño en Figma a una página funcionando yo mismo, sin necesitar a un desarrollador para ese entregable.",
      ca: "Vaig dissenyar les pàgines principals d'un portal de receptes a Figma — llistat, fitxa, flux d'accés i perfil del restaurant. Per a la pàgina d'experiència vaig fer servir Claude Design com a company de construcció: vaig passar del disseny a Figma a una pàgina funcionant jo mateix, sense necessitar un desenvolupador per a aquest lliurable.",
    },
    result: {
      en: "Two complementary design proposals — one transactional, one narrative — showing how a restaurant like Mirazur can extend its experience beyond the table, and how AI let me take one of them all the way to a working page on my own.",
      es: "Dos propuestas de diseño complementarias — una transaccional, una narrativa — que muestran cómo un restaurante como Mirazur puede extender su experiencia más allá de la mesa, y cómo la IA me permitió llevar una de ellas hasta una página funcionando yo solo.",
      ca: "Dues propostes de disseny complementàries — una transaccional, una narrativa — que mostren com un restaurant com el Mirazur pot estendre la seva experiència més enllà de la taula, i com la IA em va permetre portar-ne una fins a una pàgina funcionant jo sol.",
    },
    description: {
      en: "Two real projects with Mirazur — both picked up mid-process and completed: a recipe portal finished in Figma, and an experience page built with Claude Design.",
      es: "Dos proyectos reales con Mirazur — los dos retomados a medias y terminados: un portal de recetas acabado en Figma, y una página de experiencia construida con Claude Design.",
      ca: "Dos projectes reals amb el Mirazur — tots dos repesos a mitges i acabats: un portal de receptes acabat a Figma, i una pàgina d'experiència construïda amb Claude Design.",
    },
    tags: ["Figma", "Claude Design", "Web Design"],
    gradient: "linear-gradient(135deg, #1a2a0d 0%, #3d5c1e 60%, #7aad3a 100%)",
    accentColor: "#7aad3a",
    video: "/covers/mirazur.mp4",
    cover: "/covers/cover-mirazur.webp",
    heroTagline: {
      en: "recipe portal and experience page",
      es: "portal de recetas y página de experiencia",
      ca: "portal de receptes i pàgina d'experiència",
    },
    meta: [
      { labelKey: "client", value: "Mirazur" },
      { label: { en: "Project 01", es: "Proyecto 01", ca: "Projecte 01" }, value: { en: "2025 · Recipe portal", es: "2025 · Portal de recetas", ca: "2025 · Portal de receptes" } },
      { label: { en: "Project 02", es: "Proyecto 02", ca: "Projecte 02" }, value: { en: "2026 · Experience page", es: "2026 · Página de experiencia", ca: "2026 · Pàgina d'experiència" } },
      { labelKey: "status", value: { en: "Design completed", es: "Diseño completado", ca: "Disseny completat" } },
      { labelKey: "role", value: { en: "Web design · UX", es: "Diseño web · UX", ca: "Disseny web · UX" } },
      { labelKey: "stack", value: "Figma · Claude Design" },
    ],
    page: {
      project1Label: { en: "Project 01", es: "Proyecto 01", ca: "Projecte 01" },
      project1SectionLabel: { en: "Recipe portal", es: "Portal de recetas", ca: "Portal de receptes" },
      project1Heading: { en: "Fine dining, made accessible", es: "Alta cocina accesible", ca: "Alta cuina accessible" },
      project1Body: [
        {
          en: "The project arrived half-finished. The idea was clear — a portal where users pay to access the restaurant's recipes, a model that takes fine dining beyond the table — but the design was incomplete.",
          es: "El proyecto llegó a medias. La idea era clara — un portal donde los usuarios pagan para acceder a las recetas del restaurante, un modelo que lleva la alta cocina más allá de la mesa — pero el diseño estaba incompleto.",
          ca: "El projecte va arribar a mig fer. La idea era clara — un portal on els usuaris paguen per accedir a les receptes del restaurant, un model que porta l'alta cuina més enllà de la taula — però el disseny estava incomplet.",
        },
        {
          en: "I picked it back up and finished it in Figma: the recipe listing, the individual recipe page, the access flow and the restaurant profile.",
          es: "Lo retomé y lo terminé en Figma: el listado de recetas, la ficha individual, el flujo de acceso y el perfil del restaurante.",
          ca: "El vaig reprendre i el vaig acabar a Figma: el llistat de receptes, la fitxa individual, el flux d'accés i el perfil del restaurant.",
        },
      ],
      project2Label: { en: "Project 02", es: "Proyecto 02", ca: "Projecte 02" },
      project2SectionLabel: { en: "Experience page", es: "Página de experiencia", ca: "Pàgina d'experiència" },
      project2Heading: { en: "Designing an experience before you live it", es: "Diseñar una experiencia antes de vivirla", ca: "Dissenyar una experiència abans de viure-la" },
      project2Body: [
        {
          en: "This one also arrived half-finished. I chose to complete it with Claude Design for a specific reason: the design system was already built, and using it as a base gave me speed without sacrificing visual coherence.",
          es: "Este también llegó a medias. Elegí terminarlo con Claude Design por una razón concreta: el sistema de diseño ya estaba construido, y usarlo como base me daba velocidad sin sacrificar coherencia visual.",
          ca: "Aquest també va arribar a mig fer. Vaig triar acabar-lo amb Claude Design per una raó concreta: el sistema de disseny ja estava construït, i fer-lo servir com a base em donava velocitat sense sacrificar coherència visual.",
        },
        {
          en: "The result is a narrative page — not a menu, not a corporate website — that explains what it means to eat at Mirazur before you've been: the setting, the dishes, the philosophy, the sequence of the menu.",
          es: "El resultado es una página narrativa — no una carta ni una web corporativa — que explica qué significa comer en el Mirazur antes de haber ido: el entorno, los platos, la filosofía, la secuencia del menú.",
          ca: "El resultat és una pàgina narrativa — ni una carta ni una web corporativa — que explica què significa menjar al Mirazur abans d'haver-hi anat: l'entorn, els plats, la filosofia, la seqüència del menú.",
        },
      ],
      project2Cards: [
        {
          label: { en: "The setting", es: "El entorno", ca: "L'entorn" },
          desc: { en: "The garden and its location in Menton, on the edge of the Mediterranean.", es: "El jardín y la ubicación en Menton, al borde del Mediterráneo.", ca: "El jardí i la ubicació a Menton, a la vora del Mediterrani." },
        },
        {
          label: { en: "The dishes", es: "Los platos", ca: "Els plats" },
          desc: { en: "Seasonal ingredients, Mauro Colagreco's philosophy.", es: "Los ingredientes de temporada, la filosofía de Mauro Colagreco.", ca: "Els ingredients de temporada, la filosofia de Mauro Colagreco." },
        },
        {
          label: { en: "The experience", es: "La experiencia", ca: "L'experiència" },
          desc: { en: "What the sequence of a tasting menu at the restaurant is like.", es: "Cómo es la secuencia de un menú degustación en el restaurante.", ca: "Com és la seqüència d'un menú degustació al restaurant." },
        },
      ],
      learningsItems: [
        {
          en: "Picking up a half-finished project forces you to understand before you touch anything. You have to read what's already there first — the decisions, the logic, the tone — so you can continue it without the seams showing.",
          es: "Retomar un proyecto a medias obliga a entender antes de tocar. Primero hay que leer lo que ya está — las decisiones, la lógica, el tono — para poder continuarlo sin que se note la costura.",
          ca: "Represendre un projecte a mig fer obliga a entendre abans de tocar. Primer cal llegir el que ja hi ha — les decisions, la lògica, el to — per poder continuar-lo sense que se'n noti la costura.",
        },
        {
          en: "I built the experience page with Claude Design. What would have taken days in Figma took hours — without losing control over the design decisions.",
          es: "La página de experiencia la construí con Claude Design. Lo que en Figma habría tardado días, tomó horas — sin perder el control sobre las decisiones de diseño.",
          ca: "La pàgina d'experiència la vaig construir amb Claude Design. El que a Figma hauria trigat dies, va prendre hores — sense perdre el control sobre les decisions de disseny.",
        },
      ],
    },
  },
    id: "gnoss-ai",
    num: "07",
    title: { en: "GNOSS AI Platform", es: "GNOSS AI Platform", ca: "GNOSS AI Platform" },
    category: { en: "Design System", es: "Sistema de Diseño", ca: "Sistema de Disseny" },
    year: "2026",
    problem: {
      en: "Entering an existing design system built by others — and expanding it without breaking its internal logic or visual coherence.",
      es: "Entrar en un sistema de diseño existente construido por otros — y ampliarlo sin romper su lógica interna ni su coherencia visual.",
      ca: "Entrar en un sistema de disseny existent construït per altres — i ampliar-lo sense trencar la seva lògica interna ni la seva coherència visual.",
    },
    process: {
      en: "Maintained existing pages and designed new ones within the established system — deciding which patterns to reuse and which to create, so the platform could keep growing without fragmenting or losing consistency.",
      es: "Mantuve páginas existentes y diseñé otras nuevas dentro del sistema establecido — decidiendo qué patrones reutilizar y cuáles crear, para que la plataforma pudiera seguir creciendo sin fragmentarse ni perder consistencia.",
      ca: "Vaig mantenir pàgines existents i en vaig dissenyar de noves dins del sistema establert — decidint quins patrons reutilitzar i quins crear, perquè la plataforma pogués seguir creixent sense fragmentar-se ni perdre consistència.",
    },
    result: {
      en: "A coherent web at scale — new pages that feel part of the same system, maintaining visual and structural consistency across hundreds of pages.",
      es: "Una web coherente a escala — nuevas páginas que parecen parte del mismo sistema, manteniendo consistencia visual y estructural a lo largo de cientos de páginas.",
      ca: "Una web coherent a escala — noves pàgines que semblen part del mateix sistema, mantenint consistència visual i estructural al llarg de centenars de pàgines.",
    },
    description: {
      en: "Design system maintenance and expansion for GNOSS — integrating new pages into a large, established visual system without breaking the whole.",
      es: "Mantenimiento y expansión del sistema de diseño de GNOSS — integrando nuevas páginas en un sistema visual amplio y ya establecido sin romper el conjunto.",
      ca: "Manteniment i expansió del sistema de disseny de GNOSS — integrant noves pàgines en un sistema visual ampli i ja establert sense trencar el conjunt.",
    },
    tags: ["Figma", "Design System", "Web Design"],
    gradient: "linear-gradient(135deg, #1a2a0a 0%, #2d5c1a 50%, #c4a35a 100%)",
    accentColor: "#c4a35a",
    cover: "/covers/cover-gnoss.svg",
    heroTagline: {
      en: "maintaining and expanding a web design system",
      es: "mantenimiento y expansión de un sistema de diseño web",
      ca: "manteniment i expansió d'un sistema de disseny web",
    },
    meta: [
      { labelKey: "client", value: "GNOSS" },
      { labelKey: "year", value: "2026" },
      { labelKey: "status", value: status.completed },
      { labelKey: "role", value: { en: "Web design · UI maintenance", es: "Diseño web · Mantenimiento UI", ca: "Disseny web · Manteniment UI" } },
      { labelKey: "stack", value: "Figma" },
    ],
    page: {
      challengeHeading: {
        en: "Stepping into someone else's system without breaking it",
        es: "Entrar en un sistema ajeno y no romperlo",
        ca: "Entrar en un sistema aliè i no trencar-lo",
      },
      challengeBody: [
        {
          en: "The challenge wasn't inventing, it was reading. Understanding the design decisions others had made, why they existed and how they related to each other. Any new page had to feel like part of the same system — not a bolt-on.",
          es: "El reto no era inventar, sino leer. Entender las decisiones de diseño que otros habían tomado, por qué existían y cómo se relacionaban entre sí. Cualquier página nueva tenía que parecer parte del mismo sistema — no un añadido.",
          ca: "El repte no era inventar, sinó llegir. Entendre les decisions de disseny que altres havien pres, per què existien i com es relacionaven entre elles. Qualsevol pàgina nova havia de semblar part del mateix sistema — no un afegit.",
        },
        {
          en: "GNOSS's website is big. That means many pages, many different contexts, and many times where consistency is the only thing holding the whole together.",
          es: "La web de GNOSS es grande. Eso significa muchas páginas, muchos contextos distintos y muchas veces en que la consistencia es lo único que mantiene la coherencia del conjunto.",
          ca: "La web de GNOSS és gran. Això significa moltes pàgines, molts contextos diferents i moltes vegades en què la consistència és l'únic que manté la coherència del conjunt.",
        },
      ],
      workCards: [
        {
          label: { en: "Maintenance", es: "Mantenimiento", ca: "Manteniment" },
          desc: {
            en: "Updating existing pages — content tweaks, component reviews, consistency fixes across the whole site.",
            es: "Actualización de páginas existentes — ajustes de contenido, revisiones de componentes, correcciones de consistencia a lo largo de toda la web.",
            ca: "Actualització de pàgines existents — ajustos de contingut, revisions de components, correccions de consistència al llarg de tota la web.",
          },
        },
        {
          label: { en: "New pages", es: "Nuevas páginas", ca: "Pàgines noves" },
          desc: {
            en: "Creating brand-new pages following the established design system: same visual grammar, same components, same tone.",
            es: "Creación de páginas inéditas siguiendo el design system establecido: misma gramática visual, mismos componentes, mismo tono.",
            ca: "Creació de pàgines inèdites seguint el sistema de disseny establert: mateixa gramàtica visual, mateixos components, mateix to.",
          },
        },
        {
          label: { en: "Scale", es: "Escala", ca: "Escala" },
          desc: {
            en: "Since it's a large website, the work required attention to detail and the ability to keep things coherent across many different contexts at once.",
            es: "Al tratarse de una web grande, el trabajo requería atención al detalle y capacidad para mantener la coherencia en muchos contextos distintos de forma simultánea.",
            ca: "Com que és una web gran, la feina requeria atenció al detall i capacitat per mantenir la coherència en molts contextos diferents de manera simultània.",
          },
        },
      ],
      learningsItems: [
        {
          en: "Working inside a system is a skill in itself. It's not about imposing your own judgment, but understanding the existing judgment well enough to extend it without the seams showing.",
          es: "Trabajar dentro de un sistema es una habilidad en sí misma. No se trata de imponer criterio propio, sino de entender el criterio existente lo suficientemente bien como para extenderlo sin que se note la costura.",
          ca: "Treballar dins d'un sistema és una habilitat en si mateixa. No es tracta d'imposar criteri propi, sinó d'entendre el criteri existent prou bé com per estendre'l sense que se'n noti la costura.",
        },
        {
          en: "Scale reveals consistency problems that go unnoticed in small projects. On a large website, any small inconsistency gets amplified and ends up visible.",
          es: "La escala revela los problemas de consistencia que en proyectos pequeños pasan desapercibidos. En una web grande, cualquier pequeña inconsistencia se amplifica y acaba siendo visible.",
          ca: "L'escala revela els problemes de consistència que en projectes petits passen desapercebuts. En una web gran, qualsevol petita inconsistència s'amplifica i acaba sent visible.",
        },
      ],
    },
  },
    id: "la-rioja-turismo",
    num: "08",
    title: { en: "La Rioja Turismo", es: "La Rioja Turismo", ca: "La Rioja Turisme" },
    category: { en: "Web Design", es: "Diseño Web", ca: "Disseny Web" },
    year: "2026",
    problem: {
      en: "A tourism portal that needed to match the identity of a destination with strong personality — already underway when I joined.",
      es: "Un portal de turismo que tenía que estar a la altura de un destino con personalidad propia — ya en marcha cuando me incorporé.",
      ca: "Un portal de turisme que havia d'estar a l'altura d'una destinació amb personalitat pròpia — ja en marxa quan m'hi vaig incorporar.",
    },
    process: {
      en: "Designed specific pages in Figma within the visual system already established by the studio. Delivered to production for Framer implementation.",
      es: "Diseñé páginas concretas en Figma dentro del sistema visual ya establecido por el estudio. Entregado a producción para implementación en Framer.",
      ca: "Vaig dissenyar pàgines concretes a Figma dins del sistema visual ja establert per l'estudi. Entregat a producció per a implementació a Framer.",
    },
    result: {
      en: "The project that led Turismo de Jaén to contact the studio — a direct follow-on from this work.",
      es: "El proyecto que llevó a Turismo de Jaén a contactar con el estudio — un encargo que nació directamente de este.",
      ca: "El projecte que va portar a Turisme de Jaén a contactar amb l'estudi — un encàrrec que va néixer directament d'aquest.",
    },
    description: {
      en: "Web design for La Rioja's tourism portal — page design in Figma within an existing visual system, implemented in Framer. The project that generated Turisme Jaén.",
      es: "Diseño web para el portal de turismo de La Rioja — páginas en Figma dentro de un sistema visual existente, implementado en Framer. El proyecto que generó Turisme Jaén.",
      ca: "Disseny web per al portal de turisme de La Rioja — pàgines a Figma dins d'un sistema visual existent, implementat a Framer. El projecte que va generar Turisme Jaén.",
    },
    tags: ["Figma", "Framer", "Web Design", "Tourism"],
    gradient: "linear-gradient(135deg, #1a0010 0%, #5c1a3a 60%, #b5386e 100%)",
    accentColor: "#b5386e",
    heroTagline: {
      en: "page design for La Rioja's tourism portal",
      es: "diseño de páginas para el portal turístico de La Rioja",
      ca: "disseny de pàgines per al portal turístic de La Rioja",
    },
    meta: [
      { labelKey: "client", value: "La Rioja Turismo" },
      { labelKey: "year", value: "2026" },
      { labelKey: "status", value: status.completed },
      { labelKey: "role", value: { en: "Web design · Figma", es: "Diseño web · Figma", ca: "Disseny web · Figma" } },
      { labelKey: "stack", value: "Figma · Framer" },
      { labelKey: "studio", value: "Dosgrapas" },
    ],
    page: {
      workHeading: { en: "Joining a project already underway", es: "Entrar en un proyecto en marcha", ca: "Entrar en un projecte en marxa" },
      workCards: [
        {
          label: { en: "Page design", es: "Diseño de páginas", ca: "Disseny de pàgines" },
          desc: {
            en: "I designed specific pages of the portal in Figma, within the visual system already established by the studio.",
            es: "Diseñé páginas concretas del portal en Figma, dentro del sistema visual ya establecido por el estudio.",
            ca: "Vaig dissenyar pàgines concretes del portal a Figma, dins del sistema visual ja establert per l'estudi.",
          },
        },
        {
          label: { en: "System coherence", es: "Coherencia de sistema", ca: "Coherència de sistema" },
          desc: {
            en: "Every new page had to fit the existing visual language — same components, same rhythm, same tone.",
            es: "Cada página nueva tenía que encajar con el lenguaje visual existente — mismos componentes, mismo ritmo, mismo tono.",
            ca: "Cada pàgina nova havia d'encaixar amb el llenguatge visual existent — mateixos components, mateix ritme, mateix to.",
          },
        },
        {
          label: { en: "Figma → Framer", es: "Figma → Framer", ca: "Figma → Framer" },
          desc: {
            en: "The design was delivered in Figma and implemented in Framer by the studio's production team.",
            es: "El diseño se entregó en Figma y fue implementado en Framer por el equipo de producción del estudio.",
            ca: "El disseny es va lliurar a Figma i es va implementar a Framer per l'equip de producció de l'estudi.",
          },
        },
      ],
      resultHeading: { en: "The project that opened the door to Jaén", es: "El proyecto que abrió la puerta a Jaén", ca: "El projecte que va obrir la porta a Jaén" },
      closingLink: {
        prefix: { en: "The Jaén project — ", es: "El proyecto de Jaén — ", ca: "El projecte de Jaén — " },
        linkText: { en: "which you can see here", es: "que puedes ver aquí", ca: "que pots veure aquí" },
        suffix: { en: " — is a direct descendant of this one.", es: " — es directamente heredero de este.", ca: " — és hereu directe d'aquest." },
        href: "/proyectos/turisme-jaen",
      },
    },
  },
];
