"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// ── Orbit parameters ─────────────────────────────────
const CX = 255, CY = 210;
const RX = 225, RY = 58;
const THETA = -14 * Math.PI / 180;
const COS = Math.cos(THETA);  //  0.9703
const SIN = Math.sin(THETA);  // -0.2419
const TAU = Math.PI * 2;
const PERIOD = 18000; // ms — 18 s per full orbit

function orbitPos(t: number) {
  return {
    x: CX + RX * Math.cos(t) * COS - RY * Math.sin(t) * SIN,
    y: CY + RX * Math.cos(t) * SIN + RY * Math.sin(t) * COS,
  };
}

// ── Real logo icons (centered at 0,0) ────────────────

function FigmaIcon() {
  // Official paths — viewBox 0 0 200 300, scaled to ~20×30, centered
  return (
    <g transform="scale(0.09) translate(-100,-150)">
      <path fill="#0ACF83" d="M50 300c27.6 0 50-22.4 50-50v-50H50c-27.6 0-50 22.4-50 50s22.4 50 50 50z"/>
      <path fill="#A259FF" d="M0 150c0-27.6 22.4-50 50-50h50v100H50c-27.6 0-50-22.4-50-50z"/>
      <path fill="#F24E1E" d="M0 50C0 22.4 22.4 0 50 0h50v100H50C22.4 100 0 77.6 0 50z"/>
      <path fill="#FF7262" d="M100 0h50c27.6 0 50 22.4 50 50s-22.4 50-50 50h-50V0z"/>
      <path fill="#1ABCFE" d="M200 150c0 27.6-22.4 50-50 50s-50-22.4-50-50 22.4-50 50-50 50 22.4 50 50z"/>
    </g>
  );
}

function FramerIcon() {
  // Tabler Icons path — viewBox 0 0 24 24, centered at (12,12)
  return (
    <g transform="scale(0.85) translate(-12,-12)">
      <path
        d="M6 15h12l-12-12h12v6H6v6l6 6v-6"
        stroke="#0A0A0A"
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </g>
  );
}

function ClaudeIcon() {
  // Official Anthropic/Claude symbol — viewBox 0 0 100 100, centered at (50,50)
  return (
    <g transform="scale(0.26) translate(-50,-50)" fill="hsl(14.8,63.1%,63%)">
      <path d="m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z"/>
    </g>
  );
}

function GitHubIcon() {
  return (
    <g transform="scale(0.85) translate(-12,-12)">
      <path
        fill="#0A0A0A"
        d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"
      />
    </g>
  );
}

const LOGOS = [
  { name: "Figma",  Icon: FigmaIcon,  color: "#A259FF" },
  { name: "Framer", Icon: FramerIcon, color: "#4080FF" },
  { name: "Claude", Icon: ClaudeIcon, color: "hsl(14.8,63%,60%)" },
  { name: "GitHub", Icon: GitHubIcon, color: "#0A0A0A" },
];

// ── Component ─────────────────────────────────────────
export default function PlanetOrbit() {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      setAngle(((now - start) % PERIOD) / PERIOD * TAU);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // 3 logos spaced 120° apart — smooth depth-based opacity
  const yMin = CY - RY;
  const yMax = CY + RY;
  const logos = LOGOS.map(({ name, Icon, color }, i) => {
    const t = angle + i * TAU / 4;
    const { x, y } = orbitPos(t);
    const isBehind = y < CY;
    const depth = Math.max(0, Math.min(1, (y - yMin) / (yMax - yMin)));
    const opacity = 0.35 + 0.65 * depth; // 0.35 at far back → 1.0 at far front
    return { name, Icon, color, x, y, isBehind, opacity };
  });

  return (
    <motion.div
      className="hero-profile-section"
      style={{ pointerEvents: "none" }}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          viewBox="0 0 500 440"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={{ width: "100%", height: "auto", display: "block" }}
        >
          <defs>
            {/* Back = TOP half (y < CY) — passes behind the planet */}
            <clipPath id="orbit-back">
              <rect x="0" y="0" width="500" height={CY} />
            </clipPath>
            {/* Front = BOTTOM half (y > CY) — passes in front of the planet */}
            <clipPath id="orbit-front">
              <rect x="0" y={CY} width="500" height="230" />
            </clipPath>

            {/* Avatar background gradient */}
            <radialGradient id="avatar-bg" cx="42%" cy="36%" r="62%">
              <stop offset="0%"   stopColor="rgba(255,252,245,0.95)" />
              <stop offset="55%"  stopColor="rgba(230,222,208,0.7)" />
              <stop offset="100%" stopColor="rgba(200,190,172,0.5)" />
            </radialGradient>

            {/* Clip avatar content to circle */}
            <clipPath id="avatar-clip">
              <circle cx={CX} cy={CY} r="144" />
            </clipPath>

            {/* Single gradient for the full orbit ring — same object for both halves */}
            <linearGradient id="ring-grad" x1="0" y1="130" x2="0" y2="290" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="var(--orbit-ring)" stopOpacity="0.18" />
              <stop offset="100%" stopColor="var(--orbit-ring)" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* ── Back arc — thin single line, behind planet ── */}
          <ellipse
            cx={CX} cy={CY} rx={RX} ry={RY}
            stroke="url(#ring-grad)" strokeWidth="1" fill="none"
            clipPath="url(#orbit-back)"
            transform={`rotate(-14 ${CX} ${CY})`}
          />

          {/* ── Back logos — rendered before planet ── */}
          {logos.map(({ name, Icon, x, y, isBehind, opacity }) => (
            <g
              key={`back-${name}`}
              transform={`translate(${x.toFixed(1)},${y.toFixed(1)})`}
              display={isBehind ? "block" : "none"}
              opacity={opacity.toFixed(3)}
            >
              <circle r="23" fill="rgba(239,231,210,0.97)" style={{ stroke: "var(--border-mid)" }} strokeWidth="1.5" />
              <Icon />
            </g>
          ))}

          {/* ── Planet circle — profile photo ── */}
          <image
            href="/avatar.jpg"
            x={CX - 144} y={CY - 144}
            width="288" height="288"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#avatar-clip)"
          />
          {/* Planet rim */}
          <circle cx={CX} cy={CY} r="144" fill="none" style={{ stroke: "var(--border)" }} strokeWidth="2" />

          {/* ── Front arc — thin single line, above planet but below logos ── */}
          <ellipse
            cx={CX} cy={CY} rx={RX} ry={RY}
            stroke="url(#ring-grad)" strokeWidth="1" fill="none"
            clipPath="url(#orbit-front)"
            transform={`rotate(-14 ${CX} ${CY})`}
          />

          {/* ── Front logos — rendered last, always on top ── */}
          {logos.map(({ name, Icon, x, y, isBehind, opacity }) => (
            <g
              key={`front-${name}`}
              transform={`translate(${x.toFixed(1)},${y.toFixed(1)})`}
              display={!isBehind ? "block" : "none"}
              opacity={opacity.toFixed(3)}
            >
              <circle r="23" fill="rgba(239,231,210,0.97)" style={{ stroke: "var(--border-mid)" }} strokeWidth="1.5" />
              <Icon />
            </g>
          ))}
        </svg>
      </motion.div>
    </motion.div>
  );
}
