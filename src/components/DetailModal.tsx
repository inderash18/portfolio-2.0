"use client";

import React, { useRef, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Github, ExternalLink, GitFork, Star, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function DetailModal() {
  const { activeProject, closeDetailModal } = useApp();
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDetailModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeDetailModal]);

  if (!activeProject) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-10 select-none">
        {/* Backdrop trigger */}
        <div className="fixed inset-0 cursor-default" onClick={closeDetailModal} />

        {/* Modal Window Container */}
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.95 }}
          transition={{ type: "spring", damping: 22, stiffness: 150 }}
          className="relative w-full max-w-4xl bg-netflixBlack text-white rounded-lg overflow-hidden z-10 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
        >
          {/* Close button */}
          <button
            onClick={closeDetailModal}
            className="absolute top-4 right-4 z-30 p-2 bg-black/60 hover:bg-black/90 text-white rounded-full transition-colors border border-white/10"
            title="Close modal"
          >
            <X size={20} />
          </button>

          {/* Hero Banner Area */}
          <div className="relative w-full aspect-[21/9] sm:aspect-video md:aspect-[21/9] bg-neutral-900">
            <img
              src={activeProject.imageUrl}
              alt={activeProject.title}
              className="w-full h-full object-cover opacity-60"
            />
            {/* Dark gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-netflixBlack via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/85 via-transparent to-transparent" />

            {/* Float Overlay Actions */}
            <div className="absolute bottom-6 left-6 sm:left-10 z-20 flex flex-col space-y-3">
              <span className="px-3 py-1 bg-white/15 text-white rounded-full text-xs font-semibold self-start backdrop-blur-md">
                {activeProject.category}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight drop-shadow-md text-glow">
                {activeProject.title}
              </h2>

              <div className="flex flex-wrap items-center gap-3">
                {/* Launch Links */}
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-2 bg-white text-black hover:bg-white/80 transition-colors px-4 py-2 rounded text-xs sm:text-sm font-bold shadow"
                >
                  <Github size={16} />
                  <span>GitHub Repository</span>
                </a>
                
                {activeProject.liveUrl && (
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-2 bg-netflixRed text-white hover:bg-[#b20710] transition-colors px-4 py-2 rounded text-xs sm:text-sm font-bold shadow"
                  >
                    <ExternalLink size={16} />
                    <span>Live Demonstration</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Details Body Grid */}
          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 bg-netflixBlack">
            {/* Left Column: Descriptions, Features, Challenges */}
            <div className="md:col-span-2 flex flex-col space-y-6">
              {/* Meta indicators */}
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-300 font-semibold">
                <span className="text-emerald-400 font-bold">{activeProject.matchPercentage}% Match</span>
                <span>{activeProject.year}</span>
                <span className="px-1.5 py-0.5 border border-gray-400 text-[10px] rounded leading-none text-gray-300">
                  {activeProject.rating}
                </span>
                <span>{activeProject.duration}</span>
              </div>

              {/* Extended Details Description */}
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Overview</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  {activeProject.longDescription}
                </p>
              </div>

              {/* Key Features List */}
              <div>
                <h3 className="text-lg font-bold text-white mb-3">Key Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-300">
                  {activeProject.features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <CheckCircle size={16} className="text-netflixRed mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Challenges */}
              <div className="p-4 bg-white/5 rounded border border-white/5">
                <h3 className="text-sm font-bold text-netflixRed uppercase tracking-wider mb-2">
                  Engineering Challenges & Solutions
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                  {activeProject.challenges}
                </p>
              </div>
            </div>

            {/* Right Column: Tech Stack details, stats, architecture */}
            <div className="flex flex-col space-y-6 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-6">
              {/* Stars/Forks Stats */}
              <div>
                <h4 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">
                  Repository Activity
                </h4>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1.5 text-sm font-semibold text-gray-200">
                    <Star size={16} className="text-yellow-500 fill-current" />
                    <span>{activeProject.stars} Stars</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-sm font-semibold text-gray-200">
                    <GitFork size={16} className="text-gray-400" />
                    <span>{activeProject.forks} Forks</span>
                  </div>
                </div>
              </div>

              {/* Technologies list */}
              <div>
                <h4 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 bg-netflixGray text-white rounded font-medium border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Architecture details */}
              <div>
                <h4 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">
                  Architecture
                </h4>
                <p className="text-gray-300 text-xs leading-relaxed">
                  {activeProject.architecture}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 text-[10px] text-gray-400">
                <Link href={`/projects/${activeProject.id}`} className="hover:underline hover:text-white flex items-center space-x-1">
                  <span>Visit standalone project page</span>
                  <ExternalLink size={10} />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
