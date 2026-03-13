"use client";

import React from "react";
import { motion } from "framer-motion";
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

export default function Projects() {
  return (
    <section id="projects" className="section sec-alt" >
      <motion.div className="container" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }}>
        <motion.p variants={fadeUp} className="eyebrow">04 — Projects</motion.p>
        <motion.h2 variants={fadeUp} className="sec-h2">Key Projects</motion.h2>
        <motion.p variants={fadeUp} className="sec-sub">Production platforms and innovative builds spanning healthcare, smart-city, and IoT domains.</motion.p>

        {/* Featured — Healvora */}
        <motion.div
          variants={scaleIn}
          className="proj-featured"
          whileHover={{ scale: 1.008 }}
        >
          <div className="pf-glow" style={{ background: `radial-gradient(ellipse at 30% 50%, ${projects[0].gradFrom}22, transparent 60%)` }} />
          <div className="pf-inner">
            <div className="pf-left">
              <div className="pf-badge-wrap">
                <span className="pf-personal-tag">✦ Personal Project</span>
                <span className="pf-tag" style={{ color: projects[0].color, borderColor: projects[0].color + "40", background: projects[0].color + "12" }}>
                  {projects[0].emoji} {projects[0].tag}
                </span>
              </div>
              <h3 className="pf-title">{projects[0].title}</h3>
              <p className="pf-sub">{projects[0].tagLineSub}</p>
              <p className="pf-desc">{projects[0].description}</p>

              <div className="pf-highlights">
                {projects[0].highlights.map(h => (
                  <span key={h} className="pf-hl" style={{ borderColor: projects[0].color + "30" }}>
                    <span style={{ color: projects[0].color }}>✦</span> {h}
                  </span>
                ))}
              </div>

              <div className="pf-stack">
                {projects[0].tech.map(t => (
                  <span key={t} className="pf-tech">{t}</span>
                ))}
              </div>
              <p className="pf-scope">{projects[0].scope}</p>
            </div>
            <div className="pf-right">
              {/* Animated health UI mockup */}
              <div className="health-mockup">
                <div className="hm-header">
                  <Heart size={16} className="hm-heart" />
                  <span>AI Health Analysis</span>
                  <div className="hm-live"><span className="hm-dot" />Live</div>
                </div>
                {[
                  { label: "Heart Rate", val: "72 bpm", pct: 72, color: "#ec4899" },
                  { label: "Sleep Score", val: "8.2 hrs", pct: 82, color: "#8b5cf6" },
                  { label: "Vitals", val: "Optimal", pct: 94, color: "#10b981" },
                  { label: "Activity", val: "High", pct: 88, color: "#06b6d4" },
                ].map((item, i) => (
                  <div key={item.label} className="hm-row">
                    <div className="hm-row-top">
                      <span className="hm-lbl">{item.label}</span>
                      <span className="hm-val" style={{ color: item.color }}>{item.val}</span>
                    </div>
                    <div className="hm-track">
                      <motion.div
                        className="hm-fill"
                        style={{ background: item.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.pct}%` }}
                        transition={{ duration: 1.1, delay: i * 0.15, ease }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                ))}
                <div className="hm-footer">
                  <Cpu size={13} /> AI Analysis Engine · NestJS · AWS Amplify
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other projects grid */}
        <div className="other-projects">
          {projects.slice(1).map((p, i) => (
            <TiltCard key={p.title} className="proj-card-wrap">
              <motion.div
                className="proj-card"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="pc-top">
                  <span className="pc-tag" style={{ color: p.color, background: p.color + "11", borderColor: p.color + "33" }}>{p.emoji} {p.tag}</span>
                  <ExternalLink size={15} className="pc-ext" />
                </div>
                <h3 className="pc-title">{p.title}</h3>
                <p className="pc-sub">{p.tagLineSub}</p>
                <p className="pc-desc">{p.description}</p>
                <div className="pc-hls">
                  {p.highlights.map(h => (
                    <span key={h} className="pc-hl"><span style={{ color: p.color }}>✦</span> {h}</span>
                  ))}
                </div>
                <div className="pc-footer">
                  <div className="pc-stack">{p.tech.map(t => <span key={t} className="pc-tech">{t}</span>)}</div>
                  <span className="pc-scope">{p.scope}</span>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>

        <motion.div variants={fadeUp} className="gh-cta">
          <a href="https://github.com/Aviral-1" target="_blank" rel="noopener noreferrer" className="gh-btn">
            <Github size={18} /> View More on GitHub <ExternalLink size={14} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
