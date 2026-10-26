import * as React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";

import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { ReadinessWidget } from "@/components/dashboard/readiness-widget";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Arcanum",
    template: "%s | Arcanum",
  },
  description:
    "A learning platform for technical mastery, coding practice, and interview preparation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${inter.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        <SidebarProvider defaultOpen>
          <React.Suspense
            fallback={<div className="w-(--sidebar-width) bg-sidebar hidden md:block" />}
          >
            <AppSidebar />
          </React.Suspense>

          <SidebarInset className="min-w-0">
            <React.Suspense
              fallback={<div className="h-14 border-b bg-background" />}
            >
              <AppHeader
                actions={<ReadinessWidget score={32} />}
              />
            </React.Suspense>
            <div className="flex-1 min-w-0">{children}</div>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
