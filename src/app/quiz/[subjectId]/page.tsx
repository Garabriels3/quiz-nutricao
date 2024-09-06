'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../../../components/Button';
import ConfirmDialog from '../../../components/ConfirmDialog';
import FireworksAnimation from '../../../components/FireworksAnimation';
import { Question } from '@/app/types/models';
import { mockQuestions } from '@/app/mocks/dataMocks';

const QuizPage: React.FC<{ params: { subjectId: string } }> = ({ params }) => {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerConfirmed, setIsAnswerConfirmed] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [quizTime, setQuizTime] = useState(0);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  useEffect(() => {
    const subjectId = String(params.subjectId);
    setQuestions(mockQuestions.filter(q => q.subjectId === subjectId));
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
  }, [params.subjectId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuizTime(prevTime => prevTime + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAnswerSelect = (index: number) => {
    if (!isAnswerConfirmed) {
      setSelectedAnswer(index);
    }
  };

  const handleConfirmAnswer = () => {
    if (selectedAnswer !== null) {
      const currentQuestion = questions[currentQuestionIndex];
      const isCorrect = currentQuestion.options[selectedAnswer].isCorrect;
      setIsAnswerCorrect(isCorrect);
      setIsAnswerConfirmed(true);
      setUserAnswers(prev => [...prev, selectedAnswer]);
      if (isCorrect) {
        setShowFireworks(true);
        playCorrectSound();
        setTimeout(() => setShowFireworks(false), 2000);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedAnswer(null);
      setIsAnswerConfirmed(false);
    } else {
      // Quiz finished, navigate to results page with data
      const searchParams = new URLSearchParams();
      searchParams.append('answers', JSON.stringify(userAnswers));
      searchParams.append('time', quizTime.toString());
      router.push(`/quiz-results/${params.subjectId}?${searchParams.toString()}`);
    }
  };

  const playCorrectSound = () => {
    if (audioContextRef.current) {
      const ctx = audioContextRef.current;
      const now = ctx.currentTime;

      const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
      const noteDuration = 0.1;
      const totalDuration = noteDuration * notes.length;

      notes.forEach((freq, index) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(freq, now + index * noteDuration);

        gainNode.gain.setValueAtTime(0, now + index * noteDuration);
        gainNode.gain.linearRampToValueAtTime(0.5, now + index * noteDuration + 0.01);
        gainNode.gain.linearRampToValueAtTime(0, now + (index + 1) * noteDuration);

        oscillator.start(now + index * noteDuration);
        oscillator.stop(now + (index + 1) * noteDuration);
      });
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-100 to-blue-200 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <main className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-lg shadow-lg p-6 sm:p-8 max-w-2xl w-full relative">
        {/* Timer e Progresso do Quiz */}
        <div className="absolute top-0 left-0 right-0 bg-purple-100 p-4 rounded-t-lg flex justify-between items-center">
          <div className="text-purple-700 font-bold text-xl">
            Tempo: {formatTime(quizTime)}
          </div>
          <div className="text-purple-700 font-semibold">
            Pergunta {currentQuestionIndex + 1} de {questions.length}
          </div>
        </div>

        {/* Espaço para o conteúdo principal do quiz */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-purple-600 mb-6">{currentQuestion.question}</h2>

          <div className="space-y-4 mb-6">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-md transition-all duration-200 ${
                  selectedAnswer === index
                    ? isAnswerConfirmed
                      ? isAnswerCorrect
                        ? 'bg-green-200 text-green-800 border-2 border-green-500'
                        : 'bg-red-200 text-red-800 border-2 border-red-500'
                      : 'bg-purple-200 text-purple-800 border-2 border-purple-500'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-2 border-transparent'
                }`}
                disabled={isAnswerConfirmed}
              >
                {option.text}
              </button>
            ))}
          </div>

          {!isAnswerConfirmed ? (
            <Button
              onClick={handleConfirmAnswer}
              disabled={selectedAnswer === null}
              fullWidth
            >
              Confirmar Resposta
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              fullWidth
            >
              {currentQuestionIndex < questions.length - 1 ? 'Próxima Pergunta' : 'Finalizar Quiz'}
            </Button>
          )}

          <Button
            onClick={() => setShowCancelDialog(true)}
            variant="secondary"
            fullWidth
            className="mt-4"
          >
            Cancelar Quiz
          </Button>
        </div>
      </main>

      {showFireworks && <FireworksAnimation />}

      <ConfirmDialog
        isOpen={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        onConfirm={() => router.push('/')}
        title="Cancelar Quiz"
        message="Tem certeza que deseja sair do quiz? Seus progressos serão perdidos."
      />
    </div>
  );
};

export default QuizPage;