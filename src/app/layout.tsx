
import type { Metadata } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Navbar } from "@/components/layout/navbar";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
  : new URL("http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: siteUrl,
  applicationName: "Arcanum",
  title: {
    default: "Arcanum",
    template: "%s | Arcanum",
  },
  description:
    "A free learning platform for data structures, algorithms, computer science fundamentals, coding practice, and interview preparation.",
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  keywords: [
    "Arcanum",
    "coding interview preparation",
    "data structures and algorithms",
    "DSA practice",
    "computer science",
    "learning paths",
    "coding practice",
  ],
  openGraph: {
    type: "website",
    siteName: "Arcanum",
    title: "Arcanum — Learn. Practice. Master.",
    description:
      "Build your technical skills with structured learning paths, coding practice, and interview preparation.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Navbar />
          <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
