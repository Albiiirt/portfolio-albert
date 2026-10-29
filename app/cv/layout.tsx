import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV · Albert Canadés — Diseñador UX/UI & Web",
  description: "Currículum de Albert Canadés: diseñador web y UI/UX en Barcelona, experiencia en Dosgrapas, Bihotz y 8000 Estels, y formación en Digital Experience Design.",
};

export default function CvLayout({ children }: { children: React.ReactNode }) {
  return children;
}
