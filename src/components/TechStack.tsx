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
    <Card className="bg-black text-white w-[800px]">
      <CardHeader>
        <CardTitle>Tech Stack</CardTitle>
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent>
        <div className="flex space-x-1">
          <Image src={HTMLSvg} alt="HTML" width={50} height={50} />
          <Image src={CSSSvg} alt="CSS" width={50} height={50} />
          <Image src={ExpressJsSvg} alt="ExpressJs" width={50} height={50} className="invert"/>
          <Image src={JavascriptSvg} alt="Javascript" width={50} height={50} />
          <Image src={NextJsSvg} alt="NextJs" width={50} height={50} />
          <Image src={TypescriptSvg} alt="Typescript" width={50} height={50} />
          <Image src={ReactSvg} alt="ReactJs" width={50} height={50} />
          <Image src={TailwindSvg} alt="Tailwind" width={50} height={50} />
        </div>
        <div className="flex space-x-1 pt-5" >
          <Image src={PostgresSvg} alt="Postgres" width={50} height={50} />
          <Image src={MongoDBSvg} alt="MongoDB" width={50} height={50} />
          <Image src={VSCodeSvg} alt="VSCode" width={50} height={50} />
          <Image src={GitSvg} alt="Git" width={50} height={50} />
          <Image src={Tailwind2Svg} alt="Tailwind2" width={50} height={50} />
          <Image src={GithubSvg} alt="Github" width={50} height={50} className="invert" />
          <Image src={PostmanSvg} alt="Postman" width={50} height={50} className="invert"/>
          <Image src={DockerSvg} alt="Docker" width={50} height={50} />
        </div>
      </CardContent>
      {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
    </Card>
  );
};
