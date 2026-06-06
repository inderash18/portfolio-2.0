"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import SplashIntro from "@/components/SplashIntro";
import ProfileSelector from "@/components/ProfileSelector";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import ProjectRow from "@/components/ProjectRow";
import DetailModal from "@/components/DetailModal";
import Footer from "@/components/Footer";
import { projectsData } from "@/data/projects";
import { motion } from "framer-motion";

export default function Home() {
  const { splashSeen, setSplashSeen, activeProfile } = useApp();

  // Handle splash intro finish
  const handleSplashComplete = () => {
    setSplashSeen(true);
  };

  // If splash intro hasn't finished, render the cinematic intro
  if (!splashSeen) {
    return <SplashIntro onComplete={handleSplashComplete} />;
  }

  // If no profile selected, render profile choosing screen
  if (!activeProfile) {
    return <ProfileSelector />;
  }

  // --- Filter and Group projects for Netflix-style rows ---
  const featuredProjects = projectsData.filter((p) => p.featured);
  const aiProjects = projectsData.filter((p) => p.category === "AI & Machine Learning");
  const fullstackProjects = projectsData.filter((p) => p.category === "Full Stack Web");
  const systemsProjects = projectsData.filter((p) => p.category === "Systems & APIs");
  const hardwareProjects = projectsData.filter((p) => p.category === "Hardware & IoT");

  // Profile-specific recommendation row heading
  const getProfileSpecificTitle = () => {
    switch (activeProfile) {
      case "recruiter":
        return "Top Recruiter Picks For You";
      case "developer":
        return "Highly Technical & System Architecture Projects";
      case "ai-engineer":
        return "State of the Art AI & Natural Language Processing Models";
      default:
        return "Trending Now";
    }
  };

  // Profile-specific order recommendations
  const getProfileSpecificProjects = () => {
    switch (activeProfile) {
      case "recruiter":
        // Put CampusFinder AI and College Bus Tracking first (highly visual/practical)
        return projectsData.filter((p) => p.id === "campusfinder-ai" || p.id === "college-bus-tracking" || p.id === "college-portal-system");
      case "developer":
        // Systems, portals and tracking first
        return projectsData.filter((p) => p.id === "survey-api-gateway" || p.id === "college-portal-system" || p.id === "college-bus-tracking");
      case "ai-engineer":
        // AI models first
        return projectsData.filter((p) => p.category === "AI & Machine Learning");
      default:
        return projectsData;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="relative min-h-screen bg-netflixDark text-white overflow-hidden pb-10"
    >
      {/* Global Navigation Header */}
      <Navbar />

      {/* Hero Movie Banner (Featured Project detail) */}
      <HeroBanner />

      {/* Main Browse Rows Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative z-30 -mt-16 sm:-mt-24 md:-mt-32 pb-12"
      >
        {/* Recommendation Row based on chosen profile */}
        <ProjectRow title={getProfileSpecificTitle()} projects={getProfileSpecificProjects()} />

        {/* Featured Projects Row */}
        <ProjectRow title="Featured Works" projects={featuredProjects} />

        {/* AI & ML Category */}
        <ProjectRow title="Artificial Intelligence & NLP" projects={aiProjects} />

        {/* Full Stack Web */}
        <ProjectRow title="Full Stack Applications" projects={fullstackProjects} />

        {/* Systems & API gateway */}
        <ProjectRow title="Systems, Gateways & Security APIs" projects={systemsProjects} />

        {/* Hardware & IoT prototypes */}
        <ProjectRow title="IoT & Hardware Integrations" projects={hardwareProjects} />
      </motion.div>

      {/* Dynamic Slide-Up Movie Detail Drawer */}
      <DetailModal />

      {/* Footer Links & Info */}
      <Footer />
    </motion.div>
  );
}
