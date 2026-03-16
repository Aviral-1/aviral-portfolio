"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";
import { fadeUp, stagger, scaleIn } from "@/lib/ui-utils";

export default function Experience() {
  return (
    <section id="experience" className="section u-corner">
      <motion.div className="container" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.08 }}>
        <motion.p variants={fadeUp} className="eyebrow">03 — Experience</motion.p>
        <motion.h2 variants={fadeUp} className="sec-h2">Professional Journey</motion.h2>

        <div className="exp-timeline">
          <div className="et-line" />
          
          <motion.div 
            className="et-item"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="et-marker">
               <Briefcase size={16} />
            </div>
            
            <div className="et-content u-glass">
              <div className="exp-top">
                <div className="exp-left">
                  <h3 className="exp-role">Software Engineer</h3>
                  <span className="exp-co">Dvertex Info Tech Pvt. Ltd.</span>
                </div>
                <div className="exp-meta">
                  <span className="exp-badge">Aug 2022 – Present · 3+ yrs</span>
                  <span className="exp-loc"><MapPin size={12} /> Greater Noida, India</span>
                </div>
              </div>

              <div className="exp-bullets">
                {[
                  "Designed full-scale municipal dashboards for SafaiMitra — HRMS, analytics, and waste route monitoring.",
                  "Built Suraksha Mitra Police Patrol System — QR-based evidence logging and GIS tracking.",
                  "Developed Smart Bin IoT Dashboard — real-time sensor monitoring and automated alerts.",
                  "Architected a reusable component library that reduced dev time by 40% across flagship projects.",
                ].map((b, i) => (
                  <motion.div key={i} className="bullet" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }}>
                    <span className="bdot" />
                    <p>{b}</p>
                  </motion.div>
                ))}
              </div>

              <div className="exp-tags">
                {["React.js", "TypeScript", "Tailwind CSS", "Leaflet", "Data-Viz", "NestJS"].map(t => (
                  <span key={t} className="etag">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <style jsx>{`
          .exp-timeline {
            position: relative;
            margin-top: 4rem;
            padding-left: 3rem;
          }

          .et-line {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 2px;
            background: linear-gradient(to bottom, var(--primary), var(--accent), transparent);
            opacity: 0.1;
          }

          .et-item {
            position: relative;
            margin-bottom: 4rem;
          }

        .et-marker {
          position: absolute;
          left: -48px;
          top: 0;
          width: 48px;
          height: 48px;
          background: var(--bg);
          border: 1px solid var(--primary);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
          z-index: 2;
          box-shadow: 0 0 20px var(--primary-glow);
        }

        .et-content {
          padding: 3rem;
          border-radius: var(--r-xl);
          border: 1px solid var(--border-bright) !important;
          background: rgba(255, 255, 255, 0.01);
          box-shadow: 0 30px 60px -10px rgba(0,0,0,0.6);
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }
        .et-content:hover { 
          border-color: var(--primary) !important; 
          transform: translateX(12px);
          background: rgba(255, 255, 255, 0.03);
        }

        .exp-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 2rem;
          margin-bottom: 2.5rem;
          border-bottom: 1px solid var(--border);
          padding-bottom: 2rem;
          position: relative;
          z-index: 1;
        }

        .exp-role { font-size: 2rem; font-weight: 900; color: #fff; line-height: 1; letter-spacing: -0.02em; }
        .exp-co { font-size: 0.9rem; color: var(--primary); font-family: var(--font-mono); font-weight: 800; text-transform: uppercase; margin-top: 0.75rem; display: block; letter-spacing: 0.1rem; }
        
        .exp-meta { display: flex; flex-direction: column; align-items: flex-end; gap: 0.75rem; text-align: right; }
        .exp-badge { font-size: 0.7rem; font-family: var(--font-mono); color: #fff; background: rgba(255,255,255,0.05); border: 1px solid var(--border); padding: 5px 12px; border-radius: 4px; font-weight: 800; }
        .exp-loc { font-size: 0.7rem; color: var(--text-muted); display: flex; align-items: center; gap: 6px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05rem; }

        .exp-bullets { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2.5rem; position: relative; z-index: 1; }
        .bullet { display: flex; gap: 15px; font-size: 1.05rem; color: var(--text-dim); line-height: 1.8; }
        .bdot { width: 6px; height: 6px; background: var(--primary); border-radius: 50%; margin-top: 10px; flex-shrink: 0; box-shadow: 0 0 10px var(--primary); }

        .exp-tags { display: flex; flex-wrap: wrap; gap: 0.75rem; position: relative; z-index: 1; }
        .etag { font-size: 0.75rem; padding: 6px 16px; border-radius: 50px; background: rgba(255,255,255,0.02); border: 1px solid var(--border); color: var(--text-dim); font-weight: 700; transition: all 0.3s ease; }
        .etag:hover { border-color: var(--primary); background: oklch(from var(--primary) l c h / 0.05); }

          @media (max-width: 960px) {
            .exp-top { flex-direction: column; gap: 1.5rem; align-items: flex-start; }
            .exp-meta { align-items: flex-start; text-align: left; }
            .exp-role { font-size: 1.75rem; }
            .et-content { padding: 2rem; }
            .exp-timeline { padding-left: 2rem; }
            .et-marker { left: -38px; width: 38px; height: 38px; }
          }
        `}</style>
      </motion.div>
    </section>
  );
}
