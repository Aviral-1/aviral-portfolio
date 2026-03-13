"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Phone, ChevronRight } from "lucide-react";
import { FaReact, FaGithub, FaLinkedin } from "react-icons/fa";
import { SiNextdotjs, SiMongodb, SiTypescript } from "react-icons/si";
import { useTypingLoop, MagneticBtn, fadeUp, stagger, ease } from "@/lib/ui-utils";

export default function Hero({ onGoto }: { onGoto: (id: string) => void }) {
  const typed = useTypingLoop();

  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <motion.div className="hero-left" variants={stagger} initial="hidden" animate="show">
          <motion.div variants={fadeUp} className="avail-pill">
            <span className="avail-dot" />
            <span>Open to opportunities</span>
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
            Frontend Developer with <strong className="hl-cyan">3+ years</strong> building
            high-performance dashboards, GIS mapping systems, IoT analytics panels, and
            smart-city platforms deployed across{" "}
            <strong className="hl-cyan">5+ Indian cities</strong>.
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

        {/* Right — Avatar */}
        <motion.div
          className="hero-right"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease, delay: 0.15 }}
        >
          <div className="avatar-ring">
            <div className="avatar-glow" />
            <Image src="/avatar.png" alt="Aviral Mishra" width={300} height={300} className="avatar-img" priority />
            <motion.div
              className="orbit-ring or1"
              animate={{ rotate: 360 }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="orbit-ring or2"
              animate={{ rotate: -360 }}
              transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
            />

            {[
              { Icon: FaReact, color: "#06b6d4", angle: 0 },
              { Icon: SiNextdotjs, color: "#fff", angle: 90 },
              { Icon: SiMongodb, color: "#10b981", angle: 180 },
              { Icon: SiTypescript, color: "#8b5cf6", angle: 270 },
            ].map(({ Icon, color, angle }, i) => (
              <motion.div
                key={i}
                className="orbit-icon"
                style={{ "--angle": `${angle}deg` } as any}
                animate={{ rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              >
                <motion.div
                  className="orbit-icon-inner"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                  style={{ color, filter: `drop-shadow(0 0 6px ${color})` }}
                >
                  <Icon size={16} />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

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
