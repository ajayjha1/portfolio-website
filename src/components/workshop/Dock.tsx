"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Hammer,
  FolderOpen,
  PencilRuler,
  Dumbbell,
  BookOpen,
  User,
  Mail,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type NavItem = { name: string; path: string; icon: LucideIcon };

const NAV: NavItem[] = [
  { name: "Workshop", path: "/", icon: Hammer },
  { name: "Projects", path: "/Projects", icon: FolderOpen },
  { name: "Blueprints", path: "/Blueprints", icon: PencilRuler },
  { name: "Playground", path: "/Playground", icon: Dumbbell },
  { name: "Journal", path: "/Blog", icon: BookOpen },
  { name: "About", path: "/About", icon: User },
  { name: "Contact", path: "/Contact", icon: Mail },
];

function isActive(pathname: string, path: string) {
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(path + "/");
}

export function Dock() {
  const pathname = usePathname() || "/";

  return (
    <>
      {/* ── Desktop: wooden drawer dock, always visible ── */}
      <nav
        aria-label="Primary"
        className="fixed left-0 top-0 z-40 hidden h-screen w-56 flex-col px-4 py-6 lg:flex"
        style={{ background: "linear-gradient(90deg, rgba(20,13,9,0.94) 0%, rgba(20,13,9,0.8) 68%, rgba(20,13,9,0) 100%)" }}
      >
        <Link href="/" className="mb-8 block px-3">
          <span className="font-hand text-4xl leading-none text-paper">
            Ajay<span className="text-ember">.</span>
          </span>
          <span className="mt-1 block font-marker text-xs tracking-wide text-wood-300/70">
            The Workshop
          </span>
        </Link>

        <ul className="flex flex-1 flex-col gap-1.5">
          {NAV.map((item) => {
            const active = isActive(pathname, item.path);
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Link href={item.path} className="group relative block">
                  <motion.div
                    whileHover={{ y: -2, x: 2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className={`relative flex w-fit items-center gap-3 rounded-xl px-3 py-2.5 pr-6 transition-shadow ${
                      active
                        ? "drawer-btn"
                        : "hover:bg-wood-700/30 hover:shadow-[inset_0_1px_0_rgba(255,200,130,0.12),0_0_18px_-6px_rgba(255,138,0,0.5)]"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="dock-active"
                        className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-ember"
                        style={{ boxShadow: "0 0 12px 1px rgba(255,138,0,0.7)" }}
                        transition={{ type: "spring", stiffness: 500, damping: 32 }}
                      />
                    )}
                    <Icon
                      size={19}
                      className={
                        active
                          ? "text-ember"
                          : "text-wood-300 group-hover:text-paper"
                      }
                    />
                    <span
                      className={`font-body text-[0.95rem] ${
                        active
                          ? "font-semibold text-paper"
                          : "text-wood-300 group-hover:text-paper"
                      }`}
                    >
                      {item.name}
                    </span>
                  </motion.div>
                </Link>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 px-3 font-marker text-xs leading-relaxed text-wood-300/60">
          Crafting in progress.
          <br />
          Always learning. <span className="text-ember">◠‿◠</span>
        </p>
      </nav>

      {/* ── Mobile / tablet: floating bottom bar, always visible ── */}
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-40 lg:hidden"
      >
        <div className="mx-auto mb-3 flex max-w-md items-center justify-around gap-0.5 rounded-2xl border border-black/40 bg-wood-900/90 px-1.5 py-2 backdrop-blur-md"
          style={{ boxShadow: "0 -6px 28px -8px rgba(0,0,0,0.7)" }}
        >
          {NAV.filter((n) => n.name !== "Contact").map((item) => {
            const active = isActive(pathname, item.path);
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                aria-label={item.name}
                className="relative flex flex-1 flex-col items-center gap-0.5 rounded-xl px-1 py-1.5"
              >
                <motion.div whileTap={{ scale: 0.85 }} className="relative flex flex-col items-center gap-0.5">
                  {active && (
                    <motion.span
                      layoutId="dock-active-mobile"
                      className="absolute -top-1.5 h-1 w-1 rounded-full bg-ember"
                      style={{ boxShadow: "0 0 10px 1px rgba(255,138,0,0.8)" }}
                      transition={{ type: "spring", stiffness: 500, damping: 32 }}
                    />
                  )}
                  <Icon size={21} className={active ? "text-ember" : "text-wood-300"} />
                  <span className={`text-[0.6rem] font-medium ${active ? "text-paper" : "text-wood-300/80"}`}>
                    {item.name}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
