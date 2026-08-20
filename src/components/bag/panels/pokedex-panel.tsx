"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import { TypeBadge } from "@/components/pixel/type-badge";
import { cn } from "@/lib/utils";

const STATUS_STYLE: Record<(typeof projects)[number]["status"], string> = {
  Active: "text-[var(--pixel-forest)] border-[var(--pixel-forest)] bg-[var(--pixel-grass)]/20",
  Shipped: "text-[var(--pixel-ink)] border-[var(--pixel-ink)] bg-[var(--pixel-cream-alt)]",
  Published: "text-[var(--pixel-ink)] border-amber bg-amber/20",
};

const dexProjects = projects.filter((p) => p.showInDex !== false);

export function PokedexPanel() {
  const [selectedSlug, setSelectedSlug] = useState(dexProjects[0].slug);
  const selected = dexProjects.find((p) => p.slug === selectedSlug) ?? dexProjects[0];

  return (
    <div className="grid gap-4 md:grid-cols-[1fr_1.4fr]">
      <ul className="flex flex-col gap-1.5 md:max-h-[520px] md:overflow-y-auto md:pr-1">
        {dexProjects.map((project, i) => (
          <li key={project.slug}>
            <button
              type="button"
              onClick={() => setSelectedSlug(project.slug)}
              aria-current={project.slug === selectedSlug ? "true" : undefined}
              className={cn(
                "flex w-full items-center gap-2 border-2 px-3 py-2 text-left text-xs transition-colors",
                project.slug === selectedSlug
                  ? "border-amber bg-amber/15 text-amber"
                  : "border-border bg-card text-foreground hover:border-amber/40"
              )}
            >
              <span className="font-pixel text-[8px] text-muted-foreground">
                {String(i + 1).padStart(3, "0")}
              </span>
              <span className="truncate font-medium">{project.name}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="border-2 border-border bg-card p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="text-base font-semibold text-foreground">{selected.name}</h3>
          <span
            className={cn(
              "shrink-0 border-2 px-2 py-0.5 font-pixel text-[8px]",
              STATUS_STYLE[selected.status]
            )}
          >
            {selected.status}
          </span>
        </div>
        <p className="mt-1 text-sm text-amber">{selected.tagline}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {selected.categories.map((c) => (
            <TypeBadge key={c} category={c} />
          ))}
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{selected.description}</p>

        <p className="mt-4 font-pixel text-[8px] uppercase tracking-wide text-muted-foreground/70">
          achievements
        </p>
        <ul className="mt-2 space-y-1.5">
          {selected.achievements.map((a) => (
            <li key={a} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
              <span className="mt-1.5 h-1 w-1 shrink-0 bg-amber" aria-hidden="true" />
              {a}
            </li>
          ))}
        </ul>

        <p className="mt-4 font-pixel text-[8px] uppercase tracking-wide text-muted-foreground/70">
          tech stack
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {selected.tech.map((t) => (
            <span key={t} className="pixel-tag">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between border-t-2 border-border pt-4">
          <span className="font-pixel text-[8px] text-muted-foreground/60">{selected.period}</span>
          <a
            href={selected.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-pixel text-[9px] text-amber hover:text-[var(--pixel-yellow)]"
          >
            github
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}
