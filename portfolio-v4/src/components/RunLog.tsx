"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/profile";

type Tone = "cmd" | "step" | "ok" | "stop";
type Line = { id: number; text: string; tone: Tone };

const MAX_LINES = 13;

function linesFor(run: (typeof profile.runs)[number]): Omit<Line, "id">[] {
  return [
    { text: `$ run ${run.id}`, tone: "cmd" },
    ...run.steps.map((s) => ({ text: `  → ${s}`, tone: "step" as const })),
    run.hitl
      ? { text: `  ■ hitl: ${run.result}`, tone: "stop" as const }
      : { text: `  ✓ ${run.result} · ${run.duration}`, tone: "ok" as const },
  ];
}

// Server render + reduced motion: the first runs, fully printed.
const STATIC: Line[] = profile.runs.slice(-2)
  .flatMap(linesFor)
  .slice(-MAX_LINES)
  .map((l, i) => ({ ...l, id: i }));

const toneClass: Record<Tone, string> = {
  cmd: "text-ink",
  step: "text-muted",
  ok: "text-ok",
  stop: "text-stop",
};

/** Replays the agent workflows from profile.runs as a terminal log. */
export default function RunLog() {
  const [lines, setLines] = useState<Line[]>(STATIC);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const script = profile.runs.flatMap(linesFor);
    let i = 0;
    let n = 1000;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const next = script[i % script.length];
      setLines((prev) => [...prev, { ...next, id: n++ }].slice(-MAX_LINES));
      i++;
      const pause = next.tone === "stop" ? 2600 : next.tone === "ok" ? 900 : next.tone === "cmd" ? 380 : 520;
      timer = setTimeout(tick, pause);
    };
    timer = setTimeout(() => {
      setLive(true);
      setLines([]);
      tick();
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-full flex-col">
      <div
        className="flex-1 overflow-hidden font-mono text-[12.5px] leading-6"
        style={{ minHeight: `${MAX_LINES * 1.5}rem` }}
        aria-hidden
      >
        {lines.map((l, idx) => (
          <div key={l.id} className={`${toneClass[l.tone]} ${live ? "line-in" : ""} ${live && idx === lines.length - 1 ? "caret" : ""} whitespace-pre-wrap`}>
            {l.text}
          </div>
        ))}
      </div>
      {/* Machine/screen-reader summary of what the log shows */}
      <p className="sr-only">
        Simulated replay of agent workflows Dave has built: {profile.runs.map((r) => r.id.replaceAll("_", " ")).join(", ")}. Each
        run ends at a human-in-the-loop checkpoint where required.
      </p>
    </div>
  );
}
