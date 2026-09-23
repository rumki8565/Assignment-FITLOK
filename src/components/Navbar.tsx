"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell } from "lucide-react";

type NavLink = { href: string; label: string };

const links: NavLink[] = [
  { href: "/", label: "Workouts" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();

  // Temporary values. We connect these to real state in Step 6.
  const planCount = 0;
  const savedCount = 0;

  return (
    <header className="border-b border-line">
      <nav className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 py-4 sm:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 justify-self-start">
          <Dumbbell className="h-5 w-5 text-accent" />
          <span className="hidden font-display text-lg font-bold uppercase tracking-wide sm:inline">
            FitLog
          </span>
        </Link>

        {/* Middle links */}
        <ul className="flex items-center gap-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-accent/15 text-accent"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right badges */}
        <div className="flex items-center gap-3 justify-self-end text-xs">
          <Link href="/my-plan" className="flex items-center gap-1.5">
            <span className="text-white/80">Plan</span>
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[11px] font-bold text-black">
              {planCount}
            </span>
          </Link>
          <Link href="/my-plan" className="flex items-center gap-1.5">
            <span className="text-white/80">Saved</span>
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full border border-white/30 px-1.5 text-[11px] font-bold text-white">
              {savedCount}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
