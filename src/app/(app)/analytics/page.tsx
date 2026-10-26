import type { Metadata } from "next";
import { Activity } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeading } from "@/components/layout/page-heading";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Analytics — Arcanum",
  description: "Track your placement readiness score and learning progress over time.",
};

export default function AnalyticsPage() {
  return (
    <PageContainer>
      <PageHeading
        eyebrow={
          <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <span className="size-1.5 rounded-full bg-foreground/60" />
            Career Preparation
          </p>
        }
        title="Analytics"
        description="Your placement readiness score, subject-wise mastery trends, and practice activity over time."
      />
      <Card className="shadow-none border-dashed bg-muted/10">
        <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
          <div className="flex size-12 items-center justify-center rounded-2xl border bg-muted/60">
            <Activity className="size-6 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground">Coming in Week 4</p>
          <p className="max-w-sm text-xs text-muted-foreground">
            Mastery trend charts, readiness score breakdown, and practice activity heatmaps will be visible here once BKT data is live.
          </p>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
