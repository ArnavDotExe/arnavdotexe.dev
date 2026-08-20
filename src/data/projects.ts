export type ProjectCategory =
  | "Robotics"
  | "Computer Vision"
  | "Embedded Systems"
  | "AI / ML"
  | "Automation"
  | "Infrastructure";

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  categories: ProjectCategory[];
  tech: string[];
  achievements: string[];
  github: string;
  period: string;
  featured: boolean;
  status: "Active" | "Shipped" | "Published";
  /** false = GitHub (Arnav-PC) only, hidden from the curated Projectdex. Defaults to true. */
  showInDex?: boolean;
}

// Verified against github.com/ArnavDotExe (public repos) and Arnav's resume.
export const projects: Project[] = [
  {
    slug: "gatenet-am",
    name: "GateNet-AM",
    tagline: "gated neural net that catches 3D-print fails in real time",
    description:
      "A real-time anomaly detection pipeline for FDM 3D printing that watches live video of a print in progress and flags failures before they waste hours of material and time. GateNet-AM is a custom gated neural network architecture designed specifically for lightweight, low-latency inference on edge hardware.",
    categories: ["Computer Vision", "AI / ML", "Embedded Systems", "Automation"],
    tech: ["Python", "OpenCV", "PyTorch", "Edge Inference", "Computer Vision"],
    achievements: [
      "built a custom gated NN instead of just fine-tuning something off-the-shelf",
      "auto-flags defects with visual annotations for debugging",
      "watches live video, not logs after the fact",
    ],
    github: "https://github.com/ArnavDotExe/GatenetAM",
    period: "Jun 2025 — Feb 2026",
    featured: true,
    status: "Shipped",
  },
  {
    slug: "bytecave",
    name: "ByteCave",
    tagline: "self-hosted DNS, NAS, VPN & media server on a raspberry pi",
    description:
      "A private-cloud-in-a-box: ByteCave combines Pi-hole DNS filtering, a WireGuard VPN, a role-based-access NAS, and a custom lightweight media server into one self-hosted Raspberry Pi system, built to run entirely outside third-party cloud infrastructure.",
    categories: ["Infrastructure", "Automation", "Embedded Systems"],
    tech: ["Raspberry Pi", "Pi-hole", "WireGuard", "Embedded Linux", "Networking"],
    achievements: [
      "pi-hole + wireguard for ad-blocking and remote access, zero third parties involved",
      "self-hosted NAS with actual role-based access control",
      "shipped PiCone, a lightweight media server for 32-bit ARM",
    ],
    github: "https://github.com/ArnavDotExe/ByteCave",
    period: "Nov 2025 — Present",
    featured: true,
    status: "Active",
  },
  {
    slug: "codecomp",
    name: "CodeComp",
    tagline: "ask your codebase questions, get grounded answers back",
    description:
      "A Flask application that clones a GitHub repository, parses its structure, and lets you ask questions about the codebase in natural language. Combines AST-aware chunking with semantic embeddings and keyword search so answers stay grounded in the actual source.",
    categories: ["AI / ML", "Infrastructure"],
    tech: ["Flask", "Python AST", "BAAI/bge-small-en-v1.5", "Groq", "RAG", "Vector Search"],
    achievements: [
      "AST-aware chunking so it actually understands code structure",
      "hybrid retrieval: cosine similarity + keyword scoring",
      "groq-powered answers that stay grounded in your actual repo",
    ],
    github: "https://github.com/ArnavDotExe/CodeComp",
    period: "Jan 2026 — Apr 2026",
    featured: true,
    status: "Shipped",
  },
  {
    slug: "motoguard",
    name: "MotoGuard",
    tagline: "copyrighted car anti-theft system, camera-based intruder capture",
    description:
      "A driver-side camera and connectivity module for vehicle security, published as copyrighted IP in 2025. Captures and streams evidence of an intrusion in real time over a bandwidth-optimized video pipeline running on ESP32.",
    categories: ["Embedded Systems", "Computer Vision", "Automation"],
    tech: ["ESP32", "Embedded Firmware", "MJPEG", "Computer Vision", "IoT"],
    achievements: [
      "copyrighted IP, published 2025",
      "driver-side cam catches intruders in the act",
      "custom MJPEG encoder on ESP32 for low-latency streaming",
    ],
    github: "https://github.com/ArnavDotExe/Car-Theft-Auto",
    period: "Published 2025",
    featured: true,
    status: "Published",
  },
  {
    slug: "tinygpt",
    name: "TinyGPT",
    tagline: "a GPT built from scratch, just to see how it works",
    description:
      "An exploration of transformer language model internals, implementing a small GPT-style model from first principles to understand attention, tokenization, and training dynamics rather than relying on a pretrained checkpoint.",
    categories: ["AI / ML"],
    tech: ["Python", "PyTorch", "Transformers", "Jupyter"],
    achievements: ["wrote the transformer architecture from first principles — no shortcuts"],
    github: "https://github.com/ArnavDotExe/TinyGPT",
    period: "2026",
    featured: false,
    status: "Shipped",
  },
  {
    slug: "bitpy",
    name: "bitPy",
    tagline: "a bittorrent client built from scratch — no libraries, just the protocol",
    description:
      "A minimal, educational BitTorrent client written in pure Python — tracker communication, peer connections, and piece exchange/verification all implemented straight from the protocol spec rather than a wrapper library. Ships with both a Tkinter GUI and a CLI.",
    categories: ["Infrastructure"],
    tech: ["Python", "Tkinter", "Networking", "Bencode"],
    achievements: [
      "implemented the BitTorrent protocol from spec — tracker comms, peer handshakes, piece scheduling — zero external dependencies",
      "piece verification and storage handled manually, no torrent library doing the work",
      "both a GUI and a CLI, same core underneath",
    ],
    github: "https://github.com/ArnavDotExe/bitPy",
    period: "Aug 2025 — Present",
    featured: false,
    status: "Active",
  },
  {
    slug: "picone",
    name: "PiCone",
    tagline: "self-hosted media server that streams straight off a raspberry pi, no transcoding",
    description:
      "A lightweight, self-hosted media server built specifically for 32-bit ARM Raspberry Pi hardware — direct HTTP streaming with byte-range support (seekable in a plain browser player) and zero transcoding, so it stays light on CPU and memory. REST API for movies and TV, optional TMDb metadata, and playback position memory. Originally shipped as part of ByteCave.",
    categories: ["Infrastructure", "Embedded Systems"],
    tech: ["Python", "Raspberry Pi", "REST API", "TMDb"],
    achievements: [
      "zero-transcode direct streaming with byte-range support — seeks work in a plain browser player",
      "runs on 32-bit ARM without choking, no GPU or beefy CPU needed",
      "remembers playback position and pulls poster/title metadata from TMDb",
    ],
    github: "https://github.com/ArnavDotExe/PiCone",
    period: "Apr 2026",
    featured: false,
    status: "Shipped",
    showInDex: false,
  },
  {
    slug: "flappy-ai",
    name: "Flappy.ai",
    tagline: "flappy bird, but the AI learns to play it via genetic algorithm",
    description:
      "A Flappy Bird clone with a twist — instead of hardcoding the AI, a population of 100 birds evolves across generations using a genetic algorithm. Each bird's tiny neural network (distance to the next pipe, height difference) gets selected and mutated based on how far it survives, with a real-time view of generation, score, and birds-alive stats while it trains.",
    categories: ["AI / ML"],
    tech: ["Python", "Pygame", "NumPy", "Genetic Algorithms", "Neural Networks"],
    achievements: [
      "population of 100 birds evolving via natural selection, not a pretrained model",
      "tiny neural net per bird — 2 inputs, weights evolve generation over generation",
      "live training visualization: generation, score, and birds-alive in real time",
    ],
    github: "https://github.com/ArnavDotExe/Flappy.ai",
    period: "Oct 2024",
    featured: false,
    status: "Shipped",
  },
  {
    slug: "pytorrentstreamer",
    name: "PyTorrentStreamer",
    tagline: "search a movie, stream it straight to vlc — no download-and-wait",
    description:
      "A command-line tool for searching, streaming, and downloading movies over torrents. Pulls listings from the YTS API, then hands off to WebTorrent CLI for the actual transfer — stream picks play straight into VLC as they download instead of waiting for the whole file.",
    categories: ["Infrastructure"],
    tech: ["Python", "YTS API", "WebTorrent", "VLC"],
    achievements: [
      "streams while downloading via WebTorrent CLI — no waiting for the full file",
      "pulls real listings from the YTS API instead of scraping",
      "hands playback straight to VLC",
    ],
    github: "https://github.com/ArnavDotExe/PyTorrentStreamer",
    period: "Aug 2024 — Dec 2024",
    featured: false,
    status: "Shipped",
    showInDex: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
