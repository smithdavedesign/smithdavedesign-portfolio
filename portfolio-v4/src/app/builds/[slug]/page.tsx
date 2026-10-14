import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Panel from "@/components/Panel";
import { profile, getBuild, SITE_URL } from "@/lib/profile";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return profile.builds.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const b = getBuild((await params).slug);
  if (!b) return {};
  return {
    title: b.name,
    description: b.tagline,
    alternates: { canonical: `/v4/builds/${b.slug}/` },
    openGraph: { title: b.name, description: b.tagline, url: `/v4/builds/${b.slug}/`, images: [b.images[0].src] },
  };
}

export default async function BuildPage({ params }: { params: Promise<Params> }) {
  const b = getBuild((await params).slug);
  if (!b) notFound();

  const idx = profile.builds.findIndex((x) => x.slug === b.slug);
  const next = profile.builds[(idx + 1) % profile.builds.length];
  const ld = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: b.name,
    description: b.summary,
    codeRepository: b.github,
    programmingLanguage: "TypeScript",
    keywords: b.stack.join(", "),
    url: `${SITE_URL}/v4/builds/${b.slug}/`,
    image: b.images.map((i) => `${SITE_URL}${i.src}`),
    author: { "@type": "Person", name: profile.person.name, url: `${SITE_URL}/v4/` },
    ...(b.live ? { targetProduct: { "@type": "WebApplication", name: b.name, url: b.live } } : {}),
  };

  return (
    <main id="main" className="mx-auto max-w-[88rem] px-4 pb-16 pt-6 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <nav aria-label="Breadcrumb" className="label mb-4">
        <Link href="/#builds" className="hover:!text-signal">
          ← builds
        </Link>
        <span className="text-faint"> / {b.slug}</span>
      </nav>

      <article className="console-grid lg:grid-cols-12">
        <header className="blueprint flex flex-col gap-6 p-6 sm:p-8 lg:col-span-8 lg:p-10">
          <p className="label !text-signal">Build {String(idx + 1).padStart(2, "0")}</p>
          <h1 className="max-w-[20ch] text-[clamp(2.2rem,5vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.03em]">{b.name}</h1>
          <p className="max-w-[55ch] text-lg leading-relaxed text-muted">{b.tagline}</p>
        </header>
        <aside className="flex flex-col lg:col-span-4" aria-label="Links and stack">
          <div className="border-b border-line p-5">
            <p className="label mb-2">Stack</p>
            <ul className="flex flex-wrap gap-1.5">
              {b.stack.map((t) => (
                <li key={t} className="border border-line-strong px-2 py-1 font-mono text-xs text-muted">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <nav aria-label="Project links" className="flex flex-1 flex-col">
            <a href={b.github} className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 hover:bg-raised hover:text-signal">
              <span className="label">Source</span>
              <span className="font-mono text-sm">GitHub ↗</span>
            </a>
            {b.live && (
              <a href={b.live} className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 hover:bg-raised hover:text-signal">
                <span className="label">Live</span>
                <span className="truncate font-mono text-sm">{b.live.replace(/^https?:\/\//, "")} ↗</span>
              </a>
            )}
          </nav>
        </aside>

        {b.images.map((img, i) => (
          <figure key={img.src} className={b.images.length > 1 ? "lg:col-span-6" : "lg:col-span-12"}>
            <Image src={img.src} alt={img.alt} width={1440} height={900} className="h-auto w-full" priority={i === 0} />
            <figcaption className="label border-t border-line px-5 py-2.5">{img.caption}</figcaption>
          </figure>
        ))}

        <Panel index="01" label="Overview" className="lg:col-span-5">
          <p className="leading-relaxed text-muted">{b.summary}</p>
        </Panel>
        <Panel index="02" label="What it does" className="lg:col-span-7">
          <ul className="flex flex-col gap-3">
            {b.highlights.map((h, i) => (
              <li key={i} className="grid grid-cols-[1.75rem_1fr] text-sm leading-relaxed">
                <span className="font-mono text-signal">{String(i + 1).padStart(2, "0")}</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </article>

      <div className="console-grid mt-px">
        <Link href={`/builds/${next.slug}/`} className="group flex items-center justify-between gap-4 p-5 hover:bg-raised">
          <span className="label">Next build</span>
          <span className="font-medium group-hover:text-signal">{next.name} →</span>
        </Link>
      </div>
    </main>
  );
}
