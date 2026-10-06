import Link from "next/link";
import type { Lesson } from "@/data/lessons";
import { Icon } from "@/components/ui/Icon";
import { LessonStatus } from "./LessonStatus";

export function LessonCard({ lesson, index }: { lesson: Lesson; index: number }) {
  return (
    <Link href={`/lectii/${lesson.slug}`} className="card card-link">
      <span className={`card-icon tone-${lesson.tone}`}>
        <Icon name={lesson.icon} size={24} />
      </span>
      <p className="card-meta">Lecția {index + 1} · {lesson.minutes} min</p>
      <h3>{lesson.title}</h3>
      <p>{lesson.summary}</p>
      <LessonStatus slug={lesson.slug} />
    </Link>
  );
}
