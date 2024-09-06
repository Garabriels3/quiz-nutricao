'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getResultHistory } from '@/app/firebase/firestore';
import { QuizResult } from '@/app/types/models';

export default function HistoryPage() {
  const [quizHistory, setQuizHistory] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getResultHistory('user123'); // Replace with actual user ID
        setQuizHistory(history);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar o histórico. Por favor, tente novamente.');
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Histórico de Quizzes</h1>
      {quizHistory.length === 0 ? (
        <p>Nenhum quiz realizado ainda.</p>
      ) : (
        <div className="grid gap-4">
          {quizHistory.map((quiz) => (
            <div key={quiz.id} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">Assunto: {quiz.subjectId}</h2>
              <p>Data: {new Date(quiz.date).toLocaleString()}</p>
              <p>Pontuação: {quiz.score}/{quiz.answers.length}</p>
              <p>Tempo total: {quiz.totalTime.toFixed(2)} segundos</p>
              <button
                onClick={() => router.push(`/quiz-results/${quiz.subjectId}?historyId=${quiz.id}`)}
                className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Ver detalhes
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}