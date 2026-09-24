"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Clock, Flame, Star } from "lucide-react";
import { useHasHydrated, usePlanState } from "@/lib/plan-store";
import type { Workout } from "@/types/workout";

type Tab = "plan" | "saved";

type MyPlanViewProps = { workouts: Workout[] };
type PlanCardProps = { workout: Workout };

const tabs: { key: Tab; label: string }[] = [
  { key: "plan", label: "Today's Plan" },
  { key: "saved", label: "Saved" },
];

function pickWorkouts(ids: number[], workouts: Workout[]): Workout[] {
  return ids
    .map((id) => workouts.find((workout) => workout.id === id))
    .filter((workout): workout is Workout => workout !== undefined);
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center rounded-xl border border-line bg-card/50 px-6 py-16 text-center">
      <h2 className="font-display text-xl font-bold uppercase tracking-wide">
        Nothing here yet
      </h2>
      <p className="mt-2 text-sm text-muted">
        Browse the library and add a lift to get today moving.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-accent px-5 py-2 text-xs font-bold text-black transition hover:brightness-110"
      >
        Go to workouts
      </Link>
    </div>
  );
}

function PlanCard({ workout }: PlanCardProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-xl border border-line bg-card p-3 sm:flex-nowrap">
      <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-md">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate font-display text-base font-bold uppercase">
          {workout.name}
        </h3>
        <p className="text-xs text-muted">{workout.equipment}</p>
        <div className="mt-1 flex items-center gap-3 text-[11px] text-muted">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-accent" />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame className="h-3 w-3 text-accent" />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3 text-accent" />
            {workout.rating}
          </span>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Link
          href={`/workouts/${workout.id}`}
          className="rounded-full border border-white/30 px-4 py-1.5 text-xs font-medium transition hover:border-white/60"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default function MyPlanView({ workouts }: MyPlanViewProps) {
  const [tab, setTab] = useState<Tab>("plan");
  const hydrated = useHasHydrated();
  const { plan, saved } = usePlanState();

  const planWorkouts = pickWorkouts(plan, workouts);
  const savedWorkouts = pickWorkouts(saved, workouts);
  const visible = tab === "plan" ? planWorkouts : savedWorkouts;

  const totalMinutes = planWorkouts.reduce(
    (sum, workout) => sum + workout.duration,
    0,
  );
  const totalCalories = planWorkouts.reduce(
    (sum, workout) => sum + workout.caloriesBurned,
    0,
  );

  const metrics: { label: string; value: number; highlight: boolean }[] = [
    { label: "Exercises", value: planWorkouts.length, highlight: true },
    { label: "Minutes", value: totalMinutes, highlight: false },
    { label: "Calories", value: totalCalories, highlight: false },
  ];

  return (
    <>
      <div className="mt-6 grid grid-cols-3 divide-x divide-line rounded-xl border border-line bg-card">
        {metrics.map((metric) => (
          <div key={metric.label} className="px-4 py-5 sm:px-8">
            <p className="text-xs text-muted">{metric.label}</p>
            <p
              className={`mt-1 font-display text-3xl font-bold sm:text-4xl ${
                metric.highlight ? "text-accent" : "text-white"
              }`}
            >
              {metric.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-lg border border-line bg-card p-1">
          {tabs.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setTab(item.key)}
              className={`rounded-md px-4 py-1.5 text-xs font-medium transition-colors ${
                tab === item.key
                  ? "bg-line text-white"
                  : "text-muted hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        {!hydrated ? (
          <p className="py-24 text-center text-sm text-muted">
            Loading workouts…
          </p>
        ) : visible.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className="space-y-3">
            {visible.map((workout) => (
              <li key={workout.id}>
                <PlanCard workout={workout} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
