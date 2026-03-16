"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Heart, Cpu, ArrowUpRight } from "lucide-react";
import { fadeUp, stagger, scaleIn, TiltCard, ease } from "@/lib/ui-utils";

const projects = [
  {
    title: "Healvora",
    tag: "Healthcare Innovation",
    tagLineSub: "AI Health Analysis System",
    color: "#ec4899",
    gradFrom: "#ec4899",
    gradTo: "#8b5cf6",
    emoji: "🧬",
    featured: true,
    type: "Personal",
    description:
      "A comprehensive healthcare SaaS platform — AI-powered health analysis engine, patient management, appointment scheduling, and real-time health dashboards. Built with NestJS REST APIs, dual-database architecture.",
    tech: ["React.js", "NestJS", "MongoDB", "PostgreSQL", "Tailwind CSS", "AWS Amplify"],
    highlights: ["AI Health Analysis", "Patient Dashboard", "NestJS REST API", "Dual-DB", "AWS Deploy", "Real-time Insights"],
  },
  {
    title: "SafaiMitra Platform",
    tag: "Smart City · Municipal",
    tagLineSub: "Urban Waste & HRMS",
    color: "#10b981",
    emoji: "🏙️",
    type: "Professional",
    description:
      "Full-scale smart-city municipal management platform — HRMS, property tax analytics, waste route monitoring, ward-level insights, and complaint workflow. Live across 5+ Indian cities.",
    tech: ["React.js", "Recharts", "Google Maps API", "Node.js", "REST API"],
    highlights: ["HRMS Module", "Property Tax Analytics", "Waste Route Monitoring", "Complaint Workflow"],
  },
  {
    title: "Suraksha Mitra",
    tag: "Police Patrol · GIS",
    tagLineSub: "QR Evidence & Route Tracking",
    color: "#3b82f6",
    emoji: "🛡️",
    type: "Professional",
    description:
      "Police patrol & QR-based evidence tracking system — district heatmaps, real-time route tracking, role-wise access dashboards, and field QR validation workflows.",
    tech: ["React.js", "Leaflet", "GeoJSON", "Role-Based Auth", "QR Integration"],
    highlights: ["QR Evidence Logs", "District Heatmaps", "Route Tracking", "Role-Wise Dashboard"],
  },
  {
    title: "Smart Bin IoT",
    tag: "IoT · Real-time Analytics",
    tagLineSub: "Sensor Monitoring Dashboard",
    color: "#f59e0b",
    emoji: "♻️",
    type: "Professional",
    description:
      "Real-time IoT sensor monitoring for smart waste management — bin fill-level gauges, alert automation, geo-mapped sensors, pickup scheduling, and reporting engine.",
    tech: ["React.js", "ApexCharts", "Google Maps", "WebSockets", "REST API"],
    highlights: ["Real-time Monitoring", "Alert System", "Map Sensors", "Reporting Engine"],
  },
];

const ProjectCard = memo(function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  return (
    <TiltCard className="pc-tilt">
      <motion.div
        className="proj-card"
        style={{ "--proj-color": project.color } as React.CSSProperties}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.6, ease }}
        viewport={{ once: true }}
      >
        <div className="pc-aura" />
        <div className="pc-inner">
          <div className="pc-top">
            <span className="pc-tag">{project.emoji} {project.tag}</span>
            <span className="pc-type-badge">{project.type}</span>
          </div>
          <h3 className="pc-title">{project.title}</h3>
          <p className="pc-sub">{project.tagLineSub}</p>
          <p className="pc-desc">{project.description}</p>
          <div className="pc-footer">
            <div className="pc-tech-row">
              {project.tech.slice(0, 3).map((t) => (
                <span key={t} className="pc-pill">{t}</span>
              ))}
              {project.tech.length > 3 && <span className="pc-more">+{project.tech.length - 3}</span>}
            </div>
            <div className="pc-actions">
              <div className="pc-action-btn" style={{ color: project.color }}>
                <ExternalLink size={15} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </TiltCard>
  );
});

export default function Projects() {
  const featured = projects[0];
  const rest = projects.slice(1);

  return (
    <section id="projects" className="projects-section">
      <div className="grid-overlay" />
      <motion.div
        className="container"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.04 }}
      >
        <motion.p variants={fadeUp} className="eyebrow">04 — Projects</motion.p>
        <motion.h2 variants={fadeUp} className="sec-h2">
          Technical <span className="grad-text">Workflows</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="sec-sub">
          Engineered platforms spanning healthcare, smart-city, and real-time GIS systems.
        </motion.p>

        {/* Featured Card */}
        <motion.div variants={scaleIn} className="feat-card">
          <div className="feat-glow" style={{ background: `radial-gradient(circle at 20% 50%, ${featured.gradFrom}10, transparent 70%)` }} />
          <div className="feat-inner">
            <div className="feat-left">
              <div className="feat-meta-row">
                <span className="feat-label">✦ FEATURED PROJECT</span>
                <span className="feat-tag" style={{ color: featured.color, borderColor: `${featured.color}40`, background: `${featured.color}08` }}>
                  {featured.emoji} {featured.tag}
                </span>
              </div>
              <h3 className="feat-title">{featured.title}</h3>
              <p className="feat-sub">{featured.tagLineSub}</p>
              <p className="feat-desc">{featured.description}</p>

              <div className="feat-highlights">
                {featured.highlights.map((h) => (
                  <span key={h} className="feat-hl">{h}</span>
                ))}
              </div>

              <div className="feat-stack">
                {featured.tech.map((t) => (
                  <span key={t} className="feat-tech-pill">{t}</span>
                ))}
              </div>

              <div className="feat-actions">
                <a href="https://github.com/Aviral-1" target="_blank" rel="noopener noreferrer" className="feat-btn feat-btn--sec">
                  <Github size={16} /> View on GitHub
                </a>
                <a href="#" className="feat-btn feat-btn--pri" style={{ background: featured.color }}>
                  <ArrowUpRight size={16} /> Live Demo
                </a>
              </div>
            </div>

            <div className="feat-right">
              <div className="feat-mockup">
                <div className="fm-bar">
                  <Heart size={14} className="fm-heart" />
                  <span>CORE_ENGINE_v4</span>
                  <div className="fm-live"><div className="fm-dot" />ACTIVE</div>
                </div>
                {[
                  { label: "AI Diagnostic", val: "Running", pct: 92, color: "#ec4899" },
                  { label: "Data Latency", val: "14ms", pct: 15, color: "#10b981" },
                  { label: "Sync Status", val: "Optimal", pct: 98, color: "#06b6d4" },
                ].map((item, i) => (
                  <div key={item.label} className="fm-row">
                    <div className="fm-row-head">
                      <span>{item.label}</span>
                      <span className="fm-val">{item.val}</span>
                    </div>
                    <div className="fm-track">
                      <motion.div
                        className="fm-fill"
                        style={{ background: item.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.pct}%` }}
                        transition={{ duration: 1.5, delay: i * 0.2, ease }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other projects */}
        <div className="other-grid">
          {rest.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
        </div>

        <motion.div variants={fadeUp} className="gh-link-row">
          <a href="https://github.com/Aviral-1" target="_blank" rel="noopener noreferrer" className="gh-link">
            <Github size={18} /> View all projects on GitHub <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </motion.div>

      <style>{`
        .projects-section {
          padding: var(--sp-2xl) 0;
          position: relative;
          background: var(--bg-alt);
        }
        /* Featured */
        .feat-card {
          position: relative;
          border-radius: 24px;
          border: 1px solid var(--border-bright);
          background: rgba(255,255,255,0.015);
          padding: 4rem;
          margin-top: 4rem;
          overflow: hidden;
          box-shadow: 0 40px 100px -20px rgba(0,0,0,0.8);
          transition: border-color 0.3s ease;
        }
        .feat-card:hover { border-color: rgba(255,255,255,0.15); }
        .feat-glow { position: absolute; inset: 0; pointer-events: none; opacity: 0.3; }
        .feat-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; position: relative; z-index: 1; }

        .feat-meta-row { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.25rem; flex-wrap: wrap; }
        .feat-label {
          font-size: 0.65rem;
          font-weight: 900;
          color: var(--primary);
          font-family: var(--font-mono);
          letter-spacing: 0.25em;
          text-transform: uppercase;
        }
        .feat-tag {
          font-size: 0.7rem;
          font-weight: 800;
          padding: 5px 14px;
          border-radius: 50px;
          border: 1px solid;
          letter-spacing: 0.06em;
        }
        .feat-title { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 900; color: #fff; margin: 0 0 0.5rem; letter-spacing: -0.04em; line-height: 0.95; }
        .feat-sub { font-size: 1.15rem; color: var(--text-dim); margin-bottom: 1.5rem; font-weight: 600; }
        .feat-desc { font-size: 1rem; line-height: 1.8; color: var(--text-dim); margin-bottom: 2rem; }

        .feat-highlights { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem; }
        .feat-hl {
          padding: 6px 14px;
          border-radius: 50px;
          border: 1px solid var(--border);
          font-size: 0.75rem;
          color: var(--text-dim);
          font-weight: 700;
          transition: all 0.2s ease;
        }
        .feat-hl:hover { border-color: var(--primary); color: #fff; }

        .feat-stack { display: flex; flex-wrap: wrap; gap: 0.75rem; padding-top: 1.5rem; border-top: 1px solid var(--border); margin-bottom: 2rem; }
        .feat-tech-pill { font-size: 0.7rem; color: var(--text-muted); font-family: var(--font-mono); font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; }

        .feat-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
        .feat-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 800;
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .feat-btn--sec {
          border: 1px solid var(--border-bright);
          color: #fff;
          background: rgba(255,255,255,0.03);
        }
        .feat-btn--sec:hover { border-color: var(--primary); background: rgba(255,255,255,0.06); }
        .feat-btn--pri {
          border: none;
          color: #000;
          font-weight: 900;
        }
        .feat-btn--pri:hover { opacity: 0.85; transform: translateY(-2px); box-shadow: 0 10px 30px rgba(0,0,0,0.4); }

        /* Mockup panel */
        .feat-mockup {
          background: rgba(0,0,0,0.5);
          border: 1px solid var(--border-bright);
          border-radius: 20px;
          padding: 2.5rem;
          transform: perspective(1000px) rotateY(-5deg) rotateX(3deg);
          box-shadow: 0 60px 120px -30px rgba(0,0,0,0.9);
        }
        .fm-bar { display: flex; align-items: center; gap: 12px; font-size: 0.7rem; color: var(--text-muted); font-family: var(--font-mono); border-bottom: 1px solid var(--border); padding-bottom: 1.25rem; margin-bottom: 2rem; }
        .fm-live { margin-left: auto; color: var(--primary); font-weight: 900; letter-spacing: 0.15em; display: flex; align-items: center; gap: 6px; font-size: 0.65rem; }
        .fm-dot { width: 7px; height: 7px; background: var(--primary); border-radius: 50%; box-shadow: 0 0 12px var(--primary); animation: pcPulse 2s infinite; }
        .fm-row { margin-bottom: 1.75rem; }
        .fm-row:last-child { margin-bottom: 0; }
        .fm-row-head { display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 0.6rem; font-weight: 700; color: #fff; }
        .fm-val { color: var(--text-muted); font-family: var(--font-mono); font-size: 0.8rem; }
        .fm-track { height: 5px; background: rgba(255,255,255,0.04); border-radius: 10px; overflow: hidden; }
        .fm-fill { height: 100%; border-radius: 10px; }
        .fm-heart { color: #ec4899; }

        /* Other grid */
        .other-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }
        .pc-tilt { display: block; height: 100%; }
        .proj-card {
          position: relative;
          height: 100%;
          border: 1px solid var(--border-bright);
          border-radius: 20px;
          background: rgba(255,255,255,0.015);
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .proj-card:hover {
          border-color: color-mix(in srgb, var(--proj-color) 60%, transparent);
          background: rgba(255,255,255,0.035);
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }
        .pc-aura {
          position: absolute; inset: 0;
          background: radial-gradient(circle at 0% 0%, color-mix(in srgb, var(--proj-color) 15%, transparent), transparent 60%);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .proj-card:hover .pc-aura { opacity: 1; }
        .pc-inner { position: relative; z-index: 1; padding: 2.5rem; height: 100%; display: flex; flex-direction: column; gap: 1rem; }
        .pc-top { display: flex; align-items: center; justify-content: space-between; }
        .pc-tag { font-size: 0.65rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; font-family: var(--font-mono); color: var(--proj-color); }
        .pc-type-badge { font-size: 0.6rem; padding: 3px 8px; border-radius: 4px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); color: var(--text-muted); font-weight: 700; }
        .pc-title { font-size: 1.6rem; font-weight: 900; color: #fff; margin: 0; letter-spacing: -0.03em; }
        .pc-sub { font-size: 0.85rem; color: var(--primary); font-weight: 700; font-family: var(--font-mono); margin: 0; }
        .pc-desc { font-size: 0.9rem; line-height: 1.7; color: var(--text-dim); margin: 0; flex: 1; }
        .pc-footer { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-top: auto; padding-top: 1rem; border-top: 1px solid var(--border); }
        .pc-tech-row { display: flex; flex-wrap: wrap; gap: 0.4rem; align-items: center; }
        .pc-pill { font-size: 0.65rem; background: rgba(255,255,255,0.03); padding: 3px 9px; border-radius: 4px; color: var(--text-muted); font-weight: 700; border: 1px solid var(--border); }
        .pc-more { font-size: 0.65rem; color: var(--proj-color); font-weight: 900; font-family: var(--font-mono); }
        .pc-actions { display: flex; gap: 0.5rem; }
        .pc-action-btn { width: 32px; height: 32px; border-radius: 8px; border: 1px solid var(--border-bright); background: rgba(255,255,255,0.03); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s ease; }
        .pc-action-btn:hover { background: rgba(255,255,255,0.07); transform: scale(1.1); }

        /* GitHub CTA */
        .gh-link-row { margin-top: 3rem; display: flex; justify-content: center; }
        .gh-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 1rem 2rem;
          border: 1.5px dashed var(--border-bright);
          border-radius: 14px;
          color: var(--text-dim);
          text-decoration: none;
          font-weight: 700;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }
        .gh-link:hover { border-color: var(--primary); color: #fff; background: rgba(255,255,255,0.03); }

        @media (max-width: 1024px) {
          .feat-inner { grid-template-columns: 1fr; gap: 3rem; }
          .feat-card { padding: 2.5rem; }
          .feat-title { font-size: 2.5rem; }
          .feat-mockup { transform: none; padding: 2rem; }
        }
        @media (max-width: 600px) { .other-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
