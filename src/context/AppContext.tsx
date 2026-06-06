"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Project, projectsData } from "@/data/projects";

export type UserProfile = "recruiter" | "developer" | "ai-engineer" | "guest" | null;

interface AppContextType {
  activeProfile: UserProfile;
  setProfile: (profile: UserProfile) => void;
  splashSeen: boolean;
  setSplashSeen: (seen: boolean) => void;
  activeProject: Project | null;
  openDetailModal: (project: Project) => void;
  closeDetailModal: () => void;
  heroProject: Project | null;
  setHeroProject: (project: Project | null) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [activeProfile, setActiveProfile] = useState<UserProfile>(null);
  const [splashSeen, setSplashSeen] = useState<boolean>(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [heroProject, setHeroProject] = useState<Project | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  // Initialize client side (no longer persisting profile so 'Who is watching' always shows)
  // NOTE: Splash always plays fresh on every visit
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Clear any old splash flag so splash always shows
      localStorage.removeItem("netflix_portfolio_splash");
      // Optionally clear profile so it forces the selector
      localStorage.removeItem("netflix_portfolio_profile");
    }
  }, []);

  // Set initial hero project to a random featured project
  useEffect(() => {
    const featured = projectsData.filter((p) => p.featured);
    if (featured.length > 0) {
      // Pick first featured
      setHeroProject(featured[0]);
    } else if (projectsData.length > 0) {
      setHeroProject(projectsData[0]);
    }
  }, []);

  const setProfile = (profile: UserProfile) => {
    setActiveProfile(profile);
    if (typeof window !== "undefined") {
      if (profile) {
        localStorage.setItem("netflix_portfolio_profile", profile);
      } else {
        localStorage.removeItem("netflix_portfolio_profile");
      }
    }
  };

  const markSplashSeen = (seen: boolean) => {
    setSplashSeen(seen);
    if (typeof window !== "undefined") {
      localStorage.setItem("netflix_portfolio_splash", String(seen));
    }
  };

  const openDetailModal = (project: Project) => {
    setActiveProject(project);
    // Disable body scrolling when modal is open
    document.body.style.overflow = "hidden";
  };

  const closeDetailModal = () => {
    setActiveProject(null);
    document.body.style.overflow = "unset";
  };

  return (
    <AppContext.Provider
      value={{
        activeProfile,
        setProfile,
        splashSeen,
        setSplashSeen: markSplashSeen,
        activeProject,
        openDetailModal,
        closeDetailModal,
        heroProject,
        setHeroProject,
        soundEnabled,
        setSoundEnabled,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
