import { useSyncExternalStore } from "react";

export const PLAN_LIMIT = 5;

const STORAGE_KEY = "fitlog-state";

type PlanState = { plan: number[]; saved: number[]; done: number[] };
export type AddResult = "added" | "duplicate" | "full";
export type SaveResult = "added" | "duplicate";

const EMPTY_STATE: PlanState = { plan: [], saved: [], done: [] };

let state: PlanState = EMPTY_STATE;
let hasLoaded = false;
const listeners = new Set<() => void>();

function isNumberArray(value: unknown): value is number[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "number")
  );
}

function readStorage(): PlanState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_STATE;
    const parsed: { plan?: unknown; saved?: unknown; done?: unknown } =
      JSON.parse(raw);
    return {
      plan: isNumberArray(parsed.plan) ? parsed.plan : [],
      saved: isNumberArray(parsed.saved) ? parsed.saved : [],
      done: isNumberArray(parsed.done) ? parsed.done : [],
    };
  } catch {
    return EMPTY_STATE;
  }
}

function getSnapshot(): PlanState {
  if (!hasLoaded) {
    state = readStorage();
    hasLoaded = true;
  }
  return state;
}

function getServerSnapshot(): PlanState {
  return EMPTY_STATE;
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function update(next: PlanState): void {
  state = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // storage blocked or full: keep working in memory
  }
  listeners.forEach((listener) => listener());
}

export function addToPlan(id: number): AddResult {
  const current = getSnapshot();
  if (current.plan.includes(id)) return "duplicate";
  if (current.plan.length >= PLAN_LIMIT) return "full";
  update({ ...current, plan: [...current.plan, id] });
  return "added";
}

export function saveForLater(id: number): SaveResult {
  const current = getSnapshot();
  if (current.saved.includes(id)) return "duplicate";
  update({ ...current, saved: [...current.saved, id] });
  return "added";
}

export function removeFromPlan(id: number): void {
  const current = getSnapshot();
  update({
    ...current,
    plan: current.plan.filter((item) => item !== id),
    done: current.done.filter((item) => item !== id),
  });
}

export function removeFromSaved(id: number): void {
  const current = getSnapshot();
  update({
    ...current,
    saved: current.saved.filter((item) => item !== id),
  });
}

export function markDone(id: number): void {
  const current = getSnapshot();
  if (!current.plan.includes(id) || current.done.includes(id)) return;
  update({ ...current, done: [...current.done, id] });
}

export function usePlanState(): PlanState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function subscribeNoop(): () => void {
  return () => {};
}

export function useHasHydrated(): boolean {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
}
