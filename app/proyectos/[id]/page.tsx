import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ElBulliPage from "@/components/proyectos/ElBulliPage";
import JaenPage from "@/components/proyectos/JaenPage";
import MirazurPage from "@/components/proyectos/MirazurPage";
import GnossPage from "@/components/proyectos/GnossPage";
import MadridPage from "@/components/proyectos/MadridPage";
import CastelleraPage from "@/components/proyectos/CastelleraPage";
import LaRiojaPage from "@/components/proyectos/LaRiojaPage";
import { projects } from "@/data/projects";

type PageComponent = () => React.JSX.Element;

const pages: Record<string, PageComponent> = {
  elbulli: ElBulliPage,
  "turisme-jaen": JaenPage,
  mirazur: MirazurPage,
  "gnoss-ai": GnossPage,
  madrid: MadridPage,
  castellera: CastelleraPage,
  "la-rioja-turismo": LaRiojaPage,
};

export function generateStaticParams() {
  return Object.keys(pages).map((id) => ({ id }));
}

// elBulli is the only project rendered with tabbed sub-projects today —
// resolves the ?p= query param to a valid sub-project id, defaulting to
// "archivo" when the param is missing or doesn't match one.
function resolveSubProjectId(project: (typeof projects)[number], raw?: string): string | undefined {
  if (!project.subProjects?.length) return undefined;
  const valid = project.subProjects.some((s) => s.id === raw);
  return valid ? raw : project.subProjects[0].id;
}

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: SearchParams;
}): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return {};

  let title = `${project.title.es} · Albert Canadas`;
  let description = project.description.es;

  if (project.subProjects?.length) {
    const sp = await searchParams;
    const raw = typeof sp.p === "string" ? sp.p : undefined;
    const activeId = resolveSubProjectId(project, raw);
    const activeSubProject = project.subProjects.find((s) => s.id === activeId);
    if (activeSubProject) {
      title = `${project.title.es} — ${activeSubProject.tabLabel.es} · Albert Canadas`;
      description = activeSubProject.problem.es;
    }
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: project.cover ? [{ url: project.cover }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-albert-six.vercel.app";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: SearchParams;
}) {
  const { id } = await params;
  const ProjectPage = pages[id];
  if (!ProjectPage) notFound();

  const project = projects.find((p) => p.id === id);
  const schema = project && {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title.es,
    description: project.description.es,
    url: `${SITE_URL}/proyectos/${project.id}`,
    creator: { "@type": "Person", name: "Albert Canadas", url: SITE_URL },
    datePublished: project.year,
    keywords: project.tags.join(", "),
    about: project.problem.es,
    ...(project.cover ? { image: `${SITE_URL}${project.cover}` } : {}),
  };

  // elBulli and Mirazur render with tabbed sub-projects; every other
  // project page takes no props, so it keeps using the generic
  // PageComponent map.
  let body: React.JSX.Element;
  if (project?.subProjects?.length && (id === "elbulli" || id === "mirazur")) {
    const sp = await searchParams;
    const raw = typeof sp.p === "string" ? sp.p : undefined;
    const initialTab = resolveSubProjectId(project, raw);
    body =
      id === "elbulli" ? (
        <ElBulliPage initialTab={initialTab} />
      ) : (
        <MirazurPage initialTab={initialTab} />
      );
  } else {
    body = <ProjectPage />;
  }

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      {body}
    </>
  );
}
