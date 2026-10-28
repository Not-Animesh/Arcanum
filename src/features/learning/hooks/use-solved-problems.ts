"use client";

import * as React from "react";

/**
 * Reads the same key the Practice page writes to, so "solved" counts in the
 * syllabus match what the learner ticked on /practice.
 * Shape stored there: { "completed": ["a2z-401", ...] }
 */
const STORAGE_KEY = "arcanum-practice-progress-v1";

function read(): Set<string> {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? (JSON.parse(raw) as { completed?: unknown }) : {};
        const completed = Array.isArray(parsed.completed) ? parsed.completed : [];
        return new Set(completed.filter((id): id is string => typeof id === "string"));
    } catch {
        return new Set();
    }
}

export function useSolvedProblems(): Set<string> {
    const [solved, setSolved] = React.useState<Set<string>>(() => new Set());

    React.useEffect(() => {
        setSolved(read());

        const sync = (event: StorageEvent) => {
            if (event.key === null || event.key === STORAGE_KEY) setSolved(read());
        };
        window.addEventListener("storage", sync);
        return () => window.removeEventListener("storage", sync);
    }, []);

    return solved;
}