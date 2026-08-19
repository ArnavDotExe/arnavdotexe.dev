"use client";

import type { ComponentType } from "react";
import { ChevronLeft } from "lucide-react";
import type { BagItemId } from "@/lib/bag-items";
import { PixelPanel } from "@/components/pixel/pixel-panel";
import { useBag } from "./bag-provider";
import { TrainerProfilePanel } from "./panels/trainer-profile-panel";
import { JourneyPanel } from "./panels/journey-panel";
import { PokedexPanel } from "./panels/pokedex-panel";
import { MovesetPanel } from "./panels/moveset-panel";
import { BadgeCasePanel } from "./panels/badge-case-panel";
import { CameraPanel } from "./panels/camera-panel";
import { PcPanel } from "./panels/pc-panel";
import { TrainerIdPanel } from "./panels/trainer-id-panel";
import { DocumentsPanel } from "./panels/documents-panel";
import { PokegearPanel } from "./panels/pokegear-panel";

const PANELS: Record<BagItemId, ComponentType> = {
  about: TrainerProfilePanel,
  experience: JourneyPanel,
  projects: PokedexPanel,
  skills: MovesetPanel,
  certifications: BadgeCasePanel,
  photography: CameraPanel,
  github: PcPanel,
  linkedin: TrainerIdPanel,
  resume: DocumentsPanel,
  contact: PokegearPanel,
};

export function ContentPanel({ className }: { className?: string }) {
  const { items, activeId, mobileView, goBackToList } = useBag();
  const item = items.find((i) => i.id === activeId) ?? items[0];
  const Panel = PANELS[item.id];

  return (
    <div
      className={`content-panel-wrap ${mobileView === "content" ? "is-mobile-content" : ""} ${className ?? ""}`}
      style={{ "--bag-accent": item.accent } as React.CSSProperties}
    >
      <PixelPanel title={item.metaphor.toUpperCase()} className="flex h-full flex-col">
        <button type="button" onClick={goBackToList} className="bag-back-btn font-pixel">
          <ChevronLeft size={13} />
          back
        </button>
        <div className="flex-1 overflow-y-auto p-5 md:p-6">
          <Panel />
        </div>
      </PixelPanel>
    </div>
  );
}
