"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, Maximize2, Minimize2, X } from "lucide-react";

const COMMANDS = [
  { cmd: "whoami", res: "Aviral Mishra — Frontend Developer & UI Architect" },
  { cmd: "skills --featured", res: "React.js, Next.js, TypeScript, NestJS, GIS/Mapping" },
  { cmd: "location", res: "Greater Noida, India" },
  { cmd: "contact --available", res: "aviralsul2000@gmail.com | +91 6398407914" },
  { cmd: "exit", res: "Process completed successfully. System optimized." }
];

export default function TerminalHero() {
  const [history, setHistory] = useState<{ cmd: string; res: string }[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const [step, setStep] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTypingCmd, setIsTypingCmd] = useState(true);
  const [mounted, setMounted] = useState(false);
 
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (step >= COMMANDS.length) return;

    const currentItem = COMMANDS[step];
    
    if (isTypingCmd) {
      if (charIndex < currentItem.cmd.length) {
        const t = setTimeout(() => {
          setCurrentLine(prev => prev + currentItem.cmd[charIndex]);
          setCharIndex(prev => prev + 1);
        }, 60);
        return () => clearTimeout(t);
      } else {
        // Command finished typing
        const t = setTimeout(() => {
          setIsTypingCmd(false);
          setCharIndex(0);
        }, 600);
        return () => clearTimeout(t);
      }
    } else {
      // Showing response
      setHistory(prev => [...prev, currentItem]);
      setCurrentLine("");
      const t = setTimeout(() => {
        setStep(prev => prev + 1);
        setIsTypingCmd(true);
        setCharIndex(0);
      }, 1000);
      return () => clearTimeout(t);
    }
  }, [step, charIndex, isTypingCmd]);

  return (
    <div className="terminal-wrap">
      <div className="terminal-header">
        <div className="terminal-controls">
          <div className="t-dot t-red" />
          <div className="t-dot t-yellow" />
          <div className="t-dot t-green" />
        </div>
        <div className="terminal-title">
          <TerminalIcon size={12} className="text-primary" />
          <span>bash — aviral-mishra@portfolio</span>
        </div>
        <div className="terminal-actions">
           <Maximize2 size={12} className="text-dim" />
        </div>
      </div>
      
      <div className="terminal-body scrollbar-hide">
        <div className="terminal-welcome">
          {`>>> SESSION_START: ${mounted ? new Date().toLocaleDateString() : "---"} [PROD_READY]\n>>> SYSTEM_INTEGRITY: OPTIMAL\n>>> WELCOME TO CORE_INTERFACE v6.0.2`}
        </div>
        
        <div className="terminal-history">
          {history.map((item, i) => (
            <div key={i} className="history-item">
              <div className="history-cmd">
                <span className="terminal-prompt">root@aviral:~#</span> {item.cmd}
              </div>
              <motion.div 
                className="history-res"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {`> ${item.res}`}
              </motion.div>
            </div>
          ))}
          
          <div className="current-line">
            <span className="terminal-prompt">root@aviral:~#</span> {currentLine}
            <span className="terminal-cursor" />
          </div>
        </div>
      </div>

      <div className="terminal-status-bar">
        <div className="ts-item"><div className="ts-dot" /> PROCESS: CPU_{Math.floor(Math.random() * 10 + 2)}%</div>
        <div className="ts-item">MEM: 1.2GB</div>
        <div className="ts-item ts-right">UTF-8</div>
      </div>

      <style>{`
        .terminal-wrap {
          width: 100%;
          max-width: 580px;
          background: rgba(4, 7, 16, 0.6);
          backdrop-filter: blur(40px) saturate(1.8);
          -webkit-backdrop-filter: blur(40px) saturate(1.8);
          border: 1px solid var(--border-bright);
          border-radius: var(--r-xl);
          overflow: hidden;
          box-shadow: 
            0 40px 100px -20px rgba(0,0,0,0.8),
            inset 0 1px 0 rgba(255,255,255,0.1);
          font-family: var(--font-mono), 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          height: 400px;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .terminal-wrap::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%);
          pointer-events: none;
        }

        .terminal-header {
          background: rgba(255, 255, 255, 0.03);
          padding: 12px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border);
          backdrop-filter: blur(10px);
        }

        .terminal-controls { display: flex; gap: 8px; }
        .t-dot { width: 10px; height: 10px; border-radius: 50%; opacity: 0.8; }
        .t-red { background: #ff5f56; box-shadow: 0 0 10px rgba(255, 95, 86, 0.4); }
        .t-yellow { background: #ffbd2e; }
        .t-green { background: #27c93f; }

        .terminal-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.65rem;
          color: var(--text-dim);
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: 0.2em;
          font-weight: 800;
        }

        .terminal-body {
          flex: 1;
          padding: 2rem;
          overflow-y: auto;
          color: var(--text);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          position: relative;
          z-index: 2;
        }

        .terminal-welcome {
          color: var(--primary);
          font-size: 0.7rem;
          line-height: 1.6;
          font-family: var(--font-mono);
          white-space: pre-line;
          font-weight: 700;
          letter-spacing: 0.02em;
        }

        .terminal-prompt { color: var(--primary); font-weight: 900; opacity: 0.5; margin-right: 8px; }
        .history-item { display: flex; flex-direction: column; gap: 6px; }
        .history-cmd { color: #fff; font-weight: 700; font-size: 0.9rem; }
        .history-res { color: var(--text-muted); font-size: 0.8rem; border-left: 2px solid var(--border); padding-left: 12px; margin-left: 6px; line-height: 1.6; }

        .current-line { display: flex; align-items: center; }
        
        .terminal-cursor {
          width: 8px;
          height: 18px;
          background: var(--primary);
          margin-left: 4px;
          animation: terminal-blink 1s step-end infinite;
          box-shadow: 0 0 10px var(--primary);
        }

        .terminal-status-bar {
          background: rgba(0,0,0,0.4);
          border-top: 1px solid var(--border);
          padding: 8px 20px;
          display: flex;
          gap: 1.5rem;
          font-size: 0.6rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
          font-weight: 700;
          letter-spacing: 0.1em;
        }
        .ts-item { display: flex; align-items: center; gap: 8px; }
        .ts-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--emerald); box-shadow: 0 0 8px var(--emerald); }
        .ts-right { margin-left: auto; color: var(--primary); }

        @keyframes terminal-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

        @media (max-width: 768px) {
          .terminal-wrap { height: 320px; font-size: 0.8rem; }
          .terminal-body { padding: 20px; }
        }
      `}</style>
    </div>
  );
}
