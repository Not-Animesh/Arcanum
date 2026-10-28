
export type SubjectSlug = "dsa" | "dbms" | "oops" | "cn" | "os";

export type LearningResourceLayout = "learning" | "article" | "video";

export interface LearningResource {
    id: string;
    slug: string;
    title: string;

    subjectSlug: SubjectSlug;
    layout: LearningResourceLayout;

    section: string;
    sectionPath: string[];
    topic: string;
    outlineTopic: string;

    tier: string | null;
    duration: string | null;

    source: {
        name: string;
        id: number | null;
        url: string | null;
    };

    urls: {
        learning: string | null;
        article: string | null;
        video: string | null;
        practice: string | null;
    };

    isTrial: boolean;
    notes: string | null;
}
