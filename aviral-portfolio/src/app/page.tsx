"use client";

import React, { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

/* ================= TYPING LOOP ================= */
const phrases = [
  "I build scalable web applications",
  "I design clean, usable interfaces",
  "I optimize performance & DX",
  "I engineer production systems",
];

function useTypingLoop() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const current = phrases[index];
    const speed = del ? 40 : 80;

    const t = setTimeout(() => {
      setText((prev) =>
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

/* ================= PAGE ================= */
export default function Page() {
  const typed = useTypingLoop();
  const cursorRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState(false);
  const [top, setTop] = useState(false);

  /* Particles */
  useEffect(() => {
    initParticlesEngine(async (e) => loadSlim(e)).then(() => setParticles(true));
  }, []);

  /* Cursor */
  useEffect(() => {
    const c = cursorRef.current!;
    const p = { x: 0, y: 0 };
    let x = 0,
      y = 0;

    const move = (e: PointerEvent) => {
      p.x = e.clientX;
      p.y = e.clientY;
    };

    window.addEventListener("pointermove", move);
    const loop = () => {
      x += (p.x - x) * 0.18;
      y += (p.y - y) * 0.18;
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
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("show")
        ),
      { threshold: 0.12 }
    );

    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    window.addEventListener("scroll", () => setTop(window.scrollY > 600));

    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const magnets = document.querySelectorAll<HTMLElement>(".magnetic");

    magnets.forEach(el => {
      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
      });

      el.addEventListener("mouseleave", () => {
        el.style.transform = "translate(0,0)";
      });
    });
  }, []);


  const progressRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const percent = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      if (progressRef.current) {
        progressRef.current.style.width = percent + "%";
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  useEffect(() => {
    const label = labelRef.current;
    if (!label) return;

    const show = (text: string) => {
      label.textContent = text;
      label.style.opacity = "1";
    };
    const hide = () => label.style.opacity = "0";

    document.querySelectorAll("a, button, .project").forEach(el => {
      el.addEventListener("mouseenter", () => show("VIEW"));
      el.addEventListener("mouseleave", hide);
    });
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>(".parallax");

    const onScroll = () => {
      const y = window.scrollY;
      items.forEach((el, i) => {
        el.style.transform = `translateY(${y * (0.04 + i * 0.01)}px)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  const clickSound = typeof Audio !== "undefined"
  ? new Audio("/click.mp3")
  : null;

useEffect(() => {
  document.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("mouseenter", () => {
      if (clickSound) {
        clickSound.volume = 0.04;
        clickSound.currentTime = 0;
        clickSound.play().catch(() => {});
      }
    });
  });
}, []);

useEffect(() => {
  let last = performance.now();
  const guard = () => {
    const now = performance.now();
    if (now - last < 16) requestAnimationFrame(guard);
    last = now;
  };
  requestAnimationFrame(guard);
}, []);



  return (
    <main>
      <div ref={cursorRef} className="cursor-glow" />
      <div className="page-wipe" aria-hidden />
      <div ref={labelRef} className="cursor-label">VIEW</div>

      {particles && (
        <Particles
          className="particles"
          options={{
            particles: {
              number: { value: 40 },
              links: { enable: true, distance: 140, opacity: 0.12 },
              move: { speed: 0.3 },
              size: { value: { min: 1, max: 3 } },
              opacity: { value: 0.3 },
            },
          }}
        />
      )}

      {/* ================= NAV ================= */}
      <nav className="navbar">
        <strong>Aviral Mishra</strong>
        <div className="navlinks">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section id="home" className="hero">
        <div className="container reveal">
          <h1>
            Hi, I’m <span>Aviral Mishra</span>
          </h1>
          <div className="typing">
            {typed}
            <span className="caret">|</span>
          </div>
          <p className="lead">
            Full-stack engineer building fast, reliable and maintainable web
            applications with modern technologies.
          </p>

          <div className="cta">
            <a href="#projects" className="btn primary">
              View Projects
            </a>
            <a href="#contact" className="btn ghost">
              Contact Me
            </a>
          </div>

          <div style={{ marginTop: 32 }}>
            <Github /> <Linkedin /> <Mail />
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="section reveal">
        <div className="container section-header">
          <h2>About Me</h2>
          <p>
            I’m a full-stack developer with a strong focus on architecture,
            performance, and clean user experience. I enjoy turning complex
            problems into simple, scalable solutions.
          </p>
        </div>
      </section>

      {/* ================= WHAT I DO ================= */}
      <section id="work" className="section reveal">
        <div className="container">
          <div className="section-header">
            <h2>What I Do</h2>
            <p>End-to-end development with production mindset.</p>
          </div>

          <div className="grid-3">
            <div className="card">
              <h3>Frontend Engineering</h3>
              <p>
                React, Next.js, TypeScript with a focus on accessibility,
                performance and clean UI architecture.
              </p>
            </div>

            <div className="card">
              <h3>Backend & APIs</h3>
              <p>
                Node.js, NestJS, Prisma, PostgreSQL — secure, scalable and
                maintainable backend systems.
              </p>
            </div>

            <div className="card">
              <h3>System Design</h3>
              <p>
                Database modeling, API contracts, authentication, deployment and
                CI/CD thinking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROJECTS ================= */}
      <section id="projects" className="section reveal">
        <div className="container">
          <div className="section-header">
            <h2>Featured Projects</h2>
            <p>Real projects with real engineering decisions.</p>
          </div>

          <div className="grid-2">
            <div className="card">
              <h3>Healvora</h3>
              <p>
                Healthcare waste management platform with role-based access,
                dashboards, and scalable backend architecture.
              </p>
            </div>

            <div className="card">
              <h3>Galaxy Portfolio</h3>
              <p>
                Interactive 3D portfolio experiment using modern rendering and
                performance-aware design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="section reveal">
        <div className="container">
          <div className="section-header">
            <h2>Let’s Work Together</h2>
            <p>
              Have a project, idea, or opportunity? I’d love to hear about it.
            </p>
          </div>

          <form className="form">
            <input placeholder="Your name" />
            <input placeholder="Your email" />
            <textarea placeholder="Tell me about your project" />
            <button className="btn primary">Send Message</button>
          </form>
        </div>
      </section>

      {top && (
        <button
          className="backtop"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
        >
          <ArrowUp />
        </button>
      )}

      <footer>© {new Date().getFullYear()} Aviral Mishra</footer>
    </main>
  );
}
