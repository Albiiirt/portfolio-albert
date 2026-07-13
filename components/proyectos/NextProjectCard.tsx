"use client";

import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";
import FadeInView from "@/components/FadeInView";

export default function NextProjectCard({ ids }: { ids: [string, string, string] }) {
  const { lang } = useLang();
  const tx = t[lang].work;
  const list = ids.map((id) => projects.find((p) => p.id === id)).filter(Boolean) as typeof projects;
  if (!list.length) return null;

  return (
    <section style={{ background: "var(--bg)", padding: "clamp(4rem, 8vh, 7rem) clamp(1.5rem, 5vw, 5rem)" }}>
      <div className="site-content">
        <FadeInView>
          <p className="section-label" style={{ margin: "0 0 1.75rem" }}>{tx.relatedProjects}</p>

          {/* 2 cards */}
          <div className="proj-next-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "clamp(0.75rem, 1.5vw, 1.25rem)", marginBottom: "clamp(2rem, 4vh, 3rem)" }}>
            {list.map((project) => (
              <Link
                key={project.id}
                href={`/proyectos/${project.id}`}
                style={{ display: "block", textDecoration: "none", cursor: "none" }}
              >
                <div
                  style={{
                    position: "relative",
                    borderRadius: "1.25rem",
                    overflow: "hidden",
                    height: "clamp(160px, 24vh, 240px)",
                    background: project.gradient,
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = "0.85"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = "1"; }}
                >
                  {project.video && (
                    <video
                      autoPlay muted loop playsInline
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                    >
                      <source src={project.video} type="video/mp4" />
                    </video>
                  )}
                  {!project.video && project.cover && (
                    <Image
                      src={project.cover}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: "cover", objectPosition: "center" }}
                    />
                  )}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.25rem 1.5rem", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem" }}>
                    <div>
                      <p style={{ fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", margin: "0 0 0.3rem" }}>
                        {project.num} · {project.category[lang]}
                      </p>
                      <h3 style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.3rem)", fontWeight: 700, color: "#fff", margin: 0, letterSpacing: "-0.02em" }}>
                        {project.title[lang]}
                      </h3>
                    </div>
                    <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#fff", borderBottom: "1px solid rgba(255,255,255,0.5)", paddingBottom: "2px", whiteSpace: "nowrap", flexShrink: 0 }}>
                      {tx.view} →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Ver todos — más prominente */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link href="/proyectos" className="btn-ghost">
              {tx.viewAll} →
            </Link>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
