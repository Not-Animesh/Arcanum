import type { Metadata } from "next";
import { DashboardHome } from "@/components/dashboard/dashboard-home";

export const metadata: Metadata = {
  title: "Dashboard — Arcanum",
  description:
    "Your personalized learning workspace. Track mastery, practice problems, and prepare for placement interviews.",
};

export default function DashboardPage() {
  return <DashboardHome />;
}
