import type { Metadata } from "next";
import { Trophy } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeading } from "@/components/layout/page-heading";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contests — Arcanum",
  description: "Timed practice contests to sharpen your speed and accuracy.",
};

export default function ContestsPage() {
  return (
    <PageContainer>
      <PageHeading
        eyebrow={
          <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <span className="size-1.5 rounded-full bg-foreground/60" />
            Competitive Practice
          </p>
        }
        title="Contests"
        description="Timed problem sets that simulate placement test conditions. Earn badges and climb the leaderboard."
      />
      <Card className="shadow-none border-dashed bg-muted/10">
        <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
          <div className="flex size-12 items-center justify-center rounded-2xl border bg-muted/60">
            <Trophy className="size-6 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground">Coming in Week 7</p>
          <p className="max-w-sm text-xs text-muted-foreground">
            Timed contests, leaderboards, and streak badges will be enabled once the gamification module ships.
          </p>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
