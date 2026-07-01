export const projects = [
  {
    slug: "eduguard",
    title: "EduGuard",
    tagline: "IoT-Based Smart Classroom Monitoring & Alert System",
    role: "Full Stack & Firmware",
    year: "2026",
    accent: "#3b82f6",
    featured: true,
    description:
      "A full-stack IoT platform streaming real-time classroom telemetry — attendance, gas and device health — with automated multi-channel alerting.",
    overview:
      "EduGuard is an end-to-end IoT monitoring platform that pairs ESP32 firmware with a MERN backend and a real-time React dashboard. Sensor telemetry streams over WebSocket in real time, while the API layer enforces role-based access control, admin two-factor auth and secure input validation. It earned a Best Project Award for its hardware–software integration.",
    problem:
      "Classrooms had no real-time visibility into occupancy, air quality or device status — and no automated way to alert staff the moment something went wrong.",
    architecture:
      "ESP32 firmware streams sensor data over WebSocket to a Node.js + Express gateway that persists to MongoDB and broadcasts to a React + Tailwind dashboard. A hardened auth layer (JWT, role-based access control, email-OTP 2FA) guards every route, while a SIM800L GSM module handles out-of-band SMS, call and buzzer alerts. The web stack is deployed on Render.",
    features: [
      "Real-time telemetry over WebSocket — attendance, gas and device health",
      "Multi-channel alerts: SMS, calls, buzzer and web via SIM800L GSM",
      "Role-based access control with admin email-OTP two-factor auth",
      "Remote device configuration and control from the dashboard",
      "Analytics reports exportable to PDF, Excel, CSV and JSON",
      "Secured with bcrypt hashing, rate limiting and input validation",
    ],
    challenges: [
      "Keeping the real-time data stream stable across flaky GSM and Wi-Fi links.",
      "Coordinating embedded firmware and the web backend so live data stayed in sync.",
      "Designing role-based access without over-complicating the dashboard UX.",
    ],
    learnings: [
      "End-to-end ownership across firmware, backend, security and UI.",
      "Practical real-time architecture with WebSockets at the network edge.",
      "Threat-modeling a real product against the OWASP Top 10.",
    ],
    highlights: [
      "Architected and deployed a full-stack IoT platform (ESP32, Node.js, Express, MongoDB, React, Tailwind) using WebSocket for real-time attendance, gas and device monitoring.",
      "Developed embedded Arduino C/C++ firmware integrating PIR, gas and RTC sensors with a SIM800L GSM module for automated multi-channel alerts (SMS, calls, buzzer, web).",
      "Built a secure backend with JWT authentication & authorization, role-based access control, admin email-OTP two-factor (email OTP), bcrypt hashing, rate limiting and input validation.",
      "Designed a React dashboard with real-time state management for remote device configuration and analytics exportable to PDF, Excel, CSV and JSON.",
    ],
    gallery: ["Live dashboard", "Telemetry stream", "Alerts & device config"],
    stack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "WebSocket",
      "ESP32",
      "Arduino C/C++",
      "JWT",
      "Tailwind CSS",
      "Render",
    ],
    githubUrl: "https://github.com/Ayush0150",
  },
  {
    slug: "wonderlust",
    title: "Wonderlust",
    tagline: "Full-Stack Travel Listing Platform",
    role: "Full Stack",
    year: "2025",
    accent: "#06b6d4",
    featured: true,
    description:
      "A scalable travel-listing application with interactive maps, image uploads and full CRUD across listings and reviews.",
    overview:
      "Wonderlust is a full-stack travel marketplace built on the MERN stack and MVC architecture for clean, maintainable code. It renders geolocated property listings on interactive Leaflet maps, handles media through Cloudinary, and exposes RESTful APIs supporting full CRUD across listings and reviews.",
    problem:
      "Travelers needed one place to list, discover and review stays on an interactive map, with reliable image handling and trustworthy data.",
    architecture:
      "An Express + MongoDB backend organized with the MVC pattern exposes REST endpoints for listings and reviews, with server-side validation throughout. Leaflet renders geolocated pins sourced from the OpenStreetMap API, Cloudinary handles image storage and delivery, and the app is deployed on Render.",
    features: [
      "Full CRUD for listings and reviews via RESTful APIs",
      "Interactive Leaflet maps with OpenStreetMap geocoding",
      "Cloud image uploads and transforms through Cloudinary",
      "Clean MVC structure for maintainable, reusable code",
      "Server-side validation and session-based auth flows",
    ],
    challenges: [
      "Modeling listings, reviews and users with clean, reliable relationships.",
      "Integrating third-party map and media services without brittle coupling.",
    ],
    learnings: [
      "Pragmatic MVC structure that scales as a codebase grows.",
      "Working confidently with geospatial data and third-party APIs.",
    ],
    highlights: [
      "Built a scalable full-stack travel-listing app with Node.js, Express, MongoDB and Bootstrap following the MVC architecture.",
      "Integrated interactive map visualizations using Leaflet.js and the OpenStreetMap API to display geolocated listings.",
      "Designed RESTful APIs supporting full CRUD for listings and reviews, with image uploads handled through Cloudinary.",
    ],
    gallery: ["Map explorer", "Listing detail", "Reviews & ratings"],
    stack: [
      "Node.js",
      "Express",
      "MongoDB",
      "Bootstrap",
      "Leaflet.js",
      "Cloudinary",
      "REST API",
      "MVC",
      "Render",
    ],
    githubUrl: "https://github.com/Ayush0150",
  },
];

export function getProject(slug) {
  return projects.find((project) => project.slug === slug);
}
