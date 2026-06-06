"use client";

import React, { useState, useEffect, useRef } from "react";

interface SplashIntroProps {
  onComplete: () => void;
}

/* ── Fur strands: [left, width, solidEnd, fadeEnd] ── */
const FURS = [
  ["0%","3.8%","15%","81%"],["3.8%","2.8%","10%","62%"],
  ["6.6%","4.8%","37%","100%"],["11.4%","4%","23%","100%"],
  ["15.4%","4%","15%","86%"],["19.4%","2.5%","27%","89%"],
  ["21.9%","4%","20%","100%"],["25.9%","2%","30%","100%"],
  ["27.9%","4%","35%","95%"],["31.9%","3.5%","39%","95%"],
  ["35.4%","2%","34%","95%"],["37.4%","2.6%","22%","95%"],
  ["40%","6%","47%","100%"],["46%","2%","36%","100%"],
  ["48%","5.5%","29%","100%"],["53.5%","3%","39%","95%"],
  ["56.5%","4.1%","45%","100%"],["60.6%","2.4%","34%","100%"],
  ["63%","4%","47%","100%"],["67%","1.5%","27%","95%"],
  ["68.5%","2.8%","37%","100%"],["71.3%","2.3%","9%","100%"],
  ["73.6%","2.2%","28%","92%"],["75.8%","1%","37%","100%"],
  ["76.8%","2.1%","28%","100%"],["78.9%","4.1%","34%","100%"],
  ["83%","2.5%","21%","100%"],["85.5%","4.5%","39%","100%"],
  ["90%","2.8%","30%","100%"],["92.8%","3.5%","19%","100%"],
  ["96.3%","3.7%","37%","100%"],
];

/* ── Lamps: [color, left, width, delaySec, dir L|R] ── */
const LAMPS = [
  ["#ff0100","0.7%","1%","0.42","L"],["#ffde01","2.2%","1.4%","1.14","R"],
  ["#ff00cc","5.8%","2.1%","0.67","L"],["#04fd8f","10.1%","2%","1.52","R"],
  ["#ff0100","12.9%","1.4%","0.83","L"],["#ff9600","15.3%","2.8%","1.31","R"],
  ["#0084ff","21.2%","2.5%","0.24","L"],["#f84006","25%","2.5%","1.06","R"],
  ["#ffc601","30.5%","3%","0.49","L"],["#ff4800","36.3%","3%","1.58","R"],
  ["#fd0100","41%","2.2%","0.76","L"],["#01ffff","44.2%","2.6%","1.41","R"],
  ["#ffc601","51.7%","0.5%","0.21","L"],["#ffc601","52.1%","1.8%","0.56","R"],
  ["#0078fe","53.8%","2.3%","1.17","L"],["#0080ff","57.2%","2%","0.79","R"],
  ["#ffae01","62.3%","2.9%","1.48","L"],["#ff00bf","65.8%","1.7%","0.28","R"],
  ["#a601f4","72.8%","0.8%","1.03","L"],["#f30b34","74.3%","2%","0.54","R"],
  ["#ff00bf","79.8%","2%","1.26","L"],["#04fd8f","78.2%","2%","0.38","R"],
  ["#01ffff","78.5%","2%","0.91","L"],["#a201ff","85.3%","1.1%","1.33","R"],
  ["#ec0014","86.9%","1.1%","0.72","L"],["#0078fe","88.8%","2%","1.44","R"],
  ["#ff0036","92.4%","2.4%","0.47","L"],["#06f98c","96.2%","2.1%","1.08","R"],
];

type Stage = "full" | "split" | "swoop" | "fadeout";

export default function SplashIntro({ onComplete }: SplashIntroProps) {
  const [stage, setStage] = useState<Stage>("full");
  const [hasStarted, setHasStarted] = useState(false);
  const timeoutsRef = useRef<any[]>([]);

  /* Inject all keyframes into <head> once */
  useEffect(() => {
    const tag = document.createElement("style");
    tag.id = "si-keyframes";
    tag.textContent = [
      "@keyframes si-fadein{from{opacity:0}to{opacity:1}}",
      "@keyframes si-fadeout{from{opacity:0}to{opacity:1}}",
      "@keyframes si-nout{0%{opacity:1;transform:translateX(0)}100%{opacity:0;transform:translateX(90px)}}",
      "@keyframes si-brush{0%{transform:translateY(0%)}100%{transform:translateY(-67%)}}",
      "@keyframes si-zoom{0%{transform:scale(1)}100%{transform:scale(25)}}",
      "@keyframes si-lum{0%{opacity:0}100%{opacity:1}}",
      "@keyframes si-ll{0%{transform:translateX(0) scaleX(1)}100%{transform:translateX(130px) scaleX(3)}}",
      "@keyframes si-lr{0%{transform:translateX(0) scaleX(1)}100%{transform:translateX(-130px) scaleX(3)}}",
      "@keyframes si-pulse{from{opacity:0.35}to{opacity:0.95}}",
    ].join("");
    document.head.appendChild(tag);
    
    return () => {
      if (document.getElementById("si-keyframes")) {
        document.head.removeChild(document.getElementById("si-keyframes")!);
      }
    };
  }, []);

  /* Play custom intro sound */
  const playAudio = () => {
    try {
      const audio = new Audio("/intro.mp3");
      audio.volume = 0.72;
      audio.play();
    } catch (_) { /* ignore */ }
  };


  /* Clean up timeouts on unmount */
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  const handleStart = () => {
    if (hasStarted) return;
    
    // Synchronously unlock browser audio context on user gesture
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        ctx.resume();
      }
    } catch (_) {}

    setHasStarted(true);
    
    // Play intro sound after 2 seconds
    const tAudio = setTimeout(() => {
      playAudio();
    }, 2300);
    
    // Phase 2: NDERASH fades out (I stays)
    const t1 = setTimeout(() => setStage("split"), 1700);
    // Phase 3: I bar brush + zoom
    const t2 = setTimeout(() => setStage("swoop"), 2700);
    // Phase 4: fade to black
    const t3 = setTimeout(() => setStage("fadeout"), 6000);
    // Done
    const t4 = setTimeout(() => onComplete(), 6800);

    timeoutsRef.current = [tAudio, t1, t2, t3, t4];
  };

  // Shared font size — scales with viewport, max 130px
  const fs = "clamp(48px, 10vw, 130px)";
  const fontStyle: React.CSSProperties = {
    fontFamily: "Impact, Arial, sans-serif",
    fontSize: fs,
    fontWeight: 900,
    color: "#e50914",
    lineHeight: 1,
    letterSpacing: "0.03em",
    textShadow: "0 0 30px rgba(229,9,20,0.5), 0 0 80px rgba(229,9,20,0.2)",
    whiteSpace: "nowrap",
  };

  if (!hasStarted) {
    return (
      <div 
        onClick={handleStart}
        style={{
          position: "fixed", inset: 0, zIndex: 9999,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          background: "#000", cursor: "pointer",
          userSelect: "none",
        }}
      >
        <div style={{ ...fontStyle, marginBottom: 20, animation: "si-fadein 1.2s ease-out forwards" }}>
          INDERASH
        </div>
        <div style={{
          color: "#fff",
          fontSize: "clamp(12px, 2.5vw, 16px)",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          opacity: 0.6,
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontWeight: 500,
          animation: "si-pulse 1.4s infinite alternate ease-in-out",
        }}>
          <span style={{ color: "#e50914", fontSize: "1.2em" }}>▶</span> Click to Enter Cinematic Portfolio
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "#000", overflow: "hidden",
    }}>
      {/* ════════════════ PHASE 1: Full INDERASH ════════════════ */}
      {stage === "full" && (
        <div style={{ ...fontStyle, animation: "si-fadein 0.65s ease-out forwards" }}>
          INDERASH
        </div>
      )}

      {/* ════════════════ PHASE 2: NDERASH fades out ════════════════ */}
      {stage === "split" && (
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* I stays */}
          <span style={{ ...fontStyle }}>I</span>
          {/* NDERASH animates out */}
          <span style={{
            ...fontStyle,
            animation: "si-nout 0.75s ease-in forwards",
          }}>
            NDERASH
          </span>
        </div>
      )}

      {/* ════════════════ PHASE 3: I bar brush + zoom ════════════════ */}
      {stage === "swoop" && (
        <div style={{
          position: "relative", width: 300, height: 300,
          animation: "si-fadein 0.2s forwards",
        }}>
          {/* The I-bar — zooms through camera */}
          <div style={{
            position: "absolute", width: 300, height: 300,
            overflow: "hidden", zIndex: 10,
            transformOrigin: "48.5% 50%",
            animation: "si-zoom 3.5s 0s ease-in forwards",
          }}>
            {/* I-bar column */}
            <div style={{
              position: "absolute", left: "38%", top: 0,
              width: "19.5%", height: "100%",
              background: "rgba(228,9,19,0.45)",
              transform: "rotate(180deg)",
              animation: "si-lum 0.4s 0s forwards",
              opacity: 0,
            }}>
              {/* Brush sweep */}
              <div style={{
                position: "absolute", width: "100%", height: "300%",
                top: 0, overflow: "hidden",
                animation: "si-brush 2.2s 0s ease-in-out forwards",
              }}>
                <div style={{
                  position: "absolute", width: "100%", height: "70%",
                  background: "#e40913",
                  boxShadow: "0 0 29px 24px #e40913",
                }} />
                {FURS.map((f, i) => (
                  <span key={i} style={{
                    display: "block", position: "absolute",
                    left: f[0], width: f[1], bottom: 0, height: "40%",
                    background: "linear-gradient(to bottom, #e40913 0%, #e40913 " + f[2] + ", transparent " + f[3] + ", transparent 100%)",
                  }} />
                ))}
              </div>
              {/* Spectrum lights */}
              <div style={{
                position: "absolute", width: "100%", height: "100%",
                opacity: 0, animation: "si-lum 1.2s 0.8s forwards",
              }}>
                {LAMPS.map((lp, i) => (
                  <span key={i} style={{
                    display: "block", position: "absolute",
                    left: lp[1], width: lp[2], height: "100%",
                    background: lp[0],
                    boxShadow: "0 0 10px rgba(228,9,19,0.7)",
                    animationName: lp[4] === "L" ? "si-ll" : "si-lr",
                    animationDuration: "5s",
                    animationDelay: lp[3] + "s",
                    animationFillMode: "forwards",
                    animationTimingFunction: "ease-in-out",
                  }} />
                ))}
              </div>
            </div>
            {/* Bottom shadow ellipse */}
            <div style={{
              position: "absolute", width: "150%", height: "30%",
              left: "-25%", bottom: "-27%",
              background: "#000", borderRadius: "50%", zIndex: 5,
            }} />
          </div>
        </div>
      )}

      {/* ════════════════ FADE TO BLACK ════════════════ */}
      {stage === "fadeout" && (
        <div style={{
          position: "fixed", inset: 0, background: "#000", zIndex: 99999,
          opacity: 0, animation: "si-fadeout 0.8s ease-in forwards",
          pointerEvents: "none",
        }} />
      )}
    </div>
  );
}
