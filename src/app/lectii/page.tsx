import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/layout/Container";
import { LessonCard } from "@/components/features/LessonCard";
import { LESSONS } from "@/data/lessons";

export const metadata: Metadata = {
  title: "Lecții",
  description: "Șapte lecții despre GitHub: repository, branch-uri, Pull Request, Issues și GitHub Actions.",
};

export default function LessonsPage() {
  const total = LESSONS.reduce((n, l) => n + l.minutes, 0);
  return (
    <>
      <PageHeader eyebrow="Lecții" title="Învață pas cu pas." lead={`${LESSONS.length} lecții, aproximativ ${total} de minute în total. Fiecare lecție poate fi marcată ca terminată.`} />
      <Section>
        <div className="grid grid-3">
          {LESSONS.map((l, i) => (
            <LessonCard key={l.slug} lesson={l} index={i} />
          ))}
        </div>
      </Section>
    </>
  );
}
