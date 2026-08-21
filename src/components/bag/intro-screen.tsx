"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { projects, type ProjectCategory } from "@/data/projects";
import { PixelAvatar } from "@/components/pixel/pixel-avatar";
import { useBag } from "./bag-provider";

const currentRole = experience.find((e) => e.current) ?? experience[0];

/** Reveals `text` a character at a time, like a Game Boy dialogue box.
 * Skips straight to the full text under prefers-reduced-motion. */
function useTypewriter(text: string, speed = 32, delay = 150) {
  const [output, setOutput] = useState("");

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setOutput(text);
      return;
    }

    setOutput("");
    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const startTimeout = setTimeout(() => {
      interval = setInterval(() => {
        i++;
        setOutput(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
    };
  }, [text, speed, delay]);

  return output;
}

export function IntroScreen() {
  const { openBag } = useBag();
  const scope = useRef<HTMLDivElement>(null);
  const typedEncounterLine = useTypewriter("a wild engineer appeared!");

  const domains = useMemo(() => {
    const seen = new Set<ProjectCategory>();
    projects.forEach((p) => p.categories.forEach((c) => seen.add(c)));
    return [...seen];
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        openBag();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openBag]);

  useGSAP(
    () => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from("[data-intro-item]", { opacity: 0, y: 18, duration: 0.6, stagger: 0.1 });
    },
    { scope }
  );

  return (
    <div
      ref={scope}
      className="intro-screen relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-5 py-16 text-center"
    >
      <div className="intro-scanlines" aria-hidden="true" />
      <div className="intro-vignette" aria-hidden="true" />

      <div data-intro-item className="mb-8">
        <PixelAvatar />
      </div>

      <p
        data-intro-item
        aria-live="polite"
        className="mb-3 font-pixel text-[10px] uppercase tracking-[0.15em] text-[var(--pixel-yellow)] sm:text-xs"
      >
        {typedEncounterLine}
      </p>

      <h1
        data-intro-item
        className="max-w-2xl text-4xl font-semibold leading-[1.05] tracking-tight text-balance text-foreground sm:text-6xl lg:text-7xl"
      >
        {profile.name}
      </h1>

      <p data-intro-item className="mt-3 max-w-md text-base font-medium text-amber sm:text-lg">
        {profile.positioning}
      </p>

      <p
        data-intro-item
        className="mt-4 max-w-lg font-pixel text-[10px] uppercase leading-relaxed tracking-wide text-[var(--pixel-grass)] sm:text-xs"
      >
        {domains.join(" · ")}
      </p>

      <p data-intro-item className="mt-2 max-w-md text-sm text-muted-foreground">
        {profile.status} · {currentRole.role} @ {currentRole.company}
      </p>

      <button
        type="button"
        data-intro-item
        onClick={openBag}
        className="pixel-btn mt-10 flex items-center gap-2.5 bg-primary px-7 py-3.5 font-pixel text-xs text-primary-foreground"
      >
        open bag
      </button>

      <p
        data-intro-item
        className="mt-9 flex items-center gap-1.5 font-pixel text-[9px] uppercase tracking-wide text-muted-foreground/70"
      >
        press enter to continue
        <span className="animate-blink" aria-hidden="true">
          ▼
        </span>
      </p>
    </div>
  );
}
