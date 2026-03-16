"use client";

import React, { useEffect, useState, memo } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const DataStreams = memo(function DataStreams() {
  const [streams, setStreams] = useState<{ id: number; left: string; duration: string; delay: string; content: string }[]>([]);

  useEffect(() => {
    const chars = "01<>_/*{}[]+-";
    const newStreams = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: `${(i * 8) + (Math.random() * 4)}%`,
      duration: `${15 + Math.random() * 25}s`,
      delay: `${Math.random() * 10}s`,
      content: Array.from({ length: 20 }).map(() => chars[Math.floor(Math.random() * chars.length)]).join("")
    }));
    setStreams(newStreams);
  }, []);

  return (
    <div className="data-streams">
      {streams.map((s) => (
        <div
          key={s.id}
          className="stream-column"
          style={{
            left: s.left,
            animationDuration: s.duration,
            animationDelay: s.delay,
          }}
        >
          {s.content}
        </div>
      ))}
    </div>
  );
});

export default function BackgroundParticles() {
  const [init, setInit] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    // Mouse tracking for global parallax variables
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty("--mouse-x", `${x}%`);
      document.documentElement.style.setProperty("--mouse-y", `${y}%`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    // Only load particles if not on reduced motion and NOT a touch device (approx)
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (!reduce && !isTouch) {
      initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      }).then(() => {
        setInit(true);
      });
    }

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [reduce]);

  return (
    <div className="ptcl-container">
      <div className="neural-radial" />
      <div className="grid-overlay" />
      <div className="circuit-pattern" />
      {!reduce && <DataStreams />}
      
      <AnimatePresence>
        {init && (
          <motion.div className="ptcl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
            <Particles
              options={{
                particles: {
                  number: { value: 15 },
                  links: { enable: false },
                  move: { speed: 0.1, outModes: "bounce" },
                  opacity: { value: 0.12 },
                  size: { value: { min: 0.5, max: 1.4 } },
                  color: { value: "#06b6d4" }
                },
                fpsLimit: 60,
                detectRetina: true,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`
        .ptcl-container {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
