import { Award, ExternalLink } from "lucide-react";
import { certifications } from "@/data/certifications";

export function BadgeCasePanel() {
  if (certifications.length === 0) return null;

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {certifications.map((cert) => (
        <li key={cert.name}>
          <a
            href={cert.url}
            target={cert.url ? "_blank" : undefined}
            rel={cert.url ? "noopener noreferrer" : undefined}
            className="flex h-full flex-col border-2 border-border bg-card p-4 transition-colors hover:border-amber/50"
          >
            <div className="mb-2.5 flex items-center justify-between text-amber">
              <Award size={16} />
              {cert.url && <ExternalLink size={13} className="text-muted-foreground" />}
            </div>
            <p className="text-sm font-semibold text-foreground">{cert.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">{cert.issuer}</p>
            <p className="mt-auto pt-2.5 font-pixel text-[8px] text-muted-foreground/60">{cert.date}</p>
          </a>
        </li>
      ))}
    </ul>
  );
}
