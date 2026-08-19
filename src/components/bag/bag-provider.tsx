"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { BAG_ITEMS, type BagItemId } from "@/lib/bag-items";

type MobileView = "list" | "content";

interface BagContextValue {
  bagOpen: boolean;
  openBag: () => void;
  items: typeof BAG_ITEMS;
  activeId: BagItemId;
  setActiveId: (id: BagItemId) => void;
  mobileView: MobileView;
  goBackToList: () => void;
}

const BagContext = createContext<BagContextValue | null>(null);

export function useBag() {
  const ctx = useContext(BagContext);
  if (!ctx) throw new Error("useBag must be used within <BagProvider>");
  return ctx;
}

export function BagProvider({ children }: { children: ReactNode }) {
  const [bagOpen, setBagOpen] = useState(false);
  const [activeId, setActiveIdState] = useState<BagItemId>(BAG_ITEMS[0].id);
  const [mobileView, setMobileView] = useState<MobileView>("list");

  const setActiveId = useCallback((id: BagItemId) => {
    setActiveIdState(id);
    setMobileView("content");
  }, []);

  const goBackToList = useCallback(() => {
    setMobileView("list");
  }, []);

  const openBag = useCallback(() => {
    setBagOpen(true);
  }, []);

  // Keyboard nav: ↑/↓ move the cursor across bag items, Enter selects
  // (and on mobile swaps the list for the content pane), Escape closes the
  // Bag entirely and returns to the intro/home screen.
  useEffect(() => {
    if (!bagOpen) return;
    const onKey = (e: KeyboardEvent) => {
      const index = BAG_ITEMS.findIndex((i) => i.id === activeId);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = BAG_ITEMS[(index + 1) % BAG_ITEMS.length];
        setActiveIdState(next.id);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const next = BAG_ITEMS[(index - 1 + BAG_ITEMS.length) % BAG_ITEMS.length];
        setActiveIdState(next.id);
      } else if (e.key === "Enter") {
        e.preventDefault();
        setMobileView("content");
      } else if (e.key === "Escape") {
        e.preventDefault();
        setMobileView("list");
        setBagOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [bagOpen, activeId]);

  const value = useMemo<BagContextValue>(
    () => ({ bagOpen, openBag, items: BAG_ITEMS, activeId, setActiveId, mobileView, goBackToList }),
    [bagOpen, openBag, activeId, setActiveId, mobileView, goBackToList]
  );

  return <BagContext.Provider value={value}>{children}</BagContext.Provider>;
}
