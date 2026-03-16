"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Phone, ChevronRight } from "lucide-react";
import { FaReact, FaGithub, FaLinkedin } from "react-icons/fa";
import { SiNextdotjs, SiMongodb, SiTypescript } from "react-icons/si";
import { useTypingLoop, MagneticBtn, fadeUp, stagger, ease } from "@/lib/ui-utils";
import TerminalHero from "@/components/TerminalHero";

export default function Hero({ onGoto }: { onGoto: (id: string) => void }) {
  const typed = useTypingLoop();

  return (
    <section id="home" className="hero u-corner">
      <div className="container hero-grid">
        <motion.div className="hero-left" variants={stagger} initial="hidden" animate="show">
          <motion.div variants={fadeUp} className="avail-pill">
            <div className="avail-scanner" />
            <span className="avail-dot" />
            <span className="avail-txt">SYSTEM_STATUS: OPEN_TO_OPPORTUNITIES</span>
          </motion.div>

          <motion.h1 variants={fadeUp}>
            Hi, I&apos;m{" "}
            <br />
            <span className="grad-text">Aviral Mishra</span>
          </motion.h1>

          <motion.div variants={fadeUp} className="hero-typed">
            <span className="typed-arrow">→</span>
            <span className="typed-word">{typed}</span>
            <span className="typed-cursor">|</span>
          </motion.div>

          <motion.p variants={fadeUp} className="hero-lead">
            Crafting <strong className="hl-cyan">high-performance</strong> digital experiences. 
            Building scalable dashboards, smart-city systems, and IoT analytics panels 
            with a focus on <strong className="hl-cyan">precision and impact</strong>.
          </motion.p>

          <motion.div variants={fadeUp} className="hero-info">
            <span><MapPin size={13} /> Greater Noida, India</span>
            <span><Phone size={13} /> +91 6398407914</span>
            <span><Mail size={13} /> aviralsul2000@gmail.com</span>
          </motion.div>

          <motion.div variants={fadeUp} className="hero-btns">
            <MagneticBtn className="btn-primary" onClick={() => onGoto("projects")}>
              View Projects <ChevronRight size={15} />
            </MagneticBtn>
            <MagneticBtn className="btn-ghost" onClick={() => onGoto("contact")}>
              Contact Me
            </MagneticBtn>
            <a className="btn-icon" href="https://github.com/Aviral-1" target="_blank" rel="noopener noreferrer" title="GitHub"><Github size={18} /></a>
            <a className="btn-icon" href="https://linkedin.com/in/aviral-mishra" target="_blank" rel="noopener noreferrer" title="LinkedIn"><Linkedin size={18} /></a>
          </motion.div>
        </motion.div>

        {/* Right — Interactive Terminal */}
        <motion.div
          className="hero-right"
          initial={{ opacity: 0, scale: 0.9, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
        >
          <div className="terminal-container">
            <TerminalHero />
            {/* Subtle glow behind terminal */}
            <div className="terminal-glow" />
            
            {/* Tech chips floating around */}
            <motion.div 
               className="floating-chip chip-1"
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <SiNextdotjs size={14} /> <span>Next.js 16</span>
            </motion.div>
            <motion.div 
               className="floating-chip chip-2"
               animate={{ y: [0, 10, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <FaReact size={14} color="#06b6d4" /> <span>React</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .hero {
          padding-top: var(--sp-xxl);
          padding-bottom: var(--sp-xl);
          position: relative;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: center;
        }
        .avail-pill {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-bright);
          border-radius: 50px;
          color: var(--emerald);
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 900;
          margin-bottom: 2.5rem;
          position: relative;
          overflow: hidden;
          letter-spacing: 0.2em;
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5);
        }
        .avail-scanner {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.1), transparent);
          animation: scan-horizontal 4s infinite ease-in-out;
        }
        @keyframes scan-horizontal {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .avail-dot { width: 8px; height: 8px; background: var(--emerald); border-radius: 50%; box-shadow: 0 0 15px var(--emerald); }
        .avail-txt { position: relative; z-index: 1; }

        .hero-lead { max-width: 580px; }
        .hero-info { display: flex; flex-wrap: wrap; gap: 2rem; margin-bottom: 3rem; color: var(--text-muted); font-size: 0.9rem; font-weight: 600; }
        .hero-info span { display: flex; align-items: center; gap: 8px; }

        .terminal-container {
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .terminal-glow {
          position: absolute;
          inset: -100px;
          background: radial-gradient(circle, var(--primary-glow), transparent 70%);
          z-index: -1;
          opacity: 0.2;
          filter: blur(40px);
        }
        .floating-chip {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 24px;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--border-bright);
          border-radius: 12px;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: #fff;
          font-weight: 800;
          z-index: 10;
          box-shadow: 0 20px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05);
          letter-spacing: 0.05em;
        }
        .chip-1 { top: -30px; right: -20px; border-left: 4px solid var(--primary); }
        .chip-2 { bottom: -30px; left: -20px; border-right: 4px solid var(--accent); }
        
        @media (max-width: 1100px) {
            .hero-grid { gap: 4rem; }
        }
        @media (max-width: 960px) {
           .hero-grid { grid-template-columns: 1fr; gap: 5rem; }
           .hero-left { align-items: center; text-align: center; }
           .hero-lead { margin-inline: auto; }
           .hero-info { justify-content: center; gap: 1rem; }
           .hero-btns { justify-content: center; flex-wrap: wrap; }
           .chip-1 { right: 10%; }
           .chip-2 { left: 10%; }
        }
      `}</style>

      <motion.div
        className="scroll-hint"
        animate={{ y: [0, 9, 0] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      >
        <div className="scroll-mouse"><div className="scroll-dot" /></div>
        <span>Scroll</span>
      </motion.div>
    </section>
  );
}
