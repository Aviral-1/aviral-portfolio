"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, MapPin, Code2, Star, Zap } from "lucide-react";
import { fadeUp, stagger } from "@/lib/ui-utils";

/* ── Animated counter ── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1400;
          const step = 16;
          const steps = Math.ceil(duration / step);
          let current = 0;
          const inc = to / steps;
          const timer = setInterval(() => {
            current = Math.min(current + inc, to);
            setVal(Math.floor(current));
            if (current >= to) clearInterval(timer);
          }, step);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

const techStack = [
  { name: "React", color: "#61dafb" },
  { name: "Next.js", color: "#fff" },
  { name: "TypeScript", color: "#3178c6" },
  { name: "Node.js", color: "#68a063" },
  { name: "Tailwind", color: "#06b6d4" },
  { name: "MongoDB", color: "#47a248" },
  { name: "AWS", color: "#ff9900" },
  { name: "Docker", color: "#2496ed" },
];

const stats = [
  { icon: <Briefcase size={18} />, num: 3, suffix: "+", label: "Years Exp" },
  { icon: <MapPin size={18} />, num: 5, suffix: "+", label: "Cities Deployed" },
  { icon: <Code2 size={18} />, num: 40, suffix: "%", label: "Dev Speedup" },
  { icon: <Star size={18} />, num: 10, suffix: "+", label: "Projects" },
];

export default function About() {
  return (
    <section id="about" className="about-section">
      <motion.div
        className="container"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.p variants={fadeUp} className="eyebrow">
          01 — About Me
        </motion.p>

        <div className="about-layout">
          {/* Left: Text + stats */}
          <motion.div variants={fadeUp} className="about-left">
            <h2 className="sec-h2">
              Crafting <span className="grad-text">Digital Experiences</span>
              <br />
              with precision
            </h2>
            <p className="about-intro">
              I&apos;m a <strong className="hl-green">Full-Stack Engineer</strong> specializing in{" "}
              <strong className="hl-green">high-performance dashboards</strong> and{" "}
              <strong className="hl-green">GIS-driven platforms</strong>. My focus is on modular
              architecture, real-time data flow, and user interfaces that solve complex urban
              challenges.
            </p>

            {/* Tech stack badges */}
            <div className="about-tech-wrapper">
              <span className="about-tech-label">
                <Zap size={12} /> Tech Stack
              </span>
              <div className="about-tech-pills">
                {techStack.map((t) => (
                  <motion.span
                    key={t.name}
                    className="tech-pill"
                    style={{ "--pill-color": t.color } as React.CSSProperties}
                    whileHover={{ scale: 1.08, y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    {t.name}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Stats grid */}
            <div className="about-stats">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="stat-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="stat-icon">{s.icon}</div>
                  <div className="stat-num">
                    <Counter to={s.num} suffix={s.suffix} />
                  </div>
                  <div className="stat-lbl">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Timeline */}
          <motion.div variants={fadeUp} className="about-right">
            <div className="profile-card">
              <div className="pc-glow" />
              <div className="pc-avatar">
                <span className="pc-avatar-text">AM</span>
                <div className="pc-status">
                  <div className="pc-status-dot" />
                  Available
                </div>
              </div>
              <div className="pc-info">
                <h3 className="pc-name">Aviral Mishra</h3>
                <p className="pc-role">Software Engineer · Full-Stack</p>
                <p className="pc-loc">
                  <MapPin size={12} /> Greater Noida, India
                </p>
              </div>
            </div>

            <div className="tl-list">
              {[
                {
                  type: "work",
                  date: "2022 – NOW",
                  title: "Software Engineer",
                  sub: "Dvertex Info Tech",
                  icon: <Briefcase size={14} />,
                  current: true,
                },
                {
                  type: "edu",
                  date: "2024",
                  title: "B.Tech — IT",
                  sub: "AKTU University",
                  icon: <GraduationCap size={14} />,
                  current: false,
                },
                {
                  type: "edu",
                  date: "2018",
                  title: "12th Standard",
                  sub: "St. Michael Convent",
                  icon: <GraduationCap size={14} />,
                  current: false,
                },
              ].map((item, i) => (
                <motion.div
                  key={`${item.title}-${i}`}
                  className={`tl-item ${item.type} ${item.current ? "is-current" : ""}`}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.12 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 6 }}
                >
                  <div className="tl-icon">{item.icon}</div>
                  <div className="tl-body">
                    <div className="tl-header">
                      <h4 className="tl-title">{item.title}</h4>
                      {item.current && <span className="tl-badge">NOW</span>}
                    </div>
                    <span className="tl-sub">
                      {item.sub} · {item.date}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <style>{`
        .about-section {
          padding: var(--sp-2xl) 0;
        }
        .about-layout {
          display: grid;
          grid-template-columns: 1.2fr 0.9fr;
          gap: 5rem;
          align-items: start;
          margin-top: 3rem;
        }
        .about-intro {
          font-size: 1.1rem;
          line-height: 1.85;
          color: var(--text-dim);
          margin-top: 2rem;
          margin-bottom: 2.5rem;
        }
        .hl-green { color: var(--primary); font-weight: 800; }

        /* Tech pills */
        .about-tech-wrapper {
          margin-bottom: 2.5rem;
        }
        .about-tech-label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }
        .about-tech-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }
        .tech-pill {
          padding: 6px 14px;
          border-radius: 50px;
          border: 1px solid color-mix(in srgb, var(--pill-color) 30%, transparent);
          background: color-mix(in srgb, var(--pill-color) 6%, transparent);
          color: var(--pill-color);
          font-size: 0.78rem;
          font-weight: 700;
          cursor: default;
          transition: all 0.2s ease;
        }

        /* Stats */
        .about-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }
        .stat-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border-bright);
          border-radius: 16px;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          text-align: center;
          transition: all 0.3s ease;
        }
        .stat-card:hover {
          border-color: var(--primary);
          background: rgba(255,255,255,0.04);
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.4);
        }
        .stat-icon { color: var(--primary); }
        .stat-num {
          font-size: 2rem;
          font-weight: 900;
          color: #fff;
          line-height: 1;
          letter-spacing: -0.04em;
        }
        .stat-lbl {
          font-size: 0.6rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--text-muted);
        }

        /* Profile Card */
        .profile-card {
          position: relative;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border-bright);
          border-radius: 24px;
          padding: 2.5rem;
          margin-bottom: 2rem;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          text-align: center;
        }
        .pc-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 0%, var(--primary-glow), transparent 70%);
          opacity: 0.15;
          pointer-events: none;
        }
        .pc-avatar {
          position: relative;
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary), var(--accent-emerald));
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 40px var(--primary-glow);
        }
        .pc-avatar-text {
          font-size: 2rem;
          font-weight: 900;
          color: #000;
          letter-spacing: -0.05em;
        }
        .pc-status {
          position: absolute;
          bottom: -4px;
          right: -4px;
          display: flex;
          align-items: center;
          gap: 5px;
          background: var(--bg);
          border: 1px solid var(--primary);
          border-radius: 20px;
          padding: 3px 10px;
          font-size: 0.6rem;
          font-weight: 800;
          color: var(--primary);
          letter-spacing: 0.06em;
          white-space: nowrap;
        }
        .pc-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--primary);
          box-shadow: 0 0 8px var(--primary);
          animation: pcPulse 2s ease infinite;
        }
        @keyframes pcPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .pc-info { position: relative; }
        .pc-name {
          font-size: 1.4rem;
          font-weight: 900;
          color: #fff;
          margin: 0 0 0.3rem;
          letter-spacing: -0.03em;
        }
        .pc-role {
          font-size: 0.8rem;
          color: var(--primary);
          font-weight: 700;
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 0 0 0.5rem;
        }
        .pc-loc {
          font-size: 0.8rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          margin: 0;
        }

        /* Timeline */
        .tl-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .tl-item {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 1.25rem 1.5rem;
          border-radius: 16px;
          background: rgba(255,255,255,0.01);
          border: 1px solid var(--border);
          cursor: default;
          transition: all 0.25s ease;
        }
        .tl-item:hover, .tl-item.is-current {
          background: rgba(255,255,255,0.03);
          border-color: var(--border-bright);
        }
        .tl-item.work .tl-icon { color: var(--primary); border-color: var(--primary); }
        .tl-icon {
          min-width: 40px;
          height: 40px;
          border-radius: 10px;
          border: 1px solid var(--border-bright);
          background: rgba(255,255,255,0.03);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
        }
        .tl-body { flex: 1; min-width: 0; }
        .tl-header { display: flex; align-items: center; gap: 0.75rem; }
        .tl-title { font-size: 1rem; font-weight: 800; color: #fff; margin: 0; }
        .tl-badge {
          font-size: 0.55rem;
          font-weight: 900;
          padding: 2px 8px;
          border-radius: 4px;
          background: var(--primary);
          color: #000;
          letter-spacing: 0.08em;
        }
        .tl-sub { font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono); font-weight: 600; }

        @media (max-width: 1024px) {
          .about-layout { grid-template-columns: 1fr; gap: 4rem; }
          .about-stats { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .about-stats { grid-template-columns: repeat(2, 1fr); }
          .stat-num { font-size: 1.5rem; }
        }
      `}</style>
    </section>
  );
}
