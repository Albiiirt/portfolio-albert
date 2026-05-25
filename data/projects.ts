export type Project = {
  id: string;
  num: string;
  title: { en: string; es: string; ca: string };
  category: { en: string; es: string; ca: string };
  year: string;
  problem: { en: string; es: string; ca: string };
  process: { en: string; es: string; ca: string };
  result: { en: string; es: string; ca: string };
  tags: string[];
  gradient: string;
  accentColor: string;
};

export const projects: Project[] = [
  {
    id: "brand-identity",
    num: "01",
    title: { en: "Nova Brand Identity", es: "Identidad de Marca Nova", ca: "Identitat de Marca Nova" },
    category: { en: "Branding", es: "Branding", ca: "Branding" },
    year: "2024",
    problem: {
      en: "A fintech startup needed a brand that felt trustworthy yet innovative — standing out in a crowded market without looking like another generic bank.",
      es: "Una startup fintech necesitaba una marca que transmitiera confianza e innovación en un mercado saturado, sin parecer otro banco genérico.",
      ca: "Una startup fintech necessitava una marca que transmetés confiança i innovació en un mercat saturat, sense semblar un altre banc genèric.",
    },
    process: {
      en: "I used AI to explore 40+ visual directions in 2 days. Then strategically filtered down to the concept that balanced authority with approachability.",
      es: "Usé IA para explorar más de 40 direcciones visuales en 2 días. Luego filtré estratégicamente hasta el concepto que equilibraba autoridad y cercanía.",
      ca: "Vaig usar IA per explorar més de 40 direccions visuals en 2 dies. Després vaig filtrar estratègicament fins al concepte que equilibrava autoritat i proximitat.",
    },
    result: {
      en: "Full brand system: logo, color palette, typography, UI component library and brand guidelines. Delivered in 3 weeks.",
      es: "Sistema de marca completo: logo, paleta de color, tipografía, librería de componentes UI y guías de marca. Entregado en 3 semanas.",
      ca: "Sistema de marca complet: logo, paleta de color, tipografia, llibreria de components UI i guies de marca. Lliurat en 3 setmanes.",
    },
    tags: ["Figma", "AI", "Brand Strategy", "Design System"],
    gradient: "linear-gradient(135deg, #0d2a18 0%, #1e5c38 60%, #3dbe6f 100%)",
    accentColor: "#3dbe6f",
  },
  {
    id: "ecommerce-redesign",
    num: "02",
    title: { en: "Forma E-commerce", es: "E-commerce Forma", ca: "E-commerce Forma" },
    category: { en: "UI/UX Design", es: "Diseño UI/UX", ca: "Disseny UI/UX" },
    year: "2024",
    problem: {
      en: "High cart abandonment and poor mobile experience were costing the fashion brand 40% of potential revenue. The checkout flow had 11 steps.",
      es: "El alto abandono de carrito y la mala experiencia móvil costaban a la marca un 40% de ingresos potenciales. El checkout tenía 11 pasos.",
      ca: "L'alt abandonament del carret i la mala experiència mòbil costaven a la marca un 40% d'ingressos potencials. El checkout tenia 11 passos.",
    },
    process: {
      en: "Mapped the entire user journey, identified friction points through heuristic analysis, then redesigned the checkout as a single-page flow with smart defaults.",
      es: "Mapeé todo el journey del usuario, identifiqué puntos de fricción por análisis heurístico, y rediseñé el checkout como un flujo de página única con opciones inteligentes.",
      ca: "Vaig mapejar tot el journey de l'usuari, vaig identificar punts de fricció per anàlisi heurística, i vaig redissenyar el checkout com un flux d'una sola pàgina amb opcions intel·ligents.",
    },
    result: {
      en: "Cart abandonment reduced by 34%. Mobile conversions up 52%. The new design launched to 200k monthly users with zero critical issues.",
      es: "Abandono de carrito reducido un 34%. Conversiones móvil +52%. El nuevo diseño se lanzó a 200k usuarios mensuales sin incidencias críticas.",
      ca: "Abandonament del carret reduït un 34%. Conversions mòbil +52%. El nou disseny es va llançar a 200k usuaris mensuals sense incidències crítiques.",
    },
    tags: ["Figma", "UI Design", "UX Research", "Prototyping"],
    gradient: "linear-gradient(135deg, #1a2a0d 0%, #3d5c1e 60%, #7aad3a 100%)",
    accentColor: "#7aad3a",
  },
  {
    id: "saas-dashboard",
    num: "03",
    title: { en: "Pulse Analytics", es: "Pulse Analytics", ca: "Pulse Analytics" },
    category: { en: "Product Design", es: "Diseño de Producto", ca: "Disseny de Producte" },
    year: "2024",
    problem: {
      en: "Users were overwhelmed by data density. The B2B analytics platform felt powerful but unusable — onboarding completion was at 23%.",
      es: "Los usuarios se sentían abrumados por la densidad de datos. La plataforma B2B parecía potente pero no era usable — el onboarding se completaba solo un 23%.",
      ca: "Els usuaris se sentien aclaparats per la densitat de dades. La plataforma B2B semblava potent però no era usable — l'onboarding es completava només un 23%.",
    },
    process: {
      en: "Conducted 12 user interviews. Redesigned the information hierarchy from scratch, separating 'need to know' from 'nice to know' data at every level.",
      es: "Realicé 12 entrevistas con usuarios. Rediseñé la jerarquía de información desde cero, separando los datos esenciales de los secundarios en cada nivel.",
      ca: "Vaig fer 12 entrevistes amb usuaris. Vaig redissenyar la jerarquia d'informació des de zero, separant les dades essencials de les secundàries a cada nivell.",
    },
    result: {
      en: "Onboarding completion jumped to 67%. NPS improved from 28 to 61 in 3 months. The redesign became the company's primary sales demo asset.",
      es: "El onboarding completado subió al 67%. El NPS mejoró de 28 a 61 en 3 meses. El rediseño se convirtió en el activo principal de ventas de la empresa.",
      ca: "L'onboarding completat va pujar al 67%. El NPS va millorar de 28 a 61 en 3 mesos. El redisseny es va convertir en l'actiu principal de vendes de l'empresa.",
    },
    tags: ["Figma", "Product Design", "Data Viz", "AI Prototyping"],
    gradient: "linear-gradient(135deg, #1a2a0a 0%, #2d5c1a 50%, #c4a35a 100%)",
    accentColor: "#c4a35a",
  },
  {
    id: "app-health",
    num: "04",
    title: { en: "Vital Health App", es: "App de Salud Vital", ca: "App de Salut Vital" },
    category: { en: "App Design", es: "Diseño de App", ca: "Disseny d'App" },
    year: "2023",
    problem: {
      en: "Health apps feel clinical and guilt-inducing. This startup needed an app that felt like a personal coach — encouraging, not monitoring.",
      es: "Las apps de salud se sienten clínicas y generan culpa. Esta startup necesitaba una app que se sintiera como un coach personal — motivadora, no vigilante.",
      ca: "Les apps de salut se senten clíniques i generen culpa. Aquesta startup necessitava una app que se sentís com un coach personal — motivadora, no vigilant.",
    },
    process: {
      en: "Defined a 'coach, not doctor' design principle. Built a component system around encouragement micro-interactions and progress visualization that celebrated small wins.",
      es: "Definí el principio de diseño 'coach, no médico'. Construí un sistema de componentes alrededor de micro-interacciones de motivación y visualización de progreso que celebra pequeños logros.",
      ca: "Vaig definir el principi de disseny 'coach, no metge'. Vaig construir un sistema de components al voltant de micro-interaccions de motivació i visualització del progrés que celebra petits assoliments.",
    },
    result: {
      en: "Daily active usage 3x industry average. 4.8 stars on App Store. Featured in 'Apps We Love' section. Retention at 60 days: 68% vs 22% industry benchmark.",
      es: "Uso diario activo 3x la media del sector. 4.8 estrellas en App Store. Destacada en la sección 'Apps que nos encantan'. Retención a 60 días: 68% vs 22% del sector.",
      ca: "Ús diari actiu 3x la mitjana del sector. 4.8 estrelles a l'App Store. Destacada a la secció 'Apps que ens encanten'. Retenció als 60 dies: 68% vs 22% del sector.",
    },
    tags: ["Figma", "iOS/Android", "Motion Design", "AI Features"],
    gradient: "linear-gradient(135deg, #0d2a1a 0%, #1e5c3a 50%, #3dbe6f 80%, #c4a35a 100%)",
    accentColor: "#3dbe6f",
  },
];
