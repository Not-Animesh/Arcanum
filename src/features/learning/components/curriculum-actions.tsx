import * as React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, CalendarDays, Code2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CurriculumActionsProps {
  subjectSlug: string;
}

export function CurriculumActions({ subjectSlug }: CurriculumActionsProps) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">
          Choose your learning experience
        </h2>
        <p className="text-xs text-muted-foreground">
          Engage with the material at your own pace through structured theory or focused practice.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
        {/* 1. Complete Curriculum */}
        <a
          href="#syllabus"
          className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Card className="h-full border-border bg-card shadow-none transition-colors hover:border-foreground/20 hover:bg-muted/30">
            <CardContent className="flex h-full flex-col justify-between p-4.5">
              <div className="space-y-2">
                <div className="flex size-8 items-center justify-center rounded-lg border bg-muted/60 text-foreground">
                  <BookOpen className="size-4" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-semibold text-foreground">
                    Curriculum
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Explore the complete structured curriculum and syllabus topics.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t pt-3 text-xs font-medium text-foreground">
                <span>View syllabus</span>
                <ArrowRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
              </div>
            </CardContent>
          </Card>
        </a>

        {/* 2. Practice */}
        <Link
          href={`/practice?subject=${subjectSlug}`}
          className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Card className="h-full border-border bg-card shadow-none transition-colors hover:border-foreground/20 hover:bg-muted/30">
            <CardContent className="flex h-full flex-col justify-between p-4.5">
              <div className="space-y-2">
                <div className="flex size-8 items-center justify-center rounded-lg border bg-muted/60 text-foreground">
                  <Code2 className="size-4" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-semibold text-foreground">
                    Practice
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Reinforce concepts with relevant problem-solving practice.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t pt-3 text-xs font-medium text-foreground">
                <span>Go to practice</span>
                <ArrowRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* 3. Study Plan */}
        <div className="block rounded-xl">
          <Card className="h-full border-border bg-muted/20 shadow-none">
            <CardContent className="flex h-full flex-col justify-between p-4.5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex size-8 items-center justify-center rounded-lg border bg-muted/60 text-muted-foreground">
                    <CalendarDays className="size-4" />
                  </div>
                  <Badge variant="outline" className="text-[10px] text-muted-foreground font-normal">
                    Roadmap
                  </Badge>
                </div>
                <div>
                  <h3 className="font-heading text-sm font-semibold text-foreground">
                    Study Plan
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Organize topics into a sequential calendar schedule.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t pt-3 text-xs text-muted-foreground">
                <span>Self-paced roadmap</span>
                <span className="text-[11px] font-medium text-foreground">Included</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
