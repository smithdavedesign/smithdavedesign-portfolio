import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Panel from "@/components/Panel";
import Pipeline from "@/components/Pipeline";
import { profile, getCaseStudy, SITE_URL } from "@/lib/profile";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return profile.caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const c = getCaseStudy((await params).slug);
  if (!c) return {};
  return {
    title: c.title,
    description: `${c.headline} ${c.metric}`,
    alternates: { canonical: `/v4/work/${c.slug}/` },
    openGraph: { title: c.title, description: c.metric, url: `/v4/work/${c.slug}/` },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const c = getCaseStudy((await params).slug);
  if (!c) notFound();

  const idx = profile.caseStudies.findIndex((x) => x.slug === c.slug);
  const next = profile.caseStudies[(idx + 1) % profile.caseStudies.length];
  const ld = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: c.title,
    headline: c.headline,
    abstract: `${c.action} ${c.metric}`,
    url: `${SITE_URL}/v4/work/${c.slug}/`,
    keywords: c.tooling.join(", "),
    author: { "@type": "Person", name: profile.person.name, url: `${SITE_URL}/v4/` },
    ...(c.image ? { image: `${SITE_URL}${c.image}` } : {}),
  };

  return (
    <main id="main" className="mx-auto max-w-[88rem] px-4 pb-16 pt-6 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <nav aria-label="Breadcrumb" className="label mb-4">
        <Link href="/#work" className="hover:!text-signal">
          ← work
        </Link>
        <span className="text-faint"> / case {c.code}</span>
      </nav>

      <article className="console-grid lg:grid-cols-12">
        <header className="blueprint flex flex-col gap-6 p-6 sm:p-8 lg:col-span-8 lg:p-10">
          <p className="label !text-signal">Case {c.code}</p>
          <h1 className="max-w-[20ch] text-[clamp(2.2rem,5vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.03em]">{c.title}</h1>
          <p className="max-w-[55ch] text-lg leading-relaxed text-muted">{c.headline}</p>
        </header>
        <aside className="flex flex-col lg:col-span-4" aria-label="Summary">
          <dl className="flex flex-1 flex-col">
            <div className="border-b border-line p-5">
              <dt className="label mb-1.5">Action</dt>
              <dd className="text-sm leading-relaxed">{c.action}</dd>
            </div>
            <div className="border-b border-line p-5">
              <dt className="label mb-1.5">Tooling</dt>
              <dd className="font-mono text-xs leading-relaxed text-muted">{c.tooling.join(" · ")}</dd>
            </div>
            <div className="flex-1 border-l-2 border-signal p-5">
              <dt className="label mb-1.5 !text-signal">Metric</dt>
              <dd className="text-base leading-snug">{c.metric}</dd>
            </div>
          </dl>
        </aside>

        <Panel index="01" label="Pipeline" className="lg:col-span-12" as="div">
          <Pipeline steps={c.pipeline} />
        </Panel>

        {c.image && (
          <figure className="lg:col-span-12">
            <Image src={c.image} alt={c.imageAlt ?? ""} width={1600} height={945} className="h-auto w-full" priority />
            <figcaption className="label border-t border-line px-5 py-2.5">Production screenshot</figcaption>
          </figure>
        )}

        <Panel index="02" label="Problem" className="lg:col-span-4">
          <p className="leading-relaxed text-muted">{c.problem}</p>
        </Panel>
        <Panel index="03" label="Approach" className="lg:col-span-5">
          <ol className="flex flex-col gap-3">
            {c.approach.map((a, i) => (
              <li key={i} className="grid grid-cols-[1.75rem_1fr] text-sm leading-relaxed">
                <span className="font-mono text-signal">{String(i + 1).padStart(2, "0")}</span>
                <span>{a}</span>
              </li>
            ))}
          </ol>
        </Panel>
        <Panel
          index="04"
          label="Governance"
          className="lg:col-span-3"
          status={
            <>
              <span className="dot" data-tone="stop" aria-hidden /> hitl
            </>
          }
        >
          <p className="text-sm leading-relaxed">{c.governance}</p>
        </Panel>
      </article>

      <div className="console-grid mt-px">
        <Link href={`/work/${next.slug}/`} className="group flex items-center justify-between gap-4 p-5 hover:bg-raised">
          <span className="label">Next case</span>
          <span className="font-medium group-hover:text-signal">
            {next.code} · {next.title} →
          </span>
        </Link>
      </div>
    </main>
  );
}
