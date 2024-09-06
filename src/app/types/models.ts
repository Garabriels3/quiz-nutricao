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
  estimatedTime: number; // em segundos
}

export interface QuizResult {
  id: string;
  userId: string;
  subjectId: string;
  date: Date;
  score: number;
  totalTime: number; // em segundos
  answers: Array<{
    questionId: string;
    selectedOptionIndex: number;
    correct: boolean;
    timeSpent: number; // em segundos
  }>;
}