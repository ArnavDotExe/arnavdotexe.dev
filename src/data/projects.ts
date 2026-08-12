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
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
