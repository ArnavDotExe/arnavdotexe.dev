"use client";

import { useState } from "react";
import { Check, Copy, Download, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { ArchWindow } from "@/components/arch/arch-window";
import { GithubIcon, LinkedinIcon } from "@/components/shared/brand-icons";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API can be unavailable (permissions, insecure context) — the
      // email is still visible and selectable, so this is a silent no-op.
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        eyebrow="06 · Contact"
        title="Let's build something."
        description={`Currently ${profile.status.toLowerCase()}. Reach out through any channel below.`}
      />

      <ArchWindow title="~/contact$ whoami">
        <div className="grid gap-4 p-0 sm:grid-cols-2 md:p-2 lg:grid-cols-4">
          <Reveal>
            <button
              type="button"
              onClick={copyEmail}
              className="group flex h-full w-full flex-col rounded-2xl border border-border bg-card p-5 text-left transition-colors hover:border-amber/40"
            >
              <div className="mb-4 flex items-center justify-between text-amber">
                <Mail size={20} />
                {copied ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} className="text-muted-foreground" />}
              </div>
              <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">Email</p>
              <p className="mt-1 truncate text-sm font-medium text-foreground">{profile.email}</p>
              <p className="mt-2 text-xs text-muted-foreground/60">{copied ? "Copied!" : "Click to copy"}</p>
            </button>
          </Reveal>

          <Reveal delay={0.06}>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-amber/40"
            >
              <GithubIcon size={20} className="mb-4 text-amber" />
              <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">GitHub</p>
              <p className="mt-1 text-sm font-medium text-foreground">@ArnavDotExe</p>
              <p className="mt-2 text-xs text-muted-foreground/60">30+ public repositories</p>
            </a>
          </Reveal>

          <Reveal delay={0.12}>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-amber/40"
            >
              <LinkedinIcon size={20} className="mb-4 text-amber" />
              <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">LinkedIn</p>
              <p className="mt-1 text-sm font-medium text-foreground">/in/arnavmangaonkar</p>
              <p className="mt-2 text-xs text-muted-foreground/60">Let&apos;s connect</p>
            </a>
          </Reveal>

          <Reveal delay={0.18}>
            <a
              href={profile.links.resume}
              download
              className="flex h-full flex-col rounded-2xl border border-amber/30 bg-amber/5 p-5 transition-colors hover:border-amber"
            >
              <Download size={20} className="mb-4 text-amber" />
              <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">Resume</p>
              <p className="mt-1 text-sm font-medium text-foreground">Download PDF</p>
              <p className="mt-2 text-xs text-muted-foreground/60">Updated 2026</p>
            </a>
          </Reveal>
        </div>
      </ArchWindow>
    </section>
  );
}
