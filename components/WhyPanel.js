import { LETTERS } from "@/lib/quiz";

// Explains the correct answer and why each other choice is wrong.
export default function WhyPanel({ item, picked }) {
  const answered = picked != null;
  const right = picked === item.correct;
  const others = item.choices
    .map((text, i) => ({ text, i, why: item.why[i] }))
    .filter((c) => c.i !== item.correct);

  return (
    <div className={`explain ${answered ? (right ? "ok" : "bad") : ""}`}>
      <p className="verdict">
        {!answered ? "Not answered" : right ? "Correct" : `Not quite. You picked ${LETTERS[picked]}.`}
      </p>
      <div className="why-right">
        <span className="why-label">Why {LETTERS[item.correct]} is right</span>
        <p>
          <b>{item.choices[item.correct]}</b>
          {": "}
          {item.e}
        </p>
      </div>
      <div className="why-wrong">
        <span className="why-label">Why the others are wrong</span>
        <ul>
          {others.map((c) => (
            <li key={c.i} className={c.i === picked ? "was-picked" : undefined}>
              <span className="mini-letter" aria-hidden="true">
                {LETTERS[c.i]}
              </span>
              <span>
                <b>{c.text}</b>
                {c.why ? `: ${c.why}` : ""}
                {c.i === picked && <em> (your answer)</em>}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
