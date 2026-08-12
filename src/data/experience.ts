export interface ExperienceEntry {
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  current: boolean;
  domain: string;
  points: string[];
  tags: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: "R&D Engineer",
    company: "Binks",
    period: "Jul 2026 — Present",
    current: true,
    domain: "Manufacturing Efficiency & Automation",
    points: [
      "Making manufacturing less painful — automation and process monitoring for real production lines, not just demos.",
    ],
    tags: ["R&D", "Manufacturing", "Automation", "Process Efficiency"],
  },
  {
    role: "Embedded Developer Consultant",
    company: "Vektor3d Systems LLP",
    period: "Jun 2025 — Jan 2026",
    current: false,
    domain: "R&D / Industrial Automation",
    points: [
      "Built a system that catches 3D-printer defects in real time, before they waste hours of filament.",
      "Ran anomaly-detection models on-device — video in, alerts out.",
    ],
    tags: ["Embedded C", "Edge AI", "Anomaly Detection", "Additive Manufacturing", "R&D"],
  },
  {
    role: "Data Analyst Intern",
    company: "Tata Power Renewables Limited",
    period: "Dec 2024 — Mar 2025",
    current: false,
    domain: "Energy / Industrial Data Systems",
    points: [
      "Built a dashboard to visualize energy generation data in real time.",
      "Wrote the monitoring script that flags transformers acting up before they become a real problem.",
    ],
    tags: ["Python", "Data Analysis", "Real-Time Monitoring", "Energy Systems"],
  },
];
