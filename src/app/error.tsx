"use client";

import React, { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to console for debugging
    console.error("Layout / Render runtime error captured:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#050507] text-white flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 bg-[#e50914]/10 text-[#e50914] rounded-full flex items-center justify-center mx-auto border border-[#e50914]/20 shadow-[0_0_35px_rgba(229,9,20,0.15)]">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-xl font-bold tracking-wide">Something went wrong</h2>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-h-48 overflow-auto border border-white/5 bg-white/5 p-3 rounded font-mono text-left select-text scrollbar-thin">
            {error.message || "An unexpected rendering error occurred inside the app router layout."}
          </p>
        </div>

        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => reset()}
            className="px-5 py-2 bg-[#e50914] text-white font-bold rounded text-sm hover:bg-[#b20710] transition-colors focus:outline-none cursor-pointer"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2 bg-white/10 text-white font-bold rounded text-sm hover:bg-white/20 transition-colors focus:outline-none cursor-pointer"
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  );
}
