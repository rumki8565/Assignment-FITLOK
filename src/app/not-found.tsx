import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center sm:px-8">
      <p className="font-display text-7xl font-bold text-accent sm:text-8xl">
        404
      </p>
      <h1 className="mt-2 font-display text-2xl font-bold uppercase tracking-wide sm:text-3xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-accent px-6 py-2.5 text-xs font-bold text-black transition hover:brightness-110"
      >
        Go to workouts
      </Link>
    </main>
  );
}
