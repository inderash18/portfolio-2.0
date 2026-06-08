"use client";

import React, { useRef, useState, useEffect } from "react";
import { Project } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectRowProps {
  title: string;
  projects: Project[];
}

export default function ProjectRow({ title, projects }: ProjectRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScrollPosition = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 5);
      // Allow a tiny buffer for floating-point calculations
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    const row = rowRef.current;
    if (row) {
      row.addEventListener("scroll", checkScrollPosition);
      // Initial check
      checkScrollPosition();
      // Handle resize recalculations
      window.addEventListener("resize", checkScrollPosition);
    }
    return () => {
      if (row) row.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, [projects]);

  const handleScroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { clientWidth } = rowRef.current;
      // Scroll by 75% of the row width
      const scrollOffset = direction === "left" ? -clientWidth * 0.75 : clientWidth * 0.75;
      
      rowRef.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  if (projects.length === 0) return null;

  return (
    <div className="relative flex flex-col space-y-2 py-4 select-none group/row">
      {/* Row Category Title */}
      <h2 className="text-white text-base sm:text-lg md:text-xl font-bold px-4 sm:px-6 lg:px-8 tracking-wide transition-colors duration-300 hover:text-netflixRed cursor-pointer inline-flex items-center space-x-1">
        <span>{title}</span>
        <span className="text-[10px] text-netflixRed opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 font-black ml-1 select-none">
          Explore All &rsaquo;
        </span>
      </h2>

      {/* Row Slider Track */}
      <div className="relative w-full">
        {/* Left Pagination Control */}
        {showLeftArrow && (
          <button
            onClick={() => handleScroll("left")}
            className="absolute left-0 top-0 bottom-0 w-10 sm:w-12 bg-black/50 hover:bg-black/80 flex items-center justify-center text-white z-30 transition-all duration-300 border-r border-white/5 opacity-0 group-hover/row:opacity-100"
          >
            <ChevronLeft size={30} className="hover:scale-125 transition-transform" />
          </button>
        )}

        {/* Right Pagination Control */}
        {showRightArrow && (
          <button
            onClick={() => handleScroll("right")}
            className="absolute right-0 top-0 bottom-0 w-10 sm:w-12 bg-black/50 hover:bg-black/80 flex items-center justify-center text-white z-30 transition-all duration-300 border-l border-white/5 opacity-0 group-hover/row:opacity-100"
          >
            <ChevronRight size={30} className="hover:scale-125 transition-transform" />
          </button>
        )}

        {/* Scroller Area */}
        <div
          ref={rowRef}
          className="flex items-center space-x-15 sm:space-x-10 overflow-x-auto overflow-y-visible py-2 px-4 sm:px-6 lg:px-8 scroll-smooth no-scrollbar netflix-scrollbar"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
