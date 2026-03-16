"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, MapPin } from "lucide-react";
import { fadeUp, stagger } from "@/lib/ui-utils";

export default function About() {
  return (
    <section id="about" className="section u-corner">
      <motion.div className="container" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.12 }}>
        <motion.p variants={fadeUp} className="eyebrow">01 — About Me</motion.p>
        <div className="about-grid">
          <motion.div variants={fadeUp}>
            <h2 className="sec-h2">Architecting <span className="grad-text">Digital Systems</span><br />with precision</h2>
            <div className="about-bio">
              <p className="about-p">
                I specialize in building <strong className="hl-cyan">high-performance dashboards</strong> and <strong className="hl-cyan">GIS-driven platforms</strong>. 
                My focus is on modular architecture, real-time data flow, and sophisticated user interfaces that solve complex urban challenges.
              </p>
              <div className="about-stats u-glass">
                <div className="stat">
                  <span className="stat-num">3+</span>
                  <span className="stat-lbl">Years Exp</span>
                </div>
                <div className="stat-sep" />
                <div className="stat">
                  <span className="stat-num">5+</span>
                  <span className="stat-lbl">Cities Deployed</span>
                </div>
                <div className="stat-sep" />
                <div className="stat">
                  <span className="stat-num">40%</span>
                  <span className="stat-lbl">Dev Speedup</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="tl-col">
            {[
              { type: "work", date: "2022 – NOW", title: "Software Engineer", sub: "Dvertex Info Tech", icon: <Briefcase size={14} /> },
              { type: "edu", date: "2024", title: "B.Tech — IT", sub: "AKTU University", icon: <GraduationCap size={14} /> },
              { type: "edu", date: "2018", title: "12th Standard", sub: "St. Michael Convent", icon: <GraduationCap size={14} /> },
            ].map((item, i) => (
              <motion.div key={i} className="tl-item-mini" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                <div className={`tl-icon-mini ${item.type}`}>{item.icon}</div>
                <div className="tl-body-mini">
                  <h4 className="tl-title-mini">{item.title}</h4>
                  <span className="tl-sub-mini">{item.sub} — {item.date}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <style jsx>{`
          .about-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 4rem; align-items: center; margin-top: 3rem; }
          .about-bio { margin-top: 2.5rem; display: flex; flex-direction: column; gap: 2.5rem; }
          .about-stats {
            display: flex;
            align-items: center;
            padding: 2rem 3rem;
            border-radius: var(--r-xl);
            border: 1px solid var(--border-bright) !important;
            gap: 3rem;
            width: fit-content;
            background: rgba(255, 255, 255, 0.01);
            box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          }
          .stat { display: flex; flex-direction: column; gap: 4px; }
          .stat-num { font-size: 2.5rem; font-weight: 900; color: #fff; line-height: 1; letter-spacing: -0.05em; }
          .stat-lbl { font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.15em; font-weight: 800; }
          .stat-sep { width: 1px; height: 40px; background: var(--border); opacity: 0.5; }
          
          .tl-col { display: flex; flex-direction: column; gap: 1.5rem; justify-content: center; }
          .tl-item-mini { display: flex; align-items: center; gap: 1.5rem; padding: 1.5rem; border-radius: 12px; background: rgba(255,255,255,0.01); border: 1px solid transparent; transition: all 0.3s ease; }
          .tl-item-mini:hover { background: rgba(255,255,255,0.03); border-color: var(--border-bright); transform: translateX(10px); }
          .tl-icon-mini { 
            width: 44px; height: 44px; 
            background: rgba(255,255,255,0.03); 
            border: 1px solid var(--border-bright); 
            border-radius: 10px; 
            display: flex; align-items: center; justify-content: center;
            color: var(--text-muted);
            box-shadow: 0 10px 20px rgba(0,0,0,0.3);
          }
          .tl-icon-mini.work { color: var(--primary); border-color: var(--primary); }
          .tl-title-mini { font-size: 1.1rem; font-weight: 800; color: #fff; margin: 0; }
          .tl-sub-mini { font-size: 0.8rem; color: var(--text-muted); font-family: var(--font-mono); font-weight: 600; }

          @media (max-width: 1024px) {
            .about-grid { grid-template-columns: 1fr; gap: 4rem; }
          }
          @media (max-width: 768px) {
            .about-stats { width: 100%; justify-content: space-between; gap: 1rem; padding: 1.5rem; }
            .stat-num { font-size: 1.5rem; }
            .stat-lbl { font-size: 0.6rem; }
            .tl-item-mini { padding: 1rem; }
          }
        `}</style>
      </motion.div>
    </section>
  );
}
