"use client";

import { useState } from "react";
import { db, TABLES, type TableName } from "@/lib/db";
import { useDatabase } from "@/hooks/useDatabase";
import { cn, downloadJson, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

const LABELS: Record<TableName, string> = {
  lessonProgress: "Lecții",
  tutorialSteps: "Pași ghid",
  bookmarks: "Comenzi salvate",
  feedback: "Mesaje",
  events: "Activitate",
};

export function DataConsole() {
  const data = useDatabase();
  const [active, setActive] = useState<TableName>("lessonProgress");
  const [confirm, setConfirm] = useState(false);
  const rows = data[active] as unknown as Record<string, unknown>[];
  const columns = rows.length ? Object.keys(rows[0]) : [];

  function show(v: unknown): string {
    if (typeof v === "boolean") return v ? "da" : "nu";
    if (typeof v === "string" && /^\d{4}-\d{2}-\d{2}T/.test(v)) return formatDate(v);
    return String(v);
  }

  return (
    <div className="data-console">
      <div className="stat-grid">
        {TABLES.map((t) => (
          <button key={t} type="button" className={cn("stat", active === t && "stat-on")} onClick={() => setActive(t)}>
            <strong>{data[t].length}</strong>
            <span>{LABELS[t]}</span>
          </button>
        ))}
      </div>

      <div className="console-actions">
        <Button variant="secondary" onClick={() => db.dump()}>
          <Icon name="terminal" size={16} /> Afișează în consolă
        </Button>
        <Button variant="secondary" onClick={() => downloadJson("github-academy-db.json", data)}>
          <Icon name="download" size={16} /> Exportă JSON
        </Button>
        {confirm ? (
          <>
            <Button
              variant="primary"
              className="btn-danger"
              onClick={() => {
                db.reset();
                setConfirm(false);
              }}
            >
              Confirmă ștergerea
            </Button>
            <Button variant="ghost" onClick={() => setConfirm(false)}>Anulează</Button>
          </>
        ) : (
          <Button variant="ghost" onClick={() => setConfirm(true)}>
            <Icon name="trash" size={16} /> Șterge tot
          </Button>
        )}
      </div>

      <div className="table-card">
        <div className="table-title">
          <Icon name="database" size={18} />
          <strong>{active}</strong>
          <span className="muted">{rows.length} rânduri</span>
        </div>
        {rows.length === 0 ? (
          <p className="empty">Tabelul este gol. Marchează o lecție, bifează un pas din ghid sau trimite un mesaj.</p>
        ) : (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>{columns.map((c) => <th key={c}>{c}</th>)}</tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={String(r.id) + i}>
                    {columns.map((c) => <td key={c}>{show(r[c])}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
