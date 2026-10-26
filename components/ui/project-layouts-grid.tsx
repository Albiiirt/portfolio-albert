// Real screenshots of Albert's own project pages, as vertically-scrolling
// columns behind the Hero's spotlight reveal (see SpotlightReveal) — "an
// infinite background of our layouts" instead of a flat placeholder colour.
// Alternating columns scroll up/down (odd columns run `projectColumnScroll`
// in reverse) — each column's tile list is duplicated once so a -50%
// translate loops back to an identical frame, with no visible seam.
//
// Pulled from every project folder that has real UI screenshots (device
// mockups, walkthrough captures, the Bicco dashboard mockups) — food and
// people photography excluded (Mirazur-cupón's catalogue/menu/ingredient
// shots, its mobile-1/-2, the madrid "bodegas" landscape photos): this is
// meant to read as "our designs", not "our photos".
//
// Grouped by project, then interleaved WITH WRAPAROUND (each group repeats
// from its own start once exhausted, instead of dropping out) so every
// run of `PROJECT_GROUPS.length` consecutive entries still has one image
// per project — a plain round-robin that just stops when a short group
// runs dry leaves a long same-project tail once the longer groups are all
// that's left, which is what caused clusters of the same project sitting
// in neighbouring columns.

const PROJECT_GROUPS: string[][] = [
  [
    "/projects/madrid/device-desktop.jpg",
    "/projects/madrid/device-tablet.jpg",
    "/projects/madrid/device-mobile.jpg",
    "/projects/madrid/flow-1.jpg",
    "/projects/madrid/flow-2.jpg",
    "/screenshots/madrid-walkthrough/flowB-03-zona-detalle-cifras.jpg",
    "/screenshots/madrid-walkthrough/flowC-02-bodegas-filtradas-7.jpg",
  ],
  [
    "/projects/gnoss-ai/device-desktop.png",
    "/projects/gnoss-ai/device-tablet.png",
    "/projects/gnoss-ai/device-mobile.png",
  ],
  [
    "/projects/elbulli-marketplace/device-desktop.png",
    "/projects/elbulli-marketplace/device-tablet.png",
    "/projects/elbulli-marketplace/device-mobile.png",
  ],
  [
    "/projects/castellera/device-desktop.png",
    "/projects/castellera/device-tablet.png",
    "/projects/castellera/device-mobile.png",
    "/screenshots/castellera-walkthrough/01-home-hero.jpg",
    "/screenshots/castellera-walkthrough/02-agenda-diades-noticies.jpg",
    "/screenshots/castellera-walkthrough/03-nosaltres-stats.jpg",
    "/screenshots/castellera-walkthrough/04-equip-diagrama-red.jpg",
    "/screenshots/castellera-walkthrough/05-equip-nodo-click-benvinguda.jpg",
    "/screenshots/castellera-walkthrough/06-trajectoria-historia-timeline.jpg",
    "/screenshots/castellera-walkthrough/07-contractacions-formulario-escribiendo.jpg",
  ],
  [
    "/projects/mirazur-recetas/device-desktop.png",
    "/projects/mirazur-recetas/device-tablet.png",
    "/projects/mirazur-recetas/device-mobile.png",
  ],
  [
    // Mirazur-cupón (M20): only diagrams/timelines/forms/text screens —
    // excludes 01 (dish-photo hero), 02 (cut-out eye/people collage),
    // 05 (ingredient close-ups), 06 + 08 (dish-photo catalogue grids),
    // mobile-1 (people in kitchen, backgrounded) and mobile-2 ("plat après
    // plat" dish grid).
    "/screenshots/mirazur-cupon-walkthrough/03-methodologie-sapiens.jpg",
    "/screenshots/mirazur-cupon-walkthrough/04-sous-systeme-creatif-diagram.jpg",
    "/screenshots/mirazur-cupon-walkthrough/07-analyse-evolutive-timeline.jpg",
    "/screenshots/mirazur-cupon-walkthrough/09-timeline-evolutiva-arrows.jpg",
    "/screenshots/mirazur-cupon-walkthrough/10-timeline-evolutiva-click-avanzando.jpg",
    "/screenshots/mirazur-cupon-walkthrough/11-styles-chefs-diagram.jpg",
    "/screenshots/mirazur-cupon-walkthrough/12-decalogue-menu-carousel.jpg",
    "/screenshots/mirazur-cupon-walkthrough/13-decalogue-01-10-heritage-timeline.jpg",
    "/screenshots/mirazur-cupon-walkthrough/15-formulario-cupon-escribiendo.jpg",
    "/projects/mirazur-cupon/mobile-3.jpg",
  ],
  [
    "/projects/xunta-galicia/screen-1.png",
    "/projects/xunta-galicia/screen-2.png",
    "/projects/xunta-galicia/screen-3.png",
    "/projects/xunta-galicia/screen-5.png",
  ],
  [
    "/mockups/bicco/home.webp",
    "/mockups/bicco/buscador.webp",
    "/mockups/bicco/busqueda-avanzada.webp",
    "/mockups/bicco/explorador.webp",
    "/mockups/bicco/ficha-cdti.webp",
    "/mockups/bicco/ficha-linea.webp",
    "/mockups/bicco/ficha-organizacion.webp",
    "/mockups/bicco/ficha-pcti.webp",
    "/mockups/bicco/ficha-programa-marco.webp",
    "/mockups/bicco/ficha-region.webp",
    "/mockups/bicco/ficha-termino.webp",
  ],
];

function interleave(groups: string[][]): string[] {
  const maxLen = Math.max(...groups.map((g) => g.length));
  const result: string[] = [];
  for (let i = 0; i < maxLen; i++) {
    for (const group of groups) {
      // Wrap: a short group (3 images) just starts repeating its own list
      // rather than dropping out and leaving later rounds to whichever
      // group is longest.
      result.push(group[i % group.length]);
    }
  }
  return result;
}

const LAYOUT_SHOTS = interleave(PROJECT_GROUPS);

const COLUMNS = 8;
// Must be large enough that COLUMNS * TILES_PER_COLUMN covers the whole
// LAYOUT_SHOTS pool — otherwise whole groups (e.g. Bicco) can fall outside
// every column's sampled range and never appear at all. Tuned against the
// current ~99-entry pool; bump this if PROJECT_GROUPS grows a lot further.
const TILES_PER_COLUMN = 11;
const STRIDE = TILES_PER_COLUMN; // columns partition the pool with ~no overlap

function buildColumn(colIndex: number) {
  return Array.from(
    { length: TILES_PER_COLUMN },
    (_, i) => LAYOUT_SHOTS[(colIndex * STRIDE + i) % LAYOUT_SHOTS.length]
  );
}

export function ProjectLayoutsGrid() {
  const columns = Array.from({ length: COLUMNS }, (_, c) => buildColumn(c));

  return (
    <div className="absolute inset-0 flex" style={{ gap: "6px" }}>
      {columns.map((col, i) => {
        const duration = 34 + (i % 4) * 7; // varied speeds so columns drift out of sync
        const reverse = i % 2 === 1; // alternate up/down
        return (
          <div key={i} style={{ flex: 1, overflow: "hidden", position: "relative" }}>
            <div
              className="flex flex-col"
              style={{
                gap: "6px",
                animation: `projectColumnScroll ${duration}s linear infinite`,
                animationDirection: reverse ? "reverse" : "normal",
              }}
            >
              {[...col, ...col].map((src, j) => (
                <div
                  key={j}
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "16 / 10",
                    flexShrink: 0,
                    overflow: "hidden",
                    borderRadius: "3px",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- decorative scrolling mosaic, not a real <Image>: no intrinsic size to give it, and it must never participate in LCP/loading priority */}
                  <img
                    src={src}
                    alt=""
                    aria-hidden="true"
                    loading="eager"
                    decoding="async"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
