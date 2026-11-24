import { getSubject } from "@/lib/subjects";
import Flashcards from "@/components/Flashcards";

export const metadata = { title: "Flashcards" };

export default async function FlashcardsPage({ params }) {
  const { subject } = await params;
  const s = getSubject(subject);
  return (
    <div className="page-enter">
      <h1 className="large-title">Flashcards</h1>
      <p className="lede">Tap a card to flip it. Swipe right if you knew it, or left to see it again later.</p>
      <Flashcards subject={s} />
    </div>
  );
}
