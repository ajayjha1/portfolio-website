"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';

// TypeScript interfaces for component props
interface ProjectProps {
  title: string;
  url?: string;
  description: string[];
}

// Project component for individual projects
const Project: React.FC<ProjectProps> = ({ title, url, description }) => (
  <div className="bg-gray-900/50 rounded-lg p-6 hover:bg-gray-900/80 transition-all duration-300 border border-gray-800 hover:border-gray-700 shadow-md">
    <h3 className="text-xl font-semibold mb-3">
      {url ? (
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center text-blue-400 hover:text-blue-300 transition-colors"
        >
          {title} 
          <span className="ml-2 text-xl transition-transform duration-300 group-hover:translate-x-1">↗</span>
        </a>
      ) : (
        title
      )}
    </h3>
    <ul className="list-disc pl-5 space-y-3 text-gray-300">
      {description.map((item, index) => (
        <li key={index} className="leading-relaxed">{item}</li>
      ))}
    </ul>
  </div>
);

// Interface for Role component props
interface RoleProps {
  company: string;
  companyUrl?: string;
  title: string;
  period: string;
  location: string;
  intro: string;
  projects: ProjectProps[];
}

// Role component for individual job experiences
const Role: React.FC<RoleProps> = ({ company, companyUrl, title, period, location, intro, projects }) => (
  <div className="relative">
    <div className="flex items-center mb-4 justify-center text-center">
      {companyUrl ? (
        <a href={companyUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text group-hover:to-blue-300 transition-all">{company}</h2>
          <span className="ml-2 text-xl text-blue-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
        </a>
      ) : (
        <>
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">{company}</h2>
          <span className="ml-2 text-xl text-blue-400">↗</span>
        </>
      )}
    </div>

    <div className="bg-blue-500/10 rounded-full px-4 py-1 mb-6 inline-block mx-auto flex items-center justify-center">
      <p className="text-blue-300 text-sm font-medium text-center">{title} | {period} | {location}</p>
    </div>

    <p className="mb-8 text-center text-gray-300 max-w-2xl mx-auto">
      {intro}
    </p>

    <div className="grid md:grid-cols-1 gap-6">
      {projects.map((project, index) => (
        <Project
          key={index}
          title={project.title}
          url={project.url}
          description={project.description}
        />
      ))}
    </div>
  </div>
);

// Interface for experience data
interface ExperienceData {
  company: string;
  companyUrl?: string;
  title: string;
  period: string;
  location: string;
  intro: string;
  projects: ProjectProps[];
}

const Experience: React.FC = () => {
  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((d) => setResumeUrl(d.resumeUrl || ""))
      .catch(() => {});
  }, []);

  const experienceData: ExperienceData[] = [
    {
      company: "M37 LABS",
      companyUrl: "https://m37labs.com",
      title: "Full Stack Developer",
      period: "Feb 2026 – Present",
      location: "Remote",
      intro: "Building AI-powered brand intelligence and ESG monitoring products for enterprise clients across SE Asia.",
      projects: [
        {
          title: "ebic.ai — AI Brand Intelligence Platform",
          description: [
            "Built Analytics Dashboard with Core System Reports — Headcount, Active/Non-Active Users, Artifact & Usage Metrics, and Top Performing Users.",
            "Developed Presentation Builder: PPTX generation with theme presets, pitch types, layout/tone controls, brand context injection & narrative enrichment.",
            "Implemented multi-brand Brand Intelligence module with AI monitoring across Overview, Presentations, Narrative Decoding, Social Media & Research LLM tabs.",
            "Stack: React, Node.js, Python."
          ]
        },
        {
          title: "ESG Monitoring Dashboard",
          description: [
            "Built Commitments Registry with live 24h sync — tracking Drift Flags, Total Commitments, Fetched Articles, and Business Risk scores.",
            "Implemented ESG Pillar Distribution chart (Environmental 48%, Social 29%, Governance 24%) and Evidence Verification module showing 100% AI-validated compliance.",
            "Built Add Commitment flow, Filters, Export, AI chat, and dark/light theme toggle.",
            "Stack: Next.js — deployed on Vercel."
          ]
        }
      ]
    },
    {
      company: "NATIONAL INSTITUTE OF ELECTRONICS & INFORMATION TECHNOLOGY (NIELIT)",
      title: "Software Developer",
      period: "Nov 2023 – Feb 2026 · 2 yrs 3 mos",
      location: "Delhi, India · On-site",
      intro: "Worked full-time on critical organization applications across document management, recruitment, and web platforms.",
      projects: [
        {
          title: "Central Repository",
          url: "https://drive.nielit.in",
          description: [
            "Built a Document Management application for the internal team using ReactJs, NodeJS, TypeScript, ShadCN UI, TailwindCSS, and MongoDB.",
            "Crafted end-to-end application from scratch with comprehensive authentication — login, password recovery, 2FA, and JWT session management.",
            "Implemented permission levels: View Only, View & Edit, and Open To All.",
            "Enforced 50 MB per-file upload limit and 16 GB maximum storage per user with Multer for efficient file handling.",
            "Optimized page load time by 90% by streaming data in chunks."
          ]
        },
        {
          title: "Recruitment Portal",
          url: "https://recruit.nielit.in",
          description: [
            "Revamped the recruitment portal with ReactJS and NodeJS, leveraging the existing MySQL database.",
            "Implemented a dynamic form generation component based on fields and groups received from the database.",
            "Integrated Redux for centralized data storage, cutting API calls by 30% and improving page rendering speed by 25%.",
            "Enabled customized validation handling for different group types, including tables and tables with add-row functionality."
          ]
        },
        {
          title: "NIELIT Main Blog Website",
          url: "https://nielit.gov.in",
          description: [
            "Generated dynamic pages based on components retrieved from MySQL procedures.",
            "Enabled Superadmin to assign Content Approvers and Content Creators for each subsite.",
            "Built a Text Editor for writing blogs and crafting static pages with prebuilt custom UI components."
          ]
        },
        {
          title: "NIELIT Digital University",
          url: "https://ndu.digital",
          description: [
            "Enabled course admins to upload questions and built the frontend with ReactJs integrated with backend APIs.",
            "Implemented third-party course integration mechanism."
          ]
        },
        {
          title: "Node API For Local Exam Server",
          description: [
            "Engineered Node.js APIs for a local exam server using Express and MySQL stored procedures.",
            "Used PM2 clustering to scale across CPU cores, boosting request capacity from 100–200 to 400–800 per minute.",
            "Integrated Winston with DailyRotateFile for logging, JWT authentication for security, and optimized image handling and bulk transactions."
          ]
        }
      ]
    }
  ];

  return (
    <main className="flex min-h-screen flex-col items-center p-7 bg-black text-white">
      <Header />
      
      <div className="max-w-3xl w-full mt-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12 gap-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
            Work Experience
          </h1>
          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-3 rounded-md text-white border border-blue-700 hover:border-blue-400 transition-all duration-300 shadow-lg hover:shadow-blue-900/20"
            >
              <span className="font-medium">View Resume</span>
              <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          )}
        </div>
        
        <div className="text-center mb-16">
          <p className="text-lg text-gray-300 leading-relaxed">
            Transforming ideas into seamless web solutions while constantly expanding my technical expertise.
          </p>
        </div>
        
        <div className="space-y-16 relative">
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
          {experienceData.map((role, index) => (
            <Role
              key={index}
              company={role.company}
              companyUrl={role.companyUrl}
              title={role.title}
              period={role.period}
              location={role.location}
              intro={role.intro}
              projects={role.projects}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Experience;