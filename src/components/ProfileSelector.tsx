"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp, UserProfile } from "@/context/AppContext";
import { Plus } from "lucide-react";
import Image from "next/image";

interface ProfileItem {
  id: Exclude<UserProfile, null>;
  name: string;
  image: string;
}

export default function ProfileSelector() {
  const { setProfile } = useApp();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const profiles: ProfileItem[] = [
    {
      id: "recruiter",
      name: "Recruiter",
      image: "/avatars/first.webp",
    },
    {
      id: "developer",
      name: "Developer",
      image: "/avatars/hacker.jpg",
    },
    {
      id: "ai-engineer",
      name: "AI Engineer",
      image: "/avatars/ai.jpg",
    },
  ];

  const [manageMode, setManageMode] = useState(false);

  const handleProfileSelect = (id: Exclude<UserProfile, null>) => {
    if (manageMode) return; // Don't select if we're just managing

    // Play a quick subtle pop sound
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        const ctx = new AudioContextClass();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.15);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(now + 0.15);
      }
    } catch {}

    setSelectedId(id);

    // Wait for the zoom-in animation to finish before updating global state
    setTimeout(() => {
      setProfile(id);
    }, 800); // 800ms gives time for the morph animation
  };

  return (
    <div className="fixed inset-0 w-full h-full flex flex-col items-center justify-center bg-[#141414] text-white z-50 overflow-hidden">
      
      {/* ── Background overlay during transition ── */}
      <AnimatePresence>
        {selectedId && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-black z-10"
          />
        )}
      </AnimatePresence>

      <motion.div
        animate={{ opacity: selectedId ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-20 flex flex-col items-center"
      >
        <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-medium tracking-wide mb-8 sm:mb-12">
          {manageMode ? "Manage Profiles:" : "Who's watching?"}
        </h1>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 max-w-5xl px-4">
          
          {/* Main Profiles */}
          {profiles.map((profile) => {
            const isSelected = selectedId === profile.id;
            
            return (
              <motion.div
                key={profile.id}
                onClick={() => !selectedId && handleProfileSelect(profile.id)}
                className={`flex flex-col items-center cursor-pointer group ${selectedId && !isSelected ? 'pointer-events-none' : ''}`}
                animate={{
                  opacity: selectedId && !isSelected ? 0 : 1,
                  scale: isSelected ? 8 : 1, // Massive scale-up for the transition
                  zIndex: isSelected ? 50 : 1,
                  filter: isSelected ? "blur(4px)" : "blur(0px)",
                }}
                transition={{ duration: isSelected ? 0.8 : 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Avatar Tile (Netflix Style) */}
                <div className="w-[10vw] min-w-[100px] max-w-[200px] aspect-square rounded-[4px] overflow-hidden border-4 border-transparent group-hover:border-white transition-colors duration-200 relative">
                  <Image
                    src={profile.image}
                    alt={profile.name}
                    fill
                    sizes="(max-width: 768px) 100px, 200px"
                    className={`object-cover ${manageMode ? "opacity-50" : ""}`}
                  />
                  {/* Subtle overlay when NOT hovered (Netflix dims inactive profiles slightly) */}
                  {!manageMode && <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-200" />}
                  
                  {/* Manage mode edit icon */}
                  {manageMode && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center bg-black/40">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                          <path d="M12 20h9"></path>
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile Name */}
                <span className={`mt-4 text-sm sm:text-lg md:text-xl font-medium transition-colors duration-200 ${manageMode ? "text-white" : "text-[#808080] group-hover:text-white"}`}>
                  {profile.name}
                </span>
              </motion.div>
            );
          })}

          {/* Add Profile Button */}
          <motion.div
            onClick={() => !selectedId && handleProfileSelect("guest")}
            animate={{ opacity: selectedId ? 0 : 1 }}
            className="flex flex-col items-center cursor-pointer group"
          >
            <div className="w-[10vw] min-w-[100px] max-w-[200px] aspect-square rounded-[4px] border-4 border-transparent group-hover:bg-white group-hover:border-white transition-colors duration-200 flex items-center justify-center">
              <Plus className="w-16 h-16 text-[#808080] group-hover:text-black transition-colors duration-200" />
            </div>
            <span className="mt-4 text-[#808080] text-sm sm:text-lg md:text-xl font-medium group-hover:text-white transition-colors duration-200">
              Add Profile
            </span>
          </motion.div>

        </div>

        {/* Manage Profiles Button */}
        <button 
          onClick={() => setManageMode(!manageMode)}
          className={`mt-16 sm:mt-24 px-6 sm:px-8 py-2 sm:py-3 border hover:border-white hover:text-white transition-colors duration-200 uppercase tracking-widest text-xs sm:text-base font-medium ${manageMode ? "bg-white text-black border-white hover:bg-white/80 hover:text-black" : "border-[#808080] text-[#808080]"}`}
        >
          {manageMode ? "Done" : "Manage Profiles"}
        </button>
      </motion.div>
    </div>
  );
}
