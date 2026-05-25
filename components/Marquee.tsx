"use client";

const items = [
  "Figma", "AI Design", "UI/UX", "Brand Identity", "Prototyping",
  "Design Systems", "Product Strategy", "User Research", "Motion Design",
  "Figma", "AI Design", "UI/UX", "Brand Identity", "Prototyping",
  "Design Systems", "Product Strategy", "User Research", "Motion Design",
];

export default function Marquee() {
  return (
    <div
      style={{
        overflow: "hidden",
        borderTop: "1px solid rgba(74,122,92,0.1)",
        borderBottom: "1px solid rgba(74,122,92,0.1)",
        padding: "0.875rem 0",
        background: "rgba(255,255,255,0.3)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
            <span
              style={{
                fontSize: "0.68rem",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: i % 4 === 0 ? "#4a7a5c" : i % 4 === 1 ? "#9a7040" : "rgba(28,43,32,0.3)",
                whiteSpace: "nowrap",
                padding: "0 2.5rem",
              }}
            >
              {item}
            </span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(74,122,92,0.2)", flexShrink: 0 }} />
          </span>
        ))}
      </div>
    </div>
  );
}
