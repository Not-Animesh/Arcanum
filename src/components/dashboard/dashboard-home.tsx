
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Code2,
  Database,
  Flame,
  GraduationCap,
  Network,
  Route,
  Target,
} from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import { PageHeading } from "@/components/layout/page-heading";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const stats = [
  {
    label: "Study streak",
    value: "0 days",
    description: "Start building a habit",
    icon: Flame,
  },
  {
    label: "Questions solved",
    value: "0",
    description: "Every problem counts",
    icon: CheckCircle2,
  },
  {
    label: "Mastery score",
    value: "—",
    description: "Not assessed yet",
    icon: Target,
  },
  {
    label: "Interview readiness",
    value: "Not assessed",
    description: "Your readiness will appear here",
    icon: BrainCircuit,
  },
];

const subjects = [
  {
    title: "Data Structures & Algorithms",
    shortTitle: "DSA",
    description: "Arrays, trees, graphs, algorithms, and problem-solving.",
    href: "/subjects/dsa",
    icon: Code2,
  },
  {
    title: "Database Management",
    shortTitle: "DBMS",
    description: "SQL, normalization, transactions, and indexing.",
    href: "/subjects/dbms",
    icon: Database,
  },
  {
    title: "Object-Oriented Programming",
    shortTitle: "OOP",
    description: "Classes, inheritance, polymorphism, and abstraction.",
    href: "/subjects/oops",
    icon: BrainCircuit,
  },
  {
    title: "Computer Networks",
    shortTitle: "CN",
    description: "Networking models, protocols, and communication.",
    href: "/subjects/cn",
    icon: Network,
  },
  {
    title: "Operating Systems",
    shortTitle: "OS",
    description: "Processes, scheduling, concurrency, and memory.",
    href: "/subjects/os",
    icon: BookOpen,
  },
];

export function DashboardHome() {
  return (
    <PageContainer>
      <div className="space-y-8 pb-8 sm:space-y-10">
        <PageHeading
          eyebrow={
            <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              <span className="size-2 rounded-full bg-primary" />
              Your learning workspace
            </p>
          }
          title="Build your edge."
          description="Strengthen your fundamentals, practice with purpose, and prepare for your next technical interview."
          actions={
            <Link
              href="/practice"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Start practicing
              <ArrowRight className="ml-2 size-4" />
            </Link>
          }
        />

        <section aria-label="Learning statistics" className="space-y-3">
          <div>
            <h2 className="text-base font-semibold tracking-tight">
              Your overview
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              A snapshot of your learning progress.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <Card
                  key={stat.label}
                  className="min-w-0 gap-0 rounded-xl border-border/70 py-0 shadow-none"
                >
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm text-muted-foreground">
                        {stat.label}
                      </span>
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted/70">
                        <Icon className="size-4 text-muted-foreground" />
                      </span>
                    </div>

                    <p className="mt-4 break-words text-2xl font-semibold tracking-tight">
                      {stat.value}
                    </p>

                    <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section aria-label="Recommended next step">
          <Card className="gap-0 overflow-hidden rounded-xl border-border/70 py-0 shadow-none">
            <CardContent className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex min-w-0 items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-muted/60">
                  <Route className="size-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Recommended next step
                  </p>
                  <h2 className="mt-1.5 text-lg font-semibold tracking-tight">
                    Build your learning roadmap
                  </h2>
                  <p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">
                    Choose a subject, follow its syllabus, and practise
                    questions as you progress through each topic.
                  </p>
                </div>
              </div>

              <Link
                href="/learning-paths"
                className="inline-flex h-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Explore learning paths
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </CardContent>
          </Card>
        </section>

        <section aria-label="Subjects" className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">
                Your subjects
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Pick up where you want to learn.
              </p>
            </div>

            <Link
              href="/subjects"
              className="inline-flex h-9 items-center rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Browse catalog
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {subjects.map((subject) => {
              const Icon = subject.icon;

              return (
                <Link
                  key={subject.href}
                  href={subject.href}
                  className="group min-w-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <Card className="h-full gap-0 rounded-xl border-border/70 py-0 shadow-none transition-colors group-hover:border-border group-hover:bg-muted/20">
                    <CardHeader className="flex flex-row items-start gap-3 space-y-0 p-4">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-muted/50">
                        <Icon className="size-[18px] text-foreground" />
                      </span>

                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                          {subject.shortTitle}
                        </p>
                        <CardTitle className="mt-1 text-sm font-semibold leading-5">
                          {subject.title}
                        </CardTitle>
                      </div>

                      <ChevronRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                    </CardHeader>

                    <CardContent className="px-4 pb-4">
                      <p className="min-h-10 text-sm leading-5 text-muted-foreground">
                        {subject.description}
                      </p>

                      <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-3">
                        <span className="text-xs text-muted-foreground">
                          Explore syllabus
                        </span>
                        <span className="text-xs font-medium">
                          Start learning
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        <section aria-label="Practice shortcut">
          <div className="flex flex-col gap-3 rounded-xl border border-border/70 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted/70">
                <GraduationCap className="size-5" />
              </span>
              <div>
                <h2 className="text-sm font-semibold">
                  Ready to test your knowledge?
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Practise questions from the subject you are studying.
                </p>
              </div>
            </div>

            <Link
              href="/practice"
              className="inline-flex h-9 shrink-0 items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors hover:bg-muted"
            >
              Go to practice
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}
