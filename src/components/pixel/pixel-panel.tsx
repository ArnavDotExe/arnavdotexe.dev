import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PixelPanel({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("pixel-panel pixel-corners", className)}>
      <div className="pixel-panel-titlebar font-pixel" aria-hidden="true">
        <span className="pixel-panel-dot" />
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
}
