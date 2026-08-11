import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ArchProvider } from "@/components/arch/arch-provider";
import { ArchBar } from "@/components/arch/arch-bar";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { profile } from "@/data/profile";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arnavmangaonkar.dev";
const TITLE = "Arnav Mangaonkar — AI, Robotics & Embedded Systems Engineer";
const DESCRIPTION =
  "Portfolio of Arnav Mangaonkar: an engineer building intelligent systems at the intersection of AI, robotics, computer vision, embedded systems, and industrial automation.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — Arnav Mangaonkar",
  },
  description: DESCRIPTION,
  keywords: [
    "Arnav Mangaonkar",
    "AI Engineer",
    "Robotics Engineer",
    "Computer Vision",
    "Embedded Systems",
    "Industrial Automation",
    "Edge AI",
    "Machine Learning Engineer",
    "ROS2",
    "Portfolio",
  ],
  authors: [{ name: "Arnav Mangaonkar", url: SITE_URL }],
  creator: "Arnav Mangaonkar",
  applicationName: "Arnav Mangaonkar Portfolio",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Arnav Mangaonkar",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: SITE_URL,
  jobTitle: profile.role,
  email: profile.email,
  address: { "@type": "PostalAddress", addressLocality: profile.location },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: profile.education.school,
  },
  sameAs: [profile.links.github, profile.links.linkedin],
};

// Applies the persisted Arch Rice Mode theme to <body> before first paint,
// so reloading with rice mode on never flashes the professional theme first.
const PRE_PAINT_SCRIPT = `
(function () {
  try {
    var v = window.localStorage.getItem('theme-arch');
    if (v === 'on') document.body.classList.add('theme-arch');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {/* Runs before anything else in <body>, so a persisted Rice Mode
            choice is applied to document.body pre-paint — no theme flash. */}
        <script dangerouslySetInnerHTML={{ __html: PRE_PAINT_SCRIPT }} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[300] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <TooltipProvider delay={150}>
          <ArchProvider>
            <ArchBar />
            <Navbar />
            <main id="main-content" className="flex-1 pt-18">
              {children}
            </main>
            <Footer />
          </ArchProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
