"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowUpRight,
  BookOpen,
  Bookmark,
  Check,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  ExternalLink,
  Filter,
  Play,
  RotateCcw,
  Search,
  Video,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { SAMPLE_PRACTICE_PROBLEMS } from "../config/practice-problems";
import type { ProblemCategory } from "../types";
import { DSA_PROBLEMS } from "@/data/learning/dsa-problems";

const DIFFICULTIES = ["All", "Easy", "Medium", "Hard"] as const;
type DifficultyFilter = (typeof DIFFICULTIES)[number];
type ProblemStatusFilter = "all" | "solved" | "unsolved";

const SLUG_TO_CATEGORY: Record<string, ProblemCategory> = {
  dsa: "DSA",
  dbms: "DBMS",
  os: "Operating Systems",
  cn: "Computer Networks",
  oops: "OOP Concepts",
};

const CATEGORIES: ProblemCategory[] = [
  "All",
  "DSA",
  "DBMS",
  "Operating Systems",
  "Computer Networks",
  "OOP Concepts",
];

const STORAGE_KEY = "arcanum-practice-progress-v1";
const BOOKMARK_STORAGE_KEY = "arcanum-practice-bookmarks-v2";

interface PracticeProgress {
  completed: string[];
  bookmarked: string[];
}

interface DisplayProblem {
  id: string;
  title: string;
  category: Exclude<ProblemCategory, "All">;
  difficulty: string;
  tags: string[];
  module: string;
  moduleId?: string;
  topicId?: string;
  topicTitle?: string;
  platform: string;
  url: string | null;
  article: string | null;
  video: string | null;
  duration: string | null;
  order: number;
  source: "a2z" | "sample";
  starterNote?: string;
}

/** Bookmark IDs are namespaced by subject to prevent cross-subject collisions. */
function getBookmarkId(category: ProblemCategory, id: string) {
  return `${category}::${id}`;
}

function platformName(platform: string) {
  switch (platform.toLowerCase()) {
    case "leetcode":
      return "LeetCode";
    case "gfg":
      return "GeeksforGeeks";
    case "takeuforward":
      return "takeUforward";
    default:
      return platform;
  }
}

function difficultyClass(difficulty: string) {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
    case "medium":
      return "border-amber-500/25 bg-amber-500/10 text-amber-600 dark:text-amber-400";
    case "hard":
      return "border-rose-500/25 bg-rose-500/10 text-rose-600 dark:text-rose-400";
    default:
      return "border-border bg-muted/50 text-muted-foreground";
  }
}

function platformClass(platform: string) {
  switch (platform.toLowerCase()) {
    case "leetcode":
      return "bg-orange-500/10 text-orange-600 dark:text-orange-400";
    case "gfg":
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
    case "takeuforward":
      return "bg-violet-500/10 text-violet-600 dark:text-violet-400";
    default:
      return "bg-muted text-muted-foreground";
  }
}

function readProgress(): PracticeProgress {
  if (typeof window === "undefined") {
    return { completed: [], bookmarked: [] };
  }

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const savedBookmarks = window.localStorage.getItem(
      BOOKMARK_STORAGE_KEY,
    );

    const parsed = saved
      ? (JSON.parse(saved) as Partial<PracticeProgress>)
      : {};

    let bookmarks: string[] = [];

    if (savedBookmarks) {
      const stored = JSON.parse(savedBookmarks) as unknown;

      if (Array.isArray(stored)) {
        bookmarks = stored.filter(
          (item): item is string => typeof item === "string",
        );
      }
    } else if (Array.isArray(parsed.bookmarked)) {
      // Migrate older unscoped bookmarks to the new subject-specific format.
      const allProblems = [
        ...DSA_PROBLEMS.map((problem) => ({
          id: problem.id,
          category: "DSA" as const,
        })),
        ...SAMPLE_PRACTICE_PROBLEMS.map((problem) => ({
          id: problem.id,
          category: problem.category,
        })),
      ];

      bookmarks = parsed.bookmarked.flatMap((id) => {
        const matches = allProblems.filter((problem) => problem.id === id);
        return matches.map((problem) =>
          getBookmarkId(problem.category, id),
        );
      });
    }

    return {
      completed: Array.isArray(parsed.completed)
        ? parsed.completed.filter(
          (item): item is string => typeof item === "string",
        )
        : [],
      bookmarked: bookmarks,
    };
  } catch {
    return { completed: [], bookmarked: [] };
  }
}

const SAMPLE_PROBLEMS: DisplayProblem[] =
  SAMPLE_PRACTICE_PROBLEMS.map((problem) => ({
    id: problem.id,
    title: problem.title,
    category: problem.category,
    difficulty: problem.difficulty,
    tags: problem.tags,
    module: problem.category,
    platform: "Arcanum",
    url: null,
    article: null,
    video: null,
    duration: null,
    order: 0,
    source: "sample",
    starterNote: problem.starterNote,
  }));

const A2Z_PROBLEMS: DisplayProblem[] = DSA_PROBLEMS.map((problem) => ({
  id: problem.id,
  title: problem.title,
  category: "DSA",
  difficulty:
    problem.difficulty ||
    (problem.tier === "basic"
      ? "Easy"
      : problem.tier === "core"
        ? "Medium"
        : problem.tier === "advanced"
          ? "Hard"
          : "Unrated"),
  tags: [...new Set([problem.topic, problem.topicTitle].filter(Boolean))],
  module: problem.moduleTitle,
  moduleId: problem.moduleId,
  topicId: problem.topicId,
  topicTitle: problem.topicTitle,
  platform: problem.platform,
  url: problem.url || null,
  article: problem.article || null,
  video: problem.video || null,
  duration: problem.duration || null,
  order: problem.order,
  source: "a2z",
}));

const ALL_PROBLEMS = [...A2Z_PROBLEMS, ...SAMPLE_PROBLEMS];

function ProblemRow({
  problem,
  completed,
  bookmarked,
  expanded,
  highlighted,
  onToggleCompleted,
  onToggleBookmarked,
  onToggleExpanded,
}: {
  problem: DisplayProblem;
  completed: boolean;
  bookmarked: boolean;
  expanded: boolean;
  highlighted: boolean;
  onToggleCompleted: () => void;
  onToggleBookmarked: () => void;
  onToggleExpanded: () => void;
}) {
  return (
    <div
      id={`problem-${problem.id}`}
      className={cn(
        "group scroll-mt-28 border-b last:border-b-0 transition-colors",
        completed ? "bg-emerald-500/[0.035]" : "hover:bg-muted/30",
        highlighted && "bg-primary/[0.06] ring-1 ring-inset ring-primary/40",
      )}
    >
      <div className="grid grid-cols-[24px_minmax(0,1fr)_auto] items-center gap-3 px-3 py-3 sm:px-4">
        <Checkbox
          checked={completed}
          onCheckedChange={onToggleCompleted}
          aria-label={`Mark ${problem.title} as completed`}
          className={cn(
            "size-[17px]",
            completed &&
            "border-emerald-600 data-[state=checked]:bg-emerald-600",
          )}
        />

        <button
          type="button"
          onClick={onToggleExpanded}
          aria-expanded={expanded}
          className="min-w-0 text-left"
        >
          <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1.5">
            <span
              className={cn(
                "truncate text-[13px] font-medium tracking-tight",
                completed
                  ? "text-emerald-700 dark:text-emerald-400"
                  : "text-foreground",
              )}
            >
              {problem.title}
            </span>

            {problem.difficulty && (
              <Badge
                variant="outline"
                className={cn(
                  "h-[19px] shrink-0 rounded px-1.5 text-[10px] font-medium",
                  difficultyClass(problem.difficulty),
                )}
              >
                {problem.difficulty}
              </Badge>
            )}

            {problem.source === "a2z" && (
              <Badge
                variant="outline"
                className="h-[19px] shrink-0 rounded px-1.5 text-[10px] font-normal text-muted-foreground"
              >
                A2Z
              </Badge>
            )}
          </div>

          <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted-foreground">
            {problem.source === "a2z" && (
              <>
                <span className="font-medium text-foreground/70">
                  {problem.module}
                </span>
                <span className="text-border">·</span>
              </>
            )}
            {problem.tags.slice(0, 3).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </button>

        <div className="flex shrink-0 items-center justify-end gap-1 sm:gap-2">
          <span
            className={cn(
              "hidden rounded-md px-2 py-1 text-[10px] font-medium sm:inline-flex",
              platformClass(problem.platform),
            )}
          >
            {platformName(problem.platform)}
          </span>

          {problem.article && (
            <a
              href={problem.article}
              target="_blank"
              rel="noopener noreferrer"
              title="Open article"
              aria-label={`Open article for ${problem.title}`}
              className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <BookOpen className="size-4" />
            </a>
          )}

          {problem.video && (
            <a
              href={problem.video}
              target="_blank"
              rel="noopener noreferrer"
              title="Watch video"
              aria-label={`Watch video for ${problem.title}`}
              className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <Video className="size-4" />
            </a>
          )}

          {problem.url ? (
            <a
              href={problem.url}
              target="_blank"
              rel="noopener noreferrer"
              title={`Solve ${problem.title} on ${platformName(problem.platform)}`}
              className="inline-flex h-8 items-center gap-1.5 rounded-md border px-2.5 text-[11px] font-medium hover:bg-muted"
            >
              <span className="hidden sm:inline">Solve</span>
              <ExternalLink className="size-3.5" />
            </a>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="h-8 px-2.5 text-[11px]"
              onClick={onToggleExpanded}
            >
              Details
            </Button>
          )}

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onToggleBookmarked}
            aria-label={
              bookmarked
                ? `Remove bookmark from ${problem.title}`
                : `Bookmark ${problem.title}`
            }
            aria-pressed={bookmarked}
            className={cn(
              "size-8 shrink-0",
              bookmarked
                ? "text-violet-600 dark:text-violet-400"
                : "text-muted-foreground",
            )}
          >
            <Bookmark
              className="size-4"
              fill={bookmarked ? "currentColor" : "none"}
            />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onToggleExpanded}
            aria-label={expanded ? "Collapse details" : "Expand details"}
            aria-expanded={expanded}
            className="size-8 shrink-0 text-muted-foreground"
          >
            {expanded ? (
              <ChevronDown className="size-4" />
            ) : (
              <ChevronRight className="size-4" />
            )}
          </Button>
        </div>
      </div>

      {expanded && (
        <div className="ml-9 mr-3 space-y-3 border-t border-dashed px-2 py-3 sm:ml-11 sm:mr-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="text-[10px] font-normal">
              {problem.module}
            </Badge>
            <Badge variant="outline" className="text-[10px] font-normal">
              {platformName(problem.platform)}
            </Badge>
            {problem.duration && (
              <span className="text-[11px] text-muted-foreground">
                Estimated time: {problem.duration}
              </span>
            )}
          </div>

          {problem.starterNote && (
            <p className="text-xs leading-relaxed text-muted-foreground">
              {problem.starterNote}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2">
            {problem.url && (
              <a
                href={problem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 items-center gap-2 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary/90"
              >
                <Play className="size-3.5" />
                Open problem
                <ArrowUpRight className="size-3.5" />
              </a>
            )}

            {problem.article && (
              <a
                href={problem.article}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 items-center gap-2 rounded-md border px-3 text-xs font-medium hover:bg-muted"
              >
                <BookOpen className="size-3.5" />
                Read article
              </a>
            )}

            {problem.video && (
              <a
                href={problem.video}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 items-center gap-2 rounded-md border px-3 text-xs font-medium hover:bg-muted"
              >
                <Video className="size-3.5" />
                Watch video
              </a>
            )}

            <Button
              size="sm"
              variant="ghost"
              className="h-8 gap-2 text-xs"
              onClick={onToggleCompleted}
            >
              {completed ? (
                <CircleCheck className="size-3.5 text-emerald-600" />
              ) : (
                <Check className="size-3.5" />
              )}
              {completed ? "Completed" : "Mark completed"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export function PracticeView() {
  const searchParams = useSearchParams();
  const subjectParam = searchParams.get("subject");
  const topicParam = searchParams.get("topic") ?? searchParams.get("topicId");
  const problemParam = searchParams.get("problem");

  const fixedCategory =
    subjectParam && SLUG_TO_CATEGORY[subjectParam]
      ? SLUG_TO_CATEGORY[subjectParam]
      : topicParam
        ? "DSA"
        : null;

  const [searchQuery, setSearchQuery] = React.useState("");
  const [userCategory, setUserCategory] =
    React.useState<ProblemCategory | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] =
    React.useState<DifficultyFilter>("All");
  const [selectedModule, setSelectedModule] = React.useState("All");
  const [selectedTopic, setSelectedTopic] = React.useState(topicParam ?? "All");
  const [progress, setProgress] = React.useState<PracticeProgress>({
    completed: [],
    bookmarked: [],
  });
  const [progressLoaded, setProgressLoaded] = React.useState(false);
  const [expandedIds, setExpandedIds] = React.useState<string[]>([]);
  const [highlightedId, setHighlightedId] = React.useState<string | null>(null);
  const [statusFilter, setStatusFilter] =
    React.useState<ProblemStatusFilter>("all");
  const [bookmarksOnly, setBookmarksOnly] = React.useState(false);

  React.useEffect(() => {
    setProgress(readProgress());
    setProgressLoaded(true);
  }, []);

  // Deep link: /practice?subject=dsa&problem=a2z-401 -> expand, scroll to and
  // briefly highlight that exact question.
  React.useEffect(() => {
    if (!problemParam || !ALL_PROBLEMS.some((p) => p.id === problemParam)) {
      return;
    }

    setExpandedIds((current) =>
      current.includes(problemParam) ? current : [...current, problemParam],
    );
    setHighlightedId(problemParam);

    const scrollTimer = window.setTimeout(() => {
      document
        .getElementById(`problem-${problemParam}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 150);
    const clearTimer = window.setTimeout(() => setHighlightedId(null), 3500);

    return () => {
      window.clearTimeout(scrollTimer);
      window.clearTimeout(clearTimer);
    };
  }, [problemParam]);

  React.useEffect(() => {
    if (!progressLoaded) return;

    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ completed: progress.completed }),
      );
      window.localStorage.setItem(
        BOOKMARK_STORAGE_KEY,
        JSON.stringify(progress.bookmarked),
      );
    } catch {
      // The page still works if browser storage is unavailable.
    }
  }, [progress, progressLoaded]);

  const selectedCategory = fixedCategory ?? userCategory ?? "All";

  const availableModules = React.useMemo(
    () =>
      Array.from(
        new Map(
          A2Z_PROBLEMS.map((problem) => [
            problem.moduleId ?? problem.module,
            { id: problem.moduleId ?? problem.module, title: problem.module },
          ] as const),
        ).values(),
      ),
    [],
  );

  const availableTopics = React.useMemo(
    () =>
      A2Z_PROBLEMS.filter(
        (problem) =>
          selectedModule === "All" || problem.moduleId === selectedModule,
      ).reduce<{ id: string; title: string }[]>((topics, problem) => {
        if (
          problem.topicId &&
          !topics.some((topic) => topic.id === problem.topicId)
        ) {
          topics.push({
            id: problem.topicId,
            title: problem.topicTitle ?? problem.tags[0] ?? problem.topicId,
          });
        }
        return topics;
      }, []),
    [selectedModule],
  );

  const filteredProblems = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const sourceProblems: DisplayProblem[] =
      selectedCategory === "DSA"
        ? A2Z_PROBLEMS
        : selectedCategory === "All"
          ? ALL_PROBLEMS
          : SAMPLE_PROBLEMS.filter(
            (problem) => problem.category === selectedCategory,
          );

    return sourceProblems
      .filter((problem) => {
        if (
          selectedDifficulty !== "All" &&
          problem.difficulty.toLowerCase() !==
          selectedDifficulty.toLowerCase()
        ) {
          return false;
        }

        if (
          selectedCategory === "DSA" &&
          selectedModule !== "All" &&
          problem.moduleId !== selectedModule
        ) {
          return false;
        }

        if (
          selectedCategory === "DSA" &&
          selectedTopic !== "All" &&
          problem.topicId !== selectedTopic
        ) {
          return false;
        }

        const bookmarkId = getBookmarkId(
          problem.category,
          problem.id,
        );

        if (bookmarksOnly && !progress.bookmarked.includes(bookmarkId)) {
          return false;
        }

        const isCompleted = progress.completed.includes(problem.id);

        if (statusFilter === "solved" && !isCompleted) return false;
        if (statusFilter === "unsolved" && isCompleted) return false;

        if (query) {
          const searchable = [
            problem.title,
            problem.category,
            problem.module,
            problem.topicTitle ?? "",
            problem.topicId ?? "",
            problem.platform,
            ...problem.tags,
          ]
            .join(" ")
            .toLowerCase();

          if (!searchable.includes(query)) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (a.source === "a2z" && b.source === "a2z") {
          return a.order - b.order;
        }
        return a.title.localeCompare(b.title);
      });
  }, [
    searchQuery,
    selectedCategory,
    selectedDifficulty,
    selectedModule,
    selectedTopic,
    bookmarksOnly,
    statusFilter,
    progress.completed,
    progress.bookmarked,
  ]);

  const completedCount = progress.completed.filter((id) =>
    ALL_PROBLEMS.some((problem) => problem.id === id),
  ).length;

  const bookmarkedCount = progress.bookmarked.filter((id) => {
    const prefix = `${selectedCategory}::`;

    if (selectedCategory === "All") {
      return id.includes("::");
    }

    return id.startsWith(prefix);
  }).length;

  const a2zCompletedCount = progress.completed.filter((id) =>
    A2Z_PROBLEMS.some((problem) => problem.id === id),
  ).length;

  const completionPercent =
    DSA_PROBLEMS.length > 0
      ? Math.round(
        (a2zCompletedCount / DSA_PROBLEMS.length) * 100,
      )
      : 0;

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    (!fixedCategory && selectedCategory !== "All") ||
    selectedDifficulty !== "All" ||
    selectedModule !== "All" ||
    bookmarksOnly ||
    statusFilter !== "all";

  const toggleCompleted = (id: string) => {
    setProgress((current) => ({
      ...current,
      completed: current.completed.includes(id)
        ? current.completed.filter((item) => item !== id)
        : [...current.completed, id],
    }));
  };

  const toggleBookmark = (category: ProblemCategory, id: string) => {
    const bookmarkId = getBookmarkId(category, id);

    setProgress((current) => ({
      ...current,
      bookmarked: current.bookmarked.includes(bookmarkId)
        ? current.bookmarked.filter((item) => item !== bookmarkId)
        : [...current.bookmarked, bookmarkId],
    }));
  };

  const toggleExpanded = (id: string) => {
    setExpandedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setUserCategory(null);
    setSelectedDifficulty("All");
    setSelectedModule("All");
    setSelectedTopic("All");
    setBookmarksOnly(false);
    setStatusFilter("all");
  };

  const displayedTotal =
    selectedCategory === "DSA"
      ? A2Z_PROBLEMS.length
      : selectedCategory === "All"
        ? ALL_PROBLEMS.length
        : SAMPLE_PROBLEMS.filter(
          (problem) => problem.category === selectedCategory,
        ).length;

  return (
    <div className="space-y-5">
      {selectedCategory === "DSA" && (
        <Card className="overflow-hidden rounded-xl shadow-none">
          <CardContent className="space-y-4 p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                    <BookOpen className="size-4 text-primary" />
                  </div>
                  <h2 className="font-heading text-base font-semibold">
                    Striver&apos;s A2Z DSA Sheet
                  </h2>
                </div>
                <p className="text-xs text-muted-foreground">
                  {DSA_PROBLEMS.length} problems across{" "}
                  {availableModules.length} curriculum modules. Solve on the original
                  platform and track your progress here.
                </p>
              </div>
              <Badge variant="outline" className="text-[10px]">
                Free learning path
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">DSA progress</span>
                <span className="font-medium tabular-nums">
                  {a2zCompletedCount} / {DSA_PROBLEMS.length} completed
                  ({completionPercent}%)
                </span>
              </div>
              <div
                className="h-2 overflow-hidden rounded-full bg-muted"
                role="progressbar"
                aria-valuenow={completionPercent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="DSA completion progress"
              >
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-md border px-2.5 py-1.5 text-muted-foreground">
                {availableModules.length} curriculum modules
              </span>
              <span className="rounded-md border px-2.5 py-1.5 text-muted-foreground">
                {a2zCompletedCount} completed
              </span>
              <span className="rounded-md border px-2.5 py-1.5 text-muted-foreground">
                {bookmarkedCount} bookmarked
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4 rounded-xl border bg-card p-3.5 sm:p-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search problems, topics, modules or platforms..."
            className="h-10 pl-9 pr-9 text-xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {!fixedCategory && (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 text-[11px] font-medium text-muted-foreground">
              Subject
            </span>
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setUserCategory(category);
                  setSelectedModule("All");
                  setSelectedTopic("All");
                }}
                className={cn(
                  "rounded-md px-2.5 py-1.5 text-[11px] font-medium transition-colors",
                  selectedCategory === category
                    ? "bg-foreground text-background"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2 border-t pt-3 xl:flex-nowrap">
          <div className="flex shrink-0 items-center gap-1">
            <span className="mr-1 text-[11px] text-muted-foreground">
              Difficulty
            </span>
            {DIFFICULTIES.map((difficulty) => (
              <button
                key={difficulty}
                type="button"
                onClick={() => setSelectedDifficulty(difficulty)}
                aria-pressed={selectedDifficulty === difficulty}
                className={cn(
                  "rounded-md px-2.5 py-1.5 text-[11px] font-medium transition-colors",
                  selectedDifficulty === difficulty
                    ? "border bg-background text-foreground shadow-xs"
                    : "text-muted-foreground hover:bg-muted",
                )}
              >
                {difficulty}
              </button>
            ))}
          </div>

          <div
            className="flex shrink-0 items-center gap-1 rounded-lg border bg-muted/30 p-1"
            role="group"
            aria-label="Filter by completion status"
          >
            {[
              { value: "all", label: "All status" },
              { value: "solved", label: "Solved" },
              { value: "unsolved", label: "Unsolved" },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() =>
                  setStatusFilter(option.value as ProblemStatusFilter)
                }
                aria-pressed={statusFilter === option.value}
                className={cn(
                  "whitespace-nowrap rounded-md px-2.5 py-1.5 text-[11px] font-medium transition-colors",
                  statusFilter === option.value
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>

          {selectedCategory === "DSA" && (
            <div className="flex min-w-0 flex-1 items-center gap-2 xl:min-w-[220px]">
              <label
                htmlFor="practice-module"
                className="shrink-0 text-[11px] text-muted-foreground"
              >
                Module
              </label>
              <select
                id="practice-module"
                value={selectedModule}
                onChange={(event) => {
                  setSelectedModule(event.target.value);
                  setSelectedTopic("All");
                }}
                className="h-9 min-w-0 w-full rounded-lg border bg-background px-3 text-xs outline-none transition-colors hover:border-foreground/25 focus:ring-2 focus:ring-ring"
              >
                <option value="All">
                  All curriculum modules ({DSA_PROBLEMS.length})
                </option>
                {availableModules.map((module, index) => (
                  <option key={module.id} value={module.id}>
                    {index + 1}. {module.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedCategory === "DSA" && (
            <div className="flex min-w-0 flex-1 items-center gap-2 xl:min-w-[220px]">
              <label
                htmlFor="practice-topic"
                className="shrink-0 text-[11px] text-muted-foreground"
              >
                Topic
              </label>
              <select
                id="practice-topic"
                value={selectedTopic}
                onChange={(event) => setSelectedTopic(event.target.value)}
                className="h-9 min-w-0 w-full rounded-lg border bg-background px-3 text-xs outline-none transition-colors hover:border-foreground/25 focus:ring-2 focus:ring-ring"
              >
                <option value="All">All topics ({availableTopics.length})</option>
                {availableTopics.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            type="button"
            onClick={() => setBookmarksOnly((current) => !current)}
            aria-pressed={bookmarksOnly}
            className={cn(
              "ml-auto inline-flex h-9 shrink-0 items-center gap-2 rounded-lg border px-3 text-[11px] font-medium transition-colors",
              bookmarksOnly
                ? "border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Bookmark
              className="size-3.5"
              fill={bookmarksOnly ? "currentColor" : "none"}
            />
            Bookmarks
            <span className="rounded bg-background/80 px-1.5 py-0.5 tabular-nums">
              {bookmarkedCount}
            </span>
          </button>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-9 shrink-0 gap-1.5 px-2 text-xs"
              title="Reset filters"
            >
              <RotateCcw className="size-3.5" />
              <span className="hidden 2xl:inline">Reset</span>
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-muted-foreground">
        <span>
          Showing{" "}
          <strong className="text-foreground">{filteredProblems.length}</strong>{" "}
          of <strong className="text-foreground">{displayedTotal}</strong>{" "}
          problems
        </span>
        <span className="flex items-center gap-1.5">
          <CircleCheck className="size-3.5 text-emerald-600" />
          {completedCount} completed
          <span className="text-border">·</span>
          <Bookmark className="size-3.5" />
          {bookmarkedCount} saved
        </span>
      </div>

      {filteredProblems.length === 0 ? (
        <Card className="border-dashed py-12 text-center shadow-none">
          <CardContent className="space-y-3">
            <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-muted">
              <Filter className="size-5 text-muted-foreground" />
            </div>
            <h3 className="font-heading text-sm font-semibold">
              No problems match your filters
            </h3>
            <p className="mx-auto max-w-sm text-xs text-muted-foreground">
              Try another search term or clear your current filters.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="text-xs"
            >
              Clear filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="overflow-hidden rounded-xl border bg-card">
          {selectedCategory === "DSA" && (
            <div className="flex items-center gap-3 border-b bg-muted/20 px-4 py-3">
              <div className="space-y-0.5">
                <h3 className="text-xs font-semibold">
                  {selectedModule === "All"
                    ? "All mapped DSA problems"
                    : availableModules.find((module) => module.id === selectedModule)?.title ?? "DSA problems"}
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  Open problems externally and mark them complete when finished.
                </p>
              </div>
            </div>
          )}

          <div>
            {filteredProblems.map((problem) => (
              <ProblemRow
                key={`${problem.category}-${problem.id}`}
                problem={problem}
                completed={progress.completed.includes(problem.id)}
                bookmarked={progress.bookmarked.includes(
                  getBookmarkId(problem.category, problem.id),
                )}
                expanded={expandedIds.includes(problem.id)}
                highlighted={highlightedId === problem.id}
                onToggleCompleted={() => toggleCompleted(problem.id)}
                onToggleBookmarked={() =>
                  toggleBookmark(problem.category, problem.id)
                }
                onToggleExpanded={() => toggleExpanded(problem.id)}
              />
            ))}
          </div>
        </div>
      )}

      <p className="px-1 text-[11px] leading-relaxed text-muted-foreground">
        Progress and bookmarks are saved in this browser. Solve links open
        external platforms; Arcanum does not execute code or verify submissions
        automatically. Mark a problem complete yourself after solving it.
      </p>
    </div>
  );
}