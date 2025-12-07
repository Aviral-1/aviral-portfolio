"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight, Sparkles } from "lucide-react";

import Particles from "react-particles";
import type { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";

/* ------------------------ Theme toggle ------------------------ */
const ThemeToggle = (): React.JSX.Element => {
  const themeRef = useRef<"dark" | "light">("dark");

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
      className="px-3 py-1 rounded-full border border-white/10 bg-white/4 text-sm backdrop-blur-md transition-shadow hover:shadow-lg"
    >
      {themeRef.current === "dark" ? "Light" : "Dark"}
    </button>
  );
};

/* ------------------------ Particles init ------------------------ */
const useParticlesInit = () =>
  useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

/* -------------------------- Main ------------------------------- */
export default function Home(): React.JSX.Element {
  const particlesInit = useParticlesInit();

  /* cursor */
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
      cursor.style.transform = `translate3d(${Math.round(rendered.x - 10)}px, ${Math.round(
        rendered.y - 10
      )}px, 0)`;
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  /* parallax for hero cards */
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
        const tx = point.nx * depth;
        const ty = point.ny * depth;
        const rx = point.ny * 6;
        const ry = point.nx * 6;
        card.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  /* smooth anchor scrolling */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el) return;
      const a = el.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      e.preventDefault();
      const id = a.getAttribute("href")!;
      const dest = document.querySelector(id);
      if (dest) dest.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const fadeInLeft = { hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0 } };

  return (
    <main className="relative min-h-screen bg-[#06070a] text-white overflow-x-hidden selection:bg-emerald-400/25">
      {/* custom cursor */}
      <div
        ref={cursorRef}
        aria-hidden
        className="pointer-events-none fixed w-5 h-5 rounded-full bg-emerald-400/90 shadow-[0_8px_30px_rgba(16,185,129,0.18)] z-[9999] transform-gpu will-change-transform"
      />

      {/* gradient + glass global styles */}
      <style>{`
        :root {
          --glass: rgba(255,255,255,0.04);
          --glass-2: rgba(255,255,255,0.02);
          --neon: rgba(16,185,129,0.12);
        }
        @keyframes gradient-slide { 0% { background-position: 0% 50% } 100% { background-position: 100% 50% } }
        .animate-gradient { background-size: 200% 200%; animation: gradient-slide 8s ease-in-out infinite alternate; }
        .glass-card {
          background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02));
          border: 1px solid rgba(255,255,255,0.05);
          backdrop-filter: blur(10px) saturate(120%);
        }
        .neon-outline { box-shadow: 0 6px 30px rgba(16,185,129,0.08), inset 0 1px 0 rgba(255,255,255,0.02); }
        .card { transition: transform .36s cubic-bezier(.18,.9,.24,1); will-change: transform; }
      `}</style>

      {/* Particles (subtle neon) */}
      <Particles
        id="particles"
        init={particlesInit}
        className="absolute inset-0 -z-20"
        options={{
          background: { color: "transparent" },
          fpsLimit: 60,
          interactivity: {
            events: { onHover: { enable: true, mode: "grab" }, resize: true },
          },
          particles: {
            number: { value: 38 },
            color: { value: "#10b981" },
            links: { enable: true, distance: 160, color: "#10b981", opacity: 0.12, width: 1 },
            move: { enable: true, speed: 0.45 },
            size: { value: { min: 1, max: 3 } },
            opacity: { value: 0.45 },
          },
        }}
      />

      {/* NAV */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-40 w-[94%] md:w-[82%] rounded-3xl bg-[rgba(8,10,12,0.55)] border border-white/6 backdrop-blur-md px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-gradient-to-br from-emerald-400 to-green-600 p-2 neon-outline">
            <Sparkles className="text-black" />
          </div>
          <div className="font-semibold text-emerald-300 tracking-wide">Aviral Mishra</div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm text-gray-200/90">
          <a href="#home" className="hover:text-emerald-300 transition">Home</a>
          <a href="#about" className="hover:text-emerald-300 transition">About</a>
          <a href="#skills" className="hover:text-emerald-300 transition">Skills</a>
          <a href="#projects" className="hover:text-emerald-300 transition">Projects</a>
          <a href="#contact" className="hover:text-emerald-300 transition">Contact</a>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a href="https://github.com/Aviral-1" target="_blank" rel="noreferrer" className="text-gray-200/90 hover:text-emerald-300">GitHub</a>
        </div>
      </nav>

      {/* HERO */}
      <header id="home" className="min-h-screen flex items-center px-6 pt-28">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* left */}
          <motion.div initial="hidden" whileInView="show" variants={fadeInLeft} transition={{ duration: 0.9 }} className="space-y-6">
            <h1 className="text-4xl md:text-6.25xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-lime-200 to-cyan-200 animate-gradient drop-shadow-[0_8px_40px_rgba(16,185,129,0.08)]">
              Hi, I’m <span className="text-white">Aviral Mishra</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
              I build production-grade web applications and backend systems — focused on <strong>performance</strong>, <strong>reliability</strong>, and <strong>developer experience</strong>.
              I ship observability, test-driven features, and delightful developer workflows.
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-400 to-green-600 text-black px-6 py-3 rounded-full font-semibold shadow-xl hover:scale-[1.03] transition-transform"
              >
                View Projects <ArrowRight />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 border border-white/8 px-5 py-3 rounded-full text-sm hover:bg-white/3 transition"
              >
                Contact Me
              </a>
            </div>

            <div className="mt-6 flex items-center gap-4 text-gray-200/90">
              <a href="https://github.com/Aviral-1" target="_blank" rel="noreferrer" className="hover:text-emerald-300"><Github /></a>
              <a href="https://linkedin.com/in/aviral-mishra" target="_blank" rel="noreferrer" className="hover:text-emerald-300"><Linkedin /></a>
              <a href="mailto:aviral@example.com" className="hover:text-emerald-300"><Mail /></a>
            </div>

            <div className="mt-8 p-5 glass-card rounded-2xl border border-white/5">
              <h4 className="text-sm text-emerald-300 font-semibold">Quick facts</h4>
              <ul className="mt-3 text-sm text-gray-300 list-inside list-disc space-y-1">
                <li>5+ years building web platforms (startups & enterprise)</li>
                <li>Led migrations to microservices & event-driven systems</li>
                <li>Experience with Postgres, Prisma, Redis, and scalable infra</li>
                <li>Focus on observability, testing, and maintainable code</li>
              </ul>
            </div>
          </motion.div>

          {/* right - premium stacked cards */}
          <div ref={heroCardsRef} className="flex flex-col gap-4 items-center md:items-end">
            <div className="w-full md:w-80 card">
              <div className="glass-card p-6 rounded-2xl neon-outline border border-emerald-400/6 shadow-xl">
                <h3 className="text-lg font-semibold text-emerald-200">Frontend Craft</h3>
                <p className="mt-2 text-sm text-gray-300">Accessible, high-performance interfaces using Next.js (RSC/SSR), React, and Tailwind.</p>
              </div>
            </div>

            <div className="w-full md:w-80 card">
              <div className="glass-card p-6 rounded-2xl neon-outline border border-emerald-400/6 shadow-xl">
                <h3 className="text-lg font-semibold text-emerald-200">Backend & APIs</h3>
                <p className="mt-2 text-sm text-gray-300">Type-safe services, robust auth, caching, and efficient data models with Prisma & Postgres.</p>
              </div>
            </div>

            <div className="w-full md:w-80 card">
              <div className="glass-card p-6 rounded-2xl neon-outline border border-emerald-400/6 shadow-xl">
                <h3 className="text-lg font-semibold text-emerald-200">Cloud & DevOps</h3>
                <p className="mt-2 text-sm text-gray-300">Docker, CI/CD, IaC, monitoring and scalable deployment patterns for reliability.</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ABOUT */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-emerald-300 mb-4">About me</h3>
          <p className="text-gray-300 leading-relaxed">
            I’m a full-stack engineer focusing on scalable architecture, strong UX, maintainable codebases and measurable engineering outcomes. I enjoy systems design, DevOps culture, and turning complex ideas into polished real-world products.
          </p>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-20 px-6 bg-[rgba(8,10,12,0.45)]">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-emerald-300 mb-8 text-center">Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Next.js", "React", "TypeScript", "Node.js", "Prisma", "Postgres", "MongoDB", "Docker"].map((skill) => (
              <motion.div key={skill} whileHover={{ scale: 1.03 }} className="p-4 rounded-xl glass-card border border-white/6 text-center">
                <div className="text-emerald-300 font-semibold">{skill}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-emerald-300 mb-8 text-center">Selected Projects</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Healvora", desc: "Healthcare waste management platform", link: "https://healvora.vercel.app" },
              { title: "Galaxy Portfolio", desc: "3D interactive portfolio (R3F)", link: "https://aviral-mishra.app" },
            ].map((p) => (
              <motion.a
                key={p.title}
                href={p.link}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.03 }}
                className="block p-6 rounded-2xl bg-[linear-gradient(180deg,#030405,#0b0c0e)] border border-emerald-400/6 shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-black font-bold">
                    {p.title.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-emerald-200">{p.title}</h4>
                    <p className="text-gray-300 mt-1">{p.desc}</p>
                    <div className="mt-4 text-sm text-emerald-300">Visit ↗</div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 px-6 bg-[rgba(6,7,10,0.45)]">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-emerald-300 mb-4">Let’s build</h3>
          <p className="text-gray-300 mb-6">Open to freelance, collaboration and full-time opportunities. I usually respond within 24–48 hours.</p>
          <a href="mailto:aviral@example.com" className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-400 to-green-600 text-black px-6 py-3 rounded-full font-semibold">
            Say hello <ArrowRight />
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center text-sm text-gray-400 border-t border-emerald-400/6">
        © {new Date().getFullYear()} Aviral Mishra — Designed & Built with ❤️
      </footer>
    </main>
  );
}
