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
    tagline: "Gated neural network for real-time anomaly detection in additive manufacturing",
    description:
      "A real-time anomaly detection pipeline for FDM 3D printing that watches live video of a print in progress and flags failures before they waste hours of material and time. GateNet-AM is a custom gated neural network architecture designed specifically for lightweight, low-latency inference on edge hardware.",
    categories: ["Computer Vision", "AI / ML", "Embedded Systems", "Automation"],
    tech: ["Python", "OpenCV", "PyTorch", "Edge Inference", "Computer Vision"],
    achievements: [
      "Designed a gated NN architecture optimized for low-latency edge inference rather than adapting a general-purpose model",
      "Built automated defect classification with visual annotations and logging for debugging and performance tracking",
      "Runs against live video input for early failure detection, not post-hoc analysis",
    ],
    github: "https://github.com/ArnavDotExe/GatenetAM",
    period: "Jun 2025 — Feb 2026",
    featured: true,
    status: "Shipped",
  },
  {
    slug: "bytecave",
    name: "ByteCave",
    tagline: "Self-hosted DNS, NAS, VPN, ad-blocker, and media server on Raspberry Pi",
    description:
      "A private-cloud-in-a-box: ByteCave combines Pi-hole DNS filtering, a WireGuard VPN, a role-based-access NAS, and a custom lightweight media server into one self-hosted Raspberry Pi system, built to run entirely outside third-party cloud infrastructure.",
    categories: ["Infrastructure", "Automation", "Embedded Systems"],
    tech: ["Raspberry Pi", "Pi-hole", "WireGuard", "Embedded Linux", "Networking"],
    achievements: [
      "Deployed Pi-hole DNS filtering with a WireGuard VPN for secure ad-blocking and remote access",
      "Built a self-hosted NAS with role-based access control and secure file sharing across local and VPN clients",
      "Optimized DNS resolution and caching, and enforced firewall rules to strengthen privacy and performance",
      "Shipped PiCone, a companion lightweight media server built for 32-bit ARM CPUs",
    ],
    github: "https://github.com/ArnavDotExe/ByteCave",
    period: "Nov 2025 — Present",
    featured: true,
    status: "Active",
  },
  {
    slug: "codecomp",
    name: "CodeComp",
    tagline: "Repository-aware codebase Q&A assistant with hybrid retrieval",
    description:
      "A Flask application that clones a GitHub repository, parses its structure, and lets you ask questions about the codebase in natural language. Combines AST-aware chunking with semantic embeddings and keyword search so answers stay grounded in the actual source.",
    categories: ["AI / ML", "Infrastructure"],
    tech: ["Flask", "Python AST", "BAAI/bge-small-en-v1.5", "Groq", "RAG", "Vector Search"],
    achievements: [
      "Implemented hybrid code understanding: Python AST chunking with a text fallback for non-Python files",
      "Generated semantic embeddings with BAAI/bge-small-en-v1.5 and built hybrid retrieval combining cosine similarity and keyword scoring",
      "Integrated Groq-based, JSON-grounded answers with chat history and debug tracing",
    ],
    github: "https://github.com/ArnavDotExe/CodeComp",
    period: "Jan 2026 — Apr 2026",
    featured: true,
    status: "Shipped",
  },
  {
    slug: "motoguard",
    name: "MotoGuard",
    tagline: "Copyrighted car anti-theft system with camera-based intruder capture",
    description:
      "A driver-side camera and connectivity module for vehicle security, published as copyrighted IP in 2025. Captures and streams evidence of an intrusion in real time over a bandwidth-optimized video pipeline running on ESP32.",
    categories: ["Embedded Systems", "Computer Vision", "Automation"],
    tech: ["ESP32", "Embedded Firmware", "MJPEG", "Computer Vision", "IoT"],
    achievements: [
      "Published as copyrighted IP in 2025",
      "Implemented a driver-side camera module for intruder identification and evidence capture",
      "Developed an MJPEG encoder on ESP32 to optimize bandwidth and enable low-latency video streaming",
    ],
    github: "https://github.com/ArnavDotExe/Car-Theft-Auto",
    period: "Published 2025",
    featured: true,
    status: "Published",
  },
  {
    slug: "agrobot",
    name: "agroBot",
    tagline: "Autonomous agricultural robotics platform",
    description:
      "A robotics project exploring autonomous navigation and sensing for agricultural use cases — part of Arnav's ongoing work applying embedded control and automation to real-world, outdoor robotics.",
    categories: ["Robotics", "Automation", "Embedded Systems"],
    tech: ["Python", "Robotics", "Sensors", "Embedded Control"],
    achievements: [
      "Applied embedded control and sensing to an autonomous agricultural robotics use case",
    ],
    github: "https://github.com/ArnavDotExe/agroBot",
    period: "2025",
    featured: false,
    status: "Shipped",
  },
  {
    slug: "wall-climbing-car",
    name: "Wall-Climbing Car",
    tagline: "Vacuum-adhesion robot that drives on vertical surfaces",
    description:
      "A wall-climbing robot built around a BLDC motor generating vacuum suction for adhesion, letting the platform drive across vertical surfaces — a mechatronics and control project combining motor control with structural design.",
    categories: ["Robotics", "Embedded Systems"],
    tech: ["C++", "BLDC Motor Control", "Mechatronics"],
    achievements: [
      "Designed a vacuum-adhesion drive system using a BLDC motor to enable driving on vertical surfaces",
    ],
    github: "https://github.com/ArnavDotExe/wall-climbing-car-",
    period: "2023",
    featured: false,
    status: "Shipped",
  },
  {
    slug: "tinygpt",
    name: "TinyGPT",
    tagline: "A minimal GPT-style language model built from scratch",
    description:
      "An exploration of transformer language model internals, implementing a small GPT-style model from first principles to understand attention, tokenization, and training dynamics rather than relying on a pretrained checkpoint.",
    categories: ["AI / ML"],
    tech: ["Python", "PyTorch", "Transformers", "Jupyter"],
    achievements: [
      "Implemented a GPT-style transformer architecture from scratch for hands-on understanding of attention and training",
    ],
    github: "https://github.com/ArnavDotExe/TinyGPT",
    period: "2026",
    featured: false,
    status: "Shipped",
  },
  {
    slug: "nodemcu-wifi-car",
    name: "NodeMCU Wi-Fi Car",
    tagline: "Phone-controlled robotics platform over Wi-Fi",
    description:
      "A mobile-phone-controlled car built on a NodeMCU and L298N motor driver — an early robotics and embedded-networking project on the path toward more advanced autonomous platforms.",
    categories: ["Robotics", "Embedded Systems"],
    tech: ["C++", "NodeMCU", "L298N", "Wi-Fi"],
    achievements: [
      "Built real-time Wi-Fi motor control between a mobile client and an embedded driver board",
    ],
    github: "https://github.com/ArnavDotExe/NodeMcu-Wi-Fi-Car",
    period: "2023",
    featured: false,
    status: "Shipped",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
