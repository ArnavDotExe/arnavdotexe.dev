import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { PixelAvatar } from "@/components/pixel/pixel-avatar";
import { CompanionSprite } from "./companion-sprite";

const current = experience.find((e) => e.current) ?? experience[0];

const FIELDS: [string, string][] = [
  ["name", profile.name.split(" ")[0]],
  ["class", "Engineer"],
  ["specialty", current.domain],
  ["current", `${current.role} @ ${current.company}`],
  ["location", profile.location],
  ["partner", "Dragonite"],
];

export function PlayerCard() {
  return (
    <div className="pixel-panel pixel-corners flex h-full flex-col gap-5 p-5">
      <div className="flex flex-wrap items-end justify-center gap-2">
        <PixelAvatar cellSize={6} />
        <CompanionSprite cellSize={6} />
      </div>

      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2">
        {FIELDS.map(([label, value]) => (
          <div key={label} className="contents">
            <dt className="font-pixel text-[8px] uppercase tracking-wide text-amber">{label}</dt>
            <dd className="truncate text-xs font-medium text-foreground" title={value}>
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
