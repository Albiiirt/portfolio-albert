"use client";

import { forwardRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Lang } from "@/lib/LanguageContext";
import type { Project } from "@/data/projects";
import { t } from "@/data/translations";
import { getCoverImage, getProjectLink, getSubtitle, metaValueText, pickCredits } from "./helpers";

// ── Left (text) page of a project spread — also reused, unchanged, for the
// opening identity spread (page 0) with IDENTITY_PROJECT (see helpers.ts):
// no new template, just empty num/category/meta so the eyebrow and credits
// row gracefully don't render, plus an explicit link override so "Ver el
// caso completo" doesn't point at a non-existent /proyectos/identity. ──────
type TextPageProps = {
  project: Project;
  lang: Lang;
  linkOverride?: { href: string; label: string };
};

export const RevistaTextPage = forwardRef<HTMLDivElement, TextPageProps>(function RevistaTextPage(
  { project, lang, linkOverride },
  ref
) {
  const tx = t[lang];
  const credits = pickCredits(project.meta);
  const subtitle = getSubtitle(project, lang);
  const link = linkOverride
    ? { ...linkOverride, external: false }
    : getProjectLink(project, lang, { liveLink: tx.revista.liveLink, caseLink: tx.revista.caseLink });
  const eyebrow = [project.num, project.category[lang]].filter(Boolean).join(" · ");

  return (
    <div ref={ref} className="revista-page revista-page--text">
      <div style={{ position: "absolute", inset: 0, padding: "11% 12%" }}>
        {/* Eyebrow — omitted entirely when a page has no num/category
            (the identity spread) rather than rendering a stray " · ". */}
        {eyebrow && (
          <p
            style={{
              margin: 0,
              fontSize: "0.95rem",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--text-subtle)",
            }}
          >
            {eyebrow}
          </p>
        )}

        {/* Title block — centered toward ~55% of the page height, leaving a
            generous blank third above (reduced on mobile via revista.css). */}
        <div
          className="revista-title-block"
          style={{
            position: "absolute",
            top: "48%",
            bottom: "20%",
            left: "12%",
            right: "16%",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-serif-revista)",
              fontStyle: "italic",
              fontWeight: 400,
              letterSpacing: 0,
              // The page is now a fixed real width (~320–600px), not a near
              // full-viewport panel — sized off the page's own container
              // width (cqw, see .revista-page's container-type) instead of
              // the viewport (vw), which would read far too large/small now.
              fontSize: "clamp(1.7rem, 9cqw, 2.75rem)",
              lineHeight: 1.02,
              margin: "0 0 0.6rem 0",
              color: "var(--text)",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            {project.title[lang]}
          </h2>
          <p
            style={{
              margin: "0 0 0.85rem 0",
              fontSize: "1rem",
              fontWeight: 500,
              color: "var(--text-muted)",
              maxWidth: "36ch",
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            {subtitle}
          </p>
          <p
            style={{
              margin: 0,
              fontSize: "1rem",
              lineHeight: 1.55,
              color: "var(--text-muted)",
              maxWidth: "36ch",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            {project.description[lang]}
          </p>

          {link.external ? (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: "0.9rem",
                fontSize: "0.82rem",
                fontWeight: 600,
                color: "var(--text)",
                textDecoration: "none",
                borderBottom: "1px solid var(--border-mid)",
                paddingBottom: "2px",
                flexShrink: 0,
              }}
            >
              {link.label}
            </a>
          ) : (
            <Link
              href={link.href}
              style={{
                display: "inline-block",
                marginTop: "0.9rem",
                fontSize: "0.82rem",
                fontWeight: 600,
                color: "var(--text)",
                textDecoration: "none",
                borderBottom: "1px solid var(--border-mid)",
                paddingBottom: "2px",
                flexShrink: 0,
              }}
            >
              {link.label}
            </Link>
          )}
        </div>

        {/* Credits — single horizontal row, low on the page, only the keys
            that actually exist for this project (capped at 4). */}
        {credits.length > 0 && (
          <div
            className="revista-credits"
            style={{
              position: "absolute",
              left: "12%",
              right: "12%",
              bottom: "7%",
              display: "flex",
              gap: "1.25rem",
              overflow: "hidden",
            }}
          >
            {credits.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.2rem",
                  // Equal shares, not content-weighted — so a long value
                  // (e.g. "role") never crushes short neighbours like
                  // "client"/"year" down to nothing.
                  flex: "1 1 0%",
                  minWidth: 0,
                }}
              >
                <span
                  className="section-label"
                  style={{
                    fontSize: "0.62rem",
                    letterSpacing: "0.14em",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.labelKey ? tx.projectPage.metaLabels[item.labelKey] : item.label![lang]}
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {metaValueText(item.value, lang)}
                </span>
              </div>
            ))}
          </div>
        )}

        {project.num && (
          <span
            style={{
              position: "absolute",
              left: "12%",
              bottom: "5%",
              fontSize: "0.68rem",
              letterSpacing: "0.08em",
              color: "var(--text-subtle)",
            }}
          >
            {project.num}
          </span>
        )}

        <div className="revista-fold-corner revista-fold-corner--left" aria-hidden="true" />
      </div>
    </div>
  );
});

// ── Right (image) page of a project spread ──────────────────────────────────
type ImagePageProps = { project: Project; lang: Lang };

export const RevistaImagePage = forwardRef<HTMLDivElement, ImagePageProps>(function RevistaImagePage(
  { project, lang },
  ref
) {
  const image = getCoverImage(project, lang);

  return (
    <div ref={ref} className="revista-page revista-page--image">
      {image && (
        <div
          style={{
            position: "absolute",
            inset: "5%",
            overflow: "hidden",
            borderRadius: "2px",
          }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 900px) 70vw, 600px"
            className="revista-photo"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
      )}

      {project.num && (
        <span
          style={{
            position: "absolute",
            right: "5%",
            bottom: "2.5%",
            fontSize: "0.68rem",
            letterSpacing: "0.08em",
            color: "var(--text-subtle)",
          }}
        >
          {project.num}
        </span>
      )}

      <div className="revista-fold-corner revista-fold-corner--right" aria-hidden="true" />
    </div>
  );
});

// ── Closing colophon page ────────────────────────────────────────────────────
export const RevistaClosing = forwardRef<HTMLDivElement, { lang: Lang }>(function RevistaClosing(
  { lang },
  ref
) {
  const tx = t[lang];
  return (
    <div ref={ref} className="revista-page">
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.25rem",
          padding: "11% 12%",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-serif-revista)",
            fontStyle: "italic",
            fontWeight: 400,
            letterSpacing: 0,
            fontSize: "clamp(1.7rem, 8cqw, 2.4rem)",
            margin: 0,
            color: "var(--text)",
          }}
        >
          {tx.revista.closingHeading}
        </h2>
        <Link
          href="/proyectos"
          style={{
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "var(--text)",
            textDecoration: "none",
            borderBottom: "1px solid var(--border-mid)",
            paddingBottom: "2px",
          }}
        >
          {tx.revista.closingLink}
        </Link>
      </div>
    </div>
  );
});
