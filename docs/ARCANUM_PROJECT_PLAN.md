# Arcanum: project status, roadmap, ML plan, data plan and team plan

Prepared: 15 October 2026
Repository: https://github.com/Not-Animesh/Arcanum.git
Web app root: `C:\Animesh\PROJECT\6-adaptive learning platform\project\my-app`
Stack: Next.js (App Router, version 16 per the Phase 3 report), React, TypeScript, Tailwind CSS v4, shadcn/ui (Base UI variant), pnpm

How to read this document: Part 1 is the product. Part 2 records everything finished so far. Parts 3 to 6 are the plan to the final submission (architecture, roadmap, ML, data). Part 7 splits the work across Member 1, Member 2 and Member 3. Part 8 and 9 cover risks and the demo checklist.

Honesty note: Phase 1 is described from the handoff document. Phase 2 is described from its specification and from evidence in the Phase 3 report, because the Phase 2 completion report was not available when this was written. Confirm the Phase 2 details against `git log` before submitting this as documentation. Phase 3 is described from its completion report.

---

## Part 1. Product vision

Arcanum is an adaptive learning and technical interview preparation platform for computer science students. It is three connected systems that share one content library and one learner record.

| System | What the learner does | What it needs |
|---|---|---|
| 1. Learning Paths | Follows a structured curriculum. Each topic has theory, external videos and articles, and practical questions. | Curriculum data, lesson text, resource links, links from topics to questions |
| 2. Practice | Browses a separate question bank, filters it, and solves questions in a structured sequence. Code questions run in an in-app sandbox. | Problem bank, code editor, Judge0 sandbox, submission history |
| 3. Personalized Study Plan | Takes an initial assessment. Gets an 8-week plan. The plan changes as the learner progresses, struggles or skips. | Assessment bank, mastery model (BKT), planner, event log, readiness prediction |

How they connect:

```
            +-----------------------+
            |   Content library     |  curriculum, lessons, resources,
            |  (files in the repo)  |  problems, assessment questions, skills
            +-----------+-----------+
                        |
        +---------------+----------------+
        |                                |
+-------v--------+              +--------v--------+
| Learning Paths |<------------>|    Practice     |
| (read, learn)  |  topic <->   | (solve, submit) |
+-------+--------+  problems    +--------+--------+
        |                                |
        |  events: viewed, hint, run,    |
        |  submit, answer, skip          |
        +---------------+----------------+
                        |
                +-------v--------+      +------------------+
                |  Learner record|----->|    ML service    |
                |  (PostgreSQL)  |<-----| BKT, planner,    |
                +-------+--------+      | readiness model  |
                        |               +------------------+
                +-------v--------+
                | Study Plan +   |
                | Analytics      |
                +----------------+
```

The rule that holds this together: every learning item (lesson, problem, assessment question) points to one or more skills. A skill is a unit of knowledge such as `dsa.arrays.two-pointers`. Mastery is tracked per skill. The planner works on skills.

---

## Part 2. What has been completed

### 2.1 Summary

| Phase | Name | Status | Verified by |
|---|---|---|---|
| 1 | Foundation, sidebar and logo | Complete | Handoff document |
| 2 | Application shell (header, container, heading) | Implemented per specification; confirm against git history | Phase 3 report refers to the files and edits one of them |
| 3 | Learning Paths, curriculum pages, Practice foundation | Complete | `tsc` 0 errors, `pnpm build` success, ESLint 0 errors, `curl` checks |

Nothing in the app is connected to a database, authentication, a code sandbox, or any ML. Progress, plans and readiness do not exist as working features yet.

### 2.2 Phase 1: foundation, sidebar and logo

**Purpose:** set up the project and a navigation shell that the rest of the product hangs on.

| Item | What was done |
|---|---|
| Project foundation | Next.js App Router, TypeScript, Tailwind CSS and shadcn/ui in the `my-app` project |
| Sidebar | `src/components/layout/app-sidebar.tsx`. Grouped navigation (workspace, learning library, career preparation), route-aware active state, collapsible layout, settings entry, learning-progress footer |
| Logo | Circular black mark with a white monogram, stored at `public/images/arcanum-mark.png`. Expanded sidebar shows logo plus the word "Arcanum". Collapsed sidebar shows only the mark. The old "Technical mastery" subtitle was removed |
| Fonts | Geist, Inter and Geist Mono loaded with `next/font/google` and exposed as CSS variables. Roles: Geist for interface and headings, Inter for body text, Geist Mono for code |
| Theme | shadcn OKLCH neutral light and dark palette in `src/app/globals.css`. Decision: preserve it, do not replace it with a custom palette |
| Dashboard prototype | `src/components/dashboard/dashboard-home.tsx` separated from the route. Contains placeholder metrics and subject cards. No real data |
| Shadcn primitives | `src/components/ui/sidebar.tsx` and related components. The project uses newer Base UI-based shadcn components, so `asChild` is not assumed; the `render` prop is used where needed |

**Files in play:** `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `src/components/layout/app-sidebar.tsx`, `src/components/dashboard/dashboard-home.tsx`, `src/components/ui/*`, `public/images/arcanum-mark.png`.

### 2.3 Phase 2: application shell

**Purpose:** build a reusable layout so every later page looks and behaves the same, without duplicating the header, spacing or heading code.

**Files created (per specification, and referenced by the Phase 3 prompt and report):**

| File | Purpose |
|---|---|
| `src/components/layout/app-header.tsx` | Client component. Shared header with the single sidebar toggle, a separator, and a breadcrumb derived from `usePathname()` using a typed route-label map (`ROUTE_LABELS`). Optional right-aligned `actions` slot. Responsive truncation so actions never collide with the breadcrumb |
| `src/components/layout/page-container.tsx` | Server component. Standard page wrapper: maximum width, responsive horizontal padding (`px-4 sm:px-6 lg:px-8`), vertical padding and gap, `min-w-0` to prevent horizontal overflow. Size variants (default, narrow, wide, full) |
| `src/components/layout/page-heading.tsx` | Server component. The page's single `<h1>`, optional description, optional right-aligned actions |

**Files modified:**

| File | Change |
|---|---|
| `src/app/layout.tsx` | Replaced inline header markup with `<AppHeader />`. Kept fonts, metadata, `SidebarProvider`, `AppSidebar`, `SidebarInset` |
| `src/components/dashboard/dashboard-home.tsx` | Adapted to the shared page container, with no visual redesign |
| `src/app/page.tsx` | Kept minimal: renders `DashboardHome` |

**Design rules set in Phase 2 (still in force):**

- Fonts: Geist for headings, navigation and controls; Inter for body text; Geist Mono for code.
- Type scale: page title `text-2xl sm:text-3xl font-semibold tracking-tight`; section title `text-xl font-semibold`; card title `text-base font-medium`; UI text `text-sm`; long-form learning text `text-base leading-7`; captions `text-xs text-muted-foreground`; code `font-mono text-sm`.
- Scaling: rem-based sizes with a 16px root, optional larger root on very wide screens, 4px spacing grid, Tailwind default breakpoints, sidebar switches to a mobile sheet at `md`.
- Theme: semantic tokens only (`bg-background`, `text-foreground`, `border-border`, `bg-muted`, `text-muted-foreground`). No gold accent, gradients or glow.

**Preserved:** `app-sidebar.tsx`, `globals.css` colour tokens, logo asset and font setup.

### 2.4 Phase 3: Learning Paths and Practice foundation

**Purpose:** build the first two of the three systems as a front-end experience on typed local data, with honest empty states instead of invented numbers.

#### Routes

| Route | Type | What it does |
|---|---|---|
| `/learning-paths` | Static | Discovery page with six working category tabs and resource cards |
| `/subjects` | Static | Subject catalog index |
| `/subjects/[subjectSlug]` | Dynamic, prerendered | Curriculum page for `dsa`, `dbms`, `os`, `cn`, `oops`, `web-dev`, `system-design`, `data-engineering`. Calls `notFound()` for unknown slugs |
| `/practice` | Dynamic with Suspense | Practice page with search, category and difficulty filters, reset, empty state, problem drawer |
| `/_not-found` | Static | Branded 404 page |

#### Files created

| File | Purpose |
|---|---|
| `src/features/learning/types/index.ts` | Types for tracks, resources, modules, topics, curricula |
| `src/features/learning/config/learning-tracks.ts` | The six tracks in the required order: All, DSA, Core CS, System Design, Data Engineering, Web Design |
| `src/features/learning/config/learning-resources.ts` | Catalog of learning resources, each assigned to a track |
| `src/features/learning/config/curricula.ts` | Curriculum definitions: a 10-module Computer Networks reference plus DSA, DBMS, OS, OOPs, System Design, Data Engineering and Web Development |
| `src/features/learning/components/learning-path-tabs.tsx` | Accessible six-tab selector with selected state and keyboard focus, horizontally scrollable on mobile |
| `src/features/learning/components/learning-resource-card.tsx` | Resource card: icon, title, description, module and topic counts, duration, explore link |
| `src/features/learning/components/learning-paths-view.tsx` | Client component holding the selected tab; filters resources; groups by track on "All" |
| `src/features/learning/components/curriculum-header.tsx` | Breadcrumb, title, summary, "View syllabus" anchor, metadata row |
| `src/features/learning/components/curriculum-progress.tsx` | Progress panel showing `0%` and `0 / N topics completed` because no tracking exists |
| `src/features/learning/components/curriculum-actions.tsx` | "Choose your learning experience": Curriculum, Practice (pre-filtered link), Study Plan |
| `src/features/learning/components/curriculum-about.tsx` | Expandable "About this curriculum" |
| `src/features/learning/components/curriculum-overview.tsx` | Prerequisites, learning objectives and suggested sequence (replaced the paid-plan comparison from the reference) |
| `src/features/learning/components/curriculum-syllabus.tsx` | Accordion syllabus: modules with number, title, topic count; indented topic rows with durations |
| `src/features/learning/components/curriculum-faq.tsx` | Collapsible FAQ accordion |
| `src/features/learning/components/topic-drawer.tsx` | Slide-over panel showing key concepts for a topic (a stand-in until real topic pages exist) |
| `src/features/practice/types/index.ts` | Practice problem types and filter categories |
| `src/features/practice/config/practice-problems.ts` | Starter problem dataset (sample data) |
| `src/features/practice/components/practice-view.tsx` | Client interface: search, category pills, difficulty filter, reset, empty state, problem drawer |
| `src/app/learning-paths/page.tsx` | Route for the discovery page |
| `src/app/subjects/page.tsx` | Route for the subject catalog |
| `src/app/subjects/[subjectSlug]/page.tsx` | Dynamic curriculum route |
| `src/app/practice/page.tsx` | Practice route |
| `src/app/not-found.tsx` | Custom 404 |
| `src/components/ui/accordion.tsx` | shadcn Accordion (Base UI) |
| `src/components/ui/badge.tsx` | shadcn Badge (Base UI) |

#### Files modified

| File | Change |
|---|---|
| `src/components/layout/app-header.tsx` | Extended `ROUTE_LABELS` with `/subjects/system-design` and `/subjects/data-engineering` |
| `src/app/layout.tsx` | Wrapped components that use `usePathname()` in `React.Suspense` for partial-prerendering support under Next.js 16 |

#### Behaviour delivered

- Six tabs filter resources on the client without URL changes. "All" groups cards under track headings.
- Curriculum pages show breadcrumb, metadata, honest progress, three learning actions, expandable About, accordion syllabus with topic rows, objectives and prerequisites, and FAQs.
- No Plus, Premium, upgrade, pricing, locked or paywalled UI exists. The feature is named "Learning Paths" everywhere.
- Unknown subject slugs return the 404 page.
- Practice filters change the visible list.

#### Validation recorded

| Check | Result |
|---|---|
| `pnpm exec tsc --noEmit` | 0 errors |
| `pnpm build` | Success, 16 static and partially prerendered pages |
| ESLint on Phase 3 files | 0 errors, 0 warnings |
| `curl -I` on `/learning-paths`, `/subjects/cn`, `/practice` | 200 |
| `curl -I` on `/subjects/unknown` | 404 |

### 2.5 Decisions made so far

1. Keep shadcn's native neutral OKLCH theme and Geist/Inter/Geist Mono.
2. Use pnpm, a `src/` directory, and Windows PowerShell as the development shell.
3. Git flow: `main` (deployable) and `test` (integration); feature branches come off `test`.
4. Name the feature "Learning Paths" and remove all subscription ideas.
5. Use one dynamic subject route (`/subjects/[subjectSlug]`) rather than a static folder per subject.
6. Keep honest empty states instead of fake progress.
7. Run code in a sandbox powered by Judge0 inside Arcanum rather than redirecting users to external sites.
8. Author content as files in the repo (JSON plus Markdown, edited in VS Code), using Excel only for planning and bulk entry. Do not use Word.

### 2.6 Known gaps and clean-up items from Phases 1 to 3

| # | Gap | Why it matters | Fix in |
|---|---|---|---|
| 1 | Curriculum text, FAQs and topic-drawer notes in `curricula.ts` were generated as starter content | May contain errors or generic text. The team must review and replace it with authored content | Phase 4 |
| 2 | Curriculum metadata shows a "quizzes" count | Must be derived from real quiz entries, not hardcoded | Phase 4 |
| 3 | Topics open a drawer, not a page | Real lessons need their own route, resources and linked problems | Phase 5 |
| 4 | `ROUTE_LABELS` in `app-header.tsx` is a hand-maintained map | New subjects and topics will show wrong breadcrumbs. Derive labels from the content config | Phase 5 |
| 5 | Practice problems are a small starter list with no statements, tests or editor | Cannot be solved yet | Phases 4 to 6 |
| 6 | Study Plan action is a placeholder | The plan does not exist yet | Phase 11 |
| 7 | Progress is always 0% | No auth, database or events | Phases 7 and 8 |
| 8 | No `README.md` updates, `.env.example`, CI, or content validation | Needed before three people edit in parallel | Phase 3.5 |
| 9 | `src/features/learning/` and the earlier proposed `src/components/learning/` conflict | Pick one convention so files are not duplicated | Phase 3.5 |
| 10 | System Design and Data Engineering have thin content | Out of the stated core scope; keep them as short tracks | Later, if time allows |

---

## Part 3. Target architecture

### 3.1 Services

| Service | Technology | Responsibility | Owner |
|---|---|---|---|
| Web app | Next.js App Router, TypeScript | UI, routes, server actions and route handlers, auth, database access, calling the sandbox and the ML service | Members 1 and 3 |
| Database | PostgreSQL | Users, progress, submissions, mastery, plans, events | Member 1 |
| Sandbox | Judge0 (Docker) | Runs submitted code with time and memory limits | Member 1 |
| ML service | Python, FastAPI | BKT mastery updates, diagnostic selection and scoring, study-plan generation and adaptation, readiness prediction | Member 2 |
| Content | JSON and Markdown files in `my-app/src/content` | Curriculum, lessons, resources, problems, assessment questions | Member 3 authors, Member 1 builds the loader |
| LLM tutor (stretch) | LLM API called from a Next.js route handler | Hints and explanations | Member 1 |

**Database choice:** use PostgreSQL only. The data is relational (users, skills, attempts, plan items), and the ML service benefits from SQL. Adding MongoDB would double the work. Use Prisma as the ORM, with a hosted free-tier Postgres or a local Docker container for development.

**Authentication choice:** Auth.js (credentials and optionally Google) with the Prisma adapter, or Better Auth. Check current Next.js 16 compatibility in each library's documentation before choosing. Route protection in Next.js 16 uses the renamed middleware file (`proxy.ts`); check the Next.js docs for the exact convention.

**ML service design:** make it stateless. Every request carries the data it needs, so the ML member can build and test it without the database. The web app is the source of truth and stores whatever the ML service returns.

### 3.2 Full repository structure

The Git root should contain both the web app and the ML service. Run `git rev-parse --show-toplevel` to see where your root currently is. If it is the `project` folder (the parent of `my-app`), the structure below applies directly and you do not need to rename `my-app`.

```
project/                                   # git root
├── README.md                              # how to run everything (Member 3 writes, all update)
├── .gitignore
├── .gitattributes
├── .github/
│   ├── workflows/
│   │   ├── web-ci.yml                     # pnpm install, tsc, lint, validate:content, build
│   │   └── ml-ci.yml                      # ruff, pytest, contract tests
│   ├── CODEOWNERS                         # folder ownership (see Part 7)
│   └── pull_request_template.md
│
├── docker-compose.yml                     # postgres, judge0 (+ workers, redis), ml-service
├── .env.example                           # every variable, no secrets
│
├── contracts/                             # the agreement between web and ML (Members 1 and 2)
│   ├── README.md
│   ├── skills.json                        # GENERATED from the curriculum by a web script
│   ├── openapi.json                       # GENERATED from the ML service
│   ├── examples/                          # hand-written request/response samples
│   │   ├── bkt-update.request.json
│   │   ├── bkt-update.response.json
│   │   ├── assessment-next.request.json
│   │   ├── assessment-next.response.json
│   │   ├── assessment-score.request.json
│   │   ├── assessment-score.response.json
│   │   ├── plan-generate.request.json
│   │   ├── plan-generate.response.json
│   │   ├── plan-adapt.request.json
│   │   ├── plan-adapt.response.json
│   │   ├── readiness-predict.request.json
│   │   └── readiness-predict.response.json
│   └── events.schema.json                 # learner event log schema
│
├── my-app/                                # Next.js web app
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── next.config.ts
│   ├── tsconfig.json
│   ├── components.json
│   ├── eslint.config.mjs
│   ├── postcss.config.mjs
│   ├── .env.local                         # not committed
│   │
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── migrations/
│   │   └── seed.ts                        # loads content files into the database
│   │
│   ├── public/
│   │   └── images/
│   │       ├── arcanum-mark.png
│   │       └── subjects/
│   │
│   ├── scripts/
│   │   ├── validate-content.ts            # fails on bad content (run in CI)
│   │   ├── export-skills.ts               # writes ../contracts/skills.json
│   │   ├── csv-to-problem-stubs.ts        # Excel/CSV rows -> problem folders
│   │   ├── csv-to-questions.ts            # MCQ CSV -> assessment JSON
│   │   └── check-links.ts                 # checks external resource URLs
│   │
│   └── src/
│       ├── app/
│       │   ├── layout.tsx
│       │   ├── page.tsx                   # dashboard entry
│       │   ├── globals.css
│       │   ├── loading.tsx
│       │   ├── error.tsx
│       │   ├── not-found.tsx
│       │   ├── (auth)/
│       │   │   ├── layout.tsx
│       │   │   ├── login/page.tsx
│       │   │   └── register/page.tsx
│       │   ├── onboarding/page.tsx        # goal, hours per week, subjects, self-rated level
│       │   ├── assessment/
│       │   │   ├── page.tsx               # intro
│       │   │   └── [sessionId]/page.tsx   # the diagnostic runner
│       │   ├── learning-paths/page.tsx
│       │   ├── subjects/
│       │   │   ├── page.tsx
│       │   │   └── [subjectSlug]/
│       │   │       ├── page.tsx
│       │   │       └── [topicSlug]/page.tsx   # real topic page
│       │   ├── practice/
│       │   │   ├── page.tsx
│       │   │   └── [problemSlug]/page.tsx     # problem workspace
│       │   ├── planner/page.tsx
│       │   ├── analytics/page.tsx
│       │   ├── settings/page.tsx
│       │   └── api/
│       │       ├── auth/[...nextauth]/route.ts
│       │       ├── practice/run/route.ts       # run against sample tests
│       │       ├── practice/submit/route.ts    # run against all tests
│       │       ├── events/route.ts             # log learner events
│       │       ├── assessment/route.ts
│       │       ├── plan/route.ts
│       │       └── tutor/route.ts              # stretch: LLM hints
│       │
│       ├── components/
│       │   ├── layout/                    # app-sidebar, app-header, page-container, page-heading
│       │   ├── dashboard/                 # dashboard-home and its sections
│       │   └── ui/                        # shadcn components
│       │
│       ├── features/
│       │   ├── learning/                  # (exists) types, config, components
│       │   ├── practice/                  # (exists) problem list, filters; add workspace components
│       │   │   └── components/
│       │   │       ├── problem-statement.tsx
│       │   │       ├── code-editor.tsx
│       │   │       ├── language-select.tsx
│       │   │       ├── test-results.tsx
│       │   │       └── submission-history.tsx
│       │   ├── assessment/                # question card, runner, result summary
│       │   ├── planner/                   # week view, day view, plan item card, reasons
│       │   ├── progress/                  # topic completion, mastery bars
│       │   ├── analytics/                 # charts
│       │   ├── adaptive/                  # ML client (real and mock)
│       │   │   ├── ml-client.ts
│       │   │   ├── mock-ml-client.ts
│       │   │   └── types.ts
│       │   └── auth/                      # forms, session helpers
│       │
│       ├── content/                       # authored content (source of truth)
│       │   ├── skills-map.md              # how skills ids are built
│       │   ├── dsa/
│       │   │   ├── curriculum.json
│       │   │   ├── resources.json         # external videos and articles per topic
│       │   │   ├── lessons/
│       │   │   │   └── <module>/<topic>.md
│       │   │   └── problems/
│       │   │       └── <problem-slug>/
│       │   │           ├── meta.json
│       │   │           ├── statement.md
│       │   │           ├── tests.json
│       │   │           └── solution.py    # server-only, never sent to the browser
│       │   ├── dbms/ os/ cn/ oops/ web-dev/     # same layout
│       │   └── assessment/
│       │       ├── dsa.questions.json
│       │       └── <subject>.questions.json
│       │
│       ├── lib/
│       │   ├── utils.ts                   # cn()
│       │   ├── db.ts                      # Prisma client
│       │   ├── auth.ts
│       │   ├── env.ts                     # validated environment variables
│       │   ├── judge0.ts                  # sandbox client
│       │   ├── content.ts                 # loads and indexes content files
│       │   ├── rate-limit.ts
│       │   └── logger.ts
│       │
│       ├── hooks/
│       ├── types/
│       └── config/
│           ├── navigation.ts
│           └── site.ts
│
├── ml-service/                            # Python ML service (Member 2)
│   ├── README.md
│   ├── pyproject.toml
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── .env.example
│   ├── src/arcanum_ml/
│   │   ├── __init__.py
│   │   ├── main.py                        # FastAPI app: routers, CORS, health
│   │   ├── config.py
│   │   ├── schemas/                       # pydantic models = the API contract
│   │   │   ├── common.py
│   │   │   ├── bkt.py
│   │   │   ├── assessment.py
│   │   │   ├── plan.py
│   │   │   └── readiness.py
│   │   ├── api/routes/
│   │   │   ├── health.py
│   │   │   ├── bkt.py
│   │   │   ├── assessment.py
│   │   │   ├── plan.py
│   │   │   └── readiness.py
│   │   ├── bkt/
│   │   │   ├── model.py                   # update equations, prediction
│   │   │   ├── params.py                  # default and fitted parameters
│   │   │   ├── fit.py                     # parameter fitting (EM or pyBKT wrapper)
│   │   │   └── evaluate.py
│   │   ├── assessment/
│   │   │   ├── selector.py                # picks the next question
│   │   │   └── scoring.py                 # final mastery estimates
│   │   ├── planner/
│   │   │   ├── graph.py                   # prerequisite graph
│   │   │   ├── scoring.py                 # skill priority
│   │   │   ├── scheduler.py               # fills 8 weeks within the time budget
│   │   │   ├── adapt.py                   # replanning on progress, struggle, skip
│   │   │   └── revision.py                # spaced revision, forgetting decay
│   │   ├── readiness/
│   │   │   ├── features.py                # feature engineering from learner state
│   │   │   ├── dataset.py                 # builds training tables
│   │   │   ├── train.py
│   │   │   ├── predict.py
│   │   │   ├── evaluate.py
│   │   │   └── explain.py                 # top contributing factors
│   │   ├── data/
│   │   │   ├── loaders.py                 # public and pilot datasets
│   │   │   ├── simulator.py               # synthetic learner simulator
│   │   │   └── synthetic.py
│   │   └── utils/
│   ├── scripts/
│   │   ├── make_synthetic.py
│   │   ├── download_public_data.md        # download steps (data is not committed)
│   │   ├── fit_bkt.py
│   │   ├── train_readiness.py
│   │   └── export_openapi.py              # writes ../contracts/openapi.json
│   ├── notebooks/
│   │   ├── 01_public_data_eda.ipynb
│   │   ├── 02_bkt_fit_and_eval.ipynb
│   │   └── 03_readiness_model.ipynb
│   ├── artifacts/                         # small, versioned outputs only
│   │   ├── bkt_params_v1.json
│   │   ├── readiness_v1.joblib            # commit only if small; otherwise gitignore
│   │   ├── metrics_v1.json
│   │   └── model_card.md
│   └── tests/
│       ├── unit/                          # test_bkt.py, test_planner.py, test_selector.py
│       ├── api/                           # endpoint tests
│       └── contract/                      # validates ../contracts/examples against schemas
│
├── data/                                  # ML data (raw files are gitignored)
│   ├── README.md                          # what each folder contains and how to refresh it
│   ├── raw/
│   │   ├── public/                        # downloaded public datasets (gitignored)
│   │   └── pilot/                         # anonymised pilot exports (gitignored)
│   ├── processed/                         # cleaned tables (gitignored, regenerable)
│   └── synthetic/                         # generated data (gitignored, regenerable)
│
├── content-planning/                      # Excel/CSV used before conversion (Member 3)
│   ├── dsa-topics.xlsx
│   ├── dsa-problems.xlsx
│   ├── dsa-mcq.xlsx
│   └── templates/
│
├── docs/
│   ├── architecture.md
│   ├── database-design.md
│   ├── api-contracts.md
│   ├── content-authoring-guide.md         # how to add a topic, problem, question
│   ├── adaptive-learning.md               # BKT, planner and readiness explained
│   ├── data-collection-plan.md
│   ├── ml-model-card.md
│   ├── testing-plan.md
│   ├── deployment.md
│   ├── development-roadmap.md
│   └── viva-notes.md
│
└── infra/
    ├── judge0/                            # judge0.conf and notes
    └── scripts/                           # PowerShell helpers
```

Rules for the structure:

- Create folders when the phase that needs them starts. Do not create empty placeholder files to match this tree.
- `contracts/skills.json` and `contracts/openapi.json` are generated. Nobody edits them by hand.
- `content/` stays inside `my-app` so a hosted build includes it. The ML service receives skills through `contracts/skills.json`.

### 3.3 Data model (PostgreSQL via Prisma)

| Model | Key fields | Notes |
|---|---|---|
| `User` | id, email, name, passwordHash or provider id, createdAt | Managed by the auth library |
| `LearnerProfile` | userId, goal, targetDate, hoursPerWeek, subjects[], selfLevel, preferredLanguage | Written by onboarding |
| `Skill` | id (e.g. `dsa.arrays.two-pointers`), subject, topicSlug, title | Seeded from content |
| `SkillPrerequisite` | skillId, requiresSkillId | Seeded from content |
| `Topic`, `Module`, `Subject` | slug, title, order | Seeded from content |
| `Problem` | id, slug, topicSlug, difficulty, tags[], status, ioMode | Seeded from `meta.json`. Statements load from files |
| `ProblemSkill` | problemId, skillId | Links practice to skills |
| `Submission` | id, userId, problemId, language, code, verdict, timeMs, memoryKb, passedTests, totalTests, createdAt | Hidden test data is never stored here |
| `AssessmentQuestion` | id, skillId, difficulty, type | Seeded from `assessment/*.json` |
| `AssessmentSession` | id, userId, status, startedAt, finishedAt | |
| `AssessmentResponse` | sessionId, questionId, answer, correct, timeMs | |
| `SkillMastery` | userId, skillId, pKnown, attempts, lastUpdated | Output of BKT |
| `TopicProgress` | userId, topicSlug, status (not started, in progress, done), completedAt | |
| `StudyPlan` | id, userId, version, createdAt, startDate, status | New row on every regeneration |
| `PlanItem` | planId, week, day, type (lesson, problem, revision, quiz), refId, skillId, status (pending, done, skipped), reason, minutes | `reason` makes the plan explainable |
| `LearnerEvent` | id, userId, type, payload (JSON), createdAt | The ML training log (see 3.5) |
| `ReadinessSnapshot` | userId, subject, score, band, factors (JSON), modelVersion, createdAt | |

### 3.4 The web to ML contract

The ML service exposes these endpoints. Every one takes the learner state it needs in the request body.

| Endpoint | Purpose | Request carries | Response carries |
|---|---|---|---|
| `GET /health` | Liveness | none | status, model versions |
| `POST /v1/bkt/update` | Update mastery after answers | current `pKnown` per skill, list of observations (skill, correct, hintsUsed, difficulty) | new `pKnown` per skill |
| `POST /v1/assessment/next` | Choose the next diagnostic question | candidate question metadata, answers so far, current mastery | chosen question id, stop flag |
| `POST /v1/assessment/score` | Final mastery from the diagnostic | all responses | `pKnown` per skill, confidence |
| `POST /v1/plan/generate` | Create the 8-week plan | mastery, skills graph, profile (hours, weeks, goal), item catalogue (lessons, problems, minutes) | list of plan items with reasons |
| `POST /v1/plan/adapt` | Replan after progress, struggle or skip | current plan with item statuses, new mastery, recent events | updated future plan items, change summary |
| `POST /v1/readiness/predict` | Estimate interview readiness | learner features or raw aggregates | score, band, per-subject scores, top factors, model version |

The contract is written first as JSON examples in `contracts/examples/`. Member 1 builds against a mock client using those files. Member 2 builds the real service against the same files.

### 3.5 Learner events (the ML training log)

Log these from the first day progress tracking exists. Real data is hard to get later.

| Event type | Payload fields |
|---|---|
| `lesson_viewed` | topicSlug, seconds |
| `topic_completed` | topicSlug |
| `problem_opened` | problemSlug |
| `hint_used` | problemSlug, hintLevel |
| `code_run` | problemSlug, language, passedSamples |
| `code_submitted` | problemSlug, language, verdict, passedTests, totalTests, timeMs |
| `question_answered` | questionId, skillId, correct, timeMs, context (assessment or practice) |
| `assessment_started` / `assessment_finished` | sessionId |
| `plan_generated` | planId, version |
| `plan_item_done` / `plan_item_skipped` | planItemId, skillId |
| `plan_adapted` | planId, trigger (checkpoint, struggle, skip, fast progress) |

---

## Part 4. Roadmap to final completion

Dates assume the stated schedule: initial submission three to four weeks from late September (so around now) and the final submission about two months from late September (late November). Replace these with your real dates. Freeze new features five days before the final deadline.

### Phase 3.5: housekeeping (1 to 2 days)

Owner: Member 1. Members 2 and 3 do their parts in parallel.

1. Merge the Phase 3 work to `test`, then to `main`. Tag `v0.3-phase3`.
2. Confirm the Git root. Create the top-level folders: `contracts/`, `docs/`, `data/` (with `.gitignore` rules for raw and processed data), `content-planning/`.
3. Add `.env.example`, `CODEOWNERS`, the pull request template, and a first `README.md` with run instructions.
4. Add GitHub Actions: `web-ci.yml` (install, `tsc`, lint, build). Add `ml-ci.yml` when the ML skeleton exists.
5. Settle the folder convention: keep `src/features/<feature>/` for feature code and `src/content/` for authored content. Do not add a parallel `src/components/learning/`.
6. Hold a 1-hour meeting (all three) to agree on the skill id format (`<subject>.<module>.<topic>`), the event schema and the contract examples (Part 3.4, 3.5). Member 1 and Member 2 write `contracts/examples/*` and `contracts/events.schema.json` together.

Done when: `main` is tagged, CI runs on a pull request, contracts v0 is merged.

### Phase 4: content system and DSA curriculum (about 1 week)

Owner: Member 1 builds the system. Member 3 authors content. Member 2 is not involved.

Steps for Member 1:

1. Define content schemas with `zod` (a new dependency; explain it in the pull request) for: curriculum, resource list, problem `meta.json`, `tests.json`, assessment question.
2. Write `src/lib/content.ts` to load and index content files at build time.
3. Write `scripts/validate-content.ts`. It must fail on: duplicate slugs, a problem whose `topicSlug` is missing from the curriculum, a runnable problem with fewer than three tests or no hidden test, a topic without a lesson file when marked complete, malformed JSON, or an invalid external URL format.
4. Write `scripts/export-skills.ts` to produce `contracts/skills.json` from the curriculum.
5. Replace the hand-written DSA data in `features/learning/config/curricula.ts` with data derived from `src/content/dsa/curriculum.json`. Derive module, topic and quiz counts from the files.
6. Replace `practice-problems.ts` with problems loaded from `src/content/dsa/problems/*/meta.json`. Mark unfinished ones `reference-only`.
7. Add `pnpm validate:content` to `package.json` and to CI.

Steps for Member 3 (see Part 6 and Part 7.4 for details):

1. Fill the DSA outline sheet and convert it to `curriculum.json`.
2. Write lesson Markdown and the external resource list.
3. Author the first 10 complete problems, then scale up.

Done when: DSA pages render from content files, `pnpm validate:content` passes, and the 10 first problems exist as folders.

### Phase 5: topic pages and Practice workspace UI (about 1 week)

Owner: Member 1 (routing and data), Member 3 (components).

1. Create `/subjects/[subjectSlug]/[topicSlug]`. It shows the lesson Markdown, the resource list (video and article cards labelled as external), a "Practice this topic" list of linked problems, and previous/next topic navigation.
2. Replace the topic drawer with real links to topic pages. Remove `topic-drawer.tsx` once unused.
3. Derive breadcrumb labels from content instead of `ROUTE_LABELS`.
4. Create `/practice/[problemSlug]` with a two-panel workspace: statement on the left, editor on the right, results panel below. The Run and Submit buttons can be disabled until Phase 6.
5. Add the code editor. Use `@monaco-editor/react` or CodeMirror (new dependency; justify and report). Add a language selector.
6. Make the problem list sequence-aware: Practice shows problems grouped by topic and ordered by a `sequence` field, with filters for subject, topic, difficulty and status.
7. Add loading skeletons and an error boundary for these routes.

Done when: a learner can open a topic, read the lesson, click a linked problem, and see the statement with an editor. No fake results appear.

### Phase 6: sandbox with Judge0 (about 1 week)

Owner: Member 1.

1. Add Judge0 and its dependencies to `docker-compose.yml`. On Windows, run Docker through WSL2. If self-hosting fails on your machine, use a hosted Judge0 endpoint temporarily and keep the client behind an environment variable.
2. Write `src/lib/judge0.ts`: create submission, poll or batch results, map language names to Judge0 language ids, normalise verdicts (Accepted, Wrong Answer, Time Limit Exceeded, Runtime Error, Compilation Error).
3. Write `POST /api/practice/run`: runs the code against the visible sample tests only.
4. Write `POST /api/practice/submit`: runs the code against all tests. The route reads `tests.json` on the server. Hidden inputs and outputs never reach the browser. Return only verdict, counts and the first failing visible case.
5. Set time and memory limits from `meta.json`. Allow only the chosen languages (Python, C++, Java, JavaScript).
6. Add rate limiting (`lib/rate-limit.ts`) and a maximum code size.
7. Build the results panel: verdict badge, per-test pass or fail for visible tests, compile error text, time and memory.
8. Validate every runnable problem by running its `solution.py` through the same pipeline in a script, so each problem is proven solvable. Fail the build if a reference solution fails its own tests.

Done when: a learner can run and submit code in Python and C++ for at least 10 problems and gets correct verdicts for correct, wrong, slow and crashing solutions.

### Phase 7: database, authentication, onboarding (about 1 week)

Owner: Member 1 (logic), Member 3 (form UI).

1. Start PostgreSQL (Docker or hosted). Write `prisma/schema.prisma` from Part 3.3. Run the first migration.
2. Write `prisma/seed.ts` to upsert subjects, modules, topics, skills, prerequisites, problems and assessment questions from content files. It must be safe to run repeatedly.
3. Add authentication (register, login, logout, session). Protect `/planner`, `/analytics`, `/assessment`, `/onboarding` and the submit endpoints. Allow reading learning pages without an account if you want an open demo.
4. Build onboarding at `/onboarding`: goal (placement, interview, exam), target date or number of weeks (default 8), hours per week, subjects, self-rated level, preferred language. Save to `LearnerProfile`.
5. Add `lib/env.ts` so the app fails at start-up if a required variable is missing.

Done when: a new user can register, finish onboarding, and the data is in the database.

### Phase 8: progress tracking and event logging (about 4 days)

Owner: Member 1.

1. Add `POST /api/events` and a client helper. Log every event in Part 3.5 from the right places in the UI.
2. Store submissions with verdicts in `Submission`. Add submission history to the problem page.
3. Add topic completion ("Mark as done") and write `TopicProgress`.
4. Replace the 0% progress panel with real values: completed topics divided by total topics for the signed-in user. Keep the honest state for signed-out users.
5. Update the dashboard to show real numbers (streak, problems solved, topics completed) from the database. Remove the remaining placeholder values.
6. Add an export script that writes events as CSV for Member 2 (`scripts/export-events.ts`, output to `data/raw/pilot/`).

Done when: using the app produces rows in `LearnerEvent` and `Submission`, and the dashboard shows only real numbers.

### Phase 9: ML service v1 and mastery integration (about 1 week)

Owner: Member 2 builds the service. Member 1 integrates.

Member 2:

1. Create the `ml-service` skeleton (Part 5.7), health endpoint, Dockerfile, tests, CI.
2. Implement BKT (Part 5.2) with unit tests against hand-computed values.
3. Implement `POST /v1/bkt/update` and the schemas matching `contracts/examples/`.
4. Export `contracts/openapi.json`.

Member 1:

1. Implement `features/adaptive/ml-client.ts` and `mock-ml-client.ts` selected by `ML_MODE=mock|live`.
2. After every graded answer or submission, call BKT update (server side), then write `SkillMastery`. Use the mock first, then switch to live when Member 2's endpoint passes the contract tests.
3. Build a basic mastery view (bars per topic) from `SkillMastery`.

Done when: answering questions changes the mastery bars, through the live ML service.

### Phase 10: diagnostic assessment (about 1 week)

Owner: Member 3 (question bank and UI), Member 1 (backend and session), Member 2 (selection logic).

1. Member 3 authors the multiple-choice bank (Part 6.4): at least four questions per skill, tagged with skill, difficulty and explanation.
2. Member 2 implements `/v1/assessment/next` and `/v1/assessment/score` (Part 5.3).
3. Member 1 creates `AssessmentSession` routes: start, answer, next, finish. Store responses as `AssessmentResponse` and as events.
4. Member 3 builds the runner UI: one question at a time, progress indicator, no going back, result screen with per-skill mastery and a plain explanation of what it means.
5. On finish, call score, store `SkillMastery`, and send the learner to plan generation.

Done when: a new learner finishes a 20 to 30 question diagnostic and sees a mastery profile.

### Phase 11: study plan generation and adaptation (about 1 to 1.5 weeks)

Owner: Member 2 (engine), Member 1 (integration), Member 3 (UI).

1. Member 2 implements the planner (Part 5.5): `/v1/plan/generate` and `/v1/plan/adapt`.
2. Member 1 saves a plan as `StudyPlan` and `PlanItem` rows. A regeneration creates a new version and keeps completed items frozen.
3. Member 3 builds `/planner`: an 8-week overview, a week view, a day view, item cards (lesson, problem, revision, quiz) each showing its `reason`, status controls (mark done, skip), and a "What changed" message after adaptation.
4. Member 1 connects triggers: weekly checkpoint, struggle (repeated failed submissions or low mastery after practice), skipped items, and fast progress.
5. Link plan items to real routes (topic page, problem page, quiz).
6. Enable the "Study Plan" action on curriculum pages.

Done when: finishing the diagnostic produces an 8-week plan, completing and skipping items visibly changes the remaining plan, and every change states a reason.

### Phase 12: readiness prediction and analytics (about 1 week)

Owner: Member 2 (model), Member 1 (integration), Member 3 (charts).

1. Member 2 trains and evaluates the readiness model (Part 5.4), writes the model card, and implements `/v1/readiness/predict`.
2. Member 1 calls it on a schedule or after major events and stores `ReadinessSnapshot`.
3. Member 3 builds `/analytics`: readiness by subject, mastery by topic, activity over time, weak topics. Use shadcn charts or an already-installed chart library; do not add a second one.
4. Show readiness as an estimate with a band and the top contributing factors. Never show it as a guarantee.

Done when: the analytics page shows real data and the readiness card explains itself.

### Phase 13: content breadth (runs in parallel from Phase 4)

Owner: Member 3, with reviews by Member 1.

| Subject | v1 target |
|---|---|
| DSA | Deep: 6 to 8 modules, lessons, resources, 40 to 60 runnable problems, at least four MCQs per skill |
| DBMS, OS, CN, OOPs | Curriculum, lessons for key topics, resource links, at least four MCQs per skill, a few coding or SQL problems where useful |
| Web Development | Curriculum, lessons, resources, a few practical exercises |
| System Design, Data Engineering | Keep as short outlines marked "coming soon" unless time remains |

### Phase 14: hardening, testing, deployment and documentation (final 1.5 weeks)

Owner: all three.

1. Tests: unit tests for content loading and verdict mapping, API tests for submit and plan routes, end-to-end tests for the main flow (register, onboard, assess, plan, solve), and ML tests (Part 5.9). Member 3 owns the manual test checklist and runs it.
2. Security: rate limits on run and submit, no hidden tests in any client response, input size limits, secrets only in environment variables, no `NEXT_PUBLIC_` secrets.
3. Accessibility and responsiveness pass on every route at 360, 768 and 1280 pixels, in light and dark mode.
4. Deployment: web on a Next.js host, Postgres hosted, the ML service on any container host, and Judge0 on a VPS or a hosted API. Write `docs/deployment.md`. Keep a recorded demo video as a fallback in case live hosting fails on the day.
5. Documentation: architecture, database design, API contracts, ML model card, data collection plan, user guide, test report.
6. Final demo script and viva notes (Part 9).

### Stretch: AI tutor with hint ladder

Only if all of the above is done. A Next.js route handler calls an LLM API with the key kept server-side. The system prompt gives a hint ladder: nudge, stronger hint, pseudocode, and only then the full explanation. Each hint logs a `hint_used` event, which feeds BKT and readiness features. The tutor must not paste copyrighted material and must say when it is unsure.

### Timeline summary

| Window | Focus |
|---|---|
| Now to initial submission | Phase 3.5, contracts v0, Phase 4 core, first 10 problems, ML skeleton with BKT unit tests, a mock-data planner screen to show the vision honestly labelled as a prototype |
| Final-deadline minus 5 weeks | Phase 4 finish, Phase 5, Phase 7 start, BKT API, MCQ authoring, synthetic data |
| Minus 4 weeks | Phase 6, Phase 7 finish, Phase 8, readiness feature design, public dataset experiments |
| Minus 3 weeks | Phase 9 integration, Phase 10, pilot recruitment begins |
| Minus 2 weeks | Phase 11, pilot data collection, readiness training |
| Minus 1 week | Phase 12, content fixes, Phase 14 testing |
| Final 5 days | Feature freeze, deployment, documentation, demo rehearsal |

---

## Part 5. The ML system

### 5.1 What to implement

Four components, built in this order:

| # | Component | Type | Needs real data? |
|---|---|---|---|
| 1 | Bayesian Knowledge Tracing (BKT) | Probabilistic model | No to start; improves when fitted |
| 2 | Diagnostic assessment selector and scorer | Algorithm on top of BKT | No |
| 3 | Study plan generator and adapter | Explainable algorithm using mastery, prerequisites and time | No |
| 4 | Readiness prediction model | Trained supervised model | Yes (pilot, public or synthetic data) |

Be clear in your report about which parts are learned from data (BKT parameter fitting, readiness model) and which are rule-based algorithms (planner). Marking the planner as an algorithm and not a trained model is correct and defensible.

### 5.2 Bayesian Knowledge Tracing

Each skill has a hidden state: the learner either knows it or does not. We keep the probability `P(L)` that they know it.

Four parameters per skill:

| Parameter | Meaning | Starting value (to tune) |
|---|---|---|
| `P(L0)` | Probability the learner knew the skill before | 0.2 |
| `P(T)` | Probability of learning the skill after each attempt | 0.15 |
| `P(S)` | Slip: knows it but answers wrongly | 0.10 |
| `P(G)` | Guess: does not know but answers correctly | 0.20 (0.25 for four-option MCQs) |

Update after an observation:

```
If correct:    P(L | obs) = P(L)(1 - S) / [ P(L)(1 - S) + (1 - P(L)) G ]
If incorrect:  P(L | obs) = P(L) S      / [ P(L) S      + (1 - P(L)) (1 - G) ]

Then learning:  P(L_next) = P(L | obs) + (1 - P(L | obs)) T

Predicted chance of a correct answer: P(correct) = P(L)(1 - S) + (1 - P(L)) G
```

Implementation steps (Member 2):

1. Write `bkt/model.py` with pure functions: `update(p_known, correct, params)` and `predict_correct(p_known, params)`. Add the guard `S < 0.3` and `G < 0.3` (or clamp) to avoid the known degenerate fits.
2. Test against hand-calculated values. Example: with `P(L)=0.2, S=0.1, G=0.2, T=0.15`, a correct answer gives `0.2*0.9 / (0.2*0.9 + 0.8*0.2) = 0.5294`, then learning gives `0.5294 + 0.4706*0.15 = 0.6000`. Put that case in `test_bkt.py`.
3. Handle extensions as options, each behind a flag and a test: reduced evidence when the learner used a hint (treat as partial credit), difficulty-adjusted guess and slip, and forgetting (decay `pKnown` toward the prior with a half-life, for revision scheduling).
4. Fit parameters per skill with `bkt/fit.py`: expectation-maximisation on response sequences (the `pyBKT` library is an option; check its current Python-version support before adding it) or a small `scipy` optimiser on log-likelihood. Until enough real data exists, ship default parameters in `artifacts/bkt_params_v1.json`.
5. Evaluate (`bkt/evaluate.py`): predict the next response and report AUC and RMSE on held-out learners against two baselines (global average accuracy, per-skill average accuracy). Report the result even if BKT only matches the baseline.

### 5.3 Diagnostic assessment

Goal: estimate mastery per skill from about 20 to 30 questions without asking everything.

Algorithm (Member 2):

1. Start every skill at its prior (or at a prior shifted by the learner's self-rated level from onboarding).
2. Next question: among unanswered questions, choose the one for the skill with the most uncertainty (`P(L)` closest to 0.5) while keeping coverage across the selected subjects. Prefer difficulty near the current estimate. Add a cap of two to three questions per skill and a minimum coverage rule so every chosen subject is touched.
3. After each answer, run the BKT update for that skill.
4. Stop at a fixed number of questions, or earlier if all skills are confident (`P(L) < 0.15` or `> 0.85`).
5. `score` returns `pKnown` per skill and a confidence value (higher when more answers were seen).
6. Skills never asked about inherit a estimate from prerequisites (if a prerequisite is weak, cap the dependent skill), and are flagged "not directly measured".

Data needed: the MCQ bank (Part 6.4) with skill, difficulty, correct answer. Question quality drives everything here, so review the questions as a team.

### 5.4 Readiness prediction model

**Question it answers:** given what the learner has done, how likely are they to be ready for a technical interview in this subject?

**Label (target) options, pick one and document it:**

| Option | Definition | Source |
|---|---|---|
| A (recommended) | `ready = 1` if the learner scores at or above a threshold (for example 70%) on a held-out mock test that the learner did not practise on | Pilot users |
| B | Self-reported or peer-reviewed mock interview score, converted to a threshold | Pilot users |
| C | Synthetic label from a simulator's hidden ability | Simulator |

**Features** (computed per learner and subject by `readiness/features.py`):

- Mean, minimum and weighted mastery (BKT) across the subject's skills; share of skills above 0.8.
- Coverage: share of topics completed; share of problems attempted.
- Accuracy overall and on medium or hard problems; first-attempt solve rate.
- Attempts per solved problem; hints used per problem; share of solved problems with no hint.
- Median time per solved problem relative to the problem's median.
- Consistency: active days in the last 14 days, longest streak.
- Recency: days since last activity, mastery decay estimate.
- Assessment performance: diagnostic result and improvement since.
- Plan adherence: share of planned items completed and skipped.

**Models to compare:** (1) a heuristic baseline (average mastery above a threshold), (2) logistic regression, (3) gradient boosting (`scikit-learn`). Keep the simplest model that performs close to the best.

**Evaluation (`readiness/evaluate.py`):**

- Split by learner, never by row, so one learner's records are not in both training and test sets.
- Use stratified cross-validation because datasets will be small.
- Report AUC, precision, recall, F1, Brier score and a calibration plot. Compare to the baseline.
- Explain predictions: coefficients for logistic regression or permutation importance or SHAP for boosting, and return the top three factors to the web app in plain language ("low mastery in graphs", "few active days").

**Honest data position:**

- A trained readiness model needs labelled examples. You will not have large real data. Plan for three layers: (1) public datasets to validate the BKT pipeline, (2) a synthetic learner simulator to build and test the full readiness pipeline, (3) a pilot study of classmates (aim for 30 to 60 learners) to get real labels.
- Label every artifact with its data source (`synthetic`, `public`, `pilot`) in the model card. If the final model is trained mostly on synthetic data, say so in the report, show pilot results separately, and describe the model as a proof of pipeline rather than a validated predictor. That is acceptable and honest; claiming otherwise is not.

**Model card (`artifacts/model_card.md`):** purpose, label definition, data sources and sizes, features, metrics with confidence intervals, limitations, intended use, and what the score must not be used for.

### 5.5 Study plan generation and adaptation

This is an explainable planner, not a black-box model.

**Inputs:** mastery per skill, prerequisite graph, item catalogue (lessons and problems with estimated minutes and skill ids), learner profile (weeks, hours per week, goal, target subjects), and recent events.

**Generation (`planner/`):**

1. Compute a priority for each skill: `priority = subject_weight x importance x (1 - mastery) x unlock_factor`. `importance` comes from the curriculum (core topics higher). `unlock_factor` is lower when prerequisites are weak, so prerequisites are scheduled first.
2. Order skills by priority with a topological constraint from the prerequisite graph.
3. For each skill, build a standard sequence: lesson, two to four problems of rising difficulty, then a short quiz.
4. Fill the weekly time budget (hours per week times 60 minutes) day by day. Reserve about 15 to 20 percent for revision of skills whose mastery decayed.
5. End every week with a checkpoint quiz covering that week's skills.
6. Attach a `reason` string to every item ("Arrays: your mastery is 0.32 and it unlocks sorting").

**Adaptation (`planner/adapt.py`):**

| Trigger | Detection | Response |
|---|---|---|
| Checkpoint | End of week | Recompute mastery, regenerate the remaining weeks. Completed items stay frozen |
| Struggle | Three or more failed submissions on a problem, heavy hint use, or mastery still below threshold after planned practice | Insert a remedial lesson and easier problems, delay dependent skills, record the reason |
| Skip | Item skipped or day missed | Reschedule the item later with lower priority. After repeated skips, reduce daily load about 20 percent and say so |
| Fast progress | Mastery above target early | Pull forward later skills or add harder problems |
| Long gap | No activity for several days | Add revision items and reduce the next week's new material |

Each adaptation returns a short "what changed and why" message that the UI displays.

**Why this design:** it works from day one without data, it can be tested with plain unit tests, and a viva panel can follow every decision. A learned component (for example predicting which items a learner will skip) is an optional stretch once pilot data exists.

### 5.6 Recommendations

Practice recommendations come from the same machinery: for a learner, rank problems by `1 - P(correct)` closeness to a target success rate (around 0.6 to 0.7), restricted to unlocked skills. Expose this as a "Recommended next" list in Practice. Build it after the planner; it reuses `bkt.predict_correct`.

### 5.7 ML service structure and responsibilities

The tree is in Part 3.2. Responsibilities in short:

| Path | Responsibility |
|---|---|
| `schemas/` | pydantic models. These are the contract and generate `contracts/openapi.json` |
| `api/routes/` | Thin HTTP handlers that validate input and call the logic |
| `bkt/` | Update equations, parameters, fitting, evaluation |
| `assessment/` | Next-question selection and final scoring |
| `planner/` | Prerequisite graph, priorities, scheduler, adaptation, revision |
| `readiness/` | Features, dataset assembly, training, prediction, explanations |
| `data/` | Loaders for public and pilot data, the learner simulator, synthetic generation |
| `scripts/` | Reproducible commands for generating data, fitting and training |
| `artifacts/` | Small versioned outputs: parameters, metrics, model card |
| `tests/` | Unit, API and contract tests |

Engineering rules for the ML service:

- Use a virtual environment and pin versions in `requirements.txt` or `pyproject.toml`. Use `ruff` for linting and `pytest` for tests.
- Every endpoint returns a `modelVersion`, and the web app stores it.
- Set a random seed in every training script so results are reproducible.
- No notebook is the only place where a result exists. Notebooks explore; scripts produce the final artifacts.
- Validate input with pydantic and return clear 4xx errors.
- Log request ids and timings, but never log learner personal data.

### 5.8 Connecting ML to the web app

1. Environment variables in the web app: `ML_MODE` (`mock` or `live`), `ML_SERVICE_URL`, `ML_API_KEY`.
2. `features/adaptive/ml-client.ts` exposes typed functions (`updateMastery`, `nextQuestion`, `scoreAssessment`, `generatePlan`, `adaptPlan`, `predictReadiness`). `mock-ml-client.ts` returns the example files from `contracts/`.
3. All ML calls happen on the server (route handlers or server actions). The browser never talks to the ML service, and the ML key never reaches the client.
4. Calls have a timeout. If the ML service is down, the web app degrades gracefully: mastery stays as last stored, the planner shows the existing plan with a notice, and the readiness card shows "unavailable".
5. Contract tests run in CI on both sides: the web app validates the example responses against its TypeScript types, and the ML service validates its output against the same examples.
6. Generate TypeScript types from `contracts/openapi.json` (for example with `openapi-typescript`, a dev dependency; justify it) so the two sides cannot drift.
7. Move from mock to live endpoint by endpoint, starting with BKT update.

### 5.9 ML testing and evaluation checklist

| Area | Tests |
|---|---|
| BKT | Hand-computed update cases; probabilities stay in [0, 1]; monotonic behaviour (correct answers do not lower mastery); parameter bounds enforced |
| Assessment | Never repeats a question; respects coverage and the per-skill cap; stops at the limit |
| Planner | Never schedules a skill before an unmet prerequisite; total minutes per week within budget; completed items unchanged after adaptation; every item has a reason; skipping reschedules rather than drops |
| Readiness | No learner in both train and test; prediction stays in [0, 1]; metrics reproduce with the stored seed |
| API | Schema validation, error responses, contract examples round trip |

### 5.10 Order of work for the ML member

1. Skeleton, CI, health endpoint.
2. BKT functions and tests.
3. Contract schemas and the BKT endpoint.
4. Learner simulator and synthetic data.
5. Public dataset loader and BKT fitting experiment.
6. Assessment selector and scorer.
7. Planner generate, then adapt.
8. Readiness features, training, evaluation, model card, endpoint.
9. Retrain on pilot data when it arrives.

---

## Part 6. Data collection

### 6.1 Inventory

| # | Data | Purpose | Format | Location | Author | Validator | Used by |
|---|---|---|---|---|---|---|---|
| 1 | Curriculum outline (subjects, modules, topics, order, minutes, prerequisites) | Learning Paths, skills | Excel for planning, then JSON | `src/content/<subject>/curriculum.json` | Member 3 | `validate-content.ts` | Web, planner, ML (via skills) |
| 2 | Skills and prerequisites | BKT, planner | Generated JSON | `contracts/skills.json` | Generated | Script | ML service |
| 3 | Lessons | Theory | Markdown | `src/content/<subject>/lessons/<module>/<topic>.md` | Member 3 | Presence check | Web |
| 4 | External resources (videos, articles) | Learning Paths | JSON | `src/content/<subject>/resources.json` | Member 3 | URL format, `check-links.ts` | Web |
| 5 | Practice problems | Practice, sandbox | Folder per problem | `src/content/<subject>/problems/<slug>/` | Members 3 and 1 | `validate-content.ts`, reference-solution run | Web, sandbox |
| 6 | Assessment questions (MCQ) | Diagnostic, checkpoint quizzes | CSV for entry, JSON final | `src/content/assessment/<subject>.questions.json` | Member 3 | `validate-content.ts` | Web, ML selector |
| 7 | Learner events | ML training log | Database table, CSV export | `LearnerEvent`; export to `data/raw/pilot/` | Generated by the app | Event schema | ML |
| 8 | Pilot study table (labels) | Readiness training | CSV | `data/raw/pilot/` | Member 3 runs, anonymised | Column check | ML |
| 9 | Public dataset | BKT validation | CSV as published | `data/raw/public/` (not committed) | Member 2 | Loader checks | ML |
| 10 | Synthetic data | Pipeline development | CSV or Parquet | `data/synthetic/` (not committed) | Member 2 | Seeded generator | ML |

### 6.2 Formats and schemas

**Skill id convention:** `<subject>.<module-slug>.<topic-slug>`, for example `dsa.arrays.two-pointers`. Slugs are lowercase, hyphenated and permanent.

**Curriculum row (Excel columns before conversion):**
`subject, module_slug, module_title, module_order, topic_slug, topic_title, topic_order, goal, prerequisites (semicolon-separated skill ids), minutes`

**Resource entry (`resources.json`):**
```json
{
  "topicSlug": "two-pointers",
  "items": [
    {
      "type": "video",
      "title": "Two pointers explained",
      "url": "https://example.com/...",
      "source": "channel or site name",
      "durationMin": 18,
      "language": "en",
      "level": "beginner",
      "lastChecked": "2026-10-20"
    }
  ]
}
```
Resources are links to external sites and are labelled as external. Do not copy their text or embed their files.

**Problem `meta.json`:**
```json
{
  "id": "dsa-0007",
  "slug": "pair-with-target-sum",
  "title": "Pair with target sum",
  "subject": "dsa",
  "topicSlug": "two-pointers",
  "skillIds": ["dsa.arrays.two-pointers"],
  "difficulty": "Easy",
  "sequence": 3,
  "tags": ["array", "two-pointers"],
  "ioMode": "stdin",
  "status": "runnable",
  "timeLimitMs": 2000,
  "memoryLimitMb": 256,
  "hints": ["Think about what a sorted order lets you rule out.", "..."],
  "starterCode": { "python": "...", "cpp": "...", "java": "...", "javascript": "..." },
  "references": [ { "label": "Related problem (external)", "url": "https://..." } ]
}
```

**`tests.json`:**
```json
[
  { "input": "5 9\n1 2 4 7 11", "expected": "2 3", "hidden": false },
  { "input": "2 3\n1 2", "expected": "0 1", "hidden": true }
]
```
Every runnable problem needs at least three tests, at least one visible and two hidden, including edge cases (empty or single input, duplicates, negatives, the maximum size).

**`statement.md`:** your own wording; sections: Problem, Input format, Output format, Constraints, Examples with explanations.

**MCQ question (assessment):**
```json
{
  "id": "q-dsa-0001",
  "skillId": "dsa.arrays.two-pointers",
  "difficulty": 2,
  "stem": "A sorted array and a target sum are given. ...",
  "options": ["O(n^2)", "O(n log n)", "O(n)", "O(1)"],
  "answerIndex": 2,
  "explanation": "...",
  "tags": ["complexity"]
}
```
Excel columns for bulk entry: `id, skill_id, difficulty (1-5), stem, option_a, option_b, option_c, option_d, correct (A-D), explanation`.

**Pilot study tables (CSV, anonymised ids):**

| File | Columns |
|---|---|
| `learners.csv` | `learner_id, year, self_level (1-5), hours_per_week, goal, joined_at` |
| `responses.csv` | `learner_id, question_id, skill_id, correct (0/1), time_ms, hints_used, context, timestamp` |
| `submissions.csv` | `learner_id, problem_id, language, verdict, passed_tests, total_tests, time_ms, attempt_no, timestamp` |
| `labels.csv` | `learner_id, subject, mock_score_pct, ready (0/1), assessed_at, assessor` |

Public dataset notes: candidates for validating BKT are educational response-log datasets such as ASSISTments exports or the KDD Cup 2010 sets. They are for non-CS skills, so use them only to test and tune the fitting pipeline, not to claim anything about DSA mastery. Check each dataset's licence and citation requirements before use, and cite them in the report.

### 6.3 How to collect it (step by step)

1. **Plan in Excel (Member 3).** Use `content-planning/templates/` to create the outline, problem list and MCQ sheets. Fill one subject at a time.
2. **Convert (Member 1 writes the scripts, Member 3 runs them).** `csv-to-problem-stubs.ts` creates one folder per problem with empty `statement.md`, `meta.json` and `tests.json`. `csv-to-questions.ts` creates the assessment JSON. Export the Excel sheets as CSV (UTF-8) first.
3. **Author in VS Code.** Fill statements, tests and lessons. Work on a content branch off `test`.
4. **Validate.** Run `pnpm validate:content` before every pull request. Fix every error.
5. **Review.** One other member reads each pull request. For problems, the reviewer runs the reference solution on all tests.
6. **Seed.** `pnpm prisma db seed` loads content into the database. Re-run after content merges.
7. **Check links.** Run `scripts/check-links.ts` weekly and replace dead resource links.
8. **Collect learner data** by using the app (events and submissions are logged automatically).
9. **Pilot study.** (Member 3 runs logistics, Member 2 specifies columns.)
   - Prepare a one-paragraph consent text: what is collected, that it is anonymous, that it is used for a college project, and that participation is voluntary.
   - Recruit 30 to 60 classmates. Ask them to take the diagnostic, use the app for one to two weeks, then take a short held-out mock test that you prepare separately (this produces the label).
   - Export events with `export-events.ts` and the mock results from a form or sheet, then replace names and emails with random ids before the files go into `data/raw/pilot/`.
10. **Keep raw data out of Git.** `data/raw/`, `data/processed/` and `data/synthetic/` are in `.gitignore`. Commit only small anonymised samples and the README that explains how to regenerate the rest.

### 6.4 Files to create for the data pipeline

| File | Owner | Purpose |
|---|---|---|
| `content-planning/templates/topics.xlsx`, `problems.xlsx`, `mcq.xlsx` | Member 3 | Entry templates with the exact column names above |
| `my-app/src/lib/content.ts` | Member 1 | Loads and indexes content |
| `my-app/scripts/validate-content.ts` | Member 1 | Schema and cross-reference checks |
| `my-app/scripts/export-skills.ts` | Member 1 | Writes `contracts/skills.json` |
| `my-app/scripts/csv-to-problem-stubs.ts` | Member 1 | Rows to problem folders |
| `my-app/scripts/csv-to-questions.ts` | Member 1 | MCQ CSV to JSON |
| `my-app/scripts/check-links.ts` | Member 1 | Detects dead resource URLs |
| `my-app/scripts/export-events.ts` | Member 1 | Event and submission export for ML |
| `my-app/prisma/seed.ts` | Member 1 | Idempotent database seeding |
| `docs/content-authoring-guide.md` | Member 3 | How to add a topic, problem or question, with examples |
| `docs/data-collection-plan.md` | Member 3 | Pilot plan, consent text, anonymisation steps |
| `data/README.md` | Member 2 | What each data folder contains and how to regenerate it |
| `ml-service/src/arcanum_ml/data/simulator.py`, `synthetic.py` | Member 2 | Synthetic learners |
| `ml-service/src/arcanum_ml/data/loaders.py` | Member 2 | Public and pilot loaders |
| `ml-service/scripts/make_synthetic.py` | Member 2 | One command to generate synthetic data |
| `ml-service/scripts/download_public_data.md` | Member 2 | Download steps and licence notes |

### 6.5 Synthetic data (design notes for Member 2)

Build a simulator so the full pipeline can be developed before real data exists:

1. Draw each learner's latent ability and per-skill initial knowledge from distributions; draw a study intensity.
2. For each simulated attempt, apply a BKT-like generator: correct with probability from the current hidden knowledge, then update the hidden state with a learning chance.
3. Add realistic noise: hint use, time per problem, skipped days.
4. Define the readiness label from the hidden state plus noise, and write the formula in the model card.
5. Generate a few hundred learners. Keep the seed fixed.

Synthetic data can show the pipeline works and that BKT can recover known parameters (a good test: fit on simulated data and check that the fitted parameters are close to the true ones). It cannot prove the model predicts real students.

### 6.6 Data quality rules

- Every slug and id is unique and permanent.
- Every topic, problem and question links to an existing skill.
- Every runnable problem has a working reference solution, and expected outputs come from running it.
- Statements and lessons are written in your own words. Do not copy text, test data or editorials from other sites.
- External links open in a new tab and are labelled external.
- Content marked incomplete is shown as "Coming soon" or "Reference only", never as finished.
- No learner emails, names or IP addresses in any ML data file.

---

## Part 7. Team plan

Roles are named by number. Each member owns specific folders to keep merges clean.

| Member | Role | Owns |
|---|---|---|
| Member 1 | Full-stack lead: everything except ML | `my-app/` (except UI components in Member 3's list), `prisma/`, `docker-compose.yml`, `infra/`, `.github/`, `contracts/` (jointly with Member 2) |
| Member 2 | ML engineer | `ml-service/`, `data/`, `contracts/examples` and `openapi.json` (jointly with Member 1), `docs/adaptive-learning.md`, `docs/ml-model-card.md` |
| Member 3 | Frontend, content, data collection, documentation. No ML code | UI components in `features/*/components`, `content-planning/`, `my-app/src/content/`, `docs/` (except ML docs), `README.md`, test checklists |

Member 3 does not write or change anything under `ml-service/`.

### 7.1 Working agreement

- Branches: `main` (deployable), `test` (integration). Create feature branches from `test` and name them `m1/<topic>`, `m2/<topic>`, `m3/<topic>`.
- Pull requests target `test`. Another member reviews. `test` goes to `main` at the end of each phase.
- `CODEOWNERS` assigns review automatically by folder.
- Commit messages: `feat(practice): add problem workspace`, `fix(content): ...`.
- Contract changes (`contracts/`) need approval from both Member 1 and Member 2.
- A 15-minute stand-up every two days, and a 45-minute integration check at the end of each week.
- Every pull request states what was run (`tsc`, lint, build, `pnpm validate:content`, `pytest`) and the result.

### 7.2 Dependency map and handoffs

Every dependency has a mock, so nobody waits.

| # | Handoff | From | To | What is handed over | Needed by | Fallback until it arrives |
|---|---|---|---|---|---|---|
| H1 | Contracts v0 | Members 1 and 2 | Everyone | `contracts/examples/*`, `events.schema.json`, skill id convention | Day 1 | None needed; this is the first task |
| H2 | DSA curriculum outline and skill list | Member 3 | Members 1 and 2 | Outline sheet, then `curriculum.json`, then `contracts/skills.json` | End of week 1 | Member 2 uses a placeholder list of 30 DSA skills; Member 1 uses the existing `curricula.ts` |
| H3 | Content schemas and validator | Member 1 | Member 3 | `validate-content.ts`, schema docs | Start of week 2 | Member 3 authors in the documented format and validates by hand |
| H4 | UI types for assessment and plan | Member 1 and Member 2 | Member 3 | TypeScript types from `contracts/examples` | Day 2 | Member 3 builds components with local prop types against the example JSON |
| H5 | BKT endpoint live | Member 2 | Member 1 | `/v1/bkt/update`, `openapi.json` | End of week 2 | Member 1 uses `mock-ml-client.ts` |
| H6 | Database and seed running | Member 1 | Member 3 | `docker compose up`, `pnpm prisma db seed` | Week 2 | Member 3 develops with content files and fixtures |
| H7 | MCQ bank for DSA | Member 3 | Members 1 and 2 | `dsa.questions.json` (at least four per skill) | Week 3 | Member 2 uses simulated questions; Member 1 uses a 10-question sample |
| H8 | Events logged and exportable | Member 1 | Member 2 | `LearnerEvent` rows, `export-events.ts`, schema | Start of week 3 | Member 2 continues on synthetic data |
| H9 | Planner endpoints live | Member 2 | Member 1 and Member 3 | `/v1/plan/generate`, `/v1/plan/adapt` | Week 4 | Member 3 builds the planner UI on `plan-generate.response.json`; Member 1 uses the mock client |
| H10 | Pilot data | Member 3 (logistics), Member 1 (export) | Member 2 | Anonymised CSVs | Week 4 | Model trained on synthetic data, clearly labelled |
| H11 | Readiness endpoint live | Member 2 | Member 1 and Member 3 | `/v1/readiness/predict` | Week 5 | Analytics page uses the mock and a "preview" label |

Fallback plan if Member 2 falls behind: Member 1 can implement a basic TypeScript version of BKT and a greedy planner behind the same client interface so the product demo still works. This should be the last resort and is the reason the client interface is the only integration point.

### 7.3 Who must finish what for the next person

| Next step | Requires, from | What exactly |
|---|---|---|
| Member 3 can author problems in the final format | Member 1 | Problem and test schemas documented (H3) |
| Member 1 can seed and display real DSA content | Member 3 | At least one complete module in the agreed format (H2) |
| Member 2 can test BKT on the real skill list | Member 3 and Member 1 | `skills.json` generated from the curriculum (H2) |
| Member 1 can switch ML from mock to live | Member 2 | BKT endpoint passing contract tests (H5) |
| Member 2 can fit BKT and train readiness on real data | Member 1 and Member 3 | Event export (H8) and pilot labels (H10) |
| Member 3 can build the real planner screen | Member 1 and Member 2 | Plan item types (H4) and live endpoint for final testing (H9) |
| Final deployment | All three | Phase 12 complete and tests green |

### 7.4 What each member starts immediately (no waiting)

#### Member 1: first five working days

Day 1
- Merge Phase 3 to `test` and `main`, tag it.
- Check the Git root, create `contracts/`, `docs/`, `data/`, `content-planning/` and the ignore rules.
- Meeting with Members 2 and 3: skill id convention, event schema.
- With Member 2, write `contracts/examples/*` and `events.schema.json`.

Day 2
- `.env.example`, `CODEOWNERS`, pull request template, `web-ci.yml`, README skeleton.
- Add zod and write the content schemas (curriculum, resources, problem, tests, question).
- Publish the schema notes for Member 3.

Day 3 to 4
- Write `lib/content.ts`, `validate-content.ts`, `export-skills.ts`.
- Convert the DSA curriculum in `curricula.ts` to read from `src/content/dsa/curriculum.json` (start with the existing structure so nothing breaks).
- Remove the hardcoded quiz count; derive it from content.

Day 5
- Write `features/adaptive/ml-client.ts` and `mock-ml-client.ts` from the contract examples.
- Start the Docker Compose file with PostgreSQL and the Prisma schema.

Nothing in these days depends on Member 2 or Member 3.

#### Member 2: first five working days

Day 1
- Meeting and contract writing with Member 1 (the only shared task).
- Create `ml-service/` skeleton: `pyproject.toml`, virtual environment, `ruff`, `pytest`, `main.py` with `/health`, Dockerfile.

Day 2
- Implement `bkt/model.py` with `update` and `predict_correct`, and the hand-calculated tests.
- Add parameter bounds and default parameters in `bkt/params.py`.

Day 3
- Write pydantic schemas matching the contract examples and implement `POST /v1/bkt/update`.
- Add `tests/contract/` that validates the examples against the schemas.
- Run `export_openapi.py` to write `contracts/openapi.json`.

Day 4
- Build `data/simulator.py` using a placeholder list of 30 skills with a few prerequisites. Generate synthetic response sequences.
- Write `bkt/fit.py` and a test that recovers known parameters from simulated data.

Day 5
- Download one public dataset, write the loader, run a first BKT fit and the AUC/RMSE comparison against baselines. Record results in a notebook and `metrics_v0.json`.

Nothing in these days depends on Member 1's app or Member 3's content.

#### Member 3: first five working days

Day 1
- Join the meeting. Create Excel templates for topics, problems and MCQs with the exact column names in Part 6.2. Save them in `content-planning/templates/`.
- Decide the DSA module list with Member 1 (use the checklist: six modules for v1).

Day 2
- Fill the DSA outline sheet: modules, topics, order, goal, prerequisites, minutes.
- Start `docs/content-authoring-guide.md`.

Day 3
- Write lessons for the first two modules in Markdown (explanation, pattern or pseudocode, complexity, common mistakes, worked example).
- Collect two to four external resources per topic into the resource sheet.

Day 4
- Build UI components against example JSON (no backend): assessment question card, progress indicator, result summary, plan week view, plan item card, empty and loading states. Use only installed shadcn components and the existing theme. Put them in `features/assessment/components` and `features/planner/components`.

Day 5
- Fill the problem sheet for the first two modules (title, topic, difficulty, tags, idea). Draft the first five problem statements in your own words.
- Write the first 20 MCQs for DSA.

Nothing in these days depends on Member 1's database or Member 2's service. When Member 1 publishes the schemas (Day 2), Member 3 converts the sheets to the final folder format.

### 7.5 Task split by phase

| Phase | Member 1 | Member 2 | Member 3 |
|---|---|---|---|
| 3.5 Housekeeping | Git, CI, env, structure | Contract examples, ML skeleton | Excel templates, README draft |
| 4 Content system | Schemas, loader, validator, export script | Simulator, BKT | Outline, lessons, resources, first 10 problems |
| 5 Topic and practice UI | Routes, breadcrumbs, content wiring | BKT tests and fitting | Topic page components, problem workspace layout, results panel UI, skeletons |
| 6 Sandbox | Judge0, run and submit routes, limits | Assessment selector | More problems, tests and reference solutions; manual test of verdicts |
| 7 Database and auth | Prisma, seed, auth, onboarding logic | Assessment scorer, public data experiments | Onboarding form UI, login and register UI, MCQ authoring |
| 8 Progress and events | Event API, submissions, progress, dashboard data | Readiness features design | Progress widgets, dashboard cleanup UI, content |
| 9 ML integration | Client, mastery storage | BKT service live, parameters v1 | Mastery bars UI |
| 10 Assessment | Session routes and storage | Next and score endpoints | Runner UI, MCQ bank, result screen |
| 11 Study plan | Plan storage, triggers, wiring | Planner generate and adapt | Planner UI, "what changed" messages |
| 12 Readiness and analytics | Snapshot job, integration | Training, evaluation, model card, endpoint | Analytics charts, readiness card, pilot logistics |
| 13 Other subjects | Review | Not involved | DBMS, OS, CN, OOPs, Web content |
| 14 Hardening | Security, deployment, e2e tests | ML tests, retrain with pilot data | Manual QA checklist, documentation, demo video |

---

## Part 8. Risks and scope control

| Risk | Impact | Mitigation |
|---|---|---|
| Too much content for three people | Half-finished curriculum | DSA deep, other subjects shallow. Show unfinished items as "Coming soon" |
| Judge0 will not run on a Windows machine | Practice stays disabled | Use WSL2 for Docker; fall back to a hosted Judge0 endpoint behind an environment variable |
| Not enough real data for the readiness model | Weak or invalid model | Three-layer data plan, label data sources, report honestly, show baseline comparison |
| ML member blocked or behind | No adaptive features | Contract-first with a mock client; TypeScript fallback planner as last resort |
| Merge conflicts in shared files | Lost work | Folder ownership, small pull requests, `CODEOWNERS` |
| Hidden tests leak to the browser | Cheating, broken grading | Test files read on the server only; review every route response |
| External links die | Broken learning paths | Weekly `check-links.ts`, `lastChecked` field |
| Copyright problems | Legal and academic risk | Own wording for all statements and lessons; links only to external pages; cite datasets |
| Live demo fails | Lost marks | Recorded demo video, seeded demo account, offline-capable demo data |
| Scope creep (contests, sheets, AI tutor) | Missed deadline | These stay out of v1. AI tutor is stretch only |

---

## Part 9. Definition of done and demo checklist

The project is complete when a new user can do all of the following without any developer help:

1. Register, log in and finish onboarding (goal, weeks, hours, subjects).
2. Take the diagnostic and see a per-skill mastery profile.
3. Receive an 8-week plan where every item shows a reason.
4. Open a topic, read the lesson, use the external resources, and open linked practice.
5. Solve a problem in the in-app editor, run samples, submit, and see an honest verdict.
6. Skip items and fail problems, and see the plan change with an explanation.
7. See progress, mastery and a readiness estimate (with band and top factors) on real data.

Final checks:

- [ ] `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm build`, `pnpm validate:content` pass.
- [ ] `pytest` and contract tests pass for the ML service.
- [ ] Every runnable problem passes its own reference solution through the sandbox.
- [ ] No hidden test data appears in any browser response.
- [ ] No fake numbers anywhere: every metric comes from content files or the database.
- [ ] Every page works at 360, 768 and 1280 pixels, in light and dark mode, with keyboard navigation.
- [ ] Model card, data collection plan, architecture and API docs are written.
- [ ] Data sources (synthetic, public, pilot) are stated clearly in the report.
- [ ] A recorded demo video and a seeded demo account exist.
- [ ] Viva notes cover: why BKT, the BKT equations, how the planner decides, how the readiness label was defined, what the metrics mean, what the limitations are.

### Viva notes outline (Member 2 and Member 1 write together)

- Why BKT instead of a simple percentage: it models learning and guessing and updates per answer.
- Why the planner is rule-based: explainable, testable, and works without data; ML is used where labels exist.
- How the readiness label was defined and why the model is described as an estimate.
- What was trained on synthetic data and what on pilot data.
- What would change with more data: fit BKT per skill, calibrate readiness, learn skip prediction.

---

## Appendix A. Example plan item (contract shape)

```json
{
  "id": "pi-0042",
  "week": 2,
  "day": 3,
  "type": "problem",
  "refId": "pair-with-target-sum",
  "skillId": "dsa.arrays.two-pointers",
  "minutes": 25,
  "status": "pending",
  "reason": "Two pointers: mastery 0.34. It unlocks sorting and sliding window."
}
```

## Appendix B. Example adaptation response

```json
{
  "planVersion": 3,
  "trigger": "struggle",
  "changes": [
    { "action": "insert", "itemId": "pi-0090", "summary": "Added a short lesson on pointers before the next problem" },
    { "action": "delay", "itemId": "pi-0055", "summary": "Sliding window moved one week later" }
  ],
  "message": "You missed the last three attempts on pair-with-target-sum, so we added a short lesson and moved sliding window later by a week.",
  "modelVersion": "planner-1.0"
}
```

## Appendix C. Commands to keep handy (PowerShell)

```
# Web app
cd my-app
pnpm install
pnpm dev
pnpm exec tsc --noEmit
pnpm lint
pnpm validate:content
pnpm build
pnpm prisma migrate dev
pnpm prisma db seed

# ML service
cd ml-service
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
pytest
ruff check .
uvicorn arcanum_ml.main:app --reload --port 8000

# Services
docker compose up -d
```

Adjust command names to match the scripts you actually add to `package.json`.
