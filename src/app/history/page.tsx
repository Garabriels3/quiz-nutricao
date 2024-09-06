'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getQuizHistory } from '../firebase/firestore';
import { QuizResult } from '../types/models';
import React from 'react';

export default function HistoryPage() {
  const [history, setHistory] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Substitua 'user123' pelo ID real do usuário quando tiver autenticação implementada
        const quizHistory = await getQuizHistory('user123');
        setHistory(quizHistory);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar o histórico. Por favor, tente novamente.');
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <div className="flex items-center justify-center h-screen text-2xl animate-pulse">Carregando histórico... 📚</div>;
  if (error) return <div className="flex items-center justify-center h-screen text-xl text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-200 to-purple-200 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-6 text-purple-600 text-center">Histórico de Quizzes</h1>
          {history.length === 0 ? (
            <p className="text-center text-gray-600">Você ainda não realizou nenhum quiz.</p>
          ) : (
            <div className="space-y-6">
              {history.map((quiz) => (
                <div key={quiz.id} className="bg-purple-50 p-6 rounded-2xl shadow-md">
                  <h2 className="text-2xl font-semibold mb-2 text-purple-700">Quiz de {quiz.subjectId}</h2>
                  <p className="text-gray-600">Data: {new Date(quiz.date).toLocaleString()}</p>
                  <p className="text-gray-600">Pontuação: {quiz.score} de {quiz.answers.length}</p>
                  <p className="text-gray-600">Tempo total: {quiz.totalTime.toFixed(2)} segundos</p>
                  <button
                    onClick={() => router.push(`/quiz-results/${quiz.id}`)}
                    className="mt-4 bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
                  >
                    Ver Detalhes
                  </button>
                </div>
              ))}
            </div>
          )}
          <button
            onClick={() => router.push('/')}
            className="mt-8 w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-4 rounded-full transition duration-300 ease-in-out"
          >
            Voltar para a Página Inicial
          </button>
        </div>
      </div>
    </div>
  );
}