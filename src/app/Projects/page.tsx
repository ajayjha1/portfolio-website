"use client";
import React, { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  period: string;
  category: string;
  description: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  videoUrl: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  "M37 Labs":      "bg-blue-950/60 text-blue-300 border-blue-800",
  "NIELIT":        "bg-purple-950/60 text-purple-300 border-purple-800",
  "AARN Logistics":"bg-orange-950/60 text-orange-300 border-orange-800",
  "Side Project":  "bg-green-950/60 text-green-300 border-green-800",
};

function categoryColor(cat: string) {
  return CATEGORY_COLORS[cat] || "bg-gray-800 text-gray-300 border-gray-700";
}

function VideoCard({ project }: { project: Project }) {
  const [showVideo, setShowVideo]   = useState(false);
  const [videoError, setVideoError] = useState(false);

  return (
    <div className="group bg-gray-900/40 border border-gray-800 rounded-xl overflow-hidden hover:border-blue-800/60 transition-all duration-300">
      {/* Media area — only mounts when user clicks Watch Demo */}
      {showVideo && project.videoUrl && (
        <div className="relative bg-black border-b border-gray-800">
          {videoError ? (
            <div className="aspect-video flex flex-col items-center justify-center gap-2 text-center px-8">
              <span className="text-gray-600 text-3xl">⚠</span>
              <p className="text-sm text-gray-500">Video file not found.</p>
              <p className="text-xs text-gray-700 font-mono">
                Place file at <span className="text-gray-500">public{project.videoUrl}</span>
              </p>
              <button
                onClick={() => { setShowVideo(false); setVideoError(false); }}
                className="mt-2 text-xs text-blue-500 hover:text-blue-400 underline"
              >
                Dismiss
              </button>
            </div>
          ) : (
            <video
              className="w-full aspect-video object-contain"
              controls
              autoPlay
              playsInline
              onError={() => setVideoError(true)}
            >
              <source src={project.videoUrl} type="video/mp4" />
            </video>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-1">{project.title}</h3>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${categoryColor(project.category)}`}>
                {project.category}
              </span>
              <span className="text-xs text-gray-600 font-mono">{project.period}</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-400 leading-relaxed mb-4">{project.description}</p>

        {/* Tech */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map(t => (
            <span key={t} className="text-xs px-2 py-0.5 bg-gray-900 border border-gray-700 rounded-md text-gray-300">
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-2">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-xs px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors font-medium">
              Live <span className="transition-transform group-hover:translate-x-0.5">↗</span>
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-xs px-3 py-1.5 border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white rounded-lg transition-colors">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </a>
          )}
          {project.videoUrl && !showVideo && (
            <button onClick={() => { setVideoError(false); setShowVideo(true); }}
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 border border-gray-700 hover:border-blue-700 text-gray-300 hover:text-blue-300 rounded-lg transition-colors">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              Watch Demo
            </button>
          )}
          {showVideo && (
            <button onClick={() => { setShowVideo(false); setVideoError(false); }}
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 border border-gray-700 text-gray-400 rounded-lg transition-colors hover:border-gray-500">
              Hide Video
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const CATEGORIES = ["All", "M37 Labs", "NIELIT", "AARN Logistics", "Side Project"];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState("All");

  useEffect(() => {
    fetch("/api/settings")
      .then(r => r.json())
      .then(d => { setProjects(d.projects || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = filter === "All" ? projects : projects.filter(p => p.category === filter);

  return (
    <main className="flex min-h-screen flex-col items-center p-7 bg-black text-white">
      <Header />

      <div className="max-w-3xl w-full mt-10">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-white to-gray-400 text-transparent bg-clip-text mb-4">
            Projects
          </h1>
          <p className="text-gray-400 text-lg">Things I&apos;ve built — at work, for clients, and on my own time.</p>
          <div className="h-px bg-gradient-to-r from-blue-700 via-gray-700 to-transparent mt-6" />
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors font-medium ${filter === cat ? "bg-blue-600 border-blue-600 text-white" : "border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white"}`}>
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-gray-800 rounded-xl">
            <p className="text-gray-600">No projects found.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filtered.map(p => <VideoCard key={p.id} project={p} />)}
          </div>
        )}

        <div className="mt-16 pt-10 border-t border-gray-900 text-center">
          <p className="text-gray-600 text-sm mb-4">Want to see more context?</p>
          <Link href="/Experience" className="group inline-flex items-center gap-2 border border-gray-700 hover:border-gray-500 px-5 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:text-white transition-all duration-200">
            View Work Experience <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
