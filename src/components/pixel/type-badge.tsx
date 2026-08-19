import { CATEGORY_TYPE } from "@/lib/pixel-types";
import type { ProjectCategory } from "@/data/projects";
import { cn } from "@/lib/utils";

export function TypeBadge({
  category,
  className,
}: {
  category: ProjectCategory;
  className?: string;
}) {
  const type = CATEGORY_TYPE[category];
  return (
    <span className={cn("type-badge font-pixel text-[9px]", type.className, className)}>
      {type.name}
    </span>
  );
}
