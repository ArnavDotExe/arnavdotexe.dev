"use client";

import { useState } from "react";
import Image from "next/image";
import { withBasePath } from "@/lib/base-path";
import { cn } from "@/lib/utils";

const SIZE_UNIT = 14;

const DIALOGUE = [
  "...",
  "still compiling my thoughts.",
  '"jack of all trades, master of none — but often better than a master of one."',
  "ctrl+s is my love language.",
  "ask me about ByteCave. actually don't, I'll never stop.",
];

export function PixelAvatar({
  className,
  cellSize = 9,
}: {
  className?: string;
  cellSize?: number;
}) {
  const [lineIndex, setLineIndex] = useState<number | null>(null);
  const size = cellSize * SIZE_UNIT;

  return (
    <div className={cn("inline-flex flex-col items-center gap-3", className)}>
      <button
        type="button"
        onClick={() => setLineIndex((i) => ((i ?? -1) + 1) % DIALOGUE.length)}
        aria-label="Talk to Arnav"
        className="pixel-frame animate-pixel-bob"
      >
        <span
          className="pixel-frame-inner pixel-corners pixel-corners-sm relative block overflow-hidden bg-[var(--pixel-cream)]"
          style={{ width: size, height: size }}
        >
          <Image
            src={withBasePath("/avatar-placeholder.png")}
            alt="Arnav Mangaonkar"
            fill
            sizes={`${size}px`}
            className="object-cover"
            priority
          />
        </span>
      </button>

      {lineIndex !== null && (
        <div className="pixel-panel pixel-corners-sm max-w-[220px] px-3 py-2 text-center text-xs">
          <p className="text-[var(--pixel-ink)]">{DIALOGUE[lineIndex]}</p>
        </div>
      )}
    </div>
  );
}
