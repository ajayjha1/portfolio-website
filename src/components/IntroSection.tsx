"use client"; // Mark this component as a Client Component

import React from "react";
import Image from "next/image";
import Ajay from "../images/Ajay.png";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

export const IntroSection = () => {
  const router = useRouter();
  const handleNavigation = () => {
    router.push('/Projects'); // Navigate to the /Projects page
  };
  return (
    <div className="relative text-white"> {/* Make the container relative for absolute positioning */}
      <div className="">
        <div className="flex">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-roboto-black mt-5">
            Hello&nbsp;
          </h1>
          <div className="ml-4">
            {/* Rounded image in the top-right corner */}
            <Image
              src={Ajay}
              alt="Ajay"
              width={100}
              height={100}
              className="rounded-full absolute top-0 right-0"
            />
           <span className="inline-block animate-wave top-0 right-0">👋</span>
          </div>
        </div>
        <p className="text-[1.2rem] mt-20">
          I'm Ajay, A Full Stack Developer based in Delhi, India.<br />
          I specialize in building responsive web applications that are
          user-friendly and efficient using ReactJs/NextJs, NodeJs, MySQL/MongoDB.<br />
          I'm passionate about developing software solutions that address
          real-world challenges.<br />
        </p>
        <p className="text-[1.2rem] mt-4">
          Explore My Work <span className="underline" onClick={handleNavigation} >Here</span>
        </p>
      </div>
    </div>
  );
};
