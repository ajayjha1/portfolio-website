import { Header } from "@/components/Header";
import { NameText } from "@/components/NameText";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-7">
      <Header />
      <h1 className="text-7xl font-bold">Hello, World!</h1>
    </main>
  );
}
