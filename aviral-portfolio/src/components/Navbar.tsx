"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, Home, User, Code, Briefcase, Folder, Star, Mail 
} from "lucide-react";
import { ease } from "@/lib/ui-utils";

const items = [
  { id: "home", label: "Home", icon: <Home size={15} /> },
  { id: "about", label: "About", icon: <User size={15} /> },
  { id: "skills", label: "Skills", icon: <Code size={15} /> },
  { id: "experience", label: "Work", icon: <Briefcase size={15} /> },
  { id: "projects", label: "Lab", icon: <Folder size={15} /> },
  { id: "reviews", label: "Raves", icon: <Star size={15} /> },
  { id: "contact", label: "Connect", icon: <Mail size={15} /> },
];

const NAVBAR_STYLES = `
  .nav-v6 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 1.5rem 0;
    z-index: 1000;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .nav-v6.is-glass {
    padding: 1rem 0;
    background: rgba(10, 15, 25, 0.7);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,255,255,0.05);
    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
  }
  .nav-wrapper {
    max-width: 1400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    padding: 0 2rem;
  }

  /* --- Brand --- */
  .nav-brand { 
    display: flex; 
    align-items: center; 
    gap: 1rem; 
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }
  .brand-logo { 
    width: 40px; height: 40px; 
    background: var(--primary); 
    color: #000; 
    border-radius: 10px; 
    display: flex; align-items: center; justify-content: center; 
    font-weight: 900; font-size: 1.1rem;
    box-shadow: 0 0 20px oklch(0.7 0.22 150 / 0.3);
  }
  .brand-name { display: flex; flex-direction: column; text-align: left; }
  .name-top { color: #fff; font-weight: 800; font-size: 1.05rem; line-height: 1; }
  .name-bot { color: var(--text-muted); font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.15em; margin-top: 4px; font-family: var(--font-mono); font-weight: 700; }

  /* --- Desktop Menu --- */
  .nav-central { display: flex; justify-content: center; }
  .menu-pill {
    display: flex;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.05);
    padding: 4px;
    border-radius: 14px;
    gap: 4px;
  }
  .menu-item {
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    color: var(--text-muted);
    font-size: 0.85rem;
    font-weight: 700;
    transition: all 0.3s ease;
    border-radius: 10px;
    background: none;
    border: none;
    cursor: pointer;
  }
  .menu-item:hover { color: #fff; }
  .menu-item.is-active { color: var(--primary); }
  .pill-bg {
    position: absolute;
    inset: 0;
    background: rgba(255,255,255,0.06);
    border-radius: 10px;
    z-index: -1;
  }
  .item-icon { opacity: 0.7; }
  .is-active .item-icon { color: var(--primary); opacity: 1; }

  /* --- Right Side --- */
  .nav-side { display: flex; align-items: center; justify-content: flex-end; gap: 1.5rem; }
  .cta-premium {
    background: #fff;
    color: #000;
    padding: 10px 20px;
    border-radius: 12px;
    font-weight: 900;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s ease;
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    border: none;
    cursor: pointer;
  }
  .cta-premium:hover { transform: translateY(-2px); box-shadow: 0 15px 30px rgba(0,0,0,0.3); }
  .cta-arrow { font-size: 1rem; font-weight: 400; color: var(--primary); }
  .burger-premium { display: none; color: #fff; background: none; border: none; cursor: pointer; }

  /* --- Mobile Overlay --- */
  .mobile-overlay {
    position: fixed;
    inset: 0;
    background: rgba(10, 15, 25, 0.95);
    backdrop-filter: blur(40px);
    -webkit-backdrop-filter: blur(40px);
    z-index: 900;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }
  .mob-menu-grid {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .mob-item {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 1.5rem 2rem;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 20px;
    width: 100%;
    text-align: left;
    color: #fff;
    position: relative;
    cursor: pointer;
  }
  .mob-item.is-active { border-color: var(--primary); background: rgba(16, 185, 129, 0.05); }
  .mob-icon { color: var(--primary); }
  .mob-label { font-size: 1.25rem; font-weight: 800; }
  .mob-num { margin-left: auto; font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-dim); }

  @media (max-width: 1100px) {
     .menu-pill { display: none; }
     .brand-name { display: none; }
     .nav-wrapper { grid-template-columns: 1fr 1fr; }
     .burger-premium { display: flex; }
     .cta-premium { display: none; }
  }
`;

export default function Navbar({ active, onGoto }: { active: string, onGoto: (id: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGoto = (id: string) => {
    onGoto(id);
    setMenuOpen(false);
  };

  return (
    <>
      <style>{NAVBAR_STYLES}</style>
      <motion.nav
        className={`nav-v6 ${scrolled ? "is-glass" : ""}`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="nav-wrapper">
          {/* Logo Section */}
          <button className="nav-brand" onClick={() => handleGoto("home")}>
            <div className="brand-logo">AM</div>
            <div className="brand-name">
              <span className="name-top">Aviral Mishra</span>
              <span className="name-bot">Silicon Engineer</span>
            </div>
          </button>

          {/* Centered Desktop Menu */}
          <div className="nav-central">
             <div className="menu-pill">
               {items.map((item, idx) => (
                 <button
                   key={`${item.id}-${idx}`}
                   onClick={() => handleGoto(item.id)}
                   className={`menu-item ${active === item.id ? "is-active" : ""}`}
                 >
                   <span className="item-icon">{item.icon}</span>
                   <span className="item-label">{item.label}</span>
                   {active === item.id && (
                     <motion.div 
                       layoutId="pill-active"
                       className="pill-bg"
                       transition={{ type: "spring", stiffness: 400, damping: 30 }}
                     />
                   )}
                 </button>
               ))}
             </div>
          </div>

          {/* Action Area */}
          <div className="nav-side">
            <button className="cta-premium" onClick={() => handleGoto("contact")}>
               Let&apos;s Build <span className="cta-arrow">→</span>
            </button>
            <button className="burger-premium" onClick={() => setMenuOpen(!menuOpen)}>
               {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-overlay"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease }}
          >
            <div className="mob-menu-grid">
              {items.map((item, i) => (
                <motion.button
                  key={item.id}
                  className={`mob-item ${active === item.id ? "is-active" : ""}`}
                  onClick={() => handleGoto(item.id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <span className="mob-icon">{item.icon}</span>
                  <span className="mob-label">{item.label}</span>
                  <span className="mob-num">0{i + 1}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
