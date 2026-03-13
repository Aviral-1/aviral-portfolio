"use client";

import React from "react";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
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
  );
}
