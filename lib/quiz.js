import { shuffle } from "./shuffle";

export const LETTERS = ["A", "B", "C", "D"];

const norm = (s) => String(s).trim().toLowerCase().replace(/\.$/, "");

// Why a given (wrong) choice is wrong: per-question override first, then the glossary.
export function reasonFor(why, termId, qIndex, choiceIndex, text) {
  const o = why?.overrides?.[termId]?.[qIndex];
  if (o && o[choiceIndex]) return o[choiceIndex];
  return why?.glossary?.[norm(text)] ?? null;
}

// Turn a raw question into a quiz item; choices are reshuffled every call.
function toItem(subject, term, raw, index) {
  const correctIndex = LETTERS.indexOf(raw.a);
  const order = shuffle(
    raw.c.map((text, i) => ({
      text,
      isCorrect: i === correctIndex,
      why: i === correctIndex ? null : reasonFor(subject.why, term.id, index, i, text),
    }))
  );
  return {
    id: `${term.id}-${index}`,
    termId: term.id,
    termLabel: term.label,
    isNew: Boolean(term.isNew),
    q: raw.q,
    code: raw.code ?? null,
    e: raw.e,
    choices: order.map((o) => o.text),
    why: order.map((o) => o.why),
    correct: order.findIndex((o) => o.isCorrect),
  };
}

function pool(subject, term) {
  return term.questions.map((raw, i) => toItem(subject, term, raw, i));
}

export function allItems(subject) {
  return subject.terms.flatMap((t) => pool(subject, t));
}

// Review: questions from the chosen terms (optionally flagged only), freshly shuffled.
export function buildReview(subject, { termIds, count, flaggedOnly, flags }) {
  let items = subject.terms.filter((t) => termIds.includes(t.id)).flatMap((t) => pool(subject, t));
  if (flaggedOnly) items = allItems(subject).filter((it) => flags.includes(it.id));
  const mixed = shuffle(items);
  return count === "all" ? mixed : mixed.slice(0, count);
}

// Exam: shuffled mix of Prelims, Midterms, Prefinals and the final topics.
// Final topics get 40% of the items; each earlier term gets 20%.
export const EXAM_WEIGHTS = { prelim: 0.2, midterm: 0.2, prefinal: 0.2, finals: 0.4 };

export function examPlan(subject, count) {
  const total = Math.min(count, subject.terms.reduce((n, t) => n + t.questions.length, 0));
  return subject.terms.map((t) => ({
    id: t.id,
    label: t.label,
    n: Math.min(t.questions.length, Math.round(total * (EXAM_WEIGHTS[t.id] ?? 0.25))),
  }));
}

export function buildExam(subject, count) {
  const plan = examPlan(subject, count);
  const total = Math.min(count, subject.terms.reduce((n, t) => n + t.questions.length, 0));
  const picked = [];
  const leftovers = [];
  subject.terms.forEach((t, i) => {
    const items = shuffle(pool(subject, t));
    picked.push(...items.slice(0, plan[i].n));
    leftovers.push(...items.slice(plan[i].n));
  });
  const extra = shuffle(leftovers);
  while (picked.length < total && extra.length) picked.push(extra.pop());
  return shuffle(picked).slice(0, total);
}

// Re-deal a set of items (e.g. "retry mistakes") with new choice order.
export function reshuffleItems(subject, items) {
  const ids = new Set(items.map((i) => i.id));
  return shuffle(allItems(subject).filter((it) => ids.has(it.id)));
}
