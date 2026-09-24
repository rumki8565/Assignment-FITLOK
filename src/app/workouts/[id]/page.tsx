import Image from "next/image";
import { notFound } from "next/navigation";
import WorkoutActions from "@/components/WorkoutActions";
import { getWorkout } from "@/lib/api";

type DetailsPageProps = { params: Promise<{ id: string }> };

export default async function WorkoutDetailsPage({ params }: DetailsPageProps) {
  const { id } = await params;
  const workout = await getWorkout(id);

  if (!workout) {
    notFound();
  }

  const specs: { label: string; value: string }[] = [
    { label: "Equipment", value: workout.equipment },
    { label: "Difficulty", value: workout.difficulty },
    { label: "Sets", value: String(workout.sets) },
    { label: "Reps", value: workout.reps },
    { label: "Duration", value: `${workout.duration} min` },
    { label: "Calories", value: `${workout.caloriesBurned} kcal` },
    { label: "Rating", value: String(workout.rating) },
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-10">
      <div className="grid gap-8 md:grid-cols-[2fr_3fr] md:items-start md:gap-12">
        {/* Left: image */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        {/* Right: details */}
        <div>
          <h1 className="font-display text-3xl font-bold uppercase leading-tight sm:text-4xl">
            {workout.name}
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
            {workout.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="rounded-full bg-accent px-3 py-0.5 text-[11px] font-bold text-black"
              >
                {group}
              </span>
            ))}
          </div>

          <dl className="mt-6 overflow-hidden rounded-xl border border-line bg-card">
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="flex items-center justify-between border-b border-line px-5 py-3.5 last:border-b-0"
              >
                <dt className="text-[11px] font-medium uppercase tracking-wider text-muted">
                  {spec.label}
                </dt>
                <dd className="text-sm font-medium">{spec.value}</dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-8 font-display text-lg font-bold uppercase tracking-wide">
            Instructions
          </h2>
          <ol className="mt-3 space-y-2 text-sm text-muted">
            {workout.instructions.map((step, index) => (
              <li key={step} className="flex gap-2">
                <span>{index + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-wrap gap-3">
            <WorkoutActions workout={workout} />
          </div>
        </div>
      </div>
    </main>
  );
}
