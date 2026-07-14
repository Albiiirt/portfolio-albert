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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return {};

  const title = `${project.title.es} · Albert Canadas`;
  const description = project.description.es;

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
}: {
  params: Promise<{ id: string }>;
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

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <ProjectPage />
    </>
  );
}
