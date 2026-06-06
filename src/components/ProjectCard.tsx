"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import { Project } from "@/data/projects";
import { useApp } from "@/context/AppContext";
import { Play, Plus, ChevronDown, Check } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { openDetailModal, setHeroProject, heroProject } = useApp();
  const [isHovered, setIsHovered] = useState(false);
  const [inList, setInList] = useState(false);
  
  const cardRef = useRef<HTMLDivElement>(null);

  // 1. Raw mouse coordinate tracking
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // 2. Wrap coordinates with spring physics for unified inertia + restore easing
  const springConfig = { damping: 25, stiffness: 220, mass: 0.5 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  // 3. Map smooth coordinate spring to subtle degree tilts (max 8 degrees for premium feel)
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);

  // 4. Map reflection glare location
  const glareXStyle = useTransform(smoothX, [-0.5, 0.5], ["0%", "100%"]);
  const glareYStyle = useTransform(smoothY, [-0.5, 0.5], ["0%", "100%"]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareXStyle} ${glareYStyle}, rgba(255, 255, 255, 0.35) 0%, transparent 65%)`;

  // 5. Shift shadow translation to create elevation height offset
  const shadowTranslateX = useTransform(smoothX, [-0.5, 0.5], [6, -6]);
  const shadowTranslateY = useTransform(smoothY, [-0.5, 0.5], [10, -10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Normalize coordinates relative to card center [-0.5, 0.5]
    const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (e.clientY - rect.top) / rect.height - 0.5;
    
    rawX.set(relativeX);
    rawY.set(relativeY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Smoothly restore coordinates back to 0 via spring release
    rawX.set(0);
    rawY.set(0);
  };

  const handleCardClick = () => {
    openDetailModal(project);
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openDetailModal(project);
  };

  const handleListToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setInList(!inList);
    setHeroProject(project);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex-none w-[200px] sm:w-[260px] md:w-[320px] aspect-video rounded-md overflow-visible cursor-pointer z-10"
      onClick={handleCardClick}
      style={{ perspective: 1000 }} // 3D viewport setup
    >
      {/* Dynamic 3D tilted card face */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          willChange: "transform", // GPU Acceleration trigger
        }}
        className="w-full h-full relative rounded-md overflow-hidden bg-[#181818] border border-white/5 shadow-lg"
      >
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover select-none pointer-events-none"
        />
        
        {/* Real-time color dodge glare sheen reflection */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none opacity-35 mix-blend-color-dodge"
            style={{
              background: glareBackground,
            }}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-3 pointer-events-none">
          <span className="text-white text-xs sm:text-sm font-bold truncate tracking-wide">
            {project.title}
          </span>
        </div>
      </motion.div>

      {/* Floating offset drop shadow layer (adds physical height depth) */}
      {isHovered && (
        <motion.div
          className="absolute -inset-1 rounded-md z-0 pointer-events-none opacity-45 bg-[#0b0b0f] blur-md"
          style={{
            x: shadowTranslateX,
            y: shadowTranslateY,
          }}
          transition={{ type: "spring", damping: 25, stiffness: 220 }}
        />
      )}

      {/* Expanded Hover Overlay card */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1.15,
              y: -35, 
              transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] } 
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.9, 
              y: 0,
              transition: { duration: 0.22 } 
            }}
            className="absolute -top-6 left-0 right-0 z-30 bg-[#181818] rounded-lg overflow-hidden shadow-2xl border border-white/10"
            style={{ width: "100%" }}
          >
            {/* Card Graphic/Video */}
            <div className="relative aspect-video w-full">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover select-none pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
              <div className="absolute top-2 right-2 px-2 py-0.5 text-[9px] bg-black/60 font-bold border border-white/20 rounded uppercase text-white tracking-widest">
                {project.rating}
              </div>
            </div>

            {/* Hover Actions & Info Area */}
            <div className="p-4 flex flex-col space-y-3">
              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePlayClick}
                    className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-white/80 transition-colors cursor-pointer"
                    title="Play Preview"
                  >
                    <Play size={14} className="fill-current text-black translate-x-[1px]" />
                  </button>
                  <button
                    onClick={handleListToggle}
                    className={`w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center hover:border-white transition-colors cursor-pointer ${
                      heroProject?.id === project.id ? "bg-[#e50914] border-transparent text-white" : "text-white"
                    }`}
                    title={heroProject?.id === project.id ? "Featured in Hero" : "Feature in Hero"}
                  >
                    {heroProject?.id === project.id ? <Check size={14} /> : <Plus size={14} />}
                  </button>
                </div>

                <button
                  onClick={handleCardClick}
                  className="w-8 h-8 rounded-full border border-gray-400 text-white flex items-center justify-center hover:border-white transition-colors cursor-pointer"
                  title="More Information"
                >
                  <ChevronDown size={14} />
                </button>
              </div>

              {/* Title & Metadata indicators */}
              <div>
                <h4 className="text-white text-sm font-bold">{project.title}</h4>
                <div className="flex items-center space-x-2 text-[10px] sm:text-xs font-semibold mt-1">
                  <span className="text-emerald-400">{project.matchPercentage}% Match</span>
                  <span className="text-gray-300">{project.year}</span>
                  <span className="text-gray-400 font-normal">{project.duration}</span>
                </div>
              </div>

              {/* Tech Tags list */}
              <div className="flex flex-wrap gap-1">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] px-1.5 py-0.5 bg-white/10 text-gray-300 rounded font-medium"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="text-[9px] text-gray-400 font-bold self-center pl-1">
                    +{project.tags.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
