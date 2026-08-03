"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { PROJECTS } from "./projects";
import { HeroHotspot, type Hotspot } from "./HeroHotspot";

const MOBILE_BG = "/workshop/hero-mobile-v2.png";
const CLIPBOARD = "/workshop/clipboard.png";

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

/* Clipboard card that fills the height of the desk scroll strip. */
function DeskClipboard({ p }: { p: (typeof PROJECTS)[number] }) {
  const [ok, setOk] = useState(true);
  return (
    <Link
      href={p.href}
      className="clip-card group relative block h-full shrink-0 snap-center"
      style={{ aspectRatio: "1085 / 1450" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={CLIPBOARD} alt="" className="absolute inset-0 h-full w-full object-contain" />
      <div className="absolute inset-0 flex flex-col" style={{ padding: "15% 13% 9% 13%" }}>
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[2px] bg-wood-900">
          {ok ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={p.thumb} alt="" onError={() => setOk(false)} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center" style={{ background: "radial-gradient(120% 100% at 20% 0%, #3a2a1c, #1c130d)" }}>
              <span className="text-[0.5rem] tracking-widest text-wood-300/50">{p.category.toUpperCase()}</span>
            </div>
          )}
          <span className="absolute left-0.5 top-0.5 rounded bg-wood-900/85 px-1 text-[0.45rem] font-medium text-paper">{p.category}</span>
        </div>
        <h3 className="mt-1 font-body text-[0.62rem] font-extrabold leading-tight text-[#3a2413]">{p.title}</h3>
        <p className="mt-0.5 line-clamp-2 font-body text-[0.5rem] font-medium leading-snug text-[#5a4326]">{p.blurb}</p>
        <div className="mt-auto flex flex-wrap gap-0.5">
          {p.tags.slice(0, 2).map((t) => (
            <span key={t} className="rounded bg-wood-700/15 px-0.5 font-mono text-[0.44rem] text-wood-700">{t}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export function MobileStage() {
  const [bright, setBright] = useState(true);
  const lampLabel = bright ? "Dim the lamp" : "Lights on";

  const spots: Hotspot[] = [
    { id: "lamp-m", x: 80, y: 26, label: lampLabel, onClick: () => setBright((b) => !b), side: "bottom" },
    { id: "mug-m", x: 33, y: 40, label: "Caffeine: 92% ☕" },
    { id: "notebook-m", x: 50, y: 45, label: "My thoughts →", href: "/Blog" },
  ];

  return (
    <section className="relative">
      <div className="relative w-full overflow-hidden" style={{ containerType: "inline-size", aspectRatio: "852 / 1847" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={MOBILE_BG} alt="Ajay's workshop" className="absolute inset-0 h-full w-full object-cover" />

        {/* lamp glow + dim */}
        <div
          className="pointer-events-none absolute inset-0 animate-lamp-flicker transition-opacity duration-700"
          style={{ background: "radial-gradient(22% 13% at 80% 26%, rgba(255,176,84,0.45), transparent 60%)", opacity: bright ? 1 : 0.12 }}
        />
        <div className="pointer-events-none absolute inset-0 bg-black transition-opacity duration-700" style={{ opacity: bright ? 0 : 0.5 }} />
        {/* fade the empty desk bottom into the page */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[8%]" style={{ background: "linear-gradient(to bottom, transparent, #241811)" }} />

        {/* THE WORKSHOP sign */}
        <Slot x={5} y={2.5} w={35} h={6.5} className="flex flex-col items-center justify-center text-center">
          <span className="font-hand text-[3.9cqw] leading-none text-wood-100/95" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>THE WORKSHOP</span>
        </Slot>

        {/* Headline paper */}
        <Slot x={5} y={11} w={35} h={21} className="flex flex-col justify-center px-[2.6cqw]">
          <h1 className="font-hand text-[5.6cqw] leading-[0.95] text-wood-900">
            Hey, I&apos;m{" "}
            <span className="relative inline-block whitespace-nowrap">
              Ajay
              <span className="absolute -bottom-[0.4cqw] left-0 h-[0.5cqw] w-full rounded-full bg-ember" />
            </span>
            .
          </h1>
          <p className="mt-[1.4cqw] font-body text-[2.1cqw] leading-snug text-wood-800/90">
            I build AI products &amp; ship things people love.
          </p>
        </Slot>

        {/* Buttons on the drawn plaques */}
        <Slot x={5} y={50} w={20} h={6.5}>
          <Link href="/Projects" className="flex h-full w-full items-center justify-center gap-[1cqw] font-body text-[2.4cqw] font-semibold text-[#ffe1b0]" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.75)" }}>
            Pull up a chair →
          </Link>
        </Slot>
        <Slot x={28} y={50} w={30} h={6.5}>
          <Link href="#desk" className="flex h-full w-full items-center justify-center gap-[0.8cqw] font-marker text-[2.6cqw] text-wood-900">
            Pick up a project ↓
          </Link>
        </Slot>

        {/* Project clipboards laid across the desk (swipeable) */}
        <Slot x={3} y={57.5} w={94} h={20}>
          <div id="desk" className="flex h-full snap-x snap-mandatory gap-[2cqw] overflow-x-auto pl-[1cqw] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {PROJECTS.map((p) => (
              <DeskClipboard key={p.slug} p={p} />
            ))}
          </div>
        </Slot>

        {/* Side notes on the 2 drawn cards (bottom-right) */}
        <Slot x={72} y={78} w={21} h={7.5} className="flex flex-col items-center justify-center text-center font-body text-wood-900">
          <span className="font-marker text-[2cqw] text-ember-deep">Today&apos;s Plan</span>
          <span className="text-[1.7cqw] leading-tight">☑ Code · ☑ Train</span>
        </Slot>
        <Slot x={72} y={86.5} w={21} h={7} className="flex flex-col items-center justify-center text-center font-body text-wood-900">
          <span className="font-marker text-[1.7cqw]">Now playing</span>
          <span className="text-[1.9cqw] font-semibold leading-tight">Lo-fi 🎧</span>
        </Slot>

        {spots.map((s) => (
          <HeroHotspot key={s.id} spot={s} />
        ))}
      </div>
    </section>
  );
}
