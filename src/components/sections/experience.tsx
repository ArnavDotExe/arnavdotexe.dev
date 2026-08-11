import { Briefcase } from "lucide-react";
import { experience } from "@/data/experience";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { ArchWindow } from "@/components/arch/arch-window";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        eyebrow="02 · Experience"
        title="Where I've built things."
        description="R&D, industrial automation, and real-time data systems — hands-on, not just theory."
      />

      <ArchWindow title="~/experience/timeline.log">
        <ol className="relative space-y-10 p-0 pl-8 sm:pl-10 md:p-2 md:pl-10">
          <div
            className="absolute bottom-2 left-[7px] top-2 w-px bg-border sm:left-[9px] md:left-[9px]"
            aria-hidden="true"
          />
          {experience.map((role, i) => (
            <Reveal as="li" key={role.company} delay={i * 0.08} className="relative">
              <span
                className="absolute -left-8 top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-background bg-amber sm:-left-10 md:-left-10"
                aria-hidden="true"
              />
              <div className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-amber/40">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="flex items-center gap-2 text-lg font-semibold">
                    <Briefcase size={16} className="text-amber" aria-hidden="true" />
                    {role.role}
                  </h3>
                  <span className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground">
                    {role.period}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-amber">{role.company}</p>
                <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground/70">
                  {role.domain}
                </p>
                <ul className="mt-4 space-y-2">
                  {role.points.map((point) => (
                    <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {role.tags.map((tag) => (
                    <span
                      key={tag}
                      className="arch-tag rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </ArchWindow>
    </section>
  );
}
