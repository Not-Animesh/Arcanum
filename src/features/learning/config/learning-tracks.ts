import type { LearningTrack } from "../types";

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
    id: "dbms",
    label: "DBMS",
    description: "Relational modeling, SQL, normalization, indexing, and transaction management.",
  },
  {
    id: "oops",
    label: "OOPs",
    description: "Object-oriented principles, SOLID design, and essential design patterns.",
  },
  {
    id: "cn",
    label: "Computer Networks",
    description: "How devices communicate: network models, protocols, routing, and the internet stack.",
  },
  {
    id: "os",
    label: "Operating Systems",
    description: "Processes, threads, CPU scheduling, synchronization, memory, and file systems.",
  },
];