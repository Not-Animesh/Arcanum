
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import { PageHeading } from "@/components/layout/page-heading";
import { LEARNING_RESOURCES } from "@/features/learning/config/learning-resources";
import { LearningResourceCard } from "@/features/learning/components/learning-resource-card";

export const metadata: Metadata = {
  title: "Subject Catalog | Arcanum",
  description:
    "Explore structured computer science curricula in DSA, DBMS, OOP, Computer Networks, and Operating Systems.",
};

const SUBJECT_ORDER = ["dsa", "dbms", "oops", "cn", "os"] as const;

export default function SubjectsCatalogPage() {
  const subjects = SUBJECT_ORDER
    .map((slug) =>
      LEARNING_RESOURCES.find((resource) => resource.slug === slug),
    )
    .filter((resource) => resource?.isAvailable);

  return (
    <PageContainer className="space-y-8">
      <PageHeading
        eyebrow={
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            Learning Library
          </span>
        }
        title="Explore subjects"
        description="Build strong computer science fundamentals with structured curricula designed for learning, revision, and technical interview preparation."
        actions={
          <Link
            href="/learning-paths"
            className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-border bg-background px-3.5 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            View learning paths
            <ArrowRight className="size-4" />
          </Link>
        }
      />

      <section aria-label="Available subjects" className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/70 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="size-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold tracking-tight">
              Core subjects
            </h2>
          </div>

          <span className="text-xs text-muted-foreground">
            {subjects.length} subjects
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {subjects.map((resource) => (
            <LearningResourceCard
              key={resource.id}
              resource={resource}
              className="h-full"
            />
          ))}
        </div>

        {subjects.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed px-6 py-12 text-center">
            <GraduationCap className="mb-3 size-8 text-muted-foreground" />
            <h3 className="text-sm font-semibold">No subjects available</h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Subject curricula will appear here when they are configured and
              available.
            </p>
          </div>
        )}
      </section>
    </PageContainer>
  );
}
