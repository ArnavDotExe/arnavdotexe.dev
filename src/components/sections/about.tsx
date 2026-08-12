import { MapPin, GraduationCap, Languages } from "lucide-react";
import { profile } from "@/data/profile";
import { spokenLanguages } from "@/data/skills";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { ArchWindow } from "@/components/arch/arch-window";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading eyebrow="01 · about" title="a lil' about me" />

      <ArchWindow title="~/about/README.md">
        <div className="grid gap-10 p-0 md:grid-cols-[1.4fr_1fr] md:gap-16 md:p-2">
          <Reveal className="space-y-5">
            {profile.about.map((paragraph, i) => (
              <p key={i} className="text-base leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.12} className="space-y-4">
            <InfoCard icon={<GraduationCap size={17} />} label="Education">
              <p className="text-sm font-medium text-foreground">{profile.education.degree}</p>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                {profile.education.period}
              </p>
            </InfoCard>

            <InfoCard icon={<MapPin size={17} />} label="Based in">
              <p className="text-sm text-foreground">{profile.location}</p>
            </InfoCard>

            <InfoCard icon={<Languages size={17} />} label="Languages">
              <p className="text-sm text-foreground">{spokenLanguages.join(" · ")}</p>
            </InfoCard>
          </Reveal>
        </div>
      </ArchWindow>
    </section>
  );
}

function InfoCard({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-3 flex items-center gap-2 text-amber">
        {icon}
        <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}
