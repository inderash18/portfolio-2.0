"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DetailModal from "@/components/DetailModal";
import { Download, Printer, MapPin, Mail, Phone, Globe, Briefcase, GraduationCap, Award, CheckCircle } from "lucide-react";

export default function ResumePage() {
  const handlePrint = () => {
    window.print();
  };

  const skills = [
    { category: "Programming Languages", items: ["Python", "TypeScript", "JavaScript", "C++", "Java", "SQL", "HTML5", "CSS3"] },
    { category: "Web Frameworks & Libraries", items: ["React", "Next.js", "Flask", "Node.js", "Express", "Tailwind CSS", "Framer Motion"] },
    { category: "Databases & Caching", items: ["MySQL", "SQLite", "PostgreSQL", "Neo4j", "Redis"] },
    { category: "DevOps & Tooling", items: ["Docker", "Nginx", "Git / GitHub", "Vercel", "WebSockets", "RESTful APIs"] },
  ];

  return (
    <div className="relative min-h-screen bg-netflixDark text-white pt-24 pb-12 print:bg-white print:text-black print:pt-0 print:pb-0 select-none print:select-text">
      {/* Hide navigation in print mode */}
      <div className="print:hidden">
        <Navbar />
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col space-y-8 print:p-0 print:max-w-full">
        
        {/* Floating action bar (hidden during print) */}
        <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur shadow print:hidden">
          <div>
            <h1 className="text-lg font-bold text-white">Curriculum Vitae</h1>
            <p className="text-gray-400 text-xs mt-0.5">Print or export to PDF formatted for standard A4 paper size.</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 bg-netflixRed hover:bg-[#b20710] text-white transition-colors px-4 py-2 rounded text-xs sm:text-sm font-bold shadow"
            >
              <Printer size={16} />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

        {/* Core Resume Sheet Card */}
        <article className="bg-netflixBlack border border-white/5 shadow-2xl rounded-lg p-6 sm:p-10 flex flex-col space-y-8 print:border-none print:shadow-none print:bg-white print:p-0 print:text-black">
          
          {/* Header Summary */}
          <header className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 print:border-black/10">
            <div className="space-y-1">
              <h2 className="text-3xl font-extrabold tracking-tight text-white print:text-black">Inderash</h2>
              <p className="text-netflixRed font-bold text-sm sm:text-base print:text-[#e50914] uppercase tracking-wider">
                Full Stack Developer | AI Enthusiast
              </p>
              <p className="text-gray-400 text-xs sm:text-sm max-w-lg print:text-gray-600 leading-relaxed">
                Passionate developer focused on building scalable web systems, role-based portals, vehicle mapping telemetry, and fine-tuned AI/NLP classifiers.
              </p>
            </div>

            {/* Quick Contact Details */}
            <div className="mt-4 md:mt-0 flex flex-col space-y-2 text-xs text-gray-300 print:text-gray-700 font-medium">
              <span className="flex items-center space-x-2">
                <MapPin size={14} className="text-netflixRed print:text-black" />
                <span>India</span>
              </span>
              <span className="flex items-center space-x-2">
                <Mail size={14} className="text-netflixRed print:text-black" />
                <a href="mailto:minderash@gmail.com" className="hover:underline">minderash@gmail.com</a>
              </span>
              <span className="flex items-center space-x-2">
                <Globe size={14} className="text-netflixRed print:text-black" />
                <a href="https://github.com/Inderash" target="_blank" rel="noreferrer" className="hover:underline">github.com/Inderash</a>
              </span>
            </div>
          </header>

          {/* Education Section */}
          <section className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-white/10 pb-1.5 print:border-black/10">
              <GraduationCap className="text-netflixRed print:text-black" size={20} />
              <h3 className="text-lg font-bold text-white print:text-black">Education</h3>
            </div>
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row justify-between text-xs sm:text-sm font-semibold">
                <span className="text-white print:text-black">B.Sc Computer Science & Data Analytics (CSDA)</span>
                <span className="text-netflixRed print:text-black">2023 - Present</span>
              </div>
              <p className="text-gray-400 print:text-gray-600 text-xs leading-relaxed">
                Developing foundational knowledge in relational databases, data analytics, statistics, algorithmic reasoning, and Python programming structures.
              </p>
            </div>
          </section>

          {/* Experience Section */}
          <section className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-white/10 pb-1.5 print:border-black/10">
              <Briefcase className="text-netflixRed print:text-black" size={20} />
              <h3 className="text-lg font-bold text-white print:text-black">Internship & Leadership</h3>
            </div>
            
            <div className="space-y-4">
              {/* Job 1 */}
              <div className="space-y-1.5">
                <div className="flex flex-col sm:flex-row justify-between text-xs sm:text-sm font-semibold">
                  <div>
                    <span className="text-white print:text-black font-bold">Full Stack Web Intern</span>
                    <span className="text-gray-400 print:text-gray-600 font-normal"> - Tech Solutions</span>
                  </div>
                  <span className="text-netflixRed print:text-black">Summer 2024</span>
                </div>
                <p className="text-gray-400 print:text-gray-600 text-xs leading-relaxed">
                  Contributed to building dashboard portals utilizing React/Next.js and developed secure API gateways in Flask that query MySQL tables.
                </p>
              </div>

              {/* Job 2 */}
              <div className="space-y-1.5">
                <div className="flex flex-col sm:flex-row justify-between text-xs sm:text-sm font-semibold">
                  <div>
                    <span className="text-white print:text-black font-bold">Smart India Hackathon Competitor</span>
                    <span className="text-gray-400 print:text-gray-600 font-normal"> - Shuttle Tracking Team</span>
                  </div>
                  <span className="text-netflixRed print:text-black">2024</span>
                </div>
                <p className="text-gray-400 print:text-gray-600 text-xs leading-relaxed">
                  Devised an operational live shuttle-bus mapping coordination prototype. Coded WebSockets linkages to pipe vehicle coordinate telemetry logs.
                </p>
              </div>
            </div>
          </section>

          {/* Selected Projects Showcase */}
          <section className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-white/10 pb-1.5 print:border-black/10">
              <Award className="text-netflixRed print:text-black" size={20} />
              <h3 className="text-lg font-bold text-white print:text-black">Key Engineering Works</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-white/5 border border-white/5 rounded print:bg-transparent print:border-black/10">
                <h4 className="font-bold text-white print:text-black">CampusFinder AI</h4>
                <p className="text-gray-400 print:text-gray-600 mt-1 leading-relaxed">
                  Lost-and-found portal employing TF-IDF semantic vector searching and Image Perceptual Hashing algorithms.
                </p>
              </div>
              <div className="p-3 bg-white/5 border border-white/5 rounded print:bg-transparent print:border-black/10">
                <h4 className="font-bold text-white print:text-black">College Bus Tracking System</h4>
                <p className="text-gray-400 print:text-gray-600 mt-1 leading-relaxed">
                  GPS shuttle fleet tracker with real-time Leaflet mapping overlays and geofence alerts.
                </p>
              </div>
              <div className="p-3 bg-white/5 border border-white/5 rounded print:bg-transparent print:border-black/10">
                <h4 className="font-bold text-white print:text-black">College Portal System</h4>
                <p className="text-gray-400 print:text-gray-600 mt-1 leading-relaxed">
                  Role-based college portal system protecting administrative actions via relational tables and session guards.
                </p>
              </div>
              <div className="p-3 bg-white/5 border border-white/5 rounded print:bg-transparent print:border-black/10">
                <h4 className="font-bold text-white print:text-black">AI Help Bot</h4>
                <p className="text-gray-400 print:text-gray-600 mt-1 leading-relaxed">
                  Virtual assistant parsing campus questions, mapping relationships inside Neo4j graphs.
                </p>
              </div>
            </div>
          </section>

          {/* Technical Skills */}
          <section className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-white/10 pb-1.5 print:border-black/10">
              <CheckCircle className="text-netflixRed print:text-black" size={20} />
              <h3 className="text-lg font-bold text-white print:text-black">Technical Inventory</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((skillGroup, idx) => (
                <div key={idx} className="text-xs">
                  <h4 className="font-bold text-gray-300 print:text-black uppercase tracking-wider mb-1.5">{skillGroup.category}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {skillGroup.items.map((item) => (
                      <span key={item} className="px-2 py-0.5 bg-white/10 text-gray-200 print:bg-transparent print:text-black print:border print:border-black/10 rounded">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

        </article>
      </main>

      <DetailModal />
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
