import { Subject, Question, QuizResult } from '../types/models';

export const mockSubjects: Subject[] = [
  { 
    id: '1', 
    name: 'Bioquímica', 
    description: 'Estudo dos processos químicos dentro e relacionados aos organismos vivos',
    category: 'Ciências Básicas'
  },
  { 
    id: '2', 
    name: 'Nutrição Básica', 
    description: 'Fundamentos da nutrição e seu impacto na saúde',
    category: 'Nutrição'
  },
];

export const mockQuestions: Question[] = [
  {
    id: '1',
    subjectId: '1',
    question: 'Qual é a principal função das enzimas?',
    options: [
      { text: 'Armazenamento de energia', isCorrect: false },
      { text: 'Catalisar reações químicas', isCorrect: true },
      { text: 'Estrutura celular', isCorrect: false },
      { text: 'Produção de hormônios', isCorrect: false }
    ],
    difficulty: 'médio',
    explanation: 'As enzimas são catalisadores biológicos que aceleram as reações químicas nas células sem serem consumidas no processo.',
    estimatedTime: 60
  },
  {
    id: '2',
    subjectId: '2',
    question: 'Qual dos seguintes não é um macronutriente?',
    options: [
      { text: 'Carboidratos', isCorrect: false },
      { text: 'Proteínas', isCorrect: false },
      { text: 'Gorduras', isCorrect: false },
      { text: 'Vitaminas', isCorrect: true }
    ],
    difficulty: 'fácil',
    explanation: 'Macronutrientes são nutrientes que o corpo precisa em grandes quantidades: carboidratos, proteínas e gorduras. Vitaminas são micronutrientes.',
    estimatedTime: 45
  },
];

export const mockResults: QuizResult[] = [
  {
    id: '1',
    userId: 'user1',
    subjectId: '1',
    date: new Date('2023-05-01'),
    score: 80,
    totalTime: 100,
    answers: [
      { questionId: '1', selectedOptionIndex: 1, correct: true, timeSpent: 55 },
      { questionId: '2', selectedOptionIndex: 2, correct: false, timeSpent: 45 },
    ]
  },
];