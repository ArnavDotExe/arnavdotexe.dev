import { GraduationCap, Languages } from "lucide-react";
import { profile } from "@/data/profile";
import { spokenLanguages } from "@/data/skills";
import { TrainerProfile } from "@/components/pixel/trainer-profile";

export function TrainerProfilePanel() {
  return (
    <div className="space-y-6">
      <TrainerProfile />

      <div className="space-y-4">
        {profile.about.map((paragraph, i) => (
          <p key={i} className="text-sm leading-relaxed text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <InfoCard icon={<GraduationCap size={15} />} label="Education">
          <p className="text-sm font-medium text-foreground">{profile.education.degree}</p>
          <p className="mt-1 font-pixel text-[8px] text-muted-foreground">
            {profile.education.period}
          </p>
        </InfoCard>

        <InfoCard icon={<Languages size={15} />} label="Languages">
          <p className="text-sm text-foreground">{spokenLanguages.join(" · ")}</p>
        </InfoCard>
      </div>
    </div>
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
    <div className="border-2 border-border bg-card p-4">
      <div className="mb-2.5 flex items-center gap-2 text-amber">
        {icon}
        <span className="font-pixel text-[8px] uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}
