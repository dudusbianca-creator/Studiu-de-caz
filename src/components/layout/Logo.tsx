import Link from "next/link";
import { SITE } from "@/lib/site";

/** Simbol original (ramuri și noduri), nu logo-ul oficial GitHub. */
export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#1d1d1f" />
      <g fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round">
        <circle cx="11" cy="9" r="2.3" />
        <circle cx="11" cy="23" r="2.3" />
        <circle cx="21" cy="14" r="2.3" />
        <path d="M11 11.3v9.4M21 16.3c0 4.2-10 2.4-10 4.4" />
      </g>
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="logo" aria-label={`${SITE.name}, pagina principală`}>
      <LogoMark />
      <span>{SITE.name}</span>
    </Link>
  );
}
