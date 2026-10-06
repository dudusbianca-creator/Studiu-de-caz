"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface TerminalProps {
  lines: string[];
  title?: string;
  /** Afișează prompt-ul $ înaintea comenzilor. Implicit true. */
  prompt?: boolean;
  className?: string;
}

function renderLine(line: string, prompt: boolean, key: number) {
  if (line.trim() === "") return <div key={key}>&nbsp;</div>;
  if (line.startsWith("#")) {
    return <div key={key} className="t-comment">{line}</div>;
  }
  const m = line.match(/^(git \S+|cd|echo|npm \S+)(.*)$/);
  return (
    <div key={key}>
      {prompt && <span className="t-prompt">$ </span>}
      {m ? (
        <>
          <span className="t-cmd">{m[1]}</span>
          <span>{m[2]}</span>
        </>
      ) : (
        <span>{line}</span>
      )}
    </div>
  );
}

export function Terminal({ lines, title = "terminal", prompt = true, className }: TerminalProps) {
  const [copied, setCopied] = useState(false);
  const raw = lines.filter((l) => !l.startsWith("#")).join("\n").trim();

  async function copy() {
    try {
      await navigator.clipboard.writeText(raw);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard indisponibil: utilizatorul poate selecta manual */
    }
  }

  return (
    <div className={cn("terminal", className)}>
      <div className="terminal-bar">
        <span className="dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="terminal-title">{title}</span>
        <button type="button" className="terminal-copy" onClick={copy} aria-label="Copiază comanda">
          {copied ? "Copiat" : "Copiază"}
        </button>
      </div>
      <pre className="terminal-body">{lines.map((l, i) => renderLine(l, prompt, i))}</pre>
    </div>
  );
}
