"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, ChevronDown, ExternalLink } from "lucide-react";
import { fadeUp, stagger } from "@/lib/ui-utils";

const experiences = [
  {
    id: 1,
    role: "Software Engineer",
    company: "Dvertex Info Tech Pvt. Ltd.",
    period: "Aug 2022 – Present",
    duration: "3+ years",
    location: "Greater Noida, India",
    type: "Full-time",
    color: "var(--primary)",
    tags: ["React.js", "TypeScript", "Tailwind CSS", "Leaflet", "NestJS", "Node.js"],
    bullets: [
      "Designed full-scale municipal dashboards for SafaiMitra — HRMS, analytics, and waste route monitoring across 5+ cities.",
      "Built Suraksha Mitra Police Patrol System — QR-based evidence logging, district heatmaps, and GIS route tracking.",
      "Developed Smart Bin IoT Dashboard — real-time sensor monitoring, alert automation, and pickup scheduling engine.",
      "Architected a reusable component library that reduced development time by 40% across flagship projects.",
    ],
    highlight: "5+ Cities · 10+ Modules · Production Live",
    current: true,
  },
];

export default function Experience() {
  const [expanded, setExpanded] = useState<number | null>(1);

  return (
    <section id="experience" className="exp-section">
      <motion.div
        className="container"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.08 }}
      >
        <motion.p variants={fadeUp} className="eyebrow">
          03 — Experience
        </motion.p>
        <motion.h2 variants={fadeUp} className="sec-h2">
          Professional <span className="grad-text">Journey</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="sec-sub">
          3+ years shipping production-grade systems across India&apos;s smart-city landscape.
        </motion.p>

        <div className="exp-timeline">
          <div className="exp-line" />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              className="exp-entry"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Dot */}
              <div className="exp-dot" style={{ borderColor: exp.color, boxShadow: `0 0 20px ${exp.color}40` }}>
                <Briefcase size={14} color={exp.color} />
              </div>

              {/* Card */}
              <div className={`exp-card ${expanded === exp.id ? "is-open" : ""}`}>
                <div
                  className="exp-card-header"
                  onClick={() => setExpanded(expanded === exp.id ? null : exp.id)}
                >
                  <div className="exp-card-glow" style={{ background: `radial-gradient(circle at 0% 0%, ${exp.color}12, transparent 60%)` }} />

                  <div className="exp-header-left">
                    <div className="exp-meta-top">
                      {exp.current && <span className="exp-live">● CURRENT</span>}
                      <span className="exp-type">{exp.type}</span>
                    </div>
                    <h3 className="exp-role">{exp.role}</h3>
                    <div className="exp-company-row">
                      <span className="exp-company" style={{ color: exp.color }}>
                        {exp.company}
                      </span>
                      <ExternalLink size={12} className="exp-ext" />
                    </div>
                  </div>

                  <div className="exp-header-right">
                    <div className="exp-badge">{exp.period}</div>
                    <div className="exp-duration">{exp.duration}</div>
                    <div className="exp-loc">
                      <MapPin size={11} /> {exp.location}
                    </div>
                    <motion.div
                      className="exp-caret"
                      animate={{ rotate: expanded === exp.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={18} />
                    </motion.div>
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {expanded === exp.id && (
                    <motion.div
                      className="exp-body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <div className="exp-body-inner">
                        <div className="exp-highlight">
                          <span>◆ {exp.highlight}</span>
                        </div>

                        <ul className="exp-bullets">
                          {exp.bullets.map((b, bi) => (
                            <motion.li
                              key={`bullet-${exp.id}-${bi}`}
                              className="exp-bullet"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: bi * 0.07 }}
                            >
                              <span className="bullet-dot" style={{ background: exp.color }} />
                              <p>{b}</p>
                            </motion.li>
                          ))}
                        </ul>

                        <div className="exp-tags">
                          {exp.tags.map((t, ti) => (
                            <span key={`${exp.id}-tag-${ti}`} className="exp-tag">{t}</span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <style>{`
        .exp-section { padding: var(--sp-2xl) 0; }
        .exp-timeline {
          position: relative;
          margin-top: 4rem;
          padding-left: 3.5rem;
        }
        .exp-line {
          position: absolute;
          left: 0;
          top: 24px;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, var(--primary), transparent);
          opacity: 0.2;
        }
        .exp-entry { position: relative; }
        .exp-dot {
          position: absolute;
          left: -3.5rem;
          top: 24px;
          width: 48px;
          height: 48px;
          border-radius: 14px;
          border: 1.5px solid;
          background: var(--bg);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        /* Card */
        .exp-card {
          background: rgba(255,255,255,0.015);
          border: 1px solid var(--border-bright);
          border-radius: 20px;
          overflow: hidden;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .exp-card.is-open, .exp-card:hover {
          border-color: var(--primary);
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        }

        .exp-card-header {
          position: relative;
          padding: 2.5rem;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 2rem;
          cursor: pointer;
          overflow: hidden;
        }
        .exp-card-glow { position: absolute; inset: 0; pointer-events: none; }

        .exp-header-left { flex: 1; position: relative; z-index: 1; }
        .exp-meta-top { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; }
        .exp-live {
          font-size: 0.6rem;
          font-weight: 900;
          color: var(--primary);
          letter-spacing: 0.15em;
        }
        .exp-type {
          font-size: 0.6rem;
          font-weight: 700;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border);
          padding: 3px 10px;
          border-radius: 4px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .exp-role {
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 900;
          color: #fff;
          margin: 0 0 0.5rem;
          letter-spacing: -0.03em;
        }
        .exp-company-row { display: flex; align-items: center; gap: 6px; }
        .exp-company {
          font-size: 0.85rem;
          font-family: var(--font-mono);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .exp-ext { color: var(--text-muted); opacity: 0.6; }

        .exp-header-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.5rem;
          flex-shrink: 0;
          position: relative;
          z-index: 1;
        }
        .exp-badge {
          font-size: 0.7rem;
          font-family: var(--font-mono);
          font-weight: 800;
          padding: 5px 12px;
          border-radius: 6px;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border-bright);
          color: #fff;
          white-space: nowrap;
        }
        .exp-duration { font-size: 0.7rem; color: var(--primary); font-weight: 800; font-family: var(--font-mono); }
        .exp-loc {
          font-size: 0.7rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 4px;
          font-weight: 700;
        }
        .exp-caret { color: var(--text-muted); margin-top: 0.25rem; }

        /* Body */
        .exp-body { overflow: hidden; }
        .exp-body-inner {
          padding: 0 2.5rem 2.5rem;
          border-top: 1px solid var(--border);
        }
        .exp-highlight {
          margin: 1.5rem 0;
          font-size: 0.75rem;
          font-family: var(--font-mono);
          font-weight: 800;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }
        .exp-bullets { list-style: none; padding: 0; margin: 0 0 2rem; display: flex; flex-direction: column; gap: 1rem; }
        .exp-bullet { display: flex; gap: 14px; align-items: flex-start; }
        .bullet-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 9px;
          box-shadow: 0 0 8px currentColor;
        }
        .exp-bullet p { font-size: 1rem; line-height: 1.75; color: var(--text-dim); margin: 0; }

        .exp-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .exp-tag {
          font-size: 0.75rem;
          padding: 6px 14px;
          border-radius: 50px;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border);
          color: var(--text-dim);
          font-weight: 700;
          transition: all 0.2s ease;
        }
        .exp-tag:hover { border-color: var(--primary); color: #fff; }

        @media (max-width: 768px) {
          .exp-timeline { padding-left: 2.5rem; }
          .exp-dot { left: -2.75rem; width: 40px; height: 40px; }
          .exp-card-header { flex-direction: column; gap: 1.5rem; }
          .exp-header-right { align-items: flex-start; }
          .exp-body-inner { padding: 0 1.5rem 1.5rem; }
        }
      `}</style>
    </section>
  );
}
