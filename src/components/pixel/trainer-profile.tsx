import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { PixelAvatar } from "./pixel-avatar";

const current = experience.find((e) => e.current) ?? experience[0];

const FIELDS: [string, string][] = [
  ["name", profile.name],
  ["class", profile.role],
  ["specialty", current.domain],
  ["status", profile.status],
  ["based in", profile.location],
];

export function TrainerProfile() {
  return (
    <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left">
      <PixelAvatar />

      <div className="w-full">
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
          {FIELDS.map(([label, value]) => (
            <div key={label} className="contents">
              <dt className="font-pixel text-[9px] uppercase tracking-wide text-amber">{label}</dt>
              <dd className="text-sm font-medium text-foreground">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-4 border-t border-border pt-4">
          <p className="font-pixel text-[9px] uppercase tracking-wide text-amber">
            currently building
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {profile.heroHeadline}
          </p>
        </div>
      </div>
    </div>
  );
}
