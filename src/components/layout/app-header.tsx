"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const ROUTE_LABELS: Record<string, string> = {
  "/": "Dashboard",
  "/practice": "Practice",
  "/learning-paths": "Learning Paths",
  "/sheets": "Study Sheets",
  "/contests": "Contests",
  "/subjects": "Subjects",
  "/subjects/dsa": "DSA",
  "/subjects/dbms": "DBMS",
  "/subjects/os": "Operating Systems",
  "/subjects/cn": "Computer Networks",
  "/subjects/oops": "OOP Concepts",
  "/subjects/web-dev": "Web Development",
  "/subjects/system-design": "System Design",
  "/subjects/data-engineering": "Data Engineering",
  "/interview-prep": "Interview Prep",
  "/planner": "Study Planner",
  "/analytics": "Analytics",
  "/settings": "Settings",
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
  const pathname = usePathname() || "/";
  const cleanPath = pathname.replace(/\/+$/, "") || "/";

  const breadcrumbs = React.useMemo(() => {
    if (cleanPath === "/") {
      return [{ href: "/", label: ROUTE_LABELS["/"] ?? "Dashboard" }];
    }

    const segments = cleanPath.split("/").filter(Boolean);
    return segments.map((segment, index) => {
      const href = "/" + segments.slice(0, index + 1).join("/");
      const label = ROUTE_LABELS[href] ?? formatSegmentTitle(segment);
      return { href, label };
    });
  }, [cleanPath]);

  return (
    <header
      className={cn(
        "sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4",
        className
      )}
    >
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 data-vertical:h-4" />

      <div className="min-w-0 flex-1">
        <Breadcrumb className="min-w-0">
          <BreadcrumbList className="flex-nowrap truncate sm:flex-wrap">
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1;

              if (isLast) {
                return (
                  <BreadcrumbItem
                    key={item.href}
                    className="inline-flex min-w-0"
                  >
                    <BreadcrumbPage className="truncate font-medium">
                      {item.label}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                );
              }

              return (
                <React.Fragment key={item.href}>
                  <BreadcrumbItem className="hidden sm:inline-flex">
                    <BreadcrumbLink render={<Link href={item.href} />}>
                      {item.label}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden sm:inline-flex" />
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {actions && <div className="ml-auto shrink-0">{actions}</div>}
    </header>
  );
}
