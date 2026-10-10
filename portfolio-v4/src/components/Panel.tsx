import type { ReactNode } from "react";

type Props = {
  index?: string;
  label: string;
  status?: ReactNode;
  className?: string;
  as?: "section" | "article" | "div" | "aside";
  id?: string;
  labelledBy?: string;
  children: ReactNode;
};

/** A console panel: mono header bar (`01 / RUNS ──── ● live`) over a content area. */
export default function Panel({ index, label, status, className = "", as: Tag = "section", id, labelledBy, children }: Props) {
  return (
    <Tag id={id} aria-labelledby={labelledBy} className={`flex flex-col ${className}`}>
      <div className="flex items-center gap-3 border-b border-line px-4 py-2.5 sm:px-5">
        <span className="label whitespace-nowrap">
          {index && <span className="text-faint">{index} / </span>}
          {label}
        </span>
        <span aria-hidden className="h-px flex-1 bg-line" />
        {status && <span className="label flex min-w-0 items-center gap-2 truncate whitespace-nowrap">{status}</span>}
      </div>
      <div className="flex-1 p-4 sm:p-5">{children}</div>
    </Tag>
  );
}
