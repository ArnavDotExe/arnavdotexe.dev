"use client";

import { usePathname, useRouter } from "next/navigation";
import { Camera, TerminalSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export function ModeToggle() {
  const pathname = usePathname();
  const router = useRouter();
  const isPhoto = pathname?.startsWith("/photography") ?? false;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isPhoto}
      aria-label={
        isPhoto ? "Switch to developer mode" : "Switch to photographer mode"
      }
      onClick={() => router.push(isPhoto ? "/" : "/photography")}
      className="group fixed right-2 top-1/2 z-[300] flex -translate-y-1/2 flex-col items-center gap-2.5 rounded-full border border-border bg-card/95 p-2.5 shadow-2xl backdrop-blur-md sm:right-5 sm:gap-3 sm:p-3"
    >
      <span
        className={cn(
          "flex flex-col items-center gap-1 transition-colors",
          !isPhoto ? "text-amber" : "text-muted-foreground/50"
        )}
      >
        <TerminalSquare size={18} aria-hidden="true" />
        <span className="font-mono text-[9px] uppercase tracking-wider">dev</span>
      </span>

      <span className="relative h-28 w-9 rounded-full bg-black/50 ring-1 ring-inset ring-border sm:h-36 sm:w-11">
        <span
          className={cn(
            "absolute left-1/2 aspect-square w-7 -translate-x-1/2 rounded-full shadow-lg transition-all duration-300 ease-out sm:w-9",
            isPhoto ? "top-[calc(100%-30px)] sm:top-[calc(100%-38px)]" : "top-[3px]"
          )}
          style={{ background: isPhoto ? "#f0e6d2" : "var(--amber)" }}
          aria-hidden="true"
        />
      </span>

      <span
        className={cn(
          "flex flex-col items-center gap-1 transition-colors",
          isPhoto ? "text-[#f0e6d2]" : "text-muted-foreground/50"
        )}
      >
        <Camera size={18} aria-hidden="true" />
        <span className="font-mono text-[9px] uppercase tracking-wider">shots</span>
      </span>
    </button>
  );
}
