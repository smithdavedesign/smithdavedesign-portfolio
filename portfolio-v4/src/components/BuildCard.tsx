import Image from "next/image";
import Link from "next/link";
import type { Build } from "@/lib/profile";

/** Screenshot-led card for a shipped side project. */
export default function BuildCard({ build, index, large = false }: { build: Build; index: number; large?: boolean }) {
  const shot = build.images[0];
  return (
    <article className="group relative flex flex-col">
      <div className="flex items-center gap-3 border-b border-line px-5 py-2.5">
        <span className="label">
          <span className="text-faint">build / </span>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span aria-hidden className="h-px flex-1 bg-line" />
        <span className="label">{build.live ? "live" : "source"}</span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-bg">
        <Image
          src={shot.src}
          alt={shot.alt}
          fill
          sizes={large ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
          className="object-cover object-left-top opacity-90 transition duration-300 group-hover:scale-[1.02] group-hover:opacity-100"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className={`${large ? "text-2xl" : "text-xl"} font-semibold tracking-tight`}>
          <Link href={`/builds/${build.slug}/`} className="after:absolute after:inset-0 group-hover:text-signal">
            {build.name}
          </Link>
        </h3>
        <p className="text-sm leading-relaxed text-muted">{build.tagline}</p>
        <p className="mt-auto font-mono text-xs text-faint">{build.stack.slice(0, 5).join(" · ")}</p>
      </div>
    </article>
  );
}
