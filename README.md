# LinguaFlow

LinguaFlow is a modern, AI-powered language learning platform designed to provide an immersive and personalized learning experience. By leveraging advanced AI models and cloud technology, LinguaFlow helps users master new languages through interactive conversation practice, personalized progress tracking, and smart vocabulary building.

## 🚀 Features

- **AI Tutor Chat**: Practice your conversational skills with an AI native speaker. Get real-time feedback and corrections.
- **Smart Vocabulary**: Automatically save new words and phrases encountered during practice sessions.
- **Dynamic Progress Tracking**: Track your XP, streaks, and lessons completed across multiple languages.
- **Placement Assessment**: Determine your language level (A1 to C2) through initial evaluation.
- **Seamless Authentication**: Secure sign-in using Google Authentication.
- **Real-time Persistence**: All your progress and vocabulary are synced in real-time using Firebase Firestore.

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Framer Motion.
- **Backend**: Node.js (Express) with Vite integration.
- **Database & Auth**: Google Firebase (Firestore & Authentication).
- **AI Engine**: Google Gemini API for intelligent conversation and feedback.

## 📦 Project Structure

- `src/`: Core React application logic and components.
- `server.ts`: Express backend serving as the API proxy and Vite middleware.
- `firestore.rules`: Security configuration for data protection.
- `firebase-blueprint.json`: Initial data structure definition.

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file based on `.env.example` and provide your API keys.

### Development

Run the development server:
```bash
npm run dev
```

### Build

Compile the application for production:
```bash
npm run build
```

## 📄 License

This project is licensed under the MIT License.

---
*Developed with a focus on intuitive user experience and pedagogical effectiveness.*
