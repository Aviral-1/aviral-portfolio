"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ease } from "@/lib/ui-utils";

const navItems = ["home", "about", "skills", "experience", "projects", "reviews", "contact"];

export default function Navbar({ active, onGoto }: { active: string, onGoto: (id: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleGoto = (id: string) => {
    onGoto(id);
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className="navbar"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.75, ease }}
      >
        <div className="nav-inner">
          {/* Logo */}
          <button className="nav-logo" onClick={() => handleGoto("home")}>
            <span className="logo-sq">AM</span>
            <span className="logo-txt">Aviral</span>
          </button>

          {/* Center pill links */}
          <div className="nav-center">
            {navItems.map(id => (
              <button
                key={id}
                onClick={() => handleGoto(id)}
                className={`nl ${active === id ? "active" : ""}`}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
                {active === id && (
                  <motion.span className="nl-bar" layoutId="nl-bar" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                )}
              </button>
            ))}
          </div>

          {/* Right CTA */}
          <div className="nav-right">
            <a className="nav-hire" href="mailto:aviralsul2000@gmail.com">
              Hire Me ✦
            </a>
            <button className="nav-burger" onClick={() => setMenuOpen(v => !v)} aria-label="menu">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

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
