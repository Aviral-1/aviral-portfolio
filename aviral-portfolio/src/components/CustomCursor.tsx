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
      {!clicked && (
        <motion.div
          key="cursor-dot"
          className="cursor-dot"
          style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
          animate={{ scale: hovered ? 1.5 : 1 }}
        />
      )}
      <motion.div
        key="cursor-ring"
        className="cursor-ring"
        style={{ x: slowX, y: slowY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: hovered ? 1.8 : clicked ? 0.8 : 1,
          opacity: hovered ? 0.6 : 0.35,
        }}
        transition={{ duration: 0.2, ease: "linear" }}
      />
    </AnimatePresence>
  );
}
