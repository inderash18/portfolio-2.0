"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DetailModal from "@/components/DetailModal";
import ProjectCard from "@/components/ProjectCard";
import { projectsData, Project } from "@/data/projects";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type SortOption = "match" | "stars" | "year" | "title";

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortOption>("match");

  const categories = ["All", "AI & Machine Learning", "Full Stack Web", "Systems & APIs", "Hardware & IoT"];

  const filteredAndSortedProjects = useMemo(() => {
    // 1. Filter by category
    let list = projectsData;
    if (activeCategory !== "All") {
      list = list.filter((p) => p.category === activeCategory);
    }

    // 2. Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    // 3. Sort list
    return [...list].sort((a, b) => {
      if (sortBy === "match") {
        return b.matchPercentage - a.matchPercentage;
      }
      if (sortBy === "stars") {
        return b.stars - a.stars;
      }
      if (sortBy === "year") {
        return b.year.localeCompare(a.year);
      }
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <div className="relative min-h-screen bg-netflixDark text-white pt-24 pb-12 select-none">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col space-y-8">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
              Browse Collections
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Explore specialized technical projects by category or key technology tags.
            </p>
          </div>

          {/* Search Inputs */}
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search titles, skills, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-md pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-netflixRed focus:ring-1 focus:ring-netflixRed transition-colors placeholder-gray-500"
            />
          </div>
        </div>

        {/* Filters and sorting Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/5 pb-4">
          {/* Category Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors duration-200 ${
                  activeCategory === cat
                    ? "bg-netflixRed text-white"
                    : "bg-white/5 hover:bg-white/10 text-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sorting Dropdowns */}
          <div className="flex items-center space-x-4 text-xs sm:text-sm text-gray-400 self-end lg:self-auto">
            <div className="flex items-center space-x-1.5">
              <ArrowUpDown size={14} className="text-gray-500" />
              <span>Sort by:</span>
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-[#181818] border border-white/10 rounded px-2.5 py-1.5 text-white font-semibold text-xs focus:outline-none focus:border-netflixRed cursor-pointer"
            >
              <option value="match">Match Percentage</option>
              <option value="stars">GitHub Stars</option>
              <option value="year">Development Year</option>
              <option value="title">Alphabetical Title</option>
            </select>
          </div>
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="popLayout">
          {filteredAndSortedProjects.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 sm:gap-x-10 gap-y-15 sm:gap-y-16 pt-4 justify-items-center"
            >
              {filteredAndSortedProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-center"
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-gray-400 text-lg">No projects match your search query or criteria.</p>
              <button
                onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                className="mt-4 px-4 py-2 bg-netflixRed text-white rounded text-xs font-bold hover:bg-[#b20710] transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <DetailModal />
      <Footer />
    </div>
  );
}
