"use client";

import { useEffect, useSyncExternalStore } from "react";
import { db, exposeDbToConsole, type DbSchema } from "@/lib/db";

/** Citește baza de date locală și reacționează la orice modificare. */
export function useDatabase(): DbSchema {
  useEffect(() => {
    exposeDbToConsole();
  }, []);
  return useSyncExternalStore(db.subscribe, db.getSnapshot, db.getServerSnapshot);
}
