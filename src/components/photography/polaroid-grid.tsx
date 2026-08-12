import Image from "next/image";
import { Caveat } from "next/font/google";
import { photoSlots } from "@/data/photography";
import { profile } from "@/data/profile";
import { Reveal } from "@/components/shared/reveal";
import { withBasePath } from "@/lib/base-path";
import { cn } from "@/lib/utils";

const caveat = Caveat({ subsets: ["latin"], weight: ["600"] });

// Deterministic per-card tilt so the album feels scattered, not gridded.
const ROTATIONS = [-4, 3, -6, 5, -2, 4, -5, 2, -3, 6];

export function PolaroidGrid() {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 sm:gap-x-10 lg:grid-cols-4">
      {photoSlots.map((photo, i) => {
        const rotation = ROTATIONS[i % ROTATIONS.length];
        return (
          <Reveal key={photo.src} delay={(i % 8) * 0.06}>
            <a
              href={profile.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              style={{ "--tilt": `${rotation}deg` } as React.CSSProperties}
              className={cn(
                "group relative block rotate-[var(--tilt)] rounded-[2px] bg-[#f5f1e8] p-3 pb-10 shadow-[0_10px_24px_-8px_rgba(0,0,0,0.5)]",
                "transition-all duration-300 ease-out hover:z-10 hover:rotate-0 hover:-translate-y-1.5 hover:shadow-[0_18px_34px_-10px_rgba(0,0,0,0.6)]"
              )}
            >
              <span className="relative block aspect-square w-full overflow-hidden bg-black">
                <Image
                  src={withBasePath(photo.src)}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
                  className="object-cover grayscale-[15%] transition-all duration-300 group-hover:grayscale-0"
                />
              </span>
              {photo.caption && (
                <span
                  className={cn(
                    caveat.className,
                    "absolute inset-x-0 bottom-1.5 text-center text-lg leading-none text-black/70"
                  )}
                >
                  {photo.caption}
                </span>
              )}
            </a>
          </Reveal>
        );
      })}
    </div>
  );
}
