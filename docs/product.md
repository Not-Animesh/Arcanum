# Product Overview

## 1. Problem

Final-year BCA/BSc students preparing for placements need to be strong across five core CS subjects (DSA, DBMS, OOPs, Computer Networks, OS) plus be interview-ready. In practice:

- They use disconnected resources — one site for DSA, PDFs for DBMS notes, YouTube for OS, a different app for mock interviews.
- Nothing tells them *where they're actually weak* — a 70% quiz average hides whether the wrong 30% is spread evenly or concentrated in one subtopic that will get asked about in every interview (e.g., deadlocks, normalization, or recursion).
- Interview prep is disconnected from what they've actually studied, so they either over-prepare topics they've already mastered or walk into interviews with untested gaps.

## 2. Target User (Persona)

**Priya, final-year BCA student, 6 months from placements.**
Comfortable with basics, inconsistent across subjects — strong in OOPs, shaky in DBMS and OS. Uses 3–4 different sites currently. Wants to know exactly what to study next, not another generic 100-question PDF.

## 3. Product Principles

1. **Personalized over generic** — every recommendation is based on *this* student's actual attempt history, not a fixed syllabus order.
2. **Explainable, not a black box** — a student (and an evaluator) should be able to see *why* the system thinks they're weak in a topic, not just a score.
3. **Practice feeds prep** — interview questions should be informed by the same mastery data as the practice modules, not a separate disconnected feature.
4. **Realistic for a student team to ship** — every feature here is scoped to what three people, one of them a beginner, can build and defend in 8 weeks.

## 4. Core User Stories

- As a student, I want to see which subtopics I'm weakest in, so I know what to study next instead of guessing.
- As a student, I want practice questions that adjust to my level, so I'm not wasting time on things I've already mastered.
- As a student, I want to practice mock interview questions on the topics I'm actually weak in, so my prep time is targeted.
- As a student, I want to track my overall "readiness" over time, so I have a sense of progress instead of just raw scores.
- As a student, I want to practice DSA coding problems with real code execution, so I know if my solution actually works, not just whether I think it's right.
- As a guide/evaluator, I want to see the reasoning behind the AI/ML component clearly documented, so I can evaluate it as a real ML component, not a wrapper around an API call.

## 5. Success Metrics (for the project report, not live analytics)

Since this won't have real production traffic, "success" for the submission means:

- The BKT mastery model visibly updates and produces sensible recommendations on seeded/demo data.
- The readiness-prediction model is actually trained (not hardcoded) and its accuracy/behavior is documented in `docs/ai-ml.md`.
- All five subjects + interview prep + the web-dev track are present and usable end-to-end in the demo.
- The repo, docs, and Git history reflect real collaborative work across all three team members — this is part of what's being evaluated.

## 6. Non-Goals

See [`docs/requirements.md`](requirements.md#5-out-of-scope-v1) for the explicit out-of-scope list.
