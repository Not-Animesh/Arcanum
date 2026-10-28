
import * as React from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Clock3,
  GraduationCap,
  Layers3,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { CurriculumDetail } from "../types";

interface CurriculumHeaderProps {
  curriculum: CurriculumDetail;
}

export function CurriculumHeader({
  curriculum,
}: CurriculumHeaderProps) {
  const moduleCount = curriculum.modules.length;
  const topicCount = curriculum.modules.reduce(
    (total, module) => total + module.topics.length,
    0,
  );

  return (
    <header className="space-y-6">
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground"
      >
        <Link
          href="/learning-paths"
          className="transition-colors hover:text-foreground"
        >
          Learning Paths
        </Link>

        <span aria-hidden="true" className="text-muted-foreground/50">
          /
        </span>

        <span>{curriculum.trackLabel}</span>

        <span aria-hidden="true" className="text-muted-foreground/50">
          /
        </span>

        <span
          aria-current="page"
          className="font-medium text-foreground"
        >
          {curriculum.title}
        </span>
      </nav>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className="gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
          >
            <GraduationCap className="size-3.5" aria-hidden="true" />
            {curriculum.trackLabel}
          </Badge>

          <span className="text-border" aria-hidden="true">
            ·
          </span>

          <Link
            href="#syllabus"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Explore syllabus
            <ArrowDown
              className="size-3.5 transition-transform"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="max-w-3xl space-y-3">
          <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            {curriculum.title}
          </h1>

          <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-[15px] sm:leading-7">
            {curriculum.subtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="flex min-w-0 items-center gap-3 rounded-xl border border-border/80 bg-card px-3.5 py-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <Layers3 className="size-4" aria-hidden="true" />
          </div>

          <div className="min-w-0">
            <p className="text-lg font-semibold leading-5 tracking-tight text-foreground tabular-nums">
              {moduleCount}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Modules
            </p>
          </div>
        </div>

        <div className="flex min-w-0 items-center gap-3 rounded-xl border border-border/80 bg-card px-3.5 py-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <BookOpen className="size-4" aria-hidden="true" />
          </div>

          <div className="min-w-0">
            <p className="text-lg font-semibold leading-5 tracking-tight text-foreground tabular-nums">
              {topicCount}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Topics
            </p>
          </div>
        </div>

        {curriculum.quizzesCount != null && (
          <div className="flex min-w-0 items-center gap-3 rounded-xl border border-border/80 bg-card px-3.5 py-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
              <GraduationCap className="size-4" aria-hidden="true" />
            </div>

            <div className="min-w-0">
              <p className="text-lg font-semibold leading-5 tracking-tight text-foreground tabular-nums">
                {curriculum.quizzesCount}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Problems
              </p>
            </div>
          </div>
        )}

        <div className="flex min-w-0 items-center gap-3 rounded-xl border border-border/80 bg-card px-3.5 py-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <Clock3 className="size-4" aria-hidden="true" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold leading-5 text-foreground">
              {curriculum.estimatedDuration}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Estimated time
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Link
          href="#syllabus"
          className="group inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Start with the syllabus
          <ArrowRight
            className="size-3.5 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </header>
  );
}
