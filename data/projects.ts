export type Project = {
  id: string;
  num: string;
  title: { en: string; es: string };
  category: { en: string; es: string };
  year: string;
  problem: { en: string; es: string };
  process: { en: string; es: string };
  result: { en: string; es: string };
  tags: string[];
  gradient: string;
  accentColor: string;
};

export const projects: Project[] = [
  {
    id: "brand-identity",
    num: "01",
    title: { en: "Nova Brand Identity", es: "Identidad de Marca Nova" },
    category: { en: "Branding", es: "Branding" },
    year: "2024",
    problem: {
      en: "A fintech startup needed a brand that felt trustworthy yet innovative — standing out in a crowded market without looking like another generic bank.",
      es: "Una startup fintech necesitaba una marca que transmitiera confianza e innovación en un mercado saturado, sin parecer otro banco genérico.",
    },
    process: {
      en: "I used AI to explore 40+ visual directions in 2 days. Then strategically filtered down to the concept that balanced authority with approachability.",
      es: "Usé IA para explorar más de 40 direcciones visuales en 2 días. Luego filtré estratégicamente hasta el concepto que equilibraba autoridad y cercanía.",
    },
    result: {
      en: "Full brand system: logo, color palette, typography, UI component library and brand guidelines. Delivered in 3 weeks.",
      es: "Sistema de marca completo: logo, paleta de color, tipografía, librería de componentes UI y guías de marca. Entregado en 3 semanas.",
    },
    tags: ["Figma", "AI", "Brand Strategy", "Design System"],
    gradient: "linear-gradient(135deg, #1a0b2e 0%, #7B2FBE 60%, #b06be0 100%)",
    accentColor: "#7B2FBE",
  },
  {
    id: "ecommerce-redesign",
    num: "02",
    title: { en: "Forma E-commerce", es: "E-commerce Forma" },
    category: { en: "UI/UX Design", es: "Diseño UI/UX" },
    year: "2024",
    problem: {
      en: "High cart abandonment and poor mobile experience were costing the fashion brand 40% of potential revenue. The checkout flow had 11 steps.",
      es: "El alto abandono de carrito y la mala experiencia móvil costaban a la marca un 40% de ingresos potenciales. El checkout tenía 11 pasos.",
    },
    process: {
      en: "Mapped the entire user journey, identified friction points through heuristic analysis, then redesigned the checkout as a single-page flow with smart defaults.",
      es: "Mapeé todo el journey del usuario, identifiqué puntos de fricción por análisis heurístico, y rediseñé el checkout como un flujo de página única con opciones inteligentes.",
    },
    result: {
      en: "Cart abandonment reduced by 34%. Mobile conversions up 52%. The new design launched to 200k monthly users with zero critical issues.",
      es: "Abandono de carrito reducido un 34%. Conversiones móvil +52%. El nuevo diseño se lanzó a 200k usuarios mensuales sin incidencias críticas.",
    },
    tags: ["Figma", "UI Design", "UX Research", "Prototyping"],
    gradient: "linear-gradient(135deg, #041e2e 0%, #0a4a6e 60%, #00D4FF 100%)",
    accentColor: "#00D4FF",
  },
  {
    id: "saas-dashboard",
    num: "03",
    title: { en: "Pulse Analytics", es: "Pulse Analytics" },
    category: { en: "Product Design", es: "Diseño de Producto" },
    year: "2024",
    problem: {
      en: "Users were overwhelmed by data density. The B2B analytics platform felt powerful but unusable — onboarding completion was at 23%.",
      es: "Los usuarios se sentían abrumados por la densidad de datos. La plataforma B2B parecía potente pero no era usable — el onboarding se completaba solo un 23%.",
    },
    process: {
      en: "Conducted 12 user interviews. Redesigned the information hierarchy from scratch, separating 'need to know' from 'nice to know' data at every level.",
      es: "Realicé 12 entrevistas con usuarios. Rediseñé la jerarquía de información desde cero, separando los datos esenciales de los secundarios en cada nivel.",
    },
    result: {
      en: "Onboarding completion jumped to 67%. NPS improved from 28 to 61 in 3 months. The redesign became the company's primary sales demo asset.",
      es: "El onboarding completado subió al 67%. El NPS mejoró de 28 a 61 en 3 meses. El rediseño se convirtió en el activo principal de ventas de la empresa.",
    },
    tags: ["Figma", "Product Design", "Data Viz", "AI Prototyping"],
    gradient: "linear-gradient(135deg, #1a0520 0%, #6b0f4e 60%, #FF3CAC 100%)",
    accentColor: "#FF3CAC",
  },
  {
    id: "app-health",
    num: "04",
    title: { en: "Vital Health App", es: "App de Salud Vital" },
    category: { en: "App Design", es: "Diseño de App" },
    year: "2023",
    problem: {
      en: "Health apps feel clinical and guilt-inducing. This startup needed an app that felt like a personal coach — encouraging, not monitoring.",
      es: "Las apps de salud se sienten clínicas y generan culpa. Esta startup necesitaba una app que se sintiera como un coach personal — motivadora, no vigilante.",
    },
    process: {
      en: "Defined a 'coach, not doctor' design principle. Built a component system around encouragement micro-interactions and progress visualization that celebrated small wins.",
      es: "Definí el principio de diseño 'coach, no médico'. Construí un sistema de componentes alrededor de micro-interacciones de motivación y visualización de progreso que celebra pequeños logros.",
    },
    result: {
      en: "Daily active usage 3x industry average. 4.8 stars on App Store. Featured in 'Apps We Love' section. Retention at 60 days: 68% vs 22% industry benchmark.",
      es: "Uso diario activo 3x la media del sector. 4.8 estrellas en App Store. Destacada en la sección 'Apps que nos encantan'. Retención a 60 días: 68% vs 22% del sector.",
    },
    tags: ["Figma", "iOS/Android", "Motion Design", "AI Features"],
    gradient: "linear-gradient(135deg, #041a1a 0%, #0a5555 50%, #00D4FF 80%, #7B2FBE 100%)",
    accentColor: "#00D4FF",
  },
];
