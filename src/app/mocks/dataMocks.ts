import { Subject, Question } from '../types/models';

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
    question: 'Qual é a função principal das enzimas no corpo humano?',
    options: [
      { text: 'Armazenar energia', isCorrect: false },
      { text: 'Catalisar reações químicas', isCorrect: true },
      { text: 'Transportar oxigênio', isCorrect: false },
      { text: 'Produzir anticorpos', isCorrect: false }
    ],
    difficulty: 'médio',
    explanation: 'As enzimas são catalisadores biológicos que aceleram as reações químicas no corpo sem serem consumidas no processo.',
    estimatedTime: 60
  },
  {
    id: '2',
    subjectId: '1',
    question: 'Qual dos seguintes não é um macronutriente?',
    options: [
      { text: 'Carboidratos', isCorrect: false },
      { text: 'Proteínas', isCorrect: false },
      { text: 'Lipídios', isCorrect: false },
      { text: 'Vitaminas', isCorrect: true }
    ],
    difficulty: 'fácil',
    explanation: 'Macronutrientes são nutrientes necessários em grandes quantidades: carboidratos, proteínas e lipídios. Vitaminas são micronutrientes.',
    estimatedTime: 45
  },
  {
    id: '3',
    subjectId: '1',
    question: 'O que é ATP?',
    options: [
      { text: 'Uma proteína', isCorrect: false },
      { text: 'Um carboidrato', isCorrect: false },
      { text: 'Uma molécula de energia', isCorrect: true },
      { text: 'Um tipo de gordura', isCorrect: false }
    ],
    difficulty: 'médio',
    explanation: 'ATP (Adenosina Trifosfato) é a principal molécula de energia nas células, usada em muitos processos metabólicos.',
    estimatedTime: 50
  },
  {
    id: '4',
    subjectId: '1',
    question: 'Qual é o produto final da glicólise?',
    options: [
      { text: 'Glicose', isCorrect: false },
      { text: 'Piruvato', isCorrect: true },
      { text: 'Acetil-CoA', isCorrect: false },
      { text: 'Lactato', isCorrect: false }
    ],
    difficulty: 'difícil',
    explanation: 'A glicólise é o processo de quebra da glicose, resultando na formação de piruvato.',
    estimatedTime: 70
  },
  {
    id: '5',
    subjectId: '2',
    question: 'Qual vitamina é produzida pela pele quando exposta à luz solar?',
    options: [
      { text: 'Vitamina A', isCorrect: false },
      { text: 'Vitamina C', isCorrect: false },
      { text: 'Vitamina D', isCorrect: true },
      { text: 'Vitamina E', isCorrect: false }
    ],
    difficulty: 'fácil',
    explanation: 'A pele produz vitamina D quando exposta à luz solar, especificamente aos raios UVB.',
    estimatedTime: 40
  },
  {
    id: '6',
    subjectId: '2',
    question: 'Qual dos seguintes alimentos é uma boa fonte de proteína vegetal?',
    options: [
      { text: 'Arroz', isCorrect: false },
      { text: 'Batata', isCorrect: false },
      { text: 'Lentilha', isCorrect: true },
      { text: 'Azeite', isCorrect: false }
    ],
    difficulty: 'médio',
    explanation: 'Lentilhas são leguminosas ricas em proteínas, tornando-as uma excelente fonte de proteína vegetal.',
    estimatedTime: 55
  },
  {
    id: '7',
    subjectId: '2',
    question: 'O que é o índice glicêmico de um alimento?',
    options: [
      { text: 'A quantidade de glicose no alimento', isCorrect: false },
      { text: 'A velocidade com que o alimento aumenta o açúcar no sangue', isCorrect: true },
      { text: 'O total de calorias do alimento', isCorrect: false },
      { text: 'A quantidade de fibras no alimento', isCorrect: false }
    ],
    difficulty: 'médio',
    explanation: 'O índice glicêmico mede quão rapidamente um alimento pode elevar o nível de glicose no sangue.',
    estimatedTime: 60
  },
  {
    id: '8',
    subjectId: '2',
    question: 'Qual mineral é essencial para a formação de hemoglobina?',
    options: [
      { text: 'Cálcio', isCorrect: false },
      { text: 'Ferro', isCorrect: true },
      { text: 'Potássio', isCorrect: false },
      { text: 'Sódio', isCorrect: false }
    ],
    difficulty: 'médio',
    explanation: 'O ferro é um componente crucial da hemoglobina, a proteína nos glóbulos vermelhos que transporta oxigênio.',
    estimatedTime: 50
  }
];