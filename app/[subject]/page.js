import { getSubject } from "@/lib/subjects";
import NotesView from "@/components/NotesView";

export default async function NotesPage({ params }) {
  const { subject } = await params;
  const s = getSubject(subject);
  // Send only the notes to the client, not the question bank.
  const terms = s.terms.map(({ questions, ...t }) => ({ ...t, count: questions.length }));
  return (
    <div className="page-enter">
      <p className="page-code">{s.code}</p>
      <h1 className="large-title">{s.title}</h1>
      <NotesView slug={s.slug} terms={terms} />
    </div>
  );
}
