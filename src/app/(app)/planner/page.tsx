import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeading } from "@/components/layout/page-heading";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Study Planner — Arcanum",
  description: "Plan your weekly study sessions and track daily streaks.",
};

export default function PlannerPage() {
  return (
    <PageContainer>
      <PageHeading
        eyebrow={
          <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <span className="size-1.5 rounded-full bg-foreground/60" />
            Career Preparation
          </p>
        }
        title="Study Planner"
        description="Organize your weekly study schedule and maintain daily learning streaks across all subjects."
      />
      <Card className="shadow-none border-dashed bg-muted/10">
        <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
          <div className="flex size-12 items-center justify-center rounded-2xl border bg-muted/60">
            <CalendarDays className="size-6 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground">Coming in Week 7</p>
          <p className="max-w-sm text-xs text-muted-foreground">
            Weekly study scheduling, streak tracking, and personalized daily goals will be available here.
          </p>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
