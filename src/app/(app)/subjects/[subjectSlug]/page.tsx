import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageContainer } from "@/components/layout/page-container";
import {
  CURRICULA,
  getCurriculumBySlug,
} from "@/features/learning/config/curricula";
import { CurriculumHeader } from "@/features/learning/components/curriculum-header";
import { CurriculumProgress } from "@/features/learning/components/curriculum-progress";
import { CurriculumActions } from "@/features/learning/components/curriculum-actions";
import { CurriculumAbout } from "@/features/learning/components/curriculum-about";
import { CurriculumOverview } from "@/features/learning/components/curriculum-overview";
import { CurriculumSyllabus } from "@/features/learning/components/curriculum-syllabus";
import { CurriculumFAQSection } from "@/features/learning/components/curriculum-faq";

type PageProps = {
  params: Promise<{ subjectSlug: string }>;
};

export function generateStaticParams() {
  return Object.keys(CURRICULA).map((slug) => ({
    subjectSlug: slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { subjectSlug } = await params;
  const curriculum = getCurriculumBySlug(subjectSlug);

  if (!curriculum) {
    return {
      title: "Subject Not Found",
    };
  }

  return {
    title: curriculum.title,
    description: curriculum.subtitle,
  };
}

export default async function SubjectDetailPage({ params }: PageProps) {
  const { subjectSlug } = await params;
  const curriculum = getCurriculumBySlug(subjectSlug);

  if (!curriculum) {
    notFound();
  }

  return (
    <PageContainer size="default" className="space-y-8">
      {/* 1. Header with Breadcrumb & Metadata row */}
      <CurriculumHeader curriculum={curriculum} />

      {/* 2. Honest Learner Progress Panel */}
      <CurriculumProgress
        totalTopics={curriculum.totalTopics}
        completedTopics={0}
      />

      {/* 3. Learning Action Strip */}
      <CurriculumActions subjectSlug={subjectSlug} />

      {/* 4. About This Curriculum */}
      <CurriculumAbout about={curriculum.about} />

      {/* 5. Standards, Prerequisites & Learning Objectives */}
      <CurriculumOverview
        prerequisites={curriculum.prerequisites}
        learningObjectives={curriculum.learningObjectives}
        suggestedStudyOrder={curriculum.suggestedStudyOrder}
      />

      {/* 6. Expandable Syllabus & Topic Selector */}
      <CurriculumSyllabus
        modules={curriculum.modules}
        subjectSlug={subjectSlug}
      />

      {/* 7. Collapsible FAQs */}
      <CurriculumFAQSection faqs={curriculum.faqs} />
    </PageContainer>
  );
}
