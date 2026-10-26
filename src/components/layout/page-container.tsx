import * as React from "react";
import { cn } from "@/lib/utils";

const sizeClasses: Record<"default" | "narrow" | "wide" | "full", string> = {
  default: "max-w-7xl",
  narrow: "max-w-4xl",
  wide: "max-w-screen-2xl",
  full: "max-w-none",
};

export interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide" | "full";
}

export function PageContainer({
  children,
  className,
  size = "default",
}: PageContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full min-w-0 flex-col gap-6 px-4 py-6 sm:px-6 lg:gap-8 lg:px-8 lg:py-8",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </div>
  );
}
