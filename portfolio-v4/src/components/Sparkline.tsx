type Props = { values: number[]; label: string; width?: number; height?: number };

/** Tiny SVG sparkline. The `label` is the accessible text summary of the trend. */
export default function Sparkline({ values, label, width = 120, height = 32 }: Props) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const step = width / (values.length - 1);
  const pts = values.map((v, i) => [i * step, height - 2 - ((v - min) / span) * (height - 4)] as const);
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const [lx, ly] = pts[pts.length - 1];
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label={label} className="overflow-visible">
      <path d={`${d} L${width} ${height} L0 ${height} Z`} fill="var(--color-signal)" opacity="0.08" />
      <path d={d} fill="none" stroke="var(--color-signal)" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx={lx} cy={ly} r="2.5" fill="var(--color-signal)" />
    </svg>
  );
}
