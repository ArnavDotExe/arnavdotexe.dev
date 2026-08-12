import {
  Bot,
  Boxes,
  Cloud,
  Cpu,
  Layout,
  Server,
  Sparkles,
  Video,
  Wrench,
} from "lucide-react";
import { skills } from "@/data/skills";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { ArchWindow } from "@/components/arch/arch-window";

const ICONS: Record<string, React.ReactNode> = {
  "AI & ML": <Sparkles size={17} />,
  "Computer Vision": <Video size={17} />,
  Robotics: <Bot size={17} />,
  "Embedded Systems": <Cpu size={17} />,
  Automation: <Boxes size={17} />,
  Cloud: <Cloud size={17} />,
  Backend: <Server size={17} />,
  Frontend: <Layout size={17} />,
  Tools: <Wrench size={17} />,
};

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading eyebrow="04 · skills" title="what's in the toolbox" />

      <ArchWindow title="~/skills$ pacman -Q">
        <div className="grid gap-4 p-0 sm:grid-cols-2 md:p-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <Reveal key={group.category} delay={(i % 3) * 0.06}>
              <div className="h-full rounded-2xl border border-border bg-card p-5 transition-colors hover:border-amber/40">
                <div className="mb-4 flex items-center gap-2 text-amber">
                  {ICONS[group.category]}
                  <h3 className="text-sm font-semibold text-foreground">{group.category}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="font-mono text-[11px] font-normal text-muted-foreground"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </ArchWindow>
    </section>
  );
}
