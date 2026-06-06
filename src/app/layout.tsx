import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import NeuralBackground from "@/components/NeuralBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inderash | Portfolio - Full Stack Developer & AI Enthusiast",
  description: "Explore Inderash's Netflix-inspired developer portfolio. Discover AI-powered lost & found portals, bus tracking platforms, college portals, sentiment analysis, and open source work.",
  keywords: ["Inderash", "Full Stack Developer", "AI Enthusiast", "Netflix Portfolio", "B.Sc CSDA Student", "React Developer", "Next.js Portfolio", "Software Engineer India"],
  authors: [{ name: "Inderash" }],
  creator: "Inderash",
  metadataBase: new URL("https://inderash-portfolio.vercel.app"),
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://inderash-portfolio.vercel.app",
    title: "Inderash | Portfolio - Full Stack Developer",
    description: "Recruiter-focused, premium Netflix-inspired portfolio showcasing full stack projects, AI models, and real-time trackers.",
    siteName: "Inderash Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Inderash Netflix Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inderash | Portfolio - Full Stack Developer",
    description: "Premium Netflix-style developer showcase of full stack and AI engineering products.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-white select-none`}
      >
        <AppProvider>
          <NeuralBackground />
          <div className="relative z-10">
            {children}
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
