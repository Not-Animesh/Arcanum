import { LearningTrack } from "../types";

export const LEARNING_TRACKS: LearningTrack[] = [
  {
    id: "all",
    label: "All",
    description: "Browse all curated roadmaps and structured curriculum paths across computer science.",
  },
  {
    id: "dsa",
    label: "DSA",
    description: "Master algorithms, fundamental data structures, and optimal problem-solving patterns.",
  },
  {
    id: "core-cs",
    label: "Core CS",
    description: "Essential systems fundamentals: Operating Systems, Networks, DBMS, and OOP concepts.",
  },
  {
    id: "system-design",
    label: "System Design",
    description: "Architect scalable, fault-tolerant, and high-throughput distributed systems.",
  },
  {
    id: "data-engineering",
    label: "Data Engineering",
    description: "Modern data pipelines, stream processing, distributed storage, and orchestration.",
  },
  {
    id: "web-design",
    label: "Web Design",
    description: "Modern interface development, accessible layout design, and frontend systems.",
  },
];
