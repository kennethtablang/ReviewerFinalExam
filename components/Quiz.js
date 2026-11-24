"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { buildExam, buildReview, examPlan, LETTERS, reshuffleItems } from "@/lib/quiz";
import { readJSON, writeJSON } from "@/lib/storage";
import { useFlags } from "@/lib/flags";
import Segmented from "./Segmented";
import WhyPanel from "./WhyPanel";
import { Check, CodeBlock, FlagIcon, ShuffleIcon, formatTime } from "./ui";

const REVIEW_COUNTS = [
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 35, label: "35" },
  { value: "all", label: "All" },
];
const EXAM_COUNTS = [
  { value: 35, label: "35 items" },
  { value: 50, label: "50 items" },
  { value: 70, label: "70 items" },
];

export default function Quiz({ subject, mode }) {
  const isExam = mode === "exam";
  const { flags, toggle: toggleFlag } = useFlags(subject.slug);

  const [phase, setPhase] = useState("setup");
  const [termIds, setTermIds] = useState(() => subject.terms.map((t) => t.id));
  const [flaggedOnly, setFlaggedOnly] = useState(false);
  const [count, setCount] = useState(isExam ? 50 : 20);

  const [items, setItems] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState("next");
  const [seconds, setSeconds] = useState(0);
  const [confirming, setConfirming] = useState(false);
  const [best, setBest] = useState(null);
  const [filter, setFilter] = useState("wrong");
  const [round, setRound] = useState(0);

  const cardRef = useRef(null);
  const stripRef = useRef(null);
  const bestKey = `reviewer:best:${subject.slug}`;

  useEffect(() => setBest(readJSON(bestKey, null)), [bestKey]);

  const scrollToCard = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 84;
    if (window.scrollY > top) window.scrollTo({ top, behavior: "smooth" });
  }, []);

  // Every start deals a fresh shuffle of questions AND choices.
  const begin = useCallback((list) => {
    setItems(list);
    setAnswers(Array(list.length).fill(null));
    setIndex(0);
    setDir("next");
    setSeconds(0);
    setConfirming(false);
    setFilter("wrong");
    setRound((r) => r + 1);
    setPhase(list.length ? "run" : "setup");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const startNew = () => {
    begin(isExam ? buildExam(subject, count) : buildReview(subject, { termIds, count, flaggedOnly, flags }));
  };

  // Exam timer
  useEffect(() => {
    if (phase !== "run" || !isExam) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [phase, isExam]);

  // Keep the current number visible in the strip
  useEffect(() => {
    const strip = stripRef.current;
    const btn = strip?.querySelector(`[data-i="${index}"]`);
    if (strip && btn) {
      const left = btn.offsetLeft - strip.clientWidth / 2 + btn.clientWidth / 2;
      strip.scrollTo({ left, behavior: "smooth" });
    }
  }, [index, phase]);

  const go = useCallback(
    (i) => {
      if (i < 0 || i >= items.length || i === index) return;
      setDir(i > index ? "next" : "prev");
      setIndex(i);
      setConfirming(false);
      requestAnimationFrame(scrollToCard);
    },
    [index, items.length, scrollToCard]
  );

  const choose = useCallback(
    (ci) => {
      setAnswers((prev) => {
        if (!isExam && prev[index] != null) return prev; // review: first pick locks
        const next = prev.slice();
        next[index] = ci;
        return next;
      });
    },
    [index, isExam]
  );

  const finish = useCallback(() => {
    setPhase("done");
    setConfirming(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (isExam) {
      const correct = items.reduce((n, it, i) => n + (answers[i] === it.correct ? 1 : 0), 0);
      const pct = Math.round((correct / items.length) * 100);
      const result = { pct, correct, total: items.length, seconds, at: Date.now() };
      if (!best || pct > best.pct) {
        writeJSON(bestKey, result);
        setBest(result);
      }
    }
  }, [answers, best, bestKey, isExam, items, seconds]);

  const item = items[index];
  const picked = answers[index];
  const answeredCount = answers.filter((a) => a != null).length;
  const correctSoFar = items.reduce((n, it, i) => n + (answers[i] === it.correct ? 1 : 0), 0);
  const flaggedInRun = items.map((it, i) => (flags.includes(it.id) ? i : -1)).filter((i) => i >= 0);

  const nextFlagged = () => {
    if (!flaggedInRun.length) return;
    const after = flaggedInRun.find((i) => i > index);
    go(after ?? flaggedInRun[0]);
  };

  // Keyboard: A–D / 1–4 pick, arrows move, F flags
  useEffect(() => {
    if (phase !== "run") return;
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      const n = "abcd".indexOf(k) >= 0 ? "abcd".indexOf(k) : "1234".indexOf(k);
      if (n >= 0 && n < (item?.choices.length ?? 0)) {
        e.preventDefault();
        choose(n);
      } else if (k === "arrowright" || k === "enter") {
        if (index < items.length - 1) go(index + 1);
      } else if (k === "arrowleft") {
        go(index - 1);
      } else if (k === "f" && item) {
        toggleFlag(item.id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, item, index, items.length, choose, go, toggleFlag]);

  /* ---------------- Setup ---------------- */
  if (phase === "setup") {
    const available = flaggedOnly
      ? flags.length
      : subject.terms.filter((t) => termIds.includes(t.id)).reduce((n, t) => n + t.questions.length, 0);
    const plan = examPlan(subject, count);

    return (
      <div className="setup glass page-enter">
        {isExam ? (
          <>
            <h2>Set up your exam</h2>
            <p>
              Like the real final, it mixes questions from Prelims, Midterms and Prefinals with the new final topics.
              The order of questions and choices changes on every attempt. You get your score after you submit.
            </p>
            <span className="field-label">Number of items</span>
            <Segmented label="Number of items" options={EXAM_COUNTS} value={count} onChange={setCount} />
            <span className="field-label">What you'll get</span>
            <div className="mix">
              {plan.map((p) => (
                <div className="mix-row" key={p.id}>
                  <span>{p.label}</span>
                  <span className="bar">
                    <i style={{ width: `${(p.n / count) * 100}%` }} />
                  </span>
                  <span>{p.n}</span>
                </div>
              ))}
            </div>
            {best && (
              <p className="best">
                Best score: {best.pct}% ({best.correct}/{best.total})
              </p>
            )}
          </>
        ) : (
          <>
            <h2>Set up your review</h2>
            <p>
              Answer one question at a time. When you pick, you see the right answer and why each other choice is wrong.
              The questions are reshuffled every time you start.
            </p>
            <span className="field-label">Terms to include</span>
            <div className="chips">
              {subject.terms.map((t) => {
                const on = !flaggedOnly && termIds.includes(t.id);
                return (
                  <button
                    key={t.id}
                    type="button"
                    className="chip"
                    aria-pressed={on}
                    onClick={() => {
                      setFlaggedOnly(false);
                      setTermIds((ids) => (ids.includes(t.id) ? ids.filter((x) => x !== t.id) : [...ids, t.id]));
                    }}
                  >
                    <span className="tick">
                      <Check />
                    </span>
                    {t.label} <small>{t.questions.length}</small>
                  </button>
                );
              })}
              <button
                type="button"
                className="chip"
                aria-pressed={flaggedOnly}
                disabled={!flags.length}
                onClick={() => setFlaggedOnly((v) => !v)}
              >
                <span className="tick">
                  <Check />
                </span>
                Flagged only <small>{flags.length}</small>
              </button>
            </div>
            <span className="field-label">Number of questions</span>
            <Segmented label="Number of questions" options={REVIEW_COUNTS} value={count} onChange={setCount} />
          </>
        )}
        <button type="button" className="btn btn-primary btn-block" onClick={startNew} disabled={!isExam && available === 0}>
          <ShuffleIcon />
          {isExam ? "Start exam" : "Start review"}
        </button>
        {!isExam && available === 0 && <p className="hint">Pick at least one term to start.</p>}
      </div>
    );
  }

  /* ---------------- Results ---------------- */
  if (phase === "done") {
    const total = items.length;
    const pct = total ? Math.round((correctSoFar / total) * 100) : 0;
    const terms = subject.terms
      .map((t) => {
        const idx = items.map((it, i) => (it.termId === t.id ? i : -1)).filter((i) => i >= 0);
        const ok = idx.filter((i) => answers[i] === items[i].correct).length;
        return { id: t.id, label: t.label, n: idx.length, ok };
      })
      .filter((t) => t.n > 0);
    const wrongItems = items.filter((it, i) => answers[i] !== it.correct);
    const shown = items
      .map((it, i) => ({ it, i }))
      .filter(({ it, i }) =>
        filter === "all" ? true : filter === "flagged" ? flags.includes(it.id) : answers[i] !== it.correct
      );
    const message =
      pct >= 90 ? "Excellent. You're ready." : pct >= 75 ? "Passing. Polish the misses below." : pct >= 50 ? "Getting there. Review the misses and retry." : "Keep going. Start with the notes, then retry your mistakes.";

    return (
      <div className="page-enter">
        <div className="results glass">
          <Ring pct={pct} key={round} />
          <h2>{message}</h2>
          <p>
            {correctSoFar} of {total} correct
            {isExam ? ` in ${formatTime(seconds)}` : ""}
            {best && isExam ? `. Best: ${best.pct}%` : ""}
          </p>
          <div className="breakdown">
            {terms.map((t) => (
              <div className="mix-row" key={t.id}>
                <span>{t.label}</span>
                <span className="bar">
                  <i style={{ width: `${(t.ok / t.n) * 100}%` }} />
                </span>
                <span>
                  {t.ok}/{t.n}
                </span>
              </div>
            ))}
          </div>
          <div className="btn-row">
            <button type="button" className="btn btn-primary" onClick={startNew}>
              <ShuffleIcon /> Retake with a new shuffle
            </button>
            {wrongItems.length > 0 && (
              <button type="button" className="btn btn-glass glass" onClick={() => begin(reshuffleItems(subject, wrongItems))}>
                Retry {wrongItems.length} {wrongItems.length === 1 ? "mistake" : "mistakes"}
              </button>
            )}
            <button type="button" className="btn btn-glass glass" onClick={() => setPhase("setup")}>
              Change settings
            </button>
          </div>
        </div>

        <div className="review-toolbar">
          <h3>Check your answers</h3>
        </div>
        <Segmented
          label="Filter answers"
          value={filter}
          onChange={setFilter}
          options={[
            { value: "wrong", label: `Missed ${wrongItems.length}` },
            { value: "flagged", label: `Flagged ${items.filter((it) => flags.includes(it.id)).length}` },
            { value: "all", label: `All ${total}` },
          ]}
        />
        <div className="review">
          {shown.length === 0 && (
            <div className="review-item glass">
              <p className="why">{filter === "wrong" ? "No misses. Every answer was correct." : "Nothing here yet."}</p>
            </div>
          )}
          {shown.map(({ it, i }) => (
            <article className="review-item glass" key={it.id}>
              <div className="qmeta">
                <span className={`qtag${it.isNew ? " is-new" : ""}`}>
                  {i + 1} · {it.termLabel}
                </span>
                <FlagButton on={flags.includes(it.id)} onClick={() => toggleFlag(it.id)} />
              </div>
              <p className="qtext">{it.q}</p>
              <CodeBlock code={it.code} />
              <WhyPanel item={it} picked={answers[i]} />
            </article>
          ))}
        </div>
      </div>
    );
  }

  /* ---------------- Running ---------------- */
  const showFeedback = !isExam && picked != null;
  const isLast = index === items.length - 1;

  return (
    <div>
      <div className="run-head">
        <span className="count">
          Question {index + 1} of {items.length}
        </span>
        <span className="score">
          {isExam ? `${formatTime(seconds)} · ${answeredCount} answered` : `${correctSoFar} correct`}
        </span>
      </div>
      <div className="progress" aria-hidden="true">
        <i style={{ width: `${((isExam ? answeredCount : index + (picked != null ? 1 : 0)) / items.length) * 100}%` }} />
      </div>

      <div className="numstrip glass" ref={stripRef} role="navigation" aria-label="Jump to question">
        {items.map((it, i) => {
          const a = answers[i];
          const state = a == null ? "" : isExam ? " done" : a === it.correct ? " right" : " wrong";
          return (
            <button
              key={it.id}
              type="button"
              data-i={i}
              className={`num${state}${i === index ? " here" : ""}${flags.includes(it.id) ? " flagged" : ""}`}
              onClick={() => go(i)}
              aria-label={`Question ${i + 1}${a != null ? ", answered" : ""}${flags.includes(it.id) ? ", flagged" : ""}`}
              aria-current={i === index ? "step" : undefined}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      <article key={`${round}-${index}`} ref={cardRef} className={`qcard glass enter-${dir}`}>
        <div className="qmeta">
          <span className={`qtag${item.isNew ? " is-new" : ""}`}>{item.termLabel}</span>
          <FlagButton on={flags.includes(item.id)} onClick={() => toggleFlag(item.id)} label />
        </div>
        <p className="qtext">{item.q}</p>
        <CodeBlock code={item.code} />
        <ul className="choices">
          {item.choices.map((c, ci) => {
            let cls = "choice";
            if (isExam) {
              if (picked === ci) cls += " is-picked";
            } else if (picked != null) {
              if (ci === item.correct) cls += " is-right";
              else if (ci === picked) cls += " is-wrong";
              else cls += " is-dim";
            }
            return (
              <li key={ci}>
                <button
                  type="button"
                  className={cls}
                  onClick={() => choose(ci)}
                  disabled={!isExam && picked != null}
                  aria-pressed={picked === ci}
                >
                  <span className="letter">
                    <span>{LETTERS[ci]}</span>
                  </span>
                  <span>{c}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {!isExam && (
          <div className={`reveal${showFeedback ? " open" : ""}`}>
            <div>{showFeedback && <WhyPanel item={item} picked={picked} />}</div>
          </div>
        )}
      </article>

      <div className="run-actions">
        <button type="button" className="btn btn-glass glass narrow" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous question">
          Back
        </button>
        {isLast ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => (answeredCount < items.length ? setConfirming(true) : finish())}
          >
            {isExam ? "Submit exam" : "See results"}
          </button>
        ) : (
          <button type="button" className={`btn ${picked != null || isExam ? "btn-primary" : "btn-glass glass"}`} onClick={() => go(index + 1)}>
            {picked == null && !isExam ? "Skip" : "Next"}
          </button>
        )}
      </div>

      <div className="run-tools">
        <button type="button" className="link-btn" onClick={nextFlagged} disabled={!flaggedInRun.length}>
          <FlagIcon size={16} filled={flaggedInRun.length > 0} /> Next flagged ({flaggedInRun.length})
        </button>
        <button type="button" className="link-btn" onClick={() => setConfirming(true)}>
          {isExam ? "Submit now" : "End review"}
        </button>
      </div>

      {confirming && (
        <div className="confirm glass" role="alertdialog" aria-label="Confirm finish">
          <p>
            {answeredCount < items.length
              ? `You have ${items.length - answeredCount} unanswered ${items.length - answeredCount === 1 ? "question" : "questions"}. They'll count as wrong.`
              : "All questions answered."}{" "}
            {isExam ? "Submit the exam now?" : "End the review and see your results?"}
          </p>
          <div className="btn-row">
            <button type="button" className="btn btn-primary" onClick={finish}>
              {isExam ? "Submit exam" : "See results"}
            </button>
            <button type="button" className="btn btn-glass glass" onClick={() => setConfirming(false)}>
              Keep going
            </button>
          </div>
        </div>
      )}

      <p className="kbd-hint">Keys: A–D to answer · ← → to move · F to flag</p>
    </div>
  );
}

function FlagButton({ on, onClick, label = false }) {
  return (
    <button
      type="button"
      className={`flag-btn${on ? " on" : ""}`}
      onClick={onClick}
      aria-pressed={on}
      aria-label={on ? "Remove flag" : "Flag this question"}
    >
      <FlagIcon filled={on} />
      {label && <span>{on ? "Flagged" : "Flag"}</span>}
    </button>
  );
}

function Ring({ pct }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(pct));
    return () => cancelAnimationFrame(id);
  }, [pct]);
  return (
    <div className="ring" style={{ "--p": shown }}>
      <svg viewBox="0 0 36 36" aria-hidden="true">
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c4b5fd" />
            <stop offset="55%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#4c1d95" />
          </linearGradient>
        </defs>
        <circle className="track" cx="18" cy="18" r="15.9155" fill="none" strokeWidth="3.2" />
        <circle className="meter" cx="18" cy="18" r="15.9155" fill="none" strokeWidth="3.2" strokeLinecap="round" stroke="url(#ringGrad)" />
      </svg>
      <div className="label">
        <b>{pct}%</b>
        <span>score</span>
      </div>
    </div>
  );
}
