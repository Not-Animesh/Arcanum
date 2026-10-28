import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeading } from "@/components/layout/page-heading";
import { LearningPathsView } from "@/features/learning/components/learning-paths-view";

export const metadata: Metadata = {
  title: "Learning Paths",
  description:
    "Follow structured learning roadmaps, explore computer science fundamentals, and prepare for technical interviews.",
};

export default function LearningPathsPage() {
  return (
    <PageContainer>
      <PageHeading
        eyebrow={
          <p className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            <span className="size-1.5 rounded-full bg-foreground/60" />
            Curriculum Roadmaps
          </p>
        }
        title="Learning Paths"
        description="Follow structured learning roadmaps, explore computer science fundamentals, and prepare for technical interviews."
      />

      <LearningPathsView />
    </PageContainer>
  );
}
