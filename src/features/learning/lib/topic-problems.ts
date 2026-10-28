import { DSA_PROBLEMS, type DsaProblem } from "@/data/learning/dsa-problems";

export interface TopicProblemSet {
    problems: DsaProblem[];
    /** First video link found among the topic's problems, if any. */
    videoUrl: string | null;
    /** First article link found among the topic's problems, if any. */
    articleUrl: string | null;
}

const EMPTY: TopicProblemSet = { problems: [], videoUrl: null, articleUrl: null };

// Built once at module load: topicId -> problems (kept in sheet order).
const BY_TOPIC = new Map<string, TopicProblemSet>();

for (const problem of [...DSA_PROBLEMS].sort((a, b) => a.order - b.order)) {
    let entry = BY_TOPIC.get(problem.topicId);
    if (!entry) {
        entry = { problems: [], videoUrl: null, articleUrl: null };
        BY_TOPIC.set(problem.topicId, entry);
    }
    entry.problems.push(problem);
    entry.videoUrl ??= problem.video;
    entry.articleUrl ??= problem.article;
}

/** Only DSA topics are mapped today; other subjects return an empty set. */
export function getTopicProblemSet(topicId: string): TopicProblemSet {
    return BY_TOPIC.get(topicId) ?? EMPTY;
}

export function getPracticeProblemHref(subjectSlug: string, problemId: string) {
    return `/practice?subject=${encodeURIComponent(subjectSlug)}&problem=${encodeURIComponent(problemId)}`;
}

export function getPracticeTopicHref(subjectSlug: string, topicId: string) {
    return `/practice?subject=${encodeURIComponent(subjectSlug)}&topic=${encodeURIComponent(topicId)}`;
}