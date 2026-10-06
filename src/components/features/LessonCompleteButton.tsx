"use client";

import { db } from "@/lib/db";
import { useDatabase } from "@/hooks/useDatabase";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export function LessonCompleteButton({ slug, title }: { slug: string; title: string }) {
  const data = useDatabase();
  const done = data.lessonProgress.some((r) => r.id === slug && r.completed);

  function toggle() {
    const next = !done;
    db.upsert("lessonProgress", { id: slug, completed: next, updatedAt: new Date().toISOString() });
    db.track(next ? "lesson.completed" : "lesson.reopened", title);
  }

  return (
    <Button variant={done ? "secondary" : "primary"} size="lg" onClick={toggle} aria-pressed={done}>
      <Icon name="check" size={18} />
      {done ? "Marcată ca terminată" : "Marchează ca terminată"}
    </Button>
  );
}
