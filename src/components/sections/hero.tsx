"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Mail } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { useArchMode } from "@/components/arch/arch-provider";
import { ArchFetchPanel } from "@/components/arch/arch-fetch-panel";
import { GithubIcon } from "@/components/shared/brand-icons";

const currentRole = experience.find((e) => e.current) ?? experience[0];

export function Hero() {
  const { goToSection } = useArchMode();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from("[data-hero-item]", {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.09,
        });
    },
    { scope }
  );

  return (
    <section
      id="home"
      className="relative flex min-h-[92vh] items-center overflow-hidden px-5 pb-20 pt-16 sm:px-8"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-dot-grid opacity-40 mask-fade-bottom"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[-10%] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-amber/10 blur-[140px]"
        aria-hidden="true"
      />

      <div ref={scope} className="relative mx-auto w-full max-w-6xl">
        <div
          data-hero-item
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1.5 font-mono text-xs text-muted-foreground"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-glow-pulse rounded-full bg-amber" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber" />
          </span>
          {profile.status} · {currentRole.role} @ {currentRole.company}
        </div>

        <h1
          data-hero-item
          className="max-w-5xl text-5xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-7xl lg:text-8xl"
        >
          {profile.name}
        </h1>

        <p
          data-hero-item
          className="mt-4 max-w-3xl text-lg font-medium leading-snug text-balance text-amber sm:text-2xl lg:text-[28px]"
        >
          {profile.positioning}
        </p>

        <p
          data-hero-item
          className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {profile.heroSub}
        </p>

        <div data-hero-item className="mt-10 max-w-3xl">
          <ArchFetchPanel />
        </div>

        <div data-hero-item className="mt-10 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => goToSection("projects")}
            className="group flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            see my work
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </button>
          <button
            type="button"
            onClick={() => goToSection("contact")}
            className="flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-amber hover:text-amber"
          >
            <Mail size={15} />
            say hi
          </button>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-transparent px-5 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <GithubIcon size={15} />
            github
          </a>
        </div>

        <dl
          data-hero-item
          className="mt-16 grid max-w-2xl grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-4"
        >
          {profile.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="font-mono text-2xl font-semibold text-amber sm:text-3xl">
                {stat.value}
              </dt>
              <dd className="mt-1 text-xs text-muted-foreground">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
