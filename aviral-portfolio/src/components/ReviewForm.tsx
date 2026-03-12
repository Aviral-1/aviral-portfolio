"use client";

import React, { useState, useCallback, useRef, memo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── types ── */
interface FormState {
  name: string;
  jobTitle: string;
  linkedinProfile: string;
  email: string;
  message: string;
}
interface FieldError {
  name?: string;
  message?: string;
  linkedinProfile?: string;
  email?: string;
}
interface ReviewFormProps {
  /** Called after a successful submission so the parent can refresh the list instantly */
  onSubmitted?: () => void;
}

const INITIAL_FORM: FormState = {
  name: "", jobTitle: "", linkedinProfile: "", email: "", message: "",
};

/* ── floating label input ── */
const FloatField = memo(function FloatField({
  id, name, label, type = "text", value, onChange, error, maxLength, required, placeholder,
}: {
  id: string; name: string; label: string; type?: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string; maxLength?: number; required?: boolean; placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <div className={`ff-wrap ${error ? "ff-wrap--err" : ""}`}>
      <input
        id={id} name={name} type={type} value={value} onChange={onChange}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        maxLength={maxLength} required={required} autoComplete="off"
        className={`ff-input ${active ? "ff-input--active" : ""}`}
        placeholder={focused ? (placeholder ?? "") : ""}
      />
      <label htmlFor={id} className={`ff-label ${active ? "ff-label--up" : ""}`}>
        {label}{required && <span className="ff-req"> *</span>}
      </label>
      <div className={`ff-bar ${focused ? "ff-bar--active" : ""} ${error ? "ff-bar--err" : ""}`} />
      <AnimatePresence>
        {error && (
          <motion.span className="ff-err" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
});

/* ── main component ── */
function ReviewForm({ onSubmitted }: ReviewFormProps) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<FieldError>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMsg, setSubmitMsg] = useState("");
  const [msgLen, setMsgLen] = useState(0);
  const [textFocused, setTextFocused] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  /* auto-clear success banner after 5s */
  useEffect(() => {
    if (submitStatus === "success") {
      const t = setTimeout(() => setSubmitStatus("idle"), 5000);
      return () => clearTimeout(t);
    }
  }, [submitStatus]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm((p) => ({ ...p, [name]: value }));
      setErrors((p) => ({ ...p, [name]: undefined }));
      if (name === "message") setMsgLen(value.length);
    }, []
  );

  const handleImgChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setSubmitStatus("error");
      setSubmitMsg("Image must be under 2 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setImgPreview(reader.result as string);
    reader.readAsDataURL(file);
  }, []);

  const validate = useCallback((): boolean => {
    const e: FieldError = {};
    if (form.name.trim().length < 2) e.name = "At least 2 characters required.";
    if (form.message.trim().length < 20) e.message = "Please write at least 20 characters.";
    if (form.message.trim().length > 1000) e.message = "Cannot exceed 1000 characters.";
    if (form.linkedinProfile && !/^(https?:\/\/)?(www\.)?linkedin\.com\/.+/.test(form.linkedinProfile))
      e.linkedinProfile = "Enter a valid linkedin.com URL.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [form]);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          jobTitle: form.jobTitle.trim(),
          linkedinProfile: form.linkedinProfile.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          profileImage: imgPreview ?? "",
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitStatus("success");
        setSubmitMsg("Your review is live! Thank you 🎉");
        setForm(INITIAL_FORM);
        setMsgLen(0);
        setImgPreview(null);
        if (fileRef.current) fileRef.current.value = "";
        // ← KEY FIX: notify parent to re-fetch reviews instantly
        onSubmitted?.();
      } else {
        setSubmitStatus("error");
        setSubmitMsg(data.error ?? "Submission failed. Please try again.");
      }
    } catch {
      setSubmitStatus("error");
      setSubmitMsg("Network error — please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  }, [form, imgPreview, validate, onSubmitted]);

  const pct = Math.min((msgLen / 1000) * 100, 100);
  const circumference = 2 * Math.PI * 10;
  const dash = circumference * (1 - pct / 100);
  const counterColor = msgLen > 950 ? "#f87171" : msgLen > 800 ? "#f59e0b" : "#06b6d4";

  return (
    <div className="rf-root">
      {/* Header */}
      <div className="rf-header">
        <div className="rf-header-badge">
          <span className="rf-badge-dot" />
          <span>Leave a Review</span>
        </div>
        <h3 className="rf-title">Share Your Experience</h3>
        <p className="rf-subtitle">Your feedback helps others understand what it&apos;s like to work with me.</p>
      </div>

      {/* Status toast */}
      <AnimatePresence>
        {submitStatus !== "idle" && (
          <motion.div
            className={`rf-toast rf-toast--${submitStatus}`}
            initial={{ opacity: 0, y: -14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            role="alert"
          >
            <span className="rf-toast-icon">{submitStatus === "success" ? "✓" : "!"}</span>
            <span>{submitMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <form className="rf-form" onSubmit={handleSubmit} noValidate>
        {/* ── Row 1: Avatar + Name + Job ── */}
        <div className="rf-top">
          {/* Avatar picker */}
          <label className="rf-avatar-btn" title="Upload profile photo">
            {imgPreview ? (
              <div className="rf-avatar-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imgPreview} alt="Preview" className="rf-avatar-img" />
                <div className="rf-avatar-overlay">
                  <span>Change</span>
                </div>
              </div>
            ) : (
              <div className="rf-avatar-empty">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span className="rf-avatar-hint">Photo</span>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" onChange={handleImgChange} hidden />
          </label>

          <div className="rf-name-col">
            <FloatField id="rf-name" name="name" label="Your Name" value={form.name}
              onChange={handleChange} error={errors.name} maxLength={100} required />
            <FloatField id="rf-job" name="jobTitle" label="Job Title" value={form.jobTitle}
              onChange={handleChange} maxLength={150} placeholder="e.g. Product Manager" />
          </div>
        </div>

        {/* ── Row 2: LinkedIn + Email ── */}
        <div className="rf-row-2">
          <FloatField id="rf-li" name="linkedinProfile" label="LinkedIn (optional)" type="url"
            value={form.linkedinProfile} onChange={handleChange} error={errors.linkedinProfile}
            maxLength={300} placeholder="linkedin.com/in/you" />
          <FloatField id="rf-email" name="email" label="Email (optional)" type="email"
            value={form.email} onChange={handleChange} error={errors.email} maxLength={200} placeholder="you@example.com" />
        </div>

        {/* ── Message ── */}
        <div className={`rf-msg-wrap ${errors.message ? "rf-msg-wrap--err" : ""} ${textFocused ? "rf-msg-wrap--focus" : ""}`}>
          <label className={`rf-msg-label ${form.message || textFocused ? "rf-msg-label--up" : ""}`}>
            Your Review <span className="ff-req">*</span>
          </label>
          <textarea
            name="message"
            className="rf-textarea"
            value={form.message}
            onChange={handleChange}
            onFocus={() => setTextFocused(true)}
            onBlur={() => setTextFocused(false)}
            rows={4}
            maxLength={1000}
            placeholder={textFocused ? "What was it like working with me? Share your honest experience…" : ""}
          />
          <div className="rf-msg-footer">
            <AnimatePresence>
              {errors.message && (
                <motion.span className="ff-err" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  {errors.message}
                </motion.span>
              )}
            </AnimatePresence>
            {/* Circular char counter */}
            <div className="rf-counter" title={`${msgLen}/1000 characters`}>
              <svg width="26" height="26" viewBox="0 0 26 26" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="13" cy="13" r="10" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2.5" />
                <circle cx="13" cy="13" r="10" fill="none" stroke={counterColor}
                  strokeWidth="2.5" strokeDasharray={circumference} strokeDashoffset={dash}
                  strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.2s, stroke 0.3s" }} />
              </svg>
              {msgLen > 800 && <span className="rf-counter-num" style={{ color: counterColor }}>{1000 - msgLen}</span>}
            </div>
          </div>
        </div>

        {/* ── Submit ── */}
        <div className="rf-submit-row">
          <button type="submit" className="rf-btn" disabled={isSubmitting} aria-busy={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="rf-spinner" />
                Submitting…
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
                Send Review
              </>
            )}
          </button>
          {/* <p className="rf-privacy">🔒 Your data is never shared publicly</p> */}
        </div>
      </form>

      <style>{`
        /* ── Root ── */
        .rf-root {
          position: relative;
          margin-top: 3.5rem;
          border-radius: 24px;
          overflow: hidden;
          background: rgba(8, 12, 20, 0.7);
          border: 1px solid rgba(6,182,212,0.15);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .rf-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at 0% 0%, rgba(6,182,212,0.07) 0%, transparent 55%),
            radial-gradient(ellipse at 100% 100%, rgba(139,92,246,0.06) 0%, transparent 55%);
          pointer-events: none;
        }

        /* ── Header ── */
        .rf-header {
          padding: clamp(1.5rem, 3vw, 2.25rem) clamp(1.5rem, 3vw, 2.25rem) 0;
        }
        .rf-header-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #06b6d4;
          background: rgba(6,182,212,0.1);
          border: 1px solid rgba(6,182,212,0.2);
          border-radius: 999px;
          padding: 0.25rem 0.75rem;
          margin-bottom: 1rem;
        }
        .rf-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #06b6d4;
          box-shadow: 0 0 6px #06b6d4;
          animation: rfPulse 2s ease-in-out infinite;
        }
        @keyframes rfPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        .rf-title {
          font-size: clamp(1.3rem, 3vw, 1.8rem);
          font-weight: 800;
          color: #fff;
          margin: 0 0 0.4rem;
          line-height: 1.2;
        }
        .rf-subtitle {
          font-size: 0.88rem;
          color: rgba(255,255,255,0.4);
          margin: 0 0 1.75rem;
          line-height: 1.5;
        }

        /* ── Toast ── */
        .rf-toast {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          padding: 0.85rem 1.25rem;
          margin: 0 clamp(1.5rem, 3vw, 2.25rem) 1.25rem;
          border-radius: 12px;
          font-size: 0.875rem;
          font-weight: 600;
        }
        .rf-toast--success {
          background: linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05));
          border: 1px solid rgba(16,185,129,0.35);
          color: #34d399;
        }
        .rf-toast--error {
          background: linear-gradient(135deg, rgba(239,68,68,0.12), rgba(239,68,68,0.04));
          border: 1px solid rgba(239,68,68,0.3);
          color: #f87171;
        }
        .rf-toast-icon {
          width: 22px; height: 22px; border-radius: 50%;
          background: currentColor;
          color: #000;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.7rem; font-weight: 900;
          flex-shrink: 0;
          line-height: 1;
        }
        .rf-toast--error .rf-toast-icon { color: #fff; background: #f87171; }
        .rf-toast--success .rf-toast-icon { color: #fff; background: #10b981; }

        /* ── Form ── */
        .rf-form {
          display: flex; flex-direction: column; gap: 1.4rem;
          padding: 0 clamp(1.5rem, 3vw, 2.25rem) clamp(1.5rem, 3vw, 2.25rem);
        }

        /* ── Avatar + Name row ── */
        .rf-top { display: flex; gap: 1.25rem; align-items: flex-start; }
        .rf-avatar-btn { flex-shrink: 0; cursor: pointer; display: block; }
        .rf-avatar-wrap { position: relative; width: 72px; height: 72px; border-radius: 50%; overflow: hidden; }
        .rf-avatar-img { width: 100%; height: 100%; object-fit: cover; }
        .rf-avatar-overlay {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0.55);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.7rem; font-weight: 700; color: #fff;
          opacity: 0; transition: opacity 0.2s;
        }
        .rf-avatar-wrap:hover .rf-avatar-overlay { opacity: 1; }
        .rf-avatar-empty {
          width: 72px; height: 72px; border-radius: 50%;
          border: 2px dashed rgba(6,182,212,0.35);
          background: rgba(6,182,212,0.04);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 3px; color: rgba(255,255,255,0.3);
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .rf-avatar-btn:hover .rf-avatar-empty {
          border-color: rgba(6,182,212,0.65);
          color: rgba(255,255,255,0.65);
          background: rgba(6,182,212,0.08);
        }
        .rf-avatar-hint { font-size: 0.62rem; }
        .rf-name-col { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1.1rem; }

        /* ── Two cols row ── */
        .rf-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }

        /* ── Floating label field ── */
        .ff-wrap {
          position: relative;
          padding-top: 0.85rem;
        }
        .ff-label {
          position: absolute;
          left: 0.9rem;
          top: calc(0.85rem + 0.75rem);
          font-size: 0.875rem;
          color: rgba(255,255,255,0.35);
          pointer-events: none;
          transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
          transform-origin: left;
        }
        .ff-label--up {
          top: 0;
          font-size: 0.7rem;
          color: #06b6d4;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .ff-req { color: #f87171; }
        .ff-input {
          width: 100%;
          box-sizing: border-box;
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.09);
          border-bottom: none;
          border-radius: 10px 10px 0 0;
          padding: 0.7rem 0.9rem;
          padding-top: 0.9rem;
          color: #fff;
          font-size: 0.9rem;
          font-family: inherit;
          outline: none;
          transition: background 0.2s;
        }
        .ff-input--active, .ff-input:focus {
          background: rgba(6,182,212,0.04);
        }
        .ff-bar {
          height: 2px;
          background: rgba(255,255,255,0.09);
          border-radius: 0 0 10px 10px;
          transition: background 0.2s;
        }
        .ff-bar--active { background: #06b6d4; }
        .ff-bar--err { background: #f87171; }
        .ff-wrap--err .ff-label--up { color: #f87171; }
        .ff-wrap--err .ff-input { background: rgba(239,68,68,0.04); }
        .ff-err {
          display: block;
          font-size: 0.75rem;
          color: #f87171;
          margin-top: 0.3rem;
          padding-left: 0.1rem;
        }

        /* ── Textarea ── */
        .rf-msg-wrap {
          position: relative;
          padding-top: 0.85rem;
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 12px;
          transition: border-color 0.2s, background 0.2s;
        }
        .rf-msg-wrap--focus {
          background: rgba(6,182,212,0.04);
          border-color: rgba(6,182,212,0.3);
          box-shadow: 0 0 0 3px rgba(6,182,212,0.08);
        }
        .rf-msg-wrap--err {
          border-color: rgba(239,68,68,0.4);
        }
        .rf-msg-wrap--err.rf-msg-wrap--focus {
          box-shadow: 0 0 0 3px rgba(239,68,68,0.1);
        }
        .rf-msg-label {
          position: absolute;
          left: 0.9rem;
          top: calc(0.85rem + 0.8rem);
          font-size: 0.875rem;
          color: rgba(255,255,255,0.35);
          pointer-events: none;
          transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .rf-msg-label--up {
          top: 0.3rem;
          font-size: 0.7rem;
          color: #06b6d4;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .rf-msg-wrap--err .rf-msg-label--up { color: #f87171; }
        .rf-textarea {
          width: 100%;
          box-sizing: border-box;
          background: transparent;
          border: none;
          outline: none;
          resize: none;
          color: #fff;
          font-size: 0.9rem;
          font-family: inherit;
          line-height: 1.65;
          padding: 0.4rem 0.9rem 0.4rem;
          min-height: 110px;
        }
        .rf-textarea::placeholder { color: rgba(255,255,255,0.2); }
        .rf-msg-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.4rem 0.9rem 0.6rem;
          min-height: 28px;
        }
        .rf-counter { position: relative; display: flex; align-items: center; justify-content: center; margin-left: auto; }
        .rf-counter-num {
          position: absolute;
          font-size: 0.55rem;
          font-weight: 700;
          font-variant-numeric: tabular-nums;
        }

        /* ── Submit row ── */
        .rf-submit-row {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          flex-wrap: wrap;
        }
        .rf-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.75rem;
          background: linear-gradient(135deg, #06b6d4, #0891b2);
          color: #fff;
          font-weight: 700;
          font-size: 0.9rem;
          font-family: inherit;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: transform 0.18s, box-shadow 0.18s, opacity 0.18s;
          box-shadow: 0 4px 20px rgba(6,182,212,0.3);
          white-space: nowrap;
          will-change: transform;
        }
        .rf-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(6,182,212,0.4);
        }
        .rf-btn:active:not(:disabled) {
          transform: translateY(0) scale(0.98);
        }
        .rf-btn:disabled { opacity: 0.55; cursor: not-allowed; }
        .rf-spinner {
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: rfSpin 0.7s linear infinite;
          will-change: transform;
        }
        @keyframes rfSpin { to { transform: rotate(360deg); } }
        .rf-privacy {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.3);
          margin: 0;
        }

        /* ── Responsive ── */
        @media (max-width: 600px) {
          .rf-top { flex-direction: column; align-items: center; }
          .rf-name-col { width: 100%; }
          .rf-row-2 { grid-template-columns: 1fr; }
          .rf-submit-row { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </div>
  );
}

export default memo(ReviewForm);
