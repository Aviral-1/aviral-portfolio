"use client";

import React, { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import type { ReviewData } from "@/components/ReviewList";
import { fadeUp, stagger } from "@/lib/ui-utils";

const ReviewList = dynamic(() => import("@/components/ReviewList"), {
  ssr: false,
  loading: () => (
    <div className="rl-grid" style={{ marginTop: "2rem" }}>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rl-card rl-skeleton" aria-hidden>
          <div className="rl-sk-line rl-sk-line--long" />
          <div className="rl-sk-line rl-sk-line--med" />
          <div className="rl-sk-line rl-sk-line--short" />
          <div className="rl-sk-footer">
            <div className="rl-sk-avatar" />
            <div className="rl-sk-info">
              <div className="rl-sk-line rl-sk-line--name" />
              <div className="rl-sk-line rl-sk-line--role" />
            </div>
          </div>
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


export default function ReviewsSection() {
  const [reviews, setReviews] = useState<ReviewData[]>(INITIAL_TESTIMONIALS);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch("/api/reviews");
      if (res.ok) {
        const data: ReviewData[] = await res.json();
        setReviews(data.length > 0 ? data : INITIAL_TESTIMONIALS);
      }
    } catch {
      // Keep default testimonials on error
    } finally {
      setReviewsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return (
    <section id="reviews" className="section u-corner">
      <motion.div className="container" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.08 }}>
        <motion.p variants={fadeUp} className="eyebrow">05 — Reviews</motion.p>
        <motion.h2 variants={fadeUp} className="sec-h2">What People Say</motion.h2>
        <motion.p variants={fadeUp} className="sec-sub">Feedback from colleagues and mentors I&apos;ve worked with. Feel free to add yours!</motion.p>

        {/* Review list — dynamically imported, memoized, with skeleton loaders */}
        <ReviewList reviews={reviews} isLoading={reviewsLoading} />

        {/* Review form — dynamically imported, memoized, handles its own state */}
        <motion.div variants={fadeUp}>
          <ReviewForm onSubmitted={fetchReviews} />
        </motion.div>
      </motion.div>
    </section>
  );
}
