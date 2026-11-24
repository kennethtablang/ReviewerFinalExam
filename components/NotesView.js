"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readJSON, writeJSON } from "@/lib/storage";
import Segmented from "./Segmented";
import { CodeBlock, RichText } from "./ui";

export default function NotesView({ slug, terms }) {
  const key = `reviewer:notes-term:${slug}`;
  const [termId, setTermId] = useState(terms[terms.length - 1].id);

  useEffect(() => {
    const saved = readJSON(key, null);
    if (saved && terms.some((t) => t.id === saved)) setTermId(saved);
  }, [key, terms]);

  const pick = (id) => {
    setTermId(id);
    writeJSON(key, id);
  };

  const term = terms.find((t) => t.id === termId);

  return (
    <div>
      <Segmented
        label="Term"
        value={termId}
        onChange={pick}
        options={terms.map((t) => ({ value: t.id, label: t.id === "finals" ? "Final" : t.label.replace(/s$/, "") }))}
      />
      <div key={term.id} className="page-enter">
        <div className="term-head">
          <h2>
            {term.label}
            {term.isNew && <span className="pill-new">New this term</span>}
          </h2>
          <p>{term.topics}</p>
        </div>
        <div className="notes">
          {term.notes.map((n) => (
            <section className="note glass" key={n.h}>
              <h3>{n.h}</h3>
              {n.table && (
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        {n.table.head.map((h, i) => (
                          <th key={i}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {n.table.rows.map((r, i) => (
                        <tr key={i}>
                          {r.map((c, j) => (
                            <td key={j}>
                              <RichText text={c} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {n.points?.length > 0 && (
                <ul>
                  {n.points.map((p, i) => (
                    <li key={i}>
                      <RichText text={p} />
                    </li>
                  ))}
                </ul>
              )}
              <CodeBlock code={n.code} />
            </section>
          ))}
        </div>
        <div className="cta-panel glass">
          <p>
            {term.count} questions from {term.label}. Test yourself with explanations for every choice.
          </p>
          <div className="btn-row">
            <Link className="btn btn-glass glass" href={`/${slug}/flashcards`}>
              Flashcards
            </Link>
            <Link className="btn btn-primary" href={`/${slug}/review`}>
              Start review
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
