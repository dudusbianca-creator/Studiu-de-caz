import type { Metadata } from "next";
import { Container, PageHeader, Section } from "@/components/layout/Container";
import { TutorialStepper } from "@/components/features/TutorialStepper";

export const metadata: Metadata = {
  title: "Ghid pentru începători",
  description: "Nouă pași, de la crearea contului GitHub până la primul merge. Progresul tău este salvat.",
};

export default function GuidePage() {
  return (
    <>
      <PageHeader
        eyebrow="Ghid practic"
        title="De la zero la primul merge."
        lead="Nouă pași. Bifează fiecare pas terminat, iar progresul rămâne salvat în browserul tău."
      />
      <Section>
        <Container narrow>
          <TutorialStepper />
        </Container>
      </Section>
    </>
  );
}
