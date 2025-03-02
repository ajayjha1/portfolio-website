"use client";
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import Link from 'next/link';
import Image from 'next/image';
// For local imports like this to work, you need to configure next.config.js
// See comment below component

// Badge component for tech stacks
const TechBadge = ({ tech }) => (
  <span className="inline-block bg-gray-800 text-gray-300 rounded-full px-3 py-1 text-sm font-medium mr-2 mb-2">
    {tech}
  </span>
);

// Button component for links
const Button = ({ children, href, icon = false }) => (
  <Link 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className={`group inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md text-white border border-gray-700 transition-all duration-300 ${icon ? 'mr-2' : ''}`}
  >
    {icon && 
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    }
    <span>{children}</span>
    {!icon && <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>}
  </Link>
);

// Video button component
const VideoButton = ({ onClick }) => (
  <button 
    onClick={onClick}
    className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white border border-blue-700 transition-all duration-300"
  >
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
    <span>Watch Demo</span>
  </button>
);

// Project card component
const ProjectCard = ({ title, period, description, techStack, imageUrl, videoUrl, sourceLink, demoLink }) => {
  const [showVideo, setShowVideo] = useState(false);
  
  // Use placeholder for missing images
  const placeholderImage = `https://placehold.co/600x300/1a1a1a/ffffff?text=${encodeURIComponent(title)}`;
  const displayImage = imageUrl || placeholderImage;
  
  return (
    <div className="bg-gray-900/50 rounded-lg overflow-hidden border border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/10 hover:border-gray-700">
      <div className="relative bg-gray-800 aspect-video overflow-hidden">
        {!showVideo && (
          <div className="w-full h-full overflow-hidden">
            {displayImage.startsWith('http') ? (
              <img 
                src={displayImage} 
                alt={title} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            ) : (
              <Image 
                src={displayImage} 
                alt={title} 
                width={600} 
                height={300}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            )}
            {videoUrl && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button 
                  onClick={() => setShowVideo(true)}
                  className="bg-black/70 text-white rounded-full p-4 hover:bg-blue-600/80 transition-colors"
                >
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
        
        {showVideo && videoUrl && (
          <div className="w-full h-full bg-black flex items-center justify-center">
            <video 
              className="max-w-full max-h-[500px]" 
              controls
              autoPlay
              playsInline
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-2xl font-bold text-white">{title}</h3>
        </div>
        
        <div className="mb-4 text-gray-400 text-sm">{period}</div>
        
        <p className="text-gray-300 mb-4">{description}</p>
        
        <div className="mb-6">
          {techStack.map((tech, index) => (
            <TechBadge key={index} tech={tech} />
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {sourceLink && <Button href={sourceLink} icon={true}>Source Code</Button>}
          {demoLink && <Button href={demoLink}>Live Demo</Button>}
          {videoUrl && !showVideo && <VideoButton onClick={() => setShowVideo(true)} />}
          {showVideo && <button 
            onClick={() => setShowVideo(false)} 
            className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md text-white"
          >
            Show Thumbnail
          </button>}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  // Project data
  const projects = [
    {
      title: "Central Repository",
      period: "Nov 2023 - Feb 2024",
      description: "A document management application for NIELIT enabling users to create folders, upload documents, and share them with specific permission levels within the organization.",
      techStack: ["MERN Stack", "JWT", "Multer", "Express", "MongoDB", "React"],
      // Use placeholder images until you have real images
      imageUrl: null,
      // Use an absolute path if video is in public folder
      videoUrl: "/videos/CRPDemo.mp4",
      sourceLink: "https://github.com/yourusername/central-repository",
      demoLink: "https://drive.nielit.in"
    },
    {
      title: "Recruitment Portal",
      period: "Mar 2024 - Present",
      description: "Revamped recruitment portal with dynamic form generation based on database configurations, with centralized data storage and custom validation handling.",
      techStack: ["ReactJS", "NodeJS", "MySQL", "Redux", "TailwindCSS"],
      imageUrl: null,
      sourceLink: "https://github.com/yourusername/recruitment-portal",
      demoLink: "https://recruit.nielit.in"
    },
    {
      title: "Portfolio Website",
      period: "Jan 2024",
      description: "Personal portfolio website built with Next.js and TailwindCSS to showcase my projects and skills.",
      techStack: ["Next.js", "TailwindCSS", "React", "Vercel"],
      imageUrl: null,
      sourceLink: "https://github.com/yourusername/portfolio",
      demoLink: "#"
    }
  ];

  return (
    <main className="flex min-h-screen flex-col items-center p-7 bg-black text-white">
      <Header />
      
      <div className="max-w-4xl w-full mt-10">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-4">Projects</h1>
        
        <div className="text-center mb-6 relative">
          <p className="text-lg text-gray-300">Projects I've crafted.</p>
          <div className="h-1 w-32 bg-gradient-to-r from-purple-800 to-transparent mx-auto mt-4"></div>
        </div>
        
        <h2 className="text-3xl font-bold mt-16 mb-8">Top Projects</h2>
        
        <div className="grid md:grid-cols-1 gap-8 mb-16">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index}
              title={project.title}
              period={project.period}
              description={project.description}
              techStack={project.techStack}
              imageUrl={project.imageUrl}
              videoUrl={project.videoUrl}
              sourceLink={project.sourceLink}
              demoLink={project.demoLink}
            />
          ))}
        </div>
        
        <div className="text-center mt-8 py-8">
          <p className="text-gray-400 mb-4">Interested in my work?</p>
          <Link 
            href="/experience" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
          >
            View Work Experience
            <svg className="ml-2 -mr-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Projects;

