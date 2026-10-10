"use client";

import { useState } from "react";

export default function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          /* clipboard unavailable — the text is still selectable */
        }
      }}
      className="label shrink-0 border border-line-strong px-2 py-1 hover:border-signal hover:text-signal"
    >
      <span aria-live="polite">{copied ? "Copied" : label}</span>
    </button>
  );
}
