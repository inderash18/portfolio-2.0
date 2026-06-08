export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  category: "Featured" | "AI & Machine Learning" | "Full Stack Web" | "Systems & APIs" | "Hardware & IoT";
  tags: string[];
  imageUrl: string;
  videoUrl?: string;
  githubUrl: string;
  liveUrl?: string;
  features: string[];
  challenges: string;
  architecture: string;
  matchPercentage: number;
  rating: "AI-18" | "FS-PG" | "SYS-MA" | "HARD-13";
  year: string;
  duration: string;
  stars: number;
  forks: number;
  featured: boolean;
}

export const projectsData: Project[] = [
  {
    id: "campusfinder-ai",
    title: "CampusFinder AI",
    subtitle: "AI-Powered Lost & Found Portal with Smart Matching",
    description: "An intelligent lost-and-found system using NLP, TF-IDF semantic search, and perceptual image hashing to automatically match reported lost items with found ones across university campuses.",
    longDescription: "CampusFinder AI completely redefines how lost and found systems work on busy university campuses. Instead of relying on manual searches and static lists, it employs artificial intelligence to bridge the gap. When a user reports a lost item, the system extracts key features using TF-IDF matching for descriptions and Perceptual Image Hashing (pHash) for image uploads. It automatically cross-references items in the database and assigns a confidence score, notifying both users when a high-probability match is found.",
    category: "AI & Machine Learning",
    tags: ["Python", "Flask", "TF-IDF NLP", "Image Hashing", "SQLite", "Tailwind CSS", "Framer Motion"],
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200",
    githubUrl: "https://github.com/Inderash/CampusFinder-AI",
    liveUrl: "https://campusfinder-ai.example.com",
    features: [
      "Perceptual Image Hashing: Matches similar items even under different lighting or angles",
      "TF-IDF Semantic Vectorizer: Analyzes textual descriptions to compute lexical similarity scores",
      "Automated Match Notifications: Automatically flags top matches and emails owners",
      "Clean Claim Flow: Secure, role-based authorization to claim found items via campus ID"
    ],
    challenges: "Resolving low-resolution photo matches and noisy text descriptions. Solved by preprocessing images with contrast enhancement (CLAHE) and stripping filler words from texts prior to vectorizing.",
    architecture: "Flask Microservices backend acting as the AI inference endpoint, React/Next.js frontend, SQLite DB for rapid matching, and an SMTP layer for instant notifications.",
    matchPercentage: 98,
    rating: "AI-18",
    year: "2025",
    duration: "4 weeks",
    stars: 18,
    forks: 4,
    featured: true
  },
  {
    id: "college-bus-tracking",
    title: "College Bus Tracking System",
    subtitle: "Real-Time Fleet Management & GPS Tracker",
    description: "A live GPS tracking platform that maps campus shuttle buses in real-time, offering arrival times, geofencing warnings, and optimal route guides for students and administration.",
    longDescription: "The College Bus Tracking System was designed to address shuttle scheduling inefficiencies. By utilizing GPS-enabled hardware / web nodes on buses, coordinates are piped into a Flask backend via WebSocket connections. The frontend renders real-time movements on dynamic map interfaces, updating bus indicators instantly. Includes push notification geofencing to alert students when a bus is 5 minutes away from their stop.",
    category: "Full Stack Web",
    tags: ["JavaScript", "Flask", "WebSockets", "Leaflet Maps", "GPS API", "Tailwind CSS"],
    imageUrl: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=1200",
    githubUrl: "https://github.com/Inderash/college-bus-tracking",
    liveUrl: "https://bus-tracker.example.com",
    features: [
      "Real-Time Map Overlay: LeafletJS integration rendering active shuttle coordinates with zero lag",
      "Geofence Notifications: Instant notifications triggered when shuttles cross radius thresholds",
      "ETA Calculation: Distance-matrix estimation incorporating local traffic variables",
      "Admin Fleet Panel: Control dashboard to assign drivers, update routes, and view historical logs"
    ],
    challenges: "Handling intermittent GPS coordinate updates in areas with poor cellular signal. Solved by implementing Kalman Filtering on the client map layers to smoothly interpolate bus paths between coordinate pings.",
    architecture: "WebSockets server (Socket.io) handling persistent bidirectional communication, Flask API gateway, Leaflet.js dashboard client, and background cron schedules.",
    matchPercentage: 96,
    rating: "FS-PG",
    year: "2024",
    duration: "5 weeks",
    stars: 12,
    forks: 3,
    featured: true
  },
  {
    id: "college-portal-system",
    title: "College Portal System",
    subtitle: "Role-Based Academic Administration & CMS",
    description: "A secure, robust college management system streamlining grades, timetables, course registrations, and staff-student communications through granular RBAC profiles.",
    longDescription: "A massive, production-grade College Portal System built to handle thousands of concurrent queries. It houses distinct portals for students, faculty, and administrative staff. Administrators can update class enrollments, faculty members can log grades and take attendance, and students can register for classes, view timetables, and download academic transcript sheets.",
    category: "Full Stack Web",
    tags: ["HTML5", "CSS3", "JavaScript", "Python", "Flask", "MySQL", "Role-Based Access Control"],
    imageUrl: "https://images.pexels.com/photos/6238048/pexels-photo-6238048.jpeg?auto=compress&cs=tinysrgb&w=1200",
    githubUrl: "https://github.com/Inderash/college-portal-system",
    liveUrl: "https://portal.example.com",
    features: [
      "Granular RBAC: Separate dashboard access controls and session guards for Student, Faculty, and Admin",
      "Interactive Timetables: Dynamically compiles schedules preventing room or instructor double-bookings",
      "Gradebook Analytics: Visualizes student GPA progress over semesters with interactive charts",
      "Document Storage: Secure uploaded assignments and exam papers with cryptographically hashed filenames"
    ],
    challenges: "Ensuring database transaction integrity during high-load periods like course registration days. Solved by implementing MySQL transaction isolation levels and row-locking on critical tables.",
    architecture: "Multi-tier Flask application running on Gunicorn, querying a optimized relational MySQL database with connection pools, styled via clean responsive panels.",
    matchPercentage: 94,
    rating: "FS-PG",
    year: "2024",
    duration: "6 weeks",
    stars: 9,
    forks: 2,
    featured: false
  },
  {
    id: "college-sentiment-analyzer",
    title: "College AI Sentiment Analyzer",
    subtitle: "HuggingFace NLP Pipeline for Campus Feedback",
    description: "An AI-powered feedback analysis system that scrapes student forums, feedback forms, and course reviews to categorize overall sentiment and extract trending issues.",
    longDescription: "The College AI Sentiment Analyzer leverages state-of-the-art transformers to parse text reviews. It compiles qualitative student opinions into quantitative executive reports. Administrators can immediately pinpoint common complaints, such as library opening hours or cafeteria options, through automated topic clustering and polarity scoring.",
    category: "AI & Machine Learning",
    tags: ["Flask", "Python", "Hugging Face", "Transformers", "BERT", "Chart.js", "Web Scraping"],
    imageUrl: "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1200",
    githubUrl: "https://github.com/Inderash/college-ai-sentiment-analyzer",
    liveUrl: "https://sentiment.example.com",
    features: [
      "Fine-tuned DistilBERT: High-accuracy polarity classifications (Positive, Negative, Neutral)",
      "Topic Extraction: Dynamic clustering algorithms (LDA) matching reviews to categories",
      "Forum Scraper: Automated scripts to gather reviews from public campus threads safely",
      "Analytics Dashboard: Dynamic visual charts displaying sentiment shifts over semesters"
    ],
    challenges: "Adapting general sentiment models to read highly specific student slang. Resolved by building a custom domain dictionary and fine-tuning the transformer head on labeled campus reviews.",
    architecture: "Python Flask REST API serving HuggingFace Transformer pipelines, caching predictions in Redis, visual frontend built with ChartJS integration.",
    matchPercentage: 97,
    rating: "AI-18",
    year: "2025",
    duration: "3 weeks",
    stars: 15,
    forks: 5,
    featured: true
  },
  {
    id: "digital-voting-machine",
    title: "Digital Voting Machine",
    subtitle: "Biometric Hardened Ballot & Verification System",
    description: "A physical and digital voting prototype pairing an Arduino/Raspberry Pi fingerprint scanner with a secure local database to guarantee single-vote validation.",
    longDescription: "The Digital Voting Machine represents a hybrid hardware-software solution to secure student elections. Users authenticate their voter registration via a physical fingerprint sensor. The micro-controller validates biometric prints locally, unlocks a digital ballot screen for a single selection, registers the vote cryptographically, and locks the panel for the next user.",
    category: "Hardware & IoT",
    tags: ["C++", "Arduino", "Python", "SQLite", "Biometrics", "Hardware-Software Integration"],
    imageUrl: "https://images.pexels.com/photos/114907/pexels-photo-114907.jpeg?auto=compress&cs=tinysrgb&w=1200",
    githubUrl: "https://github.com/Inderash/digital-voting-machine",
    features: [
      "Biometric Registration: Stores template hashes inside an secure EEPROM module",
      "Double-Voting Safeguards: Instant flag checking in SQLite preventing repeat ballots",
      "Local Encrypted Records: Encrypts vote tallies with AES-256 before disk writes",
      "Physical Display UI: Guides voters step-by-step using an attached LCD display module"
    ],
    challenges: "Handling unstable power surges which could corrupt database files. Solved by writing transactional log-ahead journals in SQLite and adding a physical backup capacitor circuit.",
    architecture: "Adafruit Fingerprint Sensor connected to Arduino Mega, serial link to local Raspberry Pi coordinator executing Python GUI, and local encrypted SQLite DB.",
    matchPercentage: 92,
    rating: "HARD-13",
    year: "2023",
    duration: "8 weeks",
    stars: 14,
    forks: 2,
    featured: false
  },
  {
    id: "survey-api-gateway",
    title: "Survey API Gateway",
    subtitle: "High-Throughput Data Dissemination Platform",
    description: "An API gateway specializing in secure JSON distribution, token-based rate limiting, caching, and custom routing configurations for student-led survey datasets.",
    longDescription: "Designed to help research groups collect, aggregate, and distribute academic survey datasets safely. The Survey API Gateway manages authentication tokens, implements rate limiting to prevent DDoS attempts, handles cache validation headers, and routes queries dynamically based on endpoints.",
    category: "Systems & APIs",
    tags: ["Flask", "Redis", "JSON Web Tokens", "Docker", "Nginx", "Rate Limiting"],
    imageUrl: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1200",
    githubUrl: "https://github.com/Inderash/survey-api-gateway",
    features: [
      "Custom JWT Auth: Cryptographically signed security tokens with automatic expiry times",
      "Redis Caching Layer: High-performance dataset retrieval reducing database load by 80%",
      "Rate Limiting: Sliding-window rate limiter restricting users to 100 requests/minute",
      "Dynamic Route Manager: Admin dashboard to register new surveys and customize endpoints"
    ],
    challenges: "Cache invalidation synchronization when research teams modified questions in real time. Solved by creating a pub/sub event hook in Redis to clear cache tags upon DB updates.",
    architecture: "Nginx reverse proxy, Flask Gateway application, Redis cluster for cache & rate counts, PostgreSQL database, fully packaged inside Docker containers.",
    matchPercentage: 93,
    rating: "SYS-MA",
    year: "2024",
    duration: "4 weeks",
    stars: 8,
    forks: 1,
    featured: false
  },
  {
    id: "ai-help-bot",
    title: "AI Help Bot",
    subtitle: "Knowledge Graph NLP Virtual Assistant",
    description: "A smart campus helper combining Neo4j graph databases with NLP models to answer intricate questions about academic guidelines, pre-requisites, and faculty offices.",
    longDescription: "Traditional university chat assistants struggle with multi-relational queries. The AI Help Bot solves this by storing campus regulations, course prerequisites, and faculty listings in a Neo4j Knowledge Graph. A Python NLP pipeline parses natural questions, extracts entities, and transforms inputs into Cypher queries, returning precise factual context.",
    category: "AI & Machine Learning",
    tags: ["Python", "Neo4j", "Graph Database", "NLP Spacy", "Flask API", "Tailwind CSS"],
    imageUrl: "https://images.pexels.com/photos/8714952/pexels-photo-8714952.jpeg?auto=compress&cs=tinysrgb&w=1200",
    githubUrl: "https://github.com/Inderash/ai-help-bot",
    liveUrl: "https://helpbot.example.com",
    features: [
      "Neo4j Knowledge Graph: Maps complex connections like 'Course X is a pre-requisite for Y'",
      "Spacy Entity Extraction: High-precision parsing of courses, professors, and locations",
      "Contextual Dialogues: Maintained conversation state using small-footprint memory caches",
      "Interactive Graph View: Visually render a subset of the knowledge path to the student"
    ],
    challenges: "Resolving spelling mistakes in students' inquiries for course names. Resolved by using a Levenshtein distance fuzzy-matcher before searching nodes.",
    architecture: "Flask API server, Neo4j graph database, SpaCy language parser, integrated into a beautiful React chat dialogue component.",
    matchPercentage: 95,
    rating: "AI-18",
    year: "2025",
    duration: "5 weeks",
    stars: 16,
    forks: 4,
    featured: true
  }
];