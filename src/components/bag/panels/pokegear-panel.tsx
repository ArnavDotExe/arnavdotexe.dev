"use client";

import { useState } from "react";
import { Check, Copy, Download, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { GithubIcon, LinkedinIcon } from "@/components/shared/brand-icons";
import { withBasePath } from "@/lib/base-path";

export function PokegearPanel() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API can be unavailable — the email is still visible/selectable.
    }
  };

  return (
    <div>
      <p className="mb-5 max-w-lg text-sm leading-relaxed text-muted-foreground">
        Your team is fully healed and ready for battle! Reach out below — email, LinkedIn, GitHub,
        or grab the resume.
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={copyEmail}
          className="flex h-full flex-col border-2 border-border bg-card p-4 text-left transition-colors hover:border-amber/50"
        >
          <div className="mb-3 flex items-center justify-between text-amber">
            <Mail size={18} />
            {copied ? (
              <Check size={14} className="text-[var(--pixel-forest)]" />
            ) : (
              <Copy size={14} className="text-muted-foreground" />
            )}
          </div>
          <p className="font-pixel text-[8px] uppercase tracking-wide text-muted-foreground">Email</p>
          <p className="mt-1 truncate text-sm font-medium text-foreground">{profile.email}</p>
          <p className="mt-1.5 text-xs text-muted-foreground/60">{copied ? "copied!" : "tap to copy"}</p>
        </button>

        <a
          href={profile.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-full flex-col border-2 border-border bg-card p-4 transition-colors hover:border-amber/50"
        >
          <GithubIcon size={18} className="mb-3 text-amber" />
          <p className="font-pixel text-[8px] uppercase tracking-wide text-muted-foreground">GitHub</p>
          <p className="mt-1 text-sm font-medium text-foreground">@ArnavDotExe</p>
        </a>

        <a
          href={profile.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-full flex-col border-2 border-border bg-card p-4 transition-colors hover:border-amber/50"
        >
          <LinkedinIcon size={18} className="mb-3 text-amber" />
          <p className="font-pixel text-[8px] uppercase tracking-wide text-muted-foreground">LinkedIn</p>
          <p className="mt-1 text-sm font-medium text-foreground">/in/arnavmangaonkar</p>
        </a>

        <a
          href={withBasePath(profile.links.resume)}
          download
          className="flex h-full flex-col border-2 border-amber bg-amber/10 p-4 transition-colors hover:bg-amber/15"
        >
          <Download size={18} className="mb-3 text-amber" />
          <p className="font-pixel text-[8px] uppercase tracking-wide text-muted-foreground">Resume</p>
          <p className="mt-1 text-sm font-medium text-foreground">grab it</p>
        </a>
      </div>
    </div>
  );
}
