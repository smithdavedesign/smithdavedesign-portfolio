"use client";

import { useId, useState } from "react";

const WORK_WEEKS = 46;
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const pct = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

type Field = { key: keyof Inputs; label: string; min: number; max: number; step: number; fmt: (n: number) => string };
type Inputs = { engineers: number; hoursSaved: number; hourlyCost: number; lift: number; seatCost: number; enablement: number };

const FIELDS: Field[] = [
  { key: "engineers", label: "Engineers", min: 5, max: 1000, step: 5, fmt: (n) => `${n}` },
  { key: "hoursSaved", label: "Hours saved / eng / week", min: 0.5, max: 10, step: 0.5, fmt: (n) => `${n} h` },
  { key: "hourlyCost", label: "Loaded hourly cost", min: 40, max: 250, step: 5, fmt: (n) => usd.format(n) },
  { key: "lift", label: "Productivity lift (optional)", min: 0, max: 20, step: 1, fmt: (n) => `${n}%` },
  { key: "seatCost", label: "AI seat cost / month", min: 0, max: 100, step: 1, fmt: (n) => usd.format(n) },
  { key: "enablement", label: "Enablement & tooling (one-time)", min: 0, max: 250000, step: 5000, fmt: (n) => usd.format(n) },
];

/** ROI = (Total Value Generated − Total Investment) / Total Investment × 100, over one year. */
export default function RoiCalculator() {
  const id = useId();
  const [v, setV] = useState<Inputs>({ engineers: 100, hoursSaved: 2, hourlyCost: 95, lift: 0, seatCost: 39, enablement: 40000 });

  const laborSavings = v.engineers * v.hoursSaved * WORK_WEEKS * v.hourlyCost;
  const liftValue = v.engineers * 40 * WORK_WEEKS * v.hourlyCost * (v.lift / 100);
  const value = laborSavings + liftValue;
  const investment = v.engineers * v.seatCost * 12 + v.enablement;
  const roi = investment > 0 ? ((value - investment) / investment) * 100 : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,18rem)]">
      <form className="grid gap-x-6 gap-y-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()} aria-label="ROI inputs">
        {FIELDS.map((f) => (
          <div key={f.key} className="flex flex-col gap-1.5">
            <label htmlFor={`${id}-${f.key}`} className="flex justify-between gap-2 font-mono text-xs">
              <span className="text-muted">{f.label}</span>
              <output htmlFor={`${id}-${f.key}`} className="text-ink tabular-nums">
                {f.fmt(v[f.key])}
              </output>
            </label>
            <input
              id={`${id}-${f.key}`}
              type="range"
              min={f.min}
              max={f.max}
              step={f.step}
              value={v[f.key]}
              onChange={(e) => setV((p) => ({ ...p, [f.key]: Number(e.target.value) }))}
            />
          </div>
        ))}
      </form>

      <div className="flex flex-col justify-between gap-4 border border-line bg-raised p-4" aria-live="polite">
        <div>
          <p className="label">Annual ROI</p>
          <p className="mt-1 font-mono text-5xl font-medium tracking-tight text-signal tabular-nums">
            {roi >= 0 ? "+" : ""}
            {pct.format(roi)}%
          </p>
        </div>
        <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 font-mono text-xs tabular-nums">
          <dt className="text-muted">Labor savings</dt>
          <dd className="text-right">{usd.format(laborSavings)}</dd>
          <dt className="text-muted">Productivity lift</dt>
          <dd className="text-right">{usd.format(liftValue)}</dd>
          <dt className="text-muted">Investment</dt>
          <dd className="text-right">−{usd.format(investment)}</dd>
          <dt className="border-t border-line pt-1 text-ink">Net value</dt>
          <dd className="border-t border-line pt-1 text-right text-ink">{usd.format(value - investment)}</dd>
        </dl>
        <p className="font-mono text-[11px] leading-relaxed text-faint">
          ROI = (value − investment) ÷ investment × 100. Value = hours saved × hourly cost × {WORK_WEEKS} wks + lift.
          Illustrative inputs — set them to your org.
        </p>
      </div>
    </div>
  );
}
