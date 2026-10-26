import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeading } from "@/components/layout/page-heading";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Study Sheets — Arcanum",
  description: "Quick-reference study sheets for all five core subjects.",
};

export default function StudySheetsPage() {
  return (
    <PageContainer>
      <PageHeading
        eyebrow={
          <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <span className="size-1.5 rounded-full bg-foreground/60" />
            Reference Material
          </p>
        }
        title="Study Sheets"
        description="Quick-reference cheat sheets covering key formulae, definitions, and patterns for each subject."
      />
      <Card className="shadow-none border-dashed bg-muted/10">
        <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
          <div className="flex size-12 items-center justify-center rounded-2xl border bg-muted/60">
            <BookOpen className="size-6 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground">Coming in Week 6</p>
          <p className="max-w-sm text-xs text-muted-foreground">
            Subject-wise study sheets with key concepts, definitions, and common interview patterns will be available here.
          </p>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
