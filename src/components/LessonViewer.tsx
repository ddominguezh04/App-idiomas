import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  HelpCircle,
  Play,
  ArrowRight,
  BookOpen,
  Trophy,
  Star
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { LessonContent, Exercise } from '../types';
import { getTranslation } from '../lib/translations';

interface LessonViewerProps {
  lesson: LessonContent;
  nativeLanguage: string;
  onComplete: (score: number) => void;
  onClose: () => void;
}

export default function LessonViewer({ lesson, nativeLanguage, onComplete, onClose }: LessonViewerProps) {
  const t = getTranslation(nativeLanguage);
  const [step, setStep] = useState<'explanation' | 'exercises' | 'results'>('explanation');
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const currentExercise = lesson.exercises[currentExerciseIdx];
  const isLastExercise = currentExerciseIdx === lesson.exercises.length - 1;

  const handleAnswer = (answer: string) => {
    setUserAnswers(prev => ({ ...prev, [currentExercise.id]: answer }));
    setShowFeedback(true);
    
    if (answer.toLowerCase().trim() === currentExercise.correctAnswer.toLowerCase().trim()) {
      setScore(prev => prev + 1);
    }
  };

  const nextStep = () => {
    if (step === 'explanation') {
      setStep('exercises');
    } else if (step === 'exercises') {
      if (isLastExercise) {
        setStep('results');
      } else {
        setCurrentExerciseIdx(prev => prev + 1);
        setShowFeedback(false);
      }
    }
  };

  const calculatePercentage = () => Math.round((score / lesson.exercises.length) * 100);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-natural-bg/95 backdrop-blur-sm"
    >
      <div className="w-full max-w-4xl h-full max-h-[800px] bg-white rounded-[40px] border border-natural-border shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 md:p-8 bg-natural-sidebar border-b border-natural-border flex items-center justify-between overflow-hidden">
          <button onClick={onClose} className="p-2 hover:bg-white/50 rounded-xl transition-colors shrink-0">
            <ChevronLeft size={24} />
          </button>
          <div className="text-center min-w-0 px-4">
            <h3 className="font-serif italic text-lg md:text-xl truncate">{lesson.title}</h3>
            <p className="text-[10px] uppercase tracking-widest font-bold opacity-60 truncate">{t.level} {lesson.level}</p>
          </div>
          <div className="w-10 shrink-0" /> {/* Spacer */}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12">
          <AnimatePresence mode="wait">
            {step === 'explanation' && (
              <motion.div 
                key="explanation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="prose prose-slate max-w-none">
                  <ReactMarkdown>{lesson.explanation}</ReactMarkdown>
                </div>

                <div className="space-y-4">
                  <h4 className="font-display font-bold text-lg">{t.examples}</h4>
                  <div className="grid gap-4">
                    {lesson.examples.map((ex, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-natural-bg border border-natural-border flex items-center gap-4 overflow-hidden">
                        <div className="w-8 h-8 rounded-full bg-natural-green/10 flex items-center justify-center text-natural-green shrink-0">
                          <Play size={14} fill="currentColor" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-natural-dark text-lg truncate">{ex.original}</p>
                          <p className="text-sm text-natural-taupe italic truncate">{ex.translation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={nextStep}
                  className="w-full py-4 bg-natural-dark text-natural-bg rounded-2xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  {t.startPractice} <ArrowRight size={20} />
                </button>
              </motion.div>
            )}

            {step === 'exercises' && (
              <motion.div 
                key="exercises"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-center mb-4 overflow-hidden">
                  <span className="text-xs font-bold uppercase tracking-widest text-natural-taupe truncate">
                    {t.questionOf.replace('{{current}}', (currentExerciseIdx + 1).toString()).replace('{{total}}', lesson.exercises.length.toString())}
                  </span>
                  <div className="flex gap-1 shrink-0">
                    {lesson.exercises.map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-2 h-2 rounded-full transition-all ${
                          i === currentExerciseIdx ? 'bg-natural-green w-4' : i < currentExerciseIdx ? 'bg-natural-green/40' : 'bg-natural-sidebar'
                        }`} 
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-2xl font-serif break-words">{currentExercise.question}</h4>
                  
                  {currentExercise.type === 'multiple-choice' && (
                    <div className="grid gap-3">
                      {currentExercise.options?.map((opt, i) => {
                        const isSelected = userAnswers[currentExercise.id] === opt;
                        const isCorrect = opt === currentExercise.correctAnswer;
                        
                        return (
                          <button
                            key={i}
                            disabled={showFeedback}
                            onClick={() => handleAnswer(opt)}
                            className={`p-5 rounded-2xl border text-left transition-all ${
                              showFeedback
                                ? isCorrect
                                  ? 'bg-natural-green/10 border-natural-green text-natural-green'
                                  : isSelected
                                    ? 'bg-red-50 border-red-200 text-red-600'
                                    : 'opacity-50 border-natural-border'
                                : 'border-natural-border hover:border-natural-green hover:bg-natural-sidebar'
                            }`}
                          >
                            <span className="font-medium">{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {(currentExercise.type === 'fill-gap' || currentExercise.type === 'translation') && (
                    <div className="space-y-4">
                      <input 
                        type="text"
                        disabled={showFeedback}
                        autoFocus
                        value={userAnswers[currentExercise.id] || ''}
                        onChange={(e) => setUserAnswers(prev => ({ ...prev, [currentExercise.id]: e.target.value }))}
                        onKeyPress={(e) => e.key === 'Enter' && handleAnswer(userAnswers[currentExercise.id])}
                        placeholder={t.typeAnswer}
                        className={`w-full p-5 rounded-2xl border bg-natural-bg/50 focus:outline-none focus:ring-4 transition-all ${
                          showFeedback
                            ? userAnswers[currentExercise.id]?.toLowerCase().trim() === currentExercise.correctAnswer.toLowerCase().trim()
                              ? 'border-natural-green ring-natural-green/5'
                              : 'border-red-200 ring-red-50'
                            : 'border-natural-border focus:border-natural-green focus:ring-natural-green/5'
                        }`}
                      />
                      {!showFeedback && (
                        <button 
                          onClick={() => handleAnswer(userAnswers[currentExercise.id] || '')}
                          className="w-full py-4 bg-natural-dark text-natural-bg rounded-2xl font-bold active:scale-95 transition-all"
                        >
                          {t.checkAnswer}
                        </button>
                      )}
                    </div>
                  )}

                  {showFeedback && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-6 rounded-[24px] border flex items-start gap-4 ${
                        userAnswers[currentExercise.id]?.toLowerCase().trim() === currentExercise.correctAnswer.toLowerCase().trim()
                          ? 'bg-natural-green/5 border-natural-green/20 text-natural-green'
                          : 'bg-red-50 border-red-100 text-red-700'
                      }`}
                    >
                      <div className="mt-1">
                        {userAnswers[currentExercise.id]?.toLowerCase().trim() === currentExercise.correctAnswer.toLowerCase().trim()
                          ? <CheckCircle2 size={24} />
                          : <XCircle size={24} />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-lg truncate">
                          {userAnswers[currentExercise.id]?.toLowerCase().trim() === currentExercise.correctAnswer.toLowerCase().trim()
                            ? t.excellent
                            : `${t.notQuite} ${currentExercise.correctAnswer}`
                          }
                        </p>
                        {currentExercise.clue && (
                          <p className="text-sm opacity-80 mt-1 flex items-center gap-1 truncate">
                            <HelpCircle size={14} className="shrink-0" /> {currentExercise.clue}
                          </p>
                        )}
                        <button 
                          onClick={nextStep}
                          className="mt-4 px-6 py-2 bg-white rounded-xl shadow-sm border border-current font-bold active:scale-95 transition-all truncate max-w-full"
                        >
                          {isLastExercise ? t.finishLesson : t.nextExercise}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {step === 'results' && (
              <motion.div 
                key="results"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-8"
              >
                <div className="relative inline-block">
                  <div className="w-48 h-48 rounded-full border-8 border-natural-sidebar flex items-center justify-center">
                    <span className="text-5xl font-serif italic text-natural-green">{calculatePercentage()}%</span>
                  </div>
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-white shadow-lg"
                  >
                    <Trophy size={32} />
                  </motion.div>
                </div>

                <div>
                  <h2 className="text-3xl md:text-4xl font-serif italic mb-2 break-words text-natural-green">{t.lessonComplete}</h2>
                  <p className="text-natural-taupe font-medium">{t.globalProgress}</p>
                </div>

                <div className="bg-natural-sidebar p-6 rounded-[32px] max-w-sm mx-auto flex items-center justify-between overflow-hidden">
                  <div className="text-left min-w-0 mr-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 truncate">{t.rewards}</p>
                    <p className="text-xl md:text-2xl font-bold flex items-center gap-2 truncate">
                       <Star className="text-yellow-500 fill-current shrink-0" size={24} /> +{(score * 10) + 50} XP
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm shrink-0">
                    ✨
                  </div>
                </div>

                <button 
                  onClick={() => onComplete((score * 10) + 50)}
                  className="w-full max-w-xs py-5 bg-natural-green text-white rounded-[24px] font-bold text-xl shadow-lg shadow-natural-green/20 active:scale-95 transition-all"
                >
                  {t.returnToDashboard}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
