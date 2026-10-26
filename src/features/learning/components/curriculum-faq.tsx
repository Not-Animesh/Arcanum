"use client";

import * as React from "react";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CurriculumFAQ } from "../types";

interface CurriculumFAQSectionProps {
  faqs?: CurriculumFAQ[];
}

export function CurriculumFAQSection({ faqs }: CurriculumFAQSectionProps) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="border-b pb-2 flex items-center gap-2">
        <HelpCircle className="size-4 text-muted-foreground" />
        <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">
          Frequently Asked Questions
        </h2>
      </div>

      <Accordion className="w-full space-y-2">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`faq-${index}`}
            className="rounded-xl border border-border bg-card shadow-none overflow-hidden"
          >
            <AccordionTrigger className="px-4 py-3 text-left text-xs sm:text-sm font-medium hover:bg-muted/40 hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="border-t bg-muted/10 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
