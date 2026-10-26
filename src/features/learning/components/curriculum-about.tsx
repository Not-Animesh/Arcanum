"use client";

import * as React from "react";
import { CheckCircle2, ChevronDown, ChevronUp, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CurriculumDetail } from "../types";

interface CurriculumAboutProps {
  about: CurriculumDetail["about"];
}

export function CurriculumAbout({ about }: CurriculumAboutProps) {
  const [isExpanded, setIsExpanded] = React.useState(true);

  return (
    <Card className="border-border bg-card shadow-none">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between gap-3 border-b pb-3.5">
          <div className="flex items-center gap-2">
            <Info className="size-4 text-muted-foreground" />
            <h2 className="font-heading text-base font-semibold text-foreground">
              About this curriculum
            </h2>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? "Collapse curriculum details" : "Expand curriculum details"}
            className="h-8 gap-1.5 px-2.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <span>{isExpanded ? "Show less" : "Show more"}</span>
            {isExpanded ? (
              <ChevronUp className="size-3.5" />
            ) : (
              <ChevronDown className="size-3.5" />
            )}
          </Button>
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-5 text-sm">
            {/* Overview */}
            <div>
              <h3 className="font-heading text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Overview
              </h3>
              <p className="mt-1 leading-6 text-foreground/90">
                {about.overview}
              </p>
            </div>

            {/* Why it matters & Organization */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border bg-muted/20 p-3.5">
                <h4 className="font-heading text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Why it matters
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-foreground/80">
                  {about.whyItMatters}
                </p>
              </div>

              <div className="rounded-lg border bg-muted/20 p-3.5">
                <h4 className="font-heading text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Module Organization
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-foreground/80">
                  {about.organization}
                </p>
              </div>
            </div>

            {/* What you'll learn */}
            <div>
              <h3 className="font-heading text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                What you&apos;ll learn
              </h3>
              <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {about.whatYoullLearn.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-xs leading-5 text-foreground/85"
                  >
                    <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-foreground" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Practical / Interview Relevance */}
            {about.practicalRelevance && (
              <div className="border-t pt-3">
                <span className="text-xs font-medium text-muted-foreground">
                  Practical relevance:{" "}
                </span>
                <span className="text-xs text-foreground/80">
                  {about.practicalRelevance}
                </span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
