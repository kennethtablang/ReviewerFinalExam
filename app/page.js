import Link from "next/link";
import { subjects, countQuestions } from "@/lib/subjects";
import NavBar from "@/components/NavBar";
import SubjectStats from "@/components/SubjectStats";
import { Backdrop } from "@/components/ui";

export default function Home() {
  return (
    <div className="app-main" data-tint="home">
      <Backdrop />
      <NavBar title="Final Exam Reviewer" />
      <main className="shell page-enter">
        <h1 className="large-title">Final Exam Reviewer</h1>
        <p className="lede">
          The final exam mixes questions from Prelims, Midterms and Prefinals with the new final topics. Pick a subject
          to read the notes, drill with flashcards, practice with explanations, or take a shuffled practice exam.
        </p>

        <div className="subjects">
          {subjects.map((s) => (
            <section key={s.slug} className="subject-card glass" data-tint={s.slug === "java" ? "java" : "ds"}>
              <span className="orb" aria-hidden="true" />
              <span className="code">
                {s.code} · {countQuestions(s)} questions
              </span>
              <h2>{s.title}</h2>
              <ul className="coverage">
                {s.terms.map((t) => (
                  <li key={t.id}>
                    <span className={`term${t.isNew ? " new" : ""}`}>{t.id === "finals" ? "Final" : t.label}</span>
                    <span className="what">{t.topics}</span>
                  </li>
                ))}
              </ul>
              <SubjectStats slug={s.slug} />
              <div className="card-actions">
                <Link className="btn btn-primary" href={`/${s.slug}/exam`}>
                  Exam mode
                </Link>
                <Link className="btn btn-glass glass" href={`/${s.slug}/review`}>
                  Review mode
                </Link>
                <Link className="btn btn-glass glass" href={`/${s.slug}/flashcards`}>
                  Flashcards
                </Link>
                <Link className="btn btn-glass glass" href={`/${s.slug}`}>
                  Notes
                </Link>
              </div>
            </section>
          ))}
        </div>

        <p className="foot">
          The answer keys and explanations were written for this reviewer. If something looks off, check it against your
          handouts.
        </p>
      </main>
    </div>
  );
}
