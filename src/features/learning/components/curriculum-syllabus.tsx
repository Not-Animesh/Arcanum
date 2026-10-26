"use client";

import * as React from "react";
import {
  Clock,
  FileText,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { CurriculumModule, TopicItem } from "../types";
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

  // Default expand the first 2 modules so the learner immediately sees the topics
  const defaultValues = React.useMemo(() => {
    return modules.slice(0, 2).map((m) => m.id);
  }, [modules]);

  return (
    <section id="syllabus" className="scroll-mt-20 space-y-4">
      <div className="flex flex-col gap-1 border-b pb-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground">
            Syllabus
          </h2>
          <p className="text-xs text-muted-foreground">
            Comprehensive curriculum modules with structured study topics.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{modules.length} modules</span>
          <span>•</span>
          <span>
            {modules.reduce((sum, m) => sum + m.topics.length, 0)} total topics
          </span>
        </div>
      </div>

      <Accordion
        defaultValue={defaultValues}
        className="w-full space-y-2.5"
      >
        {modules.map((module) => {
          return (
            <AccordionItem
              key={module.id}
              value={module.id}
              className="rounded-xl border border-border bg-card shadow-none overflow-hidden transition-colors"
            >
              <AccordionTrigger className="flex w-full items-center justify-between px-4 py-3.5 hover:bg-muted/40 hover:no-underline select-none">
                <div className="flex min-w-0 items-center gap-3 text-left">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-md border bg-muted/60 text-[11px] font-semibold text-muted-foreground">
                    {module.moduleNumber}
                  </span>

                  <div className="min-w-0">
                    <h3 className="font-heading text-sm font-semibold tracking-tight text-foreground truncate">
                      Module {module.moduleNumber} — {module.title}
                    </h3>
                    {module.description && (
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {module.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 pr-2">
                  <Badge variant="outline" className="text-[11px] font-normal text-muted-foreground">
                    {module.topics.length} topics
                  </Badge>
                </div>
              </AccordionTrigger>

              <AccordionContent className="border-t bg-muted/10 px-4 py-3">
                <div className="relative pl-3 space-y-1 before:absolute before:left-1 before:top-2 before:bottom-2 before:w-px before:bg-border">
                  {module.topics.map((topic) => (
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
                        "group flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      )}
                    >
                      <div className="flex min-w-0 items-center gap-2.5">
                        <FileText className="size-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
                        <span className="text-xs font-medium text-foreground/90 group-hover:text-foreground truncate">
                          {topic.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
                        {topic.duration && (
                          <span className="flex items-center gap-1 text-[11px]">
                            <Clock className="size-3" />
                            {topic.duration}
                          </span>
                        )}
                        <span className="text-[11px] text-muted-foreground/60 transition-transform group-hover:translate-x-0.5 group-hover:text-foreground">
                          View &rarr;
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      {/* Interactive Topic Review Drawer */}
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
