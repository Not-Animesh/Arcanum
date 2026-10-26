import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import { PageHeading } from "@/components/layout/page-heading";
import { LEARNING_RESOURCES } from "@/features/learning/config/learning-resources";
import { LearningResourceCard } from "@/features/learning/components/learning-resource-card";

export const metadata: Metadata = {
  title: "Subjects Catalog",
  description:
    "Explore technical subjects, structured curricula, and foundation modules across computer science.",
};

export default function SubjectsCatalogPage() {
  return (
    <PageContainer>
      <PageHeading
        eyebrow={
          <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <span className="size-1.5 rounded-full bg-foreground/60" />
            Learning Library
          </p>
        }
        title="Subjects Catalog"
        description="Explore comprehensive subject roadmaps designed for deep conceptual understanding and technical interview preparation."
        actions={
          <Link
            href="/learning-paths"
            className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border bg-background px-3 text-xs font-medium text-foreground hover:bg-muted transition-colors"
          >
            <span>View All Tracks</span>
            <ArrowRight className="size-3.5" />
          </Link>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LEARNING_RESOURCES.map((resource) => (
          <LearningResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </PageContainer>
  );
}
