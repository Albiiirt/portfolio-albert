import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import "./revista.css";

// Loaded only here, not in the root layout — this is the one route that
// needs an italic serif "masthead" face; the rest of the site stays on
// Space Grotesk alone.
const instrumentSerif = Instrument_Serif({
  variable: "--font-serif-revista",
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: "Revista · Albert Canadés — Diseñador UX/UI & Web",
  description: "Los proyectos de Albert Canadés, en formato revista: portadas a página completa y un pase de página realista.",
};

export default function RevistaLayout({ children }: { children: React.ReactNode }) {
  return <div className={instrumentSerif.variable}>{children}</div>;
}
