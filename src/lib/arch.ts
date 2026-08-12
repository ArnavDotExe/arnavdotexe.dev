export interface Workspace {
  id: number;
  key: string;
  label: string;
  sectionId: string;
  title: string;
}

/**
 * Workspaces mirror the portfolio's sections 1:1, Hyprland-style.
 * `title` is what #arch-window-title shows while that section is active.
 */
export const WORKSPACES: Workspace[] = [
  { id: 1, key: "1", label: "home", sectionId: "home", title: "~/arnav — home" },
  { id: 2, key: "2", label: "about", sectionId: "about", title: "~/arnav/about" },
  { id: 3, key: "3", label: "work", sectionId: "experience", title: "~/arnav/experience" },
  { id: 4, key: "4", label: "projects", sectionId: "projects", title: "~/arnav/projects" },
  { id: 5, key: "5", label: "skills", sectionId: "skills", title: "~/arnav/skills" },
  { id: 6, key: "6", label: "contact", sectionId: "contact", title: "~/arnav/contact" },
];

export interface MemoryReading {
  supported: boolean;
  usedMB?: number;
  limitMB?: number;
  percent?: number;
}

/** Reads the non-standard performance.memory API, with a graceful fallback. */
export function readMemoryUsage(): MemoryReading {
  if (typeof performance === "undefined") return { supported: false };
  const mem = (performance as Performance & {
    memory?: { usedJSHeapSize: number; jsHeapSizeLimit: number };
  }).memory;
  if (!mem || !mem.jsHeapSizeLimit) return { supported: false };
  const usedMB = mem.usedJSHeapSize / 1_048_576;
  const limitMB = mem.jsHeapSizeLimit / 1_048_576;
  return {
    supported: true,
    usedMB,
    limitMB,
    percent: Math.min(100, Math.round((usedMB / limitMB) * 100)),
  };
}

const VISITOR_NAMESPACE = "arnavmangaonkar-dev-portfolio";
const VISITOR_KEY = "visits";

/**
 * Bumps and reads a public hit counter for #arch-vis. Uses a free,
 * unauthenticated counter API — if it's unreachable or blocked (adblock,
 * offline, CORS, rate limit), this fails completely silently and callers
 * just see `null`, per spec ("silent visitor endpoint failures").
 */
export async function loadArchVisitors(): Promise<number | null> {
  try {
    const res = await fetch(
      `https://api.countapi.xyz/hit/${VISITOR_NAMESPACE}/${VISITOR_KEY}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const data: unknown = await res.json();
    if (
      typeof data === "object" &&
      data !== null &&
      "value" in data &&
      typeof (data as { value: unknown }).value === "number"
    ) {
      return (data as { value: number }).value;
    }
    return null;
  } catch {
    return null;
  }
}
