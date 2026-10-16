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

        {/* Title block — now on a wide/short landscape page instead of a
            tall portrait one, so it claims most of the page height (was
            48%–22%, i.e. the middle 30%, sized for a page roughly twice as
            tall; a landscape page needs far more of its shorter height for
            the same title+subtitle+description+link content, tightened
            further on mobile via revista.css where the page is shortest). */}
        <div
          className="revista-title-block"
          style={{
            position: "absolute",
            top: "26%",
            bottom: "22%",
            left: "12%",
            right: "16%",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2
            className="revista-title"
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
            className="revista-subtitle"
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
            className="revista-description"
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
              className="revista-cta"
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
              className="revista-cta"
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
            that actually exist for this project (capped at 4). Pinned well
            above the page-number corner (fixed, generous "bottom" on both —
            not a content-height-dependent gap) so a 2-line value never
            reads as glued to the page number below it. */}
        {credits.length > 0 && (
          <div
            className="revista-credits"
            style={{
              position: "absolute",
              left: "12%",
              right: "12%",
              bottom: "9%",
              display: "flex",
              gap: "1rem",
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
                  // Equal shares with a real floor — so a long value (e.g.
                  // "role") never crushes short neighbours like
                  // "client"/"year" down to an unreadable sliver.
                  flex: "1 1 0%",
                  minWidth: "4rem",
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
                    lineHeight: 1.3,
                    // Values wrap up to 2 lines instead of truncating to one
                    // — "Fundació elBulli"/"Colla Castellera del Baix
                    // Montseny" aren't unusually long, they just don't fit a
                    // quarter of a ~500px page on a single line.
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
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
            className="revista-page-num"
            style={{
              position: "absolute",
              left: "12%",
              bottom: "3%",
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
            inset: 0,
            overflow: "hidden",
          }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 900px) 92vw, 900px"
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
            // Now sitting directly on the photo (image goes edge-to-edge,
            // no more 5% page-background margin behind it) — var(--text
            // -subtle) relied on the cream page background for contrast
            // and can disappear over a light photo area, so it's pinned to
            // white + a dark drop shadow instead, same as other on-photo
            // overlays on the site. Left un-z-indexed on purpose: the
            // invisible .revista-fold-corner grab zone (see CustomCursor.tsx)
            // must stay on top of it so hovering the corner, including over
            // these digits, still shows the "grab to flip" cursor.
            color: "#fff",
            textShadow: "0 1px 4px rgba(0, 0, 0, 0.55)",
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
