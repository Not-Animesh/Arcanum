import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  Code2,
  Flame,
  Target,
  Trophy,
} from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import { PageHeading } from "@/components/layout/page-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    label: "Study streak",
    value: "0 days",
    note: "Start your first session",
    icon: Flame,
  },
  {
    label: "Problems solved",
    value: "0",
    note: "Every problem counts",
    icon: Code2,
  },
  {
    label: "Mastery score",
    value: "—",
    note: "Build your knowledge",
    icon: Target,
  },
  {
    label: "Readiness",
    value: "Not assessed",
    note: "Complete a diagnostic",
    icon: BrainCircuit,
  },
];

const subjects = [
  {
    title: "Data Structures & Algorithms",
    description: "Arrays, trees, graphs, dynamic programming, and more.",
    href: "/subjects/dsa",
    icon: Code2,
  },
  {
    title: "Database Management",
    description: "SQL, normalization, transactions, and indexing.",
    href: "/subjects/dbms",
    icon: BookOpen,
  },
  {
    title: "Operating Systems",
    description: "Processes, threads, scheduling, and memory.",
    href: "/subjects/os",
    icon: BrainCircuit,
  },
  {
    title: "Computer Networks",
    description: "Networking models, protocols, and core concepts.",
    href: "/subjects/cn",
    icon: Target,
  },
];

export function DashboardHome() {
  return (
    <PageContainer>
      <PageHeading
        eyebrow={
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="size-2 rounded-full bg-foreground/60" />
            YOUR LEARNING WORKSPACE
          </p>
        }
        title="Build your edge."
        description="Strengthen your fundamentals, practice with purpose, and prepare for your next technical interview."
        actions={
          <Link
            href="/practice"
            className="inline-flex h-9 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
          >
            Start practicing
            <ArrowRight className="ml-2 size-4" />
          </Link>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.label} className="shadow-none">
              <CardContent className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <Icon className="size-4 text-muted-foreground" />
                </div>

                <p className="mt-4 text-2xl font-semibold tracking-tight">
                  {stat.value}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {stat.note}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-xl font-semibold tracking-tight">
              Continue your journey
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Choose a subject to start building mastery.
            </p>
          </div>

          <Link
            href="/learning-paths"
            className="inline-flex h-8 shrink-0 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors hover:bg-muted"
          >
            All paths
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {subjects.map((subject) => {
            const Icon = subject.icon;

            return (
              <Link
                key={subject.href}
                href={subject.href}
                className="group rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Card className="h-full shadow-none transition-colors group-hover:bg-muted/40">
                  <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-muted/50">
                      <Icon className="size-5" />
                    </div>

                    <div className="min-w-0 flex-1 space-y-1">
                      <CardTitle className="text-base font-medium">
                        {subject.title}
                      </CardTitle>
                      <p className="text-sm leading-5 text-muted-foreground">
                        {subject.description}
                      </p>
                    </div>

                    <ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between border-t pt-4 text-xs">
                      <span className="text-muted-foreground">
                        Begin learning
                      </span>
                      <span className="font-medium">Explore subject</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <Card className="shadow-none">
          <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-muted/50">
                <Trophy className="size-5" />
              </div>

              <div>
                <h2 className="font-heading font-semibold">
                  Your next milestone
                </h2>
                <p className="mt-1 max-w-xl text-sm leading-5 text-muted-foreground">
                  Start with one focused session. Complete practice activities
                  to build your learning history.
                </p>
              </div>
            </div>

            <Link
              href="/planner"
              className="inline-flex h-9 shrink-0 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              View study planner
            </Link>
          </CardContent>
        </Card>
      </section>
    </PageContainer>
  );
}
