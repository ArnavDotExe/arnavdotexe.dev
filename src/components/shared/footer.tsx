import { Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/shared/brand-icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="site-footer" className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">
            © {year} {profile.name}. Built with Next.js, Tailwind CSS &amp; Framer Motion.
          </p>
          {/* <p className="max-w-xl text-xs text-muted-foreground/70" title={dataSourceNote}>
            Content sourced from GitHub &amp; Arnav directly — LinkedIn returned an
            authentication wall on every automated fetch.
          </p> */}
        </div>

        <div className="flex items-center gap-4">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={profile.links.email}
            aria-label="Email"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
