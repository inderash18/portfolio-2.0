"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ElasticSlider from "./ElasticSlider";
import { Cpu, BrainCircuit } from "lucide-react";
import "./ElasticSlider.css";

const AICoreStatus = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const metrics = [
    { label: "AI Intelligence", value: 97 },
    { label: "Problem Solving", value: 95 },
    { label: "System Architecture", value: 93 },
    { label: "Full Stack Development", value: 96 },
    { label: "Machine Learning", value: 90 },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      ref={ref}
      className="ai-core-status-panel mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="ai-core-bg-glow"></div>

      <div className="ai-core-header">
        <div>
          <h2 className="ai-core-title">AI CORE STATUS</h2>
          <p className="ai-core-subtitle">Real-time visualization of engineering capabilities</p>
        </div>
        <div className="ai-core-confidence">
          <span className="ai-core-confidence-label">AI CONFIDENCE</span>
          <span className="ai-core-confidence-value">98.7%</span>
        </div>
      </div>

      <div className="ai-core-sliders">
        {metrics.map((metric, index) => (
          <motion.div key={metric.label} variants={itemVariants}>
            <ElasticSlider
              leftIcon={<Cpu size={18} />}
              rightIcon={<BrainCircuit size={18} />}
              label={metric.label}
              startingValue={0}
              defaultValue={isInView ? metric.value : 0}
              maxValue={100}
              isStepped={false}
              stepSize={1}
            />
          </motion.div>
        ))}
      </div>

      <div className="ai-core-footer">
        <div className="status-dot"></div>
        <span>SYSTEM ONLINE</span>
      </div>
    </motion.div>
  );
};

export default AICoreStatus;
