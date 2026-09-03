import type { Lang } from "@/lib/LanguageContext";
import type { Project, ProjectScreen } from "@/data/projects";

export type ResolvedScreen = { src: string; video: boolean; alt: string };

// Resolves a project's mobile screens showcase input (explicit `screens`
// list, or a `video`/`cover` fallback) into a normalized list ready to
// render. Shared by ProjectScreensShowcase (mobile carousel) so the
// resolution logic isn't duplicated per consumer.
export function resolveScreens(project: Project, lang: Lang): ResolvedScreen[] {
  if (project.screens?.length) {
    return project.screens.map((s: ProjectScreen) => {
      if (typeof s === "string") {
        return { src: s, video: false, alt: `${project.title[lang]} — vista previa` };
      }
      return {
        src: s.src,
        video: !!s.video,
        alt: s.alt ? s.alt[lang] : `${project.title[lang]} — vista previa`,
      };
    });
  }
  if (project.video) {
    return [{ src: project.video, video: true, alt: `${project.title[lang]} — vista previa` }];
  }
  if (project.cover) {
    return [{ src: project.cover, video: false, alt: `${project.title[lang]} — vista previa` }];
  }
  return [];
}
