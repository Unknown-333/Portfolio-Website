import { useRef, useEffect, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
  isBurst: boolean;
}

const COLORS = [
  'rgba(124, 58, 237,',   // violet
  'rgba(6, 182, 212,',    // cyan
  'rgba(255, 107, 107,',  // coral
  'rgba(245, 158, 11,',   // amber
];

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef(0);

  const createNode = useCallback((canvas: HTMLCanvasElement, isBurst = false, bx = 0, by = 0): Particle => {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    if (isBurst) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 3;
      return {
        x: bx, y: by,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 2 + Math.random() * 3,
        color, alpha: 1, life: 0,
        maxLife: 40 + Math.random() * 40,
        isBurst: true,
      };
    }
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: 2 + Math.random() * 2.5,
      color, alpha: 0.5 + Math.random() * 0.3,
      life: 0, maxLife: Infinity,
      isBurst: false,
    };
  }, []);

  const spawnBurst = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const count = 6 + Math.floor(Math.random() * 5);
    for (let i = 0; i < count; i++) {
      particlesRef.current.push(createNode(canvas, true, x, y));
    }
  }, [createNode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resize();

    // Seed particles
    const isMobile = window.innerWidth < 768;
    const nodeCount = isMobile ? 30 : 60;
    particlesRef.current = [];
    for (let i = 0; i < nodeCount; i++) {
      // Create with logical (CSS) dimensions, not canvas pixel dimensions
      const p = createNode(canvas);
      p.x = Math.random() * window.innerWidth;
      p.y = Math.random() * window.innerHeight;
      particlesRef.current.push(p);
    }

    const connectionDist = isMobile ? 100 : 150;

    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const particles = particlesRef.current;

      // Update & draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        if (p.isBurst) {
          p.vx *= 0.96;
          p.vy *= 0.96;
          p.alpha = Math.max(0, 1 - p.life / p.maxLife);
          if (p.life >= p.maxLife) { particles.splice(i, 1); continue; }
        } else {
          // Wrap around
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;
          if (p.y < -10) p.y = h + 10;
          if (p.y > h + 10) p.y = -10;

          // Mouse repulsion
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120 && dist > 0) {
            const force = (120 - dist) / 120 * 0.8;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
          // Dampen velocity
          p.vx *= 0.985;
          p.vy *= 0.985;
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${p.alpha})`;
        ctx.fill();

        // Glow around node
        if (!isMobile) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
          grad.addColorStop(0, `${p.color} ${p.alpha * 0.2})`);
          grad.addColorStop(1, `${p.color} 0)`);
          ctx.fillStyle = grad;
          ctx.fill();
        }
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        if (particles[i].isBurst) continue;
        for (let j = i + 1; j < particles.length; j++) {
          if (particles[j].isBurst) continue;
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDist) {
            // Check mouse proximity for glow-up
            const midX = (particles[i].x + particles[j].x) / 2;
            const midY = (particles[i].y + particles[j].y) / 2;
            const mouseDist = Math.sqrt((midX - mx) ** 2 + (midY - my) ** 2);
            const mouseProx = mouseDist < 200 ? (200 - mouseDist) / 200 : 0;

            const baseAlpha = (1 - dist / connectionDist) * 0.12;
            const alpha = baseAlpha + mouseProx * 0.25;
            const width = 0.5 + mouseProx * 1.5;

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(124, 58, 237, ${alpha})`;
            ctx.lineWidth = width;
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    // Mouse events
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };
    const onClick = (e: MouseEvent) => {
      spawnBurst(e.clientX, e.clientY);
    };

    // Touch events
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) mouseRef.current = { x: t.clientX, y: t.clientY };
    };
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) {
        mouseRef.current = { x: t.clientX, y: t.clientY };
        spawnBurst(t.clientX, t.clientY);
      }
    };
    const onTouchEnd = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    canvas.addEventListener('click', onClick);
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchend', onTouchEnd);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      canvas.removeEventListener('click', onClick);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', resize);
    };
  }, [createNode, spawnBurst]);

  return (
    <>
      <div className="fixed inset-0 z-0 overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
        {/* Soft organic CSS shapes behind the canvas */}
        <div className="absolute -bottom-[20%] -left-[10%] w-[80vw] h-[60vh] bg-[#f0eef8] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-[80px] opacity-40 hidden md:block animate-[spin_30s_linear_infinite]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[60vw] h-[50vh] bg-[#e0f2fe] rounded-[50%_50%_30%_70%/50%_40%_60%_50%] blur-[100px] opacity-35 hidden md:block animate-[spin_40s_linear_infinite_reverse]" />
        <div className="absolute top-[20%] left-[10%] w-[40vw] h-[30vh] bg-[#fef3c7] rounded-[30%_70%_70%_30%/30%_30%_70%_70%] blur-[80px] opacity-20 hidden md:block animate-[spin_25s_linear_infinite]" />

        {/* Interactive Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-10"
          style={{ cursor: 'crosshair' }}
        />

        {/* Subtle warm vignette */}
        <div className="absolute inset-0 z-20 pointer-events-none" style={{ background: 'radial-gradient(circle at center, transparent 40%, rgba(250,250,247,0.6) 100%)', opacity: 0.4 }} />
      </div>
    </>
  );
}
