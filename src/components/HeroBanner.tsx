"use client";

import React, { useState, useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";
import { Play, Info, Volume2, VolumeX } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";

// Helper component for magnetic pull effect
const MagneticWrapper = ({ children }: { children: React.ReactNode }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    // Pull factor (damped)
    setPosition({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};

export default function HeroBanner() {
  const { heroProject, openDetailModal, soundEnabled, setSoundEnabled } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [typewrittenText, setTypewrittenText] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  // Spotlight coordinates
  const spotlightX = useMotionValue(-500);
  const spotlightY = useMotionValue(-500);
  const spotlightXSpring = useSpring(spotlightX, { damping: 40, stiffness: 200 });
  const spotlightYSpring = useSpring(spotlightY, { damping: 40, stiffness: 200 });

  const spotlightXStyle = useTransform(spotlightXSpring, (val) => `${val}px`);
  const spotlightYStyle = useTransform(spotlightYSpring, (val) => `${val}px`);
  const spotlightBackground = useMotionTemplate`radial-gradient(400px circle at ${spotlightXStyle} ${spotlightYStyle}, rgba(124, 58, 237, 0.15) 0%, rgba(229, 9, 20, 0.06) 50%, transparent 100%)`;

  // Play video with delay when heroProject changes
  useEffect(() => {
    setIsPlaying(false);
    setVideoLoaded(false);
    
    const timer = setTimeout(() => {
      setIsPlaying(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [heroProject]);

  // Set typewriter subtitle effect
  useEffect(() => {
    if (!heroProject) return;
    
    setTypewrittenText("");
    const text = heroProject.subtitle;
    let idx = 0;
    
    const interval = setInterval(() => {
      if (idx < text.length) {
        setTypewrittenText((prev) => prev + text.charAt(idx));
        idx++;
      } else {
        clearInterval(interval);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [heroProject]);

  // Handle sound settings on video element
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !soundEnabled;
    }
  }, [soundEnabled]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!bannerRef.current) return;
    const { clientX, clientY } = e;
    const { left, top } = bannerRef.current.getBoundingClientRect();
    spotlightX.set(clientX - left);
    spotlightY.set(clientY - top);
  };

  if (!heroProject) return null;

  // Split title into separate words for entrance reveals
  const titleWords = heroProject.title.split(" ");

  // Floating technology symbols coordinate arrays
  const floatingSymbols = [
    { text: "Python", x: "12%", y: "25%", delay: 0 },
    { text: "React", x: "85%", y: "30%", delay: 1.5 },
    { text: "Flask", x: "70%", y: "15%", delay: 0.8 },
    { text: "Docker", x: "20%", y: "65%", delay: 2.2 },
    { text: "SQL", x: "80%", y: "60%", delay: 1.1 },
  ];

  return (
    <section
      ref={bannerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[75vh] sm:h-[85vh] md:h-[95vh] flex items-center bg-[#0b0b0f] overflow-hidden select-none"
    >
      {/* Background Media Container */}
      <div className="absolute inset-0 w-full h-full z-0 bg-neutral-950">
        {isPlaying && heroProject.videoUrl ? (
          <video
            ref={videoRef}
            src={heroProject.videoUrl}
            autoPlay
            loop
            playsInline
            muted={!soundEnabled}
            onLoadedData={() => setVideoLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              videoLoaded ? "opacity-55" : "opacity-0"
            }`}
          />
        ) : (
          <motion.div
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 5 }}
            className="w-full h-full"
          >
            <img
              src={heroProject.imageUrl}
              alt={heroProject.title}
              className="w-full h-full object-cover opacity-35 filter brightness-75"
            />
          </motion.div>
        )}

        {/* 3D Floating Tech symbols */}
        {floatingSymbols.map((sym, idx) => (
          <motion.div
            key={idx}
            style={{ left: sym.x, top: sym.y }}
            initial={{ y: 0 }}
            animate={{ 
              y: [-15, 15, -15],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              delay: sym.delay,
              ease: "easeInOut" 
            }}
            className="hidden sm:block absolute z-20 text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-white/50 backdrop-blur-sm pointer-events-none"
          >
            {sym.text}
          </motion.div>
        ))}

        {/* Interactive Mouse spotlight overlay */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none mix-blend-screen opacity-45"
          style={{
            background: spotlightBackground,
          }}
        />

        {/* Cinematic Vignettes */}
        <div className="absolute inset-0 z-10 pointer-events-none vignette-left" />
        <div className="absolute inset-0 z-10 pointer-events-none vignette-bottom" />
        <div className="absolute inset-0 z-10 pointer-events-none vignette-top" />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-12 sm:mt-20">
        <div className="max-w-xl md:max-w-2xl flex flex-col space-y-5">
          {/* Netflix Originals Label */}
          <div className="flex items-center space-x-2">
            <span className="text-[#e50914] font-black text-lg tracking-tighter shadow-sm">I</span>
            <span className="text-gray-300 text-xs sm:text-sm font-extrabold uppercase tracking-[0.3em]">
              Original Project
            </span>
          </div>

          {/* Project Title: Word-by-Word revealing animations */}
          <motion.div
            key={heroProject.id}
            className="flex flex-wrap gap-x-3 text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight drop-shadow-xl"
          >
            {titleWords.map((word, wordIdx) => (
              <motion.span
                key={wordIdx}
                initial={{ opacity: 0, y: 35, rotate: 3 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  rotate: 0,
                  transition: {
                    duration: 0.6,
                    delay: wordIdx * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  }
                }}
                className="inline-block bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent"
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          {/* Project Meta Info */}
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold">
            <span className="text-emerald-400 font-bold tracking-wide">
              {heroProject.matchPercentage}% Match
            </span>
            <span className="text-gray-300">{heroProject.year}</span>
            <span className="px-1.5 py-0.5 text-[10px] font-bold border border-gray-400 rounded text-gray-300 tracking-wider">
              {heroProject.rating}
            </span>
            <span className="text-gray-300">{heroProject.duration}</span>
            <span className="px-2.5 py-0.5 text-[10px] bg-white/10 text-white rounded-full font-bold">
              {heroProject.category}
            </span>
          </div>

          {/* Project Subtitle (Typewriter) & Description */}
          <div className="space-y-2">
            <div className="text-netflixRed font-bold text-sm sm:text-base md:text-lg tracking-wide min-h-[24px]">
              {typewrittenText}
              <span className="animate-pulse inline-block w-1.5 h-4 bg-netflixRed ml-0.5" />
            </div>
            <motion.p
              key={heroProject.id + "-desc"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-300 text-sm sm:text-base leading-relaxed drop-shadow-md"
            >
              {heroProject.description}
            </motion.p>
          </div>

          {/* CTAs with Magnetic triggers */}
          <div className="flex items-center space-x-4 pt-3">
            <MagneticWrapper>
              <button
                onClick={() => openDetailModal(heroProject)}
                className="flex items-center space-x-2 bg-white text-black hover:bg-white/85 transition-colors duration-200 px-5 sm:px-7 py-2.5 rounded font-bold text-sm sm:text-base shadow-lg cursor-pointer"
              >
                <Play size={18} className="fill-current text-black" />
                <span>Explore</span>
              </button>
            </MagneticWrapper>

            <MagneticWrapper>
              <button
                onClick={() => openDetailModal(heroProject)}
                className="flex items-center space-x-2 bg-gray-500/20 hover:bg-gray-500/35 text-white border border-white/10 transition-colors duration-200 px-5 sm:px-7 py-2.5 rounded font-bold text-sm sm:text-base backdrop-blur-md shadow-lg cursor-pointer"
              >
                <Info size={18} />
                <span>More Info</span>
              </button>
            </MagneticWrapper>
          </div>
        </div>
      </div>

      {/* Floating Control Badges on the Right */}
      <div className="absolute right-0 bottom-16 sm:bottom-24 z-20 flex items-center space-x-4 pr-4 sm:pr-8">
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="w-10 h-10 rounded-full border border-gray-500/30 bg-black/45 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/60 transition-colors backdrop-blur-md cursor-pointer"
        >
          {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
        
        <div className="border-l-4 border-gray-400 bg-black/40 px-4 py-1.5 backdrop-blur-md text-xs sm:text-sm text-gray-300 font-extrabold uppercase tracking-wider select-none">
          {heroProject.rating}
        </div>
      </div>
    </section>
  );
}
