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

/** Utility to compress image before base64 conversion */
const compressImage = (file: File, maxDim = 800, quality = 0.7): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;
        if (width > height) {
          if (width > maxDim) {
            height *= maxDim / width;
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width *= maxDim / height;
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
};

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
  // Separate 'active' state to avoid reading 'value' on every render if possible, 
  // but since FloatField is controlled, it's already re-rendering when value changes.
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
      {error && (
        <span className="ff-err" style={{ display: 'block', opacity: 1, transform: 'none' }}>
          {error}
        </span>
      )}
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
  
  // msgLen is derived from form.message, keeping it as a separate state can cause double renders
  // We'll calculate it on demand or use a lighter way to show the counter.
  const msgLen = form.message.length;

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
      // Use functional update to ensure we have latest state and avoid closure issues
      setForm((p) => {
        if (p[name as keyof FormState] === value) return p;
        return { ...p, [name]: value };
      });
      // Only clear error if it exists
      setErrors((p) => {
        if (p[name as keyof FieldError] === undefined) return p;
        return { ...p, [name]: undefined };
      });
    }, []
  );

  const handleImgChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setSubmitStatus("error");
      setSubmitMsg("Image must be under 5 MB.");
      return;
    }
    try {
      const compressed = await compressImage(file);
      setImgPreview(compressed);
    } catch (err) {
      console.error("Compression failed:", err);
      // Fallback to original if compression fails and it's not too huge
      if (file.size < 1 * 1024 * 1024) {
        const reader = new FileReader();
        reader.onloadend = () => setImgPreview(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        setSubmitStatus("error");
        setSubmitMsg("Failed to process image.");
      }
    }
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
        setImgPreview(null);
        if (fileRef.current) fileRef.current.value = "";
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
            {errors.message && (
              <span className="ff-err" style={{ opacity: 1, transform: 'none' }}>
                {errors.message}
              </span>
            )}
            {/* Circular char counter - simplified animation */}
            <div className="rf-counter" title={`${msgLen}/1000 characters`}>
              <svg width="26" height="26" viewBox="0 0 26 26" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="13" cy="13" r="10" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2.5" />
                <circle cx="13" cy="13" r="10" fill="none" stroke={counterColor}
                  strokeWidth="2.5" strokeDasharray={circumference} strokeDashoffset={dash}
                  strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.1s linear" }} />
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
          margin-top: var(--sp-lg);
          border-radius: 4px;
          overflow: hidden;
          background: rgba(10, 15, 25, 0.8);
          backdrop-filter: blur(24px);
          border: 1px solid var(--border);
          box-shadow: 0 20px 50px -20px rgba(0,0,0,0.7);
        }
        .rf-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 0px 0px, var(--primary-glow), transparent 70%);
          opacity: 0.1;
          pointer-events: none;
        }

        /* ── Header ── */
        .rf-header {
          padding: var(--sp-md);
        }
        .rf-header-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--primary);
          background: rgba(6,182,212,0.05);
          border: 1px solid rgba(6,182,212,0.2);
          border-radius: 4px;
          padding: 0.25rem 0.6rem;
          margin-bottom: 0.75rem;
        }
        .rf-badge-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--primary);
        }
        .rf-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #fff;
          margin: 0 0 0.25rem;
          line-height: 1.2;
        }
        .rf-subtitle {
          font-size: 0.8rem;
          color: var(--text-dim);
          margin: 0;
          line-height: 1.5;
        }

        /* ── Toast ── */
        .rf-toast {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          padding: 0.75rem 1rem;
          margin: 0 var(--sp-md) 1rem;
          border-radius: 2px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        .rf-toast--success {
          background: rgba(16,185,129,0.08);
          border: 1px solid rgba(16,185,129,0.3);
          color: #34d399;
        }
        .rf-toast--error {
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.3);
          color: #f87171;
        }
        .rf-toast-icon {
          width: 18px; height: 18px; border-radius: 50%;
          background: currentColor;
          color: #000;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.6rem; font-weight: 900;
          flex-shrink: 0;
        }

        /* ── Form ── */
        .rf-form {
          display: flex; flex-direction: column; gap: 1rem;
          padding: 0 var(--sp-md) var(--sp-md);
        }

        /* ── Avatar + Name row ── */
        .rf-top { display: flex; gap: 1rem; align-items: flex-start; }
        .rf-avatar-btn { flex-shrink: 0; cursor: pointer; display: block; }
        .rf-avatar-wrap { position: relative; width: 64px; height: 64px; border-radius: 4px; overflow: hidden; }
        .rf-avatar-img { width: 100%; height: 100%; object-fit: cover; }
        .rf-avatar-overlay {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0.6);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.6rem; font-weight: 700; color: #fff;
          opacity: 0; transition: opacity 0.2s;
        }
        .rf-avatar-wrap:hover .rf-avatar-overlay { opacity: 1; }
        .rf-avatar-empty {
          width: 64px; height: 64px; border-radius: 4px;
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.03);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 3px; color: var(--text-muted);
        }
        .rf-avatar-hint { font-size: 0.55rem; }
        .rf-name-col { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.75rem; }

        /* ── Two cols row ── */
        .rf-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

        /* ── Floating label field ── */
        .ff-wrap {
          position: relative;
          padding-top: 0.75rem;
        }
        .ff-label {
          position: absolute;
          left: 0.75rem;
          top: calc(0.75rem + 0.65rem);
          font-size: 0.85rem;
          color: var(--text-dim);
          pointer-events: none;
          transition: all 0.2s ease;
        }
        .ff-label--up {
          top: 0;
          font-size: 0.6rem;
          color: var(--primary);
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .ff-req { color: #f87171; }
        .ff-input {
          width: 100%;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border);
          border-radius: 2px;
          padding: 0.6rem 0.75rem;
          color: #fff;
          font-size: 0.85rem;
          outline: none;
        }
        .ff-input:focus { border-color: var(--primary); background: rgba(255,255,255,0.03); }
        .ff-bar { display: none; }
        .ff-err { font-size: 0.7rem; color: #f87171; margin-top: 0.25rem; }

        /* ── Textarea ── */
        .rf-msg-wrap {
          position: relative;
          padding-top: 0.75rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border);
          border-radius: 2px;
        }
        .rf-msg-wrap--focus { border-color: var(--primary); background: rgba(255,255,255,0.03); }
        .rf-msg-label {
          position: absolute;
          left: 0.75rem;
          top: calc(0.75rem + 0.65rem);
          font-size: 0.85rem;
          color: var(--text-dim);
          pointer-events: none;
          transition: all 0.2s ease;
        }
        .rf-msg-label--up {
          top: 0.15rem;
          font-size: 0.6rem;
          color: var(--primary);
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .rf-textarea {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          resize: none;
          color: #fff;
          font-size: 0.85rem;
          padding: 0.5rem 0.75rem 0;
          min-height: 90px;
        }
        .rf-msg-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.25rem 0.75rem 0.5rem;
        }
        .rf-counter { position: relative; display: flex; align-items: center; justify-content: center; }
        .rf-counter-num { position: absolute; font-size: 0.5rem; font-weight: 700; }

        /* ── Submit row ── */
        .rf-submit-row { display: flex; align-items: center; gap: 1rem; }
        .rf-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.5rem;
          background: var(--bg-alt);
          border: 1px solid var(--border);
          color: #fff;
          font-weight: 700;
          font-size: 0.85rem;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .rf-btn:hover:not(:disabled) { border-color: var(--primary); background: rgba(255,255,255,0.03); }
        .rf-btn:disabled { opacity: 0.4; }
        .rf-spinner {
          width: 12px; height: 12px;
          border: 2px solid rgba(255,255,255,0.2);
          border-top-color: var(--primary);
          border-radius: 50%;
          animation: rfSpin 0.7s linear infinite;
        }
        @keyframes rfSpin { to { transform: rotate(360deg); } }

        /* ── Responsive ── */
        @media (max-width: 600px) {
          .rf-top { flex-direction: column; align-items: flex-start; }
          .rf-name-col { width: 100%; }
          .rf-row-2 { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

export default memo(ReviewForm);
