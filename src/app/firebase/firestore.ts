import { db } from './config';
import { collection, getDocs, addDoc, query, where, orderBy, limit, QueryConstraint } from 'firebase/firestore';
import { Subject, Question, QuizResult } from '../types/models';
import { mockSubjects, mockQuestions, mockResults } from '../mocks/dataMocks'; // Certifique-se de que o caminho está correto

// Function to get all subjects
export async function getSubjects(): Promise<Subject[]> {
  // TODO: Replace with actual Firestore query when database is set up
  return mockSubjects;
}

// Function to get questions for a specific subject
export async function getQuestionsBySubject(subjectId: string): Promise<Question[]> {
  // TODO: Replace with actual Firestore query when database is set up
  return mockQuestions.filter(q => q.subjectId === subjectId);
}

// Function to save quiz result
export async function saveQuizResult(result: Omit<QuizResult, 'id' | 'date'>): Promise<void> {
  // TODO: Replace with actual Firestore addDoc when database is set up
  console.log('Saving quiz result:', result);
}

// Function to get user's result history
export async function getResultHistory(userId: string, limitCount = 10): Promise<QuizResult[]> {
  // TODO: Replace with actual Firestore query when database is set up
  return mockResults.filter(r => r.userId === userId).slice(0, limitCount);
}