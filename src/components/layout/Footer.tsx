import Link from "next/link";
import { FOOTER_GROUPS, SITE } from "@/lib/site";
import { Container } from "./Container";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="footer">
      <Container>
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p>
              O platformă educațională gratuită care explică GitHub pe înțelesul începătorilor și al studenților.
              Site independent, fără legătură oficială cu GitHub.
            </p>
          </div>
          {FOOTER_GROUPS.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="footer-title">{group.title}</h2>
              <ul>
                {group.links.map((l) => (
                  <li key={l.href}>
                    {l.external ? (
                      <a href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
                    ) : (
                      <Link href={l.href}>{l.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="footer-legal">
          <span>© {SITE.year} {SITE.name}. Material educațional.</span>
          <span>GitHub și Git sunt mărci ale proprietarilor lor.</span>
        </div>
      </Container>
    </footer>
  );
}
