/**
 * Bază de date locală, stocată în localStorage.
 *
 * - Fiecare tabel este un array de rânduri cu câmpul `id`.
 * - Orice scriere este afișată în consolă (F12 → Console).
 * - În browser, baza este disponibilă și ca `window.ghDb`:
 *     ghDb.dump()   afișează toate tabelele
 *     ghDb.read()   returnează datele
 *     ghDb.reset()  șterge tot
 */

import { uid } from "./utils";

const STORAGE_KEY = "github-academy:db:v1";
const MAX_EVENTS = 60;

export interface DbSchema {
  lessonProgress: { id: string; completed: boolean; updatedAt: string }[];
  tutorialSteps: { id: string; done: boolean; updatedAt: string }[];
  bookmarks: { id: string; createdAt: string }[];
  feedback: { id: string; name: string; email: string; rating: number; message: string; createdAt: string }[];
  events: { id: string; type: string; detail: string; createdAt: string }[];
}

export type TableName = keyof DbSchema;
export type Row<T extends TableName> = DbSchema[T][number];

export const TABLES: TableName[] = ["lessonProgress", "tutorialSteps", "bookmarks", "feedback", "events"];

const EMPTY: DbSchema = {
  lessonProgress: [],
  tutorialSteps: [],
  bookmarks: [],
  feedback: [],
  events: [],
};

/* ---------- stare internă ---------- */

const listeners = new Set<() => void>();
let cacheRaw: string | null = null;
let cacheValue: DbSchema = EMPTY;
let memoryOnly = false;

function readSnapshot(): DbSchema {
  if (typeof window === "undefined") return EMPTY;
  if (memoryOnly) return cacheValue;
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    memoryOnly = true;
    return cacheValue;
  }
  if (raw === cacheRaw) return cacheValue;
  cacheRaw = raw;
  try {
    cacheValue = raw ? { ...EMPTY, ...(JSON.parse(raw) as Partial<DbSchema>) } : EMPTY;
  } catch {
    cacheValue = EMPTY;
  }
  return cacheValue;
}

function commit(next: DbSchema): void {
  cacheValue = next;
  const raw = JSON.stringify(next);
  if (!memoryOnly) {
    try {
      window.localStorage.setItem(STORAGE_KEY, raw);
      cacheRaw = raw;
    } catch {
      memoryOnly = true;
    }
  }
  listeners.forEach((fn) => fn());
}

function log(action: string, table: TableName, payload: unknown): void {
  if (typeof console === "undefined") return;
  console.groupCollapsed(`%c[DB]%c ${action} → ${table}`, "color:#0071e3;font-weight:700", "color:inherit");
  console.log(payload);
  console.groupEnd();
}

/* ---------- API public ---------- */

export const db = {
  subscribe(fn: () => void): () => void {
    listeners.add(fn);
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) fn();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(fn);
      window.removeEventListener("storage", onStorage);
    };
  },

  getSnapshot: readSnapshot,
  getServerSnapshot: (): DbSchema => EMPTY,

  read: readSnapshot,

  upsert<T extends TableName>(table: T, row: Row<T>): void {
    const data = readSnapshot();
    const rows = data[table] as Row<T>[];
    const exists = rows.some((r) => r.id === row.id);
    const nextRows = exists ? rows.map((r) => (r.id === row.id ? row : r)) : [...rows, row];
    commit({ ...data, [table]: nextRows });
    log(exists ? "UPDATE" : "INSERT", table, row);
  },

  remove(table: TableName, id: string): void {
    const data = readSnapshot();
    const rows = data[table] as { id: string }[];
    commit({ ...data, [table]: rows.filter((r) => r.id !== id) });
    log("DELETE", table, { id });
  },

  /** Adaugă un eveniment în jurnalul de activitate (maxim 60 păstrate). */
  track(type: string, detail: string): void {
    const data = readSnapshot();
    const event = { id: uid("evt"), type, detail, createdAt: new Date().toISOString() };
    commit({ ...data, events: [event, ...data.events].slice(0, MAX_EVENTS) });
    log("EVENT", "events", event);
  },

  /** Afișează toate tabelele în consolă. */
  dump(): void {
    const data = readSnapshot();
    console.group("%c[DB] Conținutul bazei de date", "color:#0071e3;font-weight:700;font-size:13px");
    TABLES.forEach((t) => {
      console.log(`%c${t}%c (${data[t].length})`, "font-weight:700", "color:gray");
      if (data[t].length) console.table(data[t]);
    });
    console.groupEnd();
  },

  reset(): void {
    commit(EMPTY);
    log("RESET", "events", "Toate tabelele au fost șterse");
  },
};

/** Expune baza în consolă: window.ghDb */
export function exposeDbToConsole(): void {
  if (typeof window === "undefined") return;
  (window as unknown as { ghDb: typeof db }).ghDb = db;
}
