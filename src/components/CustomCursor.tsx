import { useRef, useEffect, useCallback, useState } from 'react';

/**
 * CustomCursor — Dot + Ring cursor replicating the Japanese-themed reference.
 * - 6px solid dot: sits exactly on pointer, zero lag (transform, GPU-accelerated)
 * - 28px hollow ring: follows with spring delay, expands to 48px on hoverable elements
 * - Ring border turns coral (#FF6B6B) on hover
 * - Dot scales to 1.4x on mousedown, snaps back on mouseup
 * - Hidden on mobile/touch devices via CSS @media (hover: hover)
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 }); // actual pointer
  const ringPos = useRef({ x: -100, y: -100 }); // delayed ring
  const rafRef = useRef(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const updateCursor = useCallback(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Dot: instant position (GPU-accelerated transform)
    dot.style.transform = `translate(${pos.current.x - 3}px, ${pos.current.y - 3}px) scale(${isClicking ? 1.4 : 1})`;

    // Ring: spring-based delay (lerp factor 0.15 for smooth following)
    ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15;
    ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15;

    const ringSize = isHovering ? 48 : 28;
    ring.style.transform = `translate(${ringPos.current.x - ringSize / 2}px, ${ringPos.current.y - ringSize / 2}px)`;
    ring.style.width = `${ringSize}px`;
    ring.style.height = `${ringSize}px`;
    ring.style.borderColor = isHovering ? '#FF6B6B' : 'rgba(124, 58, 237, 0.4)';

    rafRef.current = requestAnimationFrame(updateCursor);
  }, [isHovering, isClicking]);

  useEffect(() => {
    // Skip on touch-only devices
    const hasPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasPointer) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    // Detect hoverable elements for ring scale-up
    const onOverCapture = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], [data-hoverable], .cursor-pointer')) {
        setIsHovering(true);
      }
    };
    const onOutCapture = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], [data-hoverable], .cursor-pointer')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseover', onOverCapture, true);
    document.addEventListener('mouseout', onOutCapture, true);

    rafRef.current = requestAnimationFrame(updateCursor);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseover', onOverCapture, true);
      document.removeEventListener('mouseout', onOutCapture, true);
    };
  }, [updateCursor]);

  return (
    <>
      {/* Dot — 6px solid, zero lag */}
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: '#111827',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
          transition: 'transform 0.08s ease-out',
        }}
      />
      {/* Ring — 28px hollow, spring delay */}
      <div
        ref={ringRef}
        className="custom-cursor-ring"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 28,
          height: 28,
          borderRadius: '50%',
          border: '1.5px solid rgba(124, 58, 237, 0.4)',
          backgroundColor: 'transparent',
          pointerEvents: 'none',
          zIndex: 99998,
          willChange: 'transform, width, height, border-color',
          transition: 'width 0.25s ease-out, height 0.25s ease-out, border-color 0.2s ease-out',
        }}
      />
    </>
  );
}
