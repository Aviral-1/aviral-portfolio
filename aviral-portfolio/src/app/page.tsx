"use client";

import React, { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

/* ================= DATA ================= */
const projects = [
  {
    title: "Healvora",
    desc: "Healthcare waste management platform",
    details:
      "Role-based dashboards, scalable backend, Prisma + PostgreSQL, audit logging.",
  },
  {
    title: "Galaxy Portfolio",
    desc: "3D interactive portfolio",
    details:
      "WebGL experiments, performance tuning, lazy loading, motion systems.",
  },
];

export default function Page() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState(false);
  const [active, setActive] = useState<any>(null);

  useEffect(() => {
    initParticlesEngine(async (e) => loadSlim(e)).then(() =>
      setParticles(true)
    );
  }, []);

  useEffect(() => {
    const c = cursorRef.current!;
    let x = 0, y = 0;
    window.addEventListener("pointermove", e => {
      x += (e.clientX - x) * 0.15;
      y += (e.clientY - y) * 0.15;
      c.style.transform = `translate(${x}px, ${y}px)`;
    });
  }, []);

  return (
    <main>
      <div ref={cursorRef} className="cursor-glow" />

      {particles && (
        <Particles
          className="particles"
          options={{
            particles: {
              number: { value: 40 },
              links: { enable: true, opacity: 0.1 },
              move: { speed: 0.3 },
            },
          }}
        />
      )}

      {/* NAV */}
      <nav className="navbar">
        <strong>Aviral Mishra</strong>
        <div className="navlinks">
          <a href="#projects">Projects</a>
          <a href="/resume.pdf" target="_blank">Resume</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="container reveal">
          <h1>Hi, I’m <span>Aviral Mishra</span></h1>
          <p className="lead">
            Full-stack engineer building scalable, production-ready web systems.
          </p>

          <div className="cta">
            <a href="#projects" className="btn primary">View Work</a>
            <a href="/resume.pdf" className="btn ghost">Resume</a>
          </div>

          <div className="socials">
            <Github /><Linkedin /><Mail />
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section reveal">
        <div className="container">
          <div className="section-header">
            <h2>Projects</h2>
            <p>Engineering-focused case studies.</p>
          </div>

          <div className="grid-2">
            {projects.map(p => (
              <div key={p.title} className="card" onClick={() => setActive(p)}>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL */}
      {active && (
        <div className="modal-backdrop" onClick={() => setActive(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>{active.title}</h3>
            <p>{active.details}</p>
            <button className="btn ghost" onClick={() => setActive(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      <footer>© {new Date().getFullYear()} Aviral Mishra</footer>
    </main>
  );
}
