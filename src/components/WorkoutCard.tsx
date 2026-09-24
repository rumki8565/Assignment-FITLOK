import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import type { Workout } from "@/types/workout";

type WorkoutCardProps = { workout: Workout };

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group block overflow-hidden rounded-xl border border-line bg-card transition-colors hover:border-accent/50"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold uppercase text-black"
            >
              {group}
            </span>
          ))}
        </div>

        <h3 className="mt-3 font-display text-lg font-bold uppercase leading-tight">
          {workout.name}
        </h3>
        <p className="mt-1 text-xs text-muted">{workout.equipment}</p>

        <div className="mt-4 flex items-center gap-4 border-t border-line pt-3 text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1.5">
            <Flame className="h-3.5 w-3.5" />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5" />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
