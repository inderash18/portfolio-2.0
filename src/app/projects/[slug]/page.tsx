import React from "react";
import { notFound } from "next/navigation";
import { projectsData, Project } from "@/data/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DetailModal from "@/components/DetailModal";
import Link from "next/link";
import { Star, GitFork, Github, ExternalLink, ChevronLeft, CheckCircle } from "lucide-react";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static routes for all 7 projects during build
export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.id,
  }));
}

// Dynamic SEO metadata generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.id === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Inderash Project Detail`,
    description: project.subtitle,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [{ url: project.imageUrl }],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-netflixDark text-white pt-24 pb-12 select-none">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col space-y-8">
        {/* Back navigation */}
        <Link
          href="/"
          className="inline-flex items-center space-x-1.5 text-gray-400 hover:text-white transition-colors duration-200 text-sm font-semibold self-start"
        >
          <ChevronLeft size={16} />
          <span>Back to Browse</span>
        </Link>

        {/* Hero Area */}
        <section className="relative rounded-xl overflow-hidden aspect-video md:aspect-[21/9] border border-white/5 shadow-2xl bg-neutral-900">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover opacity-60"
          />
          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-netflixBlack via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-netflixBlack/90 via-transparent to-transparent" />

          {/* Left Hero Overlay */}
          <div className="absolute bottom-6 left-6 sm:left-10 z-20 flex flex-col space-y-3 max-w-lg md:max-w-xl">
            <span className="px-3 py-1 bg-white/10 text-white rounded-full text-xs font-semibold self-start backdrop-blur-md">
              {project.category}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight drop-shadow-md text-glow">
              {project.title}
            </h1>
            <p className="text-gray-300 text-xs sm:text-sm drop-shadow-sm font-medium">
              {project.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 bg-white text-black hover:bg-white/80 transition-colors px-4 py-2 rounded text-xs sm:text-sm font-bold shadow"
              >
                <Github size={16} />
                <span>GitHub Repository</span>
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-2 bg-netflixRed text-white hover:bg-[#b20710] transition-colors px-4 py-2 rounded text-xs sm:text-sm font-bold shadow"
                >
                  <ExternalLink size={16} />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Content body split */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start pt-4">
          
          {/* Main Content (Left) */}
          <div className="md:col-span-2 space-y-8">
            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-300 font-semibold border-b border-white/5 pb-4">
              <span className="text-emerald-400 font-bold">{project.matchPercentage}% Match</span>
              <span>{project.year}</span>
              <span className="px-1.5 py-0.5 border border-gray-400 text-[10px] rounded leading-none text-gray-300">
                {project.rating}
              </span>
              <span>{project.duration}</span>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-white">Project Overview</h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">System Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feature, i) => (
                  <div key={i} className="flex items-start space-x-2.5 text-sm text-gray-300">
                    <CheckCircle size={16} className="text-netflixRed mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenges */}
            <div className="p-5 bg-white/5 rounded border border-white/5 space-y-2">
              <h2 className="text-sm font-bold text-netflixRed uppercase tracking-wider">
                Engineering Challenge & Solution
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                {project.challenges}
              </p>
            </div>
          </div>

          {/* Sidebar Info (Right) */}
          <div className="glass-card rounded-lg p-6 border border-white/5 space-y-6">
            
            {/* Repo Activity */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-3">
                Repository Activity
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1.5 text-sm font-semibold text-gray-200">
                  <Star size={16} className="text-yellow-500 fill-current" />
                  <span>{project.stars} Stars</span>
                </div>
                <div className="flex items-center space-x-1.5 text-sm font-semibold text-gray-200">
                  <GitFork size={16} className="text-gray-400" />
                  <span>{project.forks} Forks</span>
                </div>
              </div>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-3">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 bg-white/5 text-gray-200 rounded font-medium border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Architecture info */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-3">
                Architecture Flow
              </h3>
              <p className="text-gray-300 text-xs leading-relaxed">
                {project.architecture}
              </p>
            </div>

          </div>

        </section>
      </main>

      <DetailModal />
      <Footer />
    </div>
  );
}
