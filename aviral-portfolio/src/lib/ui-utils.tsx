"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion, useMotionValue, useTransform } from "framer-motion";

/* ========== TYPING LOOP ========== */
const phrases = [
  "Frontend Developer",
  "React.js Specialist",
  "Dashboard Architect",
  "GIS & Maps Expert",
  "Smart City Builder",
  "UI/UX Craftsman",
];

export function useTypingLoop() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [del, setDel] = useState(false);
  const ref = useRef(text);
  ref.current = text;

  useEffect(() => {
    const cur = phrases[index];
    const speed = del ? 33 : 72;
    const t = setTimeout(() => {
      if (!del) {
        const next = cur.slice(0, ref.current.length + 1);
        setText(next);
        if (next === cur) setTimeout(() => setDel(true), 1300);
      } else {
        const next = ref.current.slice(0, -1);
        setText(next);
        if (next === "") { setDel(false); setIndex(i => (i + 1) % phrases.length); }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, index]);
  return text;
}

/* ========== MAGNETIC BUTTON ========== */
export function MagneticBtn({
  children, className, ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const move = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.28}px,${(e.clientY - r.top - r.height / 2) * 0.28}px)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = "translate(0,0)"; };
  return (
    <motion.button ref={ref} className={className} onMouseMove={move} onMouseLeave={reset} whileTap={{ scale: 0.95 }} {...(props as any)}>
      {children}
    </motion.button>
  );
}

/* ========== AURORA BG ========== */
export function AuroraBg() {
  return (
    <div className="aurora-bg" aria-hidden>
      <div className="noise-overlay" />
      <div className="scanlines" />
      <div className="aurora-blob a1" />
      <div className="aurora-blob a2" />
      <div className="aurora-blob a3" />
      <div className="aurora-blob a4" />
      <div className="grid-overlay" />
    </div>
  );
}

/* ========== TILT CARD COMPONENT ========== */
export function TiltCard({ children, className }: { children: React.ReactNode, className?: string }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const lastUpdate = useRef(0);

  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastUpdate.current < 48) return; // ~20fps throttle for tilt to save CPU
    lastUpdate.current = now;

    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = (mouseX / width - 0.5) * 160; // Reduced intensity
    const yPct = (mouseY / height - 0.5) * 160;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, perspective: 1000, transformStyle: "preserve-3d" }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
}

/* ========== ANIMATION VARIANTS ========== */
export const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]; // Quintic easeOut
export const liquid = [0.76, 0, 0.24, 1] as [number, number, number, number]; // Cinematic Liquid

export const fadeUp = { 
  hidden: { opacity: 0, y: 60, filter: "blur(10px)" }, 
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.2, ease } } 
};

export const fadeIn = { 
  hidden: { opacity: 0, filter: "blur(5px)" }, 
  show: { opacity: 1, filter: "blur(0px)", transition: { duration: 1, ease } } 
};

export const stagger = { 
  hidden: {}, 
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } } 
};

export const scaleIn = { 
  hidden: { opacity: 0, scale: 0.9, filter: "blur(10px)" }, 
  show: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 1, ease } } 
};

export const liquidReveal = {
  hidden: { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)", opacity: 0 },
  show: { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1, transition: { duration: 1.4, ease: liquid } }
};
