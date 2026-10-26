# Design System

This project uses shadcn/ui's **own native theme**, unmodified — no custom color palette. The values below are copied from the current official shadcn/ui scaffold (Tailwind v4, OKLCH colors), not invented for this project. If you regenerate a project with `npx shadcn@latest init`, this is what you get by default.

## 1. Theming Model

Current shadcn/ui (Tailwind v4) uses CSS custom properties defined once in `app/globals.css`, mapped into Tailwind's utility namespace via an `@theme inline` block, rather than a `tailwind.config.ts` color extension. `:root` holds light-mode values, `.dark` overrides them — dark mode is a class toggle (via `next-themes`), not a media query, which is what we want for a dark-mode-first dashboard with a manual toggle.

```css
@import "tailwindcss";
@import "tw-animate-css";
@custom-variant dark (&:is(.dark *));
```

## 2. Base Color: Neutral

shadcn/ui ships five base-color options — `neutral`, `gray`, `zinc`, `slate`, `stone` — selected once via `components.json`. **`neutral` is the current CLI default** and is what this project uses: it's fully achromatic (every color token has `0` chroma — no hue at all), which is the cleanest possible base for a data-dense dashboard where color should be reserved for meaning (mastery levels, chart series, status), not decoration.

```json
{
  "style": "new-york",
  "tailwind": {
    "baseColor": "neutral",
    "cssVariables": true
  },
  "iconLibrary": "lucide"
}
```

## 3. Full Token Set (copy-paste into `app/globals.css`)

```css
:root {
  --radius: 0.625rem;

  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);

  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);

  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);

  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);

  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}
```

> **Note the one intentional exception to "fully neutral":** in dark mode, `--sidebar-primary` and `--chart-1` both resolve to the same blue (`oklch(0.488 0.243 264.376)`). That's a real shadcn default, not a mistake — the neutral theme stays achromatic everywhere *except* a single blue accent reserved for the sidebar's active state and the first chart series in dark mode. Don't "fix" this to be gray; it's the one deliberate spot of color the default theme allows itself, which is useful for us since the sidebar's active nav item and the mastery heatmap's primary series should visually stand out.

### `@theme inline` mapping (also in `globals.css`)

```css
@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}
```

Because Tailwind v4 is CSS-first, there is **no separate `tailwind.config.ts` color/radius block to maintain** — everything above lives in `globals.css`. This is a deliberate change from the Tailwind v3 era; don't recreate a `tailwind.config.ts` theme.extend.colors block, it would be redundant and could drift out of sync with the CSS.

## 4. Radius Scale

Base `--radius: 0.625rem` (10px), with the rest derived from it — never hardcode a radius value in a component:

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | `calc(var(--radius) - 4px)` (6px) | small controls: badges, checkboxes |
| `--radius-md` | `calc(var(--radius) - 2px)` (8px) | inputs, buttons |
| `--radius-lg` | `var(--radius)` (10px) | cards, dialogs |
| `--radius-xl` | `calc(var(--radius) + 4px)` (14px) | large surfaces, modals |

## 5. Fonts

shadcn/ui's own starter (and `create-next-app` itself) defaults to **Geist Sans** for UI text and **Geist Mono** for code — this project keeps that pairing rather than introducing a second display typeface. Headings use the same Geist Sans family at heavier weights, per shadcn's own convention of varying weight/size rather than mixing typefaces.

```tsx
// app/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
```

Use `font-mono` specifically for the DSA code editor, submitted code display, and anywhere a subtopic ID or raw score is shown for debugging — everywhere else, `font-sans`.

## 6. Layout Pattern

Structure the dashboard as shadcn's standard **sidebar-driven dashboard block** (the pattern behind shadcn's official "sidebar-07"-style block), not a bespoke layout:

- **Collapsible sidebar** (`Sidebar` component) — subject navigation (DSA / DBMS / OOPs / CN / OS / Web Dev), Interview Prep, Progress Dashboard. Collapses to icon-only on smaller viewports.
- **Top header bar** — breadcrumb/page title on the left; the **readiness-score widget** on the right, built from `Progress` (the score itself) plus a `Badge` (readiness tier: "Building", "On Track", "Interview Ready").
- **Main content area** — for the dashboard specifically, a responsive grid of `Card` components, one per subject, each rendering that subject's subtopic mastery as a small heatmap (color intensity mapped to mastery probability using the `--chart-*` tokens, never a hardcoded hex).
- **Dark mode toggle** lives in the sidebar footer, backed by `next-themes`, flipping the `.dark` class — no separate dark-specific components needed since every primitive already reads from the tokens above.

## 7. Component Usage Notes

- Don't hand-roll anything shadcn already ships: use `Card`, `Badge`, `Progress`, `Sidebar`, `Table`, `Tabs`, `Dialog`, `Command` (for a question search palette) from `components/ui`.
- Mastery heatmap cells: build from `Card` + inline background using `--chart-1` through `--chart-5` at varying opacity for intensity, not five arbitrary new colors.
- Destructive actions (e.g., resetting progress) use the `destructive` variant already defined above — don't introduce a separate red.
