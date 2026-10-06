"use client";

import { useDatabase } from "@/hooks/useDatabase";
import { Icon } from "@/components/ui/Icon";

/** Etichetă „Terminată” citită din baza de date locală. */
export function LessonStatus({ slug }: { slug: string }) {
  const data = useDatabase();
  const done = data.lessonProgress.some((r) => r.id === slug && r.completed);
  return (
    <span className={`status${done ? " status-done" : ""}`}>
      {done ? (<><Icon name="check" size={14} /> Terminată</>) : (<>Citește <Icon name="arrow" size={14} /></>)}
    </span>
  );
}
