"use client";

import { usePathname } from "next/navigation";
import { Cpu, Download, Eye, Mail, Terminal } from "lucide-react";
import { WORKSPACES } from "@/lib/arch";
import { profile } from "@/data/profile";
import { useArchMode } from "./arch-provider";
import { useArchStats } from "./use-arch-stats";
import { ArchClock } from "./arch-clock";
import { GithubIcon, LinkedinIcon } from "@/components/shared/brand-icons";

export function ArchBar() {
  const pathname = usePathname();

  // The bar (and its stats polling) is dev-mode-only chrome — its workspace
  // links point at sections that don't exist on /photography, and there's no
  // point running the memory/visitor interval when nothing renders it.
  if (pathname?.startsWith("/photography")) return null;

  return <ArchBarContent />;
}

function ArchBarContent() {
  const { activeSection, goToSection } = useArchMode();
  const { memory, visitors } = useArchStats();

  const activeWorkspace =
    WORKSPACES.find((w) => w.sectionId === activeSection) ?? WORKSPACES[0];

  return (
    <header id="arch-bar" role="banner" aria-label="Site navigation bar">
      <div className="arch-bar-group">
        <span className="arch-module arch-brand" aria-hidden="true">
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
              <span className="ws-num">{ws.id}</span>
              <span className="ws-label">: {ws.label}</span>
            </button>
          ))}
        </nav>

        <span id="arch-window-title" suppressHydrationWarning>
          {activeWorkspace.title}
        </span>
      </div>

      <div className="arch-bar-group">
        <a
          href={profile.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="arch-module arch-bar-link"
          aria-label="GitHub profile"
        >
          <GithubIcon size={13} />
        </a>
        <a
          href={profile.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="arch-module arch-bar-link"
          aria-label="LinkedIn profile"
        >
          <LinkedinIcon size={13} />
        </a>
        <a href={profile.links.email} className="arch-module arch-bar-link" aria-label="Email Arnav">
          <Mail size={13} />
        </a>
        <a
          href={profile.links.resume}
          download
          className="arch-module arch-bar-link"
          aria-label="Download resume"
        >
          <Download size={13} />
        </a>

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
      </div>
    </header>
  );
}
