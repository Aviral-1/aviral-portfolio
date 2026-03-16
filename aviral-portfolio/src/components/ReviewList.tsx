"use client";

import React, { memo, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin, Quote } from "lucide-react";

export interface ReviewData {
  _id?: string;
  name: string;
  profileImage?: string;
  linkedinProfile?: string;
  email?: string;
  jobTitle?: string;
  message?: string;
  // Legacy jsonDB fields (for backward compatibility)
  content?: string;
  role?: string;
  org?: string;
  image?: string;
  avatar?: string;
  linkedin?: string;
  createdAt?: string | Date;
}

interface ReviewListProps {
  reviews: ReviewData[];
  isLoading?: boolean;
}

/* ── Skeleton Card ── */
const SkeletonCard = memo(function SkeletonCard() {
  return (
    <div className="rl-card rl-skeleton" aria-hidden>
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
  );
});

/* ── Single Review Card ── */
const ReviewCard = memo(function ReviewCard({
  review,
  index,
}: {
  review: ReviewData;
  index: number;
}) {
  // Normalize legacy fields
  const displayMessage = review.message || review.content || "";
  const displayJobTitle = review.jobTitle || review.role || "";
  const displayOrg = review.org || "";
  const displayImage = review.profileImage || review.image || "";
  const displayLinkedin = review.linkedinProfile || review.linkedin || "";
  const initials = review.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <motion.div
      className="rl-card"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Quote className="rl-quote-icon" size={28} />
      <p className="rl-message">{displayMessage}</p>

      <div className="rl-footer">
        {/* Avatar */}
        {displayImage ? (
          <div className="rl-img-wrap">
            <Image
              src={displayImage}
              alt={review.name}
              width={44}
              height={44}
              className="rl-img"
              loading="lazy"
              unoptimized={displayImage.startsWith("data:")}
            />
          </div>
        ) : (
          <div className="rl-avatar" aria-label={`${review.name} avatar`}>
            {review.avatar || initials}
          </div>
        )}

        {/* Name & role */}
        <div className="rl-info">
          <h4 className="rl-name">{review.name}</h4>
          {(displayJobTitle || displayOrg) && (
            <span className="rl-role">
              {displayJobTitle}
              {displayJobTitle && displayOrg ? " · " : ""}
              {displayOrg}
            </span>
          )}
        </div>

        {/* LinkedIn link */}
        {displayLinkedin && (
          <a
            href={
              displayLinkedin.startsWith("http")
                ? displayLinkedin
                : `https://${displayLinkedin}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="rl-li-btn"
            title={`${review.name} on LinkedIn`}
            aria-label={`${review.name} LinkedIn profile`}
          >
            <Linkedin size={14} />
          </a>
        )}
      </div>
    </motion.div>
  );
});

/* ── Review List ── */
function ReviewList({ reviews, isLoading = false }: ReviewListProps) {
  // Sort reviews: DB entries sorted by recency
  const sorted = useMemo(
    () => [...reviews].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    }),
    [reviews]
  );

  return (
    <div>
      <div className="rl-grid">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          : sorted.map((review, i) => (
              <ReviewCard
                key={review._id ?? `${review.name}-${i}`}
                review={review}
                index={i}
              />
            ))}
      </div>

      <style>{`
        .rl-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr));
          gap: var(--sp-md);
          margin-top: var(--sp-md);
        }
        .rl-card {
          background: rgba(10, 15, 25, 0.5);
          backdrop-filter: blur(20px);
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 1.5rem;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .rl-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 0px 0px, var(--primary-glow), transparent 70%);
          opacity: 0.05;
          pointer-events: none;
        }
        .rl-card:hover {
          border-color: var(--primary);
          transform: translateY(-4px);
        }
        .rl-quote-icon {
          color: var(--primary);
          opacity: 0.15;
          flex-shrink: 0;
        }
        .rl-message {
          font-size: 0.85rem;
          line-height: 1.6;
          color: var(--text-dim);
          flex: 1;
        }
        .rl-footer {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: auto;
          padding-top: 0.75rem;
          border-top: 1px solid var(--border);
        }
        .rl-img-wrap {
          flex-shrink: 0;
          width: 38px;
          height: 38px;
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid var(--border);
        }
        .rl-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .rl-avatar {
          flex-shrink: 0;
          width: 38px;
          height: 38px;
          border-radius: 4px;
          background: var(--bg-alt);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary);
          font-family: var(--font-mono);
        }
        .rl-info { flex: 1; min-width: 0; }
        .rl-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 0 0 2px;
        }
        .rl-role {
          font-size: 0.75rem;
          color: var(--text-dim);
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .rl-li-btn {
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          border-radius: 10px;
          background: oklch(0.6 0.2 250 / 0.1);
          border: 1px solid oklch(0.6 0.2 250 / 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: oklch(0.6 0.2 250);
          transition: all 0.2s;
        }
        .rl-li-btn:hover {
          background: oklch(0.6 0.2 250 / 0.2);
          transform: translateY(-2px) scale(1.05);
          color: oklch(0.7 0.2 250);
        }
        /* Skeleton styles */
        .rl-skeleton { pointer-events: none; }
        .rl-sk-line {
          height: 12px;
          border-radius: 6px;
          background: linear-gradient(90deg, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.06) 75%);
          background-size: 200% 100%;
          animation: rlShimmer 1.5s infinite;
          margin-bottom: 0.6rem;
        }
        .rl-sk-line--long { width: 100%; }
        .rl-sk-line--med { width: 85%; }
        .rl-sk-line--short { width: 60%; }
        .rl-sk-footer { display: flex; gap: 0.75rem; align-items: center; margin-top: 0.5rem; }
        .rl-sk-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255,255,255,0.07);
          flex-shrink: 0;
        }
        .rl-sk-info { flex: 1; }
        .rl-sk-line--name { width: 60%; margin-bottom: 0.4rem; }
        .rl-sk-line--role { width: 40%; margin-bottom: 0; }
        @keyframes rlShimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}

export default memo(ReviewList);
