"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight, Code2, Rocket, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-black px-6 text-white">
      {/* Background Gradient Glow */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-green-500/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-400/10 blur-[150px] rounded-full animate-pulse" />

      {/* Hero Section */}
      <section className="z-10 flex flex-col items-center justify-center text-center md:text-left md:flex-row md:gap-16">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl leading-tight">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Aviral Mishra
            </span>
            👋
          </h1>

          <p className="max-w-lg text-lg text-gray-300 leading-relaxed">
            A <span className="font-semibold text-emerald-400">Full Stack Developer</span> and{" "}
            <span className="font-semibold text-green-400">Software Engineer</span> passionate about
            building modern, scalable web solutions with{" "}
            <span className="text-emerald-400">Next.js</span>,{" "}
            <span className="text-emerald-400">React</span>, and{" "}
            <span className="text-emerald-400">Node.js</span>. <br />
            I love architecting products with clean code, strong UI/UX, and future-ready deployment.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <a
              href="#projects"
              className="group flex items-center justify-center gap-2 rounded-full bg-green-500 px-6 py-3 font-medium text-white shadow-md hover:shadow-green-500/30 transition-all"
            >
              View My Projects{" "}
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>

            <a
              href="mailto:aviral@example.com"
              className="flex items-center justify-center gap-2 rounded-full border border-gray-700 px-6 py-3 font-medium hover:bg-gray-900 transition-all"
            >
              Contact Me
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center justify-center md:justify-start gap-6 mt-8">
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="https://github.com/Aviral-1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-green-400 transition-colors"
            >
              <Github size={30} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="https://linkedin.com/in/aviral-mishra"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-green-400 transition-colors"
            >
              <Linkedin size={30} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="mailto:aviral@example.com"
              className="text-gray-400 hover:text-green-400 transition-colors"
            >
              <Mail size={30} />
            </motion.a>
          </div>
        </motion.div>

        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="mt-10 md:mt-0 relative"
        >
          <div className="absolute -inset-4 bg-green-500/20 blur-3xl rounded-full" />
          <Image
            src="/avatar.png"
            alt="Aviral Mishra"
            width={320}
            height={320}
            className="relative rounded-full border-4 border-green-500/40 shadow-[0_0_60px_-10px_rgba(34,197,94,0.4)]"
          />
        </motion.div>
      </section>

      {/* Highlight Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="z-10 mt-24 grid grid-cols-1 md:grid-cols-3 gap-10 text-center"
      >
        {[
          { icon: <Code2 size={30} />, title: "Frontend Developer", desc: "React, Next.js, Tailwind, Framer Motion" },
          { icon: <Rocket size={30} />, title: "Backend & APIs", desc: "Node.js, Express, Prisma, MongoDB, PostgreSQL" },
          { icon: <Sparkles size={30} />, title: "Cloud & DevOps", desc: "Vercel, Netlify, AWS, Docker, CI/CD" },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="rounded-2xl border border-gray-800 bg-gradient-to-b from-zinc-900/70 to-zinc-950/40 p-6 shadow-md hover:shadow-green-500/10 transition-all"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="text-green-400">{item.icon}</div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* Footer */}
      <footer className="z-10 mt-20 text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} <span className="text-green-400">Aviral Mishra</span> — Built with 💚 using Next.js
      </footer>
    </main>
  );
}
