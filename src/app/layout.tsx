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

/* Flip to false to bring the real site back. */
const COMING_SOON = true;

function ComingSoon() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-marker text-sm uppercase tracking-[0.3em] text-wood-300/70">The Workshop</p>
      <h1 className="font-hand text-6xl text-ember sm:text-7xl">Coming soon</h1>
      <p className="max-w-md font-body text-wood-200/80">
        Sawdust everywhere, workbench half-built. Ajay is in here putting it together — check back shortly.
      </p>
    </main>
  );
}

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
          {COMING_SOON ? (
            <ComingSoon />
          ) : (
            <>
              {children}
              <Dock />
            </>
          )}
        </div>
      </body>
    </html>
  );
}
