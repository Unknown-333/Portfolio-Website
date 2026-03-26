import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Variants } from 'motion/react';
import { Github, Mail, Linkedin, ArrowUpRight, X, GraduationCap, Rocket, ChevronLeft, ChevronRight, Download, Database, BarChart3, MapPin, Activity, BookOpen } from 'lucide-react';
import InteractiveBackground from './components/InteractiveBackground';
import PortfolioEyes from './components/PortfolioEyes';

/* ─── Tech stack icon map (simpleicons CDN) ─── */
const TECH_ICONS: Record<string, { slug: string; color: string }> = {
  Python: { slug: 'python', color: '3776AB' },
  SQL: { slug: 'sqlite', color: '003B57' },
  dbt: { slug: 'dbt', color: 'FF694B' },
  'Apache Airflow': { slug: 'apacheairflow', color: '017CEE' },
  'Apache Kafka (KRaft)': { slug: 'apachekafka', color: '231F20' },
  PySpark: { slug: 'apachespark', color: 'E25A1C' },
  Git: { slug: 'git', color: 'F05032' },
  Docker: { slug: 'docker', color: '2496ED' },
  'GitHub Actions': { slug: 'githubactions', color: '2088FF' },
  'VS Code': { slug: 'visualstudiocode', color: '007ACC' },
  Make: { slug: 'cmake', color: '064F8C' },
  Kubernetes: { slug: 'kubernetes', color: '326CE5' },
  pandas: { slug: 'pandas', color: '150458' },
  NumPy: { slug: 'numpy', color: '013243' },
  Matplotlib: { slug: 'plotly', color: '3F4F75' },
  Seaborn: { slug: 'python', color: '4C72B0' },
  'scikit-learn': { slug: 'scikitlearn', color: 'F7931E' },
  TensorFlow: { slug: 'tensorflow', color: 'FF6F00' },
  pdfplumber: { slug: 'python', color: '3776AB' },
  psycopg2: { slug: 'postgresql', color: '4169E1' },
  'confluent-kafka': { slug: 'apachekafka', color: '231F20' },
  PostgreSQL: { slug: 'postgresql', color: '4169E1' },
  TimescaleDB: { slug: 'timescale', color: 'FDB515' },
  Metabase: { slug: 'metabase', color: '509EE3' },
  Grafana: { slug: 'grafana', color: 'F46800' },
};

const portfolioData = {
  name: "Aayush Paudel",
  roles: ["Data Engineer", "Data Analyst", "Data Scientist"],
  tagline: "Seeking Data Engineering and Analytics Internships — 2026",
  bio: "20-year-old CSIT student who builds real-time data pipelines, dimensional warehouses, and predictive models. Turning raw data into reliable, production-quality systems.",
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
    {
      name: "NEPSE Real-Time Streaming",
      desc: "Production-grade streaming pipeline for Nepal Stock Exchange tick data.",
      fullDesc: "A production-grade streaming pipeline ingesting Nepal Stock Exchange tick data via Apache Kafka (KRaft mode), processed with PySpark Structured Streaming, written to TimescaleDB, and visualised in real time via Grafana.",
      category: "Data Engineering" as const,
      stack: ["Python", "Apache Kafka", "PySpark", "TimescaleDB", "Grafana", "Docker"],
      impact: "Event-driven architecture for a real emerging-market stock exchange.",
      link: "https://github.com/Unknown-333/NEPSE-Real-Time-Streaming",
    },
    {
      name: "NEA Data Warehouse",
      desc: "End-to-end Kimball-style dimensional data warehouse for Nepal Electricity Authority.",
      fullDesc: "End-to-end data warehouse for Nepal Electricity Authority using a Kimball-style dimensional model. dbt handles staging, intermediate, and mart transformation layers; Metabase provides analytics dashboards.",
      category: "Data Engineering" as const,
      stack: ["Python", "dbt", "PostgreSQL", "Metabase", "SQL", "Docker"],
      impact: "Production-quality dimensional model following Kimball methodology.",
      link: "https://github.com/Unknown-333/nea-data-warehouse",
    },
    {
      name: "Premier League Prediction",
      desc: "ML pipeline predicting match outcomes using feature-engineered historical statistics.",
      fullDesc: "Machine learning pipeline predicting English Premier League match outcomes using feature-engineered historical statistics. Multiple classifiers trained and evaluated with cross-validation; best model selected by season-level accuracy.",
      category: "Data Science" as const,
      stack: ["Python", "Scikit-learn", "Pandas", "Matplotlib", "Seaborn"],
      impact: "Accuracy benchmarked against a bookmaker baseline.",
      link: "https://github.com/Unknown-333/Premier-League-Prediction-",
    },
    {
      name: "Diabetes & Ad Prediction",
      desc: "Two end-to-end classification projects with ensemble methods and feature analysis.",
      fullDesc: "Two end-to-end classification projects: Pima Indian Diabetes Dataset (ensemble methods, hyperparameter tuning, ROC analysis) and Ad Click Prediction (logistic regression, feature importance analysis).",
      category: "Data Science" as const,
      stack: ["Python", "Scikit-learn", "Pandas", "NumPy", "Seaborn", "Matplotlib"],
      impact: "Complete EDA, feature engineering, model training, and evaluation pipeline.",
      link: "https://github.com/Unknown-333/Data-Science-Projects",
    },
  ],
  skills: {
    Languages: ["Python", "SQL"],
    "Frameworks & Tools": ["dbt", "Apache Airflow", "Apache Kafka (KRaft)", "PySpark"],
    "Developer Tools": ["Git", "Docker", "GitHub Actions", "VS Code", "Make", "Kubernetes"],
    Libraries: ["pandas", "NumPy", "Matplotlib", "Seaborn", "scikit-learn", "TensorFlow", "pdfplumber", "psycopg2", "confluent-kafka"],
    "Databases & BI": ["PostgreSQL", "TimescaleDB", "Metabase", "Grafana"],
  },
  interests: "When I'm not coding, I spend my time reading non-fiction, psychology, and tech history. I'm always looking for ways to expand my perspective.",
} as const;

const EASE_OUT_QUART: [number, number, number, number] = [0.25, 1, 0.5, 1];

/* ─── Modal ─── */
const Modal = ({ isOpen, onClose, title, children, maxWidth = "max-w-2xl" }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode; maxWidth?: string }) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT_QUART }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0F0E1A]/50 md:bg-[#0F0E1A]/40 backdrop-blur-xl z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: EASE_OUT_QUART }}
            className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] ${maxWidth} max-h-[85vh] overflow-y-auto bg-white md:bg-white/95 backdrop-blur-2xl border border-[#e5e7eb] rounded-3xl p-5 md:p-8 z-50 shadow-[0_0_50px_rgba(0,0,0,0.15)] hide-scrollbar`}
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            <div className="flex justify-between items-center mb-6 sticky top-0 z-20 bg-white md:bg-white/90 backdrop-blur-md py-3 -mt-3 -mx-3 px-4 rounded-t-3xl border-b border-[#e5e7eb]/50">
              <h2 className="text-2xl md:text-3xl font-black text-[#111827]" style={{ fontFamily: 'var(--font-display)' }}>{title}</h2>
              <button onClick={onClose} className="p-2 bg-[#f0eef8] hover:bg-[#e5e7eb] rounded-full transition-colors">
                <X className="w-5 h-5 md:w-6 md:h-6 text-[#4b5563]" />
              </button>
            </div>
            <div className="text-[#4b5563] space-y-4">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/* ─── ScrollArrows ─── */
function ScrollArrows({ scrollRef }: { scrollRef: React.RefObject<HTMLDivElement | null> }) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, [scrollRef]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    return () => el.removeEventListener('scroll', updateScrollState);
  }, [scrollRef, updateScrollState]);

  const scroll = (direction: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: direction === 'left' ? -300 : 300, behavior: 'smooth' });
  };

  return (
    <>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: canScrollLeft ? 1 : 0 }}
        transition={{ duration: 0.2, ease: EASE_OUT_QUART }}
        onClick={(e) => { e.stopPropagation(); scroll('left'); }}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-[#e5e7eb] flex items-center justify-center hover:bg-white transition-colors shadow-md"
        style={{ pointerEvents: canScrollLeft ? 'auto' : 'none' }}
      >
        <ChevronLeft className="w-5 h-5 text-[#4b5563]" />
      </motion.button>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: canScrollRight ? 1 : 0 }}
        transition={{ duration: 0.2, ease: EASE_OUT_QUART }}
        onClick={(e) => { e.stopPropagation(); scroll('right'); }}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-[#e5e7eb] flex items-center justify-center hover:bg-white transition-colors shadow-md"
        style={{ pointerEvents: canScrollRight ? 'auto' : 'none' }}
      >
        <ChevronRight className="w-5 h-5 text-[#4b5563]" />
      </motion.button>
    </>
  );
}

/* ─── SpotlightCard — adds mouse-tracking radial glow ─── */
function SpotlightCard({ children, onClick, className, variants, isDraggable = true }: { children: React.ReactNode; onClick?: () => void; className: string; variants: any; isDraggable?: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, active: false });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (isMobile) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
  }, [isMobile]);

  const handlePointerLeave = useCallback(() => {
    setSpotlight(prev => ({ ...prev, active: false }));
  }, []);

  return (
    <motion.div
      ref={cardRef}
      variants={variants}
      drag={isDraggable && !isMobile}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      dragElastic={0.8}
      dragMomentum={false}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
      whileDrag={isDraggable && !isMobile ? { scale: 1.05, zIndex: 100, boxShadow: '0 20px 60px rgba(124,58,237,0.15)' } : undefined}
      whileTap={isMobile ? { scale: 0.97 } : undefined}
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={className}
      style={{ position: 'relative' }}
    >
      {/* Spotlight overlay - only on desktop */}
      {spotlight.active && !isMobile && (
        <div
          className="absolute inset-0 z-0 pointer-events-none rounded-3xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(350px circle at ${spotlight.x}px ${spotlight.y}px, rgba(124,58,237,0.06), rgba(6,182,212,0.03), transparent 70%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  );
}

/* ─── TechPill — icon + text with hover animation ─── */
function TechPill({ name }: { name: string }) {
  const icon = TECH_ICONS[name];
  const iconUrl = icon ? `https://cdn.simpleicons.org/${icon.slug}/${icon.color}` : null;

  return (
    <motion.div
      whileHover={{ scale: 1.1, backgroundColor: '#7c3aed', color: '#fff' }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f0eef8] border border-[#e5e7eb] rounded-full text-xs font-medium text-[#4b5563] cursor-default select-none hover:border-[#7c3aed] hover:text-white transition-colors"
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      {iconUrl && (
        <motion.img
          src={iconUrl}
          alt={name}
          className="w-3.5 h-3.5"
          whileHover={{ rotate: 15 }}
          transition={{ type: 'spring', stiffness: 300 }}
          loading="lazy"
          style={{ filter: 'brightness(0) saturate(0) opacity(0.6)' }}
          onMouseEnter={(e) => { (e.target as HTMLImageElement).style.filter = 'brightness(0) invert(1)'; }}
          onMouseLeave={(e) => { (e.target as HTMLImageElement).style.filter = 'brightness(0) saturate(0) opacity(0.6)'; }}
        />
      )}
      {name}
    </motion.div>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_QUART } }
};

/* ════════════════════════════════════════════════════════
                         APP
   ════════════════════════════════════════════════════════ */

export default function App() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % portfolioData.roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen p-4 md:p-8 flex items-center justify-center relative overflow-hidden font-sans text-[#111827]">
      {/* PASS 3: hide canvas on mobile — expensive & not essential on small screens */}
      <div className="hidden md:block">
        <InteractiveBackground />
      </div>
      {/* Mobile-only static gradient background */}
      <div className="fixed inset-0 z-0 md:hidden" style={{ background: 'var(--gradient-hero)' }} />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[600px] bg-gradient-to-br from-[#ff6b6b]/5 via-[#7c3aed]/3 to-[#06b6d4]/5 blur-[100px] pointer-events-none rounded-full z-0 hidden md:block" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.08, ease: EASE_OUT_QUART } }
        }}
        className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-4 auto-rows-auto md:auto-rows-[190px] gap-4 md:gap-4 relative z-10 grid-flow-dense"
      >

        {/* ─── Profile Box (2-col) ─── */}
        <SpotlightCard
          variants={itemVariants}
          onClick={() => setActiveModal('profile')}
          className="md:col-span-2 md:row-span-1 bg-white/80 backdrop-blur-xl rounded-3xl p-5 md:p-6 border border-[#e5e7eb] flex flex-col justify-between overflow-hidden shadow-sm group cursor-pointer hover:border-[#ff6b6b]/40 hover:shadow-lg transition-all z-10 hover:z-50 hover:-translate-y-0.5"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b6b]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
          <div className="flex justify-between items-start relative z-10">
            <div className="flex gap-3 md:gap-4 items-center">
              <div className="relative">
                <img src="/profile.jpg" alt="Aayush Paudel — Data Engineer" width={56} height={56} className="w-12 h-12 md:w-14 md:h-14 rounded-2xl object-cover border border-[#e5e7eb]" />
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 md:w-4 md:h-4 bg-green-500 rounded-full border-2 border-white" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#111827]" style={{ fontFamily: 'var(--font-display)' }}>{portfolioData.name}</h1>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs text-[#9ca3af] font-mono">[</span>
                  {/* PASS 1: position:relative container + absolute exiting span prevents layout shift during crossfade */}
                  <span className="relative inline-flex items-center" style={{ minWidth: '8em' }}>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={roleIndex}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8, position: 'absolute' as const }}
                        transition={{ duration: 0.3, ease: EASE_OUT_QUART }}
                        className="text-xs md:text-sm font-semibold text-[#7c3aed]"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        {portfolioData.roles[roleIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                  <span className="text-xs text-[#9ca3af] font-mono">]</span>
                </div>
              </div>
            </div>
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#f0eef8] flex items-center justify-center border border-[#e5e7eb] group-hover:bg-[#ff6b6b] group-hover:border-[#ff6b6b] transition-colors shrink-0">
              <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-[#9ca3af] group-hover:text-white transition-colors" />
            </div>
          </div>
          <div className="relative z-10 mt-2">
            <p className="text-xs md:text-sm text-[#4b5563] leading-relaxed line-clamp-2">{portfolioData.bio}</p>
          </div>
        </SpotlightCard>

        {/* ─── Tech Stack Box (1-col) — with icons ─── */}
        <SpotlightCard
          variants={itemVariants}
          onClick={() => setActiveModal('stack')}
          className="md:col-span-1 md:row-span-1 bg-white/80 backdrop-blur-xl rounded-3xl p-4 md:p-5 border border-[#e5e7eb] flex flex-col justify-between overflow-hidden shadow-sm cursor-pointer group hover:border-[#06b6d4]/40 hover:shadow-lg transition-all z-10 hover:z-50 hover:-translate-y-0.5"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#06b6d4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
          <div className="flex justify-between items-start relative z-10">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 md:w-6 md:h-6 text-[#9ca3af] group-hover:text-[#06b6d4] transition-colors" />
              <h2 className="text-lg md:text-xl font-black leading-none tracking-tight text-[#111827] group-hover:text-[#06b6d4] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>STACK</h2>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#9ca3af] group-hover:text-[#111827] transition-colors" />
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3 relative z-10">
            {['Python', 'Docker', 'dbt', 'PySpark', 'PostgreSQL'].map(item => {
              const icon = TECH_ICONS[item];
              return (
                <motion.div
                  key={item}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium bg-[#f0eef8] border border-[#e5e7eb] rounded-md text-[#4b5563] hover:bg-[#06b6d4] hover:text-white hover:border-[#06b6d4] transition-colors cursor-default"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {icon && <img src={`https://cdn.simpleicons.org/${icon.slug}/${icon.color}`} alt="" className="w-3 h-3 opacity-60" loading="lazy" />}
                  {item}
                </motion.div>
              );
            })}
            <motion.div whileHover={{ scale: 1.08 }} className="px-2 py-0.5 text-[10px] font-medium bg-[#e0f2fe] border border-[#06b6d4]/20 rounded-md text-[#06b6d4] cursor-default" style={{ fontFamily: 'var(--font-mono)' }}>+ more</motion.div>
          </div>
        </SpotlightCard>

        {/* ─── Connect Box (1-col) — consolidated links ─── */}
        <SpotlightCard
          variants={itemVariants}
          isDraggable={false}
          className="md:col-span-1 md:row-span-1 bg-white/80 backdrop-blur-xl rounded-3xl p-4 md:p-5 border border-[#e5e7eb] flex flex-col justify-between overflow-hidden shadow-sm z-10 hover:z-50 hover:shadow-lg hover:border-[#7c3aed]/30 transition-all"
        >
          <h2 className="text-lg md:text-xl font-black tracking-tight text-[#111827] relative z-10" style={{ fontFamily: 'var(--font-display)' }}>CONNECT</h2>
          <div className="grid grid-cols-2 gap-2 mt-3 relative z-10">
            {[
              { href: portfolioData.github, icon: Github, label: 'GitHub', hoverBg: '#111827', hoverText: 'white' },
              { href: portfolioData.linkedin, icon: Linkedin, label: 'LinkedIn', hoverBg: '#7c3aed', hoverText: 'white' },
              { href: `mailto:${portfolioData.email}`, icon: Mail, label: 'Email', hoverBg: '#ff6b6b', hoverText: 'white' },
              { href: '/cv/Aayush_Paudel_CV.pdf', icon: Download, label: 'CV', hoverBg: '#06b6d4', hoverText: 'white', download: true },
            ].map(({ href, icon: Icon, label, hoverBg, download }) => (
              <motion.a
                key={label}
                href={href}
                target={download ? undefined : '_blank'}
                rel={download ? undefined : 'noreferrer'}
                download={download ? 'Aayush_Paudel_CV.pdf' : undefined}
                whileHover={{ scale: 1.05, backgroundColor: hoverBg, color: '#fff' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="flex items-center justify-center gap-2 py-3 md:py-3.5 rounded-xl bg-[#f0eef8] border border-[#e5e7eb] text-[#4b5563] font-semibold text-xs cursor-pointer select-none"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </motion.a>
            ))}
          </div>
        </SpotlightCard>

        {/* ─── Projects Box (2-col, 2-row) ─── */}
        <SpotlightCard
          variants={itemVariants}
          onClick={() => setActiveModal('projects')}
          className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-[#fafaf7] to-[#f0eef8] backdrop-blur-xl rounded-3xl p-5 md:p-6 border border-[#e5e7eb] overflow-hidden group cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-[#ff6b6b]/30 transition-all z-10 hover:z-50 hover:-translate-y-0.5"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border border-[#e5e7eb]/30 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] border border-[#e5e7eb]/30 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
          </div>
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <Rocket className="w-8 h-8 md:w-10 md:h-10 text-[#ff6b6b] mb-3 md:mb-4 stroke-[1.5]" />
              <h2 className="text-4xl md:text-5xl font-black leading-none tracking-tight text-[#111827] mb-2" style={{ fontFamily: 'var(--font-display)' }}>PROJECTS</h2>
              <p className="text-xs md:text-sm font-medium text-[#9ca3af] mt-1">Data Engineering · Data Science</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#f0eef8] flex items-center justify-center group-hover:bg-[#ff6b6b] transition-colors shrink-0">
              <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-[#9ca3af] group-hover:text-white transition-colors" />
            </div>
          </div>
          <div className="relative z-10 flex justify-between items-end">
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 bg-[#e0f2fe] rounded-full text-xs md:text-sm font-bold text-[#06b6d4] border border-[#06b6d4]/20">4 Shipped</span>
              <span className="px-3 py-1 bg-[#fef3c7] rounded-full text-xs md:text-sm font-bold text-[#f59e0b] border border-[#f59e0b]/20">ML Models</span>
            </div>
            <PortfolioEyes size={28} className="opacity-60 group-hover:opacity-100 transition-opacity hidden sm:flex" />
          </div>
        </SpotlightCard>

        {/* ─── Data Pipeline Box (2-col) ─── */}
        <SpotlightCard
          variants={itemVariants}
          onClick={() => setActiveModal('pipeline')}
          className="md:col-span-2 md:row-span-1 bg-white/80 backdrop-blur-xl rounded-3xl p-5 md:p-6 border border-[#e5e7eb] flex flex-col justify-between overflow-hidden shadow-sm group cursor-pointer hover:border-[#06b6d4]/40 hover:shadow-lg transition-all z-10 hover:z-50 hover:-translate-y-0.5"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#06b6d4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#06b6d4]/5 blur-3xl rounded-full pointer-events-none group-hover:bg-[#06b6d4]/10 transition-colors duration-700 z-0" />
          <div className="relative z-10 flex justify-between items-start">
            <div className="flex items-center gap-3 md:gap-4">
              <BarChart3 className="w-8 h-8 md:w-10 md:h-10 text-[#06b6d4] stroke-[1.5]" />
              <h3 className="text-xl md:text-2xl font-black tracking-tight text-[#111827]" style={{ fontFamily: 'var(--font-display)' }}>DATA PIPELINES</h3>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#f0eef8] flex items-center justify-center group-hover:bg-[#06b6d4] transition-colors shrink-0">
              <ArrowUpRight className="w-4 h-4 text-[#9ca3af] group-hover:text-white transition-colors" />
            </div>
          </div>
          <div className="relative z-10 flex flex-col gap-2 md:gap-3 mt-3 md:mt-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <div className="bg-[#e0f2fe] border border-[#06b6d4]/20 rounded-xl p-2 md:p-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] animate-pulse" />
                <span className="text-[10px] md:text-xs font-semibold text-[#06b6d4] uppercase tracking-wider">Kafka Streams</span>
              </div>
              <div className="bg-[#f0eef8] border border-[#7c3aed]/10 rounded-xl p-2 md:p-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#7c3aed]" />
                <span className="text-[10px] md:text-xs font-semibold text-[#7c3aed] uppercase tracking-wider">dbt Models</span>
              </div>
              <div className="bg-[#fef3c7] border border-[#f59e0b]/20 rounded-xl p-2 md:p-3 hidden sm:flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
                <span className="text-[10px] md:text-xs font-semibold text-[#f59e0b] uppercase tracking-wider">ML Models</span>
              </div>
            </div>
            <p className="text-[10px] md:text-xs text-[#9ca3af] italic truncate">"Building reliable, production-quality data systems from ingestion to insight."</p>
          </div>
        </SpotlightCard>

        {/* ─── More / Availability Box (expanded to fill gap from removed education card) ─── */}
        <SpotlightCard
          variants={itemVariants}
          onClick={() => setActiveModal('interests')}
          className="md:col-span-2 md:row-span-1 bg-white/80 backdrop-blur-xl rounded-3xl p-5 border border-[#e5e7eb] flex flex-col justify-between overflow-hidden shadow-sm group cursor-pointer hover:border-[#f59e0b]/40 hover:shadow-lg transition-all z-10 hover:z-50 hover:-translate-y-0.5"
        >
          <div className="flex justify-between items-start relative z-10">
            <div>
              <h3 className="text-xl md:text-2xl font-black tracking-tight text-[#111827]" style={{ fontFamily: 'var(--font-display)' }}>ABOUT ME</h3>
              <p className="text-xs text-[#9ca3af] mt-1">BSc. CSIT · St. Xavier's College · Expected {portfolioData.education.graduation}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#fef3c7] border border-[#f59e0b]/20 flex items-center justify-center group-hover:bg-[#f59e0b] transition-colors shrink-0">
              <ArrowUpRight className="w-4 h-4 text-[#f59e0b] group-hover:text-white transition-colors" />
            </div>
          </div>
          <div className="relative z-10 flex items-center gap-4 md:gap-6 mt-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#4b5563]">Open to Opportunities</p>
                <p className="text-xs text-[#9ca3af]">Internships & Freelance</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs text-[#9ca3af]">
              <MapPin className="w-3.5 h-3.5" />
              <span>{portfolioData.location}</span>
            </div>
          </div>
        </SpotlightCard>

      </motion.div>

      {/* ═══════════════ Modals ═══════════════ */}

      {/* Profile Modal */}
      <Modal isOpen={activeModal === 'profile'} onClose={() => setActiveModal(null)} title="About Me">
        <div className="flex flex-col md:flex-row gap-5 md:gap-6 items-start">
          <img src="/profile.jpg" alt="Aayush Paudel — Data Engineer and CSIT Student" width={96} height={96} className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover border border-[#e5e7eb] shrink-0" loading="lazy" />
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-[#111827]" style={{ fontFamily: 'var(--font-display)' }}>{portfolioData.name}</h3>
            <p className="text-[#ff6b6b] font-medium mb-3 md:mb-4 text-sm">{portfolioData.tagline}</p>
            <p className="text-base md:text-lg leading-relaxed text-[#4b5563]">{portfolioData.bio}</p>
            <div className="mt-5 md:mt-6 flex items-center gap-2 text-[#4b5563] text-sm">
              <GraduationCap className="w-5 h-5 text-[#7c3aed]" />
              <span>{portfolioData.education.degree} @ {portfolioData.education.institution}</span>
            </div>
            <div className="mt-2 flex items-center gap-2 text-[#4b5563] text-sm">
              <MapPin className="w-5 h-5 text-[#06b6d4]" />
              <span>{portfolioData.location}</span>
            </div>
            <div className="mt-5 md:mt-6 flex flex-wrap gap-3">
              <a href="/cv/Aayush_Paudel_CV.pdf" download="Aayush_Paudel_CV.pdf" className="inline-flex items-center gap-2 px-4 md:px-5 py-2.5 bg-[#ff6b6b] text-white rounded-xl text-sm font-bold hover:bg-[#e85d5d] transition-colors">
                <Download className="w-4 h-4" /> Download CV
              </a>
              <a href={portfolioData.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 md:px-5 py-2.5 border border-[#e5e7eb] text-[#4b5563] rounded-xl text-sm font-bold hover:bg-[#f0eef8] transition-colors">
                <Github className="w-4 h-4" /> GitHub
              </a>
            </div>
          </div>
        </div>
      </Modal>

      {/* Stack Modal — with TechPill icons */}
      <Modal isOpen={activeModal === 'stack'} onClose={() => setActiveModal(null)} title="Tech Stack" maxWidth="max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(portfolioData.skills).map(([category, skills]) => (
            <div key={category} className="bg-[#fafaf7] border border-[#e5e7eb] p-5 md:p-6 rounded-2xl">
              <h4 className="text-xs font-black tracking-widest text-[#9ca3af] uppercase mb-3 md:mb-4" style={{ fontFamily: 'var(--font-mono)' }}>{category}</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((s: string) => (
                  <TechPill key={s} name={s} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Modal>

      {/* Pipeline Modal */}
      <Modal isOpen={activeModal === 'pipeline'} onClose={() => setActiveModal(null)} title="Data Pipeline Philosophy" maxWidth="max-w-3xl">
        <div className="space-y-5 md:space-y-6">
          <p className="text-base md:text-lg leading-relaxed text-[#4b5563]">
            I build data systems that are reliable, observable, and production-ready. From Apache Kafka ingestion to dbt transformation layers to Grafana dashboards — every pipeline follows engineering best practices.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#e0f2fe] border border-[#06b6d4]/20 p-5 md:p-6 rounded-2xl">
              <Database className="w-6 h-6 text-[#06b6d4] mb-3" />
              <h4 className="font-bold text-[#111827] mb-2">Streaming</h4>
              <p className="text-sm text-[#4b5563]">Real-time event processing with Kafka + PySpark Structured Streaming</p>
            </div>
            <div className="bg-[#f0eef8] border border-[#7c3aed]/20 p-5 md:p-6 rounded-2xl">
              <BarChart3 className="w-6 h-6 text-[#7c3aed] mb-3" />
              <h4 className="font-bold text-[#111827] mb-2">Warehousing</h4>
              <p className="text-sm text-[#4b5563]">Kimball dimensional models with dbt transformation layers</p>
            </div>
          </div>
        </div>
      </Modal>

      {/* Projects Modal — Accordion */}
      <Modal isOpen={activeModal === 'projects'} onClose={() => setActiveModal(null)} title="Projects" maxWidth="max-w-4xl">
        <div className="flex flex-col gap-2 pt-4 md:pt-6 pb-8 md:pb-12 w-full">
          {portfolioData.projects.map((project, i) => {
            const isExpanded = expandedProject === project.name;
            const isDE = project.category === 'Data Engineering';

            return (
              <div
                key={project.name}
                className={`overflow-hidden transition-all duration-500 rounded-2xl md:rounded-[2rem] border ${isExpanded ? 'bg-[#fafaf7] border-[#e5e7eb] my-3 md:my-4 shadow-lg' : 'bg-transparent border-transparent hover:bg-[#fafaf7]'}`}
              >
                <div
                  onClick={() => setExpandedProject(isExpanded ? null : project.name)}
                  className="flex items-center justify-between p-4 md:p-6 cursor-pointer select-none group"
                >
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="hidden sm:flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#f0eef8] text-[#9ca3af] text-xs font-bold font-mono group-hover:text-[#ff6b6b] group-hover:bg-[#ff6b6b]/10 transition-colors">
                      0{i + 1}
                    </div>
                    <div>
                      <h4 className={`font-black tracking-tight transition-all duration-500 ${isExpanded ? 'text-2xl md:text-4xl text-[#111827]' : 'text-lg md:text-2xl text-[#4b5563] group-hover:text-[#111827]'}`} style={{ fontFamily: 'var(--font-display)' }}>
                        {project.name}
                      </h4>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${isDE ? 'bg-[#e0f2fe] text-[#06b6d4]' : 'bg-[#fef3c7] text-[#f59e0b]'}`} style={{ fontFamily: 'var(--font-mono)' }}>
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#e5e7eb] flex items-center justify-center transition-all duration-500 shrink-0 ${isExpanded ? 'bg-[#ff6b6b] text-white border-[#ff6b6b] rotate-45' : 'bg-white text-[#9ca3af] group-hover:bg-[#f0eef8] group-hover:text-[#111827]'}`}>
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5, ease: EASE_OUT_QUART }}
                      className="px-4 md:px-6 pb-4 md:pb-6"
                    >
                      <div className="flex flex-col gap-3 md:gap-4 mt-2 mb-2">
                        <p className="text-sm md:text-base text-[#4b5563] leading-relaxed">{project.fullDesc}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.stack.map(tech => (
                            <span key={tech} className={`px-3 py-1 rounded-full text-xs font-medium ${isDE ? 'bg-[#e0f2fe] text-[#06b6d4] border border-[#06b6d4]/20' : 'bg-[#fef3c7] text-[#f59e0b] border border-[#f59e0b]/20'}`} style={{ fontFamily: 'var(--font-mono)' }}>
                              {tech}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs md:text-sm italic text-[#9ca3af]">{project.impact}</p>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-3 px-5 md:px-6 py-2.5 md:py-3 rounded-full bg-[#111827] border border-[#111827] hover:bg-[#ff6b6b] hover:border-[#ff6b6b] transition-all text-sm font-bold tracking-tight text-white w-fit"
                        >
                          View on GitHub
                          <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Modal>

      {/* Interests / About Modal */}
      <Modal isOpen={activeModal === 'interests'} onClose={() => setActiveModal(null)} title="About Me">
        <div className="space-y-5 md:space-y-6">
          <div className="bg-[#f0eef8] border border-[#7c3aed]/20 p-5 md:p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <GraduationCap className="w-5 h-5 text-[#7c3aed]" />
              <h4 className="font-bold text-[#111827]">Education</h4>
            </div>
            <p className="text-sm text-[#4b5563]">{portfolioData.education.degree} — {portfolioData.education.institution}</p>
            <p className="text-xs text-[#9ca3af] mt-1">Expected Graduation: {portfolioData.education.graduation}</p>
          </div>
          <div className="bg-[#fef3c7] border border-[#f59e0b]/20 p-5 md:p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <BookOpen className="w-5 h-5 text-[#f59e0b]" />
              <h4 className="font-bold text-[#111827]">Avid Reader</h4>
            </div>
            <p className="text-sm text-[#4b5563] leading-relaxed">{portfolioData.interests}</p>
          </div>
          <div className="bg-[#e0f2fe] border border-[#06b6d4]/20 p-5 md:p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
              </span>
              <h4 className="font-bold text-[#111827]">Open to Opportunities</h4>
            </div>
            <p className="text-sm text-[#4b5563]">I am actively seeking Data Engineering internships and freelance data projects. Based in Kathmandu and fully available for remote collaboration.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${portfolioData.email}`} className="inline-flex items-center gap-2 px-4 md:px-5 py-2.5 bg-[#ff6b6b] text-white rounded-xl text-sm font-bold hover:bg-[#e85d5d] transition-colors">
              <Mail className="w-4 h-4" /> Send an Email
            </a>
            <a href="/cv/Aayush_Paudel_CV.pdf" download="Aayush_Paudel_CV.pdf" className="inline-flex items-center gap-1.5 text-sm text-[#7c3aed] underline decoration-[#7c3aed]/30 underline-offset-4 hover:decoration-[#7c3aed] transition-colors">
              <Download className="w-4 h-4" /> Download Resume
            </a>
          </div>
        </div>
      </Modal>

    </div>
  );
}
