# Aayush Paudel — Portfolio Project Guidelines v4

> **Claude Agent Instructions**: You are building a production-grade personal portfolio for Aayush Paudel by **structurally cloning** the AbhishekBarali japanese-themed portfolio (`https://github.com/AbhishekBarali/personal-website-japanese-themed`) and re-skinning it with the "Bright Signal" design system — light-mode-first, vibrant, and attractive. The architecture, component names, layout logic, physics animations, and interaction patterns must be replicated as faithfully as possible. Only the visual theme changes: dark becomes bright, muted becomes vivid, Japanese aesthetic becomes bold and modern. Use Firecrawl (MCP) to crawl the reference repository and extract the exact component code before writing anything. Commit like a real human developer — small, logical commits across multiple days.

---

## 1. Owner and Identity

| Field               | Value                                                     |
| ------------------- | --------------------------------------------------------- |
| Name                | Aayush Paudel                                             |
| Age                 | 20                                                        |
| Education           | BSc. CSIT — St. Xavier's College, Maitighar, Kathmandu    |
| Expected Graduation | 2026                                                      |
| Location            | Kathmandu, Nepal                                          |
| Roles               | Data Engineer · Data Analyst · Data Scientist             |
| GitHub              | https://github.com/Unknown-333                            |
| LinkedIn            | https://www.linkedin.com/in/aayush-paudel-3076a228a/      |
| Email               | aayushpaudel09@gmail.com                                  |
| Tagline             | Seeking Data Engineering and Analytics Internships — 2026 |

---

## 2. Step Zero — Clone the Reference Before Writing Any Code (Mandatory)

Before creating a single file, complete the following research steps in order.

### 2a. Use Firecrawl (MCP) to crawl and extract the full source of the reference repository

Target URL: `https://github.com/AbhishekBarali/personal-website-japanese-themed`

Extract and save locally as reference documents:

- `src/App.tsx` — full file, all ~600 lines
- `src/components/InteractiveBackground.tsx` — full canvas silk ribbon implementation
- `src/components/PortfolioEyes.tsx` — full mouse-tracking eye implementation
- `src/index.css` — all CSS variables, `@theme` block, font declarations
- `package.json` — exact dependency list and versions
- `vite.config.ts` — plugin configuration and path aliases
- `tsconfig.json` — compiler options

If Firecrawl cannot access the repository directly, fetch the raw file URLs:

```
https://raw.githubusercontent.com/AbhishekBarali/personal-website-japanese-themed/main/src/App.tsx
https://raw.githubusercontent.com/AbhishekBarali/personal-website-japanese-themed/main/src/index.css
https://raw.githubusercontent.com/AbhishekBarali/personal-website-japanese-themed/main/package.json
https://raw.githubusercontent.com/AbhishekBarali/personal-website-japanese-themed/main/vite.config.ts
```

### 2b. Use Firecrawl to scrape each project repository README

```
https://github.com/Unknown-333/NEPSE-Real-Time-Streaming
https://github.com/Unknown-333/nea-data-warehouse
https://github.com/Unknown-333/Premier-League-Prediction-
https://github.com/Unknown-333/Data-Science-Projects
```

Extract: project description, technologies used, architecture details, and any notable outcomes.

### 2c. Document what you found

Before writing any code, output a brief summary of:

- The exact component names found in the reference repository
- The canvas animation technique used in `InteractiveBackground.tsx`
- The drag implementation pattern used for bento cards
- The `portfolioData` object structure
- Any other components not listed above

Only proceed to scaffolding after completing this step.

---

## 3. Architecture — Clone from Reference, Adapt for Aayush

The file structure, component names, and state management must mirror the reference repository exactly. Do not invent new component names or restructure the architecture.

### Technology Stack (match reference exactly)

- React 19, TypeScript — strict mode, ES2022 target, `bundler` module resolution
- Vite with `@tailwindcss/vite` plugin — port 3000, `--host 0.0.0.0`
- Tailwind CSS v4 — no `tailwind.config.js`
- Framer Motion v12 — `import { motion, AnimatePresence } from 'motion/react'`
- Lucide React — sole icon library
- Path alias: `@` points to the workspace root (configured in both `vite.config.ts` and `tsconfig.json`)

### File Structure (mirrors reference repository)

```
aayush-portfolio/
├── public/
│   ├── cv/
│   │   └── Aayush_Paudel_CV.pdf         (user-provided)
│   ├── favicon.ico
│   └── og-image.png
├── src/
│   ├── App.tsx                           (~600 lines — layout, portfolioData, state, inline components)
│   ├── index.css                         (@theme block, fonts, easing vars, grain overlay)
│   ├── main.tsx
│   └── components/
│       ├── InteractiveBackground.tsx     (canvas animation — adapted from reference)
│       ├── PortfolioEyes.tsx             (mouse-tracking eyes — adapted from reference)
│       └── ui/                           (empty placeholder, matches reference)
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

### Inline Components in App.tsx (match reference pattern exactly)

The following components are **defined inline inside App.tsx**, not as separate files — this is the reference repository's pattern and must be preserved:

- `Modal` — project detail overlay
- `DraggableBox` — wrapper for draggable bento cards
- `ScrollArrows` — horizontal scroll controls

### Application State (two useState hooks only, same as reference)

```typescript
const [activeModal, setActiveModal] = useState<string | null>(null);
// Add navScrolled for the Download CV visibility enhancement
const [navScrolled, setNavScrolled] = useState(false);
```

### Data Pattern (static const at top of App.tsx, same as reference)

```typescript
const portfolioData = {
  name: "Aayush Paudel",
  roles: ["Data Engineer", "Data Analyst", "Data Scientist"],
  tagline: "Seeking Data Engineering and Analytics Internships — 2026",
  education: {
    degree: "BSc. CSIT",
    institution: "St. Xavier's College, Maitighar",
    graduation: "2026",
  },
  location: "Kathmandu, Nepal",
  email: "aayushpaudel09@gmail.com",
  github: "https://github.com/Unknown-333",
  linkedin: "https://www.linkedin.com/in/aayush-paudel-3076a228a/",
  projects: [
    /* see Section 6 */
  ],
  skills: {
    /* see Section 7 */
  },
} as const;
```

---

## 4. Design System — "Bright Signal" Applied to the Reference Layout

The reference site uses a dark aesthetic (`#08070e` base, muted accents, Japanese minimalism). Every dark color token is replaced with a bright, vibrant equivalent. The layout, grid structure, component boundaries, and interaction patterns remain identical.

### Color Replacement Map

| Reference Token (Dark) | Aayush Token (Bright Signal) | Usage                              |
| ---------------------- | ---------------------------- | ---------------------------------- |
| `#08070e` base bg      | `#FAFAF7` warm off-white     | Page background                    |
| `#0f0e1a` card bg      | `#FFFFFF` pure white         | Card backgrounds                   |
| `#161525` elevated bg  | `#F0EEF8` soft lavender      | Elevated sections, skills bg       |
| `#1e1d2e` border       | `#E5E7EB` light gray         | Card and section borders           |
| Dark muted accent      | `#FF6B6B` coral red          | Primary CTAs, active states, name  |
| Secondary muted        | `#7C3AED` vivid violet       | Secondary accent, hover states     |
| Tertiary accent        | `#06B6D4` bright cyan        | Data Engineering tags, canvas      |
| Warm accent            | `#F59E0B` amber              | Data Science tags                  |
| `#e2e8f0` primary text | `#111827` near-black         | All body text                      |
| `#64748b` muted text   | `#4B5563` medium gray        | Descriptions, subtext              |
| `#334155` faint text   | `#9CA3AF` light gray         | Captions, timestamps               |
| Dark overlay / footer  | `#0F0E1A` near-black         | Footer, code blocks, modal overlay |

### Full CSS Theme Block (src/index.css)

```css
@theme {
  /* Backgrounds */
  --color-bg: #fafaf7;
  --color-bg-card: #ffffff;
  --color-bg-elevated: #f0eef8;
  --color-bg-dark: #0f0e1a;

  /* Accent palette */
  --color-accent: #ff6b6b;
  --color-accent-2: #7c3aed;
  --color-accent-3: #06b6d4;
  --color-accent-4: #f59e0b;

  /* Text */
  --color-text-primary: #111827;
  --color-text-secondary: #4b5563;
  --color-text-muted: #9ca3af;
  --color-text-on-dark: #f9fafb;

  /* Borders */
  --color-border: #e5e7eb;
  --color-border-accent: #ff6b6b;

  /* Gradients */
  --gradient-hero: linear-gradient(
    135deg,
    #fafaf7 0%,
    #f0eef8 50%,
    #e0f2fe 100%
  );
  --gradient-accent: linear-gradient(135deg, #ff6b6b, #7c3aed);
  --gradient-data: linear-gradient(135deg, #06b6d4, #7c3aed);

  /* Fonts — replacing reference fonts */
  --font-display: "Syne", sans-serif;
  --font-body: "Plus Jakarta Sans", sans-serif;
  --font-mono: "JetBrains Mono", monospace;

  /* Easing — identical to reference */
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
}
```

Do not use Inter, Roboto, Space Grotesk, Arial, or system fonts.

### Shared Easing Constant (identical to reference)

```typescript
export const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;
```

### Grain Texture Overlay (identical opacity to reference, applied to light bg)

```css
body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.025; /* same as reference — barely perceptible */
  background-image: url("data:image/svg+xml,...");
}
```

### Animation Pattern (identical to reference)

- Stagger entry: parent `variants` with `staggerChildren: 0.08`, children use `itemVariants` (fade-up from `y: 20` to `y: 0`)
- `prefers-reduced-motion` kills all animations — same guard as reference
- `AnimatePresence` wraps all modal and cycling text transitions

---

## 5. InteractiveBackground.tsx — Adapted Canvas Animation

The reference uses a silk ribbon canvas effect. For Aayush's data engineering identity, adapt the animation to a **data-flow network**: floating nodes connected by edges, evoking a streaming pipeline. The implementation structure (canvas ref, resize handler, animation loop, cleanup) must follow the reference exactly.

### Adaptation Specification

- Replace dark background draw calls with transparent (the page bg shows through)
- Replace muted ribbon/stroke color with `rgba(6, 182, 212, 0.5)` (cyan) for edges
- Replace node/point color with `rgba(124, 58, 237, 0.7)` (violet) for nodes
- Retain the mouse interaction physics (repulsion or attraction) from the reference
- Retain the `useRef` + `useCallback` + `useEffect` cleanup pattern exactly
- Retain the `prefers-reduced-motion` guard

---

## 6. PortfolioEyes.tsx — Adapted Mouse-Tracking Eyes

Clone the reference `PortfolioEyes` component exactly. Apply the following visual changes only:

- Replace the dark iris/pupil color with `#7C3AED` (vivid violet)
- Replace the eye white background with `#FFFFFF` with a `#E5E7EB` border
- All mouse tracking math, DOM refs, and event listener cleanup — identical to reference

---

## 7. App.tsx — Full Layout (Mirrors Reference Structure)

The layout order in `App.tsx` must match the reference exactly. Adapt content, replace color tokens, keep structure.

### Section Order (same as reference)

```
<Navbar />
<Hero />           (with InteractiveBackground and PortfolioEyes)
<BentoGrid />      (About section — draggable cards)
<Projects />       (horizontal scroll or grid with ScrollArrows)
<Skills />         (categorized tag grid)
<Contact />        (links + footer)
```

### Navbar

- Fixed top — `bg-[#FAFAF7]/90` with `backdrop-blur-md` and `border-b border-[#E5E7EB]`
- Left: `AP` monogram, coral gradient fill on a white rounded badge
- Right navigation links: About, Projects, Skills, Contact — active link gets coral color and bold weight via `IntersectionObserver` scroll-spy
- Far right icons: GitHub (lucide), LinkedIn (lucide), and a small outlined coral "Download CV" button
- Mobile drawer: hamburger opens a full-width slide-down panel; lucide X closes it

### Hero Section

- `min-h-screen` with `--gradient-hero` background
- Left column (text):

  ```
  Greeting (JetBrains Mono, violet):
    "Hello, I'm"

  Name (Syne, 72px, black weight):
    "Aayush" plain + "Paudel" in coral-to-violet gradient

  Role cycling text (JetBrains Mono, AnimatePresence crossfade every 2.5s):
    "Data Engineer"  →  "Data Analyst"  →  "Data Scientist"

  Bio (Plus Jakarta Sans, 18px, secondary text color):
    "BSc. CSIT student at St. Xavier's College, Kathmandu.
     I design and build real-time data pipelines, dimensional
     warehouses, and predictive models. Open to internships for 2026."

  Buttons:
    View Projects    (coral fill, primary)
    Download CV      (violet outline, downloads /cv/Aayush_Paudel_CV.pdf)

  Icon links:
    GitHub icon   LinkedIn icon   (lucide, secondary text color)
  ```

- Right column: `<InteractiveBackground />` canvas, full height of hero
- Center bottom: `PortfolioEyes` component — eyes follow cursor
- Bottom center: bouncing `ChevronDown` (lucide) scroll indicator

### Bento Grid — About Section

This is the core structural element cloned directly from the reference. The `DraggableBox` component wraps each card.

**Grid specification:**

- `grid-cols-1 md:grid-cols-4`
- `auto-rows-[190px]`
- `grid-flow-dense`
- `gap-4`

**Card inventory (same card count and span pattern as reference, content replaced):**

| Card            | Span                          | Content                                                                                                |
| --------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------ |
| Bio             | `md:col-span-2 md:row-span-1` | Name, role label, 2-sentence bio. White card, coral left border accent.                                |
| Education       | `md:col-span-1 md:row-span-1` | BSc. CSIT, St. Xavier's College, Maitighar. Expected 2026. Violet accent.                              |
| Location        | `md:col-span-1 md:row-span-1` | Kathmandu, Nepal. Available remotely. Cyan world-pin icon.                                             |
| GitHub Activity | `md:col-span-2 md:row-span-1` | Live github-readme-stats embed for `Unknown-333`. White card.                                          |
| Availability    | `md:col-span-1 md:row-span-1` | Pulsing green dot. "Open to internships and freelance projects."                                       |
| Interests       | `md:col-span-1 md:row-span-1` | "I predict Premier League outcomes with machine learning. The model beats my intuition." Amber accent. |

**DraggableBox implementation:**

- Framer Motion `drag` with `dragConstraints` ref pointing to grid container
- `whileDrag={{ scale: 1.02, zIndex: 50 }}`
- `dragElastic: 0.1`
- Snap back to origin on release via `dragMomentum: false`
- Cursor changes to `grab` on hover, `grabbing` while dragging

**Card styling (bright version of reference dark cards):**

- Background: `bg-white`
- Border: `border border-[#E5E7EB]`
- Border radius: `rounded-2xl`
- Shadow: `shadow-sm hover:shadow-md transition-shadow`
- Padding: `p-5`
- On hover: `border-[#FF6B6B]` border color transition

### Projects Section

Clone the reference `ScrollArrows` pattern if the reference uses horizontal scroll for projects. If the reference uses a grid, match that. Either way, use the same `ScrollArrows` inline component from App.tsx.

**Four project cards — two Data Engineering (cyan category), two Data Science (amber category):**

**NEPSE Real-Time Streaming** — Data Engineering
A production-grade streaming pipeline ingesting Nepal Stock Exchange tick data via Apache Kafka (KRaft mode), processed with PySpark Structured Streaming, written to TimescaleDB, and visualised in real time via Grafana.
Stack: Python, Apache Kafka (KRaft), PySpark, TimescaleDB, Grafana, Docker
Impact: Event-driven architecture for a real emerging-market stock exchange.

**NEA Data Warehouse** — Data Engineering
End-to-end data warehouse for Nepal Electricity Authority using a Kimball-style dimensional model. dbt handles staging, intermediate, and mart transformation layers; Metabase provides analytics dashboards.
Stack: Python, dbt, PostgreSQL, Metabase, SQL, Docker
Impact: Production-quality dimensional model following Kimball methodology.

**Premier League Prediction** — Data Science
Machine learning pipeline predicting English Premier League match outcomes using feature-engineered historical statistics. Multiple classifiers trained and evaluated with cross-validation; best model selected by season-level accuracy.
Stack: Python, Scikit-learn, Pandas, Matplotlib, Seaborn
Impact: Accuracy benchmarked against a bookmaker baseline.

**Data Science Projects — Diabetes and Ad Prediction** — Data Science
Two end-to-end classification projects: Pima Indian Diabetes Dataset (ensemble methods, hyperparameter tuning, ROC analysis) and Ad Click Prediction (logistic regression, feature importance analysis).
Stack: Python, Scikit-learn, Pandas, NumPy, Seaborn, Matplotlib
Impact: Complete EDA, feature engineering, model training, and evaluation pipeline.

**Each project card includes:**

- Category badge pill (cyan for DE, amber for DS)
- Project title in display font
- Two-sentence description
- Tech stack pills in JetBrains Mono
- One-line impact statement
- GitHub icon link (lucide ExternalLink)
- "View Details" button — opens `Modal` inline component in App.tsx

**Modal (inline in App.tsx, AnimatePresence):**

- Full-screen overlay, `backdrop-blur-sm`, `bg-[#0F0E1A]/70`
- Slides up on open, fades out on close
- Closes on backdrop click or Escape key
- Focus trap while open, `aria-modal="true"`
- Contents: full description, complete tech stack, architecture note, GitHub CTA button

### Skills Section

Five category cards in a responsive grid. Plain text pills only — no bars, no percentages, no ratings.

**Stagger animation (identical to reference pattern):**

- Parent: `variants` with `staggerChildren: 0.08`
- Children: `itemVariants` — fade up from `y: 20, opacity: 0` to `y: 0, opacity: 1`

**Categories:**

```
Languages
  Python   SQL

Frameworks and Tools
  dbt   Apache Airflow   Apache Kafka (KRaft)   PySpark (Structured Streaming)

Developer Tools
  Git   Docker   GitHub Actions (CI/CD)   Visual Studio Code   Make   Kubernetes

Libraries
  pandas   NumPy   Matplotlib   Seaborn   pdfplumber   psycopg2
  PySpark SQL   confluent-kafka   scikit-learn   TensorFlow

Databases and BI
  PostgreSQL   TimescaleDB   Metabase   Grafana
```

**Tag pill styling:**

- Background: `bg-[#F0EEF8]` (lavender) default; `bg-[#7C3AED]` text-white on hover
- Font: JetBrains Mono, small
- Border radius: `rounded-full`
- Transition: `transition-all duration-200`

### Contact Section and Footer

- Gradient heading in Syne display font: "Let's Work Together"
- Supporting text in Plus Jakarta Sans: "I am actively seeking Data Engineering internships and freelance data projects. Based in Kathmandu and fully available for remote collaboration."
- Three contact cards (white, bordered, hover lift and coral glow):
  - Email — `aayushpaudel09@gmail.com` as `mailto:` link
  - LinkedIn — `linkedin.com/in/aayush-paudel-3076a228a`
  - GitHub — `github.com/Unknown-333`
- Primary CTA button: "Send an Email" — coral fill
- Secondary text link: "You can also download my resume directly." — links to `/cv/Aayush_Paudel_CV.pdf`
- Footer (dark `#0F0E1A` background):
  ```
  © 2025 Aayush Paudel  ·  Kathmandu, Nepal
  ```

---

## 8. CV Integration — Three Placements Required

The CV file is placed at `public/cv/Aayush_Paudel_CV.pdf`. Buttons render regardless of whether the file exists yet.

```html
<a href="/cv/Aayush_Paudel_CV.pdf" download="Aayush_Paudel_CV.pdf">
  Download CV
</a>
```

**Placement 1 — Navbar:** small outlined coral button, always visible, far right of nav  
**Placement 2 — Hero:** violet outlined button beside "View Projects" CTA  
**Placement 3 — Contact section:** plain text link below the email CTA button

---

## 9. Performance and Accessibility

- `prefers-reduced-motion` disables all Framer Motion animations and halts the canvas loop — identical guard to reference
- All images: `loading="lazy"`, descriptive `alt` text
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section id="...">`, `<footer>`
- Modal focus trap: focus locked inside modal on open, Escape closes, `aria-modal="true"`
- All body text: contrast ratio 4.5:1 or above (WCAG AA)
- Fonts preloaded in `<head>` via `<link rel="preload">`
- Open Graph meta tags in `index.html` for social sharing
- `lang="en"` on `<html>`

**Lighthouse targets:** Performance 90+, Accessibility 95+, Best Practices 90+

---

## 10. Build and Deployment

```bash
# Match reference exactly
npm run dev       # vite --port=3000 --host=0.0.0.0
npm run build     # vite build
npm run preview   # vite preview
npm run clean     # rm -rf dist
npm run lint      # tsc --noEmit
```

**Vercel deployment:**

1. Push repository to GitHub
2. Import project at vercel.com
3. Framework preset: Vite
4. Build command: `npm run build`
5. Output directory: `dist`
6. No environment variables required

Recommended custom domain: `aayushpaudel.com`

---

## 11. Human-Style Git Commit Strategy

Do not commit everything at once. Follow this exact sequence, one commit at a time, maximum 80–150 lines per commit.

```bash
# Day 1 — Research and scaffolding
git commit -m "init: scaffold vite react ts project from reference"
git commit -m "chore: install motion, lucide, tailwind deps"
git commit -m "chore: configure vite aliases and tsconfig paths"
git commit -m "style: add google fonts — syne, plus jakarta sans, jetbrains mono"
git commit -m "style: define bright signal color tokens and easing vars"
git commit -m "style: grain texture, scrollbar, and global typography"

# Day 2 — Core shared components
git commit -m "feat: interactive background canvas — data flow network"
git commit -m "feat: portfolio eyes mouse tracking component"
git commit -m "feat: draggable box wrapper component"
git commit -m "feat: scroll arrows inline component"

# Day 3 — Navigation and Hero
git commit -m "feat: navbar with scroll spy and mobile drawer"
git commit -m "feat: cv download button in navbar"
git commit -m "feat: hero section layout and cycling role text"
git commit -m "feat: hero cta buttons and icon links"
git commit -m "feat: portfolio eyes positioned in hero"

# Day 4 — Bento Grid and Skills
git commit -m "feat: bento grid layout with grid-flow-dense"
git commit -m "feat: bio and education bento cards"
git commit -m "feat: github stats and availability cards"
git commit -m "feat: draggable bento cards via framer motion"
git commit -m "feat: skills section with staggered pill animation"

# Day 5 — Projects
git commit -m "feat: project cards grid with category badges"
git commit -m "content: nepse streaming and nea warehouse project data"
git commit -m "content: premier league and data science project data"
git commit -m "feat: project detail modal with animatepresence"
git commit -m "feat: modal focus trap and keyboard close handler"

# Day 6 — Contact and Polish
git commit -m "feat: contact section and footer"
git commit -m "feat: back to top button with scroll trigger"
git commit -m "style: mobile responsive layout 375px and 768px"
git commit -m "perf: prefers-reduced-motion guards on all animations"
git commit -m "fix: scroll spy intersection thresholds"
git commit -m "chore: og-image, favicon, and meta tags"
git commit -m "docs: readme with setup and deploy instructions"
```

**Rules:**

- Lowercase conventional prefix: `feat:`, `fix:`, `style:`, `chore:`, `content:`, `perf:`, `docs:`
- Message 72 characters or fewer
- Push in batches of 3–4, not all at once
- Never commit `node_modules`, `.env`, or `dist/`

---

## 12. Quality Checklist

### Structure (must match reference)

- [ ] `App.tsx` is approximately 600 lines and contains `portfolioData`, all state, and `Modal`, `DraggableBox`, `ScrollArrows` as inline components
- [ ] `InteractiveBackground.tsx` uses HTML5 Canvas with a `useRef` + `useCallback` + `useEffect` cleanup pattern
- [ ] `PortfolioEyes.tsx` tracks mouse cursor and moves irises accordingly
- [ ] `src/components/ui/` directory exists as empty placeholder
- [ ] No router — all navigation is scroll-based

### Content

- [ ] All four projects present with accurate descriptions
- [ ] CV download button in navbar, hero, and contact section
- [ ] Education shows St. Xavier's College, BSc. CSIT, Expected 2026
- [ ] Email is a working `mailto:` link to `aayushpaudel09@gmail.com`
- [ ] Footer shows exactly: `2025 Aayush Paudel  ·  Kathmandu, Nepal`

### Design

- [ ] Page background is `#FAFAF7`, not dark
- [ ] Cards are white with light borders, not dark
- [ ] Coral `#FF6B6B` used for primary CTAs and active nav
- [ ] Violet `#7C3AED` used for secondary accents and headings
- [ ] Cyan `#06B6D4` used for Data Engineering tags and canvas particles
- [ ] Amber `#F59E0B` used for Data Science tags
- [ ] Fonts: Syne (headings), Plus Jakarta Sans (body), JetBrains Mono (code and tags)
- [ ] Zero skill progress bars, percentages, or ratings in Skills section
- [ ] Canvas animation is bright and visible against the light background

### Functionality

- [ ] Bento cards are draggable via Framer Motion
- [ ] Eyes follow the cursor correctly
- [ ] Project modal opens and closes with animation; Escape and backdrop click work
- [ ] Role text cycles in hero with AnimatePresence crossfade
- [ ] Navbar scroll-spy highlights the correct section while scrolling

### Technical

- [ ] `npm run lint` exits with zero TypeScript errors
- [ ] `npm run build` completes without warnings
- [ ] Mobile layout is correct at 375px and 768px
- [ ] Lighthouse Performance 90+, Accessibility 95+
- [ ] Git log contains 25+ commits following the human-style sequence

---

_End of guidelines. The goal is a faithful structural clone of the reference, transformed into a bright, vivid, and professionally attractive portfolio that Aayush Paudel will be proud to share with every recruiter he meets._
