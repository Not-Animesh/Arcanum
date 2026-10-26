import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <PageContainer size="narrow" className="py-16 text-center">
      <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border bg-muted/60 text-muted-foreground">
        <Compass className="size-6" />
      </div>

      <div className="space-y-2 mt-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          404 — Not Found
        </p>
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Resource or Subject Not Found
        </h1>
        <p className="mx-auto max-w-md text-sm text-muted-foreground">
          The requested subject, curriculum path, or page does not exist or has not yet been configured in the learning library.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Button render={<Link href="/learning-paths" />}>
          <ArrowLeft className="mr-2 size-4" />
          <span>Back to Learning Paths</span>
        </Button>
        <Button variant="outline" render={<Link href="/" />}>
          <span>Dashboard</span>
        </Button>
      </div>
    </PageContainer>
  );
}
