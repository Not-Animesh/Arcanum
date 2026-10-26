"use client";

import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/** Mastery level 0–1 mapped to one of the 5 chart colour tokens */
function masteryToChartClass(level: number): string {
  if (level >= 0.8) return "bg-[var(--chart-2)]";        // strong green
  if (level >= 0.6) return "bg-[var(--chart-2)]/60";     // medium green
  if (level >= 0.4) return "bg-[var(--chart-4)]";        // amber
  if (level >= 0.2) return "bg-[var(--chart-5)]/70";     // orange-ish
  return "bg-muted";                                      // not started
}

function masteryLabel(level: number): string {
  if (level >= 0.8) return "Strong";
  if (level >= 0.6) return "Good";
  if (level >= 0.4) return "Building";
  if (level >= 0.2) return "Weak";
  return "Not started";
}

interface SubtopicMastery {
  name: string;
  /** 0–1 mastery probability from BKT; null = not yet attempted */
  level: number | null;
}

interface SubjectMastery {
  subject: string;
  slug: string;
  subtopics: SubtopicMastery[];
}

// Demo data — will be replaced by real API data once Prisma/BKT is wired
const DEMO_MASTERY: SubjectMastery[] = [
  {
    subject: "DSA",
    slug: "dsa",
    subtopics: [
      { name: "Arrays", level: 0.82 },
      { name: "Linked Lists", level: 0.65 },
      { name: "Stacks & Queues", level: 0.7 },
      { name: "Trees", level: 0.45 },
      { name: "Graphs", level: 0.3 },
      { name: "Dynamic Prog.", level: 0.15 },
      { name: "Sorting", level: 0.9 },
      { name: "Searching", level: 0.75 },
    ],
  },
  {
    subject: "DBMS",
    slug: "dbms",
    subtopics: [
      { name: "SQL Basics", level: 0.78 },
      { name: "Normalization", level: 0.4 },
      { name: "Transactions", level: 0.55 },
      { name: "Indexing", level: 0.35 },
      { name: "Joins", level: 0.68 },
    ],
  },
  {
    subject: "Operating Systems",
    slug: "os",
    subtopics: [
      { name: "Processes", level: 0.6 },
      { name: "CPU Scheduling", level: 0.5 },
      { name: "Memory Mgmt", level: 0.3 },
      { name: "Deadlocks", level: 0.2 },
      { name: "Virtual Memory", level: 0.45 },
    ],
  },
  {
    subject: "Computer Networks",
    slug: "cn",
    subtopics: [
      { name: "OSI Model", level: 0.72 },
      { name: "TCP/IP", level: 0.65 },
      { name: "IP & Subnetting", level: 0.4 },
      { name: "Routing", level: 0.25 },
      { name: "HTTP & DNS", level: 0.8 },
    ],
  },
  {
    subject: "OOP Concepts",
    slug: "oops",
    subtopics: [
      { name: "Classes & Objects", level: 0.88 },
      { name: "Inheritance", level: 0.75 },
      { name: "Polymorphism", level: 0.6 },
      { name: "Abstraction", level: 0.55 },
      { name: "Design Patterns", level: 0.2 },
    ],
  },
];

export function MasteryHeatmap() {
  const [tooltip, setTooltip] = React.useState<{
    subject: string;
    subtopic: string;
    level: number | null;
  } | null>(null);

  return (
    <section className="space-y-4">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">
          Mastery overview
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Colour intensity reflects your BKT mastery probability per subtopic.
          Demo data — updates live once practice attempts are saved.
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        {[
          { label: "Not started", cls: "bg-muted" },
          { label: "Weak (< 0.2)", cls: "bg-[var(--chart-5)]/70" },
          { label: "Building (< 0.4)", cls: "bg-[var(--chart-4)]" },
          { label: "Good (< 0.6)", cls: "bg-[var(--chart-2)]/60" },
          { label: "Strong (≥ 0.8)", cls: "bg-[var(--chart-2)]" },
        ].map(({ label, cls }) => (
          <span key={label} className="flex items-center gap-1.5">
            <span className={cn("size-3 rounded-sm", cls)} />
            {label}
          </span>
        ))}
      </div>

      {/* Heatmap grid — one card per subject */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {DEMO_MASTERY.map((subject) => {
          const avg =
            subject.subtopics.reduce((acc, s) => acc + (s.level ?? 0), 0) /
            subject.subtopics.length;

          return (
            <Card key={subject.slug} className="shadow-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium">
                  {subject.subject}
                </CardTitle>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-medium",
                    masteryToChartClass(avg),
                    "text-foreground"
                  )}
                >
                  avg {Math.round(avg * 100)}%
                </span>
              </CardHeader>

              <CardContent className="pb-4">
                <div className="flex flex-wrap gap-1.5">
                  {subject.subtopics.map((subtopic) => (
                    <button
                      key={subtopic.name}
                      type="button"
                      onMouseEnter={() =>
                        setTooltip({
                          subject: subject.subject,
                          subtopic: subtopic.name,
                          level: subtopic.level,
                        })
                      }
                      onMouseLeave={() => setTooltip(null)}
                      onFocus={() =>
                        setTooltip({
                          subject: subject.subject,
                          subtopic: subtopic.name,
                          level: subtopic.level,
                        })
                      }
                      onBlur={() => setTooltip(null)}
                      className={cn(
                        "relative rounded-md px-2.5 py-1.5 text-[11px] font-medium transition-opacity",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        subtopic.level !== null
                          ? masteryToChartClass(subtopic.level)
                          : "bg-muted",
                        "text-foreground hover:opacity-80"
                      )}
                    >
                      {subtopic.name}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Floating tooltip */}
      {tooltip && (
        <div className="pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg border bg-popover px-3 py-2 text-xs shadow-md">
          <span className="font-semibold">{tooltip.subtopic}</span>
          {" · "}
          <span className="text-muted-foreground">{tooltip.subject}</span>
          {" · "}
          <span>
            {tooltip.level !== null
              ? `${masteryLabel(tooltip.level)} (${Math.round(tooltip.level * 100)}%)`
              : "Not started"}
          </span>
        </div>
      )}
    </section>
  );
}
