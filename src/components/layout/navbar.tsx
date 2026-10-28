
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
    ArrowUpRight,
    Code2,
    Menu,
    Moon,
    Sun,
    X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/practice", label: "Practice" },
    { href: "/learning-paths", label: "Learning Paths" },
];

export function Navbar() {
    const pathname = usePathname();
    const { resolvedTheme, setTheme } = useTheme();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isActive = (href: string) =>
        pathname === href || pathname.startsWith(`${href}/`);

    const closeMobileMenu = () => setMobileMenuOpen(false);

    const toggleTheme = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/90 backdrop-blur-md">
            <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link
                    href="/"
                    onClick={closeMobileMenu}
                    className="group flex shrink-0 items-center gap-2.5"
                    aria-label="Arcanum home"
                >
                    <Code2
                        aria-hidden="true"
                        className="h-[27px] w-[27px] text-primary transition-transform duration-200 group-hover:scale-105"
                        strokeWidth={2.2}
                    />
                    <span className="text-base font-semibold tracking-tight text-foreground">
                        Arcanum
                    </span>
                </Link>

                <div className="hidden items-center gap-1 md:flex">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            aria-current={isActive(link.href) ? "page" : undefined}
                            className={cn(
                                "nav-link rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-200",
                                isActive(link.href)
                                    ? "active bg-accent text-foreground"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label="Toggle color theme"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                        <Sun className="hidden h-4 w-4 dark:block" />
                        <Moon className="block h-4 w-4 dark:hidden" />
                    </button>

                    <button
                        type="button"
                        disabled
                        title="Sign up will be available when authentication is implemented"
                        className="hidden h-9 items-center gap-1.5 rounded-md border border-primary/25 bg-primary/5 px-3 text-sm font-medium text-primary opacity-80 sm:inline-flex"
                    >
                        Sign Up
                        <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>

                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen((open) => !open)}
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileMenuOpen}
                        aria-controls="public-mobile-navigation"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
                    >
                        {mobileMenuOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </button>
                </div>
            </nav>

            {mobileMenuOpen && (
                <div
                    id="public-mobile-navigation"
                    className="border-t border-border/70 bg-background px-4 py-3 md:hidden"
                >
                    <div className="mx-auto flex max-w-6xl flex-col gap-1">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={closeMobileMenu}
                                aria-current={isActive(link.href) ? "page" : undefined}
                                className={cn(
                                    "rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                                    isActive(link.href)
                                        ? "bg-accent text-foreground"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}

                        <button
                            type="button"
                            disabled
                            className="mt-1 flex items-center justify-center gap-1.5 rounded-md border border-primary/25 bg-primary/5 px-3 py-2.5 text-sm font-medium text-primary opacity-80 sm:hidden"
                        >
                            Sign Up
                            <ArrowUpRight className="h-3.5 w-3.5" />
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
