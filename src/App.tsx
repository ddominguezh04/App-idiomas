import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  MessageSquare, 
  Trophy, 
  Home, 
  Settings, 
  ChevronRight, 
  Send, 
  Sparkles,
  Flame,
  Star,
  CheckCircle2,
  X,
  Languages,
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  GraduationCap,
  Loader2,
  Plus,
  LogIn,
  LogOut,
  Mic
} from 'lucide-react';
import type { Message, Language, UserStats, LessonContent, LearningLanguage } from './types';
import { LANGUAGES } from './types';
import LessonViewer from './components/LessonViewer';
import PlacementTest from './components/PlacementTest';
import PronunciationPractice from './components/PronunciationPractice';
import Auth from './components/Auth';
import { FirebaseProvider, useFirebase } from './components/FirebaseProvider';
import { auth, db } from './lib/firebase';
import { 
  doc, 
  setDoc, 
  updateDoc, 
  collection, 
  getDocs, 
  onSnapshot, 
  query, 
  setDoc as setFirestoreDoc,
  FirestoreError 
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';

import { getTranslation } from './lib/translations';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

function MainApp() {
  const { user, profile, loading, refreshProfile } = useFirebase();
  const t = getTranslation(profile?.nativeLanguage || 'English');
  const [currentView, setCurrentView] = useState<'onboarding' | 'dashboard' | 'chat' | 'lessons' | 'vocabulary' | 'placement'>('dashboard');
  const [onboardingStep, setOnboardingStep] = useState<'native' | 'target'>('native');
  const [selectedNewLang, setSelectedNewLang] = useState<Language | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoadingOnboarding, setIsLoadingOnboarding] = useState(false);
  
  const [localStats, setLocalStats] = useState<UserStats | null>(null);
  const [learningLanguages, setLearningLanguages] = useState<LearningLanguage[]>([]);
  const [activeLangCode, setActiveLangCode] = useState<string>('');
  const [vocabulary, setVocabulary] = useState<{ word: string; translation: string; learnedDate: string }[]>([]);

  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [activeLesson, setActiveLesson] = useState<LessonContent | null>(null);
  const [isLoadingLesson, setIsLoadingLesson] = useState(false);
  const [activePracticeText, setActivePracticeText] = useState<string | null>(null);

  // Sync profile to local stats
  useEffect(() => {
    if (profile) {
      setLocalStats(profile);
      const path = `users/${profile.uid}/learningLanguages`;
      const q = query(collection(db, path));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const langs = snapshot.docs.map(doc => doc.data() as LearningLanguage);
        setLearningLanguages(langs);
        if (langs.length > 0 && !activeLangCode) {
          const sorted = [...langs].sort((a, b) => b.xp - a.xp);
          setActiveLangCode(sorted[0].code);
        }
      }, (error) => {
        handleFirestoreError(error, OperationType.GET, path);
      });

      const vocabPath = `users/${profile.uid}/vocabulary`;
      const vocabUnsubscribe = onSnapshot(query(collection(db, vocabPath)), (snapshot) => {
        const v = snapshot.docs.map(doc => doc.data() as any);
        setVocabulary(v);
      });

      return () => {
        unsubscribe();
        vocabUnsubscribe();
      };
    }
  }, [profile]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  useEffect(() => {
    if (profile && currentView === 'chat' && activeLangCode) {
      const chatPath = `users/${profile.uid}/chat_history`;
      const q = query(
        collection(db, chatPath),
        // We could filter by languageCode here if we want separate histories
      );
      
      getDocs(q).then(snapshot => {
        const msgs = snapshot.docs
          .map(doc => doc.data())
          .filter(m => m.languageCode === activeLangCode)
          .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
          .map(m => ({ role: m.role, parts: m.parts }));
        
        if (msgs.length > 0) {
          setChatMessages(msgs as Message[]);
        } else {
          setChatMessages([{ role: 'model', parts: [{ text: `${activeLang?.flag || '👋'} I'm your native ${activeLang?.name} tutor. How can I help you practice today?` }] }]);
        }
      });
    }
  }, [profile, currentView, activeLangCode]);

  const activeLang = learningLanguages.find(l => l.code === activeLangCode);

  useEffect(() => {
    setIsSidebarOpen(false); // Close sidebar on view change
  }, [currentView, activeLangCode]);

  // Scroll lock when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen]);

  const handleCreateProfile = async (nativeLang: string) => {
    if (!user || isLoadingOnboarding) return;
    setIsLoadingOnboarding(true);
    const path = `users/${user.uid}`;
    try {
      const profileData = {
        id: user.uid,
        uid: user.uid, // Keep both for safety, but id is required for rules
        nativeLanguage: nativeLang,
        email: user.email,
        name: user.displayName || 'Learner',
        createdAt: new Date().toISOString()
      };
      await setDoc(doc(db, 'users', user.uid), profileData);
      await refreshProfile();
      setSearchQuery('');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    } finally {
      setIsLoadingOnboarding(false);
    }
  };

  const handleAddLanguage = async (lang: Language, level: string) => {
    if (!user || isLoadingOnboarding) return;
    setIsLoadingOnboarding(true);
    const path = `users/${user.uid}/learningLanguages/${lang.code}`;
    try {
      const newLang: LearningLanguage = {
        code: lang.code,
        name: lang.name,
        flag: lang.flag,
        level: level as any,
        xp: 0,
        streak: 1,
        lessonsDone: 0
      };
      await setDoc(doc(db, 'users', user.uid, 'learningLanguages', lang.code), newLang);
      setActiveLangCode(lang.code);
      setCurrentView('dashboard');
      setSearchQuery('');
    } catch (error) {
       handleFirestoreError(error, OperationType.WRITE, path);
    } finally {
      setIsLoadingOnboarding(false);
    }
  };

  const updateProgress = async (xpGain: number, lessonComplete: boolean = false) => {
    if (!user || !activeLang) return;
    const path = `users/${user.uid}/learningLanguages/${activeLang.code}`;
    const langRef = doc(db, path);
    try {
      await updateDoc(langRef, {
        xp: activeLang.xp + xpGain,
        lessonsDone: lessonComplete ? activeLang.lessonsDone + 1 : activeLang.lessonsDone,
        lastAccessed: new Date().toISOString()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  const handleStartLesson = async (topic: string) => {
    if (!activeLang || !profile) return;
    setIsLoadingLesson(true);
    try {
      const response = await fetch('/api/lesson/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          language: activeLang.code,
          level: activeLang.level,
          nativeLanguage: profile.nativeLanguage
        })
      });
      const data = await response.json();
      setActiveLesson(data);
    } catch (error) {
      console.error('Lesson generation error:', error);
    } finally {
      setIsLoadingLesson(false);
    }
  };

  const handleLessonComplete = (earnedXP: number) => {
    updateProgress(earnedXP, true);
    setActiveLesson(null);
    setCurrentView('dashboard');
  };

  const handleMessageSend = async () => {
    if (!inputMessage.trim() || !activeLang || !profile) return;

    const newUserMessage: Message = {
      role: 'user',
      parts: [{ text: inputMessage }]
    };

    const chatPath = `users/${profile.uid}/chat_history`;
    const msgId = new Date().getTime().toString() + '_user';
    
    // Save user message to Firestore
    try {
      await setDoc(doc(db, chatPath, msgId), {
        ...newUserMessage,
        createdAt: new Date().toISOString(),
        languageCode: activeLang.code
      });
    } catch (e) {
      console.error("Error saving chat:", e);
    }

    setChatMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: inputMessage,
          history: chatMessages.slice(-6),
          language: activeLang.code,
          nativeLanguage: profile.nativeLanguage
        })
      });

      const data = await response.json();
      const modelMessage: Message = {
        role: 'model',
        parts: [{ text: data.text }]
      };

      // Save model message to Firestore
      const modelMsgId = new Date().getTime().toString() + '_model';
      try {
        await setDoc(doc(db, chatPath, modelMsgId), {
          ...modelMessage,
          createdAt: new Date().toISOString(),
          languageCode: activeLang.code
        });
      } catch (e) {
        console.error("Error saving model chat:", e);
      }

      setChatMessages(prev => [...prev, modelMessage]);
      updateProgress(15);
      
      // Auto-save vocabulary if "Correction:" is present
      if (data.text.includes('Correction:')) {
        const parts = data.text.split(/Correction:/i);
        const feedback = parts[1].trim();
        const vocabMatch = feedback.match(/"([^"]+)"/g); // Simple heuristic to find quoted words
        if (vocabMatch && vocabMatch.length >= 2) {
          const word = vocabMatch[0].replace(/"/g, '');
          const translation = vocabMatch[1].replace(/"/g, '');
          const vocabPath = `users/${profile.uid}/vocabulary`;
          await setDoc(doc(db, vocabPath, word.toLowerCase().replace(/\s+/g, '_')), {
            word,
            translation,
            learnedDate: new Date().toISOString(),
            languageCode: activeLang.code
          });
        }
      }

    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const parseMessage = (text: string) => {
    const parts = text.split(/Correction:/i);
    if (parts.length > 1) {
      return (
        <>
          <p>{parts[0]}</p>
          <div className="mt-3 p-3 bg-natural-green/5 border-l-4 border-natural-green text-sm flex items-start gap-2 italic">
            <BrainCircuit size={16} className="mt-0.5 shrink-0" />
            <div>
              <span className="font-bold block not-italic uppercase tracking-widest text-[10px] mb-1">Feedback</span>
              {parts[1]}
            </div>
          </div>
        </>
      );
    }
    return <p>{text}</p>;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-natural-bg">
        <Loader2 className="w-12 h-12 text-natural-green animate-spin mb-4" />
        <p className="font-serif italic text-xl">Loading your linguistic universe...</p>
      </div>
    );
  }

  if (!user) return <Auth />;

  if (!profile || !profile.nativeLanguage) {
    const filteredLangs = LANGUAGES.filter(l => 
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      l.code.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => {
      // Prioritize common languages for easier selection
      const prioritary = ['Spanish', 'English', 'French', 'German'];
      const aIdx = prioritary.indexOf(a.name);
      const bIdx = prioritary.indexOf(b.name);
      if (aIdx !== bIdx) {
        if (aIdx === -1) return 1;
        if (bIdx === -1) return -1;
        return aIdx - bIdx;
      }
      return a.name.localeCompare(b.name);
    });

    return (
      <div className="min-h-screen flex items-center justify-center p-4 md:p-6 bg-natural-bg">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full bg-white p-6 md:p-10 rounded-[32px] md:rounded-[40px] shadow-2xl border border-natural-border text-center overflow-hidden flex flex-col max-h-[90vh]">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-natural-green/10 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 text-natural-green shrink-0">
            <Sparkles size={32} />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-natural-green mb-4">{t.step} 1 {t.of} 2</p>
          <h1 className="text-3xl md:text-5xl font-serif italic mb-4 text-natural-dark break-words">{t.nativeLanguageSelection}</h1>
          <p className="text-natural-taupe mb-8 text-sm md:text-base font-medium leading-relaxed max-w-sm mx-auto">{t.whichLanguageSpeak}</p>
          
          <div className="mb-4 relative">
            <input 
              type="text" placeholder={t.search} autoFocus
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={isLoadingOnboarding}
              className="w-full pl-12 pr-4 py-3 bg-natural-bg border border-natural-border rounded-2xl focus:outline-none focus:ring-4 focus:ring-natural-green/10 focus:border-natural-green transition-all"
            />
            <Languages className="absolute left-4 top-1/2 -translate-y-1/2 text-natural-taupe" size={20} />
          </div>

          <div className="flex-1 overflow-y-auto pr-1 space-y-2 custom-scrollbar">
            {filteredLangs.length > 0 ? filteredLangs.map(lang => (
              <button 
                key={lang.code} 
                onClick={() => handleCreateProfile(lang.code)}
                disabled={isLoadingOnboarding}
                className="w-full flex items-center gap-4 p-4 rounded-2xl border border-natural-border hover:border-natural-green hover:bg-natural-sidebar transition-all disabled:opacity-50"
              >
                <span className="text-2xl">{lang.flag}</span>
                <span className="font-bold text-natural-dark text-lg">{lang.name}</span>
                {isLoadingOnboarding ? <Loader2 size={18} className="ml-auto animate-spin" /> : <ArrowRight className="ml-auto text-natural-taupe" size={18} />}
              </button>
            )) : (
              <p className="py-10 text-natural-taupe italic">No languages found matches your search.</p>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  if (learningLanguages.length === 0 || currentView === 'placement') {
    const filteredLangs = LANGUAGES.filter(l => 
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      l.code.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => {
      const prioritary = ['English', 'Spanish', 'French', 'German', 'Japanese', 'Italian'];
      const aIdx = prioritary.indexOf(a.name);
      const bIdx = prioritary.indexOf(b.name);
      if (aIdx !== bIdx) {
        if (aIdx === -1) return 1;
        if (bIdx === -1) return -1;
        return aIdx - bIdx;
      }
      return a.name.localeCompare(b.name);
    });

    if (selectedNewLang) {
      return (
        <div className="min-h-screen bg-natural-bg p-4 flex items-center justify-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-4xl">
            <PlacementTest 
              language={selectedNewLang.code} 
              nativeLanguage={profile.nativeLanguage}
              onComplete={(level) => {
                handleAddLanguage(selectedNewLang, level);
                setSelectedNewLang(null);
              }} 
            />
            <div className="mt-8 text-center">
               <button 
                 onClick={() => setSelectedNewLang(null)}
                 className="text-sm font-bold text-natural-taupe hover:text-natural-dark uppercase tracking-widest flex items-center gap-2 mx-auto transition-colors"
                >
                  <X size={16} /> Cancel Test
                </button>
            </div>
          </motion.div>
        </div>
      );
    }

    return (
      <div className="min-h-screen flex items-center justify-center p-4 md:p-6 bg-natural-bg">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full bg-white p-6 md:p-10 rounded-[32px] md:rounded-[40px] shadow-2xl border border-natural-border text-center flex flex-col max-h-[90vh] overflow-hidden">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-natural-green/10 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 text-natural-green shrink-0">
            <BookOpen size={32} />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-natural-green mb-4">{t.step} 2 {t.of} 2</p>
          <h1 className="text-3xl md:text-5xl font-serif italic mb-4 text-natural-dark break-words">{t.learningTarget}</h1>
          <p className="text-natural-taupe mb-8 text-sm md:text-base font-medium leading-relaxed max-w-sm mx-auto">{t.whatLanguageMaster}</p>
          <div className="mb-4 relative">
            <input 
              type="text" placeholder={t.search}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-natural-bg border border-natural-border rounded-2xl focus:outline-none focus:ring-4 focus:ring-natural-green/10 transition-all font-medium"
            />
            <Languages className="absolute left-4 top-1/2 -translate-y-1/2 text-natural-taupe" size={20} />
          </div>
          <div className="flex-1 overflow-y-auto pr-1 space-y-2 custom-scrollbar">
             {filteredLangs.map(lang => (
              <button key={lang.code} onClick={() => setSelectedNewLang(lang)}
                className="w-full flex items-center gap-4 p-4 rounded-2xl border border-natural-border hover:border-natural-green hover:bg-natural-sidebar transition-all group"
              >
                <span className="text-2xl">{lang.flag}</span>
                <span className="font-bold text-natural-dark text-lg">{lang.name}</span>
                <ArrowRight className="ml-auto text-natural-taupe group-hover:text-natural-green transition-colors" size={18} />
              </button>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-4">
            {currentView === 'placement' ? (
               <button onClick={() => setCurrentView('dashboard')} className="text-sm font-bold text-natural-taupe hover:text-natural-dark uppercase tracking-widest">{t.cancelSelection}</button>
            ) : (
              <button 
                onClick={() => {
                   // Option to reset
                }} 
                className="opacity-0 h-0"
              />
            )}
            <button 
              onClick={() => signOut(auth)}
              className="text-[10px] font-bold text-red-400 hover:text-red-600 uppercase tracking-widest transition-colors"
            >
              {t.startOver}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-natural-bg text-natural-dark overflow-hidden">
      {isLoadingLesson && (
        <div className="fixed inset-0 z-[150] bg-natural-bg/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center">
          <Loader2 className="w-12 h-12 text-natural-green animate-spin mb-4" />
          <p className="font-serif italic text-xl break-words">{t.loadingUniverse}</p>
        </div>
      )}

      {activePracticeText && activeLang && profile && (
        <PronunciationPractice 
          text={activePracticeText}
          language={activeLang.name}
          nativeLanguage={profile.nativeLanguage}
          onClose={() => setActivePracticeText(null)}
          onComplete={(score) => {
            updateProgress(Math.floor(score / 2));
          }}
        />
      )}

      {activeLesson && profile && (
        <LessonViewer 
          lesson={activeLesson} 
          nativeLanguage={profile.nativeLanguage}
          onComplete={handleLessonComplete} 
          onClose={() => setActiveLesson(null)} 
        />
      )}

      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-natural-border z-[60] shadow-sm sticky top-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-natural-green rounded-xl flex items-center justify-center text-white shadow-lg shadow-natural-green/20">
            <Sparkles size={18} />
          </div>
          <span className="font-serif italic text-xl text-natural-dark">LinguaFlow</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-3 bg-natural-sidebar rounded-2xl border border-natural-border text-natural-green hover:bg-white transition-all active:scale-90"
        >
          {isSidebarOpen ? <X size={20} /> : <Home size={20} />}
        </button>
      </div>

      {/* Sidebar Overlay for mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-natural-dark/40 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <nav className={`
        fixed md:relative top-[73px] md:top-0 left-0 z-50
        w-[280px] md:w-80 bg-natural-sidebar border-r border-natural-border 
        flex flex-col p-5 md:p-8 transition-transform duration-300 transform
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        h-[calc(100vh-73px)] md:h-screen overflow-y-auto shadow-2xl md:shadow-none
      `}>
        <div className="hidden md:flex items-center gap-4 mb-10">
          <div className="w-11 h-11 bg-natural-green rounded-[14px] flex items-center justify-center text-white shadow-xl shadow-natural-green/10 shrink-0">
            <Sparkles size={22} />
          </div>
          <span className="text-2xl font-serif italic text-natural-dark">LinguaFlow</span>
        </div>
        
        <div className="space-y-1 mb-6">
          <p className="text-[10px] uppercase tracking-[0.3em] font-black opacity-20 mb-3 px-4">{t.menu}</p>
          <SidebarNavButton t={t} active={currentView === 'dashboard'} icon={<Home size={20} />} label={t.dashboard} onClick={() => { setCurrentView('dashboard'); setIsSidebarOpen(false); }} />
          <SidebarNavButton t={t} active={currentView === 'lessons'} icon={<BookOpen size={20} />} label={t.myCourses} onClick={() => { setCurrentView('lessons'); setIsSidebarOpen(false); }} />
          <SidebarNavButton t={t} active={currentView === 'chat'} icon={<MessageSquare size={20} />} label={t.aiPractice} onClick={() => {
            setCurrentView('chat');
            setIsSidebarOpen(false);
            if (chatMessages.length === 0) {
              setChatMessages([{ role: 'model', parts: [{ text: `${activeLang?.flag || '👋'} I'm your native ${activeLang?.name} tutor. How can I help you practice today?` }] }]);
            }
          }} />
          <SidebarNavButton t={t} active={currentView === 'vocabulary'} icon={<TrendingUp size={20} />} label={t.statsProgress} onClick={() => { setCurrentView('vocabulary'); setIsSidebarOpen(false); }} />
        </div>

        <div className="space-y-3 mb-6">
           <div className="flex items-center justify-between px-4">
             <p className="text-[10px] uppercase tracking-[0.3em] font-black opacity-20 truncate">{t.myLanguages}</p>
             <button onClick={() => {
               setCurrentView('placement');
               setIsSidebarOpen(false);
             }} className="p-1 hover:bg-natural-green/10 text-natural-green rounded-lg transition-colors shrink-0">
               <Plus size={16} />
             </button>
           </div>
           <div className="space-y-1.5 px-0.5">
             {learningLanguages.map(lang => (
               <button 
                 key={lang.code}
                 onClick={() => {
                   setActiveLangCode(lang.code);
                   setIsSidebarOpen(false);
                 }}
                 className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-[20px] transition-all duration-300 group overflow-hidden ${activeLangCode === lang.code ? 'bg-white shadow-lg shadow-natural-green/5 border border-natural-border text-natural-dark translate-x-0.5' : 'text-natural-taupe hover:text-natural-dark hover:bg-natural-sidebar/50'}`}
               >
                 <span className="text-xl shrink-0 transition-transform group-hover:scale-110">{lang.flag}</span>
                 <div className="text-left flex-1 min-w-0">
                    <p className={`text-xs font-bold leading-tight mb-0.5 truncate ${activeLangCode === lang.code ? 'text-natural-green' : ''}`}>{lang.name}</p>
                    <p className="text-[9px] opacity-40 uppercase tracking-widest font-bold truncate">{t.level} {lang.level}</p>
                 </div>
                 {activeLangCode === lang.code && <motion.div layoutId="lang-dot" className="w-1.5 h-1.5 bg-natural-green rounded-full shadow-[0_0_8px_rgba(46,125,50,0.5)] shrink-0" />}
               </button>
             ))}
           </div>
        </div>
        
        <div className="mt-auto pt-4">
          <div className="flex items-center gap-3.5 p-4 bg-white border border-natural-border rounded-[24px] shadow-sm overflow-hidden">
             <div className="w-10 h-10 rounded-[14px] bg-natural-sidebar border border-natural-border flex items-center justify-center font-black text-natural-taupe shrink-0 text-xs">
               {user?.displayName ? user.displayName[0].toUpperCase() : 'U'}
             </div>
             <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-natural-dark truncate">{user?.displayName || 'User'}</p>
                <p className="text-[9px] uppercase tracking-widest font-black opacity-30 truncate">{t.proMember}</p>
             </div>
             <button onClick={() => signOut(auth)} className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-all active:scale-90 shrink-0">
               <LogOut size={16} />
             </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <div className="flex-1 overflow-y-auto p-6 md:p-12 pb-24 md:pb-12">
          <AnimatePresence mode="wait">
            {currentView === 'dashboard' && (
              <motion.div key="dashboard" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 md:space-y-10">
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="min-w-0">
                    <h1 className="text-3xl md:text-5xl font-serif italic mb-3 break-words text-natural-dark">{t.welcome}, {user?.displayName?.split(' ')[0] || 'Learner'}!</h1>
                    <p className="text-natural-taupe break-words font-medium text-sm md:text-base opacity-80">{activeLang?.streak || 0}-{t.days} {t.streak} in {activeLang?.name}. {activeLang?.xp || 0} XP.</p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <StatCard icon={<Flame className="text-natural-green" />} label={t.streak} value={`${activeLang?.streak || 0} ${t.days}`} />
                    <StatCard icon={<Star className="text-natural-green" />} label={t.xp} value={(activeLang?.xp || 0).toLocaleString()} />
                  </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6 md:space-y-8">
                    <section className="natural-card bg-white relative overflow-hidden group min-h-[300px] flex flex-col p-6 md:p-10">
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-8">
                          <div className="min-w-0">
                            <span className="inline-block px-3 py-1 bg-natural-sidebar rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-natural-green mb-5">{t.levelPath.replace('{{level}}', activeLang?.level || '')}</span>
                            <h2 className="text-3xl md:text-5xl font-serif mb-4 italic break-words text-natural-dark">{t.currentModule}</h2>
                            <p className="text-natural-taupe mt-2 max-w-sm text-sm md:text-base break-words font-medium leading-relaxed">{t.masterStructures}</p>
                          </div>
                        </div>

                        <div className="mt-auto">
                           <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2 opacity-60">
                            <span>{t.mastery}</span>
                            <span>{Math.round(Math.min(((activeLang?.xp || 0) % 1000) / 10, 100))}%</span>
                          </div>
                          <div className="w-full bg-natural-sidebar h-3 rounded-full mb-8 overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(((activeLang?.xp || 0) % 1000) / 10, 100)}%` }} className="bg-natural-green h-full rounded-full" />
                          </div>
                          <button onClick={() => setCurrentView('lessons')}
                            className="w-full bg-natural-green text-white py-4 rounded-[24px] text-lg font-medium hover:bg-natural-green/90 transition-all shadow-lg active:scale-95"
                          >
                            {t.continueLesson}
                          </button>
                        </div>
                      </div>
                    </section>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <ModuleCard title={t.dialogue} desc={t.practiceWithAi} icon={<MessageSquare />} onClick={() => setCurrentView('chat')} />
                      <ModuleCard title={t.grammar} desc={t.masterStructures} icon={<BrainCircuit />} onClick={() => setCurrentView('lessons')} />
                    </div>
                  </div>

                  <aside className="space-y-6 md:space-y-8 text-natural-dark">
                    <div className="p-8 rounded-[40px] bg-natural-dark text-natural-bg shadow-xl flex flex-col items-center justify-center text-center overflow-hidden">
                      <div className="w-16 h-16 rounded-full border-2 border-natural-green/50 flex items-center justify-center mb-4 shrink-0">
                         <TrendingUp size={28} />
                      </div>
                      <h3 className="text-lg font-bold truncate w-full text-natural-bg">{t.nativeLevel}</h3>
                      <p className="text-natural-bg/60 text-xs mt-3 leading-relaxed break-words font-medium">{t.aimingFor.replace('{{level}}', 'C2').replace('{{lang}}', activeLang?.name || '')}</p>
                    </div>

                    <div className="natural-card p-6 md:p-8">
                      <h3 className="font-serif italic text-lg mb-4 flex items-center gap-2 text-natural-dark">
                        <Trophy size={18} className="text-natural-green shrink-0" /> {t.goals}
                      </h3>
                      <div className="space-y-4">
                        <GoalItem label="1000 XP Week" current={activeLang?.xp || 0} target={1000} />
                        <GoalItem label="5 Day Streak" current={activeLang?.streak || 0} target={5} />
                      </div>
                    </div>
                  </aside>
                </div>
              </motion.div>
            )}

            {currentView === 'chat' && (
              <motion.div key="chat" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="absolute inset-0 flex flex-col bg-white rounded-t-[40px] md:rounded-[40px] border-t md:border border-natural-border shadow-xl overflow-hidden">
                <div className="p-4 md:p-8 bg-natural-sidebar border-b border-natural-border flex items-center justify-between">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-lg md:text-xl shadow-sm shrink-0">
                      {activeLang?.flag}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-serif italic text-lg md:text-xl leading-tight truncate">{activeLang?.name} Tutor</h3>
                      <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-natural-green flex items-center gap-1.5 animate-pulse truncate">
                         {t.livePractice}
                      </span>
                    </div>
                  </div>
                  <button onClick={() => setCurrentView('dashboard')} className="p-2 hover:bg-white/50 rounded-xl transition-colors shrink-0"><X size={20} /></button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 md:space-y-8 bg-natural-bg/30 custom-scrollbar">
                  {chatMessages.map((msg, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className="flex flex-col gap-2 max-w-[85%] md:max-w-[75%] overflow-hidden">
                        <div className={`p-4 md:p-5 rounded-[24px] md:rounded-[28px] ${msg.role === 'user' ? 'bg-natural-dark text-natural-bg rounded-tr-none' : 'bg-white text-natural-dark border border-natural-border rounded-tl-none shadow-sm'}`}>
                          <div className="whitespace-pre-wrap leading-relaxed text-sm md:text-base break-words">{parseMessage(msg.parts[0].text)}</div>
                        </div>
                        {msg.role === 'model' && (
                          <button 
                            onClick={() => setActivePracticeText(msg.parts[0].text.substring(0, 150).split('Correction:')[0].trim())}
                            className="flex items-center gap-1.5 text-[10px] font-bold text-natural-green hover:opacity-80 transition-all uppercase tracking-widest self-start px-2 truncate"
                          >
                            <Mic size={12} /> {t.practicePronunciation}
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-natural-border px-4 py-3 rounded-full rounded-tl-none animate-pulse text-xs font-bold text-natural-taupe">
                        {t.thinking}
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                <div className="p-4 md:p-8 bg-white border-t border-natural-border flex gap-2 md:gap-4">
                  <input 
                    type="text" 
                    value={inputMessage} 
                    onChange={(e) => setInputMessage(e.target.value)} 
                    onKeyPress={(e) => e.key === 'Enter' && handleMessageSend()} 
                    placeholder={`${t.chatIn} ${activeLang?.name}...`} 
                    className="flex-1 bg-natural-bg/50 border border-natural-border px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-[20px] focus:outline-none focus:border-natural-green transition-all" 
                  />
                  <button 
                    onClick={handleMessageSend} 
                    disabled={isTyping || !inputMessage.trim()} 
                    className="w-12 h-12 md:w-14 md:h-14 bg-natural-green text-white rounded-xl md:rounded-[20px] flex items-center justify-center hover:bg-natural-green/90 shadow-lg disabled:opacity-50 transition-all shrink-0"
                  >
                    <Send size={20} className="md:w-6 md:h-6" />
                  </button>
                </div>
              </motion.div>
            )}

            {currentView === 'lessons' && (
              <motion.div key="lessons" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 md:space-y-10">
                <header className="min-w-0">
                  <h1 className="text-3xl md:text-5xl font-serif italic mb-2 break-words">{t.myCourses}</h1>
                  <p className="text-natural-taupe font-medium">{t.learningTarget}: {activeLang?.name}</p>
                </header>
                <div className="grid gap-4 md:gap-6">
                  <LessonRow 
                    t={t} 
                    title={t.fundamentals} 
                    level={activeLang?.level || 'A1'} 
                    lessons={[t.introductions, t.basicGrammar, t.numbers]} 
                    completed={Math.min(activeLang?.lessonsDone || 0, 3)} 
                    total={3} 
                    onClick={handleStartLesson} 
                  />
                  <LessonRow 
                    t={t} 
                    title={t.advancedTopics} 
                    level={activeLang?.level || 'B2'} 
                    lessons={[t.nuances, t.culturalContext]} 
                    completed={0} 
                    total={2} 
                    onClick={handleStartLesson} 
                    lock={activeLang?.level.startsWith('A')} 
                  />
                </div>
              </motion.div>
            )}

            {currentView === 'vocabulary' && (
              <motion.div key="vocabulary" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 md:space-y-10">
                <header className="min-w-0">
                  <h1 className="text-3xl md:text-5xl font-serif italic mb-2 break-words">{t.globalProgress}</h1>
                  <p className="text-natural-taupe font-medium">{t.trackingEvolution}</p>
                </header>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                   <div className="bg-natural-dark text-natural-bg p-6 md:p-10 rounded-[32px] md:rounded-[40px] shadow-2xl overflow-hidden">
                     <h3 className="text-xl md:text-2xl font-serif mb-6 italic">{t.masteryOverview}</h3>
                     <div className="space-y-6 md:space-y-8">
                       {learningLanguages.map(lang => (
                         <div key={lang.code} className="space-y-3">
                           <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest opacity-60 overflow-hidden">
                             <span className="flex items-center gap-2 truncate"><span className="shrink-0">{lang.flag}</span> <span className="truncate">{lang.name}</span></span>
                             <span className="shrink-0">{lang.level}</span>
                           </div>
                           <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                             <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: `${Math.min((lang.xp / 5000) * 100, 100)}%` }}
                               className="bg-natural-green h-full" 
                             />
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                   <div className="space-y-6 md:space-y-8">
                      <div className="bg-white p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-natural-border shadow-sm text-center overflow-hidden">
                        <Trophy size={48} className="text-natural-green mx-auto mb-4 shrink-0" />
                        <p className="text-3xl md:text-4xl font-bold truncate">{learningLanguages.reduce((sum, l) => sum + l.xp, 0)}</p>
                        <p className="text-[10px] uppercase tracking-widest font-bold opacity-40 truncate">{t.totalXP}</p>
                      </div>

                      {vocabulary.length > 0 && (
                        <div className="bg-white p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-natural-border shadow-sm overflow-hidden text-left">
                          <h3 className="font-serif italic text-lg mb-4 flex items-center gap-2 text-natural-dark">
                            <Sparkles size={18} className="text-natural-green" /> Learned Vocabulary
                          </h3>
                          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            {vocabulary
                              .filter((v: any) => v.languageCode === activeLangCode)
                              .sort((a: any, b: any) => new Date(b.learnedDate).getTime() - new Date(a.learnedDate).getTime())
                              .map((v: any, i: number) => (
                                <div key={i} className="flex justify-between items-center p-3 bg-natural-sidebar rounded-xl border border-natural-border shadow-sm group hover:scale-[1.02] transition-transform">
                                  <div>
                                    <p className="font-bold text-natural-dark text-sm">{v.word}</p>
                                    <p className="text-[10px] text-natural-taupe uppercase tracking-widest font-black opacity-50">{v.translation}</p>
                                  </div>
                                  <div className="text-[8px] bg-white px-2 py-1 rounded-full opacity-40 group-hover:opacity-100 transition-opacity">
                                     {new Date(v.learnedDate).toLocaleDateString()}
                                  </div>
                                </div>
                              ))
                            }
                          </div>
                        </div>
                      )}

                      <div className="bg-white p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-natural-border shadow-sm text-center overflow-hidden">
                        <CheckCircle2 size={48} className="text-natural-green mx-auto mb-4 shrink-0" />
                        <p className="text-3xl md:text-4xl font-bold truncate">{learningLanguages.reduce((sum, l) => sum + l.lessonsDone, 0)}</p>
                        <p className="text-[10px] uppercase tracking-widest font-bold opacity-40 truncate">{t.totalLessons}</p>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <FirebaseProvider>
      <MainApp />
    </FirebaseProvider>
  );
}

function SidebarNavButton({ active, icon, label, onClick }: { active: boolean, icon: React.ReactNode, label: string, onClick: () => void, t: any }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-[20px] transition-all duration-300 group overflow-hidden ${active ? 'bg-white shadow-xl shadow-natural-green/5 border border-natural-border text-natural-dark translate-x-0.5' : 'text-natural-taupe hover:text-natural-dark hover:bg-natural-sidebar/50'}`}
    >
      <span className={`shrink-0 transition-transform duration-300 ${active ? 'text-natural-green scale-110' : 'group-hover:scale-110'}`}>{icon}</span>
      <span className="text-sm font-bold tracking-tight truncate">{label}</span>
      {active && <motion.div layoutId="nav-dot" className="ml-auto w-1.5 h-1.5 bg-natural-green rounded-full shadow-[0_0_8px_rgba(46,125,50,0.5)]" />}
    </button>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="bg-white p-4 md:p-6 rounded-[32px] border border-natural-border shadow-sm flex-1 flex items-center gap-4 min-w-[140px] transition-all hover:shadow-md">
      <div className="w-10 h-10 md:w-12 md:h-12 bg-natural-sidebar rounded-[18px] md:rounded-[22px] flex items-center justify-center shrink-0">
        <span className="text-natural-green">{icon}</span>
      </div>
      <div className="min-w-0">
        <p className="text-[9px] md:text-[10px] uppercase tracking-widest font-black opacity-30 mb-0.5 truncate">{label}</p>
        <p className="text-base md:text-lg font-bold text-natural-dark truncate">{value}</p>
      </div>
    </div>
  );
}

function ModuleCard({ title, desc, icon, onClick }: { title: string, desc: string, icon: React.ReactNode, onClick: () => void }) {
  return (
    <button onClick={onClick} className="p-8 rounded-[36px] border border-natural-border bg-white shadow-sm flex items-start gap-5 text-left hover:shadow-md transition-all group">
      <div className="w-14 h-14 rounded-2xl bg-natural-sidebar flex items-center justify-center group-hover:scale-110 transition-transform text-natural-dark">{icon}</div>
      <div><h4 className="font-bold text-natural-dark text-lg">{title}</h4><p className="text-sm text-natural-taupe">{desc}</p></div>
    </button>
  );
}

function GoalItem({ label, current, target }: { label: string, current: number, target: number }) {
  const progress = Math.min((current / target) * 100, 100);
  return (
    <div className="space-y-1.5 md:space-y-2 group">
      <div className="flex justify-between text-[9px] md:text-xs font-black uppercase tracking-widest opacity-20 group-hover:opacity-100 transition-opacity"><span>{label}</span><span>{Math.round(progress)}%</span></div>
      <div className="w-full h-2 bg-natural-sidebar rounded-full overflow-hidden shadow-inner"><div className="bg-natural-green h-full shadow-[0_0_8px_rgba(46,125,50,0.3)] transition-all duration-1000 ease-out" style={{ width: `${progress}%` }} /></div>
    </div>
  );
}

function LessonRow({ title, level, lessons, completed, total, onClick, lock, t }: { title: string, level: string, lessons: string[], completed: number, total: number, onClick: (topic: string) => void, lock?: boolean, t: any }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`rounded-[30px] md:rounded-[40px] border border-natural-border bg-white overflow-hidden transition-all ${lock ? 'opacity-50' : 'shadow-sm hover:shadow-md'}`}>
      <div className="w-full p-4 md:p-8 flex items-center gap-4 md:gap-8 text-left cursor-pointer" onClick={() => !lock && setIsOpen(!isOpen)}>
        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-[16px] md:rounded-[24px] flex items-center justify-center font-bold text-lg md:text-xl shrink-0 ${completed === total && total > 0 ? 'bg-natural-green/10 text-natural-green' : 'bg-natural-sidebar text-natural-taupe'}`}>{level}</div>
        <div className="flex-1 min-w-0 pr-2">
          <h4 className="font-bold text-lg md:text-xl text-natural-dark truncate">{title}</h4>
          <p className="text-xs md:text-sm text-natural-taupe font-bold uppercase tracking-widest opacity-40">{completed}/{total} {t.modules}</p>
        </div>
        {!lock && <ChevronRight size={20} className={`text-natural-taupe transform transition-transform shrink-0 ${isOpen ? 'rotate-90' : ''}`} />}
      </div>
      <AnimatePresence>{isOpen && (
        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="px-4 md:px-8 pb-4 md:pb-8 space-y-3 md:space-y-4">
          {lessons.map((lesson, i) => (
            <div key={i} onClick={() => onClick(`${title}: ${lesson}`)} className="flex items-center gap-4 md:gap-5 p-4 md:p-5 rounded-[20px] md:rounded-[24px] bg-natural-sidebar/30 hover:bg-natural-sidebar/60 transition-all cursor-pointer group">
              <div className={`w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center shrink-0 ${i < completed ? 'bg-natural-green text-white' : 'border'}`}>{i < completed && <CheckCircle2 size={16} />}</div>
              <span className="font-semibold text-natural-dark text-sm md:text-base">{lesson}</span>
              <ChevronRight size={18} className="ml-auto opacity-20" />
            </div>
          ))}
        </motion.div>
      )}</AnimatePresence>
    </div>
  );
}
