# Adaptive Engine — Bayesian Knowledge Tracing

## 1. Overview

For every `(user, topic)` pair, we track a single number: **P(L)** — the probability that the student has mastered that topic. This starts at a prior and updates after every attempt on a question tagged with that topic, using the standard **Bayesian Knowledge Tracing (BKT)** model.

## 2. Parameters (per topic)

| Parameter | Meaning | Typical starting value |
|---|---|---|
| `P(L0)` | Prior probability of mastery before any attempts | 0.1 – 0.3 (lower for harder topics) |
| `P(T)` | Probability of transitioning from unmastered → mastered after one learning opportunity | 0.1 – 0.2 |
| `P(S)` | "Slip" — probability of answering incorrectly *despite* having mastered the topic | 0.1 |
| `P(G)` | "Guess" — probability of answering correctly *despite not* having mastered the topic | 0.2 – 0.25 for MCQ (higher, since guessing works), lower (~0.05) for coding questions where guessing rarely succeeds |

These four parameters are set per subject/topic (not global) — an MCQ-heavy topic needs a higher `P(G)` than a coding topic, or the model will over-credit lucky guesses as mastery.

## 3. The Update Rule

On each attempt, in two steps:

**Step 1 — update belief given the observed evidence (correct/incorrect):**

If the attempt was **correct**:

```
P(L | correct) = [ P(L) × (1 − P(S)) ] / [ P(L) × (1 − P(S)) + (1 − P(L)) × P(G) ]
```

If the attempt was **incorrect**:

```
P(L | incorrect) = [ P(L) × P(S) ] / [ P(L) × P(S) + (1 − P(L)) × (1 − P(G)) ]
```

**Step 2 — account for the learning opportunity itself** (even a wrong answer is a chance to learn from feedback):

```
P(L_next) = P(L | evidence) + (1 − P(L | evidence)) × P(T)
```

`P(L_next)` becomes the new stored `MasteryScore.probability` for that `(user, topic)`.

## 4. Worked Example

Topic: "Two Pointers" (DSA). Parameters: `P(L0) = 0.2`, `P(T) = 0.15`, `P(S) = 0.1`, `P(G) = 0.2`.

**Attempt 1 — correct:**

```
P(L | correct) = (0.2 × 0.9) / (0.2 × 0.9 + 0.8 × 0.2)
               = 0.18 / (0.18 + 0.16)
               = 0.18 / 0.34
               ≈ 0.529

P(L_next) = 0.529 + (1 − 0.529) × 0.15
          = 0.529 + 0.0706
          ≈ 0.600
```

One correct answer takes mastery from 0.20 → 0.60. This is intentionally responsive early on — with so little evidence, each data point moves the estimate a lot; it stabilizes as more attempts accumulate.

**Attempt 2 — incorrect:**

```
P(L | incorrect) = (0.600 × 0.1) / (0.600 × 0.1 + 0.400 × 0.9)
                  = 0.06 / (0.06 + 0.36)
                  = 0.06 / 0.42
                  ≈ 0.143

P(L_next) = 0.143 + (1 − 0.143) × 0.15
          ≈ 0.271
```

A wrong answer right after a correct one pulls the estimate back down substantially — this is the "slip" parameter doing its job: one wrong answer isn't ignored, but it's also not treated as proof the student knows nothing (contrast with `P(L0) = 0.2`, so the model has "learned" *something* from the two attempts, not just reset).

## 5. Recommendation Logic

The recommender (called from `/mastery/update`, see `docs/api.md`) picks the next topic to surface using:

```
priority(topic) = topic.importance × (1 − P(L)_topic)
```

i.e., prioritize topics that are both **important** (weighted per `Topic.importance` in the schema) and **low-mastery**. This avoids the two obvious failure modes: recommending a trivial topic just because mastery is low, or ignoring a critical topic because mastery happens to be moderate.

## 6. Parameter Tuning Approach

Starting values above are reasonable EdTech-literature defaults, not fit from data on day one. During Weeks 5–8 (see `docs/roadmap.md`), once real attempt data exists, `P(S)` and `P(G)` per subject can be sanity-checked: if a topic's `P(G)` implies students are "guessing" correctly far more than the raw MCQ chance rate would suggest, it's a sign the questions are too easy relative to their difficulty tag, not that the model is wrong.

## 7. Why BKT Over a Simple Weighted Average

A rolling accuracy average treats every attempt as equally informative regardless of order or the specific slip/guess characteristics of the question type. BKT explicitly separates "does the student know this" from "did they happen to get this one right," which is the entire point of an *adaptive* system — this distinction is what should be highlighted when explaining the choice over a naive average. Full comparison and rationale: [`docs/decisions/002-adaptive-model.md`](decisions/002-adaptive-model.md).
