"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import type { ReviewData } from "@/components/ReviewList";
import { fadeUp, stagger } from "@/lib/ui-utils";
import { Star, ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";

const ReviewList = dynamic(() => import("@/components/ReviewList"), {
  ssr: false,
  loading: () => (
    <div className="rl-grid" style={{ marginTop: "2rem" }}>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rl-card rl-skeleton" aria-hidden>
          <div className="rl-sk-line rl-sk-line--long" />
          <div className="rl-sk-line rl-sk-line--med" />
          <div className="rl-sk-line rl-sk-line--short" />
        </div>
      ))}
    </div>
  ),
});

const ReviewForm = dynamic(() => import("@/components/ReviewForm"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "380px", background: "rgba(255,255,255,0.02)", borderRadius: "20px", marginTop: "3rem" }} />
  ),
});

const INITIAL_TESTIMONIALS: ReviewData[] = [
  {
    name: "Saurabh Sharma",
    role: "Project Manager",
    org: "Dvertex Info Tech",
    content:
      "Aviral is an exceptional developer who transformed our dashboard architecture. His ability to build scalable, high-performance GIS systems is unmatched in the team.",
    linkedin: "https://linkedin.com",
    email: "saurabh@example.com",
    avatar: "SS",
  },
  {
    name: "Aman Gupta",
    role: "Full Stack Developer",
    org: "Tech Solutions",
    content:
      "Working with Aviral on the SafaiMitra project was a great experience. His frontend components are clean, reusable, and perfectly integrated with complex backend APIs.",
    linkedin: "https://linkedin.com",
    email: "aman@example.com",
    avatar: "AG",
  },
  {
    name: "Priya Singh",
    role: "UI/UX Designer",
    org: "Creative Minds",
    content:
      "Aviral has a rare sense of design for a developer. He doesn't just write code — he ensures the user experience is smooth and the animations feel premium.",
    linkedin: "https://linkedin.com",
    email: "priya@example.com",
    avatar: "PS",
  },
];

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<ReviewData[]>(INITIAL_TESTIMONIALS);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch("/api/reviews");
      if (res.ok) {
        const data: ReviewData[] = await res.json();
        setReviews(data.length > 0 ? data : INITIAL_TESTIMONIALS);
      }
    } catch {
      // keep defaults
    } finally {
      setReviewsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  /* Autoplay carousel */
  const startAutoplay = useCallback(() => {
    autoplayRef.current = setInterval(() => {
      setActiveIdx((p) => (p + 1) % reviews.length);
    }, 4000);
  }, [reviews.length]);

  useEffect(() => {
    startAutoplay();
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current); };
  }, [startAutoplay]);

  const go = (dir: 1 | -1) => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    setActiveIdx((p) => (p + dir + reviews.length) % reviews.length);
    startAutoplay();
  };

  const featured = reviews[activeIdx];

  return (
    <section id="reviews" className="reviews-section">
      <motion.div
        className="container"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.06 }}
      >
        <motion.p variants={fadeUp} className="eyebrow">05 — Reviews</motion.p>
        <motion.h2 variants={fadeUp} className="sec-h2">
          What People <span className="grad-text">Say</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="sec-sub">
          Feedback from colleagues and mentors I&apos;ve had the privilege of working with.
        </motion.p>

        {/* Featured testimonial carousel */}
        {!reviewsLoading && featured && (
          <motion.div variants={fadeUp} className="carousel-section">
            <div className="carousel-card">
              <div className="cc-glow" />
              <div className="cc-stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="#fbbf24" stroke="none" />
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={activeIdx}
                  className="cc-quote"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4 }}
                >
                  &ldquo;{featured.content}&rdquo;
                </motion.blockquote>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`meta-${activeIdx}`}
                  className="cc-author"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <div className="cc-avatar">
                    {featured.avatar || (featured.name?.slice(0, 2).toUpperCase() ?? "?")}
                  </div>
                  <div className="cc-meta">
                    <span className="cc-name">{featured.name}</span>
                    <span className="cc-role">
                      {featured.role ?? ""}
                      {featured.org ? ` · ${featured.org}` : ""}
                    </span>
                  </div>
                  {featured.linkedin && (
                    <a
                      href={featured.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cc-li-btn"
                    >
                      LinkedIn ↗
                    </a>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="cc-nav">
                <button className="cc-arrow" onClick={() => go(-1)} aria-label="Previous">
                  <ChevronLeft size={18} />
                </button>
                <div className="cc-dots">
                  {reviews.map((_, i) => (
                    <button
                      key={i}
                      className={`cc-dot ${i === activeIdx ? "is-active" : ""}`}
                      onClick={() => { if (autoplayRef.current) clearInterval(autoplayRef.current); setActiveIdx(i); startAutoplay(); }}
                    />
                  ))}
                </div>
                <button className="cc-arrow" onClick={() => go(1)} aria-label="Next">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* All reviews list */}
        <ReviewList reviews={reviews} isLoading={reviewsLoading} />

        {/* Add review form */}
        <motion.div variants={fadeUp} className="rf-section-head">
          <MessageSquare size={16} />
          <span>Leave Your Review</span>
        </motion.div>
        <motion.div variants={fadeUp}>
          <ReviewForm onSubmitted={fetchReviews} />
        </motion.div>
      </motion.div>

      <style>{`
        .reviews-section { padding: var(--sp-2xl) 0; }

        /* Carousel */
        .carousel-section { margin-top: 4rem; }
        .carousel-card {
          position: relative;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border-bright);
          border-radius: 24px;
          padding: 3.5rem;
          overflow: hidden;
        }
        .cc-glow {
          position: absolute; inset: 0;
          background: radial-gradient(circle at 50% 0%, var(--primary-glow), transparent 70%);
          opacity: 0.08; pointer-events: none;
        }
        .cc-stars { display: flex; gap: 4px; margin-bottom: 1.5rem; position: relative; }
        .cc-quote {
          font-size: clamp(1.1rem, 2.5vw, 1.4rem);
          font-weight: 600;
          line-height: 1.75;
          color: rgba(255,255,255,0.85);
          margin: 0 0 2rem;
          font-style: italic;
          position: relative;
        }
        .cc-author { display: flex; align-items: center; gap: 1rem; position: relative; flex-wrap: wrap; }
        .cc-avatar {
          width: 52px; height: 52px; border-radius: 50%;
          background: linear-gradient(135deg, var(--primary), var(--accent-emerald));
          display: flex; align-items: center; justify-content: center;
          font-weight: 900; font-size: 1rem; color: #000;
          flex-shrink: 0;
        }
        .cc-meta { display: flex; flex-direction: column; gap: 3px; flex: 1; }
        .cc-name { font-weight: 800; color: #fff; font-size: 1rem; }
        .cc-role { font-size: 0.8rem; color: var(--text-muted); font-family: var(--font-mono); font-weight: 600; }
        .cc-li-btn {
          padding: 6px 14px;
          border: 1px solid var(--primary);
          border-radius: 8px;
          color: var(--primary);
          font-size: 0.75rem;
          font-weight: 800;
          text-decoration: none;
          transition: all 0.2s ease;
          white-space: nowrap;
          margin-left: auto;
        }
        .cc-li-btn:hover { background: var(--primary); color: #000; }

        .cc-nav { display: flex; align-items: center; justify-content: center; gap: 1rem; margin-top: 2rem; position: relative; }
        .cc-arrow {
          width: 40px; height: 40px; border-radius: 50%;
          border: 1px solid var(--border-bright);
          background: rgba(255,255,255,0.03);
          display: flex; align-items: center; justify-content: center;
          color: var(--text-dim);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .cc-arrow:hover { border-color: var(--primary); color: #fff; background: rgba(255,255,255,0.06); }
        .cc-dots { display: flex; gap: 6px; }
        .cc-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--border-bright);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .cc-dot.is-active { width: 24px; border-radius: 4px; background: var(--primary); }

        /* RF section head */
        .rf-section-head {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 5rem;
          margin-bottom: 0.5rem;
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--primary);
        }
      `}</style>
    </section>
  );
}
