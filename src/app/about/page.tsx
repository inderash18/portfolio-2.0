"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DetailModal from "@/components/DetailModal";
import { motion } from "framer-motion";
import { GraduationCap, Trophy, Award, Calendar, Cpu, Layers, Code2, Database } from "lucide-react";
import SkillsGalaxy from "@/components/SkillsGalaxy";
import FlowingMenu from "@/components/FlowingMenu";
import LogoLoop from "@/components/LogoLoop";
import {
  SiPython, SiTypescript, SiJavascript, SiReact, SiNextdotjs,
  SiNodedotjs, SiFlask, SiDocker, SiNginx, SiMysql,
  SiPostgresql, SiRedis, SiGit, SiVercel, SiTailwindcss,
  SiCplusplus, SiNeo4J, SiHtml5, SiCss,
} from "react-icons/si";
import dynamic from "next/dynamic";

const Lanyard = dynamic(() => import("@/components/Lanyard"), {
  ssr: false,
});

interface TimelineEvent {
  year: string;
  title: string;
  institution: string;
  description: string;
  icon: React.ReactNode;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

export default function AboutPage() {
  const timelineEvents: TimelineEvent[] = [
    {
      year: "2023 - Present",
      title: "B.Sc Computer Science & Data Analytics (CSDA)",
      institution: "University",
      description: "Focusing on advanced database systems, data models, Python engineering, statistical mathematics, and AI algorithms.",
      icon: <GraduationCap className="text-white" size={20} />,
    },
    {
      year: "2024",
      title: "Full Stack Web Developer Intern",
      institution: "Tech Solutions",
      description: "Engineered responsive frontend screens with React/Next.js and built RESTful API gateways in Python/Flask querying MySQL schemas.",
      icon: <Layers className="text-white" size={20} />,
    },
    {
      year: "2024",
      title: "Smart India Hackathon Participant",
      institution: "National Event",
      description: "Devised a real-time tracking solution for vehicles incorporating WebSockets coordination and telemetry mapping alerts.",
      icon: <Trophy className="text-white" size={20} />,
    },
    {
      year: "2023",
      title: "Biometric IoT Prototype Innovator",
      institution: "Academic Exhibition",
      description: "Integrated fingerprint sensor microcontrollers with local databases to form secure offline voting machines.",
      icon: <Award className="text-white" size={20} />,
    },
  ];

  const skillCategories: SkillCategory[] = [
    {
      title: "Languages",
      icon: <Code2 className="text-netflixRed" size={20} />,
      skills: ["Python", "JavaScript", "TypeScript", "C++", "Java", "HTML5/CSS3", "SQL"],
    },
    {
      title: "Backend & Systems",
      icon: <Cpu className="text-netflixRed" size={20} />,
      skills: ["Flask", "Node.js", "Express", "RESTful APIs", "JWT Auth", "Nginx", "Docker"],
    },
    {
      title: "Databases & Graph",
      icon: <Database className="text-netflixRed" size={20} />,
      skills: ["MySQL", "SQLite", "PostgreSQL", "Neo4j", "Redis Caching"],
    },
    {
      title: "AI & Tools",
      icon: <Layers className="text-netflixRed" size={20} />,
      skills: ["TF-IDF NLP", "HuggingFace Transformers", "Image Hashing", "Git/GitHub", "Vercel", "Tailwind CSS"],
    },
  ];

  const stats = [
    { value: "7+", label: "Completed Projects" },
    { value: "5k+", label: "Lines of Code" },
    { value: "200+", label: "GitHub Commits" },
    { value: "40+", label: "Caffeine Cups" },
  ];

  return (
    <div className="relative min-h-screen bg-netflixDark text-white pt-24 pb-12 select-none">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col space-y-16">
        
        {/* Banner Section */}
        <section className="relative rounded-lg overflow-hidden h-[30vh] sm:h-[40vh] bg-netflixGray flex items-center justify-center border border-white/5 shadow-2xl">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop')" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-netflixDark via-black/40 to-transparent" />
          <div className="relative z-10 text-center space-y-3 px-4">
            <span className="text-netflixRed text-xs sm:text-sm font-black uppercase tracking-[0.25em]">Inderash Biography</span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white drop-shadow-md">About The Creator</h1>
            <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
              Driven Full Stack Developer and AI Enthusiast focused on building high-performance webs, APIs, and neural models.
            </p>
          </div>
        </section>

        {/* Interactive ID Card (Lanyard 3D Physics) */}
        <section className="relative w-full h-[520px] bg-netflixDark/40 rounded-xl border border-white/5 shadow-2xl overflow-hidden mb-8">
          <Lanyard position={[0, 0, 24]} gravity={[0, -40, 0]} transparent={true} />
          
          <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none z-10">
            <span className="text-netflixRed text-[10px] font-bold uppercase tracking-[0.3em] bg-black/40 px-3 py-1 rounded-full border border-white/5 backdrop-blur-md">
              Drag Card To Interact
            </span>
          </div>
        </section>

        {/* Introduction & Stats */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold border-b border-netflixRed pb-2 inline-block">Story Overview</h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Hi, I&apos;m **Inderash**, a computer science student specializing in Data Analytics. My core drive is combining standard software engineering (Full Stack web platforms, secure database transactions) with modern AI advancements (Natural Language Processing, image similarity computation, and Knowledge Graphs).
            </p>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Whether coding custom API Gateways with Redis rate-limiting, integrating biometric authentication hardware, or fine-tuning transformer models for forum sentiment analytics, I focus on performance, scalability, and exceptional UI design.
            </p>
          </div>

          {/* Quick Stats Panel */}
          <div className="glass-card rounded-lg p-6 border border-white/10 shadow-xl grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="text-center p-3 bg-white/5 rounded border border-white/5">
                <div className="text-3xl sm:text-4xl font-extrabold text-netflixRed text-glow">{stat.value}</div>
                <div className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase mt-1 tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold border-b border-netflixRed pb-2 inline-block mb-4">Milestones & Experience</h2>
          
          <div className="relative border-l border-white/10 pl-6 ml-4 space-y-8">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                {/* Timeline connector circle node */}
                <div className="absolute -left-[37px] top-1.5 w-6 h-6 rounded-full bg-netflixRed border-4 border-netflixDark flex items-center justify-center shadow">
                  {event.icon}
                </div>
                
                <div className="glass-card rounded-lg p-5 border border-white/5 space-y-2 hover:border-white/20 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm font-semibold">
                    <span className="text-netflixRed tracking-wider inline-flex items-center space-x-1.5 font-bold">
                      <Calendar size={12} />
                      <span>{event.year}</span>
                    </span>
                    <span className="text-gray-400 mt-1 sm:mt-0 font-medium">{event.institution}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white">{event.title}</h3>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold border-b border-netflixRed pb-2 inline-block mb-6">Skills & Core Expertise</h2>
          
          <SkillsGalaxy />

          {/* ── LogoLoop Tech Ticker ── */}
          <div className="space-y-4 py-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Languages & Frameworks</p>
            <div style={{ height: '64px', position: 'relative', overflow: 'hidden' }}>
              <LogoLoop
                logos={[
                  { node: <SiPython />, title: 'Python', href: 'https://python.org' },
                  { node: <SiTypescript />, title: 'TypeScript', href: 'https://typescriptlang.org' },
                  { node: <SiJavascript />, title: 'JavaScript', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
                  { node: <SiReact />, title: 'React', href: 'https://react.dev' },
                  { node: <SiNextdotjs />, title: 'Next.js', href: 'https://nextjs.org' },
                  { node: <SiNodedotjs />, title: 'Node.js', href: 'https://nodejs.org' },
                  { node: <SiFlask />, title: 'Flask', href: 'https://flask.palletsprojects.com' },
                  { node: <SiCplusplus />, title: 'C++', href: 'https://isocpp.org' },
                  { node: <SiHtml5 />, title: 'HTML5', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
                  { node: <SiCss />, title: 'CSS3', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
                  { node: <SiTailwindcss />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
                ]}
                speed={90}
                direction="left"
                logoHeight={36}
                gap={48}
                hoverSpeed={0}
                scaleOnHover
                fadeOut
                fadeOutColor="#141414"
                ariaLabel="Languages and frameworks"
                style={{ color: '#e50914' }}
              />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 pt-2">Databases & DevOps</p>
            <div style={{ height: '64px', position: 'relative', overflow: 'hidden' }}>
              <LogoLoop
                logos={[
                  { node: <SiMysql />, title: 'MySQL', href: 'https://mysql.com' },
                  { node: <SiPostgresql />, title: 'PostgreSQL', href: 'https://postgresql.org' },
                  { node: <SiRedis />, title: 'Redis', href: 'https://redis.io' },
                  { node: <SiNeo4J />, title: 'Neo4j', href: 'https://neo4j.com' },
                  { node: <SiDocker />, title: 'Docker', href: 'https://docker.com' },
                  { node: <SiNginx />, title: 'Nginx', href: 'https://nginx.org' },
                  { node: <SiGit />, title: 'Git', href: 'https://git-scm.com' },
                  { node: <SiVercel />, title: 'Vercel', href: 'https://vercel.com' },
                ]}
                speed={70}
                direction="right"
                logoHeight={36}
                gap={48}
                hoverSpeed={0}
                scaleOnHover
                fadeOut
                fadeOutColor="#141414"
                ariaLabel="Databases and DevOps tools"
                style={{ color: '#a78bfa' }}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((cat, index) => (
              <div
                key={index}
                className="glass-card rounded-lg p-5 border border-white/5 flex flex-col space-y-4 hover:border-netflixRed/55 transition-colors duration-300 shadow-lg"
              >
                <div className="flex items-center space-x-2.5 pb-2 border-b border-white/5">
                  {cat.icon}
                  <h3 className="text-sm font-bold text-white tracking-wide uppercase">{cat.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2.5 py-1 bg-white/5 text-gray-200 rounded-md font-medium border border-white/5 transition-transform hover:scale-105"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Explore More - Flowing Menu Integration */}
        <section className="space-y-6 mt-16 pb-12">
          <h2 className="text-xl sm:text-2xl font-bold border-b border-netflixRed pb-2 inline-block mb-6">Explore Destinations</h2>
          <div style={{ height: '400px', position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
            <FlowingMenu 
              items={[
                { link: '/projects', text: 'Browse Projects', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop' },
                { link: '/resume', text: 'View Resume', image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=600&auto=format&fit=crop' },
                { link: '/contact', text: 'Get In Touch', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop' },
                { link: '/', text: 'Return Home', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop' }
              ]} 
              speed={15}
              textColor="#ffffff"
              bgColor="#141414"
              marqueeBgColor="#e50914"
              marqueeTextColor="#ffffff"
              borderColor="rgba(255,255,255,0.1)"
            />
          </div>
        </section>

      </main>

      <DetailModal />
      <Footer />
    </div>
  );
}
