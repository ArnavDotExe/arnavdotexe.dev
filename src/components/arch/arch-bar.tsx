"use client";

import { Cpu, Eye, Power, Terminal } from "lucide-react";
import { WORKSPACES } from "@/lib/arch";
import { useArchMode } from "./arch-provider";
import { ArchClock } from "./arch-clock";

export function ArchBar() {
  const { isArch, activeSection, memory, visitors, goToSection } = useArchMode();

  const activeWorkspace =
    WORKSPACES.find((w) => w.sectionId === activeSection) ?? WORKSPACES[0];

  return (
    <header
      id="arch-bar"
      role="banner"
      aria-label="Rice mode status bar"
      aria-hidden={!isArch}
      inert={!isArch ? true : undefined}
    >
      <div className="arch-bar-group">
        <span className="arch-module" aria-hidden="true">
          <Terminal size={13} />
          arnav
        </span>

        <nav id="arch-ws" aria-label="Workspaces">
          {WORKSPACES.map((ws) => (
            <button
              key={ws.id}
              type="button"
              className={ws.sectionId === activeSection ? "active" : undefined}
              aria-current={ws.sectionId === activeSection ? "true" : undefined}
              aria-label={`Go to ${ws.label} workspace`}
              onClick={() => goToSection(ws.sectionId)}
            >
              {ws.id}: {ws.label}
            </button>
          ))}
        </nav>

        <span id="arch-window-title" suppressHydrationWarning>
          {activeWorkspace.title}
        </span>
      </div>

      <div className="arch-bar-group">
        <span id="arch-mem" className="arch-module" aria-hidden="true">
          <Cpu size={13} />
          <span id="arch-mem-mod" suppressHydrationWarning>
            {memory.supported && memory.usedMB !== undefined
              ? `${memory.usedMB.toFixed(0)}MB`
              : "N/A"}
          </span>
        </span>

        <span id="arch-vis" className="arch-module" aria-hidden="true">
          <Eye size={13} />
          <span id="arch-vis-mod" suppressHydrationWarning>
            {visitors !== null ? visitors.toLocaleString() : "—"}
          </span>
        </span>

        <ArchClock />

        <button
          id="arch-power"
          data-arch-power
          type="button"
          className="arch-module"
          aria-pressed={isArch}
          aria-label="Turn off Arch rice mode and return to the portfolio"
          tabIndex={isArch ? 0 : -1}
        >
          <Power size={13} />
        </button>
      </div>
    </header>
  );
}
