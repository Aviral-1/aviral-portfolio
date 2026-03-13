"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaDocker } from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";
import { MdAnalytics } from "react-icons/md";
import { TbMap2 } from "react-icons/tb";
import { fadeUp, stagger, fadeIn, TiltCard } from "@/lib/ui-utils";

const skillGroups = [
  { icon: <FaReact size={22} />, label: "Frontend", color: "#06b6d4", glowColor: "rgba(6,182,212,0.15)", shadowColor: "rgba(6,182,212,0.12)", skills: ["React.js", "JavaScript ES6+", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"] },
  { icon: <FaNodeJs size={22} />, label: "Backend & DB", color: "#8b5cf6", glowColor: "rgba(139,92,246,0.15)", shadowColor: "rgba(139,92,246,0.12)", skills: ["Node.js", "Express.js", "NestJS", "MongoDB", "PostgreSQL", "Prisma", "Mongoose"] },
  { icon: <MdAnalytics size={22} />, label: "Analytics", color: "#f59e0b", glowColor: "rgba(245,158,11,0.15)", shadowColor: "rgba(245,158,11,0.12)", skills: ["Recharts", "ApexCharts", "Chart.js", "KPI Dashboards", "Real-time Metrics"] },
  { icon: <TbMap2 size={22} />, label: "GIS & Maps", color: "#10b981", glowColor: "rgba(16,185,129,0.15)", shadowColor: "rgba(16,185,129,0.12)", skills: ["Google Maps API", "React Google Maps", "Leaflet", "GeoJSON", "Heatmaps", "Clusters"] },
  { icon: <SiNextdotjs size={22} />, label: "Frameworks", color: "#ec4899", glowColor: "rgba(236,72,153,0.15)", shadowColor: "rgba(236,72,153,0.12)", skills: ["Next.js", "REST APIs", "Responsive UI", "Component Architecture", "JWT Auth"] },
  { icon: <FaDocker size={22} />, label: "DevOps & Cloud", color: "#f97316", glowColor: "rgba(249,115,22,0.15)", shadowColor: "rgba(249,115,22,0.12)", skills: ["Git", "GitHub", "Docker", "AWS EC2/S3", "AWS Amplify", "Linux CLI", "Figma"] },
];

export default function Skills() {
  return (
    <section id="skills" className="section sec-alt" >
      <motion.div className="container" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.08 }}>
        <motion.p variants={fadeUp} className="eyebrow">02 — Tech Stack</motion.p>
        <motion.h2 variants={fadeUp} className="sec-h2">Tools & Technologies</motion.h2>
        <motion.p variants={fadeUp} className="sec-sub">A curated set of tools I use daily to ship production-grade systems.</motion.p>

        <div className="skills-grid">
          {skillGroups.map((sg, i) => (
            <TiltCard key={sg.label} className="sk-card-wrap">
              <motion.div
                className="sk-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.55 }}
                viewport={{ once: true }}
                style={{
                  "--sk-card-glow": `radial-gradient(ellipse at 0% 0%, ${sg.glowColor}, transparent 60%)`,
                  "--sk-card-color": sg.color + "66",
                  "--sk-card-shadow": sg.shadowColor,
                } as React.CSSProperties}
              >
                <div className="sk-head">
                  <div className="sk-icon" style={{ color: sg.color, background: sg.color + "18", borderColor: sg.color + "40" }}>{sg.icon}</div>
                  <span className="sk-label" style={{ color: sg.color }}>{sg.label}</span>
                </div>
                <div className="sk-chips">
                  {sg.skills.map(s => (
                    <motion.span key={s} className="sk-chip" whileHover={{ scale: 1.08, color: sg.color }}>{s}</motion.span>
                  ))}
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>

        <motion.div variants={fadeIn} className="tech-row">
          <img src="https://skillicons.dev/icons?i=html,css,js,react,nextjs,nodejs,express,mongodb,tailwind,git,github,linux,docker,aws,postgres&theme=dark" alt="Tech stack icons" />
        </motion.div>
      </motion.div>
    </section>
  );
}
