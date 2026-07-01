import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

export const siteConfig = {
  name: "Ayush Rai",
  firstName: "Ayush",
  lastName: "Rai",
  initials: "AR",
  role: "Full Stack Developer (MERN)",
  roles: [
    "Full Stack Developer",
    "MERN Stack Engineer",
    "React & Node.js Developer",
    "End-to-End Web Builder",
  ],
  location: "Mumbai, India",
  email: "raiaayushrai2005@gmail.com",
  phone: "+91 92609 63100",
  tagline:
    "I build responsive, production-ready web applications — from clean React interfaces to secure Node.js, Express & MongoDB back ends.",
  description:
    "Ayush Rai is a Full Stack Developer (MERN) based in Mumbai, India — building responsive, production-ready web applications with React, Node.js, Express and MongoDB.",
  url: "https://ayushrai.dev",
  resume: "/Resume.pdf",
  githubUser: "Ayush0150",
  availability: "Open to full-time roles",
  responseTime: "Usually replies within 24 hours",
  version: "v1.0",
  links: {
    github: "https://github.com/Ayush0150",
    linkedin: "https://www.linkedin.com/in/ayushh-rai",
    email: "mailto:raiaayushrai2005@gmail.com",
  },
};

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" },
];

export const socials = [
  { label: "GitHub", href: siteConfig.links.github, icon: FiGithub },
  { label: "LinkedIn", href: siteConfig.links.linkedin, icon: FiLinkedin },
  { label: "Email", href: siteConfig.links.email, icon: FiMail },
];

export const heroHighlights = [
  { label: "Role", value: "Full Stack Developer" },
  { label: "Education", value: "B.Sc. IT · 8.60 CGPA" },
  { label: "Currently", value: "DESS Digital Meetings" },
  { label: "Location", value: "Mumbai, India" },
];

export const aboutContent = {
  whoIAm:
    "I'm Ayush — a full-stack developer and B.Sc. IT graduate from Mumbai who enjoys turning ideas into reliable, working software.",
  whatIDo:
    "I build complete web apps end to end: accessible interfaces, REST APIs, secure authentication, and the data layer behind them.",
  careerGoal:
    "To grow as a product-focused engineer on a team where I can ship features that real users depend on.",
  currentlyLearning:
    "Sharpening my backend foundations — system design, testing and scalable API patterns.",
};
