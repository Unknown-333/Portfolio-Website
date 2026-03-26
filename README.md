# Aayush Paudel — Portfolio

A modern, bento-grid portfolio built with React 19, Vite, Tailwind CSS v4, and Framer Motion.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0050?logo=framer&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)

---

## ✨ Features

- **Bento Grid Layout** — 4-column dense grid with draggable cards (Framer Motion `drag`)
- **Glassmorphic Cards** — translucent white cards with backdrop blur and subtle borders
- **Animated Modals** — full-screen overlays with AnimatePresence, Escape/backdrop close, focus trap
- **Cycling Role Text** — crossfade animation between Data Engineer → Analyst → Scientist
- **PortfolioEyes** — mouse-tracking animated eyes with violet iris
- **Interactive Background** — organic CSS blobs with lavender, cyan, and amber tints
- **Accordion Projects** — expand/collapse project details with smooth height animation
- **Responsive** — mobile-first with performance optimizations (backdrop-blur disabled on phones)
- **Accessible** — `prefers-reduced-motion` guard, semantic HTML, WCAG AA contrast

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19, TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Animation | Framer Motion v12 (`motion/react`) |
| Icons | Lucide React |
| Fonts | Syne · Plus Jakarta Sans · JetBrains Mono |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server (port 3000)
npm run dev

# Type check
npm run lint

# Production build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
├── public/
│   ├── profile.jpg              # Profile photo
│   └── cv/
│       └── Aayush_Paudel_CV.pdf # Downloadable CV
├── src/
│   ├── App.tsx                  # Main app (~628 lines — layout, data, modals)
│   ├── index.css                # Bright Signal theme tokens
│   ├── main.tsx                 # Entry point
│   └── components/
│       ├── InteractiveBackground.tsx  # Animated CSS blob background
│       └── PortfolioEyes.tsx          # Mouse-tracking eyes
├── index.html
├── vite.config.ts
└── tsconfig.json
```

## 🎨 Design System — Bright Signal

| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#FAFAF7` | Page background |
| Card | `white/80` | Glassmorphic cards |
| Coral | `#FF6B6B` | Primary CTAs, active states |
| Violet | `#7C3AED` | Secondary accent, role text |
| Cyan | `#06B6D4` | Data Engineering tags |
| Amber | `#F59E0B` | Data Science tags |



---

**Built by [Aayush Paudel](https://github.com/Unknown-333)** · Kathmandu, Nepal
