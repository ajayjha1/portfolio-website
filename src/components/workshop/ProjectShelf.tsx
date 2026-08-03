"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Hand } from "lucide-react";
import { PROJECTS } from "./projects";

function Thumb({ src, category }: { src: string; category: string }) {
  const [ok, setOk] = useState(true);
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-wood-900">
      {ok ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt=""
          onError={() => setOk(false)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center"
          style={{
            background:
              "radial-gradient(120% 100% at 20% 0%, #3a2a1c, #1c130d)",
          }}
        >
          <span className="font-mono text-xs tracking-widest text-wood-300/40">
            {category.toUpperCase()}
          </span>
        </div>
      )}
      <span className="absolute left-2 top-2 rounded-md bg-wood-900/85 px-2 py-0.5 font-marker text-xs text-paper backdrop-blur-sm">
        {category}
      </span>
    </div>
  );
}

export function ProjectShelf() {
  const scroller = useRef<HTMLDivElement>(null);

  const scroll = (dir: -1 | 1) => {
    scroller.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section id="projects" className="relative pt-10 lg:pt-14">
      {/* the desk surface continues here — a wooden workbench ledge under the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[-50vw] -top-6 h-16"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(255,176,84,0.10) 55%, rgba(0,0,0,0.35) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[-50vw] top-8 h-28"
        style={{
          background:
            "repeating-linear-gradient(90deg, rgba(0,0,0,0.12) 0 3px, transparent 3px 9px), linear-gradient(180deg, rgba(122,82,48,0.18), transparent 70%)",
          maskImage: "linear-gradient(180deg, #000, transparent)",
          WebkitMaskImage: "linear-gradient(180deg, #000, transparent)",
        }}
      />
      <div className="relative mb-6 flex items-center gap-4">
        <h2 className="font-hand text-4xl text-paper lg:text-5xl">
          Pick up a project
        </h2>
        <span className="font-marker text-2xl text-ember">↴</span>
        <span className="ml-auto hidden font-marker text-sm text-wood-300/50 sm:block">
          straight off the desk →
        </span>
      </div>

      <div className="relative">
        {/* arrows */}
        <button
          type="button"
          aria-label="Scroll left"
          onClick={() => scroll(-1)}
          className="absolute -left-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/10 bg-wood-900/90 p-2 text-paper backdrop-blur-sm transition hover:bg-wood-700 sm:block"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          aria-label="Scroll right"
          onClick={() => scroll(1)}
          className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/10 bg-wood-900/90 p-2 text-paper backdrop-blur-sm transition hover:bg-wood-700 sm:block"
        >
          <ChevronRight size={20} />
        </button>

        <div
          ref={scroller}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, rotate: -0.6 }}
              className="paper group w-[80vw] shrink-0 snap-start p-4 sm:w-72"
            >
              {/* tape */}
              <span className="absolute -top-2 left-1/2 h-4 w-16 -translate-x-1/2 rounded-sm bg-paper-aged/70 shadow-sm" />
              <Thumb src={p.thumb} category={p.category} />
              <h3 className="mt-4 font-body text-lg font-bold text-wood-800">
                {p.title}
              </h3>
              <p className="mt-1 min-h-[3rem] font-body text-sm leading-relaxed text-wood-700/80">
                {p.blurb}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-wood-700/10 px-2 py-0.5 font-mono text-[0.7rem] text-wood-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-4 border-t border-wood-700/15 pt-3">
                <Link
                  href={p.href}
                  className="inline-flex items-center gap-1.5 font-marker text-base text-wood-800 transition-colors group-hover:text-ember-deep"
                >
                  <Hand size={16} className="transition-transform group-hover:-translate-y-0.5" />
                  Pick up
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
