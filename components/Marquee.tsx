"use client";

const items = [
  "Figma","AI Design","UI/UX","Brand Identity","Prototyping",
  "Design Systems","Product Strategy","User Research","Motion Design",
  "Figma","AI Design","UI/UX","Brand Identity","Prototyping",
  "Design Systems","Product Strategy","User Research","Motion Design",
];

export default function Marquee() {
  return (
    <div style={{ overflow: "hidden", borderTop: "1px solid rgba(90,140,106,0.1)", borderBottom: "1px solid rgba(90,140,106,0.1)", padding: "0.875rem 0", background: "rgba(255,255,255,0.38)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}>
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
            <span style={{ fontSize: "0.67rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: i % 4 === 0 ? "#5a8c6a" : i % 4 === 1 ? "#8c6a3c" : "rgba(30,26,20,0.25)", whiteSpace: "nowrap", padding: "0 2.5rem" }}>
              {item}
            </span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(90,140,106,0.2)", flexShrink: 0 }} />
          </span>
        ))}
      </div>
    </div>
  );
}
