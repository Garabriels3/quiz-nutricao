import { db } from './config';
import { collection, getDocs, addDoc, query, where, orderBy, limit, QueryConstraint } from 'firebase/firestore';
import { Subject, Question, QuizResult } from '../types/models';

// Function to get all subjects
export async function getSubjects(): Promise<Subject[]> {
  const subjectsCollection = collection(db, 'subjects');
  const subjectsSnapshot = await getDocs(subjectsCollection);
  return subjectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Subject));
}

// Function to get questions for a specific subject
export async function getQuestionsBySubject(subjectId: string): Promise<Question[]> {
  const questionsCollection = collection(db, 'questions');
  const q = query(questionsCollection, where('subjectId', '==', subjectId));
  const questionsSnapshot = await getDocs(q);
  return questionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Question));
}

// Function to save quiz result
export async function saveQuizResult(result: Omit<QuizResult, 'id' | 'date'>): Promise<void> {
  const resultsCollection = collection(db, 'quizResults');
  await addDoc(resultsCollection, {
    ...result,
    date: new Date()
  });
}

// Function to get user's result history
export async function getResultHistory(userId: string, limitCount = 10): Promise<QuizResult[]> {
  const resultsCollection = collection(db, 'quizResults');
  const q = query(
    resultsCollection,
    where('userId', '==', userId),
    orderBy('date', 'desc'),
    limit(limitCount)
  );
  const resultsSnapshot = await getDocs(q);
  return resultsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as QuizResult));
}