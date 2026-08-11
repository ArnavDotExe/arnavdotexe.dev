"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { useArchMode } from "@/components/arch/arch-provider";
import { ArchFetchPanel } from "@/components/arch/arch-fetch-panel";
import { GithubIcon } from "@/components/shared/brand-icons";

export function Hero() {
  const { isArch, mounted, goToSection } = useArchMode();

  return (
    <section
      id="home"
      className="relative flex min-h-[92vh] items-center overflow-hidden px-5 pb-20 pt-16 sm:px-8"
    >
      {!isArch && (
        <>
          <div
            className="pointer-events-none absolute inset-0 bg-dot-grid opacity-40 mask-fade-bottom"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute left-1/2 top-[-10%] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-amber/10 blur-[140px]"
            aria-hidden="true"
          />
        </>
      )}

      <div className="relative mx-auto w-full max-w-6xl">
        {mounted && isArch ? (
          <ArchFetchPanel />
        ) : (
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1.5 font-mono text-xs text-muted-foreground"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-glow-pulse rounded-full bg-amber" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber" />
              </span>
              {profile.status} · {profile.education.period.split(" ")[2] ?? "2026"} graduate
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl"
            >
              {profile.heroHeadline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {profile.heroSub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <button
                type="button"
                onClick={() => goToSection("projects")}
                className="group flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                View Projects
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </button>
              <button
                type="button"
                onClick={() => goToSection("contact")}
                className="flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-amber hover:text-amber"
              >
                <Mail size={15} />
                Contact Me
              </button>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-transparent px-5 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                <GithubIcon size={15} />
                GitHub
              </a>
            </motion.div>

            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
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
            </motion.dl>
          </div>
        )}
      </div>
    </section>
  );
}
