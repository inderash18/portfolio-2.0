"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useApp, UserProfile } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Bell, Search, Briefcase, Code, Cpu, User, ChevronDown, Volume2, VolumeX } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const { activeProfile, setProfile, soundEnabled, setSoundEnabled } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const navLinks: NavLink[] = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Resume", href: "/resume" },
    { label: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
  }, [pathname]);

  const getProfileIcon = (profile: UserProfile, size: number = 16) => {
    switch (profile) {
      case "recruiter":
        return <Briefcase size={size} className="text-white" />;
      case "developer":
        return <Code size={size} className="text-white" />;
      case "ai-engineer":
        return <Cpu size={size} className="text-white" />;
      default:
        return <User size={size} className="text-white" />;
    }
  };

  const getProfileColor = (profile: UserProfile) => {
    switch (profile) {
      case "recruiter":
        return "bg-blue-600";
      case "developer":
        return "bg-emerald-600";
      case "ai-engineer":
        return "bg-purple-600";
      default:
        return "bg-neutral-600";
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-colors duration-500 ease-in-out ${
          isScrolled ? "bg-[#141414] shadow-md border-b border-white/5" : "bg-gradient-to-b from-black/80 to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo & Navigation */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center">
              <span className="text-2xl sm:text-3xl font-black tracking-tighter text-netflixRed text-glow transition-transform hover:scale-105 duration-300">
                INDERASH
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium transition-colors duration-300 ${
                      isActive ? "text-white font-semibold" : "text-gray-300 hover:text-gray-400"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Side Options */}
          <div className="flex items-center space-x-4">
            {/* Search link (Redirects to projects search) */}
            <Link href="/projects" className="text-gray-300 hover:text-white transition-colors duration-300 p-1">
              <Search size={20} />
            </Link>

            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="text-gray-300 hover:text-white transition-colors duration-300 p-1"
              title={soundEnabled ? "Mute audio" : "Enable audio"}
            >
              {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none p-1 group"
              >
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded flex items-center justify-center ${getProfileColor(
                    activeProfile
                  )} shadow-sm transition-transform group-hover:scale-105 duration-200 overflow-hidden relative`}
                >
                  <Image
                    src={
                      activeProfile === "recruiter" ? "/avatars/first.webp" :
                      activeProfile === "developer" ? "/avatars/hacker.jpg" :
                      activeProfile === "ai-engineer" ? "/avatars/ai.jpg" :
                      "/avatars/first.webp" // default fallback
                    }
                    alt="Profile"
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </div>
                <ChevronDown
                  size={14}
                  className={`text-gray-400 transition-transform duration-300 ${
                    isProfileDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isProfileDropdownOpen && (
                  <>
                    {/* Backdrop to close click */}
                    <div
                      className="fixed inset-0 z-0"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-56 glass-card rounded-md shadow-2xl py-2 z-10 border border-white/10"
                    >
                      <div className="px-4 py-2 border-b border-white/10 text-xs text-gray-400">
                        Switch watching profile:
                      </div>
                      
                      <button
                        onClick={() => { setProfile("recruiter"); setIsProfileDropdownOpen(false); }}
                        className={`w-full flex items-center space-x-3 px-4 py-2 text-sm text-left hover:bg-white/5 transition-colors ${
                          activeProfile === "recruiter" ? "text-netflixRed font-bold" : "text-white"
                        }`}
                      >
                        <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center">
                          {getProfileIcon("recruiter", 12)}
                        </div>
                        <span>Recruiter</span>
                      </button>

                      <button
                        onClick={() => { setProfile("developer"); setIsProfileDropdownOpen(false); }}
                        className={`w-full flex items-center space-x-3 px-4 py-2 text-sm text-left hover:bg-white/5 transition-colors ${
                          activeProfile === "developer" ? "text-netflixRed font-bold" : "text-white"
                        }`}
                      >
                        <div className="w-6 h-6 rounded bg-emerald-600 flex items-center justify-center">
                          {getProfileIcon("developer", 12)}
                        </div>
                        <span>Developer</span>
                      </button>

                      <button
                        onClick={() => { setProfile("ai-engineer"); setIsProfileDropdownOpen(false); }}
                        className={`w-full flex items-center space-x-3 px-4 py-2 text-sm text-left hover:bg-white/5 transition-colors ${
                          activeProfile === "ai-engineer" ? "text-netflixRed font-bold" : "text-white"
                        }`}
                      >
                        <div className="w-6 h-6 rounded bg-purple-600 flex items-center justify-center">
                          {getProfileIcon("ai-engineer", 12)}
                        </div>
                        <span>AI Engineer</span>
                      </button>

                      <button
                        onClick={() => { setProfile("guest"); setIsProfileDropdownOpen(false); }}
                        className={`w-full flex items-center space-x-3 px-4 py-2 text-sm text-left hover:bg-white/5 transition-colors ${
                          activeProfile === "guest" ? "text-netflixRed font-bold" : "text-white"
                        }`}
                      >
                        <div className="w-6 h-6 rounded bg-neutral-600 flex items-center justify-center">
                          {getProfileIcon("guest", 12)}
                        </div>
                        <span>Guest</span>
                      </button>

                      <div className="border-t border-white/10 mt-2 pt-2">
                        <button
                          onClick={() => { setProfile(null); setIsProfileDropdownOpen(false); }}
                          className="w-full text-center text-xs text-gray-400 hover:text-white py-1 transition-colors"
                        >
                          Sign out of profile
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white transition-colors duration-300 p-1"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-30 md:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-64 h-full bg-[#141414] z-30 shadow-2xl border-l border-white/5 pt-20 px-6 flex flex-col space-y-6 md:hidden"
            >
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-lg font-medium transition-colors ${
                        isActive ? "text-netflixRed font-semibold" : "text-gray-300 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <div className="border-t border-white/10 pt-6 mt-6">
                <div className="text-xs text-gray-400 mb-3 uppercase tracking-wider">Active Profile:</div>
                <div className="flex items-center space-x-3 bg-white/5 p-3 rounded border border-white/5">
                  <div
                    className={`w-8 h-8 rounded flex items-center justify-center ${getProfileColor(
                      activeProfile
                    )}`}
                  >
                    {getProfileIcon(activeProfile, 14)}
                  </div>
                  <span className="capitalize font-semibold text-white">
                    {activeProfile || "Guest"}
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
