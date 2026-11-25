interface FernProps {
  className?: string;
  /** Mirror horizontally so the frond points the other way. */
  flip?: boolean;
}

const LEAFLETS = 16;

/**
 * Decorative fern frond (chalkboard-menu style). Pure SVG, no image asset:
 * a curved stem with leaflets that shrink towards the tip.
 */
export function Fern({ className = '', flip = false }: FernProps) {
  const leaflets = Array.from({ length: LEAFLETS }, (_, i) => {
    const t = i / (LEAFLETS - 1);
    const y = 300 - t * 270; // along the stem, base → tip
    const x = 60 + Math.sin(t * 1.4) * 22; // stem curve
    const len = 70 * (1 - t * 0.8) + 8;
    const angle = 52 - t * 18;
    return { x, y, len, angle, key: i };
  });

  return (
    <svg
      className={`fern ${className}`}
      viewBox="0 0 160 320"
      aria-hidden="true"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <path d="M60 318 C 70 230, 84 120, 82 20" className="fern-stem" fill="none" />
      {leaflets.map((l) => (
        <g key={l.key} transform={`translate(${l.x} ${l.y})`}>
          <ellipse className="fern-leaf" cx={l.len / 2} cy={0} rx={l.len / 2} ry={l.len / 7} transform={`rotate(${-l.angle})`} />
          <ellipse
            className="fern-leaf fern-leaf-dark"
            cx={-l.len / 2}
            cy={0}
            rx={l.len / 2}
            ry={l.len / 7}
            transform={`rotate(${l.angle})`}
          />
        </g>
      ))}
    </svg>
  );
}
