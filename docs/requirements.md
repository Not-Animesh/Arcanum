# Requirements

## 1. Purpose

Define what the Adaptive Learning Platform must do (functional requirements) and the qualities it must have (non-functional requirements) to be a credible placement-prep tool and a defensible academic submission.

## 2. User Roles

| Role | Description |
|---|---|
| **Student** | Primary user. Practices questions, receives mastery/readiness feedback, uses interview prep, tracks progress. |
| **Guide/Evaluator** | Views the project for grading — needs a clear, working demo path, not an account with special permissions in v1. |
| **Admin (implicit)** | One of the team members, seeding/curating question content via seed scripts or a basic admin view — not a full role-based access system in v1. |

## 3. Functional Requirements

### 3.1 Authentication
- FR-1: A student can sign up and log in (email/password or OAuth via Clerk).
- FR-2: A student's data (attempts, mastery, readiness score) is only readable by that student.

### 3.2 Subject Modules (DSA, DBMS, OOPs, CN, OS)
- FR-3: Each subject is broken into topics and subtopics (e.g., DSA → Arrays → Two Pointers).
- FR-4: Each subtopic has associated notes/content and a bank of practice questions (MCQ and/or coding, depending on subject).
- FR-5: A student can attempt a question and receive immediate correctness feedback.

### 3.3 Adaptive Mastery Engine
- FR-6: After each attempt, the system updates a mastery probability for that subtopic using the BKT model described in [`docs/adaptive-engine.md`](adaptive-engine.md).
- FR-7: The system recommends the next subtopic/question set based on the student's current mastery vector, prioritizing low-mastery, high-importance topics.
- FR-8: A student can view a mastery heatmap across all subjects/subtopics at any time.

### 3.4 Placement Readiness Score
- FR-9: The system computes an overall readiness score from accuracy, speed, consistency, and topic coverage, using the trained model described in [`docs/ai-ml.md`](ai-ml.md).
- FR-10: The readiness score updates as new attempts come in and is visible on the dashboard.

### 3.5 Interview Preparation
- FR-11: A student can start a mock interview session for a chosen subject.
- FR-12: The system generates subject- and topic-appropriate questions (LLM-assisted) and evaluates free-text answers, returning feedback.
- FR-13: Past interview sessions are viewable for review.

### 3.6 DSA Coding Practice
- FR-14: A student can write and submit code for a DSA problem in an in-browser editor.
- FR-15: Submissions are executed and graded against test cases via Judge0, with pass/fail and runtime feedback.

### 3.7 Web Dev Foundations Track
- FR-16: A structured HTML/CSS/JS curriculum, basics → advanced, with an embedded code sandbox for practice.

### 3.8 Gamification
- FR-17: Students earn streaks for consecutive days of practice and badges for milestones (e.g., "DBMS Novice", "50 DSA problems solved").
- FR-18: A leaderboard (opt-in, or scoped to the class/section) shows relative standing.

## 4. Non-Functional Requirements

| ID | Requirement |
|---|---|
| NFR-1 | **Explainability** — the mastery and readiness scores must be explainable in plain language (this is explicitly evaluated; see `docs/ai-ml.md`). |
| NFR-2 | **Performance** — a mastery update after an attempt should complete in under ~1s so the UI doesn't feel laggy. |
| NFR-3 | **Availability** — the deployed demo must be reachable for the guide/evaluator at submission time; no reliance on a laptop being on. |
| NFR-4 | **Data isolation** — one student must never be able to read another's attempts or scores (see `SECURITY.md`). |
| NFR-5 | **Responsiveness** — the dashboard must be usable on a laptop screen at minimum; mobile is a nice-to-have, not a requirement for submission. |
| NFR-6 | **Maintainability** — three people with different skill levels are working on this; code needs to be simple enough for Member C to read and extend within their scoped tasks (see `docs/team-plan.md`). |

## 5. Out of Scope (v1)

To keep the timeline realistic (see `docs/roadmap.md`), the following are explicitly **not** built for this submission:

- Multi-tenant support for multiple colleges/cohorts
- Payment/subscription logic
- Native mobile apps
- Full role-based access control / admin dashboard UI (seed scripts are enough)
- Video-based mock interviews (text/voice-to-text only, if voice is attempted at all)
