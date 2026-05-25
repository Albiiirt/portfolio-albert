"use client";

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
        borderTop: "1px solid rgba(120,180,140,0.08)",
        borderBottom: "1px solid rgba(120,180,140,0.08)",
        padding: "0.875rem 0",
        background: "rgba(61,190,111,0.015)",
      }}
    >
      <div className="marquee-track">
        {items.map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "0.68rem",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color:
                  i % 4 === 0
                    ? "rgba(61,190,111,0.6)"
                    : i % 4 === 1
                      ? "rgba(196,163,90,0.4)"
                      : "rgba(74,106,84,0.4)",
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
                background: "rgba(120,180,140,0.2)",
                flexShrink: 0,
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
