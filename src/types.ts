export interface Message {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface Language {
  code: string;
  name: string;
  flag: string;
  color: string;
}

export interface LearningLanguage {
  code: string;
  name: string;
  flag: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  xp: number;
  streak: number;
  lessonsDone: number;
}

export interface UserStats {
  uid: string;
  nativeLanguage: string;
  learningLanguages: Record<string, LearningLanguage>; // Keyed by language code
  activeLanguageCode: string; // The one currently being learned
  completedLessons: string[]; // List of lesson IDs
  vocabulary: { word: string; translation: string; learnedDate: string }[];
}

export type ExerciseType = 'multiple-choice' | 'fill-gap' | 'listening' | 'translation';

export interface Exercise {
  id: string;
  type: ExerciseType;
  question: string;
  options?: string[]; // For multiple-choice
  correctAnswer: string;
  clue?: string;
  audioText?: string; // For listening practice
}

export interface LessonContent {
  id: string;
  title: string;
  level: string;
  explanation: string;
  examples: { original: string; translation: string }[];
  exercises: Exercise[];
}

export const LANGUAGES: Language[] = [
  { code: 'Spanish', name: 'Spanish', flag: '🇪🇸', color: 'bg-red-500' },
  { code: 'English', name: 'English', flag: '🇺🇸', color: 'bg-blue-800' },
  { code: 'French', name: 'French', flag: '🇫🇷', color: 'bg-blue-600' },
  { code: 'German', name: 'German', flag: '🇩🇪', color: 'bg-orange-500' },
  { code: 'Italian', name: 'Italian', flag: '🇮🇹', color: 'bg-emerald-500' },
  { code: 'Portuguese', name: 'Portuguese', flag: '🇧🇷', color: 'bg-green-600' },
  { code: 'Chinese', name: 'Chinese', flag: '🇨🇳', color: 'bg-red-600' },
  { code: 'Japanese', name: 'Japanese', flag: '🇯🇵', color: 'bg-white' },
  { code: 'Korean', name: 'Korean', flag: '🇰🇷', color: 'bg-blue-500' },
  { code: 'Russian', name: 'Russian', flag: '🇷🇺', color: 'bg-blue-700' },
];
