"use client";

import * as React from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { McqQuestion, PracticeProblem } from "../types";

interface QuestionState {
  selectedOptionId: string | null;
  submitted: boolean;
}

interface McqWorkspaceProps {
  problem: PracticeProblem;
}

export function McqWorkspace({ problem }: McqWorkspaceProps) {
  const questions = problem.mcqQuestions ?? [];
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [states, setStates] = React.useState<QuestionState[]>(
    () => questions.map(() => ({ selectedOptionId: null, submitted: false }))
  );

  const current: McqQuestion | undefined = questions[currentIndex];
  const state = states[currentIndex];

  const totalAnswered = states.filter((s) => s.submitted).length;
  const totalCorrect = states.filter((s, i) => {
    return s.submitted && s.selectedOptionId === questions[i]?.correctOptionId;
  }).length;

  function selectOption(optionId: string) {
    if (state.submitted) return;
    setStates((prev) =>
      prev.map((s, i) =>
        i === currentIndex ? { ...s, selectedOptionId: optionId } : s
      )
    );
  }

  function submitAnswer() {
    if (!state.selectedOptionId || state.submitted) return;
    setStates((prev) =>
      prev.map((s, i) =>
        i === currentIndex ? { ...s, submitted: true } : s
      )
    );
  }

  function goTo(index: number) {
    setCurrentIndex(index);
  }

  if (questions.length === 0) {
    return (
      <div className="rounded-xl border border-dashed bg-muted/10 p-6 text-center text-xs text-muted-foreground">
        No MCQ questions available for this problem yet.
      </div>
    );
  }

  const isCorrect =
    state.submitted && state.selectedOptionId === current?.correctOptionId;

  return (
    <div className="space-y-4">
      {/* Progress bar + score */}
      <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
        <span>
          Question{" "}
          <strong className="text-foreground">{currentIndex + 1}</strong> of{" "}
          {questions.length}
        </span>
        {totalAnswered > 0 && (
          <span>
            <strong className="text-foreground">{totalCorrect}</strong>/
            {totalAnswered} correct
          </span>
        )}
      </div>

      {/* Slim progress track */}
      <div className="flex gap-1">
        {questions.map((_, i) => {
          const s = states[i];
          const correct = s.submitted && s.selectedOptionId === questions[i]?.correctOptionId;
          const wrong = s.submitted && s.selectedOptionId !== questions[i]?.correctOptionId;
          return (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                i === currentIndex
                  ? "bg-foreground"
                  : correct
                  ? "bg-[var(--chart-2)]"
                  : wrong
                  ? "bg-destructive"
                  : "bg-muted"
              )}
              aria-label={`Go to question ${i + 1}`}
            />
          );
        })}
      </div>

      {current && (
        <>
          {/* Topic tag */}
          <Badge variant="secondary" className="text-[10px] font-normal">
            {current.topic}
          </Badge>

          {/* Question prompt */}
          <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
            {current.prompt}
          </p>

          {/* Answer options */}
          <div className="space-y-2">
            {current.options.map((option) => {
              const isSelected = state.selectedOptionId === option.id;
              const isTheCorrect = option.id === current.correctOptionId;

              let optionStyle = "border-border bg-card text-foreground hover:bg-muted/50";
              if (state.submitted) {
                if (isTheCorrect) {
                  optionStyle =
                    "border-[var(--chart-2)] bg-[var(--chart-2)]/10 text-foreground";
                } else if (isSelected && !isTheCorrect) {
                  optionStyle =
                    "border-destructive bg-destructive/10 text-foreground";
                } else {
                  optionStyle = "border-border bg-muted/20 text-muted-foreground";
                }
              } else if (isSelected) {
                optionStyle = "border-foreground bg-muted/40 text-foreground";
              }

              return (
                <button
                  key={option.id}
                  type="button"
                  disabled={state.submitted}
                  onClick={() => selectOption(option.id)}
                  className={cn(
                    "w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    "disabled:cursor-default",
                    optionStyle
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold">
                      {option.id.toUpperCase()}
                    </span>
                    <span className="leading-snug">{option.text}</span>
                    {state.submitted && isTheCorrect && (
                      <CheckCircle2 className="ml-auto size-4 shrink-0 text-[var(--chart-2)]" />
                    )}
                    {state.submitted && isSelected && !isTheCorrect && (
                      <XCircle className="ml-auto size-4 shrink-0 text-destructive" />
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {state.submitted && (
            <Card
              className={cn(
                "shadow-none border",
                isCorrect ? "border-[var(--chart-2)]/40" : "border-destructive/40"
              )}
            >
              <CardContent className="space-y-1.5 p-4">
                <p
                  className={cn(
                    "text-xs font-semibold uppercase tracking-wide",
                    isCorrect ? "text-[var(--chart-2)]" : "text-destructive"
                  )}
                >
                  {isCorrect ? "Correct!" : "Incorrect"}
                </p>
                <p className="text-xs leading-relaxed text-foreground/80">
                  {current.explanation}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between gap-2 border-t pt-3">
            <Button
              variant="ghost"
              size="sm"
              disabled={currentIndex === 0}
              onClick={() => goTo(currentIndex - 1)}
              className="h-8 gap-1 text-xs"
            >
              <ChevronLeft className="size-3.5" />
              Previous
            </Button>

            {!state.submitted ? (
              <Button
                size="sm"
                disabled={!state.selectedOptionId}
                onClick={submitAnswer}
                className="h-8 text-xs"
              >
                Submit
              </Button>
            ) : currentIndex < questions.length - 1 ? (
              <Button
                size="sm"
                onClick={() => goTo(currentIndex + 1)}
                className="h-8 gap-1 text-xs"
              >
                Next
                <ChevronRight className="size-3.5" />
              </Button>
            ) : (
              <Badge variant="outline" className="text-xs">
                All done · {totalCorrect}/{questions.length} correct
              </Badge>
            )}
          </div>
        </>
      )}
    </div>
  );
}
