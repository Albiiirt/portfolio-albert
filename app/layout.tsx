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
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://albertcanadas.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Albert Canadas · Diseñador UX/UI & Web — Barcelona",
  description: "Diseñador UX/UI y web con sede en Barcelona. Trabajo con marcas de turismo, cultura y tecnología — de Figma al navegador. Disponible para proyectos.",
  keywords: ["diseñador UX Barcelona", "diseñador UI freelance", "web designer Barcelona", "UX designer Barcelona", "Figma", "Framer", "diseño de producto", "identidad visual"],
  authors: [{ name: "Albert Canadas", url: SITE_URL }],
  creator: "Albert Canadas",
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Albert Canadas · Diseñador UX/UI & Web — Barcelona",
    description: "Diseñador UX/UI y web con sede en Barcelona. Trabajo con marcas de turismo, cultura y tecnología — de Figma al navegador.",
    siteName: "Albert Canadas",
    images: [
      {
        url: "/room.png",
        width: 2048,
        height: 1314,
        alt: "Albert Canadas — Diseñador UX/UI & Web en Barcelona",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Albert Canadas · Diseñador UX/UI & Web — Barcelona",
    description: "Diseñador UX/UI y web en Barcelona. Disponible para proyectos.",
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
  jobTitle: "Diseñador UX/UI & Web",
  url: SITE_URL,
  email: "acanades@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Barcelona",
    addressRegion: "Cataluña",
    addressCountry: "ES",
  },
  sameAs: ["https://www.linkedin.com/in/albertcanadas/"],
  knowsAbout: ["UX Design", "UI Design", "Web Design", "Figma", "Framer", "Diseño de producto", "Identidad de marca", "Inteligencia Artificial"],
  worksFor: {
    "@type": "Organization",
    name: "Dosgrapas",
  },
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
