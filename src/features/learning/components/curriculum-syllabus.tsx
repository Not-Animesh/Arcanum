
"use client";

import * as React from "react";
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  Layers3,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import type { CurriculumModule, TopicItem } from "../types";
import { TopicDrawer } from "./topic-drawer";
import { cn } from "@/lib/utils";

interface CurriculumSyllabusProps {
  modules: CurriculumModule[];
  subjectSlug: string;
}

export function CurriculumSyllabus({
  modules,
  subjectSlug,
}: CurriculumSyllabusProps) {
  const [selectedTopic, setSelectedTopic] = React.useState<{
    topic: TopicItem;
    moduleTitle: string;
    moduleNumber: number;
  } | null>(null);

  const defaultValues = React.useMemo(
    () => modules.slice(0, 2).map((module) => module.id),
    [modules],
  );

  const totalTopics = React.useMemo(
    () =>
      modules.reduce(
        (total, module) => total + module.topics.length,
        0,
      ),
    [modules],
  );

  return (
    <section id="syllabus" className="scroll-mt-24 space-y-5">
      <div className="flex flex-col gap-3 border-b border-border/70 pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Layers3 className="size-4" aria-hidden="true" />
            <span className="text-xs font-medium uppercase tracking-[0.12em]">
              Your learning roadmap
            </span>
          </div>

          <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Course syllabus
          </h2>

          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Work through each module in sequence, review individual topics,
            and use the practice questions to reinforce your understanding.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="gap-1.5 rounded-full px-2.5 py-1">
            <Layers3 className="size-3.5" aria-hidden="true" />
            {modules.length} modules
          </Badge>

          <Badge variant="outline" className="gap-1.5 rounded-full px-2.5 py-1">
            <BookOpen className="size-3.5" aria-hidden="true" />
            {totalTopics} topics
          </Badge>
        </div>
      </div>

      {modules.length === 0 ? (
        <div className="rounded-xl border border-dashed px-6 py-10 text-center">
          <BookOpen className="mx-auto mb-3 size-7 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Syllabus coming soon</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            This curriculum does not have any modules configured yet.
          </p>
        </div>
      ) : (
        <Accordion
          defaultValue={defaultValues}
          className="w-full space-y-3"
        >
          {modules.map((module, index) => (
            <AccordionItem
              key={module.id}
              value={module.id}
              className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-none transition-colors data-[state=open]:border-foreground/20"
            >
              <AccordionTrigger className="group flex w-full items-center justify-between gap-3 px-4 py-4 text-left hover:bg-muted/30 hover:no-underline sm:px-5">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-muted/50 text-xs font-semibold tabular-nums text-muted-foreground transition-colors group-hover:text-foreground">
                    {String(module.moduleNumber).padStart(2, "0")}
                  </div>

                  <div className="min-w-0 flex-1 space-y-1">
                    <h3 className="truncate text-sm font-semibold tracking-tight text-foreground sm:text-[15px]">
                      {module.title}
                    </h3>

                    {module.description && (
                      <p className="line-clamp-2 text-xs leading-5 text-muted-foreground">
                        {module.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                  <Badge
                    variant="secondary"
                    className="gap-1 rounded-full px-2 py-0.5 text-[11px] font-normal"
                  >
                    <BookOpen className="size-3" aria-hidden="true" />
                    {module.topics.length}
                    <span className="hidden sm:inline">topics</span>
                  </Badge>
                </div>
              </AccordionTrigger>

              <AccordionContent className="border-t border-border/70 bg-muted/10">
                {module.topics.length === 0 ? (
                  <p className="px-5 py-5 text-sm text-muted-foreground">
                    No topics have been added to this module yet.
                  </p>
                ) : (
                  <div className="space-y-1 p-2 sm:p-3">
                    {module.topics.map((topic, topicIndex) => (
                      <button
                        key={topic.id}
                        type="button"
                        onClick={() =>
                          setSelectedTopic({
                            topic,
                            moduleTitle: module.title,
                            moduleNumber: module.moduleNumber,
                          })
                        }
                        className={cn(
                          "group/topic flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors",
                          "hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        )}
                        aria-label={`Open topic: ${topic.title}`}
                      >
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-background text-muted-foreground transition-colors group-hover/topic:border-foreground/20 group-hover/topic:text-foreground">
                          <FileText
                            className="size-3.5"
                            aria-hidden="true"
                          />
                        </div>

                        <div className="min-w-0 flex-1 space-y-0.5">
                          <span className="block text-[13px] font-medium leading-5 text-foreground/90 transition-colors group-hover/topic:text-foreground">
                            {topic.title}
                          </span>

                          <span className="block text-[11px] text-muted-foreground">
                            Topic {topicIndex + 1} of {module.topics.length}
                          </span>
                        </div>

                        {topic.duration && (
                          <span className="hidden shrink-0 items-center gap-1.5 text-xs text-muted-foreground sm:inline-flex">
                            <Clock3
                              className="size-3.5"
                              aria-hidden="true"
                            />
                            {topic.duration}
                          </span>
                        )}

                        <ChevronRight
                          className="size-4 shrink-0 text-muted-foreground/60 transition-transform group-hover/topic:translate-x-0.5 group-hover/topic:text-foreground"
                          aria-hidden="true"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      <div className="flex items-start gap-3 rounded-xl border border-border/70 bg-muted/20 p-4">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-background text-muted-foreground">
          <CheckCircle2 className="size-4" aria-hidden="true" />
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">
            Learn at your own pace
          </p>
          <p className="text-xs leading-5 text-muted-foreground">
            Open a topic to review its notes and focus areas, then practise
            relevant problems to check your understanding.
          </p>
        </div>
      </div>

      <TopicDrawer
        topic={selectedTopic?.topic ?? null}
        moduleTitle={selectedTopic?.moduleTitle}
        moduleNumber={selectedTopic?.moduleNumber}
        subjectSlug={subjectSlug}
        isOpen={Boolean(selectedTopic)}
        onClose={() => setSelectedTopic(null)}
      />
    </section>
  );
}
