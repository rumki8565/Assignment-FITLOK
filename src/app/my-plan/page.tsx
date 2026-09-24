import MyPlanView from "@/components/MyPlanView";
import { getWorkouts } from "@/lib/api";

export default async function MyPlanPage() {
  const workouts = await getWorkouts();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-10">
      <h1 className="font-display text-4xl font-bold uppercase">My Plan</h1>
      <p className="mt-1 text-sm text-muted">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <MyPlanView workouts={workouts} />
    </main>
  );
}
