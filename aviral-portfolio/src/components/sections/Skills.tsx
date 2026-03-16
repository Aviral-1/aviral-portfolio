"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaDocker } from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";
import { MdAnalytics } from "react-icons/md";
import { TbMap2 } from "react-icons/tb";
import { fadeUp, stagger, TiltCard } from "@/lib/ui-utils";

const skillGroups = [
  {
    icon: <FaReact size={24} />,
    label: "Frontend",
    color: "#61dafb",
    details: "React 19 · Hooks · Context · Framer Motion · Tailwind",
    skills: ["React.js", "JavaScript ES6+", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"],
  },
  {
    icon: <FaNodeJs size={24} />,
    label: "Backend & DB",
    color: "#68a063",
    details: "Node v20 · Express · NestJS · MongoDB · PostgreSQL",
    skills: ["Node.js", "Express.js", "NestJS", "MongoDB", "PostgreSQL", "Prisma", "Mongoose"],
  },
  {
    icon: <MdAnalytics size={24} />,
    label: "Analytics",
    color: "#a78bfa",
    details: "Real-time metrics · Data vis · WebSocket · KPI tracking",
    skills: ["Recharts", "ApexCharts", "Chart.js", "KPI Dashboards", "Real-time Metrics"],
  },
  {
    icon: <TbMap2 size={24} />,
    label: "GIS & Maps",
    color: "#34d399",
    details: "GeoJSON · Leaflet · Google Maps SDK · Heatmaps",
    skills: ["Google Maps API", "React Google Maps", "Leaflet", "GeoJSON", "Heatmaps", "Clusters"],
  },
  {
    icon: <SiNextdotjs size={24} />,
    label: "Frameworks",
    color: "#ffffff",
    details: "Next.js 16 · App Router · Server Actions · ISR/SSR",
    skills: ["Next.js", "REST APIs", "Responsive UI", "Component Architecture", "JWT Auth"],
  },
  {
    icon: <FaDocker size={24} />,
    label: "DevOps & Cloud",
    color: "#2496ed",
    details: "CI/CD · Docker · AWS (S3/EC2) · Git-flow · Shell",
    skills: ["Git", "GitHub", "Docker", "AWS EC2/S3", "AWS Amplify", "Linux CLI", "Figma"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="skills-section">
      <motion.div
        className="container"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.06 }}
      >
        <motion.p variants={fadeUp} className="eyebrow">
          02 — Tech Stack
        </motion.p>
        <motion.h2 variants={fadeUp} className="sec-h2">
          Tools &amp; Technologies
        </motion.h2>
        <motion.p variants={fadeUp} className="sec-sub">
          A curated set of technologies I use daily to ship production-grade systems.
        </motion.p>

        <div className="sk-grid">
          {skillGroups.map((sg, i) => (
            <TiltCard key={sg.label} className="sk-tilt">
              <motion.div
                className="sk-card"
                style={{ "--card-color": sg.color } as React.CSSProperties}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.55 }}
                viewport={{ once: true }}
              >
                <div className="sk-shine" />
                <div className="sk-head">
                  <div className="sk-icon-box" style={{ color: sg.color, borderColor: sg.color + "40" }}>
                    {sg.icon}
                  </div>
                  <div>
                    <div className="sk-label" style={{ color: sg.color }}>{sg.label}</div>
                    <div className="sk-detail">{sg.details}</div>
                  </div>
                </div>
                <div className="sk-chips">
                  {sg.skills.map((s, si) => (
                    <motion.span
                      key={`${sg.label}-${s}-${si}`}
                      className="sk-chip"
                      whileHover={{ scale: 1.07, borderColor: sg.color + "80", color: "#fff" }}
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>

        <motion.div variants={fadeUp} className="tech-icon-row">
          <img
            src="https://skillicons.dev/icons?i=html,css,js,react,nextjs,nodejs,express,mongodb,tailwind,git,github,linux,docker,aws,postgres&theme=dark"
            alt="Tech stack icons"
            loading="lazy"
          />
        </motion.div>
      </motion.div>

      <style>{`
        .skills-section {
          padding: var(--sp-2xl) 0;
          background: var(--bg-alt);
        }
        .sk-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
          gap: 2rem;
          margin-top: 4rem;
        }
        .sk-tilt { display: block; height: 100%; }
        .sk-card {
          position: relative;
          padding: 2.5rem;
          border-radius: 20px;
          border: 1px solid var(--border-bright);
          background: rgba(255,255,255,0.015);
          overflow: hidden;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          transition: border-color 0.4s ease, background 0.4s ease, box-shadow 0.4s ease;
        }
        .sk-card:hover {
          border-color: color-mix(in srgb, var(--card-color) 60%, transparent);
          background: rgba(255,255,255,0.03);
          box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 40px color-mix(in srgb, var(--card-color) 5%, transparent);
        }
        .sk-shine {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 0% 0%, color-mix(in srgb, var(--card-color) 15%, transparent), transparent 60%);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .sk-card:hover .sk-shine { opacity: 1; }
        .sk-head { display: flex; align-items: center; gap: 1.25rem; }
        .sk-icon-box {
          width: 56px; height: 56px;
          border-radius: 14px;
          border: 1px solid;
          background: rgba(255,255,255,0.03);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }
        .sk-card:hover .sk-icon-box { transform: scale(1.1) rotate(5deg); }
        .sk-label {
          font-size: 1.5rem;
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1;
          margin-bottom: 0.35rem;
        }
        .sk-detail {
          font-size: 0.65rem;
          font-family: var(--font-mono);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--text-muted);
          line-height: 1.5;
        }
        .sk-chips { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .sk-chip {
          font-size: 0.75rem;
          padding: 6px 14px;
          border-radius: 50px;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border);
          color: var(--text-dim);
          font-weight: 700;
          cursor: default;
          transition: all 0.25s ease;
        }

        .tech-icon-row {
          margin-top: 5rem;
          display: flex;
          justify-content: center;
          opacity: 0.25;
          filter: grayscale(1) brightness(1.5);
          transition: all 0.5s ease;
          overflow-x: auto;
        }
        .tech-icon-row:hover { opacity: 0.8; filter: none; }

        @media (max-width: 768px) { .sk-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
