"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight, Code, Cpu, Palette } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-zinc-50 to-white text-gray-900 dark:from-black dark:to-zinc-900 dark:text-white">

      {/* ─── Navbar ─────────────────────────────── */}
      <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-white/50 dark:bg-black/30 border-b border-gray-200/20 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-xl font-bold text-green-500 tracking-tight">Aviral Mishra</h1>
          <div className="hidden md:flex gap-8 font-medium text-gray-700 dark:text-gray-300">
            <a href="#home" className="hover:text-green-500 transition">Home</a>
            <a href="#about" className="hover:text-green-500 transition">About</a>
            <a href="#skills" className="hover:text-green-500 transition">Skills</a>
            <a href="#projects" className="hover:text-green-500 transition">Projects</a>
            <a href="#contact" className="hover:text-green-500 transition">Contact</a>
          </div>
        </div>
      </nav>

      {/* ─── Hero Section ───────────────────────── */}
      <section id="home" className="flex flex-col items-center justify-center text-center md:text-left md:flex-row md:gap-24 min-h-screen px-6 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 max-w-2xl"
        >
          <h1 className="text-5xl font-extrabold sm:text-6xl md:text-7xl leading-tight bg-gradient-to-r from-green-500 via-emerald-400 to-lime-400 bg-clip-text text-transparent animate-gradient">
            Hi, I'm Aviral Mishra 👋
          </h1>

          <p className="max-w-xl text-lg text-gray-700 dark:text-gray-400 leading-relaxed">
            A passionate <span className="font-semibold text-green-500">Full-Stack Developer</span> focused on crafting 
            scalable, modern web applications using{" "}
            <span className="text-green-500">Next.js</span>,{" "}
            <span className="text-green-500">React</span>, and{" "}
            <span className="text-green-500">Node.js</span>.  
            I love architecting solutions that blend creativity and performance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <a
              href="#projects"
              className="group flex items-center justify-center gap-2 rounded-full bg-green-500 px-6 py-3 font-medium text-white hover:bg-green-600 transition-all"
            >
              View My Work{" "}
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </a>
            <a
              href="mailto:aviral@example.com"
              className="flex items-center justify-center gap-2 rounded-full border border-gray-400 px-6 py-3 font-medium hover:bg-gray-100 dark:hover:bg-gray-900 transition-all"
            >
              Contact Me
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          whileHover={{ rotate: 2, scale: 1.05 }}
          className="mt-12 md:mt-0 relative"
        >
          <div className="absolute inset-0 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
          <Image
            src="/avatar.png"
            alt="Aviral Mishra"
            width={320}
            height={320}
            className="relative rounded-full shadow-2xl border-4 border-green-500/30 hover:border-green-400 transition-all duration-300"
          />
        </motion.div>
      </section>

      {/* ─── About Section ─────────────────────── */}
      <section id="about" className="py-24 px-6 bg-zinc-100 dark:bg-zinc-900/50 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-6 text-green-500"
        >
          About Me
        </motion.h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-700 dark:text-gray-400 leading-relaxed">
          I'm a software engineer who loves turning ideas into impactful digital experiences.  
          I specialize in full-stack development, system design, and cloud-based deployment pipelines.  
          My focus is always on delivering performance, accessibility, and clean user experiences.
        </p>
      </section>

      {/* ─── Skills Section ────────────────────── */}
      <section id="skills" className="py-24 px-6 text-center">
        <h2 className="text-4xl font-bold text-green-500 mb-12">Skills & Tools</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 max-w-4xl mx-auto">
          {[
            { name: "Next.js", icon: <Code /> },
            { name: "React", icon: <Palette /> },
            { name: "Node.js", icon: <Cpu /> },
            { name: "MongoDB", icon: <Code /> },
            { name: "PostgreSQL", icon: <Cpu /> },
            { name: "AWS", icon: <Palette /> },
            { name: "Docker", icon: <Cpu /> },
            { name: "GitHub", icon: <Code /> },
          ].map((skill, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              className="p-6 rounded-xl bg-white dark:bg-zinc-800 shadow-md flex flex-col items-center gap-3 border border-green-500/10"
            >
              <div className="text-green-500">{skill.icon}</div>
              <p className="font-medium">{skill.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Projects Section ─────────────────── */}
      <section id="projects" className="py-24 px-6 bg-zinc-100 dark:bg-zinc-900/50">
        <h2 className="text-4xl font-bold text-center text-green-500 mb-12">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {[
            {
              title: "Healvora - Medical Waste Tracking",
              desc: "A full-stack healthcare solution using Next.js, Prisma & PostgreSQL for waste management.",
              link: "https://healvora.vercel.app",
            },
            {
              title: "Portfolio 3D Galaxy",
              desc: "Interactive 3D personal portfolio built with Three.js and React for an immersive dev experience.",
              link: "https://aviral-mishra.app",
            },
          ].map((project, i) => (
            <motion.a
              key={i}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              className="p-8 rounded-2xl bg-white dark:bg-zinc-800 border border-green-500/10 hover:border-green-400 transition"
            >
              <h3 className="text-2xl font-semibold mb-2 text-green-500">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{project.desc}</p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ─── Contact Section ──────────────────── */}
      <section id="contact" className="py-24 px-6 text-center">
        <h2 className="text-4xl font-bold text-green-500 mb-6">Let's Connect</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Have an idea or project in mind? Reach out and let’s build something great together!
        </p>
        <a
          href="mailto:aviral@example.com"
          className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-medium transition-all"
        >
          Say Hello <Mail />
        </a>
      </section>

      {/* ─── Footer ───────────────────────────── */}
      <footer className="py-10 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200/10">
        © {new Date().getFullYear()}{" "}
        <span className="text-green-500 font-medium">Aviral Mishra</span> — Crafted with 💚 using Next.js
      </footer>
    </main>
  );
}
