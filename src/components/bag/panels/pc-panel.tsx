import { ExternalLink, FolderGit2 } from "lucide-react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { GithubIcon } from "@/components/shared/brand-icons";

export function PcPanel() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between border-2 border-[var(--pixel-brown)] bg-[var(--pixel-navy)] p-4 text-[var(--pixel-cream)]">
        <div className="flex items-center gap-3">
          <GithubIcon size={22} />
          <div>
            <p className="font-pixel text-[9px] uppercase tracking-wide">arnav-pc</p>
            <p className="mt-1 text-xs text-[var(--pixel-cream)]/70">@ArnavDotExe · 30+ repos</p>
          </div>
        </div>
        <a
          href={profile.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="pixel-btn flex items-center gap-1.5 bg-[var(--pixel-grass)] px-3 py-2 text-xs font-semibold text-[var(--pixel-ink)]"
        >
          profile
          <ExternalLink size={12} />
        </a>
      </div>

      <div>
        <p className="mb-2 flex items-center gap-1.5 font-pixel text-[8px] uppercase tracking-wide text-muted-foreground">
          <FolderGit2 size={12} />
          open-source repositories
        </p>
        <ul className="space-y-1.5">
          {projects.map((project) => (
            <li key={project.slug}>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between border-2 border-border bg-card px-3.5 py-2.5 text-sm transition-colors hover:border-amber/50"
              >
                <span className="font-medium text-foreground">{project.name}</span>
                <span className="truncate pl-3 text-xs text-muted-foreground">{project.tagline}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
