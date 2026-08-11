import { Reveal } from "./reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="mb-12 max-w-2xl md:mb-16">
      <span className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-amber">
        <span className="h-1.5 w-1.5 rounded-full bg-amber" aria-hidden="true" />
        {eyebrow}
      </span>
      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>
      )}
    </Reveal>
  );
}
