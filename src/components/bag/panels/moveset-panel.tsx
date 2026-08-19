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

const ICONS: Record<string, React.ReactNode> = {
  "AI & ML": <Sparkles size={15} />,
  "Computer Vision": <Video size={15} />,
  Robotics: <Bot size={15} />,
  "Embedded Systems": <Cpu size={15} />,
  Automation: <Boxes size={15} />,
  Cloud: <Cloud size={15} />,
  Backend: <Server size={15} />,
  Frontend: <Layout size={15} />,
  Tools: <Wrench size={15} />,
};

export function MovesetPanel() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {skills.map((group) => (
        <div key={group.category} className="border-2 border-border bg-card p-4">
          <div className="mb-3 flex items-center gap-2 border-b-2 border-border pb-2.5 text-amber">
            {ICONS[group.category]}
            <h3 className="font-pixel text-[9px] uppercase tracking-wide text-foreground">
              {group.category}
            </h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {group.skills.map((skill) => (
              <span key={skill} className="pixel-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
