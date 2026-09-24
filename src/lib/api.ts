import type { Workout } from "@/types/workout";

const BASE_URL = "https://api.abcz.workers.dev/api/fitlog";

export async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch(BASE_URL, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch workouts");
  }
  return res.json();
}

export async function getWorkout(id: string): Promise<Workout | null> {
  const res = await fetch(`${BASE_URL}/${id}`, { cache: "no-store" });
  if (!res.ok) return null;

  const data: Workout | Workout[] = await res.json();
  const workout = Array.isArray(data) ? data[0] : data;

  return workout && typeof workout.name === "string" ? workout : null;
}
