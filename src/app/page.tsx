'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
        setError('Oops! Parece que as matérias fugiram. 🏃‍♀️ Vamos tentar pegá-las de novo!');
        setLoading(false);
      }
    };

    fetchSubjects();
    setFoodEmoji(getRandomFoodEmoji());
  }, []);

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubject(e.target.value);
  };

  const startQuiz = () => {
    if (selectedSubject) {
      router.push(`/quiz/${selectedSubject}`);
    }
  };

  if (loading) return <div className="text-center p-10 text-2xl animate-pulse">Carregando conhecimento... 🧠</div>;
  if (error) return <div className="text-center p-10 text-xl text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-200 to-purple-200 p-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 text-purple-600">Quiz Nutricional {foodEmoji}</h1>
            <p className="text-xl text-gray-600">Olá, Letícia! Pronta para aprender?</p>
          </div>
          
          <div className="mb-6">
            <select 
              value={selectedSubject}
              onChange={handleSubjectChange}
              className="w-full p-3 border border-purple-300 rounded-full text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="">Escolha uma matéria</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
          
          <button
            onClick={startQuiz}
            disabled={!selectedSubject}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Começar Quiz!
          </button>
          
          <div className="mt-8 text-center text-gray-600">
            <p className="italic">"A nutrição é a base da saúde, e o conhecimento é o tempero da vida!" 💖</p>
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
