'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '../../../components/Button';
import QuestionResult from '../../../components/QuestionResult';
import { mockQuestions } from '@/app/mocks/dataMocks';
import { Question } from '@/app/types/models';

interface QuizResult {
  subjectId: string;
  questions: Question[];
  userAnswers: number[];
  timeSpent: number;
}

const QuizResultsPage: React.FC<{ params: { subjectId: string } }> = ({ params }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    const answers = searchParams.get('answers');
    const time = searchParams.get('time');

    if (answers && time) {
      const userAnswers = JSON.parse(answers) as number[];
      const timeSpent = parseInt(time, 10);
      const questions = mockQuestions.filter(q => q.subjectId === params.subjectId);

      setQuizResult({
        subjectId: params.subjectId,
        questions,
        userAnswers,
        timeSpent
      });
    }
  }, [params.subjectId, searchParams]);

  if (!quizResult) {
    return <div>Carregando resultados...</div>;
  }

  const correctAnswers = quizResult.questions.reduce((sum, question, index) => 
    sum + (question.options[quizResult.userAnswers[index]].isCorrect ? 1 : 0), 0);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-100 to-blue-200 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <main className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-lg shadow-lg p-6 sm:p-8 max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-purple-600 mb-4 text-center">Resultados do Quiz</h1>
        
        <div className="bg-purple-100 rounded-lg p-4 mb-6 flex justify-between items-center">
          <div className="text-purple-700">
            <p className="font-bold">Pontuação: {correctAnswers} / {quizResult.questions.length}</p>
            <p>Tempo total: {formatTime(quizResult.timeSpent)}</p>
          </div>
          <div className="text-2xl font-bold text-purple-600">
            {Math.round((correctAnswers / quizResult.questions.length) * 100)}%
          </div>
        </div>

        <div className="space-y-6 mb-6">
          {quizResult.questions.map((question, index) => (
            <QuestionResult
              key={question.id}
              question={question}
              userAnswerIndex={quizResult.userAnswers[index]}
              questionNumber={index + 1}
            />
          ))}
        </div>

        <div className="flex justify-between">
          <Button onClick={() => router.push('/')} variant="secondary">
            Voltar para o Início
          </Button>
          <Button onClick={() => router.push(`/quiz/${params.subjectId}`)}>
            Tentar Novamente
          </Button>
        </div>
      </main>
    </div>
  );
};

export default QuizResultsPage;