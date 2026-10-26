# AI/ML Strategy

## 1. Why This Is a Real ML Component, Not an LLM Wrapper

A common failure mode for "AI-powered" student projects is: call an LLM API, call it AI/ML, done. Evaluators (and placement interviewers) will ask "what is the ML actually doing?" — the answer here needs to be more than "we prompted GPT." This project has three distinct layers, and only the third one is an LLM call:

| Layer | What it is | Where it's documented |
|---|---|---|
| 1. Mastery estimation | Bayesian Knowledge Tracing — a probabilistic model with parameters fit per topic | `docs/adaptive-engine.md` |
| 2. Readiness prediction | A trained logistic regression model over engineered features | This doc, §3 |
| 3. Interview Q&A | LLM API calls, built *on top of* layers 1–2, not a replacement for them | `docs/decisions/003-llm-strategy.md` |

If asked "what's the AI part," the answer is layers 1 and 2 — both of which are explainable and don't require an internet connection or a third-party API to function.

## 2. Layer 1 — Bayesian Knowledge Tracing (Summary)

Full math and update rule in [`docs/adaptive-engine.md`](adaptive-engine.md). In one line: after every attempt, BKT updates a per-topic probability that the student has mastered that topic, using four parameters (initial knowledge, learning rate, slip rate, guess rate) that can be tuned per subject.

## 3. Layer 2 — Readiness Prediction Model

### 3.1 Problem framing

Given a student's aggregate performance, predict a single **readiness score (0–100)** and, importantly, a **feature-level breakdown** so the score is explainable (NFR-1).

### 3.2 Features

Engineered from `Attempt` and `MasteryScore` data (see `docs/database.md`):

| Feature | Definition |
|---|---|
| `accuracy` | Correct attempts / total attempts, overall and per-subject |
| `avgSpeed` | Median time-per-question relative to that question's difficulty tier |
| `consistency` | Inverse of variance in per-session accuracy over the last N sessions (penalizes cramming/inconsistent performance) |
| `coverage` | Fraction of topics with at least K attempts (penalizes never having tried a topic at all) |
| `masteryMean` | Mean BKT mastery probability across all topics |
| `masteryMin` | Lowest mastery probability across topics — the "weakest link" |

### 3.3 Model

**Logistic regression** (scikit-learn `LogisticRegression`, or `LinearRegression` if the target is treated as continuous rather than a readiness-tier classification) trained on the engineered features above. Logistic regression is the right choice here, not a deeper model, because:

- The dataset is small (bootstrapped from seed/demo data + real usage during the project timeline) — a deep model would overfit immediately.
- Coefficients are directly interpretable — the `breakdown` field in `ReadinessScore` (see `docs/database.md`) can literally report each feature's weighted contribution, satisfying the explainability requirement without extra tooling like SHAP.
- It's genuinely defensible in a viva: "we trained a logistic regression on accuracy/speed/consistency/coverage features and can show you the coefficients" is a complete, honest answer.

### 3.4 Training data

Since there's no historical cohort of real students at project start, training data comes from:

1. Seeded synthetic attempt sequences (varying skill profiles: consistently strong, consistently weak, spiky/inconsistent, improving-over-time) generated for the initial submission.
2. Real usage data collected during Weeks 5–8 as the team and any test users actually use the platform, used to retrain/validate before final submission.

This progression (synthetic → real) should be stated explicitly in the project report — it's a normal, honest limitation of a student project, not something to hide.

### 3.5 Evaluation

Report standard classification/regression metrics (accuracy or R², confusion matrix if framed as tiers: "Building" / "On Track" / "Interview Ready") on a held-out split of whatever data exists at the time of final submission. A small dataset with modest metrics, clearly explained, is more credible than an unexplained large claimed accuracy number.

## 4. Layer 3 — LLM Usage

Kept deliberately narrow: question generation and free-text answer evaluation for interview prep only. The LLM never decides mastery or readiness — those numbers only ever come from layers 1–2. See [`docs/decisions/003-llm-strategy.md`](decisions/003-llm-strategy.md) for prompting approach, grounding in mastery data, and guardrails.

## 5. What to Say in the Viva / Report

A short, honest framing that holds up under questioning:

> "Mastery tracking uses Bayesian Knowledge Tracing, a standard EdTech algorithm, tuned per subject. Overall readiness is predicted by a logistic regression model we trained ourselves on engineered performance features — here are the coefficients and what they mean. The LLM is used only for generating and evaluating interview questions, layered on top of the mastery data, not for the core scoring."
