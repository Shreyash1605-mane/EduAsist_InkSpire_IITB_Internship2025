// FIX: Removed circular import of 'Page' from itself.
export type Page =
  | 'dashboard'
  | 'resources'
  | 'internships'
  | 'quizzes'
  | 'career'
  | 'profile'
  | 'navigator'
  | 'timetable'
  | 'exams'
  | 'languages';

export interface Resource {
  id: number;
  type: 'PDF' | 'Video' | 'Image' | 'File';
  title: string;
  description: string;
  uploader: string;
  thumbnail: string;
  url: string;
}

export interface Internship {
    id: number;
    title: string;
    company: string;
    duration: string;
    description: string;
    skills: string[];
    points: number;
    badgeId?: number;
}

export interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: number;
}

export interface Quiz {
    id: number;
    title: string;
    subject: string;
    questions: QuizQuestion[];
}

export interface CareerRoadmap {
    id?: number; // Made optional as AI-generated ones won't have it
    domain?: string; // Made optional
    title: string;
    steps: { title: string; description: string }[];
}


export interface Badge {
    id: number;
    name: string;
    icon: string; // emoji or character
    description: string;
}

export interface Student {
  id: number;
  name:string;
  points: number;
  avatar: string;
}

export interface ExamQuestion {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
}