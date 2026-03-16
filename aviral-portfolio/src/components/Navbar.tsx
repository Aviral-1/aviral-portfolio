"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Activity, Cpu, ShieldCheck } from "lucide-react";
import { ease } from "@/lib/ui-utils";

const navItems = ["home", "about", "skills", "experience", "projects", "reviews", "contact"];

export default function Navbar({ active, onGoto }: { active: string, onGoto: (id: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [metrics, setMetrics] = useState({ latency: 12, cpu: 5 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    const interval = setInterval(() => {
       setMetrics({
          latency: Math.floor(Math.random() * 5) + 8,
          cpu: Math.floor(Math.random() * 8) + 2
       });
    }, 3000);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  const handleGoto = (id: string) => {
    onGoto(id);
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? "is-scrolled" : ""}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease }}
      >
        <div className="nav-container u-glass">
          <div className="nav-status-bar">
             <div className="status-item">
               <Activity size={12} className="text-primary" />
               <span>LATENCY: {metrics.latency}ms</span>
             </div>
             <div className="status-item">
               <Cpu size={12} className="text-accent-emerald" />
               <span>CPU: {metrics.cpu}%</span>
             </div>
             <div className="status-item">
               <ShieldCheck size={12} className="text-accent-purple" />
               <span>SYSTEM: ACTIVE</span>
             </div>
          </div>

          <div className="nav-main">
            <button className="nav-logo" onClick={() => handleGoto("home")}>
              <div className="logo-sq u-neon-cyan">AM</div>
              <div className="logo-details">
                <span className="logo-txt">Aviral Mishra</span>
                <span className="logo-sub">Full-Stack Architect</span>
              </div>
            </button>

            <div className="nav-links-wrap">
              {navItems.map(id => (
                <button
                  key={id}
                  onClick={() => handleGoto(id)}
                  className={`nl ${active === id ? "active" : ""}`}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                  {active === id && (
                    <motion.span 
                      className="nl-bar" 
                      layoutId="nl-bar" 
                      transition={{ type: "spring", stiffness: 350, damping: 30 }} 
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="nav-actions">
              <motion.a 
                className="nav-cta" 
                href="mailto:aviralsul2000@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Connect ✦
              </motion.a>
              <button className="nav-burger" onClick={() => setMenuOpen(v => !v)} aria-label="menu">
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <style>{`
        .navbar {
          position: fixed;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
          width: min(1300px, calc(100% - 24px));
          z-index: 500;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .navbar.is-scrolled {
           top: 8px;
        }
        .nav-container {
          display: flex;
          flex-direction: column;
          border-radius: 4px;
          overflow: hidden;
          background: rgba(10, 15, 25, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid var(--border);
          transition: all 0.4s ease;
        }
        .navbar.is-scrolled .nav-container {
           box-shadow: 0 10px 40px rgba(0,0,0,0.8);
           background: rgba(10, 15, 25, 0.98);
        }
        .nav-status-bar {
           display: flex;
           justify-content: flex-end;
           gap: 1.5rem;
           padding: 6px 1.5rem;
           background: rgba(0,0,0,0.4);
           border-bottom: 1px solid var(--border);
           font-family: var(--font-mono);
           font-size: 0.6rem;
           color: var(--text-dim);
           letter-spacing: 0.1em;
        }
        .status-item { display: flex; align-items: center; gap: 6px; }
        .nav-main {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 1.5rem;
          gap: 1.5rem;
        }
        .nav-logo { display: flex; align-items: center; gap: 12px; }
        .logo-sq { width: 34px; height: 34px; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 0.9rem; }
        .logo-details { display: flex; flex-direction: column; align-items: flex-start; }
        .logo-txt { font-weight: 800; color: #fff; line-height: 1; font-size: 0.95rem; }
        .logo-sub { font-size: 0.55rem; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.1em; margin-top: 2px; }
        .nav-links-wrap {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .nl { font-size: 0.75rem; font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 0.05em; padding: 6px 10px; color: var(--text-muted); opacity: 0.7; transition: all 0.2s ease; }
        .nl:hover, .nl.active { color: #fff; opacity: 1; }
        .nl-bar { height: 1px; background: var(--primary); bottom: 0; }
        .nav-actions { display: flex; align-items: center; gap: 1rem; }
        .nav-cta {
          padding: 6px 16px;
          background: transparent;
          color: var(--primary);
          border: 1px solid var(--primary);
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 800;
          font-family: var(--font-mono);
        }
        .nav-cta:hover { background: var(--primary); color: #000; }
        @media (max-width: 960px) {
           .nav-status-bar, .nav-links-wrap { display: none; }
           .logo-sub { display: none; }
        }
      `}</style>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-nav"
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.96 }}
            transition={{ duration: 0.22 }}
          >
            {navItems.map((id, i) => (
              <motion.button
                key={id}
                className={`mn-link ${active === id ? "active" : ""}`}
                onClick={() => handleGoto(id)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <span className="mn-num">0{i + 1}</span>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </motion.button>
            ))}
            <a className="mn-hire" href="mailto:aviralsul2000@gmail.com">
              📬 &nbsp;Email Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
