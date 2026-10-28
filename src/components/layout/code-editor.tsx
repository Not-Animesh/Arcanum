
"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { codeToHtml } from "shiki";
import { Code2, Eye, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const LANGUAGES = [
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "c", label: "C" },
  { value: "typescript", label: "TypeScript" },
  { value: "javascript", label: "JavaScript" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "kotlin", label: "Kotlin" },
  { value: "swift", label: "Swift" },
  { value: "csharp", label: "C#" },
] as const;

interface Props {
  value: string;
  lang: string;
  onChange: (value: string) => void;
  onLangChange: (lang: string) => void;
}

interface HighlightResult {
  key: string;
  html: string;
}

export function CodeEditor({
  value,
  lang,
  onChange,
  onLangChange,
}: Props) {
  const { resolvedTheme } = useTheme();
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const [highlightResult, setHighlightResult] =
    useState<HighlightResult | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang =
    LANGUAGES.find((language) => language.value === lang) ?? LANGUAGES[0];

  const shikiTheme =
    resolvedTheme === "dark" ? "github-dark-dimmed" : "github-light";

  const highlightKey = JSON.stringify([
    value,
    currentLang.value,
    shikiTheme,
  ]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setLangOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  useEffect(() => {
    if (mode !== "preview" || !value.trim()) {
      return;
    }

    let cancelled = false;

    async function highlightCode() {
      try {
        const html = await codeToHtml(value, {
          lang: currentLang.value,
          theme: shikiTheme,
        });

        if (!cancelled) {
          setHighlightResult({
            key: highlightKey,
            html,
          });
        }
      } catch {
        const escapedCode = value
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;");

        if (!cancelled) {
          setHighlightResult({
            key: highlightKey,
            html: `<pre class="p-4 overflow-auto text-sm"><code>${escapedCode}</code></pre>`,
          });
        }
      }
    }

    void highlightCode();

    return () => {
      cancelled = true;
    };
  }, [
    mode,
    value,
    currentLang.value,
    shikiTheme,
    highlightKey,
  ]);

  const highlightedHtml =
    highlightResult?.key === highlightKey
      ? highlightResult.html
      : null;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <label className="text-sm font-medium">Solution Code</label>

        <div className="flex items-center gap-2">
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setLangOpen((open) => !open)}
              aria-expanded={langOpen}
              aria-label={`Programming language: ${currentLang.label}`}
              className="inline-flex items-center gap-1 rounded-md border border-border bg-muted/40 px-2 py-1 font-mono text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {currentLang.label}
              <ChevronDown
                className={cn(
                  "h-3 w-3 transition-transform",
                  langOpen && "rotate-180",
                )}
              />
            </button>

            {langOpen && (
              <div className="absolute right-0 top-full z-50 mt-1 w-36 rounded-lg border border-border bg-popover py-1 shadow-md">
                {LANGUAGES.map((language) => (
                  <button
                    key={language.value}
                    type="button"
                    onClick={() => {
                      onLangChange(language.value);
                      setLangOpen(false);
                    }}
                    className={cn(
                      "w-full px-3 py-1.5 text-left font-mono text-xs transition-colors hover:bg-accent",
                      language.value === currentLang.value
                        ? "font-semibold text-primary"
                        : "text-muted-foreground",
                    )}
                  >
                    {language.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="inline-flex overflow-hidden rounded-md border border-border">
            <button
              type="button"
              onClick={() => setMode("edit")}
              aria-pressed={mode === "edit"}
              className={cn(
                "inline-flex items-center gap-1 px-2.5 py-1 text-xs transition-colors",
                mode === "edit"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Code2 className="h-3 w-3" />
              Edit
            </button>

            <button
              type="button"
              onClick={() => setMode("preview")}
              aria-pressed={mode === "preview"}
              className={cn(
                "inline-flex items-center gap-1 border-l border-border px-2.5 py-1 text-xs transition-colors",
                mode === "preview"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Eye className="h-3 w-3" />
              Preview
            </button>
          </div>
        </div>
      </div>

      {mode === "edit" && (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={`# paste your ${currentLang.label} solution here...`}
          className="min-h-[280px] w-full resize-none rounded-lg border border-input bg-muted/30 px-3 py-2.5 font-mono text-sm text-foreground transition-colors placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring"
          rows={14}
          spellCheck={false}
        />
      )}

      {mode === "preview" && (
        <div className="min-h-[280px] overflow-hidden rounded-lg border border-border">
          {!value.trim() ? (
            <div className="flex h-[280px] items-center justify-center font-mono text-sm text-muted-foreground">
              No code to preview
            </div>
          ) : highlightedHtml ? (
            <div
              className="shiki-preview overflow-auto text-sm"
              dangerouslySetInnerHTML={{ __html: highlightedHtml }}
            />
          ) : (
            <div className="flex h-[280px] items-center justify-center text-xs text-muted-foreground">
              Rendering…
            </div>
          )}
        </div>
      )}
    </div>
  );
}
