import type { Metadata } from "next";
import { Settings2 } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeading } from "@/components/layout/page-heading";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Settings — Arcanum",
  description: "Manage your account, preferences, and notification settings.",
};

export default function SettingsPage() {
  return (
    <PageContainer>
      <PageHeading
        eyebrow={
          <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <span className="size-1.5 rounded-full bg-foreground/60" />
            Account
          </p>
        }
        title="Settings"
        description="Manage your profile, notification preferences, and account options."
      />
      <Card className="shadow-none border-dashed bg-muted/10">
        <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
          <div className="flex size-12 items-center justify-center rounded-2xl border bg-muted/60">
            <Settings2 className="size-6 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground">Coming Soon</p>
          <p className="max-w-sm text-xs text-muted-foreground">
            Profile settings, dark mode preferences, and notification controls will be available here once auth is wired up.
          </p>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
