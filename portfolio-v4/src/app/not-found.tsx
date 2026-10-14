import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex min-h-[60vh] max-w-[88rem] flex-col items-start justify-center gap-4 px-6 font-mono">
      <p className="text-stop">■ error 404 · route not found</p>
      <Link href="/" className="text-signal hover:underline">
        $ cd /v4
      </Link>
    </main>
  );
}
