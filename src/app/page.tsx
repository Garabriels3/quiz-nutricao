'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../components/Button';
import Select from '../components/Select';
import { mockSubjects } from './mocks/dataMocks';
import { Subject } from './types/models';

const funnyGreetings = [
  "Letícia, pronta para mais um round de 'tortura cerebral nutricional'?",
  "Bem-vinda ao show do milhão... de calorias que você vai queimar pensando!",
  "Prepare-se para o único teste onde 'passar fome' é opcional, mas recomendado!",
  "Letícia, sua dieta de conhecimento começa agora. Sem pausa para lanche!",
  "Pronta para provar que seu cérebro não está tão frito quanto aquele último pastel?",
  "Vamos ver se você consegue digerir essas perguntas melhor que lactose!",
  "Hora de malhar esses neurônios! Prometo que dói menos que a academia.",
  "Letícia, seu desafio de hoje: sobreviver a este quiz sem precisar de terapia depois!",
  "Prepare-se para suar mais respondendo essas perguntas do que na sua última aula prática!",
  "Bem-vinda ao quiz! Onde as únicas calorias que você vai contar são as do seu esforço mental."
];

const foodEmojis = ["🍎", "🥑", "🥕", "🍓", "🥦", "🍇", "🍉", "🍋", "🥝", "🍒"];

export default function Home() {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [greeting, setGreeting] = useState('');
  const [emoji, setEmoji] = useState('');
  const router = useRouter();

  useEffect(() => {
    setGreeting(funnyGreetings[Math.floor(Math.random() * funnyGreetings.length)]);
    setEmoji(foodEmojis[Math.floor(Math.random() * foodEmojis.length)]);
  }, []);

  const handleStartQuiz = () => {
    if (selectedSubject) {
      router.push(`/quiz/${selectedSubject}`);
    }
  };

  const isSubjectSelected = selectedSubject !== '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-100 to-blue-200 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <main className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-lg shadow-lg p-6 sm:p-8 max-w-md w-full transform transition-all duration-300 hover:shadow-xl">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-bounce">{emoji}</div>
          <h1 className="text-3xl font-bold text-purple-600 mb-4">Olá, Letícia!</h1>
          <p className="text-lg text-purple-700 italic px-4 font-light">{greeting}</p>
        </div>
        
        <div className="mb-8">
          <Select
            options={mockSubjects.map((subject: Subject) => ({ value: subject.id, label: subject.name }))}
            value={selectedSubject}
            onChange={setSelectedSubject}
            placeholder="Escolha uma matéria (se tiver coragem)"
          />
        </div>
        
        <div className="space-y-4">
          <Button 
            onClick={handleStartQuiz} 
            disabled={!isSubjectSelected}
            fullWidth
          >
            {isSubjectSelected ? 'Iniciar Quiz (Boa sorte!)' : 'Selecione uma matéria para começar'}
          </Button>
          <Button 
            href="/history" 
            variant="secondary"
            fullWidth
          >
            Ver Histórico de Quizzes (Relembre o sofrimento)
          </Button>
        </div>
      </main>
      <footer className="mt-8 text-center text-purple-700">
        <p className="font-medium text-sm">Feito com 💖 e litros de café para manter Letícia acordada</p>
      </footer>
    </div>
  );
}
