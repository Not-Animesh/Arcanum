
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  BookOpen,
  BrainCircuit,
  ChevronDown,
  Code2,
  Database,
  GraduationCap,
  LayoutDashboard,
  LibraryBig,
  Network,
  Route,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const mainNavigation = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Learning Path", href: "/learning-paths", icon: Route },
  { title: "Catalog", href: "/subjects", icon: LibraryBig },
];

const subjects = [
  {
    title: "Data Structures & Algorithms",
    shortTitle: "DSA",
    slug: "dsa",
    icon: Code2,
  },
  {
    title: "Database Management",
    shortTitle: "DBMS",
    slug: "dbms",
    icon: Database,
  },
  {
    title: "Object-Oriented Programming",
    shortTitle: "OOP",
    slug: "oops",
    icon: BrainCircuit,
  },
  {
    title: "Computer Networks",
    shortTitle: "Computer Networks",
    slug: "cn",
    icon: Network,
  },
  {
    title: "Operating Systems",
    shortTitle: "Operating Systems",
    slug: "os",
    icon: BookOpen,
  },
];

export function AppSidebar() {
  const pathname = usePathname() || "/dashboard";
  const searchParams = useSearchParams();
  const selectedSubject = searchParams.get("subject");

  const isPracticeRoute = pathname === "/practice";
  const [practiceOpen, setPracticeOpen] = useState(isPracticeRoute);

  function isActive(href: string) {
    if (href === "/subjects") {
      return pathname === "/subjects";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const activeClass =
    "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary";

  return (
    <Sidebar collapsible="icon" variant="sidebar" className="border-r-0">
      <SidebarHeader className="px-3 py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link href="/dashboard" />}
              size="lg"
              tooltip="Arcanum home"
              className="h-11 gap-3 rounded-lg px-2.5"
            >
              <Image
                src="/images/logo.png"
                alt="Arcanum"
                width={32}
                height={32}
                priority
                className="size-8 shrink-0 rounded-full object-cover"
              />
              <span className="truncate text-base font-semibold tracking-tight">
                Arcanum
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-0 px-2">
        <SidebarGroup className="px-1 py-3">
          <SidebarGroupLabel className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/80">
            Workspace
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {mainNavigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={active}
                      tooltip={item.title}
                      className={cn(
                        "h-10 gap-3 rounded-lg px-3 text-[13px] font-medium transition-colors",
                        active && activeClass,
                      )}
                    >
                      <Icon className="size-[17px] shrink-0" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}

              <SidebarMenuItem>
                <div className="relative flex min-w-0 items-center">
                  <SidebarMenuButton
                    render={<Link href="/practice" />}
                    isActive={isPracticeRoute}
                    tooltip="Practice"
                    className={cn(
                      "h-10 min-w-0 flex-1 gap-3 rounded-lg py-2 pl-3 pr-10 text-[13px] font-medium transition-colors",
                      isPracticeRoute && activeClass,
                    )}
                  >
                    <Code2 className="size-[17px] shrink-0" />
                    <span>Practice</span>
                  </SidebarMenuButton>

                  <button
                    type="button"
                    aria-label={
                      practiceOpen
                        ? "Collapse practice subjects"
                        : "Expand practice subjects"
                    }
                    aria-expanded={practiceOpen}
                    onClick={() => setPracticeOpen((open) => !open)}
                    className={cn(
                      "absolute right-1 flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:hidden",
                      isPracticeRoute && "text-primary",
                    )}
                  >
                    <ChevronDown
                      className={cn(
                        "size-4 transition-transform duration-200",
                        practiceOpen && "rotate-180",
                      )}
                    />
                  </button>
                </div>

                {practiceOpen && (
                  <div className="ml-4 mt-1 space-y-1 border-l border-sidebar-border pl-3 group-data-[collapsible=icon]:hidden">
                    {subjects.map((subject) => {
                      const Icon = subject.icon;
                      const active =
                        isPracticeRoute &&
                        selectedSubject === subject.slug;

                      return (
                        <Link
                          key={subject.slug}
                          href={`/practice?subject=${subject.slug}`}
                          aria-current={active ? "page" : undefined}
                          title={subject.title}
                          className={cn(
                            "flex min-h-9 items-center gap-2.5 rounded-md px-2 text-xs transition-colors",
                            active
                              ? activeClass
                              : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          )}
                        >
                          <Icon className="size-3.5 shrink-0" />
                          <span className="truncate">{subject.shortTitle}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-1 border-t border-sidebar-border/70 px-1 py-4">
          <SidebarGroupLabel className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/80">
            Core Learning
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {subjects.map((subject) => {
                const Icon = subject.icon;
                const href = `/subjects/${subject.slug}`;
                const active = isActive(href);

                return (
                  <SidebarMenuItem key={subject.slug}>
                    <SidebarMenuButton
                      render={<Link href={href} />}
                      isActive={active}
                      tooltip={subject.title}
                      className={cn(
                        "h-10 gap-3 rounded-lg px-3 text-[13px] font-medium transition-colors",
                        active && activeClass,
                      )}
                    >
                      <Icon className="size-[17px] shrink-0" />
                      <span className="truncate">{subject.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        <div className="px-2 py-2 group-data-[collapsible=icon]:hidden">
          <div className="flex items-center gap-2">
            <GraduationCap className="size-4 shrink-0 text-muted-foreground" />
            <p className="text-[11px] leading-5 text-muted-foreground">
              Free learning. No paywalls.
            </p>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
