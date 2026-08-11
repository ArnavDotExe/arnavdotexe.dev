import { Award, ExternalLink } from "lucide-react";
import { certifications } from "@/data/certifications";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { ArchWindow } from "@/components/arch/arch-window";

/**
 * Renders nothing when `certifications` is empty rather than showing a
 * placeholder — see src/data/certifications.ts for why the list is empty.
 * Add verified entries there and this section appears automatically.
 */
export function Certifications() {
  if (certifications.length === 0) return null;

  return (
    <section id="certifications" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading eyebrow="05 · Certifications" title="Certifications." />
      <ArchWindow title="~/certifications$ cat verified.txt">
        <ul className="grid gap-4 p-0 sm:grid-cols-2 md:p-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <Reveal as="li" key={cert.name} delay={(i % 3) * 0.06}>
              <a
                href={cert.url}
                target={cert.url ? "_blank" : undefined}
                rel={cert.url ? "noopener noreferrer" : undefined}
                className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-amber/40"
              >
                <div className="mb-3 flex items-center justify-between text-amber">
                  <Award size={18} />
                  {cert.url && <ExternalLink size={14} className="text-muted-foreground" />}
                </div>
                <p className="text-sm font-semibold text-foreground">{cert.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{cert.issuer}</p>
                <p className="mt-auto pt-3 font-mono text-[11px] text-muted-foreground/60">
                  {cert.date}
                </p>
              </a>
            </Reveal>
          ))}
        </ul>
      </ArchWindow>
    </section>
  );
}
