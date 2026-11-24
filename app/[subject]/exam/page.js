import { getSubject } from "@/lib/subjects";
import Quiz from "@/components/Quiz";

export const metadata = { title: "Exam mode" };

export default async function ExamPage({ params }) {
  const { subject } = await params;
  const s = getSubject(subject);
  return (
    <div className="page-enter">
      <h1 className="large-title">Exam mode</h1>
      <Quiz subject={s} mode="exam" />
    </div>
  );
}
