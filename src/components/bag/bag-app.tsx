"use client";

import { BagProvider, useBag } from "./bag-provider";
import { IntroScreen } from "./intro-screen";
import { PlayerCard } from "./player-card";
import { BagNav } from "./bag-nav";
import { ContentPanel } from "./content-panel";
import { PixelClock } from "@/components/pixel/pixel-clock";

function BagShell() {
  const { bagOpen, mobileView } = useBag();

  if (!bagOpen) return <IntroScreen />;

  return (
    <div className="bag-shell">
      <header className="bag-shell-header font-pixel">
        <span>arnav&apos;s bag</span>
        <PixelClock />
      </header>

      <div className="bag-shell-body" data-mobile-view={mobileView}>
        <div className="bag-shell-player">
          <PlayerCard />
        </div>
        <BagNav className="bag-shell-nav" />
        <ContentPanel className="bag-shell-content" />
      </div>

      <p className="bag-shell-credit font-pixel">
        made with next.js, tailwind &amp; gsap · save file complete
      </p>
    </div>
  );
}

export function BagApp() {
  return (
    <BagProvider>
      <BagShell />
    </BagProvider>
  );
}
