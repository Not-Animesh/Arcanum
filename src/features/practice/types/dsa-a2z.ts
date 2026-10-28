
export type DsaPlatform = "takeuforward" | "leetcode" | "gfg";

export type DsaTier = "basic" | "core" | "pro" | null;

export interface DsaSheetStep {
    n: number;
    title: string;
    count: number;
}

export interface DsaSheetMeta {
    title: string;
    problemCount: number;
    stepCount: number;
    generated: string;
    source: string;
    steps: DsaSheetStep[];
    platforms: {
        takeuforward: number;
        gfg: number;
        leetcode: number;
    };
    withDifficulty: number;
    sources: {
        "order,titles,links": string;
        difficulty: string;
        gfgLinks: string;
    };
    gfgLinks?: string;
}

export interface DsaAlternativeUrl {
    platform: DsaPlatform;
    url: string;
}

export interface DsaA2zProblem {
    id: string;
    order: number;
    title: string;
    step: number;
    stepTitle: string;
    topic: string;
    tier: DsaTier;
    difficulty: string;
    difficultySource: string;
    platform: DsaPlatform;
    url: string;
    altUrls: DsaAlternativeUrl[];
    article: string | null;
    video: string | null;
    premium: boolean;
    duration: string;
    slug: string;
    lcSlug: string;
}

export interface DsaA2zDataset {
    meta: DsaSheetMeta;
    problems: DsaA2zProblem[];
}
