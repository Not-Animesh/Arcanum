
export type ProblemDifficulty = "Easy" | "Medium" | "Hard";

export type SubjectSlug = "dsa" | "dbms" | "oops" | "cn" | "os";

export type ProblemCategory =
  | "All"
  | "DSA"
  | "DBMS"
  | "Operating Systems"
  | "Computer Networks"
  | "OOP Concepts";

export interface PracticeProblem {
  id: string;
  title: string;
  category: Exclude<ProblemCategory, "All">;
  subjectSlug: SubjectSlug;
  difficulty: ProblemDifficulty;
  acceptanceRate: string | null;
  tags: string[];
  starterNote?: string;
}
