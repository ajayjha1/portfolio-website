import Link from "next/link";

export function ComingSoon({
  title,
  note,
  emoji,
}: {
  title: string;
  note: string;
  emoji: string;
}) {
  return (
    <main className="relative z-[2] flex min-h-screen items-center justify-center px-4 pb-28 pt-6 lg:pb-16 lg:pl-60">
      <div className="paper w-full max-w-md rotate-[-1deg] p-8 text-center">
        <span className="absolute -top-3 left-1/2 h-5 w-24 -translate-x-1/2 rounded-sm bg-paper-aged/70 shadow-sm" />
        <div className="mb-4 text-5xl">{emoji}</div>
        <h1 className="font-hand text-4xl text-wood-800">{title}</h1>
        <p className="mt-3 font-body text-sm leading-relaxed text-wood-700/80">
          {note}
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-1.5 font-marker text-base text-ember-deep hover:underline"
        >
          ← back to the workshop
        </Link>
      </div>
    </main>
  );
}
