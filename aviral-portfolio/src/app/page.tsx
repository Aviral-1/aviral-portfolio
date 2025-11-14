"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
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

// ---------------------------------------------------------------------------------
// THEME TOGGLE
// ---------------------------------------------------------------------------------
function ThemeToggle() {
  const [theme, setTheme] = useState<string>(
    typeof window !== "undefined" &&
      document.documentElement.classList.contains("dark")
      ? "dark"
      : "light"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
      className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-sm backdrop-blur transition"
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}

// ---------------------------------------------------------------------------------
// FLOATING CARD WITH PARALLAX
// ---------------------------------------------------------------------------------
function FloatingCard({
  title,
  children,
  index,
}: {
  title: string;
  children: React.ReactNode;
  index: number;
}) {
  return (
    <motion.article
      className="group parallax-item rounded-2xl border border-green-500/10 
      bg-gradient-to-br from-zinc-900/60 to-black/60 p-6 shadow-xl relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 * index, duration: 0.7 }}
      whileHover={{ y: -12, scale: 1.03 }}
    >
      {/* Glow Light */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-20 transition duration-300"></div>

      <h3 className="text-lg font-semibold text-green-300 mb-2">{title}</h3>
      <div className="text-sm text-gray-300 leading-relaxed">{children}</div>

      <div className="mt-4 flex gap-3">
        <span className="text-xs text-green-200/80 bg-green-900/10 px-2 py-1 rounded">
          Production
        </span>
        <span className="text-xs text-gray-300/80 bg-white/5 px-2 py-1 rounded">
          TypeScript
        </span>
      </div>
    </motion.article>
  );
}

// ---------------------------------------------------------------------------------
// MAIN PAGE
// ---------------------------------------------------------------------------------
export default function Home() {
  const particlesInit = async (engine: Engine) => {
    await loadFull(engine);
  };

  // ---------------------------------------------------------------------------
  // PARALLAX EFFECT — HERO CARDS
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const items = document.querySelectorAll(".parallax-item");

    const move = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / 50;
      const y = (e.clientY - window.innerHeight / 2) / 50;

      items.forEach((item: any) => {
        item.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // ---------------------------------------------------------------------------
  // SMOOTH SCROLL
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const links = Array.from(document.querySelectorAll('a[href^="#"]'));
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const href = (e.currentTarget as HTMLAnchorElement).getAttribute(
          "href"
        )!;
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      });
    });

    return () =>
      links.forEach((link) =>
        link.removeEventListener("click", () => {})
      );
  }, []);

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white overflow-x-hidden">
      {/* PARTICLES */}
      <Particles
        className="absolute inset-0 -z-20"
        init={particlesInit}
        options={{
          background: { color: "transparent" },
          fpsLimit: 60,
          particles: {
            number: { value: 60 },
            color: { value: "#22c55e" },
            links: {
              enable: true,
              distance: 140,
              color: "#22c55e",
              opacity: 0.2,
            },
            move: { enable: true, speed: 0.5 },
            size: { value: { min: 1, max: 3 } },
          },
        }}
      />

      {/* NAVBAR */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] md:w-[80%] rounded-3xl bg-black/40 border border-white/5 backdrop-blur px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-gradient-to-br from-green-400 to-emerald-600 p-2 shadow-md">
            <Sparkles className="text-black" />
          </div>
          <div className="font-semibold text-green-300 tracking-wide">
            Aviral Mishra
          </div>
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
          <a
            href="https://github.com/Aviral-1"
            target="_blank"
            className="hover:text-green-300"
          >
            GitHub
          </a>
        </div>
      </nav>

      {/* ---------------------------------------------------------------------
         HERO SECTION WITH PARALLAX CARDS
         --------------------------------------------------------------------- */}
      <header
        id="home"
        className="min-h-screen flex items-center justify-center px-6 pt-24"
      >
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-emerald-400">
              Hey — I'm Aviral
            </h2>

            <p className="text-lg text-gray-300 max-w-xl">
              Full-stack developer specialized in building modern web apps,
              microservices, and scalable cloud systems.  
              I love **DevOps**, **systems design**, **3D UI**, and creating
              clean, stable, measurable engineering solutions.
            </p>

            <div className="flex gap-4 mt-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black px-5 py-3 rounded-full font-medium shadow"
              >
                See projects <ArrowRight />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border border-white/10 px-5 py-3 rounded-full text-sm"
              >
                Get in touch
              </a>
            </div>

            <div className="mt-6 flex gap-3 items-center">
              <a
                href="https://github.com/Aviral-1"
                target="_blank"
                className="hover:text-green-300"
              >
                <Github />
              </a>
              <a
                href="https://linkedin.com/in/aviral-mishra"
                target="_blank"
                className="hover:text-green-300"
              >
                <Linkedin />
              </a>
              <a href="mailto:aviral@example.com" className="hover:text-green-300">
                <Mail />
              </a>
            </div>
          </motion.div>

          {/* RIGHT FLOATING PARALLAX CARDS */}
          <div className="flex flex-col gap-4 items-center md:items-end">
            <FloatingCard
              index={0}
              title="Frontend Engineering"
            >
              Next.js, React, SSR, RSC, performance optimization.  
              UI that feels light, alive, and engineered with intention.
            </FloatingCard>

            <FloatingCard index={1} title="Backend Systems">
              Type-safe microservices, Prisma ORM, API security, caching, queues,
              workers, testing pipelines and clean domain logic.
            </FloatingCard>

            <FloatingCard index={2} title="Cloud • DevOps • Infra">
              Docker, CI/CD, monitoring, scaling strategies, infra-as-code,
              load-balanced architecture and cost-aware deployments.
            </FloatingCard>
          </div>
        </div>
      </header>

      {/* ---------------------------------------------------------------------
         ABOUT
         --------------------------------------------------------------------- */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-green-300 mb-4">About me</h3>
          <p className="text-gray-300 leading-relaxed">
            I’m a full-stack engineer focusing on scalable architecture, strong
            UX, maintainable codebases and measurable engineering outcomes.  
            I enjoy systems design, DevOps culture, and turning complex ideas
            into polished real-world products.
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------------------
         SKILLS
         --------------------------------------------------------------------- */}
      <section id="skills" className="py-20 px-6 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-green-300 mb-8 text-center">
            Skills
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Next.js",
              "React",
              "TypeScript",
              "Node.js",
              "Prisma",
              "Postgres",
              "MongoDB",
              "Docker",
            ].map((skill) => (
              <motion.div
                key={skill}
                whileHover={{ scale: 1.05 }}
                className="p-4 rounded-xl bg-black/60 border border-green-500/10 text-center"
              >
                <div className="text-green-300 font-semibold">{skill}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------------
         PROJECTS
         --------------------------------------------------------------------- */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-green-300 mb-8 text-center">
            Selected Projects
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Healvora",
                desc: "Healthcare waste management platform",
                link: "https://healvora.vercel.app",
              },
              {
                title: "Galaxy Portfolio",
                desc: "3D interactive portfolio built with R3F",
                link: "https://aviral-mishra.app",
              },
            ].map((p) => (
              <motion.a
                key={p.title}
                href={p.link}
                target="_blank"
                whileHover={{ scale: 1.03 }}
                className="block p-6 rounded-2xl bg-gradient-to-br from-black/70 to-zinc-900 border border-green-500/10"
              >
                <h4 className="text-xl font-semibold text-green-200">{p.title}</h4>
                <p className="text-gray-300 mt-2">{p.desc}</p>
                <div className="mt-4 text-sm text-green-300">Visit ↗</div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------------
         CONTACT
         --------------------------------------------------------------------- */}
      <section id="contact" className="py-20 px-6 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-green-300 mb-4">
            Let’s build
          </h3>
          <p className="text-gray-300 mb-6">
            Open to freelance, collaboration and full-time opportunities.  
            I usually respond within 24–48 hours.
          </p>

          <a
            href="mailto:aviral@example.com"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black px-6 py-3 rounded-full font-semibold"
          >
            Say hello <ArrowRight />
          </a>
        </div>
      </section>

      {/* ---------------------------------------------------------------------
         FOOTER
         --------------------------------------------------------------------- */}
      <footer className="py-8 text-center text-sm text-gray-400 border-t border-green-500/5">
        © {new Date().getFullYear()} Aviral Mishra — Designed & Built with ❤️
      </footer>
    </main>
  );
}
