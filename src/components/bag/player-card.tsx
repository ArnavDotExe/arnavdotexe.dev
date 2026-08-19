import { profile } from "@/data/profile";
import { PixelAvatar } from "@/components/pixel/pixel-avatar";

export function PlayerCard() {
  return (
    <div className="pixel-panel pixel-corners flex flex-col items-center gap-3 p-5 text-center">
      <PixelAvatar cellSize={7} showDialogue={false} />
      <div>
        <p className="text-sm font-semibold text-foreground">{profile.name.split(" ")[0]}</p>
        <p className="mt-0.5 font-pixel text-[8px] uppercase tracking-wide text-amber">Engineer</p>
      </div>
    </div>
  );
}
