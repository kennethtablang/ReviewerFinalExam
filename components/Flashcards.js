"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { allItems } from "@/lib/quiz";
import { shuffle } from "@/lib/shuffle";
import { useFlags } from "@/lib/flags";
import Segmented from "./Segmented";
import { CodeBlock, FlagIcon, ShuffleIcon } from "./ui";

const THRESHOLD = 110;

export default function Flashcards({ subject }) {
  const { flags, toggle: toggleFlag } = useFlags(subject.slug);
  const [filter, setFilter] = useState("all");
  const [queue, setQueue] = useState(null); // null until shuffled on the client
  const [total, setTotal] = useState(0);
  const [known, setKnown] = useState(0);
  const [again, setAgain] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [dx, setDx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [exit, setExit] = useState(null);
  const [deal, setDeal] = useState(0);
  const start = useRef(null);

  // Fresh shuffle on every visit and every restart.
  const shuffleDeck = useCallback(
    (which = filter) => {
      let items = allItems(subject);
      if (which === "flagged") items = items.filter((it) => flags.includes(it.id));
      else if (which !== "all") items = items.filter((it) => it.termId === which);
      const deck = shuffle(items);
      setQueue(deck);
      setTotal(deck.length);
      setKnown(0);
      setAgain(0);
      setFlipped(false);
      setDx(0);
      setExit(null);
      setDeal((d) => d + 1);
    },
    [filter, flags, subject]
  );

  useEffect(() => {
    shuffleDeck(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, subject.slug]);

  const card = queue?.[0];

  const decide = useCallback(
    (kind) => {
      if (!card || exit) return;
      setExit(kind === "know" ? "right" : "left");
      setTimeout(() => {
        setQueue((q) => {
          const [first, ...rest] = q;
          if (kind === "know") return rest;
          // Put it back a few cards later so it comes around again.
          const at = Math.min(rest.length, 3 + Math.floor(Math.random() * Math.max(1, rest.length - 2)));
          return [...rest.slice(0, at), first, ...rest.slice(at)];
        });
        if (kind === "know") setKnown((k) => k + 1);
        else setAgain((a) => a + 1);
        setFlipped(false);
        setDx(0);
        setExit(null);
        setDeal((d) => d + 1);
      }, 260);
    },
    [card, exit]
  );

  // Keyboard: space flips, arrows decide
  useEffect(() => {
    const onKey = (e) => {
      if (!card) return;
      if (e.key === " ") {
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (e.key === "ArrowRight") decide("know");
      else if (e.key === "ArrowLeft") decide("again");
      else if (e.key.toLowerCase() === "f") toggleFlag(card.id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [card, decide, toggleFlag]);

  const onPointerDown = (e) => {
    if (exit) return;
    start.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
  };
  const onPointerMove = (e) => {
    if (!start.current) return;
    setDx(e.clientX - start.current.x);
  };
  const onPointerUp = (e) => {
    if (!start.current) return;
    const moved = e.clientX - start.current.x;
    const movedY = e.clientY - start.current.y;
    start.current = null;
    setDragging(false);
    if (moved > THRESHOLD) decide("know");
    else if (moved < -THRESHOLD) decide("again");
    else {
      if (Math.abs(moved) < 8 && Math.abs(movedY) < 8) setFlipped((f) => !f);
      setDx(0);
    }
  };
  const onPointerCancel = () => {
    start.current = null;
    setDragging(false);
    setDx(0);
  };

  const options = [
    { value: "all", label: "All" },
    ...subject.terms.map((t) => ({ value: t.id, label: t.id === "finals" ? "Final" : t.label.replace(/s$/, "") })),
  ];

  const offset = exit ? (exit === "right" ? 1 : -1) * 700 : dx;
  const style = {
    transform: `translateX(${offset}px) rotate(${offset / 22}deg)`,
    transition: dragging ? "none" : exit ? "transform 0.26s cubic-bezier(.4,0,1,1)" : undefined,
  };
  const knowOpacity = Math.max(0, Math.min(1, dx / THRESHOLD));
  const againOpacity = Math.max(0, Math.min(1, -dx / THRESHOLD));

  return (
    <div>
      <Segmented label="Cards from" options={options} value={filter} onChange={setFilter} />
      <div className="flash-tools">
        <button
          type="button"
          className="chip"
          aria-pressed={filter === "flagged"}
          disabled={!flags.length && filter !== "flagged"}
          onClick={() => setFilter(filter === "flagged" ? "all" : "flagged")}
        >
          <FlagIcon size={16} filled={filter === "flagged"} /> Flagged <small>{flags.length}</small>
        </button>
        <button type="button" className="chip" onClick={() => shuffleDeck()}>
          <ShuffleIcon /> Reshuffle
        </button>
      </div>

      {queue && total > 0 && (
        <div className="flash-progress">
          <div className="progress" aria-hidden="true">
            <i style={{ width: `${(known / total) * 100}%` }} />
          </div>
          <span>
            {known} of {total} known{again ? ` · ${again} sent back` : ""}
          </span>
        </div>
      )}

      {queue === null ? (
        <div className="flash-stage">
          <div className="flash-card skeleton glass" />
        </div>
      ) : total === 0 ? (
        <div className="setup glass page-enter">
          <h2>No cards here yet</h2>
          <p>Flag questions in Review or Exam mode, then come back to study only those.</p>
          <button type="button" className="btn btn-primary" onClick={() => setFilter("all")}>
            Study all cards
          </button>
        </div>
      ) : !card ? (
        <div className="results glass page-enter">
          <h2>Deck complete</h2>
          <p>
            You went through all {total} cards{again ? ` and sent ${again} back for another look` : ""}.
          </p>
          <div className="btn-row">
            <button type="button" className="btn btn-primary" onClick={() => shuffleDeck()}>
              <ShuffleIcon /> Shuffle and start again
            </button>
            {flags.length > 0 && filter !== "flagged" && (
              <button type="button" className="btn btn-glass glass" onClick={() => setFilter("flagged")}>
                Study {flags.length} flagged
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="flash-stage">
            {queue.length > 2 && <div className="stack-ghost g2" aria-hidden="true" />}
            {queue.length > 1 && <div className="stack-ghost g1" aria-hidden="true" />}
            <div
              key={`${deal}-${card.id}`}
              className={`flash-card${flipped ? " flipped" : ""}${exit ? "" : " deal-in"}`}
              style={style}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerCancel}
              role="button"
              tabIndex={0}
              aria-label={flipped ? "Card showing the answer. Press to flip back." : "Card showing the question. Press to reveal the answer."}
              onKeyDown={(e) => e.key === "Enter" && setFlipped((f) => !f)}
            >
              <span className="stamp know" style={{ opacity: knowOpacity }}>
                Got it
              </span>
              <span className="stamp again" style={{ opacity: againOpacity }}>
                Again
              </span>
              <div className="flip">
                <div className="face front">
                  <div className="qmeta">
                    <span className={`qtag${card.isNew ? " is-new" : ""}`}>{card.termLabel}</span>
                    <button
                      type="button"
                      className={`flag-btn${flags.includes(card.id) ? " on" : ""}`}
                      onPointerDown={(e) => e.stopPropagation()}
                      onPointerUp={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFlag(card.id);
                      }}
                      aria-pressed={flags.includes(card.id)}
                      aria-label={flags.includes(card.id) ? "Remove flag" : "Flag this card"}
                    >
                      <FlagIcon filled={flags.includes(card.id)} />
                    </button>
                  </div>
                  <p className="qtext">{card.q}</p>
                  <CodeBlock code={card.code} />
                  <p className="flip-hint">Tap to reveal the answer</p>
                </div>
                <div className="face back">
                  <span className="why-label">Answer</span>
                  <p className="answer">{card.choices[card.correct]}</p>
                  <p className="because">{card.e}</p>
                  <p className="flip-hint">Swipe right if you knew it, left to see it again</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flash-actions">
            <button type="button" className="btn btn-glass glass" onClick={() => decide("again")}>
              Again
            </button>
            <button type="button" className="btn btn-glass glass" onClick={() => setFlipped((f) => !f)}>
              Flip
            </button>
            <button type="button" className="btn btn-primary" onClick={() => decide("know")}>
              Got it
            </button>
          </div>
          <p className="kbd-hint">Keys: Space to flip · → got it · ← again · F to flag</p>
        </>
      )}
    </div>
  );
}
