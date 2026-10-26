# Database Schema

Two stores, split by data shape: **PostgreSQL** for structured, relational data (users, content, attempts, scores) and **MongoDB** for unstructured/variable-shape data (interview transcripts, generated question variants, free-text notes).

## 1. PostgreSQL (Prisma schema)

```prisma
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  name          String
  createdAt     DateTime @default(now())

  attempts        Attempt[]
  masteryScores   MasteryScore[]
  readinessScores ReadinessScore[]
  streaks         Streak?
  badges          UserBadge[]
}

model Subject {
  id     String  @id @default(cuid())
  name   String  @unique   // "DSA", "DBMS", "OOPs", "Computer Networks", "OS", "Web Dev"
  slug   String  @unique
  topics Topic[]
}

model Topic {
  id         String   @id @default(cuid())
  subjectId  String
  subject    Subject  @relation(fields: [subjectId], references: [id])
  name       String            // e.g. "Two Pointers", "Normalization", "Deadlocks"
  parentId   String?           // self-relation, allows Topic > Subtopic nesting
  parent     Topic?   @relation("TopicToSubtopic", fields: [parentId], references: [id])
  subtopics  Topic[]  @relation("TopicToSubtopic")
  importance Int      @default(1)  // weight used by the readiness model & recommender

  questions      Question[]
  masteryScores  MasteryScore[]
}

model Question {
  id         String   @id @default(cuid())
  topicId    String
  topic      Topic    @relation(fields: [topicId], references: [id])
  type       QuestionType   // MCQ, CODING, SHORT_ANSWER
  prompt     String
  options    Json?          // for MCQ: [{ id, text }]
  answerKey  Json           // correct option id(s), or test cases for CODING
  difficulty Int      @default(1) // 1-5

  attempts Attempt[]
}

enum QuestionType {
  MCQ
  CODING
  SHORT_ANSWER
}

model Attempt {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  questionId  String
  question    Question @relation(fields: [questionId], references: [id])
  isCorrect   Boolean
  timeTakenMs Int
  submittedAt DateTime @default(now())
  codeSubmissionId String?  // set only for CODING questions, links to Judge0 result

  @@index([userId, questionId])
}

model MasteryScore {
  id           String   @id @default(cuid())
  userId       String
  user         User     @relation(fields: [userId], references: [id])
  topicId      String
  topic        Topic    @relation(fields: [topicId], references: [id])
  probability  Float    // BKT P(mastery), 0-1
  attemptsSeen Int      @default(0)
  updatedAt    DateTime @updatedAt

  @@unique([userId, topicId])
}

model ReadinessScore {
  id         String   @id @default(cuid())
  userId     String
  user       User     @relation(fields: [userId], references: [id])
  score      Float    // 0-100, output of the trained readiness model
  breakdown  Json      // per-feature contribution, for the "explainability" requirement
  computedAt DateTime @default(now())
}

model Streak {
  id            String   @id @default(cuid())
  userId        String   @unique
  user          User     @relation(fields: [userId], references: [id])
  currentLength Int      @default(0)
  lastActiveAt  DateTime
}

model Badge {
  id          String  @id @default(cuid())
  name        String  @unique  // "DBMS Novice", "50 DSA Problems"
  description String
  users       UserBadge[]
}

model UserBadge {
  userId    String
  user      User    @relation(fields: [userId], references: [id])
  badgeId   String
  badge     Badge   @relation(fields: [badgeId], references: [id])
  earnedAt  DateTime @default(now())

  @@id([userId, badgeId])
}
```

### Why these tables

- `Topic` self-relates (`parentId`) so a subject tree (Subject → Topic → Subtopic) doesn't need a separate table per level.
- `MasteryScore` is one row per `(user, topic)`, upserted after every relevant attempt — this is exactly what the BKT engine in `docs/adaptive-engine.md` reads and writes.
- `ReadinessScore` stores a `breakdown` JSON, not just the number, because NFR-1 in `docs/requirements.md` requires the score to be explainable, not a black box.

## 2. MongoDB Collections

Used for content that doesn't fit a fixed relational shape, or that changes often without a migration:

```js
// notes — subject/topic content, markdown body, can vary in structure per subject
{
  _id: ObjectId,
  topicId: "cuid-from-postgres-topic",
  title: "Normalization (1NF–3NF)",
  bodyMarkdown: "...",
  updatedAt: ISODate
}

// interview_sessions — one document per mock interview, variable-length Q&A
{
  _id: ObjectId,
  userId: "cuid-from-postgres-user",
  subjectSlug: "dbms",
  startedAt: ISODate,
  turns: [
    {
      question: "Explain the difference between 2NF and 3NF.",
      userAnswer: "...",
      evaluation: { score: 7, feedback: "..." }
    }
  ]
}

// generated_question_variants — LLM-generated question rewrites/variants, kept separate
// from the curated Postgres question bank so bad generations never pollute it
{
  _id: ObjectId,
  baseQuestionId: "cuid-from-postgres-question",
  variantPrompt: "...",
  generatedAt: ISODate,
  approved: false   // a team member can promote a good variant into Postgres later
}
```

## 3. Data Isolation

Every Postgres query that touches `Attempt`, `MasteryScore`, or `ReadinessScore` must filter by the authenticated `userId` from the session — never trust a `userId` passed in the request body. See `NFR-4` in `docs/requirements.md` and `SECURITY.md`.
