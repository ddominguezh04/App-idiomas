import React, { useState } from 'react';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { motion, AnimatePresence } from 'motion/react';
import { LogIn, Sparkles, Mail, Lock, User, AlertCircle, ArrowRight } from 'lucide-react';
import { getTranslation } from '../lib/translations';

export default function Auth() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Default to English/Spanish hybrid for landing or browser detection
  const t = getTranslation(navigator.language.startsWith('es') ? 'Spanish' : 'English');

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login Error:", error);
      setError(t.errorAuth);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!email || !password || (mode === 'register' && !name)) {
      setError(t.fillAllFields);
      setIsLoading(false);
      return;
    }

    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
      }
    } catch (err: any) {
      console.error("Auth Error:", err);
      setError(err.message || t.errorAuth);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-6 bg-natural-bg">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full p-6 md:p-10 bg-white rounded-[40px] border border-natural-border shadow-2xl overflow-hidden"
      >
        <div className="w-16 h-16 md:w-20 md:h-20 bg-natural-green/10 rounded-[24px] md:rounded-[28px] flex items-center justify-center mx-auto mb-6 md:mb-8 text-natural-green">
          <Sparkles size={40} className="w-10 h-10 md:w-12 md:h-12" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-serif italic mb-2 text-center text-natural-dark">LinguaFlow</h1>
        <p className="text-natural-taupe mb-8 text-center text-sm md:text-base leading-relaxed px-4">
          {mode === 'login' ? 'Bienvenido de nuevo a tu viaje lingüístico.' : 'Comienza hoy tu evolución lingüística profesional.'}
        </p>

        <form onSubmit={handleEmailAuth} className="space-y-4 mb-6">
          <AnimatePresence mode="wait">
            {mode === 'register' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="relative"
              >
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-natural-taupe/50">
                  <User size={18} />
                </div>
                <input 
                  type="text"
                  placeholder={t.name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-natural-bg border border-natural-border rounded-2xl focus:outline-none focus:ring-4 focus:ring-natural-green/10 transition-all font-medium"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-natural-taupe/50">
              <Mail size={18} />
            </div>
            <input 
              type="email"
              placeholder={t.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-natural-bg border border-natural-border rounded-2xl focus:outline-none focus:ring-4 focus:ring-natural-green/10 transition-all font-medium"
            />
          </div>

          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-natural-taupe/50">
              <Lock size={18} />
            </div>
            <input 
              type="password"
              placeholder={t.password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-natural-bg border border-natural-border rounded-2xl focus:outline-none focus:ring-4 focus:ring-natural-green/10 transition-all font-medium"
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-xl text-xs font-medium border border-red-100"
              >
                <AlertCircle size={14} className="shrink-0" />
                <span className="break-words">{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-natural-green text-white rounded-[24px] font-bold text-lg hover:opacity-90 transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? <Sparkles className="animate-spin" size={20} /> : (mode === 'login' ? t.login : t.register)}
            {!isLoading && <ArrowRight size={18} />}
          </button>
        </form>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-natural-border"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
            <span className="bg-white px-4 text-natural-taupe">O continuar con</span>
          </div>
        </div>

        <button 
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white border border-natural-border text-natural-dark py-4 rounded-[24px] font-bold text-base hover:bg-natural-bg transition-all shadow-sm active:scale-[0.98]"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          {t.googleLogin}
        </button>

        <div className="mt-8 text-center px-4">
          <button 
            onClick={() => {
              setMode(mode === 'login' ? 'register' : 'login');
              setError(null);
            }}
            className="text-sm font-medium text-natural-taupe hover:text-natural-dark transition-all"
          >
            {mode === 'login' ? (
              <span className="leading-relaxed">
                Si no estás registrado <span className="text-natural-green font-bold underline underline-offset-4">hazlo aquí</span>
              </span>
            ) : (
              <span className="leading-relaxed">
                ¿Ya tienes cuenta? <span className="text-natural-green font-bold underline underline-offset-4">Inicia sesión aquí</span>
              </span>
            )}
          </button>
        </div>

        <p className="mt-8 text-[9px] uppercase tracking-widest font-black opacity-20 text-center">
          Professional Language Evolution
        </p>
      </motion.div>
    </div>
  );
}
