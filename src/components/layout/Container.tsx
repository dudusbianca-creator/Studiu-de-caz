import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  narrow?: boolean;
  className?: string;
}

export function Container({ children, narrow, className }: ContainerProps) {
  return <div className={cn("container", narrow && "container-narrow", className)}>{children}</div>;
}

interface SectionProps {
  children: ReactNode;
  tinted?: boolean;
  id?: string;
}

/** Secțiune pe toată lățimea, cu fundal alb sau gri deschis, ca pe apple.com. */
export function Section({ children, tinted, id }: SectionProps) {
  return (
    <section id={id} className={cn("section", tinted && "section-tinted")}>
      <Container>{children}</Container>
    </section>
  );
}

export function PageHeader({ eyebrow, title, lead }: { eyebrow?: string; title: string; lead?: string }) {
  return (
    <header className="page-header">
      <Container narrow>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
      </Container>
    </header>
  );
}
