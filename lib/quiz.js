import { shuffle } from "./shuffle";

const LETTERS = ["A", "B", "C", "D"];

// Turn a raw question into a quiz item with its choices reshuffled.
function toItem(term, raw, index) {
  const correctIndex = LETTERS.indexOf(raw.a);
  const order = shuffle(raw.c.map((text, i) => ({ text, isCorrect: i === correctIndex })));
  return {
    id: `${term.id}-${index}`,
    termId: term.id,
    termLabel: term.label,
    q: raw.q,
    code: raw.code ?? null,
    e: raw.e,
    choices: order.map((o) => o.text),
    correct: order.findIndex((o) => o.isCorrect),
  };
}

function pool(term) {
  return term.questions.map((raw, i) => toItem(term, raw, i));
}

// Practice: every question from the chosen terms, freshly shuffled.
export function buildPractice(subject, termIds, count) {
  const items = subject.terms.filter((t) => termIds.includes(t.id)).flatMap(pool);
  const mixed = shuffle(items);
  return count === "all" ? mixed : mixed.slice(0, count);
}

// Mock final: shuffled mix of Prelims, Midterms, Prefinals and the final topics.
// Final topics get 40% of the items; each earlier term gets 20%.
const WEIGHTS = { prelim: 0.2, midterm: 0.2, prefinal: 0.2, finals: 0.4 };

export function buildMock(subject, count) {
  const pools = subject.terms.map((t) => ({ id: t.id, items: shuffle(pool(t)) }));
  const total = Math.min(count, pools.reduce((n, p) => n + p.items.length, 0));
  const picked = [];
  const leftovers = [];

  for (const p of pools) {
    const want = Math.round(total * (WEIGHTS[p.id] ?? 0.25));
    picked.push(...p.items.slice(0, want));
    leftovers.push(...p.items.slice(want));
  }
  // Rounding can leave us short or long; top up from leftovers or trim.
  const extra = shuffle(leftovers);
  while (picked.length < total && extra.length) picked.push(extra.pop());
  return shuffle(picked).slice(0, total);
}

export { LETTERS };
