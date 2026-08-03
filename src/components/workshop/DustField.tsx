"use client";

import { useMemo } from "react";

/**
 * Tiny warm dust motes drifting up through the lamp light.
 * Purely decorative, pointer-events none, respects reduced-motion via CSS.
 */
export function DustField({ count = 22 }: { count?: number }) {
  const motes = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const size = 1 + Math.random() * 2.5;
        return {
          id: i,
          left: Math.random() * 100,
          top: 40 + Math.random() * 60,
          size,
          duration: 9 + Math.random() * 12,
          delay: -Math.random() * 20,
          opacity: 0.25 + Math.random() * 0.4,
        };
      }),
    [count]
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {motes.map((m) => (
        <span
          key={m.id}
          className="dust"
          style={{
            left: `${m.left}%`,
            top: `${m.top}%`,
            width: `${m.size}px`,
            height: `${m.size}px`,
            animationDuration: `${m.duration}s`,
            animationDelay: `${m.delay}s`,
            opacity: m.opacity,
          }}
        />
      ))}
    </div>
  );
}
