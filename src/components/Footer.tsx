"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Twitter, Youtube, Globe } from "lucide-react";
import confetti from "canvas-confetti";

// ── Helpers ────────────────────────────────────────────────────────────────
function useFakeLatency(baseMs: number) {
  const [latency, setLatency] = useState(baseMs);
  useEffect(() => {
    const id = setInterval(() => {
      setLatency(baseMs + Math.floor(Math.random() * 8 - 3));
    }, 2000);
    return () => clearInterval(id);
  }, [baseMs]);
  return latency;
}

// ── Component ──────────────────────────────────────────────────────────────
export default function Footer() {
  const year = new Date().getFullYear();
  const latency = useFakeLatency(12);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [easterEggActive, setEasterEggActive] = useState(false);

  const socials = [
    { icon: <Github size={22} />,   href: "https://github.com/inderash18",      label: "GitHub" },
    { icon: <Twitter size={22} />,  href: "https://twitter.com",               label: "Twitter" },
    { icon: <Linkedin size={22} />, href: "https://linkedin.com",              label: "LinkedIn" },
    { icon: <Mail size={22} />,     href: "mailto:minderash@gmail.com",        label: "Email" },
  ];

  const handleLogoClick = () => {
    const next = logoClickCount + 1;
    setLogoClickCount(next);
    if (next >= 5) {
      setLogoClickCount(0);
      setEasterEggActive(true);
      confetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.9 },
        colors: ["#e50914", "#ffffff", "#a855f7", "#3b82f6", "#f59e0b"],
        scalar: 1.2,
      });
      setTimeout(() => setEasterEggActive(false), 3000);
    }
  };

  return (
    <footer className="bg-[#1a1a1a] border-t border-white/5 py-12 px-4 text-center select-none">
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-8">

        {/* ── Social Icons Row ────────────────────────────────────────── */}
        <div className="flex items-center justify-center gap-7">
          {socials.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              whileHover={{ y: -3, scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              title={s.label}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              {s.icon}
            </motion.a>
          ))}
        </div>

        {/* ── Description Text ────────────────────────────────────────── */}
        <p className="text-gray-400 text-sm leading-relaxed max-w-lg">
          I build high-performance web platforms, scalable APIs, and AI-powered systems.
          This portfolio is open-source and crafted entirely from scratch using Next.js,
          Framer Motion, Three.js, and a lot of caffeine.
        </p>

        {/* ── Large Brand Logo ─────────────────────────────────────────── */}
        <div className="py-2 relative">
          <AnimatePresence>
            {easterEggActive && (
              <motion.span
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-netflixRed font-mono whitespace-nowrap"
              >
                🎉 Thanks for your time!
              </motion.span>
            )}
          </AnimatePresence>

          <motion.button
            onClick={handleLogoClick}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="focus:outline-none"
            title="Click 5 times for a surprise"
          >
            <span
              className="text-5xl sm:text-6xl font-black tracking-tighter text-white"
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                letterSpacing: "-0.03em",
              }}
            >
              INDERASH
            </span>
          </motion.button>
        </div>

        {/* ── Region + Status ──────────────────────────────────────────── */}
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Globe size={14} />
          <span>India</span>
          <span className="text-gray-600">|</span>
          <span className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
            </span>
            <span className="text-gray-500">Online · {latency}ms</span>
          </span>
        </div>

        {/* ── Copyright ────────────────────────────────────────────────── */}
        <p className="text-gray-600 text-xs">
          © {year} Inderash. Built with Next.js, Framer Motion &amp; Three.js. All rights reserved.
        </p>

      </div>
    </footer>
  );
}
