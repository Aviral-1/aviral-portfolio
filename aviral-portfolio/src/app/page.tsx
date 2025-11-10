"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-gray-900 dark:bg-black dark:text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center md:text-left md:flex-row md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
            Hey, I'm <span className="text-green-500">Aviral Mishra</span>
          </h1>
          <p className="max-w-lg text-lg text-gray-600 dark:text-gray-400">
            A passionate <span className="font-medium">Full-Stack Developer</span> crafting scalable, modern web applications using
            <span className="text-green-500"> Next.js</span>, <span className="text-green-500">React</span>, and
            <span className="text-green-500"> Node.js</span>. I love architecting end-to-end solutions that bring ideas to life.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <a
              href="#projects"
              className="flex items-center justify-center gap-2 rounded-full bg-green-500 px-6 py-3 font-medium text-white hover:bg-green-600 transition-all"
            >
              View My Work <ArrowRight size={18} />
            </a>
            <a
              href="mailto:aviral@example.com"
              className="flex items-center justify-center gap-2 rounded-full border border-gray-400 px-6 py-3 font-medium hover:bg-gray-100 dark:hover:bg-gray-900 transition-all"
            >
              Contact Me
            </a>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-6 mt-8">
            <a
              href="https://github.com/Aviral-1"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-500 transition-colors"
            >
              <Github size={28} />
            </a>
            <a
              href="https://linkedin.com/in/aviral-mishra"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-500 transition-colors"
            >
              <Linkedin size={28} />
            </a>
            <a
              href="mailto:aviral@example.com"
              className="hover:text-green-500 transition-colors"
            >
              <Mail size={28} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="mt-10 md:mt-0"
        >
          <Image
            src="/avatar.png"
            alt="Aviral Mishra"
            width={300}
            height={300}
            className="rounded-full shadow-lg border-4 border-green-500/30"
          />
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="mt-16 text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Aviral Mishra — Crafted with 💚 using Next.js
      </footer>
    </main>
  );
}
