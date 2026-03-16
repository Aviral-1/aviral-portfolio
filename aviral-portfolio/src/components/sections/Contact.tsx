"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Send, Terminal, AtSign, MessageSquare, ChevronRight, Check } from "lucide-react";
import { fadeUp, stagger, scaleIn, MagneticBtn, ease } from "@/lib/ui-utils";
import { AnimatePresence } from "framer-motion";


interface EliteFieldProps {
  label: string;
  icon: React.ReactNode;
  id: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
  placeholder?: string;
  lines?: number;
}

const EliteField = ({ label, icon, id, type = "text", textarea, required, placeholder, lines = 4 }: EliteFieldProps) => {
  const [focused, setFocused] = React.useState(false);
  const [val, setVal] = React.useState("");

  return (
    <div className={`elite-field ${focused ? "is-focused" : ""} ${val ? "has-val" : ""}`}>
      <div className="ef-label-wrap">
        <div className="ef-icon" style={{ color: focused ? "var(--primary)" : "var(--text-dim)" }}>
           {icon}
        </div>
        <label htmlFor={id} className="ef-label">{label}</label>
      </div>
      
      {textarea ? (
        <textarea
          id={id}
          name={id}
          className="ef-input ef-textarea"
          rows={lines}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => setVal(e.target.value)}
          required={required}
          placeholder={focused ? placeholder : ""}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          className="ef-input"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => setVal(e.target.value)}
          required={required}
          placeholder={focused ? placeholder : ""}
        />
      )}
      <div className="ef-bar" />
    </div>
  );
};

export default function Contact() {
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success">("idle");
  const [log, setLog] = React.useState<string[]>(["[SYS] Socket ready...", "[SYS] Standing by..."]);

  const addLog = (msg: string) => setLog(prev => [...prev.slice(-3), `[SYS] ${msg}`]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    addLog("Encrypting payload...");
    
    setTimeout(() => {
      addLog("Dispatching to mail gateway...");
      const f = e.currentTarget;
      const name = (f.elements.namedItem("name") as HTMLInputElement)?.value;
      const sub = (f.elements.namedItem("subject") as HTMLInputElement)?.value;
      const msg = (f.elements.namedItem("message") as HTMLTextAreaElement)?.value;
      
      setStatus("success");
      addLog("Handshake successful. Redirecting...");
      
      setTimeout(() => {
        window.location.href = `mailto:aviralsul2000@gmail.com?subject=${encodeURIComponent(sub || `From ${name}`)}&body=${encodeURIComponent(`${msg}\n\nFrom: ${name}`)}`;
      }, 800);
    }, 1200);
  };

  return (
    <section id="contact" className="section u-corner">
      <motion.div className="container" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.08 }}>
        <motion.p variants={fadeUp} className="eyebrow">06 — Connection Port</motion.p>
        <motion.h2 variants={fadeUp} className="sec-h2">Initiate <span className="grad-text">Handshake</span></motion.h2>
        <motion.p variants={fadeUp} className="sec-sub">
          Available for elite engineering roles and architectural consultation. 
        </motion.p>

        <div className="contact-grid">
          <motion.div variants={fadeUp} className="contact-info-col">
            <div className="ci-card u-glass">
              <div className="ci-card-glow" />
              {[
                { icon: <Mail size={16} />, label: "PROTOCOL", val: "aviralsul2000@gmail.com", href: "mailto:aviralsul2000@gmail.com" },
                { icon: <Phone size={16} />, label: "UPLINK", val: "+91 6398407914", href: "tel:+916398407914" },
                { icon: <MapPin size={16} />, label: "COORDS", val: "Greater Noida, IN", href: null },
                { icon: <Github size={16} />, label: "SOURCE", val: "github.com/Aviral-1", href: "https://github.com/Aviral-1" },
                { icon: <Linkedin size={16} />, label: "LINK", val: "aviral-mishra", href: "https://linkedin.com/in/aviral-mishra" },
              ].map(row => {
                const El = row.href ? "a" : "div";
                return (
                  <motion.div key={row.label} whileHover={{ x: 6 }} transition={{ duration: 0.3, ease }}>
                    <El href={row.href ?? undefined} target={row.href ? "_blank" : undefined} rel={row.href ? "noopener noreferrer" : undefined} className="ci-row">
                      <div className="ci-icon-box">{row.icon}</div>
                      <div className="ci-details">
                        <span className="ci-lbl">{row.label}</span>
                        <span className="ci-val">{row.val}</span>
                      </div>
                    </El>
                  </motion.div>
                );
              })}
            </div>

            <div className="contact-system-panel u-glass">
               <div className="csp-head">
                 <Terminal size={14} className="text-primary" />
                 <span>SYSTEM LOG</span>
               </div>
               <div className="csp-body">
                 {log.map((line, i) => (
                   <div key={i} className="csp-line">{line}</div>
                 ))}
                 {status === "submitting" && <div className="csp-line text-primary pulse">WAITING...</div>}
               </div>
            </div>
          </motion.div>

          <motion.form
            variants={scaleIn}
            className="contact-form-premium u-glass"
            onSubmit={handleSubmit}
          >
            <div className="cf-row">
              <EliteField id="name" label="IDENTIFIER" icon={<AtSign size={16} />} placeholder="Your name" required />
              <EliteField id="email" label="GATEWAY" type="email" icon={<Mail size={16} />} placeholder="Email address" required />
            </div>
            
            <EliteField id="subject" label="OBJECTIVE" icon={<ChevronRight size={16} />} placeholder="e.g. Project Inquiry" required />
            
            <EliteField id="message" label="PAYLOAD" textarea icon={<MessageSquare size={16} />} placeholder="Detailed description..." required />

            <MagneticBtn 
              type="submit" 
              className={`elite-submit ${status !== "idle" ? "is-active" : ""}`}
              disabled={status !== "idle"}
            >
              <AnimatePresence mode="wait">
                {status === "idle" && (
                  <motion.div key="idle" className="es-inner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    EXECUTE_SEND <Send size={15} />
                  </motion.div>
                )}
                {status === "submitting" && (
                  <motion.div key="submitting" className="es-inner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    PROCESSING...
                  </motion.div>
                )}
                {status === "success" && (
                  <motion.div key="success" className="es-inner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    SENT! <Check size={15} />
                  </motion.div>
                )}
              </AnimatePresence>
            </MagneticBtn>
          </motion.form>
        </div>
      </motion.div>

      <style jsx>{`
          .contact-grid {
            display: grid;
            grid-template-columns: 1fr 1.5fr;
            gap: 3rem;
            margin-top: 4rem;
          }
 
          /* --- Info Card --- */
          .ci-card {
            padding: 3rem;
            border-radius: var(--r-xl);
            border: 1px solid var(--border-bright) !important;
            position: relative;
            overflow: hidden;
            background: rgba(255, 255, 255, 0.01);
            box-shadow: 0 30px 60px -10px rgba(0,0,0,0.6);
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          .ci-card-glow {
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at 0px 0px, var(--primary), transparent 70%);
            opacity: 0.1;
          }
          .ci-row { display: flex; align-items: center; gap: 1.5rem; padding: 1.25rem 0; text-decoration: none; border-bottom: 1px solid rgba(255,255,255,0.05); }
          .ci-row:last-child { border-bottom: none; }
          .ci-icon-box {
             width: 48px; height: 48px;
             background: rgba(255,255,255,0.03);
             border-radius: 12px;
             border: 1px solid var(--border-bright);
             display: flex; align-items: center; justify-content: center;
             color: var(--primary);
             box-shadow: 0 10px 20px rgba(0,0,0,0.3);
          }
          .ci-details { display: flex; flex-direction: column; gap: 4px; }
          .ci-lbl { font-size: 0.65rem; color: var(--text-muted); font-family: var(--font-mono); letter-spacing: 0.2rem; font-weight: 800; text-transform: uppercase; }
          .ci-val { font-size: 1.1rem; color: #fff; font-weight: 800; }
 
          /* --- System Panel --- */
          .contact-system-panel {
             margin-top: 2rem;
             padding: 2rem;
             border-radius: 12px;
             background: rgba(0,0,0,0.5);
             border: 1px solid var(--border-bright);
             font-family: var(--font-mono);
          }
          .csp-head { display: flex; align-items: center; gap: 12px; font-size: 0.7rem; color: var(--text-muted); padding-bottom: 15px; border-bottom: 1px solid var(--border); font-weight: 800; letter-spacing: 0.2rem; }
          .csp-body { padding-top: 15px; display: flex; flex-direction: column; gap: 8px; }
          .csp-line { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }
 
          /* --- Elite Form --- */
          .contact-form-premium {
            padding: 3.5rem;
            background: rgba(255, 255, 255, 0.01);
            border-radius: var(--r-xl);
            border: 1px solid var(--border-bright) !important;
            display: flex;
            flex-direction: column;
            gap: 2.5rem;
            box-shadow: 0 40px 100px -20px rgba(0,0,0,0.8);
          }
 
          .elite-field { position: relative; width: 100%; display: flex; flex-direction: column; gap: 1rem; }
          .ef-label-wrap { display: flex; align-items: center; gap: 12px; }
          .ef-icon { transition: all 0.3s ease; }
          .ef-label { font-size: 0.7rem; font-family: var(--font-mono); color: var(--text-muted); letter-spacing: 0.2rem; font-weight: 800; }
          
          .ef-input {
            background: rgba(255,255,255,0.02);
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 1.25rem 1.5rem;
            color: #fff;
            font-size: 1.1rem;
            font-weight: 600;
            transition: all 0.4s ease;
            width: 100%;
          }
          .ef-input:focus { outline: none; border-color: var(--primary); background: rgba(255,255,255,0.04); box-shadow: 0 0 20px oklch(from var(--primary) l c h / 0.1); }
          .ef-textarea { resize: none; }
          
          .elite-submit {
            margin-top: 1rem;
            height: 70px;
            background: var(--primary);
            border: none;
            border-radius: var(--r-lg);
            color: #000;
            font-weight: 900;
            font-family: var(--font-mono);
            letter-spacing: 0.2rem;
            display: flex; align-items: center; justify-content: center;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
          }
          .elite-submit:hover:not(:disabled) { transform: scale(1.02); box-shadow: 0 20px 40px oklch(from var(--primary) l c h / 0.3); }
          .elite-submit:disabled { opacity: 0.5; cursor: not-allowed; filter: grayscale(1); }
          
          .es-inner { display: flex; align-items: center; gap: 15px; font-size: 1.1rem; }
 
          @media (max-width: 1100px) {
            .contact-grid { grid-template-columns: 1fr; gap: 3rem; }
            .cf-row { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
          }
          @media (max-width: 768px) {
            .cf-row { grid-template-columns: 1fr; gap: 2.5rem; }
            .contact-form-premium { padding: 2.5rem; }
            .ci-card { padding: 2rem; }
            .elite-submit { height: 60px; font-size: 0.9rem; }
          }
        `}</style>
    </section>
  );
}
