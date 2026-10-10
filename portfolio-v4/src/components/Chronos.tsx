"use client";

import { useEffect, useRef, useState } from "react";
import "./chronos.css";

// Port of views/partials/chronos.ejs (the version switcher on v1–v3). Keep the two in sync.
const VERSIONS = [
  { id: "v4", title: "The AI Orchestrator", subtitle: "Leading Current Logic (2026-Present)", url: "/v4/", container: "0xNEXT_15_CORE", color: "#d946ef" },
  { id: "v3", title: "Full-Stack Integration", subtitle: "Scaling Production (2020-2026)", url: "/v3/landingPage", container: "0xEXPRESS_EJS", color: "#818cf8" },
  { id: "v2", title: "The Impact Pivot", subtitle: "First Growth Phase (2017-2019)", url: "/v2/landingPage", container: "0xHEROKU_LEGACY", color: "#2dd4bf" },
  { id: "v1", title: "The Creative Origin", subtitle: "Academic Genesis (2009-2016)", url: "/v1/landingPage", container: "0xSTATIC_ASSETS", color: "rgba(255,255,255,0.4)" },
];
const CURRENT = "v4";

const CHIP_PATH =
  "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z";

type Log = { ts: string; msg: string };

export default function Chronos() {
  const [open, setOpen] = useState(false);
  const [logs, setLogs] = useState<Log[] | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const pending = timers.current;
    return () => {
      window.removeEventListener("keydown", onKey);
      pending.forEach(clearTimeout);
    };
  }, []);

  function travel(v: (typeof VERSIONS)[number]) {
    setOpen(false);
    setLogs([]);
    const sequence = [
      "[SYSTEM]: Intercepting temporal routing...",
      '[SYSTEM]: Querying MCP State = "ACTIVE"',
      `[MCP]: Re-initializing persona -> ${v.title}`,
      "[MCP]: Locating legacy container registry...",
      `[SYS_LOG]: Container [${v.container}] found. Waking instance...`,
      "[TELEMETRY]: Establishing Neural Link... SUCCESS.",
      "[SYSTEM]: Transferring viewport. Stand by...",
    ];
    sequence.forEach((msg, i) => {
      timers.current.push(
        setTimeout(() => {
          const ts = new Date().toISOString().split("T")[1].slice(0, 11);
          setLogs((l) => [...(l ?? []), { ts, msg }]);
        }, (i + 1) * 400),
      );
    });
    timers.current.push(setTimeout(() => (window.location.href = v.url), (sequence.length + 1) * 400 + 500));
  }

  return (
    <>
      <div id="chronos-orb">
        <div id="chronos-panel" className={open ? "open" : ""}>
          <div className="chronos-header">
            <h4>
              <span className="pulse-dot" /> Chronos Node
            </h4>
            <p>MCP Connection: Active // 12+ Years Total Experience</p>
          </div>
          <div className="chronos-list">
            {VERSIONS.map((v) => {
              const current = v.id === CURRENT;
              return (
                <button
                  key={v.id}
                  type="button"
                  className={`chronos-item${current ? " current" : ""}`}
                  aria-current={current ? "page" : undefined}
                  onClick={current ? undefined : () => travel(v)}
                >
                  <div className="chronos-icon">
                    <svg fill="none" stroke={v.color} viewBox="0 0 24 24" style={{ width: "1rem", height: "1rem" }} aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={CHIP_PATH} />
                    </svg>
                  </div>
                  <div className="chronos-label">
                    <h5>
                      {v.title}
                      {current && <span className="chronos-active-badge">Active</span>}
                    </h5>
                    <p>
                      {v.id} {"//"} {v.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        <button
          id="chronos-btn"
          type="button"
          className={open ? "active" : ""}
          onClick={() => setOpen((o) => !o)}
          aria-label="Version Switcher"
          aria-expanded={open}
        >
          <div id="chronos-spinner" />
          <div id="chronos-btn-inner">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={CHIP_PATH} />
            </svg>
          </div>
        </button>
      </div>

      <div id="chronos-overlay" className={logs ? "active" : ""} aria-live="polite">
        <div className="scanlines" />
        <div id="chronos-terminal">
          <div className="chronos-term-header">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>MCP_KERNEL_v4.2.0</span>
          </div>
          <div id="chronos-logs">
            {logs?.map((l, i) => (
              <div key={i} className="chronos-log-line">
                <span className="chronos-log-ts">{l.ts}</span>
                <span className={`chronos-log-msg${l.msg.includes("SUCCESS") ? " success" : ""}`}>{l.msg}</span>
              </div>
            ))}
          </div>
          <div id="chronos-cursor" />
        </div>
      </div>
    </>
  );
}
