
import rawDataset from "@/data/learning/dsa-a2z.json";
import type { LearningResource } from "../types/resource";

export const DSA_RESOURCES: LearningResource[] =
    rawDataset.problems.map((problem) => ({
        id: problem.id,
        slug: problem.slug,
        title: problem.title,

        subjectSlug: "dsa",
        layout: "learning",

        section: problem.stepTitle,
        sectionPath: ["dsa", String(problem.step)],
        topic: problem.topic,
        outlineTopic: problem.topic,

        tier: problem.tier,
        duration: problem.duration || null,

        source: {
            name: problem.platform,
            id: null,
            url: problem.url || null,
        },

        urls: {
            learning: problem.url || null,
            article: problem.article || null,
            video: problem.video || null,
            practice: problem.url || null,
        },

        isTrial: false,
        notes: problem.difficulty
            ? `Difficulty: ${problem.difficulty}`
            : null,
    }));

export function getDsaResources(): LearningResource[] {
    return DSA_RESOURCES;
}

export function getDsaResourcesByTopic(
    topic: string,
): LearningResource[] {
    return DSA_RESOURCES.filter(
        (resource) => resource.topic === topic,
    );
}

export function getDsaResourcesBySection(
    section: string,
): LearningResource[] {
    return DSA_RESOURCES.filter(
        (resource) => resource.section === section,
    );
}
