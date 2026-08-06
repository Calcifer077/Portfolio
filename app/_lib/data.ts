// lib/data.ts

import {
  SiTypescript,
  SiPostgresql,
  SiExpress,
  SiDrizzle,
  SiPostman,
  SiShadcnui,
  SiAxios,
} from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io5";
import { FaReact, FaGithub } from "react-icons/fa";
import {
  RiNextjsFill,
  RiTailwindCssFill,
  RiSupabaseFill,
} from "react-icons/ri";
import { FaNodeJs } from "react-icons/fa";
import { DiMongodb } from "react-icons/di";
import { AiOutlineDotNet } from "react-icons/ai";
import { TbBrandCSharp } from "react-icons/tb";
import { FaGitAlt } from "react-icons/fa6";

export const skills = [
  { label: "JavaScript", icon: IoLogoJavascript },
  { label: "TypeScript", icon: SiTypescript },
  { label: "React", icon: FaReact },
  { label: "Node.js", icon: FaNodeJs },
  { label: "Express", icon: SiExpress },
  { label: "Next.js", icon: RiNextjsFill },
  { label: "Tailwind CSS", icon: RiTailwindCssFill },
  { label: "Drizzle ORM", icon: SiDrizzle },
  { label: "PostgreSQL", icon: SiPostgresql },
  { label: "MongoDB", icon: DiMongodb },
  { label: "shadcn/ui", icon: SiShadcnui },
  { label: "Supabase", icon: RiSupabaseFill },
  { label: "Postman", icon: SiPostman },
  { label: "Axios", icon: SiAxios },
  { label: "Git", icon: FaGitAlt },
  { label: "GitHub", icon: FaGithub },
  { label: "C#", icon: TbBrandCSharp },
  { label: "Dotnet", icon: AiOutlineDotNet },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/Calcifer077/" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mahesh-nashier-b05691249/",
  },
  { label: "Twitter", href: "https://x.com/nash54644" },
  { label: "Email", href: "mailto:maheshnashier14@gmail.com" },
  { label: "LeetCode", href: "https://leetcode.com/u/maheshnashier14/" },
  { label: "Codeforces", href: "https://codeforces.com/profile/Calcifer077" },
];

export type Project = {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  category: "backend" | "fullstack" | "ml";
  github: string;
  live?: string;
  featured: boolean;
  images: string[];
  features: {
    title: string;
    description: string;
  }[];
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Lumina Reader",
    description:
      "A personal, self-hosted ebook reader. Upload PDF and EPUB files, read them in your browser, and pick up exactly where you left off.",
    longDescription:
      "A personal, self-hosted ebook reader. Upload PDF and EPUB files, read them in your browser, and pick up exactly where you left off — no accounts, no multi-tenant complexity, just your books on your own Supabase project.",
    tags: [
      "Next.js",
      "React",
      "Tailwind",
      "Shadcn/ui",
      "Supabase",
      "React PDF",
      "React Reader",
    ],
    category: "fullstack",
    github: "https://github.com/Calcifer077/lumina-reader",
    live: "",
    featured: true,
    images: [
      "/project_images/lumina_reader/image_1.png",
      "/project_images/lumina_reader/image_2.png",
      "/project_images/lumina_reader/image_3.png",
      "/project_images/lumina_reader/image_4.png",
    ],
    features: [
      {
        title: "Read PDF and EPUB entirely in your browser",
        description:
          "Supports both PDF and EPUB formats with dedicated readers, allowing you to enjoy your entire library without leaving the browser.",
      },
      {
        title: "Automatically save and resume reading progress",
        description:
          "Your reading position is continuously saved to the database with a local fallback, so every book opens exactly where you left off.",
      },
      {
        title: "Private, self-hosted digital library",
        description:
          "Store your books securely in your own Supabase project using private storage and signed URLs, giving you complete ownership of your library without relying on third-party services.",
      },
      {
        title: "Responsive interface built with modern tools",
        description:
          "Built with Next.js, Tailwind CSS, and shadcn/ui to provide a fast, responsive, and polished reading experience across devices.",
      },
    ],
  },
  {
    id: 2,
    title: "Lively votes",
    description:
      "A Real-time polling application built to learn and experiment with WebSockets.",
    longDescription:
      "A Real-time polling application built to learn and experiment with WebSockets.",
    tags: ["React", "Express", "Supabase", "Socket.IO", "Tanstack Query"],
    category: "fullstack",
    github: "https://github.com/Calcifer077/lively-votes",
    live: "https://lively-votes.vercel.app/signup",
    featured: true,
    images: [
      "/project_images/lively_votes/image_1.png",
      "/project_images/lively_votes/image_2.png",
      "/project_images/lively_votes/image_3.png",
    ],
    features: [
      {
        title: "Real time updates",
        description:
          "WebSocket-based architecture for sub-second latency updates across all clients.",
      },
      {
        title: "Optimistic UI",
        description:
          "Optimistic updates with Tanstack Query for instant feedback on user interactions.",
      },
      {
        title: "Supabase Auth and Database",
        description:
          "Supabase provides seamless authentication and real-time database features, enabling secure user management and live data synchronization.",
      },
    ],
  },
  {
    id: 3,
    title: "Idea Vault",
    description:
      "A clean, modern idea management app + CLI that lets you store, organize, and manage ideas in one central place, powered by a GitHub repository using Markdown files.",
    longDescription:
      "A clean, modern idea management app + CLI that lets you store, organize, and manage ideas in one central place, powered by a GitHub repository using Markdown files.",
    tags: ["Next.js", "React", "Tailwind", "Shadcn/ui", "GitHub API"],
    category: "fullstack",
    github: "https://github.com/Calcifer077/idea-vault",
    live: "https://idea-vault-blue.vercel.app/",
    featured: true,
    images: [
      "/project_images/idea_vault/image_1.png",
      "/project_images/idea_vault/image_2.png",
      "/project_images/idea_vault/image_3.png",
    ],
    features: [
      {
        title: "Portable, version control Idea database",
        description:
          "Uses github repository for your ideas. So you truly own your data, can easily move it around, and get all the benefits of git version control and markdown formatting.",
      },
      {
        title: "CRUD operations using CLI and web interface",
        description:
          "Manage your ideas via a sleek web interface or a powerful CLI tool that syncs with your GitHub repository, giving you flexibility in how you interact with your idea vault.",
      },
      {
        title: "Full responsive design with shadcn/ui and tailwind",
        description:
          "Beautiful, fully responsive design with shadcn/ui components and Tailwind CSS for a seamless experience across devices.",
      },
      {
        title: "Animations with motion",
        description:
          "Subtle animations with Motion for a delightful user experience.",
      },
    ],
  },
  {
    id: 4,
    title: "The wild oasis",
    description:
      "Developer-first microservice health monitoring with distributed tracing, compiled to Wasm for edge deployment.",
    longDescription:
      "Sentinel is a Rust-based monitoring daemon that ships as a single Wasm binary. It attaches to your service mesh, emits structured OpenTelemetry spans, and surfaces anomalies via a lightweight dashboard — with zero external dependencies.",
    tags: ["Next.js", "React", "Supabase", "Tailwind", "Auth.js", "Stripe"],
    category: "fullstack",
    github:
      "https://github.com/Calcifer077/the-wild-oasis-website-udemy/tree/main",
    live: "https://the-wild-oasis-website-udemy-dusky.vercel.app/",
    featured: true,
    images: [
      "/project_images/the_wild_oasis/image_1.png",
      "/project_images/the_wild_oasis/image_2.png",
      "/project_images/the_wild_oasis/image_3.png",
    ],
    features: [
      {
        title: "Google authentication via NextAuth.js",
        description:
          "Secure authentication with Google accounts using NextAuth.js, providing a seamless login experience for users.",
      },
      {
        title: "Image and font optimization with Next.js",
        description:
          "Next.js optimizes images and fonts out of the box, ensuring fast load times and a smooth user experience across all devices.",
      },
      {
        title: "Payment processing with Stripe integration",
        description:
          "Seamless integration with Stripe for handling payments(both accepting and refunding).",
      },
      {
        title: "Used React 19 features",
        description:
          "Leverages the latest features like useOptimistic, useActionState, useTransition and Suspense and improvements in React 19 for a better development experience.",
      },
    ],
  },
  {
    id: 5,
    title: "Natours",
    description:
      "A full-stack tour booking application with user authentication and tour management.",
    tags: ["Express", "MongoDB", "Pug"],
    longDescription: "",
    category: "fullstack",
    github: "https://github.com/Calcifer077/natours",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1778003586700-6300af8182f8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    features: [],
  },
  {
    id: 6,
    title: "Blogger",
    description:
      "A blogging platform with user authentication, CRUD operations for posts, and a clean UI.",
    tags: ["Express", "React", "MongoDB", "Tailwind CSS"],
    longDescription: "",
    category: "fullstack",
    github: "https://github.com/Calcifer077/blog-application-react",
    live: "",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1780042426982-cb794203ea1d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    features: [],
  },
  {
    id: 7,
    title: "Movie website",
    description:
      "A movie information website that allows users to browse and search for movies, view details, and write reviews.",
    tags: ["Express", "MongoDB", "Pug"],
    longDescription: "",
    category: "fullstack",
    github: "https://github.com/Calcifer077/Movie-website",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1779614026411-d326c9744e8c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM1fGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D",
    ],
    features: [],
  },
  {
    id: 8,
    title: "Application Tracker",
    description:
      "A job application tracking system that allows users to manage their job applications and track statuses.",
    tags: ["React", "Supabase", "Tanstack Query", "Styled Components"],
    longDescription: "",
    category: "fullstack",
    github: "https://github.com/Calcifer077/Application-Tracker",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1777195680785-23dbb7768b60?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDU2fGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D",
    ],
    features: [],
  },

  {
    id: 9,
    title: "Proxy Server",
    description: "A proxy server implementation with caching capabilities.",
    tags: ["Express"],
    longDescription: "",
    category: "backend",
    github: "https://github.com/Calcifer077/proxy-server-caching",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1751984362638-842f0b938332?w=800&q=80",
    ],
    features: [],
  },
];
