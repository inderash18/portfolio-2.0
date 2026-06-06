# Inderash | Netflix-Inspired Portfolio Website

A cinematic, interactive, and fully responsive developer portfolio built to replicate the Netflix streaming platform interface. It offers custom watching profiles (Recruiter, Developer, AI Engineer, Guest), horizontal scroll sections, live modal expansions, dynamic detail pages, and synthesized Web Audio API sounds.

---

## 🚀 Technology Stack

- **Framework**: Next.js 15 (App Router, Strict Mode)
- **Runtime & UI**: React 19 & TypeScript
- **Styling**: Tailwind CSS (Glassmorphism, custom scroll indicators)
- **Animations**: Framer Motion (hover card zooms, transitions) & GSAP (Logo letter intros)
- **Sound synthesis**: Web Audio API (real-time "Ta-dum" synth generation)
- **Forms**: EmailJS integration with validate hooks
- **Tooling**: PostCSS, Autoprefixer, ESLint

---

## 📽️ Key Features

1. **Ta-dum Cinematic Intro**: Dynamic logo fade-in and scale-up paired with localized low-frequency oscillator thumps mimicking Netflix's startup.
2. **Who's Watching Profiles**: Four customized workspace environments:
   - **Recruiter**: Automatically elevates top project picks, resume downloads, and metrics.
   - **Developer**: Focuses on deep system layouts, backend pipelines, and API structures.
   - **AI Engineer**: Highlights sentiment classification models and NLP vectors.
   - **Guest**: General trending catalog layout.
3. **Interactive Hero Section**: Automatic video loop player, match accuracy rating, and direct play/detail triggers.
4. **Browse Rows**: Multi-row horizontal list of 7 core projects with mouse drag, arrow pagination, and keyboard scrolling support.
5. **Rich details modal drawer**: iconic slide-up overlay detailing software features, database architectures, and engineering challenges.
6. **Full-page CV**: Clean, professional online resume formatted with print-stylesheets to download as A4 PDF files.
7. **Contact Center**: Styled as a Netflix Sign In form, handling form validations, EmailJS links, and a canvas-confetti success animation.

---

## 📦 Project Database Entries

1. **CampusFinder AI** (AI & ML) — NLP lost & found portal with image hash matching.
2. **College Bus Tracking System** (Full Stack) — Real-time GPS vehicle coordinate tracking with maps.
3. **College Portal System** (Full Stack) — Role-based academic portal protecting administrative profiles.
4. **College AI Sentiment Analyzer** (AI & ML) — HuggingFace text scraper and classifier.
5. **Digital Voting Machine** (Hardware & IoT) — Arduino biometric voter validation prototype.
6. **Survey API Gateway** (Systems & APIs) — JSON distribution system with Redis rate limiting.
7. **AI Help Bot** (AI & ML) — Spacy NLP parser integrated with Neo4j graph database.

---

## 💻 Local Setup & Installation

Ensure you have [Node.js](https://nodejs.org) installed on your system.

1. **Clone the workspace / Open folder**
2. **Install node dependencies**:
   ```bash
   npm install
   ```
3. **Configure environment variables**:
   Create a `.env.local` file at the root referencing `.env.example`:
   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```
4. **Run development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

5. **Compile production build**:
   Verify compilation and static pages export:
   ```bash
   npm run build
   ```
