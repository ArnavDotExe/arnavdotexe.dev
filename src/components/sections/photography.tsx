import Image from "next/image";
import { Aperture, ExternalLink } from "lucide-react";
import { profile } from "@/data/profile";
import { photoSlots } from "@/data/photography";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { ArchWindow } from "@/components/arch/arch-window";
import { InstagramIcon } from "@/components/shared/brand-icons";

export function Photography() {
  return (
    <section id="photography" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        eyebrow="05 · Photography"
        title="Through the lens."
        description="Street and travel photography, mostly around Mumbai. A few favorites below — the full album lives on Instagram."
      />

      <ArchWindow title="~/photography$ ls -la instagram/">
        <div className="p-0 md:p-2">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {photoSlots.map((photo, i) => (
              <Reveal key={photo.src} delay={i * 0.06}>
                <a
                  href={profile.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-border transition-colors hover:border-amber/40"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 640px) 25vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-background/0 opacity-0 backdrop-blur-0 transition-all duration-200 group-hover:bg-background/60 group-hover:opacity-100 group-hover:backdrop-blur-[2px]">
                    <ExternalLink size={20} className="text-amber" aria-hidden="true" />
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3} className="mt-6">
            <a
              href={profile.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-border p-5 text-sm font-medium text-muted-foreground transition-colors hover:border-amber hover:text-amber"
            >
              <InstagramIcon size={17} />
              Follow @shillpkarr on Instagram for more
              <Aperture size={15} aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </ArchWindow>
    </section>
  );
}
