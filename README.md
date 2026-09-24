# FitLog — Workout Library

FitLog is a dark, no-nonsense gym companion. Browse a library of lifts, open any workout for full details, lock it into today's plan or save it for later, and watch your totals for exercises, minutes and calories add up.

**Live site:** https://fitlog-two-neon.vercel.app

**Repository:** https://github.com/rumki8565/Assignment-FITLOK

## Technologies Used

- **Next.js** (App Router) for pages, routing, data fetching and image optimization
- **React** and **TypeScript** for the UI and type safety
- **Tailwind CSS** for styling and responsive layout
- **Lucide React** for icons
- **Sonner** for toast notifications
- **Google Fonts** (Oswald and Inter) via `next/font`

## Features

1. **Fully responsive** — works on mobile, tablet and desktop, with a grid that collapses from 3 columns to 2 to 1.
2. **Workout library** — all 12 workouts are loaded from the FitLog API and shown as cards with an image, muscle-group tags, equipment, duration, calories and rating.
3. **Workout details page** — a two-column layout with a key specs panel, step-by-step instructions and clear actions.
4. **Today's Plan and Saved lists** — add a workout to today's plan or save it for later, with live navbar counters and toast notifications. Today's plan is capped at five lifts.
5. **My Plan page** — live totals for exercises, minutes and calories, Today's Plan and Saved tabs, and a Sort By dropdown (Duration, Calories, Rating).
6. **Mark as Done and Remove** — finish a lift or remove it from either list, with a toast for each action.
7. **Saved between visits** — your plan and saved lists are kept in `localStorage`, so they survive a page reload.
8. **Loading and error states** — a loading animation while data is fetched, and a custom 404 page for unknown routes.
