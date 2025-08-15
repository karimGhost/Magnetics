import React from "react";

/**
 * SolderConstructionHeadline
 * 
 * Per‑letter animated construction effect using pure SVG + CSS (no libraries):
 *  - Each letter has its own mini SVG scene
 *  - A tiny "technician" (stick worker with iron) traverses the letter
 *  - Sparks flicker at the iron tip
 *  - The letter strokes "light up" with a glow as the worker passes
 *
 * Drop-in for Next.js/React. Tailwind optional (only used on the wrapper).
 *
 * Usage:
 *   <SolderConstructionHeadline text="Expert Tech Repair, Lightning Fast." />
 */
export default function TechHeading({
  text = "Expert Tech Repair, Lightning Fast.",
  size = 64,          // font size in px per letter tile
  gap = 6,            // px gap between letters
  duration = 1.2,     // seconds per letter animation
  stagger = 0.12,     // seconds between letters starting
  wireColor = "#10b981", // glow/wire color (emerald)
  baseColor = "#1f2937", // outline color (slate-800)
}: {
  text?: string;
  size?: number;
  gap?: number;
  duration?: number;
  stagger?: number;
  wireColor?: string;
  baseColor?: string;
}) {
  const letters = Array.from(text);

  return (
    <div className="flex flex-wrap items-end justify-center" style={{ gap }}>
      <style jsx>{`
        /* --- Shared keyframes --- */
        @keyframes lightReveal { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes workerWalk   { from { transform: translateX(0); } to { transform: translateX(100%); } }
        @keyframes flicker      { 0%,100%{ opacity: .2 } 25%{ opacity: 1 } 50%{ opacity: .4 } 75%{ opacity: .8 } }

        /* SVG glow filter helper is defined inside each letter via <defs> */
      `}</style>

      {letters.map((ch, i) => (
        ch === " " ? (
          // space spacer — keeps natural word gaps
          <span key={`sp-${i}`} style={{ width: size * 0.35 }} />
        ) : (
          <LetterTile
            key={`${ch}-${i}`}
            letter={ch}
            size={size}
            delay={i * stagger}
            duration={duration}
            wireColor={wireColor}
            baseColor={baseColor}
          />
        )
      ))}
    </div>
  );
}

function LetterTile({
  letter,
  size,
  delay,
  duration,
  wireColor,
  baseColor,
}: {
  letter: string;
  size: number;
  delay: number;      // s
  duration: number;   // s
  wireColor: string;
  baseColor: string;
}) {
  const w = Math.round(size * 0.75);  // tile width (approx)
  const h = Math.round(size * 1.25);  // tile height
  const fontSize = size;              // svg font-size

  // We animate the reveal using a mask rect that scales from left->right.
  // The worker group translates across same width so they stay in sync.
  const maskId = React.useId();
  const glowId = React.useId();

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} role="img" aria-label={letter}>
      <defs>
        {/* mask that reveals the glowing stroke */}
        <mask id={maskId} maskUnits="userSpaceOnUse">
          <rect x="0" y="0" width={w} height={h} fill="black" />
          <rect
            x="0"
            y="0"
            width={w}
            height={h}
            fill="white"
            style={{ transformOrigin: "0 0", transform: "scaleX(0)", animation: `lightReveal ${duration}s ease forwards`, animationDelay: `${delay}s` }}
          />
        </mask>

        {/* soft outer glow */}
        <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor={wireColor} floodOpacity="0.9" />
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor={wireColor} floodOpacity="0.6" />
          <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor={wireColor} floodOpacity="0.35" />
        </filter>
      </defs>

      {/* baseline (unlit) letter outline */}
      <text
        x={w / 2}
        y={(h / 2) + fontSize * 0.35}
        textAnchor="middle"
        fontSize={fontSize}
        fontFamily="Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto"
        fill="none"
        stroke={baseColor}
        strokeWidth={2}
        paintOrder="stroke"
        opacity={0.45}
      >
        {letter}
      </text>

      {/* glowing stroke revealed by mask */}
      <g mask={`url(#${maskId})`}>
        <text
          x={w / 2}
          y={(h / 2) + fontSize * 0.35}
          textAnchor="middle"
          fontSize={fontSize}
          fontFamily="Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto"
          fill="none"
          stroke={wireColor}
          strokeWidth={2.5}
          filter={`url(#${glowId})`}
        >
          {letter}
        </text>
      </g>

      {/* worker + sparks "travel" across the letter width in sync with the reveal */}
      <g
        style={{
          transformBox: "fill-box",
          transformOrigin: "0 0",
          transform: "translateX(0)",
          animation: `workerWalk ${duration}s ease forwards`,
          animationDelay: `${delay}s`,
        }}
      >
        {/* position baseline near the letter centerline */}
        <g transform={`translate(${w * 0.1}, ${(h / 2) + fontSize * 0.15})`}>
          {/* cable back to a pack */}
          <path d={`M -16 6 C -24 10, -26 2, -32 4`} fill="none" stroke={wireColor} strokeWidth={1.5} />

          {/* tiny worker (helmet + body) */}
          <g stroke={wireColor} fill={wireColor} strokeWidth={1.6}>
            {/* helmet */}
            <path d="M0 -12 a6 6 0 0 1 12 0 v2 h-12z" />
            {/* body */}
            <line x1={6} y1={-10} x2={6} y2={6} />
            {/* legs */}
            <line x1={6} y1={6} x2={0} y2={14} />
            <line x1={6} y1={6} x2={12} y2={14} />
            {/* arm + iron tip */}
            <line x1={6} y1={-2} x2={16} y2={-2} />
            <circle cx={18} cy={-2} r={2} />
          </g>

          {/* sparks near the iron tip */}
          <g transform="translate(18,-2)">
            <circle r="1.6" fill={wireColor} style={{ animation: `flicker 0.8s linear infinite`, filter: `url(#${glowId})` }} />
            <circle r="1.1" cx="4" cy="-2" fill={wireColor} style={{ animation: `flicker 0.9s linear infinite` }} />
            <circle r="1.2" cx="-3" cy="1" fill={wireColor} style={{ animation: `flicker 0.7s linear infinite` }} />
          </g>
        </g>
      </g>
    </svg>
  );
}
