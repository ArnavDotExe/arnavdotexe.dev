import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { profile } from "@/data/profile";
import { PolaroidGrid } from "@/components/photography/polaroid-grid";
import { InstagramIcon } from "@/components/shared/brand-icons";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = {
  title: "Photography",
  description:
    "Street and travel photography by Arnav Mangaonkar — a few favorites, full album on Instagram @shillpkarr.",
};

export default function PhotographyPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-24 sm:px-8 sm:pb-32 sm:pt-32">
      <Reveal>
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={13} />
          back to dev mode
        </Link>

        <span className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-amber">
          <span className="h-1.5 w-1.5 rounded-full bg-amber" aria-hidden="true" />[ photographer
          mode ]
        </span>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
          the vision through my Lens 
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          a few favorites below — click any of them to see the rest on{" "}
          <a
            href={profile.links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-amber hover:underline"
          >
            <InstagramIcon size={15} />
            @shillpkarr
          </a>
          .
        </p>
      </Reveal>

      <div className="mt-16">
        <PolaroidGrid />
      </div>
    </div>
  );
}
