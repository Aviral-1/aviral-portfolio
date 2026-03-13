"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import { fadeUp, stagger, scaleIn, MagneticBtn } from "@/lib/ui-utils";

export default function Contact() {
  return (
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
  );
}
