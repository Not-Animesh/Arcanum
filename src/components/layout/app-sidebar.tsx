
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Code2,
  LayoutDashboard,
  Map,
  Settings2,
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
      { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { title: "Problems", href: "/problems", icon: Code2 },
      { title: "Roadmap", href: "/roadmap", icon: Map },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader className="p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link href="/dashboard" />}
              size="lg"
              tooltip="Arcanum dashboard"
              className="gap-3"
            >
              <Image
                src="/images/logo.png"
                alt="Arcanum"
                width={36}
                height={36}
                className="size-9 shrink-0 rounded-full object-cover"
              />
              <span className="truncate font-semibold tracking-wide">
                Arcanum
              </span>
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
                  const Icon = item.icon;

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        render={<Link href={item.href} />}
                        isActive={isActive(item.href)}
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
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter className="p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link href="/settings" />}
              isActive={isActive("/settings")}
              tooltip="Settings"
              className="h-9 gap-3 rounded-lg px-3"
            >
              <Settings2 className="size-[17px] shrink-0" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <div className="flex items-center gap-2 px-2 pb-1 pt-3 group-data-[collapsible=icon]:hidden">
          <BookOpen className="size-4 shrink-0 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">
            Free learning workspace
          </p>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
