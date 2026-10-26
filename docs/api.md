# API Reference

All routes below are Next.js API routes (`web/app/api/**/route.ts`) unless marked **[ML Service]**, which live in `ml-service/` and are called server-side by the web app — never directly from the browser.

Auth: every route except `/api/auth/*` requires a valid Clerk session; the authenticated `userId` is taken from the session, never from the request body/query.

## Auth

| Method | Route | Description |
|---|---|---|
| — | `/api/auth/*` | Handled by Clerk's Next.js middleware, not custom code. |

## Subjects & Content

| Method | Route | Description |
|---|---|---|
| GET | `/api/subjects` | List all subjects with their topic trees. |
| GET | `/api/subjects/:slug/topics` | Topics + subtopics for one subject. |
| GET | `/api/topics/:id/notes` | Notes content for a topic (from MongoDB). |
| GET | `/api/topics/:id/questions?limit=10` | Question set for practice, filtered by difficulty if the student's mastery is known. |

## Attempts

| Method | Route | Description |
|---|---|---|
| POST | `/api/attempts` | Submit an answer. Body: `{ questionId, answer, timeTakenMs }`. Writes an `Attempt` row, then calls the ML service's `/mastery/update` and persists the result. Returns `{ isCorrect, mastery: { topicId, probability }, nextRecommendation }`. |
| GET | `/api/attempts/history?topicId=` | A student's own attempt history for a topic (used by the dashboard's "recent activity"). |

## Mastery & Readiness

| Method | Route | Description |
|---|---|---|
| GET | `/api/mastery` | Full mastery vector for the current user across all topics — powers the heatmap. |
| GET | `/api/readiness` | Current readiness score + `breakdown` for the current user. |
| POST | `/api/readiness/refresh` | Forces a recompute (calls ML service `/readiness/predict`); normally triggered automatically every N attempts, this is a manual "recalculate" button. |

## DSA Judge

| Method | Route | Description |
|---|---|---|
| POST | `/api/dsa/submit` | Body: `{ questionId, sourceCode, language }`. Forwards to Judge0, polls for the result, stores a `codeSubmissionId` on the resulting `Attempt`. Returns `{ status, testCasesPassed, totalTestCases, runtimeMs }`. |

Full grading flow: [`docs/dsa-engine.md`](dsa-engine.md).

## Interview Prep

| Method | Route | Description |
|---|---|---|
| POST | `/api/interview/start` | Body: `{ subjectSlug }`. Pulls the student's mastery vector for that subject, generates the first question via the LLM, creates a MongoDB `interview_sessions` document. |
| POST | `/api/interview/:sessionId/answer` | Body: `{ answer }`. Sends the answer to the LLM for evaluation, appends the turn, returns feedback + the next question. |
| GET | `/api/interview/:sessionId` | Fetch a session (for review). |
| GET | `/api/interview/history` | List a student's past sessions. |

Prompting approach and safeguards: [`docs/decisions/003-llm-strategy.md`](decisions/003-llm-strategy.md).

## Gamification

| Method | Route | Description |
|---|---|---|
| GET | `/api/streaks` | Current user's streak. |
| GET | `/api/badges` | All badges + which ones the current user has earned. |
| GET | `/api/leaderboard` | Opt-in leaderboard, scoped (not global by default). |

## ML Service Endpoints **[ML Service — internal only]**

| Method | Route | Description |
|---|---|---|
| POST | `/mastery/update` | Body: `{ userId, topicId, isCorrect, priorProbability }`. Runs one BKT update step, returns `{ newProbability, recommendation }`. See `docs/adaptive-engine.md` for the math. |
| POST | `/readiness/predict` | Body: `{ userId, features: { accuracy, avgSpeed, consistency, coverage } }`. Runs the trained logistic-regression model, returns `{ score, breakdown }`. See `docs/ai-ml.md`. |
| GET | `/health` | Basic liveness check for deployment monitoring. |

## Error Shape

All routes return errors in a consistent shape so the frontend can handle them uniformly:

```json
{
  "error": {
    "code": "UNAUTHORIZED" | "NOT_FOUND" | "VALIDATION_ERROR" | "ML_SERVICE_UNAVAILABLE",
    "message": "Human-readable explanation"
  }
}
```
