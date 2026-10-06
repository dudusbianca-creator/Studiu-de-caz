"use client";

import { TUTORIAL } from "@/data/tutorial";
import { db } from "@/lib/db";
import { useDatabase } from "@/hooks/useDatabase";
import { cn, pct } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Terminal } from "@/components/ui/Terminal";

export function TutorialStepper() {
  const data = useDatabase();
  const doneIds = new Set(data.tutorialSteps.filter((s) => s.done).map((s) => s.id));
  const value = pct(doneIds.size, TUTORIAL.length);
  const nextIndex = TUTORIAL.findIndex((s) => !doneIds.has(s.id));

  function toggle(id: string, title: string) {
    const next = !doneIds.has(id);
    db.upsert("tutorialSteps", { id, done: next, updatedAt: new Date().toISOString() });
    db.track(next ? "tutorial.step.done" : "tutorial.step.undone", title);
  }

  function resetAll() {
    TUTORIAL.forEach((s) => doneIds.has(s.id) && db.remove("tutorialSteps", s.id));
    db.track("tutorial.reset", "Ghidul a fost resetat");
  }

  return (
    <div className="stepper">
      <div className="stepper-summary" aria-live="polite">
        <ProgressRing value={value} size={88} />
        <div>
          <h2>
            {doneIds.size === TUTORIAL.length ? "Ghid terminat. Felicitări!" : `${doneIds.size} din ${TUTORIAL.length} pași finalizați`}
          </h2>
          <p className="muted">
            {nextIndex >= 0 ? `Următorul pas: ${TUTORIAL[nextIndex].title}.` : "Ai parcurs tot fluxul GitHub, de la zero la primul merge."}
          </p>
        </div>
        <button type="button" className="btn btn-ghost" onClick={resetAll} disabled={doneIds.size === 0}>
          Resetează
        </button>
      </div>

      <ol className="steps">
        {TUTORIAL.map((s, i) => {
          const done = doneIds.has(s.id);
          return (
            <li key={s.id} className={cn("step", done && "step-done", i === nextIndex && "step-next")}>
              <div className="step-head">
                <span className="step-num">{done ? <Icon name="check" size={16} /> : i + 1}</span>
                <h3>{s.title}</h3>
                <label className="switch">
                  <input type="checkbox" checked={done} onChange={() => toggle(s.id, s.title)} aria-label={`Marchează pasul ${i + 1} ca terminat`} />
                  <span className="switch-track" />
                </label>
              </div>
              <div className="step-body">
                <p>{s.text}</p>
                {s.code && <Terminal lines={s.code} />}
                {s.tip && <p className="callout"><Icon name="info" size={18} />{s.tip}</p>}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
