"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";

// -----------------------------------------------------------------------------
// BEAUTIFIED PROFESSIONAL PORTFOLIO HOME
// Features added: animated gradients, refined typography/spacing, navbar micro-interactions,
// enhanced hero animation, smooth custom cursor, premium project cards, more detailed bio.
// -----------------------------------------------------------------------------

function ThemeToggle() {
  const [theme, setTheme] = useState<string>(
    typeof window !== "undefined" && document.documentElement.classList.contains("dark")
      ? "dark"
      : "light"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-sm backdrop-blur transition-shadow hover:shadow-lg"
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}

function useParticlesInit() {
  return async function (engine: Engine) {
    await loadFull(engine);
  };
}

export default function Home() {
  const particlesInit = useParticlesInit();
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const pos = useRef({ x: 0, y: 0 });

  // Smooth cursor using RAF
  useEffect(() => {
    let raf = 0;
    const cursor = cursorRef.current;
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const render = () => {
      pos.current.x += (mouse.x - pos.current.x) * 0.12;
      pos.current.y += (mouse.y - pos.current.y) * 0.12;
      if (cursor) {
        cursor.style.transform = `translate3d(${pos.current.x - 12}px, ${pos.current.y - 12}px, 0)`;
      }
      raf = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  // Parallax for cards (subtle based on mouse)
  useEffect(() => {
    const container = document.getElementById("hero-cards");
    if (!container) return;
    const handle = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;

      Array.from(container.querySelectorAll(".card")).forEach((el: any, i) => {
        const depth = (i + 1) * 6; // different depth per card
        el.style.transform = `translate3d(${dx * depth}px, ${dy * depth}px, 0) rotateX(${dy * 5}deg) rotateY(${dx * 5}deg)`;
      });
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  // Smooth anchor scroll
  useEffect(() => {
    const links = Array.from(document.querySelectorAll('a[href^="#"]'));
    links.forEach((link) => {
      const handler = (e: Event) => {
        e.preventDefault();
        const href = (e.currentTarget as HTMLAnchorElement).getAttribute("href")!;
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      };
      link.addEventListener("click", handler);
      (link as any)._handler = handler;
    });
    return () =>
      links.forEach((link) =>
        link.removeEventListener("click", (link as any)._handler)
      );
  }, []);

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white overflow-x-hidden selection:bg-green-600/30">
      {/* custom smooth cursor */}
      <div
        ref={cursorRef}
        aria-hidden
        className="pointer-events-none fixed w-6 h-6 rounded-full bg-green-400/90 shadow-[0_6px_24px_rgba(34,197,94,0.25)] z-[9999] transform-gpu transition-transform"
      />

      {/* animated gradient keyframes + small utility tweaks injected locally */}
      <style jsx global>{`
        @keyframes gradient-slide { 0% { background-position: 0% 50%; } 100% { background-position: 100% 50%; } }
        .animate-gradient { background-size: 200% 200%; animation: gradient-slide 6s ease infinite alternate; }
        .card { transition: transform 0.35s cubic-bezier(.2,.9,.3,1); will-change: transform; }
      `}</style>

      {/* particles background */}
      <Particles
        className="absolute inset-0 -z-20"
        init={particlesInit}
        options={{
          background: { color: "transparent" },
          fpsLimit: 60,
          interactivity: { events: { onHover: { enable: true, mode: "grab" }, resize: true } },
          particles: {
            number: { value: 50 },
            color: { value: "#22c55e" },
            links: { enable: true, distance: 160, color: "#22c55e", opacity: 0.18, width: 1 },
            move: { enable: true, speed: 0.5 },
            size: { value: { min: 1, max: 3 } },
            opacity: { value: 0.45 },
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
          <a href="#home" className="hover:text-green-300 transition">Home</a>
          <a href="#about" className="hover:text-green-300 transition">About</a>
          <a href="#skills" className="hover:text-green-300 transition">Skills</a>
          <a href="#projects" className="hover:text-green-300 transition">Projects</a>
          <a href="#contact" className="hover:text-green-300 transition">Contact</a>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a href="https://github.com/Aviral-1" target="_blank" rel="noreferrer" className="text-gray-200/90 hover:text-green-300">GitHub</a>
        </div>
      </nav>

      {/* HERO */}
      <header id="home" className="min-h-screen flex items-center justify-center px-6 pt-24">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* left - intro */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-300 to-lime-300 animate-gradient drop-shadow-md">
              Hi, I’m <span className="text-white">Aviral Mishra</span>
            </h1>

            <p className="text-lg text-gray-300 max-w-xl leading-relaxed">
              I build production-grade web applications and backend systems — focusing on <strong>performance</strong>, <strong>reliability</strong>, and <strong>developer experience</strong>.
              I bring experience in system design, observability, and delivering features end-to-end.
            </p>

            <div className="flex gap-4 mt-4">
              <a href="#projects" className="inline-flex items-center gap-2 bg-gradient-to-r from-green-400 to-emerald-500 text-black px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-[1.02] transition-transform">
                View Projects <ArrowRight />
              </a>

              <a href="#contact" className="inline-flex items-center gap-2 border border-white/10 px-5 py-3 rounded-full text-sm hover:bg-white/2 transition">
                Contact Me
              </a>
            </div>

            <div className="mt-6 flex gap-4 items-center">
              <a href="https://github.com/Aviral-1" target="_blank" rel="noreferrer" className="text-gray-200/90 hover:text-green-300"><Github /></a>
              <a href="https://linkedin.com/in/aviral-mishra" target="_blank" rel="noreferrer" className="text-gray-200/90 hover:text-green-300"><Linkedin /></a>
              <a href="mailto:aviral@example.com" className="text-gray-200/90 hover:text-green-300"><Mail /></a>
            </div>

            {/* brief pro summary */}
            <div className="mt-8 p-4 bg-black/30 rounded-lg border border-green-500/8">
              <h4 className="text-sm text-green-300 font-semibold">Quick facts</h4>
              <ul className="mt-2 text-sm text-gray-300 leading-relaxed list-disc list-inside">
                <li>5+ years building web platforms (startups & enterprise)</li>
                <li>Led migrations to microservices & event-driven systems</li>
                <li>Experience with Postgres, Prisma, Redis, and scalable infra</li>
                <li>Focus on observability, testing, and maintainable code</li>
              </ul>
            </div>
          </motion.div>

          {/* right - premium cards */}
          <div id="hero-cards" className="flex flex-col gap-4 items-center md:items-end">
            <div className="w-full md:w-80 card">
              <div className="card-inner card rounded-2xl p-6 bg-gradient-to-br from-black/70 to-zinc-900 border border-green-500/10 shadow-xl">
                <h3 className="text-lg font-semibold text-green-200">Frontend Craft</h3>
                <p className="mt-2 text-sm text-gray-300">Accessible, high-performance interfaces using Next.js (RSC/SSR), React, and Tailwind.</p>
              </div>
            </div>

            <div className="w-full md:w-80 card">
              <div className="card-inner card rounded-2xl p-6 bg-gradient-to-br from-black/70 to-zinc-900 border border-green-500/10 shadow-xl">
                <h3 className="text-lg font-semibold text-green-200">Backend & APIs</h3>
                <p className="mt-2 text-sm text-gray-300">Type-safe services, robust auth, caching, and efficient data models with Prisma & Postgres.</p>
              </div>
            </div>

            <div className="w-full md:w-80 card">
              <div className="card-inner card rounded-2xl p-6 bg-gradient-to-br from-black/70 to-zinc-900 border border-green-500/10 shadow-xl">
                <h3 className="text-lg font-semibold text-green-200">Cloud & DevOps</h3>
                <p className="mt-2 text-sm text-gray-300">Docker, CI/CD, IaC, monitoring and scalable deployment patterns for reliability.</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ABOUT */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-green-300 mb-4">About me</h3>
          <p className="text-gray-300 leading-relaxed">I’m a full-stack engineer focusing on scalable architecture, strong UX, maintainable codebases and measurable engineering outcomes. I enjoy systems design, DevOps culture, and turning complex ideas into polished real-world products.</p>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-20 px-6 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-green-300 mb-8 text-center">Skills</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Next.js","React","TypeScript","Node.js","Prisma","Postgres","MongoDB","Docker"].map((skill) => (
              <motion.div key={skill} whileHover={{ scale: 1.04 }} className="p-4 rounded-xl bg-black/60 border border-green-500/10 text-center">
                <div className="text-green-300 font-semibold">{skill}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-green-300 mb-8 text-center">Selected Projects</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[{title: "Healvora", desc: "Healthcare waste management platform", link: "https://healvora.vercel.app"},{title: "Galaxy Portfolio", desc: "3D interactive portfolio built with R3F", link: "https://aviral-mishra.app"}].map((p) => (
              <motion.a key={p.title} href={p.link} target="_blank" whileHover={{ scale: 1.03 }} className="block p-6 rounded-2xl bg-gradient-to-br from-black/70 to-zinc-900 border border-green-500/10 shadow-lg hover:shadow-2xl transition">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-black font-bold">{p.title.split(" ")[0].charAt(0)}</div>
                  <div>
                    <h4 className="text-xl font-semibold text-green-200">{p.title}</h4>
                    <p className="text-gray-300 mt-1">{p.desc}</p>
                    <div className="mt-4 text-sm text-green-300">Visit ↗</div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 px-6 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-green-300 mb-4">Let’s build</h3>
          <p className="text-gray-300 mb-6">Open to freelance, collaboration and full-time opportunities. I usually respond within 24–48 hours.</p>

          <a href="mailto:aviral@example.com" className="inline-flex items-center gap-2 bg-gradient-to-r from-green-400 to-emerald-500 text-black px-6 py-3 rounded-full font-semibold">Say hello <ArrowRight /></a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center text-sm text-gray-400 border-t border-green-500/5">© {new Date().getFullYear()} Aviral Mishra — Designed & Built with ❤️</footer>
    </main>
  );
}
