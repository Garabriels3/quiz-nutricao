'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import { getSubjects } from './firebase/firestore';
import { Subject } from './types/models';

export default function Home() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [foodEmoji, setFoodEmoji] = useState<string>('🍎');
  const router = useRouter();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const fetchedSubjects = await getSubjects();
        setSubjects(fetchedSubjects);
        setLoading(false);
      } catch (err) {
        setError('Oops! As matérias estão de dieta. Tente novamente mais tarde!');
        setLoading(false);
      }
    };

    fetchSubjects();
    setFoodEmoji(getRandomFoodEmoji());
  }, []);

  const handleStartQuiz = () => {
    if (selectedSubject) {
      router.push(`/quiz/${selectedSubject}`);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-screen text-2xl animate-pulse">Carregando conhecimento... 🧠</div>;
  if (error) return <div className="flex items-center justify-center h-screen text-xl text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-200 to-purple-200 p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">{foodEmoji}</div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-purple-600">Quiz da Leticia</h1>
          </div>
          
          <div className="space-y-4 mb-6">
            <p className="text-md text-gray-700 italic">Ola Leticia gigante! Preparada para sofrer antes da prova? 🧠</p>
            <p className="text-md text-gray-700 italic">Ainda bem que ja me formei, ops! Te amooo!</p>
            <p className="text-md text-gray-700 italic">PS: Brincadeira ta, nao me pisa!</p>
          </div>
          
          <div className="mb-6">
            <label htmlFor="subject-select" className="block text-sm font-medium text-gray-700 mb-2">
              Escolha sua matéria favorita (ou a que você menos odeia):
            </label>
            <select 
              id="subject-select"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full p-3 border border-purple-300 rounded-full text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="">Selecione uma matéria (não vale fechar os olhos)</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
          
          <button
            onClick={handleStartQuiz}
            disabled={!selectedSubject}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            Iniciar Quiz (Prometo que não dói!)
          </button>
          
          <Link href="/history">
            <button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
              Ver Histórico de Quizzes
            </button>
          </Link>
          
          <div className="mt-8 text-center text-gray-600">
            <p className="italic">"Feito por Gabriel com amor para Leticia" 💖</p>
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
