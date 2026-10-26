import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  Clock,
  Code2,
  Cpu,
  Database,
  Layers,
  ListOrdered,
  Network,
  Terminal,
  Waypoints,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LearningResource } from "../types";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Waypoints,
  Network,
  Database,
  Terminal,
  BrainCircuit,
  Layers,
  Cpu,
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
      className={cn(
        "group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
    >
      <Card className="flex h-full flex-col justify-between shadow-none transition-all duration-200 hover:border-foreground/20 hover:bg-muted/30">
        <CardHeader className="gap-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/50 text-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
              <Icon className="size-4.5" />
            </div>

            <Badge variant="outline" className="text-[11px] font-normal">
              {resource.trackLabel}
            </Badge>
          </div>

          <div>
            <CardTitle className="text-base font-semibold tracking-tight transition-colors group-hover:text-foreground">
              {resource.title}
            </CardTitle>
            <p className="mt-1.5 text-xs leading-5 text-muted-foreground line-clamp-2">
              {resource.shortDescription}
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-3 pt-0">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <ListOrdered className="size-3.5 text-muted-foreground/80" />
              <span>{resource.modulesCount} modules</span>
            </div>

            <div className="flex items-center gap-1.5">
              <BookOpen className="size-3.5 text-muted-foreground/80" />
              <span>{resource.topicsCount} topics</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Clock className="size-3.5 text-muted-foreground/80" />
              <span>{resource.estimatedDuration}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t bg-muted/20 py-2.5">
          <div className="flex w-full items-center justify-between text-xs">
            <span className="font-medium text-foreground">Explore curriculum</span>
            <ArrowRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
