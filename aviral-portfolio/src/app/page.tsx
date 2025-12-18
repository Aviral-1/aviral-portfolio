"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ArrowUp,
} from "lucide-react";
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
function MagneticButton({
  children,
  className,
  ...props
}: any) {
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

/* ================= ANIMATION ================= */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const sections = ["home", "about", "work", "projects", "contact"];

/* ================= PAGE ================= */
export default function Page() {
  const typed = useTypingLoop();
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState(false);
  const [top, setTop] = useState(false);
  const [active, setActive] = useState("home");

  /* Scroll progress */
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
  });

  /* Particles */
  useEffect(() => {
    initParticlesEngine(async (e) => loadSlim(e)).then(() =>
      setParticles(true)
    );
  }, []);

  /* Active nav */
  useEffect(() => {
    const onScroll = () => {
      const pos = window.scrollY + 120;

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        if (pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
          setActive(id);
        }
      });

      setTop(window.scrollY > 600);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main>
      {/* Scroll progress */}
      <motion.div className="scroll-progress" style={{ scaleX }} />

      {/* Cursor */}
      <div ref={cursorRef} className="cursor-glow" />
      <div ref={labelRef} className="cursor-label">VIEW</div>

      {/* Particles */}
      {particles && (
        <motion.div
          className="particles"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <Particles
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
        </motion.div>
      )}

      {/* NAVBAR */}
      <motion.nav
        className="navbar"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <strong>Aviral Mishra</strong>

        <div className="navlinks">
          {sections.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? "active" : ""}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
              {active === id && (
                <motion.span
                  className="nav-indicator"
                  layoutId="nav-indicator"
                />
              )}
            </a>
          ))}
        </div>
      </motion.nav>

      {/* HERO */}
      <section id="home" className="hero">
        <motion.div
          className="container"
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <h1>
            Hi, I’m <span>Aviral Mishra</span>
          </h1>

          <div className="typing">
            {typed}
            <span className="caret">|</span>
          </div>

          <p className="lead">
            Full-stack engineer crafting fast, scalable and reliable
            web applications with strong architecture.
          </p>

          <div className="cta">
            <MagneticButton className="btn primary">
              View Projects
            </MagneticButton>

            <MagneticButton className="btn ghost">
              Contact Me
            </MagneticButton>
          </div>

          <div className="socials">
            <Github /> <Linkedin /> <Mail />
          </div>
        </motion.div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
        <motion.div
          className="container section-header"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h2>About Me</h2>
          <p>
            I focus on building production-ready systems with clean UI,
            strong backend design, and long-term scalability.
          </p>
        </motion.div>
      </section>

      {/* WORK */}
      <section id="work" className="section">
        <motion.div
          className="container grid-3"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {["Frontend", "Backend", "Systems"].map((t) => (
            <motion.div
              key={t}
              className="card"
              whileHover={{ y: -10, scale: 1.03 }}
            >
              <h3>{t}</h3>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section">
        <motion.div
          className="container grid-2"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {["Healvora", "Galaxy Portfolio"].map((p) => (
            <motion.div
              key={p}
              className="card"
              whileHover={{ scale: 1.05 }}
            >
              <h3>{p}</h3>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section">
        <motion.form
          className="container form"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <input placeholder="Your name" />
          <input placeholder="Your email" />
          <textarea placeholder="Tell me about your project" />
          <MagneticButton className="btn primary">
            Send Message
          </MagneticButton>
        </motion.form>
      </section>

      {/* BACK TO TOP */}
      <AnimatePresence>
        {top && (
          <motion.button
            className="backtop"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
          >
            <ArrowUp />
          </motion.button>
        )}
      </AnimatePresence>

      <footer>© {new Date().getFullYear()} Aviral Mishra</footer>
    </main>
  );
}
