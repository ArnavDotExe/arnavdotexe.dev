"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  WORKSPACES,
  enableArchToggle,
  getStoredArchState,
  loadArchVisitors,
  readMemoryUsage,
  setArch,
  type MemoryReading,
} from "@/lib/arch";

interface ArchContextValue {
  mounted: boolean;
  isArch: boolean;
  activeSection: string;
  memory: MemoryReading;
  visitors: number | null;
  toggleArch: () => void;
  goToSection: (sectionId: string) => void;
}

const ArchContext = createContext<ArchContextValue | null>(null);

export function useArchMode() {
  const ctx = useContext(ArchContext);
  if (!ctx) throw new Error("useArchMode must be used within <ArchProvider>");
  return ctx;
}

const SECTION_IDS = WORKSPACES.map((w) => w.sectionId);

export function ArchProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [isArch, setIsArch] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(SECTION_IDS[0]);
  const [memory, setMemory] = useState<MemoryReading>({ supported: false });
  const [visitors, setVisitors] = useState<number | null>(null);

  const readBarRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  // Sync with whatever the pre-paint script already applied to <body>.
  useEffect(() => {
    setMounted(true);
    setIsArch(getStoredArchState() === "on");

    const cleanup = enableArchToggle();
    const onArchChange = (e: Event) => {
      const detail = (e as CustomEvent<boolean>).detail;
      setIsArch(Boolean(detail));
    };
    window.addEventListener("archchange", onArchChange);
    return () => {
      cleanup();
      window.removeEventListener("archchange", onArchChange);
    };
  }, []);

  // rAF-driven scroll tracking — drives #arch-read directly via ref to
  // avoid a React re-render on every scroll frame.
  useEffect(() => {
    const updateProgress = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const pct = scrollable > 0 ? Math.min(100, Math.max(0, (doc.scrollTop / scrollable) * 100)) : 0;
      if (readBarRef.current) {
        readBarRef.current.style.width = `${pct}%`;
        readBarRef.current.setAttribute("aria-valuenow", String(Math.round(pct)));
      }
      rafRef.current = null;
    };

    const onScroll = () => {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Active-section tracking, shared by the professional nav and the Arch workspace bar.
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Memory module — polls the non-standard performance.memory API.
  // Falls back gracefully (supported: false) on Firefox/Safari.
  useEffect(() => {
    setMemory(readMemoryUsage());
    const id = window.setInterval(() => setMemory(readMemoryUsage()), 2000);
    return () => window.clearInterval(id);
  }, []);

  // Visitor counter — fetched once; failures are swallowed in loadArchVisitors().
  useEffect(() => {
    let cancelled = false;
    loadArchVisitors().then((count) => {
      if (!cancelled) setVisitors(count);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const toggleArch = useCallback(() => setArch(!isArch), [isArch]);

  const goToSection = useCallback((sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const value = useMemo<ArchContextValue>(
    () => ({ mounted, isArch, activeSection, memory, visitors, toggleArch, goToSection }),
    [mounted, isArch, activeSection, memory, visitors, toggleArch, goToSection]
  );

  return (
    <ArchContext.Provider value={value}>
      {children}
      <div
        id="arch-read"
        ref={readBarRef}
        role="progressbar"
        aria-label="Reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
      />
    </ArchContext.Provider>
  );
}
