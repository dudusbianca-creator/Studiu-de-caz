import { Icon } from "./Icon";

interface AccordionProps {
  items: { q: string; a: string }[];
}

/** Întrebări expandabile, bazate pe <details> (accesibil fără JavaScript). */
export function Accordion({ items }: AccordionProps) {
  return (
    <div className="accordion">
      {items.map((it) => (
        <details key={it.q}>
          <summary>
            <span>{it.q}</span>
            <Icon name="chev" size={18} />
          </summary>
          <p>{it.a}</p>
        </details>
      ))}
    </div>
  );
}
