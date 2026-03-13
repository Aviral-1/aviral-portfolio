"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";
import { fadeUp, stagger, scaleIn } from "@/lib/ui-utils";

export default function Experience() {
  return (
    <section id="experience" className="section" >
      <motion.div className="container" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.08 }}>
        <motion.p variants={fadeUp} className="eyebrow">03 — Experience</motion.p>
        <motion.h2 variants={fadeUp} className="sec-h2">Professional Journey</motion.h2>

        <motion.div variants={scaleIn} className="exp-card">
          <div className="exp-top">
            <div className="exp-left">
              <div className="exp-ico"><Briefcase size={22} /></div>
              <div>
                <h3 className="exp-role">Software Engineer</h3>
                <span className="exp-co">Dvertex Info Tech Pvt. Ltd.</span>
              </div>
            </div>
            <div className="exp-meta">
              <span className="exp-badge">Aug 2022 – Present · 3+ yrs</span>
              <span className="exp-loc"><MapPin size={12} /> Greater Noida, India</span>
            </div>
          </div>

          <div className="exp-bullets">
            {[
              "Designed full-scale municipal dashboards for SafaiMitra — HRMS, property tax analytics, waste route monitoring, ward insights, and complaint workflow system.",
              "Built Suraksha Mitra Police Patrol System — QR-based evidence logging, district heatmaps, route tracking, role-wise dashboards, and field validation flows.",
              "Developed Smart Bin IoT Dashboard — real-time bin sensor monitoring, automated alert systems, geo-mapped pickups, and a reporting export engine.",
              "Architected a reusable component library (tables, charts, cards, filters, modals, pagination) that reduced development time by 40% across all projects.",
              "Created export pipelines — PDF, Excel, CSV with date-range filters, performance charts, GIS overlays, and advanced search.",
              "Collaborated with backend teams on API design, validation, pagination strategy, and performance optimization.",
              "Managed city-level deployments for Ajmer, Prayagraj, Lucknow, Ayodhya, and Mankapur.",
            ].map((b, i) => (
              <motion.div key={i} className="bullet" initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} viewport={{ once: true }}>
                <span className="bdot" />
                <p>{b}</p>
              </motion.div>
            ))}
          </div>

          <div className="exp-tags">
            {["React.js", "JavaScript ES6+", "Tailwind CSS", "Google Maps API", "Recharts", "ApexCharts", "Leaflet", "GeoJSON", "REST APIs", "Node.js"].map(t => (
              <span key={t} className="etag">{t}</span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
