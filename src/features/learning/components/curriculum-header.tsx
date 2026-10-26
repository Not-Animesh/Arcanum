import * as React from "react";
import Link from "next/link";
import {
  ArrowDown,
  BookOpen,
  Clock,
  HelpCircle,
  Layers,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { CurriculumDetail } from "../types";

interface CurriculumHeaderProps {
  curriculum: CurriculumDetail;
}

export function CurriculumHeader({ curriculum }: CurriculumHeaderProps) {
  return (
    <div className="space-y-4">
      {/* Route & Track breadcrumb note */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <Link
          href="/learning-paths"
          className="hover:text-foreground transition-colors"
        >
          Learning Paths
        </Link>
        <span>/</span>
        <span>{curriculum.trackLabel}</span>
        <span>/</span>
        <span className="text-foreground font-medium">{curriculum.title}</span>
      </div>

      {/* Main Title Block */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2.5">
          <Badge variant="outline" className="text-xs">
            {curriculum.trackLabel} Track
          </Badge>
          <span className="text-xs text-muted-foreground">•</span>
          <a
            href="#syllabus"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
          >
            View syllabus
            <ArrowDown className="size-3" />
          </a>
        </div>

        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl text-foreground">
          {curriculum.title}
        </h1>

        <p className="max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
          {curriculum.subtitle}
        </p>
      </div>

      {/* Compact Metadata Row */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl border bg-muted/30 px-4 py-2.5 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Layers className="size-3.5 text-muted-foreground/80" />
          <span className="font-medium text-foreground">
            {curriculum.totalModules}
          </span>
          <span>modules</span>
        </div>

        <div className="flex items-center gap-1.5">
          <BookOpen className="size-3.5 text-muted-foreground/80" />
          <span className="font-medium text-foreground">
            {curriculum.totalTopics}
          </span>
          <span>topics</span>
        </div>

        {curriculum.quizzesCount && (
          <div className="flex items-center gap-1.5">
            <HelpCircle className="size-3.5 text-muted-foreground/80" />
            <span className="font-medium text-foreground">
              {curriculum.quizzesCount}
            </span>
            <span>quizzes</span>
          </div>
        )}

        <div className="flex items-center gap-1.5">
          <Clock className="size-3.5 text-muted-foreground/80" />
          <span>{curriculum.estimatedDuration}</span>
        </div>
      </div>
    </div>
  );
}
