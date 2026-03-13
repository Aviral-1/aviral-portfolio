"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, MapPin } from "lucide-react";
import { fadeUp, stagger } from "@/lib/ui-utils";

export default function About() {
  return (
    <section id="about" className="section">
      <motion.div className="container" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.12 }}>
        <motion.p variants={fadeUp} className="eyebrow">01 — About Me</motion.p>
        <div className="about-grid">
          <motion.div variants={fadeUp}>
            <h2>Crafting <span className="grad-text">scalable UIs</span><br />for real-world impact</h2>
            <p className="about-p" style={{ marginTop: "1.25rem" }}>
              I&apos;m a <span className="hl-cyan">Software Engineer</span> at <strong className="hl-cyan">Dvertex Info Tech Pvt. Ltd.</strong> where
              I architect <span className="hl-cyan">production-ready dashboards</span> and <span className="hl-cyan">GIS-driven systems</span> for smart-city platforms
              serving millions of citizens across India.
            </p>
            <p className="about-p">
              My strength lies in <span className="hl-cyan">reusable component libraries</span>, real-time
              <span className="hl-cyan"> data visualizations</span>, scalable <span className="hl-cyan">mapping solutions</span>, and robust <span className="hl-cyan">export pipelines</span>. Currently
              leveling up in full-stack — <span className="hl-cyan">NestJS</span>, <span className="hl-cyan">Next.js</span>, and <span className="hl-cyan">cloud deployment</span>.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="tl-col">
            {[
              { type: "work", date: "Aug 2022 – Present", title: "Software Engineer", sub: "Dvertex Info Tech Pvt. Ltd.", desc: "Full-scale dashboards for smart-city, police, IoT & municipal systems.", icon: <Briefcase size={14} /> },
              { type: "edu", date: "2024", title: "B.Tech — Information Technology", sub: "AKTU University", icon: <GraduationCap size={14} /> },
              { type: "edu", date: "2018", title: "12th Standard", sub: "St. Michael Convent School", icon: <GraduationCap size={14} /> },
              { type: "edu", date: "2016", title: "10th Standard", sub: "Kendriya Vidyalaya ITI Mankapur", icon: <GraduationCap size={14} /> },
            ].map((item, i) => (
              <motion.div key={i} className="tl-item" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1, duration: 0.55 }} viewport={{ once: true }}>
                <div className={`tl-icon ${item.type}`}>{item.icon}</div>
                <div className="tl-body">
                  <span className="tl-date">{item.date}</span>
                  <h4 className="tl-title">{item.title}</h4>
                  <span className="tl-sub">{item.sub}</span>
                  {item.desc && <p className="tl-desc">{item.desc}</p>}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
