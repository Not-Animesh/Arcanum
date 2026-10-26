"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import {
  BookOpen,
  Code2,
  Filter,
  RotateCcw,
  Search,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { SAMPLE_PRACTICE_PROBLEMS } from "../config/practice-problems";
import {
  PracticeProblem,
  ProblemCategory,
  ProblemDifficulty,
} from "../types";
import { cn } from "@/lib/utils";
import { McqWorkspace } from "./mcq-workspace";

const CATEGORIES: ProblemCategory[] = [
  "All",
  "DSA",
  "DBMS",
  "Operating Systems",
  "Computer Networks",
  "System Design",
  "OOP Concepts",
];

const DIFFICULTIES: ("All" | ProblemDifficulty)[] = [
  "All",
  "Easy",
  "Medium",
  "Hard",
];

const SLUG_TO_CATEGORY: Record<string, ProblemCategory> = {
  dsa: "DSA",
  dbms: "DBMS",
  os: "Operating Systems",
  cn: "Computer Networks",
  "system-design": "System Design",
  oops: "OOP Concepts",
};

export function PracticeView() {
  const searchParams = useSearchParams();
  const subjectParam = searchParams.get("subject");

  const [searchQuery, setSearchQuery] = React.useState("");
  const [userCategory, setUserCategory] = React.useState<ProblemCategory | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<
    "All" | ProblemDifficulty
  >("All");

  const selectedCategory =
    userCategory ??
    (subjectParam && SLUG_TO_CATEGORY[subjectParam]
      ? SLUG_TO_CATEGORY[subjectParam]
      : "All");

  const [activeProblem, setActiveProblem] =
    React.useState<PracticeProblem | null>(null);
  const [practiceMode, setPracticeMode] = React.useState(false);

  function openProblemDetails(problem: PracticeProblem) {
    setActiveProblem(problem);
    setPracticeMode(false);
  }

  function openPracticeMode(problem: PracticeProblem) {
    setActiveProblem(problem);
    setPracticeMode(true);
  }

  function closeDrawer() {
    setActiveProblem(null);
    setPracticeMode(false);
  }

  // Filtered dataset
  const filteredProblems = React.useMemo(() => {
    return SAMPLE_PRACTICE_PROBLEMS.filter((problem) => {
      // 1. Search Query
      const query = searchQuery.trim().toLowerCase();
      if (query) {
        const matchesTitle = problem.title.toLowerCase().includes(query);
        const matchesTag = problem.tags.some((t) =>
          t.toLowerCase().includes(query)
        );
        if (!matchesTitle && !matchesTag) return false;
      }

      // 2. Category
      if (selectedCategory !== "All" && problem.category !== selectedCategory) {
        return false;
      }

      // 3. Difficulty
      if (
        selectedDifficulty !== "All" &&
        problem.difficulty !== selectedDifficulty
      ) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedCategory !== "All" ||
    selectedDifficulty !== "All";

  const handleClearFilters = () => {
    setSearchQuery("");
    setUserCategory("All");
    setSelectedDifficulty("All");
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Toolbar */}
      <div className="flex flex-col gap-4 rounded-xl border bg-card p-4 shadow-none">
        {/* Search bar */}
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search problems by title or topic tag (e.g. Tree, Subnet, SQL)..."
            className="pl-9 pr-9"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {/* Filter Badges & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-3">
          {/* Category Pills */}
          <div className="no-scrollbar flex flex-wrap items-center gap-1.5 overflow-x-auto">
            <span className="text-xs font-medium text-muted-foreground mr-1">
              Category:
            </span>
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setUserCategory(cat)}
                  className={cn(
                    "rounded-lg px-2.5 py-1 text-xs font-medium transition-colors select-none",
                    isSelected
                      ? "bg-foreground text-background font-semibold"
                      : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Difficulty & Reset */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-lg border bg-muted/30 p-1">
              <span className="px-1.5 text-xs text-muted-foreground">Level:</span>
              {DIFFICULTIES.map((diff) => {
                const isSelected = selectedDifficulty === diff;
                return (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setSelectedDifficulty(diff)}
                    className={cn(
                      "rounded-md px-2 py-0.5 text-xs font-medium transition-colors",
                      isSelected
                        ? "bg-background text-foreground shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {diff}
                  </button>
                );
              })}
            </div>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="h-8 gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="size-3" />
                <span>Reset</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
        <span>
          Showing <strong className="text-foreground">{filteredProblems.length}</strong> of{" "}
          {SAMPLE_PRACTICE_PROBLEMS.length} problems
        </span>
        <span className="text-[11px] text-muted-foreground/80">
          Curated starter problem set
        </span>
      </div>

      {/* Problem List */}
      {filteredProblems.length === 0 ? (
        <Card className="shadow-none border-dashed bg-muted/10 py-12 text-center">
          <CardContent className="space-y-3">
            <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-muted">
              <Filter className="size-5 text-muted-foreground" />
            </div>
            <h3 className="font-heading text-base font-semibold text-foreground">
              No problems match your filters
            </h3>
            <p className="mx-auto max-w-sm text-xs text-muted-foreground">
              Try broadening your search query or reset the category and difficulty filters.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearFilters}
              className="mt-2 text-xs"
            >
              Clear all filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="overflow-hidden rounded-xl border bg-card">
          <div className="divide-y divide-border">
            {filteredProblems.map((problem) => {
              return (
                <div
                  key={problem.id}
                  className="flex flex-col gap-3 p-4 transition-colors hover:bg-muted/30 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => setActiveProblem(problem)}
                        className="font-heading text-sm font-semibold text-foreground hover:underline text-left truncate"
                      >
                        {problem.title}
                      </button>

                      <Badge
                        variant={
                          problem.difficulty === "Easy"
                            ? "secondary"
                            : problem.difficulty === "Medium"
                            ? "outline"
                            : "default"
                        }
                        className="text-[10px] px-1.5 py-0 h-4.5"
                      >
                        {problem.difficulty}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground/80">
                        {problem.category}
                      </span>
                      <span>•</span>
                      <span>Acceptance: {problem.acceptanceRate}</span>
                      <span>•</span>
                      <div className="flex flex-wrap gap-1">
                        {problem.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded bg-muted/60 px-1.5 py-0.5 text-[10px] text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    {problem.mcqQuestions && problem.mcqQuestions.length > 0 && (
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => openPracticeMode(problem)}
                        className="h-8 gap-1.5 text-xs font-medium"
                      >
                        <BookOpen className="size-3.5" />
                        Practice
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openProblemDetails(problem)}
                      className="h-8 text-xs font-medium"
                    >
                      Details
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Problem Drawer — Details or MCQ Practice */}
      <Sheet
        open={Boolean(activeProblem)}
        onOpenChange={(open) => !open && closeDrawer()}
      >
        <SheetContent side="right" className="sm:max-w-lg p-0 flex flex-col">
          {activeProblem && (
            <>
              {/* Header */}
              <div className="space-y-3 border-b p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="text-[10px]">
                    {activeProblem.category}
                  </Badge>
                  <Badge
                    variant={
                      activeProblem.difficulty === "Easy"
                        ? "secondary"
                        : activeProblem.difficulty === "Medium"
                        ? "outline"
                        : "default"
                    }
                    className="text-[10px]"
                  >
                    {activeProblem.difficulty}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Acceptance {activeProblem.acceptanceRate}
                  </span>
                </div>

                <SheetHeader className="space-y-1 text-left p-0">
                  <SheetTitle className="font-heading text-lg font-semibold tracking-tight text-foreground leading-snug">
                    {activeProblem.title}
                  </SheetTitle>
                  <SheetDescription className="text-xs text-muted-foreground">
                    {activeProblem.id}
                  </SheetDescription>
                </SheetHeader>

                {/* Mode toggle if MCQ available */}
                {activeProblem.mcqQuestions && activeProblem.mcqQuestions.length > 0 && (
                  <div className="flex gap-1 rounded-lg border bg-muted/30 p-1 w-fit">
                    <button
                      type="button"
                      onClick={() => setPracticeMode(false)}
                      className={cn(
                        "rounded-md px-3 py-1 text-xs font-medium transition-colors",
                        !practiceMode
                          ? "bg-background text-foreground shadow-xs"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      Overview
                    </button>
                    <button
                      type="button"
                      onClick={() => setPracticeMode(true)}
                      className={cn(
                        "rounded-md px-3 py-1 text-xs font-medium transition-colors",
                        practiceMode
                          ? "bg-background text-foreground shadow-xs"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      Practice MCQ
                    </button>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {!practiceMode ? (
                  <div className="space-y-4">
                    <div className="space-y-3 rounded-xl border bg-muted/20 p-4">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        <Code2 className="size-3.5" />
                        <span>Problem Focus & Approach</span>
                      </div>
                      <p className="text-xs leading-relaxed text-foreground/90">
                        {activeProblem.starterNote ?? "No notes available."}
                      </p>
                      <div className="space-y-1.5 border-t pt-3">
                        <span className="text-[11px] font-medium text-foreground">
                          Tags:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {activeProblem.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-[11px] font-normal"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    {activeProblem.mcqQuestions && activeProblem.mcqQuestions.length > 0 && (
                      <Button
                        size="sm"
                        className="w-full gap-1.5 text-xs"
                        onClick={() => setPracticeMode(true)}
                      >
                        <BookOpen className="size-3.5" />
                        Start MCQ Practice ({activeProblem.mcqQuestions.length} question
                        {activeProblem.mcqQuestions.length > 1 ? "s" : ""})
                      </Button>
                    )}
                  </div>
                ) : (
                  <McqWorkspace key={activeProblem.id} problem={activeProblem} />
                )}
              </div>

              {/* Footer */}
              <div className="border-t p-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={closeDrawer}
                  className="w-full text-xs"
                >
                  Close
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
