"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const icons = {
  notes: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 4.5h10.5L19 8v11.5H5z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M8.5 11h7M8.5 14.5h7M8.5 7.5h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  cards: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="7" width="13" height="13" rx="3" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 4h9a3 3 0 0 1 3 3v9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  review: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
      <path d="m8.5 12.2 2.4 2.3 4.6-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  exam: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="13" r="7.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 9.5V13l2.5 1.6M10 3.5h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
};

export default function TabBar({ slug }) {
  const pathname = usePathname();
  const tabs = [
    { href: `/${slug}`, label: "Notes", icon: icons.notes },
    { href: `/${slug}/flashcards`, label: "Flashcards", icon: icons.cards },
    { href: `/${slug}/review`, label: "Review", icon: icons.review },
    { href: `/${slug}/exam`, label: "Exam", icon: icons.exam },
  ];
  const index = Math.max(
    0,
    tabs.findIndex((t) => t.href === pathname)
  );

  return (
    <nav className="tabbar glass" aria-label="Sections" style={{ "--count": tabs.length, "--index": index }}>
      <span className="thumb" aria-hidden="true" />
      {tabs.map((t, i) => (
        <Link key={t.href} href={t.href} aria-current={i === index ? "page" : undefined}>
          {t.icon}
          {t.label}
        </Link>
      ))}
    </nav>
  );
}
