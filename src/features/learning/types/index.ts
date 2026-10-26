export type TrackId =
  | "all"
  | "dsa"
  | "core-cs"
  | "system-design"
  | "data-engineering"
  | "web-design";

export interface LearningTrack {
  id: TrackId;
  label: string;
  description: string;
}

export interface TopicItem {
  id: string;
  title: string;
  duration?: string;
  summary?: string;
  keyPoints?: string[];
}

export interface CurriculumModule {
  id: string;
  moduleNumber: number;
  title: string;
  description?: string;
  topics: TopicItem[];
}

export interface CurriculumFAQ {
  question: string;
  answer: string;
}

export interface LearningResource {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  trackId: TrackId;
  trackLabel: string;
  iconName: string;
  modulesCount: number;
  topicsCount: number;
  estimatedDuration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  href: string;
  isAvailable: boolean;
}

export interface CurriculumDetail {
  slug: string;
  title: string;
  subtitle: string;
  trackId: TrackId;
  trackLabel: string;
  estimatedDuration: string;
  totalModules: number;
  totalTopics: number;
  quizzesCount?: number;
  about: {
    overview: string;
    whyItMatters: string;
    organization: string;
    whatYoullLearn: string[];
    practicalRelevance: string;
  };
  modules: CurriculumModule[];
  prerequisites: string[];
  learningObjectives: string[];
  suggestedStudyOrder: string;
  faqs?: CurriculumFAQ[];
}
