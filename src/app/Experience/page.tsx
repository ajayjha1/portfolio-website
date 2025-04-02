"use client";
import React from 'react';
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
  title: string;
  period: string;
  location: string;
  projects: ProjectProps[];
}

// Role component for individual job experiences
const Role: React.FC<RoleProps> = ({ company, title, period, location, projects }) => (
  <div className="relative">
    <div className="flex items-center mb-4 justify-center text-center">
      <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">{company}</h2>
      <span className="ml-2 text-xl text-blue-400">↗</span>
    </div>
    
    <div className="bg-blue-500/10 rounded-full px-4 py-1 mb-6 inline-block mx-auto flex items-center justify-center">
      <p className="text-blue-300 text-sm font-medium text-center">{title} | {period} | {location}</p>
    </div>
    
    <p className="mb-8 text-center text-gray-300 max-w-2xl mx-auto">
      Working as a full-time Junior Software Developer on critical organization applications:
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
  title: string;
  period: string;
  location: string;
  projects: ProjectProps[];
}

const Experience: React.FC = () => {
  // Data for experience section
  const experienceData: ExperienceData[] = [
    {
      company: "NATIONAL INSTITUTE OF ELECTRONICS & INFORMATION TECHNOLOGY (NIELIT)",
      title: "Junior Software Developer",
      period: "Nov 2023 - Present · 1 yr 5 mos",
      location: "Delhi, India · On-site",
      projects: [
        {
          title: "Central Repository",
          url: "https://drive.nielit.in",
          description: [
            "Developed a document management application for the organization using the MERN Stack.",
            "Enabled users to create folders, upload documents, and share them within the organization.",
            "Implemented permission levels: View Only, View and Edit, and Open to All.",
            "Integrated JWT Authentication for secure and controlled access.",
            "Enforced a 50 MB upload limit per file and a total upload limit of 16 GB per user.",
            "Utilized Multer for efficient file handling.",
            "Created User Management page for admin.",
            "Added an Archive Document feature for document management.",
            "Optimized performance by streaming data in chunks to reduce page load time."
          ]
        },
        {
          title: "Recruitment Portal",
          url: "https://recruit.nielit.in",
          description: [
            "Revamped the recruitment portal with ReactJS and NodeJS, leveraging the existing MySQL database.",
            "Created a dynamic form generation component based on fields and groups received from the database.",
            "Integrated Redux for centralized data storage, ensuring consistent data flow across the application.",
            "Customized validation handling for different group types, such as tables and tables with add row functionality."
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
          <Link 
            href="https://drive.google.com/file/d/1CsooTAMIgD-_16Dm49sVIxicofRmFl4S/view?usp=sharing" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-3 rounded-md text-white border border-blue-700 hover:border-blue-400 transition-all duration-300 shadow-lg hover:shadow-blue-900/20"
          >
            <span className="font-medium">View Resume</span>
            <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
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
              title={role.title}
              period={role.period}
              location={role.location}
              projects={role.projects}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Experience;