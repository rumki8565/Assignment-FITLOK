import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-4 py-6 sm:flex-row sm:items-center sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Dumbbell className="h-4 w-4 text-accent" />
          <span className="font-display text-sm font-bold uppercase tracking-wide">
            FitLog
          </span>
        </Link>

        <p className="text-xs text-muted">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
