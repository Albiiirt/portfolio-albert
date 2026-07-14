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
  heroTagline?: LocalizedText;
  meta?: MetaItem[];
  page?: ProjectPageContent;
};

export const projects: Project[] = [
  {
    id: "elbulli",
    num: "01",
    title: { en: "elBulli Foundation", es: "Fundació elBulli", ca: "Fundació elBulli" },
    category: { en: "Design System", es: "Sistema de Diseño", ca: "Sistema de Disseny" },
    year: "2026",
    problem: {
      en: "The elBulli Foundation archive is a living digital monument to one of the most influential restaurants in history, with hundreds of pages and content that keeps growing. The product challenge: give the editorial team the ability to publish new content without depending on a developer every time, without breaking the archive's visual consistency.",
      es: "El archivo de la Fundació elBulli es un monumento digital vivo a uno de los restaurantes más influyentes de la historia, con cientos de páginas y contenido que no deja de crecer. El reto de producto: dar al equipo editorial la capacidad de publicar contenido nuevo sin depender de un desarrollador cada vez, sin romper la consistencia visual del archivo.",
      ca: "L'arxiu de la Fundació elBulli és un monument digital viu a un dels restaurants més influents de la història, amb centenars de pàgines i contingut que no deixa de créixer. El repte de producte: donar a l'equip editorial la capacitat de publicar contingut nou sense dependre d'un desenvolupador cada vegada, sense trencar la consistència visual de l'arxiu.",
    },
    process: {
      en: "I designed and maintained the design system, and made the call to model it as reusable content blocks in Strapi — dish entries, timelines, galleries, quotes — each with its own visual rules inherited from the system. That lets the editorial team combine blocks and publish without needing me for every new page. I also designed and coded specific pages of the archive myself.",
      es: "Diseñé y mantuve el sistema de diseño, y tomé la decisión de modelarlo como bloques de contenido reutilizables en Strapi — fichas de platos, cronologías, galerías, citas — cada uno con sus propias reglas visuales heredadas del sistema. Así el equipo editorial puede combinar bloques y publicar sin depender de mí para cada página nueva. Además diseñé y construí en código páginas concretas del archivo.",
      ca: "Vaig dissenyar i mantenir el sistema de disseny, i vaig prendre la decisió de modelar-lo com a blocs de contingut reutilitzables a Strapi — fitxes de plats, cronologies, galeries, cites — cadascun amb les seves pròpies regles visuals heretades del sistema. Així l'equip editorial pot combinar blocs i publicar sense dependre de mi per a cada pàgina nova. A més, vaig dissenyar i construir en codi pàgines concretes de l'arxiu.",
    },
    result: {
      en: "A design and content system that doubles as a CMS: the archive grows with new pages without losing visual consistency, and the team edits and publishes on its own thanks to the Strapi structure.",
      es: "Un sistema de diseño y de contenido que funciona a la vez como CMS: el archivo crece con nuevas páginas sin perder consistencia visual, y el equipo edita y publica de forma autónoma gracias a la estructura en Strapi.",
      ca: "Un sistema de disseny i de contingut que funciona alhora com a CMS: l'arxiu creix amb noves pàgines sense perdre consistència visual, i l'equip edita i publica de forma autònoma gràcies a l'estructura a Strapi.",
    },
    description: {
      en: "Design and code implementation for the elBulli Foundation archive — building existing designs into production-ready, responsive pages and designing new ones as the project grows.",
      es: "Diseño e implementación en código para el archivo de la Fundació elBulli — llevando diseños a páginas responsive listas para producción, y diseñando las nuevas a medida que el proyecto crece.",
      ca: "Disseny i implementació en codi per a l'arxiu de la Fundació elBulli — portant dissenys a pàgines responsive llestes per a producció, i dissenyant les noves a mesura que el projecte creix.",
    },
    tags: ["Figma", "Strapi", "Design System"],
    gradient: "linear-gradient(135deg, #080e1a 0%, #0d1b2e 60%, #162a42 100%)",
    accentColor: "#4a8fcc",
    cover: "/covers/cover-elbulli.webp",
    heroTagline: {
      en: "a page system for a cultural archive",
      es: "sistema de páginas para un archivo cultural",
      ca: "sistema de pàgines per a un arxiu cultural",
    },
    meta: [
      { labelKey: "client", value: "Fundació elBulli" },
      { labelKey: "year", value: "2026" },
      { labelKey: "status", value: status.inProgress },
      { labelKey: "role", value: { en: "Web design · Code implementation · React", es: "Diseño web · Implementación en código · React", ca: "Disseny web · Implementació en codi · React" } },
      { labelKey: "stack", value: "Figma · Strapi · React" },
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
      learningsFootnote: {
        en: "This section will be updated as the project progresses and real usage observations come in.",
        es: "Esta sección se actualizará a medida que avance el proyecto y se recojan observaciones reales del uso.",
        ca: "Aquesta secció s'actualitzarà a mesura que avanci el projecte i es recullin observacions reals de l'ús.",
      },
    },
  },
  {
    id: "madrid",
    num: "02",
    title: { en: "Enoturismo Madrid", es: "Enoturismo Madrid", ca: "Enoturisme Madrid" },
    category: { en: "Web Design", es: "Diseño Web", ca: "Disseny Web" },
    year: "2026",
    problem: {
      en: "The wine tourism sector around Madrid lacked a digital presence that matched the quality of its wineries. Existing sites were outdated, hard to navigate, and not converting visitors into bookings — a product problem as much as a visual one.",
      es: "El sector del enoturismo en la Comunidad de Madrid carecía de una presencia digital a la altura de sus bodegas. Los sitios existentes eran obsoletos, difíciles de navegar y no convertían visitas en reservas — un problema de producto tanto como de estilo visual.",
      ca: "El sector de l'enoturisme a la Comunitat de Madrid mancava d'una presència digital a l'altura dels seus cellers. Els llocs existents eren obsolets, difícils de navegar i no convertien visites en reserves — un problema de producte tant com d'estil visual.",
    },
    process: {
      en: "Designed a full UI system in Figma — mood, typography and components — and decided the information architecture: how routes, wineries and experiences are organised to take a visitor from discovery to booking with no friction. Migrated the project off a fragile AI-generated HTML base onto Next.js, then implemented everything in Framer with smooth scroll, route maps and a structure built to convert, not just to look good.",
      es: "Diseñé un sistema UI completo en Figma — mood, tipografía y componentes — y decidí la arquitectura de la información: cómo se organizan rutas, bodegas y experiencias para llevar al visitante del descubrimiento a la reserva sin fricción. Migré el proyecto de una base HTML frágil generada por IA a Next.js, y luego implementé todo en Framer con scroll suave, mapas de rutas y una estructura pensada para convertir, no solo para verse bien.",
      ca: "Vaig dissenyar un sistema UI complet a Figma — mood, tipografia i components — i vaig decidir l'arquitectura de la informació: com s'organitzen rutes, cellers i experiències per portar el visitant del descobriment a la reserva sense fricció. Vaig migrar el projecte d'una base HTML fràgil generada per IA a Next.js, i després vaig implementar-ho tot a Framer amb scroll suau, mapes de rutes i una estructura pensada per convertir, no només per fer bonic.",
    },
    result: {
      en: "A premium web experience, designed and implemented end to end, that positions Madrid's wine routes as a top-tier cultural destination — with a structure built to turn visits into bookings.",
      es: "Una experiencia web premium, diseñada e implementada de principio a fin, que posiciona las rutas del vino de Madrid como destino cultural de primer nivel — con una estructura pensada para convertir visitas en reservas.",
      ca: "Una experiència web premium, dissenyada i implementada de principi a fi, que posiciona les rutes del vi de Madrid com a destinació cultural de primer nivell — amb una estructura pensada per convertir visites en reserves.",
    },
    description: {
      en: "Full project, solo — migrated an AI-generated HTML base to Next.js and designed and built every page of Madrid's wine tourism site.",
      es: "Proyecto entero, en solitario — migré una base HTML generada por IA a Next.js y diseñé y construí cada página del site de enoturismo de Madrid.",
      ca: "Projecte sencer, en solitari — vaig migrar una base HTML generada per IA a Next.js i vaig dissenyar i construir cada pàgina del site d'enoturisme de Madrid.",
    },
    tags: ["Next.js", "Claude Code", "Figma", "Web Design"],
    gradient: "linear-gradient(135deg, #1a0a0f 0%, #4a1528 60%, #8c3a5a 100%)",
    accentColor: "#8c3a5a",
    cover: "/covers/cover-madrid.webp",
    heroTagline: {
      en: "design and development for Madrid's wine routes",
      es: "diseño y desarrollo de las rutas del vino de Madrid",
      ca: "disseny i desenvolupament de les rutes del vi de Madrid",
    },
    meta: [
      { labelKey: "client", value: "Enoturismo Madrid" },
      { labelKey: "year", value: "2026" },
      { labelKey: "status", value: status.completedLive },
      { labelKey: "role", value: { en: "Design and development · Solo project", es: "Diseño y desarrollo · Proyecto en solitario", ca: "Disseny i desenvolupament · Projecte en solitari" } },
      { labelKey: "stack", value: "Next.js · Claude Code · Figma" },
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
            en: "I designed and built every page of the site solo — in Next.js, with shared components that guarantee consistency without repeating work.",
            es: "Diseñé y desarrollé cada página del site en solitario — en Next.js, con componentes compartidos que garantizan coherencia sin repetir trabajo.",
            ca: "Vaig dissenyar i desenvolupar cada pàgina del site en solitari — a Next.js, amb components compartits que garanteixen coherència sense repetir feina.",
          },
        },
        {
          label: { en: "Consistency", es: "Consistencia", ca: "Consistència" },
          desc: {
            en: "A shared style system. Regardless of the content, every page speaks the same visual language.",
            es: "Un sistema de estilos compartidos. Independientemente del contenido, todas las páginas hablan el mismo lenguaje visual.",
            ca: "Un sistema d'estils compartits. Independentment del contingut, totes les pàgines parlen el mateix llenguatge visual.",
          },
        },
        {
          label: { en: "Responsive and animations", es: "Responsive y animaciones", ca: "Responsive i animacions" },
          desc: {
            en: "The base had no responsive behaviour. Every page was adjusted for desktop, tablet and mobile. Animations were explored in Figma and implemented in code.",
            es: "La base no tenía responsive. Cada página, ajustada para desktop, tablet y móvil. Las animaciones, exploradas en Figma e implementadas en código.",
            ca: "La base no tenia responsive. Cada pàgina, ajustada per a desktop, tablet i mòbil. Les animacions, explorades a Figma i implementades en codi.",
          },
        },
      ],
      learningsItems: [
        {
          en: "Code as a design medium. Seeing the real result in the browser is faster — and more honest — than any prototype.",
          es: "Código como medio de diseño. Ver el resultado real en el navegador es más rápido — y más honesto — que cualquier prototipo.",
          ca: "El codi com a mitjà de disseny. Veure el resultat real al navegador és més ràpid — i més honest — que qualsevol prototip.",
        },
        {
          en: "Extending something is an exercise in listening. Before adding anything, you have to understand the decisions already made — to continue them, not break them.",
          es: "Extender es un ejercicio de escucha. Antes de añadir nada, hay que entender las decisiones que ya se tomaron — para continuarlas, no romperlas.",
          ca: "Ampliar és un exercici d'escolta. Abans d'afegir res, cal entendre les decisions que ja s'havien pres — per continuar-les, no trencar-les.",
        },
      ],
    },
  },
  {
    id: "castellera",
    num: "03",
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
  {
    id: "turisme-jaen",
    num: "04",
    title: { en: "Turisme Jaén", es: "Turisme Jaén", ca: "Turisme Jaén" },
    category: { en: "Web Design", es: "Diseño Web", ca: "Disseny Web" },
    year: "2026",
    problem: {
      en: "Jaén's tourism portal — one of Spain's most heritage-rich destinations — needed a full redesign that could handle hundreds of pages, crossing categories and massive content without losing clarity.",
      es: "El portal de turismo de Jaén — uno de los destinos con más patrimonio de España — necesitaba un rediseño completo capaz de gestionar cientos de páginas, categorías cruzadas y contenido denso sin perder claridad.",
      ca: "El portal de turisme de Jaén — una de les destinacions amb més patrimoni d'Espanya — necessitava un redisseny complet capaç de gestionar centenars de pàgines, categories creuades i contingut dens sense perdre claredat.",
    },
    process: {
      en: "Designed in Figma as a duo — we tried several full-page proposals, thinking first about how content would be navigated and organised, not just how it would look. Once that direction was set, we built the component system to support it. Code implementation is handled by an internal colleague from the same studio.",
      es: "Diseñado en Figma a cuatro manos — probamos varias propuestas de página completa hasta encontrar la dirección correcta, pensando primero en cómo se iba a navegar y organizar el contenido, no solo en el estilo visual. Con la dirección definida, construimos el sistema de componentes que soporta esa arquitectura. La implementación en código la lleva un compañero interno del mismo estudio.",
      ca: "Dissenyat a Figma a quatre mans — vam provar diverses propostes de pàgina completa fins a trobar la direcció correcta, pensant primer en com es navegaria i s'organitzaria el contingut, no només en l'estil visual. Amb la direcció definida, vam construir el sistema de components que suporta aquesta arquitectura. La implementació en codi la porta un company intern del mateix estudi.",
    },
    result: {
      en: "A visual system ready for production, currently in implementation phase. Working with the developer in the same studio means faster adjustments and a final result closer to the original design.",
      es: "Un sistema visual listo para producción, actualmente en fase de implementación. Trabajar con el desarrollador en el mismo estudio significa ajustes más rápidos y un resultado final más fiel al diseño original.",
      ca: "Un sistema visual llest per a producció, actualment en fase d'implementació. Treballar amb el desenvolupador al mateix estudi significa ajustos més ràpids i un resultat final més fidel al disseny original.",
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
      { labelKey: "status", value: status.inProduction },
      { labelKey: "role", value: { en: "Web design · UX · Figma", es: "Diseño web · UX · Figma", ca: "Disseny web · UX · Figma" } },
      { labelKey: "stack", value: "Figma" },
      { labelKey: "team", value: { en: "Design + in-house development", es: "Diseño + Desarrollo interno", ca: "Disseny + desenvolupament intern" } },
    ],
    page: {
      challengeHeading: { en: "Two challenges in one", es: "Dos retos en uno", ca: "Dos reptes en un" },
      challengeCards: [
        {
          badge: { en: "The client's challenge", es: "Reto del cliente", ca: "El repte del client" },
          heading: { en: "Modernising a benchmark portal", es: "Modernizar un portal de referencia", ca: "Modernitzar un portal de referència" },
          body: {
            en: "Redesign Jaén's tourism portal — one of Spain's most heritage-rich destinations — and make the design match the content: hundreds of pages, crossing categories and a huge amount of useful information that couldn't get lost along the way.",
            es: "Rediseñar el portal de turismo de Jaén — uno de los destinos con más patrimonio de España — y hacer que el diseño estuviese a la altura del contenido: cientos de páginas, categorías cruzadas y una cantidad enorme de información útil que no podía perderse por el camino.",
            ca: "Redissenyar el portal de turisme de Jaén — una de les destinacions amb més patrimoni d'Espanya — i fer que el disseny estigués a l'altura del contingut: centenars de pàgines, categories creuades i una quantitat enorme d'informació útil que no es podia perdre pel camí.",
          },
        },
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
  {
    id: "mirazur",
    num: "05",
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
  {
    id: "gnoss-ai",
    num: "06",
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
  {
    id: "la-rioja-turismo",
    num: "07",
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
