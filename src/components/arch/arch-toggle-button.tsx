"use client";

import { Terminal } from "lucide-react";
import { useArchMode } from "./arch-provider";

export function ArchToggleButton({ className }: { className?: string }) {
  const { isArch } = useArchMode();

  return (
    <button
      id="arch-toggle"
      data-arch-toggle
      type="button"
      aria-pressed={isArch}
      aria-label={isArch ? "Exit rice mode" : "Enter Arch Linux rice mode"}
      title="Rice Mode (Ctrl+Alt+R)"
      className={className}
    >
      <Terminal size={15} aria-hidden="true" />
      <span>{isArch ? "exit rice mode" : "rice mode"}</span>
    </button>
  );
}
