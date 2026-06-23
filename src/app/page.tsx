"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import Ajay from "@/images/Ajay.png";

/* ── types matching settings.json ── */
interface Stat       { value: string; label: string; }
interface FocusCard  { icon: string; label: string; desc: string; tag: string; }
interface StackGroup { label: string; items: string[]; }
interface OpenSource { text: string; githubUrl: string; }

/* ── defaults (shown instantly, overwritten by API) ── */
const D_ROLES:   string[]    = ["Full Stack Developer", "AI Systems Builder"];
const D_ABOUT    = "I design and ship full-stack web applications — from clean APIs to polished interfaces. I enjoy working across the stack, solving hard problems, and building tools that are fast, reliable, and actually useful.";
const D_STATS:   Stat[]      = [
  { value: "90%", label: "page load time cut" },
  { value: "4×",  label: "API throughput boosted" },
  { value: "3+",  label: "production systems shipped" },
  { value: "2",   label: "AI products in market" },
];
const D_FOCUS: FocusCard[] = [
  { icon: "◈", label: "AI Brand Intelligence",   desc: "LLM-powered brand monitoring, narrative decoding, and multi-brand analytics for enterprise clients across SE Asia.", tag: "ebic.ai @ M37 Labs" },
  { icon: "◉", label: "ESG Compliance Systems",  desc: "Real-time commitments registry, ESG pillar tracking (Environmental / Social / Governance), and AI-validated evidence modules.", tag: "ESG Dashboard @ M37 Labs" },
  { icon: "◎", label: "Scalable Web Architecture", desc: "End-to-end systems with React/Next.js, Node.js, and MongoDB — optimized for speed, security, and maintainability at scale.", tag: "NIELIT & Side Projects" },
];
const D_STACK: StackGroup[] = [
  { label: "Frontend",   items: ["React","Next.js","TypeScript","Tailwind CSS","Redux","ShadCN UI"] },
  { label: "Backend",    items: ["Node.js","Express.js","REST APIs","JWT Auth","Multer","PM2"] },
  { label: "Data",       items: ["MongoDB","MySQL","Mongoose","Prisma","SharePoint"] },
  { label: "Tools & AI", items: ["Docker","Git","Claude","Cursor","Postman","Vercel"] },
];
const D_OS: OpenSource = { text: "Recently contributed to Cal.com — a production scheduling platform used by millions. Merged PR improving core scheduling flow.", githubUrl: "https://github.com/ajayjha1" };
const D_TAGLINE = "Let's build something that matters.";

/* ── typewriter ── */
function useTypewriter(words: string[], speed = 70, pause = 2400) {
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    if (!words.length) return;
    const current = words[wordIdx % words.length];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && charIdx < current.length)      t = setTimeout(() => setCharIdx(c => c + 1), speed);
    else if (!deleting && charIdx === current.length) t = setTimeout(() => setDeleting(true), pause);
    else if (deleting && charIdx > 0)               t = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    else { setDeleting(false); setWordIdx(w => (w + 1) % words.length); }
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);
  if (!words.length) return "";
  return words[wordIdx % words.length].slice(0, charIdx);
}

interface Blog { id: string; title: string; slug: string; excerpt: string; tags: string[]; date: string; }
interface SectionVisibility { stats: boolean; focus: boolean; writing: boolean; stack: boolean; openSource: boolean; footer: boolean; }
const D_VIS: SectionVisibility = { stats: true, focus: true, writing: true, stack: true, openSource: true, footer: true };

export default function Home() {
  const [roles,      setRoles]      = useState<string[]>(D_ROLES);
  const [aboutText,  setAboutText]  = useState(D_ABOUT);
  const [stats,      setStats]      = useState<Stat[]>(D_STATS);
  const [focus,      setFocus]      = useState<FocusCard[]>(D_FOCUS);
  const [stack,      setStack]      = useState<StackGroup[]>(D_STACK);
  const [openSource, setOpenSource] = useState<OpenSource>(D_OS);
  const [tagline,    setTagline]    = useState(D_TAGLINE);
  const [resumeUrl,  setResumeUrl]  = useState("");
  const [vis,        setVis]        = useState<SectionVisibility>(D_VIS);
  const [blogs,      setBlogs]      = useState<Blog[]>([]);

  useEffect(() => {
    fetch("/api/settings").then(r => r.json()).then(d => {
      if (d.roles?.length)  setRoles(d.roles);
      if (d.aboutText)      setAboutText(d.aboutText);
      if (d.stats?.length)  setStats(d.stats);
      if (d.focus?.length)  setFocus(d.focus);
      if (d.stack?.length)  setStack(d.stack);
      if (d.openSource)     setOpenSource(d.openSource);
      if (d.footerTagline)     setTagline(d.footerTagline);
      if (d.resumeUrl)         setResumeUrl(d.resumeUrl);
      if (d.sectionVisibility) setVis({ ...D_VIS, ...d.sectionVisibility });
    }).catch(() => {});
    fetch("/api/blogs").then(r => r.json()).then(d => setBlogs((d.blogs || []).slice(0, 3))).catch(() => {});
  }, []);

  const role = useTypewriter(roles);

  return (
    <main className="flex min-h-screen flex-col items-center p-7 bg-black text-white">
      <Header />
      <div className="max-w-3xl w-full mt-10 space-y-24">

        {/* ── Hero ── */}
        <section className="relative">
          <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
          <div className="relative flex flex-col md:flex-row md:items-start gap-10">
            <div className="flex-1">
              <div className="h-10 mb-6">
                <span className="text-3xl md:text-4xl font-bold font-mono text-blue-400">
                  {role}<span className="animate-pulse">_</span>
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-lg mb-8">{aboutText}</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/Blog" className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200">
                  Read Research <span className="transition-transform group-hover:translate-x-0.5">↗</span>
                </Link>
                <Link href="/Experience" className="group inline-flex items-center gap-2 border border-gray-700 hover:border-gray-500 bg-gray-900/50 hover:bg-gray-900 px-5 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:text-white transition-all duration-200">
                  Work History <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
                <Link href="/Projects" className="group inline-flex items-center gap-2 border border-gray-700 hover:border-gray-500 bg-gray-900/50 hover:bg-gray-900 px-5 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:text-white transition-all duration-200">
                  Projects <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
              </div>
            </div>
            <div className="shrink-0">
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600/30 to-purple-600/20 blur-xl" />
                <Image src={Ajay} alt="Ajay Kumar" width={160} height={160} className="relative rounded-2xl border border-gray-800 object-cover w-full h-full" />
              </div>
              <p className="text-xs text-gray-600 text-center mt-2 font-mono">Delhi, India</p>
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        {vis.stats && <section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map(s => (
              <div key={s.label} className="bg-gray-900/40 border border-gray-800 rounded-xl p-4 text-center hover:border-gray-700 transition-colors">
                <p className="text-3xl font-bold text-white mb-1">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </section>}

        {/* ── Focus ── */}
        {vis.focus && <section>
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-xl font-bold">Current Focus</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent" />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {focus.map(f => (
              <div key={f.label} className="group bg-gray-900/40 border border-gray-800 rounded-xl p-5 hover:border-blue-800 hover:bg-gray-900/70 transition-all duration-300">
                <span className="text-2xl text-blue-500 mb-3 block">{f.icon}</span>
                <h3 className="font-semibold text-white mb-2 text-sm">{f.label}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">{f.desc}</p>
                <span className="text-xs font-mono text-blue-600 bg-blue-950/40 border border-blue-900/50 px-2 py-0.5 rounded-full">{f.tag}</span>
              </div>
            ))}
          </div>
        </section>}

        {/* ── Recent Writing ── */}
        {vis.writing && <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold">Recent Writing</h2>
              <div className="h-px bg-gradient-to-r from-gray-700 to-transparent w-20" />
            </div>
            <Link href="/Blog" className="text-sm text-gray-500 hover:text-blue-400 transition-colors font-mono">all posts →</Link>
          </div>
          {blogs.length === 0 ? (
            <div className="border border-dashed border-gray-800 rounded-xl p-10 text-center">
              <p className="text-gray-600 text-sm mb-1">Research posts incoming.</p>
              <p className="text-gray-700 text-xs font-mono">AI, ESG systems, full-stack architecture.</p>
              <Link href="/Blog" className="inline-block mt-4 text-xs text-blue-500 hover:text-blue-400 transition-colors">Check the blog →</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {blogs.map(b => (
                <Link key={b.id} href={`/Blog/${b.slug}`}>
                  <div className="group flex items-start justify-between gap-4 bg-gray-900/30 border border-gray-800 rounded-xl p-5 hover:border-blue-800 hover:bg-gray-900/60 transition-all duration-200">
                    <div className="flex-1">
                      <h3 className="font-medium text-white group-hover:text-blue-300 transition-colors mb-1 text-sm">
                        {b.title}<span className="ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400">↗</span>
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-1">{b.excerpt}</p>
                      <div className="flex gap-1.5 mt-2 flex-wrap">
                        {b.tags.slice(0, 3).map(t => (
                          <span key={t} className="text-xs px-1.5 py-0.5 bg-blue-950/40 text-blue-400 rounded border border-blue-900/40">{t}</span>
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-gray-600 whitespace-nowrap font-mono mt-0.5">
                      {new Date(b.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>}

        {/* ── Stack ── */}
        {vis.stack && <section>
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-xl font-bold">Stack</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent" />
          </div>
          <div className="space-y-6">
            {stack.map(g => (
              <div key={g.label} className="flex gap-4 items-start">
                <span className="text-xs font-mono text-gray-600 w-20 shrink-0 pt-1.5">{g.label}</span>
                <div className="flex flex-wrap gap-2">
                  {g.items.map(item => (
                    <span key={item} className="text-xs px-2.5 py-1 bg-gray-900 border border-gray-800 rounded-md text-gray-300 hover:border-gray-600 hover:text-white transition-colors">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>}

        {/* ── Open Source ── */}
        {vis.openSource && <section className="border border-gray-800 rounded-xl p-6 bg-gray-900/30 hover:border-gray-700 transition-colors">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center shrink-0 text-lg">⌥</div>
            <div className="flex-1">
              <h3 className="font-semibold text-white mb-1 text-sm">Open Source Contributor</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-3">{openSource.text}</p>
              {openSource.githubUrl && (
                <a href={openSource.githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:text-blue-400 transition-colors font-mono">
                  {openSource.githubUrl.replace("https://", "")} →
                </a>
              )}
            </div>
          </div>
        </section>}

        {/* ── Footer CTA ── */}
        {vis.footer && <section className="pb-10 text-center border-t border-gray-900 pt-16">
          <p className="text-gray-500 text-sm mb-6 font-mono">{tagline}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/Contact" className="group inline-flex items-center gap-2 bg-white text-black hover:bg-gray-100 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200">
              Get in touch <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            {resumeUrl && (
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 border border-gray-700 hover:border-gray-500 px-6 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:text-white transition-all duration-200">
                View Resume <span className="transition-transform group-hover:translate-x-0.5">↗</span>
              </a>
            )}
          </div>
        </section>}

      </div>
    </main>
  );
}
