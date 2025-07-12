export interface QuizSubmitRequest {
  quizId: number;
  userAnswer: string | null;
  skipped: boolean;
}

export interface QuizResponse {
  quizId: number;
  context: string;
  question: string;
  choices: string[];
}

export interface SkipStatusResponse {
  skippedCount: number;
  remainingSkips: number;
}

export interface QuizResultSummary {
  total: number;
  correct: number;
}
