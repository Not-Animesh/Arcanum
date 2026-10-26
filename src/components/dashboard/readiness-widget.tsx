import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type ReadinessTier = "Building" | "On Track" | "Interview Ready";

function getTier(score: number): ReadinessTier {
  if (score >= 75) return "Interview Ready";
  if (score >= 45) return "On Track";
  return "Building";
}

function tierVariant(tier: ReadinessTier) {
  if (tier === "Interview Ready") return "default" as const;
  if (tier === "On Track") return "secondary" as const;
  return "outline" as const;
}

interface ReadinessWidgetProps {
  /** 0–100 readiness score. Pass null when not yet computed. */
  score: number | null;
  className?: string;
}

export function ReadinessWidget({ score, className }: ReadinessWidgetProps) {
  if (score === null) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Badge variant="outline" className="text-[10px]">
          Not assessed
        </Badge>
      </div>
    );
  }

  const tier = getTier(score);

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="hidden w-24 flex-col gap-0.5 sm:flex">
        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
          <span>Readiness</span>
          <span className="font-medium text-foreground">{score}%</span>
        </div>
        <Progress value={score} className="h-1.5" />
      </div>
      <Badge variant={tierVariant(tier)} className="shrink-0 text-[10px]">
        {tier}
      </Badge>
    </div>
  );
}
