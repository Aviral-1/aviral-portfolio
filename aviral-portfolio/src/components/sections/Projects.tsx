"use client";

import React, { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Heart, Cpu } from "lucide-react";
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
    type: "personal",
    description:
      "A comprehensive healthcare SaaS platform — AI-powered health analysis engine, patient management, appointment scheduling, and real-time health dashboards. Built with NestJS REST APIs, dual-database architecture (MongoDB + PostgreSQL), deployed on AWS Amplify.",
    tech: ["React.js", "NestJS", "MongoDB", "PostgreSQL", "Tailwind CSS", "AWS Amplify"],
    highlights: ["AI Health Analysis", "Patient Dashboard", "NestJS REST API", "Dual-DB Architecture", "AWS Amplify Deploy", "Real-time Insights"],
    scope: "Personal Project · Full-stack · Cloud Deployed",
  },
  {
    title: "SafaiMitra Platform",
    tag: "Smart City · Municipal",
    tagLineSub: "Urban Waste & HRMS",
    color: "#10b981",
    gradFrom: "#10b981",
    gradTo: "#06b6d4",
    emoji: "🏙️",
    featured: false,
    type: "professional",
    description:
      "Full-scale smart-city municipal management platform — HRMS, property tax analytics, waste route monitoring, ward-level insights, and complaint workflow. Live across 5+ Indian cities.",
    tech: ["React.js", "Recharts", "Google Maps API", "Node.js", "REST API"],
    highlights: ["HRMS Module", "Property Tax Analytics", "Waste Route Monitoring", "Complaint Workflow"],
    scope: "Ajmer · Prayagraj · Lucknow · Ayodhya · Mankapur",
  },
  {
    title: "Suraksha Mitra",
    tag: "Police Patrol · GIS",
    tagLineSub: "QR Evidence & Route Tracking",
    color: "#3b82f6",
    gradFrom: "#3b82f6",
    gradTo: "#06b6d4",
    emoji: "🛡️",
    featured: false,
    type: "professional",
    description:
      "Police patrol & QR-based evidence tracking system — district heatmaps, real-time route tracking, role-wise access dashboards, and field QR validation workflows.",
    tech: ["React.js", "Leaflet", "GeoJSON", "Role-Based Auth", "QR Integration"],
    highlights: ["QR Evidence Logs", "District Heatmaps", "Route Tracking", "Role-Wise Dashboard"],
    scope: "Multi-district deployment",
  },
  {
    title: "Smart Bin IoT",
    tag: "IoT · Real-time Analytics",
    tagLineSub: "Sensor Monitoring Dashboard",
    color: "#f59e0b",
    gradFrom: "#f59e0b",
    gradTo: "#f97316",
    emoji: "♻️",
    featured: false,
    type: "professional",
    description:
      "Real-time IoT sensor monitoring for smart waste management — bin fill-level gauges, alert automation, geo-mapped sensors, pickup scheduling, and reporting engine.",
    tech: ["React.js", "ApexCharts", "Google Maps", "WebSockets", "REST API"],
    highlights: ["Real-time Monitoring", "Alert System", "Map Sensors", "Reporting Engine"],
    scope: "City-wide deployment",
  },
];

const ProjectCard = memo(function ProjectCard({ project, index }: { project: any, index: number }) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <TiltCard className="proj-card-wrap">
      <motion.div
        className="proj-card u-glass"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1, duration: 0.8, ease }}
        viewport={{ once: true }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="pc-aura" style={{ background: `radial-gradient(circle at 0% 0%, ${project.color}15, transparent 60%)` }} />
        <div className="pc-content">
          <div className="pc-top">
            <span className="pc-type-tag" style={{ color: project.color }}>
              {project.emoji || '✦'} {project.tag}
            </span>
            <div className="pc-ext-btn">
              <ExternalLink size={14} />
            </div>
          </div>

          <div className="pc-body">
            <h3 className="pc-title">{project.title}</h3>
            <p className="pc-desc">{project.description}</p>
          </div>

          <div className="pc-footer">
            <div className="pc-tech-row">
              {project.tech.slice(0, 3).map((t: string) => (
                <span key={t} className="pc-tech-pill">
                  {t}
                </span>
              ))}
              {project.tech.length > 3 && <span className="pc-tech-more">+{project.tech.length - 3}</span>}
            </div>
          </div>
        </div>
      </motion.div>
    </TiltCard>
  );
});

export default function Projects() {
  return (
    <section id="projects" className="section sec-alt u-corner">
      <div className="grid-overlay" />
      <motion.div className="container" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }}>
        <motion.p variants={fadeUp} className="eyebrow">04 — Projects</motion.p>
        <motion.h2 variants={fadeUp} className="sec-h2">Technical <span className="grad-text">Workflows</span></motion.h2>
        <motion.p variants={fadeUp} className="sec-sub">Engineered platforms spanning healthcare, smart-city, and real-time GIS systems.</motion.p>

        {/* Featured — Healvora */}
        <motion.div variants={scaleIn} className="proj-featured u-crystal">
          <div className="pf-glow" style={{ background: `radial-gradient(circle at 20% 50%, ${projects[0].gradFrom}10, transparent 70%)` }} />
          <div className="pf-inner">
            <div className="pf-left">
              <div className="pf-header-top">
                <span className="pf-personal-tag">✦ SYSTEM_ARCH_01</span>
                <span className="pf-tag" style={{ color: projects[0].color, borderColor: `${projects[0].color}40`, background: `${projects[0].color}05` }}>
                  {projects[0].emoji} {projects[0].tag}
                </span>
              </div>
              <h3 className="pf-title">{projects[0].title}</h3>
              <p className="pf-sub">{projects[0].tagLineSub}</p>
              <p className="pf-desc">{projects[0].description}</p>

              <div className="pf-highlights">
                {projects[0].highlights.map((h: string) => (
                  <span key={h} className="pf-hl">
                    {h}
                  </span>
                ))}
              </div>

              <div className="pf-stack">
                {projects[0].tech.map((t: string) => (
                  <span key={t} className="pf-tech">{t}</span>
                ))}
              </div>
            </div>

            <div className="pf-right">
              <div className="health-mockup u-glass">
                <div className="hm-header">
                  <Heart size={16} className="hm-heart" />
                  <span>CORE_ENGINE_v4</span>
                  <div className="hm-live"><div className="hm-dot" />ACTIVE</div>
                </div>
                {[
                  { label: "AI Diagnostic", val: "Running", pct: 92, color: "#ec4899" },
                  { label: "Data Latency", val: "14ms", pct: 15, color: "#10b981" },
                  { label: "Sync Status", val: "Optimal", pct: 98, color: "#06b6d4" },
                ].map((item, i) => (
                  <div key={item.label} className="hm-row">
                    <div className="hm-row-top">
                      <span className="hm-lbl">{item.label}</span>
                      <span className="hm-val">{item.val}</span>
                    </div>
                    <div className="hm-track">
                      <motion.div
                        className="hm-fill"
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

        {/* Other projects grid */}
        <div className="other-projects" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))', gap: '2rem', marginTop: '4rem' }}>
          {projects.slice(1).map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>

        <motion.div variants={fadeUp} className="gh-cta" style={{ marginTop: '4rem', textAlign: 'center' }}>
          <a href="https://github.com/Aviral-1" target="_blank" rel="noopener noreferrer" className="gh-btn u-glass" style={{ border: '2px dashed var(--border)', padding: '1rem 2rem', display: 'inline-flex', alignItems: 'center', gap: '1rem', borderRadius: '12px' }}>
            <Github size={18} /> SYSTEM_REPOSITORY_HUB <ExternalLink size={14} />
          </a>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .proj-card {
          position: relative;
          height: 100%;
          border: 1px solid var(--border-bright) !important;
          border-radius: var(--r-lg);
          background: rgba(255, 255, 255, 0.01);
          padding: 2.5rem;
          overflow: hidden;
          transition: all 0.4s ease;
        }
        .proj-card:hover {
          background: rgba(255, 255, 255, 0.04);
          transform: translateY(-8px);
          border-color: var(--primary) !important;
        }

        .pc-aura { position: absolute; inset: 0; pointer-events: none; opacity: 0.4; }
        .pc-content { position: relative; z-index: 2; height: 100%; display: flex; flex-direction: column; gap: 1.5rem; }

        .pc-top { display: flex; align-items: center; justify-content: space-between; }
        .pc-type-tag { font-size: 0.65rem; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; font-family: var(--font-mono); }
        .pc-ext-btn { color: var(--text-muted); opacity: 0.5; }

        .pc-title { font-size: 1.75rem; font-weight: 900; color: #fff; margin: 0; line-height: 1; letter-spacing: -0.02em; }
        .pc-desc { font-size: 0.95rem; line-height: 1.7; color: var(--text-dim); }

        .pc-footer { margin-top: auto; }
        .pc-tech-row { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; }
        .pc-tech-pill { font-size: 0.65rem; background: rgba(255,255,255,0.03); padding: 4px 10px; border-radius: 4px; color: var(--text-muted); font-weight: 700; border: 1px solid var(--border); }
        .pc-tech-more { font-size: 0.6rem; color: var(--primary); font-weight: 800; font-family: var(--font-mono); }

        .proj-featured {
          position: relative;
          border-radius: var(--r-xl);
          border: 1px solid var(--border-bright) !important;
          background: rgba(255, 255, 255, 0.02);
          padding: 4rem;
          margin-top: var(--sp-lg);
          overflow: hidden;
          box-shadow: 0 40px 100px -20px oklch(0 0 0 / 0.8);
        }
        .pf-glow { position: absolute; inset: 0; pointer-events: none; opacity: 0.2; }
        .pf-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; position: relative; z-index: 2; align-items: center; }
        
        .pf-personal-tag { font-size: 0.7rem; font-weight: 900; color: var(--primary); font-family: var(--font-mono); letter-spacing: 0.3em; margin-bottom: 1rem; display: block; }
        .pf-title { font-size: clamp(3rem, 6vw, 4.5rem); font-weight: 900; color: #fff; margin-bottom: 0.75rem; letter-spacing: -0.04em; line-height: 0.9; }
        .pf-sub { font-size: 1.25rem; color: var(--text-dim); margin-bottom: 2rem; font-weight: 600; }
        .pf-desc { font-size: 1.1rem; line-height: 1.8; color: var(--text-dim); margin-bottom: 2.5rem; }

        .pf-highlights { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2.5rem; }
        .pf-hl { padding: 0.6rem 1.2rem; background: rgba(255,255,255,0.02); border: 1px solid var(--border); border-radius: 50px; font-size: 0.8rem; color: #fff; font-weight: 700; transition: all 0.3s ease; }
        .pf-hl:hover { border-color: var(--primary); background: oklch(from var(--primary) l c h / 0.05); }
        
        .pf-stack { display: flex; flex-wrap: wrap; gap: 1rem; padding-top: 2rem; border-top: 1px solid var(--border); }
        .pf-tech { font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono); font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; }

        .health-mockup {
          padding: 3rem;
          border-radius: var(--r-xl);
          background: rgba(0,0,0,0.5);
          border: 1px solid var(--border-bright);
          box-shadow: 0 60px 120px -30px rgba(0,0,0,0.9);
          transform: perspective(1000px) rotateY(-5deg) rotateX(5deg);
        }
        .hm-header { display: flex; align-items: center; gap: 15px; font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono); border-bottom: 1px solid var(--border); padding-bottom: 1.5rem; margin-bottom: 2.5rem; }
        .hm-live { margin-left: auto; color: var(--emerald); font-weight: 900; font-size: 0.7rem; letter-spacing: 0.2em; display: flex; align-items: center; gap: 8px; }
        .hm-dot { width: 8px; height: 8px; background: var(--emerald); border-radius: 50%; box-shadow: 0 0 15px var(--emerald); }
        .hm-row { margin-bottom: 2rem; }
        .hm-row:last-child { margin-bottom: 0; }
        .hm-row-top { display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 0.75rem; font-weight: 700; color: #fff; }
        .hm-track { height: 6px; background: rgba(255,255,255,0.03); border-radius: 10px; overflow: hidden; }
        .hm-fill { height: 100%; border-radius: 10px; }

        @media (max-width: 1024px) {
          .pf-inner { grid-template-columns: 1fr; gap: 4rem; }
          .proj-featured { padding: 2.5rem; }
          .pf-title { font-size: 2.5rem; }
          .health-mockup { transform: none; padding: 2rem; }
        }
      `}</style>
    </section>
  );
}
