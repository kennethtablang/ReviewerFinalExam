"use client";

// iOS-style segmented control with a spring-animated thumb.
export default function Segmented({ options, value, onChange, label }) {
  const index = Math.max(
    0,
    options.findIndex((o) => o.value === value)
  );
  return (
    <div
      className="segmented glass"
      role="group"
      aria-label={label}
      style={{ "--count": options.length, "--index": index }}
    >
      <span className="thumb" aria-hidden="true" />
      {options.map((o) => (
        <button key={String(o.value)} type="button" aria-pressed={o.value === value} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}
