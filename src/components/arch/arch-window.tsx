import type { ReactNode } from "react";

const DOT_COLORS = ["#f38ba8", "#f9e2af", "#a6e3a1"];

export function ArchWindow({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="arch-window">
      <div className="arch-window-titlebar" aria-hidden="true">
        {DOT_COLORS.map((color) => (
          <span key={color} className="arch-dot" style={{ background: color }} />
        ))}
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
}
