import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-5 py-24 text-center sm:px-8">
      <span className="mb-4 font-pixel text-[10px] uppercase tracking-[0.18em] text-amber">
        [ route not found ]
      </span>
      <div className="pixel-panel pixel-corners w-full px-6 py-10">
        <p className="font-pixel text-sm text-[var(--pixel-ink)] sm:text-base">404</p>
        <p className="mt-4 text-base leading-relaxed text-[var(--pixel-ink-dim)]">
          There&apos;s no route here — just tall grass. This path leads back to the world map
          instead.
        </p>
        <Link
          href="/"
          className="pixel-btn mt-8 inline-flex items-center gap-2 bg-[var(--pixel-grass)] px-5 py-3 text-sm font-semibold text-[var(--pixel-ink)]"
        >
          <ArrowLeft size={15} />
          back to the world map
        </Link>
      </div>
    </div>
  );
}
