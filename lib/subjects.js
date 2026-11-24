import java from "@/data/java";
import ds from "@/data/ds";
import whyJava from "@/data/why-java";
import whyDs from "@/data/why-ds";

export const subjects = [
  { ...java, why: whyJava },
  { ...ds, why: whyDs },
];

export function getSubject(slug) {
  return subjects.find((s) => s.slug === slug) ?? null;
}

export function countQuestions(subject) {
  return subject.terms.reduce((n, t) => n + t.questions.length, 0);
}
