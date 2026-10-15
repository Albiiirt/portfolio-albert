import type { Lang } from "@/lib/LanguageContext";
import type { MetaItem, MetaLabelKey, Project } from "@/data/projects";

// Order in which credit pairs are offered for the single credits row —
// capped at 4 by pickCredits below. Only keys that actually exist on a given
// project's meta[] render; never padded to a fixed 4.
const CREDIT_PRIORITY: MetaLabelKey[] = [
  "client",
  "year",
  "role",
  "stack",
  "status",
  "web",
  "studio",
  "team",
  "duration",
  "project",
];

export function pickCredits(meta: MetaItem[] | undefined): MetaItem[] {
  if (!meta || meta.length === 0) return [];
  const byKey = new Map<string, MetaItem>();
  for (const item of meta) {
    if (item.labelKey && !byKey.has(item.labelKey)) byKey.set(item.labelKey, item);
  }
  const ordered: MetaItem[] = [];
  for (const key of CREDIT_PRIORITY) {
    const item = byKey.get(key);
    if (item) ordered.push(item);
    if (ordered.length >= 4) break;
  }
  if (ordered.length < 4) {
    for (const item of meta) {
      if (ordered.length >= 4) break;
      if (!ordered.includes(item)) ordered.push(item);
    }
  }
  return ordered;
}

export function metaValueText(value: MetaItem["value"], lang: Lang): string {
  return typeof value === "string" ? value : value[lang];
}

export function getSubtitle(project: Project, lang: Lang): string {
  if (project.heroTagline) return project.heroTagline[lang];
  const desc = project.description[lang];
  const firstSentence = desc.split(/(?<=[.!?])\s/)[0];
  return firstSentence ?? desc;
}

export function getCoverImage(project: Project, lang: Lang): { src: string; alt: string } | null {
  if (project.cover) {
    return { src: project.cover, alt: project.coverAlt?.[lang] ?? project.title[lang] };
  }
  const first = project.screens?.[0];
  if (!first) return null;
  if (typeof first === "string") return { src: first, alt: project.title[lang] };
  return { src: first.src, alt: first.alt?.[lang] ?? project.title[lang] };
}

export function getProjectLink(
  project: Project,
  lang: Lang,
  labels: { liveLink: string; caseLink: string }
): { href: string; label: string; external: boolean } {
  const webItem = project.meta?.find((item) => item.labelKey === "web" && item.href);
  if (webItem?.href) {
    return { href: webItem.href, label: labels.liveLink, external: true };
  }
  return { href: `/proyectos/${project.id}`, label: labels.caseLink, external: false };
}

// The opening spread (page 0/1) reuses RevistaTextPage "as-is" (no new
// template, per diseñador) with identity content instead of a real project —
// num/category are deliberately empty so the eyebrow line doesn't render,
// and meta is empty so the credits row doesn't render either. Every other
// required Project field exists only to satisfy the type and is never read
// by RevistaTextPage.
export const IDENTITY_PROJECT: Project = {
  id: "identity",
  num: "",
  title: { en: "Albert Canadés", es: "Albert Canadés", ca: "Albert Canadés" },
  category: { en: "", es: "", ca: "" },
  year: "2026",
  description: { en: "", es: "", ca: "" },
  problem: { en: "", es: "", ca: "" },
  process: { en: "", es: "", ca: "" },
  result: { en: "", es: "", ca: "" },
  tags: [],
  gradient: "",
  accentColor: "",
  heroTagline: {
    en: "Selected Work — 2026",
    es: "Trabajos seleccionados — 2026",
    ca: "Treballs seleccionats — 2026",
  },
  meta: [],
};
