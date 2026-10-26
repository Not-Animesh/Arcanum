import { LearningResource } from "../types";

export const LEARNING_RESOURCES: LearningResource[] = [
  // DSA
  {
    id: "res-dsa",
    slug: "dsa",
    title: "Data Structures & Algorithms",
    shortDescription:
      "Master essential data structures from arrays and trees to dynamic programming and graph algorithms.",
    trackId: "dsa",
    trackLabel: "DSA",
    iconName: "Waypoints",
    modulesCount: 12,
    topicsCount: 54,
    estimatedDuration: "80 hours",
    level: "Intermediate",
    href: "/subjects/dsa",
    isAvailable: true,
  },

  // Core CS
  {
    id: "res-cn",
    slug: "cn",
    title: "Computer Networks",
    shortDescription:
      "Understand how devices communicate, how network protocols work, and how data moves across the internet.",
    trackId: "core-cs",
    trackLabel: "Core CS",
    iconName: "Network",
    modulesCount: 10,
    topicsCount: 38,
    estimatedDuration: "35 hours",
    level: "Intermediate",
    href: "/subjects/cn",
    isAvailable: true,
  },
  {
    id: "res-dbms",
    slug: "dbms",
    title: "Database Management Systems",
    shortDescription:
      "Relational modeling, indexing, normalization, transaction isolation, and query optimization.",
    trackId: "core-cs",
    trackLabel: "Core CS",
    iconName: "Database",
    modulesCount: 8,
    topicsCount: 32,
    estimatedDuration: "30 hours",
    level: "Intermediate",
    href: "/subjects/dbms",
    isAvailable: true,
  },
  {
    id: "res-os",
    slug: "os",
    title: "Operating Systems",
    shortDescription:
      "Processes, multi-threading, CPU scheduling, virtual memory, concurrency, and file systems.",
    trackId: "core-cs",
    trackLabel: "Core CS",
    iconName: "Terminal",
    modulesCount: 8,
    topicsCount: 34,
    estimatedDuration: "32 hours",
    level: "Intermediate",
    href: "/subjects/os",
    isAvailable: true,
  },
  {
    id: "res-oops",
    slug: "oops",
    title: "Object-Oriented Programming",
    shortDescription:
      "Encapsulation, inheritance, polymorphism, abstraction, design patterns, and SOLID principles.",
    trackId: "core-cs",
    trackLabel: "Core CS",
    iconName: "BrainCircuit",
    modulesCount: 6,
    topicsCount: 24,
    estimatedDuration: "20 hours",
    level: "Beginner",
    href: "/subjects/oops",
    isAvailable: true,
  },

  // System Design
  {
    id: "res-system-design",
    slug: "system-design",
    title: "System Design Fundamentals",
    shortDescription:
      "Capacity estimation, caching strategies, load balancing, message queues, and distributed consensus.",
    trackId: "system-design",
    trackLabel: "System Design",
    iconName: "Layers",
    modulesCount: 9,
    topicsCount: 36,
    estimatedDuration: "45 hours",
    level: "Advanced",
    href: "/subjects/system-design",
    isAvailable: true,
  },

  // Data Engineering
  {
    id: "res-data-eng",
    slug: "data-engineering",
    title: "Data Engineering Foundations",
    shortDescription:
      "Batch and stream processing, ETL pipeline orchestration, distributed storage, and data lakes.",
    trackId: "data-engineering",
    trackLabel: "Data Engineering",
    iconName: "Cpu",
    modulesCount: 7,
    topicsCount: 28,
    estimatedDuration: "40 hours",
    level: "Intermediate",
    href: "/subjects/data-engineering",
    isAvailable: true,
  },

  // Web Design
  {
    id: "res-web-dev",
    slug: "web-dev",
    title: "Web Development & Design",
    shortDescription:
      "Modern semantic HTML, responsive CSS layouts with Flexbox and Grid, JavaScript core, and accessibility.",
    trackId: "web-design",
    trackLabel: "Web Design",
    iconName: "Code2",
    modulesCount: 8,
    topicsCount: 32,
    estimatedDuration: "35 hours",
    level: "Beginner",
    href: "/subjects/web-dev",
    isAvailable: true,
  },
];
