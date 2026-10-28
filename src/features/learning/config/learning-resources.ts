import type { LearningResource } from "../types";
import { CURRICULA } from "./curricula";

/** Counts come from the real curriculum so the cards never drift out of date. */
function countsFor(slug: string) {
  const modules = CURRICULA[slug]?.modules ?? [];
  return {
    modulesCount: modules.length,
    topicsCount: modules.reduce((total, m) => total + m.topics.length, 0),
  };
}

export const LEARNING_RESOURCES: LearningResource[] = [
  {
    id: "res-dsa",
    slug: "dsa",
    title: "Data Structures & Algorithms",
    shortDescription:
      "Master essential data structures from arrays and trees to dynamic programming and graph algorithms.",
    trackId: "dsa",
    trackLabel: "DSA",
    iconName: "Waypoints",
    ...countsFor("dsa"),
    estimatedDuration: "80 hours",
    level: "Intermediate",
    href: "/subjects/dsa",
    isAvailable: true,
  },
  {
    id: "res-dbms",
    slug: "dbms",
    title: "Database Management Systems",
    shortDescription:
      "Relational modeling, indexing, normalization, transaction isolation, and query optimization.",
    trackId: "dbms",
    trackLabel: "DBMS",
    iconName: "Database",
    ...countsFor("dbms"),
    estimatedDuration: "30 hours",
    level: "Intermediate",
    href: "/subjects/dbms",
    isAvailable: true,
  },
  {
    id: "res-oops",
    slug: "oops",
    title: "Object-Oriented Programming",
    shortDescription:
      "Encapsulation, inheritance, polymorphism, abstraction, design patterns, and SOLID principles.",
    trackId: "oops",
    trackLabel: "OOPs",
    iconName: "BrainCircuit",
    ...countsFor("oops"),
    estimatedDuration: "20 hours",
    level: "Beginner",
    href: "/subjects/oops",
    isAvailable: true,
  },
  {
    id: "res-cn",
    slug: "cn",
    title: "Computer Networks",
    shortDescription:
      "Understand how devices communicate, how network protocols work, and how data moves across the internet.",
    trackId: "cn",
    trackLabel: "Computer Networks",
    iconName: "Network",
    ...countsFor("cn"),
    estimatedDuration: "35 hours",
    level: "Intermediate",
    href: "/subjects/cn",
    isAvailable: true,
  },
  {
    id: "res-os",
    slug: "os",
    title: "Operating Systems",
    shortDescription:
      "Processes, multi-threading, CPU scheduling, virtual memory, concurrency, and file systems.",
    trackId: "os",
    trackLabel: "Operating Systems",
    iconName: "Terminal",
    ...countsFor("os"),
    estimatedDuration: "32 hours",
    level: "Intermediate",
    href: "/subjects/os",
    isAvailable: true,
  },
];