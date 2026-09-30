// Small inline-SVG icon set standing in for the prototype's Material Icons
// webfont ligatures (`<span class="material-icons">search</span>` etc). The
// real prototype loads that font from Google Fonts at runtime; Remotion's
// headless render has no guaranteed network access, so icons actually meant
// to render are recreated as self-contained SVGs instead of risking tofu.
const PATHS: Record<string, string> = {
  search: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
  person: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
  check_circle: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
  task_alt: "M22 5.18 10.59 16.6l-4.24-4.25 1.41-1.41 2.83 2.83 10-10L22 5.18zM12 20a8 8 0 1 1 5.29-14l1.45-1.45A9.96 9.96 0 0 0 12 2 10 10 0 1 0 22 12h-2a8 8 0 0 1-8 8z",
  description: "M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z",
  call_merge: "M17 20.41 18.41 19 15 15.59V13h2.5l-4-4-4 4H12v2.59L8.59 19 10 20.41 13 17.4v3.6h2v-3.6l2 3.01z",
  arrow_back: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z",
};

export function Icon({ name, size = 18, color = "currentColor" }: { name: keyof typeof PATHS; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}>
      <path d={PATHS[name]} />
    </svg>
  );
}
