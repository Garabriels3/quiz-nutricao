'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useQuizStore } from '@/store/quizStore';
import { QuizResult } from '@/app/types/models';

export default function QuizResultPage() {
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const params = useParams();
  const { quizResult: storeQuizResult } = useQuizStore();

  useEffect(() => {
    if (storeQuizResult) {
      setQuizResult(storeQuizResult as QuizResult);
    }
  }, [storeQuizResult]);

  if (!quizResult) {
    return <div>Carregando resultado...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Resultado do Quiz 🎉</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Assunto: {quizResult.subjectId}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-pink-100 p-4 rounded-lg text-center">
            <p className="text-lg font-medium">Tempo total ⏱️</p>
            <p className="text-xl">{quizResult.totalTime.toFixed(2)} segundos</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg text-center">
            <p className="text-lg font-medium">Questões corretas ✅</p>
            <p className="text-xl">{quizResult.score} de {quizResult.answers.length}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg text-center">
            <p className="text-lg font-medium">Porcentagem de acerto 📊</p>
            <p className="text-xl">{((quizResult.score / quizResult.answers.length) * 100).toFixed(2)}%</p>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-4">Detalhes das questões:</h3>
        {quizResult.answers.map((answer, index) => (
          <div key={index} className={`mb-4 p-4 rounded-lg ${answer.correct ? 'bg-green-50' : 'bg-red-50'}`}>
            <p className="font-medium mb-2">{index + 1}. Questão ID: {answer.questionId}</p>
            <p className="text-gray-700">Opção selecionada: {answer.selectedOptionIndex + 1}</p>
            <p className={answer.correct ? 'text-green-600' : 'text-red-600'}>
              {answer.correct ? '✅ Correto!' : '❌ Incorreto'}
            </p>
            <p>Tempo gasto: {answer.timeSpent.toFixed(2)} segundos</p>
          </div>
        ))}
      </div>
    </div>
  );
}