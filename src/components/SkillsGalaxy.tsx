"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface SkillPlanet {
  name: string;
  category: string;
  description: string;
  radius: number; // Orbit radius
  speed: number;  // Orbit velocity
  angle: number;  // Initial angle
  yOffset: number; // Tilt offset
  color: string;  // Hex color
  glowColor: string;
}

export default function SkillsGalaxy() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activePlanet, setActivePlanet] = useState<SkillPlanet | null>(null);
  
  // Ref to track hover state in the animation loop without rebuilding the WebGL scene
  const activePlanetRef = useRef<SkillPlanet | null>(null);

  const planetsData: SkillPlanet[] = [
    { name: "Python", category: "Backend & ML", description: "AI TF-IDF NLP microservices, computer vision hashing, and data analysis pipelines.", radius: 45, speed: 0.012, angle: 0, yOffset: -10, color: "#306998", glowColor: "rgba(48, 105, 152, 0.4)" },
    { name: "TypeScript", category: "Languages", description: "Production-ready scalable code architectures and robust type declarations.", radius: 65, speed: 0.008, angle: 1.2, yOffset: 15, color: "#3178c6", glowColor: "rgba(49, 120, 198, 0.4)" },
    { name: "React / Next.js", category: "Frontend", description: "Cinematic, high-fidelity user experiences and SSG pages static generation.", radius: 85, speed: 0.006, angle: 2.5, yOffset: -5, color: "#61dbfb", glowColor: "rgba(97, 219, 251, 0.4)" },
    { name: "Flask", category: "Backend", description: "API Gateways, WebSockets coordination networks, and REST microservices.", radius: 105, speed: 0.005, angle: 3.8, yOffset: 20, color: "#ffffff", glowColor: "rgba(255, 255, 255, 0.4)" },
    { name: "Neo4j", category: "Databases", description: "Knowledge Graphs linking complex relational campus regulatory data.", radius: 125, speed: 0.004, angle: 4.5, yOffset: -25, color: "#008cc1", glowColor: "rgba(0, 140, 193, 0.4)" },
    { name: "MySQL", category: "Databases", description: "Transactional SQL schemas, connection pools, and row locking integrity.", radius: 145, speed: 0.003, angle: 5.2, yOffset: 10, color: "#00758f", glowColor: "rgba(0, 117, 143, 0.4)" },
    { name: "Docker", category: "DevOps", description: "Containerized deployment clusters, virtual machines, and Gunicorn hooks.", radius: 165, speed: 0.002, angle: 5.9, yOffset: 0, color: "#2496ed", glowColor: "rgba(36, 150, 237, 0.4)" },
  ];

  const [planets, setPlanets] = useState<SkillPlanet[]>(planetsData);
  const [positions, setPositions] = useState<{ x: number; y: number; z: number; scale: number }[]>([]);

  // Update activePlanetRef when state changes
  useEffect(() => {
    activePlanetRef.current = activePlanet;
  }, [activePlanet]);

  useEffect(() => {
    if (!mountRef.current) return;

    const mount = mountRef.current;
    let width = mount.clientWidth;
    let height = mount.clientHeight;

    const isMobile = window.matchMedia("(max-width: 768px)").matches || 
                     ("ontouchstart" in window) || 
                     (navigator.maxTouchPoints > 0);

    // 1. WebGL Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 80, 280);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // 2. Central Glowing Core (AI Neural Center)
    const coreGeo = new THREE.SphereGeometry(18, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xe50914, // Netflix Red core
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    const innerCoreGeo = new THREE.SphereGeometry(12, 16, 16);
    const innerCoreMat = new THREE.MeshBasicMaterial({ color: 0x7c3aed });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    scene.add(innerCoreMesh);

    // 3. Orbit Path Rings (visual guidelines)
    const orbitGroup = new THREE.Group();
    planetsData.forEach((planet) => {
      const curve = new THREE.EllipseCurve(
        0, 0,
        planet.radius, planet.radius * 0.4,
        0, 2 * Math.PI,
        false, 0
      );

      const points = curve.getPoints(64);
      const geometry = new THREE.BufferGeometry().setFromPoints(
        points.map(p => new THREE.Vector3(p.x, 0, p.y))
      );

      const material = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.08,
      });

      const line = new THREE.Line(geometry, material);
      line.rotation.x = planet.yOffset * (Math.PI / 180);
      orbitGroup.add(line);
    });
    scene.add(orbitGroup);

    // Track angles locally in the loop to avoid recreating the effect
    const currentAngles = planetsData.map(p => p.angle);

    // 4. Projection Loop (Single Instance execution)
    let animFrameId: number;

    const projAnimate = () => {
      animFrameId = requestAnimationFrame(projAnimate);

      // Rotate central AI core mesh
      coreMesh.rotation.y += 0.012;
      coreMesh.rotation.x += 0.007;
      innerCoreMesh.rotation.y -= 0.008;

      // Project orbiting coordinates
      const newPositions = planetsData.map((p, idx) => {
        // Read active hovered planet from mutable React Ref
        const isHovered = activePlanetRef.current?.name === p.name;
        const speed = isHovered ? p.speed * 0.15 : p.speed;

        currentAngles[idx] += speed;

        const rx = Math.cos(currentAngles[idx]) * p.radius;
        const rz = Math.sin(currentAngles[idx]) * p.radius * 0.4;
        
        const vec = new THREE.Vector3(rx, 0, rz);
        const tiltRad = p.yOffset * (Math.PI / 180);
        
        vec.y = Math.sin(tiltRad) * rx;
        vec.x = Math.cos(tiltRad) * rx;

        // project to screen coordinates
        const tempV = vec.clone();
        tempV.project(camera);

        const screenX = (tempV.x * 0.5 + 0.5) * width;
        const screenY = (-(tempV.y) * 0.5 + 0.5) * height;

        const scale = 1.0 - (vec.z / 200);

        return {
          x: screenX,
          y: screenY,
          z: vec.z,
          scale: Math.max(0.65, Math.min(scale, 1.35)),
        };
      });

      setPositions(newPositions);
      renderer.render(scene, camera);
    };

    projAnimate();

    // 5. Handling Resize events
    const handleResize = () => {
      width = mount.clientWidth;
      height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animFrameId);
      
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      innerCoreGeo.dispose();
      innerCoreMat.dispose();
      
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []); // Empty dependencies array prevents WebGL scene rebuilds on state swaps!

  return (
    <div className="relative w-full h-[500px] sm:h-[600px] bg-black/40 border border-white/5 rounded-xl overflow-hidden glass-card shadow-2xl flex items-center justify-center select-none">
      
      {/* 3D WebGL Canvas Layer */}
      <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Orbiting HTML Planet Nodes */}
      {positions.length > 0 &&
        planets.map((planet, idx) => {
          const pos = positions[idx];
          if (!pos) return null;

          const isHovered = activePlanet?.name === planet.name;

          return (
            <button
              key={planet.name}
              onMouseEnter={() => setActivePlanet(planet)}
              onMouseLeave={() => setActivePlanet(null)}
              className="absolute z-20 focus:outline-none -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{
                left: `${pos.x}px`,
                top: `${pos.y}px`,
                transform: `translate3d(-50%, -50%, 0) scale(${pos.scale})`,
                zIndex: pos.z > 0 ? 10 : 30, // Map Z-index to render nodes behind/front of the Core
              }}
            >
              <div className="flex flex-col items-center space-y-2">
                <div
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: planet.color,
                    boxShadow: isHovered 
                      ? `0 0 25px ${planet.color}, inset 0 0 8px rgba(255,255,255,0.6)` 
                      : `0 0 10px ${planet.color}`,
                    transform: isHovered ? "scale(1.2)" : "scale(1)",
                  }}
                />
                
                <span
                  className={`px-2 py-0.5 rounded text-[10px] sm:text-xs font-bold border tracking-wider transition-all duration-300 ${
                    isHovered 
                      ? "bg-white text-black border-white shadow-lg scale-105" 
                      : "bg-black/75 text-gray-300 border-white/10"
                  }`}
                >
                  {planet.name}
                </span>
              </div>
            </button>
          );
        })}

      {/* Center core text identifier */}
      <div className="absolute z-10 pointer-events-none text-center">
        <h4 className="text-netflixRed text-[10px] font-black uppercase tracking-[0.3em] text-glow">Core center</h4>
        <h3 className="text-white text-base sm:text-lg font-black tracking-widest mt-0.5">AI CORE</h3>
      </div>

      {/* Dynamic Skill Details Sidebar console */}
      <div className="absolute bottom-5 left-5 right-5 sm:left-auto sm:right-5 sm:w-80 z-30 bg-black/85 border border-white/10 rounded-lg p-4 backdrop-blur-md transition-all duration-300 min-h-[120px] flex flex-col justify-center">
        {activePlanet ? (
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-extrabold text-white">{activePlanet.name}</span>
              <span className="text-[9px] px-2 py-0.5 bg-netflixRed rounded font-bold uppercase tracking-widest text-white">
                {activePlanet.category}
              </span>
            </div>
            <p className="text-gray-300 text-xs leading-relaxed pt-1.5">
              {activePlanet.description}
            </p>
          </div>
        ) : (
          <div className="text-center text-gray-500 text-xs">
            Hover over an orbiting skill planet to interrogate the tech stack nodes.
          </div>
        )}
      </div>

    </div>
  );
}
