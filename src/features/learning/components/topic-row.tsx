"use client";

import * as React from "react";
import Link from "next/link";
import {
    ArrowUpRight,
    CheckCircle2,
    ChevronDown,
    Circle,
    ExternalLink,
    FileText,
    PlayCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { TopicItem } from "../types";
import {
    getPracticeProblemHref,
    getPracticeTopicHref,
    getTopicProblemSet,
} from "../lib/topic-problems";

const PREVIEW_COUNT = 5;

interface TopicRowProps {
    topic: TopicItem;
    index: number;
    total: number;
    subjectSlug: string;
    solvedIds: Set<string>;
}

export function TopicRow({
    topic,
    index,
    total,
    subjectSlug,
    solvedIds,
}: TopicRowProps) {
    const [open, setOpen] = React.useState(false);
    const [showAll, setShowAll] = React.useState(false);
    const panelId = React.useId();

    const { problems, videoUrl, articleUrl } = getTopicProblemSet(topic.id);
    const hasContent = problems.length > 0 || Boolean(videoUrl) || Boolean(articleUrl);

    const solvedCount = problems.filter((p) => solvedIds.has(p.id)).length;
    const allSolved = problems.length > 0 && solvedCount === problems.length;
    const visible = showAll ? problems : problems.slice(0, PREVIEW_COUNT);

    const meta = [
        topic.duration,
        problems.length > 0 ? `${solvedCount} of ${problems.length} questions solved` : null,
    ].filter(Boolean);

    const header = (
        <>
            <div
                className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-lg border bg-background",
                    allSolved
                        ? "border-emerald-500/40 text-emerald-600 dark:text-emerald-400"
                        : "border-border/70 text-muted-foreground",
                )}
            >
                {allSolved ? (
                    <CheckCircle2 className="size-3.5" aria-hidden="true" />
                ) : (
                    <FileText className="size-3.5" aria-hidden="true" />
                )}
            </div>

            <div className="min-w-0 flex-1 space-y-0.5">
                <span className="block text-[13px] font-medium leading-5 text-foreground/90">
                    {topic.title}
                </span>
                <span className="block text-[11px] text-muted-foreground">
                    {meta.length > 0 ? meta.join(" · ") : `Topic ${index + 1} of ${total}`}
                </span>
            </div>
        </>
    );

    // Topics with nothing to show (non-DSA subjects for now) stay as plain rows.
    if (!hasContent) {
        return (
            <div className="flex w-full items-center gap-3 rounded-lg px-3 py-3">
                {header}
            </div>
        );
    }

    return (
        <div
            className={cn(
                "rounded-lg transition-colors",
                open && "bg-background ring-1 ring-border/70",
            )}
        >
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls={panelId}
                className="group/topic flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
                {header}
                <ChevronDown
                    className={cn(
                        "size-4 shrink-0 text-muted-foreground/70 transition-transform",
                        open && "rotate-180",
                    )}
                    aria-hidden="true"
                />
            </button>

            {open && (
                <div id={panelId} className="space-y-4 px-3 pb-3 pt-1">
                    {(videoUrl || articleUrl) && (
                        <div className="space-y-1.5 rounded-lg border border-border/70 bg-muted/30 p-3">
                            <p className="text-xs font-semibold text-foreground">Learning resources</p>
                            {videoUrl && (
                                <ResourceLink
                                    href={videoUrl}
                                    icon={<PlayCircle className="size-4" aria-hidden="true" />}
                                    title="Video lesson"
                                    caption="External learning resource"
                                />
                            )}
                            {articleUrl && (
                                <ResourceLink
                                    href={articleUrl}
                                    icon={<FileText className="size-4" aria-hidden="true" />}
                                    title="Topic notes / article"
                                    caption="Read before practising"
                                />
                            )}
                        </div>
                    )}

                    {problems.length > 0 && (
                        <div className="space-y-1">
                            <div className="flex items-center justify-between px-1 pb-1">
                                <p className="text-xs font-semibold text-foreground">
                                    Related practice questions
                                </p>
                                <span className="text-[11px] tabular-nums text-muted-foreground">
                                    {solvedCount}/{problems.length} solved
                                </span>
                            </div>

                            <ol className="space-y-0.5">
                                {visible.map((problem, i) => {
                                    const solved = solvedIds.has(problem.id);
                                    return (
                                        <li key={problem.id}>
                                            <Link
                                                href={getPracticeProblemHref(subjectSlug, problem.id)}
                                                className={cn(
                                                    "group/q flex items-center gap-2.5 rounded-md px-2 py-1.5 text-[13px] transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                                    solved
                                                        ? "text-emerald-600 dark:text-emerald-400"
                                                        : "text-foreground/90",
                                                )}
                                            >
                                                {solved ? (
                                                    <CheckCircle2 className="size-4 shrink-0" aria-label="Solved" />
                                                ) : (
                                                    <Circle
                                                        className="size-4 shrink-0 text-muted-foreground/50"
                                                        aria-label="Not solved"
                                                    />
                                                )}
                                                <span className="min-w-0 flex-1 truncate">
                                                    {i + 1}. {problem.title}
                                                </span>
                                                {problem.difficulty && (
                                                    <span className="hidden shrink-0 text-[11px] text-muted-foreground sm:inline">
                                                        {problem.difficulty}
                                                    </span>
                                                )}
                                                <ArrowUpRight
                                                    className="size-3.5 shrink-0 text-muted-foreground/60 transition-colors group-hover/q:text-foreground"
                                                    aria-hidden="true"
                                                />
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ol>

                            {problems.length > PREVIEW_COUNT && (
                                <button
                                    type="button"
                                    onClick={() => setShowAll((v) => !v)}
                                    className="px-2 pt-1 text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                                >
                                    {showAll
                                        ? "Show fewer"
                                        : `Show ${problems.length - PREVIEW_COUNT} more`}
                                </button>
                            )}

                            <Link
                                href={getPracticeTopicHref(subjectSlug, topic.id)}
                                className="mt-2 flex h-9 w-full items-center justify-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            >
                                Open all related questions
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function ResourceLink({
    href,
    icon,
    title,
    caption,
}: {
    href: string;
    icon: React.ReactNode;
    title: string;
    caption: string;
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group/r flex items-center gap-3 rounded-md px-2 py-1.5 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
            <span className="text-muted-foreground group-hover/r:text-foreground">{icon}</span>
            <span className="min-w-0 flex-1">
                <span className="block text-[13px] font-medium text-foreground">{title}</span>
                <span className="block text-[11px] text-muted-foreground">{caption}</span>
            </span>
            <ExternalLink className="size-3.5 shrink-0 text-muted-foreground/60" aria-hidden="true" />
        </a>
    );
}