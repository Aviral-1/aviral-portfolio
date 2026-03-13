"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function BackgroundParticles() {
  const [init, setInit] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    // Only load particles if not on reduced motion and NOT a touch device (approx)
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (!reduce && !isTouch) {
      initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      }).then(() => {
        setInit(true);
      });
    }
  }, [reduce]);

  if (!init) return null;

  return (
    <motion.div className="ptcl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
      <Particles
        options={{
          particles: {
            number: { value: 12 },
            links: { enable: false },
            move: { speed: 0.08, outModes: "bounce" },
            opacity: { value: 0.1 },
            size: { value: { min: 0.5, max: 1.2 } },
            color: { value: "#06b6d4" }
          },
          fpsLimit: 30,
          detectRetina: false,
        }}
      />
    </motion.div>
  );
}
