'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getQuestionsBySubject, saveQuizResult } from '@/app/firebase/firestore';
import { Question, QuizResult } from '@/app/types/models';
import { useQuizStore } from '@/store/quizStore';

export default function QuizPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [startTime, setStartTime] = useState(new Date());
  const [questionStartTime, setQuestionStartTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const params = useParams();
  const { setQuizResult } = useQuizStore();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const fetchedQuestions = await getQuestionsBySubject(params?.subjectId as string);
        setQuestions(fetchedQuestions);
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
  }, [params?.subjectId]);

  const handleAnswer = (optionIndex: number) => {
    const now = new Date();
    const timeSpent = (now.getTime() - questionStartTime.getTime()) / 1000;
    
    setUserAnswers([...userAnswers, optionIndex]);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setQuestionStartTime(now);
    } else {
      finishQuiz(optionIndex, timeSpent);
    }
  };

  const finishQuiz = (lastOptionIndex: number, lastQuestionTime: number) => {
    const endTime = new Date();
    const totalTime = (endTime.getTime() - startTime.getTime()) / 1000;
    
    const answers = questions.map((q, index) => ({
      questionId: q.id,
      selectedOptionIndex: index === currentQuestionIndex ? lastOptionIndex : userAnswers[index],
      correct: index === currentQuestionIndex 
        ? q.options[lastOptionIndex].isCorrect 
        : q.options[userAnswers[index]].isCorrect,
      timeSpent: index === currentQuestionIndex ? lastQuestionTime : 0 // You might want to track time for each question
    }));

    const score = answers.filter(a => a.correct).length;

    const quizResult: Omit<QuizResult, 'id' | 'date'> = {
      userId: 'user123', // Replace with actual user ID
      subjectId: params?.subjectId as string,
      score: score,
      totalTime: totalTime,
      answers: answers
    };

    saveQuizResult(quizResult)
      .then(() => {
        setQuizResult(quizResult as QuizResult);
        router.push(`/quiz-results/${params?.subjectId}`);
      })
      .catch((err) => {
        setError('Erro ao salvar o resultado do quiz. Por favor, tente novamente.');
      });
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;
  if (questions.length === 0) return <div>Nenhuma questão encontrada.</div>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Questão {currentQuestionIndex + 1} de {questions.length}</h1>
      <p className="mb-4">{currentQuestion.question}</p>
      <div className="grid gap-2">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}