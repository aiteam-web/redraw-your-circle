export interface CircleEntry {
  id: string;
  date: string;
  names: Record<string, string>;
  reflection: string;
}

const STORAGE_KEY = "redraw-circle-entries";

export function getEntries(): CircleEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveEntry(entry: Omit<CircleEntry, "id" | "date">): CircleEntry {
  const entries = getEntries();
  const newEntry: CircleEntry = {
    ...entry,
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
  };
  entries.unshift(newEntry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  return newEntry;
}

export const PROMPTS = [
  "Someone I talk to regularly",
  "Someone I feel comfortable with",
  "Someone who supports me",
  "Someone I enjoy spending time with",
  "Someone I'd like to connect more with",
] as const;
