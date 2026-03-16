"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Github, Linkedin, ChevronRight, Shield, Zap,
} from "lucide-react";
import { FaReact } from "react-icons/fa";
import { SiNextdotjs, SiMongodb, SiTypescript } from "react-icons/si";
import { useTypingLoop, MagneticBtn, fadeUp, stagger } from "@/lib/ui-utils";

const HERO_STYLES = `
  .hero-v6 {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 7rem 0 5rem;
    overflow: hidden;
  }

  .hero-mesh {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 50% at 80% 20%, oklch(0.7 0.22 150 / 0.12), transparent 70%),
      radial-gradient(ellipse 50% 50% at 20% 80%, oklch(0.7 0.22 150 / 0.06), transparent 70%);
    z-index: 0;
    pointer-events: none;
  }

  .hero-grid-bg {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(oklch(0.32 0.03 240) 1px, transparent 1px),
      linear-gradient(90deg, oklch(0.32 0.03 240) 1px, transparent 1px);
    background-size: 60px 60px;
    opacity: 0.18;
    z-index: 0;
    pointer-events: none;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent);
    -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent);
  }

  .hero-wrap {
    position: relative;
    z-index: 2;
    width: 100%;
  }

  .hero-inner {
    display: grid;
    grid-template-columns: 1fr 420px;
    gap: 5rem;
    align-items: center;
  }

  /* ── LEFT COLUMN ── */
  .h-badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 8px 18px;
    border-radius: 100px;
    border: 1px solid oklch(0.32 0.03 240);
    background: oklch(0.15 0.02 240 / 0.8);
    margin-bottom: 2rem;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: oklch(0.65 0.01 240);
  }
  .h-badge-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: oklch(0.7 0.22 150);
    box-shadow: 0 0 10px oklch(0.7 0.22 150 / 0.6);
    animation: heroPulse 2s ease infinite;
  }
  @keyframes heroPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }

  .h-title {
    font-size: clamp(2.8rem, 5.5vw, 5rem);
    font-weight: 900;
    line-height: 0.95;
    letter-spacing: -0.03em;
    color: #fff;
    margin-bottom: 1.5rem;
  }
  .h-title-em { color: oklch(0.7 0.22 150); display: block; }

  .h-typing {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: var(--font-mono);
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
    color: oklch(0.65 0.01 240);
  }
  .h-typing-text {
    color: #fff;
    font-weight: 700;
    border-bottom: 2px solid oklch(0.7 0.22 150);
    padding-bottom: 2px;
  }
  .h-cursor {
    color: oklch(0.7 0.22 150);
    animation: heroBlink 1s step-end infinite;
  }
  @keyframes heroBlink { 0%,100%{opacity:1} 50%{opacity:0} }

  .h-desc {
    font-size: 1.1rem;
    line-height: 1.75;
    color: oklch(0.65 0.01 240);
    max-width: 560px;
    margin-bottom: 2.5rem;
  }
  .h-desc strong { color: #fff; font-weight: 700; }

  .h-actions {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    flex-wrap: wrap;
    margin-bottom: 3rem;
  }
  .h-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 15px 30px;
    border-radius: 14px;
    background: oklch(0.7 0.22 150);
    color: #000;
    font-weight: 900;
    font-size: 0.95rem;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .h-btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 20px 40px oklch(0.7 0.22 150 / 0.3);
  }
  .h-btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 28px;
    border-radius: 14px;
    background: transparent;
    color: #fff;
    font-weight: 700;
    font-size: 0.95rem;
    border: 1px solid oklch(0.32 0.03 240);
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .h-btn-secondary:hover {
    border-color: oklch(0.7 0.22 150);
    background: oklch(0.7 0.22 150 / 0.06);
  }

  .h-stack-row {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  .h-stack-label {
    font-size: 0.6rem;
    font-weight: 800;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: oklch(0.5 0.01 240);
  }
  .h-stack-icons {
    display: flex;
    gap: 1.5rem;
    color: oklch(0.65 0.01 240);
    font-size: 1.4rem;
  }
  .h-stack-icons svg { transition: color 0.2s ease, transform 0.2s ease; }
  .h-stack-icons svg:hover { color: oklch(0.7 0.22 150); transform: scale(1.2); }

  /* ── RIGHT COLUMN — Profile Card ── */
  .h-card {
    background: oklch(0.15 0.02 240 / 0.7);
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    border: 1px solid oklch(0.32 0.03 240);
    border-radius: 28px;
    padding: 2.5rem;
    position: relative;
    overflow: hidden;
    box-shadow: 0 40px 100px -20px rgba(0,0,0,0.7);
  }
  .h-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, oklch(0.7 0.22 150), transparent);
    opacity: 0.6;
  }
  .h-card-glow {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at 60% 30%, oklch(0.7 0.22 150 / 0.08), transparent 60%);
    pointer-events: none;
  }

  .h-card-top {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    margin-bottom: 2rem;
    position: relative;
  }
  .h-avatar {
    width: 64px;
    height: 64px;
    border-radius: 18px;
    background: oklch(0.1 0.01 240);
    border: 1.5px solid oklch(0.7 0.22 150);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-shadow: 0 0 30px oklch(0.7 0.22 150 / 0.25);
    flex-shrink: 0;
  }
  .h-avatar-txt {
    font-size: 1.4rem;
    font-weight: 900;
    color: oklch(0.7 0.22 150);
    letter-spacing: -0.05em;
  }
  .h-avail {
    position: absolute;
    bottom: -6px;
    right: -6px;
    display: flex;
    align-items: center;
    gap: 4px;
    background: oklch(0.12 0.01 240);
    border: 1px solid oklch(0.7 0.22 150);
    border-radius: 20px;
    padding: 3px 8px;
    font-size: 0.55rem;
    font-weight: 800;
    color: oklch(0.7 0.22 150);
    letter-spacing: 0.04em;
    white-space: nowrap;
  }
  .h-avail-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: oklch(0.7 0.22 150);
    box-shadow: 0 0 6px oklch(0.7 0.22 150);
    animation: heroPulse 2s infinite;
  }
  .h-name-col { flex: 1; min-width: 0; }
  .h-name {
    font-size: 1.1rem;
    font-weight: 900;
    color: #fff;
    margin: 0 0 4px;
    letter-spacing: -0.02em;
  }
  .h-role {
    font-size: 0.72rem;
    font-family: var(--font-mono);
    font-weight: 700;
    color: oklch(0.7 0.22 150);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin: 0 0 3px;
  }
  .h-loc {
    font-size: 0.72rem;
    color: oklch(0.65 0.01 240);
    display: flex;
    align-items: center;
    gap: 4px;
    margin: 0;
  }
  .h-verify { color: oklch(0.7 0.22 150); flex-shrink: 0; }

  /* Stats */
  .h-stats {
    display: flex;
    align-items: center;
    gap: 0;
    background: oklch(0.1 0.01 240 / 0.7);
    border: 1px solid oklch(0.32 0.03 240);
    border-radius: 16px;
    margin-bottom: 1.75rem;
    overflow: hidden;
  }
  .h-stat {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.25rem;
    gap: 4px;
  }
  .h-stat + .h-stat { border-left: 1px solid oklch(0.32 0.03 240); }
  .h-stat-n {
    font-size: 1.75rem;
    font-weight: 900;
    color: #fff;
    line-height: 1;
    letter-spacing: -0.04em;
  }
  .h-stat-l {
    font-size: 0.58rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: oklch(0.65 0.01 240);
  }

  /* Card footer */
  .h-card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 1.5rem;
    border-top: 1px solid oklch(0.32 0.03 240);
    position: relative;
  }
  .h-footer-status {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 0.8rem;
    font-weight: 700;
    color: oklch(0.65 0.01 240);
  }
  .h-footer-socials {
    display: flex;
    gap: 1rem;
    color: oklch(0.65 0.01 240);
  }
  .h-footer-socials a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border-radius: 10px;
    border: 1px solid oklch(0.32 0.03 240);
    background: oklch(0.15 0.02 240 / 0.5);
    transition: all 0.2s ease;
  }
  .h-footer-socials a:hover {
    border-color: oklch(0.7 0.22 150);
    color: oklch(0.7 0.22 150);
    background: oklch(0.7 0.22 150 / 0.08);
  }

  /* Floating terminal snippet */
  .h-code-float {
    position: absolute;
    bottom: -30px;
    right: -24px;
    background: oklch(0.09 0.01 240 / 0.95);
    border: 1px solid oklch(0.7 0.22 150 / 0.5);
    border-radius: 14px;
    padding: 1.25rem 1.5rem;
    font-family: var(--font-mono);
    font-size: 0.7rem;
    line-height: 1.6;
    width: 220px;
    box-shadow: 0 20px 50px rgba(0,0,0,0.7);
    z-index: 10;
  }
  .h-code-dots { display: flex; gap: 5px; margin-bottom: 0.75rem; }
  .h-dot { width: 8px; height: 8px; border-radius: 50%; }
  .h-dot-r { background: #ff5f56; }
  .h-dot-y { background: #ffbd2e; }
  .h-dot-g { background: #27c93f; }
  .h-code-float pre { color: oklch(0.65 0.01 240); }
  .h-code-float code { color: #fff; }
  .h-code-key { color: oklch(0.7 0.22 150); }
  .h-code-str { color: #fbbf24; }

  /* Responsive */
  @media (max-width: 1024px) {
    .hero-inner {
      grid-template-columns: 1fr;
      gap: 4rem;
      text-align: center;
    }
    .h-desc { margin-inline: auto; }
    .h-actions { justify-content: center; }
    .h-stack-row { align-items: center; }
    .h-card { max-width: 440px; margin: 0 auto; }
    .h-code-float { display: none; }
    .h-badge { display: inline-flex; }
    .h-card-top { justify-content: center; }
    .h-name-col { text-align: left; }
  }
  @media (max-width: 640px) {
    .hero-v6 { padding: 6rem 0 4rem; }
    .h-title { font-size: 2.5rem; }
    .h-actions { gap: 1rem; }
    .h-btn-primary, .h-btn-secondary { padding: 12px 22px; font-size: 0.9rem; }
  }
`;

export default function Hero({ onGoto }: { onGoto: (id: string) => void }) {
  const typed = useTypingLoop();

  return (
    <section id="home" className="hero-v6">
      <style>{HERO_STYLES}</style>
      <div className="hero-mesh" />
      <div className="hero-grid-bg" />

      <div className="hero-wrap container">
        <motion.div
          className="hero-inner"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {/* ── LEFT: Text content ── */}
          <div>
            <motion.div variants={fadeUp} className="h-badge">
              <span className="h-badge-dot" />
              Available for Elite Projects
            </motion.div>

            <motion.h1 variants={fadeUp} className="h-title">
              Engineering
              <span className="h-title-em">Digital Authority</span>
            </motion.h1>

            <motion.div variants={fadeUp} className="h-typing">
              <span>I am a</span>
              <span className="h-typing-text">{typed}</span>
              <span className="h-cursor">_</span>
            </motion.div>

            <motion.p variants={fadeUp} className="h-desc">
              Senior Frontend Architect specializing in{" "}
              <strong>high-performance systems</strong> and immersive
              human-computer interfaces. I bridge complex engineering with{" "}
              <strong>world-class UI/UX</strong>.
            </motion.p>

            <motion.div variants={fadeUp} className="h-actions">
              <MagneticBtn className="h-btn-primary" onClick={() => onGoto("projects")}>
                Explore Projects <ChevronRight size={16} />
              </MagneticBtn>
              <button className="h-btn-secondary" onClick={() => onGoto("contact")}>
                Let&apos;s Connect
              </button>
            </motion.div>

            <motion.div variants={fadeUp} className="h-stack-row">
              <span className="h-stack-label">Tech Stack Authority</span>
              <div className="h-stack-icons">
                <SiNextdotjs title="Next.js" />
                <FaReact title="React" />
                <SiTypescript title="TypeScript" />
                <SiMongodb title="MongoDB" />
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: Profile Card ── */}
          <motion.div
            style={{ position: "relative" }}
            initial={{ opacity: 0, x: 50, rotateY: 15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="h-card">
              <div className="h-card-glow" />

              <div className="h-card-top">
                <div className="h-avatar">
                  <span className="h-avatar-txt">AM</span>
                  <div className="h-avail">
                    <span className="h-avail-dot" />
                    Available
                  </div>
                </div>
                <div className="h-name-col">
                  <p className="h-name">Aviral Mishra</p>
                  <p className="h-role">Software Engineer · Full-Stack</p>
                  <p className="h-loc">📍 Greater Noida, India</p>
                </div>
                <Shield size={16} className="h-verify" />
              </div>

              <div className="h-stats">
                {[
                  { n: "3+", l: "Years Exp" },
                  { n: "50+", l: "Shipped" },
                  { n: "5+", l: "Cities" },
                ].map((s) => (
                  <div key={s.l} className="h-stat">
                    <span className="h-stat-n">{s.n}</span>
                    <span className="h-stat-l">{s.l}</span>
                  </div>
                ))}
              </div>

              <div className="h-card-footer">
                <div className="h-footer-status">
                  <Zap size={13} style={{ color: "oklch(0.7 0.22 150)" }} />
                  99.9% Build Success
                </div>
                <div className="h-footer-socials">
                  <a href="https://github.com/Aviral-1" target="_blank" rel="noreferrer">
                    <Github size={15} />
                  </a>
                  <a href="https://linkedin.com/in/aviral-mishra" target="_blank" rel="noreferrer">
                    <Linkedin size={15} />
                  </a>
                </div>
              </div>
            </div>

            {/* Floating code snippet */}
            <motion.div
              className="h-code-float"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="h-code-dots">
                <span className="h-dot h-dot-r" />
                <span className="h-dot h-dot-y" />
                <span className="h-dot h-dot-g" />
              </div>
              <pre><code>{`const site = {
  `}<span className="h-code-key">performance</span>{`: `}<span className="h-code-str">1.0</span>{`,
  `}<span className="h-code-key">aesthetics</span>{`: `}<span className="h-code-str">"Elite"</span>{`,
  `}<span className="h-code-key">ux</span>{`: `}<span className="h-code-str">"Fluid"</span>{`
};`}</code></pre>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
