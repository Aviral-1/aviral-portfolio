"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

// Layout & Global Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import BackgroundParticles from "@/components/BackgroundParticles";
import { AuroraBg } from "@/lib/ui-utils";

// Sections (Direct imports since they are needed for the main page structure)
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import ReviewsSection from "@/components/sections/ReviewsSection";
import Contact from "@/components/sections/Contact";

const navItems = ["home", "about", "skills", "experience", "projects", "reviews", "contact"];

export default function Page() {
  const [active, setActive] = useState("home");
  const [showTop, setShowTop] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    // Intersection Observer to update active nav item based on scroll position
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    navItems.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const onScroll = () => {
      setShowTop(window.scrollY > 500);
    };
    
    window.addEventListener("scroll", onScroll, { passive: true });
    
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const goto = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <CustomCursor />
      
      <main className="portfolio-root">
        <motion.div className="scroll-bar" style={{ scaleX }} />
        <AuroraBg />
        <BackgroundParticles />

        <Navbar active={active} onGoto={goto} />

        <Hero onGoto={goto} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <ReviewsSection />
        <Contact />

        <Footer />

        {/* Back to top toggle */}
        <AnimatePresence>
          {showTop && (
            <motion.button
              className="toTop"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ y: -4 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Scroll to top"
            >
              <ArrowUp size={18} />
            </motion.button>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
