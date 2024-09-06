import { create } from 'zustand';
import { Question, QuizResult } from '../app/types/models';

interface QuizStore {
  quizResult: QuizResult | null;
  questions: Question[];
  setQuizResult: (result: QuizResult) => void;
  setQuestions: (questions: Question[]) => void;
}

export const useQuizStore = create<QuizStore>((set) => ({
  quizResult: null,
  questions: [],
  setQuizResult: (result) => set({ quizResult: result }),
  setQuestions: (questions) => set({ questions }),
}));