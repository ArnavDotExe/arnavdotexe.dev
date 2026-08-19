import { Download, FileText } from "lucide-react";
import { profile } from "@/data/profile";
import { withBasePath } from "@/lib/base-path";

export function DocumentsPanel() {
  return (
    <div className="flex flex-col items-center gap-5 border-2 border-border bg-card p-8 text-center">
      <span className="border-2 border-[var(--pixel-brown)] bg-amber/15 p-5 text-amber">
        <FileText size={36} />
      </span>
      <div>
        <p className="text-sm font-semibold text-foreground">Arnav Mangaonkar — Resume</p>
        <p className="mt-1 font-pixel text-[8px] text-muted-foreground">updated 2026</p>
      </div>
      <a
        href={withBasePath(profile.links.resume)}
        download
        className="pixel-btn flex items-center gap-2 bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
      >
        <Download size={16} />
        download pdf
      </a>
    </div>
  );
}
