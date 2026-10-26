# Security Policy

## Supported Versions

This is an academic project under active development with a single deployed environment (production, deployed from `main`). There are no maintained older versions — security fixes only ever apply to the current `main` branch.

| Branch | Supported |
|---|---|
| `main` | ✅ |
| `test` | ⚠️ Integration branch — not deployed publicly, fixes land here first |
| Feature branches | ❌ Not supported, expected to be short-lived |

## Reporting a Vulnerability

If you find a security issue in this repository (e.g. an exposed API key pattern, an auth bypass in the Next.js API routes, or an injection risk in the FastAPI ML service):

1. **Do not open a public GitHub issue.** Public issues are fine for bugs, but not for anything that could be actively exploited (auth bypass, data leakage between student accounts, SQL/NoSQL injection).
2. Open a [GitHub Security Advisory](../../security/advisories/new) on this repository instead — this is private between the reporter and the maintainers until a fix ships.
3. If GitHub Security Advisories are unavailable, contact any of the three team members directly (see `docs/team-plan.md` for names/roles) rather than posting details publicly.

Please include:

- The affected file/route/endpoint
- Steps to reproduce
- What data or access it exposes (e.g. "any authenticated user can read another user's mastery scores via `/api/mastery/[userId]`")

## What Counts as In-Scope

Since student performance data (attempts, mastery scores, readiness predictions) is involved, the following are treated as security-relevant, not just bugs:

- Any way to read/write another user's attempts, mastery scores, or readiness score
- Any way to bypass authentication on API routes or the FastAPI ML service
- Leaking API keys (LLM provider, Judge0) through client-side code or logs
- Prompt injection in the AI interview-prep chat that could exfiltrate system prompts or other users' data

## Response Expectations

Given the team size and the academic timeline in `docs/roadmap.md`, expect an initial acknowledgment within a couple of days rather than a formal SLA. Fixes affecting the initial or final submission deadline take priority.
