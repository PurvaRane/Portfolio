
import { Project, Experience, Education, Certification } from './types';

export const PROJECTS: Project[] = [
  {
    title: "BreedVision - AI-Based Breed Recognition",
    date: "Nov 2025 - Dec 2025",
    description: "AI-powered, offline-first mobile system for cattle and buffalo breed recognition.",
    technologies: ["YOLOv12", "TensorFlow Lite", "Flutter"],
    achievements: [
      "Optimized for low-range Android devices with <100ms latency",
      "Achieved >90% accuracy in ICAR pilots",
      "Integrated with Bharat Pashudhan App (BPA) via structured APIs",
      "Adopted human-in-the-loop workflow for continuous model improvement"
    ]
  },
  {
    title: "WiseTrack - AI-Powered Education Platform",
    date: "Aug 2024 - May 2025",
    description: "End-to-end management solution aimed at reducing student dropout rates.",
    technologies: ["ReactJS", "NodeJS", "Firebase", "Capacitor", "XGBoost"],
    achievements: [
      "Implemented early dropout prediction with 99.8% accuracy",
      "Presented at national hackathons including SIH 2024",
      "Features: Smart attendance, mental health monitoring, and multilingual support"
    ]
  },
{
  title: "COEP Lost & Found Portal",
  date: "Nov 2025 - Dec 2025",
  description: "Centralized web portal developed as a DSA mini-project to address campus lost-and-found management inefficiencies.",
  technologies: ["React", "TypeScript", "Firebase", "Vite"],
  achievements: [
    "Applied core Data Structures & Algorithms concepts in a real-world system design",
    "Implemented Trie-based search for fast item lookup and keyword matching",
    "Used Hash Maps for efficient indexing, filtering, and constant-time data access",
    "Type-safe, maintainable frontend codebase with TypeScript",
    "Real-time data synchronization using Firebase Realtime Database"
  ]
},
  {
    title: "Evento - Real-Time Management App",
    date: "Nov 2024 - Jan 2025",
    description: "Full-featured mobile app for event registration and attendance.",
    technologies: ["React Native", "Firebase", "Discord API"],
    achievements: [
      "Delivered 70% functionality within a 24-hour hackathon",
      "QR-based attendance and live buzzer communication",
      "Rapid prototyping using agile methodologies"
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    role: "Computer Hardware & OS Intern",
    company: "Blackbox Technologies",
    location: "Pune",
    duration: "Jun 2024 - Jul 2024",
    responsibilities: [
      "Worked with motherboard architecture, microprocessors, and memory units",
      "Analyzed system failures and identified faulty hardware components",
      "Performed OS installations and system-level troubleshooting"
    ],
    outcome: "Developed strong foundational skills in hardware analysis and system configuration, boosting technical confidence in hardware-software interaction."
  }
];

export const EDUCATION: Education[] = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "COEP Technological University, Pune",
    duration: "2025 - 2028",
    details: "Currently in 2nd Year, participating and exploring emerging technologies."
  },
  {
    degree: "Diploma in Computer Science & Engineering",
    institution: "Dr. Babasaheb Ambedkar Technological University",
    duration: "2022 - 2025",
    percentage: "98.80%"
  },
  {
    degree: "Secondary Education (X)",
    institution: "SPM English Medium School, Parshuram",
    duration: "2022",
    percentage: "94.40%"
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: "Ethical Hacking",
    issuer: "Internshala",
    date: "May 2025 - Jul 2025",
    details: [
      "Scored 98% in final assessment",
      "Mastered Reconnaissance, OWASP, Penetration Testing, and WiFi Hacking",
      "Top performer in the training batch"
    ]
  },
  {
    name: "Virtual Reality Development",
    issuer: "Institution's Innovation Council",
    date: "Feb 2025",
    details: [
      "Hands-on with Unity 3D and Meta Quest",
      "Explored education & simulation applications",
      "Learned VR design principles and 3D storytelling"
    ]
  }
];
