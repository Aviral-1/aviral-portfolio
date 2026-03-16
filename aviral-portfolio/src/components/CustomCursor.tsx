"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 35 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 35 });
  const slowX = useSpring(cursorX, { stiffness: 120, damping: 22 });
  const slowY = useSpring(cursorY, { stiffness: 120, damping: 22 });
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    // Detect touch device to disable custom cursor
    const touchCheck = window.matchMedia("(pointer: coarse)").matches;
    setIsTouch(touchCheck);
    if (touchCheck) return;

    let lastMoveUpdate = 0;
    const move = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMoveUpdate < 16) return; // ~60fps throttle
      lastMoveUpdate = now;
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const down = () => setClicked(true);
    const up = () => setClicked(false);

    let lastHoverUpdate = 0;
    const handleOver = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastHoverUpdate < 100) return; // 100ms throttle for hover detection
      lastHoverUpdate = now;

      const target = e.target as HTMLElement;
      if (target.closest("a, button, .proj-card, .skill-card")) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", down, { passive: true });
    window.addEventListener("mouseup", up, { passive: true });
    window.addEventListener("mouseover", handleOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mouseover", handleOver);
    };
  }, [cursorX, cursorY]);

  if (isTouch) return null;

  return (
    <AnimatePresence>
      <div 
        style={{ 
          position: "fixed", 
          top: 0, 
          left: 0, 
          width: "100%", 
          height: "100%", 
          pointerEvents: "none", 
          zIndex: 9999 
        }}
      >
        <motion.div
          key="cursor-main"
          style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%", position: "absolute" }}
        >
          {/* Central Dot */}
          <div className="cursor-dot-core" />
          
          {/* Targeting Crosshairs */}
          <motion.div 
            className="cursor-crosshair"
            animate={{ 
              rotate: hovered ? 90 : 0,
              scale: hovered ? 1.5 : 1,
              opacity: clicked ? 1 : 0.6
            }}
          />

          {/* Coordinate Display */}
          <div className="cursor-coords">
            <motion.span>
               X: {Math.round(cursorX.get())} Y: {Math.round(cursorY.get())}
            </motion.span>
          </div>
        </motion.div>

        {/* Outer Tech Ring */}
        <motion.div
          className="cursor-outer-ring"
          style={{ x: slowX, y: slowY, translateX: "-50%", translateY: "-50%", position: "absolute" }}
          animate={{
            scale: hovered ? 1.8 : clicked ? 0.8 : 1,
            opacity: hovered ? 0.3 : 0.1,
          }}
        />
      </div>

      <style jsx>{`
        .cursor-dot-core {
          width: 8px;
          height: 8px;
          background: #fff;
          border-radius: 50%;
          box-shadow: 
            0 0 20px oklch(from var(--primary) l c h / 0.8),
            0 0 40px oklch(from var(--primary) l c h / 0.4);
          z-index: 2;
        }
        .cursor-crosshair {
          position: absolute;
          inset: -15px;
          border: 1px solid oklch(from var(--primary) l c h / 0.3);
          border-radius: 50%;
          pointer-events: none;
        }
        .cursor-coords {
          position: absolute;
          top: 30px;
          left: 30px;
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: var(--primary);
          opacity: 0.3;
          white-space: nowrap;
          letter-spacing: 0.2em;
          font-weight: 800;
          pointer-events: none;
        }
        .cursor-outer-ring {
          width: 80px;
          height: 80px;
          border: 1px solid oklch(from var(--primary) l c h / 0.1);
          background: radial-gradient(circle, oklch(from var(--primary) l c h / 0.05) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          backdrop-filter: blur(2px);
        }
      `}</style>
    </AnimatePresence>
  );
}
