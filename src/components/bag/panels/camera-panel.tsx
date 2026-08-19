import Image from "next/image";
import { photoSlots } from "@/data/photography";
import { profile } from "@/data/profile";
import { withBasePath } from "@/lib/base-path";
import { InstagramIcon } from "@/components/shared/brand-icons";

export function CameraPanel() {
  return (
    <div>
      <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
        A secret item — the photo album! A few favorites below; the full set lives on{" "}
        <a
          href={profile.links.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-amber hover:underline"
        >
          <InstagramIcon size={13} />
          @shillpkarr
        </a>
        .
      </p>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {photoSlots.map((photo) => (
          <a
            key={photo.src}
            href={profile.links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-square overflow-hidden border-2 border-border bg-black transition-colors hover:border-amber/50"
          >
            <Image
              src={withBasePath(photo.src)}
              alt={photo.alt}
              fill
              sizes="(min-width: 640px) 22vw, 45vw"
              className="object-cover grayscale-[15%] transition-all duration-300 group-hover:grayscale-0"
            />
            {photo.caption && (
              <span className="absolute inset-x-0 bottom-0 truncate bg-black/55 px-2 py-1 font-pixel text-[8px] text-white">
                {photo.caption}
              </span>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
