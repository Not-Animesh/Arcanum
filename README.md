# Adaptive Learning Platform

> An AI-driven adaptive learning and placement-preparation platform for BCA/BSc students — personalized mastery tracking across DSA, DBMS, OOPs, Computer Networks, and Operating Systems, AI-powered interview prep, and a full HTML/CSS/JS foundations track.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![Python](https://img.shields.io/badge/Python-3.11-blue)
![Status](https://img.shields.io/badge/status-active%20development-orange)

## Table of Contents

- [Adaptive Learning Platform](#adaptive-learning-platform)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Key Features](#key-features)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [1. Clone the repo](#1-clone-the-repo)
    - [2. Set up the web app](#2-set-up-the-web-app)
    - [3. Set up the ML service](#3-set-up-the-ml-service)
  - [Documentation](#documentation)
  - [Team](#team)
  - [Roadmap Snapshot](#roadmap-snapshot)
  - [Contributing](#contributing)
  - [License](#license)

## Overview

Placement preparation usually means juggling five or more subjects — Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, and OOPs — across scattered, generic resources that treat every learner the same way. Students rarely get a clear, evidence-based picture of *where* they are actually weak, and interview preparation is disconnected from day-to-day learning.

The Adaptive Learning Platform solves this by pairing a full-stack Next.js application with a genuine AI/ML core:

- A **Bayesian Knowledge Tracing (BKT)** model updates a per-subtopic probability of mastery after every attempt.
- A trained **readiness-prediction model** (logistic regression over accuracy, speed, and consistency features) produces an overall placement-readiness score.
- An **LLM layer** sits on top of both to power topic-wise mock interviews and free-text answer evaluation — not as a replacement for the ML core, but as an additional layer built on it.

The result is a single platform that tells a student exactly what to study next, tracks how their readiness improves over time, and ties that directly into interview practice.

## Key Features

- **Adaptive Mastery Engine** — BKT-based mastery scoring per subtopic across all five core subjects.
- **Placement Readiness Score** — a trained model estimating overall readiness from real performance data, not a static quiz average.
- **Personalized Recommendations** — always surfaces the next-best topic or question set based on the student's current mastery vector.
- **AI Interview Prep** — subject-wise mock interview chat with LLM-generated questions and answer feedback.
- **DSA Practice Judge** — in-browser code editor with Judge0-backed execution and test-case grading.
- **Web Dev Foundations Track** — a structured HTML/CSS/JS curriculum from basics to advanced, with an embedded sandbox.
- **Progress Dashboard** — subject-wise mastery heatmap, readiness-score widget, and weak-area callouts.
- **Gamification** — streaks, badges, and a leaderboard to sustain daily practice.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui |
| ML Service | Python, FastAPI, scikit-learn (BKT + logistic-regression readiness model) |
| Primary Database | PostgreSQL — users, questions, attempts, mastery scores |
| Secondary Store | MongoDB — notes, chatbot transcripts, generated question variants |
| Code Execution | Judge0 — sandboxed execution for DSA submissions |
| LLM Layer | Claude / OpenAI API — interview question generation and answer evaluation |
| Auth | Clerk (or NextAuth) |
| Deployment | Vercel (web) + Render/Railway (ML service + Postgres) |

Full rationale for these choices lives in [`docs/decisions/`](docs/decisions/).

## Project Structure

```
adaptive-learning-platform/
├── web/                    # Next.js app — UI, API routes, auth
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── prisma/              # DB schema + migrations
├── ml-service/              # FastAPI microservice — BKT + readiness model
│   ├── app/
│   ├── models/
│   └── requirements.txt
├── docs/                    # Full project documentation
│   └── decisions/           # Architecture decision records
├── .github/                 # Issue + PR templates
├── README.md
├── LICENSE
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
└── CHANGELOG.md
```

## Getting Started

### Prerequisites

- Node.js 20+
- Python 3.11+
- PostgreSQL 15+ (local, or hosted via Neon/Supabase)
- A MongoDB connection string (Atlas free tier works fine)
- A Judge0 endpoint (self-hosted or a hosted instance)

### 1. Clone the repo

```bash
git clone https://github.com/<org>/adaptive-learning-platform.git
cd adaptive-learning-platform
```

### 2. Set up the web app

```bash
cd web
npm install
cp .env.example .env.local
```

Fill in `.env.local`:

```
DATABASE_URL=postgresql://user:password@localhost:5432/adaptive_learning
MONGODB_URI=mongodb+srv://...
ML_SERVICE_URL=http://localhost:8000
JUDGE0_API_URL=https://...
LLM_API_KEY=...
NEXTAUTH_SECRET=...
```

```bash
npx prisma migrate dev
npm run dev
```

The app runs at `http://localhost:3000`.

### 3. Set up the ML service

```bash
cd ../ml-service
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

The ML service runs at `http://localhost:8000` and is called internally by the web app — it is not exposed to end users directly.

## Documentation

| Doc | Covers |
|---|---|
| [`docs/requirements.md`](docs/requirements.md) | Functional & non-functional requirements |
| [`docs/product.md`](docs/product.md) | Product scope, personas, use cases |
| [`docs/architecture.md`](docs/architecture.md) | System architecture, service boundaries |
| [`docs/design.md`](docs/design.md) | shadcn/ui design tokens, layout, typography |
| [`docs/database.md`](docs/database.md) | Postgres + MongoDB schema |
| [`docs/api.md`](docs/api.md) | REST API reference |
| [`docs/ai-ml.md`](docs/ai-ml.md) | AI/ML strategy overview |
| [`docs/adaptive-engine.md`](docs/adaptive-engine.md) | BKT mastery model details |
| [`docs/dsa-engine.md`](docs/dsa-engine.md) | Judge0 integration & grading |
| [`docs/testing.md`](docs/testing.md) | Testing strategy |
| [`docs/deployment.md`](docs/deployment.md) | Deployment guide |
| [`docs/roadmap.md`](docs/roadmap.md) | Week-by-week build plan |
| [`docs/team-plan.md`](docs/team-plan.md) | Task ownership by team member |
| [`docs/git-workflow.md`](docs/git-workflow.md) | Branching model & PR process |

## Team

A three-person team, with tasks split by current skill level rather than evenly — see [`docs/team-plan.md`](docs/team-plan.md) for the full breakdown per phase.

## Roadmap Snapshot

- **Weeks 1–4 → Initial submission:** project scaffold, auth, content models for all five subjects, first working version of the mastery-scoring engine, basic dashboard.
- **Weeks 5–8 → Final submission:** interview-prep module, DSA judge integration, web-dev track, trained readiness-predictor model, gamification, polish.

Full week-by-week detail: [`docs/roadmap.md`](docs/roadmap.md).

## Contributing

Contributions follow a `main` / `test` branching model — see [`CONTRIBUTING.md`](CONTRIBUTING.md) and [`docs/git-workflow.md`](docs/git-workflow.md) for the exact branch, commit, and PR process before opening one.

## License

Licensed under the [MIT License](LICENSE).

---

*This project aligns with UN Sustainable Development Goal 4 — Quality Education.*
