"use client";

import { useBag } from "./bag-provider";

export function BagNav({ className }: { className?: string }) {
  const { items, activeId, setActiveId } = useBag();

  return (
    <nav
      aria-label="Bag items"
      className={`pixel-panel pixel-corners flex flex-col overflow-y-auto p-2 ${className ?? ""}`}
    >
      {items.map((item) => {
        const Icon = item.icon;
        const active = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            aria-current={active ? "true" : undefined}
            onClick={() => setActiveId(item.id)}
            className="bag-nav-item"
            style={active ? ({ "--item-accent": item.accent } as React.CSSProperties) : undefined}
          >
            <span className="bag-nav-cursor" aria-hidden="true">
              {active ? "▶" : ""}
            </span>
            <Icon size={14} className="shrink-0" />
            <span className="truncate">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
