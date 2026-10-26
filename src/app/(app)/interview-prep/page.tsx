import type { Metadata } from "next";
import { BriefcaseBusiness } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeading } from "@/components/layout/page-heading";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Interview Prep — Arcanum",
  description: "AI-powered mock interview sessions for all five core CS subjects.",
};

export default function InterviewPrepPage() {
  return (
    <PageContainer>
      <PageHeading
        eyebrow={
          <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <span className="size-1.5 rounded-full bg-foreground/60" />
            Career Preparation
          </p>
        }
        title="Interview Prep"
        description="Practice mock interviews with AI-generated questions scoped to your weakest topics based on your mastery data."
      />
      <Card className="shadow-none border-dashed bg-muted/10">
        <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
          <div className="flex size-12 items-center justify-center rounded-2xl border bg-muted/60">
            <BriefcaseBusiness className="size-6 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground">Coming in Week 5</p>
          <p className="max-w-sm text-xs text-muted-foreground">
            Subject-wise mock interview chat with LLM-generated questions and free-text answer feedback will be available here.
          </p>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
