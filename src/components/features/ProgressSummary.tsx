"use client";

import { LESSONS } from "@/data/lessons";
import { TUTORIAL } from "@/data/tutorial";
import { useDatabase } from "@/hooks/useDatabase";
import { pct } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ProgressRing } from "@/components/ui/ProgressRing";

/** Rezumatul progresului, calculat din baza de date locală. */
export function ProgressSummary() {
  const data = useDatabase();
  const lessonsDone = data.lessonProgress.filter((r) => r.completed).length;
  const stepsDone = data.tutorialSteps.filter((r) => r.done).length;
  const total = LESSONS.length + TUTORIAL.length;
  const overall = pct(lessonsDone + stepsDone, total);

  return (
    <div className="progress-card">
      <ProgressRing value={overall} size={112} />
      <div className="progress-text">
        <h3>Progresul tău</h3>
        <p>
          {lessonsDone} din {LESSONS.length} lecții · {stepsDone} din {TUTORIAL.length} pași din ghid
        </p>
        <p className="muted">Salvat doar în acest browser, în localStorage.</p>
      </div>
      <div className="progress-actions">
        <Button href="/lectii" variant="secondary">Continuă lecțiile</Button>
        <Button href="/date" variant="ghost">Vezi datele</Button>
      </div>
    </div>
  );
}
