import Link from "next/link";
import Panel from "@/components/Panel";
import RunLog from "@/components/RunLog";
import Sparkline from "@/components/Sparkline";
import RoiCalculator from "@/components/RoiCalculator";
import AskConsole from "@/components/AskConsole";
import CopyButton from "@/components/CopyButton";
import Pipeline from "@/components/Pipeline";
import BuildCard from "@/components/BuildCard";
import { profile, MCP_URL, SITE_URL } from "@/lib/profile";

const { person, contact, metrics, caseStudies, ktSeries, governance, stack, pillars, builds } = profile;

const featured = caseStudies.slice(0, 3);
const more = caseStudies.slice(3);
const mcpCommand = `claude mcp add --transport http dave-smith ${MCP_URL}`;

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  alternateName: person.shortName,
  jobTitle: person.title,
  description: person.thesis,
  email: `mailto:${contact.email}`,
  url: `${SITE_URL}/v4/`,
  worksFor: { "@type": "Organization", name: person.employer },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Sonoma State University" },
  sameAs: [contact.linkedin, contact.github],
  knowsAbout: ["AI orchestration", "Model Context Protocol", "Agentic workflows", "Human-in-the-loop governance", "AI ROI measurement", "Engineering management", ...stack.map((s) => s.name)],
};

export default function Home() {
  return (
    <main id="main" className="mx-auto max-w-[88rem] px-4 pb-16 pt-6 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />

      {/* ── B1: Hero + live runs ───────────────────────────── */}
      <div id="runs" className="console-grid lg:grid-cols-12">
        <header className="blueprint flex flex-col justify-between gap-10 p-6 sm:p-8 lg:col-span-7 lg:p-10">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="label">{person.name}</span>
            <span className="label text-faint">{person.roles.join(" · ")}</span>
          </div>
          <div>
            <p className="label mb-4 !text-signal">{person.title}</p>
            <h1 className="max-w-[18ch] text-[clamp(2.4rem,6vw,5.25rem)] font-semibold leading-[0.95] tracking-[-0.035em]">
              {person.headline}
            </h1>
          </div>
          <p className="max-w-[60ch] text-base leading-relaxed text-muted sm:text-lg">{person.thesis}</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/#work" className="bg-signal px-4 py-2.5 font-mono text-xs font-medium uppercase tracking-widest text-bg hover:bg-ink">
              See the work
            </Link>
            <Link href="/#ask" className="border border-line-strong px-4 py-2.5 font-mono text-xs uppercase tracking-widest hover:border-signal hover:text-signal">
              Interview my agent
            </Link>
          </div>
        </header>
        <Panel
          as="aside"
          index="01"
          label="Agent runs"
          className="lg:col-span-5"
          status={
            <>
              <span className="dot" aria-hidden /> replay
            </>
          }
        >
          <RunLog />
        </Panel>
      </div>

      {/* ── B2: ROI pulse ─────────────────────────────────── */}
      <section aria-labelledby="impact-h" className="mt-px">
        <h2 id="impact-h" className="sr-only">
          Measured impact
        </h2>
        <div className="console-grid sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <article key={m.id} className="flex flex-col gap-3 p-5">
              <p className="label">
                <span className="text-faint">0{i + 2} / </span>
                {m.label}
              </p>
              <div className="flex items-end justify-between gap-4">
                <p className="whitespace-nowrap font-mono text-4xl font-medium tracking-tight tabular-nums xl:text-5xl">{m.value}</p>
                <Sparkline values={m.spark} label={`Trend: ${m.label}`} />
              </div>
              <p className="text-sm leading-snug text-muted">{m.context}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="console-grid mt-px">
        <Panel index="06" label="ROI model" labelledBy="roi-h" status={<span className="text-faint">(value − investment) ÷ investment</span>}>
          <h2 id="roi-h" className="mb-5 text-xl font-semibold tracking-tight">
            What is AI actually worth to your team?
          </h2>
          <RoiCalculator />
        </Panel>
      </div>

      {/* ── B3: Assistant ─────────────────────────────────── */}
      <div id="ask" className="console-grid mt-px lg:grid-cols-12">
        <Panel
          index="07"
          label="Ask my resume"
          labelledBy="ask-h"
          className="lg:col-span-7"
          status={
            <>
              <span className="dot" aria-hidden /> local-first + mcp
            </>
          }
        >
          <h2 id="ask-h" className="sr-only">
            Ask my resume
          </h2>
          <AskConsole />
        </Panel>
        <Panel index="08" label="Bring it to your own agent" labelledBy="mcp-h" className="lg:col-span-5">
          <h2 id="mcp-h" className="text-xl font-semibold tracking-tight">
            Interview me from your own Claude.
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            The assistant on the left runs on a public MCP server. Add it to Claude Code (or any MCP client) and ask about my
            experience, metrics and case studies in your own tools.
          </p>
          <div className="mt-4 flex items-start gap-2 border border-line bg-bg p-3">
            <code className="min-w-0 flex-1 break-all font-mono text-xs leading-relaxed text-ink">{mcpCommand}</code>
            <CopyButton text={mcpCommand} />
          </div>
          <p className="label mt-5 mb-2">Exposed tools</p>
          <ul className="grid grid-cols-1 gap-1 font-mono text-xs text-muted sm:grid-cols-2">
            {["get_experience_summary", "retrieve_roi_metrics", "list_case_studies", "get_case_study", "list_builds", "get_build", "get_stack", "get_contact"].map((t) => (
              <li key={t}>
                <span className="text-signal">ƒ</span> {t}
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {/* ── Pillars ───────────────────────────────────────── */}
      <section aria-labelledby="pillars-h" className="mt-px">
        <h2 id="pillars-h" className="sr-only">
          Three pillars
        </h2>
        <div className="console-grid md:grid-cols-3">
          {pillars.map((p, i) => (
            <article key={p.id} className="p-5">
              <p className="label">
                <span className="text-faint">P{i + 1} / </span>
                pillar
              </p>
              <h3 className="mt-3 text-lg font-semibold tracking-tight">{p.name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Case studies ──────────────────────────────────── */}
      <section id="work" aria-labelledby="work-h" className="mt-16">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
          <h2 id="work-h" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            High-ROI orchestration
          </h2>
          <p className="label">Action · Tooling · Metric</p>
        </div>
        <div className="console-grid lg:grid-cols-3">
          {featured.map((c) => (
            <article key={c.slug} className="group relative flex flex-col">
              <div className="flex items-center gap-3 border-b border-line px-5 py-2.5">
                <span className="label">
                  <span className="text-faint">case / </span>
                  {c.code}
                </span>
                <span aria-hidden className="h-px flex-1 bg-line" />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-5">
                <h3 className="text-xl font-semibold leading-tight tracking-tight">
                  <Link href={`/work/${c.slug}/`} className="after:absolute after:inset-0 group-hover:text-signal">
                    {c.title}
                  </Link>
                </h3>
                <p className="text-sm text-muted">{c.headline}</p>
                <dl className="mt-auto grid gap-3 text-sm">
                  <div>
                    <dt className="label mb-1">Action</dt>
                    <dd className="leading-snug">{c.action}</dd>
                  </div>
                  <div>
                    <dt className="label mb-1">Tooling</dt>
                    <dd className="font-mono text-xs text-muted">{c.tooling.join(" · ")}</dd>
                  </div>
                  <div className="border-l-2 border-signal pl-3">
                    <dt className="label mb-1 !text-signal">Metric</dt>
                    <dd className="leading-snug">{c.metric}</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
        <div className="console-grid mt-px md:grid-cols-2">
          {more.map((c) => (
            <article key={c.slug} className="group relative flex flex-col gap-3 p-5">
              <p className="label">
                <span className="text-faint">case / </span>
                {c.code}
              </p>
              <h3 className="text-lg font-semibold tracking-tight">
                <Link href={`/work/${c.slug}/`} className="after:absolute after:inset-0 group-hover:text-signal">
                  {c.title}
                </Link>
              </h3>
              <p className="text-sm leading-relaxed text-muted">{c.metric}</p>
              <Pipeline steps={c.pipeline} />
            </article>
          ))}
        </div>
      </section>

      {/* ── Builds: shipped side projects ────────────────── */}
      <section id="builds" aria-labelledby="builds-h" className="mt-16">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
          <h2 id="builds-h" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Things I&apos;ve built
          </h2>
          <p className="label">screenshots from the real apps</p>
        </div>
        <div className="console-grid lg:grid-cols-6">
          {builds.map((b, i) => (
            <div key={b.slug} className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}>
              <BuildCard build={b} index={i} large={i < 2} />
            </div>
          ))}
        </div>
      </section>

      {/* ── B5: Leadership — KT series ───────────────────── */}
      <section aria-labelledby="kt-h" className="mt-16">
        <div className="console-grid">
          <Panel index="09" label="Force multiplier" as="div">
            <h2 id="kt-h" className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {ktSeries.title}
            </h2>
            <p className="mt-2 max-w-[70ch] text-sm leading-relaxed text-muted">
              Tools don&apos;t scale an org — people who can build tools do. The KT series turned engineers into MCP builders, with
              governance designed in from module one.
            </p>
            <ol className="console-grid mt-6 sm:grid-cols-2 lg:grid-cols-5">
              {ktSeries.modules.map((m) => (
                <li key={m.n} className="flex flex-col gap-2 p-4">
                  <span className="font-mono text-2xl text-signal">{m.n}</span>
                  <span className="font-medium">{m.name}</span>
                  <span className="text-sm leading-snug text-muted">{m.body}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 font-mono text-xs text-muted">
              Outcome: <span className="text-ink">10+ internal agent tools shipped · 40% less rote developer work</span>
            </p>
          </Panel>
        </div>
      </section>

      {/* ── Governance ladder ─────────────────────────────── */}
      <section id="governance" aria-labelledby="gov-h" className="mt-16">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
          <h2 id="gov-h" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Ethical stewardship
          </h2>
          <p className="label">Coding for Good → agent governance</p>
        </div>
        <div className="console-grid lg:grid-cols-12">
          <div className="p-5 lg:col-span-8">
            <p className="max-w-[65ch] text-sm leading-relaxed text-muted">{governance.intro}</p>
            <ol className="mt-5 flex flex-col">
              {governance.levels.map((l, i) => (
                <li key={l.level} className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-line py-4 sm:grid-cols-[3.5rem_1fr_11rem]">
                  <span className="font-mono text-xl text-signal" style={{ paddingLeft: `${i * 0.35}rem` }}>
                    {l.level}
                  </span>
                  <div>
                    <p className="font-medium">{l.name}</p>
                    <p className="mt-0.5 text-sm leading-snug text-muted">{l.body}</p>
                  </div>
                  <p className="col-start-2 font-mono text-xs text-stop sm:col-start-3 sm:text-right">
                    <span className="dot mr-2 align-middle" data-tone="stop" aria-hidden />
                    HITL: {l.hitl}
                  </p>
                </li>
              ))}
            </ol>
          </div>
          <Panel as="aside" label="Operating principles" className="lg:col-span-4">
            <ul className="flex flex-col gap-3 text-sm">
              {governance.principles.map((p) => (
                <li key={p} className="flex gap-3">
                  <span aria-hidden className="font-mono text-signal">■</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </section>

      {/* ── B4: Stack ─────────────────────────────────────── */}
      <section aria-labelledby="stack-h" className="mt-16">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
          <h2 id="stack-h" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Stack, and why
          </h2>
          <p className="label">hover or focus for rationale</p>
        </div>
        <ul className="console-grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          {stack.map((s, i) => (
            <li key={s.name} className="tip">
              <button
                type="button"
                aria-describedby={`why-${i}`}
                className="flex h-full w-full flex-col items-start gap-2 p-4 text-left hover:bg-raised focus:bg-raised"
              >
                <span className="label !text-faint">{s.group}</span>
                <span className="font-medium leading-tight">{s.name}</span>
              </button>
              <span role="tooltip" id={`why-${i}`} className="border border-line-strong bg-raised p-3 text-xs leading-relaxed text-muted shadow-xl">
                <span className="label mb-1 block !text-signal">Why</span>
                {s.why}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Contact ───────────────────────────────────────── */}
      <footer id="contact" className="mt-16">
        <div className="console-grid lg:grid-cols-12">
          <div className="p-6 sm:p-8 lg:col-span-8">
            <p className="label mb-3 !text-signal">Open to conversations</p>
            <h2 className="max-w-[24ch] text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              If your work sits at the intersection of AI tooling, engineering leadership and product — let&apos;s talk.
            </h2>
            <p className="mt-4 max-w-[65ch] text-sm leading-relaxed text-muted">{person.origin}</p>
          </div>
          <nav aria-label="Contact" className="flex flex-col lg:col-span-4">
            {[
              { k: "Email", v: contact.email, href: `mailto:${contact.email}` },
              { k: "LinkedIn", v: "in/codingforgood", href: contact.linkedin },
              { k: "GitHub", v: "smithdavedesign", href: contact.github },
              { k: "Resume", v: "/v4/resume", href: contact.resume },
            ].map((c) => (
              <a key={c.k} href={c.href} className="flex flex-1 items-center justify-between gap-4 border-b border-line px-5 py-4 last:border-b-0 hover:bg-raised hover:text-signal">
                <span className="label">{c.k}</span>
                <span className="truncate font-mono text-sm">{c.v} ↗</span>
              </a>
            ))}
          </nav>
        </div>
        <p className="label mt-6 flex flex-wrap justify-between gap-2 !text-faint">
          <span>© {new Date().getFullYear()} {person.name}</span>
          <span>
            v4 · static next.js + express · <a href="/v4/llms.txt" className="hover:text-signal">llms.txt</a> · earlier versions{" "}
            <a href="/v3/" className="hover:text-signal">v3</a> <a href="/v2/" className="hover:text-signal">v2</a>{" "}
            <a href="/v1/" className="hover:text-signal">v1</a>
          </span>
        </p>
      </footer>
    </main>
  );
}
