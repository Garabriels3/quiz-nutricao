'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import React from 'react';
import { useQuizStore } from '../../../store/quizStore';
import { getQuestionsBySubject, saveQuizResult } from '../../firebase/firestore';
import { Question, QuizResult } from '../../types/models';


export default function QuizPage() {
  const [questions, setQuestionsState] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [startTime, setStartTime] = useState(new Date());
  const [questionStartTime, setQuestionStartTime] = useState(new Date());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [foodEmoji, setFoodEmoji] = useState<string>('🍎');

  const router = useRouter();
  const params = useParams();
  const { setQuizResult, setQuestions: setStoreQuestions } = useQuizStore();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const fetchedQuestions = await getQuestionsBySubject(params?.subjectId as string);
        setQuestionsState(fetchedQuestions);
        const now = new Date();
        setStartTime(now);
        setQuestionStartTime(now);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar as questões. Por favor, tente novamente.');
        setLoading(false);
      }
    };

    fetchQuestions();
    setFoodEmoji(getRandomFoodEmoji());
  }, [params?.subjectId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prevTime => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSelectAnswer = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const now = new Date();
    const timeSpent = (now.getTime() - questionStartTime.getTime()) / 1000;
    
    setUserAnswers([...userAnswers, selectedAnswer]);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setQuestionStartTime(now);
      setSelectedAnswer(null);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    const endTime = new Date();
    const totalTime = (endTime.getTime() - startTime.getTime()) / 1000;
    
    const quizResult: Omit<QuizResult, 'id'> = {
      userId: 'user123', // Substitua por um ID de usuário real quando implementar autenticação
      subjectId: params?.subjectId as string,
      score: userAnswers.filter((answer, index) => 
        answer === questions[index].options.findIndex(opt => opt.isCorrect)
      ).length,
      totalTime: totalTime,
      answers: questions.map((question, index) => ({
        questionId: question.id,
        selectedOptionIndex: userAnswers[index] ?? -1, // Use -1 se não houver resposta
        correct: userAnswers[index] === question.options.findIndex(opt => opt.isCorrect),
        timeSpent: 0 // Você pode adicionar a lógica para calcular o tempo gasto em cada questão, se necessário
      })),
      date: new Date()
    };

    try {
      // Remova campos undefined ou null
      const cleanQuizResult = Object.fromEntries(
        Object.entries(quizResult).filter(([_, v]) => v != null)
      ) as Omit<QuizResult, 'id'>;

      await saveQuizResult(cleanQuizResult);
      setQuizResult(cleanQuizResult as QuizResult);
      setStoreQuestions(questions);
      router.push(`/quiz-results/${params?.subjectId}`);
    } catch (error) {
      console.error('Erro ao salvar o resultado do quiz:', error);
      setError('Erro ao salvar o resultado do quiz. Por favor, tente novamente.');
    }
  };

  const handleCancel = () => {
    if (confirm('Tem certeza que deseja cancelar o quiz? Todo o progresso será perdido.')) {
      router.push('/');
    }
  };

  if (loading) return <div className="flex items-center justify-center h-screen text-2xl animate-pulse">Preparando as questões... 📚</div>;
  if (error) return <div className="flex items-center justify-center h-screen text-xl text-red-500">{error}</div>;
  if (questions.length === 0) return <div className="flex items-center justify-center h-screen text-xl">Nenhuma questão encontrada para este assunto.</div>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-200 to-purple-200 p-4 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-purple-600">Quiz Nutricional {foodEmoji}</h1>
            <div className="text-xl font-semibold text-pink-500">
              Tempo: {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}
            </div>
          </div>
          <div className="mb-6 text-center">
            <span className="text-lg font-medium text-gray-600">Questão {currentQuestionIndex + 1} de {questions.length}</span>
          </div>
          <p className="text-xl mb-6 text-gray-800">{currentQuestion.question}</p>
          <div className="space-y-4 mb-6">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                className={`w-full p-3 text-left rounded-full transition duration-300 ease-in-out ${
                  selectedAnswer === index
                    ? 'bg-purple-500 text-white'
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                }`}
              >
                {option.text}
              </button>
            ))}
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleCancel}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestionIndex === questions.length - 1 ? 'Finalizar' : 'Próxima'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function getRandomFoodEmoji() {
  const emojis = ['🍎', '🥑', '🥦', '🍇', '🥕', '🍌', '🍓', '🥚', '🥛', '🧀', '🍉', '🍊', '🥝', '🍒', '🍑'];
  return emojis[Math.floor(Math.random() * emojis.length)];
}