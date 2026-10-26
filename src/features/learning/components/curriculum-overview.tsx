import * as React from "react";
import { Check, Compass, GraduationCap, ListChecks } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CurriculumOverviewProps {
  prerequisites: string[];
  learningObjectives: string[];
  suggestedStudyOrder: string;
}

export function CurriculumOverview({
  prerequisites,
  learningObjectives,
  suggestedStudyOrder,
}: CurriculumOverviewProps) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">
          Curriculum Standards & Prerequisites
        </h2>
        <p className="text-xs text-muted-foreground">
          Clear learning outcomes and foundation requirements to maximize retention.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Prerequisites */}
        <Card className="border-border bg-card shadow-none">
          <CardContent className="space-y-3 p-4 sm:p-5">
            <div className="flex items-center gap-2 text-foreground font-medium text-sm">
              <Compass className="size-4 text-muted-foreground" />
              <h3 className="font-heading font-semibold text-sm">Prerequisites</h3>
            </div>
            <ul className="space-y-2">
              {prerequisites.map((req, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-xs leading-5 text-muted-foreground"
                >
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-foreground/60" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Learning Objectives */}
        <Card className="border-border bg-card shadow-none">
          <CardContent className="space-y-3 p-4 sm:p-5">
            <div className="flex items-center gap-2 text-foreground font-medium text-sm">
              <GraduationCap className="size-4 text-muted-foreground" />
              <h3 className="font-heading font-semibold text-sm">Learning Objectives</h3>
            </div>
            <ul className="space-y-2">
              {learningObjectives.map((obj, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-xs leading-5 text-muted-foreground"
                >
                  <Check className="mt-0.5 size-3.5 shrink-0 text-foreground" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Suggested Study Order */}
        <Card className="border-border bg-card shadow-none">
          <CardContent className="space-y-3 p-4 sm:p-5">
            <div className="flex items-center gap-2 text-foreground font-medium text-sm">
              <ListChecks className="size-4 text-muted-foreground" />
              <h3 className="font-heading font-semibold text-sm">Suggested Sequence</h3>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {suggestedStudyOrder}
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
