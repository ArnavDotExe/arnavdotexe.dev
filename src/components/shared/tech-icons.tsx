import type { SimpleIcon } from "simple-icons";

/** Renders an official brand mark from simple-icons in its own brand color
 * (hand-rolled monochrome icons don't fit here — these need to be
 * recognizable as the actual logo, not a restyled glyph). */
export function TechIcon({
  icon,
  size = 16,
  className,
}: {
  icon: SimpleIcon;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      role="img"
      aria-label={icon.title}
    >
      <title>{icon.title}</title>
      <path fill={`#${icon.hex}`} d={icon.path} />
    </svg>
  );
}
