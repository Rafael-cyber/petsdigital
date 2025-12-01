# PetsDigital - Frontend (full)

This frontend is a Vite + React minimal full example pre-configured for Firebase Auth + Firestore.

## How to run locally

1. Install deps:
npm install

2. Start dev server:
npm run dev

3. Open http://localhost:5173

## Notes
- Firebase config is already set in `src/services/firebase.js` using the values you gave.
- Update allowed auth domains and Firestore rules in your Firebase console as needed.
- Vercel deploy uses `vercel.json` to rewrite routes to SPA.
