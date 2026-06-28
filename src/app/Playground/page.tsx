"use client";
import React, { useEffect, useState } from "react";
import { Header } from "@/components/Header";

interface PlaygroundTrack {
  id: string;
  title: string;
  artist: string;
  appleUrl: string;
  note: string;
}

interface MMASettings {
  tagline: string;
  disciplines: string[];
  note: string;
}

interface PlaygroundSettings {
  intro: string;
  music: PlaygroundTrack[];
  mma: MMASettings;
}

const DEFAULT_PG: PlaygroundSettings = {
  intro: "Outside the code, I'm usually deep in music and other things that don't have a deadline.",
  music: [],
  mma: {
    tagline: "Nothing clears a bug-filled mind better than a few rounds of sparring.",
    disciplines: ["Muay Thai", "Brazilian Jiu-Jitsu", "Wrestling", "Boxing"],
    note: "",
  },
};

function toEmbedUrl(url: string): string {
  return url.replace("https://music.apple.com", "https://embed.music.apple.com");
}

function isTrackUrl(url: string): boolean {
  return url.includes("?i=") || url.includes("/song/");
}

export default function Playground() {
  const [pg, setPg] = useState<PlaygroundSettings>(DEFAULT_PG);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((d) => {
        if (d.playground) {
          setPg({ ...DEFAULT_PG, ...d.playground, mma: { ...DEFAULT_PG.mma, ...(d.playground.mma || {}) } });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-7 bg-black text-white">
      <Header />
      <div className="max-w-3xl w-full mt-10 space-y-20">

        {/* ── Page header ── */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl font-bold">Playground</h1>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent" />
          </div>
          <p className="text-gray-400 leading-relaxed max-w-lg">{pg.intro}</p>
        </section>

        {/* ── MMA ── */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-lg">✦</span>
            <h2 className="text-xl font-bold">Fighting</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-orange-900/60 to-transparent" />
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-orange-900/40 bg-gray-950">
            {/* subtle grid texture */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(#f97316 1px,transparent 1px),linear-gradient(90deg,#f97316 1px,transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            {/* orange glow top-right */}
            <div className="pointer-events-none absolute -top-10 -right-10 w-48 h-48 rounded-full bg-orange-600/10 blur-3xl" />

            <div className="relative p-7 space-y-7">
              {/* top row */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500" />
                    </span>
                    <span className="text-xs font-mono text-orange-400 tracking-widest uppercase">Active</span>
                  </div>
                  <p className="text-white font-semibold leading-snug max-w-sm">{pg.mma.tagline}</p>
                </div>
                <div className="shrink-0 text-5xl select-none opacity-20">🥊</div>
              </div>

              {/* disciplines */}
              <div className="flex flex-wrap gap-2">
                {pg.mma.disciplines.map((d) => (
                  <span
                    key={d}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-orange-800/60 bg-orange-950/40 text-orange-300 tracking-wide"
                  >
                    {d}
                  </span>
                ))}
              </div>

              {/* optional personal note */}
              {pg.mma.note && (
                <p className="text-xs text-gray-500 leading-relaxed border-t border-gray-800 pt-5 italic">
                  {pg.mma.note}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ── Music ── */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-lg">♫</span>
            <h2 className="text-xl font-bold">Music</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent" />
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-7 h-7 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : pg.music.length === 0 ? (
            <div className="border border-dashed border-gray-800 rounded-xl p-12 text-center">
              <p className="text-gray-600 text-sm font-mono">Music coming soon.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {pg.music.map((track) => (
                <div key={track.id} className="space-y-3">
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-semibold text-white text-sm">{track.title}</h3>
                    <span className="text-xs text-gray-500 font-mono">{track.artist}</span>
                  </div>
                  {track.note && (
                    <p className="text-xs text-gray-500 leading-relaxed">{track.note}</p>
                  )}
                  <iframe
                    allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                    frameBorder="0"
                    height={isTrackUrl(track.appleUrl) ? 175 : 450}
                    className="w-full rounded-xl"
                    sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                    src={toEmbedUrl(track.appleUrl)}
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="pb-10" />
      </div>
    </main>
  );
}
