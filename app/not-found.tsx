import Link from 'next/link';
import { HackerType } from '@/components/cinematic/hacker-type';

export default function NotFound() {
  return (
    <main className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center bg-[#030704] px-6 text-center">
      <h2 className="terminal-prompt text-2xl font-semibold text-[#8b949e] sm:text-3xl">
        <span className="text-[#39ff14]">404</span> | <HackerType text="File not found" />
      </h2>
      <p className="mt-4 max-w-md text-sm text-[#a3c6ac]">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-full border border-[#4bb964]/35 bg-[#0c1b10]/70 px-6 py-3 text-sm tracking-widest text-[#d5ffe0] transition-colors hover:bg-[#14321b]"
      >
        ← Back to Home
      </Link>
    </main>
  );
}
