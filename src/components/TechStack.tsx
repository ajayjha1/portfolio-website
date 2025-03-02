"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import Image from "next/image";

export const TechStack = () => {
  return (
    <Card className="bg-black text-white w-[550px] border-gray-800 max-w-screen">
      <CardHeader>
        <CardTitle>Tech Stack</CardTitle>
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent>
        <div className="flex space-x-1">
          <Image src={HTMLSvg} alt="HTML" width={60} height={60} />
          <Image src={CSSSvg} alt="CSS" width={60} height={60} />
          <Image src={ExpressJsSvg} alt="ExpressJs" width={60} height={60} className="invert"/>
          <Image src={JavascriptSvg} alt="Javascript" width={60} height={60} />
          <Image src={NextJsSvg} alt="NextJs" width={60} height={60} />
          <Image src={TypescriptSvg} alt="Typescript" width={60} height={60} />
          <Image src={ReactSvg} alt="ReactJs" width={60} height={60} />
          <Image src={TailwindSvg} alt="Tailwind" width={60} height={60} />
        </div>
        <div className="flex space-x-1 pt-5">
          <Image src={PostgresSvg} alt="Postgres" width={60} height={60} />
          <Image src={MongoDBSvg} alt="MongoDB" width={60} height={60} />
          <Image src={VSCodeSvg} alt="VSCode" width={60} height={60} />
          <Image src={GitSvg} alt="Git" width={60} height={60} />
          <Image src={Tailwind2Svg} alt="Tailwind2" width={60} height={60} />
          <Image src={GithubSvg} alt="Github" width={60} height={60} className="invert"/>
          <Image src={PostmanSvg} alt="Postman" width={60} height={60} className="invert"/>
          <Image src={DockerSvg} alt="Docker" width={60} height={60} />
        </div>
      </CardContent>
      {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
    </Card>
  );
};
