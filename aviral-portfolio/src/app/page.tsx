"use client";

import React, { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

/**
 * Notes:
 * - Contact form posts to FormSubmit.co. Replace action URL with your email:
 *   action="https://formsubmit.co/YOUR_EMAIL@example.com"
 *
 * - No Tailwind. All styling in app/globals.css.
 */

export default function Page() {
  const [particlesReady, setParticlesReady] = useState(false);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [clicked, setClicked] = useState(false);

  // init tsparticles slim engine (optional fast particles)
  useEffect(() => {
    let mounted = true;
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => { if (mounted) setParticlesReady(true); });
    return () => { mounted = false; };
  }, []);

  // custom cursor follow
  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    const pos = { x: window.innerWidth/2, y: window.innerHeight/2 };
    let rx = pos.x, ry = pos.y;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
    };
    const onDown = () => { setClicked(true); el.classList.add("clicked"); };
    const onUp = () => { setClicked(false); el.classList.remove("clicked"); };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    const loop = () => {
      rx += (pos.x - rx) * 0.18;
      ry += (pos.y - ry) * 0.18;
      el.style.left = rx + "px";
      el.style.top = ry + "px";
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  // simple scroll reveal
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) en.target.classList.add("visible");
      });
    }, { threshold: 0.12 });
    items.forEach(i => io.observe(i));
    return () => io.disconnect();
  }, []);

  return (
    <main>
      {/* Backdrop visual layers */}
      <div className="backdrop" aria-hidden>
        <div className="orb o1"></div>
        <div className="orb o2"></div>
        <div className="orb o3"></div>

        {/* faint network SVG (static) */}
        <svg viewBox="0 0 1200 800" preserveAspectRatio="none">
          <g fill="none" stroke="#22c55e" strokeWidth="1">
            <path d="M60,200 L180,140 L300,190 L420,120 L560,170" />
            <path d="M700,50 L820,120 L980,90 L1100,150" />
            <path d="M200,600 L360,520 L520,580 L680,500 L840,580" />
          </g>
        </svg>
      </div>

      {/* custom follow cursor element */}
      <div ref={cursorRef} className={"cursor-follow"} aria-hidden />

      {/* Particles (optional) */}
      {particlesReady && (
        <Particles
          id="tsp"
          className="particles-layer"
          options={{
            fullScreen: { enable: false },
            particles: {
              number: { value: 40, density: { enable: true, area: 800 } },
              color: { value: "#22c55e" },
              links: { enable: true, distance: 120, color: "#22c55e", opacity: 0.14 },
              move: { enable: true, speed: 0.45, outModes: "out" },
              size: { value: { min: 1, max: 3 } },
              opacity: { value: 0.5 },
            },
          }}
          style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none" }}
        />
      )}

      <div className="container">
        <nav className="navbar">
          <div className="brand">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M3 3 L18 6 L12 20 L3 3 Z" fill="#22c55e" opacity="0.95"/>
            </svg>
            <span>Aviral Mishra</span>
          </div>

          <div className="navlinks">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
            <a href="https://github.com/Aviral-1" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </nav>

        {/* HERO */}
        <section id="home" className="hero">
          <div className="left reveal">
            <h1 className="hi">Hi, I’m <span style={{color:"white"}}>Aviral Mishra</span></h1>
            <p className="lead">I build production-grade web applications focusing on performance, reliability, and developer experience.</p>

            <div className="cta-row">
              <a href="#projects" className="btn btn-primary">View Projects →</a>
              <a href="#contact" className="btn btn-ghost">Contact Me</a>
            </div>

            <div className="socials" aria-hidden>
              <div className="icon-btn"><Github size={16} /></div>
              <div className="icon-btn"><Linkedin size={16} /></div>
              <div className="icon-btn"><Mail size={16} /></div>
            </div>
          </div>

          <aside className="right reveal">
            <div className="card">
              <h3>Frontend Craft</h3>
              <p>High-performance interfaces using Next.js, React, modern CSS.</p>
            </div>

            <div className="card">
              <h3>Backend & APIs</h3>
              <p>Type-safe services, auth, caching, and clean data models.</p>
            </div>

            <div className="card">
              <h3>Cloud & DevOps</h3>
              <p>Docker, CI/CD, monitoring and scalable deployments.</p>
            </div>
          </aside>
        </section>

        {/* ABOUT */}
        <section id="about" className="section reveal">
          <h2>About Me</h2>
          <p className="lead">I’m a full-stack engineer focusing on scalable architecture and clean, maintainable engineering systems. I enjoy building fast, reliable apps and improving developer experience.</p>
        </section>

        {/* SKILLS */}
        <section id="skills" className="section reveal">
          <h2>Skills</h2>
          <div className="skills-grid" style={{marginTop:18}}>
            {["Next.js","React","TypeScript","Node.js","Prisma","Postgres","MongoDB","Docker"].map(s => <div key={s} className="skill-pill">{s}</div>)}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="section reveal">
          <h2>Selected Projects</h2>
          <div className="projects-grid">
            <article className="project">
              <h3>Healvora</h3>
              <p>Healthcare waste management platform</p>
              <a href="https://healvora.vercel.app" target="_blank" rel="noreferrer">Visit →</a>
            </article>

            <article className="project">
              <h3>Galaxy Portfolio</h3>
              <p>3D interactive portfolio (R3F)</p>
              <a href="https://aviral-mishra.app" target="_blank" rel="noreferrer">Visit →</a>
            </article>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section reveal">
          <h2>Let’s Build</h2>
          <div className="contact-grid" style={{marginTop:18}}>
            <form
              className="form"
              action="https://formsubmit.co/YOUR_EMAIL@example.com"
              method="POST"
            >
              {/* set honeypot to avoid spam */}
              <input type="hidden" name="_subject" value="New message from portfolio" />
              <input type="hidden" name="_captcha" value="false" />
              <label>Name<input name="name" required /></label>
              <label>Email<input name="email" type="email" required /></label>
              <label>Message<textarea name="message" rows={6} required></textarea></label>
              <button type="submit">Send message</button>
            </form>

            <div style={{padding:18, borderRadius:12, background:"linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.18))", border:"1px solid rgba(255,255,255,0.03)"}}>
              <h3>Contact details & review</h3>
              <p style={{color:"#cfeee0"}}>Email: <strong style={{color:"#e6fff0"}}>YOUR_EMAIL@example.com</strong></p>
              <p style={{marginTop:8}}>If you'd like a detailed project breakdown or quotation, drop your brief & I'll reply with timeline and cost estimate.</p>

              <div style={{marginTop:16}}>
                <h4 style={{color:"#bff6d7"}}>Quick review summary</h4>
                <ul style={{color:"#cfeee0", marginTop:8}}>
                  <li>Performance-focused architecture</li>
                  <li>Observability & testing integrated</li>
                  <li>Scalable DB design (Postgres/Prisma)</li>
                  <li>CI/CD & containerized deployments</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer>
          © {new Date().getFullYear()} Aviral Mishra — Designed & Built with ❤️
        </footer>
      </div>
    </main>
  );
}
