import { getSubject } from "@/lib/subjects";
import Quiz from "@/components/Quiz";

export const metadata = { title: "Review mode" };

export default async function ReviewPage({ params }) {
  const { subject } = await params;
  const s = getSubject(subject);
  return (
    <div className="page-enter">
      <h1 className="large-title">Review mode</h1>
      <Quiz subject={s} mode="review" />
    </div>
  );
}
