import { Header } from "@/components/Header";
import { IntroSection } from "@/components/IntroSection";
import { CrossingLines } from "@/subComponents/CrossingLines";
import Link from "next/link";
import { InlineSkills } from "@/components/InlineSkills"; // Import the new component

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-7 bg-black text-white">
      <Header />
      
      <div className="max-w-3xl w-full mt-10">
        {/* Hero Section */}
        <div className="relative mb-16">
          <CrossingLines />
          <div className="relative w-full overflow-visible">
            <IntroSection />
          </div>
        </div>
        
        {/* Tech Stack Section - Using custom inline component */}
        <div className="mt-16 mb-16">
          <InlineSkills />
        </div>
        
        {/* Call to Action Section */}
        <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link 
            href="/Projects" 
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-md text-white border border-blue-700 hover:border-blue-400 transition-all duration-300"
          >
            <span className="font-medium">View Projects</span>
            <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
          
          <Link 
            href="/Experience" 
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 px-8 py-3 rounded-md text-white border border-gray-700 hover:border-gray-500 transition-all duration-300"
          >
            <span className="font-medium">Work Experience</span>
            <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}