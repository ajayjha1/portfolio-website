"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HeroHotspot, type Hotspot } from "./HeroHotspot";

const HERO_WIDE = "/workshop/hero-desk.png";
const HERO_PORTRAIT = "/workshop/hero-desk-mobile.png";

/* The room you look into. The art layer is alpha-masked so its edges
   dissolve into the page; hotspots + steam live above the mask. */
function Panel({
  img,
  aspect,
  spots,
  bright,
  glow,
  steamAt,
}: {
  img: string;
  aspect: string;
  spots: Hotspot[];
  bright: boolean;
  glow: string;
  steamAt: { x: number; y: number };
}) {
  const [hasArt, setHasArt] = useState(true);
  return (
    <div className={`relative w-full ${aspect}`}>
      {/* masked art layer — no visible rectangle */}
      <div className="edge-feather absolute inset-0 overflow-hidden">
        {/* fallback if art missing */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(120% 100% at 70% 10%, #3a2a1c, #1c130d)" }}
        >
          <p className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-marker text-sm text-wood-300/40">
            workshop illustration
          </p>
        </div>

        {hasArt && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={img}
            alt="Ajay at his workshop desk — blueprints, sticky notes, a warm lamp, coffee and an open notebook"
            onError={() => setHasArt(false)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {/* lamp light + dim overlay */}
        <div
          className="pointer-events-none absolute inset-0 animate-lamp-flicker transition-opacity duration-700"
          style={{ background: glow, opacity: bright ? 1 : 0.1 }}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-black transition-opacity duration-700"
          style={{ opacity: bright ? 0 : 0.55 }}
        />
        {/* inner vignette — depth, like looking into a lit room */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ boxShadow: "inset 0 0 120px 30px rgba(0,0,0,0.6)" }}
        />
      </div>

      {/* coffee steam (above the mask) */}
      <div
        className="pointer-events-none absolute z-10"
        style={{ left: `${steamAt.x}%`, top: `${steamAt.y}%` }}
      >
        <span className="steam" style={{ left: "-6px", animationDelay: "0s" }} />
        <span className="steam" style={{ left: "2px", animationDelay: "1.4s" }} />
        <span className="steam" style={{ left: "10px", animationDelay: "2.6s" }} />
      </div>

      {/* hotspots (above the mask, always crisp) */}
      {spots.map((s) => (
        <HeroHotspot key={s.id} spot={s} />
      ))}
    </div>
  );
}

export function WorkshopHero() {
  const [bright, setBright] = useState(true);
  const lampLabel = bright ? "Click to dim the lamp" : "Let there be light";

  const wideSpots: Hotspot[] = [
    { id: "lamp", x: 79, y: 20, label: lampLabel, onClick: () => setBright((b) => !b), side: "bottom" },
    { id: "blueprint", x: 64, y: 15, label: "Architecture sketches →", href: "/Blueprints", side: "bottom" },
    { id: "sticky", x: 40, y: 31, label: "MMA keeps me sharp 🥋", href: "/Playground", side: "bottom" },
    { id: "mug", x: 17, y: 65, label: "Caffeine level: 92% ☕" },
    { id: "notebook", x: 46, y: 74, label: "Peek at my thoughts →", href: "/Blog" },
    { id: "crate", x: 79, y: 63, label: "Work in progress…" },
  ];

  const portraitSpots: Hotspot[] = [
    { id: "lamp-m", x: 78, y: 33, label: lampLabel, onClick: () => setBright((b) => !b), side: "bottom" },
    { id: "blueprint-m", x: 68, y: 22, label: "Architecture sketches →", href: "/Blueprints", side: "bottom" },
    { id: "sticky-m", x: 22, y: 30, label: "MMA keeps me sharp 🥋", href: "/Playground", side: "bottom" },
    { id: "mug-m", x: 15, y: 58, label: "Caffeine level: 92% ☕" },
    { id: "notebook-m", x: 45, y: 63, label: "Peek at my thoughts →", href: "/Blog" },
    { id: "crate-m", x: 78, y: 58, label: "Work in progress…" },
  ];

  return (
    <section className="relative">
      {/* warm ambient light washing the whole hero (part of the room, not the image) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[-10%] h-[150%] w-[95%] animate-lamp-flicker"
        style={{
          background:
            "radial-gradient(55% 55% at 72% 22%, rgba(255,150,45,0.20), rgba(255,138,0,0.06) 42%, transparent 72%)",
          filter: "blur(8px)",
          opacity: bright ? 1 : 0.25,
          transition: "opacity 0.7s",
        }}
      />
      {/* soft grounding shadow under the desk to connect to projects */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[-8%] h-40"
        style={{ background: "radial-gradient(60% 100% at 65% 100%, rgba(0,0,0,0.45), transparent 70%)" }}
      />

      {/* status pill */}
      <div className="relative mb-5 flex justify-end lg:mb-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-wood-900/50 px-4 py-2 font-marker text-sm text-paper backdrop-blur-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400/70" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
          </span>
          Open for new ideas
        </span>
      </div>

      <div className="relative grid items-center gap-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-0">
        {/* ── Headline column ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <h1 className="font-hand text-6xl leading-[0.9] text-paper drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] sm:text-7xl xl:text-8xl">
            Hey, I&apos;m{" "}
            <span className="whitespace-nowrap">
              <span className="relative inline-block">
                Ajay
                <span className="absolute -bottom-1 left-0 h-1.5 w-full rounded-full bg-ember shadow-[0_0_12px_rgba(255,138,0,0.6)]" />
              </span>
              .
            </span>
          </h1>
          <p className="mt-6 max-w-sm font-body text-lg leading-relaxed text-paper/80">
            I build AI products, experiment with ideas, and ship things people love.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/Projects"
              className="btn-wood group inline-flex items-center gap-2.5 px-7 py-4 font-body text-sm font-semibold"
            >
              Pull up a chair
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              href="#projects"
              className="btn-paper relative inline-flex rotate-[-1.5deg] items-center gap-2 px-6 py-3.5 font-marker text-base"
            >
              {/* tape corners */}
              <span className="absolute -left-2 -top-2 h-3 w-6 -rotate-45 rounded-sm bg-paper-aged/60" />
              <span className="absolute -right-2 -bottom-2 h-3 w-6 -rotate-45 rounded-sm bg-paper-aged/60" />
              Pick up a project
            </Link>
          </div>
          <p className="mt-9 font-marker text-sm text-wood-300/60">
            psst — the desk is alive. hover the glowing spots.
          </p>
        </motion.div>

        {/* ── The room — larger, pushed to the edge, dissolving into the page ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="relative z-0 lg:-mr-16 lg:-mt-16 lg:scale-[1.12] xl:-mr-32 xl:scale-[1.16]"
        >
          {/* overflowing pinned note — breaks the rectangle */}
          <motion.div
            initial={{ opacity: 0, y: -10, rotate: -8 }}
            animate={{ opacity: 1, y: 0, rotate: -8 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 14 }}
            whileHover={{ rotate: -3, y: -3 }}
            className="sticky-note absolute left-1 top-2 z-20 hidden bg-paper-sticky px-3 py-2 font-marker text-[0.8rem] leading-tight text-wood-800 sm:block"
          >
            build in
            <br />
            public ✦
          </motion.div>

          {/* portrait (mobile) */}
          <div className="mx-auto max-w-sm lg:hidden">
            <Panel
              img={HERO_PORTRAIT}
              aspect="aspect-[864/1821]"
              spots={portraitSpots}
              bright={bright}
              glow="radial-gradient(35% 22% at 78% 33%, rgba(255,176,84,0.45), transparent 60%)"
              steamAt={{ x: 15, y: 52 }}
            />
          </div>
          {/* wide (desktop) */}
          <div className="hidden lg:block">
            <Panel
              img={HERO_WIDE}
              aspect="aspect-[3/2]"
              spots={wideSpots}
              bright={bright}
              glow="radial-gradient(45% 45% at 79% 22%, rgba(255,176,84,0.4), transparent 60%)"
              steamAt={{ x: 16, y: 58 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
