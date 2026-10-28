
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const ROUTE_LABELS: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/practice": "Practice",
  "/learning-paths": "Learning Path",
  "/subjects": "Catalog",
  "/subjects/dsa": "Data Structures & Algorithms",
  "/subjects/dbms": "Database Management",
  "/subjects/oops": "Object-Oriented Programming",
  "/subjects/cn": "Computer Networks",
  "/subjects/os": "Operating Systems",
};

function formatSegmentTitle(segment: string): string {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export interface AppHeaderProps {
  actions?: React.ReactNode;
  className?: string;
}

export function AppHeader({ actions, className }: AppHeaderProps) {
  const pathname = usePathname() || "/dashboard";
  const searchParams = useSearchParams();
  const selectedSubject = searchParams.get("subject");

  const cleanPath = pathname.replace(/\/+$/, "") || "/dashboard";

  const breadcrumbs = React.useMemo(() => {
    if (cleanPath === "/") {
      return [{ href: "/dashboard", label: "Dashboard" }];
    }

    const segments = cleanPath.split("/").filter(Boolean);

    return segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`;

      let label = ROUTE_LABELS[href] ?? formatSegmentTitle(segment);

      if (href === "/practice" && selectedSubject) {
        const subject = Object.entries(ROUTE_LABELS).find(
          ([key]) => key === `/subjects/${selectedSubject}`,
        );

        label = subject ? `Practice · ${subject[1]}` : "Practice";
      }

      return { href, label };
    });
  }, [cleanPath, selectedSubject]);

  return (
    <header
      className={cn(
        "sticky top-0 z-20 flex h-14 shrink-0 items-center gap-3 border-b border-border/70 bg-background/95 px-3 backdrop-blur-sm sm:px-5",
        className,
      )}
    >
      <SidebarTrigger
        className="size-9 shrink-0 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      />

      <div className="h-5 w-px shrink-0 bg-border/70" aria-hidden="true" />

      <div className="min-w-0 flex-1">
        <Breadcrumb>
          <BreadcrumbList className="flex-nowrap gap-1.5 truncate">
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1;

              return (
                <React.Fragment key={item.href}>
                  {index > 0 && <BreadcrumbSeparator />}

                  <BreadcrumbItem className="min-w-0">
                    {isLast ? (
                      <BreadcrumbPage className="truncate text-sm font-medium text-foreground">
                        {item.label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        render={<Link href={item.href} />}
                        className="truncate text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {item.label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {actions && (
        <div className="ml-auto flex shrink-0 items-center gap-2">
          {actions}
        </div>
      )}
    </header>
  );
}
