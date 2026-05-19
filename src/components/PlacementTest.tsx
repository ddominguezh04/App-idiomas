import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  Loader2,
  Trophy,
  BrainCircuit
} from 'lucide-react';

interface Question {
  id: string;
  level: string;
  type: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface PlacementTestProps {
  language: string;
  nativeLanguage: string;
  onComplete: (level: string) => void;
}

import { getTranslation } from '../lib/translations';

export default function PlacementTest({ language, nativeLanguage, onComplete }: PlacementTestProps) {
  const t = getTranslation(nativeLanguage);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    async function fetchTest() {
      try {
        const response = await fetch('/api/placement/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ language, nativeLanguage })
        });
        const data = await response.json();
        setQuestions(data.questions || []);
      } catch (error) {
        console.error("Test load error:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTest();
  }, [language, nativeLanguage]);

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({ ...prev, [questions[currentIdx].id]: answer }));
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const calculateLevel = () => {
    let score = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        score++;
      }
    });

    if (score <= 2) return 'A1';
    if (score <= 4) return 'A2';
    if (score <= 6) return 'B1';
    if (score <= 8) return 'B2';
    if (score <= 9) return 'C1';
    return 'C2';
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center overflow-hidden">
        <div className="relative mb-8">
          <Loader2 className="w-16 h-16 text-natural-green animate-spin" />
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse' }}
            className="absolute inset-0 bg-natural-green/20 rounded-full blur-2xl"
          />
        </div>
        <p className="font-serif italic text-xl text-natural-dark break-words">{t.loadingUniverse}</p>
        <div className="w-48 h-1 bg-natural-border rounded-full overflow-hidden mt-6">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 6, ease: "linear" }}
            className="bg-natural-green h-full"
          />
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIdx];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div 
            key="question"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="flex justify-between items-center overflow-hidden">
              <span className="text-[10px] font-bold uppercase tracking-widest text-natural-taupe truncate">
                Question {currentIdx + 1} of {questions.length}
              </span>
              <div className="px-3 py-1 bg-natural-sidebar rounded-full text-[10px] font-bold text-natural-green border border-natural-green/20 shrink-0">
                {language}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-serif text-natural-dark">{currentQuestion.question}</h3>
              <div className="grid gap-3">
                {currentQuestion.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(opt)}
                    className="p-5 rounded-2xl border border-natural-border text-left hover:border-natural-green hover:bg-natural-sidebar transition-all font-medium"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="results"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-10 space-y-8 overflow-hidden"
          >
            <div className="inline-block p-6 md:p-10 bg-natural-sidebar rounded-[40px] mb-4 w-full">
              <BrainCircuit size={64} className="text-natural-green mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-serif italic mb-2 break-words">{t.evaluationComplete}</h2>
              <p className="text-natural-taupe break-words">We've determined your starting position.</p>
            </div>

            <div className="flex flex-col items-center">
               <div className="text-sm font-bold uppercase tracking-widest text-natural-taupe mb-2">{t.assessedLevel}</div>
               <div className="text-8xl font-serif italic text-natural-green">{calculateLevel()}</div>
            </div>

            <button 
              onClick={() => onComplete(calculateLevel())}
              className="w-full py-5 bg-natural-green text-white rounded-[24px] font-bold text-xl shadow-lg shadow-natural-green/20 active:scale-95 transition-all"
            >
              {t.startJourney} <ArrowRight size={20} className="inline ml-2" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
