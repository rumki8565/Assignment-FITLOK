"use client";

import { Bookmark, CalendarPlus } from "lucide-react";
import { toast } from "sonner";
import {
  PLAN_LIMIT,
  addToPlan,
  saveForLater,
  usePlanState,
} from "@/lib/plan-store";
import type { Workout } from "@/types/workout";

type WorkoutActionsProps = { workout: Workout };

export default function WorkoutActions({ workout }: WorkoutActionsProps) {
  const { plan } = usePlanState();
  const planFull = plan.length >= PLAN_LIMIT && !plan.includes(workout.id);

  function handleAddToPlan(): void {
    const result = addToPlan(workout.id);
    if (result === "added") {
      toast.success("Added to today's plan", { description: workout.name });
    } else if (result === "duplicate") {
      toast.info("Already in today's plan");
    } else {
      toast.error(`Today's plan is full (${PLAN_LIMIT} lifts max)`);
    }
  }

  function handleSave(): void {
    const result = saveForLater(workout.id);
    if (result === "added") {
      toast.success("Saved for later", { description: workout.name });
    } else {
      toast.info("Already saved");
    }
  }

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={handleAddToPlan}
        disabled={planFull}
        title={planFull ? "Your plan already has 5 lifts" : undefined}
        className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-xs font-bold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <CalendarPlus className="h-4 w-4" />
        Add to today&apos;s plan
      </button>
      <button
        type="button"
        onClick={handleSave}
        className="inline-flex items-center gap-2 rounded-md border border-white/30 px-5 py-3 text-xs font-medium text-white transition hover:border-white/60"
      >
        <Bookmark className="h-4 w-4" />
        Save for later
      </button>
    </div>
  );
}
