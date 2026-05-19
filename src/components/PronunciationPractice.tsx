import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, Play, RefreshCw, CheckCircle2, AlertCircle, Loader2, Trophy, Sparkles } from 'lucide-react';

interface Props {
  text: string;
  language: string;
  nativeLanguage: string;
  onClose: () => void;
  onComplete?: (score: number) => void;
}

interface AnalysisResult {
  score: number;
  feedback: string;
  transcription: string;
  tips: string[];
}

import { getTranslation } from '../lib/translations';

export default function PronunciationPractice({ text, language, nativeLanguage, onClose, onComplete }: Props) {
  const t = getTranslation(nativeLanguage);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      };

      recorder.start();
      setIsRecording(true);
      setError(null);
      setResult(null);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      setError('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const analyzePronunciation = async () => {
    if (chunksRef.current.length === 0) return;
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
      const reader = new FileReader();
      
      const base64Promise = new Promise<string>((resolve) => {
        reader.onloadend = () => {
          const base64String = (reader.result as string).split(',')[1];
          resolve(base64String);
        };
      });
      
      reader.readAsDataURL(audioBlob);
      const base64Audio = await base64Promise;

      const response = await fetch('/api/pronunciation/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audio: base64Audio,
          text,
          language,
          nativeLanguage
        })
      });

      if (!response.ok) throw new Error('Analysis failed');
      
      const data = await response.json();
      setResult(data);
      if (onComplete && data.score > 70) {
        onComplete(data.score);
      }
    } catch (err) {
      console.error('Error analyzing pronunciation:', err);
      setError('Failed to analyze pronunciation. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-natural-dark/60 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-xl w-full bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="p-8 border-b border-natural-border flex justify-between items-center bg-natural-sidebar/30">
          <div>
            <h2 className="text-2xl font-serif italic text-natural-dark break-words">{t.practicePronunciation}</h2>
            <p className="text-sm text-natural-taupe break-words">{t.learningTarget}: {language}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-colors shrink-0">
            <RefreshCw size={20} className="text-natural-taupe" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          <div className="bg-natural-bg p-8 rounded-[32px] border border-natural-border relative group">
            <p className="text-xs font-bold uppercase tracking-widest text-natural-green mb-4">Target Phrase</p>
            <p className="text-2xl md:text-3xl font-serif text-natural-dark leading-relaxed">
              {text}
            </p>
            <button 
              onClick={() => {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = language === 'Spanish' ? 'es-ES' : language === 'French' ? 'fr-FR' : 'en-US'; // Basic mapping
                window.speechSynthesis.speak(utterance);
              }}
              className="absolute top-6 right-6 p-2 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Play size={16} fill="currentColor" />
            </button>
          </div>

          <div className="flex flex-col items-center gap-6">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={isRecording ? stopRecording : startRecording}
              className={`w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-xl ${
                isRecording 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'bg-natural-green text-white hover:bg-natural-green/90 shadow-natural-green/20'
              }`}
            >
              {isRecording ? <MicOff size={36} /> : <Mic size={36} />}
            </motion.button>
            <p className="font-bold text-natural-taupe uppercase tracking-widest text-xs">
              {isRecording ? 'Recording (Tap to stop)' : 'Tap to start recording'}
            </p>
          </div>

          {audioUrl && !isRecording && (
            <div className="flex items-center justify-center gap-4">
              <button 
                onClick={() => {
                  const audio = new Audio(audioUrl);
                  audio.play();
                }}
                className="flex items-center gap-2 px-6 py-3 bg-natural-sidebar rounded-2xl font-bold text-natural-dark hover:bg-natural-border transition-colors text-sm"
              >
                <Play size={18} fill="currentColor" /> Listen to Yourself
              </button>
              <button 
                onClick={analyzePronunciation}
                disabled={isAnalyzing}
                className="flex items-center gap-2 px-8 py-3 bg-natural-dark text-white rounded-2xl font-bold hover:bg-natural-dark/90 transition-all text-sm disabled:opacity-50"
              >
                {isAnalyzing ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                {isAnalyzing ? 'Analyzing...' : 'Analyze Accuracy'}
              </button>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm">
              <AlertCircle size={18} />
              <p className="font-medium">{error}</p>
            </div>
          )}

          <AnimatePresence>
            {result && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-6 p-6 bg-natural-green/5 border border-natural-green/10 rounded-[32px]">
                  <div className="relative w-20 h-20 shrink-0">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        className="text-natural-border"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeDasharray="100, 100"
                      />
                      <path
                        className="text-natural-green"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeDasharray={`${result.score}, 100`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center font-bold text-xl text-natural-green">
                      {result.score}%
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-natural-dark flex items-center gap-2">
                       {result.score > 85 ? 'Excellent Pronunciation!' : result.score > 60 ? 'Good Progress!' : 'Keep Practicing!'}
                       {result.score > 90 && <Trophy size={18} className="text-yellow-500" />}
                    </h4>
                    <p className="text-sm text-natural-taupe leading-relaxed mt-1">
                      {result.feedback}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white border border-natural-border rounded-2xl p-5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-natural-taupe mb-2">What I heard</p>
                    <p className="italic text-natural-dark">"{result.transcription}"</p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-natural-taupe px-1">Tips for improvement</p>
                    {result.tips.map((tip, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-natural-sidebar/20 rounded-xl text-sm">
                        <CheckCircle2 size={16} className="text-natural-green mt-0.5 shrink-0" />
                        <p className="text-natural-dark/80">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-8 bg-natural-sidebar/30 border-t border-natural-border text-center">
          <button 
            onClick={onClose}
            className="px-10 py-4 bg-white border border-natural-border rounded-[20px] font-bold text-natural-dark hover:bg-natural-border transition-all shadow-sm"
          >
            {result ? 'Done' : 'Cancel'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
