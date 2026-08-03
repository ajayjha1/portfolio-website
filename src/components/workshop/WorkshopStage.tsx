"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PROJECTS } from "./projects";
import { HeroHotspot, type Hotspot } from "./HeroHotspot";

const BLANK = "/workshop/hero-workshop-blank-without-clipboard.png";
const CLIPBOARD = "/workshop/clipboard.png";

/* Absolutely-positioned slot, measured as % of the fixed 3:2 stage. */
function Slot({
  x,
  y,
  w,
  h,
  className = "",
  style,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div
      className={`absolute ${className}`}
      style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: h ? `${h}%` : undefined, ...style }}
    >
      {children}
    </div>
  );
}

/* A wooden clipboard (clipboard.png) with the project printed on its paper. */
function ProjectClipboard({ p, i, x }: { p: (typeof PROJECTS)[number]; i: number; x: number }) {
  const [ok, setOk] = useState(true);
  // clipboard.png is 1085x1450 → aspect 0.748 ; width 12.8% → height ≈ 25.6% of a 3:2 stage
  return (
    <Slot x={x} y={63.5} w={13.2} h={26.4}>
      <div className="animate-fade-up h-full w-full" style={{ animationDelay: `${0.3 + i * 0.08}s` }}>
        <Link href={p.href} className="clip-card group relative block h-full w-full">
          {/* clipboard graphic */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={CLIPBOARD} alt="" className="absolute inset-0 h-full w-full object-contain" />

          {/* content printed on the paper */}
          <div className="absolute inset-0 flex flex-col" style={{ padding: "15% 13% 9% 13%" }}>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[2px] bg-wood-900 shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
              {ok ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={p.thumb} alt="" onError={() => setOk(false)} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center" style={{ background: "radial-gradient(120% 100% at 20% 0%, #3a2a1c, #1c130d)" }}>
                  <span className="text-[0.85cqw] tracking-widest text-wood-300/50">{p.category.toUpperCase()}</span>
                </div>
              )}
              <span className="absolute left-1 top-1 rounded bg-wood-900/85 px-[0.4cqw] py-[0.12cqw] text-[0.62cqw] font-medium text-paper">
                {p.category}
              </span>
            </div>
            <h3 className="mt-[6%] font-body text-[0.95cqw] font-extrabold leading-[1.05] text-[#3a2413] group-hover:text-ember-deep">
              {p.title}
            </h3>
            <p className="mt-[4%] font-body text-[0.74cqw] font-medium leading-snug text-[#5a4326]">{p.blurb}</p>
            <div className="mt-auto flex flex-wrap gap-[0.3cqw] pt-[4%]">
              {p.tags.map((t) => (
                <span key={t} className="rounded bg-wood-700/15 px-[0.42cqw] py-[0.06cqw] font-mono text-[0.6cqw] text-wood-700">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Link>
      </div>
    </Slot>
  );
}

function CalibrationGrid() {
  const lines = Array.from({ length: 19 }, (_, i) => (i + 1) * 5);
  return (
    <div className="pointer-events-none absolute inset-0 z-50">
      {lines.map((p) => (
        <div key={`v${p}`} className={`absolute top-0 h-full ${p % 10 === 0 ? "border-l-2 border-cyan-400" : "border-l border-cyan-400/50"}`} style={{ left: `${p}%` }}>
          <span className="absolute top-1 -ml-2.5 bg-black px-1 text-[11px] font-bold text-cyan-300">{p}</span>
        </div>
      ))}
      {lines.map((p) => (
        <div key={`h${p}`} className={`absolute left-0 w-full ${p % 10 === 0 ? "border-t-2 border-fuchsia-400" : "border-t border-fuchsia-400/50"}`} style={{ top: `${p}%` }}>
          <span className="absolute left-16 -mt-2 bg-black px-1 text-[11px] font-bold text-fuchsia-300">{p}</span>
        </div>
      ))}
    </div>
  );
}

export function WorkshopStage() {
  const [bright, setBright] = useState(true);
  const [hasArt, setHasArt] = useState(true);
  const [grid, setGrid] = useState(false);
  useEffect(() => {
    if (window.location.search.includes("grid")) setGrid(true);
  }, []);

  const cardX = [14.2, 27.4, 40.6, 53.8, 67.0];

  const spots: Hotspot[] = [
    { id: "lamp", x: 84, y: 13, label: bright ? "Click to dim the lamp" : "Let there be light", onClick: () => setBright((b) => !b), side: "bottom" },
    { id: "blueprint", x: 58, y: 18, label: "Architecture sketches →", href: "/Blueprints", side: "bottom" },
    { id: "mug", x: 45, y: 50, label: "Caffeine level: 92% ☕" },
    { id: "notebook", x: 60, y: 55, label: "Peek at my thoughts →", href: "/Blog" },
  ];

  if (grid) {
    return (
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3 / 2" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={BLANK} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <CalibrationGrid />
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden" style={{ containerType: "inline-size", aspectRatio: "3 / 2" }}>
      {/* backdrop */}
      {hasArt ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={BLANK} alt="Ajay's workshop" onError={() => setHasArt(false)} className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div className="absolute inset-0" style={{ background: "radial-gradient(120% 100% at 65% 10%, #3a2a1c, #1c130d)" }} />
      )}

      {/* lamp light + dim overlay */}
      <div
        className="pointer-events-none absolute inset-0 animate-lamp-flicker transition-opacity duration-700"
        style={{ background: "radial-gradient(28% 32% at 84% 15%, rgba(255,176,84,0.42), transparent 60%)", opacity: bright ? 1 : 0.12 }}
      />
      <div className="pointer-events-none absolute inset-0 bg-black transition-opacity duration-700" style={{ opacity: bright ? 0 : 0.5 }} />
      {/* gentle warm wash over the desk so the clipboards read clearly */}
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(80% 45% at 45% 82%, rgba(255,196,120,0.12), transparent 70%)" }} />

      {/* coffee steam over the mug */}
      <div className="pointer-events-none absolute z-10" style={{ left: "44%", top: "44%" }}>
        <span className="steam" style={{ left: "-6px", animationDelay: "0s" }} />
        <span className="steam" style={{ left: "2px", animationDelay: "1.6s" }} />
      </div>

      {/* ── THE WORKSHOP hanging sign ── */}
      <Slot x={15} y={3} w={28} h={11} className="flex flex-col items-center justify-center text-center">
        <span className="font-hand text-[2.2cqw] leading-none text-wood-100/95" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>
          THE WORKSHOP
        </span>
        <span className="mt-[0.3cqw] font-marker text-[0.9cqw] tracking-wide text-wood-100/80">Ideas. Code. Design. Impact.</span>
      </Slot>

      {/* ── Headline paper ── */}
      <Slot x={15.5} y={17} w={27.5} h={27} className="flex flex-col justify-center px-[1.6cqw]">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <h1 className="font-hand text-[3.3cqw] leading-[0.95] text-wood-900">
            Hey, I&apos;m{" "}
            <span className="relative inline-block whitespace-nowrap">
              Ajay
              <span className="absolute -bottom-[0.3cqw] left-0 h-[0.35cqw] w-full rounded-full bg-ember" />
            </span>
            .
          </h1>
          <p className="mt-[1.1cqw] font-body text-[1.08cqw] leading-relaxed text-wood-800">
            I build AI products, experiment with ideas, and ship things people love.
          </p>
        </motion.div>
      </Slot>

      {/* ── Buttons (over the two blank plaques) ── */}
      <Slot x={15} y={46.5} w={12} h={6.5}>
        <Link href="/Projects" className="group flex h-full w-full items-center justify-center gap-[0.5cqw] font-body text-[1.02cqw] font-semibold text-[#ffe1b0]" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.75)" }}>
          Pull up a chair
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
      </Slot>
      <Slot x={28} y={46} w={14} h={6.5}>
        <Link href="#projects" className="group flex h-full w-full items-center justify-center gap-[0.3cqw] font-marker text-[1.02cqw] text-wood-900">
          Pick up a project
          <span className="transition-transform group-hover:translate-x-0.5">↓</span>
        </Link>
      </Slot>

      {/* ── Open for new ideas pill ── */}
      <Slot x={80} y={4} w={18} className="flex justify-end">
        <span className="inline-flex items-center gap-[0.5cqw] rounded-full border border-white/10 bg-wood-900/70 px-[1cqw] py-[0.5cqw] font-marker text-[0.9cqw] text-paper backdrop-blur-sm">
          <span className="relative flex h-[0.6cqw] w-[0.6cqw]">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400/70" />
            <span className="relative inline-flex h-[0.6cqw] w-[0.6cqw] rounded-full bg-green-400" />
          </span>
          Open for new ideas
        </span>
      </Slot>

      {/* ── Project clipboards on the desk ── */}
      {PROJECTS.map((p, i) => (
        <ProjectClipboard key={p.slug} p={p} i={i} x={cardX[i]} />
      ))}

      {/* ── Side notes (centered over the drawn note cards, bottom-right) ── */}
      <Slot x={88} y={66} w={12} h={11} className="flex flex-col items-center justify-center text-center font-body text-wood-900">
        <span className="font-marker text-[0.92cqw] text-ember-deep">Today&apos;s Plan</span>
        <div className="mt-[0.3cqw] text-[0.72cqw] leading-[1.4]">☑ Code · ☑ Train · ☐ Build</div>
      </Slot>
      <Slot x={88} y={78} w={12} h={11} className="flex flex-col items-center justify-center text-center font-body text-wood-900">
        <span className="font-marker text-[0.78cqw] text-wood-800/80">Currently reading</span>
        <span className="text-[0.88cqw] font-semibold leading-tight">Atomic Habits</span>
        <span className="text-[0.7cqw] text-wood-700/80">— James Clear</span>
      </Slot>
      <Slot x={88} y={90.5} w={12} h={9} className="flex flex-col items-center justify-center text-center font-body text-wood-900">
        <span className="font-marker text-[0.78cqw]">Listening to</span>
        <span className="text-[0.88cqw] font-semibold leading-tight">Lo-fi Beats 🎧</span>
      </Slot>

      {/* hotspots */}
      {spots.map((s) => (
        <HeroHotspot key={s.id} spot={s} />
      ))}
    </div>
  );
}
