import { COMMANDS } from "@/data/commands";
import { FAQ } from "@/data/faq";
import { LESSONS } from "@/data/lessons";
import { normalize } from "./utils";

export interface SearchEntry {
  kind: "Lecție" | "Comandă" | "Întrebare";
  title: string;
  snippet: string;
  href: string;
  haystack: string;
  titleNorm: string;
}

function make(kind: SearchEntry["kind"], title: string, text: string, href: string): SearchEntry {
  return { kind, title, snippet: text.slice(0, 120), href, haystack: normalize(`${title} ${text}`), titleNorm: normalize(title) };
}

export function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];
  for (const l of LESSONS) {
    const body = l.sections
      .flatMap((s) => [s.heading, ...(s.body ?? []), ...(s.list ?? []), ...(s.items ?? []).map((i) => `${i.title} ${i.text}`)])
      .join(" ");
    entries.push(make("Lecție", l.title, `${l.summary} ${body}`, `/lectii/${l.slug}`));
  }
  for (const c of COMMANDS) entries.push(make("Comandă", c.name, `${c.explain} ${c.when} ${c.lines.join(" ")}`, "/comenzi"));
  for (const f of FAQ) entries.push(make("Întrebare", f.q, f.a, "/#intrebari"));
  return entries;
}

export function search(index: SearchEntry[], query: string, limit = 8): SearchEntry[] {
  const words = normalize(query).split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return index
    .map((e) => {
      let score = 0;
      for (const w of words) {
        if (e.titleNorm.includes(w)) score += 3;
        if (e.haystack.includes(w)) score += 1;
        else return { e, score: 0 };
      }
      return { e, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.e);
}
