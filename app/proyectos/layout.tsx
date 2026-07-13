import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proyectos · Albert Canadas — Diseñador UX/UI & Web",
  description: "Proyectos seleccionados de UI/UX, diseño web y sistemas de diseño de Albert Canadas: turismo, cultura y tecnología, de Figma al navegador.",
};

export default function ProyectosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
