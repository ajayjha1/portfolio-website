"use client";
import React from 'react';
import { Header } from '@/components/Header';
import Link from 'next/link';

interface ContactLinkProps {
    href: string;
    icon: React.ReactNode;
    label: string;
  }

const ContactLink: React.FC<ContactLinkProps> = ({ href, icon, label }) => (
  <Link 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-4 p-6 bg-gray-900/50 rounded-lg border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/10 group"
  >
    {icon}
    <div>
      <div className="font-semibold text-lg text-white group-hover:text-blue-300 transition-colors">{label}</div>
    </div>
    <div className="ml-auto">
      <span className="text-xl text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all inline-block">
        →
      </span>
    </div>
  </Link>
);

const Contact = () => {
  return (
    <main className="flex min-h-screen flex-col items-center p-7 bg-black text-white">
      <Header />
      
      <div className="max-w-3xl w-full mt-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">Contact</h1>
        
        <p className="text-lg text-gray-300 mb-12">
          Feel free to reach out to me through any of these channels.
        </p>
        
        <div className="space-y-4">
          <ContactLink 
            href="mailto:ajayjha1886@gmail.com"
            label="ajayjha1886@gmail.com"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            }
          />
          
          <ContactLink 
            href="https://www.linkedin.com/in/ajay-jha-1a5ab9173" // Replace with your actual LinkedIn URL
            label="LinkedIn"
            icon={
              <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            }
          />
          
          <ContactLink 
            href="https://github.com/ajayjha1" // Replace with your actual GitHub URL
            label="GitHub"
            icon={
              <svg className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            }
          />
        </div>
        
        <div className="mt-20 border-t border-gray-800 pt-10 text-center">
          <p className="text-gray-400">Let's build something amazing together.</p>
        </div>
      </div>
    </main>
  );
};

export default Contact;