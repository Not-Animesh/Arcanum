"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  BriefcaseBusiness,
  CalendarDays,
  Code2,
  Compass,
  Database,
  GraduationCap,
  LayoutDashboard,
  Network,
  Settings2,
  ShieldCheck,
  Terminal,
  Trophy,
  Waypoints,
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
  SidebarSeparator,
  SidebarRail,
} from "@/components/ui/sidebar";

const navigation = [
  {
    label: "Workspace",
    items: [
      { title: "Overview", href: "/", icon: LayoutDashboard },
      { title: "Learning paths", href: "/learning-paths", icon: Compass },
      { title: "Practice", href: "/practice", icon: Code2 },
      { title: "Study sheets", href: "/sheets", icon: BookOpen },
      { title: "Contests", href: "/contests", icon: Trophy },
    ],
  },
  {
    label: "Learning library",
    items: [
      { title: "Data structures", href: "/subjects/dsa", icon: Waypoints },
      { title: "DBMS", href: "/subjects/dbms", icon: Database },
      { title: "Operating systems", href: "/subjects/os", icon: Terminal },
      { title: "Computer networks", href: "/subjects/cn", icon: Network },
      { title: "OOP concepts", href: "/subjects/oops", icon: BrainCircuit },
      { title: "Web development", href: "/subjects/web-dev", icon: Code2 },
    ],
  },
  {
    label: "Career preparation",
    items: [
      {
        title: "Interview prep",
        href: "/interview-prep",
        icon: BriefcaseBusiness,
      },
      { title: "Study planner", href: "/planner", icon: CalendarDays },
      { title: "Analytics", href: "/analytics", icon: Activity },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader className="p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link href="/" />}
              size="lg"
              tooltip="Arcanum home"
              className="gap-3"
            >
              <Image
                src="/images/logo.png"
                alt="Arcanum"
                width={36}
                height={36}
                className="size-9 rounded-full object-cover"
              />

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold tracking-wide">
                  Arcanum
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent className="gap-0">
        {navigation.map((group) => (
          <SidebarGroup key={group.label} className="px-3 py-3">
            <SidebarGroupLabel className="px-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {group.label}
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {group.items.map((item) => {
                  const active = isActive(item.href);
                  const Icon = item.icon;

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        render={<Link href={item.href} />}
                        isActive={active}
                        tooltip={item.title}
                        className="h-9 gap-3 rounded-lg px-3"
                      >
                        <Icon className="size-[17px] shrink-0" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        <SidebarGroup className="mt-auto px-3 py-3">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/settings" />}
                  tooltip="Settings"
                  className="h-9 gap-3 rounded-lg px-3"
                >
                  <Settings2 className="size-[17px] shrink-0" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter className="p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link href="/analytics" />}
              tooltip="Your learning progress"
              size="lg"
              className="h-auto gap-3 rounded-xl border border-sidebar-border p-2"
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                <GraduationCap className="size-5" />
              </div>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Your progress</span>
                <span className="truncate text-xs text-muted-foreground">
                  Keep building your skills
                </span>
              </div>

              <ArrowUpRight className="size-4 shrink-0 text-muted-foreground" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <div className="flex items-center gap-2 px-2 pb-1 pt-3 group-data-[collapsible=icon]:hidden">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">
            D
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">Devashish</p>
            <p className="truncate text-xs text-muted-foreground">
              Learner account
            </p>
          </div>
          <ShieldCheck className="size-4 shrink-0 text-muted-foreground" />
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
