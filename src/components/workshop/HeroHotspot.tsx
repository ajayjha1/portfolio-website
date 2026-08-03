"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export type Hotspot = {
  id: string;
  /** position as % of the stage */
  x: number;
  y: number;
  label: string;
  href?: string;
  onClick?: () => void;
  /** side the tooltip pops toward */
  side?: "top" | "bottom";
};

export function HeroHotspot({ spot }: { spot: Hotspot }) {
  const [open, setOpen] = useState(false);
  const side = spot.side ?? "top";

  const marker = (
    <motion.span
      whileHover={{ scale: 1.35 }}
      whileTap={{ scale: 0.9 }}
      className="relative flex h-4 w-4 items-center justify-center"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember/50" />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ember shadow-[0_0_10px_2px_rgba(255,138,0,0.7)]" />
    </motion.span>
  );

  const tooltip = (
    <AnimatePresence>
      {open && (
        <motion.span
          initial={{ opacity: 0, y: side === "top" ? 6 : -6, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: side === "top" ? 6 : -6, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={`pointer-events-none absolute left-1/2 z-20 w-max max-w-[13rem] -translate-x-1/2 rounded-lg bg-wood-100 px-3 py-1.5 font-marker text-sm text-wood-800 shadow-paper-lift ${
            side === "top" ? "bottom-6" : "top-6"
          }`}
        >
          {spot.label}
        </motion.span>
      )}
    </AnimatePresence>
  );

  const common = {
    className:
      "group absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer",
    style: { left: `${spot.x}%`, top: `${spot.y}%` },
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
    onFocus: () => setOpen(true),
    onBlur: () => setOpen(false),
    "aria-label": spot.label,
  };

  if (spot.href) {
    return (
      <Link href={spot.href} {...common}>
        {tooltip}
        {marker}
      </Link>
    );
  }
  return (
    <button type="button" onClick={spot.onClick} {...common}>
      {tooltip}
      {marker}
    </button>
  );
}
