"use client";

import { useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };
type ToolEvent = { name: string };

const SUGGESTIONS = [
  "What ROI has Dave's AI work produced?",
  "How does he gate agents with human-in-the-loop?",
  "What did the KT series teach?",
  "Is he a fit for an AI platform lead role?",
];

const ENDPOINT = "/v4/api/chat";

/** "Ask my resume" — streams from the Express chat route, which calls Claude with the same tools as the MCP server. */
export default function AskConsole() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [tools, setTools] = useState<ToolEvent[]>([]);
  const [model, setModel] = useState<{ id: string; name: string } | null>(null);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scroller = useRef<HTMLDivElement>(null);

  async function ask(question: string) {
    const q = question.trim();
    if (!q || busy) return;
    const history: Msg[] = [...messages, { role: "user", content: q }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setTools([]);
    setModel(null);
    setError(null);
    setBusy(true);

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.slice(-6) }),
      });
      if (res.status === 429) throw new Error("Rate limit reached — try again in a few minutes, or email Dave directly.");
      if (!res.ok || !res.body) throw new Error("The assistant is offline right now. Email Dave directly.");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const events = buf.split("\n\n");
        buf = events.pop() ?? "";
        for (const evt of events) {
          const data = evt.replace(/^data: /, "");
          if (!data) continue;
          const msg = JSON.parse(data) as { type: string; text?: string; name?: string; id?: string; message?: string };
          if (msg.type === "text" && msg.text) {
            setMessages((m) => {
              const copy = m.slice();
              const last = copy[copy.length - 1];
              copy[copy.length - 1] = { ...last, content: last.content + msg.text };
              return copy;
            });
            scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
          } else if (msg.type === "model" && msg.id && msg.name) {
            setModel({ id: msg.id, name: msg.name });
          } else if (msg.type === "reset") {
            // Local model failed before answering; the paid fallback starts over.
            setTools([]);
            setMessages((m) => [...m.slice(0, -1), { role: "assistant", content: "" }]);
          } else if (msg.type === "tool" && msg.name) {
            setTools((t) => [...t, { name: msg.name! }]);
          } else if (msg.type === "error") {
            throw new Error(msg.message ?? "Something went wrong.");
          }
        }
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setMessages((m) => (m[m.length - 1]?.content ? m : m.slice(0, -1)));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex h-full flex-col gap-3">
      <div
        ref={scroller}
        className="flex max-h-80 min-h-40 flex-1 flex-col gap-3 overflow-y-auto font-mono text-[13px] leading-relaxed"
        aria-live="polite"
      >
        {messages.length === 0 && (
          <p className="text-muted">
            Ask anything about Dave&apos;s work. Answers are grounded in his profile through MCP tools and routed local-first: a model on
            Dave&apos;s own AI stack, with Claude as the paid fallback.
          </p>
        )}
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-signal" : "whitespace-pre-wrap text-ink"}>
            <span className="text-faint">{m.role === "user" ? "> " : ""}</span>
            {m.content || (busy && i === messages.length - 1 ? <span className="caret text-muted">thinking</span> : null)}
          </div>
        ))}
        {tools.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tools.map((t, i) => (
              <span key={i} className="border border-line-strong px-1.5 py-0.5 text-[11px] text-muted">
                tool: {t.name}
              </span>
            ))}
          </div>
        )}
        {model && (
          <p className="text-[11px] text-faint">
            <span className={`dot mr-2 align-middle ${model.id === "local" ? "" : "!bg-signal"}`} data-tone={model.id === "local" ? undefined : "signal"} aria-hidden />
            answered by {model.name}
          </p>
        )}
        {error && <p className="text-stop">{error}</p>}
      </div>

      {messages.length === 0 && (
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => ask(s)}
              className="border border-line-strong px-2.5 py-1.5 text-left font-mono text-xs text-muted hover:border-signal hover:text-ink"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        className="flex items-center gap-2 border border-line-strong bg-bg px-3 focus-within:border-signal"
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
      >
        <span aria-hidden className="font-mono text-signal">
          &gt;
        </span>
        <label htmlFor="ask-input" className="sr-only">
          Ask about Dave&apos;s experience
        </label>
        <input
          id="ask-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={500}
          placeholder="ask about experience, ROI, governance…"
          className="min-w-0 flex-1 bg-transparent py-2.5 font-mono text-sm text-ink placeholder:text-faint focus:outline-none"
          autoComplete="off"
        />
        <button type="submit" disabled={busy || !input.trim()} className="label py-2 hover:text-signal disabled:opacity-40">
          Run
        </button>
      </form>
    </div>
  );
}
