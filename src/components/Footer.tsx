"use client";

import React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, Twitter, Globe } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: "About Me", href: "/about" },
    { label: "My Projects", href: "/projects" },
    { label: "Online Resume", href: "/resume" },
    { label: "Contact Center", href: "/contact" },
    { label: "GitHub Profile", href: "https://github.com/Inderash", external: true },
    { label: "LinkedIn Connect", href: "https://linkedin.com", external: true },
    { label: "Email Direct", href: "mailto:minderash@gmail.com", external: true },
    { label: "Source Code", href: "https://github.com/Inderash/portfolio", external: true },
  ];

  return (
    <footer className="bg-netflixDark border-t border-white/5 py-12 px-4 sm:px-6 lg:px-8 text-gray-500 text-xs sm:text-sm select-none">
      <div className="max-w-5xl mx-auto flex flex-col space-y-8">
        
        {/* Social Media Link Icons */}
        <div className="flex items-center space-x-6">
          <a
            href="https://github.com/Inderash"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors duration-200"
            title="GitHub"
          >
            <Github size={22} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors duration-200"
            title="LinkedIn"
          >
            <Linkedin size={22} />
          </a>
          <a
            href="mailto:minderash@gmail.com"
            className="hover:text-white transition-colors duration-200"
            title="Email"
          >
            <Mail size={22} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors duration-200"
            title="Twitter"
          >
            <Twitter size={22} />
          </a>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-4">
          {footerLinks.map((link, i) => (
            <div key={i}>
              {link.external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline hover:text-white/80 transition-colors duration-150"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  href={link.href}
                  className="hover:underline hover:text-white/80 transition-colors duration-150"
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Language/Country & Copyright */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 pt-6 border-t border-white/5">
          <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded text-[11px] self-start text-gray-300 font-medium">
            <Globe size={12} className="text-gray-400" />
            <span>Inderash Portfolio - India</span>
          </div>

          <div className="text-[11px] text-gray-500">
            &copy; {currentYear} Inderash. Built with Next.js 15, Framer Motion, and GSAP. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
