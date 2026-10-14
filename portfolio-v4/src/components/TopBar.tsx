import Link from "next/link";
import { profile } from "@/lib/profile";

const NAV = [
  { href: "/#runs", label: "Runs" },
  { href: "/#work", label: "Work" },
  { href: "/#builds", label: "Builds" },
  { href: "/#governance", label: "Governance" },
  { href: "/#ask", label: "Ask" },
];

export default function TopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-sm">
      <div className="mx-auto flex h-12 max-w-[88rem] items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="label whitespace-nowrap !text-ink">
          {profile.person.shortName}
          <span className="hidden text-faint sm:inline"> / AI Orchestrator</span>
        </Link>
        <span aria-hidden className="hidden h-px flex-1 bg-line md:block" />
        <nav aria-label="Primary" className="ml-auto flex items-center gap-4 md:ml-0">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="label hidden hover:!text-signal sm:inline">
              {n.label}
            </Link>
          ))}
          <a href="/v4/resume" className="label border border-line-strong px-2 py-1 hover:border-signal hover:!text-signal">
            Resume
          </a>
        </nav>
        {profile.person.available && (
          <span className="label hidden items-center gap-2 lg:flex">
            <span className="dot" aria-hidden /> available
          </span>
        )}
      </div>
    </header>
  );
}
