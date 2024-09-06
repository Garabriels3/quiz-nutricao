'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Confetti from 'react-confetti';
import React from 'react';
import { useQuizStore } from '../../../store/quizStore';
import { QuizResult } from '../../types/models';

export default function QuizResultPage() {
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [foodEmoji, setFoodEmoji] = useState<string>('🍎');
  const params = useParams();
  const { quizResult: storeQuizResult } = useQuizStore();

  useEffect(() => {
    if (storeQuizResult) {
      setQuizResult(storeQuizResult as QuizResult);
    }
    setFoodEmoji(getRandomFoodEmoji());
  }, [storeQuizResult]);

  if (!quizResult) {
    return <div className="text-center p-10 text-2xl animate-pulse">Calculando seu sucesso... 🧮</div>;
  }

  const percentage = ((quizResult.score / quizResult.answers.length) * 100).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-200 to-purple-200 p-4 flex items-center justify-center">
      <Confetti />
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-4xl font-bold text-center mb-6 text-purple-600">Resultado do Quiz {foodEmoji}</h1>
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Assunto: {quizResult.subjectId}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-pink-100 p-4 rounded-2xl text-center shadow-md">
              <p className="text-lg font-medium text-pink-600">Tempo total ⏱️</p>
              <p className="text-xl text-pink-800">{quizResult.totalTime.toFixed(2)} segundos</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-2xl text-center shadow-md">
              <p className="text-lg font-medium text-purple-600">Questões corretas ✅</p>
              <p className="text-xl text-purple-800">{quizResult.score} de {quizResult.answers.length}</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-2xl text-center shadow-md">
              <p className="text-lg font-medium text-blue-600">Porcentagem de acerto 📊</p>
              <p className="text-xl text-blue-800">{percentage}%</p>
            </div>
          </div>
          
          <h3 className="text-2xl font-semibold mb-4 text-purple-600">Detalhes das questões:</h3>
          {quizResult.answers.map((answer, index) => (
            <div key={index} className={`mb-4 p-4 rounded-2xl shadow-md ${answer.correct ? 'bg-green-50' : 'bg-red-50'}`}>
              <p className="font-medium mb-2 text-gray-800">{index + 1}. Questão ID: {answer.questionId}</p>
              <p className="text-gray-700">Opção selecionada: {answer.selectedOptionIndex + 1}</p>
              <p className={answer.correct ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                {answer.correct ? '✅ Correto!' : '❌ Incorreto'}
              </p>
              <p className="text-gray-600">Tempo gasto: {answer.timeSpent.toFixed(2)} segundos</p>
            </div>
          ))}
          
          <div className="mt-8 text-center text-gray-600">
            <p className="italic">"O conhecimento é como uma dieta balanceada: quanto mais variado, melhor!" 💖</p>
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