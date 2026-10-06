import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, PageHeader } from "@/components/layout/Container";
import { LessonCompleteButton } from "@/components/features/LessonCompleteButton";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Terminal } from "@/components/ui/Terminal";
import { LESSONS, getLesson } from "@/data/lessons";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return LESSONS.map((l) => ({ slug: l.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const lesson = getLesson(params.slug);
  return lesson ? { title: lesson.title, description: lesson.summary } : {};
}

export default function LessonPage({ params }: Props) {
  const lesson = getLesson(params.slug);
  if (!lesson) notFound();

  const i = LESSONS.findIndex((l) => l.slug === lesson.slug);
  const prev = LESSONS[i - 1];
  const next = LESSONS[i + 1];

  return (
    <>
      <PageHeader eyebrow={`Lecția ${i + 1} din ${LESSONS.length} · ${lesson.minutes} min`} title={lesson.title} lead={lesson.summary} />
      <Container narrow className="lesson">
        {lesson.sections.map((s) => (
          <section key={s.heading} className="lesson-section">
            <h2>{s.heading}</h2>
            {s.body?.map((p) => <p key={p}>{p}</p>)}
            {s.items && (
              <div className="grid grid-2">
                {s.items.map((it) => (
                  <div key={it.title} className="card card-flat">
                    <h3>{it.title}</h3>
                    <p>{it.text}</p>
                  </div>
                ))}
              </div>
            )}
            {s.list && (
              <ul className="checklist">
                {s.list.map((li) => (
                  <li key={li}><Icon name="check" size={18} />{li}</li>
                ))}
              </ul>
            )}
            {s.code && <Terminal lines={s.code.lines} title={s.code.title} prompt={s.code.title === "terminal"} />}
            {s.note && <p className="callout"><Icon name="info" size={18} />{s.note}</p>}
          </section>
        ))}

        <div className="lesson-done">
          <LessonCompleteButton slug={lesson.slug} title={lesson.title} />
        </div>

        <nav className="lesson-nav" aria-label="Navigare între lecții">
          {prev ? (
            <Link href={`/lectii/${prev.slug}`} className="card card-link">
              <span className="card-meta">Înapoi</span>
              <strong>{prev.title}</strong>
            </Link>
          ) : <span />}
          {next ? (
            <Link href={`/lectii/${next.slug}`} className="card card-link lesson-next">
              <span className="card-meta">Următoarea</span>
              <strong>{next.title}</strong>
            </Link>
          ) : (
            <Button href="/ghid" size="lg">Treci la ghidul practic</Button>
          )}
        </nav>
      </Container>
    </>
  );
}
