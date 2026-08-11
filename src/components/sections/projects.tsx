"use client";

import { useMemo, useState } from "react";
import {
  Bot,
  Camera,
  Cpu,
  ExternalLink,
  Layers,
  ServerCog,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type Project, type ProjectCategory } from "@/data/projects";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/shared/section-heading";
import { ArchWindow } from "@/components/arch/arch-window";
import { cn } from "@/lib/utils";

const CATEGORY_META: Record<ProjectCategory, { icon: React.ReactNode; gradient: string }> = {
  Robotics: { icon: <Bot size={22} />, gradient: "from-amber/25 via-amber/5 to-transparent" },
  "Computer Vision": {
    icon: <Camera size={22} />,
    gradient: "from-sky-400/20 via-sky-400/5 to-transparent",
  },
  "Embedded Systems": {
    icon: <Cpu size={22} />,
    gradient: "from-emerald-400/20 via-emerald-400/5 to-transparent",
  },
  "AI / ML": {
    icon: <Sparkles size={22} />,
    gradient: "from-violet-400/20 via-violet-400/5 to-transparent",
  },
  Automation: {
    icon: <Layers size={22} />,
    gradient: "from-orange-400/20 via-orange-400/5 to-transparent",
  },
  Infrastructure: {
    icon: <ServerCog size={22} />,
    gradient: "from-rose-400/20 via-rose-400/5 to-transparent",
  },
};

const CATEGORIES: (ProjectCategory | "All")[] = [
  "All",
  "Computer Vision",
  "Embedded Systems",
  "AI / ML",
  "Automation",
  "Infrastructure",
];

const STATUS_STYLE: Record<Project["status"], string> = {
  Active: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  Shipped: "text-sky-400 border-sky-400/30 bg-sky-400/10",
  Published: "text-amber border-amber/30 bg-amber/10",
};

export function Projects() {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");

  const filtered = useMemo(() => {
    const list =
      filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter));
    return [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [filter]);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        eyebrow="03 · Projects"
        title="Selected builds."
        description="Verified against public activity on github.com/ArnavDotExe — prioritizing robotics, computer vision, embedded systems, and automation work."
      />

      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            aria-pressed={filter === cat}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
              filter === cat
                ? "border-amber bg-amber/10 text-amber"
                : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <ArchWindow title={`~/projects$ ls -la --filter=${filter === "All" ? "*" : filter.toLowerCase().replace(/\s|\//g, "-")}`}>
        <div className="p-0 md:p-2">
          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </motion.div>
          </AnimatePresence>
          {filtered.length === 0 && (
            <p className="py-16 text-center text-sm text-muted-foreground">
              No projects in this category yet.
            </p>
          )}
        </div>
      </ArchWindow>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const meta = CATEGORY_META[project.categories[0]];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card className="group h-full gap-0 py-0 transition-colors hover:ring-amber/40">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "relative flex h-32 items-center justify-center overflow-hidden bg-gradient-to-br",
            meta.gradient
          )}
        >
          <div className="absolute inset-0 bg-dot-grid opacity-30" aria-hidden="true" />
          <span className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background/70 text-amber backdrop-blur-sm">
            {meta.icon}
          </span>
          <ExternalLink
            size={15}
            className="absolute right-3 top-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
          />
        </a>

        <CardHeader className="pt-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-semibold">
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-amber">
                {project.name}
              </a>
            </h3>
            <span
              className={cn(
                "shrink-0 rounded-full border px-2 py-0.5 font-mono text-[10px]",
                STATUS_STYLE[project.status]
              )}
            >
              {project.status}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{project.tagline}</p>
        </CardHeader>

        <CardContent className="pb-5">
          <ul className="mb-4 space-y-1.5">
            {project.achievements.slice(0, 2).map((a) => (
              <li key={a} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber" aria-hidden="true" />
                {a}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 4).map((t) => (
              <Badge key={t} variant="outline" className="font-mono text-[10px] text-muted-foreground">
                {t}
              </Badge>
            ))}
          </div>
          <p className="mt-3 font-mono text-[11px] text-muted-foreground/60">{project.period}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
