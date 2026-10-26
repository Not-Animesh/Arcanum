# Team Plan

Task ownership by member, matched phase-by-phase to [`docs/roadmap.md`](roadmap.md) — "Week 3" here covers exactly what "Week 3" there describes. This doc answers *who* and *at what difficulty*; the roadmap answers *what*.

## Team Profile

| Member | Level | Handles |
|---|---|---|
| **Member A** | Advanced | Backend architecture, the ML/BKT + readiness engine, API design, deployment, unblocking B and C |
| **Member B** | Intermediate | Feature integration, DB schema work, mid-complexity frontend, content/question data pipelines |
| **Member C** | Beginner | Static/presentational UI components (from a given design/spec), content and question data entry, docs sections, guided CRUD forms, QA/manual testing checklists |

## Hard Limits for Member C

These are not soft suggestions — do not assign Member C anything from these categories, even "just this once":

- ❌ Authentication or session logic
- ❌ Defining or changing API contracts (route shapes, request/response schemas)
- ❌ Any ML/BKT/readiness-model logic
- ❌ Deployment configuration (env vars, hosting setup, CI)

Every task assigned to Member C below is written as a **checklist**, not an open-ended spec — if a Member C task in practice starts requiring judgment calls about how something should work, stop and hand the decision to A or B, then hand back a narrower checklist.

## Week 1 — Scaffold & Setup

| Member | Tasks |
|---|---|
| **A** | Repo scaffold (`web/` + `ml-service/`), Postgres schema + Prisma migrations, Clerk auth wiring, Vercel + Render deployment skeletons, branch protection on `main` |
| **B** | Base dashboard shell (sidebar, header, dark-mode toggle) from `docs/design.md` tokens; ESLint/Prettier/black/ruff config setup |
| **C** | 1. Clone the repo, install dependencies, confirm the dev server runs locally — screenshot as proof.<br>2. Read `docs/product.md` and `docs/design.md`.<br>3. Start collecting raw question material for DSA/DBMS/OOPs/CN/OS from textbooks/past papers into a shared sheet (for Week 2 entry) — content only, no formatting into the app yet. |

## Week 2 — Content & Basic Practice Flow

| Member | Tasks |
|---|---|
| **A** | `Question`/`Attempt` migrations, `POST /api/attempts` route with validation |
| **B** | Subject/topic listing pages, MCQ practice UI, `GET /api/subjects` and `GET /api/topics/:id/questions` |
| **C** | 1. Take the Week 1 question sheet and enter 20–30 questions per subject into the seed file, following the exact template B provides (topic, prompt, options, correct answer, difficulty).<br>2. Flag any question you're unsure about instead of guessing.<br>3. Have B or A spot-check your first 5 entries before doing the rest. |

## Week 3 — Mastery Engine v1

| Member | Tasks |
|---|---|
| **A** | FastAPI skeleton, BKT update logic at `/mastery/update` per `docs/adaptive-engine.md`, wiring from `web/` |
| **B** | Recommendation UI (show next-best topic), integrate mastery result into the practice flow, review remaining seed content |
| **C** | 1. Finish any remaining question entry from Week 2.<br>2. Build the question-card and answer-option presentational components in `components/` using the exact shadcn primitives and spacing B specifies — no new logic, just markup/styling.<br>3. Write a step-by-step manual test checklist for "answer a question → confirm it saves → confirm mastery updates," and run it yourself, logging what you find. |

## Week 4 — Dashboard, MVP Deploy, Initial Submission

| Member | Tasks |
|---|---|
| **A** | `/api/mastery` endpoint, deployment hardening, fix integration bugs, unblock B/C |
| **B** | Dashboard UI: mastery heatmap (Card grid) and readiness-score widget (Progress + Badge) per `docs/design.md` |
| **C** | 1. Run the full manual QA checklist from Week 3 across all five subjects, logging any bug with steps to reproduce.<br>2. Take screenshots of each working screen for the submission report.<br>3. Draft the plain-language report sections describing what the app does (not the ML internals) for A/B to review. |

## Week 5 — Interview Prep Module

| Member | Tasks |
|---|---|
| **A** | LLM integration, `/api/interview/*` routes, MongoDB `interview_sessions` wiring |
| **B** | Mock interview chat UI, session history view, wire mastery vector into question context |
| **C** | 1. Build the chat message-bubble and subject-picker presentational components from B's spec.<br>2. Run 3–4 full mock interview sessions manually and log anything that breaks or reads oddly.<br>3. No changes to prompt text or evaluation logic — flag issues to A instead. |

## Week 6 — DSA Judge & Web Dev Track

| Member | Tasks |
|---|---|
| **A** | Judge0 integration (`/api/dsa/submit`), execution polling, timeout/security handling |
| **B** | Code editor UI (Monaco/CodeMirror), Web Dev Foundations track structure + sandbox pages |
| **C** | 1. Write beginner-level HTML/CSS/JS lesson content for the Web Dev track, using the outline B gives you.<br>2. Build the static lesson-page layout components from the design system.<br>3. QA checklist: submit a correct and an incorrect solution to 3 DSA problems, confirm pass/fail displays correctly — report results, don't touch the grading code. |

## Week 7 — Trained Readiness Model, Gamification, Polish

| Member | Tasks |
|---|---|
| **A** | Train the logistic-regression readiness model on collected data, replace the placeholder heuristic, document coefficients in `docs/ai-ml.md` |
| **B** | Streaks/badges/leaderboard features (API + UI), dark-mode and responsiveness polish pass |
| **C** | 1. Write badge names, descriptions, and earn-criteria text for B to wire up (content only).<br>2. Build the streak/badge/leaderboard presentational components from spec.<br>3. Run a full-app manual regression checklist covering every module built so far, logging results in one document. |

## Week 8 — Testing, Hardening, Demo, Defense Prep

| Member | Tasks |
|---|---|
| **A** | Final deployment hardening, fix critical bugs from QA, prep to explain the BKT/readiness model in the viva |
| **B** | Final UI polish, record/edit the demo video, cross-check all documentation links |
| **C** | 1. Execute the full QA checklist end-to-end one last time and log results.<br>2. Prepare a short, confident explanation of your own contributions (content, UI components, QA) for the viva.<br>3. Proofread every doc in `docs/` for clarity and typos. |

## If Someone Falls Behind

If Member C's tasks are done early, pull forward the *next* week's checklist-style tasks rather than assigning them something from A/B's lane. If A or B falls behind, the first thing to reassign is content/data entry to C (already their lane) — not ML or auth work, which should never move to C regardless of schedule pressure.
