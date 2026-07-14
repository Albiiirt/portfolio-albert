import type { Metadata } from "next";
import { Space_Grotesk, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";
import Grain from "@/components/Grain";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "500"],
});

// Update SITE_URL when deploying to production
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-albert-six.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Albert Canadas · Diseñador UX/UI & Web con enfoque de producto — Barcelona",
  description: "Diseñador UX/UI y web orientado a producto, con sede en Barcelona. Tomo decisiones de funcionalidad y contenido, no solo de estilo, y las implemento — Figma, Next.js, Framer, CMS headless (Strapi, Notion) e IA generativa aplicada al desarrollo (Claude Code). Trabajo con marcas de turismo, cultura y tecnología. Disponible para proyectos.",
  keywords: ["diseñador UX Barcelona", "diseñador UI freelance", "web designer Barcelona", "UX designer Barcelona", "product designer Barcelona", "diseño de producto", "design engineer", "Figma", "Framer", "Next.js", "Strapi", "CMS headless", "IA generativa aplicada al desarrollo", "identidad visual"],
  authors: [{ name: "Albert Canadas", url: SITE_URL }],
  creator: "Albert Canadas",
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Albert Canadas · Diseñador UX/UI & Web con enfoque de producto — Barcelona",
    description: "Diseñador UX/UI y web orientado a producto. Decisiones de funcionalidad y contenido, no solo de estilo — implementadas con Figma, Next.js, Framer, CMS headless e IA generativa aplicada al desarrollo.",
    siteName: "Albert Canadas",
    images: [
      {
        url: "/room.png",
        width: 2048,
        height: 1314,
        alt: "Albert Canadas — Diseñador UX/UI & Web con enfoque de producto en Barcelona",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Albert Canadas · Diseñador UX/UI & Web con enfoque de producto — Barcelona",
    description: "Diseñador UX/UI y web en Barcelona. Diseño y también implemento. Disponible para proyectos.",
    images: ["/room.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Albert Canadas",
  jobTitle: "Product Designer · UX/UI & Web Designer",
  description: "Diseñador UX/UI y web orientado a producto: toma decisiones de funcionalidad y contenido además de visuales, e implementa lo que diseña con Next.js, Framer y CMS headless, apoyado en IA generativa aplicada al desarrollo.",
  url: SITE_URL,
  email: "acanades@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Barcelona",
    addressRegion: "Cataluña",
    addressCountry: "ES",
  },
  sameAs: ["https://www.linkedin.com/in/albertcanadas/"],
  knowsAbout: [
    "UX Design",
    "UI Design",
    "Product Design",
    "Web Design",
    "Design Systems",
    "Figma",
    "Framer",
    "Next.js",
    "Strapi",
    "Headless CMS",
    "Notion CMS",
    "Generative AI for development",
    "Claude Code",
    "Accessibility (WCAG)",
    "Identidad de marca",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Dosgrapas",
  },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "BAU, Centre Universitari d'Arts i Disseny · Barcelona" },
    { "@type": "CollegeOrUniversity", name: "EMAD · La Garriga" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        {/* Anti-flash: set theme before first paint */}
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            var t = localStorage.getItem('theme');
            if (t !== 'light') document.documentElement.dataset.theme = 'dark';
          } catch(e) {
            document.documentElement.dataset.theme = 'dark';
          }
        `}} />
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
        <Grain />
      </body>
    </html>
  );
}
