import * as React from "react";
import type { Metadata } from "next";

import { PageContainer } from "@/components/layout/page-container";
import { PageHeading } from "@/components/layout/page-heading";
import { PracticeView } from "@/features/practice/components/practice-view";

export const metadata: Metadata = {
  title: "Practice",
  description:
    "Solve curated problems across data structures, algorithms, databases, and computer systems.",
};

export default function PracticePage() {
  return (
    <PageContainer>
      <PageHeading
        eyebrow={
          <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <span className="size-1.5 rounded-full bg-foreground/60" />
            Adaptive Practice
          </p>
        }
        title="Practice"
        description="Solve curated problems to strengthen your algorithmic skills, database queries, and core computer science fundamentals."
      />

      <React.Suspense
        fallback={
          <div className="rounded-xl border p-8 text-center text-xs text-muted-foreground">
            Loading practice catalog...
          </div>
        }
      >
        <PracticeView />
      </React.Suspense>
    </PageContainer>
  );
}
