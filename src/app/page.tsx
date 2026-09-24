import { getWorkouts } from "@/lib/api";
import WorkoutCard from "@/components/WorkoutCard";

export default async function Home() {
  const workouts = await getWorkouts();

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-8">
      <section id="library" className="scroll-mt-6 py-12">
        <h2 className="font-display text-3xl font-bold uppercase">
          The Library
        </h2>
        <p className="mt-1 text-sm text-muted">
          Twelve lifts covering every major muscle group.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </section>
    </main>
  );
}
