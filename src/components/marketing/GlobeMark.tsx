import { cn } from '@/lib/cn'

/**
 * Engraved-globe artwork for the hero.
 *
 * Line art rather than photography: the register of a share certificate or a
 * passport page, which is the visual language this audience associates with
 * institutions. Draws itself in on load, and sits still afterwards.
 *
 * Pure SVG — no network request, sharp at any size, themed from design tokens.
 */
export function GlobeMark({ className }: { className?: string }) {
  // Parallels as ellipses of decreasing width, evenly spaced on the sphere.
  const parallels = [
    { cy: 70, rx: 96, ry: 11 },
    { cy: 110, rx: 118, ry: 14 },
    { cy: 150, rx: 126, ry: 15 },
    { cy: 190, rx: 118, ry: 14 },
    { cy: 230, rx: 96, ry: 11 },
  ]

  // Meridians as ellipses of decreasing height, rotated about the centre.
  const meridians = [8, 34, 60, 86, 112]

  return (
    <svg
      viewBox="0 0 300 300"
      role="img"
      aria-label="A globe, marking cross-border tax obligations"
      className={cn('h-auto w-full', className)}
    >
      <defs>
        <linearGradient id="gm-sphere" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.09" />
          <stop offset="55%" stopColor="var(--color-accent)" stopOpacity="0.02" />
          <stop offset="100%" stopColor="var(--color-ink-800)" stopOpacity="0.05" />
        </linearGradient>

        <radialGradient id="gm-glow" cx="34%" cy="26%" r="72%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>

        {/* Clips the arc so it reads as passing behind the sphere. */}
        <clipPath id="gm-clip">
          <circle cx="150" cy="150" r="126" />
        </clipPath>
      </defs>

      <g className="gm-draw">
        {/* sphere */}
        <circle cx="150" cy="150" r="126" fill="url(#gm-sphere)" />
        <circle
          cx="150"
          cy="150"
          r="126"
          fill="none"
          stroke="var(--color-ink-800)"
          strokeOpacity="0.28"
          strokeWidth="1"
        />

        <g
          clipPath="url(#gm-clip)"
          fill="none"
          stroke="var(--color-ink-800)"
          strokeOpacity="0.16"
          strokeWidth="0.9"
        >
          {parallels.map((p) => (
            <ellipse key={p.cy} cx="150" cy={p.cy} rx={p.rx} ry={p.ry} />
          ))}
          {meridians.map((rx) => (
            <ellipse key={rx} cx="150" cy="150" rx={rx} ry="126" />
          ))}
          <line x1="24" y1="150" x2="276" y2="150" strokeOpacity="0.2" />
          <line x1="150" y1="24" x2="150" y2="276" strokeOpacity="0.2" />
        </g>

        {/* highlight */}
        <circle cx="150" cy="150" r="126" fill="url(#gm-glow)" />

        {/* The journey: a filer abroad, and an obligation that follows them. */}
        <path
          d="M74 196 C 108 128, 196 104, 236 118"
          fill="none"
          stroke="var(--color-accent)"
          strokeOpacity="0.75"
          strokeWidth="1.4"
          strokeDasharray="3 4"
          strokeLinecap="round"
          className="gm-arc"
        />

        <g className="gm-pins">
          <circle cx="74" cy="196" r="4.5" fill="var(--color-accent)" />
          <circle
            cx="74"
            cy="196"
            r="10"
            fill="none"
            stroke="var(--color-accent)"
            strokeOpacity="0.35"
          />
          <circle cx="236" cy="118" r="4.5" fill="var(--color-ink-800)" />
          <circle
            cx="236"
            cy="118"
            r="10"
            fill="none"
            stroke="var(--color-ink-800)"
            strokeOpacity="0.28"
          />
        </g>
      </g>

      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .gm-draw { animation: gm-fade 1200ms ease-out both; animation-delay: 280ms; }
          .gm-arc {
            stroke-dashoffset: 240;
            animation: gm-trace 1600ms cubic-bezier(0.22,1,0.36,1) both;
            animation-delay: 900ms;
          }
          .gm-pins { animation: gm-fade 900ms ease-out both; animation-delay: 1500ms; }
        }
        @keyframes gm-fade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes gm-trace { from { stroke-dashoffset: 240 } to { stroke-dashoffset: 0 } }
      `}</style>
    </svg>
  )
}
