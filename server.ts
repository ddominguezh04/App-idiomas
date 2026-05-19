import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Gemini
const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API Routes
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history, language } = req.body;
    
    // Improved prompt for feedback
    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          role: "user",
          parts: [{ text: `You are a native ${language} tutor. Your goal is to help me practice ${language}. 
          The user's native language is ${req.body.nativeLanguage || 'English'}.
          Keep the conversation natural, engaging, and suitable for a language learner. 
          Respond in ${language}.
          CRITICAL: After your response in the target language, if the user made any grammatical or vocabulary mistakes in their last message, provide a brief, friendly correction in ${req.body.nativeLanguage || 'English'} starting with "Correction:". If they did well, you can occasionally say "Great job with your grammar!".
          Context: Casual conversation to practice the language.` }]
        },
        ...history,
        {
          role: "user",
          parts: [{ text: message }]
        }
      ]
    });

    res.json({ text: result.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Generate full lesson content
app.post("/api/lesson/generate", async (req, res) => {
  try {
    const { topic, language, level, nativeLanguage } = req.body;
    
    const prompt = `Generate a comprehensive language lesson for the topic: "${topic}" in ${language} for a ${level} learner.
    The user's native language is ${nativeLanguage || 'English'}.
    Include:
    1. A title.
    2. A clear grammar/vocabulary explanation in ${nativeLanguage || 'English'}.
    3. 5 examples in ${language} with ${nativeLanguage || 'English'} translations.
    4. 5 exercises of different types: multiple-choice, fill-gap, and translation.
    
    Return ONLY a JSON object with this exact structure:
    {
      "id": "generated_id",
      "title": "Lesson Title",
      "level": "${level}",
      "explanation": "Markdown explanation...",
      "examples": [{"original": "...", "translation": "..."}],
      "exercises": [
        {
          "id": "ex1",
          "type": "multiple-choice",
          "question": "...",
          "options": ["...", "...", "...", "..."],
          "correctAnswer": "...",
          "clue": "..."
        },
        {
          "id": "ex2",
          "type": "fill-gap",
          "question": "The sky is [___].",
          "correctAnswer": "blue",
          "clue": "..."
        }
      ]
    }`;

    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
      }
    });

    res.json(JSON.parse(result.text || '{}'));
  } catch (error: any) {
    console.error("Lesson Generation Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Generate Placement Test
app.post("/api/placement/generate", async (req, res) => {
  try {
    const { language, nativeLanguage } = req.body;
    
    const prompt = `Generate a language placement test for ${language} for a speaker of ${nativeLanguage}. 
    The test should have 10 questions of increasing difficulty, covering levels from A1 to C1.
    Return ONLY a JSON object with this structure:
    {
      "questions": [
        {
          "id": "q1",
          "level": "A1",
          "type": "multiple-choice",
          "question": "...",
          "options": ["...", "...", "...", "..."],
          "correctAnswer": "..."
        }
      ]
    }`;

    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
      }
    });

    res.json(JSON.parse(result.text || '{}'));
  } catch (error: any) {
    console.error("Placement Test Generation Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Pronunciation Analysis
app.post("/api/pronunciation/analyze", async (req, res) => {
  try {
    const { audio, text, language, nativeLanguage } = req.body;
    
    const result = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                mimeType: "audio/webm",
                data: audio // base64 string
              }
            },
            {
              text: `Evaluate the pronunciation of this audio in ${language}. 
              The expected text is: "${text}".
              The user's native language is ${nativeLanguage}.
              
              Provide a detailed analysis including:
              1. Accuracy score (0-100).
              2. Specific feedback on phonetic sounds they might be struggling with (like vowels, R's, etc.).
              3. Tips for improvement.
              4. A transcription of what you heard.
              
              CRITICAL: Respond in ${nativeLanguage} for the "feedback" and "tips" fields.
              
              Return ONLY a JSON object with this structure:
              {
                "score": number,
                "feedback": "...",
                "transcription": "...",
                "tips": ["Tip 1", "Tip 2"]
              }`
            }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
      }
    });

    res.json(JSON.parse(result.text || '{}'));
  } catch (error: any) {
    console.error("Pronunciation Analysis Error:", error);
    res.status(500).json({ error: error.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
