"use client";

import { useMemo, useState } from "react";
import { COMMANDS, type GitCommand } from "@/data/commands";
import { db } from "@/lib/db";
import { cn, normalize } from "@/lib/utils";
import { useDatabase } from "@/hooks/useDatabase";
import { Icon } from "@/components/ui/Icon";
import { Terminal } from "@/components/ui/Terminal";

const GROUPS: ("Toate" | GitCommand["group"] | "Salvate")[] = ["Toate", "Început", "Zi de zi", "Ramuri", "Salvate"];

export function CommandExplorer() {
  const data = useDatabase();
  const [group, setGroup] = useState<(typeof GROUPS)[number]>("Toate");
  const [query, setQuery] = useState("");
  const saved = useMemo(() => new Set(data.bookmarks.map((b) => b.id)), [data.bookmarks]);

  const list = COMMANDS.filter((c) => {
    if (group === "Salvate" && !saved.has(c.name)) return false;
    if (group !== "Toate" && group !== "Salvate" && c.group !== group) return false;
    const q = normalize(query);
    return !q || normalize(`${c.name} ${c.explain} ${c.when}`).includes(q);
  });

  function toggle(name: string) {
    if (saved.has(name)) {
      db.remove("bookmarks", name);
      db.track("bookmark.removed", name);
    } else {
      db.upsert("bookmarks", { id: name, createdAt: new Date().toISOString() });
      db.track("bookmark.added", name);
    }
  }

  return (
    <div className="explorer">
      <div className="explorer-bar">
        <div className="segmented" role="tablist" aria-label="Filtrează comenzile">
          {GROUPS.map((g) => (
            <button
              key={g}
              type="button"
              role="tab"
              aria-selected={group === g}
              className={cn("segment", group === g && "segment-on")}
              onClick={() => setGroup(g)}
            >
              {g}
              {g === "Salvate" && saved.size > 0 ? ` (${saved.size})` : ""}
            </button>
          ))}
        </div>
        <label className="field-inline">
          <Icon name="search" size={16} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filtrează comenzile"
            aria-label="Filtrează comenzile"
          />
        </label>
      </div>

      {list.length === 0 ? (
        <p className="empty">
          {group === "Salvate" ? "Nu ai salvat nicio comandă încă. Apasă steluța de lângă o comandă." : "Nicio comandă nu se potrivește."}
        </p>
      ) : (
        <ul className="command-list">
          {list.map((c) => (
            <li key={c.name} className="command">
              <Terminal lines={c.lines} />
              <div className="command-info">
                <div className="command-head">
                  <h3>{c.name}</h3>
                  <button
                    type="button"
                    className={cn("star", saved.has(c.name) && "star-on")}
                    onClick={() => toggle(c.name)}
                    aria-pressed={saved.has(c.name)}
                    aria-label={saved.has(c.name) ? `Elimină ${c.name} din salvate` : `Salvează ${c.name}`}
                  >
                    <Icon name="star" size={20} fill={saved.has(c.name) ? "currentColor" : "none"} />
                  </button>
                </div>
                <p>{c.explain}</p>
                <p className="command-when"><strong>Când:</strong> {c.when}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
