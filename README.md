# Aayush Paudel -- Personal Portfolio

A visually striking, performance-optimized personal portfolio featuring a modern bento-grid layout with the Bright Signal light-mode design system. Built for interactivity, smooth animations, and a flawless responsive experience across all devices.


## Features

- **Interactive Particle Network**: A dynamic canvas-based data-flow network where nodes drift organically, connections brighten near the cursor, and clicking spawns particle bursts that scatter like data packets.
- **Spotlight Bento Cards**: Mouse-tracking radial glow that follows the cursor inside glassmorphic cards, making the interface feel alive and tactile.
- **Draggable UI Elements**: Engaging draggable grid boxes with smart click-vs-drag detection powered by Framer Motion physics.
- **Icon-Enhanced Tech Stack**: Technology pills featuring brand logos from SimpleIcons with spring-animated hover effects -- scale, color shift, and icon rotation.
- **Portfolio Eyes**: Custom mouse-tracking animated eyes with violet iris that follow cursor movement using requestAnimationFrame.
- **Accordion Projects**: Smooth expand/collapse project details with height animation and staggered reveals.
- **Responsive Design**: Flawless experience across desktop, tablet, and mobile with touch-optimized interactions and no sticky hover artifacts.


## Quick Start

Clone the repository

```bash
git clone https://github.com/Unknown-333/Portfolio-Website.git
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Build for production

```bash
npm run build
```


## Tech Stack

| Layer      | Technology                                  |
|------------|---------------------------------------------|
| Framework  | React 19 / Vite 6                           |
| Language   | TypeScript 5.8                              |
| Styling    | Tailwind CSS v4 with custom @theme tokens   |
| Animations | Framer Motion v12 / Custom Canvas API       |
| Icons      | Lucide React / SimpleIcons CDN              |
| Fonts      | Syne, Plus Jakarta Sans, JetBrains Mono     |


## Design System -- Bright Signal

| Token      | Value     | Usage                        |
|------------|-----------|------------------------------|
| Background | #FAFAF7   | Warm off-white page backdrop |
| Card       | white/80  | Glassmorphic translucent     |
| Coral      | #FF6B6B   | Primary CTAs, active states  |
| Violet     | #7C3AED   | Secondary accent, role text  |
| Cyan       | #06B6D4   | Data Engineering markers     |
| Amber      | #F59E0B   | Data Science markers         |


## Project Structure

```
src/
  App.tsx                          -- Main application (bento grid, modals, data)
  index.css                        -- Bright Signal theme tokens and utilities
  main.tsx                         -- React 19 entry point
  components/
    InteractiveBackground.tsx      -- Canvas particle network with click-burst
    PortfolioEyes.tsx              -- Mouse-tracking animated eyes
```


## Deployment

Deploy to Vercel or any static host:

1. Import the repository
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`


## Credits

Structural architecture inspired by [AbhishekBarali/personal-website-japanese-themed](https://github.com/AbhishekBarali/personal-website-japanese-themed), re-designed with the Bright Signal light-mode aesthetic.


## Author

Aayush Paudel

- Data Engineering and Analytics
- BSc. CSIT, St. Xavier's College, Kathmandu
- [GitHub](https://github.com/Unknown-333) / [LinkedIn](https://www.linkedin.com/in/aayush-paudel-3076a228a/)
-Deployed at - https://portfolio-website-kappa-gules-31.vercel.app/