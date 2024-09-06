import { Question } from '@/app/types/models';
import React from 'react';

interface QuestionResultProps {
  question: Question;
  userAnswerIndex: number;
  questionNumber: number;
}

const QuestionResult: React.FC<QuestionResultProps> = ({ question, userAnswerIndex, questionNumber }) => {
  const correctAnswerIndex = question.options.findIndex(option => option.isCorrect);
  const isCorrect = userAnswerIndex === correctAnswerIndex;

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${isCorrect ? 'border-green-500' : 'border-red-500'}`}>
      <h3 className="text-lg font-semibold mb-2">
        Pergunta {questionNumber}: {question.question}
      </h3>
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <div
            key={index}
            className={`p-2 rounded ${
              index === userAnswerIndex
                ? isCorrect
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
                : index === correctAnswerIndex
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100'
            }`}
          >
            {option.text}
            {index === userAnswerIndex && (
              <span className="ml-2">
                {isCorrect ? '✅ Sua resposta (Correta)' : '❌ Sua resposta'}
              </span>
            )}
            {!isCorrect && index === correctAnswerIndex && (
              <span className="ml-2">✅ Resposta correta</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionResult;