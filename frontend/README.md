# TCS AI Friday - Frontend

Next.js 14.2.29 + React 18 + TypeScript frontend for TCS AI Friday Logistics System.

## Features

- ✅ Route Optimizer Dashboard
- ✅ Customer Support Chatbot
- ✅ Three-Panel Code Quality Viewer
- ✅ Dark/Light Theme Toggle
- ✅ Responsive Design
- ✅ WebSocket Integration
- ✅ Zustand State Management

## Setup

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

## Project Structure

```
src/
├── app/
│   ├── page.tsx (Home)
│   ├── logistics/page.tsx (Route Optimizer)
│   ├── chatbot/page.tsx (Chatbot)
│   └── code-analysis/page.tsx (Code Quality)
├── components/
│   ├── Navbar.tsx
│   ├── CodePanel.tsx
│   ├── DiffViewer.tsx
│   ├── CodeAnalyzer.tsx
│   └── CardSpinner.tsx
├── hooks/
│   └── useTheme.ts
├── stores/
│   └── appStore.ts
└── utils/
    └── api.ts
```
