"use client";

import * as React from "react";
import { LEARNING_TRACKS } from "../config/learning-tracks";
import { TrackId } from "../types";
import { cn } from "@/lib/utils";

interface LearningPathTabsProps {
  selectedTrack: TrackId;
  onSelectTrack: (track: TrackId) => void;
  className?: string;
}

export function LearningPathTabs({
  selectedTrack,
  onSelectTrack,
  className,
}: LearningPathTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Learning Path Categories"
      className={cn(
        "no-scrollbar flex w-full items-center gap-1.5 overflow-x-auto rounded-xl border bg-muted/40 p-1.5 text-muted-foreground",
        className
      )}
    >
      {LEARNING_TRACKS.map((track) => {
        const isSelected = selectedTrack === track.id;

        return (
          <button
            key={track.id}
            role="tab"
            type="button"
            aria-selected={isSelected}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onSelectTrack(track.id)}
            className={cn(
              "inline-flex shrink-0 items-center justify-center rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring select-none",
              isSelected
                ? "bg-background text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
            )}
          >
            {track.label}
          </button>
        );
      })}
    </div>
  );
}
