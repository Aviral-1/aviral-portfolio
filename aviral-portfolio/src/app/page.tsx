"use client";

import React, { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

/* ---------------- TYPING LOOP ---------------- */
const phrases = [
  "I build web applications",
  "I design clean interfaces",
  "I optimize performance",
  "I engineer scalable systems",
];

function useTypingLoop() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[index];
    const speed = deleting ? 40 : 80;

    const timeout = setTimeout(() => {
      setText((prev) =>
        deleting
          ? current.substring(0, prev.length - 1)
          : current.substring(0, prev.length + 1)
      );

      if (!deleting && text === current) {
        setTimeout(() => setDeleting(true), 900);
      } else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % phrases.length);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, deleting, index]);

  return text;
}

/* ---------------- MAIN ---------------- */
export default function Page() {
  const typedText = useTypingLoop();
  const cursorRef = useRef<HTMLDivElement>(null);
  const [particlesReady, setParticlesReady] = useState(false);
  const [showTop, setShowTop] = useState(false);

  /* Particles */
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setParticlesReady(true));
  }, []);

  /* Cursor glow */
  useEffect(() => {
    const c = cursorRef.current!;
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let x = pos.x, y = pos.y;

    const move = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
    };

    window.addEventListener("pointermove", move);

    const loop = () => {
      x += (pos.x - x) * 0.18;
      y += (pos.y - y) * 0.18;
      c.style.transform = `translate(${x}px, ${y}px)`;
      requestAnimationFrame(loop);
    };
    loop();

    return () => window.removeEventListener("pointermove", move);
  }, []);

  /* Scroll reveal + back to top */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("show")),
      { threshold: 0.12 }
    );

    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    window.addEventListener("scroll", () => setShowTop(window.scrollY > 600));
    return () => io.disconnect();
  }, []);

  return (
    <main>
      <div ref={cursorRef} className="cursor-glow" />

      {particlesReady && (
        <Particles
          className="particles"
          options={{
            fullScreen: { enable: false },
            particles: {
              number: { value: 40 },
              links: {
                enable: true,
                distance: 140,
                opacity: 0.12,
                color: "#22c55e",
              },
              move: { speed: 0.3 },
              size: { value: { min: 1, max: 3 } },
              opacity: { value: 0.3 },
            },
          }}
        />
      )}

      <nav className="navbar">
        <span className="logo">▲ Aviral</span>
        <div className="navlinks">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section id="home" className="hero">
        <h1 className="reveal">
          Hi, I’m <span>Aviral Mishra</span>
        </h1>

        <h2 className="typing reveal">
          {typedText}
          <span className="caret">|</span>
        </h2>

        <p className="lead reveal">
          Full-stack engineer focused on performance, scalability & clean design.
        </p>

        <div className="cta reveal">
          <a className="btn primary">View Projects</a>
          <a className="btn ghost">Contact</a>
        </div>

        <div className="socials reveal">
          <Github />
          <Linkedin />
          <Mail />
        </div>
      </section>

      <section id="about" className="section reveal">
        <h2>About Me</h2>
        <p>
          I build high-quality, scalable web systems with strong architecture,
          testing and performance focus.
        </p>
      </section>

      <section id="skills" className="section reveal">
        <h2>Skills</h2>
        <div className="grid">
          {["Next.js", "React", "TypeScript", "Node.js", "Postgres", "Docker"].map(
            (s) => (
              <div key={s} className="pill">{s}</div>
            )
          )}
        </div>
      </section>

      <section id="projects" className="section reveal">
        <h2>Projects</h2>
        <div className="projects">
          <div className="card">
            <h3>Healvora</h3>
            <p>Healthcare waste management platform</p>
          </div>
          <div className="card">
            <h3>Galaxy Portfolio</h3>
            <p>3D interactive experience</p>
          </div>
        </div>
      </section>

      <section id="contact" className="section reveal">
        <h2>Let’s Build</h2>
        <form
          className="form"
          action="https://formsubmit.co/YOUR_EMAIL@example.com"
          method="POST"
        >
          <input name="name" placeholder="Name" required />
          <input name="email" type="email" placeholder="Email" required />
          <textarea name="message" placeholder="Message" required />
          <button type="submit">Send Message</button>
        </form>
      </section>

      {showTop && (
        <button className="backtop" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <ArrowUp />
        </button>
      )}

      <footer>© {new Date().getFullYear()} Aviral Mishra</footer>
    </main>
  );
}
