
import rawDataset from "@/data/learning/dsa-a2z.json";

import type {
    DsaA2zDataset,
    DsaA2zProblem,
    DsaSheetStep,
} from "../types/dsa-a2z";

const dataset = rawDataset as unknown as DsaA2zDataset;

export const DSA_A2Z_META = dataset.meta;

export const DSA_A2Z_PROBLEMS: DsaA2zProblem[] = [...dataset.problems].sort(
    (a, b) => a.order - b.order,
);

export const DSA_A2Z_STEPS: DsaSheetStep[] = [...dataset.meta.steps].sort(
    (a, b) => a.n - b.n,
);

export function getDsaA2zProblemById(
    id: string,
): DsaA2zProblem | undefined {
    return DSA_A2Z_PROBLEMS.find((problem) => problem.id === id);
}

export function getDsaA2zProblemsByStep(
    step: number,
): DsaA2zProblem[] {
    return DSA_A2Z_PROBLEMS.filter((problem) => problem.step === step);
}

export function searchDsaA2zProblems(query: string): DsaA2zProblem[] {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return DSA_A2Z_PROBLEMS;

    return DSA_A2Z_PROBLEMS.filter((problem) =>
        [
            problem.title,
            problem.topic,
            problem.stepTitle,
            problem.platform,
            problem.difficulty,
        ].some((value) => value.toLowerCase().includes(normalizedQuery)),
    );
}
