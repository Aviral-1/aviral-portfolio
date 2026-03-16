"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaDocker } from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";
import { MdAnalytics } from "react-icons/md";
import { TbMap2 } from "react-icons/tb";
import { fadeUp, stagger, fadeIn, TiltCard } from "@/lib/ui-utils";

const skillGroups = [
  { 
    icon: <FaReact size={22} />, 
    label: "Frontend", 
    color: "var(--primary)", 
    details: "React 19, Hooks, Context, Framer Motion, Tailwind",
    skills: ["React.js", "JavaScript ES6+", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"] 
  },
  { 
    icon: <FaNodeJs size={22} />, 
    label: "Backend & DB", 
    color: "var(--accent-purple)", 
    details: "Node v20, Express, NestJS (REST/GraphQL), MongoDB, PostgreSQL",
    skills: ["Node.js", "Express.js", "NestJS", "MongoDB", "PostgreSQL", "Prisma", "Mongoose"] 
  },
  { 
    icon: <MdAnalytics size={22} />, 
    label: "Analytics", 
    color: "var(--accent-emerald)", 
    details: "Real-time metrics, Data vis, WebSocket streams, KPI tracking",
    skills: ["Recharts", "ApexCharts", "Chart.js", "KPI Dashboards", "Real-time Metrics"] 
  },
  { 
    icon: <TbMap2 size={22} />, 
    label: "GIS & Maps", 
    color: "var(--primary)", 
    details: "GeoJSON, Leaflet, Google Maps SDK, Heatmaps, Spatial Analysis",
    skills: ["Google Maps API", "React Google Maps", "Leaflet", "GeoJSON", "Heatmaps", "Clusters"] 
  },
  { 
    icon: <SiNextdotjs size={22} />, 
    label: "Frameworks", 
    color: "var(--accent-purple)", 
    details: "Next.js 16 (App Router), Server Actions, ISR/SSR, Meta-tags",
    skills: ["Next.js", "REST APIs", "Responsive UI", "Component Architecture", "JWT Auth"] 
  },
  { 
    icon: <FaDocker size={22} />, 
    label: "DevOps & Cloud", 
    color: "var(--accent-emerald)", 
    details: "CI/CD, Docker, AWS (S3/EC2), Amplify, Git-flow, Shell scripting",
    skills: ["Git", "GitHub", "Docker", "AWS EC2/S3", "AWS Amplify", "Linux CLI", "Figma"] 
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section sec-alt u-corner">
      <motion.div className="container" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.08 }}>
        <motion.p variants={fadeUp} className="eyebrow">02 — Tech Stack</motion.p>
        <motion.h2 variants={fadeUp} className="sec-h2">Tools & Technologies</motion.h2>
        <motion.p variants={fadeUp} className="sec-sub">A curated set of tools I use daily to ship production-grade systems.</motion.p>

        <div className="skills-grid">
          {skillGroups.map((sg, i) => (
            <TiltCard key={sg.label} className="sk-card-wrap">
              <motion.div
                className="sk-card u-glass"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.55 }}
                viewport={{ once: true }}
              >
                <div className="sk-glow" style={{ background: `radial-gradient(circle at 0px 0px, ${sg.color}15, transparent 70%)` }} />
                
                <div className="sk-head">
                  <div className="sk-icon" style={{ color: sg.color, borderColor: sg.color + "40" }}>{sg.icon}</div>
                  <div className="sk-meta">
                    <span className="sk-label" style={{ color: sg.color }}>{sg.label}</span>
                    <span className="sk-tech-bit">{sg.details}</span>
                  </div>
                </div>

                <div className="sk-chips">
                  {sg.skills.map(s => (
                    <motion.span 
                      key={s} 
                      className="sk-chip" 
                      whileHover={{ scale: 1.05, background: sg.color + "22", borderColor: sg.color + "55", color: "#fff" }}
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>

      <style jsx>{`
        .skills-grid {
           display: grid;
           grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
           gap: 2.5rem;
           margin-top: 4rem;
        }
        
        .sk-card {
          position: relative;
          padding: 3rem;
          border-radius: var(--r-xl);
          border: 1px solid var(--border-bright) !important;
          background: rgba(255, 255, 255, 0.01);
          overflow: hidden;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          transition: all 0.4s ease;
        }
        .sk-card:hover {
          background: rgba(255, 255, 255, 0.03);
          transform: translateY(-8px);
          border-color: var(--primary) !important;
        }
        
        .sk-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.3;
        }

        .sk-head {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          position: relative;
          z-index: 2;
        }

        .sk-icon {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          border: 1px solid var(--border-bright);
          background: rgba(255, 255, 255, 0.03);
          box-shadow: 0 15px 30px -10px rgba(0,0,0,0.5);
          transition: transform 0.3s ease;
        }
        .sk-card:hover .sk-icon { transform: scale(1.1) rotate(5deg); }

        .sk-meta { display: flex; flex-direction: column; gap: 0.5rem; }
        .sk-label { font-weight: 900; font-size: 1.75rem; letter-spacing: -0.03em; color: #fff; line-height: 1; }
        .sk-tech-bit { font-size: 0.7rem; font-family: var(--font-mono); font-weight: 800; text-transform: uppercase; letter-spacing: 0.15em; color: var(--text-muted); }

        .sk-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          position: relative;
          z-index: 2;
        }

        .sk-chip {
          font-size: 0.8rem;
          padding: 8px 16px;
          border-radius: 50px;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border);
          color: var(--text-dim);
          font-weight: 700;
          transition: all 0.3s ease;
        }

        .tech-row {
          margin-top: 6rem;
          display: flex;
          justify-content: center;
          opacity: 0.2;
          filter: grayscale(1) brightness(1.2);
          transition: all 0.6s ease;
        }
        .tech-row:hover { opacity: 0.8; filter: grayscale(0); transform: scale(1.05); }
        
        @media (max-width: 768px) {
          .skills-grid { grid-template-columns: 1fr; }
          .sk-card { padding: 2rem; }
          .sk-label { font-size: 1.5rem; }
        }
      `}</style>

        <motion.div variants={fadeIn} className="tech-row">
          <img src="https://skillicons.dev/icons?i=html,css,js,react,nextjs,nodejs,express,mongodb,tailwind,git,github,linux,docker,aws,postgres&theme=dark" alt="Tech stack icons" />
        </motion.div>
      </motion.div>
    </section>
  );
}
