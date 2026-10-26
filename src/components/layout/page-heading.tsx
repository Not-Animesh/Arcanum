import * as React from "react";
import { cn } from "@/lib/utils";

export interface PageHeadingProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
  eyebrow?: React.ReactNode;
}

export function PageHeading({
  title,
  description,
  actions,
  className,
  eyebrow,
}: PageHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
        className
      )}
    >
      <div className="min-w-0 flex-1 space-y-1.5">
        {eyebrow}
        <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}
