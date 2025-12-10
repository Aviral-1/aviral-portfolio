"use client";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Github, Linkedin, Mail, ArrowRight, Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [particlesLoaded, setParticlesLoaded] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setParticlesLoaded(true));
  }, []);

  return (
    <main>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">
          <Sparkles size={20} color="#22c55e" />
          <span style={{ marginLeft: 8, color: "#22c55e", fontWeight: 600 }}>
            Aviral Mishra
          </span>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>

        <a href="https://github.com/Aviral-1" target="_blank" className="nav-links">
          GitHub
        </a>
      </nav>

      {/* PARTICLES */}
      {particlesLoaded && (
        <Particles
          id="tsparticles"
          className="particles"
          options={{
            background: { color: "transparent" },
            particles: {
              number: { value: 60 },
              color: { value: "#22c55e" },
              links: {
                enable: true,
                distance: 130,
                color: "#22c55e",
                opacity: 0.25,
                width: 1,
              },
              move: { enable: true, speed: 0.5 },
            },
          }}
        />
      )}

      {/* HERO */}
      <section className="section hero" id="home">
        <div>
          <h1 className="hero-title">Hi, I’m Aviral Mishra</h1>

          <p>
            I build production-grade web applications focusing on performance,
            reliability, and developer experience.
          </p>

          <a className="btn-primary" href="#projects">
            View Projects <ArrowRight />
          </a>
          <a className="btn-secondary" href="#contact">
            Contact Me
          </a>

          <div style={{ marginTop: 20, display: "flex", gap: 20 }}>
            <Github />
            <Linkedin />
            <Mail />
          </div>
        </div>

        <div>
          <div className="skill-card">
            <h3>Frontend Craft</h3>
            <p>Next.js, React, UI Engineering</p>
          </div>

          <div className="skill-card">
            <h3>Backend & APIs</h3>
            <p>Prisma, Auth, Clean Architecture</p>
          </div>

          <div className="skill-card">
            <h3>Cloud & DevOps</h3>
            <p>Docker, CI/CD</p>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section">
        <h2 style={{ color: "#22c55e", marginBottom: 20 }}>Skills</h2>

        <div className="grid-4">
          {["Next.js", "React", "TypeScript", "Node.js", "Prisma", "Postgres", "MongoDB", "Docker"].map(
            (skill) => (
              <div key={skill} className="skill-card">{skill}</div>
            )
          )}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section">
        <h2 style={{ color: "#22c55e", marginBottom: 20 }}>Selected Projects</h2>

        <div className="grid-2">
          <div className="skill-card">
            <h3>Healvora</h3>
            <p>Healthcare waste management platform</p>
            <a href="https://healvora.vercel.app" target="_blank">Visit →</a>
          </div>

          <div className="skill-card">
            <h3>Galaxy Portfolio</h3>
            <p>3D interactive portfolio</p>
            <a href="https://aviral-mishra.app" target="_blank">Visit →</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>© {new Date().getFullYear()} Aviral Mishra</footer>
    </main>
  );
}
