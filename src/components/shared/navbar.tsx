"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Download, Mail, Menu, X } from "lucide-react";
import { profile } from "@/data/profile";
import { WORKSPACES } from "@/lib/arch";
import { useArchMode } from "@/components/arch/arch-provider";
import { ArchToggleButton } from "@/components/arch/arch-toggle-button";
import { GithubIcon, LinkedinIcon } from "@/components/shared/brand-icons";
import { cn } from "@/lib/utils";

const NAV_LINKS = WORKSPACES.filter((w) => w.sectionId !== "home");

export function Navbar() {
  const { activeSection, goToSection } = useArchMode();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (sectionId: string) => {
    setOpen(false);
    goToSection(sectionId);
  };

  return (
    <header
      id="site-navbar"
      className={cn(
        "fixed inset-x-0 top-0 z-100 h-18 border-b transition-colors duration-300",
        scrolled
          ? "border-border bg-background/80 backdrop-blur-lg"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNav("home");
          }}
          className="flex items-center gap-2 text-sm font-semibold tracking-tight"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
            {profile.initials}
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNav(link.sectionId)}
              aria-current={activeSection === link.sectionId ? "page" : undefined}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm capitalize transition-colors",
                activeSection === link.sectionId
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <IconLink href={profile.links.github} label="GitHub profile">
            <GithubIcon size={17} />
          </IconLink>
          <IconLink href={profile.links.linkedin} label="LinkedIn profile">
            <LinkedinIcon size={17} />
          </IconLink>
          <IconLink href={profile.links.email} label="Email Arnav">
            <Mail size={17} />
          </IconLink>
          <div className="mx-1 h-5 w-px bg-border" aria-hidden="true" />
          <ArchToggleButton className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-amber hover:text-amber" />
          <a
            href={profile.links.resume}
            download
            className="flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            <Download size={14} />
            Resume
          </a>
        </div>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-md text-foreground md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Primary mobile">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNav(link.sectionId)}
                className="rounded-md px-3 py-2 text-left text-sm capitalize text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                {link.label}
              </button>
            ))}
          </nav>
          <div className="mt-3 flex items-center gap-3 border-t border-border pt-3">
            <IconLink href={profile.links.github} label="GitHub profile">
              <GithubIcon size={18} />
            </IconLink>
            <IconLink href={profile.links.linkedin} label="LinkedIn profile">
              <LinkedinIcon size={18} />
            </IconLink>
            <IconLink href={profile.links.email} label="Email Arnav">
              <Mail size={18} />
            </IconLink>
            <ArchToggleButton className="ml-auto flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground" />
          </div>
        </div>
      )}
    </header>
  );
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
    >
      {children}
    </a>
  );
}
