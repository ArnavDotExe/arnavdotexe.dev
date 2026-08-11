import Image from "next/image";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { spokenLanguages } from "@/data/skills";
import { ArchWindow } from "./arch-window";

const current = experience.find((e) => e.current) ?? experience[0];

const ROWS: [string, string][] = [
  ["os", "Arch Linux (btw) x86_64"],
  ["host", "arnavmangaonkar.dev"],
  ["role", profile.role],
  ["domain", current.domain],
  ["company", current.company],
  ["shell", "zsh"],
  ["wm", "Hyprland"],
  ["terminal", "kitty"],
  ["languages", spokenLanguages.join(", ")],
  ["status", profile.status],
  ["packages", "30+ (github.com/ArnavDotExe)"],
];

export function ArchFetchPanel() {
  return (
    <ArchWindow title="arnav@portfolio: neofetch">
      <div id="arch-fetch" className="flex flex-col gap-6 p-6 sm:flex-row sm:gap-10 sm:p-8">
        <div className="shrink-0">
          <Image
            src="/avatar-placeholder.svg"
            alt="Arnav Mangaonkar — profile photo placeholder"
            width={160}
            height={160}
            priority
            className="h-32 w-32 rounded-xl sm:h-40 sm:w-40"
          />
        </div>
        <div>
          <p className="mb-1 font-semibold text-[var(--arch-green)]">
            arnav<span className="text-[var(--arch-fg-dim)]">@</span>portfolio
          </p>
          <p className="mb-3 text-[var(--arch-fg-dim)]">-----------------------------</p>
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
            {ROWS.map(([label, value]) => (
              <div key={label} className="contents">
                <dt className="arch-fetch-label">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 flex gap-1.5" aria-hidden="true">
            {["#f38ba8", "#f9e2af", "#a6e3a1", "#89dceb", "#61afef", "#cba6f7", "#cdd6f4"].map(
              (c) => (
                <span key={c} className="h-3 w-3 rounded-sm" style={{ background: c }} />
              )
            )}
          </div>
        </div>
      </div>
    </ArchWindow>
  );
}
