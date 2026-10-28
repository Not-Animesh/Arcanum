
import type { ReactNode } from "react";

import { Navbar } from "@/components/layout/navbar";

export default function PublicLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                {children}
            </main>
        </>
    );
}
