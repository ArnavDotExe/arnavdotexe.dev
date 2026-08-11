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
      "Working in R&D on manufacturing efficiency and automation, applying automation and process-monitoring systems to real production environments.",
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
      "Developed a real-time detection and alert system for anomalies and errors occurring in additive manufacturing, specifically FDM 3D printing.",
      "Worked across the embedded + edge-inference stack: capturing print video, running lightweight anomaly-detection models on-device, and surfacing actionable alerts.",
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
      "Built a web application to analyze energy generation data and plot it dynamically against time and other operating parameters.",
      "Developed a real-time monitoring program that analyzes energy generation data and flags malfunctioning or anomalous transformers.",
    ],
    tags: ["Python", "Data Analysis", "Real-Time Monitoring", "Energy Systems"],
  },
];
