"use client";

import React, { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useReducedMotion,
} from "framer-motion";
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
        del
          ? current.slice(0, prev.length - 1)
          : current.slice(0, prev.length + 1)
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

/* ================= MAGNETIC BUTTON ================= */
function MagneticButton({ children, className, ...props }: any) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  const move = (e: React.MouseEvent) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;

    el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0,0)";
  };

  return (
    <motion.button
      ref={ref}
      className={className}
      onMouseMove={move}
      onMouseLeave={reset}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

/* ================= TILT CARD ================= */
function TiltCard({ children, className }: any) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    const rx = -(y / r.height - 0.5) * 12;
    const ry = (x / r.width - 0.5) * 12;

    el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale(1.05)`;
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "rotateX(0) rotateY(0) scale(1)";
  };

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      onMouseMove={move}
      onMouseLeave={reset}
    >
      {children}
    </div>
  );
}

/* ================= ANIMATION ================= */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const sections = ["home", "about", "work", "projects", "contact"];

/* ================= PAGE ================= */
export default function Page() {
  const typed = useTypingLoop();
  const [particles, setParticles] = useState(false);
  const [top, setTop] = useState(false);
  const [active, setActive] = useState("home");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  /* Particles init */
  useEffect(() => {
    initParticlesEngine(async (e) => loadSlim(e)).then(() => setParticles(true));
  }, []);

  /* Active nav + back to top */
  useEffect(() => {
    const onScroll = () => {
      const pos = window.scrollY + 120;
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight)
          setActive(id);
      });
      setTop(window.scrollY > 600);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main>
      <motion.div className="scroll-progress" style={{ scaleX }} />

      {particles && (
        <Particles
          className="particles"
          options={{
            particles: {
              number: { value: 40 },
              move: { speed: 0.3 },
              links: { enable: true, opacity: 0.15 },
              opacity: { value: 0.35 },
            },
          }}
        />
      )}

      {/* NAV */}
      <motion.nav className="navbar" initial={{ y: -60 }} animate={{ y: 0 }}>
        <strong>Aviral Mishra</strong>
        <div className="navlinks">
          {sections.map((id) => (
            <a key={id} href={`#${id}`} className={active === id ? "active" : ""}>
              {id.toUpperCase()}
              {active === id && (
                <motion.span className="nav-indicator" layoutId="nav" />
              )}
            </a>
          ))}
        </div>
      </motion.nav>

      {/* HERO */}
      <section id="home" className="hero">
        <motion.div className="container" variants={fadeUp} initial="hidden" animate="show">
          <h1>Hi, I’m <span>Aviral Mishra</span></h1>
          <div className="typing">{typed}<span className="caret">|</span></div>
          <p className="lead">Full-stack engineer crafting scalable, elegant systems.</p>
          <div className="cta">
            <MagneticButton className="btn primary">View Projects</MagneticButton>
            <MagneticButton className="btn ghost">Contact Me</MagneticButton>
          </div>
          <div className="socials"><Github /><Linkedin /><Mail /></div>
        </motion.div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
        <motion.div className="container" variants={fadeUp} initial="hidden" whileInView="show">
          <h2>About Me</h2>
          <p>I build production-grade web apps with performance & clarity.</p>
        </motion.div>
      </section>

      {/* WORK */}
      <section id="work" className="section grid-3">
        {["Frontend", "Backend", "Systems"].map((t) => (
          <TiltCard key={t} className="card glass"><h3>{t}</h3></TiltCard>
        ))}
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section grid-2">
        {["Healvora", "Galaxy Portfolio"].map((p) => (
          <TiltCard key={p} className="card glass"><h3>{p}</h3></TiltCard>
        ))}
      </section>

      {/* CONTACT */}
      <section id="contact" className="section">
        <motion.form className="container form" variants={fadeUp} initial="hidden" whileInView="show">
          <input placeholder="Your name" />
          <input placeholder="Your email" />
          <textarea placeholder="Tell me about your project" />
          <MagneticButton className="btn primary">Send Message</MagneticButton>
        </motion.form>
      </section>

      <AnimatePresence>
        {top && (
          <motion.button className="backtop" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
            <ArrowUp />
          </motion.button>
        )}
      </AnimatePresence>

      <footer>© {new Date().getFullYear()} Aviral Mishra</footer>
    </main>
  );
}
