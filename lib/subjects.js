import java from "@/data/java";
import ds from "@/data/ds";

export const subjects = [java, ds];

export function getSubject(slug) {
  return subjects.find((s) => s.slug === slug) ?? null;
}

export function countQuestions(subject) {
  return subject.terms.reduce((n, t) => n + t.questions.length, 0);
}
