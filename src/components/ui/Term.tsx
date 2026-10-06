import type { ReactNode } from "react";

/** Termen tehnic cu explicație la hover sau focus. */
export function Term({ tip, children }: { tip: string; children: ReactNode }) {
  return (
    <span className="term" tabIndex={0} data-tip={tip}>
      {children}
    </span>
  );
}
