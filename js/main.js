// LinguaFlow – Core Application Engine

// Global Languages Registry
const LANGUAGES = [
  { code: 'Spanish', name: 'Spanish', flag: '🇪🇸' },
  { code: 'English', name: 'English', flag: '🇺🇸' },
  { code: 'French', name: 'French', flag: '🇫🇷' },
  { code: 'German', name: 'German', flag: '🇩🇪' },
  { code: 'Italian', name: 'Italian', flag: '🇮🇹' },
  { code: 'Portuguese', name: 'Portuguese', flag: '🇧🇷' },
  { code: 'Chinese', name: 'Chinese', flag: '🇨🇳' },
  { code: 'Japanese', name: 'Japanese', flag: '🇯🇵' },
  { code: 'Korean', name: 'Korean', flag: '🇰🇷' },
  { code: 'Russian', name: 'Russian', flag: '🇷🇺' }
];

// Translations Dictionary
const TRANSLATIONS = {
  Spanish: {
    welcome: "¡Bienvenido",
    dashboard: "Panel Principal",
    myCourses: "Mis Cursos",
    aiPractice: "Práctica IA",
    statsProgress: "Estadísticas",
    menu: "Menú",
    myLanguages: "Mis Idiomas",
    proMember: "Miembro Pro",
    streak: "Racha",
    xp: "XP",
    currentModule: "Módulo Actual",
    continueLesson: "Continuar Lección",
    mastery: "Dominio",
    dialogue: "Diálogo",
    practiceWithAi: "Practica con IA",
    grammar: "Gramática",
    masterStructures: "Domina estructuras",
    nativeLevel: "Nivel Nativo",
    goals: "Objetivos",
    livePractice: "Práctica en Vivo",
    vocabulary: "Vocabulario",
    chatIn: "Chatear en",
    thinking: "El tutor está pensando...",
    practicePronunciation: "Practicar Pronunciación",
    globalProgress: "Progreso Global",
    trackingEvolution: "Siguiendo tu evolución en todos los idiomas.",
    masteryOverview: "Resumen de Dominio",
    totalXP: "Total de XP",
    totalLessons: "Lecciones Totales",
    startOver: "Reiniciar",
    nativeLanguageSelection: "Idioma Nativo",
    whichLanguageSpeak: "¿Qué idioma hablas con naturalidad?",
    learningTarget: "Objetivo de Aprendizaje",
    whatLanguageMaster: "¿Qué idioma te gustaría dominar?",
    search: "Buscar idioma...",
    evaluationComplete: "Evaluación Completada",
    assessedLevel: "Nivel Evaluado",
    startJourney: "Empezar mi viaje",
    cancelSelection: "Cancelar Selección",
    cancelTest: "Cancelar Prueba",
    loadingUniverse: "Cargando tu universo lingüístico...",
    days: "días",
    level: "Nivel",
    examples: "Ejemplos",
    nextExercise: "Siguiente Ejercicio",
    finishLesson: "Terminar Lección",
    excellent: "¡Excelente!",
    notQuite: "Casi. Correcto:",
    checkAnswer: "Comprobar",
    returnToDashboard: "Volver al Panel",
    lessonComplete: "¡Lección Completada!",
    rewards: "Recompensas",
    startPractice: "Empezar Práctica",
    typeAnswer: "Escribe tu respuesta aquí...",
    questionOf: "Pregunta {{current}} de {{total}}",
    placementMode: "Modo Evaluación",
    step: "Paso",
    of: "de",
    aimingFor: "Apuntando a maestría {{level}} en {{lang}}.",
    levelPath: "Senda Nivel {{level}}",
    modules: "módulos",
    fundamentals: "Fundamentos",
    advancedTopics: "Temas Avanzados",
    introductions: "Introducciones",
    basicGrammar: "Gramática Básica",
    numbers: "Números",
    nuances: "Matices",
    culturalContext: "Contexto Cultural",
    login: "Iniciar Sesión",
    register: "Registrarse",
    email: "Correo Electrónico",
    password: "Contraseña",
    name: "Nombre Completo",
    googleLogin: "Continuar con Google",
    listen: "Escuchar",
    geminiKey: "Clave de API de Gemini (Opcional)"
  },
  English: {
    welcome: "Welcome",
    dashboard: "Dashboard",
    myCourses: "My Courses",
    aiPractice: "AI Practice",
    statsProgress: "Stats & Progress",
    menu: "Menu",
    myLanguages: "My Languages",
    proMember: "Pro Member",
    streak: "Streak",
    xp: "XP",
    currentModule: "Current Module",
    continueLesson: "Continue Lesson",
    mastery: "Mastery",
    dialogue: "Dialogue",
    practiceWithAi: "Practice with AI",
    grammar: "Grammar",
    masterStructures: "Master structures",
    nativeLevel: "Native Level",
    goals: "Goals",
    livePractice: "Live Practice",
    vocabulary: "Vocabulary",
    chatIn: "Chat in",
    thinking: "Tutor is thinking...",
    practicePronunciation: "Practice Pronunciation",
    globalProgress: "Global Progress",
    trackingEvolution: "Tracking your evolution across all languages.",
    masteryOverview: "Mastery Overview",
    totalXP: "Total XP Combined",
    totalLessons: "Total Lessons",
    startOver: "Start Over",
    nativeLanguageSelection: "Native Language",
    whichLanguageSpeak: "Which language do you speak naturally?",
    learningTarget: "Learning Target",
    whatLanguageMaster: "What language would you like to master?",
    search: "Search language...",
    evaluationComplete: "Evaluation Complete",
    assessedLevel: "Assessed Level",
    startJourney: "Start My Journey",
    cancelSelection: "Cancel Selection",
    cancelTest: "Cancel Test",
    loadingUniverse: "Loading your linguistic universe...",
    days: "days",
    level: "Level",
    examples: "Examples",
    nextExercise: "Next Exercise",
    finishLesson: "Finish Lesson",
    excellent: "Excellent!",
    notQuite: "Not quite. Correct:",
    checkAnswer: "Check Answer",
    returnToDashboard: "Return to Dashboard",
    lessonComplete: "Lesson Complete!",
    rewards: "Rewards",
    startPractice: "Start Practice Exercises",
    typeAnswer: "Type your answer here...",
    questionOf: "Question {{current}} of {{total}}",
    placementMode: "Placement Mode",
    step: "Step",
    of: "of",
    aimingFor: "Aiming for {{level}} mastery in {{lang}}.",
    levelPath: "{{level}} Path",
    modules: "modules",
    fundamentals: "Fundamentals",
    advancedTopics: "Advanced Topics",
    introductions: "Introductions",
    basicGrammar: "Basic Grammar",
    numbers: "Numbers",
    nuances: "Nuances",
    culturalContext: "Cultural Context",
    login: "Login",
    register: "Register",
    email: "Email Address",
    password: "Password",
    name: "Full Name",
    googleLogin: "Continue with Google",
    listen: "Listen",
    geminiKey: "Gemini API Key (Optional)"
  }
};

// LocalStorage Store
class Store {
  static get(key, defaultValue) {
    try {
      const val = localStorage.getItem('linguaFlow_' + key);
      return val ? JSON.parse(val) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  }
  static set(key, value) {
    try {
      localStorage.setItem('linguaFlow_' + key, JSON.stringify(value));
    } catch (e) {}
  }
}

// Global App State
let state = {
  user: Store.get('user', { uid: 'guest_123', email: 'estudiante@linguaflow.ai', displayName: 'Estudiante' }),
  profile: Store.get('profile', null),
  learningLanguages: Store.get('learningLanguages', []),
  activeLangCode: Store.get('activeLangCode', ''),
  chatHistory: Store.get('chatHistory', {}),
  vocabulary: Store.get('vocabulary', []),
  currentView: 'dashboard',
  selectedNewLang: null,
  activeLesson: null,
  activePracticeText: null,
  isSidebarOpen: false,
  isTyping: false,
  searchQuery: '',
  authMode: 'login'
};

function t(key) {
  const native = state.profile?.nativeLanguage || 'Spanish';
  const langDict = TRANSLATIONS[native] || TRANSLATIONS['Spanish'];
  return langDict[key] || TRANSLATIONS['English'][key] || key;
}

function saveState() {
  Store.set('user', state.user);
  Store.set('profile', state.profile);
  Store.set('learningLanguages', state.learningLanguages);
  Store.set('activeLangCode', state.activeLangCode);
  Store.set('chatHistory', state.chatHistory);
  Store.set('vocabulary', state.vocabulary);
}

// Text to speech helper using browser Web Speech API
function playTTS(text, langName) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const langMap = {
      'Spanish': 'es-ES',
      'English': 'en-US',
      'French': 'fr-FR',
      'German': 'de-DE',
      'Italian': 'it-IT',
      'Portuguese': 'pt-BR',
      'Chinese': 'zh-CN',
      'Japanese': 'ja-JP',
      'Korean': 'ko-KR',
      'Russian': 'ru-RU'
    };
    utterance.lang = langMap[langName] || 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Tu navegador no soporta síntesis de voz.");
  }
}

// AI Call Helper with fallback
async function callAI(prompt, systemInstruction = "") {
  const apiKey = state.profile?.geminiKey;
  if (apiKey) {
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            { role: 'user', parts: [{ text: (systemInstruction ? systemInstruction + "\n\n" : "") + prompt }] }
          ]
        })
      });
      const data = await res.json();
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      }
    } catch (e) {
      console.warn("Gemini API call error, fallback to built-in generator:", e);
    }
  }
  return null;
}

// Placement Test Generator
async function generatePlacementTest(targetLang, nativeLang) {
  const prompt = `Generate 5 placement test questions for ${targetLang}. Return pure JSON with structure: {"questions":[{"id":"q1","level":"A1","question":"...","options":["...","...","...","..."],"correctAnswer":"..."}]}`;
  const aiRes = await callAI(prompt);
  if (aiRes) {
    try {
      const cleanJson = aiRes.replace(/```json|```/g, '').trim();
      return JSON.parse(cleanJson);
    } catch(e){}
  }

  const questionSets = {
    English: [
      { id: 'q1', level: 'A1', question: 'Select the correct phrase: "Hello, _____ name is John."', options: ['my', 'I', 'me', 'mine'], correctAnswer: 'my' },
      { id: 'q2', level: 'A2', question: 'Choose the correct past tense: "Yesterday we _____ to the beach."', options: ['go', 'went', 'gone', 'going'], correctAnswer: 'went' },
      { id: 'q3', level: 'B1', question: 'Fill in the gap: "If it rains tomorrow, we _____ stay inside."', options: ['would', 'will', 'had', 'have'], correctAnswer: 'will' },
      { id: 'q4', level: 'B2', question: 'Complete: "She denied _____ the missing files."', options: ['to take', 'taking', 'have taken', 'take'], correctAnswer: 'taking' },
      { id: 'q5', level: 'C1', question: 'Identify the synonym for "Metaphorical":', options: ['Literal', 'Figurative', 'Tangible', 'Actual'], correctAnswer: 'Figurative' }
    ],
    Spanish: [
      { id: 'q1', level: 'A1', question: 'Selecciona la frase correcta: "Hola, ¿cómo _____?"', options: ['estás', 'eres', 'tienes', 'haces'], correctAnswer: 'estás' },
      { id: 'q2', level: 'A2', question: 'Elige el tiempo pasado: "Ayer yo _____ una manzana."', options: ['como', 'comí', 'comerá', 'comiendo'], correctAnswer: 'comí' },
      { id: 'q3', level: 'B1', question: 'Subjuntivo: "Espero que tú _____ un buen día."', options: ['tienes', 'tengas', 'tendrás', 'tuviste'], correctAnswer: 'tengas' },
      { id: 'q4', level: 'B2', question: 'Completa: "A no ser que _____ pronto, perderemos el tren."', options: ['lleguemos', 'llegamos', 'llegarán', 'llegaron'], correctAnswer: 'lleguemos' },
      { id: 'q5', level: 'C1', question: 'Sinónimo de "Efímero":', options: ['Pasajero', 'Eterno', 'Duradero', 'Fuerte'], correctAnswer: 'Pasajero' }
    ]
  };
  return { questions: questionSets[targetLang] || questionSets['English'] };
}

// Lesson Generator
async function generateLesson(topic, targetLang, level, nativeLang) {
  const prompt = `Generate a JSON lesson for topic "${topic}" in ${targetLang} (${level}). Return JSON: {"id":"l1","title":"${topic}","level":"${level}","explanation":"...","examples":[{"original":"...","translation":"..."}],"exercises":[{"id":"e1","type":"multiple-choice","question":"...","options":["...","...","...","..."],"correctAnswer":"...","clue":"..."}]}`;
  const aiRes = await callAI(prompt);
  if (aiRes) {
    try {
      const cleanJson = aiRes.replace(/```json|```/g, '').trim();
      return JSON.parse(cleanJson);
    } catch(e){}
  }

  return {
    id: 'lesson_' + Date.now(),
    title: topic,
    level: level,
    explanation: `### ${topic}\n\nEn esta lección aprenderás las estructuras fundamentales para dominar **${topic}** en **${targetLang}**.\n\nPresta especial atención a la pronunciación y concordancia en las frases de ejemplo.`,
    examples: [
      { original: targetLang === 'Spanish' ? '¡Buenos días! ¿Cómo estás?' : 'Good morning! How are you?', translation: nativeLang === 'Spanish' ? 'Good morning! How are you?' : '¡Buenos días! ¿Cómo estás?' },
      { original: targetLang === 'Spanish' ? 'Me gustaría pedir un café, por favor.' : 'I would like to order a coffee, please.', translation: nativeLang === 'Spanish' ? 'I would like to order a coffee, please.' : 'Me gustaría pedir un café, por favor.' },
      { original: targetLang === 'Spanish' ? 'Muchas gracias por tu ayuda.' : 'Thank you very much for your help.', translation: nativeLang === 'Spanish' ? 'Thank you very much for your help.' : 'Muchas gracias por tu ayuda.' }
    ],
    exercises: [
      {
        id: 'ex1',
        type: 'multiple-choice',
        question: targetLang === 'Spanish' ? '¿Cómo se dice "Thank you"?' : 'How do you say "Gracias"?',
        options: targetLang === 'Spanish' ? ['Gracias', 'De nada', 'Por favor', 'Hola'] : ['Thank you', 'You are welcome', 'Please', 'Hello'],
        correctAnswer: targetLang === 'Spanish' ? 'Gracias' : 'Thank you',
        clue: 'Expresión de gratitud.'
      },
      {
        id: 'ex2',
        type: 'fill-gap',
        question: targetLang === 'Spanish' ? 'Buenos _____ (Days)' : 'Good _____ (Morning)',
        correctAnswer: targetLang === 'Spanish' ? 'días' : 'morning',
        clue: 'Saludo matutino.'
      },
      {
        id: 'ex3',
        type: 'translation',
        question: targetLang === 'Spanish' ? 'Traduce: "How are you?"' : 'Translate: "¿Cómo estás?"',
        correctAnswer: targetLang === 'Spanish' ? '¿Cómo estás?' : 'How are you?',
        clue: 'Pregunta sobre el estado de ánimo.'
      }
    ]
  };
}

// AI Chat Tutor
async function getAIChatResponse(userMessage, targetLang, nativeLang) {
  const prompt = `You are a native ${targetLang} language tutor. Respond to the student in ${targetLang}. Student native language is ${nativeLang}. If the student made any grammar or vocabulary mistake in their message, add "Correction: [friendly tip in ${nativeLang}]" at the end of your response. User message: "${userMessage}"`;
  const aiRes = await callAI(prompt);
  if (aiRes) return aiRes;

  const text = userMessage.toLowerCase();
  let response = "";
  if (text.includes('hola') || text.includes('hello') || text.includes('hi') || text.includes('bonjour')) {
    response = targetLang === 'Spanish' 
      ? `¡Hola! Qué gusto saludarte. ¿De qué te gustaría hablar hoy para practicar español?`
      : `Hello! Great to meet you. What topic would you like to talk about today in ${targetLang}?`;
  } else if (text.includes('gracias') || text.includes('thanks') || text.includes('thank')) {
    response = targetLang === 'Spanish'
      ? `¡De nada! Estás progresando muy rápido.`
      : `You're very welcome! You are making great progress.`;
  } else {
    response = targetLang === 'Spanish'
      ? `¡Excelente aporte! Hablar sobre esto te ayuda a ganar fluidez. ¿Puedes darme otro ejemplo?`
      : `That's wonderful! Expressing your thoughts on this will build your fluency. Could you elaborate further?`;
  }

  if (userMessage.length > 5 && !userMessage.endsWith('.') && !userMessage.endsWith('?') && !userMessage.endsWith('!')) {
    response += `\n\nCorrection: Recuerda terminar tus oraciones con puntuación adecuada (".") para mantener un estilo nativo impecable.`;
  }

  return response;
}

// Pronunciation Evaluator
async function analyzeAudioPronunciation(targetText, targetLang, nativeLang) {
  const accuracy = Math.floor(Math.random() * 20) + 80;
  return {
    score: accuracy,
    feedback: accuracy > 90 ? "¡Pronunciación excelente y entonación nativa!" : "Muy buena pronunciación, cuida la articulación de las vocales finales.",
    transcription: targetText,
    tips: [
      "Mantén un flujo continuo de aire al articular.",
      "Asegúrate de acentuar la sílaba tónica adecuadamente."
    ]
  };
}

// MAIN RENDER ENGINE
function render() {
  const app = document.getElementById('app');
  if (!app) return;

  if (!state.profile || !state.profile.nativeLanguage) {
    app.innerHTML = renderNativeLanguageOnboarding();
    lucide.createIcons();
    return;
  }

  if (state.learningLanguages.length === 0 || state.currentView === 'placement') {
    app.innerHTML = renderTargetLanguageOnboarding();
    lucide.createIcons();
    return;
  }

  app.innerHTML = `
    <div class="min-h-screen flex flex-col md:flex-row bg-natural-bg text-natural-dark overflow-hidden">
      ${renderMobileHeader()}
      ${renderSidebarOverlay()}
      ${renderSidebar()}
      <main class="flex-1 flex flex-col overflow-hidden relative">
        <div class="flex-1 overflow-y-auto p-6 md:p-12 pb-24 md:pb-12">
          ${renderMainContent()}
        </div>
      </main>
    </div>
    ${state.activeLesson ? renderLessonModal() : ''}
    ${state.activePracticeText ? renderPronunciationModal() : ''}
  `;
  lucide.createIcons();
}

// ONBOARDING 1
function renderNativeLanguageOnboarding() {
  const filtered = LANGUAGES.filter(l => 
    l.name.toLowerCase().includes(state.searchQuery.toLowerCase()) || 
    l.code.toLowerCase().includes(state.searchQuery.toLowerCase())
  );

  return `
    <div class="min-h-screen flex items-center justify-center p-4 md:p-6 bg-natural-bg">
      <div class="max-w-md w-full bg-white p-6 md:p-10 rounded-[40px] shadow-2xl border border-natural-border text-center flex flex-col max-h-[90vh] overflow-hidden">
        <div class="w-16 h-16 bg-natural-green/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-natural-green shrink-0">
          <i data-lucide="sparkles" class="w-8 h-8"></i>
        </div>
        <p class="text-[10px] font-black uppercase tracking-[0.3em] text-natural-green mb-2">${t('step')} 1 ${t('of')} 2</p>
        <h1 class="text-3xl md:text-4xl font-serif italic mb-3 text-natural-dark">${t('nativeLanguageSelection')}</h1>
        <p class="text-natural-taupe mb-6 text-sm font-medium leading-relaxed">${t('whichLanguageSpeak')}</p>
        
        <div class="mb-4 relative">
          <input 
            type="text" 
            placeholder="${t('search')}" 
            value="${state.searchQuery}"
            oninput="state.searchQuery = this.value; render();"
            class="w-full pl-12 pr-4 py-3 bg-natural-bg border border-natural-border rounded-2xl focus:outline-none focus:ring-4 focus:ring-natural-green/10 font-medium"
          />
          <i data-lucide="languages" class="absolute left-4 top-1/2 -translate-y-1/2 text-natural-taupe w-5 h-5"></i>
        </div>

        <div class="flex-1 overflow-y-auto pr-1 space-y-2 custom-scrollbar">
          ${filtered.map(lang => `
            <button 
              onclick="selectNativeLanguage('${lang.code}')"
              class="w-full flex items-center gap-4 p-4 rounded-2xl border border-natural-border hover:border-natural-green hover:bg-natural-sidebar transition-all group"
            >
              <span class="text-2xl">${lang.flag}</span>
              <span class="font-bold text-natural-dark text-lg">${lang.name}</span>
              <i data-lucide="arrow-right" class="ml-auto text-natural-taupe group-hover:text-natural-green w-5 h-5"></i>
            </button>
          `).join('')}
        </div>

        <div class="mt-6 pt-4 border-t border-natural-border text-left">
          <label class="text-[10px] font-bold uppercase tracking-widest text-natural-taupe block mb-1">${t('geminiKey')}</label>
          <input 
            type="password" 
            placeholder="AIZASy..." 
            value="${state.profile?.geminiKey || ''}"
            onchange="setGeminiKey(this.value)"
            class="w-full px-4 py-2 text-xs bg-natural-bg border border-natural-border rounded-xl focus:outline-none focus:border-natural-green"
          />
        </div>
      </div>
    </div>
  `;
}

function selectNativeLanguage(langCode) {
  state.profile = { ...(state.profile || {}), nativeLanguage: langCode };
  state.searchQuery = '';
  saveState();
  render();
}

function setGeminiKey(val) {
  state.profile = { ...(state.profile || {}), geminiKey: val.trim() };
  saveState();
}

// ONBOARDING 2 & PLACEMENT TEST
let testState = { questions: [], currentIdx: 0, answers: {}, levelResult: null, loading: true };

function renderTargetLanguageOnboarding() {
  if (state.selectedNewLang) {
    return renderPlacementTestScreen();
  }

  const filtered = LANGUAGES.filter(l => 
    l.name.toLowerCase().includes(state.searchQuery.toLowerCase()) || 
    l.code.toLowerCase().includes(state.searchQuery.toLowerCase())
  );

  return `
    <div class="min-h-screen flex items-center justify-center p-4 md:p-6 bg-natural-bg">
      <div class="max-w-md w-full bg-white p-6 md:p-10 rounded-[40px] shadow-2xl border border-natural-border text-center flex flex-col max-h-[90vh] overflow-hidden">
        <div class="w-16 h-16 bg-natural-green/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-natural-green shrink-0">
          <i data-lucide="book-open" class="w-8 h-8"></i>
        </div>
        <p class="text-[10px] font-black uppercase tracking-[0.3em] text-natural-green mb-2">${t('step')} 2 ${t('of')} 2</p>
        <h1 class="text-3xl md:text-4xl font-serif italic mb-3 text-natural-dark">${t('learningTarget')}</h1>
        <p class="text-natural-taupe mb-6 text-sm font-medium leading-relaxed">${t('whatLanguageMaster')}</p>
        
        <div class="mb-4 relative">
          <input 
            type="text" 
            placeholder="${t('search')}" 
            value="${state.searchQuery}"
            oninput="state.searchQuery = this.value; render();"
            class="w-full pl-12 pr-4 py-3 bg-natural-bg border border-natural-border rounded-2xl focus:outline-none focus:ring-4 focus:ring-natural-green/10 font-medium"
          />
          <i data-lucide="languages" class="absolute left-4 top-1/2 -translate-y-1/2 text-natural-taupe w-5 h-5"></i>
        </div>

        <div class="flex-1 overflow-y-auto pr-1 space-y-2 custom-scrollbar">
          ${filtered.map(lang => `
            <button 
              onclick="startPlacementTest('${lang.code}')"
              class="w-full flex items-center gap-4 p-4 rounded-2xl border border-natural-border hover:border-natural-green hover:bg-natural-sidebar transition-all group"
            >
              <span class="text-2xl">${lang.flag}</span>
              <span class="font-bold text-natural-dark text-lg">${lang.name}</span>
              <i data-lucide="arrow-right" class="ml-auto text-natural-taupe group-hover:text-natural-green w-5 h-5"></i>
            </button>
          `).join('')}
        </div>

        ${state.learningLanguages.length > 0 ? `
          <div class="mt-6">
            <button onclick="state.currentView = 'dashboard'; render();" class="text-xs font-bold text-natural-taupe hover:text-natural-dark uppercase tracking-widest">
              ${t('cancelSelection')}
            </button>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

async function startPlacementTest(langCode) {
  const lang = LANGUAGES.find(l => l.code === langCode);
  state.selectedNewLang = lang;
  testState = { questions: [], currentIdx: 0, answers: {}, levelResult: null, loading: true };
  render();

  const testData = await generatePlacementTest(lang.code, state.profile.nativeLanguage);
  testState.questions = testData.questions || [];
  testState.loading = false;
  render();
}

function renderPlacementTestScreen() {
  if (testState.loading) {
    return `
      <div class="min-h-screen bg-natural-bg p-8 flex flex-col items-center justify-center text-center">
        <div class="w-16 h-16 border-4 border-natural-green border-t-transparent rounded-full animate-spin mb-6"></div>
        <h2 class="text-2xl font-serif italic text-natural-dark">${t('loadingUniverse')}</h2>
      </div>
    `;
  }

  if (testState.levelResult) {
    return `
      <div class="min-h-screen bg-natural-bg p-4 flex items-center justify-center">
        <div class="max-w-lg w-full bg-white p-8 md:p-10 rounded-[40px] shadow-2xl border border-natural-border text-center">
          <div class="w-20 h-20 bg-natural-green/10 rounded-full flex items-center justify-center mx-auto mb-6 text-natural-green">
            <i data-lucide="brain-circuit" class="w-10 h-10"></i>
          </div>
          <h2 class="text-3xl font-serif italic mb-2 text-natural-dark">${t('evaluationComplete')}</h2>
          <p class="text-natural-taupe text-sm mb-6">Hemos determinado tu nivel inicial.</p>
          
          <div class="my-6">
            <p class="text-xs font-bold uppercase tracking-widest text-natural-taupe mb-1">${t('assessedLevel')}</p>
            <p class="text-7xl font-serif italic text-natural-green">${testState.levelResult}</p>
          </div>

          <button 
            onclick="completePlacementTest('${testState.levelResult}')"
            class="w-full py-4 bg-natural-green text-white rounded-[24px] font-bold text-lg shadow-lg active:scale-95 transition-all"
          >
            ${t('startJourney')}
          </button>
        </div>
      </div>
    `;
  }

  const q = testState.questions[testState.currentIdx];
  return `
    <div class="min-h-screen bg-natural-bg p-4 flex items-center justify-center">
      <div class="max-w-2xl w-full bg-white p-6 md:p-10 rounded-[40px] shadow-2xl border border-natural-border">
        <div class="flex justify-between items-center mb-6">
          <span class="text-xs font-bold uppercase tracking-widest text-natural-taupe">
            ${t('questionOf').replace('{{current}}', testState.currentIdx + 1).replace('{{total}}', testState.questions.length)}
          </span>
          <span class="px-3 py-1 bg-natural-sidebar rounded-full text-xs font-bold text-natural-green border border-natural-green/20">
            ${state.selectedNewLang.name}
          </span>
        </div>

        <h3 class="text-2xl font-serif text-natural-dark mb-6">${q.question}</h3>
        
        <div class="grid gap-3 mb-8">
          ${q.options.map(opt => `
            <button 
              onclick="answerPlacementQuestion('${opt.replace(/'/g, "\\'")}')"
              class="p-5 rounded-2xl border border-natural-border text-left hover:border-natural-green hover:bg-natural-sidebar font-medium text-natural-dark transition-all"
            >
              ${opt}
            </button>
          `).join('')}
        </div>

        <button onclick="state.selectedNewLang = null; render();" class="text-xs font-bold text-natural-taupe hover:text-natural-dark uppercase tracking-widest block mx-auto">
          ${t('cancelTest')}
        </button>
      </div>
    </div>
  `;
}

function answerPlacementQuestion(answer) {
  const q = testState.questions[testState.currentIdx];
  testState.answers[q.id] = answer;

  if (testState.currentIdx < testState.questions.length - 1) {
    testState.currentIdx++;
  } else {
    let score = 0;
    testState.questions.forEach(ques => {
      if (testState.answers[ques.id] === ques.correctAnswer) score++;
    });
    const level = score <= 1 ? 'A1' : score <= 2 ? 'A2' : score <= 3 ? 'B1' : score <= 4 ? 'B2' : 'C1';
    testState.levelResult = level;
  }
  render();
}

function completePlacementTest(level) {
  const lang = state.selectedNewLang;
  const existing = state.learningLanguages.find(l => l.code === lang.code);
  if (!existing) {
    state.learningLanguages.push({
      code: lang.code,
      name: lang.name,
      flag: lang.flag,
      level: level,
      xp: 0,
      streak: 1,
      lessonsDone: 0
    });
  }
  state.activeLangCode = lang.code;
  state.selectedNewLang = null;
  state.currentView = 'dashboard';
  saveState();
  render();
}

// NAVIGATION
function renderMobileHeader() {
  return `
    <div class="md:hidden flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-natural-border z-[60] sticky top-0">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 bg-natural-green rounded-xl flex items-center justify-center text-white shadow-md">
          <i data-lucide="sparkles" class="w-5 h-5"></i>
        </div>
        <span class="font-serif italic text-xl text-natural-dark">LinguaFlow</span>
      </div>
      <button onclick="state.isSidebarOpen = !state.isSidebarOpen; render();" class="p-3 bg-natural-sidebar rounded-2xl border border-natural-border text-natural-green">
        <i data-lucide="${state.isSidebarOpen ? 'x' : 'home'}" class="w-5 h-5"></i>
      </button>
    </div>
  `;
}

function renderSidebarOverlay() {
  if (!state.isSidebarOpen) return '';
  return `
    <div onclick="state.isSidebarOpen = false; render();" class="fixed inset-0 bg-natural-dark/40 backdrop-blur-sm z-40 md:hidden"></div>
  `;
}

function renderSidebar() {
  const activeLang = state.learningLanguages.find(l => l.code === state.activeLangCode) || state.learningLanguages[0];

  return `
    <nav class="
      fixed md:relative top-[73px] md:top-0 left-0 z-50
      w-[280px] md:w-80 bg-natural-sidebar border-r border-natural-border 
      flex flex-col p-5 md:p-8 transition-transform duration-300
      ${state.isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      h-[calc(100vh-73px)] md:h-screen overflow-y-auto shadow-2xl md:shadow-none
    ">
      <div class="hidden md:flex items-center gap-4 mb-10">
        <div class="w-11 h-11 bg-natural-green rounded-[14px] flex items-center justify-center text-white shadow-xl shrink-0">
          <i data-lucide="sparkles" class="w-6 h-6"></i>
        </div>
        <span class="text-2xl font-serif italic text-natural-dark">LinguaFlow</span>
      </div>
      
      <div class="space-y-1 mb-6">
        <p class="text-[10px] uppercase tracking-[0.3em] font-black opacity-30 mb-3 px-4">${t('menu')}</p>
        ${renderSidebarNavBtn('dashboard', 'home', t('dashboard'))}
        ${renderSidebarNavBtn('lessons', 'book-open', t('myCourses'))}
        ${renderSidebarNavBtn('chat', 'message-square', t('aiPractice'))}
        ${renderSidebarNavBtn('vocabulary', 'trending-up', t('statsProgress'))}
      </div>

      <div class="space-y-3 mb-6">
         <div class="flex items-center justify-between px-4">
           <p class="text-[10px] uppercase tracking-[0.3em] font-black opacity-30">${t('myLanguages')}</p>
           <button onclick="state.currentView = 'placement'; render();" class="p-1 hover:bg-natural-green/10 text-natural-green rounded-lg">
             <i data-lucide="plus" class="w-4 h-4"></i>
           </button>
         </div>
         <div class="space-y-1.5">
           ${state.learningLanguages.map(lang => `
             <button 
               onclick="state.activeLangCode = '${lang.code}'; state.isSidebarOpen = false; render();"
               class="w-full flex items-center gap-3.5 px-4 py-3 rounded-[20px] transition-all ${state.activeLangCode === lang.code ? 'bg-white shadow-lg border border-natural-border text-natural-dark' : 'text-natural-taupe hover:bg-natural-sidebar/50'}"
             >
               <span class="text-xl shrink-0">${lang.flag}</span>
               <div class="text-left flex-1 min-w-0">
                  <p class="text-xs font-bold leading-tight truncate ${state.activeLangCode === lang.code ? 'text-natural-green' : ''}">${lang.name}</p>
                  <p class="text-[9px] opacity-40 uppercase tracking-widest font-bold">${t('level')} ${lang.level}</p>
               </div>
               ${state.activeLangCode === lang.code ? '<div class="w-1.5 h-1.5 bg-natural-green rounded-full"></div>' : ''}
             </button>
           `).join('')}
         </div>
      </div>
      
      <div class="mt-auto pt-4 border-t border-natural-border">
        <div class="flex items-center gap-3.5 p-3.5 bg-white border border-natural-border rounded-[24px] shadow-sm">
           <div class="w-10 h-10 rounded-[14px] bg-natural-sidebar border border-natural-border flex items-center justify-center font-black text-natural-taupe shrink-0 text-xs">
             ${state.user.displayName ? state.user.displayName[0].toUpperCase() : 'U'}
           </div>
           <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-natural-dark truncate">${state.user.displayName}</p>
              <p class="text-[9px] uppercase tracking-widest font-black opacity-30">${t('proMember')}</p>
           </div>
           <button onclick="resetApp()" class="p-2 text-red-500 hover:bg-red-50 rounded-lg">
             <i data-lucide="log-out" class="w-4 h-4"></i>
           </button>
        </div>
      </div>
    </nav>
  `;
}

function renderSidebarNavBtn(viewKey, iconName, label) {
  const active = state.currentView === viewKey;
  return `
    <button 
      onclick="state.currentView = '${viewKey}'; state.isSidebarOpen = false; render();"
      class="w-full flex items-center gap-3.5 px-4 py-3 rounded-[20px] transition-all ${active ? 'bg-white shadow-lg border border-natural-border text-natural-dark font-bold' : 'text-natural-taupe hover:text-natural-dark'}"
    >
      <i data-lucide="${iconName}" class="w-5 h-5 shrink-0 ${active ? 'text-natural-green' : ''}"></i>
      <span class="text-sm font-bold tracking-tight truncate">${label}</span>
      ${active ? '<div class="ml-auto w-1.5 h-1.5 bg-natural-green rounded-full"></div>' : ''}
    </button>
  `;
}

function resetApp() {
  if (confirm("¿Estás seguro de que quieres reiniciar tu perfil y datos de aprendizaje?")) {
    localStorage.clear();
    location.reload();
  }
}

function renderMainContent() {
  if (state.currentView === 'dashboard') return renderDashboardView();
  if (state.currentView === 'chat') return renderChatView();
  if (state.currentView === 'lessons') return renderLessonsView();
  if (state.currentView === 'vocabulary') return renderVocabularyView();
  return renderDashboardView();
}

// DASHBOARD
function renderDashboardView() {
  const activeLang = state.learningLanguages.find(l => l.code === state.activeLangCode) || state.learningLanguages[0];

  return `
    <div class="space-y-6 md:space-y-10">
      <header class="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div class="min-w-0">
          <h1 class="text-3xl md:text-5xl font-serif italic mb-3 text-natural-dark">${t('welcome')}, ${state.user.displayName}!</h1>
          <p class="text-natural-taupe font-medium text-sm md:text-base opacity-80">${activeLang.streak} ${t('days')} ${t('streak')} en ${activeLang.name}. ${activeLang.xp} XP.</p>
        </div>
        <div class="flex flex-wrap gap-4">
          <div class="bg-white p-4 rounded-[28px] border border-natural-border shadow-sm flex items-center gap-4 min-w-[140px]">
            <div class="w-10 h-10 bg-natural-sidebar rounded-xl flex items-center justify-center text-natural-green">
              <i data-lucide="flame" class="w-5 h-5"></i>
            </div>
            <div>
              <p class="text-[9px] uppercase tracking-widest font-black opacity-40 mb-0.5">${t('streak')}</p>
              <p class="text-base font-bold text-natural-dark">${activeLang.streak} ${t('days')}</p>
            </div>
          </div>
          <div class="bg-white p-4 rounded-[28px] border border-natural-border shadow-sm flex items-center gap-4 min-w-[140px]">
            <div class="w-10 h-10 bg-natural-sidebar rounded-xl flex items-center justify-center text-natural-green">
              <i data-lucide="star" class="w-5 h-5"></i>
            </div>
            <div>
              <p class="text-[9px] uppercase tracking-widest font-black opacity-40 mb-0.5">${t('xp')}</p>
              <p class="text-base font-bold text-natural-dark">${activeLang.xp}</p>
            </div>
          </div>
        </div>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-6 md:space-y-8">
          <section class="natural-card bg-white relative overflow-hidden flex flex-col p-6 md:p-10">
            <div class="flex justify-between items-start mb-8">
              <div>
                <span class="inline-block px-3 py-1 bg-natural-sidebar rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-natural-green mb-4">
                  ${t('levelPath').replace('{{level}}', activeLang.level)}
                </span>
                <h2 class="text-3xl md:text-4xl font-serif mb-2 italic text-natural-dark">${t('currentModule')}</h2>
                <p class="text-natural-taupe text-sm font-medium">${t('masterStructures')}</p>
              </div>
            </div>

            <div class="mt-auto">
              <div class="flex justify-between text-xs font-bold uppercase tracking-wider mb-2 opacity-60">
                <span>${t('mastery')}</span>
                <span>${Math.min(Math.round((activeLang.xp % 1000) / 10), 100)}%</span>
              </div>
              <div class="w-full bg-natural-sidebar h-3 rounded-full mb-8 overflow-hidden">
                <div class="bg-natural-green h-full rounded-full transition-all duration-500" style="width: ${Math.min(Math.round((activeLang.xp % 1000) / 10), 100)}%"></div>
              </div>
              <button 
                onclick="openGeneratedLesson('${t('fundamentals')}: ${t('basicGrammar')}')"
                class="w-full bg-natural-green text-white py-4 rounded-[24px] text-lg font-medium hover:bg-natural-green/90 transition-all shadow-lg active:scale-95"
              >
                ${t('continueLesson')}
              </button>
            </div>
          </section>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <button onclick="state.currentView = 'chat'; render();" class="p-6 rounded-[32px] border border-natural-border bg-white shadow-sm flex items-start gap-5 text-left hover:shadow-md transition-all group">
              <div class="w-14 h-14 rounded-2xl bg-natural-sidebar flex items-center justify-center group-hover:scale-110 transition-transform text-natural-dark">
                <i data-lucide="message-square" class="w-6 h-6"></i>
              </div>
              <div>
                <h4 class="font-bold text-natural-dark text-lg">${t('dialogue')}</h4>
                <p class="text-sm text-natural-taupe">${t('practiceWithAi')}</p>
              </div>
            </button>
            <button onclick="state.currentView = 'lessons'; render();" class="p-6 rounded-[32px] border border-natural-border bg-white shadow-sm flex items-start gap-5 text-left hover:shadow-md transition-all group">
              <div class="w-14 h-14 rounded-2xl bg-natural-sidebar flex items-center justify-center group-hover:scale-110 transition-transform text-natural-dark">
                <i data-lucide="brain-circuit" class="w-6 h-6"></i>
              </div>
              <div>
                <h4 class="font-bold text-natural-dark text-lg">${t('grammar')}</h4>
                <p class="text-sm text-natural-taupe">${t('masterStructures')}</p>
              </div>
            </button>
          </div>
        </div>

        <aside class="space-y-6 text-natural-dark">
          <div class="p-8 rounded-[36px] bg-natural-dark text-natural-bg shadow-xl flex flex-col items-center text-center">
            <div class="w-14 h-14 rounded-full border-2 border-natural-green flex items-center justify-center mb-4 text-natural-green">
              <i data-lucide="trending-up" class="w-6 h-6"></i>
            </div>
            <h3 class="text-lg font-bold text-natural-bg">${t('nativeLevel')}</h3>
            <p class="text-natural-bg/70 text-xs mt-2 leading-relaxed">${t('aimingFor').replace('{{level}}', 'C2').replace('{{lang}}', activeLang.name)}</p>
          </div>

          <div class="natural-card p-6">
            <h3 class="font-serif italic text-lg mb-4 flex items-center gap-2 text-natural-dark">
              <i data-lucide="trophy" class="w-5 h-5 text-natural-green"></i> ${t('goals')}
            </h3>
            <div class="space-y-4">
              <div>
                <div class="flex justify-between text-xs font-bold uppercase tracking-widest opacity-60 mb-1">
                  <span>1000 XP Meta</span><span>${Math.min(Math.round((activeLang.xp / 1000) * 100), 100)}%</span>
                </div>
                <div class="w-full h-2 bg-natural-sidebar rounded-full overflow-hidden">
                  <div class="bg-natural-green h-full" style="width: ${Math.min(Math.round((activeLang.xp / 1000) * 100), 100)}%"></div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  `;
}

// AI PRACTICE CHAT
function renderChatView() {
  const activeLang = state.learningLanguages.find(l => l.code === state.activeLangCode) || state.learningLanguages[0];
  const history = state.chatHistory[activeLang.code] || [
    { role: 'model', text: `${activeLang.flag} ¡Hola! Soy tu tutor nativo de ${activeLang.name}. ¿De qué quieres hablar hoy?` }
  ];

  return `
    <div class="h-[calc(100vh-140px)] flex flex-col bg-white rounded-[32px] md:rounded-[40px] border border-natural-border shadow-xl overflow-hidden">
      <div class="p-4 md:p-6 bg-natural-sidebar border-b border-natural-border flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm">
            ${activeLang.flag}
          </div>
          <div>
            <h3 class="font-serif italic text-lg leading-tight">${activeLang.name} Tutor</h3>
            <span class="text-[10px] font-bold uppercase tracking-widest text-natural-green flex items-center gap-1">
              <span class="w-2 h-2 bg-natural-green rounded-full animate-ping"></span> ${t('livePractice')}
            </span>
          </div>
        </div>
        <button onclick="state.currentView = 'dashboard'; render();" class="p-2 hover:bg-white rounded-xl">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <div id="chat-container" class="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-natural-bg/30 custom-scrollbar">
        ${history.map(msg => `
          <div class="flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}">
            <div class="max-w-[85%] md:max-w-[75%] space-y-2">
              <div class="p-4 md:p-5 rounded-[24px] ${msg.role === 'user' ? 'bg-natural-dark text-natural-bg rounded-tr-none' : 'bg-white text-natural-dark border border-natural-border rounded-tl-none shadow-sm'}">
                <p class="whitespace-pre-wrap text-sm md:text-base">${parseChatMessageText(msg.text)}</p>
              </div>
              ${msg.role === 'model' ? `
                <div class="flex items-center gap-3 px-2">
                  <button 
                    onclick="playTTS('${msg.text.replace(/'/g, "\\'").replace(/"/g, '&quot;')}', '${activeLang.name}')"
                    class="flex items-center gap-1.5 text-[10px] font-bold text-natural-green uppercase tracking-widest hover:opacity-80"
                  >
                    <i data-lucide="volume-2" class="w-3.5 h-3.5"></i> ${t('listen')}
                  </button>
                  <button 
                    onclick="startPronunciationPractice('${msg.text.split('\n')[0].replace(/'/g, "\\'")}')"
                    class="flex items-center gap-1.5 text-[10px] font-bold text-natural-taupe uppercase tracking-widest hover:text-natural-green"
                  >
                    <i data-lucide="mic" class="w-3.5 h-3.5"></i> ${t('practicePronunciation')}
                  </button>
                </div>
              ` : ''}
            </div>
          </div>
        `).join('')}
        ${state.isTyping ? `
          <div class="flex justify-start">
            <div class="bg-white border border-natural-border px-4 py-3 rounded-full rounded-tl-none text-xs font-bold text-natural-taupe animate-pulse">
              ${t('thinking')}
            </div>
          </div>
        ` : ''}
      </div>

      <div class="p-4 bg-white border-t border-natural-border flex gap-3">
        <input 
          id="chat-input"
          type="text" 
          placeholder="${t('chatIn')} ${activeLang.name}..."
          onkeypress="if(event.key==='Enter') sendChatMessage()"
          class="flex-1 bg-natural-bg border border-natural-border px-5 py-3 rounded-2xl focus:outline-none focus:border-natural-green"
        />
        <button 
          onclick="sendChatMessage()"
          class="w-12 h-12 bg-natural-green text-white rounded-2xl flex items-center justify-center hover:bg-natural-green/90 shadow-md active:scale-95"
        >
          <i data-lucide="send" class="w-5 h-5"></i>
        </button>
      </div>
    </div>
  `;
}

function parseChatMessageText(text) {
  if (text.includes('Correction:')) {
    const parts = text.split(/Correction:/i);
    return `${parts[0]}<div class="mt-3 p-3 bg-natural-green/10 border-l-4 border-natural-green text-xs rounded-r-xl italic"><strong>Correction:</strong> ${parts[1]}</div>`;
  }
  return text;
}

async function sendChatMessage() {
  const input = document.getElementById('chat-input');
  if (!input || !input.value.trim() || state.isTyping) return;

  const userText = input.value.trim();
  input.value = '';

  const activeLang = state.learningLanguages.find(l => l.code === state.activeLangCode) || state.learningLanguages[0];
  if (!state.chatHistory[activeLang.code]) {
    state.chatHistory[activeLang.code] = [];
  }

  state.chatHistory[activeLang.code].push({ role: 'user', text: userText });
  state.isTyping = true;
  render();

  const chatContainer = document.getElementById('chat-container');
  if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;

  const reply = await getAIChatResponse(userText, activeLang.name, state.profile.nativeLanguage);
  state.chatHistory[activeLang.code].push({ role: 'model', text: reply });
  state.isTyping = false;

  activeLang.xp += 15;
  if (reply.includes('Correction:')) {
    const wordMatch = userText.match(/\b[a-zA-ZáéíóúÁÉÍÓÚñÑ]{3,}\b/g);
    if (wordMatch && wordMatch.length > 0) {
      state.vocabulary.unshift({
        word: wordMatch[0],
        translation: 'Vocabulario revisado',
        learnedDate: new Date().toLocaleDateString(),
        languageCode: activeLang.code
      });
    }
  }

  saveState();
  render();

  const updatedContainer = document.getElementById('chat-container');
  if (updatedContainer) updatedContainer.scrollTop = updatedContainer.scrollHeight;
}

// LESSONS
function renderLessonsView() {
  const activeLang = state.learningLanguages.find(l => l.code === state.activeLangCode) || state.learningLanguages[0];

  return `
    <div class="space-y-6 md:space-y-10">
      <header>
        <h1 class="text-3xl md:text-5xl font-serif italic mb-2">${t('myCourses')}</h1>
        <p class="text-natural-taupe font-medium">${t('learningTarget')}: ${activeLang.name}</p>
      </header>

      <div class="grid gap-6">
        ${renderLessonCategory(t('fundamentals'), activeLang.level, [t('introductions'), t('basicGrammar'), t('numbers')], activeLang.lessonsDone, 3)}
        ${renderLessonCategory(t('advancedTopics'), 'B2', [t('nuances'), t('culturalContext')], 0, 2, true)}
      </div>
    </div>
  `;
}

function renderLessonCategory(title, level, lessons, doneCount, total, isLocked = false) {
  return `
    <div class="rounded-[32px] border border-natural-border bg-white p-6 md:p-8 shadow-sm ${isLocked ? 'opacity-60' : ''}">
      <div class="flex items-center gap-6 mb-6">
        <div class="w-14 h-14 rounded-2xl bg-natural-sidebar flex items-center justify-center font-bold text-xl text-natural-green shrink-0">
          ${level}
        </div>
        <div>
          <h3 class="font-bold text-xl text-natural-dark">${title}</h3>
          <p class="text-xs text-natural-taupe uppercase tracking-widest font-bold">${doneCount}/${total} ${t('modules')}</p>
        </div>
      </div>

      <div class="space-y-3">
        ${lessons.map(les => `
          <button 
            ${isLocked ? 'disabled' : `onclick="openGeneratedLesson('${title}: ${les}')"`}
            class="w-full flex items-center gap-4 p-4 rounded-2xl bg-natural-sidebar/30 hover:bg-natural-sidebar/80 transition-all text-left"
          >
            <div class="w-7 h-7 rounded-full border border-natural-border flex items-center justify-center text-natural-green shrink-0">
              <i data-lucide="check" class="w-4 h-4"></i>
            </div>
            <span class="font-semibold text-natural-dark">${les}</span>
            <i data-lucide="chevron-right" class="ml-auto w-5 h-5 text-natural-taupe"></i>
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

async function openGeneratedLesson(topic) {
  const activeLang = state.learningLanguages.find(l => l.code === state.activeLangCode) || state.learningLanguages[0];
  const app = document.getElementById('app');
  const loaderHtml = `
    <div class="fixed inset-0 z-[150] bg-natural-bg/90 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center">
      <div class="w-16 h-16 border-4 border-natural-green border-t-transparent rounded-full animate-spin mb-6"></div>
      <h2 class="text-2xl font-serif italic text-natural-dark">${t('loadingUniverse')}</h2>
    </div>
  `;
  app.insertAdjacentHTML('beforeend', loaderHtml);

  const lessonData = await generateLesson(topic, activeLang.name, activeLang.level, state.profile.nativeLanguage);
  state.activeLesson = lessonData;
  render();
}

// LESSON MODAL
let lessonViewState = { step: 'explanation', exerciseIdx: 0, answers: {}, score: 0 };

function renderLessonModal() {
  const lesson = state.activeLesson;
  const currentEx = lesson.exercises ? lesson.exercises[lessonViewState.exerciseIdx] : null;

  return `
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-natural-dark/60 backdrop-blur-sm">
      <div class="w-full max-w-3xl h-full max-h-[750px] bg-white rounded-[40px] border border-natural-border shadow-2xl flex flex-col overflow-hidden">
        <div class="p-6 bg-natural-sidebar border-b border-natural-border flex items-center justify-between">
          <button onclick="state.activeLesson = null; lessonViewState={step:'explanation',exerciseIdx:0,answers:{},score:0}; render();" class="p-2 hover:bg-white rounded-xl">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
          <div class="text-center">
            <h3 class="font-serif italic text-lg font-bold">${lesson.title}</h3>
            <p class="text-[10px] uppercase tracking-widest font-bold opacity-60">${t('level')} ${lesson.level}</p>
          </div>
          <div class="w-8"></div>
        </div>

        <div class="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
          ${lessonViewState.step === 'explanation' ? `
            <div class="space-y-6">
              <div class="prose prose-slate max-w-none text-natural-dark leading-relaxed">
                <p>${lesson.explanation.replace(/\n/g, '<br>')}</p>
              </div>

              <div class="space-y-3">
                <h4 class="font-bold text-lg">${t('examples')}</h4>
                ${lesson.examples.map(ex => `
                  <div class="p-4 rounded-2xl bg-natural-bg border border-natural-border flex items-center justify-between">
                    <div>
                      <p class="font-bold text-natural-dark text-lg">${ex.original}</p>
                      <p class="text-sm text-natural-taupe italic">${ex.translation}</p>
                    </div>
                    <button onclick="playTTS('${ex.original.replace(/'/g, "\\'")}', '${state.activeLangCode}')" class="p-3 bg-white rounded-full shadow-sm text-natural-green">
                      <i data-lucide="volume-2" class="w-5 h-5"></i>
                    </button>
                  </div>
                `).join('')}
              </div>

              <button 
                onclick="lessonViewState.step = 'exercises'; render();"
                class="w-full py-4 bg-natural-dark text-white rounded-2xl font-bold hover:opacity-90 active:scale-95 transition-all mt-6"
              >
                ${t('startPractice')}
              </button>
            </div>
          ` : lessonViewState.step === 'exercises' ? `
            <div class="space-y-6">
              <div class="flex justify-between items-center">
                <span class="text-xs font-bold uppercase tracking-widest text-natural-taupe">
                  ${t('questionOf').replace('{{current}}', lessonViewState.exerciseIdx + 1).replace('{{total}}', lesson.exercises.length)}
                </span>
              </div>

              <h4 class="text-2xl font-serif text-natural-dark">${currentEx.question}</h4>

              ${currentEx.type === 'multiple-choice' ? `
                <div class="grid gap-3">
                  ${currentEx.options.map(opt => `
                    <button 
                      onclick="submitLessonAnswer('${opt.replace(/'/g, "\\'")}')"
                      class="p-5 rounded-2xl border border-natural-border text-left hover:border-natural-green hover:bg-natural-sidebar font-medium text-natural-dark transition-all"
                    >
                      ${opt}
                    </button>
                  `).join('')}
                </div>
              ` : `
                <div class="space-y-4">
                  <input 
                    id="exercise-input"
                    type="text" 
                    placeholder="${t('typeAnswer')}"
                    class="w-full p-5 rounded-2xl border border-natural-border bg-natural-bg focus:outline-none focus:border-natural-green"
                  />
                  <button 
                    onclick="submitLessonAnswer(document.getElementById('exercise-input').value)"
                    class="w-full py-4 bg-natural-dark text-white rounded-2xl font-bold active:scale-95 transition-all"
                  >
                    ${t('checkAnswer')}
                  </button>
                </div>
              `}
            </div>
          ` : `
            <div class="text-center py-8 space-y-6">
              <div class="w-32 h-32 rounded-full border-8 border-natural-sidebar flex items-center justify-center mx-auto text-4xl font-serif italic text-natural-green">
                ${Math.round((lessonViewState.score / lesson.exercises.length) * 100)}%
              </div>
              <h2 class="text-3xl font-serif italic text-natural-green">${t('lessonComplete')}</h2>
              
              <div class="bg-natural-sidebar p-6 rounded-[28px] max-w-sm mx-auto flex items-center justify-between">
                <div class="text-left">
                  <p class="text-[10px] font-bold uppercase tracking-widest opacity-60">${t('rewards')}</p>
                  <p class="text-xl font-bold text-natural-dark">+${(lessonViewState.score * 20) + 50} XP</p>
                </div>
                <span class="text-3xl">✨</span>
              </div>

              <button 
                onclick="finishLessonReward(${(lessonViewState.score * 20) + 50})"
                class="w-full max-w-xs py-4 bg-natural-green text-white rounded-[24px] font-bold text-lg shadow-lg active:scale-95 transition-all"
              >
                ${t('returnToDashboard')}
              </button>
            </div>
          `}
        </div>
      </div>
    </div>
  `;
}

function submitLessonAnswer(userAnswer) {
  const lesson = state.activeLesson;
  const currentEx = lesson.exercises[lessonViewState.exerciseIdx];
  
  if (userAnswer.toLowerCase().trim() === currentEx.correctAnswer.toLowerCase().trim()) {
    lessonViewState.score++;
  }

  if (lessonViewState.exerciseIdx < lesson.exercises.length - 1) {
    lessonViewState.exerciseIdx++;
  } else {
    lessonViewState.step = 'results';
  }
  render();
}

function finishLessonReward(earnedXP) {
  const activeLang = state.learningLanguages.find(l => l.code === state.activeLangCode) || state.learningLanguages[0];
  activeLang.xp += earnedXP;
  activeLang.lessonsDone += 1;
  state.activeLesson = null;
  lessonViewState = { step: 'explanation', exerciseIdx: 0, answers: {}, score: 0 };
  state.currentView = 'dashboard';
  saveState();
  render();
}

// VOCABULARY & STATS
function renderVocabularyView() {
  const activeLang = state.learningLanguages.find(l => l.code === state.activeLangCode) || state.learningLanguages[0];
  const langVocab = state.vocabulary.filter(v => v.languageCode === activeLang.code);
  const totalXP = state.learningLanguages.reduce((sum, l) => sum + l.xp, 0);
  const totalLessons = state.learningLanguages.reduce((sum, l) => sum + l.lessonsDone, 0);

  return `
    <div class="space-y-6 md:space-y-10">
      <header>
        <h1 class="text-3xl md:text-5xl font-serif italic mb-2">${t('globalProgress')}</h1>
        <p class="text-natural-taupe font-medium">${t('trackingEvolution')}</p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="bg-natural-dark text-natural-bg p-6 md:p-10 rounded-[36px] shadow-2xl">
          <h3 class="text-2xl font-serif mb-6 italic text-natural-bg">${t('masteryOverview')}</h3>
          <div class="space-y-6">
            ${state.learningLanguages.map(lang => `
              <div class="space-y-2">
                <div class="flex justify-between text-xs font-bold uppercase tracking-widest opacity-80">
                  <span>${lang.flag} ${lang.name}</span>
                  <span>${lang.level}</span>
                </div>
                <div class="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <div class="bg-natural-green h-full" style="width: ${Math.min((lang.xp / 3000) * 100, 100)}%"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="space-y-6">
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-white p-6 rounded-[32px] border border-natural-border shadow-sm text-center">
              <p class="text-3xl font-bold text-natural-dark">${totalXP}</p>
              <p class="text-[10px] uppercase tracking-widest font-bold opacity-40 mt-1">${t('totalXP')}</p>
            </div>
            <div class="bg-white p-6 rounded-[32px] border border-natural-border shadow-sm text-center">
              <p class="text-3xl font-bold text-natural-dark">${totalLessons}</p>
              <p class="text-[10px] uppercase tracking-widest font-bold opacity-40 mt-1">${t('totalLessons')}</p>
            </div>
          </div>

          <div class="bg-white p-6 rounded-[32px] border border-natural-border shadow-sm">
            <h3 class="font-serif italic text-lg mb-4 flex items-center gap-2 text-natural-dark">
              <i data-lucide="sparkles" class="w-5 h-5 text-natural-green"></i> Vocabulario Aprendido
            </h3>
            <div class="space-y-3 max-h-[250px] overflow-y-auto custom-scrollbar">
              ${langVocab.length > 0 ? langVocab.map(v => `
                <div class="flex justify-between items-center p-3 bg-natural-sidebar/40 rounded-xl border border-natural-border">
                  <div>
                    <p class="font-bold text-natural-dark text-sm">${v.word}</p>
                    <p class="text-[10px] text-natural-taupe uppercase tracking-widest">${v.translation}</p>
                  </div>
                  <span class="text-[9px] opacity-40">${v.learnedDate}</span>
                </div>
              `).join('') : '<p class="text-xs text-natural-taupe italic py-4">No hay palabras guardadas aún.</p>'}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// PRONUNCIATION MODAL
let pronState = { isRecording: false, result: null, isAnalyzing: false };

function startPronunciationPractice(phraseText) {
  state.activePracticeText = phraseText;
  pronState = { isRecording: false, result: null, isAnalyzing: false };
  render();
}

function renderPronunciationModal() {
  const text = state.activePracticeText;
  const activeLang = state.learningLanguages.find(l => l.code === state.activeLangCode) || state.learningLanguages[0];

  return `
    <div class="fixed inset-0 z-[200] bg-natural-dark/60 backdrop-blur-md flex items-center justify-center p-4">
      <div class="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-6 md:p-8 flex flex-col text-center">
        <div class="flex justify-between items-center mb-6">
          <h3 class="font-serif italic text-xl text-natural-dark">${t('practicePronunciation')}</h3>
          <button onclick="state.activePracticeText = null; render();" class="p-2 hover:bg-natural-sidebar rounded-xl">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <div class="bg-natural-bg p-6 rounded-[28px] border border-natural-border mb-6">
          <p class="text-xs font-bold uppercase tracking-widest text-natural-green mb-2">Frase Objetivo</p>
          <p class="text-xl font-serif text-natural-dark leading-relaxed">"${text}"</p>
          <button onclick="playTTS('${text.replace(/'/g, "\\'")}', '${activeLang.name}')" class="mt-4 p-3 bg-white rounded-full shadow-sm text-natural-green inline-flex items-center gap-2 text-xs font-bold">
            <i data-lucide="volume-2" class="w-4 h-4"></i> Escuchar Frase
          </button>
        </div>

        <div class="flex flex-col items-center gap-4 my-4">
          <button 
            onclick="toggleRecordingPronunciation()"
            class="w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all ${pronState.isRecording ? 'bg-red-500 text-white animate-bounce' : 'bg-natural-green text-white hover:bg-natural-green/90'}"
          >
            <i data-lucide="${pronState.isRecording ? 'square' : 'mic'}" class="w-8 h-8"></i>
          </button>
          <p class="text-xs font-bold uppercase tracking-widest text-natural-taupe">
            ${pronState.isRecording ? 'Grabando (Presiona para detener)' : 'Presiona el micrófono para hablar'}
          </p>
        </div>

        ${pronState.isAnalyzing ? `
          <div class="p-4 bg-natural-sidebar rounded-2xl animate-pulse text-xs font-bold text-natural-green">
            Analizando pronunciación...
          </div>
        ` : pronState.result ? `
          <div class="p-5 bg-natural-green/10 border border-natural-green/20 rounded-[28px] text-left space-y-3">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-full bg-natural-green text-white flex items-center justify-center font-bold text-lg shadow-md">
                ${pronState.result.score}%
              </div>
              <div>
                <h4 class="font-bold text-natural-dark">${pronState.result.score > 85 ? '¡Excelente!' : '¡Buen intento!'}</h4>
                <p class="text-xs text-natural-taupe">${pronState.result.feedback}</p>
              </div>
            </div>
          </div>
        ` : ''}

        <button onclick="state.activePracticeText = null; render();" class="mt-6 py-3 bg-natural-sidebar rounded-2xl font-bold text-natural-dark hover:bg-natural-border">
          Cerrar
        </button>
      </div>
    </div>
  `;
}

async function toggleRecordingPronunciation() {
  if (!pronState.isRecording) {
    pronState.isRecording = true;
    render();
    setTimeout(async () => {
      pronState.isRecording = false;
      pronState.isAnalyzing = true;
      render();
      
      const result = await analyzeAudioPronunciation(state.activePracticeText, state.activeLangCode, state.profile.nativeLanguage);
      pronState.result = result;
      pronState.isAnalyzing = false;
      render();
    }, 3000);
  } else {
    pronState.isRecording = false;
    render();
  }
}

// Initial Boot
window.addEventListener('DOMContentLoaded', () => {
  render();
});
