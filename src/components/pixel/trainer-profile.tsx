import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { PixelAvatar, useTrainerDialogue } from "./pixel-avatar";
import { CompanionSprite } from "@/components/bag/companion-sprite";

// Trainer (132px) + companion (132px, both frames include their 3px pixel
// border) + the gap between them — fixed so the dialogue box below can sit
// at a constant width and only grow in height as its text changes, instead
// of the whole row reflowing.
const SPRITE_ROW_WIDTH = 276;

const current = experience.find((e) => e.current) ?? experience[0];

const FIELDS: [string, string][] = [
  ["name", profile.name],
  ["class", profile.role],
  ["specialty", current.domain],
  ["status", profile.status],
  ["based in", profile.location],
];

export function TrainerProfile() {
  const { line, cycle } = useTrainerDialogue();

  return (
    <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left">
      <div className="shrink-0" style={{ width: SPRITE_ROW_WIDTH }}>
        <div className="flex items-start justify-center gap-3">
          <PixelAvatar showDialogue={false} onClick={cycle} />
          <CompanionSprite cellSize={9} />
        </div>

        <div
          className="pixel-panel pixel-corners-sm mt-3 w-full px-3 py-2 text-center text-xs"
          aria-live="polite"
        >
          <p className="text-[var(--pixel-ink)]">{line}</p>
        </div>
      </div>

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
