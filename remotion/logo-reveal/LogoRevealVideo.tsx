import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

// Same cubic-bezier the site's CSS/Framer Motion animations already use
// (lib/animations.ts EASE = [0.25, 0.46, 0.45, 0.94]), hardcoded here the
// same way every other remotion/ scene hardcodes its own easing constant
// (see remotion/shared/Cursor.tsx, remotion/madrid/scenes.tsx) rather than
// importing across the `@/` alias, which nothing in remotion/ currently
// relies on for its webpack bundle.
const BEZIER = Easing.bezier(0.25, 0.46, 0.45, 0.94);

export type LogoRevealGroup = {
  /** One or more SVG path `d` strings revealed together as a single unit
   *  (e.g. the paths that make up one letterform, or one X-position cluster
   *  of paths in a logo with no clean 1:1 letter mapping). */
  paths: string[];
  /** How many frames this group's own left-to-right reveal takes. */
  duration: number;
  /** Subtle settle-in scale pulse (<=1.02x), timed inside this group's own
   *  `duration` window — reserved for the single most complex group in a
   *  logo (e.g. an icon that wraps the wordmark). */
  pulse?: boolean;
};

export type LogoRevealVideoProps = {
  /** CSS `background` value — gradient string or flat hex, matching the
   *  static cover SVG's own background exactly. */
  background: string;
  /** Position + size of the inner logo `<svg>`, mirroring the nested
   *  `<svg x y width height viewBox>` the static cover SVG already uses. */
  logo: { x: number; y: number; width: number; height: number; viewBox: string };
  /** Reveal groups, left to right in reading order. */
  groups: LogoRevealGroup[];
  /** Fill color applied to every path. Both current covers use solid white. */
  fill?: string;
  /** Frame offset between the start of consecutive groups' reveals. */
  stagger?: number;
};

function GroupReveal({
  paths,
  fill,
  start,
  duration,
  pulse,
}: {
  paths: string[];
  fill: string;
  start: number;
  duration: number;
  pulse?: boolean;
}) {
  const frame = useCurrentFrame();
  const local = frame - start;

  // inset(0 X% 0 0) on an SVG <g> resolves its percentages against that
  // group's own fill-box (its own bounding box), not the whole logo — so
  // this wipes each group open left-to-right on its own, independent of
  // where it sits inside the full wordmark. X=100 hides it completely,
  // X=0 shows it in full.
  const hiddenPercent = interpolate(local, [0, duration], [100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: BEZIER,
  });

  // Runs only on the designated group, inside its own duration window —
  // no frames are added after the reveal completes.
  const pulseScale = pulse
    ? interpolate(
        local,
        [Math.max(duration - 8, 0), duration - 2, duration],
        [1, 1.02, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: BEZIER }
      )
    : 1;

  return (
    <g
      style={{
        clipPath: `inset(0 ${hiddenPercent}% 0 0)`,
        transform: pulseScale !== 1 ? `scale(${pulseScale})` : undefined,
        transformOrigin: "center",
        transformBox: "fill-box",
      }}
    >
      {paths.map((d, i) => (
        <path key={i} d={d} fill={fill} />
      ))}
    </g>
  );
}

// Reusable Remotion composition: reveals a wordmark logo group-by-group
// (never a single pen-stroke outline — these logos are solid fill shapes
// with no stroke to trace) along the same curve the rest of the site's
// motion already uses. Parametrized per project via props so a single
// component backs both BiccoLogoReveal and GnossLogoReveal in Root.tsx.
export function LogoRevealVideo({
  background,
  logo,
  groups,
  fill = "#FFFFFF",
  stagger = 4,
}: LogoRevealVideoProps) {
  const starts = groups.map((_, i) => i * stagger);

  return (
    <AbsoluteFill style={{ background }}>
      <svg
        viewBox="0 0 800 500"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        style={{ position: "absolute", inset: 0 }}
      >
        <svg
          x={logo.x}
          y={logo.y}
          width={logo.width}
          height={logo.height}
          viewBox={logo.viewBox}
          preserveAspectRatio="xMidYMid meet"
        >
          {groups.map((group, i) => (
            <GroupReveal
              key={i}
              paths={group.paths}
              fill={fill}
              start={starts[i]}
              duration={group.duration}
              pulse={group.pulse}
            />
          ))}
        </svg>
      </svg>
    </AbsoluteFill>
  );
}

/** Frame at which the last group's reveal (pulse included) lands. */
export function getRevealEndFrame(groups: LogoRevealGroup[], stagger: number): number {
  const lastIndex = groups.length - 1;
  return lastIndex * stagger + groups[lastIndex].duration;
}
