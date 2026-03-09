"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Github,
  Linkedin,
  Mail,
  ArrowUp,
  MapPin,
  Phone,
  ExternalLink,
  Code2,
  BarChart2,
  Map,
  Server,
  Monitor,
  Wrench,
  ChevronRight,
  Briefcase,
  GraduationCap,
  X,
  Menu,
  Sparkles,
  Heart,
  Zap,
  Globe,
  Cpu,
  Activity,
  Upload,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useReducedMotion,
  useTransform,
  useMotionValue,
} from "framer-motion";
import type { Variants } from "framer-motion";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import {
  FaReact,
  FaNodeJs,
  FaDocker,
  FaAws,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiMongodb,
  SiTypescript,
  SiTailwindcss,
  SiLeaflet,
} from "react-icons/si";
import { TbMap2 } from "react-icons/tb";
import { MdAnalytics } from "react-icons/md";

/* ========== CUSTOM CURSOR ========== */
function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 35 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 35 });
  const slowX = useSpring(cursorX, { stiffness: 120, damping: 22 });
  const slowY = useSpring(cursorY, { stiffness: 120, damping: 22 });
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => { cursorX.set(e.clientX); cursorY.set(e.clientY); };
    const down = () => setClicked(true);
    const up = () => setClicked(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    const addHover = () => {
      document.querySelectorAll("a,button,.proj-card,.skill-card").forEach(el => {
        el.addEventListener("mouseenter", () => setHovered(true));
        el.addEventListener("mouseleave", () => setHovered(false));
      });
    };
    addHover();
    const obs = new MutationObserver(addHover);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      obs.disconnect();
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Dot */}
      <motion.div
        className="cursor-dot"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: clicked ? 0.5 : 1 }}
        transition={{ duration: 0.1 }}
      />
      {/* Ring */}
      <motion.div
        className="cursor-ring"
        style={{ x: slowX, y: slowY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: hovered ? 1.8 : clicked ? 0.8 : 1,
          opacity: hovered ? 0.6 : 0.35,
        }}
        transition={{ duration: 0.25 }}
      />
    </>
  );
}

/* ========== TYPING LOOP ========== */
const phrases = [
  "Frontend Developer",
  "React.js Specialist",
  "Dashboard Architect",
  "GIS & Maps Expert",
  "Smart City Builder",
  "UI/UX Craftsman",
];

function useTypingLoop() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [del, setDel] = useState(false);
  const ref = useRef(text);
  ref.current = text;

  useEffect(() => {
    const cur = phrases[index];
    const speed = del ? 33 : 72;
    const t = setTimeout(() => {
      if (!del) {
        const next = cur.slice(0, ref.current.length + 1);
        setText(next);
        if (next === cur) setTimeout(() => setDel(true), 1300);
      } else {
        const next = ref.current.slice(0, -1);
        setText(next);
        if (next === "") { setDel(false); setIndex(i => (i + 1) % phrases.length); }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, index]);
  return text;
}

/* ========== MAGNETIC BUTTON ========== */
function MagneticBtn({
  children, className, ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const move = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.28}px,${(e.clientY - r.top - r.height / 2) * 0.28}px)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = "translate(0,0)"; };
  return (
    <motion.button ref={ref} className={className} onMouseMove={move} onMouseLeave={reset} whileTap={{ scale: 0.95 }} {...(props as any)}>
      {children}
    </motion.button>
  );
}

/* ========== AURORA BG ========== */
function AuroraBg() {
  return (
    <div className="aurora-bg" aria-hidden>
      <div className="aurora-blob a1" />
      <div className="aurora-blob a2" />
      <div className="aurora-blob a3" />
      <div className="aurora-blob a4" />
      <div className="grid-overlay" />
    </div>
  );
}

/* ========== ANIMATIONS ========== */
const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
const fadeUp: Variants = { hidden: { opacity: 0, y: 48 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } };
const fadeIn: Variants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.6 } } };
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const scaleIn: Variants = { hidden: { opacity: 0, scale: 0.88 }, show: { opacity: 1, scale: 1, transition: { duration: 0.65, ease } } };

/* ========== TILT CARD COMPONENT ========== */
function TiltCard({ children, className }: { children: React.ReactNode, className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = (mouseX / width - 0.5) * 200;
    const yPct = (mouseY / height - 0.5) * 200;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, perspective: 1000, transformStyle: "preserve-3d" }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
}

const navItems = ["home", "about", "skills", "experience", "projects", "reviews", "contact"];

/* ========== TESTIMONIAL DATA ========== */
const INITIAL_TESTIMONIALS = [
  {
    name: "Saurabh Sharma",
    role: "Project Manager",
    org: "Dvertex Info Tech",
    content: "Aviral is an exceptional developer who transformed our dashboard architecture. His ability to build scalable, high-performance GIS systems is unmatched in the team.",
    linkedin: "https://linkedin.com",
    email: "saurabh@example.com",
    avatar: "SS"
  },
  {
    name: "Aman Gupta",
    role: "Full Stack Developer",
    org: "Tech Solutions",
    content: "Working with Aviral on the SafaiMitra project was a great experience. His frontend components are clean, reusable, and perfectly integrated with complex backend APIs.",
    linkedin: "https://linkedin.com",
    email: "aman@example.com",
    avatar: "AG"
  },
  {
    name: "Priya Singh",
    role: "UI/UX Designer",
    org: "Creative Minds",
    content: "Aviral has a rare sense of design for a developer. He doesn't just write code; he ensures the user experience is smooth and the animations feel premium.",
    linkedin: "https://linkedin.com",
    email: "priya@example.com",
    avatar: "PS"
  }
];

/* ========== SKILL DATA ========== */
const skillGroups = [
  { icon: <FaReact size={22} />, label: "Frontend", color: "#06b6d4", glowColor: "rgba(6,182,212,0.15)", shadowColor: "rgba(6,182,212,0.12)", skills: ["React.js", "JavaScript ES6+", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"] },
  { icon: <FaNodeJs size={22} />, label: "Backend & DB", color: "#8b5cf6", glowColor: "rgba(139,92,246,0.15)", shadowColor: "rgba(139,92,246,0.12)", skills: ["Node.js", "Express.js", "NestJS", "MongoDB", "PostgreSQL", "Prisma", "Mongoose"] },
  { icon: <MdAnalytics size={22} />, label: "Analytics", color: "#f59e0b", glowColor: "rgba(245,158,11,0.15)", shadowColor: "rgba(245,158,11,0.12)", skills: ["Recharts", "ApexCharts", "Chart.js", "KPI Dashboards", "Real-time Metrics"] },
  { icon: <TbMap2 size={22} />, label: "GIS & Maps", color: "#10b981", glowColor: "rgba(16,185,129,0.15)", shadowColor: "rgba(16,185,129,0.12)", skills: ["Google Maps API", "React Google Maps", "Leaflet", "GeoJSON", "Heatmaps", "Clusters"] },
  { icon: <SiNextdotjs size={22} />, label: "Frameworks", color: "#ec4899", glowColor: "rgba(236,72,153,0.15)", shadowColor: "rgba(236,72,153,0.12)", skills: ["Next.js", "REST APIs", "Responsive UI", "Component Architecture", "JWT Auth"] },
  { icon: <FaDocker size={22} />, label: "DevOps & Cloud", color: "#f97316", glowColor: "rgba(249,115,22,0.15)", shadowColor: "rgba(249,115,22,0.12)", skills: ["Git", "GitHub", "Docker", "AWS EC2/S3", "AWS Amplify", "Linux CLI", "Figma"] },
];

/* ========== PROJECT DATA ========== */
const projects = [
  {
    title: "Healvora",
    tag: "Healthcare Innovation",
    tagLineSub: "AI Health Analysis System",
    color: "#ec4899",
    gradFrom: "#ec4899",
    gradTo: "#8b5cf6",
    emoji: "🧬",
    featured: true,
    type: "personal",
    description:
      "A comprehensive healthcare SaaS platform — AI-powered health analysis engine, patient management, appointment scheduling, and real-time health dashboards. Built with NestJS REST APIs, dual-database architecture (MongoDB + PostgreSQL), deployed on AWS Amplify.",
    tech: ["React.js", "NestJS", "MongoDB", "PostgreSQL", "Tailwind CSS", "AWS Amplify"],
    highlights: ["AI Health Analysis", "Patient Dashboard", "NestJS REST API", "Dual-DB Architecture", "AWS Amplify Deploy", "Real-time Insights"],
    scope: "Personal Project · Full-stack · Cloud Deployed",
  },
  {
    title: "SafaiMitra Platform",
    tag: "Smart City · Municipal",
    tagLineSub: "Urban Waste & HRMS",
    color: "#10b981",
    gradFrom: "#10b981",
    gradTo: "#06b6d4",
    emoji: "🏙️",
    featured: false,
    type: "professional",
    description:
      "Full-scale smart-city municipal management platform — HRMS, property tax analytics, waste route monitoring, ward-level insights, and complaint workflow. Live across 5+ Indian cities.",
    tech: ["React.js", "Recharts", "Google Maps API", "Node.js", "REST API"],
    highlights: ["HRMS Module", "Property Tax Analytics", "Waste Route Monitoring", "Complaint Workflow"],
    scope: "Ajmer · Prayagraj · Lucknow · Ayodhya · Mankapur",
  },
  {
    title: "Suraksha Mitra",
    tag: "Police Patrol · GIS",
    tagLineSub: "QR Evidence & Route Tracking",
    color: "#3b82f6",
    gradFrom: "#3b82f6",
    gradTo: "#06b6d4",
    emoji: "🛡️",
    featured: false,
    type: "professional",
    description:
      "Police patrol & QR-based evidence tracking system — district heatmaps, real-time route tracking, role-wise access dashboards, and field QR validation workflows.",
    tech: ["React.js", "Leaflet", "GeoJSON", "Role-Based Auth", "QR Integration"],
    highlights: ["QR Evidence Logs", "District Heatmaps", "Route Tracking", "Role-Wise Dashboard"],
    scope: "Multi-district deployment",
  },
  {
    title: "Smart Bin IoT",
    tag: "IoT · Real-time Analytics",
    tagLineSub: "Sensor Monitoring Dashboard",
    color: "#f59e0b",
    gradFrom: "#f59e0b",
    gradTo: "#f97316",
    emoji: "♻️",
    featured: false,
    type: "professional",
    description:
      "Real-time IoT sensor monitoring for smart waste management — bin fill-level gauges, alert automation, geo-mapped sensors, pickup scheduling, and reporting engine.",
    tech: ["React.js", "ApexCharts", "Google Maps", "WebSockets", "REST API"],
    highlights: ["Real-time Monitoring", "Alert System", "Map Sensors", "Reporting Engine"],
    scope: "City-wide deployment",
  },
];

/* ========== PAGE ========== */
export default function Page() {
  const typed = useTypingLoop();
  const [particles, setParticles] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [reviews, setReviews] = useState<any[]>([]);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  /* hero parallax */
  const heroY = useTransform(scrollYProgress, [0, 0.3], reduce ? [0, 0] : [0, -60]);

  useEffect(() => {
    setMounted(true);
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/reviews");
      if (res.ok) {
        const data = await res.ok ? await res.json() : [];
        setReviews(data.length > 0 ? data : INITIAL_TESTIMONIALS);
      }
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      setReviews(INITIAL_TESTIMONIALS);
    }
  };

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImgPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAddReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const name = (f.elements.namedItem("name") as HTMLInputElement).value;
    const role = (f.elements.namedItem("role") as HTMLInputElement).value;
    const org = (f.elements.namedItem("org") as HTMLInputElement).value;
    const content = (f.elements.namedItem("content") as HTMLTextAreaElement).value;
    const linkedin = (f.elements.namedItem("linkedin") as HTMLInputElement).value;
    const email = (f.elements.namedItem("email") as HTMLInputElement).value;

    const newReview = {
      name,
      role,
      org,
      content,
      linkedin,
      email,
      image: imgPreview,
      avatar: name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    };

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });

      if (res.ok) {
        fetchReviews();
        f.reset();
        setImgPreview(null);
        alert("Thank you! Your review has been submitted successfully.");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Submission failed. Please try again.");
    }
  };

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth > 860);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const pos = window.scrollY + 140;
      navItems.forEach(id => {
        const el = document.getElementById(id);
        if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) setActive(id);
      });
      setShowTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    initParticlesEngine(async e => loadSlim(e)).then(() => setParticles(true));
  }, []);

  const goto = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      {isDesktop && <CustomCursor />}
      <main className="portfolio-root">
        <motion.div className="scroll-bar" style={{ scaleX }} />
        <AuroraBg />

        {/* Particles */}
        {particles && (
          <motion.div className="ptcl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2.5 }}>
            <Particles options={{ particles: { number: { value: 38 }, links: { enable: true, opacity: 0.06, color: "#06b6d4" }, move: { speed: 0.2 }, opacity: { value: 0.18 }, size: { value: { min: 1, max: 2 } }, color: { value: "#06b6d4" } } }} />
          </motion.div>
        )}

        {/* ========= NAVBAR ========= */}
        <motion.nav
          className="navbar"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.75, ease }}
        >
          <div className="nav-inner">
            {/* Logo */}
            <button className="nav-logo" onClick={() => goto("home")}>
              <span className="logo-sq">AM</span>
              <span className="logo-txt">Aviral</span>
            </button>

            {/* Center pill links */}
            <div className="nav-center">
              {navItems.map(id => (
                <button
                  key={id}
                  onClick={() => goto(id)}
                  className={`nl ${active === id ? "active" : ""}`}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                  {active === id && (
                    <motion.span className="nl-bar" layoutId="nl-bar" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                  )}
                </button>
              ))}
            </div>

            {/* Right CTA */}
            <div className="nav-right">
              <a className="nav-hire" href="mailto:aviralsul2000@gmail.com">
                Hire Me ✦
              </a>
              <button className="nav-burger" onClick={() => setMenuOpen(v => !v)} aria-label="menu">
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </motion.nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="mobile-nav"
              initial={{ opacity: 0, y: -16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.96 }}
              transition={{ duration: 0.22 }}
            >
              {navItems.map((id, i) => (
                <motion.button
                  key={id}
                  className={`mn-link ${active === id ? "active" : ""}`}
                  onClick={() => goto(id)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <span className="mn-num">0{i + 1}</span>
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </motion.button>
              ))}
              <a className="mn-hire" href="mailto:aviralsul2000@gmail.com">
                📬 &nbsp;Email Me
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========= HERO ========= */}
        <section id="home" className="hero">
          <motion.div className="container hero-grid" style={{ y: heroY }}>
            <motion.div className="hero-left" variants={stagger} initial="hidden" animate="show">
              <motion.div variants={fadeUp} className="avail-pill">
                <span className="avail-dot" />
                <span>Open to opportunities</span>
              </motion.div>

              <motion.h1 variants={fadeUp}>
                Hi, I&apos;m{" "}
                <br />
                <span className="grad-text">Aviral Mishra</span>
              </motion.h1>

              <motion.div variants={fadeUp} className="hero-typed">
                <span className="typed-arrow">→</span>
                <span className="typed-word">{typed}</span>
                <span className="typed-cursor">|</span>
              </motion.div>

              <motion.p variants={fadeUp} className="hero-lead">
                Frontend Developer with <strong className="hl-cyan">3+ years</strong> building
                high-performance dashboards, GIS mapping systems, IoT analytics panels, and
                smart-city platforms deployed across{" "}
                <strong className="hl-cyan">5+ Indian cities</strong>.
              </motion.p>

              <motion.div variants={fadeUp} className="hero-info">
                <span><MapPin size={13} /> Greater Noida, India</span>
                <span><Phone size={13} /> +91 6398407914</span>
                <span><Mail size={13} /> aviralsul2000@gmail.com</span>
              </motion.div>

              <motion.div variants={fadeUp} className="hero-btns">
                <MagneticBtn className="btn-primary" onClick={() => goto("projects")}>
                  View Projects <ChevronRight size={15} />
                </MagneticBtn>
                <MagneticBtn className="btn-ghost" onClick={() => goto("contact")}>
                  Contact Me
                </MagneticBtn>
                <a className="btn-icon" href="https://github.com/Aviral-1" target="_blank" rel="noopener noreferrer" title="GitHub"><Github size={18} /></a>
                <a className="btn-icon" href="https://linkedin.com/in/aviral-mishra" target="_blank" rel="noopener noreferrer" title="LinkedIn"><Linkedin size={18} /></a>
              </motion.div>
            </motion.div>

            {/* Right — Avatar */}
            <motion.div
              className="hero-right"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease, delay: 0.15 }}
            >
              <div className="avatar-ring">
                <div className="avatar-glow" />
                <Image src="/avatar.png" alt="Aviral Mishra" width={300} height={300} className="avatar-img" priority />
                <motion.div
                  className="orbit-ring or1"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="orbit-ring or2"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
                />

                {/* Rotating tech icons on or1 */}
                {[
                  { Icon: FaReact, color: "#06b6d4", angle: 0 },
                  { Icon: SiNextdotjs, color: "#fff", angle: 90 },
                  { Icon: SiMongodb, color: "#10b981", angle: 180 },
                  { Icon: SiTypescript, color: "#8b5cf6", angle: 270 },
                ].map(({ Icon, color, angle }, i) => (
                  <motion.div
                    key={i}
                    className="orbit-icon"
                    style={{ "--angle": `${angle}deg` } as React.CSSProperties}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                  >
                    <motion.div
                      className="orbit-icon-inner"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                      style={{ color, filter: `drop-shadow(0 0 6px ${color})` }}
                    >
                      <Icon size={16} />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="scroll-hint"
            animate={{ y: [0, 9, 0] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          >
            <div className="scroll-mouse"><div className="scroll-dot" /></div>
            <span>Scroll</span>
          </motion.div>
        </section>

        {/* ========= ABOUT ========= */}
        <section id="about" className="section">
          <motion.div className="container" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.12 }}>
            <motion.p variants={fadeUp} className="eyebrow">01 — About Me</motion.p>
            <div className="about-grid">
              <motion.div variants={fadeUp}>
                <h2>Crafting <span className="grad-text">scalable UIs</span><br />for real-world impact</h2>
                <p className="about-p" style={{ marginTop: "1.25rem" }}>
                  I&apos;m a <span className="hl-cyan">Software Engineer</span> at <strong className="hl-cyan">Dvertex Info Tech Pvt. Ltd.</strong> where
                  I architect <span className="hl-cyan">production-ready dashboards</span> and <span className="hl-cyan">GIS-driven systems</span> for smart-city platforms
                  serving millions of citizens across India.
                </p>
                <p className="about-p">
                  My strength lies in <span className="hl-cyan">reusable component libraries</span>, real-time
                  <span className="hl-cyan"> data visualizations</span>, scalable <span className="hl-cyan">mapping solutions</span>, and robust <span className="hl-cyan">export pipelines</span>. Currently
                  leveling up in full-stack — <span className="hl-cyan">NestJS</span>, <span className="hl-cyan">Next.js</span>, and <span className="hl-cyan">cloud deployment</span>.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="tl-col">
                {[
                  { type: "work", date: "Aug 2022 – Present", title: "Software Engineer", sub: "Dvertex Info Tech Pvt. Ltd.", desc: "Full-scale dashboards for smart-city, police, IoT & municipal systems.", icon: <Briefcase size={14} /> },
                  { type: "edu", date: "2024", title: "B.Tech — Information Technology", sub: "AKTU University", icon: <GraduationCap size={14} /> },
                  { type: "edu", date: "2018", title: "12th Standard", sub: "St. Michael Convent School", icon: <GraduationCap size={14} /> },
                  { type: "edu", date: "2016", title: "10th Standard", sub: "Kendriya Vidyalaya ITI Mankapur", icon: <GraduationCap size={14} /> },
                ].map((item, i) => (
                  <motion.div key={i} className="tl-item" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1, duration: 0.55 }} viewport={{ once: true }}>
                    <div className={`tl-icon ${item.type}`}>{item.icon}</div>
                    <div className="tl-body">
                      <span className="tl-date">{item.date}</span>
                      <h4 className="tl-title">{item.title}</h4>
                      <span className="tl-sub">{item.sub}</span>
                      {item.desc && <p className="tl-desc">{item.desc}</p>}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ========= SKILLS ========= */}
        <section id="skills" className="section sec-alt" >
          <motion.div className="container" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.08 }}>
            <motion.p variants={fadeUp} className="eyebrow">02 — Tech Stack</motion.p>
            <motion.h2 variants={fadeUp} className="sec-h2">Tools & Technologies</motion.h2>
            <motion.p variants={fadeUp} className="sec-sub">A curated set of tools I use daily to ship production-grade systems.</motion.p>

            <div className="skills-grid">
              {skillGroups.map((sg, i) => (
                <TiltCard key={sg.label} className="sk-card-wrap">
                  <motion.div
                    className="sk-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.55 }}
                    viewport={{ once: true }}
                    style={{
                      "--sk-card-glow": `radial-gradient(ellipse at 0% 0%, ${sg.glowColor}, transparent 60%)`,
                      "--sk-card-color": sg.color + "66",
                      "--sk-card-shadow": sg.shadowColor,
                    } as React.CSSProperties}
                  >
                    <div className="sk-head">
                      <div className="sk-icon" style={{ color: sg.color, background: sg.color + "18", borderColor: sg.color + "40" }}>{sg.icon}</div>
                      <span className="sk-label" style={{ color: sg.color }}>{sg.label}</span>
                    </div>
                    <div className="sk-chips">
                      {sg.skills.map(s => (
                        <motion.span key={s} className="sk-chip" whileHover={{ scale: 1.08, color: sg.color }}>{s}</motion.span>
                      ))}
                    </div>
                  </motion.div>
                </TiltCard>
              ))}
            </div>

            <motion.div variants={fadeIn} className="tech-row">
              <img src="https://skillicons.dev/icons?i=html,css,js,react,nextjs,nodejs,express,mongodb,tailwind,git,github,linux,docker,aws,postgres&theme=dark" alt="Tech stack icons" />
            </motion.div>
          </motion.div>
        </section>

        {/* ========= EXPERIENCE ========= */}
        <section id="experience" className="section" >
          <motion.div className="container" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.08 }}>
            <motion.p variants={fadeUp} className="eyebrow">03 — Experience</motion.p>
            <motion.h2 variants={fadeUp} className="sec-h2">Professional Journey</motion.h2>

            <motion.div variants={scaleIn} className="exp-card">
              <div className="exp-top">
                <div className="exp-left">
                  <div className="exp-ico"><Briefcase size={22} /></div>
                  <div>
                    <h3 className="exp-role">Software Engineer</h3>
                    <span className="exp-co">Dvertex Info Tech Pvt. Ltd.</span>
                  </div>
                </div>
                <div className="exp-meta">
                  <span className="exp-badge">Aug 2022 – Present · 3+ yrs</span>
                  <span className="exp-loc"><MapPin size={12} /> Greater Noida, India</span>
                </div>
              </div>

              <div className="exp-bullets">
                {[
                  "Designed full-scale municipal dashboards for SafaiMitra — HRMS, property tax analytics, waste route monitoring, ward insights, and complaint workflow system.",
                  "Built Suraksha Mitra Police Patrol System — QR-based evidence logging, district heatmaps, route tracking, role-wise dashboards, and field validation flows.",
                  "Developed Smart Bin IoT Dashboard — real-time bin sensor monitoring, automated alert systems, geo-mapped pickups, and a reporting export engine.",
                  "Architected a reusable component library (tables, charts, cards, filters, modals, pagination) that reduced development time by 40% across all projects.",
                  "Created export pipelines — PDF, Excel, CSV with date-range filters, performance charts, GIS overlays, and advanced search.",
                  "Collaborated with backend teams on API design, validation, pagination strategy, and performance optimization.",
                  "Managed city-level deployments for Ajmer, Prayagraj, Lucknow, Ayodhya, and Mankapur.",
                ].map((b, i) => (
                  <motion.div key={i} className="bullet" initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} viewport={{ once: true }}>
                    <span className="bdot" />
                    <p>{b}</p>
                  </motion.div>
                ))}
              </div>

              <div className="exp-tags">
                {["React.js", "JavaScript ES6+", "Tailwind CSS", "Google Maps API", "Recharts", "ApexCharts", "Leaflet", "GeoJSON", "REST APIs", "Node.js"].map(t => (
                  <span key={t} className="etag">{t}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ========= PROJECTS ========= */}
        <section id="projects" className="section sec-alt" >
          <motion.div className="container" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }}>
            <motion.p variants={fadeUp} className="eyebrow">04 — Projects</motion.p>
            <motion.h2 variants={fadeUp} className="sec-h2">Key Projects</motion.h2>
            <motion.p variants={fadeUp} className="sec-sub">Production platforms and innovative builds spanning healthcare, smart-city, and IoT domains.</motion.p>

            {/* Featured — Healvora */}
            <motion.div
              variants={scaleIn}
              className="proj-featured"
              whileHover={{ scale: 1.008 }}
            >
              <div className="pf-glow" style={{ background: `radial-gradient(ellipse at 30% 50%, ${projects[0].gradFrom}22, transparent 60%)` }} />
              <div className="pf-inner">
                <div className="pf-left">
                  <div className="pf-badge-wrap">
                    <span className="pf-personal-tag">✦ Personal Project</span>
                    <span className="pf-tag" style={{ color: projects[0].color, borderColor: projects[0].color + "40", background: projects[0].color + "12" }}>
                      {projects[0].emoji} {projects[0].tag}
                    </span>
                  </div>
                  <h3 className="pf-title">{projects[0].title}</h3>
                  <p className="pf-sub">{projects[0].tagLineSub}</p>
                  <p className="pf-desc">{projects[0].description}</p>

                  <div className="pf-highlights">
                    {projects[0].highlights.map(h => (
                      <span key={h} className="pf-hl" style={{ borderColor: projects[0].color + "30" }}>
                        <span style={{ color: projects[0].color }}>✦</span> {h}
                      </span>
                    ))}
                  </div>

                  <div className="pf-stack">
                    {projects[0].tech.map(t => (
                      <span key={t} className="pf-tech">{t}</span>
                    ))}
                  </div>
                  <p className="pf-scope">{projects[0].scope}</p>
                </div>
                <div className="pf-right">
                  {/* Animated health UI mockup */}
                  <div className="health-mockup">
                    <div className="hm-header">
                      <Heart size={16} className="hm-heart" />
                      <span>AI Health Analysis</span>
                      <div className="hm-live"><span className="hm-dot" />Live</div>
                    </div>
                    {[
                      { label: "Heart Rate", val: "72 bpm", pct: 72, color: "#ec4899" },
                      { label: "Sleep Score", val: "8.2 hrs", pct: 82, color: "#8b5cf6" },
                      { label: "Vitals", val: "Optimal", pct: 94, color: "#10b981" },
                      { label: "Activity", val: "High", pct: 88, color: "#06b6d4" },
                    ].map((item, i) => (
                      <div key={item.label} className="hm-row">
                        <div className="hm-row-top">
                          <span className="hm-lbl">{item.label}</span>
                          <span className="hm-val" style={{ color: item.color }}>{item.val}</span>
                        </div>
                        <div className="hm-track">
                          <motion.div
                            className="hm-fill"
                            style={{ background: item.color }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.pct}%` }}
                            transition={{ duration: 1.1, delay: i * 0.15, ease }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    ))}
                    <div className="hm-footer">
                      <Cpu size={13} /> AI Analysis Engine · NestJS · AWS Amplify
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Other projects grid */}
            <div className="other-projects">
              {projects.slice(1).map((p, i) => (
                <TiltCard key={p.title} className="proj-card-wrap">
                  <motion.div
                    className="proj-card"
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="pc-top">
                      <span className="pc-tag" style={{ color: p.color, background: p.color + "11", borderColor: p.color + "33" }}>{p.emoji} {p.tag}</span>
                      <ExternalLink size={15} className="pc-ext" />
                    </div>
                    <h3 className="pc-title">{p.title}</h3>
                    <p className="pc-sub">{p.tagLineSub}</p>
                    <p className="pc-desc">{p.description}</p>
                    <div className="pc-hls">
                      {p.highlights.map(h => (
                        <span key={h} className="pc-hl"><span style={{ color: p.color }}>✦</span> {h}</span>
                      ))}
                    </div>
                    <div className="pc-footer">
                      <div className="pc-stack">{p.tech.map(t => <span key={t} className="pc-tech">{t}</span>)}</div>
                      <span className="pc-scope">{p.scope}</span>
                    </div>
                  </motion.div>
                </TiltCard>
              ))}
            </div>

            <motion.div variants={fadeUp} className="gh-cta">
              <a href="https://github.com/Aviral-1" target="_blank" rel="noopener noreferrer" className="gh-btn">
                <Github size={18} /> View More on GitHub <ExternalLink size={14} />
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* ========= REVIEWS ========= */}
        <section id="reviews" className="section" >
          <motion.div className="container" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.08 }}>
            <motion.p variants={fadeUp} className="eyebrow">05 — Reviews</motion.p>
            <motion.h2 variants={fadeUp} className="sec-h2">What People Say</motion.h2>
            <motion.p variants={fadeUp} className="sec-sub">Feedback from colleagues and mentors I&apos;ve worked with. Feel free to add yours!</motion.p>

            <div className="reviews-grid">
              {mounted && reviews.map((t, i) => (
                <TiltCard key={`${t.name}-${i}`} className="review-card-wrap">
                  <motion.div
                    className="review-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="rev-quote">“</div>
                    <p className="rev-content">{t.content}</p>
                    <div className="rev-footer">
                      {t.image ? (
                        <img src={t.image} alt={t.name} className="rev-img" />
                      ) : (
                        <div className="rev-avatar">{t.avatar}</div>
                      )}
                      <div className="rev-info">
                        <h4 className="rev-name">{t.name}</h4>
                        <span className="rev-role">{t.role} {t.org ? `· ${t.org}` : ""}</span>
                      </div>
                      <div className="rev-links">
                        {t.linkedin && <a href={t.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" className="rev-link-icon"><Linkedin size={14} /></a>}
                        {t.email && <a href={`mailto:${t.email}`} title="Email" className="rev-link-icon"><Mail size={14} /></a>}
                      </div>
                    </div>
                  </motion.div>
                </TiltCard>
              ))}
            </div>

            {/* Add Review Form */}
            <motion.div variants={fadeUp} className="add-review-section">
              <h3 className="add-review-title">Add Your Review</h3>
              <form className="add-review-form" onSubmit={handleAddReview}>
                <div className="ar-main-row">
                  <div className="ar-image-upload">
                    <label className="ar-img-label">
                      {imgPreview ? (
                        <img src={imgPreview} alt="Preview" className="ar-img-preview" />
                      ) : (
                        <div className="ar-img-placeholder">
                          <Upload size={20} />
                          <span>Photo</span>
                        </div>
                      )}
                      <input type="file" accept="image/*" onChange={handleImgChange} hidden />
                    </label>
                  </div>
                  <div className="ar-inputs">
                    <div className="ar-row">
                      <div className="ar-field"><label>Name *</label><input name="name" type="text" placeholder="Your Name" required /></div>
                      <div className="ar-field"><label>LinkedIn Profile *</label><input name="linkedin" type="url" placeholder="https://linkedin.com/in/yourprofile" required /></div>
                    </div>
                    <div className="ar-row">
                      <div className="ar-field"><label>Role</label><input name="role" type="text" placeholder="e.g. Project Manager" /></div>
                      <div className="ar-field"><label>Organization</label><input name="org" type="text" placeholder="e.g. Tech Corp" /></div>
                    </div>
                  </div>
                </div>
                <div className="ar-field"><label>Email (Optional)</label><input name="email" type="email" placeholder="your@email.com" /></div>
                <div className="ar-field"><label>Review Content *</label><textarea name="content" rows={4} placeholder="What was it like working with me?" required /></div>
                <MagneticBtn type="submit" className="btn-primary">
                  <Sparkles size={16} /> Submit My Review
                </MagneticBtn>
              </form>
            </motion.div>
          </motion.div>
        </section>
        <section id="contact" className="section">
          <motion.div className="container" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.08 }}>
            <motion.p variants={fadeUp} className="eyebrow">06 — Get In Touch</motion.p>
            <motion.h2 variants={fadeUp} className="sec-h2">Let&apos;s Work Together</motion.h2>
            <motion.p variants={fadeUp} className="sec-sub">
              Open to full-time roles, freelance projects, and collaborations. I respond within 24 hours.
            </motion.p>

            <div className="contact-grid">
              <motion.div variants={fadeUp} className="contact-info-col">
                <div className="ci-card">
                  {[
                    { icon: <Mail size={17} />, label: "Email", val: "aviralsul2000@gmail.com", href: "mailto:aviralsul2000@gmail.com" },
                    { icon: <Phone size={17} />, label: "Phone", val: "+91 6398407914", href: "tel:+916398407914" },
                    { icon: <MapPin size={17} />, label: "Location", val: "Greater Noida, India", href: null },
                    { icon: <Github size={17} />, label: "GitHub", val: "github.com/Aviral-1", href: "https://github.com/Aviral-1" },
                    { icon: <Linkedin size={17} />, label: "LinkedIn", val: "aviral-mishra", href: "https://linkedin.com/in/aviral-mishra" },
                  ].map(row => {
                    const El = row.href ? "a" : "div";
                    return (
                      <motion.div key={row.label} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                        <El href={row.href ?? undefined} target={row.href ? "_blank" : undefined} rel={row.href ? "noopener noreferrer" : undefined} className="ci-row">
                          <div className="ci-icon">{row.icon}</div>
                          <div>
                            <span className="ci-lbl">{row.label}</span>
                            <span className="ci-val">{row.val}</span>
                          </div>
                        </El>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              <motion.form
                variants={scaleIn}
                className="contact-form"
                onSubmit={e => {
                  e.preventDefault();
                  const f = e.currentTarget;
                  const name = (f.elements.namedItem("name") as HTMLInputElement)?.value;
                  const email = (f.elements.namedItem("email") as HTMLInputElement)?.value;
                  const sub = (f.elements.namedItem("subject") as HTMLInputElement)?.value;
                  const msg = (f.elements.namedItem("message") as HTMLTextAreaElement)?.value;
                  window.location.href = `mailto:aviralsul2000@gmail.com?subject=${encodeURIComponent(sub || `From ${name}`)}&body=${encodeURIComponent(`${msg}\n\nFrom: ${name}\nEmail: ${email}`)}`;
                }}
              >
                <div className="cf-row">
                  <div className="cf-field"><label>Name</label><input name="name" type="text" placeholder="John Doe" required /></div>
                  <div className="cf-field"><label>Email</label><input name="email" type="email" placeholder="john@company.com" required /></div>
                </div>
                <div className="cf-field"><label>Subject</label><input name="subject" type="text" placeholder="Job opportunity / Project collaboration" required /></div>
                <div className="cf-field"><label>Message</label><textarea name="message" rows={5} placeholder="Tell me about your project or role..." required /></div>
                <MagneticBtn type="submit" className="btn-primary btn-full">
                  <Mail size={16} /> Send Message
                </MagneticBtn>
              </motion.form>
            </div>
          </motion.div>
        </section>

        {/* ========= FOOTER ========= */}
        <footer className="footer">
          <div className="container">
            <div className="footer-divider" />
            <div className="ft-inner">
              <div className="ft-left">
                <span className="logo-sq sm">AM</span>
                <span className="ft-name">Aviral Mishra</span>
              </div>
              <p className="ft-quote">⚡ <em>&quot;Build things. Break things. Learn faster.&quot;</em></p>
              <div className="ft-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                <div className="ft-socials">
                  <a href="https://github.com/Aviral-1" target="_blank" rel="noopener noreferrer" className="ft-social-link" title="GitHub">
                    <FaGithub size={16} />
                  </a>
                  <a href="https://linkedin.com/in/aviral-mishra" target="_blank" rel="noopener noreferrer" className="ft-social-link" title="LinkedIn">
                    <FaLinkedin size={16} />
                  </a>
                  <a href="mailto:aviralsul2000@gmail.com" className="ft-social-link" title="Email">
                    <Mail size={16} />
                  </a>
                </div>
                <p className="ft-copy">© {new Date().getFullYear()} Aviral Mishra</p>
              </div>
            </div>
          </div>
        </footer>

        {/* Back to top */}
        <AnimatePresence>
          {showTop && (
            <motion.button
              className="toTop"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ y: -4 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <ArrowUp size={18} />
            </motion.button>
          )}
        </AnimatePresence>
      </main >
    </>
  );
}
