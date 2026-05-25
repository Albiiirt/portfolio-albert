"use client";

import { useLang } from "@/lib/LanguageContext";

const items = [
  "Figma",
  "AI Design",
  "UI/UX",
  "Brand Identity",
  "Prototyping",
  "Design Systems",
  "Product Strategy",
  "User Research",
  "Motion Design",
  "Figma",
  "AI Design",
  "UI/UX",
  "Brand Identity",
  "Prototyping",
  "Design Systems",
  "Product Strategy",
  "User Research",
  "Motion Design",
];

export default function Marquee() {
  return (
    <div
      style={{
        overflow: "hidden",
        background: "rgba(255,255,255,0.03)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "1rem 0",
      }}
    >
      <div className="marquee-track">
        {items.map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0",
              paddingRight: "0",
            }}
          >
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: i % 3 === 0 ? "#7b2fbe" : i % 3 === 1 ? "#666680" : "#444460",
                whiteSpace: "nowrap",
                padding: "0 2.5rem",
              }}
            >
              {item}
            </span>
            <span
              style={{
                width: "3px",
                height: "3px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.15)",
                flexShrink: 0,
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
