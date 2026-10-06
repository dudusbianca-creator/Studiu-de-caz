"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { buildSearchIndex, search } from "@/lib/search";
import { Icon } from "@/components/ui/Icon";

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const index = useMemo(() => buildSearchIndex(), []);
  const results = useMemo(() => search(index, query), [index, query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="search-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="search-panel" role="dialog" aria-modal="true" aria-label="Căutare pe site">
        <label className="search-field">
          <Icon name="search" size={20} />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Caută: commit, branch, README, merge…"
            autoComplete="off"
          />
          <button type="button" className="kbd" onClick={onClose}>Esc</button>
        </label>
        <ul className="search-results" aria-live="polite">
          {!query && <li className="search-hint">Scrie un cuvânt. Caut în lecții, comenzi și întrebări frecvente.</li>}
          {query && results.length === 0 && (
            <li className="search-hint">Niciun rezultat pentru „{query}”. Încearcă un cuvânt mai scurt.</li>
          )}
          {results.map((r) => (
            <li key={`${r.kind}-${r.title}`}>
              <Link href={r.href} onClick={onClose}>
                <span className="search-kind">{r.kind}</span>
                <strong>{r.title}</strong>
                <small>{r.snippet}</small>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
