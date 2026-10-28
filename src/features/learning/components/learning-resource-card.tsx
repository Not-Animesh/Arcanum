
import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  Clock3,
  Code2,
  Database,
  Layers3,
  ListOrdered,
  Network,
  Terminal,
  Waypoints,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { LearningResource } from "../types";

const ICON_MAP: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  Waypoints,
  Network,
  Database,
  Terminal,
  BrainCircuit,
  Layers: Layers3,
  Code2,
};

interface LearningResourceCardProps {
  resource: LearningResource;
  className?: string;
}

export function LearningResourceCard({
  resource,
  className,
}: LearningResourceCardProps) {
  const Icon = ICON_MAP[resource.iconName] ?? BookOpen;

  return (
    <Link
      href={resource.href}
      aria-label={`Explore ${resource.title} curriculum`}
      className={cn(
        "group block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <Card className="relative flex h-full min-h-[245px] flex-col overflow-hidden border-border/80 bg-card shadow-none transition-all duration-200 ease-out group-hover:-translate-y-0.5 group-hover:border-foreground/20 group-hover:shadow-sm">
        <CardHeader className="gap-4 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-muted/50 text-foreground transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="size-[18px]" aria-hidden="true" />
            </div>

            <Badge
              variant="outline"
              className="max-w-[55%] truncate rounded-full px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
            >
              {resource.trackLabel}
            </Badge>
          </div>

          <div className="space-y-2">
            <CardTitle className="text-base font-semibold leading-6 tracking-tight text-foreground transition-colors sm:text-[17px]">
              {resource.title}
            </CardTitle>

            <p className="line-clamp-3 min-h-[3.75rem] text-[13px] leading-[1.55rem] text-muted-foreground">
              {resource.shortDescription}
            </p>
          </div>
        </CardHeader>

        <CardContent className="mt-auto px-4 pb-4 pt-0 sm:px-5">
          <div className="grid grid-cols-2 gap-x-3 gap-y-2 border-t border-border/70 pt-3">
            <div className="flex min-w-0 items-center gap-2 text-xs text-muted-foreground">
              <ListOrdered
                className="size-3.5 shrink-0"
                aria-hidden="true"
              />
              <span className="truncate">
                {resource.modulesCount} modules
              </span>
            </div>

            <div className="flex min-w-0 items-center gap-2 text-xs text-muted-foreground">
              <BookOpen
                className="size-3.5 shrink-0"
                aria-hidden="true"
              />
              <span className="truncate">
                {resource.topicsCount} topics
              </span>
            </div>

            <div className="col-span-2 flex items-center gap-2 text-xs text-muted-foreground">
              <Clock3 className="size-3.5 shrink-0" aria-hidden="true" />
              <span>{resource.estimatedDuration}</span>
              <span className="text-border">·</span>
              <span>{resource.level}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t border-border/70 bg-muted/20 px-4 py-3 sm:px-5">
          <span className="text-xs font-medium text-foreground">
            Explore curriculum
          </span>

          <ArrowRight
            className="size-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-foreground"
            aria-hidden="true"
          />
        </CardFooter>
      </Card>
    </Link>
  );
}
