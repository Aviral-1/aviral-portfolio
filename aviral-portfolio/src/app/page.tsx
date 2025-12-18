"use client";

import React, { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

/* ================= ANIMATION VARIANTS ================= */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const stagger = {
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

/* ================= PAGE ================= */
export default function Page() {
  const typed = useTypingLoop();
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState(false);
  const [top, setTop] = useState(false);

  /* Particles */
  useEffect(() => {
    initParticlesEngine(async (e) => loadSlim(e)).then(() =>
      setParticles(true)
    );
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

  /* Back to top */
  useEffect(() => {
    const onScroll = () => setTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Cursor label */
  useEffect(() => {
    const label = labelRef.current;
    if (!label) return;

    const show = () => (label.style.opacity = "1");
    const hide = () => (label.style.opacity = "0");

    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", show);
      el.addEventListener("mouseleave", hide);
    });
  }, []);

  return (
    <main>
      <div ref={cursorRef} className="cursor-glow" />
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

      {/* NAV */}
      <motion.nav
        className="navbar"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <strong>Aviral Mishra</strong>
        <div className="navlinks">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </motion.nav>

      {/* HERO */}
      <section id="home" className="hero">
        <motion.div
          className="container hero-grid"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.h1 variants={fadeUp}>
            Hi, I’m <span>Aviral Mishra</span>
          </motion.h1>

          <motion.div className="typing" variants={fadeUp}>
            {typed}
            <span className="caret">|</span>
          </motion.div>

          <motion.p className="lead" variants={fadeUp}>
            Full-stack engineer crafting fast, scalable and reliable
            web applications with strong architecture.
          </motion.p>

          <motion.div className="cta" variants={fadeUp}>
            <motion.a
              href="#projects"
              className="btn primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.a>

            <motion.a
              href="#contact"
              className="btn ghost"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </motion.div>

          <motion.div className="socials" variants={fadeUp}>
            <Github />
            <Linkedin />
            <Mail />
          </motion.div>
        </motion.div>
      </section>

      {/* ABOUT */}
      <motion.section
        id="about"
        className="section"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <div className="container section-header">
          <h2>About Me</h2>
          <p>
            I focus on building production-ready systems with clean UI,
            strong backend design, and long-term scalability.
          </p>
        </div>
      </motion.section>

      {/* WORK */}
      <motion.section
        id="work"
        className="section"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <div className="container">
          <div className="grid-3">
            {["Frontend", "Backend", "Systems"].map((title) => (
              <motion.div
                key={title}
                className="card"
                whileHover={{ y: -12, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3>{title}</h3>
                <p>
                  {title === "Frontend" &&
                    "React, Next.js, TypeScript, modern CSS."}
                  {title === "Backend" &&
                    "Node.js, NestJS, Prisma, PostgreSQL."}
                  {title === "Systems" &&
                    "Architecture, CI/CD, deployments."}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* PROJECTS */}
      <motion.section
        id="projects"
        className="section"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <div className="container grid-2">
          {["Healvora", "Galaxy Portfolio"].map((p) => (
            <motion.div
              key={p}
              className="card"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
              }}
            >
              <h3>{p}</h3>
              <p>
                {p === "Healvora"
                  ? "Healthcare waste management platform."
                  : "3D interactive portfolio experiment."}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CONTACT */}
      <motion.section
        id="contact"
        className="section"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <div className="container">
          <form className="form">
            <input placeholder="Your name" />
            <input placeholder="Your email" />
            <textarea placeholder="Tell me about your project" />
            <motion.button
              className="btn primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </form>
        </div>
      </motion.section>

      {/* BACK TO TOP */}
      <AnimatePresence>
        {top && (
          <motion.button
            className="backtop"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.15 }}
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
