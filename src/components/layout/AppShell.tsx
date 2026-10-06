"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { exposeDbToConsole } from "@/lib/db";
import { Icon } from "@/components/ui/Icon";
import { SearchDialog } from "@/components/features/SearchDialog";
import { Footer } from "./Footer";
import { Header } from "./Header";

/** Structura comună a tuturor paginilor: header, conținut, footer, căutare globală. */
export function AppShell({ children }: { children: ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  useEffect(() => {
    exposeDbToConsole();
    console.info(
      "%cDescoperă GitHub%c Scrie ghDb.dump() în consolă ca să vezi baza de date locală.",
      "font-weight:700;color:#0071e3",
      "color:inherit",
    );
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (document.activeElement?.tagName ?? "").toLowerCase();
      const typing = tag === "input" || tag === "textarea" || tag === "select";
      if (e.key === "/" && !typing && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setSearchOpen(true);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#continut">Sari la conținut</a>
      <Header onSearch={openSearch} />
      <main id="continut" tabIndex={-1}>{children}</main>
      <Footer />
      <button
        type="button"
        className={`to-top${showTop ? " to-top-on" : ""}`}
        aria-label="Înapoi sus"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <Icon name="arrow" size={18} style={{ transform: "rotate(-90deg)" }} />
      </button>
      <SearchDialog open={searchOpen} onClose={closeSearch} />
    </>
  );
}
