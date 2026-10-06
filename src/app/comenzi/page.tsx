import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/layout/Container";
import { CommandExplorer } from "@/components/features/CommandExplorer";

export const metadata: Metadata = {
  title: "Comenzi Git",
  description: "Cele 10 comenzi Git esențiale, cu explicații simple și exemple pe care le poți copia.",
};

export default function CommandsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Comenzi Git"
        title="Zece comenzi. Atât îți trebuie."
        lead="Filtrează, copiază și salvează comenzile preferate. Steluțele se păstrează în baza de date locală."
      />
      <Section>
        <CommandExplorer />
      </Section>
    </>
  );
}
