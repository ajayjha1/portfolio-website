import type { Metadata } from "next";
import localFont from "next/font/local";
import { Caveat, Patrick_Hand, Nunito } from "next/font/google";
import "./globals.css";
import { Dock } from "@/components/workshop/Dock";
import { DustField } from "@/components/workshop/DustField";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

/* Handwritten headline marker */
const caveat = Caveat({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-hand" });
/* Sticky-note / label hand */
const patrick = Patrick_Hand({ subsets: ["latin"], weight: "400", variable: "--font-marker" });
/* Warm readable body */
const nunito = Nunito({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "The Workshop — Ajay",
  description:
    "Pull up a chair. The workshop of Ajay — a digital craftsman who designs and builds AI products, experiments with ideas, and ships things people love.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} ${patrick.variable} ${nunito.variable} antialiased`}
      >
        <div className="workshop-surface workshop-grain min-h-screen font-body text-paper selection:bg-ember/30 selection:text-white">
          <DustField />
          {children}
          <Dock />
        </div>
      </body>
    </html>
  );
}
