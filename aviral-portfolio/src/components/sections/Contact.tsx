"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, Phone, MapPin, Github, Linkedin, Send,
  Check, AtSign, MessageSquare, ChevronRight, Terminal,
} from "lucide-react";
import { fadeUp, stagger, scaleIn, MagneticBtn, ease } from "@/lib/ui-utils";

/* ── Floating label field ── */
interface FloatingFieldProps {
  label: string;
  icon: React.ReactNode;
  id: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
  placeholder?: string;
  lines?: number;
}

function FloatingField({
  label, icon, id, type = "text", textarea, required, placeholder, lines = 4,
}: FloatingFieldProps) {
  const [focused, setFocused] = useState(false);
  const [val, setVal] = useState("");
  const active = focused || val.length > 0;

  const sharedProps = {
    id,
    name: id,
    className: "ff-input",
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setVal(e.target.value),
    required,
    placeholder: focused ? (placeholder ?? "") : "",
  };

  return (
    <div className={`ff-outer ${active ? "ff-outer--active" : ""} ${focused ? "ff-outer--focus" : ""}`}>
      <div className="ff-icon-wrap">{icon}</div>
      <div className="ff-field-wrap">
        <label htmlFor={id} className={`ff-lbl ${active ? "ff-lbl--up" : ""}`}>
          {label}
          {required && <span className="ff-req"> *</span>}
        </label>
        {textarea ? (
          <textarea {...sharedProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>} rows={lines} className="ff-input ff-textarea" />
        ) : (
          <input {...sharedProps as React.InputHTMLAttributes<HTMLInputElement>} type={type} />
        )}
      </div>
    </div>
  );
}

const contactRows = [
  { icon: <Mail size={16} />, label: "Email", val: "aviralsul2000@gmail.com", href: "mailto:aviralsul2000@gmail.com" },
  { icon: <Phone size={16} />, label: "Phone", val: "+91 6398407914", href: "tel:+916398407914" },
  { icon: <MapPin size={16} />, label: "Location", val: "Greater Noida, India", href: null },
  { icon: <Github size={16} />, label: "GitHub", val: "github.com/Aviral-1", href: "https://github.com/Aviral-1" },
  { icon: <Linkedin size={16} />, label: "LinkedIn", val: "aviral-mishra", href: "https://linkedin.com/in/aviral-mishra" },
];

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const f = e.currentTarget;
    const name = (f.elements.namedItem("name") as HTMLInputElement)?.value;
    const subject = (f.elements.namedItem("subject") as HTMLInputElement)?.value;
    const message = (f.elements.namedItem("message") as HTMLTextAreaElement)?.value;

    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        window.location.href = `mailto:aviralsul2000@gmail.com?subject=${encodeURIComponent(subject || `From ${name}`)}&body=${encodeURIComponent(`${message}\n\nFrom: ${name}`)}`;
      }, 800);
    }, 1200);
  };

  return (
    <section id="contact" className="contact-section">
      <motion.div
        className="container"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.06 }}
      >
        <motion.p variants={fadeUp} className="eyebrow">06 — Contact</motion.p>
        <motion.h2 variants={fadeUp} className="sec-h2">
          Let&apos;s <span className="grad-text">Connect</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="sec-sub">
          Available for senior engineering roles and architectural consultation.{" "}
          Let&apos;s build something amazing together.
        </motion.p>

        <div className="ct-grid">
          {/* Info column */}
          <motion.div variants={fadeUp} className="ct-info">
            <div className="ct-card">
              <div className="ct-card-glow" />
              {contactRows.map((row) => {
                const Tag = row.href ? "a" : "div";
                return (
                  <motion.div key={row.label} whileHover={{ x: 5 }} transition={{ duration: 0.2, ease }}>
                    <Tag
                      href={row.href ?? undefined}
                      target={row.href ? "_blank" : undefined}
                      rel={row.href ? "noopener noreferrer" : undefined}
                      className="ct-row"
                    >
                      <div className="ct-icon-box">{row.icon}</div>
                      <div className="ct-details">
                        <span className="ct-lbl">{row.label}</span>
                        <span className="ct-val">{row.val}</span>
                      </div>
                    </Tag>
                  </motion.div>
                );
              })}
            </div>

            <div className="ct-terminal">
              <div className="ctt-head">
                <Terminal size={13} />
                <span>QUICK FACTS</span>
                <div className="ctt-dot" />
              </div>
              <div className="ctt-body">
                {[
                  "$ whoami → Aviral Mishra",
                  "$ status  → Open to work",
                  "$ location → Greater Noida, IN",
                  "$ response_time → &lt; 24hrs",
                ].map((line, i) => (
                  <div key={i} className="ctt-line">{line}</div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            variants={scaleIn}
            className="ct-form"
            onSubmit={handleSubmit}
          >
            <div className="ct-form-header">
              <h3>Send a Message</h3>
              <p>I&apos;ll get back to you within 24 hours.</p>
            </div>

            <div className="ct-row-fields">
              <FloatingField id="name" label="Your Name" icon={<AtSign size={16} />} placeholder="Aviral Mishra" required />
              <FloatingField id="email" label="Email Address" type="email" icon={<Mail size={16} />} placeholder="you@example.com" required />
            </div>

            <FloatingField id="subject" label="Subject" icon={<ChevronRight size={16} />} placeholder="e.g. Project Inquiry" required />

            <FloatingField id="message" label="Message" textarea icon={<MessageSquare size={16} />} placeholder="Tell me about your project..." required lines={5} />

            <MagneticBtn
              type="submit"
              className={`ct-submit ${status !== "idle" ? "is-done" : ""}`}
              disabled={status !== "idle"}
            >
              <AnimatePresence mode="wait">
                {status === "idle" && (
                  <motion.span key="idle" className="cs-inner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    Send Message <Send size={16} />
                  </motion.span>
                )}
                {status === "submitting" && (
                  <motion.span key="sub" className="cs-inner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <span className="cs-spinner" /> Sending...
                  </motion.span>
                )}
                {status === "success" && (
                  <motion.span key="ok" className="cs-inner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Check size={18} /> Sent! Redirecting...
                  </motion.span>
                )}
              </AnimatePresence>
            </MagneticBtn>

            <p className="ct-note">🔒 Your info is never shared publicly.</p>
          </motion.form>
        </div>
      </motion.div>

      <style>{`
        .contact-section {
          padding: var(--sp-2xl) 0;
          background: var(--bg-alt);
        }
        .ct-grid {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 3.5rem;
          margin-top: 4rem;
          align-items: start;
        }

        /* Info card */
        .ct-card {
          position: relative;
          background: rgba(255,255,255,0.015);
          border: 1px solid var(--border-bright);
          border-radius: 20px;
          padding: 2.5rem;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-bottom: 1.5rem;
        }
        .ct-card-glow {
          position: absolute; inset: 0;
          background: radial-gradient(circle at 0% 0%, var(--primary-glow), transparent 70%);
          opacity: 0.1; pointer-events: none;
        }
        .ct-row {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s;
        }
        .ct-row:last-child { border-bottom: none; }
        .ct-icon-box {
          width: 42px; height: 42px;
          border-radius: 12px;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border-bright);
          display: flex; align-items: center; justify-content: center;
          color: var(--primary);
          flex-shrink: 0;
          transition: all 0.2s;
        }
        .ct-row:hover .ct-icon-box { background: rgba(255,255,255,0.06); border-color: var(--primary); }
        .ct-details { display: flex; flex-direction: column; gap: 2px; }
        .ct-lbl { font-size: 0.6rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.18em; color: var(--text-muted); font-family: var(--font-mono); }
        .ct-val { font-size: 0.95rem; font-weight: 700; color: #fff; }

        /* Terminal */
        .ct-terminal {
          background: rgba(0,0,0,0.5);
          border: 1px solid var(--border-bright);
          border-radius: 14px;
          overflow: hidden;
          font-family: var(--font-mono);
        }
        .ctt-head {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0.85rem 1.25rem;
          border-bottom: 1px solid var(--border);
          font-size: 0.65rem;
          color: var(--text-muted);
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        .ctt-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--primary); margin-left: auto; box-shadow: 0 0 8px var(--primary); animation: pcPulse 2s infinite; }
        .ctt-body { padding: 1rem 1.25rem; display: flex; flex-direction: column; gap: 0.5rem; }
        .ctt-line { font-size: 0.75rem; color: var(--text-muted); }

        /* Form */
        .ct-form {
          background: rgba(255,255,255,0.015);
          border: 1px solid var(--border-bright);
          border-radius: 24px;
          padding: 3rem;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          box-shadow: 0 40px 100px -20px rgba(0,0,0,0.7);
          transition: border-color 0.3s ease;
        }
        .ct-form:hover { border-color: rgba(255,255,255,0.12); }
        .ct-form-header h3 { font-size: 1.5rem; font-weight: 900; color: #fff; margin: 0 0 0.25rem; letter-spacing: -0.02em; }
        .ct-form-header p { font-size: 0.85rem; color: var(--text-muted); margin: 0; }

        .ct-row-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }

        /* Floating field */
        .ff-outer {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 0.75rem 1rem;
          background: rgba(255,255,255,0.02);
          transition: all 0.3s ease;
          position: relative;
        }
        .ff-outer--focus {
          border-color: var(--primary);
          background: rgba(255,255,255,0.04);
          box-shadow: 0 0 20px rgba(16,185,129,0.08);
        }
        .ff-icon-wrap {
          color: var(--text-muted);
          transition: color 0.3s ease;
          margin-top: 0.75rem;
          flex-shrink: 0;
        }
        .ff-outer--focus .ff-icon-wrap { color: var(--primary); }
        .ff-field-wrap { flex: 1; min-width: 0; position: relative; padding-top: 0.5rem; }
        .ff-lbl {
          position: absolute;
          top: 0.6rem;
          left: 0;
          font-size: 0.9rem;
          color: var(--text-muted);
          pointer-events: none;
          transition: all 0.2s ease;
          transform-origin: left top;
        }
        .ff-lbl--up {
          top: -0.85rem;
          font-size: 0.62rem;
          color: var(--primary);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .ff-req { color: #f87171; }
        .ff-input {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          color: #fff;
          font-size: 0.95rem;
          font-weight: 600;
          padding-top: 0.5rem;
        }
        .ff-textarea { resize: none; padding-top: 0.5rem; }

        /* Submit */
        .ct-submit {
          height: 64px;
          background: var(--primary);
          border: none;
          border-radius: 14px;
          color: #000;
          font-weight: 900;
          font-family: var(--font-mono);
          letter-spacing: 0.1em;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.35s ease;
          cursor: pointer;
          font-size: 1rem;
        }
        .ct-submit:hover:not(:disabled) { box-shadow: 0 16px 40px rgba(16,185,129,0.35); transform: translateY(-2px); }
        .ct-submit:disabled { opacity: 0.5; cursor: not-allowed; filter: grayscale(0.6); }
        .cs-inner { display: flex; align-items: center; gap: 10px; }
        .cs-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(0,0,0,0.2);
          border-top-color: #000;
          border-radius: 50%;
          animation: rfSpin 0.7s linear infinite;
        }
        @keyframes rfSpin { to { transform: rotate(360deg); } }

        .ct-note { font-size: 0.75rem; color: var(--text-muted); text-align: center; margin: 0; }

        @media (max-width: 1100px) { .ct-grid { grid-template-columns: 1fr; } }
        @media (max-width: 768px) {
          .ct-row-fields { grid-template-columns: 1fr; }
          .ct-form { padding: 2rem; }
          .ct-card { padding: 1.75rem; }
        }
      `}</style>
    </section>
  );
}
