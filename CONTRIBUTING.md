# Contributing

This is a 3-person academic project, but we still treat the repo like a real production codebase — it's part of what gets evaluated, and it's what you'll point to in placement interviews.

## Before You Start

1. Make sure you can run both services locally — see the [Getting Started](README.md#getting-started) section of the README.
2. Read [`docs/git-workflow.md`](docs/git-workflow.md) in full before your first commit. It covers the exact branch, commit, and PR sequence — this doc only summarizes it.
3. Check [`docs/team-plan.md`](docs/team-plan.md) for which tasks are assigned to you for the current phase. Don't pick up a task outside your assigned lane without flagging it in the team chat first — this matters most for Member C, whose tasks are deliberately scoped to avoid blocking on things they haven't learned yet.

## Branching (summary)

- `main` — always deployable. Nobody commits to it directly.
- `test` — integration branch. All feature branches merge here first.
- `feature/<short-description>` — one per task, branched from `test`.

Full commands (clone, branch, commit, push, PR, merge, cleanup) are in [`docs/git-workflow.md`](docs/git-workflow.md).

## Commit Messages

Use a short prefix so history stays scannable:

```
feat: add BKT mastery update endpoint
fix: correct readiness score normalization
docs: add API reference for /api/attempts
chore: bump Prisma to 6.x
test: add unit tests for mastery decay function
```

## Code Style

- **Web app:** TypeScript strict mode, ESLint + Prettier (run `npm run lint` before pushing). Components follow the patterns in [`docs/design.md`](docs/design.md) — use shadcn/ui primitives, don't hand-roll a component that already exists in `components/ui`.
- **ML service:** `black` for formatting, `ruff` for linting. Every model function needs a docstring explaining the inputs/outputs in plain language — this project gets evaluated partly on whether the AI/ML part is *explainable*, not just functional.

## Pull Requests

- Target `test`, never `main`.
- Fill in the PR template (`.github/pull_request_template.md`) — don't leave sections blank.
- At least one other team member reviews before merging, even for small changes. For anything Member C opens, Member A or B reviews line-by-line rather than just approving — the goal is for it to be a learning pass, not a rubber stamp.
- Squash-merge feature branches into `test` to keep history readable.

## Reporting Issues

Use the issue templates under `.github/ISSUE_TEMPLATE/` — bug report or feature request. If it's a security issue (auth bypass, data leak between users), follow [`SECURITY.md`](SECURITY.md) instead of opening a public issue.

## Questions

If you're stuck on a task for more than ~30–45 minutes with no progress, say so in the team chat rather than silently falling behind — this is explicitly built into the timeline in [`docs/roadmap.md`](docs/roadmap.md), which assumes some rebalancing between members will be needed.
