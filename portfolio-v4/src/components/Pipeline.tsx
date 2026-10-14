type Props = { steps: string[] };

/** Agent pipeline rendered as console nodes. Steps containing review/decision/gate are human checkpoints. */
export default function Pipeline({ steps }: Props) {
  const isHuman = (s: string) => /review|decision|hitl|gate|approve/.test(s);
  return (
    <ol className="flex flex-wrap items-center gap-y-3 font-mono text-xs" aria-label="Pipeline steps">
      {steps.map((s, i) => (
        <li key={s} className="flex items-center">
          <span
            className={`border px-2.5 py-1.5 ${isHuman(s) ? "border-stop/60 text-stop" : "border-line-strong text-ink"}`}
          >
            {isHuman(s) && <span className="sr-only">Human checkpoint: </span>}
            {s}
          </span>
          {i < steps.length - 1 && (
            <span aria-hidden className="px-1.5 text-faint">
              ──▶
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
