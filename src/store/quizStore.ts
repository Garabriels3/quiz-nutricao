import { create } from 'zustand';

interface QuizStore {
  quizResult: any | null;
  setQuizResult: (result: any) => void;
}

export const useQuizStore = create<QuizStore>((set) => ({
  quizResult: null,
  setQuizResult: (result) => set({ quizResult: result }),
}));