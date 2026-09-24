import Image from "next/image";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-8 sm:pt-10">
      <div className="grid items-center gap-8 overflow-hidden rounded-2xl border border-line bg-card px-6 py-10 sm:px-12 sm:py-14 md:grid-cols-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
            Workout Library
          </p>

          <h1 className="mt-4 max-w-xl font-display text-4xl font-bold uppercase leading-[1.05] sm:text-5xl lg:text-6xl">
            Train with intent. Log every set.
          </h1>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <a
            href="#library"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-xs font-bold uppercase tracking-wide text-black transition hover:brightness-110"
          >
            Browse workouts
            <ArrowDown className="h-4 w-4" />
          </a>
        </div>

        <div className="relative h-56 w-full sm:h-64 md:h-80">
          <Image
            src="/hero.png"
            alt="Athlete training on a gym machine"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
