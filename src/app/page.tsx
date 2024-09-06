'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getSubjects } from '@/app/firebase/firestore';
import { Subject } from '@/app/types/models';

export default function Home() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const fetchedSubjects = await getSubjects();
        setSubjects(fetchedSubjects);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar as matérias. Por favor, tente novamente.');
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Escolha uma matéria para o quiz</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((subject) => (
          <Link href={`/quiz/${subject.id}`} key={subject.id}>
            <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2">{subject.name}</h2>
              <p className="text-gray-600">{subject.description}</p>
              {subject.category && (
                <p className="mt-2 text-sm text-gray-500">Categoria: {subject.category}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
