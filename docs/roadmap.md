# Roadmap

Week-by-week plan across the 8-week timeline: **Weeks 1–4 → Initial Submission**, **Weeks 5–8 → Final Submission**. This doc covers *what* ships each week. For *who* builds each item and at what difficulty level, see [`docs/team-plan.md`](team-plan.md) — the two documents are matched phase-by-phase, so "Week 3" here lines up with the "Week 3" table there.

## Phase 1 — Initial Submission (Weeks 1–4)

### Week 1 — Scaffold & Setup

- Repo structure in place: `web/` (Next.js), `ml-service/` (FastAPI), `docs/`
- `main` and `test` branches created; branch protection on `main` (see `docs/git-workflow.md`)
- Postgres schema applied via Prisma migrations (`docs/database.md`)
- Auth wired end-to-end (Clerk) — signup/login working, sessions attached to API routes
- Base dashboard shell laid out using the shadcn tokens in `docs/design.md` (sidebar, header, dark mode toggle)
- Deployment skeletons live: Vercel (web), Render/Railway (ml-service) — even with placeholder pages, so deployment isn't a Week 4 fire drill

**Milestone:** a logged-in user sees an empty dashboard shell, deployed and reachable at a real URL.

### Week 2 — Content & Basic Practice Flow

- `Subject` → `Topic` → `Subtopic` tree seeded for all five subjects (DSA, DBMS, OOPs, Computer Networks, OS)
- 20–30 curated questions per subject seeded (MCQ to start; coding questions follow in Week 6)
- Practice flow working: pick a topic → answer a question → see correct/incorrect feedback
- `Attempt` rows persisting to Postgres on every submission

**Milestone:** a student can practice real questions in all five subjects and their attempts are recorded.

### Week 3 — Mastery Engine v1

- `ml-service/` FastAPI skeleton deployed and reachable from `web/`
- BKT mastery update implemented per `docs/adaptive-engine.md`, exposed at `/mastery/update`
- `MasteryScore` rows updating after each attempt
- Basic next-topic recommendation using the `priority(topic)` formula from `docs/adaptive-engine.md`

**Milestone:** mastery probabilities visibly change as a demo user answers questions correctly/incorrectly across a session.

### Week 4 — Dashboard, MVP Deploy, Initial Submission

- Mastery heatmap rendered on the dashboard (Card grid, `--chart-*` tokens per `docs/design.md`)
- Readiness score widget shown using a placeholder heuristic (the trained model lands in Week 7 — this is disclosed, not hidden, in the report)
- Full MVP deployed and smoke-tested end to end
- Initial submission report/slides written, screenshots captured
- Buffer day(s) for whatever broke during integration

**Milestone — Initial Submission:** a deployed, working app covering all five subjects with a real (if early) adaptive mastery engine and a visible dashboard.

## Phase 2 — Final Submission (Weeks 5–8)

### Week 5 — Interview Prep Module

- LLM integration for question generation + free-text answer evaluation (`docs/decisions/003-llm-strategy.md`)
- `interview_sessions` collection wired in MongoDB (`docs/database.md`)
- Mock interview chat UI, scoped per subject, seeded from the student's current mastery vector

**Milestone:** a student can run a full mock interview session in any of the five subjects and see feedback.

### Week 6 — DSA Judge & Web Dev Track

- Judge0 integration for DSA coding submissions (`docs/dsa-engine.md`)
- In-browser code editor wired to the grading flow
- Web Dev Foundations track (HTML/CSS/JS, basics → advanced) with an embedded sandbox

**Milestone:** a student can submit real code for a DSA problem and get pass/fail + runtime feedback, and can work through web-dev fundamentals content separately.

### Week 7 — Trained Readiness Model, Gamification, Polish

- Readiness-prediction model actually trained (logistic regression, `docs/ai-ml.md` §3) on collected data, replacing the Week 4 placeholder heuristic
- Streaks, badges, and an opt-in leaderboard implemented
- Dark mode, responsiveness, and general UI polish pass across every page

**Milestone:** the readiness score is now a genuinely trained model with an explainable breakdown, and the app feels finished, not just functional.

### Week 8 — Testing, Hardening, Demo, Defense Prep

- Full manual QA pass across every module (checklist-driven — see `docs/team-plan.md`)
- Critical bug fixes only — no new features this week
- Final deployment hardening (env vars, error handling, uptime check)
- Demo video recorded, final documentation cross-checked
- Viva/defense prep: everyone can explain the BKT engine and the readiness model in plain language, not just the person who built it

**Milestone — Final Submission:** a polished, fully working platform across all planned features, with documentation and defense prep ready.

## Risk Buffer

If a week slips, the order of what to cut (not push into Phase 1) is: leaderboard → badges → Web Dev sandbox polish → dark-mode polish. The BKT engine, the trained readiness model, and the interview-prep module are the parts evaluators and interviewers will focus on — protect those first.
