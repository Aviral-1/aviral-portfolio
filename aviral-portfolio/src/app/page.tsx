"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight, Sparkles } from "lucide-react";

// import Particles from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";
    // import { loadFull } from "@tsparticles/full";  // --- IGNORE ---
import { loadFull } from "tsparticles";
import Particles from "react-particles";



/* ------------------------ Theme toggle ------------------------ */
const ThemeToggle = (): React.JSX.Element => {
  const themeRef = useRef<"dark" | "light">("light");

  useEffect(() => {
    const isDark =
      typeof window !== "undefined" &&
      document.documentElement.classList.contains("dark");
    themeRef.current = isDark ? "dark" : "light";
  }, []);

  const toggle = () => {
    themeRef.current = themeRef.current === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", themeRef.current === "dark");
  };

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggle}
      className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-sm backdrop-blur transition-shadow hover:shadow-lg"
    >
      {themeRef.current === "dark" ? "Light" : "Dark"}
    </button>
  );
}

/* ------------------------ Particles init ------------------------ */
const useParticlesInit = () =>
  useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

/* -------------------------- Main ------------------------------- */
export default function Home(): React.JSX.Element  {
  const particlesInit = useParticlesInit();

  /* ------------------------ Cursor ------------------------ */
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const rendered = { x: target.x, y: target.y };
    let rafId = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    const animate = () => {
      const ease = 0.14;
      rendered.x += (target.x - rendered.x) * ease;
      rendered.y += (target.y - rendered.y) * ease;

      cursor.style.transform = `translate3d(${rendered.x - 12}px, ${
        rendered.y - 12
      }px, 0)`;

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  /* ------------------------ Card parallax ------------------------ */
  const heroCardsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = heroCardsRef.current;
    if (!container) return;

    const cards = Array.from(container.querySelectorAll<HTMLElement>(".card"));
    if (cards.length === 0) return;

    const point = { nx: 0, ny: 0 };
    let rafId = 0;

    const onMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      point.nx = (e.clientX - cx) / rect.width;
      point.ny = (e.clientY - cy) / rect.height;
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    const animate = () => {
      cards.forEach((card, i) => {
        const depth = (i + 1) * 6;

        card.style.transform = `
          translate3d(${point.nx * depth}px, ${point.ny * depth}px, 0)
          rotateX(${point.ny * 6}deg)
          rotateY(${point.nx * 6}deg)
        `;
      });

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  /* ------------------- Smooth anchors -------------------- */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const link = el.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!link) return;

      e.preventDefault();
      const sel = link.getAttribute("href")!;
      const target = document.querySelector(sel);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const fadeInLeft = { hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0 } };

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white overflow-x-hidden selection:bg-green-600/30">

      {/* Cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed w-6 h-6 rounded-full bg-green-400/90 shadow-[0_6px_24px_rgba(34,197,94,0.25)] z-[9999]"
      />

      {/* Gradient animations */}
      <style>{`
        @keyframes gradient-slide { 0% { background-position: 0% 50%; } 100% { background-position: 100% 50%; } }
        .animate-gradient { background-size: 200% 200%; animation: gradient-slide 6s ease infinite alternate; }
        .card { transition: transform .35s cubic-bezier(.2,.9,.3,1); }
      `}</style>

      {/* Particles */}
     <Particles
  id="particles"
  init={particlesInit}
  className="absolute inset-0 -z-20"
  options={{
    background: { color: "transparent" },
    particles: {
      number: { value: 50 },
      color: { value: "#22c55e" },
      links: {
        enable: true,
        distance: 140,
        color: "#22c55e",
        opacity: 0.2,
        width: 1,
      },
      move: { enable: true, speed: 0.4 },
      opacity: { value: 0.4 },
      size: { value: { min: 1, max: 3 } },
    },
  }}
/>


      {/* NAVBAR */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] md:w-[80%] rounded-3xl bg-black/40 border border-white/5 backdrop-blur px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-gradient-to-br from-green-400 to-emerald-600 p-2 shadow-md">
            <Sparkles className="text-black" />
          </div>
          <div className="font-semibold text-green-300 tracking-wide">Aviral Mishra</div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm text-gray-200">
          <a href="#home" className="hover:text-green-300">Home</a>
          <a href="#about" className="hover:text-green-300">About</a>
          <a href="#skills" className="hover:text-green-300">Skills</a>
          <a href="#projects" className="hover:text-green-300">Projects</a>
          <a href="#contact" className="hover:text-green-300">Contact</a>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a href="https://github.com/Aviral-1" target="_blank" className="text-gray-200 hover:text-green-300">GitHub</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header id="home" className="min-h-screen flex items-center justify-center px-6 pt-24">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* left */}
          <motion.div
            initial="hidden"
            whileInView="show"
            variants={fadeInLeft}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-300 to-lime-300 animate-gradient">
              Hi, I’m <span className="text-white">Aviral Mishra</span>
            </h1>

            <p className="text-lg text-gray-300 max-w-xl">
              I build production-grade web applications and backend systems — focusing on performance, reliability, and developer experience.
            </p>

            <div className="flex gap-4">
              <a href="#projects" className="inline-flex items-center gap-2 bg-gradient-to-r from-green-400 to-emerald-500 text-black px-6 py-3 rounded-full font-semibold">
                View Projects <ArrowRight />
              </a>

              <a href="#contact" className="inline-flex items-center gap-2 border border-white/10 px-5 py-3 rounded-full text-sm hover:bg-white/5">
                Contact Me
              </a>
            </div>

            <div className="flex gap-4 items-center">
              <a href="https://github.com/Aviral-1" target="_blank"><Github /></a>
              <a href="https://linkedin.com/in/aviral-mishra" target="_blank"><Linkedin /></a>
              <a href="mailto:aviral@example.com"><Mail /></a>
            </div>

            <div className="mt-8 p-4 bg-black/30 rounded-lg border border-green-500/10">
              <h4 className="text-sm text-green-300">Quick facts</h4>
              <ul className="mt-2 text-sm text-gray-300 list-disc list-inside">
                <li>5+ years building web platforms</li>
                <li>Led migrations to microservices</li>
                <li>Experience with Postgres, Prisma, Redis</li>
                <li>Focus on observability and testing</li>
              </ul>
            </div>
          </motion.div>

          {/* right cards */}
          <div ref={heroCardsRef} className="flex flex-col gap-4 items-center md:items-end">

            {[
              { title: "Frontend Craft", desc: "High-performance interfaces using Next.js, React, Tailwind." },
              { title: "Backend & APIs", desc: "Type-safe services, auth, caching, database modelling." },
              { title: "Cloud & DevOps", desc: "Docker, CI/CD, IaC, scalable deployment systems." },
            ].map((c) => (
              <div key={c.title} className="w-full md:w-80 card">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-black/70 to-zinc-900 border border-green-500/10">
                  <h3 className="text-lg font-semibold text-green-200">{c.title}</h3>
                  <p className="mt-2 text-sm text-gray-300">{c.desc}</p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </header>

      {/* ABOUT */}
      <section id="about" className="py-20 px-6 text-center">
        <h3 className="text-3xl font-bold text-green-300 mb-4">About me</h3>
        <p className="max-w-3xl mx-auto text-gray-300">
          I’m a full-stack engineer focusing on scalable architecture and clean, maintainable engineering systems.
        </p>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-20 px-6 bg-black/20">
        <h3 className="text-3xl font-bold text-green-300 mb-8 text-center">Skills</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {["Next.js", "React", "TypeScript", "Node.js", "Prisma", "Postgres", "MongoDB", "Docker"].map((s) => (
            <motion.div key={s} whileHover={{ scale: 1.05 }} className="p-4 bg-black/60 rounded-xl text-center border border-green-500/10">
              <span className="text-green-300 font-semibold">{s}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-20 px-6">
        <h3 className="text-3xl font-bold text-green-300 mb-8 text-center">Selected Projects</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {[
            { title: "Healvora", desc: "Healthcare waste management platform", link: "https://healvora.vercel.app" },
            { title: "Galaxy Portfolio", desc: "3D interactive portfolio (R3F)", link: "https://aviral-mishra.app" },
          ].map((p) => (
            <motion.a
              key={p.title}
              href={p.link}
              target="_blank"
              whileHover={{ scale: 1.03 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-black/70 to-zinc-900 border border-green-500/10 shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center font-bold text-black">
                  {p.title.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-green-200">{p.title}</h4>
                  <p className="text-gray-300 mt-1">{p.desc}</p>
                  <div className="mt-3 text-sm text-green-400">Visit ↗</div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 px-6 text-center bg-black/10">
        <h3 className="text-3xl font-bold text-green-300 mb-4">Let’s build</h3>
        <p className="text-gray-300 mb-6">
          Open to freelance, collaboration and full-time opportunities.
        </p>

        <a
          href="mailto:aviral@example.com"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-green-400 to-emerald-500 text-black px-6 py-3 rounded-full font-semibold"
        >
          Say hello <ArrowRight />
        </a>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center text-sm text-gray-500 border-t border-green-500/10">
        © {new Date().getFullYear()} Aviral Mishra — Designed & Built with ❤️
      </footer>

    </main>
  );
}
