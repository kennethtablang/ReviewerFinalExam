// Small shared presentational pieces (server-safe, no hooks).

export function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <div className="blob a" />
      <div className="blob b" />
      <div className="blob c" />
    </div>
  );
}

// Renders `inline code` spans inside plain text.
export function RichText({ text }) {
  const parts = String(text).split("`");
  return parts.map((p, i) => (i % 2 === 1 ? <code key={i}>{p}</code> : <span key={i}>{p}</span>));
}

export function CodeBlock({ code }) {
  if (!code) return null;
  return (
    <pre className="code">
      <code>{code}</code>
    </pre>
  );
}

export function Check() {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2.5 6.2 5 8.5l4.5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M12.5 4 6.5 10l6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ShuffleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M3 6h3.2c1.3 0 2.5.6 3.3 1.7l1.9 2.6c.8 1.1 2 1.7 3.3 1.7H17m0 0-2.4-2.4M17 12l-2.4 2.4M3 14h3.2c1 0 2-.4 2.7-1.1M17 6h-2.3c-1 0-2 .4-2.7 1.1M17 6l-2.4-2.4M17 6l-2.4 2.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
