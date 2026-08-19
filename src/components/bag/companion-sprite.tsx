import { withBasePath } from "@/lib/base-path";

const SIZE_UNIT = 14;

export function CompanionSprite({
  className,
  cellSize = 8,
}: {
  className?: string;
  cellSize?: number;
}) {
  const size = cellSize * SIZE_UNIT;

  return (
    <span
      className={`pixel-frame animate-pixel-bob-delayed inline-flex ${className ?? ""}`}
      aria-hidden="true"
    >
      <span
        className="pixel-frame-inner pixel-corners pixel-corners-sm flex items-center justify-center bg-[var(--pixel-cream)]"
        style={{ width: size, height: size }}
      >
        <img
          src={withBasePath("/dragonite.png")}
          alt="Dragonite"
          width={size * 0.85}
          height={size * 0.85}
          className="object-contain"
          style={{
            imageRendering: "pixelated",
          }}
        />
      </span>
    </span>
  );
}