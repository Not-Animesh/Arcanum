
import { Suspense, type ReactNode } from "react";

import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";

export default function WorkspaceLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <SidebarProvider>
            <Suspense fallback={null}>
                <AppSidebar />
            </Suspense>

            <SidebarInset className="min-h-svh min-w-0">
                <Suspense fallback={null}>
                    <AppHeader />
                </Suspense>

                <main className="flex min-w-0 flex-1 flex-col px-4 py-6 sm:px-6 lg:px-8">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
