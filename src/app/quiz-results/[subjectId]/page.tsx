'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Confetti from 'react-confetti';
import React from 'react';
import { useQuizStore } from '../../../store/quizStore';
import { QuizResult, Question } from '../../types/models';

export default function QuizResultPage() {
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [foodEmoji, setFoodEmoji] = useState<string>('🍎');
  const params = useParams();
  const router = useRouter();
  const { quizResult: storeQuizResult, questions: storeQuestions } = useQuizStore();

  useEffect(() => {
    if (storeQuizResult && storeQuestions) {
      setQuizResult(storeQuizResult);
      setQuestions(storeQuestions);
    }
    setFoodEmoji(getRandomFoodEmoji());
  }, [storeQuizResult, storeQuestions]);

  if (!quizResult || questions.length === 0) {
    return <div className="flex items-center justify-center h-screen text-2xl animate-pulse">Calculando seu sucesso... 🧮</div>;
  }

  const score = quizResult.answers.filter(a => a.correct).length;
  const totalQuestions = quizResult.answers.length;
  const percentage = (score / totalQuestions) * 100;
  const showConfetti = percentage > 70;

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-200 to-purple-200 p-4">
      {showConfetti && <Confetti />}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-4xl font-bold text-center mb-6 text-purple-600">Resultados do Quiz {foodEmoji}</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-pink-600 mb-4">Sua pontuação</h2>
            <p className="text-xl mb-2">
              Você acertou {score} de {totalQuestions} questões!
            </p>
            <p className="text-lg mb-4">
              Tempo total: {formatDuration(quizResult.totalTime)}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div
                className="bg-pink-600 h-2.5 rounded-full"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-6 mb-8">
            <h3 className="text-2xl font-bold text-purple-600 mb-4">Revisão das Questões</h3>
            {questions.map((question, index) => {
              const userAnswer = quizResult.answers[index];
              return (
                <div key={question.id} className="bg-gray-50 rounded-lg p-6 shadow">
                  <p className="font-semibold mb-4">{question.question}</p>
                  {question.options.map((option, optIndex) => {
                    const isUserAnswer = userAnswer.selectedOptionIndex === optIndex;
                    const isCorrectAnswer = option.isCorrect;
                    
                    let bgColor = 'bg-gray-100';
                    let borderColor = '';
                    let textColor = 'text-gray-700';

                    if (isUserAnswer) {
                      bgColor = userAnswer.correct ? 'bg-green-200' : 'bg-red-200';
                      borderColor = userAnswer.correct ? 'border-green-500' : 'border-red-500';
                      textColor = userAnswer.correct ? 'text-green-700' : 'text-red-700';
                    } else if (isCorrectAnswer) {
                      bgColor = 'bg-green-100';
                      borderColor = 'border-green-500';
                      textColor = 'text-green-700';
                    }

                    return (
                      <div 
                        key={optIndex}
                        className={`p-2 rounded mb-2 ${bgColor} ${isUserAnswer || isCorrectAnswer ? `border-2 ${borderColor}` : ''} ${textColor}`}
                      >
                        {option.text}
                        {isUserAnswer && (
                          <span className="ml-2 font-semibold">
                            {userAnswer.correct ? '✅ Sua resposta (correta)' : '❌ Sua resposta (incorreta)'}
                          </span>
                        )}
                        {isCorrectAnswer && !isUserAnswer && (
                          <span className="ml-2 font-semibold">✅ Resposta correta</span>
                        )}
                      </div>
                    );
                  })}
                  {!userAnswer.correct && (
                    <p className="text-sm text-gray-600 mt-2">
                      Explicação: {question.explanation}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="space-y-4">
            <button
              onClick={() => router.push('/')}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-full transition duration-300 ease-in-out"
            >
              Voltar para o Início
            </button>
            <button
              onClick={() => router.push('/history')}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-4 rounded-full transition duration-300 ease-in-out"
            >
              Ver Histórico de Quizzes
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