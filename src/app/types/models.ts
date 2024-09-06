export interface Subject {
  id: string;
  name: string;
  description: string;
  category?: string;
}

export interface Question {
    id: string;
    subjectId: string;
    question: string;
    options: Array<{
      text: string;
      isCorrect: boolean;
    }>;
    difficulty: 'fácil' | 'médio' | 'difícil';
    explanation: string;
    estimatedTime: number;
}

export interface QuizResult {
  id: string;
  userId: string;
  subjectId: string;
  score: number;
  totalTime: number;
  answers: {
    questionId: string;
    selectedOptionIndex: number;
    correct: boolean;
    timeSpent: number;
  }[];
  date: Date;
}