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
  },
];
