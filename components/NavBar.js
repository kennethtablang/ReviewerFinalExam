"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { subjectMeta as subjects } from "@/lib/meta";
import { useTheme } from "@/lib/theme";
import { useMedia } from "@/lib/useMedia";
import { getFlags } from "@/lib/flags";
import Segmented from "./Segmented";
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from "./ui";

const SECTIONS = [
  { path: "", label: "Notes" },
  { path: "/flashcards", label: "Flashcards" },
  { path: "/review", label: "Review mode" },
  { path: "/exam", label: "Exam mode" },
];

function useFlagCounts() {
  const [counts, setCounts] = useState({});
  useEffect(() => {
    const sync = () => setCounts(Object.fromEntries(subjects.map((s) => [s.slug, getFlags(s.slug).length])));
    sync();
    window.addEventListener("reviewer:flags", sync);
    return () => window.removeEventListener("reviewer:flags", sync);
  }, []);
  return counts;
}

function Sidebar({ open, onClose, wide }) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const counts = useFlagCounts();
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open || wide) return;
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, wide, onClose]);

  const hidden = !open && !wide;

  return (
    <>
      <div className={`scrim${open && !wide ? " show" : ""}`} onClick={onClose} aria-hidden="true" />
      <aside
        className={`sidebar glass${open ? " open" : ""}`}
        aria-label="Menu"
        aria-hidden={hidden ? "true" : undefined}
        inert={hidden ? true : undefined}
      >
        <div className="sidebar-head">
          <Link href="/" className="brand" onClick={onClose}>
            <span className="brand-mark" aria-hidden="true" />
            Final Exam Reviewer
          </Link>
          {!wide && (
            <button ref={closeRef} type="button" className="icon-btn ghost" onClick={onClose} aria-label="Close menu">
              <CloseIcon />
            </button>
          )}
        </div>

        <nav className="side-nav">
          <Link href="/" className="side-link" aria-current={pathname === "/" ? "page" : undefined} onClick={onClose}>
            All subjects
          </Link>
          {subjects.map((s) => (
            <div key={s.slug} className="side-group" data-tint={s.tint}>
              <p className="side-subject">
                <span className="dot" aria-hidden="true" />
                {s.short}
                <small>{s.code}</small>
              </p>
              {SECTIONS.map((sec) => {
                const href = `/${s.slug}${sec.path}`;
                return (
                  <Link
                    key={href}
                    href={href}
                    className="side-link sub"
                    aria-current={pathname === href ? "page" : undefined}
                    onClick={onClose}
                  >
                    {sec.label}
                  </Link>
                );
              })}
              {counts[s.slug] > 0 && (
                <Link href={`/${s.slug}/review`} className="side-flag" onClick={onClose}>
                  {counts[s.slug]} flagged {counts[s.slug] === 1 ? "question" : "questions"}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="side-foot">
          <span className="field-label">Appearance</span>
          <Segmented
            label="Appearance"
            value={theme}
            onChange={setTheme}
            options={[
              { value: "system", label: "System" },
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
            ]}
          />
        </div>
      </aside>
    </>
  );
}

export default function NavBar({ title }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const wide = useMedia("(min-width: 1100px)");
  const { resolved, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header className={`navbar${scrolled ? " scrolled" : ""}`}>
        <div className="navbar-inner">
          <button
            type="button"
            className="icon-btn glass menu-btn"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <MenuIcon />
          </button>
          <span className="nav-title" aria-hidden={!scrolled}>
            {title}
          </span>
          <button
            type="button"
            className="icon-btn glass"
            onClick={() => setTheme(resolved === "dark" ? "light" : "dark")}
            aria-label={resolved === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {resolved === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </header>
      <Sidebar open={open} onClose={() => setOpen(false)} wide={wide} />
    </>
  );
}
