export type ProblemDifficulty = "Easy" | "Medium" | "Hard";

export type ProblemCategory =
  | "All"
  | "DSA"
  | "DBMS"
  | "Operating Systems"
  | "Computer Networks"
  | "System Design"
  | "OOP Concepts";

export interface McqOption {
  id: string;
  text: string;
}

export interface McqQuestion {
  id: string;
  prompt: string;
  options: McqOption[];
  correctOptionId: string;
  explanation: string;
  topic: string;
}

export interface PracticeProblem {
  id: string;
  title: string;
  category: ProblemCategory;
  subjectSlug: string;
  difficulty: ProblemDifficulty;
  acceptanceRate: string;
  tags: string[];
  starterNote?: string;
  /** MCQ questions for this problem entry. Present for theory/concept problems. */
  mcqQuestions?: McqQuestion[];
}
