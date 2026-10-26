"use client";

import * as React from "react";
import Link from "next/link";
import { BookOpen, Clock, Code2 } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TopicItem } from "../types";

interface TopicDrawerProps {
  topic: TopicItem | null;
  moduleTitle?: string;
  moduleNumber?: number;
  subjectSlug: string;
  isOpen: boolean;
  onClose: () => void;
}

export function TopicDrawer({
  topic,
  moduleTitle,
  moduleNumber,
  subjectSlug,
  isOpen,
  onClose,
}: TopicDrawerProps) {
  if (!topic) return null;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="flex flex-col justify-between sm:max-w-md p-6">
        <div className="space-y-6">
          <SheetHeader className="space-y-2 text-left">
            <div className="flex items-center gap-2">
              {moduleNumber && (
                <Badge variant="outline" className="text-[10px]">
                  Module {moduleNumber}
                </Badge>
              )}
              {topic.duration && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="size-3" />
                  {topic.duration}
                </span>
              )}
            </div>

            <SheetTitle className="font-heading text-xl font-semibold tracking-tight text-foreground">
              {topic.title}
            </SheetTitle>

            {moduleTitle && (
              <SheetDescription className="text-xs text-muted-foreground">
                Part of {moduleTitle}
              </SheetDescription>
            )}
          </SheetHeader>

          {/* Conceptual Overview */}
          <div className="space-y-4 rounded-xl border bg-muted/20 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <BookOpen className="size-3.5" />
              <span>Study Notes & Focus Areas</span>
            </div>

            <p className="text-xs leading-relaxed text-foreground/80">
              {topic.summary ??
                "This topic covers the core mechanisms, standard formulas, edge conditions, and protocol state transitions required for technical interviews and production systems."}
            </p>

            <div className="space-y-2 border-t pt-3">
              <span className="text-[11px] font-medium text-foreground">
                Key review checkpoints:
              </span>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                {topic.keyPoints && topic.keyPoints.length > 0 ? (
                  topic.keyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 size-1 rounded-full bg-foreground/60" />
                      <span>{point}</span>
                    </li>
                  ))
                ) : (
                  <>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 size-1 rounded-full bg-foreground/60" />
                      <span>Identify the asymptotic bounds and trade-offs of this approach.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 size-1 rounded-full bg-foreground/60" />
                      <span>Trace through at least one concrete example or handshake sequence.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 size-1 rounded-full bg-foreground/60" />
                      <span>Analyze failure cases and edge inputs.</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-6 border-t pt-4 flex flex-col gap-2">
          <Link
            href={`/practice?subject=${subjectSlug}`}
            className="w-full inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            onClick={onClose}
          >
            <Code2 className="size-3.5" />
            <span>Practice relevant problems</span>
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="w-full text-xs"
          >
            Close overview
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
