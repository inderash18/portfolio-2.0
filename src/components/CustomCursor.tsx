"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Motion values for smooth spring physics
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 280, mass: 0.6 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device is mobile/touch-enabled
    const checkDevice = () => {
      const mobile = window.matchMedia("(max-width: 768px)").matches || 
                     ("ontouchstart" in window) || 
                     (navigator.maxTouchPoints > 0);
      setIsMobile(mobile);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    if (isMobile) return;

    // Apply global stylesheet rule to hide system cursor on desktop
    const style = document.createElement("style");
    style.id = "hide-system-cursor";
    style.innerHTML = "body, a, button, [role='button'], select, input, textarea { cursor: none !important; }";
    document.head.appendChild(style);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Global Hover Delegation listener
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive = 
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "SELECT" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest(".cursor-pointer") ||
        target.closest(".group"); // Netflix cards use .group trigger

      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("resize", checkDevice);

      const styleNode = document.getElementById("hide-system-cursor");
      if (styleNode) document.head.removeChild(styleNode);
    };
  }, [cursorX, cursorY, isVisible, isMobile]);

  if (isMobile || !isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none select-none">
      {/* 1. Large glow aura tracking with spring inertia */}
      <motion.div
        className="absolute w-10 h-10 rounded-full border border-netflixRed bg-netflixRed/5 mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.75 : isHovered ? 1.6 : 1.0,
          borderColor: isHovered ? "#7c3aed" : "#e50914", // Swaps red to purple on hover
          backgroundColor: isHovered ? "rgba(124, 58, 237, 0.15)" : "rgba(229, 9, 20, 0.05)",
          boxShadow: isHovered 
            ? "0 0 20px rgba(124, 58, 237, 0.4)" 
            : "0 0 10px rgba(229, 9, 20, 0.2)",
        }}
        transition={{ duration: 0.15 }}
      />

      {/* 2. Fast core dot tracking raw coordinates */}
      <motion.div
        className="absolute w-2.5 h-2.5 bg-netflixRed rounded-full shadow-[0_0_8px_rgba(229,9,20,0.8)]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 1.3 : isHovered ? 0.5 : 1.0,
          backgroundColor: isHovered ? "#ffffff" : "#e50914",
        }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
}
