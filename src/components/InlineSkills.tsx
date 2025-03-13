"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";
import HTMLSvg from "@/images/HTML.svg"
import CSSSvg from "@/images/CSS.svg"
import ExpressJsSvg from "@/images/Expressjs.svg"
import JavascriptSvg from "@/images/Javascript.svg"
import NextJsSvg from "@/images/NextJs.svg"
import TypescriptSvg from "@/images/Typescript.svg"
import ReactSvg from "@/images/React.svg"
import TailwindSvg from "@/images/Tailwind.svg"
import Tailwind2Svg from "@/images/Tailwind2.svg"
import PostgresSvg from "@/images/Postgres.svg"
import MongoDBSvg from "@/images/Mongodb.svg"
import VSCodeSvg from "@/images/VSCode.svg"
import GitSvg from "@/images/Git.svg"
import GithubSvg from "@/images/Github.svg"
import PostmanSvg from "@/images/Postman.svg"
import DockerSvg from "@/images/Docker.svg"

// Interface for tech item
interface TechItem {
  src: StaticImageData;
  alt: string;
  invert: boolean;
}

// Interface for TechIcon props
interface TechIconProps {
  tech: TechItem;
}

export const InlineSkills: React.FC = () => {
  // Define tech categories
  const frontendTech: TechItem[] = [
    { src: HTMLSvg, alt: "HTML", invert: false },
    { src: CSSSvg, alt: "CSS", invert: false },
    { src: JavascriptSvg, alt: "Javascript", invert: false },
    { src: ReactSvg, alt: "ReactJs", invert: false },
    { src: NextJsSvg, alt: "NextJs", invert: false },
    { src: TypescriptSvg, alt: "TypeScript", invert: false },
    { src: TailwindSvg, alt: "Tailwind", invert: false },
    { src: Tailwind2Svg, alt: "Tailwind", invert: false },
  ];
  
  const backendTech: TechItem[] = [
    { src: ExpressJsSvg, alt: "ExpressJs", invert: true },
    { src: PostgresSvg, alt: "PostgreSQL", invert: false },
    { src: MongoDBSvg, alt: "MongoDB", invert: false },
  ];
  
  const tools: TechItem[] = [
    { src: VSCodeSvg, alt: "VS Code", invert: false },
    { src: GitSvg, alt: "Git", invert: false },
    { src: GithubSvg, alt: "Github", invert: true },
    { src: PostmanSvg, alt: "Postman", invert: true },
    { src: DockerSvg, alt: "Docker", invert: false },
  ];

  const TechIcon: React.FC<TechIconProps> = ({ tech }) => (
    <div className="group flex flex-col items-center">
      <div className="bg-gray-900 p-2 rounded-lg flex items-center justify-center h-14 w-14 border border-gray-800 hover:border-gray-700 transition-all">
        <Image 
          src={tech.src} 
          alt={tech.alt} 
          width={40} 
          height={40} 
          className={`${tech.invert ? 'invert' : ''} transition-transform duration-300 group-hover:scale-110`} 
        />
      </div>
      <span className="mt-1 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {tech.alt}
      </span>
    </div>
  );

  return (
    <div className="w-full max-w-3xl">
      <h2 className="text-2xl font-bold mb-6 inline-block relative">
        Tech Stack
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></span>
      </h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-md text-gray-400 mb-3">Frontend</h3>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {frontendTech.map((tech, index) => (
              <TechIcon key={index} tech={tech} />
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-md text-gray-400 mb-3">Backend</h3>
          <div className="grid grid-cols-3 gap-2">
            {backendTech.map((tech, index) => (
              <TechIcon key={index} tech={tech} />
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-md text-gray-400 mb-3">Tools</h3>
          <div className="grid grid-cols-5 gap-2">
            {tools.map((tech, index) => (
              <TechIcon key={index} tech={tech} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InlineSkills;