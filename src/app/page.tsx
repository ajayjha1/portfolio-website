import { Header } from "@/components/Header";
import { IntroSection } from "@/components/IntroSection";
import { NameText } from "@/components/NameText";
import { TechStack } from "@/components/TechStack";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-7 bg-black">
      <Header />
      <div className="max-w-3xl">
        <IntroSection />
      </div>
      <div className="max-w-3xl min-w-3xl mt-5">
        <TechStack />
      </div>
    </main>
  );
}
