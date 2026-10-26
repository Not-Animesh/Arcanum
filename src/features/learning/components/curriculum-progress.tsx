import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CurriculumProgressProps {
  completedTopics?: number;
  totalTopics: number;
  className?: string;
}

export function CurriculumProgress({
  completedTopics = 0,
  totalTopics,
  className,
}: CurriculumProgressProps) {
  const percentage =
    totalTopics > 0
      ? Math.round((completedTopics / totalTopics) * 100)
      : 0;

  return (
    <Card className={cn("shadow-none border-border bg-card", className)}>
      <CardContent className="p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-0.5">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Your Progress
            </p>
            <p className="text-xs text-muted-foreground">
              {completedTopics} / {totalTopics} topics completed
            </p>
          </div>

          <div className="flex items-baseline gap-2 sm:text-right">
            <span className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {percentage}%
            </span>
          </div>
        </div>

        {/* Horizontal Progress Bar */}
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Curriculum completion progress"
          />
        </div>
      </CardContent>
    </Card>
  );
}
