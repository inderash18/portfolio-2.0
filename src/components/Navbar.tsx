"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useApp, UserProfile } from "@/context/AppContext";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import {
  Menu, X, Search, Briefcase, Code, Cpu, User,
  ChevronDown, Volume2, VolumeX, Zap, Terminal, ArrowUpRight,
} from "lucide-react";

interface NavLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

// ── Web Audio API click synthesiser ──────────────────────────────────────────
function playTick(type: "hover" | "click" = "hover") {
  if (typeof window === "undefined") return;
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(type === "click" ? 880 : 660, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(type === "click" ? 440 : 330, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.12);
  } catch (_) { /* silently fail if AudioContext blocked */ }
}

export default function Navbar() {
  const pathname = usePathname();
  const { activeProfile, setProfile, soundEnabled, setSoundEnabled } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const navLinks: NavLink[] = [
    { label: "Home",     href: "/" },
    { label: "About",    href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Resume",   href: "/resume" },
    { label: "Contact",  href: "/contact" },
  ];

  // Profile config
  const profileConfig: Record<string, { color: string; glow: string; icon: React.ReactNode; avatar: string }> = {
    recruiter:    { color: "bg-blue-600",    glow: "shadow-blue-500/40",   icon: <Briefcase size={12} className="text-white" />,  avatar: "/avatars/first.webp" },
    developer:    { color: "bg-emerald-600", glow: "shadow-emerald-500/40",icon: <Code size={12} className="text-white" />,        avatar: "/avatars/hacker.jpg" },
    "ai-engineer":{ color: "bg-purple-600",  glow: "shadow-purple-500/40", icon: <Cpu size={12} className="text-white" />,         avatar: "/avatars/ai.jpg" },
    guest:        { color: "bg-neutral-600", glow: "shadow-neutral-500/20", icon: <User size={12} className="text-white" />,        avatar: "/avatars/first.webp" },
  };

  const activeConfig = profileConfig[activeProfile ?? "guest"] ?? profileConfig["guest"];

  // Profile ambient glow colour mapping
  const profileGlowBorder: Record<string, string> = {
    recruiter:     "border-blue-500/30",
    developer:     "border-emerald-500/30",
    "ai-engineer": "border-purple-500/30",
    guest:         "border-white/10",
  };
  const currentBorder = profileGlowBorder[activeProfile ?? "guest"] ?? "border-white/10";

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const handleSound = useCallback((type: "hover" | "click") => {
    if (soundEnabled) playTick(type);
  }, [soundEnabled]);

  // Active / hovered link indicator
  const activeHref = hoveredLink ?? pathname;

  return (
    <>
      {/* ── Main Header ─────────────────────────────────────────────────── */}
      <motion.header
        initial={false}
        animate={isScrolled ? "scrolled" : "top"}
        variants={{
          top: {
            top: 0,
            margin: "0 auto",
            borderRadius: "0px",
            backdropFilter: "blur(0px)",
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "rgba(255,255,255,0)",
          },
          scrolled: {
            top: 12,
            margin: "0 auto",
            borderRadius: "9999px",
            backdropFilter: "blur(24px)",
            backgroundColor: "rgba(10,10,10,0.85)",
            borderColor: "rgba(255,255,255,0.08)",
          },
        }}
        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed left-0 right-0 z-40 mx-auto border transition-shadow duration-500 ${
          isScrolled
            ? `max-w-5xl shadow-2xl ${currentBorder}`
            : "max-w-full border-transparent bg-gradient-to-b from-black/70 to-transparent"
        }`}
      >
        <div className="px-4 sm:px-6 lg:px-8 h-16 sm:h-[62px] flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            onClick={() => handleSound("click")}
            className="flex items-center gap-2 group"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <span className="relative">
                <span className="text-2xl sm:text-[22px] font-black tracking-tighter text-netflixRed leading-none">
                  INDERASH
                </span>
                {/* subtle underline laser */}
                <motion.span
                  layoutId="logo-laser"
                  className="absolute -bottom-0.5 left-0 h-[2px] w-full bg-gradient-to-r from-netflixRed via-red-400 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </span>
              <Zap size={13} className="text-netflixRed opacity-70 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1 relative"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const isHovered = hoveredLink === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => { setHoveredLink(link.href); handleSound("hover"); }}
                  onClick={() => handleSound("click")}
                  className="relative px-4 py-1.5 text-[13px] font-medium rounded-full transition-colors duration-200 z-10"
                >
                  {/* Sliding background pill */}
                  {(isActive || isHovered) && (
                    <motion.span
                      layoutId="navPill"
                      className={`absolute inset-0 rounded-full ${
                        isActive
                          ? "bg-white/10 border border-white/10"
                          : "bg-white/5"
                      }`}
                      transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                    />
                  )}
                  <span
                    className={`relative z-10 transition-colors duration-200 ${
                      isActive ? "text-white" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </span>
                  {/* Red dot for active */}
                  {isActive && (
                    <motion.span
                      layoutId="activeDot"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-netflixRed"
                      transition={{ type: "spring", bounce: 0.4 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Search toggle */}
            <div className="relative hidden sm:flex items-center">
              <AnimatePresence>
                {searchOpen && (
                  <motion.input
                    ref={searchRef}
                    key="search"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 160, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    placeholder="Search projects…"
                    className="bg-white/5 border border-white/10 text-white text-xs rounded-full px-3 py-1.5 outline-none placeholder-gray-500 mr-1"
                    onKeyDown={(e) => {
                      if (e.key === "Escape") setSearchOpen(false);
                      if (e.key === "Enter") {
                        window.location.href = `/projects?q=${(e.target as HTMLInputElement).value}`;
                      }
                    }}
                  />
                )}
              </AnimatePresence>
              <button
                onClick={() => { setSearchOpen(!searchOpen); handleSound("click"); }}
                className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
                title="Search"
              >
                <Search size={16} />
              </button>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={() => { setSoundEnabled(!soundEnabled); handleSound("click"); }}
              className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
              title={soundEnabled ? "Mute" : "Enable sound"}
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            {/* Profile Switcher */}
            <div className="relative">
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => { setIsProfileDropdownOpen(!isProfileDropdownOpen); handleSound("click"); }}
                className="flex items-center gap-1.5 group focus:outline-none"
              >
                <div
                  className={`w-8 h-8 rounded-lg overflow-hidden relative shadow-lg ${activeConfig.glow} shadow-md transition-shadow duration-300 group-hover:shadow-xl`}
                >
                  <Image
                    src={activeConfig.avatar}
                    alt="Profile"
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                  {/* Online indicator */}
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full border border-black" />
                </div>
                <ChevronDown
                  size={12}
                  className={`text-gray-400 transition-transform duration-300 ${isProfileDropdownOpen ? "rotate-180" : ""}`}
                />
              </motion.button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {isProfileDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-0" onClick={() => setIsProfileDropdownOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute right-0 mt-3 w-60 z-50 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                      style={{ background: "rgba(10,10,10,0.92)", backdropFilter: "blur(24px)" }}
                    >
                      {/* Header */}
                      <div className="px-4 py-3 border-b border-white/8">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Switch Profile</p>
                        <p className="text-xs text-gray-300 mt-0.5 capitalize font-medium">{activeProfile ?? "Guest"} viewing mode active</p>
                      </div>

                      {/* Profile options */}
                      {(["recruiter", "developer", "ai-engineer", "guest"] as UserProfile[]).map((p) => {
                        const cfg = profileConfig[p ?? "guest"];
                        const isActiveP = activeProfile === p;
                        return (
                          <motion.button
                            key={p}
                            whileHover={{ x: 4 }}
                            onClick={() => { setProfile(p); setIsProfileDropdownOpen(false); handleSound("click"); }}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                              isActiveP ? "bg-white/8 text-white" : "text-gray-300 hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            <div className={`w-7 h-7 rounded-md ${cfg.color} flex items-center justify-center shadow-sm`}>
                              {cfg.icon}
                            </div>
                            <span className="capitalize font-medium">{p === "ai-engineer" ? "AI Engineer" : p}</span>
                            {isActiveP && (
                              <motion.span
                                layoutId="activeProfileBadge"
                                className="ml-auto text-[10px] text-netflixRed font-bold uppercase tracking-wider"
                              >
                                Active
                              </motion.span>
                            )}
                          </motion.button>
                        );
                      })}

                      {/* Sign out */}
                      <div className="border-t border-white/8 p-2">
                        <button
                          onClick={() => { setProfile(null); setIsProfileDropdownOpen(false); }}
                          className="w-full text-center text-[11px] text-gray-500 hover:text-gray-300 py-1.5 transition-colors rounded-lg hover:bg-white/5"
                        >
                          Reset to Guest
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => { setIsMobileMenuOpen(!isMobileMenuOpen); handleSound("click"); }}
              className="md:hidden p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/5 transition-all"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileMenuOpen
                  ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={20} /></motion.div>
                  : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu size={20} /></motion.div>
                }
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Full-Screen Drawer ───────────────────────────────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobileBackdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 md:hidden"
            />

            {/* Drawer */}
            <motion.div
              key="mobileDrawer"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 w-72 h-full z-40 flex flex-col md:hidden border-l border-white/8"
              style={{ background: "rgba(8,8,8,0.96)", backdropFilter: "blur(32px)" }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 h-16 border-b border-white/8">
                <span className="text-lg font-black text-netflixRed tracking-tighter">INDERASH</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              {/* Nav links with stagger */}
              <nav className="flex flex-col px-4 pt-6 gap-1">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ x: 30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.05, duration: 0.25 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => { setIsMobileMenuOpen(false); handleSound("click"); }}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-netflixRed/15 text-white border border-netflixRed/30"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <span>{link.label}</span>
                        {isActive
                          ? <span className="w-1.5 h-1.5 rounded-full bg-netflixRed" />
                          : <ArrowUpRight size={14} className="opacity-30" />}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Profile panel at bottom */}
              <div className="mt-auto px-4 pb-8 border-t border-white/8 pt-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-3">Active Profile</p>
                <div className={`flex items-center gap-3 rounded-xl p-3 ${activeConfig.color}/10 border border-white/10`}>
                  <div className={`w-9 h-9 rounded-lg overflow-hidden relative shadow-lg ${activeConfig.glow}`}>
                    <Image src={activeConfig.avatar} alt="Profile" fill sizes="36px" className="object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white capitalize">{activeProfile ?? "Guest"}</p>
                    <p className="text-[10px] text-gray-500">Viewing Mode</p>
                  </div>
                  <Terminal size={14} className="ml-auto text-gray-600" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
