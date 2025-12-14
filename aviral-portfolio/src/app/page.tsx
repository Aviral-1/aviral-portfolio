"use client";

import React, { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

/* Typing loop */
const phrases = [
  "I build web applications",
  "I design clean interfaces",
  "I optimize performance",
  "I engineer scalable systems",
];

function useTypingLoop() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const current = phrases[index];
    const speed = del ? 40 : 80;

    const t = setTimeout(() => {
      setText(prev =>
        del ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1)
      );

      if (!del && text === current) setTimeout(() => setDel(true), 900);
      if (del && text === "") {
        setDel(false);
        setIndex((i) => (i + 1) % phrases.length);
      }
    }, speed);

    return () => clearTimeout(t);
  }, [text, del, index]);

  return text;
}

export default function Page() {
  const typed = useTypingLoop();
  const cursorRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState(false);
  const [top, setTop] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (e) => loadSlim(e)).then(() => setParticles(true));
  }, []);

  useEffect(() => {
    const c = cursorRef.current!;
    const p = { x: 0, y: 0 };
    let x = 0, y = 0;

    const move = (e: PointerEvent) => {
      p.x = e.clientX;
      p.y = e.clientY;
    };

    window.addEventListener("pointermove", move);
    const loop = () => {
      x += (p.x - x) * 0.2;
      y += (p.y - y) * 0.2;
      c.style.transform = `translate(${x}px, ${y}px)`;
      requestAnimationFrame(loop);
    };
    loop();
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      e => e.forEach(i => i.isIntersecting && i.target.classList.add("show")),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach(el => io.observe(el));
    window.addEventListener("scroll", () => setTop(window.scrollY > 600));
    return () => io.disconnect();
  }, []);

  return (
    <main>
      <div ref={cursorRef} className="cursor-glow" />

      {particles && <Particles className="particles" options={{ particles: { number: { value: 40 }}}} />}

      <nav className="navbar">
        <strong>Aviral</strong>
        <div className="navlinks">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section id="home" className="hero">
        <div className="container reveal">
          <h1>Hi, I’m <span>Aviral Mishra</span></h1>
          <div className="typing">{typed}<span className="caret">|</span></div>
          <p className="lead">Full-stack engineer focused on performance & scalability.</p>

          <div className="cta">
            <div className="btn primary">View Projects</div>
            <div className="btn ghost">Contact</div>
          </div>

          <div style={{ marginTop: 32 }}>
            <Github /> <Linkedin /> <Mail />
          </div>
        </div>
      </section>

      <section id="about" className="section reveal">
        <div className="container section-header">
          <h2>About Me</h2>
          <p>I build scalable systems with clean architecture and strong UX.</p>
        </div>
      </section>

      <section id="skills" className="section reveal">
        <div className="container">
          <div className="section-header">
            <h2>Skills</h2>
          </div>
          <div className="grid-3">
            {["Next.js", "React", "TypeScript", "Node.js", "Docker", "Postgres"].map(s => (
              <div key={s} className="card">{s}</div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="section reveal">
        <div className="container">
          <div className="section-header">
            <h2>Projects</h2>
          </div>
          <div className="grid-2">
            <div className="card">Healvora</div>
            <div className="card">Galaxy Portfolio</div>
          </div>
        </div>
      </section>

      <section id="contact" className="section reveal">
        <div className="container">
          <div className="section-header">
            <h2>Contact</h2>
          </div>
          <form className="form">
            <input placeholder="Name" />
            <input placeholder="Email" />
            <textarea placeholder="Message" />
            <button className="btn primary">Send</button>
          </form>
        </div>
      </section>

      {top && <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><ArrowUp /></button>}

      <footer>© {new Date().getFullYear()} Aviral Mishra</footer>
    </main>
  );
}
