
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  Code2,
  Compass,
  GraduationCap,
  Layers3,
  Route,
  Target,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Arcanum — Learn. Practice. Master.",
  description:
    "Build strong computer science fundamentals with structured learning paths, coding practice, personalized study plans, and interview preparation on Arcanum.",
  keywords: [
    "Arcanum",
    "DSA learning",
    "coding practice",
    "computer science fundamentals",
    "interview preparation",
    "personalized study plan",
    "system design",
    "web development",
  ],
  openGraph: {
    title: "Arcanum — Learn. Practice. Master.",
    description:
      "Learn concepts, practice problems, and prepare for technical interviews with structured learning paths.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arcanum — Learn. Practice. Master.",
    description:
      "A structured learning platform for coding practice, computer science, and interview preparation.",
  },
};

const TRACKS = [
  {
    title: "Data Structures & Algorithms",
    short: "DSA",
    description:
      "Build problem-solving skills through organized topics, patterns, and coding exercises.",
    icon: Code2,
  },
  {
    title: "Core Computer Science",
    short: "CORE CS",
    description:
      "Strengthen your understanding of DBMS, operating systems, OOP, and computer networks.",
    icon: Layers3,
  },
  {
    title: "System Design",
    short: "DESIGN",
    description:
      "Explore architecture concepts, design trade-offs, and the foundations of scalable systems.",
    icon: Compass,
  },
  {
    title: "Data Engineering",
    short: "DATA",
    description:
      "Build your foundation in data systems, pipelines, and engineering concepts.",
    icon: Brain,
  },
  {
    title: "Web Design",
    short: "WEB",
    description:
      "Develop your web design and frontend skills through a structured learning path.",
    icon: GraduationCap,
  },
];

const FEATURES = [
  {
    icon: Route,
    title: "Structured Learning Paths",
    description:
      "Follow organized tracks, subjects, modules, and topics instead of jumping between disconnected resources.",
  },
  {
    icon: BookOpen,
    title: "Learn the Concepts",
    description:
      "Strengthen your fundamentals with theory, explanations, curated learning resources, and topic-level objectives.",
  },
  {
    icon: Code2,
    title: "Focused Practice",
    description:
      "Explore categorized coding questions, filter by relevant criteria, and practice concepts as you learn.",
  },
  {
    icon: Target,
    title: "Personalized Study Plans",
    description:
      "Use a knowledge assessment to identify gaps and organize your preparation around your learning goals.",
  },
  {
    icon: Brain,
    title: "Interview Preparation",
    description:
      "Prepare for technical interviews by connecting core concepts, problem-solving practice, and revision.",
  },
  {
    icon: CheckCircle2,
    title: "Track Your Progress",
    description:
      "Keep your learning organized and monitor progress as you work through subjects and practice activities.",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Choose your learning path",
    description:
      "Start with DSA, Core CS, System Design, Data Engineering, or Web Design based on your goals.",
  },
  {
    number: "02",
    title: "Learn and practice",
    description:
      "Work through topics, study the concepts, explore learning resources, and solve relevant questions.",
  },
  {
    number: "03",
    title: "Build consistency",
    description:
      "Organize your preparation, identify areas to improve, and keep moving toward your learning goals.",
  },
];

export default function LandingPage() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 text-center md:py-32">
        <div className="dot-grid absolute inset-0 -z-10" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-background/60 to-background" />

        <div className="fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <GraduationCap className="h-3.5 w-3.5" />
          Your journey to stronger fundamentals
        </div>

        <h1 className="fade-in fade-in-delay-1 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          Learn with purpose.
          <br />
          <span className="text-primary">Prepare with Arcanum.</span>
        </h1>

        <p className="fade-in fade-in-delay-2 mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          One place to strengthen your computer science fundamentals, master
          problem-solving, follow structured learning paths, and prepare for
          technical interviews.
        </p>

        <div className="fade-in fade-in-delay-3 mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/learning-paths"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow transition-opacity hover:opacity-90"
          >
            Explore Learning Paths
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/problems"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-muted"
          >
            <Code2 className="h-4 w-4" />
            Explore Practice
          </Link>
        </div>

        <p className="mt-5 text-xs text-muted-foreground">
          Structured learning. Practical preparation. No subscription paywalls.
        </p>
      </section>

      {/* Platform pillars */}
      <section className="border-y border-border/60 bg-card/50">
        <div className="grid grid-cols-2 divide-x divide-y divide-border/60 sm:grid-cols-4 sm:divide-y-0">
          {[
            { title: "Learn", subtitle: "Concepts and resources" },
            { title: "Practice", subtitle: "Questions and exercises" },
            { title: "Plan", subtitle: "Goal-oriented preparation" },
            { title: "Improve", subtitle: "Progress and revision" },
          ].map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center justify-center px-3 py-6 text-center sm:py-8"
            >
              <span className="text-lg font-semibold text-primary">
                {item.title}
              </span>
              <span className="mt-1 text-xs text-muted-foreground">
                {item.subtitle}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Learning paths */}
      <section className="py-20 md:py-28">
        <div className="mb-12 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
            Learning paths
          </p>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Choose your direction
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Follow a structured path, explore topics in order, and build skills
            step by step.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TRACKS.map(({ title, short, description, icon: Icon }) => (
            <Link
              key={title}
              href="/learning-paths"
              className="group rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-semibold tracking-widest text-muted-foreground">
                  {short}
                </span>
              </div>

              <h3 className="text-sm font-semibold tracking-tight">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>

              <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                Explore path
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}

          <div className="flex flex-col justify-center rounded-xl border border-dashed border-primary/30 bg-primary/[0.03] p-5">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <BookOpen className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-semibold">Your learning journey</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Combine structured study, hands-on practice, and interview
              preparation to work toward your goals.
            </p>
            <Link
              href="/learning-paths"
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
            >
              View all paths
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border/60 py-20 md:py-28">
        <div className="mb-12 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
            The Arcanum approach
          </p>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Everything connected in one place
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Move from understanding a concept to applying it, reviewing it, and
            building confidence over time.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-card p-5 transition-colors duration-200 hover:border-primary/40"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mb-1.5 text-sm font-semibold">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-border/60 py-20 md:py-24">
        <div className="mb-12 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
            Getting started
          </p>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            A clearer way to prepare
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {STEPS.map(({ number, title, description }) => (
            <div
              key={number}
              className="relative flex flex-col items-start gap-3 border-l-2 border-border pl-6"
            >
              <span className="text-4xl font-bold leading-none tabular-nums text-primary/30">
                {number}
              </span>
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Free learning commitment */}
      <section className="border-t border-border/60 py-16">
        <div className="rounded-xl border border-primary/20 bg-primary/[0.04] p-6 md:p-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <GraduationCap className="h-6 w-6" />
            </div>

            <div className="flex-1">
              <h2 className="text-lg font-semibold tracking-tight">
                Built around learning, not paywalls
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Arcanum is designed to make structured learning and interview
                preparation accessible. The learning experience is free, with
                no subscription tiers or locked premium learning paths.
              </p>
            </div>

            <Link
              href="/learning-paths"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
            >
              Explore paths
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden border-t border-border/60 py-20 text-center md:py-28">
        <div className="dot-grid absolute inset-0 -z-10 opacity-50" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-transparent via-background/80 to-background" />

        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
          Your next step starts here
        </p>

        <h2 className="text-2xl font-bold tracking-tight md:text-4xl">
          Turn your goals into progress.
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          Choose a path, build your fundamentals, and make every practice
          session count with Arcanum.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/learning-paths"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-opacity hover:opacity-90"
          >
            Start Learning
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-medium transition-colors hover:bg-muted"
          >
            View Dashboard
          </Link>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Arcanum · Learn. Practice. Master.
        </p>
      </section>
    </div>
  );
}
