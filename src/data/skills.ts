export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skills: SkillCategory[] = [
  {
    category: "AI & ML",
    skills: [
      "Machine Learning",
      "Generative AI",
      "LLM Applications",
      "RAG Pipelines",
      "Vector Databases",
      "Scikit-learn",
      "PyTorch",
      "Pandas",
      "NumPy",
    ],
  },
  {
    category: "Computer Vision",
    skills: ["OpenCV", "Ultralytics / YOLO", "Object Detection", "Edge Inference"],
  },
  {
    category: "Robotics",
    skills: ["Robotics", "ROS2", "Digital Twins", "Embedded Control", "Sensor Integration"],
  },
  {
    category: "Embedded Systems",
    skills: ["Embedded C", "Embedded Firmware", "Embedded Linux", "Raspberry Pi", "ESP32", "IoT"],
  },
  {
    category: "Automation",
    skills: ["Industrial Automation", "Anomaly Detection", "Edge Deployment", "Real-Time Monitoring"],
  },
  {
    category: "Cloud",
    skills: ["AWS", "Self-Hosted Infrastructure", "Computer Networks", "VPN / WireGuard"],
  },
  {
    category: "Backend",
    skills: ["Python", "Java", "C / C++", "Flask", "SQL (PostgreSQL, MySQL)", "Concurrency"],
  },
  {
    category: "Frontend",
    skills: ["HTML / CSS", "Streamlit", "Tkinter", "Swing", "Full-Stack Web Apps"],
  },
  {
    category: "Tools",
    skills: ["Git / Version Control", "Matplotlib", "BeautifulSoup", "Linux CLI"],
  },
];

export const spokenLanguages = ["English", "Marathi", "Hindi"];
