"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function NeuralBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef({ y: 0, targetY: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    const isMobile = window.matchMedia("(max-width: 768px)").matches || 
                     ("ontouchstart" in window) || 
                     (navigator.maxTouchPoints > 0);

    // 2. Camera Setup (Perspective for depth)
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 120;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isMobile ? 1.0 : Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. Create Particles (Nodes)
    const particleCount = isMobile ? 40 : 120;
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];
    const originalPositions: { x: number; y: number; z: number }[] = [];

    const bounds = { x: 140, y: 80, z: 80 };

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * bounds.x;
      const y = (Math.random() - 0.5) * bounds.y;
      const z = (Math.random() - 0.5) * bounds.z;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions.push({ x, y, z });

      velocities.push({
        x: (Math.random() - 0.5) * 0.12,
        y: (Math.random() - 0.5) * 0.12,
        z: (Math.random() - 0.5) * 0.08,
      });
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Particle styling (soft dots)
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x7c3aed, // Purple theme accent
      size: 1.5,
      transparent: true,
      opacity: 0.65,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 5. Connecting Lines System (Constellation)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xe50914, // Netflix Red connections
      transparent: true,
      opacity: 0.0, // Updated dynamically per pair
    });

    // We pre-allocate a LineSegments geometry to keep draw calls at 1
    const maxLines = isMobile ? 80 : 400;
    const linePositions = new Float32Array(maxLines * 2 * 3); // maxLines * 2 points * 3 coords
    const lineColors = new Float32Array(maxLines * 2 * 3);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineSegments = new THREE.LineSegments(lineGeometry, new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
    }));
    scene.add(lineSegments);

    // 6. Interaction Event Handlers
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to [-1, 1]
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      if (typeof window !== "undefined") {
        scrollRef.current.targetY = window.scrollY;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    // 7. Animation Loops
    let animationFrameId: number;
    const tempPos = new THREE.Vector3();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Damp mouse coordinates for lazy follow/magnetic inertia
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      // Damp scroll offsets
      scrollRef.current.y += (scrollRef.current.targetY - scrollRef.current.y) * 0.08;

      // Subtle parallax camera movements based on mouse & scroll values
      camera.position.x = mouseRef.current.x * 15;
      camera.position.y = (mouseRef.current.y * 10) - (scrollRef.current.y * 0.05);
      camera.lookAt(0, -scrollRef.current.y * 0.02, 0);

      // Update particle node positions (drift + gravity bend)
      const positionAttr = particleGeometry.getAttribute("position") as THREE.BufferAttribute;
      const array = positionAttr.array as Float32Array;

      const mouseWorldX = mouseRef.current.x * 70;
      const mouseWorldY = mouseRef.current.y * 40;

      for (let i = 0; i < particleCount; i++) {
        // Apply organic drift velocities
        originalPositions[i].x += velocities[i].x;
        originalPositions[i].y += velocities[i].y;
        originalPositions[i].z += velocities[i].z;

        // Bounce nodes off boundaries
        if (Math.abs(originalPositions[i].x) > bounds.x / 2) velocities[i].x *= -1;
        if (Math.abs(originalPositions[i].y) > bounds.y / 2) velocities[i].y *= -1;
        if (Math.abs(originalPositions[i].z) > bounds.z / 2) velocities[i].z *= -1;

        // Compute gravitational pull toward mouse
        const dx = mouseWorldX - originalPositions[i].x;
        const dy = mouseWorldY - originalPositions[i].y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);

        let pullX = 0;
        let pullY = 0;

        if (distToMouse < 45) {
          const force = (45 - distToMouse) * 0.08;
          pullX = (dx / distToMouse) * force;
          pullY = (dy / distToMouse) * force;
        }

        // Apply final coordinate output
        array[i * 3] = originalPositions[i].x + pullX;
        array[i * 3 + 1] = originalPositions[i].y + pullY;
        array[i * 3 + 2] = originalPositions[i].z;
      }
      positionAttr.needsUpdate = true;

      // Update connecting line geometry dynamically
      const linePosAttr = lineGeometry.getAttribute("position") as THREE.BufferAttribute;
      const lineColAttr = lineGeometry.getAttribute("color") as THREE.BufferAttribute;
      
      const linePosArray = linePosAttr.array as Float32Array;
      const lineColArray = lineColAttr.array as Float32Array;

      let lineIdx = 0;
      const connectionThreshold = 25;

      for (let i = 0; i < particleCount && lineIdx < maxLines; i++) {
        const x1 = array[i * 3];
        const y1 = array[i * 3 + 1];
        const z1 = array[i * 3 + 2];

        for (let j = i + 1; j < particleCount && lineIdx < maxLines; j++) {
          const x2 = array[j * 3];
          const y2 = array[j * 3 + 1];
          const z2 = array[j * 3 + 2];

          const dx = x2 - x1;
          const dy = y2 - y1;
          const dz = z2 - z1;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < connectionThreshold) {
            // Draw connection line
            const idxOffset = lineIdx * 6;

            linePosArray[idxOffset] = x1;
            linePosArray[idxOffset + 1] = y1;
            linePosArray[idxOffset + 2] = z1;

            linePosArray[idxOffset + 3] = x2;
            linePosArray[idxOffset + 4] = y2;
            linePosArray[idxOffset + 5] = z2;

            // Interpolate line opacity based on distance (closer = brighter)
            const alpha = 1.0 - (dist / connectionThreshold);
            
            // Set vertex colors: gradients blending Purple (from node) to Red (to node)
            // Node 1 color (Purple: 124, 58, 237)
            lineColArray[idxOffset] = 0.48 * alpha;
            lineColArray[idxOffset + 1] = 0.22 * alpha;
            lineColArray[idxOffset + 2] = 0.93 * alpha;

            // Node 2 color (Netflix Red: 229, 9, 20)
            lineColArray[idxOffset + 3] = 0.9 * alpha;
            lineColArray[idxOffset + 4] = 0.03 * alpha;
            lineColArray[idxOffset + 5] = 0.08 * alpha;

            lineIdx++;
          }
        }
      }

      // Zero out unused pre-allocated buffer ranges
      for (let i = lineIdx; i < maxLines; i++) {
        const idxOffset = i * 6;
        linePosArray[idxOffset] = 0;
        linePosArray[idxOffset + 1] = 0;
        linePosArray[idxOffset + 2] = 0;
        linePosArray[idxOffset + 3] = 0;
        linePosArray[idxOffset + 4] = 0;
        linePosArray[idxOffset + 5] = 0;

        lineColArray[idxOffset] = 0;
        lineColArray[idxOffset + 1] = 0;
        lineColArray[idxOffset + 2] = 0;
        lineColArray[idxOffset + 3] = 0;
        lineColArray[idxOffset + 4] = 0;
        lineColArray[idxOffset + 5] = 0;
      }

      linePosAttr.needsUpdate = true;
      lineColAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Resizing handler
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 9. Cleanups on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      
      renderer.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden select-none bg-background"
    />
  );
}
