import type { Metadata } from "next";
import { Container, PageHeader, Section } from "@/components/layout/Container";
import { DataConsole } from "@/components/features/DataConsole";
import { FeedbackForm } from "@/components/features/FeedbackForm";
import { Terminal } from "@/components/ui/Terminal";

export const metadata: Metadata = {
  title: "Datele mele",
  description: "Baza de date locală a site-ului: progres, comenzi salvate și mesaje, stocate în localStorage.",
};

export default function DataPage() {
  return (
    <>
      <PageHeader
        eyebrow="Baza de date locală"
        title="Datele tale. Doar la tine."
        lead="Tot ce faci pe site se salvează în localStorage, în browserul tău. Nimic nu pleacă pe un server."
      />
      <Section>
        <DataConsole />
      </Section>
      <Section tinted>
        <Container narrow>
          <h2>Vezi datele în consolă.</h2>
          <p className="lead">Deschide consola browserului (F12, apoi Console). Fiecare salvare apare acolo, iar baza este disponibilă ca <code>ghDb</code>.</p>
          <Terminal
            prompt={false}
            title="Console"
            lines={["ghDb.dump()    // afișează toate tabelele", "ghDb.read()    // returnează obiectul cu date", "ghDb.reset()   // șterge tot"]}
          />
        </Container>
      </Section>
      <Section>
        <Container narrow>
          <h2>Spune-ne părerea ta.</h2>
          <p className="lead">Mesajul se salvează în tabelul feedback și apare în consolă.</p>
          <FeedbackForm />
        </Container>
      </Section>
    </>
  );
}
